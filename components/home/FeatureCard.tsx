import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Feature } from "@/types";

const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  cyan:    { bg: "bg-cyan-500/10",    text: "text-cyan-400",    border: "border-cyan-500/20",    glow: "hover:shadow-[0_0_25px_rgba(56,189,248,0.08)]" },
  violet:  { bg: "bg-violet-500/10",  text: "text-violet-400",  border: "border-violet-500/20",  glow: "hover:shadow-[0_0_25px_rgba(139,92,246,0.08)]" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", glow: "hover:shadow-[0_0_25px_rgba(34,197,94,0.08)]" },
  amber:   { bg: "bg-amber-500/10",   text: "text-amber-400",   border: "border-amber-500/20",   glow: "hover:shadow-[0_0_25px_rgba(245,158,11,0.08)]" },
};

export default function FeatureCard({ feature }: { feature: Feature }) {
  const c = colorMap[feature.color] ?? colorMap.cyan;
  const IconComponent = Icons[feature.icon as keyof typeof Icons] as
    | React.ComponentType<LucideProps>
    | undefined;

  return (
    <div className={cn(
      "rounded-2xl border bg-white/[0.03] backdrop-blur-xl p-6",
      "transition-all duration-300 hover:bg-white/[0.05] hover:-translate-y-0.5",
      c.border,
      c.glow,
    )}>
      {/* Icon */}
      {IconComponent && (
        <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center mb-4", c.bg)}>
          <IconComponent size={20} className={c.text} />
        </div>
      )}

      {/* Content */}
      <h3 className="text-base font-semibold text-white/90 mb-2">{feature.title}</h3>
      <p className="text-sm text-white/45 leading-relaxed">{feature.description}</p>
    </div>
  );
}
