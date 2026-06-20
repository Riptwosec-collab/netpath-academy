import { userProgress } from "@/data/progress";

const DAYS = ["จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"];
// Mock: last 7 days, today = last index
const mockActivity = [true, true, true, false, true, true, true];

export default function LearningStreak() {
  return (
    <div className="relative rounded-2xl border border-[#f97316]/20 bg-[#f97316]/[0.04] overflow-hidden p-5">
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#f97316]/6 blur-3xl pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#f97316]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span className="text-xs font-semibold text-white/70">Learning Streak</span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#f97316]">{userProgress.learningStreak}</p>
            <p className="text-[10px] text-white/30">วันต่อเนื่อง</p>
          </div>
        </div>

        {/* Day circles */}
        <div className="flex gap-2 mb-3">
          {DAYS.map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                mockActivity[i]
                  ? "bg-[#f97316] text-white shadow-[0_0_8px_rgba(249,115,22,0.4)]"
                  : "bg-white/[0.05] text-white/20 border border-white/[0.07]"
              }`}>
                {mockActivity[i] ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : "–"}
              </div>
              <span className="text-[9px] text-white/25">{day}</span>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-white/30">
          Longest Streak: <span className="text-white/50">{userProgress.longestStreak} วัน</span>
        </p>
      </div>
    </div>
  );
}
