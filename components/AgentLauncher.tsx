"use client";

import { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";
import AgentChat from "./AgentChat";

export default function AgentLauncher() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hintShown, setHintShown] = useState(false);

  // Listen for "open-agent-drawer" events fired from elsewhere on the page (e.g. the Hero button)
  useEffect(() => {
    const handler = () => {
      setVisible(true);
      setOpen(true);
    };
    window.addEventListener("open-agent-drawer", handler);
    return () => window.removeEventListener("open-agent-drawer", handler);
  }, []);

  // Reveal after scrolling past the hero, so it doesn't compete with first impression
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.6) {
        setVisible(true);
        // Show a one-time hint bubble 1.5s after the button appears, then auto-collapse
        if (!hintShown) {
          setHintShown(true);
          setTimeout(() => {
            const el = document.getElementById("agent-hint");
            if (el) el.style.opacity = "0";
          }, 5500);
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hintShown]);

  // Lock body scroll when chat is open on mobile
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={`fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Hint bubble — appears once, fades away */}
        {!open && hintShown && (
          <div
            id="agent-hint"
            className="absolute bottom-full right-0 mb-3 px-4 py-2.5 bg-ink text-paper rounded-2xl rounded-br-sm whitespace-nowrap text-sm shadow-lg transition-opacity duration-700"
            style={{ animation: "fadeUp 0.6s 1.2s both" }}
          >
            <span className="font-display italic">Ask my AI →</span>
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close chat" : "Open AI assistant"}
          className="group flex items-center gap-2.5 pl-4 pr-5 py-3.5 bg-ink text-paper rounded-full shadow-2xl hover:bg-accent transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
        >
          {open ? (
            <X className="w-4 h-4" />
          ) : (
            <>
              <span className="relative flex items-center">
                <Sparkles className="w-4 h-4 text-accent-soft group-hover:text-paper transition-colors" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-moss rounded-full animate-pulse" />
              </span>
              <span className="text-sm font-medium">Ask my AI</span>
            </>
          )}
        </button>
      </div>

      {/* The drawer */}
      <AgentChat open={open} onClose={() => setOpen(false)} />
    </>
  );
}
