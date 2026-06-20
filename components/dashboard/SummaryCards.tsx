import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardStat } from "@/data/dashboard";

const colorMap = {
  cyan:    { border: "border-cyan-500/20",    bg: "bg-cyan-500/10",    text: "text-cyan-400",    glow: "hover:shadow-[0_0_25px_rgba(56,189,248,0.07)]"    },
  violet:  { border: "border-violet-500/20",  bg: "bg-violet-500/10",  text: "text-violet-400",  glow: "hover:shadow-[0_0_25px_rgba(139,92,246,0.07)]"    },
  emerald: { border: "border-emerald-500/20", bg: "bg-emerald-500/10", text: "text-emerald-400", glow: "hover:shadow-[0_0_25px_rgba(34,197,94,0.07)]"     },
  amber:   { border: "border-amber-500/20",   bg: "bg-amber-500/10",   text: "text-amber-400",   glow: "hover:shadow-[0_0_25px_rgba(245,158,11,0.07)]"    },
  rose:    { border: "border-rose-500/20",    bg: "bg-rose-500/10",    text: "text-rose-400",    glow: "hover:shadow-[0_0_25px_rgba(239,68,68,0.07)]"     },
};

function StatCard({ stat }: { stat: DashboardStat }) {
  const c = colorMap[stat.color];
  const IconComp = Icons[stat.icon as keyof typeof Icons] as React.ComponentType<LucideProps> | undefined;

  return (
    <div className={cn(
      "rounded-2xl border bg-white/[0.03] backdrop-blur-xl p-5",
      "transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-0.5",
      c.border, c.glow,
    )}>
      <div className="flex items-start justify-between mb-4">
        {IconComp && (
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", c.bg)}>
            <IconComp size={18} className={c.text} />
          </div>
        )}
        {stat.trend && (
          <div className={cn(
            "flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full",
            stat.positive !== false
              ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
              : "text-rose-400 bg-rose-500/10 border border-rose-500/20",
          )}>
            {stat.positive !== false
              ? <TrendingUp size={10} />
              : <TrendingDown size={10} />}
            {stat.trend}
          </div>
        )}
      </div>

      <p className={cn("text-2xl font-bold tracking-tight", c.text)}>{stat.value}</p>
      <p className="text-sm font-medium text-white/70 mt-0.5">{stat.title}</p>
      <p className="text-xs text-white/30 mt-0.5">{stat.description}</p>
    </div>
  );
}

export default function SummaryCards({ stats }: { stats: DashboardStat[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((s) => <StatCard key={s.id} stat={s} />)}
    </div>
  );
}
