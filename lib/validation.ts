/**
 * lib/validation.ts
 * Reusable server/client-safe validation helpers.
 */

type ValidationResult = { valid: boolean; error?: string };

export function validateEmail(email: string): ValidationResult {
  if (!email?.trim()) return { valid: false, error: "Email is required" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { valid: false, error: "Invalid email format" };
  return { valid: true };
}

export function validatePassword(password: string, minLen = 8): ValidationResult {
  if (!password) return { valid: false, error: "Password is required" };
  if (password.length < minLen) return { valid: false, error: `Password must be at least ${minLen} characters` };
  return { valid: true };
}

export function validateRequired(value: string, fieldName = "Field"): ValidationResult {
  if (!value?.trim()) return { valid: false, error: `${fieldName} is required` };
  return { valid: true };
}

export function validateNumberRange(
  value: number,
  min: number,
  max: number,
  fieldName = "Value"
): ValidationResult {
  if (isNaN(value)) return { valid: false, error: `${fieldName} must be a number` };
  if (value < min || value > max) return { valid: false, error: `${fieldName} must be between ${min} and ${max}` };
  return { valid: true };
}

export function safeJsonParse<T = unknown>(raw: string): { ok: true; data: T } | { ok: false; error: string } {
  try {
    const data = JSON.parse(raw) as T;
    return { ok: true, data };
  } catch {
    return { ok: false, error: "Invalid JSON" };
  }
}

export function validateMaxLength(value: string, max: number, fieldName = "Field"): ValidationResult {
  if (value.length > max) return { valid: false, error: `${fieldName} must be at most ${max} characters` };
  return { valid: true };
}
