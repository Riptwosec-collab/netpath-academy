import { portfolioItems, allSkills } from "@/data/portfolio";

export default function PortfolioPreview() {
  const highlighted = portfolioItems.slice(0, 3);
  return (
    <div className="rounded-2xl border border-[#8b5cf6]/20 bg-[#8b5cf6]/[0.03] p-5">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-[#8b5cf6]/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span className="text-xs font-semibold text-[#8b5cf6]/80">Public Portfolio Preview</span>
      </div>
      <div className="rounded-xl border border-white/[0.07] bg-[#080d1a] p-4 font-mono text-xs space-y-3">
        <div>
          <p className="text-[#38bdf8]">═══════════════════════════════════</p>
          <p className="text-white/70">  Network Learner — Junior Network Engineer</p>
          <p className="text-white/30">  Portfolio · {portfolioItems.length} Projects</p>
          <p className="text-[#38bdf8]">═══════════════════════════════════</p>
        </div>
        <div>
          <p className="text-white/25 text-[10px] mb-1 uppercase tracking-wider">Skills</p>
          <p className="text-white/50 leading-relaxed">{allSkills.slice(0, 12).join(" · ")}</p>
        </div>
        <div>
          <p className="text-white/25 text-[10px] mb-1 uppercase tracking-wider">Highlighted Projects</p>
          {highlighted.map((p) => (
            <p key={p.id} className="text-white/45">
              <span className="text-[#38bdf8]/60">▸</span> {p.title} <span className="text-white/20">({p.createdAt})</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
