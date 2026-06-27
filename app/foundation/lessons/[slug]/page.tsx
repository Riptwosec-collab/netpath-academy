import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allFoundationLessons } from "@/data/foundationCourses";
import type { LessonSection } from "@/types/course";
import LessonCompleteButton from "@/components/lessons/LessonCompleteButton";
import MermaidDiagram from "@/components/lessons/MermaidDiagram";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return allFoundationLessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = allFoundationLessons.find((l) => l.slug === params.slug);
  return { title: lesson ? `${lesson.title} | Foundation` : "Not Found" };
}

const levelColor: Record<string, string> = {
  Beginner:     "text-green-400 bg-green-500/10 border-green-500/20",
  Intermediate: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Advanced:     "text-orange-400 bg-orange-500/10 border-orange-500/20",
  Expert:       "text-red-400 bg-red-500/10 border-red-500/20",
};

const interviewColor: Record<string, string> = {
  Junior: "text-green-400", Mid: "text-yellow-400", Senior: "text-orange-400",
};

function ContentSection({ sec }: { sec: LessonSection }) {
  return (
    <div className="mb-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
      <div className="px-6 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <h3 className="text-base font-bold text-white">{sec.title}</h3>
      </div>
      <div className="px-6 py-5 space-y-4">
        {sec.body && (
          <div className="space-y-2">
            {sec.body.split("\n\n").map((para, i) => (
              <p key={i} className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{para}</p>
            ))}
          </div>
        )}
        {sec.table && (
          <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/[0.05]">
                  {sec.table.header.map((h, i) => (
                    <th key={i} className="text-left px-4 py-2.5 text-white/50 font-semibold uppercase tracking-wide border-b border-white/[0.06]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sec.table.rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                    {row.map((cell, ci) => (
                      <td key={ci} className={`px-4 py-2.5 text-gray-300 ${ci === 0 ? "font-mono font-medium text-cyan-300 whitespace-nowrap" : ""}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {sec.code && (
          <div className="rounded-xl overflow-hidden border border-white/[0.08]">
            <div className="px-4 py-1.5 bg-white/[0.04] border-b border-white/[0.06]">
              <span className="text-xs text-gray-500 font-mono">{sec.language ?? "code"}</span>
            </div>
            <pre className="p-4 overflow-x-auto text-xs leading-relaxed bg-[#0a0f1e]">
              <code className="text-emerald-300 font-mono">{sec.code}</code>
            </pre>
          </div>
        )}
        {sec.tip && (
          <div className="flex gap-3 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.05] px-4 py-3">
            <span className="text-cyan-400 shrink-0">💡</span>
            <p className="text-xs text-cyan-300 leading-relaxed">{sec.tip}</p>
          </div>
        )}
        {sec.warning && (
          <div className="flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/[0.05] px-4 py-3">
            <span className="text-amber-400 shrink-0">⚠️</span>
            <p className="text-xs text-amber-300 leading-relaxed">{sec.warning}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FoundationLessonPage({ params }: Props) {
  const lesson = allFoundationLessons.find((l) => l.slug === params.slug);
  if (!lesson) notFound();

  const idx  = allFoundationLessons.findIndex((l) => l.slug === params.slug);
  const prev = allFoundationLessons[idx - 1];
  const next = allFoundationLessons[idx + 1];

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
                <span className="text-cyan-400 mt-0.5 shrink-0">✓</span>{obj}
              </li>
            ))}
          </ul>
        </Section>

        {/* Prerequisites */}
        {lesson.prerequisites.length > 0 && (
          <Section title="📚 Prerequisites">
            <div className="flex flex-wrap gap-2">
              {lesson.prerequisites.map(p => (
                <Link key={p} href={`/foundation/lessons/${p}`}
                  className="text-xs px-3 py-1 rounded-full border border-violet-500/30 text-violet-400 hover:bg-violet-500/10 transition-colors">
                  {p}
                </Link>
              ))}
            </div>
          </Section>
        )}

        {/* ── Rich Content Sections ─────────────────────────────── */}
        {lesson.sections && lesson.sections.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">📖 เนื้อหา</h2>
            {lesson.sections.map((sec, i) => (
              <ContentSection key={i} sec={sec} />
            ))}
          </div>
        )}

        {/* Architecture */}
        {lesson.architecture && (
          <Section title="🏗️ Architecture">
            <p className="text-sm text-gray-300 leading-relaxed">{lesson.architecture}</p>
          </Section>
        )}

        {/* Diagram */}
        {lesson.mermaidDiagram && (
          <Section title="📊 Diagram">
            <MermaidDiagram chart={lesson.mermaidDiagram} />
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
          <Section title="⌨️ Commands Reference">
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

        {/* Interview Questions */}
        {lesson.interviewQuestions.length > 0 && (
          <Section title="💼 Interview Questions">
            <div className="space-y-3">
              {lesson.interviewQuestions.map((iq, i) => (
                <div key={i} className="p-4 rounded-xl border border-gray-700/30 bg-gray-800/20">
                  <span className={`text-xs font-bold ${interviewColor[iq.level] ?? "text-gray-400"}`}>{iq.level}</span>
                  <p className="text-sm text-gray-200 mt-1 mb-2">Q: {iq.question}</p>
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
              <ul className="space-y-1">
                {lesson.portfolioTask.deliverables.map((d, i) => (
                  <li key={i} className="text-xs text-gray-300 flex gap-2"><span className="text-violet-400">•</span>{d}</li>
                ))}
              </ul>
            </div>
          </Section>
        )}

        {/* Lab & Quiz Navigation */}
        <div className="mb-8 grid sm:grid-cols-2 gap-4">
          {lesson.labs.length > 0 && (
            <Link href={`/foundation/lessons/${lesson.slug}/lab`}
              className="group flex items-center gap-4 p-5 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.04] hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all">
              <span className="text-3xl">🔬</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-emerald-300 group-hover:text-emerald-200 transition-colors">Hands-on Lab</p>
                <p className="text-xs text-gray-500 mt-0.5">{lesson.labs.length} lab · ฝึกจากของจริง</p>
              </div>
              <span className="text-emerald-500/50 group-hover:text-emerald-400 transition-colors text-lg">→</span>
            </Link>
          )}
          {lesson.quiz.length > 0 && (
            <Link href={`/foundation/lessons/${lesson.slug}/quiz`}
              className="group flex items-center gap-4 p-5 rounded-2xl border border-cyan-500/25 bg-cyan-500/[0.04] hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all">
              <span className="text-3xl">📝</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors">ทำ Quiz</p>
                <p className="text-xs text-gray-500 mt-0.5">{lesson.quiz.length} ข้อ · เฉลยหลังทำเสร็จ</p>
              </div>
              <span className="text-cyan-500/50 group-hover:text-cyan-400 transition-colors text-lg">→</span>
            </Link>
          )}
        </div>

        {/* Mark Complete */}
        <div className="mt-10 pt-6 border-t border-gray-700/40 flex justify-center">
          <LessonCompleteButton lessonId={lesson.slug} track="foundation" xp={lesson.xp} />
        </div>

        {/* Prev / Next */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          {prev ? (
            <Link href={`/foundation/lessons/${prev.slug}`}
              className="flex flex-col gap-1 rounded-xl border border-white/[0.07] hover:border-cyan-500/20 bg-white/[0.02] hover:bg-white/[0.04] p-4 transition-all">
              <span className="text-[10px] text-gray-600 uppercase tracking-wider">← Previous</span>
              <span className="text-sm text-white font-medium line-clamp-1">{prev.title}</span>
            </Link>
          ) : (
            <Link href="/foundation"
              className="flex flex-col gap-1 rounded-xl border border-white/[0.07] hover:border-cyan-500/20 bg-white/[0.02] hover:bg-white/[0.04] p-4 transition-all">
              <span className="text-[10px] text-gray-600 uppercase tracking-wider">← Foundation</span>
              <span className="text-sm text-gray-400 font-medium">Back to track</span>
            </Link>
          )}
          {next ? (
            <Link href={`/foundation/lessons/${next.slug}`}
              className="lex flex-col gap-1 rounded-xl border border-white/[0.07] hover:border-cyan-500/20 bg-white/[0.02] hover:bg-white/[0.04] p-4 transition-all text-right">
              <span className="text-[10px] text-gray-600 uppercase tracking-wider">Next →</span>
              <span className="text-sm text-white font-medium line-clamp-1">{next.title}</span>
            </Link>
          ) : (
            <Link href="/advanced"
              className="flex flex-col gap-1 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 transition-all text-right">
              <span className="text-[10px] text-cyan-600 uppercase tracking-wider">Foundation Complete!</span>
              <span className="text-sm text-cyan-300 font-medium">Advanced Tracks →</span>
            </Link>
          )}
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
