"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { focusAgentStage } from "@/lib/focus-agent-stage";

// Hidden while the hero/AgentStage console is in view. Once scrolled past it, shows a
// pill that scrolls back up and focuses the same live console — there is no separate
// drawer or conversation state anymore (AgentChat.tsx is unused, kept pending removal).
export default function AgentLauncher() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={focusAgentStage}
      aria-label="Scroll to the AI assistant"
      className={`fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 flex items-center gap-2.5 pl-4 pr-5 py-3.5 bg-ink text-paper rounded-full shadow-2xl transition-all duration-500 hover:bg-signal hover:text-ink hover:scale-[1.03] active:scale-[0.98] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <span className="relative flex items-center">
        <Sparkles className="w-4 h-4 text-signal-soft" />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-signal rounded-full animate-pulse" />
      </span>
      <span className="text-sm font-medium">Ask my AI</span>
    </button>
  );
}
