import Link from "next/link";
import { FlaskConical, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RecommendedLab } from "@/data/dashboard";

const levelStyle = {
  Beginner:     "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20",
  Intermediate: "text-amber-400   bg-amber-500/10   border border-amber-500/20",
  Advanced:     "text-rose-400    bg-rose-500/10    border border-rose-500/20",
};

function LabCard({ lab }: { lab: RecommendedLab }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-white/[0.05] last:border-0">
      <div className="flex items-start gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
          <FlaskConical size={14} className="text-violet-400" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-white/80 truncate leading-tight">{lab.title}</p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-[10px] text-white/30">{lab.category}</span>
            <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded-full", levelStyle[lab.level])}>
              {lab.level}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-white/25">
              <Clock size={10} /> {lab.duration}
            </span>
          </div>
        </div>
      </div>

      <Link
        href={lab.href}
        className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[11px] font-semibold hover:bg-violet-500/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
      >
        Start <ArrowRight size={11} />
      </Link>
    </div>
  );
}

export default function RecommendedLabs({ labs }: { labs: RecommendedLab[] }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-white/80">Recommended Labs</h2>
        <Link href="/labs" className="text-[11px] text-violet-400 hover:text-violet-300 font-medium transition-colors">
          All Labs →
        </Link>
      </div>

      {labs.length === 0 ? (
        <p className="text-sm text-white/30 py-4 text-center">No recommended labs yet.</p>
      ) : (
        <div>
          {labs.map((lab) => <LabCard key={lab.id} lab={lab} />)}
        </div>
      )}
    </div>
  );
}
