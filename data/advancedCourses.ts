import type { Lesson, TrackInfo } from "@/types/course";

// ─── Helper factories ─────────────────────────────────────────────
const makeQ = (q: string, c: string[], a: string, e: string) => ({ question: q, choices: c, answer: a, explanation: e });
const makeI = (l: "Junior" | "Mid" | "Senior", q: string, a: string) => ({ level: l, question: q, answerGuide: a });

// ═════════════════════════════════════════════════════════════════
// TRACK 1: AI INFRASTRUCTURE NETWORKING
// ═════════════════════════════════════════════════════════════════

const aiInfraOverview: Lesson = {
  id: "ai-001",
  slug: "ai-infrastructure-overview",
  title: "AI/ML Infrastructure Networking Overview",
  titleTh: "ภาพรวม AI Infrastructure Networking",
  track: "ai-infrastructure",
  category: "overview",
  level: "Advanced",
  duration: "60 min",
  xp: 100,
  description: "เรียนรู้ว่า Network ใน AI Data Center ต่างจาก Enterprise Network อย่างไร — GPU Cluster, East-West Traffic, Low Latency Requirements",
  objectives: [
    "อธิบาย Architecture ของ AI Training Cluster ได้",
    "เข้าใจ East-West Traffic Pattern ใน GPU Cluster",
    "อธิบายความแตกต่างระหว่าง Training vs Inference Network Requirements",
    "ระบุ Key Technologies: RDMA, RoCE, InfiniBand",
  ],
  prerequisites: ["ospf", "vlan"],
  concepts: ["GPU Cluster", "Training vs Inference", "East-West Traffic", "RDMA", "RoCE", "InfiniBand", "Low Latency", "High Throughput", "AllReduce", "NCCL", "Non-blocking Fabric"],
  mermaidDiagram: `graph TB
    subgraph GPUCluster["GPU Cluster (32 Nodes)"]
      subgraph LeafA["Leaf Switch A"]
        N1["GPU Node 1"] & N2["GPU Node 2"] & N3["GPU Node 3"] & N4["GPU Node 4"]
      end
      subgraph LeafB["Leaf Switch B"]
        N5["GPU Node 5"] & N6["GPU Node 6"] & N7["GPU Node 7"] & N8["GPU Node 8"]
      end
      Spine1["Spine Switch 1 (400G)"]
      Spine2["Spine Switch 2 (400G)"]
      LeafA --> Spine1 & Spine2
      LeafB --> Spine1 & Spine2
    end
    Spine1 & Spine2 --> Storage["Parallel Storage"]
    Spine1 --> Mgmt["Management Network"]`,
  trafficFlow: [
    "GPU Nodes ทำ AllReduce — แลกเปลี่ยน Gradient ระหว่างทุก Node",
    "Traffic เป็น Many-to-Many East-West ใน Cluster",
    "ใช้ RDMA เพื่อ bypass CPU และลด Latency",
    "ECMP + Non-blocking Fabric ป้องกัน Congestion",
    "PFC (Priority Flow Control) ป้องกัน Packet Drop ใน RoCE",
  ],
  commands: [
    { command: "ibstat", description: "ดู InfiniBand HCA Status" },
    { command: "ibping -S && ibping <LID>", description: "ทดสอบ InfiniBand Connectivity" },
    { command: "ib_send_bw", description: "Test InfiniBand Bandwidth" },
    { command: "rping -s && rping -c <ip>", description: "Test RDMA Connectivity" },
    { command: "perfquery", description: "ดู InfiniBand Port Counters" },
  ],
  labs: [
    {
      title: "AI Fabric Design Workshop",
      level: "Advanced",
      estimatedMinutes: 90,
      steps: [
        "กำหนด Requirement: 8 GPU Nodes, 400G Links, Non-blocking",
        "ออกแบบ Leaf-Spine Topology",
        "คำนวณ Oversubscription Ratio",
        "วาง RDMA/RoCE Network vs InfiniBand เปรียบเทียบ",
        "สร้าง IP Plan สำหรับ GPU Fabric, Storage Network, Management Network",
        "เขียน PFC + ECN Config สำหรับ RoCE",
      ],
      verification: ["Design Non-blocking fabric ได้", "Oversubscription = 1:1 สำหรับ GPU fabric", "PFC ทำงานถูกต้อง"],
    },
  ],
  troubleshooting: [
    { symptom: "GPU Training ช้าผิดปกติ", possibleCause: "Network Congestion, PFC Storm, หรือ Imbalanced Traffic บน ECMP", check: "ดู Switch Counters, InfiniBand Errors, NCCL Debug Log", fix: "ตรวจสอบ ECN Config, แก้ ECMP Hash, ปรับ PFC threshold" },
    { symptom: "RDMA Latency สูงกว่าปกติ", possibleCause: "MTU mismatch, หรือ Path ไม่ optimal", check: "ib_send_lat, ตรวจ MTU ทุก Interface", fix: "Set MTU 9000 (Jumbo Frame), ตรวจ ECMP Path" },
  ],
  quiz: [
    makeQ("AllReduce ใน GPU Training คืออะไร?", ["รวม Result จาก GPU", "แลกเปลี่ยน Gradient ระหว่างทุก GPU Node", "Load Balancing ระหว่าง GPU", "Backup Gradient"], "แลกเปลี่ยน Gradient ระหว่างทุก GPU Node", "AllReduce คือ Collective Communication Operation ที่ GPU Node ทุกตัวส่งและรับ Gradient พร้อมกัน ใช้ใน Distributed Training"),
    makeQ("RoCE ย่อมาจากอะไร?", ["Remote over Converged Ethernet", "RDMA over Converged Ethernet", "Routing over Converged Ethernet", "Relay over Converged Ethernet"], "RDMA over Converged Ethernet", "RoCE = RDMA over Converged Ethernet ทำให้ Ethernet รองรับ RDMA ได้ ต้องใช้ Lossless Ethernet + PFC"),
    makeQ("PFC ใน RoCE Network ใช้ทำอะไร?", ["Encrypt Traffic", "ป้องกัน Packet Drop บน Lossless Ethernet", "Balance Load", "Monitor Bandwidth"], "ป้องกัน Packet Drop บน Lossless Ethernet", "PFC (Priority Flow Control) ส่ง Pause Frame เพื่อหยุด Traffic ชั่วคราวก่อน Buffer เต็ม — ป้องกัน Packet Drop ที่ทำให้ RDMA ล้มเหลว"),
    makeQ("ทำไม GPU Cluster ถึงต้องการ Non-blocking Fabric?", ["เพื่อลด Cost", "เพื่อให้ Bandwidth เต็มทุก Path พร้อมกัน ไม่มี Oversubscription", "เพื่อเพิ่ม Security", "เพื่อลด Latency เล็กน้อย"], "เพื่อให้ Bandwidth เต็มทุก Path พร้อมกัน ไม่มี Oversubscription", "Non-blocking = ทุก Port ส่งได้เต็ม Rate พร้อมกัน Oversubscription 1:1 — สำคัญมากสำหรับ AllReduce ที่ต้องการ Bisection Bandwidth สูง"),
    makeQ("400G Switch ใช้ Transceiver ชนิดใด?", ["SFP28", "QSFP28", "QSFP-DD / OSFP", "SFP+"], "QSFP-DD / OSFP", "400G ต้องใช้ QSFP-DD (Quad Small Form-factor Double Density) หรือ OSFP (Octal SFP) ซึ่งมี 8 Lane ที่ 50G/lane"),
  ],
  interviewQuestions: [
    makeI("Mid", "อธิบายความแตกต่างระหว่าง RDMA, RoCE, InfiniBand", "RDMA = Technology ที่ให้ NIC transfer data โดย bypass CPU; RoCE = RDMA บน Ethernet (ต้องการ Lossless); InfiniBand = Separate Network Fabric ที่ออกแบบมาสำหรับ RDMA โดยเฉพาะ Latency ต่ำกว่า RoCE แต่ Ecosystem เล็กกว่า"),
    makeI("Senior", "ออกแบบ GPU Fabric สำหรับ 256 GPU Node อย่างไร?", "ใช้ 2-tier Leaf-Spine: Leaf switch แต่ละตัวเชื่อม 16-32 GPU Node ด้วย 400G; Spine ทำ Full Mesh หรือ High-radix; Total Bisection Bandwidth = Number of GPUs × GPU NIC Bandwidth; ใช้ ECMP, PFC, ECN/DCQCN"),
  ],
  portfolioTask: {
    title: "AI GPU Fabric Design for 32 Nodes",
    description: "ออกแบบ GPU Cluster Network สำหรับ 32 GPU Nodes",
    deliverables: ["Architecture Diagram", "GPU Node Design", "Leaf-Spine Design", "RDMA/RoCE Checklist", "Cabling Plan", "Monitoring Plan", "Troubleshooting Runbook", "GitHub README.md"],
  },
  tags: ["AI", "GPU", "RDMA", "RoCE", "InfiniBand", "NVLink", "Spine-Leaf", "400G"],
  order: 1,
};

