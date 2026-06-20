type CardProps = {
  children:  React.ReactNode;
  className?: string;
  hover?:    boolean;
  glow?:     "cyan" | "violet" | "emerald" | "none";
  padding?:  "none" | "sm" | "md" | "lg";
};

const glowMap = {
  none:    "",
  cyan:    "hover:shadow-[0_0_30px_rgba(56,189,248,0.07)]",
  violet:  "hover:shadow-[0_0_30px_rgba(139,92,246,0.07)]",
  emerald: "hover:shadow-[0_0_30px_rgba(34,197,94,0.07)]",
};
const padMap  = { none: "", sm: "p-3", md: "p-5", lg: "p-6" };

export default function Card({
  children,
  className = "",
  hover = false,
  glow = "none",
  padding = "md",
}: CardProps) {
  return (
    <div className={`
      rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl
      ${padMap[padding]}
      ${hover ? "transition-all duration-200 hover:bg-white/[0.05] hover:border-white/[0.10] cursor-pointer" : ""}
      ${glowMap[glow]}
      ${className}
    `}>
      {children}
    </div>
  );
}
