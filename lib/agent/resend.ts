// Minimal Resend client. We use the REST API directly to avoid pulling in another SDK.
// Docs: https://resend.com/docs/api-reference/emails/send-email
//
// Setup:
//   1. Sign up at resend.com (free tier: 100 emails/day, 3,000/month)
//   2. Verify a sending domain (or use the default onboarding sender for testing)
//   3. Create an API key -> add as RESEND_API_KEY env var
//
// Env vars:
//   RESEND_API_KEY   - your Resend API key
//   RESEND_FROM      - the sender, e.g. "Portfolio AI <noreply@autostrata.ai>"
//                       For first-time setup before domain verification, use:
//                       "Portfolio AI <onboarding@resend.dev>"
//   NOTIFY_EMAIL     - where to deliver messages (mohammadtaiyabkhan21@gmail.com)

export async function sendMessageToTaiyab(opts: {
  from_name: string;
  from_email: string;
  message: string;
  intent?: string;
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.RESEND_FROM || "Portfolio AI <onboarding@resend.dev>";
  const to = process.env.NOTIFY_EMAIL || "mohammadtaiyabkhan21@gmail.com";

  if (!apiKey) {
    return { ok: false, error: "Resend is not configured (RESEND_API_KEY missing)." };
  }

  const subject = `[Portfolio AI] ${opts.intent || "Message"} from ${opts.from_name}`;
  const html = `
    <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 600px; padding: 20px;">
      <p style="color: #6B6760; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">
        New message via taiyab.autostrata.ai
      </p>
      <h2 style="font-family: Georgia, serif; color: #1A1A1A; margin-top: 8px;">${escapeHtml(opts.from_name)}</h2>
      <p style="color: #6B6760; margin: 0 0 16px;">
        <a href="mailto:${escapeHtml(opts.from_email)}" style="color: #C8553D;">${escapeHtml(opts.from_email)}</a>
        ${opts.intent ? ` · ${escapeHtml(opts.intent)}` : ""}
      </p>
      <hr style="border: none; border-top: 1px solid #D9D2C2; margin: 20px 0;" />
      <p style="color: #1A1A1A; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(opts.message)}</p>
      <hr style="border: none; border-top: 1px solid #D9D2C2; margin: 20px 0;" />
      <p style="color: #6B6760; font-size: 12px;">
        Reply directly to ${escapeHtml(opts.from_email)} to respond.
      </p>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to,
        reply_to: opts.from_email,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[RESEND error]", res.status, text);
      return { ok: false, error: `Resend failed: ${res.status} ${text.slice(0, 200)}` };
    }

    const data = await res.json();
    return { ok: true, id: data?.id || "sent" };
  } catch (err: any) {
    return { ok: false, error: err?.message || "Resend request errored." };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
