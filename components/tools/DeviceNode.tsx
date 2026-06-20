type DeviceNodeProps = {
  x: number; y: number;
  label: string;
  type: "router" | "switch" | "pc" | "server" | "firewall" | "cloud" | "ap";
  color?: string;
  ip?: string;
};

const ICONS: Record<string, string> = {
  router:   "M12 2a10 10 0 100 20A10 10 0 0012 2zm-1 14v-4H7l5-8 5 8h-4v4h-2z",
  switch:   "M4 6h16M4 10h16M4 14h16M4 18h16",
  pc:       "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  server:   "M4 6h16v4H4zM4 14h16v4H4zM8 9h.01M8 17h.01",
  firewall: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  cloud:    "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
  ap:       "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.143 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0",
};

export default function DeviceNode({ x, y, label, type, color = "#38bdf8", ip }: DeviceNodeProps) {
  const iconPath = ICONS[type] ?? ICONS.pc;
  return (
    <g>
      {/* Glow */}
      <circle cx={x} cy={y} r={28} fill={`${color}10`} />
      {/* Circle border */}
      <circle cx={x} cy={y} r={22} fill="#0c1427" stroke={color} strokeWidth={1.5} strokeOpacity={0.5} />
      {/* Icon */}
      <svg x={x - 10} y={y - 10} width={20} height={20} viewBox="0 0 24 24"
           fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d={iconPath} />
      </svg>
      {/* Label */}
      <text x={x} y={y + 36} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize={10} fontFamily="system-ui">
        {label}
      </text>
      {ip && (
        <text x={x} y={y + 48} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize={9} fontFamily="monospace">
          {ip}
        </text>
      )}
    </g>
  );
}
