"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, BookOpen, Cpu, Server, Shield, HardDrive, Wifi, FlaskConical, HelpCircle, ChevronRight, Home } from "lucide-react";

type Track = "foundation" | "ai-infrastructure" | "cloud-ai-ops" | "wireless-mobile" | "security" | "hardware";
type Level = "Beginner" | "Intermediate" | "Advanced" | "Expert";

interface SearchLesson {
  id: string;
  slug: string;
  title: string;
  titleTh: string;
  track: Track;
  level: Level;
  xp: number;
  duration: string;
  tags: string[];
  hasLab: boolean;
  hasQuiz: boolean;
  href: string;
}

const ALL_LESSONS: SearchLesson[] = [
  { id:"found-001", slug:"network-fundamentals", title:"Network Fundamentals", titleTh:"พื้นฐาน Network", track:"foundation", level:"Beginner", xp:75, duration:"45 min", tags:["OSI","TCP/IP","Protocol","LAN","WAN","Bandwidth"], hasLab:true, hasQuiz:true, href:"/foundation/lessons/network-fundamentals" },
  { id:"found-002", slug:"osi-model", title:"OSI Model Deep Dive", titleTh:"OSI Model เชิงลึก", track:"foundation", level:"Beginner", xp:75, duration:"60 min", tags:["OSI","7 Layers","Encapsulation","PDU"], hasLab:true, hasQuiz:true, href:"/foundation/lessons/osi-model" },
  { id:"found-003", slug:"tcpip-model", title:"TCP/IP Model & Protocols", titleTh:"TCP/IP Model และ Protocol", track:"foundation", level:"Beginner", xp:75, duration:"60 min", tags:["TCP","UDP","IP","ICMP","HTTP","HTTPS","DNS"], hasLab:true, hasQuiz:true, href:"/foundation/lessons/tcpip-model" },
  { id:"found-004", slug:"ipv4-addressing", title:"IPv4 Addressing & Subnetting", titleTh:"IPv4 และ Subnetting", track:"foundation", level:"Beginner", xp:100, duration:"75 min", tags:["IPv4","Subnetting","CIDR","VLSM","Broadcast","Netmask"], hasLab:true, hasQuiz:true, href:"/foundation/lessons/ipv4-addressing" },
  { id:"found-005", slug:"vlan", title:"VLAN & Inter-VLAN Routing", titleTh:"VLAN และ Inter-VLAN", track:"foundation", level:"Intermediate", xp:100, duration:"60 min", tags:["VLAN","Trunk","802.1Q","SVI","Router-on-a-Stick"], hasLab:true, hasQuiz:true, href:"/foundation/lessons/vlan" },
  { id:"found-006", slug:"ospf", title:"OSPF Routing Protocol", titleTh:"OSPF Protocol", track:"foundation", level:"Intermediate", xp:125, duration:"90 min", tags:["OSPF","Link-State","SPF","LSA","Area","DR/BDR"], hasLab:true, hasQuiz:true, href:"/foundation/lessons/ospf" },
  { id:"found-007", slug:"bgp-basic", title:"BGP Basic", titleTh:"BGP พื้นฐาน", track:"foundation", level:"Intermediate", xp:125, duration:"90 min", tags:["BGP","eBGP","iBGP","AS","AS Path","Local Preference","MED","ISP"], hasLab:true, hasQuiz:true, href:"/foundation/lessons/bgp-basic" },
  { id:"found-008", slug:"firewall-nat-acl", title:"Firewall, NAT & ACL", titleTh:"Firewall, NAT และ ACL", track:"foundation", level:"Intermediate", xp:100, duration:"75 min", tags:["ACL","NAT","PAT","Firewall","DMZ","Stateful","Zone"], hasLab:true, hasQuiz:true, href:"/foundation/lessons/firewall-nat-acl" },
  { id:"ai-001", slug:"gpu-cluster-networking", title:"GPU Cluster & AI Network Overview", titleTh:"GPU Cluster และ AI Network", track:"ai-infrastructure", level:"Advanced", xp:150, duration:"75 min", tags:["GPU","RDMA","RoCE","InfiniBand","NVLink","AllReduce","NCCL","400G"], hasLab:true, hasQuiz:true, href:"/advanced/lessons/gpu-cluster-networking" },
  { id:"ai-002", slug:"rdma-roce-v2", title:"RDMA / RoCE v2 Deep Dive", titleTh:"RDMA และ RoCE v2", track:"ai-infrastructure", level:"Expert", xp:175, duration:"90 min", tags:["RDMA","RoCE","PFC","ECN","DCQCN","Jumbo Frame","800G","Non-blocking"], hasLab:true, hasQuiz:true, href:"/advanced/lessons/rdma-roce-v2" },
  { id:"cloud-001", slug:"kubernetes-networking-overview", title:"Kubernetes Networking Overview", titleTh:"Kubernetes Networking", track:"cloud-ai-ops", level:"Advanced", xp:125, duration:"75 min", tags:["Kubernetes","CNI","NetworkPolicy","CoreDNS","kube-proxy","ClusterIP","Ingress"], hasLab:true, hasQuiz:true, href:"/advanced/lessons/kubernetes-networking-overview" },
  { id:"cloud-002", slug:"cni-deep-dive-calico-cilium", title:"CNI Deep Dive: Calico vs Cilium vs Flannel", titleTh:"CNI Deep Dive", track:"cloud-ai-ops", level:"Advanced", xp:150, duration:"90 min", tags:["CNI","Calico","Cilium","Flannel","BGP","VXLAN","eBPF","NetworkPolicy"], hasLab:true, hasQuiz:true, href:"/advanced/lessons/cni-deep-dive-calico-cilium" },
  { id:"cloud-003", slug:"ebpf-xdp", title:"eBPF / XDP Deep Dive", titleTh:"eBPF และ XDP", track:"cloud-ai-ops", level:"Expert", xp:175, duration:"90 min", tags:["eBPF","XDP","BPF Map","Verifier","JIT","Cilium","Hubble","Kernel","Performance"], hasLab:true, hasQuiz:true, href:"/advanced/lessons/ebpf-xdp" },
  { id:"wireless-001", slug:"wifi7-802-11be", title:"Wi-Fi 7 (802.11be) Architecture", titleTh:"Wi-Fi 7 Architecture", track:"wireless-mobile", level:"Advanced", xp:150, duration:"75 min", tags:["Wi-Fi 7","MLO","320MHz","4096-QAM","6GHz","WPA3","802.11be"], hasLab:false, hasQuiz:true, href:"/advanced/lessons/wifi7-802-11be" },
  { id:"sec-001", slug:"sase-zero-trust", title:"SASE & Zero Trust Network", titleTh:"SASE และ Zero Trust", track:"security", level:"Advanced", xp:150, duration:"75 min", tags:["SASE","ZTNA","Zero Trust","SWG","CASB","FWaaS","DLP","Identity"], hasLab:false, hasQuiz:true, href:"/advanced/lessons/sase-zero-trust" },
  { id:"hw-cab-001", slug:"cabling-connectors", title:"Cabling & Connectors", titleTh:"สาย Cable และ Connector", track:"hardware", level:"Beginner", xp:75, duration:"45 min", tags:["Cat6A","Cat8","OS2","OM4","SFP+","QSFP28","DAC","AOC","MPO","Fiber"], hasLab:true, hasQuiz:true, href:"/hardware/lessons/cabling-connectors" },
  { id:"hw-sw-001", slug:"switch-hardware", title:"Switch Hardware & Architecture", titleTh:"Switch Hardware", track:"hardware", level:"Intermediate", xp:125, duration:"60 min", tags:["Switch","ASIC","TCAM","Buffer","PoE","Spine-Leaf","MLAG","Stacking"], hasLab:true, hasQuiz:true, href:"/hardware/lessons/switch-hardware" },
  { id:"hw-ai-001", slug:"ai-gpu-infrastructure", title:"AI/GPU Infrastructure Hardware", titleTh:"AI GPU Hardware", track:"hardware", level:"Expert", xp:200, duration:"90 min", tags:["GPU","NVLink","NVSwitch","PCIe","RDMA NIC","SmartNIC","DPU","InfiniBand","400G","BMC"], hasLab:true, hasQuiz:true, href:"/hardware/lessons/ai-gpu-infrastructure" },
];

