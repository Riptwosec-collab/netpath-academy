import Link from "next/link";
import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Achievement } from "@/data/dashboard";

const colorMap: Record<string, { bg: string; text: string }> = {
  cyan:    { bg: "bg-cyan-500/10",    text: "text-cyan-400"    },
  violet:  { bg: "bg-violet-500/10",  text: "text-violet-400"  },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400" },
  amber:   { bg: "bg-amber-500/10",   text: "text-amber-400"   },
  rose:    { bg: "bg-rose-500/10",    text: "text-rose-400"    },
};

function AchievementRow({ item }: { item: Achievement }) {
  const c = colorMap[item.color] ?? colorMap.cyan;
  const IconComp = Icons[item.icon as keyof typeof Icons] as React.ComponentType<LucideProps> | undefined;

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-white/[0.05] last:border-0">
      <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", c.bg)}>
        {IconComp
          ? <IconComp size={16} className={c.text} />
          : <Trophy   size={16} className={c.text} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-white/80 leading-tight">{item.title}</p>
        <p className="text-[10px] text-white/30 mt-0.5 truncate">{item.description}</p>
      </div>
      <span className="text-[10px] text-white/20 flex-shrink-0 whitespace-nowrap">{item.earnedAt}</span>
    </div>
  );
}

export default function RecentAchievements({ achievements }: { achievements: Achievement[] }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy size={15} className="text-amber-400" />
          <h2 className="text-sm font-bold text-white/80">Recent Achievements</h2>
        </div>
        <Link href="/progress" className="text-[11px] text-amber-400 hover:text-amber-300 font-medium transition-colors">
          All Badges →
        </Link>
      </div>

      {achievements.length === 0 ? (
        <p className="text-sm text-white/30 py-4 text-center">No achievements yet.</p>
      ) : (
        <div>
          {achievements.map((a) => <AchievementRow key={a.id} item={a} />)}
        </div>
      )}
    </div>
  );
}
