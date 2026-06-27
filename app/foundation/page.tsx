import type { Metadata } from "next";
import Link from "next/link";
import { foundationCategories, allFoundationLessons } from "@/data/foundationCourses";

export const metadata: Metadata = {
  title: "Foundation Track | NetPath Academy",
  description: "พื้นฐาน Network Engineer ครบจบในที่เดียว — OSI, TCP/IP, VLAN, Routing, Firewall",
};

const levelColor: Record<string, string> = {
  Beginner:     "text-green-400 bg-green-500/10",
  Intermediate: "text-yellow-400 bg-yellow-500/10",
  Advanced:     "text-orange-400 bg-orange-500/10",
  Expert:       "text-red-400 bg-red-500/10",
};

export default function FoundationPage() {
  const totalLessons = allFoundationLessons.length;
  const totalXp = allFoundationLessons.reduce((s, l) => s + l.xp, 0);

  return (
    <div className="min-h-screen bg-[#050816] text-gray-200 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">

        {/* Home button */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/40 hover:text-white hover:border-white/20 hover:bg-white/[0.07] transition-all text-xs font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Dashboard
          </Link>
        </div>
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <span>NetPath Academy</span>
            <span>/</span>
            <span className="text-cyan-400">Foundation</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            🌐 Foundation Track
          </h1>
          <p className="text-gray-400 max-w-2xl">
            พื้นฐาน Network Engineer ที่ต้องรู้ — ตั้งแต่ OSI Model, IP Addressing, Switching, Routing
            ไปจนถึง Firewall, Wireless และ Troubleshooting
          </p>
          <div className="flex gap-4 mt-4 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {foundationCategories.length} Topics
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-violet-500/10 text-violet-400 border border-violet-500/20">
              {totalLessons} Lessons
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
              {totalXp} XP Total
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-400 border border-green-500/20">
              Beginner → Intermediate
            </span>
          </div>
        </div>

        {/* Learning Path Overview */}
        <div className="mb-10 p-5 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
          <h2 className="text-sm font-semibold text-cyan-400 mb-3">📍 Learning Path</h2>
          <div className="flex flex-wrap gap-2 items-center">
            {foundationCategories.map((cat, i) => (
              <div key={cat.id} className="flex items-center gap-2">
                <span className="text-xs text-gray-400 bg-gray-800/60 px-2 py-1 rounded-lg">
                  {cat.icon} {cat.title}
                </span>
                {i < foundationCategories.length - 1 && (
                  <span className="text-gray-600 text-xs">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid gap-6">
          {foundationCategories.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl border border-gray-700/50 bg-gray-800/20 overflow-hidden hover:border-gray-600/70 transition-colors"
            >
              {/* Category Header */}
              <div className="px-6 py-4 border-b border-gray-700/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h2 className="text-base font-semibold text-white">{category.title}</h2>
                    <p className="text-xs text-gray-500">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">{category.lessons.length} lessons</span>
                  <Link
                    href={`/foundation/${category.id}`}
                    className="px-3 py-1.5 text-xs rounded-lg bg-gray-700/60 hover:bg-gray-700 text-gray-300 transition-colors"
                  >
                    View All →
                  </Link>
                </div>
              </div>

              {/* Lesson List */}
              {category.lessons.length > 0 ? (
                <div className="p-4 grid sm:grid-cols-2 gap-3">
                  {category.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/foundation/lessons/${lesson.slug}`}
                      className="flex items-start gap-3 p-3 rounded-xl border border-gray-700/30 bg-gray-800/30 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all group"
                    >
                      <div className="mt-0.5 w-6 h-6 rounded-full bg-gray-700/60 flex items-center justify-center text-xs text-gray-400 shrink-0 group-hover:bg-cyan-500/20 group-hover:text-cyan-400">
                        {lesson.order}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-200 group-hover:text-white truncate">
                          {lesson.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${levelColor[lesson.level]}`}>
                            {lesson.level}
                          </span>
                          <span className="text-[10px] text-gray-600">{lesson.duration}</span>
                          <span className="text-[10px] text-yellow-500/70">+{lesson.xp} XP</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-4 text-sm text-gray-600 italic">
                  เนื้อหากำลังจะมา — Coming Soon
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 p-6 rounded-xl border border-gray-700/50 bg-gray-800/20 text-center">
          <p className="text-gray-400 text-sm mb-4">เสร็จ Foundation แล้ว? พร้อมไป Advanced Track!</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/advanced" className="px-5 py-2 rounded-lg bg-violet-500 hover:bg-violet-400 text-white text-sm font-medium transition-colors">
              Advanced Tracks →
            </Link>
            <Link href="/hardware" className="px-5 py-2 rounded-lg border border-gray-600 hover:border-gray-500 text-gray-300 text-sm font-medium transition-colors">
              Hardware Track →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
