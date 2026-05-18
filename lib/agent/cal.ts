// Minimal Cal.com API v2 client for the agent.
// Docs: https://cal.com/docs/api-reference/v2
//
// Setup steps:
//   1. Sign up at cal.com (free plan is fine)
//   2. Connect Google Calendar in Settings -> Calendars
//   3. Create a 15-min event type (e.g. "15-min intro call")
//   4. Get its event-type ID from the event-type URL or via GET /v2/event-types
//   5. Settings -> Developer -> API keys -> generate a key (starts with cal_live_)
//
// Env vars required:
//   CAL_API_KEY        - the cal_live_... key
//   CAL_EVENT_TYPE_ID  - numeric ID of your 15-min intro event type
//   CAL_USERNAME       - your Cal.com username (e.g. "taiyab")

const CAL_API = "https://api.cal.com/v2";
const CAL_API_VERSION = "2024-08-13"; // pin to a stable version

type Slot = { start: string; end: string };

export async function getAvailableSlots(opts: {
  startDate: string; // ISO date e.g. "2026-05-20"
  endDate: string;   // ISO date e.g. "2026-05-22"
  timeZone?: string; // default "Europe/London"
}): Promise<Slot[]> {
  const apiKey = process.env.CAL_API_KEY;
  const eventTypeId = process.env.CAL_EVENT_TYPE_ID;
  if (!apiKey || !eventTypeId) {
    throw new Error("Cal.com is not configured. Missing CAL_API_KEY or CAL_EVENT_TYPE_ID.");
  }

  const params = new URLSearchParams({
    eventTypeId,
    startTime: `${opts.startDate}T00:00:00.000Z`,
    endTime: `${opts.endDate}T23:59:59.999Z`,
    timeZone: opts.timeZone || "Europe/London",
  });

  const res = await fetch(`${CAL_API}/slots/available?${params}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "cal-api-version": CAL_API_VERSION,
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[CAL availability error]", res.status, text);
    throw new Error(`Cal.com availability check failed: ${res.status} ${text.slice(0, 200)}`);
  }

  const data = await res.json();

  // The slots response is a map of date -> slot[]. Flatten.
  const slotsByDate = data?.data?.slots ?? data?.slots ?? {};
  const all: Slot[] = [];
  for (const date of Object.keys(slotsByDate)) {
    for (const slot of slotsByDate[date]) {
      all.push({ start: slot.time || slot.start, end: slot.end || "" });
    }
  }
  return all;
}

export async function createBooking(opts: {
  startISO: string;     // e.g. "2026-05-20T14:30:00.000Z"
  name: string;
  email: string;
  timeZone?: string;
  reason?: string;
}): Promise<{ ok: true; bookingUid: string } | { ok: false; error: string }> {
  const apiKey = process.env.CAL_API_KEY;
  const eventTypeId = process.env.CAL_EVENT_TYPE_ID;
  if (!apiKey || !eventTypeId) {
    return { ok: false, error: "Cal.com is not configured." };
  }

  try {
    const res = await fetch(`${CAL_API}/bookings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "cal-api-version": CAL_API_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventTypeId: Number(eventTypeId),
        start: opts.startISO,
        attendee: {
          name: opts.name,
          email: opts.email,
          timeZone: opts.timeZone || "Europe/London",
        },
        metadata: opts.reason ? { source: "portfolio-ai", reason: opts.reason } : { source: "portfolio-ai" },
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[CAL booking error]", res.status, text);
      return { ok: false, error: `Booking failed: ${res.status} ${text.slice(0, 200)}` };
    }

    const data = await res.json();
    const uid = data?.data?.uid || data?.uid || "unknown";
    return { ok: true, bookingUid: uid };
  } catch (err: any) {
    return { ok: false, error: err?.message || "Booking request errored." };
  }
}
