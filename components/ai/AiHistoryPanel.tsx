import { aiMockHistory, aiModes } from "@/data/aiPrompts";

export default function AiHistoryPanel() {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
      <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-3">
        Recent Chats
      </p>
      <div className="flex flex-col gap-1">
        {aiMockHistory.map((h) => {
          const m = aiModes.find((mode) => mode.id === h.mode);
          return (
            <div
              key={h.id}
              className="flex items-center gap-2.5 px-2 py-2 rounded-lg
                         text-white/35 hover:text-white/60 hover:bg-white/[0.03]
                         cursor-default transition-colors"
            >
              <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                   style={{ backgroundColor: `${m?.color ?? "#38bdf8"}15` }}>
                <svg className="w-3 h-3" style={{ color: `${m?.color ?? "#38bdf8"}70` }}
                     fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={m?.icon ?? ""} />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium truncate">{h.title}</p>
                <p className="text-[10px] text-white/20">{h.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
