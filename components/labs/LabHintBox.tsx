"use client";

import { useState } from "react";
import type { Lab } from "@/data/labs";

export default function LabHintBox({ lab }: { lab: Lab }) {
  const [revealed, setRevealed] = useState<boolean[]>(() => lab.hints.map(() => false));
  const [allOpen, setAllOpen] = useState(false);

  const toggle = (i: number) =>
    setRevealed((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const revealAll = () => {
    setRevealed(lab.hints.map(() => true));
    setAllOpen(true);
  };

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-white/70 flex items-center gap-2">
          <svg className="w-4 h-4 text-[#facc15]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Hints ({revealed.filter(Boolean).length}/{lab.hints.length})
        </h2>
        {!allOpen && (
          <button
            onClick={revealAll}
            className="text-[10px] text-[#facc15]/50 hover:text-[#facc15] transition-colors px-2 py-1 rounded border border-[#facc15]/20 hover:border-[#facc15]/40"
          >
            เปิดทั้งหมด
          </button>
        )}
      </div>

      <div className="space-y-2">
        {lab.hints.map((hint, i) => (
          <div key={i} className="rounded-xl overflow-hidden border border-white/[0.06]">
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left
                         bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <span className="flex items-center gap-2 text-xs text-white/50">
                <span className="w-5 h-5 rounded-full bg-[#facc15]/10 border border-[#facc15]/20 flex items-center justify-center text-[10px] font-bold text-[#facc15]/70 flex-shrink-0">
                  {i + 1}
                </span>
                {revealed[i] ? (
                  <span className="text-white/70">{hint}</span>
                ) : (
                  <span className="text-white/25 italic">คลิกเพื่อดู Hint ที่ {i + 1}...</span>
                )}
              </span>
              <svg
                className={`w-4 h-4 flex-shrink-0 text-white/20 transition-transform ${revealed[i] ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-white/20 mt-4 italic">
        ลองทำด้วยตัวเองก่อน แล้วค่อยเปิด Hint เพื่อการเรียนรู้ที่ดีที่สุด
      </p>
    </div>
  );
}
