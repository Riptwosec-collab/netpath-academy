"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Cpu, Server, Shield, HardDrive, Terminal, CheckCircle2, Lock, ChevronRight } from "lucide-react";
import { getTrackProgress, getTotalXp } from "@/lib/progress";

const TRACK_CONFIG = [
  {
    id:         "foundation",
    label:      "Foundation",
    icon:       <BookOpen size={16} />,
    color:      "from-cyan-500/20 to-cyan-500/5",
    border:     "border-cyan-500/25",
    accent:     "text-cyan-400",
    barColor:   "bg-cyan-400",
    href:       "/foundation",
    totalLessons: 10,
    totalXp:    925,
    nextLesson: "OSI Model Deep Dive",
    nextSlug:   "/foundation/lessons/osi-model",
    locked:     false,
  },
  {
    id:         "cloud-ai-ops",
    label:      "Cloud Native & AI Ops",
    icon:       <Server size={16} />,
    color:      "from-sky-500/20 to-sky-500/5",
    border:     "border-sky-500/25",
    accent:     "text-sky-400",
    barColor:   "bg-sky-400",
    href:       "/advanced/cloud-ai-ops",
    totalLessons: 3,
    totalXp:    450,
    nextLesson: "Kubernetes Networking",
    nextSlug:   "/advanced/lessons/kubernetes-networking-overview",
    locked:     false,
  },
  {
    id:         "ai-infrastructure",
    label:      "AI Infrastructure",
    icon:       <Cpu size={16} />,
    color:      "from-violet-500/20 to-violet-500/5",
    border:     "border-violet-500/25",
    accent:     "text-violet-400",
    barColor:   "bg-violet-400",
    href:       "/advanced/ai-infrastructure",
    totalLessons: 2,
    totalXp:    325,
    nextLesson: "GPU Cluster & AI Network",
    nextSlug:   "/advanced/lessons/gpu-cluster-networking",
    locked:     false,
  },
  {
    id:         "network-automation",
    label:      "Network Automation",
    icon:       <Terminal size={16} />,
    color:      "from-emerald-500/20 to-emerald-500/5",
    border:     "border-emerald-500/25",
    accent:     "text-emerald-400",
    barColor:   "bg-emerald-400",
    href:       "/advanced/network-automation",
    totalLessons: 7,
    totalXp:    875,
    nextLesson: "Python for Network Engineers",
    nextSlug:   "/advanced/network-automation/lessons/python-for-network-engineers",
    locked:     false,
  },
  {
    id:         "security",
    label:      "Modern Security",
    icon:       <Shield size={16} />,
    color:      "from-rose-500/20 to-rose-500/5",
    border:     "border-rose-500/25",
    accent:     "text-rose-400",
    barColor:   "bg-rose-400",
    href:       "/advanced/security",
    totalLessons: 1,
    totalXp:    150,
    nextLesson: "SASE & Zero Trust",
    nextSlug:   "/advanced/lessons/sase-zero-trust",
    locked:     false,
  },
  {
    id:         "hardware",
    label:      "Hardware Infrastructure",
    icon:       <HardDrive size={16} />,
    color:      "from-amber-500/20 to-amber-500/5",
    border:     "border-amber-500/25",
    accent:     "text-amber-400",
    barColor:   "bg-amber-400",
    href:       "/hardware",
    totalLessons: 3,
    totalXp:    400,
    nextLesson: "Cabling & Connectors",
    nextSlug:   "/hardware/lessons/cabling-connectors",
    locked:     false,
  },
] as const;

export default function TrackProgressCards() {
  const [liveProgress, setLiveProgress] = useState<Record<string, { done: number; xpEarned: number }>>({});
  const [totalXpEarned, setTotalXpEarned] = useState(0);

  useEffect(() => {
    const data: Record<string, { done: number; xpEarned: number }> = {};
    for (const t of TRACK_CONFIG) {
      data[t.id] = getTrackProgress(t.id);
    }
    setLiveProgress(data);
    setTotalXpEarned(getTotalXp());
  }, []);

  const allTotalXp = TRACK_CONFIG.reduce((s, t) => s + t.totalXp, 0);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-white/70 uppercase tracking-wider">Track Progress</h2>
        <span className="text-[11px] text-white/35">{totalXpEarned} / {allTotalXp} XP total</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {TRACK_CONFIG.map((t) => {
          const live = liveProgress[t.id] ?? { done: 0, xpEarned: 0 };
          const pct  = t.totalLessons > 0 ? Math.round((live.done / t.totalLessons) * 100) : 0;

          return (
            <div
              key={t.id}
              className={`relative flex flex-col gap-3 rounded-xl p-4 bg-gradient-to-br ${t.color} border ${t.border} transition-all duration-200 hover:scale-[1.01]`}
            >
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-2 ${t.accent} font-semibold text-sm`}>
                  {t.icon}
                  {t.label}
                </div>
                {t.locked
                  ? <Lock size={13} className="text-white/25" />
                  : <span className="text-[11px] text-white/40">{live.done}/{t.totalLessons}</span>
                }
              </div>

              <div className="space-y-1">
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${t.barColor}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-white/35">
                  <span>{pct}% complete</span>
                  <span>{live.xpEarned} / {t.totalXp} XP</span>
                </div>
              </div>

              {!t.locked && live.done >= t.totalLessons ? (
                <div className="flex items-center gap-2 rounded-lg bg-white/[0.06] px-3 py-2 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 size={13} />
                  Track completed!
                </div>
              ) : !t.locked ? (
                <Link
                  href={t.nextSlug}
                  className="flex items-center justify-between rounded-lg bg-white/[0.05] hover:bg-white/[0.10] px-3 py-2 transition-colors group"
                >
                  <span className="text-[11px] text-white/50 group-hover:text-white/80 truncate pr-2">
                    Next: {t.nextLesson}
                  </span>
                  <ChevronRight size={12} className="text-white/30 group-hover:text-white/60 flex-shrink-0" />
                </Link>
              ) : (
                <div className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2">
                  <Lock size={12} className="text-white/20" />
                  <span className="text-[11px] text-white/25">Complete Foundation first</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
