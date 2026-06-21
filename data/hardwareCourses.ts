import type { HardwareLesson, HardwareCategoryInfo } from "@/types/hardware";

// ─── Helper factories ─────────────────────────────────────────────
const makeQ = (q: string, c: string[], a: string, e: string) => ({ question: q, choices: c, answer: a, explanation: e });
const makeI = (l: "Junior" | "Mid" | "Senior", q: string, a: string) => ({ level: l, question: q, answerGuide: a });

// ─────────────────────────────────────────────────────────────────
// HARDWARE: CABLING & CONNECTORS
// ─────────────────────────────────────────────────────────────────
const cablingLesson: HardwareLesson = {
  id: "hw-cab-001",
  slug: "cabling-connectors",
  title: "Cabling & Connectors",
  titleTh: "สายและหัวต่อทุกประเภท",
  category: "cabling",
  level: "Beginner",
  duration: "90 min",
  xp: 100,
  description: "เรียนรู้ Copper Cable, Fiber Cable และ Transceiver ทุกประเภท พร้อม Comparison Table และ Use Case",
  deviceRole: "Physical medium สำหรับส่งสัญญาณ Network",
  osiLayer: ["Layer 1 — Physical"],
  commonPorts: ["RJ45", "LC", "SC", "MPO/MTP", "SFP", "QSFP"],
  commonSpeeds: ["1G", "10G", "25G", "40G", "100G", "400G", "800G"],
  useCases: ["LAN Cabling", "Data Center Interconnect", "Long-haul WAN", "GPU Fabric"],

  components: [
    { name: "Cat6A UTP", description: "10GbE สูงสุด 100m, เหมาะสำหรับ Access Layer" },
    { name: "Cat8", description: "25/40GbE สูงสุด 30m, เหมาะ Data Center ToR" },
    { name: "Single-mode Fiber (OS2)", description: "1310/1550nm, ระยะไกล 40km+ เหมาะ WAN/Campus Backbone" },
    { name: "Multi-mode Fiber (OM4)", description: "850nm, สูงสุด 400m@100G เหมาะ Data Center" },
    { name: "SFP+ (10G)", description: "Form factor 10GbE สำหรับ Access/Distribution Switch" },
    { name: "QSFP28 (100G)", description: "Form factor 100GbE สำหรับ Spine Switch" },
    { name: "QSFP-DD (400G)", description: "Form factor 400GbE สำหรับ AI Fabric/Spine" },
    { name: "DAC (Direct Attach Cable)", description: "Passive Cable + Transceiver รวมกัน ระยะสั้น <7m ราคาถูก" },
    { name: "AOC (Active Optical Cable)", description: "Fiber ใน Cable + Transceiver ระยะ 10-100m" },
    { name: "MPO/MTP Cable", description: "Multi-fiber connector 12/24 fiber ใช้กับ 40G/100G Parallel Optics" },
  ],

  howItWorks: [
    "Copper Cable (UTP/STP) ส่งสัญญาณไฟฟ้าผ่านลวดทองแดง",
    "Fiber Optic ส่งแสง (Laser/LED) ผ่าน Glass Core",
    "Single-mode fiber มี Core ขนาดเล็ก 9μm แสง propagate แนวตรง ระยะไกล",
    "Multi-mode fiber มี Core ขนาด 50/62.5μm ราคาถูกกว่า ระยะสั้น",
    "Transceiver (SFP/QSFP) แปลง Electrical Signal ↔ Optical Signal",
    "DAC ใช้ Passive Copper Wire สั้นๆ ใส่ SFP/QSFP Housing ไม่ต้องแปลงเป็น Optical",
  ],

  selectionGuide: [
    "ระยะ < 5m: ใช้ DAC (ถูกที่สุด, ไม่มี Transceiver จริง)",
    "ระยะ 5-100m ใน DC: ใช้ AOC หรือ Multi-mode Fiber + SR Transceiver",
    "ระยะ < 100m บน Copper: ใช้ Cat6A (1/10G) หรือ Cat8 (25/40G)",
    "ระยะ > 300m: ต้องใช้ Single-mode Fiber",
    "ระยะ > 10km: Single-mode + LR/ER Transceiver",
    "GPU Cluster (< 10m): DAC 400G หรือ AOC 400G",
    "Cross-connect DC (< 500m): OM4 + SR4 Transceiver",
  ],

  installationGuide: [
    "Copper: วัดระยะ, เดินสายตาม TIA-568 Standard, ทำ Termination ด้วย RJ45",
    "Fiber: ระวัง Minimum Bend Radius (30mm สำหรับ Single-mode)",
    "Fiber: ทำความสะอาด Connector ก่อน Plug ทุกครั้ง (ใช้ IEC Cleaner)",
    "Label สายทุกเส้นทั้ง 2 ด้าน",
    "Test ด้วย Cable Tester หรือ OTDR หลัง Install",
    "Transceiver: ถอด Dust Cap ออกเฉพาะตอนจะใส่ Fiber",
  ],

  configurationConcept: [
    "Switch Port Speed/Duplex ต้องตรงกับ Cable/Transceiver",
    "Auto-negotiation ทำงานกับ Copper ไม่ทำงานกับ Fiber (ต้อง Set Manual)",
    "DOM (Digital Optical Monitoring) ดู Optical Power บน Transceiver",
    "show interfaces transceiver — ดู Tx/Rx Power, Temperature",
  ],

  troubleshooting: [
    { symptom: "Interface Down แต่ Fiber เสียบอยู่", possibleCause: "Optical Power ต่ำเกินไป หรือ Wrong Transceiver Type", check: "show interfaces transceiver ดู Rx Power", fix: "ทำความสะอาด Connector, ตรวจ Budget, เปลี่ยน Transceiver ถ้า Wrong Type" },
    { symptom: "High Error Rate บน Copper", possibleCause: "Cable damaged, Speed/Duplex mismatch, หรือ EMI", check: "show interfaces ดู CRC/Input errors", fix: "เปลี่ยนสาย, Fix Speed Duplex, ห่าง EMI Source" },
    { symptom: "Fiber Link Up แต่ Optical Power ต่ำ", possibleCause: "Dirty Connector, Broken Fiber, หรือ Wrong Cable Type", check: "วัด Optical Power ด้วย Power Meter, ดู OTDR", fix: "ทำความสะอาด Connector, ตรวจ Loss Budget" },
    { symptom: "DAC ไม่ทำงาน", possibleCause: "Vendor Incompatibility หรือ DAC เกิน Maximum Length", check: "ตรวจ Switch Compatibility List, วัดระยะ", fix: "ใช้ DAC ที่ Compatible, ใช้ AOC ถ้าระยะเกิน" },
  ],

  checklist: [
    "ทำความสะอาด Fiber Connector ก่อน Plug",
    "Label สายทุกเส้นทั้ง 2 ด้าน",
    "Test Continuity ก่อน Deploy",
    "ตรวจ Optical Power Tx/Rx อยู่ใน Spec",
    "Secure สายไม่ให้ Bend เกิน Minimum Radius",
    "ใช้ Transceiver ที่ Compatible กับ Switch",
    "บันทึก Cable Map และ Port Assignment",
  ],

  labs: [
    {
      title: "Transceiver Compatibility Check",
      estimatedMinutes: 30,
      steps: [
        "รัน show interfaces transceiver บน Switch",
        "ดู Vendor, Type, Tx/Rx Power ของ Transceiver ที่ติดตั้ง",
        "เปรียบเทียบกับ Spec Sheet",
        "ตรวจสอบว่า Power อยู่ใน Acceptable Range",
        "บันทึก Serial Number และ Part Number",
      ],
    },
  ],

  quiz: [
    makeQ("DAC ย่อมาจากอะไร?", ["Dual Attached Cable", "Direct Attach Cable", "Data Aggregation Cable", "Dense Attached Connector"], "Direct Attach Cable", "DAC = Direct Attach Cable — สาย Copper สั้นๆ ที่มี SFP/QSFP Connector ติดมาทั้ง 2 ด้าน ราคาถูก Latency ต่ำ ใช้ได้ไม่เกิน 7m"),
    makeQ("Single-mode Fiber มี Core ขนาดเท่าไร?", ["50 μm", "62.5 μm", "9 μm", "125 μm"], "9 μm", "Single-mode: Core 9μm ทำให้แสง propagate แนวตรงระยะไกล; Multi-mode: Core 50/62.5μm"),
    makeQ("QSFP-DD ทำงานที่ความเร็วเท่าไร?", ["100G", "200G", "400G", "800G"], "400G", "QSFP-DD = Quad Small Form-factor Double Density มี 8 lane × 50G = 400G ใช้สำหรับ Data Center / AI Fabric"),
    makeQ("OM4 Fiber เหมาะสำหรับ 100G ที่ระยะสูงสุดเท่าไร?", ["100m", "200m", "400m", "1km"], "400m", "OM4 (Multi-mode) รองรับ 100G-SR4 ได้สูงสุด 400m เหมาะสำหรับ Data Center Interconnect"),
    makeQ("ทำไมต้องทำความสะอาด Fiber Connector ก่อน Plug?", ["เพิ่ม Speed", "ป้องกัน Optical Loss จาก Dust/Contamination", "ป้องกันไฟดับ", "ลด Latency"], "ป้องกัน Optical Loss จาก Dust/Contamination", "Dust ขนาดเล็กบน Fiber End Face ทำให้ Optical Loss สูงมาก จน Link Down หรือ Error Rate สูง — ทำความสะอาดทุกครั้ง"),
  ],

  interviewQuestions: [
    makeI("Junior", "อธิบายความแตกต่าง Single-mode vs Multi-mode Fiber", "Single-mode: Core 9μm, Laser 1310/1550nm, ระยะ > 10km, แพงกว่า; Multi-mode: Core 50μm, LED/VCSEL 850nm, ระยะ < 1km, ถูกกว่า เหมาะ Data Center"),
    makeI("Mid", "เมื่อไรควรใช้ DAC vs AOC vs Optic Transceiver?", "DAC: ระยะ < 5m, ถูกสุด, ใช้ใน ToR; AOC: 5-100m, Flexible, ไม่มี Transceiver แยก; Optic: ระยะ > 100m, เลือก SR/LR/ER ตามระยะ"),
    makeI("Senior", "อธิบาย Optical Power Budget Calculation", "Budget = TX Power − (Fiber Loss × Length) − Connector Loss − Splice Loss − Safety Margin; ต้อง > RX Sensitivity — เช่น TX=0dBm, Loss=0.3dB/km × 10km = 3dB, Connector 2×0.5dB=1dB, Margin 3dB → Need RX Sensitivity > −7dBm"),
  ],
  tags: ["Cabling", "Fiber", "Transceiver", "SFP", "QSFP", "DAC", "AOC", "Cat6A", "Hardware"],
  order: 1,
};

