import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allFoundationLessons } from "@/data/foundationCourses";
import LessonCompleteButton from "@/components/lessons/LessonCompleteButton";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return allFoundationLessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = allFoundationLessons.find((l) => l.slug === params.slug);
  return {
    title: lesson ? `${lesson.title} | Foundation` : "Not Found",
  };
}

const levelColor: Record<string, string> = {
  Beginner:     "text-green-400 bg-green-500/10 border-green-500/20",
  Intermediate: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Advanced:     "text-orange-400 bg-orange-500/10 border-orange-500/20",
  Expert:       "text-red-400 bg-red-500/10 border-red-500/20",
};

const interviewColor = { Junior: "text-green-400", Mid: "text-yellow-400", Senior: "text-orange-400" };

export default function FoundationLessonPage({ params }: Props) {
  const lesson = allFoundationLessons.find((l) => l.slug === params.slug);
  if (!lesson) notFound();

  return (
    <div className="min-h-screen bg-[#050816] text-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/foundation" className="hover:text-cyan-400 transition-colors">Foundation</Link>
          <span>/</span>
          <span className="text-gray-300">{lesson.title}</span>
        </div>

        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-700/50">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`text-xs px-2 py-0.5 rounded border ${levelColor[lesson.level]}`}>{lesson.level}</span>
            <span className="text-xs px-2 py-0.5 rounded text-gray-400 bg-gray-800/60">{lesson.duration}</span>
            <span className="text-xs px-2 py-0.5 rounded text-yellow-400 bg-yellow-500/10">+{lesson.xp} XP</span>
            {lesson.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded bg-gray-800/60 text-gray-500">{tag}</span>
            ))}
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{lesson.title}</h1>
          <p className="text-gray-400">{lesson.description}</p>
        </div>

        {/* Learning Objectives */}
        <Section title="🎯 Learning Objectives">
          <ul className="space-y-2">
            {lesson.objectives.map((obj, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-300">
                <span className="text-cyan-400 mt-0.5">✓</span>
                {obj}
              </li>
            ))}
          </ul>
        </Section>

        {/* Prerequisites */}
        {lesson.prerequisites.length > 0 && (
          <Section title="📚 Prerequisites">
            <div className="flex flex-wrap gap-2">
              {lesson.prerequisites.map(p => (
                <Link
                  key={p}
                  href={`/foundation/lessons/${p}`}
                  className="text-xs px-3 py-1 rounded-full border border-violet-500/30 text-violet-400 hover:bg-violet-500/10 transition-colors"
                >
                  {p}
                </Link>
              ))}
            </div>
          </Section>
        )}

        {/* Key Concepts */}
        <Section title="💡 Key Concepts">
          <div className="flex flex-wrap gap-2">
            {lesson.concepts.map(c => (
              <span key={c} className="text-xs px-2 py-1 rounded bg-gray-800/60 border border-gray-700/40 text-gray-300">{c}</span>
            ))}
          </div>
        </Section>

        {/* Architecture / Description */}
        {lesson.architecture && (
          <Section title="🏗️ Architecture">
            <p className="text-sm text-gray-300 leading-relaxed">{lesson.architecture}</p>
          </Section>
        )}

        {/* Diagram */}
        {lesson.mermaidDiagram && (
          <Section title="📊 Diagram">
            <div className="bg-gray-900/60 rounded-xl p-4 border border-gray-700/40 overflow-x-auto">
              <pre className="text-xs text-gray-400 font-mono whitespace-pre">{lesson.mermaidDiagram}</pre>
            </div>
            <p className="text-xs text-gray-600 mt-2">Mermaid Diagram — คัดลอกไปวางที่ mermaid.live เพื่อดูแผนภาพ</p>
          </Section>
        )}

        {/* Traffic Flow */}
        {lesson.trafficFlow && lesson.trafficFlow.length > 0 && (
          <Section title="🔄 Traffic Flow">
            <ol className="space-y-2">
              {lesson.trafficFlow.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-300">
                  <span className="w-5 h-5 shrink-0 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-bold">{i+1}</span>
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
                  <code className="text-xs text-cyan-300 font-mono whitespace-pre bg-black/30 px-2 py-1 rounded shrink-0">{cmd.command}</code>
                  <span className="text-xs text-gray-500">{cmd.description}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* YAML Examples */}
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

        {/* Labs */}
        {lesson.labs.length > 0 && (
          <Section title="🧪 Labs">
            {lesson.labs.map((lab, i) => (
              <div key={i} className="mb-4 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-emerald-400">{lab.title}</h3>
                  <div className="flex gap-2">
                    {lab.estimatedMinutes && (
                      <span className="text-xs text-gray-500">{lab.estimatedMinutes} min</span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded border ${levelColor[lab.level]}`}>{lab.level}</span>
                  </div>
                </div>
                <ol className="space-y-1.5">
                  {lab.steps.map((step, si) => (
                    <li key={si} className="flex gap-2 text-xs text-gray-300">
                      <span className="text-emerald-400 shrink-0 font-bold">{si+1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
                {lab.verification && lab.verification.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-emerald-500/20">
                    <p className="text-xs font-semibold text-emerald-400 mb-1">✓ Verification</p>
                    {lab.verification.map((v, vi) => (
                      <p key={vi} className="text-xs text-gray-400">• {v}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Troubleshooting */}
        {lesson.troubleshooting.length > 0 && (
          <Section title="🔧 Troubleshooting">
            <div className="space-y-3">
              {lesson.troubleshooting.map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                  <p className="text-sm font-medium text-red-400 mb-2">⚠️ {item.symptom}</p>
                  <div className="grid sm:grid-cols-3 gap-3 text-xs">
                    <div><p className="text-gray-500 mb-1">Possible Cause</p><p className="text-gray-300">{item.possibleCause}</p></div>
                    <div><p className="text-gray-500 mb-1">Check</p><p className="text-gray-300 font-mono">{item.check}</p></div>
                    <div><p className="text-gray-500 mb-1">Fix</p><p className="text-gray-300">{item.fix}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Quiz */}
        {lesson.quiz.length > 0 && (
          <Section title="🧠 Quiz">
            <div className="space-y-4">
              {lesson.quiz.map((q, i) => (
                <div key={i} className="p-4 rounded-xl border border-gray-700/40 bg-gray-800/20">
                  <p className="text-sm font-medium text-gray-200 mb-3">{i+1}. {q.question}</p>
                  <div className="grid sm:grid-cols-2 gap-2 mb-3">
                    {q.choices.map((c, ci) => (
                      <div
                        key={ci}
                        className={`text-xs px-3 py-2 rounded-lg border ${
                          c === q.answer
                            ? "border-green-500/40 bg-green-500/10 text-green-300"
                            : "border-gray-700/30 text-gray-400"
                        }`}
                      >
                        {String.fromCharCode(65+ci)}. {c}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 border-t border-gray-700/30 pt-2">
                    💡 {q.explanation}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Interview Questions */}
        {lesson.interviewQuestions.length > 0 && (
          <Section title="💼 Interview Questions">
            <div className="space-y-3">
              {lesson.interviewQuestions.map((iq, i) => (
                <div key={i} className="p-4 rounded-xl border border-gray-700/30 bg-gray-800/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold ${interviewColor[iq.level]}`}>{iq.level}</span>
                  </div>
                  <p className="text-sm text-gray-200 mb-2">Q: {iq.question}</p>
                  <p className="text-xs text-gray-400 bg-gray-900/40 p-3 rounded-lg">A: {iq.answerGuide}</p>
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
              <p className="text-xs text-gray-500 font-semibold mb-2">Deliverables:</p>
              <ul className="space-y-1">
                {lesson.portfolioTask.deliverables.map((d, i) => (
                  <li key={i} className="text-xs text-gray-300 flex gap-2">
                    <span className="text-violet-400">•</span>{d}
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        )}

        {/* Navigation */}
        <div className="mt-10 flex justify-between">
          <Link href="/foundation" className="px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 text-sm transition-colors">
            ← Back to Foundation
          </Link>
          <Link href="/advanced" className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-medium transition-colors">
            Advanced Tracks →
          </Link>
        </div>

        {/* Mark Complete */}
        <div className="mt-10 pt-6 border-t border-gray-700/40 flex justify-center">
          <LessonCompleteButton
            lessonId={lesson.slug}
            track="foundation"
            xp={lesson.xp}
          />
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
