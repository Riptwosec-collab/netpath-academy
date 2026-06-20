export default function PossibleCauses({ causes }: { causes: string[] }) {
  return (
    <div className="rounded-2xl border border-[#ef4444]/15 bg-[#ef4444]/[0.03] p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-[#ef4444]/70 mb-4">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        สาเหตุที่เป็นไปได้ (Possible Causes)
      </h2>
      <div className="grid sm:grid-cols-2 gap-2">
        {causes.map((c, i) => (
          <div key={i}
               className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl
                          border border-[#ef4444]/10 bg-[#ef4444]/[0.04] text-xs text-white/55">
            <svg className="w-3.5 h-3.5 text-[#ef4444]/50 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}
