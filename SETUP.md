# Portfolio AI Agent — Setup & Integration Guide

This is the AI assistant for **taiyab.autostrata.ai**. It does three things via tool-calling:

1. **Answers questions** about Taiyab's work, using a closed knowledge base (no web)
2. **Books real 15-min calls** by checking Cal.com availability and creating bookings in-chat
3. **Leaves messages** that arrive in your Gmail via Resend

Architecture mirrors the HEART AI agent: closed knowledge boundary, strict tool routing, refuses anything outside scope.

---

## 1. What's in this package

```
lib/agent/
  knowledge.ts        ← your facts (CV + 10 projects + tech stack)
  system-prompt.ts    ← persona, refusal rules, tool-routing instructions
  tools.ts            ← 3 tools the AI can call
  cal.ts              ← Cal.com API client (slots + booking)
  resend.ts           ← email client
lib/
  rate-limit.ts       ← per-IP rate limiting (50/day, 20/10min)
app/api/agent/
  route.ts            ← streaming endpoint (Vercel AI SDK + OpenRouter)
components/
  AgentLauncher.tsx   ← floating "Ask my AI" button (appears after hero scroll)
  AgentChat.tsx       ← slide-out drawer with full chat UI
.env.example          ← required environment variables
```

---

## 2. Install — drop into your existing portfolio repo

From your portfolio repo root:

```bash
# Copy the addon files in
# (assuming you unzipped the agent-addon folder next to your repo)
cp -R agent-addon/lib/agent  lib/
cp    agent-addon/lib/rate-limit.ts  lib/
cp -R agent-addon/app/api  app/
cp    agent-addon/components/AgentLauncher.tsx  components/
cp    agent-addon/components/AgentChat.tsx      components/
cp    agent-addon/.env.example  .env.example
```

Then install the new dependencies:

```bash
npm install ai@^6.0.0 @ai-sdk/react@^3.0.0 @openrouter/ai-sdk-provider@^2.9.0 zod@^3.25.0
```

(Versions verified clean against TypeScript compilation as of May 2026.)

---

## 3. Wire the launcher into your layout

Open `app/layout.tsx`. Add **one import** and **one component**:

```tsx
// at the top, with the other imports
import AgentLauncher from "@/components/AgentLauncher";

// inside <body>, after <Nav />
<body>
  <Cursor />
  <Nav />
  {children}
  <AgentLauncher />   {/* ← ADD THIS LINE */}
</body>
```

That's it. The launcher manages its own state, scroll-based reveal, and drawer.

---

## 4. Cal.com — sign up + connect

Already have a Cal.com account? Skip to step 4.4.

