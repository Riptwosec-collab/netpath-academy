import { NextRequest, NextResponse } from "next/server";
import { getOpenAiClient, getAiModel, isOpenAiConfigured } from "@/lib/openai";
import { AI_SYSTEM_PROMPT, getModeInstruction, PRODUCTION_WARNING } from "@/lib/aiSystemPrompt";
import { validateAiRequest } from "@/lib/aiValidation";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import type { AiTutorResponse } from "@/types/ai";

export async function POST(req: NextRequest) {
  // ── Rate limit: 10 req/min per IP ───────────────────────────────────────────
  const ip = getClientIp(req);
  const rl = checkRateLimit(`ai-tutor:${ip}`, { limit: 10, window: 60_000 });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests — กรุณารอ 1 นาทีแล้วลองใหม่" },
      {
        status: 429,
        headers: {
          "Retry-After":        String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
          "X-RateLimit-Limit":  "10",
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  // ── Check configuration ─────────────────────────────────────────────────────
  if (!isOpenAiConfigured()) {
    return NextResponse.json(
      { error: "AI API is not configured. Please set OPENAI_API_KEY in .env.local" },
      { status: 503 }
    );
  }

  // ── Parse & validate ────────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateAiRequest(body);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { mode, message, history } = validation.data;

  // ── Build messages ───────────────────────────────────────────────────────────
  const modeInstruction = getModeInstruction(mode);
  const systemContent = `${AI_SYSTEM_PROMPT}\n\n${modeInstruction}`;

  const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
    { role: "system", content: systemContent },
  ];

  // Include previous history (capped)
  if (history?.length) {
    for (const h of history.slice(-8)) {
      messages.push({ role: h.role, content: h.content });
    }
  }

  // Add production warning for sensitive modes
  let userMessage = message;
  if (mode === "config" || mode === "log") {
    userMessage = `${message}\n\n---\n${PRODUCTION_WARNING}`;
  }

  messages.push({ role: "user", content: userMessage });

  // ── Call OpenAI ──────────────────────────────────────────────────────────────
  try {
    const openai = getOpenAiClient();
    const completion = await openai.chat.completions.create({
      model:       getAiModel(),
      messages,
      max_tokens:  2000,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content ?? "ไม่มีคำตอบ กรุณาลองใหม่";

    // TODO Phase 11 integration: save to AiConversation table
    // const session = await getServerSession(authOptions);
    // if (session?.user?.id) {
    //   await prisma.aiConversation.create({
    //     data: { userId: session.user.id, mode, message, response: content }
    //   });
    // }

    const response: AiTutorResponse = { content, mode };
    return NextResponse.json(response);
  } catch (err: unknown) {
    // Do not expose internal error to client
    console.error("[AI Tutor API Error]", err);

    const message =
      err instanceof Error && err.message.includes("API key")
        ? "OpenAI API Key ไม่ถูกต้อง"
        : "เกิดข้อผิดพลาดกับ AI กรุณาลองใหม่";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
