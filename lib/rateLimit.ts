/**
 * Simple in-memory rate limiter for API routes.
 * Resets automatically per window.
 */

interface RateLimitEntry {
  count:   number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

interface RateLimitOptions {
  /** Maximum requests per window */
  limit:  number;
  /** Window in milliseconds */
  window: number;
}

export interface RateLimitResult {
  allowed:   boolean;
  remaining: number;
  resetAt:   number;
}

export function rateLimit(
  key:     string,
  options: RateLimitOptions = { limit: 10, window: 60_000 },
): RateLimitResult {
  const now = Date.now();

  // Clean up expired entries
  Array.from(store.entries()).forEach(([k, v]) => {
    if (v.resetAt < now) store.delete(k);
  });

  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    // New window
    const newEntry: RateLimitEntry = {
      count:   1,
      resetAt: now + options.window,
    };
    store.set(key, newEntry);
    return { allowed: true, remaining: options.limit - 1, resetAt: newEntry.resetAt };
  }

  if (entry.count >= options.limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  store.set(key, entry);

  return { allowed: true, remaining: options.limit - entry.count, resetAt: entry.resetAt };
}

/** Get client IP from Next.js request headers */
export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

// Alias for backward compatibility
export const checkRateLimit = rateLimit;
