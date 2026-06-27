import type { Metadata } from "next";
import Link from "next/link";
import { automationLessons, automationTrack } from "@/data/automationCourses";

export const metadata: Metadata = {
  title: "Network Automation | NetPath Academy",
  description: "Python, Netmiko, Ansible, NAPALM, Nornir, Terraform, RESTCONF — ทักษะที่ตลาดงาน Network Engineer ต้องการมากที่สุด",
};

const levelColor: Record<string, string> = {
  Beginner:     "text-green-400 bg-green-500/10 border-green-500/20",
  Intermediate: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Advanced:     "text-orange-400 bg-orange-500/10 border-orange-500/20",
  Expert:       "text-red-400 bg-red-500/10 border-red-500/20",
};

const toolBadge: Record<string, string> = {
  python:    "bg-blue-500/10 text-blue-400 border-blue-500/20",
  netmiko:   "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  ansible:   "bg-red-500/10 text-red-400 border-red-500/20",
  napalm:    "bg-violet-500/10 text-violet-400 border-violet-500/20",
  nornir:    "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  terraform: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  restconf:  "bg-sky-500/10 text-sky-400 border-sky-500/20",
  netconf:   "bg-sky-500/10 text-sky-400 border-sky-500/20",
  yang:      "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export default function NetworkAutomationPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-gray-200">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Home button */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/40 hover:text-white hover:border-white/20 hover:bg-white/[0.07] transition-all text-xs font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Dashboard
          </Link>
        </div>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/advanced" className="hover:text-emerald-400 transition-colors">Advanced Tracks</Link>
          <span>/</span>
          <span className="text-gray-300">Network Automation</span>
        </div>

        {/* Hero */}
        <div className="mb-10 pb-8 border-b border-gray-700/50">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🐍</span>
            <div>
              <h1 className="text-3xl font-bold text-white">{automationTrack.title}</h1>
              <p className="text-emerald-400 text-sm font-medium mt-1">Advanced Track · {automationLessons.length} Lessons · {automationTrack.totalXp} XP</p>
            </div>
          </div>
          <p className="text-gray-400 max-w-2xl leading-relaxed">{automationTrack.description}</p>

          {/* Tool stack */}
          <div className="flex flex-wrap gap-2 mt-5">
            {["Python", "Netmiko", "Ansible", "NAPALM", "Nornir", "Terraform", "RESTCONF/NETCONF"].map((tool) => (
              <span key={tool} className="text-xs px-3 py-1 rounded-full border bg-white/5 border-white/10 text-gray-300 font-medium">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Why automation matters */}
        <div className="mb-10 grid sm:grid-cols-3 gap-4">
          {[
            { icon: "⚡", title: "ทำงาน 1000 device ใน 5 นาที", desc: "สิ่งที่ manual ใช้เวลาหลายวัน automation ทำได้ในไม่กี่นาที" },
            { icon: "💼", title: "Salary Premium 30-50%", desc: "Network Automation Engineer มีเงินเดือนสูงกว่า traditional network admin มาก" },
            { icon: "🎯", title: "ทุก Enterprise ต้องการ", desc: "CCNP-level automation เป็น skill ที่ทุก company ถาม ใน job interview" },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4">
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Lesson list */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">📚 Lessons</h2>
          <div className="flex flex-col gap-3">
            {automationLessons.map((lesson, idx) => (
              <Link
                key={lesson.slug}
                href={`/advanced/network-automation/lessons/${lesson.slug}`}
                className="group flex items-start gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-500/20 p-4 transition-all duration-200"
              >
                {/* Number */}
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-bold">
                  {idx + 1}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {lesson.title}
                    </h3>
                    <span className={`text-[11px] px-2 py-0.5 rounded border ${levelColor[lesson.level]}`}>
                      {lesson.level}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2 leading-relaxed">{lesson.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {lesson.tags.slice(0, 4).map((tag: string) => (
                      <span
                        key={tag}
                        className={`text-[10px] px-2 py-0.5 rounded-full border ${toolBadge[tag] ?? "bg-gray-800/60 text-gray-500 border-gray-700/50"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Meta */}
                <div className="flex-shrink-0 text-right">
                  <p className="text-xs text-yellow-400 font-semibold">+{lesson.xp} XP</p>
                  <p className="text-[11px] text-gray-600 mt-0.5">{lesson.duration}</p>
                  {lesson.lab && (
                    <span className="text-[10px] mt-1 inline-block px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Lab
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Learning path tip */}
        <div className="mt-10 rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
          <h3 className="text-sm font-semibold text-blue-300 mb-2">💡 แนะนำ Learning Path</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            เริ่มจาก <span className="text-blue-300 font-medium">Python for Network Engineers</span> →
            <span className="text-cyan-300 font-medium"> Netmiko</span> (SSH automation) →
            <span className="text-red-300 font-medium"> Ansible</span> (declarative) →
            <span className="text-violet-300 font-medium"> NAPALM</span> (multi-vendor) →
            <span className="text-emerald-300 font-medium"> Nornir</span> (Python-native framework) →
            <span className="text-purple-300 font-medium"> Terraform</span> (cloud IaC) →
            <span className="text-sky-300 font-medium"> RESTCONF/NETCONF</span> (model-driven)
          </p>
        </div>

      </div>
    </div>
  );
}
