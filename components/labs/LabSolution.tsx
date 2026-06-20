"use client";

import { useState } from "react";
import type { Lab } from "@/data/labs";

export default function LabSolution({ lab }: { lab: Lab }) {
  const [revealed, setRevealed] = useState(false);
  const [copied,   setCopied]   = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(lab.solution);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {/* silent */}
  };

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 md:p-6">
      <h2 className="text-sm font-semibold text-white/70 flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-[#8b5cf6]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        Solution / เฉลย
      </h2>

      {!revealed ? (
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="w-14 h-14 rounded-2xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-[#8b5cf6]/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm text-white/50 mb-1">เฉลยถูกซ่อนอยู่</p>
            <p className="text-xs text-white/25">ลองทำ Lab ด้วยตัวเองก่อน แล้วค่อยดูเฉลย</p>
          </div>
          <button
            onClick={() => setRevealed(true)}
            className="px-5 py-2.5 rounded-xl bg-[#8b5cf6]/15 border border-[#8b5cf6]/30 text-[#8b5cf6]/90 text-sm font-medium
                       hover:bg-[#8b5cf6]/25 hover:border-[#8b5cf6]/50 transition-all duration-200"
          >
            เปิดดูเฉลย
          </button>
        </div>
      ) : (
        <div>
          {/* Warning */}
          <div className="mb-3 flex items-start gap-2 px-3 py-2 rounded-lg bg-[#facc15]/[0.05] border border-[#facc15]/[0.12]">
            <svg className="w-4 h-4 text-[#facc15]/60 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-[10px] text-[#facc15]/60">การดูเฉลยโดยไม่ลองทำเองจะทำให้พลาดโอกาสฝึกทักษะการแก้ปัญหา</p>
          </div>

          {/* Code block */}
          <div className="relative">
            <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
              <button
                onClick={copy}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.07] border border-white/[0.1]
                           text-[10px] text-white/40 hover:text-white/70 hover:bg-white/[0.1] transition-all"
              >
                {copied ? (
                  <>
                    <svg className="w-3 h-3 text-[#22c55e]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#22c55e]">คัดลอกแล้ว!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    คัดลอก
                  </>
                )}
              </button>
            </div>

            <pre className="overflow-x-auto scrollbar-none rounded-xl bg-[#0a0f1e] border border-white/[0.07]
                           p-4 pt-10 text-[11px] leading-relaxed font-mono text-white/60 whitespace-pre">
              <code>{lab.solution}</code>
            </pre>
          </div>

          <button
            onClick={() => setRevealed(false)}
            className="mt-3 text-[10px] text-white/20 hover:text-white/40 transition-colors"
          >
            ซ่อนเฉลย
          </button>
        </div>
      )}
    </div>
  );
}
