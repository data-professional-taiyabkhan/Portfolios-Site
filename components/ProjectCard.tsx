"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="group border-b border-line py-10 md:py-14"
      >
        <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-1">
            <span className="numeral text-2xl md:text-3xl">{project.number}</span>
          </div>

          <div className="md:col-span-7">
            <div className="flex flex-wrap items-baseline gap-3 mb-3">
              <h3 className="font-display text-3xl md:text-5xl text-ink group-hover:text-accent transition-colors duration-500">
                {project.title}
              </h3>
              <span className="text-mute text-sm">— {project.year}</span>
            </div>
            <p className="text-mute text-sm mb-4">{project.client}</p>
            <p className="text-lg md:text-xl text-ink-soft leading-relaxed mb-6 max-w-2xl">
              {project.oneLiner}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.slice(0, 5).map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-3 py-1 border border-line rounded-full text-mute bg-paper-deep/30"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <button
                onClick={() => setOpen(true)}
                className="group/btn flex items-center gap-2 text-ink font-medium link"
              >
                Read case study
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
              {project.links?.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-sm text-mute hover:text-accent transition-colors"
                >
                  {l.label.toLowerCase().includes("github") ? (
                    <Github className="w-3.5 h-3.5" />
                  ) : (
                    <ExternalLink className="w-3.5 h-3.5" />
                  )}
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <div className="md:col-span-4 md:col-start-9">
              <div className="grid grid-cols-2 gap-px bg-line border border-line rounded-2xl overflow-hidden">
                {project.metrics.slice(0, 4).map((m, i) => (
                  <div key={i} className="bg-paper p-4">
                    <div className="font-display text-2xl text-ink leading-tight">{m.value}</div>
                    <div className="text-xs text-mute mt-1 leading-tight">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.article>

      <CaseStudyModal project={project} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export function CaseStudyModal({
  project,
  open,
  onClose,
}: {
  project: Project;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 inset-y-8 md:inset-x-12 md:inset-y-16 lg:inset-x-32 lg:inset-y-12 bg-paper rounded-3xl z-50 overflow-hidden border border-line shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-line">
              <div className="flex items-baseline gap-4">
                <span className="numeral text-xl">{project.number}</span>
                <span className="eyebrow">Case study</span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-line flex items-center justify-center hover:bg-ink hover:text-paper transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto px-6 md:px-12 py-10 md:py-14 no-scrollbar">
              <div className="max-w-3xl mx-auto">
                <p className="eyebrow mb-4">{project.client} · {project.year} · {project.role}</p>
                <h2 className="font-display text-display-lg text-ink mb-6 leading-tight">
                  {project.title}
                </h2>
                <p className="text-xl text-ink-soft leading-relaxed mb-10">
                  {project.summary}
                </p>

                {project.metrics && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden mb-14">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="bg-paper p-5">
                        <div className="font-display text-3xl text-ink leading-tight">{m.value}</div>
                        <div className="text-xs text-mute mt-1.5">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                <Section title="The problem" body={project.problem} />
                <Section title="Approach" list={project.approach} />
                <Section title="Stack" tags={project.stack} />
                <Section title="Outcomes" list={project.outcomes} />

                {project.links && project.links.length > 0 && (
                  <div className="mt-12 flex flex-wrap gap-4">
                    {project.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-paper rounded-full hover:bg-accent transition-colors"
                      >
                        {l.label} <ArrowUpRight className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Section({
  title,
  body,
  list,
  tags,
}: {
  title: string;
  body?: string;
  list?: string[];
  tags?: string[];
}) {
  const hasBody = Boolean(body);
  const hasList = Boolean(list && list.length > 0);
  const hasTags = Boolean(tags && tags.length > 0);

  if (!hasBody && !hasList && !hasTags) return null;

  return (
    <div className="mb-12">
      <h3 className="eyebrow mb-4">{title}</h3>
      {hasBody && <p className="text-lg text-ink-soft leading-relaxed">{body}</p>}
      {hasList && (
        <ul className="space-y-3">
          {list!.map((item, i) => (
            <li key={i} className="text-lg text-ink-soft leading-relaxed flex gap-3">
              <span className="text-accent font-mono text-sm mt-1.5">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      {hasTags && (
        <div className="flex flex-wrap gap-2">
          {tags!.map((t) => (
            <span
              key={t}
              className="text-xs font-mono px-3 py-1 border border-line rounded-full text-ink-soft bg-paper-deep/30"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
