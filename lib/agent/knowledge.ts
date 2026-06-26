// Knowledge base for Taiyab's portfolio AI agent.
// Hand-curated facts. Update these to update what the agent knows.
// IMPORTANT: never include anything the AI shouldn't say — this is its closed knowledge boundary.

export const PROFILE = {
  fullName: "Mohammad Taiyab Khan",
  shortName: "Taiyab",
  title: "Data & AI Engineer",
  location: "Egham, Surrey, UK",
  origin: "Born in New Delhi, India. Moved to the UK in 2023 for postgrad study.",
  visa: "UK Graduate Visa, valid until January 2027. Open to UK Skilled Worker sponsorship.",
  email: "mohammadtaiyabkhan21@gmail.com",
  linkedin: "https://www.linkedin.com/in/khanmohdtaiyab/",
  github: "https://github.com/data-professional-taiyabkhan",
  company: "Autostrata.ai — UK AI consultancy he co-founded in 2025",
  oneLiner: "I build AI products that move from idea → demo → deployed.",
  availability:
    "Currently available for full-time data, ML, or AI engineering roles in the UK (sponsor-licensed companies), and for freelance / contract work via Autostrata.",
  responseTime: "Usually replies within 24 hours.",
};

export const EDUCATION = [
  {
    degree: "MSc Data Science & Analytics",
    grade: "Merit",
    institution: "Royal Holloway, University of London",
    years: "2023–2024",
    notes:
      "Modules: Machine Learning, Online Machine Learning, Large-Scale Data Storage & Processing (Spark, HDFS), Data Visualisation & Exploratory Analysis, Databases, Ethical Issues in AI. Dissertation on football sentiment analysis (supervised by Prof. Daniel O'Keeffe), later published as a peer-reviewed preprint on Zenodo.",
  },
  {
    degree: "Diploma in Data Science",
    grade: "First Division, 7.6 CGPA",
    institution: "Indian Institute of Technology (IIT) Madras",
    years: "2021–2023",
    notes: "Foundational programming + ML modules. Capstone on shopper behaviour modelling.",
  },
  {
    degree: "BSc Computer Science & Mathematics",
    grade: "First Division, 8.28 CGPA",
    institution: "Jamia Millia Islamia, New Delhi",
    years: "2020–2023",
    notes:
      "Modules: Database Management Systems, Data Structures, Probability & Statistics. Final project: Alzheimer's detection from MRI scans, 84% accuracy.",
  },
];

export const EXPERIENCE = [
  {
    role: "Co-Founder & Data/AI Engineer",
    company: "Autostrata.ai",
    period: "May 2025 – Present",
    location: "Egham, UK",
    summary:
      "UK AI consultancy he co-founded. Ships marketplaces, payment infrastructure, and AI agents for founders and SMBs. Eight paid clients to date including Clock-in Pro, MummyHelp, HEART-Eco, Sartorial London, and others.",
  },
  {
    role: "AI Content Analyst (Contract)",
    company: "Outlier",
    period: "Jan 2024 – Mar 2024",
    location: "London, UK",
    summary:
      "Evaluated AI-generated outputs for factual accuracy, domain relevance, and quality across STEM content pipelines. Contributed to RLHF-style annotation workflows used to train downstream LLMs.",
  },
  {
    role: "Data Analyst",
    company: "Gurucool XYZ Pvt Ltd",
    period: "Jan 2022 – Aug 2023",
    location: "New Delhi, India",
    summary:
      "Led a hybrid recommendation system (collaborative + content-based filtering) that increased user engagement 50% and reduced churn 40%. Integrated OpenAI GPT API for in-app Q&A during the early ChatGPT era. Built Power BI dashboards for senior management.",
  },
];

