"use client";
import { useEffect, useRef } from "react";
import AiMessageBubble from "./AiMessageBubble";
import TypingIndicator from "./TypingIndicator";
import type { AiMessage } from "@/lib/mockAiTutor";

export default function AiChatBox({
  messages,
  isTyping,
}: {
  messages: AiMessage[];
  isTyping: boolean;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (messages.length === 0 && !isTyping) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-5 px-4 py-12 text-center">
        {/* Glow icon */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#38bdf8]/10 blur-2xl scale-150" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#38bdf8]/20 to-[#8b5cf6]/20
                          border border-[#38bdf8]/25 flex items-center justify-center">
            <svg className="w-7 h-7 text-[#38bdf8]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
        <div>
          <p className="text-base font-semibold text-white/80 mb-1">สวัสดีครับ! ผมคือ AI Network Tutor</p>
          <p className="text-xs text-white/35 max-w-sm leading-relaxed">
            ถามได้เลย — อธิบายหัวข้อ Network, วิเคราะห์ Config / Log, สร้าง Lab, Quiz หรือช่วยเขียน RCA
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 max-w-md">
          {["อธิบาย OSPF คืออะไร", "ช่วยวิเคราะห์ MAC Flapping Log", "สร้าง VLAN Lab ให้หน่อย"].map((hint) => (
            <span key={hint}
              className="px-3 py-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03]
                         text-xs text-white/30 cursor-default">
              {hint}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        {messages.map((msg) => (
          <AiMessageBubble key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
