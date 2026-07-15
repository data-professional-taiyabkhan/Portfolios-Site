"use client";

import { motion } from "framer-motion";
import { focusAgentStage } from "@/lib/focus-agent-stage";
import AgentStage from "./AgentStage";

export default function Hero() {
  return (
    <header id="top" className="relative pt-32 pb-8 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 min-[1020px]:grid-cols-[5fr_6fr] gap-10 min-[1020px]:gap-14 items-center">
          {/* left column */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="eyebrow inline-flex items-center gap-2 mb-6"
            >
              <span className="inline-flex items-center gap-1.5 text-moss">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-moss" />
                Available for work
              </span>
              <span>&nbsp;·&nbsp; Egham · Surrey · UK</span>
            </motion.span>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-fit mb-8"
            >
              <span
                aria-hidden
                className="absolute -top-[11px] left-1/2 -translate-x-1/2 rotate-[2deg] w-[86px] h-6 bg-signal/30 border-x border-dashed border-ink/15 z-10"
              />
              <figure className="relative w-[218px] bg-[#FDFCF8] p-2.5 pb-3.5 border border-line shadow-[0_14px_34px_-12px_rgba(16,21,28,0.35)] rotate-[-2.4deg] transition-transform duration-300 hover:rotate-[-0.6deg]">
                <img
                  src="/portrait.jpg"
                  alt="Mohammad Taiyab Khan in London, 2025"
                  className="block w-full h-auto saturate-[0.94] contrast-[1.02]"
                />
                <figcaption className="mt-2.5 font-mono text-[0.58rem] tracking-[0.16em] uppercase text-mute flex justify-between">
                  <span>The human</span>
                  <span>London · 2025</span>
                </figcaption>
              </figure>

              <svg
                className="hidden min-[1020px]:block absolute left-[calc(100%+6px)] top-[44%] w-[170px]"
                viewBox="0 0 170 60"
                aria-hidden
              >
                <path
                  d="M4,30 C 60,30 100,14 158,14"
                  fill="none"
                  stroke="currentColor"
                  className="text-ink opacity-55 animate-wire-flow"
                  strokeWidth={1.5}
                  strokeDasharray="6 5"
                />
                <circle cx={4} cy={30} r={3.5} className="fill-signal" />
                <circle cx={158} cy={14} r={3.5} className="fill-signal" />
                <text x={34} y={48} className="fill-mute font-mono" fontSize={9.5} letterSpacing="0.12em">
                  trained on this guy →
                </text>
              </svg>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display font-extrabold text-display-xl leading-[1.02]"
            >
              Mohammad
              <br />
              Taiyab Khan
              <span className="text-signal">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display font-semibold text-display-md text-ink-soft mt-4"
            >
              I build AI products that move from{" "}
              <b className="text-ink font-extrabold">
                idea → demo → <span className="text-signal">deployed</span>
              </b>
              .
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-[18px] text-base text-ink-soft max-w-[480px]"
            >
              Data &amp; AI Engineer, Co-Founder at Autostrata.ai — and this portfolio runs
              on my own work. Don&apos;t just read about it,{" "}
              <span className="relative whitespace-nowrap font-semibold text-ink">
                interview it
                <svg
                  className="absolute -left-[2%] -bottom-[0.18em] w-[104%] h-[0.32em] overflow-visible"
                  viewBox="0 0 300 20"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path d="M4,14 C 70,6 190,4 296,11" fill="none" stroke="currentColor" className="text-signal" strokeWidth={3.4} strokeLinecap="round" />
                </svg>
              </span>
              . The console is live: it knows everything I&apos;ve shipped, books straight
              into my real calendar, and takes messages that reach my inbox.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-[26px] flex gap-3 flex-wrap"
            >
              <button
                type="button"
                onClick={focusAgentStage}
                className="text-sm font-semibold rounded-full px-5 py-[11px] bg-ink text-paper transition-colors hover:bg-signal hover:text-ink"
              >
                Interview the AI ↗
              </button>
              <a
                href="#work"
                className="text-sm font-semibold rounded-full px-5 py-[11px] border border-ink transition-colors hover:bg-ink hover:text-paper"
              >
                See the work
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-6 flex flex-wrap gap-x-[18px] gap-y-2 font-mono text-[0.7rem] tracking-wide text-mute"
            >
              <span>
                MSc Data Science · <b className="text-ink font-medium">Royal Holloway, Merit</b>
              </span>
              <span>
                Published researcher · <b className="text-ink font-medium">Zenodo</b>
              </span>
              <span>
                <b className="text-ink font-medium">6</b> paid clients shipped
              </span>
            </motion.div>
          </div>

          {/* right column: the live agent console */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <AgentStage />
          </motion.div>
        </div>
      </div>
    </header>
  );
}
