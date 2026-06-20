import Link from "next/link";
import { getPortfolioItemById, portfolioItems, typeLabel, typeColor } from "@/data/portfolio";
import ConfigBlock    from "@/components/portfolio/ConfigBlock";
import RcaReportBlock from "@/components/portfolio/RcaReportBlock";

export function generateStaticParams() {
  return portfolioItems.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const item = getPortfolioItemById(params.id);
  return { title: item ? `${item.title} | Portfolio` : "Not Found" };
}

export default function PortfolioDetailPage({ params }: { params: { id: string } }) {
  const item = getPortfolioItemById(params.id);

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 px-4">
        <p className="text-base font-semibold text-white/50">ไม่พบ Portfolio นี้</p>
        <Link href="/portfolio"
          className="px-5 py-2.5 rounded-xl bg-[#38bdf8]/15 border border-[#38bdf8]/35 text-[#38bdf8] text-sm font-medium">
          กลับไป Portfolio
        </Link>
      </div>
    );
  }

  const color = typeColor[item.type];
  const levelColor = { Beginner: "#38bdf8", Intermediate: "#8b5cf6", Advanced: "#f97316" }[item.level];

  return (
    <div className="px-4 md:px-6 py-6 max-w-4xl mx-auto space-y-5">

      <Link href="/portfolio" className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        กลับไป Portfolio
      </Link>

      {/* Header */}
      <div className="relative rounded-2xl border overflow-hidden p-5 md:p-6"
           style={{ borderColor: `${color}25`, backgroundColor: `${color}05` }}>
        <div className="absolute h-0.5 top-0 inset-x-0" style={{ backgroundColor: color }} />
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none"
             style={{ backgroundColor: `${color}08` }} />
        <div className="relative z-10">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full border"
              style={{ color, borderColor: `${color}40`, backgroundColor: `${color}15` }}>
              {typeLabel[item.type]}
            </span>
            <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full border border-white/[0.08] text-white/35 bg-white/[0.04]">
              {item.category}
            </span>
            <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full border"
              style={{ color: `${levelColor}90`, borderColor: `${levelColor}30`, backgroundColor: `${levelColor}10` }}>
              {item.level}
            </span>
            <span className="text-[9px] text-white/20 px-2 py-0.5">{item.createdAt}</span>
          </div>
          <h1 className="text-lg font-bold text-white/95 mb-2">{item.title}</h1>
          <p className="text-sm text-white/45">{item.description}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
        <h2 className="text-xs font-semibold text-white/50 mb-2">Summary</h2>
        <p className="text-sm text-white/60 leading-relaxed">{item.summary}</p>
      </div>

      {/* Problem / Solution / Result */}
      {(item.problem || item.solution || item.result) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { label: "Problem", text: item.problem, color: "#ef4444" },
            { label: "Solution", text: item.solution, color: "#38bdf8" },
            { label: "Result", text: item.result,   color: "#22c55e" },
          ].filter((s) => s.text).map((s) => (
            <div key={s.label} className="rounded-xl border p-4"
                 style={{ borderColor: `${s.color}20`, backgroundColor: `${s.color}05` }}>
              <p className="text-[10px] font-semibold mb-2 uppercase tracking-wider" style={{ color: `${s.color}70` }}>
                {s.label}
              </p>
              <p className="text-xs text-white/55 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Config */}
      {item.configExample && (
        <div>
          <h2 className="text-xs font-semibold text-white/50 mb-2">Config Example</h2>
          <ConfigBlock config={item.configExample} />
        </div>
      )}

      {/* RCA */}
      {item.rca && (
        <div>
          <h2 className="text-xs font-semibold text-white/50 mb-2">RCA Report</h2>
          <RcaReportBlock rca={item.rca} />
        </div>
      )}

      {/* Skills + Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
          <h2 className="text-[10px] font-semibold text-white/35 uppercase tracking-wider mb-2">Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {item.skills.map((s) => (
              <span key={s} className="text-xs px-2.5 py-1 rounded-lg border border-[#38bdf8]/20 bg-[#38bdf8]/[0.07] text-[#38bdf8]/70">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
          <h2 className="text-[10px] font-semibold text-white/35 uppercase tracking-wider mb-2">Tools</h2>
          <div className="flex flex-wrap gap-1.5">
            {item.tools.map((t) => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/40">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Link href="/portfolio"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08]
                     text-white/35 text-sm font-medium hover:border-white/20 hover:text-white/60 transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          กลับไป Portfolio ทั้งหมด
        </Link>
      </div>
    </div>
  );
}
