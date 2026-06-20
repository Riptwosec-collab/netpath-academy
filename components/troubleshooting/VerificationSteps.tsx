"use client";

import { useState } from "react";

export default function VerificationSteps({ steps }: { steps: string[] }) {
  const [checked, setChecked] = useState<boolean[]>(Array(steps.length).fill(false));

  const done  = checked.filter(Boolean).length;
  const total = steps.length;
  const pct   = Math.round((done / total) * 100);

  const toggle = (i: number) => {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
  };

  return (
    <div className="rounded-2xl border border-[#38bdf8]/15 bg-[#38bdf8]/[0.03] p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-[#38bdf8]/80">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          ตรวจสอบหลังแก้ไข (Verification)
        </h2>
        <span className="text-[10px] text-white/30">{done}/{total}</span>
      </div>

      {/* Progress */}
      <div className="mb-4 h-1 w-full rounded-full bg-white/[0.06]">
        <div className="h-full rounded-full bg-[#38bdf8]/60 transition-all duration-300"
             style={{ width: `${pct}%` }} />
      </div>

      <ul className="flex flex-col gap-2">
        {steps.map((s, i) => (
          <li key={i}>
            <button
              onClick={() => toggle(i)}
              className={`w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-xl border
                          transition-all text-sm
                          ${checked[i]
                            ? "border-[#22c55e]/25 bg-[#22c55e]/[0.06] text-[#22c55e]/70"
                            : "border-white/[0.06] bg-white/[0.02] text-white/50 hover:border-white/15 hover:text-white/70"}`}>
              {/* Checkbox */}
              <span className={`flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all
                                ${checked[i]
                                  ? "border-[#22c55e]/50 bg-[#22c55e]/20"
                                  : "border-white/15 bg-white/[0.03]"}`}>
                {checked[i] && (
                  <svg className="w-3 h-3 text-[#22c55e]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className={checked[i] ? "line-through opacity-60" : ""}>{s}</span>
            </button>
          </li>
        ))}
      </ul>

      {done === total && (
        <div className="mt-4 px-4 py-3 rounded-xl border border-[#22c55e]/25 bg-[#22c55e]/[0.05]
                        text-sm text-[#22c55e]/80 text-center">
          ✓ ตรวจสอบครบทุกข้อแล้ว — ปัญหาได้รับการแก้ไข
        </div>
      )}
    </div>
  );
}
