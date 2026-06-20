"use client";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AiInputBox({
  value,
  onChange,
  onSend,
  onClear,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  onClear: () => void;
  disabled?: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { t, lang } = useLanguage();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const placeholder = lang === "th"
    ? "พิมพ์คำถามเกี่ยวกับ Network... (Enter = ส่ง, Shift+Enter = ขึ้นบรรทัดใหม่)"
    : "Ask anything about networking... (Enter = send, Shift+Enter = new line)";

  const mockNote = lang === "th"
    ? "Mock AI — ข้อมูลเป็นตัวอย่างสำหรับการเรียนรู้ ยังไม่ต่อ OpenAI API จริง"
    : "Mock AI — demo responses only. Connect OpenAI API for real answers.";

  return (
    <div className="border-t border-white/[0.07] bg-[#050816]/80 backdrop-blur-xl px-4 py-3">
      <div className="max-w-4xl mx-auto flex flex-col gap-2">
        <div className="flex items-end gap-2 rounded-2xl border border-white/[0.09] bg-white/[0.04]
                        focus-within:border-[#38bdf8]/40 focus-within:bg-white/[0.06] transition-all px-3 py-2">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            rows={1}
            placeholder={placeholder}
            className="flex-1 resize-none bg-transparent text-sm text-white/80 placeholder:text-white/20
                       outline-none leading-relaxed min-h-[36px] max-h-40 overflow-y-auto
                       disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ fieldSizing: "content" } as React.CSSProperties}
          />
          <div className="flex items-center gap-1.5 flex-shrink-0 pb-0.5">
            {/* Clear */}
            <button
              onClick={onClear}
              title={lang === "th" ? "ล้าง Chat" : "Clear chat"}
              className="w-8 h-8 rounded-lg border border-white/[0.07] text-white/25
                         hover:border-white/20 hover:text-white/50 transition-all flex items-center justify-center"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            {/* Send */}
            <button
              onClick={onSend}
              disabled={disabled || !value.trim()}
              aria-label={t("ai.send")}
              className="w-8 h-8 rounded-lg bg-[#38bdf8]/20 border border-[#38bdf8]/35 text-[#38bdf8]
                         hover:bg-[#38bdf8]/30 transition-all flex items-center justify-center
                         disabled:opacity-30 disabled:cursor-not-allowed"
             >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
