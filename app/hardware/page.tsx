import type { Metadata } from "next";
import Link from "next/link";
import { hardwareCategories, allHardwareLessons } from "@/data/hardwareCourses";

export const metadata: Metadata = {
  title: "Hardware Track | NetPath Academy",
  description: "Network Hardware ครบจบ — Cabling, Switch, Router, Firewall, Data Center, AI/GPU, Power/Rack/Cooling",
};

export default function HardwarePage() {
  const totalXp = allHardwareLessons.reduce((s, l) => s + l.xp, 0);

  return (
    <div className="min-h-screen bg-[#050816] text-gray-200 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-amber-400">Home</Link>
            <span>/</span>
            <span className="text-amber-400">Hardware Track</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">🏗️ Hardware Track</h1>
          <p className="text-gray-400 max-w-2xl">
            เรียนรู้ Network Hardware ทุกประเภท — ตั้งแต่สายและหัวต่อ ไปจนถึง GPU Infrastructure Hardware
            สำหรับ Network Engineer ที่ต้องการเข้าใจ Physical Infrastructure
          </p>
          <div className="flex gap-3 mt-4 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {hardwareCategories.length} Categories
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {allHardwareLessons.length} Lessons
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
              {totalXp} XP Total
            </span>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {hardwareCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/hardware/${cat.id}`}
              className="p-5 rounded-xl border border-gray-700/40 bg-gray-800/20 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{cat.icon}</span>
                <h2 className="text-sm font-semibold text-white group-hover:text-amber-300">
                  {cat.title}
                </h2>
              </div>
              <p className="text-xs text-gray-500 mb-3">{cat.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">{cat.lessons.length} lesson{cat.lessons.length !== 1 ? "s" : ""}</span>
                <span className="text-xs text-amber-500/60 group-hover:text-amber-400">Explore →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Lessons */}
        {allHardwareLessons.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-white mb-4">Featured Lessons</h2>
            <div className="grid gap-4">
              {allHardwareLessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/hardware/lessons/${lesson.slug}`}
                  className="flex items-start gap-4 p-5 rounded-xl border border-gray-700/40 bg-gray-800/20 hover:border-amber-500/30 transition-all group"
                >
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1 group-hover:text-amber-200">{lesson.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{lesson.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-xs text-gray-500 capitalize">{lesson.category}</span>
                      <span className="text-xs text-yellow-500/70">+{lesson.xp} XP</span>
                      <span className="text-xs text-gray-500">{lesson.duration}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
