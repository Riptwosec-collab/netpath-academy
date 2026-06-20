"use client";
import { useState } from "react";

export default function RcaHelper({
  onGenerate,
}: {
  onGenerate: (prompt: string) => void;
}) {
  const [title,    setTitle]    = useState("");
  const [impact,   setImpact]   = useState("");
  const [cause,    setCause]    = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    const prompt = [
      `ช่วยเขียน RCA (Root Cause Analysis) ฉบับสมบูรณ์สำหรับ Incident นี้:`,
      `\nIncident: ${title}`,
      impact ? `Impact: ${impact}` : "",
      cause  ? `สาเหตุเบื้องต้น: ${cause}` : "",
      `\nต้องมีหัวข้อ: Incident Title, Impact, Timeline, Root Cause, Contributing Factors, Resolution, Prevention Actions`,
    ].filter(Boolean).join("\n");
    onGenerate(prompt);
    setTitle(""); setImpact(""); setCause("");
  };

  return (
    <div className="rounded-2xl border border-[#ef4444]/15 bg-[#ef4444]/[0.03] p-4">
      <h3 className="flex items-center gap-2 text-xs font-semibold text-[#ef4444]/80 mb-3">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        RCA Helper
      </h3>
      <div className="space-y-2">
        <div>
          <label className="text-[10px] text-white/30 mb-1 block">Incident Title *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="เช่น Internet ใช้งานไม่ได้ทั้งสาขา"
            className="w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-2
                       text-xs text-white/70 placeholder:text-white/20
                       focus:outline-none focus:border-[#ef4444]/40 transition-all"
          />
        </div>
        <div>
          <label className="text-[10px] text-white/30 mb-1 block">Impact (ผลกระทบ)</label>
          <input
            value={impact}
            onChange={(e) => setImpact(e.target.value)}
            placeholder="เช่น พนักงาน 200 คน ไม่สามารถทำงานได้ 45 นาที"
            className="w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-2
                       text-xs text-white/70 placeholder:text-white/20
                       focus:outline-none focus:border-[#ef4444]/40 transition-all"
          />
        </div>
        <div>
          <label className="text-[10px] text-white/30 mb-1 block">Root Cause เบื้องต้น</label>
          <input
            value={cause}
            onChange={(e) => setCause(e.target.value)}
            placeholder="เช่น Default Route บน Firewall ถูกเปลี่ยนผิด"
            className="w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-2
                       text-xs text-white/70 placeholder:text-white/20
                       focus:outline-none focus:border-[#ef4444]/40 transition-all"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={!title.trim()}
          className="w-full py-2 rounded-xl bg-[#ef4444]/12 border border-[#ef4444]/35 text-[#ef4444]
                     text-xs font-medium hover:bg-[#ef4444]/20 transition-all mt-1
                     disabled:opacity-30 disabled:cursor-not-allowed">
          Generate RCA
        </button>
      </div>
    </div>
  );
}
