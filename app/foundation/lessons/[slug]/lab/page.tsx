import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allFoundationLessons } from "@/data/foundationCourses";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return allFoundationLessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = allFoundationLessons.find((l) => l.slug === params.slug);
  return { title: lesson ? `Lab: ${lesson.title} | Foundation` : "Not Found" };
}

const levelColor: Record<string, string> = {
  Beginner:     "text-green-400 bg-green-500/10 border-green-500/20",
  Intermediate: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Advanced:     "text-orange-400 bg-orange-500/10 border-orange-500/20",
  Expert:       "text-red-400 bg-red-500/10 border-red-500/20",
};

export default function FoundationLabPage({ params }: Props) {
  const lesson = allFoundationLessons.find((l) => l.slug === params.slug);
  if (!lesson) notFound();

  const labs = lesson.labs ?? [];

  if (labs.length === 0) {
    return (
      <div className="min-h-screen bg-[#050816] text-gray-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🔬</p>
          <p className="text-gray-400 mb-4">ยังไม่มี Lab สำหรับ lesson นี้</p>
          <Link href={`/foundation/lessons/${lesson.slug}`} className="text-cyan-400 hover:underline text-sm">
            ← กลับไป Lesson
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-gray-200">
      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
          <Link href="/foundation" className="hover:text-cyan-400 transition-colors">Foundation</Link>
          <span>/</span>
          <Link href={`/foundation/lessons/${lesson.slug}`} className="hover:text-cyan-400 transition-colors">{lesson.title}</Link>
          <span>/</span>
          <span className="text-gray-300">Lab</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🔬</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">Lab</span>
          </div>
          <h1 className="text-2xl font-bold text-white">{lesson.title}</h1>
          <p className="text-gray-500 text-sm mt-1">Hands-on Lab — ฝึกจากของจริง</p>
        </div>

        {/* Labs */}
        <div className="space-y-8">
          {labs.map((lab, labIdx) => (
            <div key={labIdx} className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] overflow-hidden">

              {/* Lab Header */}
              <div className="px-6 py-4 border-b border-emerald-500/15 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-base font-bold text-emerald-300">{lab.title}</h2>
                  {labs.length > 1 && (
                    <p className="text-xs text-gray-500 mt-0.5">Lab {labIdx + 1} of {labs.length}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {lab.estimatedMinutes && (
                    <span className="text-xs text-gray-400 bg-gray-800/60 px-2.5 py-1 rounded-full">
                      ⏱ {lab.estimatedMinutes} min
                    </span>
                  )}
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${levelColor[lab.level] ?? "text-gray-400 bg-gray-800/60 border-gray-700"}`}>
                    {lab.level}
                  </span>
                </div>
              </div>

              {/* Steps */}
              <div className="px-6 py-5">
                <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4">ขั้นตอน</h3>
                <ol className="space-y-3">
                  {lab.steps.map((step, si) => (
                    <li key={si} className="flex gap-3">
                      <span className="w-6 h-6 shrink-0 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-xs font-bold flex items-center justify-center">
                        {si + 1}
                      </span>
                      <p className="text-sm text-gray-300 leading-relaxed pt-0.5">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Verification */}
              {lab.verification && lab.verification.length > 0 && (
                <div className="px-6 py-4 border-t border-emerald-500/15 bg-emerald-500/[0.04]">
                  <h3 className="text-xs font-bold text-emerald-400/70 uppercase tracking-wider mb-3">✓ Verification</h3>
                  <ul className="space-y-1.5">
                    {lab.verification.map((v, vi) => (
                      <li key={vi} className="flex gap-2 text-sm text-gray-300">
                        <span className="text-emerald-400 shrink-0">→</span>
                        {v}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-10 flex flex-wrap gap-3 justify-between items-center">
          <Link
            href={`/foundation/lessons/${lesson.slug}`}
            className="px-4 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 text-sm transition-colors"
          >
            ← กลับไป Lesson
          </Link>
          <Link
            href={`/foundation/lessons/${lesson.slug}/quiz`}
            className="px-5 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 text-sm font-medium transition-colors"
          >
            📝 ทำ Quiz →
          </Link>
        </div>

      </div>
    </div>
  );
}
