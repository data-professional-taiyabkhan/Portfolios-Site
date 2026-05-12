"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
          <span className="font-display text-2xl leading-none">Taiyab</span>
          <span className="font-mono text-[0.65rem] text-mute tracking-[0.18em] uppercase hidden sm:inline">
            · Data &amp; AI Engineer
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#about" className="link text-ink-soft hover:text-ink">About</a>
          <a href="#work" className="link text-ink-soft hover:text-ink">Work</a>
          <a href="#research" className="link text-ink-soft hover:text-ink">Research</a>
          <a href="#stack" className="link text-ink-soft hover:text-ink">Stack</a>
          <a
            href="#contact"
            className="px-4 py-2 bg-ink text-paper rounded-full hover:bg-accent transition-colors duration-300"
          >
            Get in touch →
          </a>
        </nav>

        <a
          href="#contact"
          className="md:hidden text-sm font-medium underline-offset-4 underline decoration-accent"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
