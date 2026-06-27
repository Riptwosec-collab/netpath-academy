import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allAdvancedLessons } from "@/data/advancedCourses";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return allAdvancedLessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = allAdvancedLessons.find((l) => l.slug === params.slug);
  return { title: lesson ? `Lab: ${lesson.title} | Advanced` : "Not Found" };
}

const levelColor: Record<string, string> = {
  Beginner:     "text-green-400 bg-green-500/10 border-green-500/20",
  Intermediate: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Advanced:     "text-orange-400 bg-orange-500/10 border-orange-500/20",
  Expert:       "text-red-400 bg-red-500/10 border-red-500/20",
};

export default function AdvancedLabPage({ params }: Props) {
  const lesson = allAdvancedLessons.find((l) => l.slug === params.slug);
  if (!lesson) notFound();

  const labs = lesson.labs ?? [];

  if (labs.length === 0) {
    return (
      <div className="min-h-screen bg-[#050816] text-gray-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🔬</p>
          <p className="text-gray-400 mb-4">ยังไม่มี Lab สำหรับ lesson นี้</p>
          <Link href={`/advanced/lessons/${lesson.slug}`} className="text-violet-400 hover:underline text-sm">← กลับไป Lesson</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-gray-200">
      <div className="max-w-3xl mx-auto px-6 py-10">

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
          <Link href="/advanced" className="hover:text-violet-400 transition-colors">Advanced</Link>
          <span>/</span>
          <Link href={`/advanced/lessons/${lesson.slug}`} className="hover:text-violet-400 transition-colors">{lesson.title}</Link>
          <span>/</span>
          <span className="text-gray-300">Lab</span>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🔬</span>
            <span className="text-xs px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 text-violet-400">Lab</span>
          </div>
          <h1 className="text-2xl font-bold text-white">{lesson.title}</h1>
        </div>

        <div className="space-y-8">
          {labs.map((lab, labIdx) => (
            <div key={labIdx} className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.03] overflow-hidden">
              <div className="px-6 py-4 border-b border-violet-500/15 flex items-center justify-between flex-wrap gap-3">
                <h2 className="text-base font-bold text-violet-300">{lab.title}</h2>
                <div className="flex items-center gap-2">
                  {lab.estimatedMinutes && (
                    <span className="text-xs text-gray-400 bg-gray-800/60 px-2.5 py-1 rounded-full">⏱ {lab.estimatedMinutes} min</span>
                  )}
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${levelColor[lab.level] ?? "text-gray-400 bg-gray-800/60 border-gray-700"}`}>{lab.level}</span>
                </div>
              </div>
              <div className="px-6 py-5">
                <ol className="space-y-3">
                  {lab.steps.map((step: string, si: number) => (
                    <li key={si} className="flex gap-3">
                      <span className="w-6 h-6 shrink-0 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-400 text-xs font-bold flex items-center justify-center">{si + 1}</span>
                      <p className="text-sm text-gray-300 leading-relaxed pt-0.5">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
              {lab.verification && lab.verification.length > 0 && (
                <div className="px-6 py-4 border-t border-violet-500/15 bg-violet-500/[0.04]">
                  <h3 className="text-xs font-bold text-violet-400/70 uppercase tracking-wider mb-3">✓ Verification</h3>
                  {lab.verification.map((v: string, vi: number) => (
                    <p key={vi} className="text-sm text-gray-300 flex gap-2"><span className="text-violet-400">→</span>{v}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3 justify-between">
          <Link href={`/advanced/lessons/${lesson.slug}`} className="px-4 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 text-sm transition-colors">← กลับไป Lesson</Link>
          <Link href={`/advanced/lessons/${lesson.slug}/quiz`} className="px-5 py-2.5 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-400 hover:bg-violet-500/20 text-sm font-medium transition-colors">📝 ทำ Quiz →</Link>
        </div>
      </div>
    </div>
  );
}
