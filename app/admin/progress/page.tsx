import prisma       from "@/lib/prisma";
import AdminHeader  from "@/components/admin/AdminHeader";
import AdminEmptyState from "@/components/admin/AdminEmptyState";

export default async function AdminProgressPage() {
  const [labSubs, quizScores, userBadges] = await Promise.all([
    prisma.labSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { user: { select: { name: true, email: true } }, lab: { select: { title: true } } },
    }),
    prisma.quizScore.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { user: { select: { name: true, email: true } }, quiz: { select: { title: true } } },
    }),
    prisma.userBadge.findMany({
      orderBy: { earnedAt: "desc" },
      take: 30,
      include: { user: { select: { name: true } }, badge: { select: { title: true, icon: true } } },
    }),
  ]);

  return (
    <div className="space-y-8">
      <AdminHeader title="Progress Overview" subtitle="Latest lab/quiz/badge activity" />

      {/* Lab Submissions */}
      <section>
        <h2 className="text-xs font-semibold text-white/35 mb-3 uppercase tracking-widest">Lab Submissions ({labSubs.length})</h2>
        {labSubs.length === 0 ? <AdminEmptyState message="ยังไม่มี submission" /> : (
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
            <table className="w-full text-xs">
              <thead><tr className="border-b border-white/[0.06]">
                {["User","Lab","Score","Status","Date"].map((h) => (
                  <th key={h} className="px-4 py-2 text-left text-[10px] text-white/20 font-semibold uppercase tracking-wider">{h}</th>
                ))}
              </tr></thead>
              <tbody className="divide-y divide-white/[0.04]">
                {labSubs.map((s) => (
                  <tr key={s.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-2.5 text-white/55">{s.user.name ?? s.user.email}</td>
                    <td className="px-4 py-2.5 text-white/40">{s.lab.title}</td>
                    <td className="px-4 py-2.5 text-cyan-400/70">{s.score ?? "—"}</td>
                    <td className="px-4 py-2.5">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                        s.status === "COMPLETED" ? "bg-green-500/15 text-green-400" : "bg-yellow-500/15 text-yellow-400"
                      }`}>{s.status}</span>
                    </td>
                    <td className="px-4 py-2.5 text-white/25">{new Date(s.createdAt).toLocaleDateString("th-TH")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Quiz Scores */}
      <section>
        <h2 className="text-xs font-semibold text-white/35 mb-3 uppercase tracking-widest">Quiz Scores ({quizScores.length})</h2>
        {quizScores.length === 0 ? <AdminEmptyState message="ยังไม่มี score" /> : (
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
            <table className="w-full text-xs">
              <thead><tr className="border-b border-white/[0.06]">
                {["User","Quiz","Score","Passed","Date"].map((h) => (
                  <th key={h} className="px-4 py-2 text-left text-[10px] text-white/20 font-semibold uppercase tracking-wider">{h}</th>
                ))}
              </tr></thead>
              <tbody className="divide-y divide-white/[0.04]">
                {quizScores.map((q) => (
                  <tr key={q.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-2.5 text-white/55">{q.user.name ?? q.user.email}</td>
                    <td className="px-4 py-2.5 text-white/40">{q.quiz.title}</td>
                    <td className="px-4 py-2.5 text-cyan-400/70">{q.score}%</td>
                    <td className="px-4 py-2.5">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                        q.passed ? "bg-green-500/15 text-green-400" : "bg-rose-500/15 text-rose-400"
                      }`}>{q.passed ? "Pass" : "Fail"}</span>
                    </td>
                    <td className="px-4 py-2.5 text-white/25">{new Date(q.createdAt).toLocaleDateString("th-TH")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Badges */}
      <section>
        <h2 className="text-xs font-semibold text-white/35 mb-3 uppercase tracking-widest">Badges Earned ({userBadges.length})</h2>
        {userBadges.length === 0 ? <AdminEmptyState message="ยังไม่มี badge ที่ unlock" /> : (
          <div className="flex flex-wrap gap-2">
            {userBadges.map((b) => (
              <div key={b.id} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-amber-500/20 bg-amber-500/[0.05] text-xs">
                <span>{b.badge.icon}</span>
                <span className="text-white/50">{b.user.name}</span>
                <span className="text-amber-400/60">·</span>
                <span className="text-amber-400/60">{b.badge.title}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
