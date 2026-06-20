import { achievementEvents } from "@/data/progress";

const typeIcon: Record<string, string> = {
  badge:  "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  level:  "M13 10V3L4 14h7v7l9-11h-7z",
  lab:    "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  quiz:   "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  streak: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z",
  course: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
};

export default function AchievementTimeline() {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
      <h2 className="text-xs font-semibold text-white/50 mb-5 flex items-center gap-2">
        <svg className="w-3.5 h-3.5 text-[#38bdf8]/50" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Achievement Timeline
      </h2>
      <div className="flex flex-col gap-0">
        {achievementEvents.map((ev, i) => (
          <div key={ev.id} className="flex gap-3">
            {/* Timeline dot */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-7 h-7 rounded-lg border flex items-center justify-center"
                style={{ borderColor: `${ev.color}30`, backgroundColor: `${ev.color}12` }}>
                <svg className="w-3.5 h-3.5" style={{ color: ev.color }}
                     fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={typeIcon[ev.type] ?? typeIcon.badge} />
                </svg>
              </div>
              {i < achievementEvents.length - 1 && (
                <div className="w-0.5 h-6 bg-white/[0.05] mt-1" />
              )}
            </div>
            {/* Content */}
            <div className="flex-1 pb-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-medium text-white/70">{ev.title}</p>
                  <p className="text-[10px] text-white/30 mt-0.5">{ev.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  {ev.xpGained > 0 && (
                    <p className="text-[10px] font-semibold" style={{ color: ev.color }}>+{ev.xpGained} XP</p>
                  )}
                  <p className="text-[9px] text-white/20">{ev.date}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
