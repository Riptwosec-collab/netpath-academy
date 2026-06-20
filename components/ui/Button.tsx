import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success" | "outline";
  size?:    "sm" | "md" | "lg";
  loading?: boolean;
}

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-cyan-500/15 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/25 hover:border-cyan-400/60 focus-visible:ring-2 focus-visible:ring-cyan-500/40",
  secondary:
    "bg-violet-500/15 border border-violet-500/40 text-violet-400 hover:bg-violet-500/25 hover:border-violet-400/60 focus-visible:ring-2 focus-visible:ring-violet-500/40",
  outline:
    "border border-white/10 text-white/60 hover:border-white/20 hover:text-white/80 focus-visible:ring-2 focus-visible:ring-white/20",
  ghost:
    "text-white/50 hover:text-white/80 hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white/20",
  danger:
    "bg-rose-500/15 border border-rose-500/40 text-rose-400 hover:bg-rose-500/25 focus-visible:ring-2 focus-visible:ring-rose-500/40",
  success:
    "bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25 focus-visible:ring-2 focus-visible:ring-emerald-500/40",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-8  px-3  text-xs  gap-1.5",
  md: "h-9  px-4  text-sm  gap-2",
  lg: "h-11 px-6  text-base gap-2.5",
};

export default function Button({
  variant  = "primary",
  size     = "md",
  loading  = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-xl",
        "transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        "focus-visible:outline-none focus-visible:ring-offset-1 focus-visible:ring-offset-[#050816]",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin" size={size === "lg" ? 18 : 14} />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
