import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center gap-6 px-4 text-center">
      {/* Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-500/[0.07] blur-3xl pointer-events-none" />

      {/* 404 */}
      <div className="relative">
        <p className="text-[120px] font-black leading-none bg-gradient-to-b from-white/10 to-transparent bg-clip-text text-transparent select-none">
          404
        </p>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-2xl border border-violet-500/25 bg-violet-500/10
                          flex items-center justify-center">
            <svg className="w-10 h-10 text-violet-400/50" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-bold text-white/80 mb-2">Page Not Found</h1>
        <p className="text-sm text-white/35 max-w-xs">
          ไม่พบหน้าที่คุณต้องการ อาจถูกย้ายหรือลบออกไปแล้ว
        </p>
      </div>

      <div className="flex gap-3">
        <Link href="/"
          className="px-5 py-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/40
                     text-sm font-semibold text-cyan-400 hover:bg-cyan-500/25 transition-all">
          กลับหน้าหลัก
        </Link>
        <Link href="/dashboard"
          className="px-5 py-2.5 rounded-xl border border-white/[0.09]
                     text-sm text-white/40 hover:text-white/60 hover:border-white/20 transition-all">
          Dashboard
        </Link>
      </div>
    </div>
  );
}
