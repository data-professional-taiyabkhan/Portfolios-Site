# Landing v2 — Implementation Brief

The approved design is `design/landing-v2/taiyab-landing-v2.html` in this folder.
Open it and study it before writing any code — it is the source of truth for layout,
colors, type, copy, and interactions.

IMPORTANT: the chat inside that HTML file is a SCRIPTED design prototype.
The production version must run through the existing real agent backend.

## Non-negotiables

- Do NOT modify: `app/api/agent/route.ts`, anything in `lib/agent/`, `lib/rate-limit.ts`.
- All chat traffic goes through the existing pattern from `components/AgentChat.tsx`:
  `useChat` from `@ai-sdk/react` + `DefaultChatTransport({ api: "/api/agent" })`.
  Port its message-part extraction (text parts + tool parts) — do not invent a new transport.
- Existing case-study modals (`Work.tsx` / `ProjectCard.tsx`) must keep working.
- Project content stays in `data/projects.ts` — new work cards read from it, no hardcoded
  duplicates of titles/metrics in components.
- `npm run build` must pass at the end of every phase.
- Work happens on the `landing-v2` branch only.

## Design tokens (Phase 1)

In `tailwind.config.ts`:
- ink: `#1A1A1A` → `#10151C`; ink-soft: `#3A3A3A` → `#39404B`
- ADD: `ink-2: #1A212C`, `ink-3: #242D3B`, `line-dark: #2E3846`
- accent `#C8553D` → `signal: #F2A33C`, accent-soft `#E8A88F` → `signal-soft: #F8C77E`
  (add `signal` as the new name; keep `accent` as an alias of the same hex during the
  migration, then sweep all `accent` usages to `signal` and delete the alias)
- Keep: paper, paper-deep, line, mute, moss, the grain overlay in `globals.css`.

In `globals.css`: swap the Google Fonts import — remove Instrument Serif, add
Bricolage Grotesque (`opsz,wght@12..96,400;12..96,600;12..96,800`) and add DM Sans
italic weight 400. `--font-display` becomes "Bricolage Grotesque". Keep DM Sans and
JetBrains Mono. Display sizes get tighter than the current `display-xl` — match the
clamp values used in the prototype's `h1`/`.tagline`/`h2`.

## Phase 2 — `components/AgentStage.tsx` (the core new component)

The dark console + patch bay from the prototype, as a client component:
- Header: avatar "T" with amber status dot, "Taiyab's AI", meta line
  "Claude Haiku 4.5 · tool-calling · avg $0.005/turn", LIVE badge.
- Transcript (fixed height ~310px, scrollable) rendering real `useChat` messages.
  Tool invocations render in the `fncall` style from the prototype (mono, amber,
  dashed top border) using the tool parts your `Message` component already extracts.
- Suggestion chips (same three defaults as `AgentChat.tsx` SUGGESTIONS) shown when
  the transcript is empty; input row + send; footer line
  "3 tools wired · 9 refusal rules" (drop the "design prototype" text — this is production).
- Patch bay: three tool nodes under the console with dashed vertical connectors and
  amber dots (pure CSS, per the prototype). Hide connectors under 560px.
- Caption: "The same agentic pattern I ship for paying clients — you're the demo user".
- Expose a way to focus the input from outside (e.g. keep listening for the existing
  `open-agent-drawer` window event: on receipt, scroll the stage into view and focus).

## Phase 3 — `components/Hero.tsx` rewrite

Two-column grid (`5fr / 6fr`, stacking under 1020px), per the prototype:
- Left: availability eyebrow; polaroid portrait (`/public/portrait.jpg`) with tape,
  −2.4° rotation, caption "The human / London · 2025"; the dashed `human-wire` SVG with
  "trained on this guy →" label (desktop only); H1 name with amber full stop; tagline
  "I build AI products that move from idea → demo → deployed."; sub-copy with the
  amber-underlined "interview it"; CTA buttons ("Interview the AI ↗" focuses the stage,
  "See the work" → #work); identity mono strip (Royal Holloway Merit · Zenodo ·
  6 paid clients).
- Right: `<AgentStage />`.
- Keep Framer Motion entrance animations in the spirit of the current Hero (staggered
  fade-up), and respect `prefers-reduced-motion`.

## Phase 4 — page assembly + sections

- `app/page.tsx` order: Hero(with AgentStage) → Marquee → ThreeTools → Work → SideQuests
  → About → Contact.
- New `components/ThreeTools.tsx`: the "01 — Under the hood / Three tools. Real
  consequences." section — three offset-shadow cards + the HEART AI note, per prototype.
- `Work.tsx`: dark (`ink`) section, cards per prototype. Highlight order: Weft Passport
  and Clarivance AI first with "New · 2026" tags, then HEART, Clock-in Pro, MummyHelp,
  EURO 2024. Pull all copy/metrics from `data/projects.ts`; keep "Read case study"
  modal behavior.
- New `components/SideQuests.tsx`: "03 — Research & side quests" — EURO pull-quote +
  slim rows (NBA, UK Visa Sponsorship Map, AAPL, Alzheimer's) linking to their existing
  case-study modals or entries.
- `About.tsx`: trim to the two-paragraph + facts-card version (portrait now lives in
  the Hero, so remove it here). Keep visa line: "UK Graduate Visa → Jan 2027 · open to
  sponsorship".
- `Contact.tsx`/footer: headline "Skip the contact form. The agent books straight into
  my calendar." with primary button that scrolls to and focuses the AgentStage.

## Phase 5 — `AgentLauncher.tsx` repurpose

Invert its logic: hidden while the hero/AgentStage is in view; after scrolling past it,
show the pill ("Ask my AI" style, amber dot). Clicking it smooth-scrolls back to the
AgentStage and focuses the input — do NOT open the old side drawer (single chat
instance, single conversation state). `AgentChat.tsx`'s drawer becomes unused; keep the
file for now, delete once everything is verified.

## Phase 6 — QA checklist

- `npm run build` passes; no TypeScript errors.
- Mobile at 380px: hero stacks (eyebrow → polaroid → name → copy → CTAs → console →
  tool nodes), no horizontal scroll.
- `prefers-reduced-motion`: no marquee/wire/typing animation.
- Keyboard: chips and send reachable, visible focus rings (amber).
- The real agent responds end-to-end in dev: ask a question, book flow reaches the
  Cal.com tool, tool calls visibly render in the transcript.
- Custom cursor still works and doesn't fight the console inputs.

## Process rule

Work ONE phase at a time. After each phase: summarize what changed, list the files
touched, and STOP for review before starting the next phase.
