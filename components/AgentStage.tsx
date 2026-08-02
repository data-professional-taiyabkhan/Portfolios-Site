"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";

const SUGGESTIONS = [
  "What kind of work does Taiyab do?",
  "I'd like to book a 15-min call with Taiyab.",
  "I have a job opportunity I'd like to share with Taiyab.",
];

// Labels shown for tool-call parts in the transcript, mirroring AgentChat.tsx's ToolChip.
const TOOL_LABELS: Record<string, string> = {
  check_availability: "check_availability() → Cal.com",
  book_meeting: "book_meeting() → Cal.com ✓",
  leave_message: "leave_message() → Resend ✓",
};

// Same message-part extraction as AgentChat.tsx's Message component (AI SDK v5 parts format).
function extractParts(message: any) {
  const parts = message.parts || [];
  const text = parts
    .filter((p: any) => p.type === "text")
    .map((p: any) => p.text)
    .join("");
  const toolParts = parts.filter(
    (p: any) => p.type?.startsWith("tool-") || p.type === "tool-call" || p.type === "tool-result"
  );
  return { text, toolParts };
}

export default function AgentStage() {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/agent" }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Any CTA on the page can dispatch this to bring the console into view and focus it.
  useEffect(() => {
    const handler = () => {
      stageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 500);
    };
    window.addEventListener("open-agent-drawer", handler);
    return () => window.removeEventListener("open-agent-drawer", handler);
  }, []);

  const handleSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    sendMessage({ text: trimmed });
    setInput("");
  };

  return (
    <div ref={stageRef} id="stage">
      <div className="relative w-full max-w-[600px] mx-auto bg-ink rounded-[18px] shadow-[0_30px_80px_-20px_rgba(16,21,28,0.55)] border border-line-dark text-[#E9E4DA] overflow-hidden flex flex-col">
        {/* header */}
        <div className="flex items-center justify-between px-[18px] py-3.5 border-b border-line-dark bg-ink-2">
          <div className="flex items-center gap-[11px]">
            <div className="relative w-[34px] h-[34px] rounded-full bg-ink-3 flex items-center justify-center font-display font-extrabold text-[0.85rem] text-signal">
              T
              <span className="absolute -bottom-px -right-px w-[9px] h-[9px] rounded-full bg-signal border-2 border-ink-2" />
            </div>
            <div>
              <div className="font-display font-semibold text-[0.98rem] leading-tight">Taiyab&apos;s AI</div>
              <div className="font-mono text-[0.62rem] text-[#8B93A1] tracking-wide">
                Claude Haiku 4.5 · tool-calling · avg $0.005/turn
              </div>
            </div>
          </div>
          <span className="font-mono text-[0.6rem] tracking-[0.16em] text-signal border border-signal/45 rounded-full px-2.5 py-1 flex items-center gap-1.5 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
            LIVE
          </span>
        </div>

        {/* transcript */}
        <div
          ref={scrollRef}
          aria-live="polite"
          className="h-[308px] overflow-y-auto p-[18px] flex flex-col gap-3 no-scrollbar"
        >
          {messages.length === 0 && !isLoading && !error && (
            <div className="text-[#8B93A1] text-sm font-mono leading-relaxed">
              Ask me anything about Taiyab&apos;s work, or pick a suggestion below.
            </div>
          )}

          {messages.map((m) => {
            const { text, toolParts } = extractParts(m);
            if (!text && toolParts.length === 0) return null;
            const isUser = m.role === "user";
            return (
              <div
                key={m.id}
                className={`max-w-[88%] px-3.5 py-2.5 rounded-[14px] text-[0.88rem] leading-relaxed whitespace-pre-line ${
                  isUser
                    ? "self-end bg-signal text-ink font-medium rounded-br-[4px]"
                    : "self-start bg-ink-2 border border-line-dark rounded-bl-[4px]"
                }`}
              >
                {text && <div>{text}</div>}
                {toolParts.length > 0 &&
                  toolParts.map((tp: any, i: number) => {
                    const name = tp.toolName || tp.type?.replace(/^tool-/, "") || "tool";
                    return (
                      <span
                        key={i}
                        className="block mt-[9px] font-mono text-[0.64rem] text-signal-soft border-t border-dashed border-line-dark pt-2"
                      >
                        {TOOL_LABELS[name] || `${name}()`}
                      </span>
                    );
                  })}
              </div>
            );
          })}

          {isLoading && (
            <div className="self-start flex gap-1.5 px-4 py-3.5 bg-ink-2 border border-line-dark rounded-[14px] rounded-bl-[4px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B93A1] animate-blink" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B93A1] animate-blink [animation-delay:180ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B93A1] animate-blink [animation-delay:360ms]" />
            </div>
          )}

          {error && (
            <div className="text-[0.82rem] text-signal-soft leading-relaxed">
              Something went wrong — try again, or email{" "}
              <a href="mailto:mohammadtaiyabkhan21@gmail.com" className="underline">
                mohammadtaiyabkhan21@gmail.com
              </a>{" "}
              directly.
            </div>
          )}
        </div>

        {/* suggestion chips, shown until the conversation starts */}
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2 px-[18px] pb-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleSend(s)}
                className="font-mono text-[0.7rem] text-[#E9E4DA] bg-transparent border border-line-dark rounded-full px-3.5 py-2 transition-colors hover:border-signal hover:text-signal"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* input row */}
        <div className="flex gap-2.5 px-[18px] py-3.5 border-t border-line-dark bg-ink-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend(input);
              }
            }}
            placeholder="Ask about my work, or book a call…"
            aria-label="Message the AI"
            className="flex-1 min-w-0 bg-ink border border-line-dark rounded-xl px-3.5 py-3 text-[#E9E4DA] font-sans text-sm placeholder:text-[#707888] focus:outline-none focus:border-signal"
          />
          <button
            type="button"
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
            className="bg-signal text-ink rounded-xl px-[18px] font-semibold text-[0.88rem] flex-shrink-0 transition-transform hover:-translate-y-px disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            Send
          </button>
        </div>

        {/* footer */}
        <div className="font-mono text-[0.56rem] tracking-wide text-[#6b7484] px-[18px] py-[9px] bg-ink-2 border-t border-line-dark">
          3 tools wired · 9 refusal rules
        </div>
      </div>

      {/* tool patch bay */}
      <div
        className="max-w-[600px] mx-auto grid grid-cols-3 max-[560px]:grid-cols-1 gap-3"
        aria-label="Tools wired into the agent"
      >
        <ToolNode fns={["check_availability()", "book_meeting()"]} via="Cal.com · 15-min slots" />
        <ToolNode fns={["leave_message()"]} via="Resend → my inbox" />
        <ToolNode fns={["knowledge_base"]} via="Every project · real metrics" />
      </div>
      <p className="text-center mt-5 font-mono text-[0.66rem] tracking-[0.1em] text-mute uppercase">
        The same agentic pattern I ship for paid builds —{" "}
        <b className="text-ink font-medium normal-case">you&apos;re the demo user</b>
      </p>
    </div>
  );
}

function ToolNode({ fns, via }: { fns: string[]; via: string }) {
  return (
    <div className="relative mt-6 max-[560px]:mt-3.5">
      <div
        aria-hidden
        className="hidden min-[561px]:block absolute -top-[26px] left-1/2 -translate-x-1/2 h-[26px] border-l-[1.5px] border-dashed border-ink/50"
      />
      <div
        aria-hidden
        className="hidden min-[561px]:block absolute -top-1.5 left-1/2 -translate-x-1/2 w-[7px] h-[7px] rounded-full bg-signal"
      />
      <div className="bg-paper border border-ink rounded-xl px-3.5 py-2.5 shadow-[3px_3px_0_theme(colors.ink)]">
        {fns.map((fn) => (
          <div key={fn} className="font-mono text-[0.66rem] text-ink font-medium">
            <span className="text-signal">→ </span>
            {fn}
          </div>
        ))}
        <div className="mt-1.5 font-mono text-[0.56rem] tracking-[0.12em] uppercase text-mute">{via}</div>
      </div>
    </div>
  );
}
