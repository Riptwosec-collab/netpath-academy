/**
 * lib/security.ts
 * Server-side security helpers.
 */

/** Strip dangerous HTML/script patterns from text input */
export function sanitizeTextInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")       // strip HTML tags
    .replace(/javascript:/gi, "")  // strip JS protocol
    .trim();
}

/** Check redirect path is safe (relative, no double slashes, no external) */
export function isSafeRedirectPath(path: string): boolean {
  if (!path) return false;
  if (path.startsWith("//")) return false;          // protocol-relative
  if (/^https?:\/\//i.test(path)) return false;     // absolute URL
  if (path.startsWith("javascript:")) return false;
  return path.startsWith("/");
}

/** Validate that a role string is one of the accepted values */
export function validateRole(role: unknown): role is "USER" | "ADMIN" {
  return role === "USER" || role === "ADMIN";
}

/** Check if a string looks like a valid email */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Mask sensitive string for logging (show first 4, rest as *) */
export function maskSecret(secret: string): string {
  if (!secret || secret.length <= 4) return "****";
  return secret.slice(0, 4) + "*".repeat(Math.min(8, secret.length - 4));
}
