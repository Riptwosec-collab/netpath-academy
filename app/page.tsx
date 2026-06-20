import Link from "next/link";
import { ArrowRight } from "lucide-react";

import HeroSection     from "@/components/home/HeroSection";
import FeatureCard     from "@/components/home/FeatureCard";
import LearningPath    from "@/components/home/LearningPath";
import RoadmapPreview  from "@/components/home/RoadmapPreview";
import StatCard        from "@/components/ui/StatCard";

import { features  } from "@/data/features";
import { siteStats } from "@/data/stats";

// ─── Nav bar (public, no auth) ───────────────────────────────────
function PublicNav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14 bg-[#050816]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        </div>
        <span className="font-bold text-white text-sm">
          NetPath <span className="text-cyan-400">Academy</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-6 text-sm text-white/40">
        {[
          { href: "/roadmap",  label: "Roadmap"  },
          { href: "/courses",  label: "Courses"  },
          { href: "/labs",     label: "Labs"     },
          { href: "/ai-tutor", label: "AI Tutor" },
        ].map(({ href, label }) => (
          <Link key={href} href={href} className="hover:text-white/70 transition-colors">
            {label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Link href="/login"     className="px-3 py-1.5 text-sm text-white/50 hover:text-white/80 transition-colors">
          Login
        </Link>
        <Link href="/dashboard" className="px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/40 text-cyan-400 text-sm font-semibold hover:bg-cyan-500/25 transition-all">
          Get Started
        </Link>
      </div>
    </nav>
  );
}

// ─── Stats Section ────────────────────────────────────────────────
function StatsSection() {
  return (
    <section className="py-12">
      <div className="page-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {siteStats.map((stat) => (
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
              color={stat.color as "cyan" | "violet" | "emerald" | "amber"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features Section ─────────────────────────────────────────────
function FeaturesSection() {
  return (
    <section className="py-16">
      <div className="page-container">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl font-bold text-white">ทุกอย่างที่ต้องการในที่เดียว</h2>
          <p className="text-white/40 mt-3 max-w-md mx-auto text-sm">
            ครบจบในแพลตฟอร์มเดียว ตั้งแต่ Roadmap, Lab, AI Tutor จนถึง Portfolio
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <FeatureCard key={f.id} feature={f} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-20">
      <div className="page-container">
        <div className="relative rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 p-8 sm:p-12 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-cyan-500/10 blur-[80px]" />
          </div>
          <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4">Ready to Start?</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">เริ่มเรียนได้เลย — ฟรี</h2>
          <p className="text-white/40 text-base max-w-md mx-auto mb-8">
            Roadmap ชัดเจน, Lab จริง, AI Tutor พร้อมช่วย — ก้าวสู่ Network Engineer ได้เร็วกว่าที่คิด
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-400 font-semibold hover:bg-cyan-500/25 transition-all"
            >
              เริ่มเรียนเลย <ArrowRight size={16} />
            </Link>
            <Link
              href="/ai-tutor"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-violet-500/30 text-violet-400 font-semibold hover:border-violet-400/50 hover:bg-violet-500/5 transition-all"
            >
              ลอง AI Tutor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8">
      <div className="page-container flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-white/30">
          NetPath Academy — Network Engineer Learning Platform
        </span>
        <p className="text-xs text-white/20">MIT License · Phase 1 Foundation</p>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-32 left-0 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-cyan-500/3 blur-[80px]" />
      </div>

      <div className="relative z-10">
        <PublicNav />
        <div className="pt-14">
          <HeroSection />
          <StatsSection />
          <FeaturesSection />
          <LearningPath />
          <RoadmapPreview />
          <CTASection />
          <Footer />
        </div>
      </div>
    </div>
  );
}
