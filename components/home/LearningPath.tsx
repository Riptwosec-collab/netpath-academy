import { ArrowDown, CheckCircle2 } from "lucide-react";
import type { LearningPathStep } from "@/types";

const steps: LearningPathStep[] = [
  {
    label:       "Beginner",
    description: "เริ่มต้น: OSI Model, TCP/IP, IP Address, Subnetting",
    color:       "slate",
  },
  {
    label:       "IT Support Ready",
    description: "DHCP, DNS, NAT, VLAN พื้นฐาน, สาย Network",
    color:       "cyan",
  },
  {
    label:       "Junior Network Engineer",
    description: "Switching, Routing, Firewall, VPN พื้นฐาน",
    color:       "cyan",
  },
  {
    label:       "Network Engineer",
    description: "Wireless, Monitoring, Troubleshooting ขั้นกลาง",
    color:       "violet",
  },
  {
    label:       "Senior Network Engineer",
    description: "Network Automation, Cloud, SD-WAN, High Availability",
    color:       "violet",
  },
  {
    label:       "Network Architect",
    description: "Enterprise Design, Business Continuity, Team Lead",
    color:       "amber",
  },
];

const colorClass: Record<string, { dot: string; border: string; text: string; bg: string }> = {
  slate:  { dot: "bg-slate-400",   border: "border-slate-400/20",  text: "text-slate-300",  bg: "bg-slate-400/8" },
  cyan:   { dot: "bg-cyan-400",    border: "border-cyan-400/25",   text: "text-cyan-400",   bg: "bg-cyan-500/8" },
  violet: { dot: "bg-violet-400",  border: "border-violet-400/25", text: "text-violet-400", bg: "bg-violet-500/8" },
  amber:  { dot: "bg-amber-400",   border: "border-amber-400/25",  text: "text-amber-400",  bg: "bg-amber-500/8" },
};

export default function LearningPath() {
  return (
    <section className="py-16">
      <div className="page-container">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3">Learning Path</p>
          <h2 className="text-3xl font-bold text-white">เส้นทางการเรียนรู้</h2>
          <p className="text-white/40 mt-3 max-w-md mx-auto text-sm">
            ก้าวทีละขั้น จาก Beginner ไปถึง Network Architect
          </p>
        </div>

        <div className="max-w-lg mx-auto flex flex-col items-center gap-0">
          {steps.map((step, i) => {
            const c = colorClass[step.color] ?? colorClass.cyan;
            const isLast = i === steps.length - 1;
            return (
              <div key={step.label} className="flex flex-col items-center w-full">
                {/* Card */}
                <div className={`w-full rounded-2xl border ${c.border} ${c.bg} px-5 py-4 flex items-center gap-4`}>
                  <div className={`w-9 h-9 rounded-full flex-shrink-0 border-2 ${c.border} flex items-center justify-center`}>
                    {i === steps.length - 1 ? (
                      <CheckCircle2 size={18} className={c.text} />
                    ) : (
                      <span className={`text-sm font-bold ${c.text}`}>{i + 1}</span>
                    )}
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${c.text}`}>{step.label}</p>
                    <p className="text-xs text-white/35 mt-0.5">{step.description}</p>
                  </div>
                </div>

                {/* Connector arrow */}
                {!isLast && (
                  <div className="flex flex-col items-center py-1">
                    <div className="w-px h-4 bg-white/10" />
                    <ArrowDown size={12} className="text-white/15" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
