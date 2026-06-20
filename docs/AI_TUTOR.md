# AI Tutor — NetPath Academy

## Overview

The AI Network Tutor is powered by OpenAI's API. It operates exclusively server-side — the API key is never exposed to the browser.

## AI Modes (10 modes)

| Mode | Description |
|------|-------------|
| `explain` | Explain networking concepts in Thai/English |
| `config` | Analyze and generate Cisco/network configurations |
| `log` | Analyze network logs and identify issues |
| `lab` | Generate lab exercises and guide hands-on tasks |
| `quiz` | Create quiz questions and verify answers |
| `rca` | Root Cause Analysis helper |
| `summary` | Summarize technical documents or topics |
| `troubleshooting` | Step-by-step troubleshooting guide |
| `commands` | Generate CLI commands for specific tasks |
| `portfolio` | Review and suggest improvements for portfolio items |

## System Prompt Design

The AI is given:
1. A base system prompt defining its role as a Thai-English Network Engineer tutor
2. A mode-specific instruction that changes its behavior per mode
3. For `config` and `log` modes: a production warning reminding it not to output real credentials

The system prompt instructs the AI to:
- Respond in Thai (with technical terms in English)
- Focus on Cisco IOS, networking fundamentals, and practical scenarios
- Format responses with markdown for readability

## API Flow

```
User types message
        ↓
AiTutorShell.tsx (Client Component)
        ↓
POST /api/ai-tutor (App Router API route)
        ↓
Rate limit check (10 req/min/IP)
        ↓
validateAiRequest() — mode, message, history checks
        ↓
Build messages array (system + history + user)
        ↓
openai.chat.completions.create()
        ↓
Return { content, mode }
        ↓
Display in chat UI
```

## Fallback (503 / Network Error)

If `OPENAI_API_KEY` is not set or the API is unreachable:
1. Server returns `503 Service Unavailable`
2. Client catches 503 and calls `getMockAiResponse()`
3. Response prefixed with `⚠️ AI API ยังไม่ได้ตั้งค่า (ใช้ Mock Response)`

This allows the UI to always work, even without an API key.

## Environment Setup

```env
OPENAI_API_KEY="sk-..."         # Required for real AI
AI_MODEL="gpt-4.1-mini"         # Or gpt-4o, gpt-3.5-turbo
```

## Security

- `OPENAI_API_KEY` lives only in `.env.local` / Vercel environment
- Never used in `"use client"` files
- Never sent in API responses
- Never exposed via `NEXT_PUBLIC_` prefix
- All input validated before forwarding to OpenAI

## Rate Limiting

- 10 requests per minute per IP (in-memory)
- For production scale: replace with Upstash Redis or Vercel KV
- Client receives `429` with `Retry-After` header

## How to Extend

### Add a new mode:
1. Add mode string to `AiMode` union in `types/ai.ts`
2. Add to `AI_MODES` array in `types/ai.ts`
3. Add `getModeInstruction()` case in `lib/aiSystemPrompt.ts`
4. Optionally add a button in `AiModeSelector.tsx`

### Change the AI model:
- Set `AI_MODEL` env var (e.g. `gpt-4o`, `gpt-4.1-mini`)
- The model is read server-side via `getAiModel()` in `lib/openai.ts`
