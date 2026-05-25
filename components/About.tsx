"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GraduationCap, FileText, Sparkles } from "lucide-react";

const stats = [
  { label: "Years experience", value: "3+", note: "Combined data + AI + full-stack" },
  { label: "Paid clients shipped", value: "6", note: "Via Autostrata.ai" },
  { label: "Research papers", value: "1", note: "Peer-reviewed preprint" },
  { label: "Based in", value: "Egham, Surrey, UK", note: "UK Graduate Visa" },
];

const milestones = [
  { year: "2020", text: "Began BSc Computer Science & Mathematics, Jamia Millia Islamia, New Delhi." },
  { year: "2022", text: "Joined Gurucool as a Data Analyst. Led a recommendation system that lifted engagement 50%." },
  { year: "2023", text: "Moved from Delhi to London. Started MSc Data Science & Analytics at Royal Holloway." },
  { year: "2024", text: "Graduated with Merit. Dissertation on football sentiment analysis." },
  { year: "2025", text: "Co-founded Autostrata.ai. Shipped Clock-in Pro, MummyHelp, HEART-Eco." },
  { year: "2026", text: "Published EURO 2024 paper. Built this site's AI assistant — booking, messaging, and Q&A via tool-calling." },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 md:py-40 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-baseline gap-6 mb-16 md:mb-24">
          <span className="numeral text-display-md">i.</span>
          <span className="eyebrow">About</span>
          <div className="flex-1 h-px bg-line" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-12 gap-8 mb-20"
        >
          <div className="md:col-span-7">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-8 sm:items-start">
              <figure className="flex-shrink-0 w-32 sm:w-40 md:w-44">
                <div className="overflow-hidden rounded-sm border border-line">
                  <img
                    src="/portrait.jpg"
                    alt="Mohammad Taiyab Khan in London, 2025"
                    className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <figcaption className="font-mono text-[0.65rem] uppercase tracking-wider text-mute mt-2">
                  London · 2025
                </figcaption>
              </figure>
              <p className="font-display text-display-md text-ink leading-[1.15]">
                I started in <span className="italic">Delhi</span>, learning data and machine
                learning between IIT Madras and Jamia. I moved to <span className="italic">London</span>{" "}
                in 2023 for an MSc at Royal Holloway, and stayed to build.
              </p>
            </div>
            <p className="mt-8 text-lg text-ink-soft leading-relaxed max-w-2xl">
              Today I&apos;m a Data &amp; AI Engineer and Co-Founder of{" "}
              <a href="https://autostrata.ai" target="_blank" rel="noreferrer" className="link text-accent">
                Autostrata.ai
              </a>
              , a UK studio that ships marketplaces, payment infrastructure, and AI agents
              for founders and SMBs. I split my time between client delivery, original
              research (a published preprint on football sentiment analysis), and personal
              data stories that nobody asked for but I couldn&apos;t stop thinking about.
            </p>
            <p className="mt-6 text-sm text-mute leading-relaxed max-w-2xl border-l-2 border-accent/30 pl-4 italic">
          <span className="font-mono text-[0.65rem] uppercase tracking-wider text-accent not-italic block mb-1">Currently</span>
            Building agentic AI patterns for clients via Autostrata, and writing about what I learn — most recently, the AI assistant on this site.
            </p>
          </div>

          <div className="md:col-span-4 md:col-start-9 space-y-6">
            <div className="border border-line rounded-2xl p-5 bg-paper-deep/40">
              <GraduationCap className="w-5 h-5 text-accent mb-3" />
              <p className="font-medium">MSc Data Science &amp; Analytics</p>
              <p className="text-sm text-mute mt-1">Royal Holloway, University of London · Merit · 2024</p>
            </div>
            <div className="border border-line rounded-2xl p-5 bg-paper-deep/40">
              <FileText className="w-5 h-5 text-accent mb-3" />
              <p className="font-medium">Published Research</p>
              <p className="text-sm text-mute mt-1">
                Predictive Power of Social Media — Zenodo DOI: 10.5281/zenodo.19675434
              </p>
              <a
                href="https://doi.org/10.5281/zenodo.19675434"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm text-accent mt-2 link"
              >
                Read paper <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
            <div className="border border-line rounded-2xl p-5 bg-paper-deep/40">
              <Sparkles className="w-5 h-5 text-accent mb-3" />
              <p className="font-medium">Visa status</p>
              <p className="text-sm text-mute mt-1">
                UK Graduate Visa, valid through January 2027. Currently building from Egham, Surrey.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line rounded-3xl overflow-hidden mb-24"
        >
          {stats.map((s, i) => (
            <div key={i} className="bg-paper p-6 md:p-8">
              <div className="font-display text-display-md text-ink leading-none mb-2">
                {s.value}
              </div>
              <div className="eyebrow mb-1">{s.label}</div>
              <div className="text-xs text-mute">{s.note}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <h3 className="font-display text-3xl italic">The journey, briefly.</h3>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <ol className="space-y-6">
              {milestones.map((m, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="grid grid-cols-[80px_1fr] gap-6 items-baseline border-b border-line pb-6"
                >
                  <span className="font-mono text-sm text-accent tabular-nums">{m.year}</span>
                  <span className="text-ink-soft leading-relaxed">{m.text}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
