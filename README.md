# Mohammad Taiyab Khan — Portfolio

Personal portfolio built with Next.js 14, TypeScript, Tailwind, and Framer Motion.
Editorial design language, paper-textured background, custom cursor on desktop,
and a responsive mobile experience.

Live at: **https://taiyab.autostrata.ai** (after deployment)

---

## Quick start (local development)

```bash
npm install
npm run dev
```

Open http://localhost:3000.

---

## Build for production

```bash
npm run build
npm run start
```

The build is fully static and weighs around 144 kB on first load.

---

## Deploy to Vercel (15 minutes total)

### 1. Push to GitHub

```bash
# from the project root
git init
git add .
git commit -m "Initial portfolio"

# create a new repo named taiyab-portfolio (or whatever you want)
gh repo create taiyab-portfolio --public --source=. --push

# OR manually:
# Create an empty repo on github.com
# Then:
git remote add origin https://github.com/data-professional-taiyabkhan/taiyab-portfolio.git
git branch -M main
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to https://vercel.com/new
2. Click **Import Git Repository**, pick `taiyab-portfolio`
3. Framework Preset will auto-detect as **Next.js** — leave defaults
4. Click **Deploy**
5. Wait ~60 seconds — done. You'll get a URL like `taiyab-portfolio-xyz.vercel.app`

### 3. Connect the subdomain `taiyab.autostrata.ai`

In your Vercel project settings:

1. Go to **Settings → Domains**
2. Add `taiyab.autostrata.ai`
3. Vercel will give you a `CNAME` target — copy it
4. In your DNS provider (wherever autostrata.ai is registered), add a `CNAME` record:
   - Name: `taiyab`
   - Value: the Vercel target (something like `cname.vercel-dns.com`)
   - TTL: Auto (or 3600)
5. Wait 5–30 minutes for DNS propagation
6. Vercel auto-issues an SSL certificate. Done.

---

## Editing content

All project data lives in **one file**: `data/projects.ts`.

Edit titles, summaries, metrics, problems, approach, outcomes — everything per project.

To **add a new project**: copy any existing entry in `projects.ts` and change the values.
Use `highlight: true` to make it appear in the "Selected work" section, leave it out
(or set to `false`) to put it in "Research & analysis".

To **change the headline / About / Contact details**: edit the corresponding component
in `/components/`. Each is self-contained.

To **add your CV PDF for the Download button**: drop it in `/public/Mohammad_Taiyab_Khan_CV.pdf`.

---

## Design tokens

Edit `tailwind.config.ts` to change colours. Current palette:

| Token | Value | Use |
|---|---|---|
| `paper` | `#F5F1EA` | Background |
| `paper-deep` | `#EDE6D6` | Section variant |
| `ink` | `#1A1A1A` | Primary text |
| `ink-soft` | `#3A3A3A` | Body text |
| `mute` | `#6B6760` | Tertiary text |
| `line` | `#D9D2C2` | Borders |
| `accent` | `#C8553D` | Terracotta highlight |
| `accent-soft` | `#E8A88F` | Lighter accent |
| `moss` | `#5A6E4A` | Status dot (available) |

Fonts (loaded via Google Fonts `@import` in `globals.css`):
- Display: **Instrument Serif**
- Sans: **DM Sans**
- Mono: **JetBrains Mono**

---

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** for scroll-triggered reveals and modal animations
- **Lucide React** for icons

Total dependencies kept minimal on purpose.

---

## Notes

- The custom cursor only activates on desktop (auto-off on mobile/touch devices)
- The "Idea → Demo → Deployed" hero animation cycles every 2.2 seconds
- All project case studies open in a modal — no page navigation needed
- Built mobile-first; tested down to 380px viewport width

---

Built in Egham, Surrey. 2026.