export const PROJECTS = [
  {
    name: "Clock-in Pro",
    type: "Paid client project (via Autostrata)",
    year: "2026",
    oneLiner:
      "Face-verified, GPS-geofenced attendance platform for a 45-employee operation across 3 sites.",
    stack:
      "React/TypeScript, Node/Express, PostgreSQL with Drizzle ORM, Python microservice with DeepFace and OpenCV. Deployed on Replit/Railway.",
    metrics: [
      "Fake clock-ins reduced 83% (12 → 2 per month)",
      "Payroll adjustments reduced 72% (7.5% → 2.1%)",
      "99.6% uptime",
      "98.3% face verification accuracy",
      "Saved ~4.5 admin hours per week",
    ],
    link: "https://github.com/data-professional-taiyabkhan/clock-in-pro",
  },
  {
  name: "Weft Passport",
  type: "Paid client project (via Autostrata)",
  year: "2026",
  oneLiner:
    "A SKU-level textile-provenance and compliance platform for handwoven South Asian textiles.",
  description:
    ["A SKU-level textile-provenance and compliance platform for handwoven South Asian textiles. Brands record an item's artisan, loom, place and photos, an admin certifies the batch, and the system produces a public QR provenance page for shoppers plus a regulator-ready compliance record. Built to meet incoming EU rules (ECGT, Digital Product Passport) and the UK Green Claims Code.",
    "Multi-tenant model: artisan → loom → batch → SKU, with admin / brand / coordinator roles",
    "Public consumer passport readable by anonymous visitors via Postgres RLS",
    "Full batch lifecycle wired: capture → submit → certify",],
  metrics: [
    "End-to-end loop working: a batch captured in the field becomes a scannable public provenance page plus a compliance record.",
    "Built thin and standard by design — the client's moat is its field methodology and dataset, not the software layer.",
  ],
  links: [{ label: "GitHub", href: "https://github.com/data-professional-taiyabkhan/weft-passport" }],
  stack: "Next.js 14 + TypeScript + Supabase (Postgres, Auth, Row-Level Security), deployed on Vercel",
  },
  {
  name: "Clarivance AI",
  type: "Paid client project (via Autostrata)",
  year: "2026",
  oneLiner:
    "The production marketing site and secure waitlist backend for a pre-launch UK tax-automation fintech, plus a full audit of its AI-generated codebase.",
  description: [
    "A marketing and waitlist site for a pre-launch UK fintech building AI cash-flow forecasting and HMRC Making Tax Digital automation. The product engine itself is not yet built — Taiyab delivered the site, the waitlist backend, and the audit, and scoped the HMRC integration for the product phase.",
    "Built on React 19 + TanStack Start with server-side rendering and route pre-rendering.",
    "Server-side serverless waitlist (Vercel Functions to Airtable) so the API token never reaches the browser.",
    "Audited the AI-generated (Lovable) codebase end-to-end; fixed build, routing and configuration issues and corrected a stale MTD regulatory timeline in the content.",
    "Scoped the HMRC Making Tax Digital API integration: OAuth2 via Government Gateway plus mandatory fraud-prevention headers — designed but not yet built.",
  ],
  metrics: [
    "Built on a modern, extensible stack (React 19 + TanStack Start, Tailwind v4, shadcn/ui).",
    "HMRC MTD filing is a regulated integration scoped for the product phase, not a shipped website feature.",
  ],
  links: [
    { label: "Live site", href: "https://clarivanceai.co.uk" },
    { label: "GitHub", href: "https://github.com/data-professional-taiyabkhan/clarivance-ai" },
  ],
  stack:
    "React 19 + TanStack Start (SSR + pre-render), Tailwind v4, shadcn/ui, TypeScript; serverless waitlist on Vercel Functions → Airtable",
  },
  {
    name: "MummyHelp",
    type: "Paid client project (via Autostrata)",
    year: "2025",
    oneLiner:
      "Voice-activated SOS app where children can summon emergency help hands-free with a wake phrase.",
    stack:
      "React Native/Expo frontend, Node/Express backend, Supabase with Row Level Security, Python FastAPI microservice running SpeechBrain ECAPA-TDNN for speaker verification, Picovoice Porcupine for on-device wake-word detection.",
    metrics: [
      "Wake-word accuracy 96.8%",
      "SOS delivery 3.5s (61% faster than baseline)",
      "Speaker verification FAR 1.1% / FRR 2.4%",
      "99.3% crash-free sessions",
      "Privacy-first: no continuous cloud streaming",
    ],
    link: "https://github.com/data-professional-taiyabkhan/MummyHelpIA",
  },
  {
    name: "HEART-Eco / HEART AI",
    type: "Paid client project (via Autostrata)",
    year: "2025–26",
    oneLiner:
      "Agentic AI that turns Professor Khurshid Ahmad's HEART Score Economic Model into an interactive analyst. Same architectural pattern as this portfolio's AI assistant.",
    stack:
      "Two-model architecture. Model 1: OpenAI Agent Builder for descriptive/perspective/diagnostic queries, deployed on Vercel as part of the HeartEco dashboard. Model 2: n8n workflow + GPT-5.1 for predictive forecasts grounded in ensemble ML output. Strict tool routing — numbers come from numeric master sheets only, methodology from doctrine docs, narrative from forecast commentary. Closed knowledge boundary: never uses web knowledge. Next.js 14 + TypeScript + Tailwind + Recharts dashboard.",
    metrics: [
      "Forecast horizon: 2026–2030 country projections",
      "Strict tool routing prevents the AI from improvising facts",
      "Two-model architecture cleanly separates explanatory and predictive workloads",
      "Live as part of the HeartEco product, used in investor pitches",
    ],
    link: "https://heart-eco.vercel.app",
  },
  {
    name: "Sartorial London",
    type: "Paid client project (via Autostrata)",
    year: "2025-26",
    oneLiner:
      "Custom Sharetribe Flex marketplace for designer outfit rentals with fixed 5-day windows and Stripe security-deposit flow.",
    stack: "Sharetribe Flex, Stripe Payments, React, Node/Express (TypeScript), Tailwind.",
    metrics: [
      "Fixed 5-day rental enforcement with auto-calculated end dates",
      "Stripe pre-authorisation flow for security deposits with auto-capture before the 7-day limit",
      "Featured Fits dynamic carousel pulling latest listings via Sharetribe API",
      "Custom transaction states: Sent / Customer Received / Customer Returned",
      "Pricing logic unified: (Daily Price × 5) + Shipping Fee for all rentals",
    ],
    link: null,
  },
  {
    name: "Predicting EURO 2024 via Social Media Sentiment",
    type: "MSc Dissertation, preprint on Zenodo",
    year: "2024",
    oneLiner:
      "The model with the worst benchmark score succeeded where the best benchmark model failed. Demonstrates that benchmark accuracy and domain sensitivity measure different things.",
    stack:
      "Python, scikit-learn, VADER, Claude Haiku via Anthropic API, TweetEval. Tested four classifiers: TF-IDF + Logistic Regression, VADER, three-class LR, and a zero-shot LLM with a football-aware prompt.",
    metrics: [
      "TF-IDF + LR: 86% accuracy, AUC 0.927 — strong on benchmarks",
      "But couldn't detect win-day vs loss-day sentiment shift: p = 0.104",
      "Only the LLM (Claude Haiku) detected the genuine shift: t = 2.52, p = 0.012",
      "79% of football tweets are factually neutral — binary classifiers force them into positive/negative, burying signal",
    ],
    link: "https://doi.org/10.5281/zenodo.19675434",
  },
  {
    name: "NBA Shot Selection Shift Analysis",
    type: "Personal research / data storytelling",
    year: "2025",
    oneLiner:
      "29-season analysis of NBA shot selection. The modern NBA hasn't just shifted to more threes — it's restructured the entire shot chart.",
    stack: "Python (pandas, nba_api), Matplotlib, Canva for infographic.",
    metrics: [
      "24+ ft attempt share: 10.6% → 41.9% over 29 seasons (+31.2 pp)",
      "16–24 ft attempt share collapsed: 25.0% → 4.8% (−20.2 pp)",
      "8–16 ft FG% rose: 40.2% → 44.4% (+4.2 pp) — efficiency rose while volume fell",
    ],
    link: null,
  },
  {
    name: "UK Visa Sponsorship Companies Map",
    type: "Open-source tool",
    year: "2024",
    oneLiner:
      "Interactive map of UK companies holding Skilled Worker sponsor licences. Built to help international students find employers who can actually sponsor them.",
    stack: "Python, Flask, Leaflet.js, Google Maps API, GCP geocoding, Pandas.",
    metrics: [
      "3,674 LinkedIn impressions on the launch post",
      "Used by other international students in the UK",
    ],
    link: "https://github.com/data-professional-taiyabkhan/UKSponsershipCompany",
  },
  {
    name: "AAPL Multi-Horizon Risk Analysis",
    type: "Personal research, finance module spin-out",
    year: "2025",
    oneLiner:
      "10-year study separating return volatility from estimator uncertainty across 1m, 3m, 6m, and yearly horizons.",
    stack: "Excel, Google Sheets, time-series modelling, statistical inference.",
    metrics: [
      "Documented when 'risk' means volatility vs estimator uncertainty",
      "Mapped each risk metric to the specific question it answers",
      "Public write-up shared on LinkedIn",
    ],
    link: null,
  },
  {
    name: "Gurucool Recommendation System",
    type: "Industry work (Gurucool XYZ Pvt Ltd)",
    year: "2022–23",
    oneLiner:
      "Hybrid recommendation engine (collaborative + content-based) for short-form educational content.",
    stack: "Python, Pandas, scikit-learn, OpenAI API (Davinci, Babbage, Ada, GPT-3.5 Turbo), Power BI.",
    metrics: [
      "User engagement +50%",
      "Customer churn −40%",
      "Customer lifetime value +15%",
      "Co-authored a research paper on the methodology",
    ],
    link: null,
  },
  {
    name: "Alzheimer's Detection from Brain Scans",
    type: "BSc Final Project (Jamia Millia Islamia)",
    year: "2023",
    oneLiner: "ML classifier with computer vision techniques on MRI brain scan imagery.",
    stack: "Python, scikit-learn, OpenCV, Pandas.",
    metrics: ["84% accuracy", "F1 = 0.80"],
    link: null,
  },
];

