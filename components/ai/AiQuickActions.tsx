"use client";
import { aiModes } from "@/data/aiPrompts";
import type { AiMode } from "@/data/aiPrompts";

const QUICK_PROMPTS: Record<AiMode, string> = {
  explain: "อธิบายหัวข้อ Network ที่ฉันต้องการเรียนรู้: ",
  config: "ช่วยตรวจ Config นี้ว่ามีปัญหาอะไรบ้าง:\n",
  log: "ช่วยวิเคราะห์ Log นี้และบอกสาเหตุ:\n",
  lab: "สร้าง Lab ฝึก [หัวข้อ] ระดับ [Beginner/Intermediate/Advanced] พร้อม Topology, IP Table และ Tasks",
  quiz: "สร้าง Quiz เรื่อง [หัวข้อ] จำนวน [N] ข้อ ระดับ [ระดับ] พร้อมเฉลยและคำอธิบาย",
  rca: "ช่วยเขียน RCA กรณี [ชื่อ Incident] ผลกระทบ: [ระบุ] ระยะเวลา: [ระบุ]",
};

export default function AiQuickActions({
  onAction,
}: {
  onAction: (mode: AiMode, prompt: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
      <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-3">Quick Actions</p>
      <div className="flex flex-col gap-1.5">
        {aiModes.map((m) => (
          <button
            key={m.id}
            onClick={() => onAction(m.id, QUICK_PROMPTS[m.id])}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-transparent
                       text-white/40 hover:text-white/70 hover:border-white/[0.08] hover:bg-white/[0.03]
                       transition-all text-left group"
          >
            <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                 style={{ backgroundColor: `${m.color}15` }}>
              <svg className="w-3.5 h-3.5" style={{ color: `${m.color}80` }}
                   fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={m.icon} />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium leading-none">{m.label}</p>
              <p className="text-[10px] text-white/20 mt-0.5 leading-snug truncate">{m.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
