"use client";

import { motion } from "framer-motion";
import { featuredProjects, otherProjects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export default function Work() {
  const clientWork = otherProjects.filter((p) => p.category === "client");

  return (
    <section id="work" className="relative py-32 md:py-40 px-6 md:px-10 bg-paper-deep/20">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-baseline gap-6 mb-12 md:mb-16">
          <span className="numeral text-display-md">ii.</span>
          <span className="eyebrow">Selected work</span>
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
            Things I&apos;ve <span className="italic text-accent">actually</span> shipped.
          </h2>
          <p className="md:col-span-4 md:col-start-9 text-ink-soft text-lg leading-relaxed self-end">
            Real projects with real clients, paying real money. Every metric below comes
            from a live deployment, not a demo.
          </p>
        </motion.div>

        <div>
          {featuredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>

        {clientWork.length > 0 && (
          <div className="mt-20">
            <p className="eyebrow mb-8">Earlier client work</p>
            {clientWork.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
