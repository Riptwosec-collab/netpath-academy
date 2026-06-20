import Link from "next/link";
import { ExternalLink, Clock, BookOpen, Trophy, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const certs = [
  {
    id: "ccna",
    name: "CCNA",
    fullName: "Cisco Certified Network Associate",
    level: "Entry",
    color: "cyan",
    icon: "🏅",
    examCode: "200-301",
    duration: "120 min",
    questions: "100-120 ข้อ",
    passingScore: "825/1000",
    cost: "~$330 USD",
    validity: "3 ปี",
    description: "Certification ที่เป็นที่ยอมรับมากที่สุดในวงการ Network Engineer — ครอบคลุม Routing, Switching, Security, Automation",
    topics: ["IPv4/IPv6", "Routing (OSPF, BGP basics)", "Switching (VLANs, STP)", "Network Security", "Automation basics", "Wireless fundamentals"],
    relatedExam: "/exam/network-fundamentals-exam",
    studyTime: "3-6 เดือน",
    url: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html",
  },
  {
    id: "ccnp-enterprise",
    name: "CCNP Enterprise",
    fullName: "Cisco Certified Network Professional — Enterprise",
    level: "Professional",
    color: "violet",
    icon: "🎯",
    examCode: "350-401 (ENCOR) + 1 Concentration",
    duration: "120 min each",
    questions: "90-110 ข้อ",
    passingScore: "825/1000",
    cost: "~$400 USD each",
    validity: "3 ปี",
    description: "ระดับ Professional สำหรับ Network Engineer ที่ต้องการเชี่ยวชาญด้าน Enterprise Network — SD-WAN, Advanced Routing, Automation",
    topics: ["Advanced OSPF/BGP/EIGRP", "SD-WAN", "Network Automation", "Infrastructure Security", "Wireless Architecture", "QoS"],
    relatedExam: "/exam/ccna-routing-switching",
    studyTime: "6-12 เดือน",
    url: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/professional/ccnp-enterprise.html",
  },
  {
    id: "ccnp-security",
    name: "CCNP Security",
    fullName: "Cisco Certified Network Professional — Security",
    level: "Professional",
    color: "rose",
    icon: "🔐",
    examCode: "350-701 (SCOR) + 1 Concentration",
    duration: "120 min each",
    questions: "90-110 ข้อ",
    passingScore: "825/1000",
    cost: "~$400 USD each",
    validity: "3 ปี",
    description: "เชี่ยวชาญด้าน Network Security — Firewall, VPN, IDS/IPS, Cloud Security, Zero Trust Architecture",
    topics: ["Firewall (ASA/FTD)", "VPN (IPsec/SSL)", "IDS/IPS", "Network Security Design", "Cloud Security", "Zero Trust"],
    relatedExam: "/exam/network-security-exam",
    studyTime: "6-12 เดือน",
    url: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/professional/ccnp-security.html",
  },
  {
    id: "ccie",
    name: "CCIE Enterprise",
    fullName: "Cisco Certified Internetwork Expert",
    level: "Expert",
    color: "amber",
    icon: "👑",
    examCode: "350-401 (Written) + Lab Exam (8 hr)",
    duration: "Written 120 min + Lab 8 ชั่วโมง",
    questions: "Written + Practical Lab",
    passingScore: "Pass/Fail (Lab)",
    cost: "~$400 (Written) + ~$1,600 (Lab)",
    validity: "3 ปี",
    description: "Certification ระดับสูงสุดจาก Cisco — ต้องผ่าน Written exam แล้วสอบ Lab จริง 8 ชั่วโมงที่ศูนย์สอบ Cisco",
    topics: ["Expert-level Routing & Switching", "Advanced Automation", "SD-WAN Design", "Network Architecture", "Troubleshooting under pressure"],
    relatedExam: "/exam/bgp-advanced-exam",
    studyTime: "1-2 ปี",
    url: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/expert/ccie-enterprise-infrastructure.html",
  },
  {
    id: "comptia-network",
    name: "CompTIA Network+",
    fullName: "CompTIA Network+",
    level: "Entry",
    color: "emerald",
    icon: "🌐",
    examCode: "N10-008",
    duration: "90 min",
    questions: "Maximum 90 ข้อ",
    passingScore: "720/900",
    cost: "~$358 USD",
    validity: "3 ปี",
    description: "Vendor-neutral certification เหมาะสำหรับผู้เริ่มต้น — ไม่เฉพาะ Cisco ครอบคลุม Networking fundamentals ทุก vendor",
    topics: ["Networking Concepts", "Infrastructure", "Network Operations", "Network Security", "Network Troubleshooting"],
    relatedExam: "/exam/network-fundamentals-exam",
    studyTime: "2-4 เดือน",
    url: "https://www.comptia.org/certifications/network",
  },
];

const levelColor: Record<string, string> = {
  Entry:        "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Professional: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  Expert:       "text-amber-400 bg-amber-500/10 border-amber-500/20",
};

const cardBorder: Record<string, string> = {
  cyan:    "border-cyan-500/20",
  violet:  "border-violet-500/20",
  rose:    "border-rose-500/20",
  amber:   "border-amber-500/20",
  emerald: "border-emerald-500/20",
};

export default function CertificationsPage() {
  return (
    <div className="px-4 md:px-6 py-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white/90">🎓 Certifications</h1>
        <p className="text-xs text-white/35 mt-0.5">ข้อมูล Networking certifications — เส้นทาง, ข้อสอบ, ค่าใช้จ่าย</p>
      </div>

      {/* Path overview */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {["CompTIA Network+", "→", "CCNA", "→", "CCNP", "→", "CCIE"].map((s, i) => (
          <div key={i} className={cn("flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg", s === "→" ? "text-white/15" : "bg-white/[0.04] border border-white/[0.07] text-white/50")}>
            {s}
          </div>
        ))}
        <span className="text-[10px] text-white/20 flex-shrink-0 ml-2">Career path ที่แนะนำ</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certs.map(cert => (
          <div key={cert.id} className={cn("rounded-2xl border bg-white/[0.02] p-5 space-y-4", cardBorder[cert.color])}>
            <div className="flex items-start gap-3">
              <span className="text-3xl">{cert.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <h2 className="text-base font-bold text-white/85">{cert.name}</h2>
                  <span className={cn("text-[9px] px-1.5 py-0.5 rounded-full border font-semibold", levelColor[cert.level])}>
                    {cert.level}
                  </span>
                </div>
                <p className="text-[11px] text-white/30">{cert.fullName}</p>
              </div>
            </div>

            <p className="text-xs text-white/45 leading-relaxed">{cert.description}</p>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {[
                { label: "Exam Code",   value: cert.examCode },
                { label: "Duration",    value: cert.duration },
                { label: "Passing",     value: cert.passingScore },
                { label: "Cost",        value: cert.cost },
                { label: "Validity",    value: cert.validity },
                { label: "Study Time",  value: cert.studyTime },
              ].map(i => (
                <div key={i.label} className="bg-white/[0.03] rounded-lg px-2.5 py-2">
                  <div className="text-white/20 text-[9px] uppercase tracking-wider">{i.label}</div>
                  <div className="text-white/60 font-medium mt-0.5">{i.value}</div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-[10px] text-white/20 uppercase tracking-widest mb-2">Topics covered</p>
              <div className="flex flex-wrap gap-1">
                {cert.topics.map(t => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-white/35 border border-white/[0.06]">{t}</span>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <Link href={cert.relatedExam}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold hover:bg-cyan-500/20 transition-all">
                <Trophy size={12} /> ทดสอบความรู้
              </Link>
              <a href={cert.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 text-white/30 text-xs hover:border-white/20 hover:text-white/55 transition-all">
                <ExternalLink size={12} /> Cisco.com
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
