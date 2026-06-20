/**
 * lib/rateLimit.ts
 * In-memory rate limiter for development/prototype.
 * Production: replace with Upstash Redis or Vercel KV.
 */

type LimitEntry = { count: number; resetAt: number };

const store = new Map<string, LimitEntry>();

type RateLimitOptions = {
  limit:        number; // max requests
  windowMs:     number; // time window in ms
};

type RateLimitResult = {
  allowed:    boolean;
  remaining:  number;
  resetAt:    number;
};

export function checkRateLimit(
  key: string,
  { limit = 10, windowMs = 60_000 }: Partial<RateLimitOptions> = {}
): RateLimitResult {
  const now = Date.now();

  let entry = store.get(key);

  // Expired window — reset
  if (!entry || entry.resetAt < now) {
    entry = { count: 0, resetAt: now + windowMs };
    store.set(key, entry);
  }

  entry.count += 1;

  const allowed   = entry.count <= limit;
  const remaining = Math.max(0, limit - entry.count);

  // Cleanup old keys periodically (simple GC)
  if (store.size > 10_000) {
    for (const [k, v] of store.entries()) {
      if (v.resetAt < now) store.delete(k);
    }
  }

  return { allowed, remaining, resetAt: entry.resetAt };
}

/** Get client IP from Next.js request headers */
export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}
