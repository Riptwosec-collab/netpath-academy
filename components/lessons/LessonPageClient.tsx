"use client";
import Link from "next/link";
import { Home } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LessonCompleteButton from "@/components/lessons/LessonCompleteButton";
import MermaidDiagram from "@/components/lessons/MermaidDiagram";

// ─── Types ────────────────────────────────────────────────────────
type Track = "foundation" | "advanced" | "hardware" | "automation";

interface LessonData {
  id?: string;
  slug: string;
  title: string;
  titleTh?: string;
  description: string;
  level: string;
  duration: string;
  xp: number;
  tags?: string[];
  objectives?: string[];
  prerequisites?: string[];
  // rich sections
  sections?: Array<{
    title: string;
    body?: string;
    code?: string;
    language?: string;
    table?: { header: string[]; rows: string[][] };
    tip?: string;
    warning?: string;
  }>;
  mermaidDiagram?: string;
  architecture?: string;
  trafficFlow?: string[];
  commands?: Array<{ command: string; description?: string }>;
  yamlExamples?: Array<{ title: string; code: string; description: string }>;
  troubleshooting?: Array<{ symptom: string; possibleCause: string; check: string; fix: string }>;
  troubleshootingTips?: Array<{ issue: string; solution: string }>;
  interviewQuestions?: Array<{ level: string; question: string; answerGuide?: string; answer?: string }>;
  portfolioTask?: { title: string; description: string; deliverables: string[] };
  labs?: Array<unknown>;
  quiz?: Array<unknown>;
  lab?: { duration?: string };
  content?: Array<{ type?: string; title?: string; body: string }>;
  // hardware specific
  deviceRole?: string;
  osiLayer?: string[];
  commonPorts?: string[];
  commonSpeeds?: string[];
  useCases?: string[];
  components?: Array<{ name: string; description: string }>;
  howItWorks?: string[];
  selectionGuide?: string[];
  installationGuide?: string[];
  configurationConcept?: string[];
  checklist?: string[];
  category?: string;
}

interface NavLesson { slug: string; title: string; }

interface Props {
  lesson: LessonData;
  prev: NavLesson | null;
  next: NavLesson | null;
  track: Track;
}

// ─── Track config ─────────────────────────────────────────────────
const TRACK = {
  foundation: {
    basePath:     "/foundation/lessons",
    trackPath:    "/foundation",
    breadcrumbs:  [{ href: "/foundation", label: "foundation.home" }],
    accent:       "cyan",
    completeTrack:"/advanced",
    completeKey:  "lesson.foundationDone",
    completeNext: "lesson.advancedTracks",
    prevKey:      "lesson.backToFoundation",
    trackKey:     "foundation.home",
    completeBtnTrack: "foundation",
  },
  advanced: {
    basePath:     "/advanced/lessons",
    trackPath:    "/advanced",
    breadcrumbs:  [{ href: "/advanced", label: "advanced.home" }],
    accent:       "violet",
    completeTrack:"/advanced",
    completeKey:  "lesson.trackDone",
    completeNext: "lesson.backToTrack",
    prevKey:      "lesson.backToAdvanced",
    trackKey:     "advanced.home",
    completeBtnTrack: "advanced",
  },
  hardware: {
    basePath:     "/hardware/lessons",
    trackPath:    "/hardware",
    breadcrumbs:  [{ href: "/hardware", label: "hardware.home" }],
    accent:       "amber",
    completeTrack:"/advanced",
    completeKey:  "lesson.trackDone",
    completeNext: "lesson.advancedTracks",
    prevKey:      "lesson.backToHardware",
    trackKey:     "hardware.home",
    completeBtnTrack: "hardware",
  },
  automation: {
    basePath:     "/advanced/network-automation/lessons",
    trackPath:    "/advanced/network-automation",
    breadcrumbs:  [
      { href: "/advanced", label: "advanced.home" },
      { href: "/advanced/network-automation", label: "automation.home" },
    ],
    accent:       "emerald",
    completeTrack:"/advanced/network-automation",
    completeKey:  "lesson.trackDone",
    completeNext: "lesson.backToTrack",
    prevKey:      "lesson.backToAutomation",
    trackKey:     "automation.home",
    completeBtnTrack: "network-automation",
  },
} as const;

