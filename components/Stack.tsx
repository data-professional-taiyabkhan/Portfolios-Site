"use client";

import { motion } from "framer-motion";

const stackGroups = [
  {
    label: "Data & ML",
    items: ["Python", "Pandas", "NumPy", "scikit-learn", "R", "ggplot2", "SQL", "XGBoost", "Random Forest", "Statistical Inference", "Time-Series"],
  },
  {
    label: "AI / LLMs",
    items: ["OpenAI API", "GPT-5.1", "Assistants API", "Claude (Anthropic)", "Prompt Engineering", "RAG", "n8n", "SpeechBrain", "Picovoice", "DeepFace", "OpenCV"],
  },
  {
    label: "BI & Viz",
    items: ["Power BI", "Tableau", "Google Data Studio", "Recharts", "Matplotlib", "Seaborn"],
  },
  {
    label: "Web & APIs",
    items: ["React 18", "Next.js 14", "TypeScript", "Node/Express", "FastAPI", "REST", "Tailwind", "shadcn/ui", "React Native (Expo)", "Stripe"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "BigQuery", "SQL Server", "Supabase", "Drizzle ORM"],
  },
  {
    label: "Cloud & DevOps",
    items: ["AWS", "GCP", "Vercel", "Railway", "Docker", "Replit", "GitHub Actions"],
  },
  {
    label: "Analytics",
    items: ["Google Analytics", "Google Tag Manager", "Microsoft Clarity", "Hotjar", "Supermetrics"],
  },
  {
    label: "Deep Learning",
    items: ["TensorFlow", "PyTorch", "Keras", "HuggingFace", "CNNs", "Computer Vision"],
  },
];

export default function Stack() {
  return (
    <section id="stack" className="relative py-32 md:py-40 px-6 md:px-10 bg-paper-deep/30">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-baseline gap-6 mb-12 md:mb-16">
          <span className="numeral text-display-md">iv.</span>
          <span className="eyebrow">Tech stack</span>
          <div className="flex-1 h-px bg-line" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-12 gap-8 mb-16"
        >
          <h2 className="md:col-span-7 font-display text-display-lg leading-[1.05]">
            The toolkit, <span className="italic">as honestly used</span>.
          </h2>
          <p className="md:col-span-4 md:col-start-9 text-ink-soft text-lg leading-relaxed self-end">
            No padding — these are the tools I&apos;ve actually shipped with in the last
            twelve months. Daily-driver tools at the top of each group.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {stackGroups.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="border-t border-line pt-6"
            >
              <div className="flex items-baseline justify-between mb-5">
                <h3 className="font-display text-2xl italic text-accent">{g.label}</h3>
                <span className="font-mono text-xs text-mute tabular-nums">
                  {String(i + 1).padStart(2, "0")}/{String(stackGroups.length).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((t) => (
                  <span
                    key={t}
                    className="text-sm px-3 py-1.5 border border-line rounded-full text-ink-soft bg-paper hover:bg-ink hover:text-paper hover:border-ink transition-colors duration-200 cursor-default"
                    data-cursor="hover"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