// ─────────────────────────────────────────────────────────────────
// HARDWARE: SWITCH HARDWARE
// ─────────────────────────────────────────────────────────────────
const switchHardware: HardwareLesson = {
  id: "hw-sw-001",
  slug: "switch-hardware",
  title: "Switch Hardware Deep Dive",
  titleTh: "Switch Hardware ทุกประเภท",
  category: "switching",
  level: "Intermediate",
  duration: "90 min",
  xp: 125,
  description: "เรียนรู้ Switch Hardware ทุกประเภท — Architecture, ASIC, Buffer, Port Types, PoE และ Switch Selection Guide",
  deviceRole: "เชื่อมต่อ Device ใน LAN ที่ Layer 2 (MAC Address-based forwarding)",
  osiLayer: ["Layer 2 — Data Link", "Layer 3 — Network (L3 Switch)"],
  commonPorts: ["RJ45", "SFP", "SFP+", "SFP28", "QSFP28", "Console", "Management", "Stack"],
  commonSpeeds: ["1G", "10G", "25G", "40G", "100G", "400G"],
  useCases: ["Access Layer (End User)", "Distribution Layer", "Core Layer", "Data Center Leaf/Spine", "ToR (Top-of-Rack)"],

  components: [
    { name: "ASIC (Application-Specific IC)", description: "Chip หลักที่ทำ Packet Forwarding Hardware speed — ยี่ห้อหลัก: Broadcom Trident/Tomahawk, Cisco ASIC, Mellanox Spectrum" },
    { name: "Switching Fabric", description: "Internal bandwidth ของ Switch — Non-blocking = ทุก Port ส่งได้เต็ม Rate พร้อมกัน" },
    { name: "TCAM (Ternary Content-Addressable Memory)", description: "Memory พิเศษสำหรับ Lookup MAC/IP/ACL ได้เร็วมาก (nanoseconds)" },
    { name: "Buffer Memory", description: "Temporary storage เมื่อ Traffic burst — ยิ่งมาก ยิ่งรองรับ Bursty Traffic ได้ดี" },
    { name: "Control Plane CPU", description: "CPU ทำงาน Routing Protocol, Management, SNMP — แยกจาก ASIC (Data Plane)" },
    { name: "Power Supply Unit (PSU)", description: "Redundant PSU ทำ Hot-swap ได้ A/B Power Feed" },
    { name: "Fan Module", description: "Cooling แบบ Front-to-back หรือ Back-to-front Airflow" },
  ],

  howItWorks: [
    "Switch รับ Ethernet Frame บน Ingress Port",
    "ASIC ดู Destination MAC Address ใน CAM Table",
    "ถ้าเจอ MAC → Forward Frame ไปยัง Port ที่ถูกต้อง",
    "ถ้าไม่เจอ MAC → Flood Frame ออกทุก Port ใน VLAN เดียวกัน (Unknown Unicast Flood)",
    "L3 Switch เพิ่ม IP Route Lookup ใน TCAM เพื่อ Inter-VLAN Routing",
    "QoS Queue จัดลำดับ Packet ตาม Priority ก่อนส่งออก",
  ],

  selectionGuide: [
    "Access Layer: 24-48 Port GbE, PoE+, Uplink SFP+ 10G — เลือกตาม PoE Budget",
    "Distribution Layer: 12-24 Port 10G, Uplink 40G/100G, L3 Routing ได้",
    "Core Layer: High-speed 40G/100G, Non-blocking, Redundant PSU/Fan",
    "Data Center Leaf: 48×10G/25G + 6×100G Uplink, Low Latency ASIC",
    "Data Center Spine: 32×100G หรือ 16×400G, Non-blocking",
    "AI Fabric Spine: 32×400G หรือ 16×800G, Ultra-low Latency",
  ],

  installationGuide: [
    "Mount Switch ใน Rack — Front-to-back Airflow ตาม Hot/Cold Aisle",
    "เชื่อม Power A และ Power B กับ UPS คนละ Feed",
    "เชื่อม Console Cable สำหรับ Initial Config",
    "Config Management IP บน VLAN1 หรือ Out-of-band Port",
    "Update Firmware ให้เป็น Version ล่าสุดที่ Stable",
    "สำรอง Config ก่อน Deploy",
  ],

  configurationConcept: [
    "VLAN, Trunk, STP — ต้อง Config ก่อน Deploy",
    "PoE Budget: ดู Total PoE Power, จัดลำดับ Priority",
    "MLAG/vPC: ทำ Active-Active Uplink ไม่มี STP Block",
    "QoS: เซต Trust DSCP บน Access Port",
  ],

  troubleshooting: [
    { symptom: "Port Down ทั้งที่ Fiber เสียบ", possibleCause: "Wrong Transceiver, Fiber เสีย, หรือ Remote Port ปิดอยู่", check: "show interfaces, show interfaces transceiver", fix: "ตรวจ Transceiver Compatibility, ทำความสะอาด Fiber, ตรวจปลายอีกด้าน" },
    { symptom: "MAC Flapping Alert", possibleCause: "Loop บน Network, หรือ Dual-homed Device ไม่มี MLAG", check: "show mac address-table, ตรวจ STP", fix: "ตรวจ Loop, Enable STP Portfast บน Access Port, ใช้ MLAG" },
    { symptom: "Switch CPU สูงผิดปกติ", possibleCause: "Broadcast Storm, Routing Protocol Storm, หรือ SNMP Poll ถี่เกิน", check: "show processes cpu, show interface counters", fix: "ตรวจ Broadcast Storm Control, ตรวจ STP, ลด SNMP Poll Rate" },
    { symptom: "PoE ไม่จ่ายไฟให้ AP", possibleCause: "PoE Budget เกิน หรือ Port ไม่ได้ Enable PoE", check: "show power inline, show interfaces status", fix: "Config power inline, ตรวจ Budget, ลด Priority Device อื่น" },
  ],

  checklist: [
    "Redundant PSU เชื่อมต่อ A/B Feed",
    "Console Cable พร้อมใช้งาน",
    "Management IP Configured",
    "STP ทำงานถูกต้อง (ไม่มี Loop)",
    "PoE Budget ไม่เกิน 80%",
    "Firmware Up-to-date",
    "Config Backup สำเร็จ",
    "Cable Labeled ทุกเส้น",
  ],

  labs: [
    {
      title: "Switch Hardware Inspection",
      estimatedMinutes: 30,
      steps: [
        "รัน show version — ดู Model, Firmware, Uptime",
        "รัน show interfaces status — ดู Port Status ทั้งหมด",
        "รัน show power inline — ดู PoE Usage",
        "รัน show environment — ดู Temperature, Fan, PSU",
        "รัน show mac address-table — ดู MAC Table",
      ],
    },
  ],

  quiz: [
    makeQ("TCAM ใน Switch ใช้ทำอะไร?", ["Store Config", "Hardware-speed Lookup MAC/IP/ACL", "Control Fan Speed", "Manage Power"], "Hardware-speed Lookup MAC/IP/ACL", "TCAM (Ternary CAM) เป็น Memory พิเศษที่ทำ Lookup ได้ใน nanoseconds — ใช้สำหรับ MAC Table, Route Table, ACL บน ASIC"),
    makeQ("Non-blocking Fabric ใน Switch คืออะไร?", ["Switch ที่ไม่มี Firewall", "ทุก Port ส่งได้เต็ม Rate พร้อมกัน ไม่มี Bottleneck ภายใน", "Switch ที่ไม่ Block VLAN", "Switch ที่ไม่มี Buffer"], "ทุก Port ส่งได้เต็ม Rate พร้อมกัน ไม่มี Bottleneck ภายใน", "Non-blocking = Switching Fabric Bandwidth ≥ Sum of All Port Bandwidth ทำให้ไม่มี Internal Congestion"),
    makeQ("Leaf Switch ใน Spine-Leaf Architecture เชื่อมต่ออะไร?", ["Switch กับ Switch", "Server/Device กับ Spine Switch", "Router กับ Internet", "Data Center กับ WAN"], "Server/Device กับ Spine Switch", "Leaf Switch เชื่อมต่อ Server/Device ที่ Layer ล่าง และ Uplink ไปยัง Spine Switch ทุกตัว"),
    makeQ("MLAG ช่วยแก้ปัญหาอะไร?", ["Firewall ล้ม", "STP Block Uplink ทำให้ Bandwidth เสีย", "DNS ล้ม", "OSPF Reconvergence"], "STP Block Uplink ทำให้ Bandwidth เสีย", "MLAG (Multi-chassis LAG) ทำให้ Server ทำ Active-Active LAG กับ Switch สอง Switch โดย STP ไม่ Block — ใช้ Bandwidth เต็ม"),
    makeQ("PoE++ (802.3bt) จ่ายไฟสูงสุดเท่าไรต่อ Port?", ["15.4W", "30W", "60W", "90W"], "90W", "PoE 802.3af=15.4W; PoE+ 802.3at=30W; PoE++ 802.3bt Type 3=60W, Type 4=90W — ใช้สำหรับ AP, PTZ Camera, Video Phone"),
  ],

  interviewQuestions: [
    makeI("Junior", "ความแตกต่าง L2 Switch vs L3 Switch", "L2: Forward ด้วย MAC Address ไม่ Route ข้าม Subnet; L3: เพิ่ม IP Routing (OSPF/BGP) ทำ Inter-VLAN Routing ได้ — Enterprise ส่วนใหญ่ใช้ L3 Switch ที่ Distribution/Core"),
    makeI("Senior", "อธิบาย Spine-Leaf Architecture และ Trade-off", "Leaf-Spine: ทุก Leaf เชื่อม Spine ทุกตัว — Benefit: Equal-cost Multi-path, No STP, Predictable Latency; Trade-off: Cost สูงกว่า, ต้องการ Fiber เยอะกว่า 3-Tier, ECMP ต้องการ MLAG หรือ ECMP-aware protocol"),
  ],
  tags: ["Switch", "ASIC", "TCAM", "PoE", "Spine-Leaf", "MLAG", "Hardware"],
  order: 1,
};

