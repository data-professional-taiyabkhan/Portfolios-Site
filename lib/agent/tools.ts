import { tool } from "ai";
import { z } from "zod";
import { getAvailableSlots, createBooking } from "./cal";
import { sendMessageToTaiyab } from "./resend";

// =====================================================
// Tool 1: check_availability
// =====================================================
export const checkAvailability = tool({
  description:
    "Check what 15-minute slots Taiyab has free in his calendar. Call this when a user wants to book a meeting. Returns a list of available start times in UTC ISO format. You should present the times to the user in their natural local format (e.g. 'Monday at 2:30 PM').",
  inputSchema: z.object({
    startDate: z
      .string()
      .describe("Start of the search window as ISO date YYYY-MM-DD. If user says 'tomorrow' or 'next Monday', compute the date and pass it here."),
    endDate: z
      .string()
      .describe("End of the search window as ISO date YYYY-MM-DD. If user said a single day, pass the same date. Otherwise cap at ~5 days from start."),
    timeZone: z
      .string()
      .optional()
      .describe("IANA time zone for the user, e.g. 'Europe/London' or 'America/New_York'. Default is 'Europe/London' if unknown."),
  }),
  execute: async ({ startDate, endDate, timeZone }) => {
    try {
      const slots = await getAvailableSlots({ startDate, endDate, timeZone });
      if (slots.length === 0) {
        return {
          available: false,
          message: "No slots available in that window. Try a wider date range or a different week.",
          slots: [],
        };
      }
      // Cap at 12 slots so the AI doesn't dump a wall of times on the user.
      const trimmed = slots.slice(0, 12);
      return {
        available: true,
        count: trimmed.length,
        slots: trimmed.map((s) => s.start),
        timeZone: timeZone || "Europe/London",
      };
    } catch (err: any) {
      return {
        available: false,
        error: err?.message || "Couldn't check availability right now.",
        slots: [],
      };
    }
  },
});

// =====================================================
// Tool 2: book_meeting
// =====================================================
export const bookMeeting = tool({
  description:
    "Create a confirmed booking on Taiyab's calendar. ONLY call this after the user has chosen a specific slot AND given their real name and email. Never invent the start time — it must be one of the slots returned by check_availability.",
  inputSchema: z.object({
    startISO: z
      .string()
      .describe("The exact start time the user picked, as a UTC ISO string (e.g. '2026-05-20T14:30:00.000Z'). Must come from check_availability output."),
    name: z.string().min(2).describe("The user's full name as they gave it."),
    email: z.string().email().describe("A real email address the user provided."),
    timeZone: z
      .string()
      .optional()
      .describe("The user's time zone (IANA format). Default 'Europe/London'."),
    reason: z
      .string()
      .optional()
      .describe("One-line note on what the meeting is about, e.g. 'Hiring discussion for Data Engineer role at Acme'."),
  }),
  execute: async ({ startISO, name, email, timeZone, reason }) => {
    const result = await createBooking({ startISO, name, email, timeZone, reason });
    if (!result.ok) {
      return { booked: false, error: result.error };
    }
    return {
      booked: true,
      bookingId: result.bookingUid,
      message:
        "Booking confirmed. Calendar invite sent to the email provided. Taiyab will see it on his side.",
    };
  },
});

// =====================================================
// Tool 3: leave_message
// =====================================================
export const leaveMessage = tool({
  description:
    "Send an email message to Taiyab on the user's behalf. Use when the user wants to leave a message rather than book a call (e.g. they're sharing a job opportunity, asking a longer question, or sending a project pitch). Requires real name, email, and message content.",
  inputSchema: z.object({
    name: z.string().min(2).describe("The user's full name."),
    email: z.string().email().describe("A real email address (Taiyab will reply to this)."),
    message: z.string().min(10).describe("The message body. Should be at least a sentence."),
    intent: z
      .enum(["Job opportunity", "Project enquiry", "Collaboration", "General"])
      .optional()
      .describe("Optional category — pick the closest match from context."),
  }),
  execute: async ({ name, email, message, intent }) => {
    const result = await sendMessageToTaiyab({
      from_name: name,
      from_email: email,
      message,
      intent,
    });
    if (!result.ok) {
      return { sent: false, error: result.error };
    }
    return {
      sent: true,
      message: "Message sent. Taiyab will reply directly to the email you gave.",
    };
  },
});

export const agentTools = {
  check_availability: checkAvailability,
  book_meeting: bookMeeting,
  leave_message: leaveMessage,
};
