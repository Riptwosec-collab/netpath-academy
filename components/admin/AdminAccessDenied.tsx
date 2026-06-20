import Link from "next/link";

export default function AdminAccessDenied() {
  return (
    <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center gap-5 text-center px-4">
      <div className="w-16 h-16 rounded-2xl border border-rose-500/25 bg-rose-500/10 flex items-center justify-center">
        <svg className="w-8 h-8 text-rose-400/60" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <div>
        <h1 className="text-lg font-bold text-rose-400">Access Denied</h1>
        <p className="text-sm text-white/35 mt-1">คุณไม่มีสิทธิ์เข้าถึงหน้านี้</p>
      </div>
      <Link href="/dashboard"
        className="text-sm px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/50 hover:text-white/75 transition-all">
        กลับ Dashboard
      </Link>
    </div>
  );
}
