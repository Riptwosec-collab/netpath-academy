import Link from "next/link";
import { ArrowRight, Play, Wifi, Server, Shield, Network } from "lucide-react";

// ─── Mock terminal / network card ────────────────────────────────
function NetworkCard() {
  return (
    <div className="relative w-full max-w-sm mx-auto lg:mx-0">
      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 blur-xl" />

      <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-5 space-y-4">
        {/* Header bar */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-[11px] text-white/20 font-mono ml-1">netpath-academy ~</span>
        </div>

        {/* Terminal lines */}
        <div className="font-mono text-[12px] space-y-1.5">
          <div className="flex items-start gap-2">
            <span className="text-cyan-400/70 shrink-0">$</span>
            <span className="text-white/50">ping 192.168.1.1</span>
          </div>
          <div className="text-emerald-400/80">PING 192.168.1.1: 56 bytes</div>
          <div className="text-white/30">64 bytes from 192.168.1.1: <span className="text-emerald-400/70">icmp_seq=1 time=0.5ms</span></div>

          <div className="flex items-start gap-2 pt-1">
            <span className="text-violet-400/70 shrink-0">$</span>
            <span className="text-white/50">show ip route</span>
          </div>
          <div className="text-white/30">C  <span className="text-cyan-400/70">192.168.1.0/24</span> is directly connected, Gi0/0</div>
          <div className="text-white/30">S* <span className="text-amber-400/60">0.0.0.0/0</span> [1/0] via 192.168.1.1</div>

          <div className="flex items-center gap-1 pt-1">
            <span className="text-cyan-400/70">$</span>
            <span className="text-white/30">_</span>
            <span className="w-2 h-4 bg-cyan-400/70 animate-pulse inline-block ml-0.5" />
          </div>
        </div>

        {/* Status pills */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          {[
            { icon: Network,  label: "IP Routing",  status: "Active",  color: "cyan" },
            { icon: Wifi,     label: "Wireless",    status: "Online",  color: "emerald" },
            { icon: Shield,   label: "Firewall",    status: "Secure",  color: "violet" },
            { icon: Server,   label: "DHCP Server", status: "Running", color: "amber" },
          ].map(({ icon: Icon, label, status, color }) => (
            <div key={label} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.05]">
              <Icon size={13} className={`text-${color}-400/70`} />
              <div>
                <p className="text-[10px] text-white/40 leading-none">{label}</p>
                <p className={`text-[10px] font-semibold text-${color}-400 leading-none mt-0.5`}>{status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-28 overflow-hidden">
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-violet-500/10 blur-[80px]" />
      </div>

      <div className="relative page-container">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: text */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-500/5 text-cyan-400 text-xs font-semibold mb-6">
              <Wifi size={13} />
              Network Engineer Roadmap
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
              เริ่มเส้นทางสู่{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Network Engineer
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/50 mb-8 max-w-xl mx-auto lg:mx-0">
              เรียน Network แบบเป็นระบบ ตั้งแต่พื้นฐาน IP, VLAN, Routing, Firewall, Wireless,
              Monitoring, Automation จนถึง Network Design ระดับ Senior
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
              <Link
                href="/roadmap"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-400 font-semibold hover:bg-cyan-500/25 hover:border-cyan-400/60 transition-all"
              >
                Start Learning
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/roadmap"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white/60 font-semibold hover:border-white/20 hover:text-white/80 transition-all"
              >
                <Play size={15} />
                View Roadmap
              </Link>
            </div>

            {/* Mini stats */}
            <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start">
              {[
                { value: "120+", label: "Lessons" },
                { value: "50+",  label: "Labs" },
                { value: "10",   label: "Levels" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-xl font-bold text-cyan-400">{value}</p>
                  <p className="text-xs text-white/35">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Network card */}
          <div className="flex-1 w-full lg:max-w-md">
            <NetworkCard />
          </div>
        </div>
      </div>
    </section>
  );
}