const LEVEL_COLOR: Record<string, string> = {
  Beginner:     "text-green-400 bg-green-500/10 border-green-500/20",
  Intermediate: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Advanced:     "text-orange-400 bg-orange-500/10 border-orange-500/20",
  Expert:       "text-red-400 bg-red-500/10 border-red-500/20",
};

const INTERVIEW_COLOR: Record<string, string> = {
  Junior: "text-green-400",
  Mid:    "text-yellow-400",
  Senior: "text-orange-400",
};

// ─── Sub-components ───────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
      {children}
    </div>
  );
}

function ContentSection({
  sec,
  accent,
}: {
  sec: NonNullable<LessonData["sections"]>[number];
  accent: string;
}) {
  const codeColor = accent === "amber" ? "text-amber-300"
    : accent === "violet" ? "text-violet-300"
    : accent === "emerald" ? "text-emerald-300"
    : "text-cyan-300";
  const tipBorder = accent === "amber" ? "border-amber-500/20 bg-amber-500/[0.05]"
    : accent === "violet" ? "border-violet-500/20 bg-violet-500/[0.05]"
    : accent === "emerald" ? "border-emerald-500/20 bg-emerald-500/[0.05]"
    : "border-cyan-500/20 bg-cyan-500/[0.05]";
  const tipText = accent === "amber" ? "text-amber-300"
    : accent === "violet" ? "text-violet-300"
    : accent === "emerald" ? "text-emerald-300"
    : "text-cyan-300";
  const tipIcon = accent === "amber" ? "text-amber-400"
    : accent === "violet" ? "text-violet-400"
    : accent === "emerald" ? "text-emerald-400"
    : "text-cyan-400";

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
                      <td key={ci} className={`px-4 py-2.5 text-gray-300 ${ci === 0 ? `font-mono font-medium ${codeColor} whitespace-nowrap` : ""}`}>{cell}</td>
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
          <div className={`flex gap-3 rounded-xl border ${tipBorder} px-4 py-3`}>
            <span className={`${tipIcon} shrink-0`}>💡</span>
            <p className={`text-xs ${tipText} leading-relaxed`}>{sec.tip}</p>
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

// ─── Main component ───────────────────────────────────────────────
export default function LessonPageClient({ lesson, prev, next, track }: Props) {
  const { t, lang } = useLanguage();
  const cfg = TRACK[track];
  const accent = cfg.accent;

  // Accent-aware class helpers
  const accentHover = accent === "amber"   ? "hover:text-amber-400"
    : accent === "violet"  ? "hover:text-violet-400"
    : accent === "emerald" ? "hover:text-emerald-400"
    : "hover:text-cyan-400";

  const prevNextHover = accent === "amber"   ? "hover:border-amber-500/20"
    : accent === "violet"  ? "hover:border-violet-500/20"
    : accent === "emerald" ? "hover:border-emerald-500/20"
    : "hover:border-cyan-500/20";

  const labBorder = accent === "amber"   ? "border-amber-500/25 bg-amber-500/[0.04] hover:bg-amber-500/10 hover:border-amber-500/40"
    : accent === "violet"  ? "border-violet-500/25 bg-violet-500/[0.04] hover:bg-violet-500/10 hover:border-violet-500/40"
    : accent === "emerald" ? "border-emerald-500/25 bg-emerald-500/[0.04] hover:bg-emerald-500/10 hover:border-emerald-500/40"
    : "border-cyan-500/25 bg-cyan-500/[0.04] hover:bg-cyan-500/10 hover:border-cyan-500/40";

  const labText = accent === "amber"   ? "text-amber-300 group-hover:text-amber-200"
    : accent === "violet"  ? "text-violet-300 group-hover:text-violet-200"
    : accent === "emerald" ? "text-emerald-300 group-hover:text-emerald-200"
    : "text-cyan-300 group-hover:text-cyan-200";

  const labArrow = accent === "amber"   ? "text-amber-500/50 group-hover:text-amber-400"
    : accent === "violet"  ? "text-violet-500/50 group-hover:text-violet-400"
    : accent === "emerald" ? "text-emerald-500/50 group-hover:text-emerald-400"
    : "text-cyan-500/50 group-hover:text-cyan-400";

  const completeBorder = accent === "amber"   ? "border-amber-500/20 bg-amber-500/5"
    : accent === "violet"  ? "border-violet-500/20 bg-violet-500/5"
    : accent === "emerald" ? "border-emerald-500/20 bg-emerald-500/5"
    : "border-cyan-500/20 bg-cyan-500/5";

  const completeText = accent === "amber"   ? "text-amber-600"
    : accent === "violet"  ? "text-violet-600"
    : accent === "emerald" ? "text-emerald-600"
    : "text-cyan-600";

  const completeTitle = accent === "amber"   ? "text-amber-300"
    : accent === "violet"  ? "text-violet-300"
    : accent === "emerald" ? "text-emerald-300"
    : "text-cyan-300";

  const hasLabs = Array.isArray(lesson.labs) && lesson.labs.length > 0;
  const hasQuiz = Array.isArray(lesson.quiz) && lesson.quiz.length > 0;
  const hasLab  = !!lesson.lab;

  return (
    <div className="min-h-screen bg-[#050816] text-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Top nav bar: Home button + Breadcrumb */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/40 hover:text-white hover:border-white/20 hover:bg-white/[0.07] transition-all text-xs font-medium flex-shrink-0"
          >
            <Home size={13} />
            <span>{t("nav.dashboard")}</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            {cfg.breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <Link href={crumb.href} className={`${accentHover} transition-colors`}>{t(crumb.label)}</Link>
                <span>/</span>
              </span>
            ))}
            {track === "hardware" && lesson.category && (
              <span className="flex items-center gap-2">
                <Link href={`/hardware/${lesson.category}`} className={`${accentHover} capitalize transition-colors`}>{lesson.category}</Link>
                <span>/</span>
              </span>
            )}
            <span className="text-gray-300">{lang === "th" && lesson.titleTh ? lesson.titleTh : lesson.title}</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-700/50">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`text-xs px-2 py-0.5 rounded border ${LEVEL_COLOR[lesson.level] ?? "text-gray-400 bg-gray-800/60"}`}>
              {t(`level.${lesson.level.toLowerCase()}`) || lesson.level}
            </span>
            <span className="text-xs px-2 py-0.5 rounded text-gray-400 bg-gray-800/60">{lesson.duration}</span>
            <span className="text-xs px-2 py-0.5 rounded text-yellow-400 bg-yellow-500/10">+{lesson.xp} XP</span>
            {lesson.tags?.map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded bg-gray-800/60 text-gray-500">{tag}</span>
            ))}
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {lang === "th" && lesson.titleTh ? lesson.titleTh : lesson.title}
          </h1>
          <p className="text-gray-400">{lesson.description}</p>
        </div>

        {/* Learning Objectives */}
        {lesson.objectives && lesson.objectives.length > 0 && (
          <Section title={`🎯 ${t("lesson.objectives")}`}>
            <ul className="space-y-2">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-300">
                  <span className={`mt-0.5 shrink-0 ${accent === "amber" ? "text-amber-400" : accent === "violet" ? "text-violet-400" : accent === "emerald" ? "text-emerald-400" : "text-cyan-400"}`}>✓</span>
                  {obj}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Prerequisites */}
        {lesson.prerequisites && lesson.prerequisites.length > 0 && (
          <Section title={`📚 ${t("lesson.prerequisites")}`}>
            <div className="flex flex-wrap gap-2">
              {lesson.prerequisites.map(p => (
                <Link key={p} href={`${cfg.basePath}/${p}`}
                  className={`text-xs px-3 py-1 rounded-full border ${
                    accent === "amber"   ? "border-amber-500/30 text-amber-400 hover:bg-amber-500/10" :
                    accent === "violet"  ? "border-violet-500/30 text-violet-400 hover:bg-violet-500/10" :
                    accent === "emerald" ? "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10" :
                                          "border-violet-500/30 text-violet-400 hover:bg-violet-500/10"
                  } transition-colors`}>
                  {p}
                </Link>
              ))}
            </div>
          </Section>
        )}

        {/* Rich Content Sections */}
        {lesson.sections && lesson.sections.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">📖 {t("lesson.content")}</h2>
            {lesson.sections.map((sec, i) => (
              <ContentSection key={i} sec={sec} accent={accent} />
            ))}
          </div>
        )}

        {/* Architecture */}
        {lesson.architecture && (
          <Section title={`🏗️ ${t("lesson.architecture")}`}>
            <p className="text-sm text-gray-300 leading-relaxed">{lesson.architecture}</p>
          </Section>
        )}

        {/* Diagram */}
        {lesson.mermaidDiagram && (
          <Section title={`📊 ${t("lesson.diagram")}`}>
            <MermaidDiagram chart={lesson.mermaidDiagram} />
          </Section>
        )}

        {/* Traffic Flow */}
        {lesson.trafficFlow && lesson.trafficFlow.length > 0 && (
          <Section title={`🔄 ${t("lesson.trafficFlow")}`}>
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
          <Section title={`⌨️ ${t("lesson.commands")}`}>
            <div className="space-y-2">
              {lesson.commands.map((cmd, i) => {
                const c = typeof cmd === "string" ? { command: cmd, description: "" } : cmd;
                return (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 p-3 rounded-lg bg-gray-900/60 border border-gray-700/30">
                    <code className="text-xs text-cyan-300 font-mono whitespace-pre bg-black/30 px-2 py-1 rounded shrink-0">{c.command}</code>
                    {c.description && <span className="text-xs text-gray-500">{c.description}</span>}
                  </div>
                );
              })}
            </div>
          </Section>
        )}

        {/* Config Examples */}
        {lesson.yamlExamples && lesson.yamlExamples.length > 0 && (
          <Section title={`📄 ${t("lesson.configExamples")}`}>
            {lesson.yamlExamples.map((ex, i) => (
              <div key={i} className="mb-4">
                <p className="text-sm font-medium text-gray-300 mb-1">{ex.title}</p>
                <pre className="text-xs text-green-300 font-mono bg-gray-900/60 border border-gray-700/30 rounded-lg p-4 overflow-x-auto">{ex.code}</pre>
                <p className="text-xs text-gray-500 mt-1">{ex.description}</p>
              </div>
            ))}
          </Section>
        )}

        {/* Hardware-specific: Device Overview */}
        {track === "hardware" && lesson.deviceRole && (
          <Section title={`🖥️ ${t("lesson.deviceOverview")}`}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/40">
                <p className="text-xs text-gray-500 mb-1">{t("lesson.deviceRole")}</p>
                <p className="text-sm text-gray-200">{lesson.deviceRole}</p>
              </div>
              {lesson.osiLayer && lesson.osiLayer.length > 0 && (
                <div className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/40">
                  <p className="text-xs text-gray-500 mb-2">{t("lesson.osiLayer")}</p>
                  <div className="flex flex-wrap gap-1">
                    {lesson.osiLayer.map(l => (
                      <span key={l} className="text-xs px-2 py-0.5 rounded bg-violet-500/10 text-violet-400">{l}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {(lesson.commonPorts?.length || lesson.commonSpeeds?.length) ? (
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                {lesson.commonPorts && lesson.commonPorts.length > 0 && (
                  <div className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/40">
                    <p className="text-xs text-gray-500 mb-2">{t("lesson.commonPorts")}</p>
                    <div className="flex flex-wrap gap-1">
                      {lesson.commonPorts.map(p => (
                        <span key={p} className="text-xs px-2 py-0.5 rounded bg-gray-700/60 text-gray-300">{p}</span>
                      ))}
                    </div>
                  </div>
                )}
                {lesson.commonSpeeds && lesson.commonSpeeds.length > 0 && (
                  <div className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/40">
                    <p className="text-xs text-gray-500 mb-2">{t("lesson.commonSpeeds")}</p>
                    <div className="flex flex-wrap gap-1">
                      {lesson.commonSpeeds.map(s => (
                        <span key={s} className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </Section>
        )}

        {/* Hardware-specific: Components */}
        {track === "hardware" && lesson.components && lesson.components.length > 0 && (
          <Section title={`🔩 ${t("lesson.components")}`}>
            <div className="grid gap-3">
              {lesson.components.map((comp, i) => (
                <div key={i} className="p-3 rounded-lg bg-gray-800/30 border border-gray-700/30">
                  <p className="text-sm font-medium text-gray-200 mb-0.5">{comp.name}</p>
                  <p className="text-xs text-gray-500">{comp.description}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Hardware-specific: How it Works */}
        {track === "hardware" && lesson.howItWorks && lesson.howItWorks.length > 0 && (
          <Section title={`⚙️ ${t("lesson.howItWorks")}`}>
            <ol className="space-y-2">
              {lesson.howItWorks.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-300">
                  <span className="w-5 h-5 shrink-0 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-bold">{i+1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </Section>
        )}

        {/* Hardware-specific: Selection Guide */}
        {track === "hardware" && lesson.selectionGuide && lesson.selectionGuide.length > 0 && (
          <Section title={`📋 ${t("lesson.selectionGuide")}`}>
            <ul className="space-y-2">
              {lesson.selectionGuide.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-300">
                  <span className="text-amber-400 mt-0.5 shrink-0">→</span>{item}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Hardware-specific: Installation Guide */}
        {track === "hardware" && lesson.installationGuide && lesson.installationGuide.length > 0 && (
          <Section title={`🛠️ ${t("lesson.installGuide")}`}>
            <ol className="space-y-2">
              {lesson.installationGuide.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-300">
                  <span className="text-amber-400 shrink-0 font-bold">{i+1}.</span>{step}
                </li>
              ))}
            </ol>
          </Section>
        )}

        {/* Automation: Legacy content fallback */}
        {track === "automation" && (!lesson.sections || lesson.sections.length === 0) && Array.isArray(lesson.content) && lesson.content.length > 0 && (
          <Section title={`📖 ${t("lesson.content")}`}>
            <div className="space-y-6">
              {lesson.content.map((section, i) => (
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

        {/* Lab & Quiz Navigation */}
        <div className="mb-8 grid sm:grid-cols-2 gap-4">
          {/* labs array (foundation, advanced, hardware) */}
          {hasLabs && (
            <Link href={`${cfg.basePath}/${lesson.slug}/lab`}
              className={`group flex items-center gap-4 p-5 rounded-2xl border ${labBorder} transition-all`}>
              <span className="text-3xl">🔬</span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold ${labText} transition-colors`}>{t("lesson.lab")}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {(lesson.labs as Array<unknown>).length} {t("lesson.labCount")} · {t("lesson.practiceReal")}
                </p>
              </div>
              <span className={`${labArrow} transition-colors text-lg`}>→</span>
            </Link>
          )}
          {/* lab object (automation) */}
          {hasLab && !hasLabs && (
            <Link href={`${cfg.basePath}/${lesson.slug}/lab`}
              className={`group flex items-center gap-4 p-5 rounded-2xl border ${labBorder} transition-all`}>
              <span className="text-3xl">🔬</span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold ${labText} transition-colors`}>{t("lesson.lab")}</p>
                <p className="text-xs text-gray-500 mt-0.5">{lesson.lab?.duration ?? ""} · {t("lesson.practiceReal")}</p>
              </div>
              <span className={`${labArrow} transition-colors text-lg`}>→</span>
            </Link>
          )}
          {hasQuiz && (
            <Link href={`${cfg.basePath}/${lesson.slug}/quiz`}
              className="group flex items-center gap-4 p-5 rounded-2xl border border-cyan-500/25 bg-cyan-500/[0.04] hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all">
              <span className="text-3xl">📝</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors">{t("lesson.quiz")}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {(lesson.quiz as Array<unknown>).length} {t("lesson.questionCount")} · {t("lesson.revealAfter")}
                </p>
              </div>
              <span className="text-cyan-500/50 group-hover:text-cyan-400 transition-colors text-lg">→</span>
            </Link>
          )}
        </div>

        {/* Checklist (hardware) */}
        {track === "hardware" && lesson.checklist && lesson.checklist.length > 0 && (
          <Section title={`✅ ${t("lesson.checklist")}`}>
            <div className="grid gap-2">
              {lesson.checklist.map((item, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                  <span className="w-4 h-4 border border-amber-500/30 rounded bg-amber-500/5 group-hover:bg-amber-500/10 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{item}</span>
                </label>
              ))}
            </div>
          </Section>
        )}

        {/* Troubleshooting (object with symptom/possibleCause/check/fix) */}
        {lesson.troubleshooting && lesson.troubleshooting.length > 0 && (
          <Section title={`🔧 ${t("lesson.troubleshooting")}`}>
            <div className="space-y-3">
              {lesson.troubleshooting.map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                  <p className="text-sm font-medium text-red-400 mb-2">⚠️ {item.symptom}</p>
                  <div className="grid sm:grid-cols-3 gap-3 text-xs">
                    <div><p className="text-gray-500 mb-1">{t("lesson.possibleCause")}</p><p className="text-gray-300">{item.possibleCause}</p></div>
                    <div><p className="text-gray-500 mb-1">{t("lesson.check")}</p><p className="text-gray-300 font-mono">{item.check}</p></div>
                    <div><p className="text-gray-500 mb-1">{t("lesson.fix")}</p><p className="text-gray-300">{item.fix}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Troubleshooting Tips (automation: issue/solution) */}
        {lesson.troubleshootingTips && lesson.troubleshootingTips.length > 0 && (
          <Section title={`🔧 ${t("lesson.troubleshooting")}`}>
            <div className="space-y-2">
              {lesson.troubleshootingTips.map((tip, i) => (
                <div key={i} className="rounded-lg border border-red-500/15 bg-red-500/5 p-3">
                  <p className="text-xs font-semibold text-red-300 mb-1">{t("lesson.issue")}: {tip.issue}</p>
                  <p className="text-xs text-gray-400">{tip.solution}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Interview Questions */}
        {lesson.interviewQuestions && lesson.interviewQuestions.length > 0 && (
          <Section title={`💼 ${t("lesson.interview")}`}>
            <div className="space-y-3">
              {lesson.interviewQuestions.map((iq, i) => (
                <div key={i} className="p-4 rounded-xl border border-gray-700/30 bg-gray-800/20">
                  <span className={`text-xs font-bold ${INTERVIEW_COLOR[iq.level] ?? "text-gray-400"}`}>{iq.level}</span>
                  <p className="text-sm text-gray-200 mt-1 mb-2">Q: {iq.question}</p>
                  <p className="text-xs text-gray-400 bg-gray-900/40 p-3 rounded-lg">A: {iq.answerGuide ?? iq.answer}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Portfolio Task */}
        {lesson.portfolioTask && (
          <Section title={`🎯 ${t("lesson.portfolio")}`}>
            <div className="p-5 rounded-xl border border-violet-500/30 bg-violet-500/5">
              <h3 className="text-base font-semibold text-violet-400 mb-2">{lesson.portfolioTask.title}</h3>
              <p className="text-sm text-gray-300 mb-3">{lesson.portfolioTask.description}</p>
              <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">{t("lesson.deliverables")}</p>
              <ul className="space-y-1">
                {lesson.portfolioTask.deliverables.map((d, i) => (
                  <li key={i} className="text-xs text-gray-300 flex gap-2"><span className="text-violet-400">•</span>{d}</li>
                ))}
              </ul>
            </div>
          </Section>
        )}

        {/* Mark Complete */}
        <div className="mt-10 pt-6 border-t border-gray-700/40 flex justify-center">
          <LessonCompleteButton lessonId={lesson.slug} track={cfg.completeBtnTrack} xp={lesson.xp} />
        </div>

        {/* Prev / Next */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          {prev ? (
            <Link href={`${cfg.basePath}/${prev.slug}`}
              className={`flex flex-col gap-1 rounded-xl border border-white/[0.07] ${prevNextHover} bg-white/[0.02] hover:bg-white/[0.04] p-4 transition-all`}>
              <span className="text-[10px] text-gray-600 uppercase tracking-wider">{t("lesson.prevLesson")}</span>
              <span className="text-sm text-white font-medium line-clamp-1">{prev.title}</span>
            </Link>
          ) : (
            <Link href={cfg.trackPath}
              className={`flex flex-col gap-1 rounded-xl border border-white/[0.07] ${prevNextHover} bg-white/[0.02] hover:bg-white/[0.04] p-4 transition-all`}>
              <span className="text-[10px] text-gray-600 uppercase tracking-wider">{t(cfg.prevKey)}</span>
              <span className="text-sm text-gray-400 font-medium">{t("lesson.backToTrack")}</span>
            </Link>
          )}
          {next ? (
            <Link href={`${cfg.basePath}/${next.slug}`}
              className={`flex flex-col gap-1 rounded-xl border border-white/[0.07] ${prevNextHover} bg-white/[0.02] hover:bg-white/[0.04] p-4 transition-all text-right`}>
              <span className="text-[10px] text-gray-600 uppercase tracking-wider">{t("lesson.nextLesson")}</span>
              <span className="text-sm text-white font-medium line-clamp-1">{next.title}</span>
            </Link>
          ) : (
            <Link href={cfg.completeTrack}
              className={`flex flex-col gap-1 rounded-xl border ${completeBorder} p-4 transition-all text-right`}>
              <span className={`text-[10px] ${completeText} uppercase tracking-wider`}>{t(cfg.completeKey)}</span>
              <span className={`text-sm ${completeTitle} font-medium`}>{t(cfg.completeNext)}</span>
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
