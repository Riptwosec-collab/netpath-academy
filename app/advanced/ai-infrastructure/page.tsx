import type { Metadata } from "next";
import Link from "next/link";
import { advancedTracks } from "@/data/advancedCourses";

export const metadata: Metadata = {
  title: "AI Infrastructure Networking | Advanced | NetPath Academy",
};

const levelColor: Record<string, string> = {
  Beginner:     "text-green-400 bg-green-500/10",
  Intermediate: "text-yellow-400 bg-yellow-500/10",
  Advanced:     "text-orange-400 bg-orange-500/10",
  Expert:       "text-red-400 bg-red-500/10",
};

export default function AiInfrastructurePage() {
  const track = advancedTracks.find(t => t.id === "ai-infrastructure");

  return (
    <div className="min-h-screen bg-[#050816] text-gray-200 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/advanced" className="hover:text-violet-400 transition-colors">Advanced</Link>
          <span>/</span>
          <span className="text-gray-300">AI Infrastructure Networking</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">🤖 AI Infrastructure Networking</h1>
          <p className="text-gray-400">GPU Cluster, RDMA/RoCE, InfiniBand, 400G AI Fabric</p>
          {track && (
            <div className="flex gap-3 mt-3 flex-wrap">
              <span className="text-xs text-yellow-400/70">+{track.totalXp} XP</span>
              <span className="text-xs text-gray-500">~{track.estimatedHours}h</span>
              {track.targetCert && <span className="text-xs text-sky-400/80">🎯 {track.targetCert}</span>}
            </div>
          )}
        </div>

        {track && track.lessons.length > 0 ? (
          <div className="grid gap-4">
            {track.lessons.map((lesson) => (
              <Link
                key={lesson.id}
                href={`/advanced/lessons/${lesson.slug}`}
                className="flex items-start gap-4 p-5 rounded-xl border border-gray-700/40 bg-gray-800/20 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-gray-700/60 flex items-center justify-center text-sm font-bold text-gray-400 group-hover:bg-violet-500/20 group-hover:text-violet-400 shrink-0">
                  {lesson.order}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-semibold text-white mb-1 group-hover:text-violet-100">{lesson.title}</h2>
                  <p className="text-sm text-gray-400 mb-2 line-clamp-2">{lesson.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${levelColor[lesson.level]}`}>{lesson.level}</span>
                    <span className="text-xs text-gray-500">{lesson.duration}</span>
                    <span className="text-xs text-yellow-500/70">+{lesson.xp} XP</span>
                    {lesson.labs.length > 0 && <span className="text-xs text-emerald-500/70">🧪 Lab</span>}
                    {lesson.portfolioTask && <span className="text-xs text-violet-500/70">📁 Portfolio</span>}
                  </div>
                </div>
                <span className="text-gray-600 group-hover:text-violet-400 text-lg mt-1">→</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-600">
            <p className="text-4xl mb-3">🚧</p>
            <p className="text-sm">เนื้อหากำลังจะมา — Coming Soon</p>
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <Link href="/advanced" className="text-sm text-gray-500 hover:text-violet-400 transition-colors">
            ← กลับ Advanced
          </Link>
          {track?.portfolioTask !== undefined && (
            <Link href="/portfolio" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
              Portfolio Projects →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
