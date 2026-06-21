import { describe, it, expect } from "vitest";
import { validateAiRequest } from "@/lib/aiValidation";

describe("validateAiRequest", () => {
  it("accepts a valid request", () => {
    const result = validateAiRequest({
      mode:    "explain",
      message: "What is OSPF?",
      history: [],
    });
    expect(result.valid).toBe(true);
  });

  it("rejects empty message", () => {
    const result = validateAiRequest({ mode: "explain", message: "", history: [] });
    expect(result.valid).toBe(false);
    expect((result as { valid: false; error: string }).error).toBeTruthy();
  });

  it("rejects message with only whitespace", () => {
    const result = validateAiRequest({ mode: "explain", message: "   ", history: [] });
    expect(result.valid).toBe(false);
  });

  it("rejects invalid mode", () => {
    const result = validateAiRequest({ mode: "invalid_mode", message: "hello", history: [] });
    expect(result.valid).toBe(false);
  });

  it("rejects message over 8000 chars", () => {
    const result = validateAiRequest({
      mode:    "explain",
      message: "a".repeat(8001),
      history: [],
    });
    expect(result.valid).toBe(false);
  });

  it("accepts message exactly 8000 chars", () => {
    const result = validateAiRequest({
      mode:    "explain",
      message: "a".repeat(8000),
      history: [],
    });
    expect(result.valid).toBe(true);
  });

  it("rejects history over 10 items", () => {
    const history = Array.from({ length: 11 }, (_, i) => ({
      role:    i % 2 === 0 ? ("user" as const) : ("assistant" as const),
      content: "msg",
    }));
    const result = validateAiRequest({ mode: "explain", message: "test", history });
    expect(result.valid).toBe(false);
  });

  it("rejects history with invalid role", () => {
    const result = validateAiRequest({
      mode:    "explain",
      message: "test",
      history: [{ role: "system" as "user", content: "hack" }],
    });
    expect(result.valid).toBe(false);
  });

  it("accepts all valid modes", () => {
    const validModes = ["explain","config","log","lab","quiz","rca","summary","troubleshooting","commands","portfolio"];
    validModes.forEach((mode) => {
      const result = validateAiRequest({ mode, message: "test", history: [] });
      expect(result.valid).toBe(true);
    });
  });
});
