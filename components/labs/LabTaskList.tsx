"use client";

import { useState } from "react";
import type { Lab } from "@/data/labs";

export default function LabTaskList({ lab }: { lab: Lab }) {
  const [checked, setChecked] = useState<boolean[]>(() => lab.tasks.map(() => false));

  const toggle = (i: number) =>
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const resetAll = () => setChecked(lab.tasks.map(() => false));

  const done  = checked.filter(Boolean).length;
  const total = lab.tasks.length;
  const pct   = Math.round((done / total) * 100);

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-white/70 flex items-center gap-2">
          <svg className="w-4 h-4 text-[#22c55e]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          Tasks ({done}/{total})
        </h2>
        {done > 0 && (
          <button
            onClick={resetAll}
            className="text-[10px] text-white/25 hover:text-white/50 transition-colors px-2 py-1 rounded border border-white/[0.06] hover:border-white/20"
          >
            รีเซ็ต
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-white/[0.06] mb-5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#38bdf8] to-[#22c55e] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Task list */}
      <ol className="space-y-2">
        {lab.tasks.map((task, i) => (
          <li key={i}>
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-start gap-3 text-left group"
            >
              {/* Checkbox */}
              <span
                className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded border flex items-center justify-center transition-all
                  ${checked[i]
                    ? "bg-[#22c55e]/20 border-[#22c55e]/50"
                    : "border-white/[0.12] group-hover:border-[#38bdf8]/40"
                  }`}
              >
                {checked[i] && (
                  <svg className="w-3 h-3 text-[#22c55e]" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>

              {/* Step number + text */}
              <span className="flex gap-2 min-w-0">
                <span className="flex-shrink-0 text-[10px] font-mono text-white/25 mt-[3px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-sm leading-relaxed transition-colors ${
                    checked[i] ? "text-white/25 line-through" : "text-white/60 group-hover:text-white/80"
                  }`}
                >
                  {task}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      {/* Completed message */}
      {done === total && (
        <div className="mt-5 p-4 rounded-xl bg-[#22c55e]/[0.06] border border-[#22c55e]/20 flex items-center gap-3">
          <svg className="w-5 h-5 text-[#22c55e] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-[#22c55e]/80 font-medium">ทำ Tasks ครบแล้ว! ตรวจสอบ Expected Result ด้านล่าง</p>
        </div>
      )}
    </div>
  );
}
