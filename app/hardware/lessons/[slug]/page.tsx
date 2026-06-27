import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allHardwareLessons } from "@/data/hardwareCourses";

interface Props { params: { slug: string }; }

export async function generateStaticParams() {
  return allHardwareLessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = allHardwareLessons.find((l) => l.slug === params.slug);
  return { title: lesson ? `${lesson.title} | Hardware` : "Not Found" };
}

const levelColor: Record<string, string> = {
  Beginner:     "text-green-400 bg-green-500/10 border-green-500/20",
  Intermediate: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Advanced:     "text-orange-400 bg-orange-500/10 border-orange-500/20",
  Expert:       "text-red-400 bg-red-500/10 border-red-500/20",
};

export default function HardwareLessonPage({ params }: Props) {
  const lesson = allHardwareLessons.find((l) => l.slug === params.slug);
  if (!lesson) notFound();

  return (
    <div className="min-h-screen bg-[#050816] text-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-10">

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/hardware" className="hover:text-amber-400 transition-colors">Hardware</Link>
          <span>/</span>
          <Link href={`/hardware/${lesson.category}`} className="hover:text-amber-400 capitalize transition-colors">{lesson.category}</Link>
          <span>/</span>
          <span className="text-gray-300">{lesson.title}</span>
        </div>

        <div className="mb-8 pb-6 border-b border-gray-700/50">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`text-xs px-2 py-0.5 rounded border ${levelColor[lesson.level]}`}>{lesson.level}</span>
            <span className="text-xs px-2 py-0.5 rounded text-gray-400 bg-gray-800/60">{lesson.duration}</span>
            <span className="text-xs px-2 py-0.5 rounded text-yellow-400 bg-yellow-500/10">+{lesson.xp} XP</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{lesson.title}</h1>
          <p className="text-gray-400">{lesson.description}</p>
        </div>

        {/* Device Info */}
        <Section title="🖥️ Device Overview">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/40">
              <p className="text-xs text-gray-500 mb-1">Device Role</p>
              <p className="text-sm text-gray-200">{lesson.deviceRole}</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/40">
              <p className="text-xs text-gray-500 mb-2">OSI Layer</p>
              <div className="flex flex-wrap gap-1">
                {lesson.osiLayer.map(l => (
                  <span key={l} className="text-xs px-2 py-0.5 rounded bg-violet-500/10 text-violet-400">{l}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/40">
              <p className="text-xs text-gray-500 mb-2">Common Ports</p>
              <div className="flex flex-wrap gap-1">
                {lesson.commonPorts.map(p => (
                  <span key={p} className="text-xs px-2 py-0.5 rounded bg-gray-700/60 text-gray-300">{p}</span>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/40">
              <p className="text-xs text-gray-500 mb-2">Common Speeds</p>
              <div className="flex flex-wrap gap-1">
                {lesson.commonSpeeds.map(s => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Components */}
        <Section title="🔩 Key Components">
          <div className="grid gap-3">
            {lesson.components.map((comp, i) => (
              <div key={i} className="p-3 rounded-lg bg-gray-800/30 border border-gray-700/30">
                <p className="text-sm font-medium text-gray-200 mb-0.5">{comp.name}</p>
                <p className="text-xs text-gray-500">{comp.description}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* How it works */}
        <Section title="⚙️ How It Works">
          <ol className="space-y-2">
            {lesson.howItWorks.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-300">
                <span className="w-5 h-5 shrink-0 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-bold">{i+1}</span>
                {step}
              </li>
            ))}
          </ol>
        </Section>

        {/* Selection Guide */}
        {lesson.selectionGuide.length > 0 && (
          <Section title="📋 Selection Guide">
            <ul className="space-y-2">
              {lesson.selectionGuide.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-300">
                  <span className="text-amber-400 mt-0.5 shrink-0">→</span>{item}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Installation Guide */}
        {lesson.installationGuide.length > 0 && (
          <Section title="🛠️ Installation Guide">
            <ol className="space-y-2">
              {lesson.installationGuide.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-300">
                  <span className="text-amber-400 shrink-0 font-bold">{i+1}.</span>{step}
                </li>
              ))}
            </ol>
          </Section>
        )}

        {/* Lab & Quiz Navigation Cards */}
        <div className="mb-8 grid sm:grid-cols-2 gap-4">
          {lesson.labs.length > 0 && (
            <Link
              href={`/hardware/lessons/${lesson.slug}/lab`}
              className="group flex items-center gap-4 p-5 rounded-2xl border border-amber-500/25 bg-amber-500/[0.04] hover:bg-amber-500/10 hover:border-amber-500/40 transition-all duration-200"
            >
              <span className="text-3xl">🔬</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-amber-300 group-hover:text-amber-200 transition-colors">Hands-on Lab</p>
                <p className="text-xs text-gray-500 mt-0.5">{lesson.labs.length} lab{lesson.labs.length > 1 ? 's' : ''} · ฝึกจากของจริง</p>
              </div>
              <span className="text-amber-500/50 group-hover:text-amber-400 transition-colors text-lg">→</span>
            </Link>
          )}
          {lesson.quiz.length > 0 && (
            <Link
              href={`/hardware/lessons/${lesson.slug}/quiz`}
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

        {/* Checklist */}
        {lesson.checklist.length > 0 && (
          <Section title="✅ Checklist">
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


        <div className="mt-10 flex justify-between">
          <Link href="/hardware" className="px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 text-sm transition-colors">
            ← Hardware
          </Link>
          <Link href="/advanced" className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-white text-sm font-medium transition-colors">
            Advanced Tracks →
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
