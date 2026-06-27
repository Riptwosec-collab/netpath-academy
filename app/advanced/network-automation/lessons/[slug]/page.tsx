import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { automationLessons } from "@/data/automationCourses";
import LessonCompleteButton from "@/components/lessons/LessonCompleteButton";
import MermaidDiagram from "@/components/lessons/MermaidDiagram";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return automationLessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = automationLessons.find((l) => l.slug === params.slug);
  return { title: lesson ? `${lesson.title} | Network Automation` : "Not Found" };
}

const levelColor: Record<string, string> = {
  Beginner:     "text-green-400 bg-green-500/10 border-green-500/20",
  Intermediate: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Advanced:     "text-orange-400 bg-orange-500/10 border-orange-500/20",
  Expert:       "text-red-400 bg-red-500/10 border-red-500/20",
};

const interviewColor: Record<string, string> = {
  Junior: "text-green-400",
  Mid:    "text-yellow-400",
  Senior: "text-orange-400",
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function AutomationLessonPage({ params }: Props) {
  const lesson = automationLessons.find((l) => l.slug === params.slug) as any;
  if (!lesson) notFound();

  const idx  = automationLessons.findIndex((l) => l.slug === params.slug);
  const prev = automationLessons[idx - 1];
  const next = automationLessons[idx + 1];

  return (
    <div className="min-h-screen bg-[#050816] text-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
          <Link href="/advanced" className="hover:text-emerald-400 transition-colors">Advanced</Link>
          <span>/</span>
          <Link href="/advanced/network-automation" className="hover:text-emerald-400 transition-colors">Network Automation</Link>
          <span>/</span>
          <span className="text-gray-300">{lesson.title}</span>
        </div>

        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-700/50">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`text-xs px-2 py-0.5 rounded border ${levelColor[lesson.level]}`}>{lesson.level}</span>
            <span className="text-xs px-2 py-0.5 rounded text-gray-400 bg-gray-800/60">{lesson.duration}</span>
            <span className="text-xs px-2 py-0.5 rounded text-yellow-400 bg-yellow-500/10">+{lesson.xp} XP</span>
            {lesson.tags.map((tag: string) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded bg-gray-800/60 text-gray-500">{tag}</span>
            ))}
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{lesson.title}</h1>
          <p className="text-gray-400">{lesson.description}</p>
        </div>

        {/* Objectives */}
        <Section title="🎯 Learning Objectives">
          <ul className="space-y-2">
            {lesson.objectives.map((obj: string, i: number) => (
              <li key={i} className="flex gap-2 text-sm text-gray-300">
                <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                {obj}
              </li>
            ))}
          </ul>
        </Section>

        {/* Prerequisites */}
        {lesson.prerequisites.length > 0 && (
          <Section title="📚 Prerequisites">
            <div className="flex flex-wrap gap-2">
              {lesson.prerequisites.map((p: string) => (
                <Link
                  key={p}
                  href={`/advanced/network-automation/lessons/${p}`}
                  className="text-xs px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                >
                  {p}
                </Link>
              ))}
            </div>
          </Section>
        )}

        {/* Rich sections */}
        {lesson.sections && lesson.sections.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">📖 เนื้อหา</h2>
            {lesson.sections.map((sec: any, i: number) => (
              <div key={i} className="mb-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
                <div className="px-6 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                  <h3 className="text-base font-bold text-white">{sec.title}</h3>
                </div>
                <div className="px-6 py-5 space-y-4">
                  {sec.body && (
                    <div className="space-y-2">
                      {sec.body.split("\n\n").map((para: string, pi: number) => (
                        <p key={pi} className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{para}</p>
                      ))}
                    </div>
                  )}
                  {sec.table && (
                    <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
                      <table className="w-full text-xs">
                        <thead><tr className="bg-white/[0.05]">
                          {sec.table.header.map((h: string, hi: number) => (
                            <th key={hi} className="text-left px-4 py-2.5 text-white/50 font-semibold uppercase tracking-wide border-b border-white/[0.06]">{h}</th>
                          ))}
                        </tr></thead>
                        <tbody>
                          {sec.table.rows.map((row: string[], ri: number) => (
                            <tr key={ri} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                              {row.map((cell: string, ci: number) => (
                                <td key={ci} className={`px-4 py-2.5 text-gray-300 ${ci === 0 ? "font-mono font-medium text-emerald-300 whitespace-nowrap" : ""}`}>{cell}</td>
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
                    <div className="flex gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] px-4 py-3">
                      <span className="text-emerald-400 shrink-0">💡</span>
                      <p className="text-xs text-emerald-300 leading-relaxed">{sec.tip}</p>
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
            ))}
          </div>
        )}

        {/* Mermaid diagram */}
        {lesson.mermaidDiagram && (
          <Section title="📊 Diagram">
            <MermaidDiagram chart={lesson.mermaidDiagram} />
          </Section>
        )}

        {/* Legacy content fallback */}
        {(!lesson.sections || lesson.sections.length === 0) && Array.isArray(lesson.content) && lesson.content.length > 0 && (
          <Section title="📖 Content">
            <div className="space-y-6">
              {lesson.content.map((section: any, i: number) => (
                <div key={i}>
                  {section.title && <h3 className="text-sm font-semibold text-white mb-2">{section.title}</h3>}
                  {section.type === "code" ? (
                    <pre className="bg-gray-900/80 border border-gray-700/50 rounded-lg p-4 text-xs text-green-300 overflow-x-auto leading-relaxed"><code>{section.body}</code></pre>
                  ) : (
                    <p className="text-sm text-gray-400 leading-relaxed">{section.body}</p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Commands */}
        {Array.isArray(lesson.commands) && lesson.commands.length > 0 && (
          <Section title="⚡ Key Commands">
            <div className="space-y-2">
              {lesson.commands.map((cmd: any, i: number) => {
                const c = typeof cmd === "string" ? { command: cmd, description: "" } : cmd;
                return (
                  <div key={i} className="rounded-lg bg-gray-900/80 border border-gray-700/50 p-3">
                    <code className="text-xs text-emerald-300 block">{c.command}</code>
                    {c.description && <p className="text-xs text-gray-500 mt-1">{c.description}</p>}
                  </div>
                );
              })}
            </div>
          </Section>
        )}

        {/* Lab & Quiz Nav */}
        <div className="mb-8 grid sm:grid-cols-2 gap-4">
          {lesson.lab && (
            <Link href={`/advanced/network-automation/lessons/${lesson.slug}/lab`}
              className="group flex items-center gap-4 p-5 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.04] hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all">
              <span className="text-3xl">🔬</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-emerald-300 group-hover:text-emerald-200 transition-colors">Hands-on Lab</p>
                <p className="text-xs text-gray-500 mt-0.5">{lesson.lab.duration ?? ""} · ฝึกจากของจริง</p>
              </div>
              <span className="text-emerald-500/50 group-hover:text-emerald-400 transition-colors text-lg">→</span>
            </Link>
          )}
          {lesson.quiz && lesson.quiz.length > 0 && (
            <Link href={`/advanced/network-automation/lessons/${lesson.slug}/quiz`}
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

        {/* Interview Questions */}
        {lesson.interviewQuestions && lesson.interviewQuestions.length > 0 && (
          <Section title="💼 Interview Q&A">
            <div className="space-y-4">
              {lesson.interviewQuestions.map((q: any, i: number) => (
                <div key={i} className="rounded-lg border border-gray-700/50 bg-gray-900/40 p-4">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${interviewColor[q.level] ?? "text-gray-400"}`}>{q.level}</span>
                  <p className="text-sm text-white mb-2 font-medium mt-2">{q.question}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{q.answerGuide ?? q.answer}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Troubleshooting Tips */}
        {lesson.troubleshootingTips && lesson.troubleshootingTips.length > 0 && (
          <Section title="🔧 Troubleshooting Tips">
            <div className="space-y-2">
              {lesson.troubleshootingTips.map((tip: any, i: number) => (
                <div key={i} className="rounded-lg border border-red-500/15 bg-red-500/5 p-3">
                  <p className="text-xs font-semibold text-red-300 mb-1">Issue: {tip.issue}</p>
                  <p className="text-xs text-gray-400">{tip.solution}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Mark complete */}
        <div className="mt-10 pt-6 border-t border-gray-700/40 flex justify-center">
          <LessonCompleteButton lessonId={lesson.slug} track="network-automation" xp={lesson.xp} />
        </div>

        {/* Prev / Next */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          {prev ? (
            <Link href={`/advanced/network-automation/lessons/${prev.slug}`}
              className="flex flex-col gap-1 rounded-xl border border-white/[0.07] hover:border-emerald-500/20 bg-white/[0.02] hover:bg-white/[0.04] p-4 transition-all">
              <span className="text-[10px] text-gray-600 uppercase tracking-wider">← Previous</span>
              <span className="text-sm text-white font-medium line-clamp-1">{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/advanced/network-automation/lessons/${next.slug}`}
              className="flex flex-col gap-1 rounded-xl border border-white/[0.07] hover:border-emerald-500/20 bg-white/[0.02] hover:bg-white/[0.04] p-4 transition-all text-right">
              <span className="text-[10px] text-gray-600 uppercase tracking-wider">Next →</span>
              <span className="text-sm text-white font-medium line-clamp-1">{next.title}</span>
            </Link>
          ) : (
            <Link href="/advanced/network-automation"
              className="flex flex-col gap-1 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 transition-all text-right">
              <span className="text-[10px] text-emerald-600 uppercase tracking-wider">Track Complete!</span>
              <span className="text-sm text-emerald-300 font-medium">Back to Track →</span>
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
