import type { Metadata } from "next";
import Link from "next/link";
import { hardwareCategories } from "@/data/hardwareCourses";

export const metadata: Metadata = {
  title: "Data Center Hardware | Hardware | NetPath Academy",
};

const levelColor: Record<string, string> = {
  Beginner:     "text-green-400 bg-green-500/10",
  Intermediate: "text-yellow-400 bg-yellow-500/10",
  Advanced:     "text-orange-400 bg-orange-500/10",
  Expert:       "text-red-400 bg-red-500/10",
};

export default function DatacenterHwPage() {
  const category = hardwareCategories.find(c => c.id === "datacenter");

  return (
    <div className="min-h-screen bg-[#050816] text-gray-200 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
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
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/hardware" className="hover:text-amber-400 transition-colors">Hardware</Link>
          <span>/</span>
          <span className="text-gray-300">Data Center Hardware</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">🏢 Data Center Hardware</h1>
          <p className="text-gray-400">ToR, Spine, OOB, Console Server, KVM</p>
        </div>

        {category && category.lessons.length > 0 ? (
          <div className="grid gap-4">
            {category.lessons.map((lesson) => (
              <Link
                key={lesson.id}
                href={`/hardware/lessons/${lesson.slug}`}
                className="flex items-start gap-4 p-5 rounded-xl border border-gray-700/40 bg-gray-800/20 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all group"
              >
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-semibold text-white mb-1 group-hover:text-amber-200">{lesson.title}</h2>
                  <p className="text-sm text-gray-400 mb-2 line-clamp-2">{lesson.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${levelColor[lesson.level]}`}>{lesson.level}</span>
                    <span className="text-xs text-gray-500">{lesson.duration}</span>
                    <span className="text-xs text-yellow-500/70">+{lesson.xp} XP</span>
                    {lesson.quiz.length > 0 && <span className="text-xs text-violet-500/70">🧠 {lesson.quiz.length} Quiz</span>}
                    {lesson.labs.length > 0 && <span className="text-xs text-emerald-500/70">🧪 Lab</span>}
                  </div>
                </div>
                <span className="text-gray-600 group-hover:text-amber-400 text-lg">→</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-600">
            <p className="text-4xl mb-3">🚧</p>
            <p className="text-sm">เนื้อหากำลังจะมา — Coming Soon</p>
          </div>
        )}

        <div className="mt-8">
          <Link href="/hardware" className="text-sm text-gray-500 hover:text-amber-400 transition-colors">
            ← กลับ Hardware
          </Link>
        </div>
      </div>
    </div>
  );
}
