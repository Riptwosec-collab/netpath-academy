type RcaData = {
  impact: string;
  rootCause: string;
  resolution: string;
  prevention: string[];
};

export default function RcaReportBlock({ rca }: { rca: RcaData }) {
  return (
    <div className="rounded-xl border border-[#ef4444]/15 bg-[#ef4444]/[0.03] overflow-hidden">
      <div className="px-4 py-2.5 border-b border-[#ef4444]/10 bg-[#ef4444]/[0.04]">
        <p className="text-[10px] font-mono text-[#ef4444]/40 uppercase tracking-widest">Root Cause Analysis</p>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <p className="text-[10px] text-white/25 uppercase tracking-wider mb-1">IMPACT</p>
          <p className="text-xs text-[#ef4444]/70 leading-relaxed">{rca.impact}</p>
        </div>
        <div className="rounded-lg border border-[#ef4444]/15 bg-[#ef4444]/[0.05] px-3 py-2.5">
          <p className="text-[10px] text-[#ef4444]/40 uppercase tracking-wider mb-1">ROOT CAUSE</p>
          <p className="text-xs text-[#ef4444]/80 leading-relaxed">{rca.rootCause}</p>
        </div>
        <div className="rounded-lg border border-[#22c55e]/15 bg-[#22c55e]/[0.04] px-3 py-2.5">
          <p className="text-[10px] text-[#22c55e]/40 uppercase tracking-wider mb-1">RESOLUTION</p>
          <p className="text-xs text-[#22c55e]/70 leading-relaxed">{rca.resolution}</p>
        </div>
        <div>
          <p className="text-[10px] text-white/25 uppercase tracking-wider mb-2">PREVENTION</p>
          <ul className="space-y-1">
            {rca.prevention.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-white/45 leading-relaxed">
                <span className="text-[#38bdf8]/40 flex-shrink-0">→</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
