import { BookOpen, FlaskConical, Brain, Zap } from "lucide-react";

type ProgressBarProps = {
  label:    string;
  current:  number;
  total:    number;
  color:    string;       // hex or tailwind-compatible
  bgColor:  string;
  icon:     React.ReactNode;
};

function ProgressBar({ label, current, total, color, bgColor, icon }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${bgColor}`}>
            {icon}
          </div>
          <span className="text-sm font-medium text-white/70">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/35">{current}/{total}</span>
          <span className="text-xs font-bold" style={{ color }}>{pct}%</span>
        </div>
      </div>
      <div className="w-full h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 shadow-sm"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

type Props = {
  lessonsCompleted: number;
  totalLessons:     number;
  labsCompleted:    number;
  totalLabs:        number;
  quizAverage:      number;
  xp:               number;
  nextLevelXp:      number;
};

export default function LearningProgress({
  lessonsCompleted, totalLessons,
  labsCompleted,    totalLabs,
  quizAverage,      xp, nextLevelXp,
}: Props) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl p-5">
      <h2 className="text-sm font-bold text-white/80 mb-5">Learning Progress</h2>
      <div className="flex flex-col gap-5">
        <ProgressBar
          label="Lessons"
          current={lessonsCompleted}
          total={totalLessons}
          color="#38bdf8"
          bgColor="bg-cyan-500/10"
          icon={<BookOpen size={14} className="text-cyan-400" />}
        />
        <ProgressBar
          label="Labs"
          current={labsCompleted}
          total={totalLabs}
          color="#8b5cf6"
          bgColor="bg-violet-500/10"
          icon={<FlaskConical size={14} className="text-violet-400" />}
        />
        <ProgressBar
          label="Quiz Average"
          current={quizAverage}
          total={100}
          color="#22c55e"
          bgColor="bg-emerald-500/10"
          icon={<Brain size={14} className="text-emerald-400" />}
        />
        <ProgressBar
          label="XP to Next Level"
          current={xp}
          total={nextLevelXp}
          color="#f59e0b"
          bgColor="bg-amber-500/10"
          icon={<Zap size={14} className="text-amber-400" />}
        />
      </div>
    </div>
  );
}
