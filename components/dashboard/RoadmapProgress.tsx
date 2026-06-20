import Link from "next/link";
import { CheckCircle2, CircleDot, Lock, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RoadmapProgressItem } from "@/data/dashboard";

const statusCfg = {
  completed:    { icon: CheckCircle2, iconClass: "text-emerald-400", bar: "#22c55e", text: "text-white/70",   label: "Done"   },
  "in-progress":{ icon: CircleDot,    iconClass: "text-cyan-400",    bar: "#38bdf8", text: "text-white/70",   label: "Active" },
  locked:       { icon: Lock,         iconClass: "text-white/20",    bar: "#ffffff22",text: "text-white/25",  label: "Locked" },
};

function LevelRow({ item }: { item: RoadmapProgressItem }) {
  const cfg = statusCfg[item.status];
  const StatusIcon = cfg.icon;

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-white/[0.05] last:border-0">
      {/* Level number */}
      <div className={cn(
        "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[11px] font-bold",
        item.status === "locked" ? "bg-white/[0.04] text-white/20" :
        item.status === "completed" ? "bg-emerald-500/10 text-emerald-400" :
        "bg-cyan-500/10 text-cyan-400",
      )}>
        {item.level}
      </div>

      {/* Title + progress */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className={cn("text-[13px] font-medium truncate", cfg.text)}>{item.title}</p>
          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
            <StatusIcon size={11} className={cfg.iconClass} />
            <span className={cn("text-[10px] font-semibold", cfg.iconClass)}>{item.progress}%</span>
          </div>
        </div>
        <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${item.progress}%`, backgroundColor: cfg.bar }}
          />
        </div>
      </div>
    </div>
  );
}

export default function RoadmapProgress({ items }: { items: RoadmapProgressItem[] }) {
  const completed = items.filter((i) => i.status === "completed").length;
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Map size={15} className="text-violet-400" />
          <h2 className="text-sm font-bold text-white/80">Roadmap Progress</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/30">{completed}/{items.length} levels</span>
          <Link href="/roadmap" className="text-[11px] text-violet-400 hover:text-violet-300 font-medium transition-colors">
            View →
          </Link>
        </div>
      </div>

      <div>
        {items.map((item) => <LevelRow key={item.level} item={item} />)}
      </div>
    </div>
  );
}