interface TrackConfig {
  label: string;
  color: string;
  bg: string;
}

const TRACK_CONFIG: Record<Track, TrackConfig> = {
  "foundation":        { label:"Foundation",            color:"text-cyan-400",   bg:"bg-cyan-500/15"    },
  "ai-infrastructure": { label:"AI Infrastructure",     color:"text-violet-400", bg:"bg-violet-500/15"  },
  "cloud-ai-ops":      { label:"Cloud Native & AI Ops", color:"text-sky-400",    bg:"bg-sky-500/15"     },
  "wireless-mobile":   { label:"Wireless & Mobile",     color:"text-emerald-400",bg:"bg-emerald-500/15" },
  "security":          { label:"Modern Security",       color:"text-rose-400",   bg:"bg-rose-500/15"    },
  "hardware":          { label:"Hardware",              color:"text-amber-400",  bg:"bg-amber-500/15"   },
};

const LEVEL_COLOR: Record<Level, string> = {
  Beginner:     "text-emerald-400 bg-emerald-500/10",
  Intermediate: "text-sky-400 bg-sky-500/10",
  Advanced:     "text-violet-400 bg-violet-500/10",
  Expert:       "text-rose-400 bg-rose-500/10",
};

const TRACK_ICON: Record<Track, React.ReactNode> = {
  "foundation":        <BookOpen size={11}/>,
  "ai-infrastructure": <Cpu size={11}/>,
  "cloud-ai-ops":      <Server size={11}/>,
  "wireless-mobile":   <Wifi size={11}/>,
  "security":          <Shield size={11}/>,
  "hardware":          <HardDrive size={11}/>,
};

const ALL_TRACKS: (Track | "all")[] = ["all","foundation","ai-infrastructure","cloud-ai-ops","wireless-mobile","security","hardware"];
const ALL_LEVELS: (Level | "all")[] = ["all","Beginner","Intermediate","Advanced","Expert"];

