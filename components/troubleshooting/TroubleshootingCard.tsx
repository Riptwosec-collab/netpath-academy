import Link from "next/link";
import type { TroubleshootingGuide } from "@/data/troubleshooting";

const severityStyle: Record<string, string> = {
  Low:      "border-[#38bdf8]/25 bg-[#38bdf8]/10 text-[#38bdf8]/80",
  Medium:   "border-[#facc15]/30 bg-[#facc15]/10 text-[#facc15]",
  High:     "border-[#f97316]/30 bg-[#f97316]/10 text-[#f97316]",
  Critical: "border-[#ef4444]/35 bg-[#ef4444]/10 text-[#ef4444]",
};

const severityGlow: Record<string, string> = {
  Low:      "group-hover:border-[#38bdf8]/30",
  Medium:   "group-hover:border-[#facc15]/30",
  High:     "group-hover:border-[#f97316]/30",
  Critical: "group-hover:border-[#ef4444]/40",
};

const levelStyle: Record<string, string> = {
  Beginner:     "text-[#22c55e]/70",
  Intermediate: "text-[#facc15]/70",
  Advanced:     "text-[#ef4444]/70",
};

export default function TroubleshootingCard({ guide }: { guide: TroubleshootingGuide }) {
  const svGlow = severityGlow[guide.severity] ?? "";

  return (
    <Link href={`/troubleshooting/${guide.id}`}
      className={`group relative flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.03]
                  hover:bg-white/[0.05] ${svGlow} transition-all duration-200 overflow-hidden`}>
      {/* Top severity bar */}
      <div className={`h-0.5 w-full ${
        guide.severity === "Critical" ? "bg-[#ef4444]" :
        guide.severity === "High"     ? "bg-[#f97316]" :
        guide.severity === "Medium"   ? "bg-[#facc15]" : "bg-[#38bdf8]"
      } opacity-60`} />

      <div className="flex flex-col gap-3 p-5 relative z-10 flex-1">
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5">
          <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${severityStyle[guide.severity]}`}>
            {guide.severity}
          </span>
          <span className="text-[10px] font-medium px-2.5 py-1 rounded-full border border-white/10 text-white/40">
            {guide.category}
          </span>
          <span className={`text-[10px] font-medium ${levelStyle[guide.level]}`}>
            {guide.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-white/90 leading-snug group-hover:text-white transition-colors">
          {guide.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-white/40 leading-[1.7] line-clamp-2 flex-1">{guide.description}</p>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 text-[10px] text-white/25 pt-1 border-t border-white/[0.05]">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {guide.symptoms.length} อาการ
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {guide.commands.length} คำสั่ง
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
            {guide.flowSteps.length} ขั้นตอน
          </span>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-end">
          <span className="flex items-center gap-1 text-[11px] font-medium text-white/30
                           group-hover:text-[#38bdf8] transition-colors">
            View Guide
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                 fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
