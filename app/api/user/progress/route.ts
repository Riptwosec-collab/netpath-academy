import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET — fetch current user progress summary
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;

  const [user, labSubmissions, quizScores, badges, courseProgress] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, xp: true, level: true, skillLevel: true, learningStreak: true },
    }),
    prisma.labSubmission.findMany({ where: { userId }, include: { lab: { select: { title: true, category: true } } } }),
    prisma.quizScore.findMany({ where: { userId }, include: { quiz: { select: { title: true, passingScore: true } } } }),
    prisma.userBadge.findMany({ where: { userId }, include: { badge: true } }),
    prisma.userProgress.findMany({ where: { userId }, include: { course: { select: { title: true } } } }),
  ]);

  return NextResponse.json({ user, labSubmissions, quizScores, badges, courseProgress });
}

// POST — add XP / mark complete / unlock badge
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;
  const body = await req.json() as { action: string; payload?: Record<string, unknown> };
  const { action, payload } = body;

  try {
    switch (action) {
      case "add_xp": {
        const amount = Number(payload?.amount ?? 0);
        if (amount <= 0) return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        const updated = await prisma.user.update({
          where: { id: userId },
          data: { xp: { increment: amount } },
          select: { xp: true, level: true, skillLevel: true },
        });
        return NextResponse.json({ success: true, ...updated });
      }

      case "complete_lab": {
        const labId = String(payload?.labId ?? "");
        if (!labId) return NextResponse.json({ error: "Missing labId" }, { status: 400 });
        const sub = await prisma.labSubmission.upsert({
          where: { id: `${userId}-${labId}` },
          update: { status: "COMPLETED", completedAt: new Date() },
          create: { userId, labId, status: "COMPLETED", completedAt: new Date() },
        });
        // Add 100 XP for completing a lab
        await prisma.user.update({ where: { id: userId }, data: { xp: { increment: 100 } } });
        return NextResponse.json({ success: true, submission: sub });
      }

      case "save_quiz_score": {
        const { quizId, score, passed, answersJson } = payload as { quizId: string; score: number; passed: boolean; answersJson?: string };
        if (!quizId) return NextResponse.json({ error: "Missing quizId" }, { status: 400 });
        const qs = await prisma.quizScore.create({
          data: { userId, quizId, score, passed, answersJson },
        });
        if (passed) await prisma.user.update({ where: { id: userId }, data: { xp: { increment: 50 } } });
        return NextResponse.json({ success: true, score: qs });
      }

      case "unlock_badge": {
        const badgeId = String(payload?.badgeId ?? "");
        if (!badgeId) return NextResponse.json({ error: "Missing badgeId" }, { status: 400 });
        const badge = await prisma.badge.findUnique({ where: { id: badgeId } });
        if (!badge) return NextResponse.json({ error: "Badge not found" }, { status: 404 });
        const ub = await prisma.userBadge.upsert({
          where: { userId_badgeId: { userId, badgeId } },
          update: {},
          create: { userId, badgeId },
        });
        // Add badge XP
        await prisma.user.update({ where: { id: userId }, data: { xp: { increment: badge.xpReward } } });
        return NextResponse.json({ success: true, userBadge: ub });
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
