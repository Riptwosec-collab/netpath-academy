"use client";
import type { Lab } from "@/data/labs";

const levelColor: Record<string, string> = {
  Beginner:     "text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/20",
  Intermediate: "text-[#facc15] bg-[#facc15]/10 border-[#facc15]/20",
  Advanced:     "text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/20",
};
const statusIcon: Record<string, string> = {
  "not-started": "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  "in-progress": "M13 10V3L4 14h7v7l9-11h-7z",
  "completed":   "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
};
const statusLabel: Record<string, string> = {
  "not-started": "ยังไม่เริ่ม",
  "in-progress": "กำลังทำ",
  "completed":   "เสร็จแล้ว",
};
const statusColor: Record<string, string> = {
  "not-started": "text-white/30",
  "in-progress": "text-[#38bdf8]",
  "completed":   "text-[#22c55e]",
};
const categoryColor: Record<string, string> = {
  Foundation:           "text-[#8b5cf6] bg-[#8b5cf6]/10 border-[#8b5cf6]/20",
  Switching:            "text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/20",
  Routing:              "text-[#facc15] bg-[#facc15]/10 border-[#facc15]/20",
  "Network Services":   "text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/20",
  Security:             "text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/20",
  Automation:           "text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20",
  "AI Infrastructure":  "text-[#a78bfa] bg-[#a78bfa]/10 border-[#a78bfa]/20",
  "Cloud Native":       "text-[#22d3ee] bg-[#22d3ee]/10 border-[#22d3ee]/20",
  "Network Automation": "text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20",
  "Advanced Networking":"text-[#fb923c] bg-[#fb923c]/10 border-[#fb923c]/20",
  Wireless:             "text-[#34d399] bg-[#34d399]/10 border-[#34d399]/20",
  Hardware:             "text-[#fbbf24] bg-[#fbbf24]/10 border-[#fbbf24]/20",
};

export default function LabCard({ lab, onClick }: { lab: Lab; onClick?: () => void }) {
  const catCls  = categoryColor[lab.category]  ?? "text-white/50 bg-white/5 border-white/10";
  const lvlCls  = levelColor[lab.level]        ?? "text-white/50 bg-white/5 border-white/10";
  const stColor = statusColor[lab.status]      ?? "text-white/30";
  const stIcon  = statusIcon[lab.status]       ?? statusIcon["not-started"];
  const stLabel = statusLabel[lab.status]      ?? "ยังไม่เริ่ม";

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex flex-col gap-3 p-5 rounded-xl text-left w-full
                 bg-white/[0.03] border border-white/[0.07]
                 hover:border-[#38bdf8]/30 hover:bg-white/[0.05]
                 transition-all duration-200 cursor-pointer"
    >
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      bg-gradient-to-br from-[#38bdf8]/[0.03] to-[#8b5cf6]/[0.03] pointer-events-none" />

      <div className="flex items-center justify-between gap-2 relative z-10">
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${catCls}`}>
          {lab.category}
        </span>
        <span className="text-[10px] text-white/25 font-mono">{lab.duration}</span>
      </div>

      <div className="relative z-10">
        <h3 className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors leading-snug">
          {lab.title}
        </h3>
        <p className="text-xs text-white/35 mt-1 line-clamp-2 leading-relaxed">{lab.description}</p>
      </div>

      <div className="flex flex-wrap gap-1 relative z-10">
        {(lab.devices ?? []).slice(0, 4).map((d) => (
          <span key={d} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-white/30 border border-white/[0.06]">
            {d}
          </span>
        ))}
        {(lab.devices?.length ?? 0) > 4 && (
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-white/20">
            +{(lab.devices?.length ?? 0) - 4}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between relative z-10 pt-1 border-t border-white/[0.05]">
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${lvlCls}`}>{lab.level}</span>
        <span className={`flex items-center gap-1 text-[10px] font-medium ${stColor}`}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={stIcon} />
          </svg>
          {stLabel}
        </span>
      </div>

      {lab.status === "in-progress" && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl bg-gradient-to-r from-[#38bdf8] to-[#8b5cf6]" />
      )}
      {lab.status === "completed" && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl bg-gradient-to-r from-[#22c55e] to-[#38bdf8]" />
      )}
    </button>
  );
}
