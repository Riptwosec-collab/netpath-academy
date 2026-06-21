import type { Metadata } from "next";
import { careerPaths, skillLevels } from "@/data/careerPaths";

export const metadata: Metadata = {
  title: "Career Paths | NetPath Academy",
  description: "เส้นทางอาชีพสำหรับ Network Engineer ตั้งแต่ต้นจนถึงระดับ Architect",
};

const pathIcons: Record<string, string> = {
  "support-to-network":  "🛠️",
  "network-to-senior":   "🚀",
  "network-to-security": "🔒",
  "network-to-cloud":    "☁️",
};

const pathColors: Record<string, string> = {
  "support-to-network":  "from-blue-500/20 to-sky-500/10 border-blue-500/30",
  "network-to-senior":   "from-purple-500/20 to-violet-500/10 border-purple-500/30",
  "network-to-security": "from-red-500/20 to-rose-500/10 border-red-500/30",
  "network-to-cloud":    "from-cyan-500/20 to-teal-500/10 border-cyan-500/30",
};

const stepDot: Record<string, string> = {
  "support-to-network":  "bg-blue-500",
  "network-to-senior":   "bg-purple-500",
  "network-to-security": "bg-red-500",
  "network-to-cloud":    "bg-cyan-500",
};

export default function CareerPathPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-gray-200 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-sky-400 mb-2">Career Paths</h1>
          <p className="text-gray-400 text-sm md:text-base">
            เลือกเส้นทางอาชีพที่ใช่ — แต่ละ path มีทักษะ, cert เป้าหมาย และขั้นตอนที่ชัดเจน
          </p>
        </div>

        {/* Skill Level Ladder */}
        <div className="mb-10 rounded-xl border border-gray-700/50 bg-gray-800/30 p-6">
          <h2 className="text-base font-semibold text-white mb-4">Skill Progression Ladder</h2>
          <div className="flex flex-wrap gap-2 items-center">
            {skillLevels.map((level, i) => (
              <div key={level} className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    i === 0 ? "bg-gray-700 text-gray-300" :
                    i === 1 ? "bg-blue-900/50 text-blue-300" :
                    i === 2 ? "bg-sky-900/50 text-sky-300" :
                    i === 3 ? "bg-indigo-900/50 text-indigo-300" :
                    i === 4 ? "bg-violet-900/50 text-violet-300" :
                    i === 5 ? "bg-purple-900/50 text-purple-300" :
                    "bg-yellow-900/50 text-yellow-300"
                  }`}
                >
                  {level}
                </span>
                {i < skillLevels.length - 1 && (
                  <span className="text-gray-600 text-xs">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Career Path Cards */}
        <div className="grid gap-8">
          {careerPaths.map((path) => (
            <div
              key={path.id}
              className={`rounded-2xl border bg-gradient-to-br p-6 ${
                pathColors[path.id] ?? "border-gray-700/50 from-gray-800/40 to-gray-800/20"
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start gap-3 mb-5">
                <span className="text-3xl">{pathIcons[path.id] ?? "📌"}</span>
                <div>
                  <h2 className="text-xl font-bold text-white">{path.title}</h2>
                  <p className="text-gray-400 text-sm mt-0.5">{path.description}</p>
                </div>
              </div>

              {/* Steps Timeline */}
              <div className="mb-5">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Career Steps
                </h3>
                <div className="relative pl-4">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-700/60" />
                  <div className="space-y-4">
                    {path.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-4 relative">
                        <div
                          className={`w-3.5 h-3.5 rounded-full mt-1 shrink-0 border-2 border-[#050816] ${
                            stepDot[path.id] ?? "bg-sky-500"
                          }`}
                        />
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-white font-medium text-sm">{step.role}</span>
                            {step.yearsExp && (
                              <span className="text-xs text-gray-500 bg-gray-800/60 px-2 py-0.5 rounded-full">
                                {step.yearsExp}
                              </span>
                            )}
                            {step.salary && (
                              <span className="text-xs text-green-400 bg-green-900/20 px-2 py-0.5 rounded-full">
                                {step.salary}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 text-xs mt-0.5">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Skills & Certs */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {path.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2 py-0.5 rounded-full bg-gray-700/60 text-gray-300 border border-gray-600/40"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Target Certifications
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {path.targetCerts.map((cert) => (
                      <span
                        key={cert}
                        className="text-xs px-2 py-0.5 rounded-full bg-sky-900/30 text-sky-300 border border-sky-700/30"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center rounded-xl border border-gray-700/50 bg-gray-800/30 p-8">
          <p className="text-gray-400 text-sm mb-4">
            ยังไม่รู้จะเริ่มต้นจากไหน? ลองทำ Lab และ Quiz เพื่อค้นหา skill gap ของคุณ
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href="/labs"
              className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium transition-colors"
            >
              เริ่ม Lab
            </a>
            <a
              href="/quiz"
              className="px-5 py-2 rounded-lg border border-gray-600 hover:border-gray-500 text-gray-300 text-sm font-medium transition-colors"
            >
              ทำ Quiz
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