const rdmaRoce: Lesson = {
  id: "ai-002",
  slug: "rdma-roce",
  title: "RDMA & RoCE Deep Dive",
  titleTh: "RDMA และ RoCE แบบละเอียด",
  track: "ai-infrastructure",
  category: "rdma",
  level: "Advanced",
  duration: "75 min",
  xp: 125,
  description: "เรียนรู้ RDMA, RoCE v1/v2, Lossless Ethernet, PFC, ECN, DCQCN Configuration",
  objectives: [
    "อธิบาย RDMA ทำงานอย่างไรและ Benefit",
    "ระบุความแตกต่าง RoCE v1 vs v2",
    "Config Lossless Ethernet + PFC สำหรับ RoCE",
    "ใช้ ECN/DCQCN สำหรับ Congestion Control",
  ],
  prerequisites: ["ai-infrastructure-overview"],
  concepts: ["RDMA", "RNIC", "RDMA NIC", "RoCE v1", "RoCE v2", "Lossless Ethernet", "PFC", "ECN", "DCQCN", "Congestion Control", "PAUSE Frame", "CoS", "DSCP"],
  mermaidDiagram: `sequenceDiagram
    participant SEND as Sender App
    participant SRNIC as RDMA NIC (Src)
    participant NET as Network
    participant DRNIC as RDMA NIC (Dst)
    participant RECV as Receiver App
    SEND->>SRNIC: Post Send Request (bypass kernel)
    SRNIC->>NET: RDMA Write (DMA from memory)
    NET->>DRNIC: Deliver Packet
    DRNIC->>RECV: Data in Memory (no CPU interrupt)
    Note over SEND,RECV: Zero-copy, Kernel bypass, ~1μs latency`,
  commands: [
    { command: "lspci | grep -i infiniband", description: "ดู RDMA NIC ที่ติดตั้ง" },
    { command: "ibv_devinfo", description: "ดู RDMA Device Info" },
    { command: "ib_send_bw -d mlx5_0 -a", description: "Test RDMA Bandwidth" },
    { command: "ib_send_lat -d mlx5_0", description: "Test RDMA Latency" },
  ],
  labs: [
    {
      title: "RoCE PFC Configuration Lab",
      level: "Advanced",
      estimatedMinutes: 60,
      steps: [
        "Config Switch สำหรับ Lossless Ethernet",
        "Enable PFC บน Priority 3 (สำหรับ RoCE Traffic)",
        "Config ECN บน Interface",
        "Set DSCP marking สำหรับ RoCE packets",
        "ทดสอบ ib_send_bw ก่อน/หลัง Config",
        "ตรวจสอบ PFC Pause Frame ใน Switch Counters",
      ],
      verification: ["ไม่มี Packet Drop บน RoCE Interface", "PFC Pause Frames ทำงาน", "Bandwidth ใกล้เคียง Line Rate"],
    },
  ],
  troubleshooting: [
    { symptom: "RoCE Packet Drop สูง", possibleCause: "PFC ไม่ได้ Enable หรือ Config ผิด", check: "show interface counters errors, ดู PFC stats", fix: "Enable PFC บน Priority ที่ถูกต้อง, ตรวจ CoS/DSCP mapping" },
    { symptom: "RDMA Bandwidth ต่ำกว่าที่คาดไว้", possibleCause: "MTU ไม่ได้ Set เป็น 9000, หรือ CPU bottleneck", check: "ip link show (MTU), sar -n DEV", fix: "Set MTU 9000 (Jumbo Frame), ตรวจ NUMA affinity" },
  ],
  quiz: [
    makeQ("RDMA ข้อดีหลักคืออะไร?", ["เพิ่ม Security", "ลด CPU Usage และ Latency", "ลด Bandwidth", "เพิ่ม Hop Count"], "ลด CPU Usage และ Latency", "RDMA bypass Kernel และ CPU ใน Data Path ทำให้ Latency ต่ำมาก (~1μs) และ CPU ไม่ต้องทำงาน"),
    makeQ("RoCE v2 ต่างจาก v1 อย่างไร?", ["ใช้ IPv6 แทน IPv4", "Routable ได้ผ่าน IP Network (ใช้ UDP/IP)", "เร็วกว่า 2 เท่า", "ไม่ต้องการ PFC"], "Routable ได้ผ่าน IP Network (ใช้ UDP/IP)", "RoCE v1 ทำงานที่ Layer 2 เท่านั้น; RoCE v2 ใช้ UDP/IP จึง Routable ข้าม Subnet ได้"),
    makeQ("PFC Priority ใดที่ปกติใช้สำหรับ RoCE Traffic?", ["Priority 0", "Priority 3", "Priority 7", "Priority 1"], "Priority 3", "Convention ทั่วไปคือใช้ PFC Priority 3 สำหรับ RoCE (CoS 3) แต่อาจต่างกันตาม Vendor"),
    makeQ("ECN ใน RoCE Network ทำหน้าที่อะไร?", ["Encrypt Traffic", "Mark Packets เมื่อ Buffer เริ่มเต็ย ก่อน Drop", "Balance Load", "Compress Data"], "Mark Packets เมื่อ Buffer เริ่มเต็ย ก่อน Drop", "ECN (Explicit Congestion Notification) แจ้ง Sender ให้ลด Rate ก่อนที่ Buffer จะ Full — ดีกว่าปล่อยให้ Drop"),
    makeQ("Jumbo Frame คือ MTU เท่าไร?", ["1500 bytes", "4096 bytes", "9000 bytes", "65535 bytes"], "9000 bytes", "Jumbo Frame = MTU 9000 bytes สำคัญสำหรับ RDMA/RoCE เพื่อลด Overhead ต่อ Packet"),
  ],
  interviewQuestions: [
    makeI("Senior", "อธิบาย DCQCN Algorithm และทำงานอย่างไร?", "DCQCN (Data Center Quantized Congestion Notification) = Congestion Control สำหรับ RoCE: Switch ทำ ECN marking → Receiver ส่ง CNP (Congestion Notification Packet) → Sender ลด Rate → เมื่อ Congestion หาย Sender ค่อยๆ เพิ่ม Rate ขึ้น"),
  ],
  tags: ["RDMA", "RoCE", "PFC", "ECN", "Lossless", "AI", "GPU"],
  order: 2,
};

