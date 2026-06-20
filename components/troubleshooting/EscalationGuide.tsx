const escalationIcons = [
  /* 0 */ "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  /* 1 */ "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  /* 2 */ "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
];

export default function EscalationGuide({ escalation }: { escalation: string[] }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-white/60 mb-4">
        <svg className="w-4 h-4 text-[#f97316]/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
        Escalation Guide — ส่งต่อเมื่อไหร่และให้ใคร
      </h2>
      <div className="flex flex-col gap-2">
        {escalation.map((e, i) => (
          <div key={i}
               className="flex items-start gap-3 px-4 py-3 rounded-xl
                          border border-white/[0.06] bg-white/[0.02]">
            <div className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-lg border border-[#f97316]/25 bg-[#f97316]/8
                            flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-[#f97316]/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={escalationIcons[i % escalationIcons.length]} />
              </svg>
            </div>
            <p className="text-xs text-white/50 leading-[1.7]">{e}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
