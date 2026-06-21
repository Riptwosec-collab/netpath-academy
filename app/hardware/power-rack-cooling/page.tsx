import type { Metadata } from "next";
import Link from "next/link";
import { hardwareCategories } from "@/data/hardwareCourses";

export const metadata: Metadata = {
  title: "Power / Rack / Cooling | Hardware | NetPath Academy",
};

const levelColor: Record<string, string> = {
  Beginner:     "text-green-400 bg-green-500/10",
  Intermediate: "text-yellow-400 bg-yellow-500/10",
  Advanced:     "text-orange-400 bg-orange-500/10",
  Expert:       "text-red-400 bg-red-500/10",
};

export default function PowerRackCoolingHwPage() {
  const category = hardwareCategories.find(c => c.id === "power-rack-cooling");

  return (
    <div className="min-h-screen bg-[#050816] text-gray-200 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/hardware" className="hover:text-amber-400 transition-colors">Hardware</Link>
          <span>/</span>
          <span className="text-gray-300">Power / Rack / Cooling</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">⚡ Power / Rack / Cooling</h1>
          <p className="text-gray-400">Rack, UPS, PDU, ATS, Airflow, Hot/Cold Aisle</p>
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
