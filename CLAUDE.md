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

The agent backend needs env vars to function locally (see `.env.example` for the full list and where to obtain each key): `OPENROUTER_API_KEY`, `CAL_API_KEY`, `CAL_EVENT_TYPE_ID`, `CAL_USERNAME`, `RESEND_API_KEY`, `RESEND_FROM`, `NOTIFY_EMAIL`. Copy into `.env.local`. Without these, the chat UI renders but tool calls (booking, messaging) will fail. `SETUP.md` has step-by-step account setup for Cal.com, Resend, and OpenRouter if any of these need to be created or reconfigured from scratch.

## Architecture

### Two halves of the codebase

1. **Static marketing site** — `app/page.tsx` composes section components in order: `Hero → Marquee → ThreeTools → Work → SideQuests → About → Contact`. `Cursor`, `Nav`, and `AgentLauncher` are mounted globally in `app/layout.tsx` (outside `page.tsx`), not per-page — that file also wires up Vercel Analytics and a Microsoft Clarity snippet via `next/script`, both site-wide and independent of any page. Each section is a self-contained component in `/components/`, styled with Tailwind using the design tokens below. `Work.tsx` + `ProjectCard.tsx` render case-study cards that open in a modal (no page navigation) sourced entirely from `data/projects.ts`.

2. **Embedded AI agent** — the agent's chat console (`AgentStage.tsx`) is mounted inside `Hero.tsx`, embedded inline in the page (not a slide-out drawer). `AgentLauncher.tsx` is just a floating "Ask my AI" pill that appears after scrolling past the hero and, on click, dispatches an `open-agent-drawer` `CustomEvent` (via `lib/focus-agent-stage.ts`) that `AgentStage` listens for to scroll itself into view and focus its input — there is no separate drawer/panel state anymore. `AgentChat.tsx` is the old slide-out-drawer implementation and is **dead code, unused, kept pending removal** — don't extend it, and don't be misled by it still being present. Both `AgentStage.tsx` and (the now-dead) `AgentChat.tsx` talk to `app/api/agent/route.ts`, a real tool-calling agent, not a scripted demo:
   - `app/api/agent/route.ts` — streaming endpoint using Vercel AI SDK (`streamText`) with Claude Haiku 4.5 via OpenRouter, `stepCountIs(6)` for multi-step tool loops, and per-IP rate limiting (50/day, 20/10min) before touching the model.
   - `lib/agent/system-prompt.ts` — persona, voice, and hard refusal rules (never invents facts, never negotiates on Taiyab's behalf, never claims to be Taiyab, rejects jailbreak attempts).
   - `lib/agent/knowledge.ts` — the agent's *only* source of truth about Taiyab (closed knowledge boundary — no web search, no general knowledge).
   - `lib/agent/tools.ts` — three tools: `check_availability` + `book_meeting` (real Cal.com API v2 bookings via `lib/agent/cal.ts`), and `leave_message` (real email via Resend, `lib/agent/resend.ts`).
   - `lib/rate-limit.ts` — in-memory per-IP limiter (not cross-instance; swap to Upstash Redis if traffic grows).

   This agent is itself one of the portfolio's showcased projects (`slug: "portfolio-ai-agent"` in `data/projects.ts`), so its prompt/tools/copy should stay consistent with how it's described there.

### Content model

All project/case-study content lives in one typed array: `data/projects.ts` (`Project` type + `projects: Project[]`). To add or edit a project, edit only this file — titles, metrics, problem/approach/outcomes, tags, stack. `category` is one of `"client" | "research" | "analysis" | "tool"`; `highlight: true` surfaces a project in "Selected work" instead of "Research & analysis". Components never hardcode project copy — they map over this array.

### Design tokens

Colors and fonts are defined in `tailwind.config.ts` (`paper`, `paper-deep`, `ink`, `ink-soft`, `ink-2`, `ink-3`, `mute`, `line`, `line-dark`, `signal`, `signal-soft`, `moss`) and loaded via Google Fonts `@import` in `app/globals.css` (Instrument Serif for display, DM Sans for body, JetBrains Mono for mono). Changing the palette or type scale means editing both files together — `tailwind.config.ts` for token values/clamp sizes, `globals.css` for the font `@import` and CSS custom properties (`--font-display` etc).

`accent` / `accent-soft` still exist in `tailwind.config.ts` as temporary aliases of `signal` / `signal-soft` from an in-progress token rename (see the `TODO(landing-v2)` comment there) — new code should use `signal`/`signal-soft` directly. Remaining `accent`/`accent-soft` usages live in `Contact.tsx`, `Marquee.tsx`, `ProjectCard.tsx`, and the two dead components below; sweeping those to `signal`/`signal-soft` and then deleting the aliases is unfinished work.

The custom cursor (`components/Cursor.tsx`) only activates on desktop and auto-disables on touch/mobile — keep that check intact when touching cursor or pointer-related code.

### Dead code (present but unused — don't extend, safe to ignore or remove)

- `components/AgentChat.tsx` — superseded by `AgentStage.tsx`; not imported anywhere.
- `components/Research.tsx`, `components/Stack.tsx` — not imported from `app/page.tsx` or elsewhere; superseded by `ThreeTools.tsx`/`SideQuests.tsx`.

If you're asked to touch agent UI or the "Research"/"Stack" sections, confirm first whether the request means the live component (`AgentStage`, `ThreeTools`, `SideQuests`) or one of these leftovers.
