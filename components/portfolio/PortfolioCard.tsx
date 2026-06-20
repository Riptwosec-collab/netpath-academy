import Link from "next/link";
import type { PortfolioItem } from "@/data/portfolio";
import { typeLabel, typeColor } from "@/data/portfolio";

const levelColor = { Beginner: "#38bdf8", Intermediate: "#8b5cf6", Advanced: "#f97316" };

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  const color = typeColor[item.type];
  return (
    <div
      className="group relative rounded-2xl border bg-white/[0.03] overflow-hidden
                 hover:bg-white/[0.05] transition-all flex flex-col"
      style={{ borderColor: `${color}20` }}
    >
      {/* Top accent */}
      <div className="h-0.5 w-full" style={{ backgroundColor: color }} />

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5">
          <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full border"
            style={{ borderColor: `${color}35`, color, backgroundColor: `${color}12` }}>
            {typeLabel[item.type]}
          </span>
          <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full border border-white/[0.07]
                           text-white/30 bg-white/[0.04]">
            {item.category}
          </span>
          <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full border"
            style={{ borderColor: `${levelColor[item.level]}25`, color: `${levelColor[item.level]}90`, backgroundColor: `${levelColor[item.level]}10` }}>
            {item.level}
          </span>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white/85 group-hover:text-white/95 transition-colors mb-1">
            {item.title}
          </h3>
          <p className="text-xs text-white/40 leading-snug line-clamp-2">{item.description}</p>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {item.skills.slice(0, 4).map((skill) => (
            <span key={skill} className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.05] text-white/30">
              {skill}
            </span>
          ))}
          {item.skills.length > 4 && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.05] text-white/20">
              +{item.skills.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-[10px] text-white/20">{item.createdAt}</span>
          <Link href={`/portfolio/${item.id}`}
            className="text-xs font-medium px-3 py-1.5 rounded-lg border transition-all"
            style={{ borderColor: `${color}35`, color, backgroundColor: `${color}08` }}
          >
            View →
          </Link>
        </div>
      </div>
    </div>
  );
}
