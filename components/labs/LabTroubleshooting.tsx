import type { Lab } from "@/data/labs";

export default function LabTroubleshooting({ lab }: { lab: Lab }) {
  return (
    <div className="rounded-2xl border border-[#ef4444]/[0.12] bg-[#ef4444]/[0.02] p-5 md:p-6">
      <h2 className="text-sm font-semibold text-white/70 flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-[#ef4444]/70" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Troubleshooting Guide
      </h2>

      {/* Expected result */}
      <div className="mb-4 p-3 rounded-xl bg-[#22c55e]/[0.05] border border-[#22c55e]/[0.15]">
        <p className="text-[10px] font-semibold text-[#22c55e]/60 uppercase tracking-wider mb-1">Expected Result</p>
        <p className="text-xs text-white/55 leading-relaxed">{lab.expectedResult}</p>
      </div>

      {/* Steps */}
      <ol className="space-y-2.5">
        {lab.troubleshooting.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#ef4444]/10 border border-[#ef4444]/20
                             flex items-center justify-center text-[10px] font-bold text-[#ef4444]/60 mt-0.5">
              {i + 1}
            </span>
            <p className="text-xs text-white/50 leading-relaxed">{step}</p>
          </li>
        ))}
      </ol>

      <div className="mt-4 pt-4 border-t border-white/[0.05] flex items-start gap-2">
        <svg className="w-3.5 h-3.5 text-[#38bdf8]/40 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-[10px] text-white/25 leading-relaxed">
          ใช้ Troubleshooting Guide นี้เมื่อ Lab ไม่ทำงานตาม Expected Result ให้ทำตามขั้นตอนจากบนลงล่าง
        </p>
      </div>
    </div>
  );
}
