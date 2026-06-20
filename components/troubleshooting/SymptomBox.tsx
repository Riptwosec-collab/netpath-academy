export default function SymptomBox({ symptoms }: { symptoms: string[] }) {
  return (
    <div className="rounded-2xl border border-[#facc15]/20 bg-[#facc15]/[0.03] p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-[#facc15]/80 mb-4">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        อาการที่พบ (Symptoms)
      </h2>
      <ul className="flex flex-col gap-2">
        {symptoms.map((s, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-white/60">
            <span className="flex-shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center rounded-full
                             border border-[#facc15]/30 bg-[#facc15]/10 text-[#facc15] text-[10px] font-bold">
              {i + 1}
            </span>
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
