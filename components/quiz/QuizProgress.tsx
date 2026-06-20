export default function QuizProgress({
  current,
  total,
}: {
  current: number;   // 1-based
  total:   number;
}) {
  const pct = Math.round(((current - 1) / total) * 100);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs text-white/40">
        <span>
          คำถามที่ <span className="text-white/70 font-semibold">{current}</span> จาก {total}
        </span>
        <span className="text-white/30">{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/[0.07]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#38bdf8] to-[#8b5cf6] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
