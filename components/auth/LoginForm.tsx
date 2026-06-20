"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email:    email.toLowerCase().trim(),
      password,
      redirect: false,
    });

    setLoading(false);
    if (result?.error) {
      setError("Email หรือ Password ไม่ถูกต้อง");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4">
      {/* Ambient blobs */}
      <div className="fixed -top-32 -left-32 w-96 h-96 rounded-full bg-[#38bdf8]/6 blur-3xl pointer-events-none" />
      <div className="fixed -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#8b5cf6]/6 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            NetPath Academy
          </span>
          <p className="text-white/40 text-sm mt-1">เข้าสู่ระบบเพื่อเรียนต่อ</p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl p-6 space-y-4">
          <h1 className="text-base font-semibold text-white/90">Sign In</h1>

          {error && (
            <div className="px-4 py-3 rounded-xl border border-rose-500/25 bg-rose-500/10 text-rose-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-[10px] text-white/35 mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@netpath.academy"
                required
                className="w-full rounded-xl bg-white/[0.05] border border-white/[0.09] px-4 py-2.5
                           text-sm text-white/85 placeholder:text-white/20
                           focus:outline-none focus:border-cyan-500/50 transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] text-white/35 mb-1 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-xl bg-white/[0.05] border border-white/[0.09] px-4 py-2.5
                           text-sm text-white/85 placeholder:text-white/20
                           focus:outline-none focus:border-cyan-500/50 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/40
                         text-sm font-semibold text-cyan-400 hover:bg-cyan-500/25 transition-all
                         disabled:opacity-40 disabled:cursor-not-allowed mt-1"
            >
              {loading ? "กำลังเข้าสู่ระบบ..." : "Sign In"}
            </button>
          </form>

          <div className="text-center pt-1">
            <p className="text-xs text-white/30">
              ยังไม่มีบัญชี?{" "}
              <Link href="/register" className="text-cyan-400/70 hover:text-cyan-400 transition-colors">
                สมัครสมาชิก
              </Link>
            </p>
          </div>
        </div>

        {/* Demo credentials */}
        <div className="mt-4 rounded-xl border border-violet-500/15 bg-violet-500/[0.05] p-3 text-center">
          <p className="text-[10px] text-white/30 mb-1">Demo account</p>
          <p className="text-[11px] font-mono text-violet-400/70">demo@netpath.academy / Demo@123</p>
        </div>
      </div>
    </div>
  );
}
