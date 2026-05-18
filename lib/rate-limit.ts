// Simple in-memory rate limiter.
// For v1 portfolio traffic this is fine. If the agent ever gets serious traffic,
// swap to Upstash Redis for cross-instance limits.

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(opts: {
  key: string;            // typically the IP address
  max: number;            // max requests in the window
  windowMs: number;       // window length in ms
}): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const existing = buckets.get(opts.key);

  if (!existing || existing.resetAt < now) {
    buckets.set(opts.key, { count: 1, resetAt: now + opts.windowMs });
    return { allowed: true, remaining: opts.max - 1, resetIn: opts.windowMs };
  }

  if (existing.count >= opts.max) {
    return { allowed: false, remaining: 0, resetIn: existing.resetAt - now };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: opts.max - existing.count,
    resetIn: existing.resetAt - now,
  };
}

// Background cleanup so the map doesn't grow forever
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [k, v] of buckets) {
      if (v.resetAt < now) buckets.delete(k);
    }
  }, 60_000);
}
