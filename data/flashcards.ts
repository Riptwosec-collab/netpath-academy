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

  /* ── Cisco Commands Extended ───────────────────────────── */
  { id: "cmd-9",   category: "Commands",   tags: ["cisco","bgp"],    front: "ดู BGP neighbor status ทั้งหมด?",                back: "show bgp ipv4 unicast summary\nดู State/PfxRcd — Established = OK" },
  { id: "cmd-10",  category: "Commands",   tags: ["cisco","vlan"],   front: "ดู VLAN ทั้งหมดบน switch?",                     back: "show vlan brief\nแสดง VLAN ID, Name, Status, Ports" },
  { id: "cmd-11",  category: "Commands",   tags: ["cisco","trunk"],  front: "ตรวจสอบ trunk port บน switch?",                 back: "show interfaces trunk\nแสดง Port, Mode, Encap, Native VLAN, VLANs allowed" },
  { id: "cmd-12",  category: "Commands",   tags: ["cisco","stp"],    front: "ดู Spanning Tree status?",                      back: "show spanning-tree\nหรือ show spanning-tree vlan X\nดู Root Bridge, Port States" },
  { id: "cmd-13",  category: "Commands",   tags: ["cisco","nat"],    front: "ดู NAT translations ปัจจุบัน?",                 back: "show ip nat translations\nหรือ show ip nat statistics" },
  { id: "cmd-14",  category: "Commands",   tags: ["cisco","route"],  front: "ดู routing table เฉพาะ OSPF routes?",           back: "show ip route ospf\nหรือ show ip route | include O" },
  { id: "cmd-15",  category: "Commands",   tags: ["cisco","acl"],    front: "ดู ACL และ match count?",                       back: "show ip access-lists\nหรือ show access-lists" },
  { id: "cmd-16",  category: "Commands",   tags: ["cisco","dhcp"],   front: "ดู DHCP lease ที่ออกไปแล้ว?",                  back: "show ip dhcp binding\nหรือ show ip dhcp pool" },
  { id: "cmd-17",  category: "Commands",   tags: ["cisco","ntp"],    front: "ตรวจสอบ NTP sync status?",                     back: "show ntp status\nshow ntp associations\nดู * = synchronized" },
  { id: "cmd-18",  category: "Commands",   tags: ["cisco","eigrp"],  front: "ดู EIGRP neighbor table?",                     back: "show ip eigrp neighbors\nดู Uptime, SRTT, Q Cnt" },
  { id: "cmd-19",  category: "Commands",   tags: ["cisco","mpls"],   front: "ดู MPLS label forwarding table?",              back: "show mpls forwarding-table\nดู Local tag, Outgoing tag, Prefix" },
  { id: "cmd-20",  category: "Commands",   tags: ["cisco","qos"],    front: "ดู QoS policy stats บน interface?",            back: "show policy-map interface GigabitEthernet0/0\nดู Class stats, drops, queues" },

  /* ── Subnetting ────────────────────────────────────────── */
  { id: "sub-1",   category: "Subnetting", tags: ["subnet","cidr"],  front: "/24 subnet มีกี่ host?",                       back: "254 hosts (256 - 2)\n2^8 - 2 = 254\nNetwork: .0, Broadcast: .255" },
  { id: "sub-2",   category: "Subnetting", tags: ["subnet","cidr"],  front: "/25 subnet มีกี่ host?",                       back: "126 hosts (128 - 2)\n2^7 - 2 = 126\nแบ่ง /24 ได้ 2 subnet" },
  { id: "sub-3",   category: "Subnetting", tags: ["subnet","cidr"],  front: "/26 subnet มีกี่ host?",                       back: "62 hosts (64 - 2)\n2^6 - 2 = 62\nแบ่ง /24 ได้ 4 subnet" },
  { id: "sub-4",   category: "Subnetting", tags: ["subnet","cidr"],  front: "/27 subnet มีกี่ host?",                       back: "30 hosts (32 - 2)\n2^5 - 2 = 30\nแบ่ง /24 ได้ 8 subnet" },
  { id: "sub-5",   category: "Subnetting", tags: ["subnet","cidr"],  front: "/28 subnet มีกี่ host?",                       back: "14 hosts (16 - 2)\n2^4 - 2 = 14\nแบ่ง /24 ได้ 16 subnet" },
  { id: "sub-6",   category: "Subnetting", tags: ["subnet","cidr"],  front: "/30 subnet ใช้ทำอะไร?",                       back: "Point-to-point link\n2 hosts เท่านั้น (4 - 2 = 2)\nเหมาะ Router-to-Router link" },
  { id: "sub-7",   category: "Subnetting", tags: ["subnet","mask"],  front: "255.255.255.0 เป็น CIDR notation อะไร?",       back: "/24\n255.255.255.0 = 11111111.11111111.11111111.00000000\n24 bit = /24" },
  { id: "sub-8",   category: "Subnetting", tags: ["subnet","mask"],  front: "255.255.255.128 เป็น CIDR notation อะไร?",     back: "/25\n128 = 10000000 = 1 bit\n24 + 1 = /25" },
  { id: "sub-9",   category: "Subnetting", tags: ["subnet","calc"],  front: "192.168.10.0/24 แบ่ง /26 ได้กี่ subnet?",      back: "4 subnet\n/26 = 2 เพิ่มมา 2 bit = 2² = 4 subnet\n.0, .64, .128, .192" },
  { id: "sub-10",  category: "Subnetting", tags: ["subnet","calc"],  front: "10.0.0.0/8 กี่ host ทั้งหมด?",                back: "16,777,214 hosts\n2^24 - 2 = 16,777,214\nClass A private range" },
  { id: "sub-11",  category: "Subnetting", tags: ["subnet","ipv6"],  front: "IPv6 /64 มีกี่ address?",                     back: "2^64 = ~1.8 × 10^19 addresses\n/64 เป็น standard subnet size สำหรับ LAN ใน IPv6" },
  { id: "sub-12",  category: "Subnetting", tags: ["subnet","vlsm"],  front: "VLSM คืออะไร?",                               back: "Variable Length Subnet Masking\nใช้ subnet mask ขนาดต่างกันในเครือข่ายเดียวกัน\nประหยัด IP address space" },

  /* ── BGP Attributes ────────────────────────────────────── */
  { id: "bgp-1",   category: "BGP",        tags: ["bgp","attribute"],front: "BGP Best Path ดู attribute ลำดับที่ 1 คืออะไร?",back: "Weight (Cisco proprietary)\nค่าสูงกว่าดีกว่า, local เท่านั้น ไม่ advertise" },
  { id: "bgp-2",   category: "BGP",        tags: ["bgp","attribute"],front: "Local Preference ส่งถึง peer ประเภทใด?",        back: "iBGP peer เท่านั้น (ภายใน AS เดียวกัน)\nค่าสูงกว่าดีกว่า — default = 100" },
  { id: "bgp-3",   category: "BGP",        tags: ["bgp","attribute"],front: "AS Path Prepending ใช้ทำอะไร?",                back: "เพิ่ม AS number ซ้ำๆ ใน AS Path\nทำให้ path ดูยาวกว่า → ไม่ถูกเลือก\nใช้ Traffic Engineering inbound" },
  { id: "bgp-4",   category: "BGP",        tags: ["bgp","attribute"],front: "MED (Multi-Exit Discriminator) คืออะไร?",      back: "บอก neighbor AS ว่าควรเข้าผ่าน entry ใด\nค่าต่ำกว่าดีกว่า\nส่งออกไปยัง eBGP neighbor" },
  { id: "bgp-5",   category: "BGP",        tags: ["bgp","community"],front: "BGP Community 'no-export' หมายความว่าอะไร?",   back: "ไม่ advertise prefix ออกนอก AS\n(ยังส่งได้ใน Confederation)\nwell-known: 0xFFFFFF01" },
  { id: "bgp-6",   category: "BGP",        tags: ["bgp","community"],front: "BGP Community 'no-advertise' คืออะไร?",        back: "ไม่ advertise ให้ peer ใดเลย ทั้ง iBGP และ eBGP\nwell-known: 0xFFFFFF02" },
  { id: "bgp-7",   category: "BGP",        tags: ["bgp","timer"],    front: "BGP keepalive และ hold timer default คือ?",    back: "Keepalive: 60 วินาที\nHold Time: 180 วินาที\nถ้าไม่ได้รับ keepalive 3 ครั้งถือว่า peer down" },
  { id: "bgp-8",   category: "BGP",        tags: ["bgp","state"],    front: "BGP neighbor states (ตามลำดับ)?",              back: "Idle → Connect → Active → OpenSent → OpenConfirm → Established\nEstablished = ทำงานปกติ" },
  { id: "bgp-9",   category: "BGP",        tags: ["bgp","rr"],       front: "Route Reflector แก้ปัญหาอะไร?",               back: "iBGP full-mesh requirement\nRR re-advertise route ให้ client ลด O(n²) peer เป็น O(n)" },
  { id: "bgp-10",  category: "BGP",        tags: ["bgp","port"],     front: "BGP ใช้ TCP port อะไร?",                      back: "TCP port 179\nใช้ TCP เพื่อ reliable delivery" },

  /* ── Troubleshooting Commands ──────────────────────────── */
  { id: "ts-4",    category: "Troubleshooting", tags: ["debug","ospf"],  front: "OSPF route หาย — คำสั่งตรวจสอบ?",          back: "show ip ospf neighbor\nshow ip ospf database\nshow ip route ospf\ndebug ip ospf adj" },
  { id: "ts-5",    category: "Troubleshooting", tags: ["debug","bgp"],   front: "BGP prefix ไม่ install — ตรวจอะไร?",       back: "show bgp ipv4 unicast X.X.X.X\nตรวจ > (best) มีหรือไม่\nตรวจ next-hop reachable\nตรวจ network statement" },
  { id: "ts-6",    category: "Troubleshooting", tags: ["debug","vlan"],  front: "PC ใน VLAN เดียวกัน ping ไม่ถึงกัน — ตรวจอะไร?", back: "show vlan brief (VLAN active?)\nshow interfaces switchport (correct VLAN?)\nตรวจ trunk allowed VLAN" },
  { id: "ts-7",    category: "Troubleshooting", tags: ["debug","nat"],   front: "NAT ไม่ทำงาน — ตรวจสอบอะไร?",             back: "show ip nat translations (มี entry?)\nshow ip nat statistics\nตรวจ ACL ใน nat rule\nตรวจ ip nat inside/outside บน interface" },
  { id: "ts-8",    category: "Troubleshooting", tags: ["debug","dhcp"],  front: "Client ไม่ได้ IP จาก DHCP — ตรวจอะไร?",   back: "show ip dhcp pool\nshow ip dhcp binding\nตรวจ ip helper-address\nตรวจ excluded-address\ndebug ip dhcp server events" },
  { id: "ts-9",    category: "Troubleshooting", tags: ["debug","span"],  front: "STP ทำให้ port blocking — ตรวจอะไร?",     back: "show spanning-tree\nดู Root Bridge, Port role, Port state\nตรวจ BPDUGuard, PortFast setting" },
  { id: "ts-10",   category: "Troubleshooting", tags: ["debug","eigrp"], front: "EIGRP stuck in ACTIVE state — คืออะไร?",  back: "Router ส่ง Query แต่ไม่ได้รับ Reply ใน 3 นาที (SIA)\nสาเหตุ: link ล่มระหว่าง Query, neighbor ยุ่ง\nแก้: ตรวจ connectivity, ใช้ stub" },

  /* ── Ports & Protocols Extended ───────────────────────── */
  { id: "port-7",  category: "Protocols",  tags: ["port","tcp"],    front: "FTP ใช้ Port อะไร?",                            back: "Port 21 (Control), Port 20 (Data Active mode)\nFTPS: 990 (implicit), 21 (explicit)" },
  { id: "port-8",  category: "Protocols",  tags: ["port","udp"],    front: "SNMP ใช้ Port อะไร?",                           back: "UDP 161 (SNMP Agent)\nUDP 162 (SNMP Trap)" },
  { id: "port-9",  category: "Protocols",  tags: ["port","udp"],    front: "TFTP ใช้ Port อะไร?",                           back: "UDP 69\nTransfer file ไม่มี authentication — ใช้เฉพาะ trusted network" },
  { id: "port-10", category: "Protocols",  tags: ["port","tcp"],    front: "SMTP ใช้ Port อะไร?",                           back: "Port 25 (SMTP), Port 465 (SMTPS), Port 587 (Submission)" },
  { id: "port-11", category: "Protocols",  tags: ["port","tcp"],    front: "BGP ใช้ Port อะไร?",                            back: "TCP Port 179" },
  { id: "port-12", category: "Protocols",  tags: ["port","tcp"],    front: "LDAP ใช้ Port อะไร?",                           back: "TCP/UDP 389 (LDAP)\nTCP 636 (LDAPS)" },

];

export const flashcardCategories = Array.from(new Set(flashcards.map(f => f.category)));
export const allTags = Array.from(new Set(flashcards.flatMap(f => f.tags)));
