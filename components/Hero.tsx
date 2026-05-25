"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ArrowDownRight, MapPin } from "lucide-react";

const STAGES = ["idea", "demo", "deployed"];

export default function Hero() {
  const [activeStage, setActiveStage] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  useEffect(() => {
    const id = setInterval(() => setActiveStage((s) => (s + 1) % STAGES.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] flex flex-col justify-between pt-32 pb-12 px-6 md:px-10 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/3 left-0 right-0 h-px bg-line opacity-50" />
        <div className="absolute top-2/3 left-0 right-0 h-px bg-line opacity-30" />
      </div>

      <motion.div style={{ opacity, y }} className="relative z-10 max-w-[1400px] w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-between flex-wrap gap-4 mb-10 md:mb-16"
        >
          <span className="eyebrow flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-moss animate-pulse" />
            Available · Egham, Surrey · UK 
          </span>
          <span className="eyebrow flex items-center gap-1.5">
            <MapPin className="w-3 h-3" /> Egham · Surrey · UK
          </span>
        </motion.div>

        <div className="space-y-2 md:space-y-1">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="font-display text-display-xl"
          >
            Mohammad
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="font-display text-display-xl italic text-accent"
          >
            Taiyab Khan.
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12 md:mt-20 flex items-baseline gap-3 md:gap-6 flex-wrap"
        >
          <span className="eyebrow">I build AI products that move from</span>
          <div className="flex items-baseline gap-3 md:gap-6">
            {STAGES.map((stage, i) => (
              <div key={stage} className="flex items-baseline gap-3">
                <span
                  className={`font-display text-display-md transition-all duration-700 ${
                    activeStage === i ? "text-ink scale-100" : "text-mute/40 scale-95"
                  }`}
                >
                  {stage}
                </span>
                {i < STAGES.length - 1 && <span className="text-mute text-2xl">→</span>}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-14 md:mt-24 grid md:grid-cols-12 gap-6 items-end"
        >
          <p className="md:col-span-6 text-lg md:text-xl text-ink-soft leading-relaxed max-w-2xl">
            Data &amp; AI Engineer. Co-Founder at{" "}
            <a href="https://autostrata.ai" target="_blank" rel="noreferrer" className="text-accent link">
              Autostrata.ai
            </a>
            . Royal Holloway MSc, Merit. Published researcher. Currently shipping ML and full-stack products for paid clients.
          </p>
          <p className="mt-4 text-sm text-mute flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-moss animate-pulse" />
            Got a question? Try the <span className="text-accent font-medium">AI version of me</span> in the corner ↘
          </p>
          <div className="md:col-span-6 md:col-start-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-end">
            <a
              href="#work"
              className="group flex items-center gap-2 px-6 py-3 bg-ink text-paper rounded-full hover:bg-accent transition-colors duration-300"
            >
              View work
              <ArrowDownRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
            </a>
            <a
              href="#contact"
              className="group flex items-center gap-2 px-6 py-3 border border-ink rounded-full hover:bg-ink hover:text-paper transition-colors duration-300"
            >
              Get in touch
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="relative z-10 flex items-center justify-between max-w-[1400px] mx-auto w-full mt-10"
      >
        <span className="eyebrow">Scroll</span>
        <span className="eyebrow tabular-nums">©{new Date().getFullYear()} · Folio v1.0</span>
      </motion.div>
    </section>
  );
}
