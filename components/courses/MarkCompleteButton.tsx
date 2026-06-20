"use client";

import { useState } from "react";

export default function MarkCompleteButton({ lessonId }: { lessonId: string }) {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-white/70">เสร็จสิ้นบทเรียนนี้แล้วใช่ไหม?</p>
        <p className="text-xs text-white/30 mt-0.5">กดปุ่มเพื่อทำเครื่องหมายว่าเรียนจบบทนี้แล้ว</p>
      </div>
      <button
        onClick={() => setCompleted((v) => !v)}
        className={`flex-shrink-0 flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-medium text-sm border transition-all duration-200 ${
          completed
            ? "bg-[#22c55e]/15 border-[#22c55e]/40 text-[#22c55e] hover:bg-[#22c55e]/25"
            : "bg-white/[0.05] border-white/[0.12] text-white/60 hover:border-[#22c55e]/30 hover:text-[#22c55e]/80 hover:bg-[#22c55e]/[0.06]"
        }`}
      >
        {completed ? (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            เรียนจบแล้ว!
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Mark as Completed
          </>
        )}
      </button>
    </div>
  );
}
