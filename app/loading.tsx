export default function Loading() {
  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col items-center gap-5 px-6 py-10
                      rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl
                      shadow-2xl w-full max-w-xs">
        {/* Spinner */}
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-2 border-white/[0.05]" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400
                          animate-spin" />
          <div className="absolute inset-2 rounded-full border border-transparent border-t-violet-400
                          animate-spin" style={{ animationDuration: "1.5s", animationDirection: "reverse" }} />
        </div>

        {/* Logo mark */}
        <div className="text-center">
          <p className="text-xs font-bold tracking-[0.25em] text-cyan-400/70 uppercase mb-1">NetPath</p>
          <p className="text-[10px] text-white/25 tracking-widest uppercase">Academy</p>
        </div>

        <p className="text-xs text-white/35 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
