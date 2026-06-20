type ConnectionLineProps = {
  x1: number; y1: number;
  x2: number; y2: number;
  label?: string;
  color?: string;
  dashed?: boolean;
  animated?: boolean;
};

export default function ConnectionLine({
  x1, y1, x2, y2, label, color = "rgba(56,189,248,0.25)", dashed = false, animated = false
}: ConnectionLineProps) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color}
        strokeWidth={1.5}
        strokeDasharray={dashed ? "6 4" : undefined}
        className={animated ? "animate-pulse" : undefined}
      />
      {label && (
        <>
          <rect x={mx - 20} y={my - 8} width={40} height={14} rx={3}
            fill="#080d1a" stroke={color} strokeWidth={0.5} strokeOpacity={0.5} />
          <text x={mx} y={my + 2.5} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize={8} fontFamily="monospace">
            {label}
          </text>
        </>
      )}
    </g>
  );
}
