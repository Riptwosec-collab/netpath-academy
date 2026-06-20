// Server-side ONLY — never import this in client components
// OPENAI_API_KEY must NOT be prefixed with NEXT_PUBLIC_

import OpenAI from "openai";

let _client: OpenAI | null = null;

export function getOpenAiClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  if (!_client) {
    _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _client;
}

export function getAiModel(): string {
  return process.env.AI_MODEL ?? "gpt-4.1-mini";
}

export function isOpenAiConfigured(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}
