type ProgressProps = {
  value:      number;   // 0–100
  color?:     string;
  height?:    "xs" | "sm" | "md";
  showLabel?: boolean;
  label?:     string;
  className?: string;
};

const heightMap = { xs: "h-1", sm: "h-1.5", md: "h-2.5" };

export default function Progress({
  value,
  color = "#38bdf8",
  height = "sm",
  showLabel = false,
  label,
  className = "",
}: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={className}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-[10px] text-white/35">{label}</span>}
          {showLabel && <span className="text-[10px] text-white/35">{clamped}%</span>}
        </div>
      )}
      <div className={`w-full bg-white/[0.07] rounded-full ${heightMap[height]}`}>
        <div
          className="rounded-full transition-all duration-500"
          style={{ width: `${clamped}%`, backgroundColor: color, height: "100%" }}
        />
      </div>
    </div>
  );
}
