import { portfolioItems, typeColor, typeLabel } from "@/data/portfolio";

export default function ProjectTimeline() {
  const sorted = [...portfolioItems].reverse();
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
      <h2 className="text-xs font-semibold text-white/50 mb-5">Project Timeline</h2>
      <div className="flex flex-col gap-0">
        {sorted.map((item, i) => {
          const color = typeColor[item.type];
          return (
            <div key={item.id} className="flex gap-3">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                     style={{ backgroundColor: color }} />
                {i < sorted.length - 1 && (
                  <div className="w-0.5 flex-1 min-h-[24px] mt-1" style={{ backgroundColor: `${color}20` }} />
                )}
              </div>
              <div className="pb-4 min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
                        style={{ color, backgroundColor: `${color}15` }}>
                    {typeLabel[item.type]}
                  </span>
                  <span className="text-[9px] text-white/20">{item.createdAt}</span>
                </div>
                <p className="text-xs font-medium text-white/65">{item.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
