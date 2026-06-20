// NOTE: Phase 11 integration — reads from DB when logged in, falls back to mock data
// TODO: Pass dbUser props down to child components in Phase 11 full integration
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { userProgress } from "@/data/progress";
import ProgressOverview    from "@/components/progress/ProgressOverview";
import XpLevelCard         from "@/components/progress/XpLevelCard";
import SkillLevelCard      from "@/components/progress/SkillLevelCard";
import LearningStreak      from "@/components/progress/LearningStreak";
import WeeklyGoal          from "@/components/progress/WeeklyGoal";
import CourseProgressList  from "@/components/progress/CourseProgressList";
import LabProgressList     from "@/components/progress/LabProgressList";
import QuizScoreList       from "@/components/progress/QuizScoreList";
import BadgeGrid           from "@/components/progress/BadgeGrid";
import AchievementTimeline from "@/components/progress/AchievementTimeline";

export const metadata = {
  title: "Learning Progress | NetPath Academy",
  description: "ติดตามความก้าวหน้า XP Badge และ Level",
};

export default async function ProgressPage() {
  // Try to get real user data from DB
  const session = await getServerSession(authOptions);
  let dbUser = null;
  if (session?.user?.id) {
    dbUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { name: true, xp: true, level: true, skillLevel: true, learningStreak: true, createdAt: true },
    });
  }
  // Use DB data if available, otherwise fall back to mock data
  const displayUser = dbUser ?? {
    name: userProgress.name,
    xp: userProgress.currentXp,
    level: userProgress.level,
    skillLevel: userProgress.skillLevel,
    learningStreak: userProgress.learningStreak,
    createdAt: new Date(),
  };

  return (
    <div className="px-4 md:px-6 py-6 max-w-7xl mx-auto space-y-6">

      {/* Hero */}
      <div className="relative rounded-2xl border border-[#38bdf8]/15 bg-[#38bdf8]/[0.03] overflow-hidden p-5 md:p-6">
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#38bdf8]/6 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-[#8b5cf6]/5 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#38bdf8]/25 to-[#8b5cf6]/20
                          border border-[#38bdf8]/25 flex items-center justify-center flex-shrink-0">
            <svg className="w-7 h-7 text-[#38bdf8]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white/95">{displayUser.name ?? "Network Learner"}</h1>
            <p className="text-sm text-[#38bdf8]">{displayUser.skillLevel} · Level {displayUser.level}</p>
            <p className="text-xs text-white/30 mt-0.5">
              {displayUser.xp.toLocaleString()} XP · Streak {displayUser.learningStreak} วัน
              {dbUser && <span className="ml-2 text-[#22c55e]/50">● Live Data</span>}
            </p>
          </div>
        </div>
      </div>

      {/* Overview stats */}
      <ProgressOverview />

      {/* XP + Skill + Streak + Weekly in grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <XpLevelCard />
        <LearningStreak />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WeeklyGoal />
        <SkillLevelCard />
      </div>

      {/* Badges */}
      <BadgeGrid />

      {/* Course + Lab + Quiz in responsive columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CourseProgressList />
        <LabProgressList />
      </div>

      <QuizScoreList />

      {/* Achievement Timeline */}
      <AchievementTimeline />
    </div>
  );
}