export const TECH_STACK = {
  "Data & ML":
    "Python (Pandas, NumPy, scikit-learn, Matplotlib, Seaborn), R (ggplot2, dplyr), SQL, XGBoost, AdaBoost, Random Forest, Logistic Regression, K-Means, statistical inference, confidence intervals, A/B testing, time-series analysis",
  "AI / LLMs":
    "OpenAI API (GPT-3.5/4/5.1, Assistants API), Claude (Anthropic), prompt engineering, RAG patterns, n8n automations, agentic workflows with strict tool routing, SpeechBrain ECAPA-TDNN, Picovoice Porcupine (KWS)",
  "Deep Learning": "TensorFlow, PyTorch, Keras, HuggingFace Transformers, CNNs, computer vision (DeepFace, OpenCV)",
  "BI & Visualisation": "Power BI, Tableau, Google Data Studio, Recharts, Matplotlib, Seaborn, ggplot2",
  "Big Data / ETL": "PySpark, MLlib, Hadoop HDFS, ETL pipeline design, BeautifulSoup web scraping",
  "Web & APIs":
    "React 18, Next.js 14, Node.js/Express, FastAPI, REST APIs, Tailwind CSS, shadcn/ui, React Native (Expo), Stripe",
  Databases: "PostgreSQL, BigQuery, SQL Server, Supabase, Drizzle ORM, MongoDB (basic)",
  "Cloud & DevOps": "AWS (basic), Google Cloud Platform, Vercel, Railway, Docker, Replit, GitHub Actions",
  "Analytics tools":
    "Google Analytics, Google Tag Manager, Microsoft Clarity, Hotjar, Supermetrics, Meta Analytics",
};

