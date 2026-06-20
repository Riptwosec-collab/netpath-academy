export default function FixActions({ actions }: { actions: string[] }) {
  return (
    <div className="rounded-2xl border border-[#22c55e]/15 bg-[#22c55e]/[0.03] p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-[#22c55e]/80 mb-4">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        </svg>
        แนวทางแก้ไข (Fix Actions)
      </h2>
      <ul className="flex flex-col gap-2">
        {actions.map((a, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-white/60">
            <svg className="w-4 h-4 text-[#22c55e]/60 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {a}
          </li>
        ))}
      </ul>
    </div>
  );
}