// ─────────────────────────────────────────────────────────────────
// HARDWARE: AI/GPU INFRASTRUCTURE
// ─────────────────────────────────────────────────────────────────
const aiGpuHardware: HardwareLesson = {
  id: "hw-ai-001",
  slug: "ai-gpu-infrastructure-hardware",
  title: "AI/GPU Infrastructure Hardware",
  titleTh: "AI/GPU Infrastructure Hardware",
  category: "ai-gpu",
  level: "Expert",
  duration: "120 min",
  xp: 200,
  description: "เรียนรู้ Hardware ทุกชิ้นใน AI Cluster — GPU Server, NVLink, NVSwitch, RDMA NIC, SmartNIC/DPU, InfiniBand และ 400/800G Switch",
  deviceRole: "AI Training/Inference Cluster Infrastructure",
  osiLayer: ["Layer 1 — Physical", "Layer 2 — Data Link", "Special: InfiniBand/RDMA Stack"],
  commonPorts: ["NVLink", "PCIe 5.0", "OSFP 400G", "QSFP-DD 400G", "InfiniBand HDR/NDR"],
  commonSpeeds: ["NVLink 900GB/s", "PCIe 5.0 64GB/s", "400G Ethernet/IB", "800G Ethernet"],
  useCases: ["AI Training Cluster", "Inference Farm", "HPC", "Large Language Model Training"],

  components: [
    { name: "GPU (e.g. NVIDIA H100)", description: "AI Compute Engine — HBM3 80GB Memory, 900GB/s Memory BW, NVLink 4.0" },
    { name: "NVLink", description: "NVIDIA เฉพาะ Interconnect ระหว่าง GPU ใน Node เดียวกัน — H100: 900 GB/s ต่อ GPU" },
    { name: "NVSwitch", description: "Chip ที่ทำ NVLink Switching ภายใน Node ให้ทุก GPU คุยกันได้ All-to-All" },
    { name: "PCIe (Gen5)", description: "เชื่อม GPU กับ CPU + NIC + Storage — 64 GB/s bidirectional" },
    { name: "RDMA NIC / HCA", description: "Network Interface ที่รองรับ RDMA — Mellanox/NVIDIA ConnectX, Infiniband HCA" },
    { name: "SmartNIC / DPU", description: "NIC ที่มี ARM CPU ในตัว offload Network Processing — NVIDIA BlueField, Intel IPU" },
    { name: "InfiniBand Switch (NDR)", description: "Switch เฉพาะ InfiniBand — NDR 400G/port, เหมาะ AI Cluster" },
    { name: "400G/800G Ethernet Switch", description: "Switch สำหรับ RoCE Fabric — Broadcom Tomahawk4/5, Arista 7800" },
    { name: "BMC/IPMI/iDRAC", description: "Out-of-band Management Controller บน Server — ควบคุมได้แม้ OS ล้ม" },
  ],

  howItWorks: [
    "GPU Node: Multiple GPU เชื่อมกันด้วย NVLink ผ่าน NVSwitch — bandwidth สูงมาก ภายใน Node",
    "Node-to-Node: ใช้ InfiniBand (HCA) หรือ Ethernet RDMA NIC เชื่อมกับ Switch",
    "RDMA: GPU DMA ข้อมูลผ่าน NIC โดยตรง ไม่ผ่าน CPU — Latency < 2μs",
    "All-Reduce: NCCL Library orchestrate gradient exchange ระหว่างทุก GPU",
    "Storage: parallel file system (GPFS, Lustre, WEKA) เชื่อมผ่าน Storage Network แยก",
    "Management: OOB Network แยก ใช้ BMC/iDRAC สำหรับ Power, Console, Hardware Monitor",
  ],

  selectionGuide: [
    "GPU: เลือกตาม Task — H100 SXM สำหรับ Large-scale Training, H100 PCIe สำหรับ Inference",
    "Interconnect: InfiniBand NDR (400G) สำหรับ High-performance Training; RoCE (Ethernet) ถ้า Cost เป็นปัจจัย",
    "Switch: Non-blocking, Low-latency ASIC (< 1μs); High-radix เพื่อลด Hop Count",
    "NIC: ต้องรองรับ RDMA, Check PCIe Gen, NUMA Affinity",
    "Server: ตรวจ Cooling Capacity (GPU TDP H100 = 700W), Power Supply Redundancy",
    "Cable: DAC 400G ระยะ < 3m; AOC ระยะ 3-10m; Active Fiber > 10m",
  ],

  installationGuide: [
    "ตรวจ Rack Space: GPU Server อาจ 8U ต่อ Node, PDU ต้องรองรับ > 10kW/Rack",
    "Power: Dual PSU > 3000W ต่อ Server, A/B Power Feed",
    "Cooling: Front-to-back airflow, อุณหภูมิ Inlet < 25°C",
    "Network Cabling: Cable Management สำคัญมาก — GPU Cluster มีสายเยอะมาก",
    "OOB: เชื่อม BMC/iDRAC บน OOB Management Switch แยก",
    "BIOS: Enable SR-IOV, Configure PCIe Settings สำหรับ DPU/SmartNIC",
  ],

  configurationConcept: [
    "RDMA: Enable ROCE/IB บน NIC, Config PFC, ECN บน Switch",
    "NVLink/NVSwitch: ตรวจ nvidia-smi nvlink -s",
    "MTU 9000 บนทุก Interface ที่ใช้ RDMA",
    "NUMA Affinity: Bind GPU + NIC + CPU NUMA Node เดียวกันเพื่อ Latency ต่ำสุด",
    "InfiniBand: opensm สำหรับ Subnet Manager, iblinkinfo ดู Topology",
  ],

  troubleshooting: [
    { symptom: "GPU Training ช้ากว่า Baseline มาก", possibleCause: "Network Bottleneck, RDMA ไม่ทำงาน, หรือ NUMA Mismatch", check: "nccl-tests ดู AllReduce BW, ibstat, check PFC counters", fix: "ตรวจ RDMA config, PFC/ECN, NUMA binding, MTU" },
    { symptom: "InfiniBand Port Down", possibleCause: "Fiber เสีย, Wrong Transceiver, หรือ Subnet Manager ไม่ทำงาน", check: "ibstat, iblinkinfo, ตรวจ Optical Power", fix: "ตรวจสาย, Restart opensm, ตรวจ Transceiver" },
    { symptom: "RDMA Connection Fail", possibleCause: "PFC ไม่ได้ Enable, MTU ไม่ตรง, หรือ DSCP ผิด", check: "ib_send_bw ล้มเหลว, ดู Switch PFC stats", fix: "Enable PFC Priority 3, Set MTU 9000, Config DSCP mapping" },
    { symptom: "GPU Server Temperature สูง", possibleCause: "Airflow ไม่ดี, Fan ล้ม, Ambient Temperature สูง", check: "nvidia-smi, ipmitool sdr, ดู Fan Speed", fix: "ตรวจ Airflow Path, เปลี่ยน Fan Module, ลด Ambient Temp" },
  ],

  checklist: [
    "NVLink Topology ถูกต้อง (nvidia-smi topo -m)",
    "RDMA / InfiniBand Link Up ทุก Port",
    "PFC + ECN Configured บน Switch",
    "MTU 9000 บน GPU Fabric Interface",
    "BMC/iDRAC เชื่อมต่อได้ผ่าน OOB",
    "Power Budget ไม่เกิน 80% ของ PDU",
    "Temperature Inlet < 25°C",
    "Storage Network แยกจาก GPU Fabric",
    "NCCL Test Pass ก่อน Production",
  ],

  labs: [
    {
      title: "GPU Infrastructure Health Check",
      estimatedMinutes: 45,
      steps: [
        "รัน nvidia-smi เพื่อดู GPU Status",
        "รัน nvidia-smi nvlink -s เพื่อดู NVLink",
        "รัน ibstat เพื่อดู InfiniBand Status",
        "รัน ib_send_bw เพื่อ Benchmark RDMA Bandwidth",
        "ดู Switch Counters: PFC Stats, ECN Stats, Error Counters",
        "รัน nccl-tests AllReduce ทดสอบ End-to-end Performance",
      ],
    },
  ],

  quiz: [
    makeQ("NVLink ใช้สำหรับอะไร?", ["เชื่อม GPU กับ Internet", "เชื่อม GPU กับ GPU ภายใน Server ด้วย Bandwidth สูง", "เชื่อม Server กับ Switch", "เชื่อม CPU กับ RAM"], "เชื่อม GPU กับ GPU ภายใน Server ด้วย Bandwidth สูง", "NVLink เป็น NVIDIA Proprietary Interconnect สำหรับ GPU-to-GPU ภายใน Node — H100 มี NVLink 4.0 ให้ 900 GB/s total"),
    makeQ("DPU ต่างจาก SmartNIC อย่างไร?", ["ไม่ต่างกัน", "DPU มี ARM CPU ทำงาน Offload Network/Storage Processing ได้เต็มๆ", "SmartNIC เร็วกว่า", "DPU ใช้กับ Wireless เท่านั้น"], "DPU มี ARM CPU ทำงาน Offload Network/Storage Processing ได้เต็มๆ", "DPU (Data Processing Unit) = SmartNIC รุ่นพัฒนา มี ARM Core ใน NIC ทำ Offload Crypto, Storage, vSwitch ออกจาก Host CPU"),
    makeQ("InfiniBand NDR ทำงานที่ความเร็วเท่าไร?", ["100 Gb/s", "200 Gb/s", "400 Gb/s", "800 Gb/s"], "400 Gb/s", "InfiniBand NDR (Next Data Rate) = 400 Gb/s ต่อ Port (2x200G lanes) — รุ่นล่าสุดก่อน XDR"),
    makeQ("ทำไม GPU Cluster ต้องใช้ Non-blocking Switch?", ["ราคาถูกกว่า", "ป้องกัน AI ผิดพลาด", "ทุก GPU ต้องส่ง/รับ Gradient พร้อมกันโดยไม่มี Congestion", "เพิ่ม Security"], "ทุก GPU ต้องส่ง/รับ Gradient พร้อมกันโดยไม่มี Congestion", "AllReduce traffic เป็น All-to-All pattern — Switch ต้อง Non-blocking เพื่อให้ทุก GPU ส่งได้เต็ม Rate พร้อมกัน"),
    makeQ("BMC ใน Server ใช้ทำอะไร?", ["AI Computation", "Out-of-band Management — Power On/Off, Console access แม้ OS ล้ม", "RDMA Traffic", "GPU Cooling"], "Out-of-band Management — Power On/Off, Console access แม้ OS ล้ม", "BMC/IPMI/iDRAC คือ Independent Controller บน Server Board ที่ทำ Remote Management ได้แม้ OS ล้มหรือ Server ดับ"),
  ],

  interviewQuestions: [
    makeI("Senior", "อธิบาย 3 Network ที่แยกกันใน GPU Cluster", "1) GPU Fabric: RDMA/InfiniBand สำหรับ AllReduce — Low latency, High BW; 2) Storage Network: เชื่อม Parallel Storage ด้วย 100G+ Ethernet; 3) Management/OOB: Ethernet ธรรมดา เชื่อม BMC และ OS Management"),
    makeI("Senior", "Tradeoff ระหว่าง InfiniBand กับ RoCE Ethernet สำหรับ AI Cluster", "IB: Latency ต่ำกว่า (< 1μs), Ecosystem เล็ก, แพงกว่า; RoCE: ใช้ Ethernet Ecosystem ใหญ่กว่า ถูกกว่า แต่ต้องการ Lossless Ethernet (PFC/ECN) และ Latency สูงกว่าเล็กน้อย — Trend ปัจจุบัน Hyperscaler เริ่มใช้ RoCE มากขึ้น"),
  ],
  tags: ["AI", "GPU", "NVLink", "NVSwitch", "RDMA", "InfiniBand", "DPU", "SmartNIC", "Hardware"],
  order: 1,
};

