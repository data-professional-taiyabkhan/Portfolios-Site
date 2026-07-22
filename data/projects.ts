export type Project = {
  slug: string;
  number: string;
  title: string;
  client: string;
  year: string;
  role: string;
  category: "client" | "research" | "analysis" | "tool";
  oneLiner: string;
  summary: string;
  tags: string[];
  metrics?: { label: string; value: string }[];
  problem: string;
  approach: string[];
  stack: string[];
  outcomes: string[];
  links?: { label: string; href: string }[];
  highlight?: boolean;
};

export const projects: Project[] = [
  {
  slug: "portfolio-ai-agent",
  number: "00",
  title: "This site's AI assistant",
  client: "Self · taiyab.autostrata.ai",
  year: "2026",
  role: "Architecture, prompt design, implementation",
  category: "client",
  oneLiner:
    "An agentic AI you can actually try, right here. Same architectural pattern as the HEART AI I built for a paid client.",
  summary:
    "A purpose-built agent with strict tool routing, closed knowledge boundary, and real-world side effects. It can answer questions about my work, check my calendar, and book a 15-minute call without ever leaving the chat. Built so visitors don't have to email-tag to get a meeting.",
  tags: ["Agentic AI", "Tool calling", "Claude Haiku 4.5", "Vercel AI SDK", "Cal.com API", "Resend"],
  metrics: [
    { label: "Tools wired", value: "3" },
    { label: "Refusal rules", value: "9" },
    { label: "Avg cost/turn", value: "~$0.005" },
  ],
  problem:
    "A portfolio's job is to make a recruiter or client think 'I want to talk to this person.' Most portfolios then make that next step painful — find the email, write the email, hope for a reply. I wanted one chat surface that could answer questions, check my actual calendar, and book a call without the user leaving the page.",
  approach: [
    "Vercel AI SDK with Claude Haiku 4.5 via OpenRouter for the agent loop with tool-calling.",
    "Closed knowledge boundary: a hand-curated knowledge base is the agent's only source of truth. No web search, no general knowledge.",
    "Three tools: check_availability + book_meeting (Cal.com API v2), and leave_message (Resend).",
    "Hard refusal patterns: never negotiates, never commits on offers, never speaks as me, never invents facts.",
    "Anti-abuse: per-IP rate limits (50 messages/day, 20 per 10 minutes), session message cap.",
    "Floating launcher reveals after the hero scroll, with a slide-out drawer matching the site's editorial design tokens.",
  ],
  stack: ["Vercel AI SDK", "Claude Haiku 4.5", "OpenRouter", "Cal.com API v2", "Resend", "Next.js 14", "TypeScript"],
  outcomes: [
    "Real in-chat booking — visitor picks a slot, it appears on my calendar with no link redirect.",
    "Messages route directly to my inbox with reply-to set to the visitor, so I respond in two clicks.",
    "Architecture mirrors the HEART AI I built for a paid client — same closed-boundary, tool-routing pattern.",
  ],
  links: [{ label: "Try it", href: "#" }],
  highlight: true,
  },
  {
  slug: "weft-passport",
  number: "02",
  title: "Weft Passport",
  client: "Paid client · via Autostrata",
  year: "2026",
  role: "Solo full-stack engineer",
  category: "client",
  oneLiner:
    "SKU-level proof-of-origin for handwoven textiles — so ethical fashion brands can prove their claims before EU law forces them to.",
  summary:
    "A provenance and compliance platform for handwoven South Asian textiles. A garment's artisan, loom, place and photos are captured at source, an admin certifies the batch, and the system produces a public QR provenance page for shoppers plus a regulator-ready compliance record for the brand.",
  tags: ["Next.js 14", "TypeScript", "Supabase", "Postgres RLS", "Vercel", "Provenance / Compliance"],
  metrics: [
    { label: "Modules", value: "4" },
    { label: "Data model", value: "Artisan → Loom → Batch → SKU" },
    { label: "Status", value: "Live in production" },
  ],
  problem:
    "Machine-made cloth is routinely sold as handwoven, and incoming regulation (EU ECGT, the textile Digital Product Passport, the UK Green Claims Code) means brands must be able to prove 'handwoven' and 'ethical-origin' claims or face penalties. There was no simple, SKU-level way to record provenance at source and hand a brand the proof.",
  approach: [
    "Multi-tenant data model — artisan, household, loom, batch and SKU — with role-based access for admins, brands and field coordinators.",
    "Field verification flow to record an artisan, loom and batch with supporting photos.",
    "Batch certification lifecycle wired end-to-end: capture → submit → certify.",
    "Public consumer provenance page, readable by anonymous visitors via dedicated Postgres Row-Level Security policies, reached by a QR code.",
    "Certification and compliance layer that turns a certified batch into a brand-facing, regulator-ready record.",
  ],
  stack: ["Next.js 14", "TypeScript", "Supabase", "PostgreSQL", "Row-Level Security", "Tailwind", "Vercel"],
  outcomes: [
    "Live in production with the founding client.",
    "End-to-end loop working: a batch captured in the field becomes a scannable public provenance page plus a compliance record.",
    "Built thin and standard by design — the client's moat is its field methodology and dataset, not the software layer.",
  ],
  links: [{ label: "GitHub", href: "https://github.com/data-professional-taiyabkhan/weft-passport" }],
  highlight: true,
  },
  {
    slug: "clock-in-pro",
    number: "02",
    title: "Clock-in Pro",
    client: "Autostrata product · live pre-launch",
    year: "2025–26",
    role: "Solo full-stack engineer",
    category: "client",
    oneLiner: "Face-verified, GPS-geofenced attendance for small businesses.",
    summary:
      "A face-verified, GPS-geofenced attendance product built for small businesses that lose time and money to buddy-punching and manual payroll reconciliation. Live pre-launch at clockinpro.autostrata.ai — public repo, actively developed.",
    tags: ["React", "TypeScript", "Node/Express", "PostgreSQL", "Drizzle", "face-api.js", "Railway"],
    metrics: [
      { label: "Status", value: "Live · pre-launch" },
      { label: "Stack", value: "React · Node · Postgres" },
    ],
    problem:
      "Small businesses lose money to buddy-punching and manual payroll reconciliation, and most attendance software either needs new hardware or an enterprise contract. Taiyab wanted something that worked from any phone, couldn't be faked, and didn't require new hardware.",
    approach: [
      "Started as a Python DeepFace prototype Taiyab built himself from YouTube tutorials, hands-on and pre-AI-assisted — proof that the face-matching approach worked before productising it.",
      "Rebuilt as a full product: React/TypeScript + Tailwind + shadcn/ui client, Node/Express (TypeScript) server.",
      "PostgreSQL (Neon serverless) + Drizzle ORM for type-safe queries.",
      "Server-side face-embedding matching with face-api.js (TensorFlow.js) run from the Node backend.",
      "GPS geofencing per site with configurable radius and role-based dashboards (Employee / Manager / Admin).",
    ],
    stack: ["React 18", "TypeScript", "Node/Express", "PostgreSQL (Neon)", "Drizzle ORM", "face-api.js", "TensorFlow.js", "Tailwind", "Railway"],
    outcomes: [
      "Live pre-launch at clockinpro.autostrata.ai; public repo, actively developed.",
      "Originated as a hands-on Python/DeepFace prototype, built from tutorials before any AI-assisted development — then rebuilt as a full product after an early prospective buyer passed on the first build.",
      "Face verification runs server-side via face-embedding matching with face-api.js (TensorFlow.js), deployed on Railway.",
    ],
    links: [
      { label: "Live", href: "https://clockinpro.autostrata.ai" },
      { label: "GitHub", href: "https://github.com/data-professional-taiyabkhan/clock-in-pro" },
    ],
    highlight: true,
  },
  {
    slug: "mummyhelp",
    number: "03",
    title: "MummyHelp",
    client: "Commissioned prototype · via Autostrata",
    year: "2025",
    role: "Solo full-stack engineer",
    category: "client",
    oneLiner: "Voice-activated SOS app with on-device wake-word detection.",
    summary:
      "A commissioned prototype for a safety app where children can trigger emergency alerts hands-free with a wake phrase. Built end-to-end and device-tested — never distributed to real users. Privacy-first architecture — no continuous cloud streaming.",
    tags: ["React Native", "Expo", "Node/Express", "Supabase", "Python Flask", "Vosk", "Picovoice"],
    metrics: [
      { label: "SOS delivery (device testing)", value: "~3–4s" },
      { label: "Status", value: "Commissioned prototype" },
    ],
    problem:
      "Parents wanted a way for children to summon help without unlocking a phone, swiping to an app, or shouting. The hard constraint: it had to work offline-first, on-device, without sending audio to the cloud constantly. Voice in the cloud is both a battery and a privacy disaster.",
    approach: [
      "On-device keyword spotting with Picovoice Porcupine for the wake phrase \"Hey MummyHelp\" — never sends audio off-device until triggered.",
      "Evaluated additional speaker-verification approaches for the child's voice before settling on on-device wake-word detection for latency and privacy — never shipped as production speaker verification.",
      "An earlier server-side experiment used a Python Flask speech service with Vosk (offline) and a Google Speech API fallback.",
      "React Native (Expo) frontend, Node/Express backend, Supabase (Postgres) with Row Level Security.",
    ],
    stack: ["React Native", "Expo", "Node/Express", "Supabase", "Python Flask", "Vosk", "Picovoice Porcupine"],
    outcomes: [
      "SOS alerts reached the paired device in roughly 3–4 seconds in device testing.",
      "Built end-to-end and tested on Taiyab's own device — no real users, never distributed.",
      "Evaluated alternative speaker-verification approaches before choosing on-device wake-word detection for latency and privacy.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/data-professional-taiyabkhan/MummyHelpIA" }],
    highlight: true,
  },
  {
    slug: "heart-eco",
    number: "04",
    title: "HEART-Eco",
    client: "Paid client · via Autostrata",
    year: "2025–26",
    role: "Lead engineer · AI architecture",
    category: "client",
    oneLiner: "A dashboard that turns a multi-pillar economic scoring model into an interactive analyst.",
    summary:
      "Commissioned by an academic researcher. A Next.js 14 dashboard for a multi-pillar economic scoring model, with 2026–2030 country forecasts and an OpenAI Assistants \"Ask AI\" panel grounded in the model's own data — never the open web.",
    tags: ["Next.js 14", "OpenAI Assistants", "Recharts", "Economic Modelling"],
    metrics: [
      { label: "Forecast horizon", value: "2026–2030" },
      { label: "Source boundary", value: "Closed" },
    ],
    problem:
      "An academic researcher had built a multi-pillar economic scoring model for country-level performance. The challenge: turn dense methodology and a dataset into something a non-economist could query interactively, without the AI making things up or pulling from the open internet.",
    approach: [
      "Built the dashboard on Next.js 14 + TypeScript + Tailwind, with Recharts for the pyramid and forecast visuals.",
      "Added an OpenAI Assistants \"Ask AI\" panel grounded only in the model's own data — a closed knowledge boundary, never the open web.",
      "Built forecast transparency rules: years 2026–2030 are auto-labelled as forecasts.",
    ],
    stack: ["Next.js 14", "TypeScript", "Tailwind", "Recharts", "OpenAI Assistants API", "Vercel"],
    outcomes: [
      "Live at heart-eco.vercel.app.",
      "\"Ask AI\" panel answers grounded strictly in the model's own data, never the open web.",
    ],
    links: [
      { label: "Live demo", href: "https://heart-eco.vercel.app" },
      { label: "GitHub", href: "https://github.com/data-professional-taiyabkhan/HEART-Eco" },
    ],
    highlight: true,
  },
  {
    slug: "sartorial-london",
    number: "05",
    title: "Sartorial London",
    client: "Paid client · via Autostrata",
    year: "2025",
    role: "Full-stack marketplace engineer",
    category: "client",
    oneLiner: "A custom Sharetribe Flex marketplace for designer outfit rentals.",
    summary:
      "Extended a Sharetribe Flex marketplace with a fixed 5-day rental engine, a Featured Fits carousel, Stripe security-deposit flow, and the operational plumbing for sent / received / returned tracking.",
    tags: ["Sharetribe Flex", "Stripe", "React", "Node", "TypeScript"],
    metrics: [
      { label: "Rental window", value: "Fixed 5-day" },
      { label: "Mobile layout", value: "Redesigned" },
      { label: "Deposit flow", value: "Stripe holds" },
    ],
    problem:
      "Sartorial London needed a rental marketplace that enforced consistent business rules — exactly 5-day rentals, shipping fees on rentals (not just sales), security deposits via Stripe card holds, and a clear sent / received / returned lifecycle. Sharetribe's defaults didn't cover any of this cleanly.",
    approach: [
      "Phase 1 — Shipping fees on rental line items, mobile category grid (Gucci-inspired 2×2), and a dynamic \"Featured Fits\" carousel pulling the 5–6 most recent listings via Sharetribe API.",
      "Phase 2 — Fixed 5-day rental enforcement: end date auto-calculated, full-window availability validation, calendar logic that lets hosts block days but locks renters to 5-day windows.",
      "Custom rental info popup (\"What these dates mean?\") explaining the 48-hour acceptance rule.",
      "Console-level groundwork for Stripe pre-authorisation with auto-capture before the 7-day Stripe limit.",
      "Custom transaction states (Sent / Customer Received / Customer Returned) ready for activation.",
    ],
    stack: ["Sharetribe Flex", "Stripe Payments", "React", "Tailwind", "Node/Express (TypeScript)"],
    outcomes: [
      "Mobile browse-to-checkout flow rebuilt and shipped.",
      "Pricing logic unified: total = (Daily Price × 5) + Shipping Fee for all rentals.",
      "Featured Fits carousel surfaces new listings without manual curation.",
      "Stripe deposit and transaction-state plumbing documented for next phase.",
    ],
    links: [{ label: "Source repo", href: "https://github.com/sjamil168/sartorialLondon" }],
    highlight: true,
  },
  {
    slug: "euro-2024-paper",
    number: "06",
    title: "Predicting EURO 2024 via Social Media Sentiment",
    client: "MSc Dissertation · Royal Holloway, University of London",
    year: "2024",
    role: "Researcher · sole author",
    category: "research",
    oneLiner: "The model with the worst benchmark score succeeded where the best one failed.",
    summary:
      "A preprint on Zenodo comparing TF-IDF + Logistic Regression, VADER, a three-class LR, and a zero-shot LLM classifier for predicting football match outcomes from Twitter sentiment.",
    tags: ["NLP", "Sentiment Analysis", "LLM", "Statistical Inference", "Python"],
    metrics: [
      { label: "Best benchmark AUC", value: "0.927" },
      { label: "LLM win-day vs loss-day signal", value: "p = 0.012" },
      { label: "Neutral tweets in corpus", value: "79%" },
    ],
    problem:
      "Can you predict football match outcomes from what fans tweet? The first attempt — TF-IDF + Logistic Regression — hit 86% accuracy and AUC 0.927. By every benchmark metric, it was a strong model. But when asked the actual question I cared about — was sentiment higher after England won the semi-final or after they lost the final? — it couldn't tell. p = 0.104. Strong on benchmarks. Useless on the real question.",
    approach: [
      "Built four classifiers: TF-IDF + Logistic Regression, VADER (lexicon-based), a three-class LR that could detect neutrality, and a zero-shot LLM classifier (Claude Haiku) with a prompt that explicitly taught it football Twitter conventions.",
      "The LLM prompt encoded British understatement, \"typical England\" as resigned frustration, and sarcasm indicators — domain conventions a binary classifier can't access.",
      "Tested all four on the same Euro 2024 tweet corpus from the tournament's final stages.",
      "Compared benchmark accuracy against domain sensitivity (win-day vs loss-day sentiment shift).",
    ],
    stack: ["Python", "scikit-learn", "VADER", "Claude Haiku (Anthropic API)", "TweetEval"],
    outcomes: [
      "Only the LLM detected the genuine win-day vs loss-day sentiment shift: t = 2.52, p = 0.012. Statistically significant.",
      "The model with the worst benchmark score succeeded where the best benchmark model failed.",
      "Root cause: 79% of football tweets are factually neutral (score updates, lineup news, factual commentary). The binary classifier forced all of them into \"positive\" or \"negative\", inflating noise and burying real signal.",
      "Demonstrated that benchmark accuracy and domain sensitivity measure different things — an important implication for sports analytics and social media NLP more broadly.",
      "Published as a preprint on Zenodo.",
    ],
    links: [{ label: "Paper · DOI", href: "https://doi.org/10.5281/zenodo.19675434" }],
    highlight: true,
  },
  {
    slug: "nba-shot-analysis",
    number: "07",
    title: "NBA Shot Selection Shift",
    client: "Personal research",
    year: "2025",
    role: "Sole analyst",
    category: "analysis",
    oneLiner: "Is the modern NBA really just more threes? The numbers say it's a structural shift.",
    summary:
      "A 29-season analysis of NBA shot selection (1996–97 → 2024–25) showing the league hasn't just shifted to more threes — it's restructured the entire shot chart.",
    tags: ["Python", "pandas", "Data Storytelling", "Matplotlib", "nba_api"],
    metrics: [
      { label: "24+ ft attempt share", value: "10.6% → 41.9%" },
      { label: "16–24 ft attempt share", value: "25.0% → 4.8%" },
      { label: "8–16 ft FG%", value: "+4.2 pp" },
    ],
    problem:
      "Curry vs Luka, Kyrie vs Trae — the eye test says NBA players take more deep shots these days. But is that actually true, or is it just availability bias from highlight reels?",
    approach: [
      "Built a season-level dataset using Python (pandas, nba_api) covering FGA/FGM, 3PA/3PM, FG% by distance bin, and shot-distance mix.",
      "Normalised for shortened seasons (lockouts, COVID) by converting to share-of-total attempts rather than raw counts.",
      "Produced publication-ready visuals using Matplotlib + Canva for LinkedIn-style storytelling.",
    ],
    stack: ["Python", "pandas", "Matplotlib", "nba_api", "Canva"],
    outcomes: [
      "24+ ft attempt share rose from 10.6% → 41.9% (+31.2 percentage points) over 29 seasons.",
      "16–24 ft share collapsed from 25.0% → 4.8% (−20.2 pp).",
      "8–16 ft FG% rose from 40.2% → 44.4% (+4.2 pp) — efficiency rose even while volume fell.",
      "Conclusion: the modern NBA isn't just \"more threes\" — it's a structural shift: less midrange, more deep attempts, some zones getting more efficient.",
      "Posted on LinkedIn with a one-page infographic poster.",
    ],
  },

  {
  slug: "clarivance-ai",
  number: "08",
  title: "Clarivance AI",
  client: "Paid client · via Autostrata",
  year: "2026",
  role: "Site build, code audit, HMRC integration scoping",
  category: "client",
  oneLiner:
    "The production marketing site and secure waitlist backend for a pre-launch UK tax-automation fintech — plus a full audit of its AI-generated codebase.",
  summary:
    "A pre-launch fintech (AI cash-flow forecasting + HMRC Making Tax Digital) needed a fast, credible marketing site, a secure waitlist, and the SEO / accessibility / legal groundwork to launch on — built on a stack the team could extend toward the product. I delivered the site, wired a server-side waitlist that never exposes API keys, audited the AI-generated codebase end-to-end, and scoped the HMRC MTD integration for the product phase.",
  tags: ["React 19", "TanStack Start", "Tailwind v4", "shadcn/ui", "Serverless", "Fintech"],
  metrics: [
    { label: "Scope", value: "Site + waitlist + audit" },
    { label: "Stack", value: "React 19 · TanStack Start" },
    { label: "Status", value: "Live · pre-launch" },
  ],
  problem:
    "Clarivance AI is pre-launch — the AI forecasting and tax-filing engine is still to be built. What they needed first was a marketing site that could explain the product, capture a waitlist, and stand up legal / SEO foundations, on a modern stack the team could keep building on. The starting codebase was AI-generated (Lovable) and needed verifying before it could be trusted in production.",
  approach: [
    "Delivered the marketing site on React 19 + TanStack Start with SSR and route pre-rendering for fast first paint.",
    "Replaced a brittle external form proxy with a server-side serverless waitlist — the Airtable API token stays on the server, never in the browser.",
    "Added per-page SEO with JSON-LD structured data, a generated sitemap, accessibility passes, and UK-GDPR legal pages (privacy / terms / cookies).",
    "Ran a full audit of the AI-generated codebase and fixed build, routing and configuration issues; corrected an out-of-date MTD timeline in the content.",
    "Scoped the real product integration — HMRC Making Tax Digital API: OAuth2 via Government Gateway plus the mandatory fraud-prevention headers and the sandbox-to-production approval path.",
  ],
  stack: ["React 19", "TanStack Start", "Vite 7", "Tailwind v4", "shadcn/ui", "TypeScript", "Vercel Functions", "Airtable"],
  outcomes: [
    "A production marketing site the client can launch and keep extending toward the product.",
    "Waitlist capture with no secrets exposed in the browser.",
    "An audited codebase with the regulatory-timeline content corrected.",
    "A clear, costed path for the HMRC MTD integration when the product build begins.",
  ],
  links: [
    { label: "Live site", href: "https://clarivanceai.co.uk" }, // ← confirm the real live URL
    { label: "GitHub", href: "https://github.com/data-professional-taiyabkhan/clarivance-ai" },
  ],
  highlight: false,
  },
  {
    slug: "uk-sponsorship-map",
    number: "09",
    title: "UK Visa Sponsorship Companies Map",
    client: "Open-source tool",
    year: "2024",
    role: "Sole developer",
    category: "tool",
    oneLiner: "I built a tool to solve the problem I'm still living through.",
    summary:
      "An interactive map of UK companies holding Skilled Worker sponsor licences, built so international students can find employers who can actually sponsor them.",
    tags: ["Flask", "Google Maps API", "Leaflet.js", "Python", "Data Engineering"],
    metrics: [
      { label: "LinkedIn impressions", value: "3,674" },
      { label: "Reactions on launch", value: "45" },
    ],
    problem:
      "Everyone tells international students to \"target the right company\" — meaning one on the Home Office sponsor licence register. But the register is a massive PDF without geography. There was no good way to see who's hiring near you.",
    approach: [
      "Scraped and structured the Home Office sponsor licence register into a clean dataset.",
      "Used Google Maps API and GCP geocoding to convert company addresses into coordinates.",
      "Built a Flask web app with a Leaflet.js interactive map, marker clustering, and town/city filtering.",
      "Deployed to Railway for public access.",
    ],
    stack: ["Python", "Flask", "Leaflet.js", "Google Maps API", "Google Cloud Platform", "Pandas"],
    outcomes: [
      "Live and used by other international students.",
      "Launch post: 3,674 LinkedIn impressions, 45 reactions, 12 comments.",
      "Ongoing work: categorising companies by sector and adding role/SOC code data from multiple sources.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/data-professional-taiyabkhan/UKSponsershipCompany" }],
  },
  {
    slug: "aapl-risk-analysis",
    number: "10",
    title: "AAPL Multi-Horizon Risk Analysis",
    client: "Personal research · finance module spin-out",
    year: "2025",
    role: "Sole analyst",
    category: "analysis",
    oneLiner: "When you're not clear on the question, more metrics just add confusion.",
    summary:
      "A 10-year study of Apple stock returns across monthly, 3-month, 6-month, and yearly horizons — exploring the difference between return volatility and estimator uncertainty.",
    tags: ["Statistical Inference", "Time-Series", "Excel", "Confidence Intervals", "Data Storytelling"],
    metrics: [
      { label: "Monthly avg return", value: "+2.3%" },
      { label: "Yearly avg return", value: "+27.6%" },
      { label: "Yearly volatility", value: "21.6%" },
    ],
    problem:
      "During an investment portfolio module at Royal Holloway, a finance professor described risk as standard deviation. I tested it on 10 years of Apple stock data — and ran into a question my professor's framing couldn't cleanly answer: is \"risk\" really just volatility?",
    approach: [
      "Built a 10-year monthly OHLCV dataset for AAPL.",
      "Engineered 1-month, 3-month, 6-month, and yearly return series.",
      "Computed mean returns and standard deviations across horizons.",
      "Extended the analysis with confidence intervals — separating \"volatility of returns\" from \"uncertainty in the estimated average return\".",
      "Documented findings in a public write-up.",
    ],
    stack: ["Excel", "Google Sheets", "Time-series modelling"],
    outcomes: [
      "Documented the trade-off: short horizons look noisy, long horizons smooth out — but the estimator gets less certain.",
      "Mapped each risk metric to the specific question it answers (volatility vs uncertainty vs downside).",
      "Public write-up shared on LinkedIn; 1,859 impressions on the follow-up confidence-intervals post.",
    ],
  },
  {
    slug: "gurucool-recsys",
    number: "11",
    title: "Gurucool Recommendation System",
    client: "Gurucool XYZ Pvt Ltd",
    year: "2022–23",
    role: "Lead Data Analyst",
    category: "client",
    oneLiner: "Hybrid recommendation engine for a short-form educational content feature.",
    summary:
      "Led development of a Python-based hybrid recommendation system (collaborative + content-based filtering) for Gurucool's BITS short-form content feature, part-time alongside his BSc and IIT diploma. Co-authored a research paper on the methodology.",
    tags: ["Python", "Machine Learning", "Recommendation Systems", "Prompt Engineering"],
    metrics: [
      { label: "Role", value: "Part-time" },
      { label: "Methodology", value: "Co-authored paper" },
    ],
    problem:
      "Gurucool's BITS feature — short-form educational content similar to Instagram Reels — needed a recommendation engine that learned from user behaviour while still surfacing new content. Cold-start and filter-bubble problems were both real risks.",
    approach: [
      "Hybrid approach combining collaborative filtering (user-item interaction matrix) with content-based filtering (subject, difficulty, format metadata).",
      "Co-authored a research paper documenting the methodology.",
      "Built supporting Power BI dashboards (MIS reporting) for senior leadership to track engagement trends weekly.",
      "Integrated OpenAI GPT API (Davinci, Babbage, Ada, GPT-3.5 Turbo) for in-app Q&A — during the very early ChatGPT era.",
    ],
    stack: ["Python", "Pandas", "scikit-learn", "OpenAI API", "Power BI", "Google Analytics", "GTM"],
    outcomes: [
      "Hybrid recommender combining collaborative and content-based filtering shipped for the BITS short-form feature.",
      "Research paper co-authored on the methodology.",
      "Part-time role alongside a full-time BSc and IIT diploma.",
    ],
  },
  {
    slug: "alzheimers-mri",
    number: "12",
    title: "Alzheimer's Detection from Brain Scans",
    client: "BSc Final Project · Jamia Millia Islamia",
    year: "2023",
    role: "Sole researcher",
    category: "research",
    oneLiner: "Computer vision classifier on MRI imagery — 84% accuracy, F1 = 0.8.",
    summary:
      "Built a machine learning classifier using computer vision techniques on MRI brain scan imagery to predict Alzheimer's disease. Conducted parallel statistical analysis on Alzheimer's Disease and Healthy Aging Data.",
    tags: ["Computer Vision", "Machine Learning", "Medical Imaging", "Python"],
    metrics: [
      { label: "Accuracy", value: "84%" },
      { label: "F1 score", value: "0.80" },
    ],
    problem: "Early diagnosis of Alzheimer's is one of the highest-impact problems in medical imaging. Can an ML classifier learn the visual signatures from limited MRI data?",
    approach: [
      "Preprocessed MRI imagery (normalisation, augmentation) to handle a small dataset.",
      "Tested multiple classifier architectures.",
      "Ran parallel statistical analysis on the Alzheimer's Disease and Healthy Aging Data to enrich understanding.",
    ],
    stack: ["Python", "scikit-learn", "Pandas", "Computer Vision"],
    outcomes: [
      "Achieved 84% accuracy and F1 = 0.80 on a held-out test set.",
      "Statistical analysis complemented the model output with population-level insights.",
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.highlight);
export const otherProjects = projects.filter((p) => !p.highlight);