// ═════════════════════════════════════════════════════════════════
// TRACK 2: CLOUD NATIVE & AI OPS
// ═════════════════════════════════════════════════════════════════

const k8sNetworking: Lesson = {
  id: "cloud-001",
  slug: "kubernetes-networking-overview",
  title: "Kubernetes Networking Overview",
  titleTh: "ภาพรวม Kubernetes Networking",
  track: "cloud-ai-ops",
  category: "kubernetes",
  level: "Advanced",
  duration: "75 min",
  xp: 125,
  description: "เรียนรู้ Kubernetes Network Model ตั้งแต่ Pod IP, Service, Ingress จนถึง CNI และ NetworkPolicy",
  objectives: [
    "อธิบาย Kubernetes Network Model ได้",
    "เข้าใจ Pod-to-Pod, Pod-to-Service, External Traffic Flow",
    "อธิบาย CNI Plugin ทำอะไร",
    "เขียน NetworkPolicy เบื้องต้นได้",
  ],
  prerequisites: ["ai-infrastructure-overview"],
  concepts: ["Pod IP", "Node IP", "Cluster IP", "Service IP", "CoreDNS", "kube-proxy", "CNI", "NetworkPolicy", "ClusterIP", "NodePort", "LoadBalancer", "Ingress"],
  mermaidDiagram: `graph LR
    subgraph Node1 ["Node 1 (10.0.1.10)"]
      P1["Pod A\n10.244.0.2"]
      P2["Pod B\n10.244.0.3"]
      KP1["kube-proxy\niptables/IPVS"]
    end
    subgraph Node2 ["Node 2 (10.0.1.11)"]
      P3["Pod C\n10.244.1.2"]
      KP2["kube-proxy"]
    end
    SVC["Service\n10.96.0.100:80\n(ClusterIP)"]
    ING["Ingress\n(LoadBalancer IP)"]
    P1 --> P3
    ING --> SVC --> P1 & P3`,
  yamlExamples: [
    {
      title: "NetworkPolicy — Allow only specific Pod",
      code: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-only
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 8080`,
      description: "อนุญาตเฉพาะ Pod ที่ label app=frontend เข้าถึง backend Port 8080",
    },
  ],
  commands: [
    { command: "kubectl get pods -o wide", description: "ดู Pod IPs ทุก Pod" },
    { command: "kubectl get svc -A", description: "ดู Service ทุกตัว" },
    { command: "kubectl exec -it <pod> -- nslookup kubernetes.default", description: "ทดสอบ DNS ใน Pod" },
    { command: "kubectl get networkpolicy -A", description: "ดู NetworkPolicy ทั้งหมด" },
    { command: "kubectl run test --image=busybox --rm -it -- sh", description: "Run Pod ชั่วคราวเพื่อ Debug" },
  ],
  labs: [
    {
      title: "Kubernetes Network Debugging",
      level: "Advanced",
      estimatedMinutes: 60,
      steps: [
        "Deploy 2 Pod (frontend, backend) ใน namespace production",
        "ทดสอบ Pod-to-Pod Connectivity",
        "สร้าง ClusterIP Service สำหรับ backend",
        "ทดสอบ DNS resolution ด้วย nslookup/dig",
        "สร้าง NetworkPolicy ที่จำกัดเฉพาะ frontend → backend",
        "ทดสอบว่า Policy บล็อกถูกต้อง",
      ],
      verification: ["frontend pod ถึง backend ได้", "pod อื่นถึง backend ไม่ได้", "DNS ทำงานปกติ"],
    },
  ],
  troubleshooting: [
    { symptom: "Pod ถึง Service ไม่ได้", possibleCause: "kube-proxy ผิดพลาด, Service Selector ไม่ match, หรือ NetworkPolicy บล็อก", check: "kubectl get endpoints <svc>, kubectl describe svc, kubectl get netpol", fix: "ตรวจ Label Selector บน Service, ตรวจ NetworkPolicy" },
    { symptom: "DNS ไม่ทำงานใน Pod", possibleCause: "CoreDNS Pod ล้ม หรือ Network ปัญหา", check: "kubectl get pods -n kube-system, kubectl logs -n kube-system <coredns>", fix: "Restart CoreDNS, ตรวจ CNI Plugin" },
  ],
  quiz: [
    makeQ("kube-proxy ทำหน้าที่อะไร?", ["Route traffic ระหว่าง Node", "Implement Service routing ด้วย iptables/IPVS", "Manage Pod lifecycle", "Assign IP ให้ Pod"], "Implement Service routing ด้วย iptables/IPVS", "kube-proxy แปลง ClusterIP → Pod IP ด้วย iptables หรือ IPVS rules บนทุก Node"),
    makeQ("CNI Plugin ทำหน้าที่อะไร?", ["Encrypt Pod Traffic", "Assign IP ให้ Pod และ Setup Pod Network", "Manage Service Discovery", "Load Balance Traffic"], "Assign IP ให้ Pod และ Setup Pod Network", "CNI (Container Network Interface) Plugin จัดการ Pod IP Allocation และ Network Interface Setup เช่น Calico, Cilium, Flannel"),
    makeQ("ClusterIP Service เข้าถึงได้จากที่ใด?", ["Internet โดยตรง", "เฉพาะภายใน Cluster", "เฉพาะ Node เดียวกัน", "ทุกที่ที่มี VPN"], "เฉพาะภายใน Cluster", "ClusterIP เป็น Virtual IP ที่ใช้งานได้เฉพาะภายใน Kubernetes Cluster ไม่สามารถเข้าถึงจากภายนอกได้"),
    makeQ("NetworkPolicy ใช้ทำอะไร?", ["Encrypt traffic ระหว่าง Pod", "Control traffic flow ระหว่าง Pod", "Scale Pod โดยอัตโนมัติ", "Assign IP ให้ Pod"], "Control traffic flow ระหว่าง Pod", "NetworkPolicy กำหนดว่า Pod ไหนคุยกับ Pod ไหนได้ — ทำงานคล้าย Firewall Rule ระดับ Pod"),
    makeQ("Cilium แตกต่างจาก Flannel อย่างไร?", ["Cilium ใช้ VXLAN, Flannel ใช้ BGP", "Cilium ใช้ eBPF แทน iptables, มี Network Observability ใน Hubble", "Flannel รองรับ NetworkPolicy, Cilium ไม่รองรับ", "ไม่ต่างกัน"], "Cilium ใช้ eBPF แทน iptables, มี Network Observability ใน Hubble", "Cilium ใช้ eBPF ทำงาน Kernel Level — Performance สูงกว่า iptables + มี Hubble สำหรับ Observability"),
  ],
  interviewQuestions: [
    makeI("Mid", "อธิบาย Kubernetes Network Requirements ทั้ง 3 ข้อ", "1) ทุก Pod คุยกับทุก Pod ได้โดยไม่ต้องทำ NAT; 2) Node คุยกับ Pod ได้โดยไม่ต้อง NAT; 3) Pod เห็น IP ตัวเองตรงกับที่ Node อื่นเห็น"),
    makeI("Senior", "เลือก CNI Plugin อย่างไร?", "พิจารณา: 1) Scale (Node/Pod count); 2) NetworkPolicy support; 3) Observability ต้องการไหม (Hubble/Cilium); 4) BGP integration ต้องการไหม (Calico); 5) eBPF performance; 6) Cloud Provider support"),
  ],
  portfolioTask: {
    title: "Kubernetes Network Observability Lab",
    description: "สร้าง Kubernetes Cluster พร้อม Observability ครบชุด",
    deliverables: ["Kubernetes Network Diagram", "CNI Selection Justification", "NetworkPolicy Design", "Observability Pipeline (Prometheus+Grafana+Hubble)", "Troubleshooting Playbook"],
  },
  tags: ["Kubernetes", "CNI", "Calico", "Cilium", "eBPF", "NetworkPolicy", "Service", "Ingress"],
  order: 1,
};

// ═════════════════════════════════════════════════════════════════
// TRACK 3: WIRELESS & MOBILE
// ═════════════════════════════════════════════════════════════════

const wifi7: Lesson = {
  id: "wireless-001",
  slug: "wifi7-802-11be",
  title: "Wi-Fi 7 (802.11be)",
  titleTh: "Wi-Fi 7 และ 802.11be",
  track: "wireless-mobile",
  category: "wifi",
  level: "Advanced",
  duration: "60 min",
  xp: 100,
  description: "เรียนรู้ Wi-Fi 7 Features ที่สำคัญ — MLO, 320 MHz Channel, 4096-QAM, Multi-RU เปรียบเทียบกับ Wi-Fi 6/6E",
  objectives: [
    "อธิบาย Wi-Fi 7 Key Features ได้",
    "เปรียบเทียบ Wi-Fi 5/6/6E/7 ได้",
    "อธิบาย Multi-Link Operation (MLO) ทำงานอย่างไร",
    "ออกแบบ Enterprise Wi-Fi 7 Deployment ได้",
  ],
  prerequisites: [],
  concepts: ["Wi-Fi 7", "802.11be", "MLO", "320 MHz", "4096-QAM", "Multi-RU", "6 GHz", "Preamble Puncturing", "OFDMA", "MU-MIMO", "WPA3"],
  mermaidDiagram: `graph LR
    subgraph Client["Wi-Fi 7 Client"]
      R1["Radio 1 (6GHz)"] 
      R2["Radio 2 (5GHz)"]
    end
    subgraph AP["Wi-Fi 7 AP (MLO)"]
      L1["Link 1 (6GHz\n320MHz)"]
      L2["Link 2 (5GHz\n160MHz)"]
    end
    R1 <-->|"Link 1 (High BW)"| L1
    R2 <-->|"Link 2 (Fallback)"| L2
    Note["MLO: ใช้ทั้ง 2 Links พร้อมกัน\nAggregate Bandwidth + Low Latency"]`,
  labs: [
    {
      title: "Wi-Fi 7 Planning Workshop",
      level: "Advanced",
      estimatedMinutes: 60,
      steps: [
        "กำหนด Use Case: Office 500 Users, High-density",
        "เลือก Frequency Band (2.4/5/6 GHz)",
        "วาง Channel Plan สำหรับ 6 GHz (320 MHz)",
        "กำหนด AP Placement และ Coverage",
        "Config SSID: WPA3-Enterprise + 802.1X",
        "Plan SSID-to-VLAN Mapping",
        "เขียน Roaming Plan (802.11r Fast Transition)",
      ],
      verification: ["Channel Plan ไม่ Overlap บน 6 GHz", "Coverage ทุกพื้นที่ > -70 dBm", "MLO Enabled บน Enterprise AP"],
    },
  ],
  troubleshooting: [
    { symptom: "Client เชื่อม Wi-Fi 7 ได้แต่ Speed ต่ำ", possibleCause: "Client ไม่รองรับ MLO, หรือ 6 GHz Channel ถูก DFS Block", check: "ตรวจ Client Wi-Fi 7 Capability, ดู Channel Utilization", fix: "ใช้ Static Non-DFS Channel บน 6 GHz, ตรวจ Client Driver" },
  ],
  quiz: [
    makeQ("Wi-Fi 7 Channel Width สูงสุดบน 6 GHz คือ?", ["80 MHz", "160 MHz", "240 MHz", "320 MHz"], "320 MHz", "Wi-Fi 7 (802.11be) รองรับ 320 MHz Channel Width บน 6 GHz Band ทำให้ Throughput สูงมาก"),
    makeQ("MLO ใน Wi-Fi 7 ย่อมาจากอะไร?", ["Multi-Layer Operation", "Multi-Link Operation", "Multi-Level Optimization", "Mobile Link Operation"], "Multi-Link Operation", "MLO = Multi-Link Operation ให้ Client ส่งและรับข้อมูลบนหลาย Band/Channel พร้อมกัน เพิ่ม Throughput + ลด Latency"),
    makeQ("Wi-Fi 7 Modulation สูงสุดคือ?", ["256-QAM", "1024-QAM", "2048-QAM", "4096-QAM"], "4096-QAM", "Wi-Fi 7 รองรับ 4096-QAM (12 bits/symbol) เพิ่มขึ้นจาก Wi-Fi 6 ที่ 1024-QAM (10 bits/symbol) — ความเร็วสูงขึ้น 20%"),
    makeQ("Preamble Puncturing ใน Wi-Fi 7 ทำอะไร?", ["เพิ่ม Security", "ข้ามส่วนของ Channel ที่มี Interference ได้", "ลด Latency", "เพิ่ม Range"], "ข้ามส่วนของ Channel ที่มี Interference ได้", "Preamble Puncturing ให้ AP ใช้ Channel กว้างๆ แต่ข้าม Sub-channel ที่มี Interference ได้ — ใช้ 320 MHz ได้แม้บางส่วนมี Occupied"),
    makeQ("WPA3-Enterprise ใช้ Authentication แบบใด?", ["Username/Password เท่านั้น", "802.1X + EAP + RADIUS", "Pre-shared Key", "MAC Address Filtering"], "802.1X + EAP + RADIUS", "WPA3-Enterprise ใช้ 802.1X Authentication ผ่าน RADIUS Server + EAP Method (EAP-TLS, PEAP) เหมาะสำหรับ Enterprise"),
  ],
  interviewQuestions: [
    makeI("Mid", "เปรียบเทียบ Wi-Fi 6 vs Wi-Fi 7 ที่สำคัญ", "Wi-Fi 6: Max 9.6 Gbps, 1024-QAM, 160 MHz max; Wi-Fi 7: Max 46 Gbps, 4096-QAM, 320 MHz, + MLO, Multi-RU, Preamble Puncturing — ต่างกันมากโดยเฉพาะ MLO ที่ใช้หลาย Band พร้อมกัน"),
  ],
  tags: ["Wi-Fi 7", "802.11be", "MLO", "Wireless", "6GHz", "WPA3"],
  order: 1,
};

// ═════════════════════════════════════════════════════════════════
// TRACK 4: MODERN SECURITY
// ═════════════════════════════════════════════════════════════════

const saseLesson: Lesson = {
  id: "sec-001",
  slug: "sase-deep-dive",
  title: "SASE Deep Dive",
  titleTh: "SASE แบบละเอียด",
  track: "security",
  category: "sase",
  level: "Advanced",
  duration: "90 min",
  xp: 125,
  description: "เรียนรู้ SASE Architecture ทั้งหมด — SD-WAN, SWG, CASB, ZTNA, FWaaS และการ Migrate จาก Traditional VPN",
  objectives: [
    "อธิบาย SASE Architecture และ Component ทุกชิ้นได้",
    "ระบุ Use Case สำหรับ ZTNA vs Traditional VPN",
    "ออกแบบ SASE Migration Plan ได้",
    "เข้าใจ Zero Trust Principles",
  ],
  prerequisites: [],
  concepts: ["SASE", "SD-WAN", "SWG", "CASB", "ZTNA", "FWaaS", "DLP", "RBI", "Zero Trust", "Cloud Security POP", "Identity-based Access", "Device Posture"],
  mermaidDiagram: `graph LR
    subgraph Users["Users"]
      RU["Remote User"]
      BU["Branch User"]
    end
    subgraph SASE["SASE Cloud POP"]
      ZTNA["ZTNA Broker"]
      SWG["SWG\n(Web Filter)"]
      CASB["CASB\n(SaaS Inspect)"]
      FW["FWaaS\n(Next-Gen FW)"]
      DLP["DLP"]
    end
    subgraph Resources["Resources"]
      PRIV["Private Apps"]
      SAAS["SaaS (M365, Google)"]
      INT["Internet"]
    end
    RU --> ZTNA --> PRIV
    BU --> SWG --> INT
    BU --> CASB --> SAAS
    ZTNA & SWG & CASB --> FW & DLP`,
  labs: [
    {
      title: "SASE Migration Planning Workshop",
      level: "Advanced",
      estimatedMinutes: 90,
      steps: [
        "วิเคราะห์ Current State: VPN, Firewall, Proxy",
        "กำหนด Target SASE Architecture",
        "สร้าง Zero Trust Policy Matrix",
        "วาง ZTNA Access Policy สำหรับ Private Apps",
        "กำหนด Device Posture Requirements",
        "สร้าง Migration Phasing Plan (Phase 1-3)",
        "เขียน Rollback Plan",
      ],
      verification: ["Policy Matrix ครอบคลุมทุก Application", "ZTNA Policy หยุด Access ถ้า Device Posture ไม่ผ่าน", "Migration Plan มี Rollback"],
    },
  ],
  troubleshooting: [
    { symptom: "User เข้า Private App ผ่าน ZTNA ไม่ได้", possibleCause: "ZTNA Connector ล้ม, Policy ไม่ Match, Device Posture Fail", check: "ตรวจ Connector Status, User Identity, Device Compliance", fix: "Restart Connector, ตรวจ Policy Group, แก้ Device Compliance" },
    { symptom: "SASE Latency สูงผิดปกติ", possibleCause: "Traffic ไปผ่าน POP ที่ไกล", check: "ตรวจ POP Selection, traceroute", fix: "เปลี่ยน POP ให้ใกล้กว่า, ตรวจ SD-WAN Policy" },
  ],
  quiz: [
    makeQ("SASE ย่อมาจากอะไร?", ["Secure Application Service Edge", "Secure Access Service Edge", "Software Access Security Engine", "Security Architecture Service Edge"], "Secure Access Service Edge", "SASE = Secure Access Service Edge ผสาน SD-WAN กับ Security Services (SWG, CASB, ZTNA, FWaaS) บน Cloud"),
    makeQ("ZTNA ต่างจาก VPN อย่างไร?", ["ZTNA เร็วกว่า VPN", "ZTNA ให้ Access เฉพาะ App ที่กำหนด VPN ให้ Access ทั้ง Network", "ZTNA ไม่ต้องการ Internet", "VPN ปลอดภัยกว่า ZTNA"], "ZTNA ให้ Access เฉพาะ App ที่กำหนด VPN ให้ Access ทั้ง Network", "ZTNA ใช้หลัก Least Privilege ให้ Access เฉพาะ App/Service ที่ User ต้องการ — ต่างจาก VPN ที่เปิด Network ทั้งหมด"),
    makeQ("Zero Trust หลักการหลักคือ?", ["เชื่อทุกคนใน Network", "ไม่เชื่อใคร ต้อง Verify ทุกครั้ง", "เชื่อ User ที่มี Certificate", "เชื่อ Traffic จาก Office"], "ไม่เชื่อใคร ต้อง Verify ทุกครั้ง", "Zero Trust = Never Trust, Always Verify — ทุก Request ต้อง Authenticate และ Authorize ทุกครั้ง แม้มาจากใน Network"),
    makeQ("CASB ช่วยอะไร?", ["Block Malware", "Visibility และ Control การใช้ SaaS Applications", "Replace Firewall", "Speed up Internet"], "Visibility และ Control การใช้ SaaS Applications", "CASB (Cloud Access Security Broker) ควบคุมและ Monitor การใช้ SaaS เช่น Block Upload ข้อมูลสำคัญไป Personal Google Drive"),
    makeQ("Device Posture ใน ZTNA คือ?", ["Physical Location ของ Device", "ตรวจสอบว่า Device มี Security Compliance ก่อนให้ Access", "ประสิทธิภาพของ Device", "จำนวน Application ที่ Install"], "ตรวจสอบว่า Device มี Security Compliance ก่อนให้ Access", "Device Posture Check ตรวจว่า Device Update Patch ล่าสุดไหม, มี Antivirus ไหม, Disk Encrypted ไหม ก่อน Grant Access"),
  ],
  interviewQuestions: [
    makeI("Senior", "อธิบาย SASE vs Traditional Security Architecture", "Traditional: Traffic กลับ HQ ผ่าน MPLS → Inspect → ออก Internet (Hair-pinning); SASE: Traffic ไป Cloud POP ที่ใกล้สุด → Inspect → ออก — เร็วกว่า ยืดหยุ่นกว่า ไม่ต้องซื้อ HW"),
  ],
  portfolioTask: {
    title: "SASE + ZTNA Migration Plan",
    description: "วางแผน Migrate จาก Traditional VPN/Firewall ไปสู่ SASE",
    deliverables: ["Current vs Target Architecture", "ZTNA Policy Matrix", "Device Posture Rules", "Migration Phases", "Rollback Plan", "GitHub README.md"],
  },
  tags: ["SASE", "ZTNA", "Zero Trust", "SWG", "CASB", "FWaaS", "SD-WAN", "Security"],
  order: 1,
};

// ═════════════════════════════════════════════════════════════════
// EXPORT TRACKS
// ═════════════════════════════════════════════════════════════════

export const advancedTracks: TrackInfo[] = [
  {
    id: "ai-infrastructure",
    title: "AI Infrastructure Networking",
    titleTh: "AI Infrastructure Networking",
    description: "GPU Cluster, RDMA/RoCE, InfiniBand, High-radix Spine-Leaf สำหรับ AI Training",
    icon: "🤖",
    color: "violet",
    lessons: [aiInfraOverview, rdmaRoce],
    totalXp: 225,
    estimatedHours: 20,
    targetCert: "NVIDIA DCA / Arista ACE",
    prereqTrack: "foundation",
  },
  {
    id: "cloud-ai-ops",
    title: "Cloud Native & AI Ops",
    titleTh: "Cloud Native และ AI Ops",
    description: "Kubernetes Networking, CNI, eBPF, Cilium, OpenTelemetry, gNMI",
    icon: "☁️",
    color: "cyan",
    lessons: [k8sNetworking],
    totalXp: 125,
    estimatedHours: 25,
    targetCert: "CKA / Cilium Associate",
    prereqTrack: "foundation",
  },
  {
    id: "wireless-mobile",
    title: "Wireless & Mobile",
    titleTh: "Wireless และ Mobile",
    description: "Wi-Fi 7, Private 5G, O-RAN, Network Slicing, Enterprise Wireless Design",
    icon: "📡",
    color: "emerald",
    lessons: [wifi7],
    totalXp: 100,
    estimatedHours: 20,
    targetCert: "CWNE / Cisco CCNP Wireless",
    prereqTrack: "foundation",
  },
  {
    id: "security",
    title: "Modern Security",
    titleTh: "Modern Security",
    description: "SASE, ZTNA, Zero Trust, SD-WAN Security, Identity-based Access",
    icon: "🔐",
    color: "rose",
    lessons: [saseLesson],
    totalXp: 125,
    estimatedHours: 20,
    targetCert: "CISSP / PCNSE / Zscaler ZIA",
    prereqTrack: "foundation",
  },
  {
    id: "hardware-infrastructure",
    title: "Network Hardware & Physical Infrastructure",
    titleTh: "Network Hardware",
    description: "Cabling, Switch, Router, Firewall, Data Center, AI/GPU Hardware, Power/Rack/Cooling",
    icon: "🏗️",
    color: "amber",
    lessons: [],
    totalXp: 500,
    estimatedHours: 30,
    prereqTrack: "foundation",
  },
];

export const allAdvancedLessons = advancedTracks.flatMap(t => t.lessons);
