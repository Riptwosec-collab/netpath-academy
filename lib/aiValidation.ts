import type { AiMode, AiTutorRequest } from "@/types/ai";
import { AI_MODES } from "@/types/ai";

const MAX_MESSAGE_LENGTH  = 8000;
const MAX_HISTORY_ENTRIES = 10;

export type ValidationResult =
  | { valid: true;  data: AiTutorRequest }
  | { valid: false; error: string };

export function validateAiRequest(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Request body ไม่ถูกต้อง" };
  }

  const b = body as Record<string, unknown>;

  // mode
  if (!b.mode || typeof b.mode !== "string") {
    return { valid: false, error: "กรุณาระบุ mode" };
  }
  if (!AI_MODES.includes(b.mode as AiMode)) {
    return { valid: false, error: `mode ไม่ถูกต้อง ต้องเป็นหนึ่งใน: ${AI_MODES.join(", ")}` };
  }

  // message
  if (!b.message || typeof b.message !== "string") {
    return { valid: false, error: "กรุณาใส่ message" };
  }
  if (b.message.trim().length === 0) {
    return { valid: false, error: "message ต้องไม่ว่าง" };
  }
  if (b.message.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: `message ยาวเกินไป (สูงสุด ${MAX_MESSAGE_LENGTH} ตัวอักษร)` };
  }

  // history (optional)
  if (b.history !== undefined) {
    if (!Array.isArray(b.history)) {
      return { valid: false, error: "history ต้องเป็น array" };
    }
    if (b.history.length > MAX_HISTORY_ENTRIES) {
      return { valid: false, error: `history มีได้สูงสุด ${MAX_HISTORY_ENTRIES} messages` };
    }
    for (const h of b.history) {
      if (!h || typeof h !== "object") return { valid: false, error: "history item ไม่ถูกต้อง" };
      const hi = h as Record<string, unknown>;
      if (hi.role !== "user" && hi.role !== "assistant") {
        return { valid: false, error: "history role ต้องเป็น user หรือ assistant" };
      }
      if (typeof hi.content !== "string") {
        return { valid: false, error: "history content ต้องเป็น string" };
      }
    }
  }

  return {
    valid: true,
    data: {
      mode:    b.mode as AiMode,
      message: b.message.trim(),
      context: typeof b.context === "string" ? b.context : undefined,
      history: Array.isArray(b.history)
        ? (b.history as { role: "user" | "assistant"; content: string }[])
        : undefined,
    },
  };
}
