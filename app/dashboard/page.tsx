import type { Metadata } from "next";

import DashboardHeader   from "@/components/dashboard/DashboardHeader";
import SummaryCards      from "@/components/dashboard/SummaryCards";
import LearningProgress  from "@/components/dashboard/LearningProgress";
import ContinueLearning  from "@/components/dashboard/ContinueLearning";
import RecommendedLabs   from "@/components/dashboard/RecommendedLabs";
import LatestQuizScores  from "@/components/dashboard/LatestQuizScores";
import RecentAchievements from "@/components/dashboard/RecentAchievements";
import RoadmapProgress   from "@/components/dashboard/RoadmapProgress";
import AiTutorPreview    from "@/components/dashboard/AiTutorPreview";
import WeeklyGoal        from "@/components/dashboard/WeeklyGoal";
import SkillLevelPanel   from "@/components/dashboard/SkillLevelPanel";

import {
  dashboardStats,
  currentLearning,
  recommendedLabs,
  latestQuizScores,
  recentAchievements,
  roadmapProgress,
  userDashboard,
  aiTutorPrompts,
} from "@/data/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "ติดตามความก้าวหน้าและเรียนรู้ต่อจากที่หยุดไว้",
};

export default function DashboardPage() {
  const user = userDashboard;

  return (
    <div className="flex flex-col gap-6">

      {/* ── Dashboard Header ─────────────────────────────────────── */}
      <DashboardHeader user={user} />

      {/* ── Summary Cards ────────────────────────────────────────── */}
      <SummaryCards stats={dashboardStats} />

      {/* ── Main Grid ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Left column (2/3) ──────────────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Continue Learning */}
          <ContinueLearning courses={currentLearning} />

          {/* Learning Progress */}
          <LearningProgress
            lessonsCompleted={38}
            totalLessons={120}
            labsCompleted={12}
            totalLabs={50}
            quizAverage={84}
            xp={user.xp}
            nextLevelXp={user.nextLevelXp}
          />

          {/* Recommended Labs */}
          <RecommendedLabs labs={recommendedLabs} />

          {/* Roadmap Progress */}
          <RoadmapProgress items={roadmapProgress} />
        </div>

        {/* ── Right column (1/3) ─────────────────────────────────── */}
        <div className="flex flex-col gap-6">

          {/* Skill Level Panel */}
          <SkillLevelPanel
            currentLevel={user.skillLevel}
            xp={user.xp}
            nextLevelXp={user.nextLevelXp}
          />

          {/* Weekly Goal */}
          <WeeklyGoal goal={user.weeklyGoal} />

          {/* Latest Quiz Scores */}
          <LatestQuizScores scores={latestQuizScores} />

          {/* Recent Achievements */}
          <RecentAchievements achievements={recentAchievements} />

          {/* AI Tutor Preview */}
          <AiTutorPreview prompts={aiTutorPrompts} />
        </div>
      </div>
    </div>
  );
}
