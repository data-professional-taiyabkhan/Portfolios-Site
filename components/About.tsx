"use client";

import { motion } from "framer-motion";

const facts = [
  { label: "Education", value: "MSc Data Science & Analytics, Merit — Royal Holloway" },
  { label: "Research", value: "Preprint · Zenodo" },
  { label: "Paid builds", value: "7 paid builds delivered via Autostrata" },
  { label: "Visa", value: "Right to work in the UK (Graduate Visa to Jan 2027)" },
  { label: "Base", value: "Egham, Surrey, UK" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <span className="eyebrow block mb-2.5">04 — The human behind it</span>
          <h2 className="font-display font-extrabold text-display-lg">Delhi → London → production.</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="grid min-[821px]:grid-cols-[1.3fr_1fr] gap-11 items-start"
        >
          <div>
            <p className="text-[1.02rem] text-ink-soft max-w-[560px]">
              I started in Delhi, learning data and ML between IIT Madras and Jamia Millia
              Islamia. Moved to London in 2023 for an MSc at Royal Holloway — and stayed to
              build.
            </p>
            <p className="mt-4 text-[1.02rem] text-ink-soft max-w-[560px]">
              Today I split my time between delivery work through Autostrata, original
              research, and data stories nobody asked for but I couldn&apos;t stop thinking
              about. Everything on this site is a live deployment, not a mockup.
            </p>
          </div>

          <div className="border border-ink rounded-2xl overflow-hidden shadow-[5px_5px_0_theme(colors.ink)]">
            {facts.map((f) => (
              <div
                key={f.label}
                className="flex justify-between gap-3.5 px-[18px] py-3.5 text-[0.86rem] bg-paper border-t border-line first:border-t-0"
              >
                <span className="font-mono text-[0.66rem] tracking-[0.1em] uppercase text-mute pt-0.5">
                  {f.label}
                </span>
                <span className="font-medium text-right">{f.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
