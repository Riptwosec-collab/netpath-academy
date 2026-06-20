export interface Flashcard {
  id:       string;
  front:    string;   // คำถาม / command
  back:     string;   // คำตอบ / output
  category: string;
  tags:     string[];
}

export const flashcards: Flashcard[] = [
  /* ── OSI Model ─────────────────────────────────────────── */
  { id: "osi-1",  category: "OSI Model",  tags: ["osi","layer"],   front: "OSI Layer 1 คืออะไร?",                         back: "Physical Layer — รับผิดชอบสัญญาณไฟฟ้า/แสง, bits, สาย, connector เช่น RJ-45, Fiber" },
  { id: "osi-2",  category: "OSI Model",  tags: ["osi","layer"],   front: "OSI Layer 2 คืออะไร?",                         back: "Data Link Layer — MAC Address, Ethernet Frame, VLAN, STP, ทำงานบน Switch" },
  { id: "osi-3",  category: "OSI Model",  tags: ["osi","layer"],   front: "OSI Layer 3 คืออะไร?",                         back: "Network Layer — IP Address, Routing, OSPF, BGP, ทำงานบน Router" },
  { id: "osi-4",  category: "OSI Model",  tags: ["osi","layer"],   front: "OSI Layer 4 คืออะไร?",                         back: "Transport Layer — TCP (reliable, connection-oriented), UDP (fast, connectionless), Port numbers" },
  { id: "osi-5",  category: "OSI Model",  tags: ["osi","layer"],   front: "OSI Layer 7 คืออะไร?",                         back: "Application Layer — HTTP, HTTPS, FTP, DNS, SMTP, SSH — สิ่งที่ User โต้ตอบโดยตรง" },

  /* ── IP Addressing ─────────────────────────────────────── */
  { id: "ip-1",   category: "IP",         tags: ["ip","subnet"],   front: "/24 มีกี่ host ที่ใช้ได้?",                    back: "254 hosts (2^8 - 2 = 254) — ลบ Network address และ Broadcast address" },
  { id: "ip-2",   category: "IP",         tags: ["ip","subnet"],   front: "/30 มีกี่ host ที่ใช้ได้?",                    back: "2 hosts (2^2 - 2 = 2) — ใช้สำหรับ Point-to-Point link" },
  { id: "ip-3",   category: "IP",         tags: ["ip","subnet"],   front: "Subnet mask ของ /26 คืออะไร?",                  back: "255.255.255.192 (11111111.11111111.11111111.11000000) — 64 addresses, 62 hosts" },
  { id: "ip-4",   category: "IP",         tags: ["ip","private"],  front: "Private IP Range ตาม RFC 1918 มีอะไรบ้าง?",     back: "10.0.0.0/8 · 172.16.0.0/12 (172.16-31.x.x) · 192.168.0.0/16" },
  { id: "ip-5",   category: "IP",         tags: ["ip","ipv6"],     front: "IPv6 Loopback address คืออะไร?",                back: "::1 (เทียบกับ 127.0.0.1 ใน IPv4)" },
  { id: "ip-6",   category: "IP",         tags: ["ip","ipv6"],     front: "IPv6 Link-Local ขึ้นต้นด้วยอะไร?",              back: "FE80::/10 — ใช้ได้เฉพาะ Local Link ไม่ route ข้าม network" },

  /* ── Routing Protocols ─────────────────────────────────── */
  { id: "rt-1",   category: "Routing",    tags: ["ospf","igp"],    front: "OSPF ใช้ Algorithm อะไร?",                     back: "Dijkstra SPF (Shortest Path First) — Link-State protocol" },
  { id: "rt-2",   category: "Routing",    tags: ["ospf"],          front: "OSPF Default Administrative Distance คือ?",    back: "110 (EIGRP=90, RIP=120, Static=1, Connected=0)" },
  { id: "rt-3",   category: "Routing",    tags: ["bgp"],           front: "BGP ใช้ TCP Port อะไร?",                       back: "TCP Port 179" },
  { id: "rt-4",   category: "Routing",    tags: ["bgp"],           front: "BGP เป็น Protocol ประเภทอะไร?",                back: "Path Vector Protocol — ใช้ AS-PATH เพื่อป้องกัน loop" },
  { id: "rt-5",   category: "Routing",    tags: ["bgp","attr"],    front: "BGP Best Path เลือก attribute อะไรก่อน?",      back: "WEIGHT → LOCAL-PREF → AS-PATH length → ORIGIN → MED → eBGP over iBGP" },
  { id: "rt-6",   category: "Routing",    tags: ["eigrp"],         front: "EIGRP Default Metric ใช้อะไร?",                back: "Bandwidth + Delay (K1=1, K3=1 by default)" },

  /* ── Switching ─────────────────────────────────────────── */
  { id: "sw-1",   category: "Switching",  tags: ["vlan"],          front: "VLAN Trunk protocol ที่ใช้บ่อยที่สุดคืออะไร?", back: "IEEE 802.1Q (dot1Q) — inserts 4-byte VLAN tag เข้า Ethernet frame" },
  { id: "sw-2",   category: "Switching",  tags: ["stp"],           front: "STP Root Bridge เลือกจากอะไร?",                back: "Bridge ID ต่ำสุด = Priority (0-65535) + MAC Address — ค่า default priority = 32768" },
  { id: "sw-3",   category: "Switching",  tags: ["stp","portfast"],front: "PortFast ใช้กับ port ประเภทใด?",               back: "Access port ที่เชื่อมต่อ end-device (PC, Server) — ข้าม Listening/Learning state" },
  { id: "sw-4",   category: "Switching",  tags: ["vlan","trunk"],  front: "คำสั่งตั้งค่า Trunk port บน Cisco Switch?",    back: "interface Gi0/1\n switchport mode trunk\n switchport trunk allowed vlan 10,20" },

  /* ── Security ──────────────────────────────────────────── */
  { id: "sec-1",  category: "Security",   tags: ["acl"],           front: "Standard ACL vs Extended ACL?",               back: "Standard: กรองเฉพาะ Source IP (ACL 1-99)\nExtended: กรอง Source/Dest IP + Port + Protocol (ACL 100-199)" },
  { id: "sec-2",  category: "Security",   tags: ["acl"],           front: "Extended ACL ควรวางใกล้อะไร?",                back: "Source — เพื่อลด unnecessary traffic traversal (Standard ควรวางใกล้ Destination)" },
  { id: "sec-3",  category: "Security",   tags: ["nat"],           front: "PAT (Port Address Translation) คืออะไร?",      back: "NAT Overload — แปลง Private IP หลายตัวผ่าน Public IP เดียว โดยต่างกันที่ Port number" },
  { id: "sec-4",  category: "Security",   tags: ["vpn"],           front: "IPsec VPN มี Phase อะไรบ้าง?",                back: "Phase 1: IKE SA (authenticate + key exchange)\nPhase 2: IPsec SA (encrypt data tunnel)" },

  /* ── Cisco IOS Commands ────────────────────────────────── */
  { id: "cmd-1",  category: "Commands",   tags: ["cisco","show"],  front: "show ip interface brief",                      back: "แสดง IP address และ Status ของทุก interface\nInterface / IP-Address / OK? / Method / Status / Protocol" },
  { id: "cmd-2",  category: "Commands",   tags: ["cisco","show"],  front: "show ip route",                                back: "แสดง Routing Table\nC=Connected, S=Static, O=OSPF, B=BGP, R=RIP" },
  { id: "cmd-3",  category: "Commands",   tags: ["cisco","ospf"],  front: "show ip ospf neighbor",                        back: "แสดง OSPF Neighbor: Neighbor ID / Priority / State / Dead Time / Interface\nต้องเห็น FULL state" },
  { id: "cmd-4",  category: "Commands",   tags: ["cisco","bgp"],   front: "show bgp summary",                             back: "แสดง BGP Neighbor สรุป: State/PfxRcd\nถ้าเป็นตัวเลข = Established" },
  { id: "cmd-5",  category: "Commands",   tags: ["cisco","vlan"],  front: "show vlan brief",                              back: "แสดง VLAN ID, Name, Status และ Ports ที่ Assign" },
  { id: "cmd-6",  category: "Commands",   tags: ["cisco","debug"], front: "debug ip ospf events",                         back: "Debug OSPF events realtime — ดู Hello, DB Exchange, SPF calculation\nปิดด้วย undebug all" },
  { id: "cmd-7",  category: "Commands",   tags: ["cisco","config"],front: "คำสั่งเข้า Interface configuration mode?",     back: "interface GigabitEthernet0/0\nหรือ int gi0/0 (shortcut)" },
  { id: "cmd-8",  category: "Commands",   tags: ["cisco","save"],  front: "บันทึก config บน Cisco IOS?",                  back: "copy running-config startup-config\nหรือ write memory (ย่อ: wr)" },

  /* ── Protocols & Ports ─────────────────────────────────── */
  { id: "port-1", category: "Protocols",  tags: ["port","tcp"],    front: "HTTP ใช้ Port อะไร?",                          back: "Port 80 (TCP)" },
  { id: "port-2", category: "Protocols",  tags: ["port","tcp"],    front: "HTTPS ใช้ Port อะไร?",                         back: "Port 443 (TCP + TLS)" },
  { id: "port-3", category: "Protocols",  tags: ["port","tcp"],    front: "SSH ใช้ Port อะไร?",                           back: "Port 22 (TCP)" },
  { id: "port-4", category: "Protocols",  tags: ["port","udp"],    front: "DNS ใช้ Port อะไร?",                           back: "Port 53 (UDP สำหรับ Query, TCP สำหรับ Zone Transfer)" },
  { id: "port-5", category: "Protocols",  tags: ["port","udp"],    front: "DHCP ใช้ Port อะไร?",                          back: "Client→Server: UDP 67\nServer→Client: UDP 68" },
  { id: "port-6", category: "Protocols",  tags: ["port","tcp"],    front: "Telnet ใช้ Port อะไร?",                        back: "Port 23 (TCP) — ไม่ Encrypt ห้ามใช้ใน Production" },

  /* ── Troubleshooting ───────────────────────────────────── */
  { id: "ts-1",   category: "Troubleshooting", tags: ["debug"],    front: "Layer ไหนเช็กก่อนเมื่อ connectivity มีปัญหา?", back: "Bottom-up approach: Physical (Layer 1) → Data Link → Network → Transport\nเช็ก cable, interface status, IP, routing ตามลำดับ" },
  { id: "ts-2",   category: "Troubleshooting", tags: ["ping"],     front: "ping ล้มเหลว แต่ interface up/up — ตรวจสอบอะไร?",back: "1. Default Gateway ถูกต้อง?\n2. Route มีใน Table?\n3. ACL บล็อกอยู่?\n4. NAT ทำงานถูกต้อง?" },
  { id: "ts-3",   category: "Troubleshooting", tags: ["ospf"],     front: "OSPF Neighbor ไม่ขึ้น — สาเหตุหลักคืออะไร?",   back: "1. Hello/Dead timer ไม่ตรงกัน\n2. Area ID ไม่ตรงกัน\n3. Network type ต่างกัน\n4. Authentication ผิด\n5. MTU ไม่ตรงกัน" },
];

export const flashcardCategories = Array.from(new Set(flashcards.map(f => f.category)));
export const allTags = Array.from(new Set(flashcards.flatMap(f => f.tags)));
