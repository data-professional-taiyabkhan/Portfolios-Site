"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { CaseStudyModal } from "./ProjectCard";

const QUEST_SLUGS = ["nba-shot-analysis", "uk-sponsorship-map", "aapl-risk-analysis", "alzheimers-mri"];
const quests = QUEST_SLUGS.map((slug) => projects.find((p) => p.slug === slug)!);
const euro = projects.find((p) => p.slug === "euro-2024-paper")!;

export default function SideQuests() {
  return (
    <section id="quests" className="relative py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <span className="eyebrow block mb-2.5">03 — Research &amp; side quests</span>
          <h2 className="font-display font-extrabold text-display-lg">
            Things I couldn&apos;t stop thinking about.
          </h2>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display font-semibold text-[clamp(1.05rem,1.9vw,1.4rem)] leading-[1.4] max-w-[760px] text-ink border-l-[3px] border-signal pl-[22px] mb-3.5"
        >
          &ldquo;{euro.oneLiner} — because 79% of football tweets are actually neutral, and
          the binary classifier buried the real signal.&rdquo;
        </motion.blockquote>
        <span className="block font-mono text-[0.64rem] tracking-[0.1em] uppercase text-mute pl-[25px] mb-11">
          From my MSc dissertation, now a preprint on Zenodo
        </span>

        <div>
          {quests.map((project, i) => (
            <QuestRow key={project.slug} project={project} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}

function QuestRow({ project, delay }: { project: (typeof quests)[number]; delay: number }) {
  const [open, setOpen] = useState(false);
  const metric = project.metrics?.[0];

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="w-full text-left grid grid-cols-1 min-[821px]:grid-cols-[74px_1.1fr_1.4fr_auto] gap-1 min-[821px]:gap-[18px] items-baseline py-[17px] px-1.5 border-t border-line last:border-b transition-colors hover:bg-paper-deep"
      >
        <span className="font-mono text-[0.66rem] text-mute">{project.year}</span>
        <h3 className="font-display font-semibold text-[1.05rem]">{project.title}</h3>
        <p className="text-[0.86rem] text-ink-soft">{project.oneLiner}</p>
        {metric && (
          <span className="font-mono text-[0.72rem] text-ink text-left min-[821px]:text-right whitespace-nowrap">
            {metric.label} <b className="text-signal font-medium">{metric.value}</b>
          </span>
        )}
      </motion.button>

      <CaseStudyModal project={project} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
