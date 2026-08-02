"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowUpRight, Globe, FileText } from "lucide-react";
import { focusAgentStage } from "@/lib/focus-agent-stage";

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 md:py-48 px-6 md:px-10 bg-ink text-paper overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" aria-hidden>
        <div className="absolute -top-40 -left-20 w-[600px] h-[600px] rounded-full bg-signal blur-3xl" />
        <div className="absolute -bottom-40 -right-20 w-[600px] h-[600px] rounded-full bg-moss blur-3xl" />
      </div>

      <div className="relative max-w-[1400px] mx-auto">
        <div className="flex items-baseline gap-6 mb-12 md:mb-16">
          <span className="eyebrow !text-paper/60">05 — Get in touch</span>
          <div className="flex-1 h-px bg-paper/20" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display font-extrabold text-display-xl leading-[1.05] mb-12 md:mb-20 max-w-[640px]"
        >
          Skip the contact form.{" "}
          <span className="text-signal-soft">The agent books straight into my calendar.</span>
        </motion.h2>

        <div className="grid md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-6">
            <p className="text-xl md:text-2xl leading-relaxed text-paper/85 max-w-2xl">
              I&apos;m available for full-time data, ML, and AI engineering roles, and for project work through Autostrata. Always happy to hear about research opportunities too.
            </p>
            <button
              type="button"
              onClick={focusAgentStage}
              className="mt-10 inline-flex items-center gap-2 px-5 py-3 bg-paper text-ink rounded-full font-semibold text-sm transition-colors hover:bg-signal"
            >
              Talk to the agent ↑
            </button>
            <div className="mt-4 inline-flex items-center gap-3 px-5 py-3 border border-paper/20 rounded-full">
              <span className="inline-block w-2 h-2 rounded-full bg-moss animate-pulse" />
              <span className="text-sm">
                Available · Egham, Surrey · UK
              </span>
            </div>
          </div>

          <div className="md:col-span-5 md:col-start-8 space-y-4">
            <ContactRow
              icon={Mail}
              label="Email"
              value="mohammadtaiyabkhan21@gmail.com"
              href="mailto:mohammadtaiyabkhan21@gmail.com"
            />
            <ContactRow
              icon={Linkedin}
              label="LinkedIn"
              value="khanmohdtaiyab"
              href="https://www.linkedin.com/in/khanmohdtaiyab/"
            />
            <ContactRow
              icon={Github}
              label="GitHub"
              value="data-professional-taiyabkhan"
              href="https://github.com/data-professional-taiyabkhan"
            />
            <ContactRow
              icon={Globe}
              label="Studio"
              value="autostrata.ai"
              href="https://autostrata.ai"
            />
            <ContactRow
              icon={FileText}
              label="CV"
              value="Download (PDF)"
              href="/Mohammad_Taiyab_Khan_CV.pdf"
              download
            />
          </div>
        </div>

        <div className="pt-10 border-t border-paper/20 flex flex-wrap items-center justify-between gap-4 text-sm text-paper/60">
          <p>
            © {new Date().getFullYear()} Mohammad Taiyab Khan. Built with Next.js + a lot of
            coffee, in Egham.
          </p>
          <p className="font-mono text-xs">v1.0 · taiyab.autostrata.ai</p>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  download,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      download={download}
      className="group flex items-center justify-between gap-4 py-4 px-5 border border-paper/20 hover:border-accent-soft rounded-2xl transition-colors"
    >
      <div className="flex items-center gap-4">
        <Icon className="w-5 h-5 text-accent-soft" />
        <div>
          <div className="eyebrow !text-paper/50">{label}</div>
          <div className="text-base mt-0.5">{value}</div>
        </div>
      </div>
      <ArrowUpRight className="w-5 h-5 text-paper/40 group-hover:text-accent-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
    </a>
  );
}
