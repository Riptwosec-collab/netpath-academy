type Props = {
  xp: number;
  level: number;
  learningStreak: number;
  labCount: number;
  quizCount: number;
  badgeCount: number;
};

export default function ProfileStats({ xp, level, learningStreak, labCount, quizCount, badgeCount }: Props) {
  const stats = [
    { label: "XP Total",      value: xp.toLocaleString(), color: "#38bdf8", suffix: " XP" },
    { label: "Level",         value: level,                color: "#8b5cf6", suffix: ""    },
    { label: "Streak",        value: learningStreak,       color: "#f97316", suffix: " วัน" },
    { label: "Labs Done",     value: labCount,             color: "#22c55e", suffix: ""    },
    { label: "Quizzes",       value: quizCount,            color: "#facc15", suffix: ""    },
    { label: "Badges",        value: badgeCount,           color: "#ef4444", suffix: ""    },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3 text-center"
             style={{ borderColor: `${s.color}20` }}>
          <p className="text-xl font-bold" style={{ color: s.color }}>
            {s.value}{s.suffix}
          </p>
          <p className="text-[9px] text-white/30 mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
