"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen, Cpu, Server, Shield, HardDrive,
  CheckCircle2, Lock, ChevronRight,
} from "lucide-react";

interface TrackStat {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  border: string;
  accent: string;
  barColor: string;
  href: string;
  lessons: number;
  done: number;
  xpTotal: number;
  xpEarned: number;
  nextLesson: string;
  nextSlug: string;
  locked: boolean;
}

const tracks: TrackStat[] = [
  {
    id: "foundation",
    label: "Foundation",
    icon: <BookOpen size={16} />,
    color: "from-cyan-500/20 to-cyan-500/5",
    border: "border-cyan-500/25",
    accent: "text-cyan-400",
    barColor: "bg-cyan-400",
    href: "/foundation",
    lessons: 8,
    done: 2,
    xpTotal: 825,
    xpEarned: 175,
    nextLesson: "OSI Model Deep Dive",
    nextSlug: "/foundation/lessons/osi-model",
    locked: false,
  },
  {
    id: "ai-infrastructure",
    label: "AI Infrastructure",
    icon: <Cpu size={16} />,
    color: "from-violet-500/20 to-violet-500/5",
    border: "border-violet-500/25",
    accent: "text-violet-400",
    barColor: "bg-violet-400",
    href: "/advanced/ai-infrastructure",
    lessons: 2,
    done: 0,
    xpTotal: 325,
    xpEarned: 0,
    nextLesson: "GPU Cluster & AI Network",
    nextSlug: "/advanced/lessons/gpu-cluster-networking",
    locked: false,
  },
  {
    id: "cloud-ai-ops",
    label: "Cloud Native & AI Ops",
    icon: <Server size={16} />,
    color: "from-sky-500/20 to-sky-500/5",
    border: "border-sky-500/25",
    accent: "text-sky-400",
    barColor: "bg-sky-400",
    href: "/advanced/cloud-ai-ops",
    lessons: 3,
    done: 0,
    xpTotal: 450,
    xpEarned: 0,
    nextLesson: "Kubernetes Networking",
    nextSlug: "/advanced/lessons/kubernetes-networking-overview",
    locked: false,
  },
  {
    id: "security",
    label: "Modern Security",
    icon: <Shield size={16} />,
    color: "from-rose-500/20 to-rose-500/5",
    border: "border-rose-500/25",
    accent: "text-rose-400",
    barColor: "bg-rose-400",
    href: "/advanced/security",
    lessons: 1,
    done: 0,
    xpTotal: 150,
    xpEarned: 0,
    nextLesson: "SASE & Zero Trust Network",
    nextSlug: "/advanced/lessons/sase-zero-trust",
    locked: false,
  },
  {
    id: "hardware",
    label: "Hardware Infrastructure",
    icon: <HardDrive size={16} />,
    color: "from-amber-500/20 to-amber-500/5",
    border: "border-amber-500/25",
    accent: "text-amber-400",
    barColor: "bg-amber-400",
    href: "/hardware",
    lessons: 3,
    done: 0,
    xpTotal: 400,
    xpEarned: 0,
    nextLesson: "Cabling & Connectors",
    nextSlug: "/hardware/lessons/cabling-connectors",
    locked: false,
  },
];

export default function TrackProgressCards() {
  const totalXp   = tracks.reduce((s, t) => s + t.xpTotal,  0);
  const earnedXp  = tracks.reduce((s, t) => s + t.xpEarned, 0);

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-white/70 uppercase tracking-wider">Track Progress</h2>
        <span className="text-[11px] text-white/35">{earnedXp} / {totalXp} XP total</span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {tracks.map((t) => {
          const pct = t.lessons > 0 ? Math.round((t.done / t.lessons) * 100) : 0;

          return (
            <div
              key={t.id}
              className={`relative flex flex-col gap-3 rounded-xl p-4 bg-gradient-to-br ${t.color} border ${t.border} transition-all duration-200 hover:scale-[1.01] hover:shadow-lg`}
            >
              {/* Top row */}
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-2 ${t.accent} font-semibold text-sm`}>
                  {t.icon}
                  {t.label}
                </div>
                {t.locked
                  ? <Lock size={13} className="text-white/25" />
                  : <span className="text-[11px] text-white/40">{t.done}/{t.lessons} lessons</span>
                }
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${t.barColor}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-white/35">
                  <span>{pct}% complete</span>
                  <span>{t.xpEarned} / {t.xpTotal} XP</span>
                </div>
              </div>

              {/* Next lesson chip */}
              {!t.locked && t.done < t.lessons && (
                <Link
                  href={t.nextSlug}
                  className="flex items-center justify-between rounded-lg bg-white/[0.05] hover:bg-white/[0.10] px-3 py-2 transition-colors group"
                >
                  <div>
                    <p className="text-[9px] text-white/35 uppercase tracking-wider mb-0.5">Next up</p>
                    <p className="text-[11px] text-white/70 group-hover:text-white/90 leading-tight line-clamp-1">
                      {t.nextLesson}
                    </p>
                  </div>
                  <ChevronRight size={14} className="text-white/30 group-hover:text-white/60 shrink-0" />
                </Link>
              )}

              {/* Complete badge */}
              {pct === 100 && (
                <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-semibold">
                  <CheckCircle2 size={13} />
                  Track Complete!
                </div>
              )}

              {/* Explore link */}
              <Link
                href={t.href}
                className={`text-[11px] ${t.accent} hover:underline font-medium`}
              >
                View all lessons →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
