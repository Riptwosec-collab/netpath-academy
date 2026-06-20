import { isDatabaseConfigured, isAiConfigured, isProduction } from "@/lib/env";

export const dynamic = "force-dynamic"; // always fresh, never cached

type StatusDot = "ok" | "warn" | "error";

function Status({ status, label }: { status: StatusDot; label: string }) {
  const color =
    status === "ok"    ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" :
    status === "warn"  ? "text-amber-400   border-amber-500/30   bg-amber-500/10"   :
                         "text-rose-400    border-rose-500/30     bg-rose-500/10";

  const dot =
    status === "ok"    ? "bg-emerald-400" :
    status === "warn"  ? "bg-amber-400"   :
                         "bg-rose-400";

  return (
    <div className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border text-xs ${color}`}>
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
      {label}
    </div>
  );
}

export default function HealthPage() {
  const dbOk  = isDatabaseConfigured();
  const aiOk  = isAiConfigured();
  const isProd = isProduction();
  const now   = new Date().toISOString();

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/[0.07] bg-white/[0.03]
                      backdrop-blur-xl p-6 space-y-5">
        <div>
          <h1 className="text-sm font-bold text-white/80">Health Check</h1>
          <p className="text-[10px] text-white/25 font-mono mt-0.5">{now}</p>
        </div>

        <div className="space-y-2">
          <Status status="ok"            label="App — Running" />
          <Status status={isProd ? "ok" : "warn"} label={`Environment — ${isProd ? "production" : "development"}`} />
          <Status status={dbOk ? "ok" : "error"} label={`Database — ${dbOk ? "Configured" : "DATABASE_URL missing"}`} />
          <Status status={aiOk ? "ok" : "warn"}  label={`AI Tutor — ${aiOk ? "Configured" : "OPENAI_API_KEY missing (mock mode)"}`} />
        </div>

        <div className="border-t border-white/[0.06] pt-4 text-[10px] text-white/20 space-y-1">
          <p>Node: {process.version}</p>
          <p>Next.js App Router</p>
          <p className="text-rose-400/40">⚠ Secrets are never shown here</p>
        </div>
      </div>
    </div>
  );
}
