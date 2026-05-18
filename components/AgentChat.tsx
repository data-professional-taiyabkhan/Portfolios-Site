"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Send, X, Sparkles, Calendar, Mail, MessageSquare } from "lucide-react";

const SUGGESTIONS = [
  { icon: Sparkles, label: "What kind of work does he do?", text: "What kind of work does Taiyab do?" },
  { icon: Calendar, label: "Book a quick call", text: "I'd like to book a 15-min call with Taiyab." },
  { icon: Mail, label: "I have a job opportunity", text: "I have a job opportunity I'd like to share with Taiyab." },
];

export default function AgentChat({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/agent" }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Focus the input when the drawer opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [open]);

  const handleSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    sendMessage({ text: trimmed });
    setInput("");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop (mobile only) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="md:hidden fixed inset-0 bg-ink/40 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-50 w-full md:w-[440px] bg-paper border-l border-line shadow-2xl flex flex-col"
            role="dialog"
            aria-label="Taiyab's AI assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-line bg-paper-deep/40">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-ink flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-accent-soft" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-moss rounded-full border-2 border-paper" />
                </div>
                <div>
                  <div className="font-display text-lg leading-tight">Taiyab&apos;s AI</div>
                  <div className="text-xs text-mute">Built with Claude Haiku 4.5</div>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-9 h-9 rounded-full border border-line hover:bg-ink hover:text-paper transition-colors flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-4 no-scrollbar">
              {messages.length === 0 ? (
                <Welcome onPick={(t) => handleSend(t)} />
              ) : (
                messages.map((m) => <Message key={m.id} message={m} />)
              )}
              {isLoading && <ThinkingDots />}
              {error && (
                <div className="text-sm text-accent bg-accent/10 border border-accent/20 rounded-2xl p-3">
                  Something went wrong. Try again, or email Taiyab directly at{" "}
                  <a href="mailto:mohammadtaiyabkhan21@gmail.com" className="underline">
                    mohammadtaiyabkhan21@gmail.com
                  </a>
                  .
                </div>
              )}
            </div>

            {/* Footer / input */}
            <div className="border-t border-line bg-paper-deep/30 px-4 py-3">
              <div className="flex items-end gap-2 bg-paper border border-line rounded-2xl p-2 focus-within:border-ink transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(input);
                    }
                  }}
                  placeholder="Ask anything…"
                  rows={1}
                  className="flex-1 bg-transparent outline-none resize-none px-2 py-1.5 text-sm placeholder:text-mute max-h-32"
                  style={{ minHeight: "32px" }}
                />
                <button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isLoading}
                  aria-label="Send"
                  className="w-9 h-9 rounded-xl bg-ink text-paper flex items-center justify-center hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-mute mt-2 px-1 leading-relaxed">
                AI responses are generated. For anything important, message Taiyab directly.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// =====================================================
// Sub-components
// =====================================================

function Welcome({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="space-y-5 py-2">
      <div className="space-y-2">
        <p className="font-display text-2xl leading-tight">Hi — I&apos;m Taiyab&apos;s AI.</p>
        <p className="text-sm text-ink-soft leading-relaxed">
          I can answer questions about his work, book a 15-min call with him, or pass on a message.
          What would you like?
        </p>
      </div>
      <div className="space-y-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            onClick={() => onPick(s.text)}
            className="w-full text-left flex items-center gap-3 px-3.5 py-2.5 rounded-2xl border border-line hover:border-ink hover:bg-paper-deep/40 transition-colors text-sm"
          >
            <s.icon className="w-4 h-4 text-accent flex-shrink-0" />
            <span>{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Message({ message }: { message: any }) {
  const isUser = message.role === "user";

  // Extract text from parts (AI SDK v5 format)
  const text = (message.parts || [])
    .filter((p: any) => p.type === "text")
    .map((p: any) => p.text)
    .join("");

  // Tool calls — show them as small chips so the user can see the agent working
  const toolParts = (message.parts || []).filter((p: any) =>
    p.type?.startsWith("tool-") || p.type === "tool-call" || p.type === "tool-result"
  );

  if (!text && toolParts.length === 0) return null;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-ink text-paper rounded-br-sm"
            : "bg-paper-deep/60 border border-line text-ink rounded-bl-sm"
        }`}
      >
        {toolParts.length > 0 && !isUser && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {toolParts.map((tp: any, i: number) => (
              <ToolChip key={i} part={tp} />
            ))}
          </div>
        )}
        {text && <div className="whitespace-pre-wrap">{text}</div>}
      </div>
    </div>
  );
}

function ToolChip({ part }: { part: any }) {
  const toolName: string = part.toolName || part.type?.replace(/^tool-/, "") || "tool";
  const labels: Record<string, string> = {
    check_availability: "Checking calendar…",
    book_meeting: "Booking the meeting…",
    leave_message: "Sending your message…",
  };
  const label = labels[toolName] || `Using ${toolName}…`;
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2 py-1 bg-paper border border-line rounded-full text-mute">
      <MessageSquare className="w-2.5 h-2.5" />
      {label}
    </span>
  );
}

function ThinkingDots() {
  return (
    <div className="flex justify-start">
      <div className="bg-paper-deep/60 border border-line rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 bg-mute rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-1.5 h-1.5 bg-mute rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-1.5 h-1.5 bg-mute rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
