export default function RootCauseExamples({ examples }: { examples: string[] }) {
  return (
    <div className="rounded-2xl border border-[#f97316]/15 bg-[#f97316]/[0.03] p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-[#f97316]/80 mb-4">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
        ตัวอย่าง Root Cause จริง
      </h2>
      <ul className="flex flex-col gap-2">
        {examples.map((ex, i) => (
          <li key={i}
              className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl
                         border border-[#f97316]/12 bg-[#f97316]/[0.04] text-xs text-white/55">
            <svg className="w-3.5 h-3.5 text-[#f97316]/60 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {ex}
          </li>
        ))}
      </ul>
    </div>
  );
}
