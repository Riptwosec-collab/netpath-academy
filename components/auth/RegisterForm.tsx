"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim())               { setError("กรุณาใส่ชื่อ"); return; }
    if (!form.email.trim())              { setError("กรุณาใส่ Email"); return; }
    if (form.password.length < 6)        { setError("Password ต้องมีอย่างน้อย 6 ตัวอักษร"); return; }
    if (form.password !== form.confirm)  { setError("Password ไม่ตรงกัน"); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json() as { error?: string; success?: boolean };
      if (!res.ok) { setError(data.error ?? "เกิดข้อผิดพลาด"); }
      else {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch {
      setError("ไม่สามารถเชื่อมต่อได้ กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4">
      <div className="fixed -top-32 -right-32 w-96 h-96 rounded-full bg-[#8b5cf6]/6 blur-3xl pointer-events-none" />
      <div className="fixed -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#38bdf8]/6 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            NetPath Academy
          </span>
          <p className="text-white/40 text-sm mt-1">สมัครสมาชิกเพื่อเริ่มเรียน</p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl p-6 space-y-4">
          <h1 className="text-base font-semibold text-white/90">Create Account</h1>

          {error && (
            <div className="px-4 py-3 rounded-xl border border-rose-500/25 bg-rose-500/10 text-rose-400 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="px-4 py-3 rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 text-sm">
              สมัครสำเร็จ! กำลังพาไปหน้า Login...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {[
              { key: "name"    as const, label: "ชื่อ",            ph: "Network Engineer",          type: "text"     },
              { key: "email"   as const, label: "Email",           ph: "you@example.com",           type: "email"    },
              { key: "password"as const, label: "Password",        ph: "อย่างน้อย 6 ตัวอักษร",      type: "password" },
              { key: "confirm" as const, label: "Confirm Password",ph: "ยืนยัน Password อีกครั้ง", type: "password" },
            ].map(({ key, label, ph, type }) => (
              <div key={key}>
                <label className="text-[10px] text-white/35 mb-1 block">{label}</label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) => set(key, e.target.value)}
                  placeholder={ph}
                  required
                  className="w-full rounded-xl bg-white/[0.05] border border-white/[0.09] px-4 py-2.5
                             text-sm text-white/85 placeholder:text-white/20
                             focus:outline-none focus:border-violet-500/50 transition-all"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-2.5 rounded-xl bg-violet-500/15 border border-violet-500/40
                         text-sm font-semibold text-violet-400 hover:bg-violet-500/25 transition-all
                         disabled:opacity-40 disabled:cursor-not-allowed mt-1"
            >
              {loading ? "กำลังสมัคร..." : "Create Account"}
            </button>
          </form>

          <div className="text-center pt-1">
            <p className="text-xs text-white/30">
              มีบัญชีแล้ว?{" "}
              <Link href="/login" className="text-cyan-400/70 hover:text-cyan-400 transition-colors">
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
