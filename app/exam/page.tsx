import Link        from "next/link";
import { exams }   from "@/data/exams";
import { cn }      from "@/lib/utils";
import { Clock, Trophy, BookOpen, ChevronRight } from "lucide-react";

const levelColor: Record<string, string> = {
  Beginner:     "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Intermediate: "text-amber-400   bg-amber-500/10   border-amber-500/20",
  Advanced:     "text-rose-400    bg-rose-500/10    border-rose-500/20",
};

export default function ExamCenterPage() {
  return (
    <div className="px-4 md:px-6 py-6 max-w-5xl mx-auto space-y-6">

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white/90">🎓 Exam Center</h1>
        <p className="text-sm text-white/40">
          ทดสอบความรู้แบบจริงจัง — มี Timer, คำอธิบายคำตอบ และ Certificate เมื่อผ่าน
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Exams",     value: exams.length,                          icon: BookOpen, color: "text-cyan-400"   },
          { label: "Available Now",   value: exams.length,                          icon: Trophy,   color: "text-amber-400"  },
          { label: "Avg Time Limit",  value: `${Math.round(exams.reduce((a,e) => a + (e.timeLimit ?? 60), 0) / exams.length)} min`, icon: Clock, color: "text-violet-400" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 flex items-center gap-3">
            <s.icon size={18} className={s.color} />
            <div>
              <div className={cn("text-lg font-bold", s.color)}>{s.value}</div>
              <div className="text-[11px] text-white/30">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Exam grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exams.map(exam => (
          <div
            key={exam.id}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 hover:bg-white/[0.05] transition-all group"
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl leading-none">{exam.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h2 className="text-sm font-bold text-white/85">{exam.title}</h2>
                  <span className={cn("text-[9px] px-1.5 py-0.5 rounded-full border font-semibold", levelColor[exam.level])}>
                    {exam.level}
                  </span>
                </div>
                <p className="text-[11px] text-white/35 line-clamp-2">{exam.description}</p>
              </div>
            </div>

            {/* Meta row */}
            <div className="flex items-center gap-3 text-[11px] text-white/30 mb-4 flex-wrap">
              <span className="flex items-center gap-1"><Clock size={10} /> {exam.timeLimit} min</span>
              <span>·</span>
              <span>{exam.questions.length} questions</span>
              <span>·</span>
              <span>Pass ≥ {exam.passingScore}%</span>
              <span>·</span>
              <span className="px-1.5 py-0.5 rounded-full bg-white/[0.05] text-white/25">{exam.category}</span>
            </div>

            {/* Certificate name */}
            <div className="flex items-center gap-2 mb-4 px-2.5 py-1.5 rounded-lg bg-amber-500/[0.06] border border-amber-500/15">
              <Trophy size={11} className="text-amber-400/70" />
              <span className="text-[10px] text-amber-300/60">{exam.certName}</span>
            </div>

            <Link
              href={`/exam/${exam.id}`}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold hover:bg-cyan-500/20 transition-all group-hover:border-cyan-500/40"
            >
              เริ่มสอบ <ChevronRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
