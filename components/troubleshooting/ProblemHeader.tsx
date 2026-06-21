import type { TroubleshootingGuide } from "@/data/troubleshooting";

const severityStyle: Record<string, { badge: string; glow: string; bar: string }> = {
  Low:      { badge: "border-[#38bdf8]/30 bg-[#38bdf8]/10 text-[#38bdf8]",   glow: "bg-[#38bdf8]/6",  bar: "bg-[#38bdf8]" },
  Medium:   { badge: "border-[#facc15]/30 bg-[#facc15]/10 text-[#facc15]",   glow: "bg-[#facc15]/5",  bar: "bg-[#facc15]" },
  High:     { badge: "border-[#f97316]/30 bg-[#f97316]/10 text-[#f97316]",   glow: "bg-[#f97316]/6",  bar: "bg-[#f97316]" },
  Critical: { badge: "border-[#ef4444]/35 bg-[#ef4444]/10 text-[#ef4444]",   glow: "bg-[#ef4444]/7",  bar: "bg-[#ef4444]" },
};

const levelColor: Record<string, string> = {
  Beginner:     "border-[#22c55e]/25 bg-[#22c55e]/10 text-[#22c55e]/80",
  Intermediate: "border-[#facc15]/25 bg-[#facc15]/10 text-[#facc15]/80",
  Advanced:     "border-[#ef4444]/25 bg-[#ef4444]/10 text-[#ef4444]/80",
};

export default function ProblemHeader({ guide }: { guide: TroubleshootingGuide }) {
  const sv = severityStyle[guide.severity] ?? severityStyle.Medium;

  return (
    <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden p-5 md:p-6">
      {/* Severity bar */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${sv.bar} opacity-70`} />
      {/* Ambient */}
      <div className={`absolute -top-20 -right-20 w-56 h-56 rounded-full ${sv.glow} blur-3xl pointer-events-none`} />
      <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-[#8b5cf6]/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-3">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span className={`text-[10px] font-semibold px-3 py-1 rounded-full border ${sv.badge} tracking-wide`}>
            ⚠ {guide.severity}
          </span>
          <span className="text-[10px] font-medium px-2.5 py-1 rounded-full border border-[#38bdf8]/20 bg-[#38bdf8]/8 text-[#38bdf8]/70">
            {guide.category}
          </span>
          <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${levelColor[guide.level] ?? ""}`}>
            {guide.level}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-xl md:text-2xl font-bold text-white/95">{guide.title}</h1>
        <p className="text-sm text-white/50 leading-[1.75] max-w-2xl">{guide.description}</p>

        {/* Meta row */}
        <div className="flex flex-wrap gap-4 mt-1 text-xs text-white/35">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#facc15]/50" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
            </svg>
            {(guide.symptoms ?? []).length} อาการที่พบ
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#38bdf8]/50" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
            {(guide.flowSteps ?? []).length} ขั้นตอนไล่ปัญหา
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#8b5cf6]/50" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {(guide.commands?.length ?? 0)} คำสั่ง
          </span>
        </div>
      </div>
    </div>
  );
}
