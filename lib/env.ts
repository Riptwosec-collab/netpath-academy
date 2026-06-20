/**
 * lib/env.ts
 * Server-side environment validation.
 * Import only in Server Components / API routes / lib files — NEVER in "use client" files.
 */

type EnvConfig = {
  DATABASE_URL:    string;
  NEXTAUTH_SECRET: string;
  NEXTAUTH_URL:    string;
  OPENAI_API_KEY?: string;
  AI_MODEL:        string;
  APP_NAME:        string;
  APP_URL:         string;
};

let _validated: EnvConfig | null = null;

export function getServerEnv(): EnvConfig {
  if (_validated) return _validated;

  const missing: string[] = [];

  const DATABASE_URL    = process.env.DATABASE_URL    ?? "";
  const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ?? "";
  const NEXTAUTH_URL    = process.env.NEXTAUTH_URL    ?? "";
  const OPENAI_API_KEY  = process.env.OPENAI_API_KEY;         // optional
  const AI_MODEL        = process.env.AI_MODEL ?? "gpt-4.1-mini";
  const APP_NAME        = process.env.NEXT_PUBLIC_APP_NAME ?? "NetPath Academy";
  const APP_URL         = process.env.NEXT_PUBLIC_APP_URL  ?? "http://localhost:3000";

  if (!DATABASE_URL)    missing.push("DATABASE_URL");
  if (!NEXTAUTH_SECRET) missing.push("NEXTAUTH_SECRET");
  if (!NEXTAUTH_URL)    missing.push("NEXTAUTH_URL");

  if (missing.length > 0 && process.env.NODE_ENV === "production") {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}\n` +
      `Please set them in your .env.local or Vercel project settings.`
    );
  }

  _validated = { DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL, OPENAI_API_KEY, AI_MODEL, APP_NAME, APP_URL };
  return _validated;
}

/** Whether OpenAI is configured (safe to check anywhere server-side) */
export function isAiConfigured(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

/** Whether DATABASE_URL is configured */
export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/** Whether running in production */
export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}
