export type LevelStatus = "completed" | "in-progress" | "locked";

export interface RoadmapLevel {
  level:       number;
  title:       string;      // English title
  titleTh:     string;      // Thai title
  description: string;      // Thai description (legacy)
  descriptionEn: string;    // English description
  skills:      string[];
  status:      LevelStatus;
  objectives:     string[];    // Thai objectives
  objectivesEn:   string[];    // English objectives
  color:       "cyan" | "violet" | "emerald" | "amber" | "rose";
}

export const roadmap: RoadmapLevel[] = [
  {
    level:         1,
    title:         "Network Foundation",
    titleTh:       "พื้นฐาน Network",
    description:   "พื้นฐาน Network สำหรับเริ่มต้น — OSI, TCP/IP, IP Address",
    descriptionEn: "Networking fundamentals — OSI model, TCP/IP, IP addressing and subnetting.",
    skills:        ["OSI Model", "TCP/IP", "IP Address", "Subnetting", "Gateway", "DNS", "DHCP", "ARP", "ICMP", "Basic CLI"],
    status:        "completed",
    objectives:    ["เข้าใจว่า Network ทำงานอย่างไร", "เข้าใจ Packet Flow จาก Source ถึง Destination", "แก้ปัญหา Internet ใช้งานไม่ได้เบื้องต้นได้"],
    objectivesEn:  ["Understand how networks function end-to-end", "Trace packet flow from source to destination", "Troubleshoot basic Internet connectivity issues"],
    color:         "cyan",
  },
  {
    level:         2,
    title:         "Switching",
    titleTh:       "Switching",
    description:   "เรียน VLAN, Trunk, STP และ Layer 2 Security",
    descriptionEn: "Master VLANs, trunking, STP loop prevention, and Layer 2 security techniques.",
    skills:        ["VLAN", "Access Port", "Trunk Port", "Native VLAN", "STP", "RSTP", "EtherChannel", "Port Security", "DHCP Snooping"],
    status:        "in-progress",
    objectives:    ["ออกแบบและแก้ปัญหา Layer 2 Network ได้", "เข้าใจ VLAN และ Switch Port Configuration", "รู้วิธีป้องกัน Loop ด้วย STP"],
    objectivesEn:  ["Design and troubleshoot Layer 2 networks", "Configure VLANs and switch ports correctly", "Prevent loops using STP/RSTP"],
    color:         "cyan",
  },
  {
    level:         3,
    title:         "Routing",
    titleTh:       "Routing",
    description:   "Static Route, OSPF, EIGRP, BGP พื้นฐาน, Route Policy",
    descriptionEn: "Configure and troubleshoot static routes, OSPF, EIGRP, BGP, and route policies.",
    skills:        ["Static Route", "OSPF", "EIGRP", "BGP", "Route Policy", "Route Redistribution", "VRF", "IP SLA"],
    status:        "in-progress",
    objectives:    ["Configure OSPF Single/Multi-Area ได้", "เข้าใจ BGP AS Path และ Route Filtering", "แก้ปัญหา Routing Loop และ Black Hole"],
    objectivesEn:  ["Configure OSPF single and multi-area", "Understand BGP AS-path and route filtering", "Troubleshoot routing loops and black holes"],
    color:         "violet",
  },
  {
    level:         4,
    title:         "Network Services",
    titleTh:       "Network Services",
    description:   "DHCP Server, NAT/PAT, ACL, NTP, Syslog, SNMP",
    descriptionEn: "Deploy essential network services — DHCP, NAT/PAT, ACLs, NTP, Syslog, and SNMP.",
    skills:        ["DHCP Server", "NAT/PAT", "ACL", "NTP", "Syslog", "SNMP", "DNS Server", "HSRP/VRRP"],
    status:        "in-progress",
    objectives:    ["ตั้งค่า DHCP Server และ DHCP Relay ได้", "เข้าใจความแตกต่างระหว่าง NAT และ PAT", "เขียน ACL เพื่อควบคุม Traffic ได้"],
    objectivesEn:  ["Configure DHCP server and relay agent", "Distinguish between NAT and PAT use cases", "Write ACLs to control network traffic"],
    color:         "violet",
  },
  {
    level:         5,
    title:         "Network Security",
    titleTh:       "Network Security",
    description:   "Firewall, VPN, IDS/IPS, 802.1X, RADIUS, Zone-Based Security",
    descriptionEn: "Implement firewalls, VPNs, IDS/IPS, and 802.1X network access control.",
    skills:        ["Firewall", "Zone-Based Firewall", "VPN Site-to-Site", "VPN Remote Access", "IPSec", "SSL VPN", "802.1X", "RADIUS", "IDS/IPS"],
    status:        "locked",
    objectives:    ["ออกแบบ Firewall Zone Policy ได้", "ตั้งค่า VPN Site-to-Site ด้วย IPSec", "Implement 802.1X Network Access Control"],
    objectivesEn:  ["Design firewall zone-based policies", "Configure IPSec site-to-site VPN", "Implement 802.1X network access control"],
    color:         "rose",
  },
  {
    level:         6,
    title:         "Wireless Network",
    titleTh:       "Wireless Network",
    description:   "WiFi Standards, WLC, SSID, Roaming, Wireless Security",
    descriptionEn: "Deploy and manage enterprise wireless — WLC, SSIDs, roaming, and WPA3.",
    skills:        ["802.11ac", "802.11ax (WiFi 6)", "WLC", "SSID", "Roaming", "WPA2/WPA3", "RADIUS Auth", "RF Planning"],
    status:        "locked",
    objectives:    ["ตั้งค่า WLC และ Lightweight AP ได้", "เข้าใจ Roaming และ Fast BSS Transition", "ออกแบบ RF Plan สำหรับ Office"],
    objectivesEn:  ["Configure WLC and lightweight access points", "Understand roaming and fast BSS transition", "Design RF plans for office environments"],
    color:         "emerald",
  },
  {
    level:         7,
    title:         "Monitoring & Operations",
    titleTh:       "Monitoring & Operations",
    description:   "SNMP, NetFlow, Syslog, Zabbix, Grafana, SLA",
    descriptionEn: "Monitor network health with SNMP, NetFlow, Syslog, Zabbix, and Grafana.",
    skills:        ["SNMP v2/v3", "NetFlow", "Syslog", "Zabbix", "Grafana", "ELK Stack", "SLA", "Capacity Planning"],
    status:        "locked",
    objectives:    ["ตั้งค่า Zabbix Monitor Network Device ได้", "สร้าง Dashboard ด้วย Grafana", "วิเคราะห์ Traffic ด้วย NetFlow"],
    objectivesEn:  ["Set up Zabbix to monitor network devices", "Build network dashboards with Grafana", "Analyse traffic patterns using NetFlow"],
    color:         "amber",
  },
  {
    level:         8,
    title:         "Network Automation",
    titleTh:       "Network Automation",
    description:   "Python, Netmiko, NAPALM, Ansible, REST API, YANG/NETCONF",
    descriptionEn: "Automate network tasks with Python, Netmiko, Ansible, and REST APIs.",
    skills:        ["Python", "Netmiko", "NAPALM", "Ansible", "REST API", "YANG", "NETCONF", "Git"],
    status:        "locked",
    objectives:    ["เขียน Python Script เพื่อ Config Router อัตโนมัติ", "ใช้ Ansible Playbook จัดการ Network Config", "เชื่อมต่อ REST API ของ Network Device"],
    objectivesEn:  ["Write Python scripts to automate router configuration", "Use Ansible playbooks to manage network config", "Consume REST APIs of modern network devices"],
    color:         "violet",
  },
  {
    level:         9,
    title:         "Cloud & Modern Network",
    titleTh:       "Cloud & Modern Network",
    description:   "AWS VPC, Azure VNet, SD-WAN, SASE, Zero Trust, Hybrid Network",
    descriptionEn: "Connect and secure cloud infrastructure — AWS VPC, Azure VNet, SD-WAN, SASE, and Zero Trust.",
    skills:        ["AWS VPC", "Azure VNet", "Transit Gateway", "SD-WAN", "SASE", "Zero Trust", "Cloud Firewall", "Direct Connect"],
    status:        "locked",
    objectives:    ["ออกแบบ AWS VPC Multi-Account Architecture", "เชื่อม On-Premise กับ Cloud ด้วย VPN/Direct Connect", "Implement SASE สำหรับ Remote User"],
    objectivesEn:  ["Design multi-account AWS VPC architecture", "Connect on-premises to cloud via VPN/Direct Connect", "Implement SASE for remote workers"],
    color:         "cyan",
  },
  {
    level:         10,
    title:         "Senior Network Engineer",
    titleTh:       "Senior Network Engineer",
    description:   "Enterprise Design, High Availability, Business Continuity, Team Lead",
    descriptionEn: "Lead enterprise network design — HA, MPLS, BGP advanced, BCP, and team leadership.",
    skills:        ["Enterprise Design", "MPLS/VPLS", "BGP Advanced", "High Availability", "BCP/DR", "Tech Lead", "Network Documentation", "Vendor Management"],
    status:        "locked",
    objectives:    ["ออกแบบ Enterprise Network ตาม Best Practice", "วางแผน HA และ Disaster Recovery", "Lead Team และ Review Network Design"],
    objectivesEn:  ["Design enterprise networks following best practices", "Plan high-availability and disaster recovery", "Lead teams and review network designs"],
    color:         "amber",
  },
];
