"use client";

import { motion } from "framer-motion";
import { otherProjects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { FileText } from "lucide-react";

export default function Research() {
  const researchAndAnalysis = otherProjects.filter(
    (p) => p.category === "research" || p.category === "analysis" || p.category === "tool"
  );

  return (
    <section id="research" className="relative py-32 md:py-40 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-baseline gap-6 mb-12 md:mb-16">
          <span className="numeral text-display-md">iii.</span>
          <span className="eyebrow">Research &amp; analysis</span>
          <div className="flex-1 h-px bg-line" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-12 gap-8 mb-12"
        >
          <h2 className="md:col-span-7 font-display text-display-lg leading-[1.05]">
            Things I made because <span className="italic">I couldn&apos;t stop</span> thinking
            about them.
          </h2>
          <p className="md:col-span-4 md:col-start-9 text-ink-soft text-lg leading-relaxed self-end">
            Published research, personal data stories, and tools I built to solve problems
            I was experiencing. The work that doesn&apos;t fit on a CV bullet point.
          </p>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border-y border-line py-12 md:py-20 mb-12 grid md:grid-cols-12 gap-6"
        >
          <div className="md:col-span-1 hidden md:block">
            <FileText className="w-6 h-6 text-accent mt-3" />
          </div>
          <blockquote className="md:col-span-10 font-display text-display-md text-ink leading-[1.15]">
            &ldquo;The model with the <span className="italic text-accent">worst</span>{" "}
            benchmark score succeeded where the best benchmark model failed. Because 79%
            of football tweets are actually neutral — and the binary classifier forced all
            of them into &lsquo;positive&rsquo; or &lsquo;negative&rsquo;, burying the real signal.&rdquo;
          </blockquote>
          <figcaption className="md:col-span-10 md:col-start-2 text-mute text-sm mt-6">
            From <em>Predictive Power of Social Media</em>, my MSc dissertation, now a
            peer-reviewed preprint on Zenodo.
          </figcaption>
        </motion.figure>

        <div>
          {researchAndAnalysis.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
