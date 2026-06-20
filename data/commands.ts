export interface Command {
  cmd: string;
  description: string;
  example?: string;
}

export interface CommandCategory {
  category: string;
  platform: string;
  commands: Command[];
}

export const commandLibrary: CommandCategory[] = [
  {
    category: "Cisco - Show Commands",
    platform: "Cisco IOS",
    commands: [
      { cmd: "show ip interface brief", description: "แสดง IP และ status ของทุก interface" },
      { cmd: "show vlan brief", description: "แสดง VLAN database และ port membership" },
      { cmd: "show interfaces trunk", description: "แสดง trunk port และ allowed VLAN" },
      { cmd: "show interfaces status", description: "แสดง status และ speed/duplex ของทุก port" },
      { cmd: "show interfaces switchport", description: "แสดงรายละเอียด switchport mode" },
      { cmd: "show spanning-tree", description: "แสดง STP topology และ port role" },
      { cmd: "show mac address-table", description: "แสดง MAC address table" },
      { cmd: "show ip route", description: "แสดง routing table" },
      { cmd: "show arp", description: "แสดง ARP table" },
      { cmd: "show cdp neighbors detail", description: "แสดง neighbor device ที่เชื่อมต่ออยู่" },
      { cmd: "show logging", description: "แสดง system log" },
      { cmd: "show running-config", description: "แสดง current configuration" },
      { cmd: "show ip ospf neighbor", description: "แสดง OSPF neighbor relationships" },
      { cmd: "show bgp summary", description: "แสดง BGP neighbor summary" },
    ],
  },
  {
    category: "Cisco - Configuration",
    platform: "Cisco IOS",
    commands: [
      { cmd: "interface <type> <num>", description: "เข้า interface configuration mode", example: "interface GigabitEthernet0/0" },
      { cmd: "ip address <ip> <mask>", description: "ตั้ง IP address บน interface", example: "ip address 192.168.1.1 255.255.255.0" },
      { cmd: "no shutdown", description: "เปิด interface" },
      { cmd: "vlan <id>", description: "สร้าง VLAN", example: "vlan 10" },
      { cmd: "switchport mode access", description: "ตั้ง port เป็น access mode" },
      { cmd: "switchport access vlan <id>", description: "กำหนด VLAN สำหรับ access port", example: "switchport access vlan 10" },
      { cmd: "switchport mode trunk", description: "ตั้ง port เป็น trunk mode" },
      { cmd: "router ospf <process-id>", description: "เปิด OSPF", example: "router ospf 1" },
      { cmd: "network <network> <wildcard> area <id>", description: "กำหนด network ใน OSPF", example: "network 192.168.1.0 0.0.0.255 area 0" },
    ],
  },
  {
    category: "Windows",
    platform: "Windows CMD / PowerShell",
    commands: [
      { cmd: "ipconfig /all", description: "แสดงรายละเอียด IP configuration ทุก adapter" },
      { cmd: "ping <ip/host>", description: "ทดสอบ connectivity", example: "ping 8.8.8.8" },
      { cmd: "tracert <ip/host>", description: "ตรวจเส้นทาง packet", example: "tracert google.com" },
      { cmd: "nslookup <domain>", description: "ตรวจ DNS resolution", example: "nslookup google.com" },
      { cmd: "netstat -ano", description: "แสดง active connection และ PID" },
      { cmd: "route print", description: "แสดง routing table" },
      { cmd: "getmac", description: "แสดง MAC address ของทุก adapter" },
      { cmd: "arp -a", description: "แสดง ARP cache" },
    ],
  },
  {
    category: "Linux",
    platform: "Linux / Unix",
    commands: [
      { cmd: "ip a", description: "แสดง IP address ทุก interface" },
      { cmd: "ip route", description: "แสดง routing table" },
      { cmd: "ping <ip/host>", description: "ทดสอบ connectivity", example: "ping -c 4 8.8.8.8" },
      { cmd: "traceroute <ip/host>", description: "ตรวจเส้นทาง packet" },
      { cmd: "dig <domain>", description: "ตรวจ DNS record", example: "dig google.com" },
      { cmd: "tcpdump", description: "capture packet บน interface", example: "tcpdump -i eth0 -n" },
      { cmd: "ss -tulnp", description: "แสดง open port และ process" },
      { cmd: "nmap <ip>", description: "scan port และ service", example: "nmap -sV 192.168.1.1" },
    ],
  },
  {
    category: "Firewall",
    platform: "Firewall (Generic)",
    commands: [
      { cmd: "show session", description: "แสดง active session" },
      { cmd: "show policy", description: "แสดง firewall policy" },
      { cmd: "show route", description: "แสดง routing table" },
      { cmd: "show vpn", description: "แสดง VPN tunnel status" },
      { cmd: "show log traffic", description: "แสดง traffic log" },
    ],
  },
];
