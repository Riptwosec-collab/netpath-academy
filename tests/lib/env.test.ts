import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { isDatabaseConfigured, isAiConfigured, isProduction } from "@/lib/env";

describe("isDatabaseConfigured", () => {
  const original = process.env.DATABASE_URL;

  afterEach(() => {
    if (original !== undefined) process.env.DATABASE_URL = original;
    else delete process.env.DATABASE_URL;
  });

  it("returns true when DATABASE_URL is set", () => {
    process.env.DATABASE_URL = "postgresql://user:pass@host/db";
    expect(isDatabaseConfigured()).toBe(true);
  });

  it("returns false when DATABASE_URL is missing", () => {
    delete process.env.DATABASE_URL;
    expect(isDatabaseConfigured()).toBe(false);
  });
});

describe("isAiConfigured", () => {
  const original = process.env.OPENAI_API_KEY;

  afterEach(() => {
    if (original !== undefined) process.env.OPENAI_API_KEY = original;
    else delete process.env.OPENAI_API_KEY;
  });

  it("returns true when OPENAI_API_KEY is set", () => {
    process.env.OPENAI_API_KEY = "sk-test";
    expect(isAiConfigured()).toBe(true);
  });

  it("returns false when OPENAI_API_KEY is missing", () => {
    delete process.env.OPENAI_API_KEY;
    expect(isAiConfigured()).toBe(false);
  });
});

describe("env security", () => {
  it("does not export NEXTAUTH_SECRET directly", () => {
    // Ensure secret env vars are not re-exported on window/global
    expect((globalThis as Record<string,unknown>)["NEXTAUTH_SECRET"]).toBeUndefined();
    expect((globalThis as Record<string,unknown>)["DATABASE_URL"]).toBeUndefined();
    expect((globalThis as Record<string,unknown>)["OPENAI_API_KEY"]).toBeUndefined();
  });
});
