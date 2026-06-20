type Variant = "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "outline";

const variantMap: Record<Variant, string> = {
  default:   "bg-white/[0.07] text-white/50 border-white/[0.10]",
  primary:   "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  secondary: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  success:   "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  warning:   "bg-amber-500/10 text-amber-400 border-amber-500/20",
  danger:    "bg-rose-500/10 text-rose-400 border-rose-500/20",
  outline:   "bg-transparent text-white/40 border-white/[0.12]",
};

// Legacy color map for backward compat
const colorLegacy: Record<string, string> = {
  blue:   "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  purple: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  green:  "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  yellow: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  red:    "bg-rose-500/10 text-rose-400 border-rose-500/20",
  orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

type BadgeProps = {
  children:  React.ReactNode;
  variant?:  Variant;
  color?:    string; // legacy prop
  size?:     "xs" | "sm";
  className?: string;
};

export default function Badge({ children, variant, color, size = "xs", className = "" }: BadgeProps) {
  const style =
    variant ? variantMap[variant] :
    color   ? (colorLegacy[color] ?? variantMap.default) :
    variantMap.default;

  const sz = size === "sm" ? "text-xs px-2.5 py-0.5" : "text-[10px] px-2 py-0.5";

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${sz} ${style} ${className}`}>
      {children}
    </span>
  );
}
