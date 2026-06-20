import Link from "next/link";
import type { NetworkTool } from "@/data/tools";

const diffColor = { Beginner: "#22c55e", Intermediate: "#facc15", Advanced: "#f97316" };

export default function ToolCard({ tool }: { tool: NetworkTool }) {
  return (
    <div className="group relative rounded-2xl border bg-white/[0.03] overflow-hidden
                    hover:bg-white/[0.05] transition-all flex flex-col"
         style={{ borderColor: `${tool.color}20` }}>
      <div className="h-0.5 w-full" style={{ backgroundColor: tool.color }} />
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
               style={{ backgroundColor: `${tool.color}15`, border: `1px solid ${tool.color}25` }}>
            <svg className="w-5 h-5" style={{ color: tool.color }}
                 fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={tool.icon} />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white/85 group-hover:text-white/95 transition-colors">
              {tool.title}
            </p>
            <p className="text-[10px] text-white/35 mt-0.5">{tool.category}</p>
          </div>
        </div>
        <p className="text-xs text-white/45 leading-snug">{tool.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full border"
            style={{ color: `${diffColor[tool.difficulty]}90`, borderColor: `${diffColor[tool.difficulty]}30`, backgroundColor: `${diffColor[tool.difficulty]}10` }}>
            {tool.difficulty}
          </span>
          <Link href={tool.href}
            className="text-xs font-medium px-3 py-1.5 rounded-lg border transition-all"
            style={{ color: tool.color, borderColor: `${tool.color}35`, backgroundColor: `${tool.color}08` }}>
            Open →
          </Link>
        </div>
      </div>
    </div>
  );
}
