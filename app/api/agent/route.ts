import { streamText, stepCountIs, convertToModelMessages, UIMessage } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { buildSystemPrompt } from "@/lib/agent/system-prompt";
import { agentTools } from "@/lib/agent/tools";
import { rateLimit } from "@/lib/rate-limit";

// Today's date is injected into the system prompt so the model can resolve
// "tomorrow" / "next Monday" relative to the actual current date.
function todayContext() {
  const now = new Date();
  return `\n\n=== CONTEXT ===\nCurrent date (UTC): ${now.toISOString().slice(0, 10)}\nWhen the user says "tomorrow", "next week", etc., resolve relative to this date.`;
}

export async function POST(req: Request) {
  // -------- rate limit --------
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  // Per-IP daily cap (50 messages/day)
  const daily = rateLimit({ key: `agent:day:${ip}`, max: 50, windowMs: 24 * 60 * 60 * 1000 });
  if (!daily.allowed) {
    return Response.json(
      { error: "Daily message limit reached. Try again tomorrow or email Taiyab directly." },
      { status: 429 }
    );
  }

  // Short-window burst cap (20 messages per 10 minutes)
  const burst = rateLimit({ key: `agent:burst:${ip}`, max: 20, windowMs: 10 * 60 * 1000 });
  if (!burst.allowed) {
    return Response.json(
      { error: "Too many messages in a short time. Slow down a bit." },
      { status: 429 }
    );
  }

  // -------- parse body --------
  let body: { messages?: UIMessage[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = body.messages ?? [];
  if (messages.length === 0) {
    return Response.json({ error: "No messages provided." }, { status: 400 });
  }
  if (messages.length > 60) {
    return Response.json(
      { error: "This conversation has gotten long — let's continue by email or a booked call." },
      { status: 400 }
    );
  }

  // -------- model setup --------
  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY!,
  });

  const result = streamText({
    model: openrouter("anthropic/claude-haiku-4.5"),
    system: buildSystemPrompt() + todayContext(),
    messages: await convertToModelMessages(messages),
    tools: agentTools,
    // Allow up to 6 tool-calling steps in one turn (e.g. check_availability -> book_meeting)
    stopWhen: stepCountIs(6),
    temperature: 0.4,
  });

  return result.toUIMessageStreamResponse();
}
