export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import ProfileHeader   from "@/components/profile/ProfileHeader";
import ProfileStats    from "@/components/profile/ProfileStats";
import ProfileProgress from "@/components/profile/ProfileProgress";
import ProfileBadges   from "@/components/profile/ProfileBadges";

export const metadata = { title: "Profile | NetPath Academy" };

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;

  const [user, labSubmissions, quizScores, badges] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true, name: true, email: true, image: true, role: true,
        xp: true, level: true, skillLevel: true, learningStreak: true, createdAt: true,
      },
    }),
    prisma.labSubmission.findMany({
      where: { userId },
      include: { lab: { select: { title: true, category: true } } },
      orderBy: { updatedAt: "desc" },
      take: 20,
    }),
    prisma.quizScore.findMany({
      where: { userId },
      include: { quiz: { select: { title: true, passingScore: true } } },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.userBadge.findMany({
      where: { userId },
      include: { badge: true },
      orderBy: { earnedAt: "desc" },
    }),
  ]);

  if (!user) redirect("/login");

  return (
    <div className="px-4 md:px-6 py-6 max-w-4xl mx-auto space-y-5">
      <ProfileHeader
        name={user.name}
        email={user.email}
        image={user.image}
        role={user.role as "USER" | "ADMIN"}
        xp={user.xp}
        level={user.level}
        skillLevel={user.skillLevel}
        createdAt={user.createdAt.toISOString()}
      />

      <ProfileStats
        xp={user.xp}
        level={user.level}
        learningStreak={user.learningStreak}
        labCount={labSubmissions.filter((l) => l.status === "COMPLETED").length}
        quizCount={quizScores.filter((q) => q.passed).length}
        badgeCount={badges.length}
      />

      <ProfileBadges badges={badges.map((b) => ({
        id: b.id, earnedAt: b.earnedAt,
        badge: { ...b.badge },
      }))} />

      <ProfileProgress
        labSubmissions={labSubmissions.map((l) => ({
          id: l.id, status: l.status, completedAt: l.completedAt,
          lab: l.lab,
        }))}
        quizScores={quizScores.map((q) => ({
          id: q.id, score: q.score, passed: q.passed, createdAt: q.createdAt,
          quiz: q.quiz,
        }))}
      />
    </div>
  );
}