export default function SearchPage() {
  const [query, setQuery]       = useState("");
  const [track, setTrack]       = useState<Track | "all">("all");
  const [level, setLevel]       = useState<Level | "all">("all");
  const [onlyLab, setOnlyLab]   = useState(false);
  const [onlyQuiz, setOnlyQuiz] = useState(false);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return ALL_LESSONS.filter((l) => {
      if (track !== "all" && l.track !== track) return false;
      if (level !== "all" && l.level !== level) return false;
      if (onlyLab  && !l.hasLab)  return false;
      if (onlyQuiz && !l.hasQuiz) return false;
      if (!q) return true;
      return (
        l.title.toLowerCase().includes(q) ||
        l.titleTh.includes(q) ||
        l.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, track, level, onlyLab, onlyQuiz]);

  const totalXp = results.reduce((s, l) => s + l.xp, 0);

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Header + Home button */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Search Lessons</h1>
          <p className="text-sm text-white/40 mt-1">
            ค้นหา Lesson จาก Foundation, Advanced และ Hardware — {ALL_LESSONS.length} บทเรียน
          </p>
        </div>
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/40 hover:text-white hover:border-white/20 hover:bg-white/[0.07] transition-all text-xs font-medium flex-shrink-0"
        >
          <Home size={13} />
          <span>หน้าหลัก</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ค้นหาชื่อ Lesson, Tag เช่น BGP, eBPF, RDMA, Kubernetes..."
          className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Track Filters */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="flex flex-wrap gap-1.5">
          {ALL_TRACKS.map((t) => (
            <button
              key={t}
              onClick={() => setTrack(t)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all border ${
                track === t
                  ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300"
                  : "bg-white/[0.04] border-white/[0.08] text-white/40 hover:text-white/60"
              }`}
            >
              {t === "all" ? "All Tracks" : TRACK_CONFIG[t as Track].label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 sm:ml-auto">
          {ALL_LEVELS.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all border ${
                level === l
                  ? "bg-violet-500/20 border-violet-500/50 text-violet-300"
                  : "bg-white/[0.04] border-white/[0.08] text-white/40 hover:text-white/60"
              }`}
            >
              {l === "all" ? "All Levels" : l}
            </button>
          ))}
        </div>
      </div>

      {/* Toggle Filters */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setOnlyLab(!onlyLab)}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div className={`w-8 h-4 rounded-full transition-colors relative ${onlyLab ? "bg-cyan-500" : "bg-white/10"}`}>
            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${onlyLab ? "left-4" : "left-0.5"}`} />
          </div>
          <FlaskConical size={12} className="text-white/40" />
          <span className="text-[12px] text-white/50">Has Lab</span>
        </button>
        <button
          onClick={() => setOnlyQuiz(!onlyQuiz)}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div className={`w-8 h-4 rounded-full transition-colors relative ${onlyQuiz ? "bg-violet-500" : "bg-white/10"}`}>
            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${onlyQuiz ? "left-4" : "left-0.5"}`} />
          </div>
          <HelpCircle size={12} className="text-white/40" />
          <span className="text-[12px] text-white/50">Has Quiz</span>
        </button>
        <div className="ml-auto text-[12px] text-white/35">
          {results.length} บทเรียน · {totalXp.toLocaleString()} XP
        </div>
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Search size={32} className="text-white/15" />
          <p className="text-white/40 text-sm">ไม่พบบทเรียนที่ตรงกับเงื่อนไข</p>
          <button
            onClick={() => { setQuery(""); setTrack("all"); setLevel("all"); setOnlyLab(false); setOnlyQuiz(false); }}
            className="text-[12px] text-cyan-400 hover:underline"
          >
            ล้าง Filter ทั้งหมด
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {results.map((lesson) => {
            const tc = TRACK_CONFIG[lesson.track];
            return (
              <Link
                key={lesson.id}
                href={lesson.href}
                className="group flex flex-col gap-3 rounded-xl p-4 bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${tc.bg} ${tc.color}`}>
                    {TRACK_ICON[lesson.track]}
                    {tc.label}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${LEVEL_COLOR[lesson.level]}`}>
                    {lesson.level}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/85 group-hover:text-white leading-snug">{lesson.title}</p>
                  <p className="text-[11px] text-white/35 mt-0.5">{lesson.titleTh}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {lesson.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 rounded text-[10px] bg-white/[0.06] text-white/40">{tag}</span>
                  ))}
                  {lesson.tags.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/[0.04] text-white/25">+{lesson.tags.length - 4}</span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/[0.05]">
                  <div className="flex items-center gap-3 text-[11px] text-white/30">
                    <span>{lesson.duration}</span>
                    <span className="text-cyan-400/70 font-semibold">+{lesson.xp} XP</span>
                    {lesson.hasLab  && <span className="flex items-center gap-0.5"><FlaskConical size={10}/> Lab</span>}
                    {lesson.hasQuiz && <span className="flex items-center gap-0.5"><HelpCircle size={10}/> Quiz</span>}
                  </div>
                  <ChevronRight size={13} className="text-white/25 group-hover:text-white/60 transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
