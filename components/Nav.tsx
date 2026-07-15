"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { focusAgentStage } from "@/lib/focus-agent-stage";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-paper/85 backdrop-blur-md border-b border-line"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
        <Link href="#top" className="flex items-baseline gap-2 group">
          <span className="inline-block w-2 h-2 rounded-full bg-signal animate-pulse" aria-hidden />
          <span className="font-display font-extrabold text-2xl leading-none">Taiyab Khan</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#wired" className="link text-ink-soft hover:text-ink">The agent</a>
          <a href="#work" className="link text-ink-soft hover:text-ink">Work</a>
          <a href="#quests" className="link text-ink-soft hover:text-ink">Research</a>
          <a href="#about" className="link text-ink-soft hover:text-ink">About</a>
          <button
            type="button"
            onClick={focusAgentStage}
            className="px-4 py-2 bg-ink text-paper rounded-full hover:bg-signal hover:text-ink transition-colors duration-300"
          >
            Book a call ↗
          </button>
        </nav>

        <button
          type="button"
          onClick={focusAgentStage}
          className="md:hidden text-sm font-medium underline-offset-4 underline decoration-signal"
        >
          Book a call
        </button>
      </div>
    </header>
  );
}
