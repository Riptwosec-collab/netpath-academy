export const dynamic = "force-dynamic";
import prisma           from "@/lib/prisma";
import AdminStatCard    from "@/components/admin/AdminStatCard";
import AdminHeader      from "@/components/admin/AdminHeader";

export default async function AdminDashboardPage() {
  const [courses, labs, quizzes, badges, users, progress] = await Promise.all([
    prisma.course.count(),
    prisma.lab.count(),
    prisma.quiz.count(),
    prisma.badge.count(),
    prisma.user.count(),
    prisma.userProgress.count(),
  ]);

  const STATS = [
    { label: "Courses",           value: courses,  color: "#38bdf8", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
    { label: "Labs",              value: labs,     color: "#8b5cf6", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
    { label: "Quizzes",           value: quizzes,  color: "#22c55e", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    { label: "Badges",            value: badges,   color: "#facc15", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
    { label: "Users",             value: users,    color: "#f97316", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
    { label: "Progress Records",  value: progress, color: "#ef4444", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  ];

  return (
    <div>
      <AdminHeader title="Admin Dashboard" subtitle="ภาพรวม NetPath Academy" />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {STATS.map((s) => <AdminStatCard key={s.label} {...s} />)}
      </div>

      <div className="rounded-2xl border border-amber-500/15 bg-amber-500/[0.04] p-4">
        <p className="text-xs font-semibold text-amber-400/70 mb-1">Admin Notice</p>
        <p className="text-xs text-white/35">
          คุณกำลังใช้งาน Admin CMS ของ NetPath Academy · ข้อมูลทั้งหมดที่แก้ไขที่นี่จะมีผลกับฐานข้อมูลจริง
        </p>
      </div>
    </div>
  );
}
