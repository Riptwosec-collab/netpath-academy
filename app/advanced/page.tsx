import type { Metadata } from "next";
import Link from "next/link";
import { advancedTracks } from "@/data/advancedCourses";

export const metadata: Metadata = {
  title: "Advanced Tracks | NetPath Academy",
  description: "Advanced Networking Tracks — AI Infrastructure, Cloud Native, Wireless & Mobile, Modern Security, Hardware",
};

const trackColors: Record<string, string> = {
  "ai-infrastructure":       "from-violet-500/20 to-purple-500/10 border-violet-500/30",
  "cloud-ai-ops":            "from-cyan-500/20 to-sky-500/10 border-cyan-500/30",
  "wireless-mobile":         "from-emerald-500/20 to-green-500/10 border-emerald-500/30",
  "security":                "from-rose-500/20 to-red-500/10 border-rose-500/30",
  "hardware-infrastructure": "from-amber-500/20 to-yellow-500/10 border-amber-500/30",
};

const trackHrefs: Record<string, string> = {
  "ai-infrastructure":       "/advanced/ai-infrastructure",
  "cloud-ai-ops":            "/advanced/cloud-ai-ops",
  "wireless-mobile":         "/advanced/wireless-mobile",
  "security":                "/advanced/security",
  "hardware-infrastructure": "/advanced/hardware-infrastructure",
};

export default function AdvancedPage() {
  const totalLessons = advancedTracks.reduce((s, t) => s + t.lessons.length, 0);

  return (
    <div className="min-h-screen bg-[#050816] text-gray-200 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-cyan-400">Home</Link>
            <span>/</span>
            <span className="text-cyan-400">Advanced Tracks</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">⚡ Advanced Tracks</h1>
          <p className="text-gray-400 max-w-2xl">
            5 Advanced Tracks สำหรับ Network Engineer ที่ต้องการเชี่ยวชาญเฉพาะด้าน —
            AI Infrastructure, Cloud Native, Wireless & Mobile, Modern Security, Network Hardware
          </p>
          <div className="flex gap-3 mt-4 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs bg-violet-500/10 text-violet-400 border border-violet-500/20">
              5 Tracks
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {totalLessons}+ Lessons
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20">
              Requires Foundation
            </span>
          </div>
        </div>

        {/* Track Cards */}
        <div className="grid gap-6">
          {advancedTracks.map((track) => {
            const href = trackHrefs[track.id] ?? `/advanced/${track.id}`;
            return (
              <div
                key={track.id}
                className={`rounded-2xl border bg-gradient-to-br p-6 ${trackColors[track.id] ?? "border-gray-700/50 from-gray-800/40 to-gray-800/20"}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{track.icon}</span>
                    <div>
                      <h2 className="text-xl font-bold text-white">{track.title}</h2>
                      <p className="text-gray-400 text-sm mt-0.5">{track.description}</p>
                    </div>
                  </div>
                  <Link
                    href={href}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-colors shrink-0"
                  >
                    Start →
                  </Link>
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="text-xs text-gray-400">{track.lessons.length} lessons available</span>
                  <span className="text-xs text-gray-400">~{track.estimatedHours}h</span>
                  <span className="text-xs text-yellow-400/70">+{track.totalXp} XP</span>
                  {track.targetCert && (
                    <span className="text-xs text-sky-400/80">🎯 {track.targetCert}</span>
                  )}
                </div>

                {track.lessons.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-2">
                    {track.lessons.slice(0, 4).map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/advanced/lessons/${lesson.slug}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/20 hover:bg-black/30 border border-white/5 transition-colors text-xs text-gray-300 hover:text-white"
                      >
                        <span className="text-gray-600 shrink-0">{lesson.order}.</span>
                        <span className="truncate">{lesson.title}</span>
                        <span className="text-yellow-500/60 shrink-0">+{lesson.xp}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link href="/foundation" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
            ← ยังไม่จบ Foundation? กลับไปเรียนก่อน
          </Link>
        </div>

      </div>
    </div>
  );
}
