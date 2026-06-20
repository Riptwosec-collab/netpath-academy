"use client";

import { useState, useCallback } from "react";
import AiModeSelector    from "./AiModeSelector";
import AiSuggestionCards from "./AiSuggestionCards";
import AiChatBox         from "./AiChatBox";
import AiInputBox        from "./AiInputBox";
import AiQuickActions    from "./AiQuickActions";
import AiHistoryPanel    from "./AiHistoryPanel";
import ConfigAnalyzer    from "./ConfigAnalyzer";
import LogAnalyzer       from "./LogAnalyzer";
import LabGenerator      from "./LabGenerator";
import QuizGenerator     from "./QuizGenerator";
import RcaHelper         from "./RcaHelper";
import { getMockAiResponse } from "@/lib/mockAiTutor";
import type { AiMessage }    from "@/lib/mockAiTutor";
import type { AiMode }       from "@/data/aiPrompts";

export default function AiTutorShell() {
  const [mode,      setMode]      = useState<AiMode>("explain");
  const [messages,  setMessages]  = useState<AiMessage[]>([]);
  const [input,     setInput]     = useState("");
  const [isTyping,  setIsTyping]  = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const sendMessage = useCallback(async (text: string, sendMode?: AiMode) => {
    const usedMode = sendMode ?? mode;
    const trimmed  = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg: AiMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
      mode: usedMode,
      createdAt: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // ── Try real OpenAI API ───────────────────────────────────────────────
      const res = await fetch("/api/ai-tutor", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          mode:    usedMode,
          message: trimmed,
          history: messages.slice(-6).map(({ role, content }) => ({ role, content })),
        }),
      });

      let responseContent: string;

      if (!res.ok) {
        const err = await res.json().catch(() => ({})) as { error?: string };
        if (res.status === 503) {
          // API not configured — fall back to mock
          responseContent = getMockAiResponse(trimmed, usedMode);
          responseContent = `⚠️ **AI API ยังไม่ได้ตั้งค่า** (ใช้ Mock Response)\n\n${responseContent}`;
        } else {
          responseContent = `❌ เกิดข้อผิดพลาด: ${err.error ?? "ไม่ทราบสาเหตุ"}\n\nกำลังใช้ Mock Response...\n\n${getMockAiResponse(trimmed, usedMode)}`;
        }
      } else {
        const data = await res.json() as { content?: string };
        responseContent = data.content ?? getMockAiResponse(trimmed, usedMode);
      }

      const aiMsg: AiMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: responseContent,
        mode: usedMode,
        createdAt: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      // Network error — fall back to mock
      const fallback = getMockAiResponse(trimmed, usedMode);
      const aiMsg: AiMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: `⚠️ **ไม่สามารถเชื่อมต่อ AI API ได้** (ใช้ Mock Response)\n\n${fallback}`,
        mode: usedMode,
        createdAt: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsTyping(false);
    }
  }, [mode, isTyping, messages]);

  const handleSend       = () => sendMessage(input);
  const handleSuggestion = (prompt: string) => sendMessage(prompt);
  const handleClear      = () => { setMessages([]); setInput(""); };
  const handleQuickAction = (m: AiMode, prompt: string) => {
    setMode(m);
    setInput(prompt);
  };
  const handleToolSubmit = (prompt: string, m?: AiMode) => {
    const targetMode = m ?? mode;
    setMode(targetMode);
    sendMessage(prompt, targetMode);
  };

  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden">

      {/* ── LEFT: Chat Area ──────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* Header controls */}
        <div className="flex-shrink-0 px-4 pt-4 pb-3 space-y-3 border-b border-white/[0.06]">
          {/* Page title + tools toggle (mobile) */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-sm font-bold text-white/90">AI Network Tutor</h1>
              <p className="text-[10px] text-white/30">ผู้ช่วย Network Engineer — Mock AI</p>
            </div>
            <button
              onClick={() => setToolsOpen((p) => !p)}
              className="xl:hidden px-3 py-1.5 rounded-lg border border-white/[0.08] text-white/35 text-xs
                         hover:border-white/20 hover:text-white/60 transition-all"
            >
              {toolsOpen ? "ซ่อน Tools" : "Tools ▸"}
            </button>
          </div>

          {/* Mode selector */}
          <AiModeSelector mode={mode} onChange={setMode} />

          {/* Suggestion cards */}
          <AiSuggestionCards mode={mode} onSelect={handleSuggestion} />
        </div>

        {/* Chat messages */}
        <AiChatBox messages={messages} isTyping={isTyping} />

        {/* Input */}
        <AiInputBox
          value={input}
          onChange={setInput}
          onSend={handleSend}
          onClear={handleClear}
          disabled={isTyping}
        />
      </div>

      {/* ── RIGHT: Tools sidebar ─────────────────────────────── */}
      <aside
        className={`
          ${toolsOpen ? "flex" : "hidden"} xl:flex
          w-72 flex-shrink-0 flex-col gap-3
          border-l border-white/[0.06] bg-[#050816]
          overflow-y-auto p-3
          xl:block
          fixed xl:static inset-y-0 right-0 top-14 z-40
        `}
      >
        <AiQuickActions onAction={handleQuickAction} />
        <AiHistoryPanel />

        {/* Contextual tool — show based on mode */}
        {mode === "config" && (
          <ConfigAnalyzer onAnalyze={(p) => handleToolSubmit(p, "config")} />
        )}
        {mode === "log" && (
          <LogAnalyzer onAnalyze={(p) => handleToolSubmit(p, "log")} />
        )}
        {mode === "lab" && (
          <LabGenerator onGenerate={(p) => handleToolSubmit(p, "lab")} />
        )}
        {mode === "quiz" && (
          <QuizGenerator onGenerate={(p) => handleToolSubmit(p, "quiz")} />
        )}
        {mode === "rca" && (
          <RcaHelper onGenerate={(p) => handleToolSubmit(p, "rca")} />
        )}
      </aside>

      {/* Mobile backdrop */}
      {toolsOpen && (
        <div
          className="xl:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={() => setToolsOpen(false)}
        />
      )}
    </div>
  );
}