export const SOFT_FACTS = {
  workingStyle:
    "Solo full-stack delivery. Comfortable owning a project from prototype to production. Splits time between client delivery, original research, and personal data stories.",
  voice:
    "Honest about what works and what doesn't. Tends to lead with the failure or surprising finding before the success. Writes data stories that read like blog posts, not academic papers.",
  philosophy:
    "Cares about whether the model answers the real question, not just the benchmark question. The EURO 2024 dissertation is a worked example of this.",
  notes: [
    "Built the AI assistant you are currently chatting to using the same architectural pattern as the HEART AI he built for a paid client — closed knowledge boundary, strict tool routing, never uses web knowledge.",
    "Authored the EURO 2024 sentiment analysis paper as sole author. Published on Zenodo with DOI 10.5281/zenodo.19675434.",
    "Has shipped 6 paid client projects via Autostrata as of late 2025.",
  ],
};

export function buildKnowledgeContext(): string {
  let out = `## Mohammad Taiyab Khan — Profile\n\n`;
  out += `**Full name:** ${PROFILE.fullName} (goes by Taiyab)\n`;
  out += `**Current role:** ${PROFILE.title}\n`;
  out += `**Location:** ${PROFILE.location}\n`;
  out += `**Origin:** ${PROFILE.origin}\n`;
  out += `**Visa status:** ${PROFILE.visa}\n`;
  out += `**Company:** ${PROFILE.company}\n`;
  out += `**Signature line:** ${PROFILE.oneLiner}\n`;
  out += `**Availability:** ${PROFILE.availability}\n`;
  out += `**Contact:** ${PROFILE.email}\n\n`;

  out += `## Education\n\n`;
  EDUCATION.forEach((e) => {
    out += `- **${e.degree}** (${e.grade}) — ${e.institution}, ${e.years}. ${e.notes}\n`;
  });
  out += `\n## Experience\n\n`;
  EXPERIENCE.forEach((e) => {
    out += `- **${e.role}** at ${e.company} (${e.period}, ${e.location}). ${e.summary}\n`;
  });

  out += `\n## Projects\n\n`;
  PROJECTS.forEach((p) => {
    out += `### ${p.name} (${p.year})\n`;
    out += `*${p.type}*\n\n`;
    out += `${p.oneLiner}\n\n`;
    out += `**Stack:** ${p.stack}\n\n`;
    out += `**Outcomes:**\n`;
    p.metrics.forEach((m) => (out += `- ${m}\n`));
    if (p.link) out += `\n**Link:** ${p.link}\n`;
    out += `\n`;
  });

  out += `## Technical Stack\n\n`;
  Object.entries(TECH_STACK).forEach(([cat, items]) => {
    out += `**${cat}:** ${items}\n\n`;
  });

  out += `## How Taiyab works\n\n`;
  out += `**Working style:** ${SOFT_FACTS.workingStyle}\n\n`;
  out += `**Voice:** ${SOFT_FACTS.voice}\n\n`;
  out += `**Philosophy:** ${SOFT_FACTS.philosophy}\n\n`;
  out += `**Notes:**\n`;
  SOFT_FACTS.notes.forEach((n) => (out += `- ${n}\n`));

  return out;
}
