"use client";

import { useEffect } from "react";
import Link from "next/link";

type Props = { error: Error & { digest?: string }; reset: () => void };

export default function ErrorPage({ error, reset }: Props) {
  useEffect(() => {
    // Log to console in dev only — never expose to user
    if (process.env.NODE_ENV !== "production") {
      console.error("[App Error]", error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-rose-500/[0.06] blur-3xl pointer-events-none" />

      <div className="w-16 h-16 rounded-2xl border border-rose-500/25 bg-rose-500/10
                      flex items-center justify-center">
        <svg className="w-8 h-8 text-rose-400/60" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>

      <div>
        <h1 className="text-lg font-bold text-rose-400 mb-2">เกิดข้อผิดพลาด</h1>
        <p className="text-sm text-white/35 max-w-sm">
          Something went wrong on our end. กรุณาลองใหม่อีกครั้ง หากยังมีปัญหาให้ลอง refresh หน้า
        </p>
        {error.digest && (
          <p className="text-[10px] text-white/15 mt-2 font-mono">ref: {error.digest}</p>
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={reset}
          className="px-5 py-2.5 rounded-xl bg-rose-500/15 border border-rose-500/40
                     text-sm font-semibold text-rose-400 hover:bg-rose-500/25 transition-all">
          Try Again
        </button>
        <Link href="/dashboard"
          className="px-5 py-2.5 rounded-xl border border-white/[0.09]
                     text-sm text-white/40 hover:text-white/60 hover:border-white/20 transition-all">
          Dashboard
        </Link>
      </div>
    </div>
  );
}
