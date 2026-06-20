import Link from "next/link";
import { labs } from "@/data/labs";

const categoryColor: Record<string, string> = {
  Foundation:        "text-[#8b5cf6] bg-[#8b5cf6]/10 border-[#8b5cf6]/20",
  Switching:         "text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/20",
  Routing:           "text-[#facc15] bg-[#facc15]/10 border-[#facc15]/20",
  "Network Services":"text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/20",
  Security:          "text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/20",
  Automation:        "text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20",
};

export default function RelatedLabs({ relatedLabIds }: { relatedLabIds: string[] }) {
  if (!relatedLabIds || relatedLabIds.length === 0) return null;

  const relatedLabs = relatedLabIds.map((id) => labs.find((l) => l.id === id)).filter(Boolean) as typeof labs;

  if (relatedLabs.length === 0) return null;

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 md:p-6">
      <h2 className="text-sm font-semibold text-white/60 flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-[#f97316]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
        Labs ที่เกี่ยวข้อง
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {relatedLabs.map((lab) => {
          const catCls = categoryColor[lab.category] ?? "text-white/50 bg-white/5 border-white/10";
          return (
            <Link
              key={lab.id}
              href={`/labs/${lab.id}`}
              className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.07] bg-white/[0.02]
                         hover:border-[#f97316]/25 hover:bg-white/[0.04] transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#f97316]/70" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${catCls}`}>{lab.category}</span>
                  <span className="text-[10px] text-white/20 font-mono">{lab.duration}</span>
                </div>
                <p className="text-sm text-white/70 font-medium group-hover:text-white transition-colors leading-snug">{lab.title}</p>
                <p className="text-xs text-white/35 mt-0.5 line-clamp-1">{lab.objective}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
