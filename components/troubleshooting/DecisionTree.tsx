import type { DecisionTreeNode } from "@/data/troubleshooting";

export default function DecisionTree({ nodes }: { nodes: DecisionTreeNode[] }) {
  return (
    <div className="rounded-2xl border border-[#8b5cf6]/15 bg-[#8b5cf6]/[0.03] p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-[#8b5cf6]/80 mb-5">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
        Decision Tree
      </h2>

      <div className="flex flex-col gap-3">
        {nodes.map((node, i) => (
          <div key={i} className="relative">
            {/* Connector */}
            {i < nodes.length - 1 && (
              <div className="absolute left-[18px] top-full w-px h-3 bg-[#8b5cf6]/20" />
            )}

            {/* Question */}
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-xl border border-[#8b5cf6]/35
                               bg-[#8b5cf6]/10 flex items-center justify-center text-[10px] font-bold text-[#8b5cf6]">
                Q{i + 1}
              </span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-white/75 mb-2">{node.question}</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl
                                  border border-[#22c55e]/20 bg-[#22c55e]/[0.05]">
                    <span className="flex-shrink-0 text-[10px] font-bold text-[#22c55e] mt-0.5 w-6 text-center">YES</span>
                    <p className="text-[11px] text-white/50 leading-[1.6]">{node.yes}</p>
                  </div>
                  <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl
                                  border border-[#ef4444]/15 bg-[#ef4444]/[0.04]">
                    <span className="flex-shrink-0 text-[10px] font-bold text-[#ef4444] mt-0.5 w-6 text-center">NO</span>
                    <p className="text-[11px] text-white/50 leading-[1.6]">{node.no}</p>
                  </div>
                </div>
              </div>
            </div>

            {i < nodes.length - 1 && <div className="h-3" />}
          </div>
        ))}
      </div>
    </div>
  );
}
