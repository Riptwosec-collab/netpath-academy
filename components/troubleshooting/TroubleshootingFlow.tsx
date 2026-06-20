import type { TroubleshootingFlowStep } from "@/data/troubleshooting";

export default function TroubleshootingFlow({ steps }: { steps: TroubleshootingFlowStep[] }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-[#38bdf8]/80 mb-5">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        ขั้นตอนการไล่ปัญหา (Troubleshooting Flow)
      </h2>

      <div className="relative flex flex-col gap-0">
        {steps.map((step, i) => (
          <div key={step.step} className="relative flex gap-4">
            {/* Timeline line */}
            {i < steps.length - 1 && (
              <div className="absolute left-[18px] top-9 bottom-0 w-px bg-gradient-to-b from-[#38bdf8]/30 to-transparent" />
            )}

            {/* Step number */}
            <div className="flex-shrink-0 w-9 h-9 rounded-full border border-[#38bdf8]/40 bg-[#38bdf8]/10
                            flex items-center justify-center text-[11px] font-bold text-[#38bdf8] mt-0.5">
              {step.step}
            </div>

            {/* Content */}
            <div className="flex-1 pb-6">
              <h3 className="text-sm font-semibold text-white/85 mb-1.5">{step.title}</h3>
              <p className="text-xs text-white/45 leading-[1.7] mb-2">{step.description}</p>

              {step.checkCommand && (
                <div className="mb-2 flex items-center gap-2 px-3 py-2 rounded-lg
                                bg-[#0a0f1e] border border-white/[0.07]">
                  <svg className="w-3.5 h-3.5 text-[#22c55e]/60 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3" />
                  </svg>
                  <code className="text-xs font-mono text-[#22c55e]/90">{step.checkCommand}</code>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg border border-[#22c55e]/15 bg-[#22c55e]/[0.04] px-3 py-2">
                  <p className="text-[10px] text-[#22c55e]/40 mb-0.5 font-medium uppercase tracking-wide">Expected Result</p>
                  <p className="text-white/50 leading-[1.6]">{step.expectedResult}</p>
                </div>
                <div className="rounded-lg border border-[#ef4444]/12 bg-[#ef4444]/[0.04] px-3 py-2">
                  <p className="text-[10px] text-[#ef4444]/40 mb-0.5 font-medium uppercase tracking-wide">ถ้าไม่ผ่าน</p>
                  <p className="text-white/50 leading-[1.6]">{step.ifFailed}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
