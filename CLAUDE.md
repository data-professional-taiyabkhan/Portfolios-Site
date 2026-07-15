# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Mohammad Taiyab Khan's personal portfolio: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion. Editorial design language (paper texture, custom cursor), fully static/client-rendered site plus one server API route that powers an embedded AI agent. Deployed on Vercel at `taiyab.autostrata.ai`.

## Commands

```bash
npm run dev      # local dev server, http://localhost:3000
npm run build    # production build (must pass — this is the CI gate; there is no test suite)
npm run start    # run the production build
npm run lint     # next lint
```

There are no unit/integration tests in this repo. `npm run build` (TypeScript errors + Next build) is the correctness gate — always run it after non-trivial changes.

## Environment

The agent backend needs env vars to function locally (see `.env.example` for the full list and where to obtain each key): `OPENROUTER_API_KEY`, `CAL_API_KEY`, `CAL_EVENT_TYPE_ID`, `CAL_USERNAME`, `RESEND_API_KEY`, `RESEND_FROM`, `NOTIFY_EMAIL`. Copy into `.env.local`. Without these, the chat UI renders but tool calls (booking, messaging) will fail.

## Architecture

### Two halves of the codebase

1. **Static marketing site** — `app/page.tsx` composes section components in order: `Hero → Marquee → About → Work → Research → Stack → Contact`. Each section is a self-contained component in `/components/`, styled with Tailwind using the design tokens below. `Work.tsx` + `ProjectCard.tsx` render case-study cards that open in a modal (no page navigation) sourced entirely from `data/projects.ts`.

2. **Embedded AI agent** — a chat surface (currently `AgentLauncher.tsx` + `AgentChat.tsx`, a floating button revealing a slide-out drawer) that talks to `app/api/agent/route.ts`. This is a real tool-calling agent, not a scripted demo:
   - `app/api/agent/route.ts` — streaming endpoint using Vercel AI SDK (`streamText`) with Claude Haiku 4.5 via OpenRouter, `stepCountIs(6)` for multi-step tool loops, and per-IP rate limiting (50/day, 20/10min) before touching the model.
   - `lib/agent/system-prompt.ts` — persona, voice, and hard refusal rules (never invents facts, never negotiates on Taiyab's behalf, never claims to be Taiyab, rejects jailbreak attempts).
   - `lib/agent/knowledge.ts` — the agent's *only* source of truth about Taiyab (closed knowledge boundary — no web search, no general knowledge).
   - `lib/agent/tools.ts` — three tools: `check_availability` + `book_meeting` (real Cal.com API v2 bookings via `lib/agent/cal.ts`), and `leave_message` (real email via Resend, `lib/agent/resend.ts`).
   - `lib/rate-limit.ts` — in-memory per-IP limiter (not cross-instance; swap to Upstash Redis if traffic grows).

   This agent is itself one of the portfolio's showcased projects (`slug: "portfolio-ai-agent"` in `data/projects.ts`), so its prompt/tools/copy should stay consistent with how it's described there.

### Content model

All project/case-study content lives in one typed array: `data/projects.ts` (`Project` type + `projects: Project[]`). To add or edit a project, edit only this file — titles, metrics, problem/approach/outcomes, tags, stack. `category` is one of `"client" | "research" | "analysis" | "tool"`; `highlight: true` surfaces a project in "Selected work" instead of "Research & analysis". Components never hardcode project copy — they map over this array.

### Design tokens

Colors and fonts are defined in `tailwind.config.ts` (`paper`, `ink`, `ink-soft`, `mute`, `line`, `accent`, `accent-soft`, `moss`) and loaded via Google Fonts `@import` in `app/globals.css` (Instrument Serif for display, DM Sans for body, JetBrains Mono for mono). Changing the palette or type scale means editing both files together — `tailwind.config.ts` for token values/clamp sizes, `globals.css` for the font `@import` and CSS custom properties (`--font-display` etc).

The custom cursor (`components/Cursor.tsx`) only activates on desktop and auto-disables on touch/mobile — keep that check intact when touching cursor or pointer-related code.

## In-flight work: landing-v2 branch

The current branch (`landing-v2`) is mid-migration to a redesigned landing page. The approved design lives at `design/landing-v2/taiyab-landing-v2.html` (a static HTML/CSS prototype — its embedded chat is scripted/fake) with the full implementation plan in `design/landing-v2/LANDING_V2_BRIEF.md`. Read the brief before making landing-page changes on this branch; it defines phase-by-phase work (token migration → `AgentStage.tsx` → `Hero.tsx` rewrite → page assembly → `AgentLauncher` repurpose → QA) and explicit non-negotiables, notably:

- Do not modify `app/api/agent/route.ts`, `lib/agent/`, or `lib/rate-limit.ts` as part of this redesign.
- All chat UI must go through the existing real backend (`useChat` + `DefaultChatTransport({ api: "/api/agent" })`) — never reintroduce the prototype's scripted chat.
- Work one phase at a time and stop for review between phases; `npm run build` must pass at the end of each phase.
