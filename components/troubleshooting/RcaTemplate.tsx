import type { RcaTemplate as RcaData } from "@/data/troubleshooting";

export default function RcaTemplate({ rca }: { rca: RcaData }) {
  return (
    <div className="rounded-2xl border border-[#8b5cf6]/15 bg-[#8b5cf6]/[0.03] p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-[#8b5cf6]/80 mb-5">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        RCA Template (Root Cause Analysis)
      </h2>

      <div className="rounded-xl border border-white/[0.06] bg-[#080d1a] overflow-hidden">
        {/* Report header */}
        <div className="px-4 py-2.5 border-b border-white/[0.05] bg-white/[0.02]">
          <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest">Incident Report</p>
        </div>

        <div className="p-4 flex flex-col gap-4 font-mono text-xs">
          {/* Title */}
          <RcaRow label="INCIDENT" value={rca.incidentTitle} valueColor="text-white/80" />

          {/* Impact */}
          <RcaRow label="IMPACT" value={rca.impact} valueColor="text-[#ef4444]/70" />

          {/* Timeline */}
          <div>
            <p className="text-[10px] text-white/25 mb-2 uppercase tracking-wider">TIMELINE</p>
            <div className="flex flex-col gap-1.5 pl-3 border-l border-[#8b5cf6]/20">
              {rca.timeline.map((t, i) => (
                <p key={i} className="text-white/45 leading-[1.6]">{t}</p>
              ))}
            </div>
          </div>

          {/* Root cause */}
          <div className="rounded-lg border border-[#ef4444]/15 bg-[#ef4444]/[0.04] px-3 py-2.5">
            <p className="text-[10px] text-[#ef4444]/40 mb-1 uppercase tracking-wider">ROOT CAUSE</p>
            <p className="text-[#ef4444]/80 leading-[1.6]">{rca.rootCause}</p>
          </div>

          {/* Resolution */}
          <div className="rounded-lg border border-[#22c55e]/15 bg-[#22c55e]/[0.04] px-3 py-2.5">
            <p className="text-[10px] text-[#22c55e]/40 mb-1 uppercase tracking-wider">RESOLUTION</p>
            <p className="text-[#22c55e]/80 leading-[1.6]">{rca.resolution}</p>
          </div>

          {/* Prevention */}
          <div>
            <p className="text-[10px] text-white/25 mb-2 uppercase tracking-wider">PREVENTION</p>
            <ul className="flex flex-col gap-1.5">
              {rca.prevention.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-white/40">
                  <span className="text-[#38bdf8]/40 flex-shrink-0">→</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function RcaRow({ label, value, valueColor }: { label: string; value: string; valueColor: string }) {
  return (
    <div>
      <p className="text-[10px] text-white/25 mb-0.5 uppercase tracking-wider">{label}</p>
      <p className={`leading-[1.6] ${valueColor}`}>{value}</p>
    </div>
  );
}
