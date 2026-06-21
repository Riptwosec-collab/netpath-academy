import Link from "next/link";
import type { Lab } from "@/data/labs";

const levelColor: Record<string, string> = {
  Beginner:     "text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/25",
  Intermediate: "text-[#facc15] bg-[#facc15]/10 border-[#facc15]/25",
  Advanced:     "text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/25",
};

const categoryColor: Record<string, string> = {
  Foundation:        "text-[#8b5cf6] bg-[#8b5cf6]/10 border-[#8b5cf6]/25",
  Switching:         "text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/25",
  Routing:           "text-[#facc15] bg-[#facc15]/10 border-[#facc15]/25",
  "Network Services":"text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/25",
  Security:          "text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/25",
  Automation:        "text-[#f97316] bg-[#f97316]/10 border-[#f97316]/25",
};

export default function LabHeader({ lab }: { lab: Lab }) {
  const lvlCls = levelColor[lab.level]   ?? "text-white/50 bg-white/5 border-white/10";
  const catCls = categoryColor[lab.category] ?? "text-white/50 bg-white/5 border-white/10";

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.03] p-6 md:p-8">
      {/* Ambient glow */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full
                      bg-[#38bdf8]/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full
                      bg-[#8b5cf6]/5 blur-3xl pointer-events-none" />

      {/* Back link */}
      <Link
        href="/labs"
        className="inline-flex items-center gap-1.5 text-xs text-white/35 hover:text-white/70 transition-colors mb-5 group"
      >
        <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        กลับไปรายการ Labs
      </Link>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4 relative z-10">
        <span className={`text-xs font-medium px-3 py-1 rounded-full border ${catCls}`}>
          {lab.category}
        </span>
        <span className={`text-xs font-medium px-3 py-1 rounded-full border ${lvlCls}`}>
          {lab.level}
        </span>
        <span className="text-xs font-mono px-3 py-1 rounded-full border border-white/[0.08] text-white/30">
          ⏱ {lab.duration}
        </span>
        <span className="text-xs font-mono px-3 py-1 rounded-full border border-white/[0.08] text-white/30">
          {(lab.devices ?? []).length} อุปกรณ์
        </span>
      </div>

      {/* Title */}
      <h1 className="text-xl md:text-2xl font-bold text-white/95 mb-3 relative z-10">
        {lab.title}
      </h1>

      {/* Description */}
      <p className="text-sm text-white/50 leading-relaxed max-w-2xl relative z-10">
        {lab.description}
      </p>

      {/* Scenario */}
      <div className="mt-5 p-4 rounded-xl bg-[#facc15]/[0.04] border border-[#facc15]/[0.12] relative z-10">
        <p className="text-[10px] font-semibold text-[#facc15]/70 uppercase tracking-wider mb-1.5">
          สถานการณ์
        </p>
        <p className="text-sm text-white/60 leading-relaxed">{lab.scenario}</p>
      </div>

      {/* Objective */}
      <div className="mt-3 p-4 rounded-xl bg-[#38bdf8]/[0.04] border border-[#38bdf8]/[0.12] relative z-10">
        <p className="text-[10px] font-semibold text-[#38bdf8]/70 uppercase tracking-wider mb-1.5">
          วัตถุประสงค์
        </p>
        <p className="text-sm text-white/70 leading-relaxed">{lab.objective}</p>
      </div>
    </div>
  );
}