// ─────────────────────────────────────────────────────────────────
// HARDWARE CATEGORIES EXPORT
// ─────────────────────────────────────────────────────────────────
export const hardwareCategories: HardwareCategoryInfo[] = [
  {
    id: "cabling",
    title: "Cabling & Connectors",
    titleTh: "สายและหัวต่อ",
    icon: "🔌",
    description: "Copper, Fiber, Transceiver, DAC, AOC, MPO ทุกประเภท",
    color: "blue",
    lessons: [cablingLesson],
    order: 1,
  },
  {
    id: "switching",
    title: "Switch Hardware",
    titleTh: "Switch Hardware",
    icon: "🔀",
    description: "Access, Distribution, Core, Spine-Leaf, ASIC, PoE",
    color: "cyan",
    lessons: [switchHardware],
    order: 2,
  },
  {
    id: "routing",
    title: "Router Hardware",
    titleTh: "Router Hardware",
    icon: "🗺️",
    description: "Enterprise Router, SD-WAN, LTE/5G Router, Modular Router",
    color: "violet",
    lessons: [],
    order: 3,
  },
  {
    id: "security",
    title: "Firewall & Security Appliances",
    titleTh: "Firewall และ Security Appliance",
    icon: "🔒",
    description: "NGFW, UTM, IPS, WAF, VPN Concentrator, SASE Connector",
    color: "rose",
    lessons: [],
    order: 4,
  },
  {
    id: "wireless",
    title: "Wireless Hardware",
    titleTh: "Wireless Hardware",
    icon: "📶",
    description: "AP, WLC, Antenna, Wi-Fi 7, Mesh, Outdoor",
    color: "emerald",
    lessons: [],
    order: 5,
  },
  {
    id: "datacenter",
    title: "Data Center Hardware",
    titleTh: "Data Center Hardware",
    icon: "🏢",
    description: "ToR/Spine/Core Switch, Load Balancer, Console Server, OOB",
    color: "amber",
    lessons: [],
    order: 6,
  },
  {
    id: "ai-gpu",
    title: "AI/GPU Infrastructure Hardware",
    titleTh: "AI/GPU Hardware",
    icon: "🤖",
    description: "GPU Server, NVLink, NVSwitch, RDMA NIC, DPU, 400G/800G Fabric",
    color: "violet",
    lessons: [aiGpuHardware],
    order: 7,
  },
  {
    id: "monitoring",
    title: "Monitoring / TAP / Packet Capture",
    titleTh: "Monitoring และ TAP",
    icon: "📡",
    description: "Network TAP, SPAN, Packet Broker, NDR, Flow Collector",
    color: "sky",
    lessons: [],
    order: 8,
  },
  {
    id: "power-rack-cooling",
    title: "Power / Rack / Cooling",
    titleTh: "Power, Rack และ Cooling",
    icon: "⚡",
    description: "Rack, UPS, PDU, ATS, Airflow, Hot/Cold Aisle",
    color: "yellow",
    lessons: [],
    order: 9,
  },
  {
    id: "isp-wan-edge",
    title: "ISP / WAN / Edge Hardware",
    titleTh: "ISP, WAN และ Edge Hardware",
    icon: "🌐",
    description: "Modem, ONT, CPE, MPLS Router, SD-WAN, Microwave",
    color: "indigo",
    lessons: [],
    order: 10,
  },
  {
    id: "voice-iot-ot",
    title: "Voice / IoT / OT Hardware",
    titleTh: "Voice, IoT และ OT Hardware",
    icon: "📞",
    description: "IP Phone, SBC, IoT Gateway, Industrial Switch, OT/ICS",
    color: "teal",
    lessons: [],
    order: 11,
  },
];

export const allHardwareLessons = hardwareCategories.flatMap(c => c.lessons);