### 4.1 Sign up
Go to [cal.com](https://cal.com) → sign up free with Google or email. Pick a username (e.g. `taiyab`).

### 4.2 Connect your Google Calendar
Settings → Calendars → Connect → Google. Pick the calendar where bookings should land. This is critical — Cal.com needs to see your real availability so it doesn't double-book you.

### 4.3 Create the event type
Event Types → + New → Configure:
- **Title:** 15-min intro call
- **URL slug:** `15-min-intro-call`
- **Duration:** 15 minutes
- **Location:** Google Meet (auto-generated)
- **Description:** "Quick chat about your role, project, or question."

Optionally set buffer time, future-booking limits, and your timezone.

### 4.4 Get the event type ID
Open the event type in Cal.com. The URL will look like:
```
https://app.cal.com/event-types/12345
```
That number at the end (`12345`) is your `CAL_EVENT_TYPE_ID`. Copy it.

### 4.5 Generate an API key
Settings → Developer → API Keys → **+ Add**
- Name it: "Portfolio AI"
- Never expires (or set a reasonable date)
- Copy the key (starts with `cal_live_`). You'll only see it once — save it.

---

## 5. Resend — sign up + API key

### 5.1 Sign up
Go to [resend.com](https://resend.com) → sign up free. Free tier gives you 100 emails/day, 3,000/month — plenty for portfolio traffic.

### 5.2 Create an API key
Dashboard → API Keys → **Create API Key** → name it "Portfolio AI". Copy it (starts with `re_`).

### 5.3 (Optional but recommended) Verify autostrata.ai domain
First time, you can skip this and use the default `onboarding@resend.dev` sender. To send from your own domain later:
1. Resend → Domains → **Add Domain** → `autostrata.ai`
2. Add the DNS records Resend gives you to your domain provider
3. Once verified, change `RESEND_FROM` to `"Portfolio AI <noreply@autostrata.ai>"`

---

## 6. OpenRouter — API key

You said you have $14 credit. Get your API key:
1. Go to [openrouter.ai/keys](https://openrouter.ai/keys)
2. **Create Key** → name it "Portfolio Agent" → copy

---

## 7. Set environment variables

### Locally
Create `.env.local` in your project root with values from `.env.example`:

```bash
OPENROUTER_API_KEY=sk-or-v1-...
CAL_API_KEY=cal_live_...
CAL_EVENT_TYPE_ID=12345
CAL_USERNAME=taiyab
RESEND_API_KEY=re_...
RESEND_FROM=Portfolio AI <onboarding@resend.dev>
NOTIFY_EMAIL=mohammadtaiyabkhan21@gmail.com
```

### In Vercel
Project → Settings → Environment Variables. Add each one for **Production, Preview, Development**.

---

## 8. Test locally

```bash
npm run dev
```

Open http://localhost:3000, scroll past the hero, and the **Ask my AI** button should appear bottom-right. Click it.

Try these flows:

| What you type | What should happen |
|---|---|
| "What kind of work does Taiyab do?" | Concise answer pulled from knowledge base |
| "Tell me about the EURO 2024 paper" | Detailed project answer with metrics |
| "Can I book a call with him on Monday?" | AI calls `check_availability` → lists slots → asks for name/email → calls `book_meeting` → confirms |
| "I'd like to send Taiyab a message" | AI asks for name, email, message → calls `leave_message` → email lands in your inbox |
| "What's the weather in London?" | Politely refuses ("outside my scope") |
| "Are you Taiyab?" | "No, I'm his AI assistant" |

---

## 9. Deploy

```bash
git add .
git commit -m "Add AI agent with Cal.com booking + Resend messages"
git push
```

Vercel auto-deploys. Once env vars are set in Vercel, it works in production.

---

## 10. Optional: add it to your portfolio as Project #11

The AI agent is genuinely a piece of work worth showing off. To add it to your portfolio:

Open `data/projects.ts` and add this entry at the top of the `projects` array (after the existing featured ones):

```ts
{
  slug: "portfolio-ai-agent",
  number: "11",
  title: "This site's AI assistant",
  client: "Self · portfolio.autostrata.ai",
  year: "2026",
  role: "Architecture, prompt design, and implementation",
  category: "client",
  oneLiner:
    "An agentic AI you can actually try, right here. Same architectural pattern as the HEART AI I built for a client.",
  summary:
    "A purpose-built agent with strict tool routing, closed knowledge boundary, and real-world side effects (calendar bookings + emails). Built with the Vercel AI SDK, Claude Haiku 4.5 via OpenRouter, Cal.com API for in-chat booking, and Resend for messages.",
  tags: ["Agentic AI", "Tool calling", "Claude", "Vercel AI SDK", "Cal.com API", "Resend"],
  metrics: [
    { label: "Tools wired", value: "3" },
    { label: "Refusal rules", value: "9" },
    { label: "Knowledge boundary", value: "Closed" },
  ],
  problem:
    "A portfolio's job is to make a recruiter or client think 'I want to talk to this person.' Most portfolios then make that next step painful. Find the email, write the email, hope for a reply. I wanted one chat surface that could answer questions, check my actual calendar, and book a call without the user ever leaving the page.",
  approach: [
    "Vercel AI SDK with Claude Haiku 4.5 via OpenRouter for the agent loop with tool-calling.",
    "Closed knowledge boundary: a hand-curated JSON KB is the agent's only source of truth. No web search, no general knowledge.",
    "Three tools: check_availability + book_meeting (Cal.com API v2) and leave_message (Resend).",
    "Hard refusal patterns: never negotiates, never commits on offers, never speaks as me, never invents facts.",
    "Anti-abuse: per-IP rate limits (50 msgs/day, 20 per 10 minutes), session message cap, max output tokens.",
    "Floating launcher appears after hero scroll. Drawer UI with suggestion chips, streaming responses, and tool-call indicators.",
  ],
  stack: ["Vercel AI SDK", "Claude Haiku 4.5", "OpenRouter", "Cal.com API v2", "Resend", "Next.js 14", "TypeScript"],
  outcomes: [
    "Real in-chat booking — visitor picks a slot and it appears on my calendar with no link redirect.",
    "Messages route directly to my inbox with the user's reply-to set, so I respond in two clicks.",
    "Average response cost ~$0.005 per turn at current pricing.",
  ],
  links: [{ label: "Try it", href: "#" }],
  highlight: true,
},
```

This converts the AI from "feature" into "deliverable" — the chat itself becomes part of your portfolio story.

---

## 11. Common issues

**"Cal.com is not configured" error in chat**  
You probably haven't set `CAL_API_KEY` or `CAL_EVENT_TYPE_ID`. Restart `npm run dev` after editing `.env.local`.

**"Resend failed: 422" when leaving a message**  
You're using a from-address from a domain that isn't verified in Resend. Either:
- Use `Portfolio AI <onboarding@resend.dev>` (works immediately)
- Or verify your domain first (Resend → Domains)

**Booking creates but doesn't appear on my calendar**  
Make sure Google Calendar is connected in Cal.com Settings → Calendars, AND that the right calendar is selected as the destination.

**The agent answers questions about things not in the knowledge base**  
Open `lib/agent/knowledge.ts` and either add the fact or sharpen the refusal pattern in `lib/agent/system-prompt.ts`.

**I want to change what the AI sounds like**  
Edit the "=== YOUR VOICE ===" section in `lib/agent/system-prompt.ts`.

---

## 12. Costs at this scale

- **OpenRouter / Claude Haiku 4.5:** ~$0.005 per turn. Your $14 credit ≈ 2,800 turns ≈ 500+ conversations.
- **Cal.com:** free forever for individual use.
- **Resend:** free tier (100/day, 3,000/month) is more than you'll need.
- **Vercel:** free hobby tier.

Total monthly cost at portfolio traffic: **probably $0–$3**.

---

Built in Egham, May 2026. Same architecture as HEART AI.
