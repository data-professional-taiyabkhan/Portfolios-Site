"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { CaseStudyModal } from "./ProjectCard";
import { focusAgentStage } from "@/lib/focus-agent-stage";

// Per the landing-v2 brief: Weft Passport leads ("New · 2026"), then Sartorial London,
// HEART, Clock-in Pro, MummyHelp, EURO 2024 — an explicit slug order, not just `highlight`.
const WORK_SLUGS = ["weft-passport", "sartorial-london", "heart-eco", "clock-in-pro", "mummyhelp", "euro-2024-paper"];
const NEW_SLUGS = new Set(["weft-passport"]);

const workCards = WORK_SLUGS.map((slug) => projects.find((p) => p.slug === slug)!);

export default function Work() {
  return (
    <section id="work" className="relative py-24 md:py-32 px-6 md:px-10 bg-ink text-[#E9E4DA]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <span className="eyebrow block mb-2.5 !text-[#8B93A1]">02 — Selected work</span>
          <h2 className="font-display font-extrabold text-display-lg text-[#F3EFE6]">
            Shipped, deployed, measured.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {workCards.map((project, i) => (
            <WorkCard key={project.slug} project={project} isNew={NEW_SLUGS.has(project.slug)} delay={i * 0.06} />
          ))}
        </div>

        <div className="mt-[34px] text-center">
          <button
            type="button"
            onClick={focusAgentStage}
            className="font-mono text-[0.74rem] tracking-[0.12em] uppercase text-signal border-b border-signal pb-[3px]"
          >
            All eleven projects — or just ask the agent ↑
          </button>
        </div>
      </div>
    </section>
  );
}

function WorkCard({
  project,
  isNew,
  delay,
}: {
  project: (typeof workCards)[number];
  isNew: boolean;
  delay: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="border border-line-dark rounded-2xl p-6 bg-ink-2 flex flex-col gap-3 transition-colors hover:border-signal"
      >
        <span className="font-mono text-[0.62rem] tracking-[0.14em] uppercase text-[#8B93A1]">
          {isNew ? <b className="text-signal font-medium">New · 2026</b> : project.year}
          {isNew && " · Paid engagement"}
        </span>
        <h3 className="font-display font-semibold text-xl text-[#F3EFE6]">{project.title}</h3>
        <p className="text-[0.88rem] text-[#B9BFC9] flex-1">{project.oneLiner}</p>

        {project.metrics && project.metrics.length > 0 && (
          <div className="flex gap-[18px] flex-wrap border-t border-line-dark pt-3.5">
            {project.metrics.slice(0, 3).map((m) => (
              <div key={m.label}>
                <b className="block font-display font-extrabold text-[1.22rem] text-signal">{m.value}</b>
                <span className="font-mono text-[0.56rem] tracking-[0.1em] uppercase text-[#8B93A1]">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-1 text-left text-sm font-medium text-[#E9E4DA] underline decoration-signal/40 underline-offset-4 hover:decoration-signal"
        >
          Read case study →
        </button>
      </motion.div>

      <CaseStudyModal project={project} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
