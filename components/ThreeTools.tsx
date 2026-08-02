"use client";

import { motion } from "framer-motion";

const TOOLS = [
  {
    fn: "check_availability() · book_meeting()",
    body: "Reads free 15-minute slots from my live calendar and creates a confirmed booking — name, email, and a reason, straight onto my schedule.",
    via: "Cal.com API",
  },
  {
    fn: "send_message()",
    body: "Recruiters and founders leave a message in plain chat. It arrives in my inbox with their contact details, structured and ready to reply to.",
    via: "Resend",
  },
  {
    fn: "knowledge_base",
    body: "Grounded on my actual projects, metrics, and CV — with 9 refusal rules so it doesn't invent achievements I never had.",
    via: "Curated corpus · guardrails",
  },
];

export default function ThreeTools() {
  return (
    <section id="wired" className="relative py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <span className="eyebrow block mb-2.5">01 — Under the hood</span>
          <h2 className="font-display font-extrabold text-display-lg">Three tools. Real consequences.</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {TOOLS.map((t, i) => (
            <motion.div
              key={t.fn}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="border border-ink rounded-2xl p-[22px] bg-paper shadow-[5px_5px_0_theme(colors.ink)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_theme(colors.ink)]"
            >
              <div className="font-mono text-[0.8rem] font-medium text-ink">
                <span className="text-signal">→ </span>
                {t.fn}
              </div>
              <p className="mt-3 text-sm text-ink-soft">{t.body}</p>
              <div className="mt-3.5 font-mono text-[0.6rem] tracking-[0.14em] uppercase text-mute">{t.via}</div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-[26px] text-[0.95rem] text-ink-soft max-w-[640px]"
        >
          This isn&apos;t a demo bolted onto a portfolio — it&apos;s the same architecture I
          built for{" "}
          <a
            href="https://heart-eco.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-ink underline decoration-signal decoration-2 underline-offset-[3px]"
          >
            HEART AI
          </a>
          , a paid engagement&apos;s agentic analyst. Want one for your product? That&apos;s a
          very good reason to press &ldquo;Book a call&rdquo;.
        </motion.p>
      </div>
    </section>
  );
}
