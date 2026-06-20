import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";

type StatCardProps = {
  title:        string;
  value:        string | number;
  description?: string;
  icon?:        string;          // lucide-react icon name, e.g. "BookOpen"
  color?:       "cyan" | "violet" | "emerald" | "amber" | "rose";
  delta?:       string;          // e.g. "+12%"
  positive?:    boolean;
  className?:   string;
};

const colorMap = {
  cyan:    { border: "border-cyan-500/20",    bg: "bg-cyan-500/10",    text: "text-cyan-400",    value: "#38bdf8" },
  violet:  { border: "border-violet-500/20",  bg: "bg-violet-500/10",  text: "text-violet-400",  value: "#8b5cf6" },
  emerald: { border: "border-emerald-500/20", bg: "bg-emerald-500/10", text: "text-emerald-400", value: "#22c55e" },
  amber:   { border: "border-amber-500/20",   bg: "bg-amber-500/10",   text: "text-amber-400",   value: "#f59e0b" },
  rose:    { border: "border-rose-500/20",    bg: "bg-rose-500/10",    text: "text-rose-400",    value: "#ef4444" },
};

export default function StatCard({
  title,
  value,
  description,
  icon,
  color    = "cyan",
  delta,
  positive = true,
  className,
}: StatCardProps) {
  const c = colorMap[color];
  const IconComponent = icon
    ? (Icons[icon as keyof typeof Icons] as React.ComponentType<LucideProps>)
    : null;

  return (
    <div className={cn(
      "rounded-2xl border bg-white/[0.03] backdrop-blur-xl p-5",
      c.border,
      className,
    )}>
      <div className="flex items-start justify-between mb-4">
        {IconComponent ? (
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", c.bg)}>
            <IconComponent size={18} className={c.text} />
          </div>
        ) : (
          <div />
        )}
        {delta && (
          <span className={cn(
            "text-[11px] font-semibold px-2 py-0.5 rounded-full",
            positive ? "text-emerald-400 bg-emerald-500/10" : "text-rose-400 bg-rose-500/10",
          )}>
            {delta}
          </span>
        )}
      </div>
      <p className={cn("text-3xl font-bold tracking-tight", c.text)}>{value}</p>
      <p className="text-sm font-medium text-white/70 mt-1">{title}</p>
      {description && (
        <p className="text-xs text-white/35 mt-0.5">{description}</p>
      )}
    </div>
  );
}
