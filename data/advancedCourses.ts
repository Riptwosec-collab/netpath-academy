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
  sections: [
    {
      title: "AI Training vs Inference: Network Requirements ต่างกันอย่างไร",
      body: "AI Training ใช้ Network แบบ All-to-All Communication — GPU ทุกตัวต้องคุยกันระหว่าง backward pass (AllReduce). ถ้า bandwidth ต่ำหรือ latency สูงแม้แค่ GPU เดียว ทั้ง cluster จะช้าตามเพราะ synchronization barrier\n\nAI Inference ต่างออกไป — traffic เป็น Client→Server, bandwidth ต่ำกว่า แต่ latency ต้องสม่ำเสมอ (P99 latency) เพราะ end-user กำลังรอ response",
      table: {
        header: ["ด้าน", "Training", "Inference"],
        rows: [
          ["Traffic Pattern", "All-to-All (AllReduce)", "Client→Server"],
          ["Bandwidth", "400GbE–3.2Tbps/GPU", "10–100GbE"],
          ["Latency Sensitivity", "ต่ำมาก (μs level)", "ปานกลาง (ms level)"],
          ["Bottleneck", "GPU-to-GPU bandwidth", "CPU throughput / memory"],
          ["Protocol", "RoCE / InfiniBand", "TCP/IP ปกติ"],
        ],
      },
    },
    {
      title: "East-West Traffic และ Non-Blocking Fabric",
      body: "ใน AI Cluster, GPU อยู่ใน Rack หลาย Rack — traffic ส่วนใหญ่วิ่ง East-West (server-to-server) ไม่ใช่ North-South (server-to-internet). Switch Fabric ต้องเป็น Non-Blocking หมายความว่าถ้า 64 ports ต่างส่งพร้อมกัน ทุก port ยังได้ full bandwidth\n\nสถาปัตยกรรมทั่วไปคือ Fat-Tree หรือ Clos Network — มี Spine Layer, Leaf Layer และ Oversubscription ratio ต้องเป็น 1:1 สำหรับ training cluster",
      tip: "Rule of thumb: Training cluster ต้องการ ~1 Gbps per GPU TFLOP. A100 GPU (312 TFLOPS) → ~312 Gbps per GPU — นี่คือเหตุผลที่ InfiniBand/RoCE ต้องใช้ 400GbE",
    },
    {
      title: "Key Technologies: RDMA, RoCE, InfiniBand",
      body: "RDMA (Remote Direct Memory Access) ให้ GPU หนึ่งอ่าน/เขียน memory ของ GPU อีกเครื่องโดยตรงโดยไม่ผ่าน CPU — ลด latency จาก ~100μs (TCP) เหลือ ~1μs\n\nRoCE (RDMA over Converged Ethernet) ทำงานบน Ethernet ปกติ แต่ต้องการ Lossless Network (PFC + ECN). InfiniBand เป็น proprietary fabric จาก NVIDIA/Mellanox — performance สูงกว่าแต่ราคาแพงกว่ามาก",
      table: {
        header: ["Technology", "Latency", "Bandwidth", "Cost", "Use Case"],
        rows: [
          ["TCP/IP Ethernet", "~100μs", "100GbE", "ต่ำ", "Inference"],
          ["RoCEv2", "~2-5μs", "400GbE", "ปานกลาง", "Training (Hyperscale)"],
          ["InfiniBand NDR", "~0.6μs", "400Gbps", "สูงมาก", "HPC / Large Training"],
        ],
      },
      warning: "RoCE ต้องการ Lossless Ethernet — ถ้า Switch ไม่รองรับ PFC (Priority Flow Control) จะเกิด packet drop และ RDMA performance จะแย่กว่า TCP",
    },
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
  sections: [
    {
      title: "RDMA คืออะไร และทำไม Network Engineer ต้องรู้",
      body: "RDMA (Remote Direct Memory Access) ทำให้ application หนึ่งสามารถอ่าน/เขียน memory ของ host อีกเครื่องโดยตรง ไม่ผ่าน CPU และ OS kernel — ลด latency และ CPU overhead ลงอย่างมาก\n\nใน AI/HPC workload, AllReduce operation ต้องแลกเปลี่ยน gradient ระหว่าง GPU หลายพันตัว. RDMA ทำให้ operation นี้เร็วมากพอที่ GPU จะไม่ต้องรอ network",
      table: {
        header: ["ด้าน", "Traditional TCP/IP", "RDMA"],
        rows: [
          ["Data Path", "App → OS → NIC → Network", "App → NIC → Network (bypass OS)"],
          ["CPU Involvement", "สูง (copy, interrupt)", "แทบไม่มี (zero-copy)"],
          ["Latency", "~50-100μs", "~1-5μs"],
          ["Throughput", "Limited by CPU", "Near wire-speed"],
        ],
      },
    },
    {
      title: "RoCEv2: RDMA บน Ethernet",
      body: "RoCEv2 (RDMA over Converged Ethernet version 2) encapsulate RDMA packets ใน UDP/IP — ทำให้ routable ข้าม subnet ได้ (ต่างจาก RoCEv1 ที่จำกัดอยู่ใน L2 domain)\n\nข้อกำหนดสำคัญ: Network ต้องเป็น Lossless — packet drop หนึ่งใบทำให้ RDMA connection ต้อง retransmit ทั้ง message ซึ่งกระทบ latency มาก",
      code: `# ตรวจสอบ RoCE counters บน Linux
rdma stat show
ibstat | grep -A5 "Port 1"

# ตรวจสอบ PFC frames บน switch (Cisco Nexus)
show interface ethernet 1/1 priority-flow-control
show queuing interface ethernet 1/1`,
      language: "bash",
      tip: "ECN (Explicit Congestion Notification) ใช้คู่กับ PFC — ECN signal ให้ sender ลด rate ก่อนที่ queue จะเต็ม ลดโอกาส PFC pause frame",
    },
    {
      title: "Lossless Network: PFC และ ECN Configuration",
      body: "PFC (Priority Flow Control) — ถ้า queue ใกล้เต็ม switch จะส่ง PAUSE frame ให้ sender หยุดส่งชั่วคราว สำหรับ traffic class ที่กำหนด (CoS 3 สำหรับ RoCE โดยทั่วไป)\n\nECN marking ทำงานบน router/switch — เมื่อ buffer usage เกิน threshold จะ mark CE bit ใน IP header แทนการ drop packet sender จะลด congestion window ลง",
      table: {
        header: ["Mechanism", "Layer", "Action", "ผลต่อ Latency"],
        rows: [
          ["PFC Pause", "L2", "หยุด sender ชั่วคราว", "spike latency"],
          ["ECN", "L3", "บอก sender ให้ช้าลง", "smooth, predictable"],
          ["DCQCN", "End-to-End", "ผสม ECN + rate control", "ดีที่สุด"],
        ],
      },
      warning: "PFC Pause ถ้า misconfigured อาจเกิด PFC Deadlock — traffic หยุดทั้ง fabric. ต้องวางแผน traffic class และ priority mapping ให้ถูกต้อง",
    },
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
  sections: [
    {
      title: "Kubernetes Networking Model: 4 Problems, 1 Solution",
      body: "K8s กำหนด Networking Model ไว้ 4 ข้อ: (1) Pod คุยกับ Pod ได้โดยตรงโดยไม่ต้องทำ NAT (2) Node คุยกับ Pod ได้ (3) Pod ได้ IP ของตัวเองที่ unique ใน cluster (4) Service ใช้ ClusterIP เป็น Virtual IP\n\nทุกข้อนี้ CNI Plugin เป็นตัวทำให้เป็นจริง — K8s เอง (kubelet) เพียงเรียก CNI binary ตอน Pod ถูก schedule มายัง Node",
      table: {
        header: ["Component", "หน้าที่", "ตัวอย่าง"],
        rows: [
          ["CNI Plugin", "จัด IP ให้ Pod, สร้าง veth pair", "Calico, Cilium, Flannel"],
          ["kube-proxy", "จัดการ Service iptables/ipvs", "built-in DaemonSet"],
          ["CoreDNS", "DNS resolution ภายใน cluster", "svc.cluster.local"],
          ["Ingress Controller", "L7 routing, TLS termination", "nginx, traefik"],
        ],
      },
    },
    {
      title: "Pod Networking: veth pair และ CNI",
      body: "ทุก Pod ได้รับ Network Namespace ของตัวเอง — มี lo + eth0 interface. eth0 ใน Pod ต่อกับ veth pair ที่ออกมายัง host network namespace\n\nCNI Plugin รับผิดชอบ: สร้าง veth pair, assign IP จาก Pod CIDR, เพิ่ม route ให้ traffic ออก Pod ได้, และตั้ง policy ถ้า Network Policy ถูก apply",
      code: `# ดู network namespace ของ Pod
kubectl exec -it mypod -- ip addr
kubectl exec -it mypod -- ip route

# บน node ดู veth pair
ip link show type veth
# หา veth ที่เชื่อมกับ pod
nsenter -t <pod-pid> -n ip addr`,
      language: "bash",
      tip: "Pod IP มาจาก podCIDR ที่ assign ให้แต่ละ Node — เช่น Node 1 ได้ 10.244.0.0/24, Node 2 ได้ 10.244.1.0/24. Pod บน Node 1 จะได้ IP ในช่วง 10.244.0.x",
    },
    {
      title: "Service Networking: ClusterIP, NodePort, LoadBalancer",
      body: "Service เป็น Virtual IP (ClusterIP) ที่ kube-proxy map ไปยัง Endpoints (Pod IPs) จริงๆ — ทำผ่าน iptables DNAT หรือ IPVS\n\nNodePort เปิด port บน ทุก Node ใน cluster — traffic เข้า NodeIP:NodePort จะถูก forward ไปยัง Service. LoadBalancer ขอ Cloud LB จาก provider มา point ไปที่ NodePort",
      table: {
        header: ["Service Type", "Access", "Use Case"],
        rows: [
          ["ClusterIP", "ภายใน cluster เท่านั้น", "inter-service communication"],
          ["NodePort", "NodeIP:Port จาก outside", "dev/test environments"],
          ["LoadBalancer", "Cloud LB IP", "production external traffic"],
          ["ExternalName", "DNS CNAME", "external service alias"],
        ],
      },
      warning: "kube-proxy iptables mode — ถ้า Service มี Endpoints มากกว่า 1000 ตัว iptables rules จะมีผลต่อ performance. พิจารณา IPVS mode หรือ eBPF-based (Cilium)",
    },
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
  sections: [
    {
      title: "WiFi 7 (802.11be) — Multi-Link Operation (MLO)",
      body: "WiFi 7 ฟีเจอร์ใหม่ที่สำคัญที่สุดคือ MLO (Multi-Link Operation) — device สามารถส่งและรับข้อมูลบนหลาย band พร้อมกัน (2.4GHz + 5GHz + 6GHz) ใน single connection เดียว\n\nผลคือ throughput สูงขึ้น (รวม bandwidth จากหลาย band) และ latency ต่ำลง (ถ้า band หนึ่ง congested ส่งอีก band แทนได้ทันที)",
      table: {
        header: ["WiFi Generation", "Standard", "Max Speed", "ฟีเจอร์ใหม่"],
        rows: [
          ["WiFi 5", "802.11ac", "3.5 Gbps", "MU-MIMO (DL only)"],
          ["WiFi 6", "802.11ax", "9.6 Gbps", "OFDMA, BSS Coloring, TWT"],
          ["WiFi 6E", "802.11ax", "9.6 Gbps", "6GHz band เพิ่มเติม"],
          ["WiFi 7", "802.11be", "46 Gbps", "MLO, 4096-QAM, 320MHz"],
        ],
      },
    },
    {
      title: "4096-QAM และ 320MHz Channel Width",
      body: "WiFi 7 เพิ่ม modulation เป็น 4096-QAM (4K-QAM) — แต่ละ symbol ส่งข้อมูล 12 bits (เทียบกับ 1024-QAM ใน WiFi 6 ที่ส่ง 10 bits) เพิ่ม theoretical throughput ขึ้น ~20%\n\n320MHz channel width (เป็น 2 เท่าของ WiFi 6 ที่ 160MHz) ทำได้บน 6GHz band เท่านั้น — ต้องมี spectrum ที่สะอาดและ client อยู่ใกล้ AP (เพราะ SNR ต้องสูงมากสำหรับ 4K-QAM)",
      tip: "WiFi 7 ยังรองรับ Punctured Channel — ถ้ามี interference บางส่วนของ 320MHz channel สามารถ 'เจาะรู' ส่วนนั้นออกได้ แล้วใช้ส่วนที่เหลือแทน (แทนที่จะ fallback ทั้ง channel)",
    },
    {
      title: "Enterprise Deployment: WiFi 7 Readiness",
      body: "การ deploy WiFi 7 ใน enterprise ต้องคิดถึง: (1) Wired backhaul — AP ต้องการ 2.5G หรือ 5G/10G uplink เพราะ throughput สูงกว่า 1GbE (2) PoE budget — WiFi 7 AP กินไฟ ~25-30W ต้องการ PoE++ (802.3bt) (3) Client device support — WiFi 7 NIC ยังมีไม่มากใน 2024-2025",
      table: {
        header: ["ความต้องการ", "WiFi 6", "WiFi 7"],
        rows: [
          ["Wired Uplink", "1GbE ก็พอ", "2.5G/5G/10G แนะนำ"],
          ["PoE", "PoE+ (802.3at) ~15-25W", "PoE++ (802.3bt) ~30W"],
          ["6GHz Support", "6E เท่านั้น", "ต้องการ"],
          ["Client Support", "Widespread", "Growing (2024+)"],
        ],
      },
      warning: "6GHz band ใน WiFi 7 มีกฎระเบียบแตกต่างกันแต่ละประเทศ — ในบางประเทศยังไม่ได้รับอนุญาต. ตรวจสอบ regulatory domain ก่อน deploy",
    },
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
  sections: [
    {
      title: "SASE Architecture: Security + Networking = Cloud-delivered",
      body: "SASE (Secure Access Service Edge) รวม SD-WAN กับ Security Services ไว้ใน cloud platform เดียว — แทนที่จะให้ traffic วิ่งผ่าน datacenter เพื่อ security inspection ก่อน, SASE ทำ inspection ที่ Cloud PoP ใกล้ผู้ใช้\n\nFramework ประกอบด้วย: SD-WAN (transport), CASB (Cloud Access Security Broker), SWG (Secure Web Gateway), ZTNA (Zero Trust Network Access), FWaaS (Firewall as a Service)",
      table: {
        header: ["Component", "หน้าที่", "แทนที่อะไร"],
        rows: [
          ["SD-WAN", "Intelligent path selection", "MPLS / traditional WAN"],
          ["ZTNA", "Per-app access control", "VPN"],
          ["SWG", "Web/internet policy enforcement", "Proxy server"],
          ["CASB", "Cloud app visibility & control", "On-prem DLP"],
          ["FWaaS", "L7 firewall in cloud", "Branch firewall"],
        ],
      },
    },
    {
      title: "Zero Trust Network Access (ZTNA): ทำงานอย่างไร",
      body: "ZTNA ทำงานบนหลักการ 'Never Trust, Always Verify' — แทนที่จะให้ access ทั้ง network หลัง authenticate (แบบ VPN), ZTNA ให้ access เฉพาะ application ที่ได้รับอนุญาตเท่านั้น\n\nUser authenticate กับ Identity Provider (IdP) → ZTNA Controller ตรวจสอบ identity + device posture → ออก short-lived token สำหรับ access เฉพาะ app → traffic ผ่าน ZTNA broker ไปยัง app โดยไม่เปิด network ให้ user เห็น",
      tip: "ZTNA แก้ปัญหา VPN ที่ให้ access มากเกินไป — ถ้า VPN credential ถูก compromise, attacker ได้ access ทั้ง network. ZTNA จำกัดให้เฉพาะ app ที่ authorized",
    },
    {
      title: "SD-WAN Integration และ Intelligent Path Selection",
      body: "SD-WAN ใน SASE ทำ real-time measurement ของ WAN links (MPLS, Broadband, LTE, 5G) และเลือก path ที่ดีที่สุดสำหรับแต่ละ application\n\nBusiness Policy กำหนดว่า Video Conferencing ต้องใช้ path ที่ jitter < 20ms, Backup ใช้ path ราคาถูก, Critical apps ใช้ MPLS เป็น primary. SD-WAN appliance วัด SLA แบบ real-time และ failover อัตโนมัติ",
      code: `# Versa SASE — ตัวอย่าง application policy
application-policy {
  rule "video-conferencing" {
    match { application [zoom teams webex]; }
    action { 
      path-preference [mpls broadband]; 
      sla-profile { latency 50; jitter 20; loss 1; }
    }
  }
  rule "backup-traffic" {
    match { application [s3-backup ftp]; }
    action { path-preference [lte broadband mpls]; }
  }
}`,
      language: "text",
    },
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

const cniDeepDive: Lesson = {
  id: "cloud-002",
  slug: "cni-deep-dive-calico-cilium",
  title: "CNI Deep Dive: Calico vs Cilium vs Flannel",
  titleTh: "CNI Deep Dive — Calico, Cilium, Flannel",
  track: "cloud-ai-ops",
  category: "kubernetes",
  level: "Advanced",
  duration: "90 min",
  xp: 150,
  description: "เปรียบเทียบ CNI Plugin ทั้งสาม — Flannel (VXLAN), Calico (BGP), Cilium (eBPF) อย่างละเอียด พร้อม Use Case และ Performance",
  objectives: [
    "อธิบาย Flannel VXLAN Overlay ทำงานอย่างไร",
    "เข้าใจ Calico BGP Routing Mode vs VXLAN Mode",
    "อธิบาย Cilium eBPF Data Plane และข้อดี",
    "เลือก CNI Plugin ได้ถูกต้องตาม Use Case",
  ],
  sections: [
    {
      title: "CNI Fundamentals: Calico vs Cilium Architecture",
      body: "Calico ใช้ BGP-based routing — แต่ละ Node run BGP speaker (BIRD daemon) และ advertise Pod CIDR ของตัวเองไปยัง Node อื่น. Packet routing ใช้ Linux kernel routing table + iptables/ipsets สำหรับ Network Policy\n\nCilium ใช้ eBPF — แทน iptables ทั้งหมดด้วย eBPF programs ที่โหลดเข้า kernel. ทำให้ policy enforcement เร็วกว่า iptables มาก โดยเฉพาะเมื่อ rules มีจำนวนมาก",
      table: {
        header: ["ด้าน", "Calico", "Cilium"],
        rows: [
          ["Data Plane", "iptables / eBPF (optional)", "eBPF (native)"],
          ["Routing", "BGP หรือ VXLAN", "eBPF routing"],
          ["Network Policy", "iptables rules", "eBPF maps"],
          ["Observability", "Limited", "Hubble (L7 visibility)"],
          ["Performance (1000+ services)", "iptables ช้า", "O(1) lookup"],
        ],
      },
    },
    {
      title: "Calico BGP Mode: ทำงานอย่างไร",
      body: "ใน Calico BGP mode แต่ละ Node run BIRD (BGP daemon) ที่ advertise /26 Pod CIDR ของ node นั้นๆ. Node อื่นรับ route มาและ install ใน Linux routing table\n\nข้ามกัน subnet ต้องมี BGP peer ที่เป็น router จริงๆ (Route Reflector) หรือใช้ VXLAN/IPinIP encapsulation แทน",
      code: `# ดู BGP peers ใน Calico
calicoctl node status
calicoctl get bgppeer -o yaml

# ตรวจสอบ routes ที่ node เรียนรู้
ip route show | grep bird
# หรือ
birdc show route`,
      language: "bash",
      tip: "Calico WireGuard encryption — เปิดได้ด้วย: calicoctl patch felixconfig default --type=merge -p spec.wireguardEnabled=true — encrypt Pod-to-Pod traffic โดยไม่ต้องเพิ่ม sidecar",
    },
    {
      title: "Cilium eBPF: Network Policy ที่ Scale",
      body: "iBPF Map ใน Cilium เก็บ policy rules เป็น hash map — lookup เป็น O(1) ไม่ว่าจะมีกี่ rules. เทียบกับ iptables ที่ traverse rules เป็น linear chain O(n)\n\nCilium ยัง support L7 Policy — สามารถ allow/deny HTTP path หรือ gRPC method ที่ specific ได้ โดยไม่ต้องใช้ service mesh",
      code: `# Cilium L7 Network Policy
apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
metadata:
  name: allow-api-v1
spec:
  endpointSelector:
    matchLabels:
      app: backend
  ingress:
  - fromEndpoints:
    - matchLabels:
        app: frontend
    toPorts:
    - ports:
      - port: "8080"
      rules:
        http:
        - method: GET
          path: "/api/v1/.*"`,
      language: "yaml",
      warning: "Cilium L7 policy ต้องใช้ Envoy proxy บน node — เพิ่ม CPU overhead เล็กน้อย แต่ได้ visibility L7 ที่ละเอียดมาก",
    },
  ],
  prerequisites: ["kubernetes-networking-overview"],
  concepts: ["CNI", "Flannel", "VXLAN", "Overlay", "Calico", "BGP", "BIRD", "Felix", "Cilium", "eBPF", "XDP", "Hubble", "kube-proxy Replacement", "NetworkPolicy", "WireGuard", "IPAM"],
  mermaidDiagram: `graph TB
    subgraph Flannel ["Flannel (VXLAN Overlay)"]
      FP1["Pod A\n10.244.0.2"] -->|"VXLAN Encap"| FH1["flanneld\n(UDP 8472)"]
      FH1 -->|"UDP Tunnel"| FH2["flanneld Node2"]
      FH2 -->|"Decap"| FP2["Pod B\n10.244.1.2"]
    end
    subgraph Calico ["Calico (BGP Mode)"]
      CP1["Pod C\n192.168.0.2"] -->|"Native Routing"| CB["BIRD BGP\n(Peer with Switch)"]
      CB -->|"BGP Advertise"| CS["Switch/Router"]
    end
    subgraph Cilium ["Cilium (eBPF)"]
      CEP1["Pod E"] -->|"eBPF Hook\n(no iptables)"| CBPF["eBPF Programs\nin Kernel"]
      CBPF -->|"Direct"| CEP2["Pod F"]
    end`,
  yamlExamples: [
    {
      title: "Cilium CiliumNetworkPolicy (L7 HTTP)",
      code: `apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
metadata:
  name: allow-get-only
spec:
  endpointSelector:
    matchLabels:
      app: backend
  ingress:
  - fromEndpoints:
    - matchLabels:
        app: frontend
    toPorts:
    - ports:
      - port: "8080"
        protocol: TCP
      rules:
        http:
        - method: GET
          path: "/api/.*"`,
      description: "Cilium ทำ L7 Policy ได้ — อนุญาตเฉพาะ GET /api/* จาก frontend",
    },
    {
      title: "Calico BGPPeer Configuration",
      code: `apiVersion: projectcalico.org/v3
kind: BGPPeer
metadata:
  name: spine-switch
spec:
  peerIP: 10.0.0.1
  asNumber: 65000`,
      description: "Calico BGP Peer กับ Spine Switch — ทำ Native Routing ไม่ต้อง Overlay",
    },
  ],
  commands: [
    { command: "kubectl get pods -n kube-system | grep -E 'calico|cilium|flannel'", description: "ดู CNI Pods ที่ Deploy อยู่" },
    { command: "calicoctl get nodes -o wide", description: "ดู Calico Node Status" },
    { command: "cilium status", description: "ดู Cilium Status ทั้งหมด" },
    { command: "cilium monitor", description: "ดู Real-time Network Events ใน Cilium" },
    { command: "hubble observe --namespace production", description: "ดู Network Flows ผ่าน Hubble" },
    { command: "cilium connectivity test", description: "Test Connectivity ครบชุด" },
  ],
  labs: [
    {
      title: "CNI Comparison Lab",
      level: "Advanced",
      estimatedMinutes: 90,
      steps: [
        "Deploy Kind cluster กับ Flannel — ทดสอบ Pod-to-Pod connectivity",
        "สังเกต VXLAN Interface: ip link show | grep flannel",
        "Deploy Kind cluster กับ Cilium แทน",
        "ทดสอบ Pod-to-Pod connectivity",
        "Deploy CiliumNetworkPolicy L7 — อนุญาตเฉพาะ GET requests",
        "ทดสอบ Policy: GET ผ่าน, POST ถูกบล็อก",
        "เปิด Hubble UI ดู Network Flows",
        "เปรียบเทียบ Latency: iperf3 ผ่าน Flannel vs Cilium",
      ],
      verification: [
        "Flannel: ip link show type vxlan มี interface",
        "Cilium: cilium status ไม่มี Error",
        "L7 Policy ทำงานถูกต้อง",
        "Hubble แสดง flow logs",
      ],
    },
  ],
  troubleshooting: [
    { symptom: "Pod ไม่ได้รับ IP (CNI Error)", possibleCause: "CNI Binary ไม่อยู่ใน /opt/cni/bin หรือ Config ผิด", check: "journalctl -u kubelet | grep CNI, ls /opt/cni/bin/", fix: "Reinstall CNI Plugin, ตรวจ Config ใน /etc/cni/net.d/" },
    { symptom: "Cilium Pod CrashLoopBackOff", possibleCause: "Kernel ไม่รองรับ eBPF, หรือ Mount ไม่สำเร็จ", check: "kubectl logs -n kube-system <cilium-pod>, uname -r (ต้องการ >= 4.9)", fix: "Update Kernel, ตรวจ BPF Filesystem mount" },
    { symptom: "Calico BGP Peer ไม่ขึ้น", possibleCause: "ASN ผิด, Firewall บล็อก BGP Port 179", check: "calicoctl node status, ตรวจ Port 179", fix: "แก้ BGPPeer Config, เปิด Port 179" },
  ],
  quiz: [
    makeQ("Flannel ใช้ Technique ใดในการส่ง Pod Traffic ข้าม Node?", ["BGP Routing", "VXLAN Overlay Encapsulation", "eBPF Direct Routing", "NAT"], "VXLAN Overlay Encapsulation", "Flannel ใช้ VXLAN Tunnel ห่อ (Encap) Pod Packet ก่อนส่งข้าม Node — มี Overhead เล็กน้อย แต่ง่าย ไม่ต้องการ Network Support"),
    makeQ("Calico BGP Mode ข้อดีหลักคืออะไร?", ["ไม่ต้องการ Certificate", "Native Routing ไม่มี Overhead จาก Encapsulation", "ง่ายกว่า Flannel", "รองรับ Windows เท่านั้น"], "Native Routing ไม่มี Overhead จาก Encapsulation", "Calico BGP Mode โฆษณา Pod CIDR ผ่าน BGP ไปยัง Router/Switch — Pod Packet ไม่ถูก Encap จึง Latency ต่ำกว่า Overlay"),
    makeQ("Cilium แตกต่างจาก CNI อื่นตรงไหนที่สำคัญที่สุด?", ["ราคาถูกกว่า", "ใช้ eBPF แทน iptables ทำให้ Performance สูงกว่า + L7 Policy", "รองรับ IPv6 เท่านั้น", "ทำงานได้เฉพาะบน AWS"], "ใช้ eBPF แทน iptables ทำให้ Performance สูงกว่า + L7 Policy", "Cilium ใช้ eBPF Programs ใน Linux Kernel แทน iptables rules ซึ่งเร็วกว่า Scale ดีกว่า + รองรับ L7 (HTTP/gRPC) NetworkPolicy"),
    makeQ("Hubble ใน Cilium ใช้ทำอะไร?", ["Replace kube-proxy", "Network Observability — ดู Flow Logs, HTTP Metrics, DNS", "IPAM สำหรับ Pod", "Encrypt Pod Traffic"], "Network Observability — ดู Flow Logs, HTTP Metrics, DNS", "Hubble คือ Observability Layer ของ Cilium — ดู Network Flows, HTTP Request/Response, DNS Queries แบบ Real-time โดยใช้ eBPF"),
    makeQ("เมื่อไรควรเลือก Flannel?", ["ต้องการ L7 Policy", "ต้องการ BGP Integration กับ Physical Network", "เริ่มต้นง่าย ไม่ต้องการ Feature ซับซ้อน", "ต้องการ Performance สูงสุด"], "เริ่มต้นง่าย ไม่ต้องการ Feature ซับซ้อน", "Flannel: Simple, Stable, ติดตั้งง่าย — เหมาะสำหรับ Dev/Test หรือ Cluster เล็กๆ ที่ไม่ต้องการ NetworkPolicy หรือ Observability"),
  ],
  interviewQuestions: [
    makeI("Mid", "เปรียบเทียบ Flannel vs Calico vs Cilium สำหรับ Production", "Flannel: ง่าย แต่ไม่มี NetworkPolicy; Calico: NetworkPolicy + BGP ดี แต่ใช้ iptables; Cilium: eBPF Performance ดีที่สุด + L7 + Observability แต่ซับซ้อนกว่า ต้องการ Kernel >=4.9"),
    makeI("Senior", "อธิบาย eBPF ทำงานอย่างไรใน Cilium", "eBPF Programs compile ลง Kernel Bytecode — Hook ที่ TC (Traffic Control) หรือ XDP (Express Data Path) ทำ Packet Processing ใน Kernel โดยตรง ไม่ต้อง copy ไป Userspace ไม่ต้องผ่าน iptables chains → Latency ต่ำมาก Scale ดีกว่าเมื่อ Rules เยอะ"),
  ],
  tags: ["Kubernetes", "CNI", "Calico", "Cilium", "Flannel", "eBPF", "BGP", "NetworkPolicy"],
  order: 2,
};

const ebpfXdp: Lesson = {
  id: "cloud-003",
  slug: "ebpf-xdp",
  title: "eBPF / XDP Deep Dive",
  titleTh: "eBPF และ XDP",
  track: "cloud-ai-ops",
  category: "ebpf",
  level: "Expert",
  duration: "90 min",
  xp: 175,
  description: "เรียนรู้ eBPF Architecture, Hook Points (XDP/TC/kprobe), BPF Maps และการนำไปใช้ใน Network — Load Balancer, Packet Filter, Observability",
  objectives: [
    "อธิบาย eBPF Architecture และ Hook Points",
    "เข้าใจ XDP (Express Data Path) และ Use Case",
    "อธิบาย BPF Maps ใช้ทำอะไร",
    "เชื่อมโยง eBPF กับ Cilium และ Network Observability",
  ],
  sections: [
    {
      title: "eBPF คืออะไร: Kernel Programming ที่ปลอดภัย",
      body: "eBPF (extended Berkeley Packet Filter) ให้เราเขียน program ขนาดเล็กที่รันใน Linux kernel โดยไม่ต้องแก้ kernel source หรือ load kernel module. kernel ตรวจสอบ program ผ่าน verifier ก่อนรัน — ป้องกัน crash หรือ security issues\n\nใช้ใน networking (XDP, tc), observability (tracing syscalls, function calls), security (seccomp, LSM). Cilium, Falco, Pixie ทั้งหมดใช้ eBPF",
      table: {
        header: ["eBPF Program Type", "Hook Point", "Use Case"],
        rows: [
          ["XDP", "NIC receive path (before kernel)", "DDoS mitigation, load balancing"],
          ["TC (Traffic Control)", "Network interface queue", "Packet manipulation, QoS"],
          ["kprobe/tracepoint", "Kernel function entry/exit", "Performance tracing"],
          ["socket filter", "Socket receive", "Packet filtering"],
          ["cgroup", "cgroup attach point", "Container network policy"],
        ],
      },
    },
    {
      title: "XDP: eXpress Data Path สำหรับ High-Performance Networking",
      body: "XDP ทำงานก่อน kernel networking stack — packet เข้า NIC driver แล้ว XDP program รันทันที ก่อนที่จะ allocate sk_buff. ทำให้เร็วมาก (DPDK-level performance แต่อยู่ใน kernel)\n\nXDP action: XDP_PASS (ส่งขึ้น kernel stack ปกติ), XDP_DROP (ทิ้ง packet — DDoS mitigation), XDP_TX (ส่งกลับ interface เดิม), XDP_REDIRECT (ส่งไป interface/CPU อื่น)",
      code: `// XDP program ตัวอย่าง — drop UDP flood
#include <linux/bpf.h>
#include <linux/if_ether.h>
#include <linux/ip.h>
#include <linux/udp.h>

SEC("xdp")
int xdp_drop_udp(struct xdp_md *ctx) {
    void *data     = (void *)(long)ctx->data;
    void *data_end = (void *)(long)ctx->data_end;
    
    struct ethhdr *eth = data;
    if ((void *)(eth + 1) > data_end) return XDP_PASS;
    if (eth->h_proto != htons(ETH_P_IP)) return XDP_PASS;
    
    struct iphdr *ip = (void *)(eth + 1);
    if ((void *)(ip + 1) > data_end) return XDP_PASS;
    if (ip->protocol == IPPROTO_UDP) return XDP_DROP;
    
    return XDP_PASS;
}`,
      language: "c",
      tip: "XDP สามารถ process 14-20 million packets per second per core บน commodity hardware — เทียบกับ iptables ที่ทำได้ ~1-2 Mpps",
    },
    {
      title: "eBPF Maps: Data Sharing ระหว่าง Kernel และ Userspace",
      body: "eBPF Maps เป็น key-value store ที่ share ระหว่าง eBPF programs (kernel) กับ userspace application — ใช้ store counters, connection tables, policy rules\n\nMap types: BPF_MAP_TYPE_HASH (general key-value), BPF_MAP_TYPE_ARRAY (indexed), BPF_MAP_TYPE_LRU_HASH (auto-evict old entries), BPF_MAP_TYPE_PERCPU_HASH (per-CPU สำหรับ lockless counters)",
      code: `# ใช้ bpftool ดู maps ทั้งหมด
bpftool map list
bpftool map dump id 42

# ดู eBPF programs ที่รันอยู่
bpftool prog list
bpftool prog show id 100 --pretty

# trace eBPF events
bpftrace -e 'kprobe:tcp_connect { printf("connect: %s\n", comm); }'`,
      language: "bash",
    },
  ],
  prerequisites: ["cni-deep-dive-calico-cilium"],
  concepts: ["eBPF", "BPF", "XDP", "TC Hook", "kprobe", "uprobe", "BPF Map", "BPF Verifier", "CO-RE", "BTF", "libbpf", "bpftool", "perf", "Cilium", "Hubble", "Katran"],
  mermaidDiagram: `graph TB
    subgraph Kernel ["Linux Kernel"]
      subgraph Hooks ["eBPF Hook Points"]
        XDP["XDP\n(Driver Level — Fastest)"]
        TC["TC Ingress/Egress\n(After Netfilter)"]
        KP["kprobe/tracepoint\n(Any kernel function)"]
      end
      BPF_V["BPF Verifier\n(Safety check)"]
      BPF_JIT["JIT Compiler\n(→ Native code)"]
      BPF_MAP["BPF Maps\n(Shared state)"]
    end
    USER["User Space\n(Go/C/Rust Program)"] -->|"Load BPF Program"| BPF_V
    BPF_V --> BPF_JIT
    BPF_JIT --> Hooks
    Hooks <-->|"Read/Write"| BPF_MAP
    USER <-->|"Read stats, configs"| BPF_MAP`,
  commands: [
    { command: "bpftool prog list", description: "ดู eBPF Programs ที่ Load อยู่" },
    { command: "bpftool map list", description: "ดู BPF Maps ทั้งหมด" },
    { command: "bpftool net list", description: "ดู eBPF Programs ที่ Attach กับ Network Interface" },
    { command: "ip link set eth0 xdp obj xdp_prog.o sec xdp", description: "Load XDP Program บน Interface" },
    { command: "bpftool prog show id <id> --pretty", description: "ดูรายละเอียด BPF Program" },
    { command: "cat /sys/kernel/debug/tracing/trace_pipe", description: "ดู eBPF trace_printk Output" },
  ],
  labs: [
    {
      title: "XDP Packet Counter Lab",
      level: "Expert",
      estimatedMinutes: 60,
      steps: [
        "เขียน XDP Program ใน C นับ Packet ทุกประเภท",
        "Compile: clang -O2 -target bpf -c xdp_counter.c -o xdp_counter.o",
        "Load บน Interface: ip link set lo xdp obj xdp_counter.o sec xdp",
        "ดู Counter ใน BPF Map: bpftool map dump id <id>",
        "เขียน Userspace Program ด้วย libbpf อ่าน Map ทุก 1 วินาที",
        "ทดสอบ: ส่ง Traffic แล้ว Counter เพิ่ม",
      ],
      verification: ["bpftool prog list แสดง xdp_counter", "Map dump แสดง Packet Count", "Counter เพิ่มตาม Traffic"],
    },
  ],
  troubleshooting: [
    { symptom: "BPF Program โดน Verifier Reject", possibleCause: "Loop ไม่มีขอบเขต, Pointer ไม่ได้ Check NULL, หรือ Stack เกิน 512 bytes", check: "ดู Verifier Error Message", fix: "เพิ่ม Bound Loop, Check NULL Pointer, ลด Stack Usage" },
    { symptom: "XDP Program ทำให้ Network ใช้ไม่ได้", possibleCause: "โปรแกรม Drop ทุก Packet แทนที่จะ Pass", check: "ip link show ดู XDP mode, ทดสอบ ping", fix: "Detach XDP: ip link set <iface> xdp off, แก้ Program ให้ Return XDP_PASS" },
  ],
  quiz: [
    makeQ("XDP ทำงานที่ตำแหน่งใดของ Kernel?", ["หลัง iptables", "หลัง TCP Stack", "ก่อน Network Stack — ที่ Driver Level", "หลัง Socket"], "ก่อน Network Stack — ที่ Driver Level", "XDP (eXpress Data Path) Process Packet ที่ Driver Level ก่อนที่ Kernel Network Stack จะเห็น — เร็วมาก (Line rate on commodity HW)"),
    makeQ("BPF Map ใช้ทำอะไร?", ["Store Kernel Config", "แชร์ State ระหว่าง BPF Program และ Userspace", "Compile BPF Code", "Monitor CPU"], "แชร์ State ระหว่าง BPF Program และ Userspace", "BPF Maps เป็น Data Structure ใน Kernel ที่ทั้ง BPF Programs และ Userspace App อ่าน/เขียนได้ — ใช้เก็บ Counter, Config, Connection Table"),
    makeQ("BPF Verifier ทำหน้าที่อะไร?", ["Compile BPF", "ตรวจสอบ BPF Program ว่าปลอดภัยก่อน Load เข้า Kernel", "Encrypt Traffic", "Monitor Syscalls"], "ตรวจสอบ BPF Program ว่าปลอดภัยก่อน Load เข้า Kernel", "Verifier ตรวจว่า Program ไม่มี Infinite Loop, ไม่ Access Memory นอกขอบเขต, และ Return Value ถูกต้อง — ป้องกัน Kernel Crash"),
    makeQ("Cilium ใช้ eBPF Hook ที่ตำแหน่งใดหลักๆ?", ["XDP เท่านั้น", "TC (Traffic Control) Ingress/Egress", "kprobe เท่านั้น", "Socket Level"], "TC (Traffic Control) Ingress/Egress", "Cilium ใช้ TC Hook เป็นหลัก เพราะทำงานหลัง XDP (มี Context มากกว่า) + รองรับ VETH interface ของ Pod ได้"),
    makeQ("eBPF ทำให้ Cilium ดีกว่า iptables อย่างไร?", ["iptables ไม่รองรับ IPv6", "eBPF O(1) Lookup เทียบกับ iptables O(n) Chain traversal", "eBPF ปลอดภัยกว่า", "iptables ไม่มีใน Linux"], "eBPF O(1) Lookup เทียบกับ iptables O(n) Chain traversal", "iptables ใช้ Linear Chain — ยิ่ง Rules เยอะยิ่งช้า; eBPF Maps ใช้ Hash Table ทำ O(1) Lookup — Scale ดีมากเมื่อ Pod เป็นหมื่น"),
  ],
  interviewQuestions: [
    makeI("Senior", "อธิบาย eBPF Architecture ตั้งแต่ต้นจนจบ", "1) เขียน BPF Program ใน C; 2) Compile เป็น BPF Bytecode (clang -target bpf); 3) Load ผ่าน syscall bpf(); 4) Verifier ตรวจ Safety; 5) JIT Compile เป็น Native Code; 6) Attach เข้า Hook Point (XDP/TC/kprobe); 7) Kernel Execute เมื่อ Event เกิด; 8) BPF Map แชร์ State กับ Userspace"),
    makeI("Senior", "เมื่อไรใช้ XDP vs TC Hook?", "XDP: ต้องการ Speed สูงสุด (DDoS Protection, Load Balancer) — ทำงานก่อน SKB Allocation; TC: ต้องการ Context มากกว่า (VETH Pod interface, Egress control, Connection tracking) — Cilium ใช้ TC เป็นหลัก"),
  ],
  portfolioTask: {
    title: "Kubernetes Network Observability Lab",
    description: "Deploy Cilium + Hubble + Grafana เพื่อ Full Network Observability",
    deliverables: ["Kubernetes Network Diagram", "CNI Selection Justification", "Hubble Flow Dashboard", "L7 NetworkPolicy", "eBPF Observability Setup", "Troubleshooting Playbook"],
  },
  tags: ["eBPF", "XDP", "Cilium", "Kubernetes", "Observability", "Performance", "Kernel"],
  order: 3,
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
    lessons: [k8sNetworking, cniDeepDive, ebpfXdp],
    totalXp: 450,
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
