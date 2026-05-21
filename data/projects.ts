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
    slug: "clock-in-pro",
    number: "01",
    title: "Clock-in Pro",
    client: "Paid client · via Autostrata",
    year: "2025",
    role: "Solo full-stack engineer",
    category: "client",
    oneLiner: "Face-verified, GPS-geofenced attendance for a 45-employee operation.",
    summary:
      "A production attendance system that uses face recognition and location verification to eliminate buddy-punching and payroll fraud. Scaled from prototype to live deployment across 3 sites in six months.",
    tags: ["React", "Node/Express", "PostgreSQL", "DeepFace", "OpenCV", "Python FastAPI"],
    metrics: [
      { label: "Fake clock-ins reduced", value: "−83%" },
      { label: "Payroll errors reduced", value: "−72%" },
      { label: "Uptime", value: "99.6%" },
      { label: "Verification accuracy", value: "98.3%" },
    ],
    problem:
      "The client was losing money on buddy-punching and inaccurate payroll. Manual reconciliation was eating ~4.5 hours of admin time per week. They needed something that worked from any phone, couldn't be faked, and didn't require new hardware.",
    approach: [
      "Built a React/TypeScript frontend with Tailwind + shadcn/ui for fast, mobile-first UX.",
      "Node/Express backend in TypeScript with PostgreSQL and Drizzle ORM for type-safe queries.",
      "Python microservice wrapping DeepFace (Facenet) and OpenCV for face verification.",
      "GPS geofencing per site with configurable radius and role-based dashboards (Employee / Manager / Admin).",
      "Invitation-and-onboarding flow with face enrolment during signup.",
    ],
    stack: ["React 18", "TypeScript", "Node/Express", "PostgreSQL", "Drizzle ORM", "Python", "DeepFace", "OpenCV", "Tailwind", "Replit", "Railway"],
    outcomes: [
      "Fake clock-ins dropped from 12/month to 2/month (−83%).",
      "Payroll adjustments fell from 7.5% to 2.1% of timesheets (−72%).",
      "Saved approximately 4.5 admin hours per week.",
      "Scaled to 45 employees across 3 sites with 99.6% uptime, p95 API latency 820ms.",
      "Face verification: 98.3% accuracy, FAR 0.7%, FRR 1.0%.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/data-professional-taiyabkhan/clock-in-pro" }],
    highlight: true,
  },
  {
    slug: "mummyhelp",
    number: "02",
    title: "MummyHelp",
    client: "Paid client · via Autostrata",
    year: "2025",
    role: "Solo full-stack engineer",
    category: "client",
    oneLiner: "Voice-activated SOS app with on-device wake-word and speaker verification.",
    summary:
      "A safety app for families where children can trigger emergency alerts hands-free with a wake phrase. Privacy-first architecture — no continuous cloud streaming.",
    tags: ["React Native", "Expo", "Node/Express", "Supabase", "Python FastAPI", "SpeechBrain", "Picovoice"],
    metrics: [
      { label: "Wake-word accuracy", value: "96.8%" },
      { label: "SOS delivery time", value: "3.5s" },
      { label: "Faster than baseline", value: "61%" },
      { label: "Crash-free sessions", value: "99.3%" },
    ],
    problem:
      "Parents wanted a way for children to summon help without unlocking a phone, swiping to an app, or shouting. The hard constraint: it had to work offline-first, on-device, without sending audio to the cloud constantly. Voice in the cloud is both a battery and a privacy disaster.",
    approach: [
      "On-device keyword spotting with Picovoice Porcupine for the wake phrase \"Hey MummyHelp\" — never sends audio off-device until triggered.",
      "Speaker verification with SpeechBrain ECAPA-TDNN embeddings via a Python FastAPI microservice, with 1.2-second verify time and cosine-similarity matching.",
      "5-sample voice enrolment during child registration; secure pipeline: Wake → Verify → Confirm → Alert.",
      "React Native (Expo) frontend, Node/Express backend, Supabase (Postgres) with Row Level Security.",
      "Production-grade backend: JWT auth, Helmet, rate limiting (100 req / 15 min), Docker containerisation, EAS Build for app store distribution.",
    ],
    stack: ["React Native", "Expo", "Node/Express", "Supabase", "Python FastAPI", "SpeechBrain ECAPA-TDNN", "Picovoice Porcupine", "Docker"],
    outcomes: [
      "SOS delivered in 3.5 seconds — 61% faster than the prototype baseline (was 9.0s).",
      "Wake-word accuracy 96.8%; speaker verification FAR 1.1%, FRR 2.4%.",
      "Push notification delivery rate: 98.4%.",
      "99.3% crash-free sessions across both iOS and Android builds.",
      "Daily-to-monthly active stickiness ~34%.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/data-professional-taiyabkhan/MummyHelpIA" }],
    highlight: true,
  },
  {
    slug: "heart-eco",
    number: "03",
    title: "HEART-Eco · HEART AI",
    client: "Paid client · via Autostrata",
    year: "2025–26",
    role: "Lead engineer · AI architecture",
    category: "client",
    oneLiner: "Agentic AI that turns an economic model into an interactive analyst.",
    summary:
      "A grounded AI agent that answers descriptive, perspective, diagnostic, and predictive questions about country-level economic performance — using proprietary data only, never the open web.",
    tags: ["Agentic AI", "RAG", "n8n", "GPT-5.1", "Next.js 14", "OpenAI Assistants", "Recharts"],
    metrics: [
      { label: "Forecast horizon", value: "2026–2030" },
      { label: "Tool routing", value: "Strict" },
      { label: "Source boundary", value: "Closed" },
    ],
    problem:
      "Professor Khurshid Ahmad had built the HEART Score Economic Model — a multi-pillar framework for country performance using Heart Value (HV) and Heart Affordability Ranking (HAR). The challenge: turn dense methodology and a sprawling dataset into something a non-economist could actually query, while preventing the AI from making things up or pulling from the open internet.",
    approach: [
      "Designed a two-model architecture: Model 1 on OpenAI Agent Builder for descriptive / perspective / diagnostic answers; Model 2 on n8n + GPT-5.1 for predictive forecasts grounded in ensemble ML output.",
      "Strict tool routing: numbers come from numeric master sheets only; methodology from doctrine docs; narrative from forecast commentary — preventing the model from improvising facts.",
      "Compiled a \"Source of Truth\" document so the agent could be grounded consistently rather than relying on sheet-based inputs.",
      "Built forecast transparency rules: years 2026–2030 are auto-labelled as forecasts with explicit fallback behaviour when narrative is missing.",
      "Restricted knowledge boundary in the system prompt — refuses unrelated queries and never uses web knowledge.",
      "Next.js 14 + TypeScript + Tailwind + Recharts dashboard, deployed on Vercel as part of the HeartEco product.",
    ],
    stack: ["n8n", "OpenAI GPT-5.1", "OpenAI Assistants", "Next.js 14", "TypeScript", "Tailwind", "Recharts", "Vercel"],
    outcomes: [
      "Live as part of the HeartEco product, used by the research team and in investor pitches.",
      "Two-model architecture cleanly separates explanatory and predictive workloads.",
      "Tool-routing controls eliminate the most common LLM failure mode: confidently wrong numbers.",
      "Investor-ready visuals (HEART pyramid schema) integrated into pitch materials.",
    ],
    links: [
      { label: "Live demo", href: "https://heart-eco.vercel.app" },
      { label: "GitHub", href: "https://github.com/data-professional-taiyabkhan/HEART-Eco" },
    ],
    highlight: true,
  },
  {
    slug: "sartorial-london",
    number: "04",
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
    number: "05",
    title: "Predicting EURO 2024 via Social Media Sentiment",
    client: "MSc Dissertation · Royal Holloway, University of London",
    year: "2024",
    role: "Researcher · sole author",
    category: "research",
    oneLiner: "The model with the worst benchmark score succeeded where the best one failed.",
    summary:
      "A peer-reviewed preprint comparing TF-IDF + Logistic Regression, VADER, a three-class LR, and a zero-shot LLM classifier for predicting football match outcomes from Twitter sentiment.",
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
      "Published as a peer-reviewed preprint on Zenodo.",
    ],
    links: [{ label: "Paper · DOI", href: "https://doi.org/10.5281/zenodo.19675434" }],
    highlight: true,
  },
  {
    slug: "nba-shot-analysis",
    number: "06",
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
    slug: "uk-sponsorship-map",
    number: "07",
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
    number: "08",
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
    number: "09",
    title: "Gurucool Recommendation System",
    client: "Gurucool XYZ Pvt Ltd",
    year: "2022–23",
    role: "Lead Data Analyst",
    category: "client",
    oneLiner: "Hybrid recommendation engine that lifted engagement 50% and cut churn 40%.",
    summary:
      "Led development of a Python-based hybrid recommendation system (collaborative + content-based filtering) for Gurucool's BITS short-form content feature. Co-authored a research paper on the methodology.",
    tags: ["Python", "Machine Learning", "Recommendation Systems", "Prompt Engineering"],
    metrics: [
      { label: "User engagement", value: "+50%" },
      { label: "Churn reduction", value: "−40%" },
      { label: "Customer lifetime value", value: "+15%" },
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
      "Engagement up 50%.",
      "Churn down 40%.",
      "Customer lifetime value up 15%.",
      "Research paper co-authored on the methodology.",
    ],
  },
  {
    slug: "alzheimers-mri",
    number: "10",
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
    stack: ["Python", "scikit-learn", "OpenCV", "Pandas"],
    outcomes: [
      "Achieved 84% accuracy and F1 = 0.80 on a held-out test set.",
      "Statistical analysis complemented the model output with population-level insights.",
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.highlight);
export const otherProjects = projects.filter((p) => !p.highlight);
