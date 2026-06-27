import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allAdvancedLessons } from "@/data/advancedCourses";

interface Props { params: { slug: string }; }

export async function generateStaticParams() {
  return allAdvancedLessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = allAdvancedLessons.find((l) => l.slug === params.slug);
  return { title: lesson ? `${lesson.title} | Advanced` : "Not Found" };
}

const levelColor: Record<string, string> = {
  Beginner:     "text-green-400 bg-green-500/10 border-green-500/20",
  Intermediate: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Advanced:     "text-orange-400 bg-orange-500/10 border-orange-500/20",
  Expert:       "text-red-400 bg-red-500/10 border-red-500/20",
};

export default function AdvancedLessonPage({ params }: Props) {
  const lesson = allAdvancedLessons.find((l) => l.slug === params.slug);
  if (!lesson) notFound();

  return (
    <div className="min-h-screen bg-[#050816] text-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-10">

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/advanced" className="hover:text-violet-400 transition-colors">Advanced</Link>
          <span>/</span>
          <span className="text-gray-300 capitalize">{lesson.track.replace("-", " ")}</span>
          <span>/</span>
          <span className="text-gray-300">{lesson.title}</span>
        </div>

        <div className="mb-8 pb-6 border-b border-gray-700/50">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20 capitalize">
              {lesson.track}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded border ${levelColor[lesson.level]}`}>{lesson.level}</span>
            <span className="text-xs px-2 py-0.5 rounded text-gray-400 bg-gray-800/60">{lesson.duration}</span>
            <span className="text-xs px-2 py-0.5 rounded text-yellow-400 bg-yellow-500/10">+{lesson.xp} XP</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{lesson.title}</h1>
          <p className="text-gray-400">{lesson.description}</p>
        </div>

        {/* Objectives */}
        <Section title="🎯 Learning Objectives">
          <ul className="space-y-2">
            {lesson.objectives.map((obj, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-300">
                <span className="text-violet-400 mt-0.5">✓</span>{obj}
              </li>
            ))}
          </ul>
        </Section>

        {/* Concepts */}
        <Section title="💡 Key Concepts">
          <div className="flex flex-wrap gap-2">
            {lesson.concepts.map(c => (
              <span key={c} className="text-xs px-2 py-1 rounded bg-gray-800/60 border border-gray-700/40 text-gray-300">{c}</span>
            ))}
          </div>
        </Section>

        {/* Diagram */}
        {lesson.mermaidDiagram && (
          <Section title="📊 Diagram">
            <div className="bg-gray-900/60 rounded-xl p-4 border border-gray-700/40 overflow-x-auto">
              <pre className="text-xs text-gray-400 font-mono whitespace-pre">{lesson.mermaidDiagram}</pre>
            </div>
          </Section>
        )}

        {/* Traffic Flow */}
        {lesson.trafficFlow && lesson.trafficFlow.length > 0 && (
          <Section title="🔄 Traffic Flow">
            <ol className="space-y-2">
              {lesson.trafficFlow.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-300">
                  <span className="w-5 h-5 shrink-0 rounded-full bg-violet-500/20 text-violet-400 text-xs flex items-center justify-center font-bold">{i+1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </Section>
        )}

        {/* Commands */}
        {lesson.commands && lesson.commands.length > 0 && (
          <Section title="⌨️ Commands">
            <div className="space-y-2">
              {lesson.commands.map((cmd, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 p-3 rounded-lg bg-gray-900/60 border border-gray-700/30">
                  <code className="text-xs text-violet-300 font-mono whitespace-pre bg-black/30 px-2 py-1 rounded shrink-0">{cmd.command}</code>
                  <span className="text-xs text-gray-500">{cmd.description}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* YAML */}
        {lesson.yamlExamples && lesson.yamlExamples.length > 0 && (
          <Section title="📄 Config Examples">
            {lesson.yamlExamples.map((ex, i) => (
              <div key={i} className="mb-4">
                <p className="text-sm font-medium text-gray-300 mb-1">{ex.title}</p>
                <pre className="text-xs text-green-300 font-mono bg-gray-900/60 border border-gray-700/30 rounded-lg p-4 overflow-x-auto">{ex.code}</pre>
                <p className="text-xs text-gray-500 mt-1">{ex.description}</p>
              </div>
            ))}
          </Section>
        )}

        {/* Lab & Quiz Navigation Cards */}
        <div className="mb-8 grid sm:grid-cols-2 gap-4">
          {lesson.labs.length > 0 && (
            <Link
              href={`/advanced/lessons/${lesson.slug}/lab`}
              className="group flex items-center gap-4 p-5 rounded-2xl border border-violet-500/25 bg-violet-500/[0.04] hover:bg-violet-500/10 hover:border-violet-500/40 transition-all duration-200"
            >
              <span className="text-3xl">🔬</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-violet-300 group-hover:text-violet-200 transition-colors">Hands-on Lab</p>
                <p className="text-xs text-gray-500 mt-0.5">{lesson.labs.length} lab{lesson.labs.length > 1 ? 's' : ''} · ฝึกจากของจริง</p>
              </div>
              <span className="text-violet-500/50 group-hover:text-violet-400 transition-colors text-lg">→</span>
            </Link>
          )}
          {lesson.quiz.length > 0 && (
            <Link
              href={`/advanced/lessons/${lesson.slug}/quiz`}
              className="group flex items-center gap-4 p-5 rounded-2xl border border-cyan-500/25 bg-cyan-500/[0.04] hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all duration-200"
            >
              <span className="text-3xl">📝</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors">ทำ Quiz</p>
                <p className="text-xs text-gray-500 mt-0.5">{lesson.quiz.length} ข้อ · เฉลยหลังทำเสร็จ</p>
              </div>
              <span className="text-cyan-500/50 group-hover:text-cyan-400 transition-colors text-lg">→</span>
            </Link>
          )}
        </div>

        {/* Troubleshooting */}
        {lesson.troubleshooting.length > 0 && (
          <Section title="🔧 Troubleshooting">
            <div className="space-y-3">
              {lesson.troubleshooting.map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                  <p className="text-sm font-medium text-red-400 mb-2">⚠️ {item.symptom}</p>
                  <div className="grid sm:grid-cols-3 gap-3 text-xs">
                    <div><p className="text-gray-500 mb-1">Cause</p><p className="text-gray-300">{item.possibleCause}</p></div>
                    <div><p className="text-gray-500 mb-1">Check</p><p className="text-gray-300 font-mono">{item.check}</p></div>
                    <div><p className="text-gray-500 mb-1">Fix</p><p className="text-gray-300">{item.fix}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}


        {/* Portfolio Task */}
        {lesson.portfolioTask && (
          <Section title="🎯 Portfolio Task">
            <div className="p-5 rounded-xl border border-violet-500/30 bg-violet-500/5">
              <h3 className="text-base font-semibold text-violet-400 mb-2">{lesson.portfolioTask.title}</h3>
              <p className="text-sm text-gray-300 mb-3">{lesson.portfolioTask.description}</p>
              <ul className="space-y-1">
                {lesson.portfolioTask.deliverables.map((d, i) => (
                  <li key={i} className="text-xs text-gray-300 flex gap-2"><span className="text-violet-400">•</span>{d}</li>
                ))}
              </ul>
            </div>
          </Section>
        )}

        <div className="mt-10 flex justify-between">
          <Link href="/advanced" className="px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 text-sm transition-colors">
            ← Back to Advanced
          </Link>
          <Link href="/portfolio" className="px-4 py-2 rounded-lg bg-violet-500 hover:bg-violet-400 text-white text-sm font-medium transition-colors">
            Portfolio →
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
      {children}
    </div>
  );
}
