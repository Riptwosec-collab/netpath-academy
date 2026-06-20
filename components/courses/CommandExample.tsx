import type { Lesson } from "@/data/courses";

export default function CommandExample({ lesson }: { lesson: Lesson }) {
  if (!lesson.commands || lesson.commands.length === 0) return null;
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 md:p-6">
      <h2 className="text-sm font-semibold text-white/60 flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-[#38bdf8]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        คำสั่งที่ต้องรู้
      </h2>
      <div className="space-y-3">
        {lesson.commands.map((cmd, i) => (
          <div key={i} className="rounded-xl overflow-hidden border border-white/[0.07]">
            {/* Title */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/[0.03] border-b border-white/[0.06]">
              <span className="text-xs font-medium text-white/50">{cmd.title}</span>
              <span className="text-[10px] text-white/20 font-mono">#{i + 1}</span>
            </div>
            {/* Command */}
            <div className="bg-[#0a0f1e] px-4 py-3">
              <pre className="text-sm font-mono text-[#38bdf8]/90 whitespace-pre-wrap leading-relaxed">
                {cmd.command}
              </pre>
            </div>
            {/* Description */}
            <div className="px-4 py-2.5 bg-white/[0.01]">
              <p className="text-xs text-white/35 leading-relaxed">{cmd.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
