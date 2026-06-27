import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { automationLessons } from "@/data/automationCourses";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return automationLessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = automationLessons.find((l) => l.slug === params.slug);
  return { title: lesson ? `Lab: ${lesson.title} | Network Automation` : "Not Found" };
}

const levelColor: Record<string, string> = {
  Beginner:     "text-green-400 bg-green-500/10 border-green-500/20",
  Intermediate: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Advanced:     "text-orange-400 bg-orange-500/10 border-orange-500/20",
  Expert:       "text-red-400 bg-red-500/10 border-red-500/20",
};

export default function AutomationLabPage({ params }: Props) {
  const lesson = automationLessons.find((l) => l.slug === params.slug);
  if (!lesson) notFound();

  const lab = lesson.lab as {
    title: string;
    description?: string;
    difficulty?: string;
    duration?: string;
    objectives?: string[];
  } | undefined;

  if (!lab) {
    return (
      <div className="min-h-screen bg-[#050816] text-gray-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🔬</p>
          <p className="text-gray-400 mb-4">ยังไม่มี Lab สำหรับ lesson นี้</p>
          <Link href={`/advanced/network-automation/lessons/${lesson.slug}`} className="text-emerald-400 hover:underline text-sm">
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
          <Link href="/advanced/network-automation" className="hover:text-emerald-400 transition-colors">Network Automation</Link>
          <span>/</span>
          <Link href={`/advanced/network-automation/lessons/${lesson.slug}`} className="hover:text-emerald-400 transition-colors">{lesson.title}</Link>
          <span>/</span>
          <span className="text-gray-300">Lab</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🔬</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">Lab</span>
          </div>
          <h1 className="text-2xl font-bold text-white">{lab.title}</h1>
          {lab.description && <p className="text-gray-400 text-sm mt-1">{lab.description}</p>}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mb-8">
          {lab.duration && (
            <span className="text-xs text-gray-400 bg-gray-800/60 px-3 py-1.5 rounded-full">⏱ {lab.duration}</span>
          )}
          {lab.difficulty && (
            <span className={`text-xs px-3 py-1.5 rounded-full border ${levelColor[lab.difficulty] ?? "text-gray-400 bg-gray-800/60 border-gray-700"}`}>
              {lab.difficulty}
            </span>
          )}
        </div>

        {/* Objectives */}
        {lab.objectives && lab.objectives.length > 0 && (
          <div className="mb-8 p-5 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03]">
            <h2 className="text-xs font-bold text-emerald-400/70 uppercase tracking-wider mb-3">🎯 Lab Objectives</h2>
            <ul className="space-y-2">
              {lab.objectives.map((obj: string, i: number) => (
                <li key={i} className="flex gap-2 text-sm text-gray-300">
                  <span className="text-emerald-400 shrink-0">→</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Lesson Commands (as reference) */}
        {lesson.commands && lesson.commands.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">⚡ Commands Reference</h2>
            <div className="space-y-2">
              {lesson.commands.map((cmd: {command: string; description?: string}, i: number) => (
                <div key={i} className="rounded-lg bg-gray-900/80 border border-gray-700/50 p-3">
                  <code className="text-xs text-emerald-300 block">{cmd.command}</code>
                  {cmd.description && <p className="text-xs text-gray-500 mt-1">{cmd.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-10 flex flex-wrap gap-3 justify-between items-center">
          <Link
            href={`/advanced/network-automation/lessons/${lesson.slug}`}
            className="px-4 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 text-sm transition-colors"
          >
            ← กลับไป Lesson
          </Link>
          <Link
            href={`/advanced/network-automation/lessons/${lesson.slug}/quiz`}
            className="px-5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-sm font-medium transition-colors"
          >
            📝 ทำ Quiz →
          </Link>
        </div>

      </div>
    </div>
  );
}
