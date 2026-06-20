import { portfolioStats } from "@/data/portfolio";

export default function PortfolioOverview() {
  const stats = [
    { label: "Total Projects",       value: portfolioStats.total,             color: "#38bdf8" },
    { label: "Lab Summaries",        value: portfolioStats.labSummaries,      color: "#8b5cf6" },
    { label: "RCA Reports",          value: portfolioStats.rcaReports,        color: "#ef4444" },
    { label: "Automation Scripts",   value: portfolioStats.automationScripts, color: "#f97316" },
    { label: "Network Designs",      value: portfolioStats.networkDesigns,    color: "#22c55e" },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3"
             style={{ borderColor: `${s.color}20` }}>
          <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
          <p className="text-[10px] text-white/30 mt-0.5 leading-snug">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
