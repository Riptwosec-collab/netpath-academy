type Props = {
  label: string;
  value: number | string;
  color?: string;
  icon?: string;
};

export default function AdminStatCard({ label, value, color = "#38bdf8", icon }: Props) {
  return (
    <div className="rounded-xl border bg-white/[0.03] px-4 py-3"
         style={{ borderColor: `${color}20` }}>
      <div className="flex items-center gap-2 mb-1">
        {icon && (
          <svg className="w-4 h-4 flex-shrink-0" style={{ color: `${color}80` }}
               fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
          </svg>
        )}
        <p className="text-[10px] text-white/30">{label}</p>
      </div>
      <p className="text-2xl font-bold" style={{ color }}>{value}</p>
    </div>
  );
}
