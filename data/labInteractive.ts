/**
 * Interactive data for each lab:
 *  - terminalCommands  → Cisco IOS simulator output per command
 *  - hostname          → prompt label
 *  - steps             → guided step-by-step tasks with verify + solution
 *  - configTemplate    → skeleton config for editor
 *  - configSolution    → correct full config
 */

import type { Step } from "@/components/labs/LabStepTracker";

export interface LabInteractive {
  hostname:         string;
  terminalCommands: Record<string, string>;
  steps:            Step[];
  configTemplate:   string;
  configSolution:   string;
}

const labInteractiveData: Record<string, LabInteractive> = {

  /* ══════════════════════════════════════════════════════════
   *  1. Basic IP Connectivity
   * ══════════════════════════════════════════════════════════ */
  "basic-ip": {
    hostname: "R1",
    terminalCommands: {
      "show ip interface brief":
`Interface                  IP-Address      OK? Method Status                Protocol
GigabitEthernet0/0        10.0.1.1        YES manual up                    up
GigabitEthernet0/1        10.0.2.1        YES manual up                    up`,
      "show running-config":
`Building configuration...
!
hostname R1
!
interface GigabitEthernet0/0
 ip address 10.0.1.1 255.255.255.0
 no shutdown
!
interface GigabitEthernet0/1
 ip address 10.0.2.1 255.255.255.0
 no shutdown
!`,
      "show ip route":
`Codes: C - connected, S - static
Gateway of last resort is not set

      10.0.0.0/8 is variably subnetted, 4 subnets, 2 masks
C        10.0.1.0/24 is directly connected, GigabitEthernet0/0
L        10.0.1.1/32 is directly connected, GigabitEthernet0/0
C        10.0.2.0/24 is directly connected, GigabitEthernet0/1
L        10.0.2.1/32 is directly connected, GigabitEthernet0/1`,
    },
    steps: [
      {
        id: "step-1",
        title: "Enter config mode",
        description: "เข้า Global Configuration Mode บน Router R1",
        hint: "ใช้คำสั่ง configure terminal หรือ conf t",
        verify: "configure terminal",
        solution: "R1# configure terminal\nEnter configuration commands, one per line.  End with CNTL/Z.\nR1(config)#",
        xp: 10,
      },
      {
        id: "step-2",
        title: "Configure Gi0/0",
        description: "ตั้งค่า IP 10.0.1.1/24 บน GigabitEthernet0/0",
        hint: "interface GigabitEthernet0/0 → ip address 10.0.1.1 255.255.255.0 → no shutdown",
        verify: "no shutdown",
        solution: `interface GigabitEthernet0/0
 ip address 10.0.1.1 255.255.255.0
 no shutdown`,
        xp: 20,
      },
      {
        id: "step-3",
        title: "Configure Gi0/1",
        description: "ตั้งค่า IP 10.0.2.1/24 บน GigabitEthernet0/1",
        hint: "interface GigabitEthernet0/1 → ip address 10.0.2.1 255.255.255.0 → no shutdown",
        verify: "no shutdown",
        solution: `interface GigabitEthernet0/1
 ip address 10.0.2.1 255.255.255.0
 no shutdown`,
        xp: 20,
      },
      {
        id: "step-4",
        title: "Verify connectivity",
        description: "รัน show ip interface brief แล้วตรวจสอบว่า Status = up/up ทั้งคู่",
        hint: "show ip interface brief",
        verify: "show ip interface brief",
        solution: `GigabitEthernet0/0  10.0.1.1  YES  manual  up  up
GigabitEthernet0/1  10.0.2.1  YES  manual  up  up`,
        xp: 15,
      },
      {
        id: "step-5",
        title: "Test ping across networks",
        description: "Ping จาก PC1 (10.0.1.10) ไป PC2 (10.0.2.10) ผ่าน Router",
        hint: "ping 10.0.2.10 จาก PC1 หรือ extended ping บน Router",
        xp: 15,
      },
    ],
    configTemplate: `! R1 Configuration
hostname R1
!
interface GigabitEthernet0/0
 ip address ___.___.___.___  255.255.255.0
 no shutdown
!
interface GigabitEthernet0/1
 ip address ___.___.___.___  255.255.255.0
 no shutdown
!`,
    configSolution: `! R1 Configuration
hostname R1
!
interface GigabitEthernet0/0
 ip address 10.0.1.1 255.255.255.0
 no shutdown
!
interface GigabitEthernet0/1
 ip address 10.0.2.1 255.255.255.0
 no shutdown
!`,
  },

  /* ══════════════════════════════════════════════════════════
   *  2. OSPF Single Area
   * ══════════════════════════════════════════════════════════ */
  "ospf-single-area": {
    hostname: "R1",
    terminalCommands: {
      "show ip ospf neighbor":
`Neighbor ID     Pri   State           Dead Time   Address         Interface
2.2.2.2           1   FULL/DR         00:00:38    10.0.12.2      GigabitEthernet0/0
3.3.3.3           1   FULL/BDR        00:00:33    10.0.13.3      GigabitEthernet0/1`,
      "show ip route ospf":
`      10.0.0.0/8 is variably subnetted, 6 subnets, 2 masks
O        10.0.23.0/24 [110/2] via 10.0.12.2, 00:05:12, GigabitEthernet0/0
O        192.168.2.0/24 [110/2] via 10.0.12.2, 00:05:12, GigabitEthernet0/0
O        192.168.3.0/24 [110/2] via 10.0.13.3, 00:05:08, GigabitEthernet0/1`,
      "show ip ospf":
`Routing Process "ospf 1" with ID 1.1.1.1
Supports only single TOS(TOS0) routes
Area BACKBONE(0)
    Number of interfaces in this area is 2`,
    },
    steps: [
      {
        id: "step-1",
        title: "Set Router ID",
        description: "กำหนด Router ID เป็น 1.1.1.1 บน R1",
        hint: "router ospf 1 → router-id 1.1.1.1",
        verify: "router-id 1.1.1.1",
        xp: 10,
      },
      {
        id: "step-2",
        title: "Advertise networks",
        description: "Advertise ทุก network เข้า OSPF Area 0",
        hint: "network 10.0.0.0 0.255.255.255 area 0",
        verify: "network 10.0.0.0 0.255.255.255 area 0",
        xp: 20,
      },
      {
        id: "step-3",
        title: "Verify OSPF neighbors",
        description: "ตรวจสอบ OSPF neighbors — ต้องเห็น FULL state",
        verify: "show ip ospf neighbor",
        solution: "Neighbor R2 = FULL/DR, Neighbor R3 = FULL/BDR",
        xp: 15,
      },
      {
        id: "step-4",
        title: "Verify routing table",
        description: "ตรวจสอบ route table ให้เห็น O routes",
        verify: "show ip route ospf",
        xp: 15,
      },
    ],
    configTemplate: `router ospf 1
 router-id ___.___.___.___
 network ___.___.___.___  ___.___.___.___  area ___
!`,
    configSolution: `router ospf 1
 router-id 1.1.1.1
 network 10.0.0.0 0.255.255.255 area 0
!`,
  },

  /* ══════════════════════════════════════════════════════════
   *  3. VLAN & Inter-VLAN Routing
   * ══════════════════════════════════════════════════════════ */
  "vlan-intervlan": {
    hostname: "SW1",
    terminalCommands: {
      "show vlan brief":
`VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active
10   Sales                            active    Fa0/1, Fa0/2
20   HR                               active    Fa0/3, Fa0/4
1002 fddi-default                     act/unsup
1003 tring-default                    act/unsup`,
      "show interfaces trunk":
`Port        Mode             Encapsulation  Status        Native vlan
Gi0/1       on               802.1q         trunking      1

Port        Vlans allowed on trunk
Gi0/1       10,20

Port        Vlans allowed and active in management domain
Gi0/1       10,20`,
      "show ip interface brief":
`Interface                  IP-Address      OK? Method Status                Protocol
GigabitEthernet0/0.10     192.168.10.1    YES manual up                    up
GigabitEthernet0/0.20     192.168.20.1    YES manual up                    up`,
    },
    steps: [
      {
        id: "step-1",
        title: "Create VLANs",
        description: "สร้าง VLAN 10 (Sales) และ VLAN 20 (HR) บน SW1",
        hint: "vlan 10 → name Sales / vlan 20 → name HR",
        verify: "name hr",
        xp: 15,
      },
      {
        id: "step-2",
        title: "Assign ports to VLANs",
        description: "กำหนด Fa0/1-Fa0/2 เป็น access VLAN 10 และ Fa0/3-Fa0/4 เป็น VLAN 20",
        hint: "interface range Fa0/1-2 → switchport mode access → switchport access vlan 10",
        xp: 20,
      },
      {
        id: "step-3",
        title: "Configure trunk to router",
        description: "ตั้งค่า Gi0/1 เป็น trunk port เพื่อส่ง VLAN ไปยัง Router",
        verify: "switchport mode trunk",
        xp: 15,
      },
      {
        id: "step-4",
        title: "Sub-interfaces on Router",
        description: "สร้าง sub-interface Gi0/0.10 (192.168.10.1) และ Gi0/0.20 (192.168.20.1) บน Router",
        hint: "interface Gi0/0.10 → encapsulation dot1Q 10 → ip address 192.168.10.1 255.255.255.0",
        xp: 20,
      },
      {
        id: "step-5",
        title: "Verify inter-VLAN routing",
        description: "Ping จาก VLAN 10 host ไปยัง VLAN 20 host",
        xp: 10,
      },
    ],
    configTemplate: `! SW1 — Create VLANs
vlan ___
 name Sales
vlan ___
 name HR
!
interface range FastEthernet0/1-2
 switchport mode access
 switchport access vlan ___
!
interface range FastEthernet0/3-4
 switchport mode access
 switchport access vlan ___
!
interface GigabitEthernet0/1
 switchport mode ___
!`,
    configSolution: `! SW1 — Create VLANs
vlan 10
 name Sales
vlan 20
 name HR
!
interface range FastEthernet0/1-2
 switchport mode access
 switchport access vlan 10
!
interface range FastEthernet0/3-4
 switchport mode access
 switchport access vlan 20
!
interface GigabitEthernet0/1
 switchport mode trunk
!`,
  },

  /* ══════════════════════════════════════════════════════════
   *  4. ACL Filtering
   * ══════════════════════════════════════════════════════════ */
  "acl-filtering": {
    hostname: "R1",
    terminalCommands: {
      "show access-lists":
`Extended IP access list 100
    10 permit tcp 192.168.10.0 0.0.0.255 any eq 80 (150 matches)
    20 permit tcp 192.168.10.0 0.0.0.255 any eq 443 (89 matches)
    30 deny ip 192.168.10.0 0.0.0.255 any (12 matches)`,
      "show ip interface gi0/0":
`GigabitEthernet0/0 is up, line protocol is up
  Outgoing access list is not set
  Inbound  access list is 100`,
    },
    steps: [
      {
        id: "step-1",
        title: "Create Extended ACL",
        description: "สร้าง ACL 100 อนุญาต HTTP/HTTPS จาก 192.168.10.0/24",
        hint: "ip access-list extended 100 → permit tcp ... eq 80",
        verify: "ip access-list extended 100",
        xp: 15,
      },
      {
        id: "step-2",
        title: "Permit HTTP and HTTPS",
        description: "เพิ่ม rule permit TCP port 80 และ 443",
        verify: "permit tcp 192.168.10.0 0.0.0.255 any eq 443",
        xp: 20,
      },
      {
        id: "step-3",
        title: "Deny remaining traffic",
        description: "Deny IP ที่เหลือทั้งหมด (implicit deny ใช้ได้ แต่ควร explicit)",
        verify: "deny ip any any",
        xp: 10,
      },
      {
        id: "step-4",
        title: "Apply to interface",
        description: "Apply ACL 100 บน Gi0/0 ทิศทาง inbound",
        hint: "interface gi0/0 → ip access-group 100 in",
        verify: "ip access-group 100 in",
        xp: 20,
      },
      {
        id: "step-5",
        title: "Verify ACL",
        description: "รัน show access-lists และดู match counters",
        verify: "show access-lists",
        xp: 15,
      },
    ],
    configTemplate: `ip access-list extended 100
 permit tcp 192.168.10.0 0.0.0.255 any eq ___
 permit tcp 192.168.10.0 0.0.0.255 any eq ___
 deny ip ___ ___
!
interface GigabitEthernet0/0
 ip access-group ___ ___
!`,
    configSolution: `ip access-list extended 100
 permit tcp 192.168.10.0 0.0.0.255 any eq 80
 permit tcp 192.168.10.0 0.0.0.255 any eq 443
 deny ip any any
!
interface GigabitEthernet0/0
 ip access-group 100 in
!`,
  },

  /* ══════════════════════════════════════════════════════════
   *  5. BGP eBGP
   * ══════════════════════════════════════════════════════════ */
  "bgp-ebgp-config": {
    hostname: "R1",
    terminalCommands: {
      "show bgp summary":
`BGP router identifier 1.1.1.1, local AS number 65001
BGP table version is 5, main routing table version 5

Neighbor        V           AS MsgRcvd MsgSent   TblVer  InQ OutQ Up/Down  State/PfxRcd
10.0.12.2       4        65002      15      15        5    0    0 00:10:15        2`,
      "show bgp":
`BGP table version is 5, local router ID is 1.1.1.1
   Network          Next Hop            Metric LocPrf Weight Path
*> 172.16.0.0/24   0.0.0.0                  0         32768 i
*> 192.168.2.0     10.0.12.2                0             0 65002 i`,
      "show ip bgp neighbors":
`BGP neighbor is 10.0.12.2, remote AS 65002, external link
  BGP state = Established, up for 00:10:15
  Last read 00:00:23, last write 00:00:23, hold time is 180, keepalive interval is 60`,
    },
    steps: [
      {
        id: "step-1",
        title: "Configure BGP Process",
        description: "เริ่มต้น BGP process บน R1 ด้วย AS 65001",
        hint: "router bgp 65001",
        verify: "router bgp 65001",
        xp: 10,
      },
      {
        id: "step-2",
        title: "Set Router ID",
        description: "กำหนด BGP router-id เป็น 1.1.1.1",
        verify: "bgp router-id 1.1.1.1",
        xp: 10,
      },
      {
        id: "step-3",
        title: "Configure eBGP Neighbor",
        description: "เพิ่ม neighbor 10.0.12.2 ใน AS 65002",
        verify: "neighbor 10.0.12.2 remote-as 65002",
        solution: "neighbor 10.0.12.2 remote-as 65002",
        xp: 20,
      },
      {
        id: "step-4",
        title: "Advertise network",
        description: "Advertise network 172.16.0.0/24 เข้าสู่ BGP",
        verify: "network 172.16.0.0 mask 255.255.255.0",
        xp: 20,
      },
      {
        id: "step-5",
        title: "Verify BGP session",
        description: "ตรวจสอบ BGP session ว่า Established",
        verify: "show bgp summary",
        solution: "State/PfxRcd แสดงตัวเลข prefix (ไม่ใช่ Idle/Active)",
        xp: 20,
      },
    ],
    configTemplate: `router bgp ___
 bgp router-id ___.___.___.___
 neighbor ___.___.___.___  remote-as ___
 network ___.___.___.___ mask ___.___.___.___
!`,
    configSolution: `router bgp 65001
 bgp router-id 1.1.1.1
 neighbor 10.0.12.2 remote-as 65002
 network 172.16.0.0 mask 255.255.255.0
!`,
  },

  /* ══════════════════════════════════════════════════════════
   *  6. Python Netmiko Automation
   * ══════════════════════════════════════════════════════════ */
  "python-netmiko-lab": {
    hostname: "Linux-Host",
    terminalCommands: {
      "python3 --version": "Python 3.11.4",
      "pip3 show netmiko": `Name: netmiko\nVersion: 4.3.0\nSummary: Multi-vendor library to simplify Paramiko SSH connections to network devices`,
      "ls scripts/": "configure_router.py  backup_config.py  bulk_deploy.py",
      "python3 scripts/configure_router.py":
`Connecting to 192.168.1.1...
Connection established.
Sending commands...
hostname R1-PROD
interface GigabitEthernet0/0
 description Link to Core
Configuration pushed successfully!
Disconnecting...`,
      "python3 scripts/backup_config.py":
`Backing up R1... Done → backup/R1_2025-01-15.txt
Backing up R2... Done → backup/R2_2025-01-15.txt
Backing up SW1... Done → backup/SW1_2025-01-15.txt
All devices backed up successfully!`,
    },
    steps: [
      {
        id: "step-1",
        title: "Install Netmiko",
        description: "ติดตั้ง Netmiko library ผ่าน pip3",
        hint: "pip3 install netmiko",
        verify: "pip3 install netmiko",
        xp: 10,
      },
      {
        id: "step-2",
        title: "Create connection script",
        description: "เขียน Python script เชื่อมต่อ Router ด้วย SSH",
        hint: "ใช้ ConnectHandler() จาก netmiko พร้อม device_type='cisco_ios'",
        xp: 20,
      },
      {
        id: "step-3",
        title: "Send configuration",
        description: "ส่ง config commands ผ่าน send_config_set()",
        verify: "send_config_set",
        xp: 20,
      },
      {
        id: "step-4",
        title: "Backup running-config",
        description: "ดึง show running-config แล้วบันทึกลงไฟล์",
        verify: "send_command",
        xp: 20,
      },
      {
        id: "step-5",
        title: "Loop over multiple devices",
        description: "ปรับให้ script วน loop deploy ไปยังหลาย device",
        xp: 10,
      },
    ],
    configTemplate: `from netmiko import ConnectHandler

device = {
    'device_type': '___',
    'host': '192.168.1.1',
    'username': '___',
    'password': '___',
}

connection = ConnectHandler(**device)

commands = [
    'hostname R1-PROD',
    'interface GigabitEthernet0/0',
    ' description Link to Core',
]

output = connection.___(commands)
print(output)
connection.disconnect()`,
    configSolution: `from netmiko import ConnectHandler

device = {
    'device_type': 'cisco_ios',
    'host': '192.168.1.1',
    'username': 'admin',
    'password': 'cisco123',
}

connection = ConnectHandler(**device)

commands = [
    'hostname R1-PROD',
    'interface GigabitEthernet0/0',
    ' description Link to Core',
]

output = connection.send_config_set(commands)
print(output)
connection.disconnect()`,
  },

  /* ══════════════════════════════════════════════════════════
   *  7. IPv6 OSPFv3
   * ══════════════════════════════════════════════════════════ */
  "ipv6-ospfv3-lab": {
    hostname: "R1",
    terminalCommands: {
      "show ipv6 interface brief":
`GigabitEthernet0/0    [up/up]
    FE80::1
    2001:DB8:1:12::1
GigabitEthernet0/1    [up/up]
    FE80::1
    2001:DB8:1:1::1`,
      "show ospfv3 neighbor":
`          OSPFv3 1 address-family ipv6 (router-id 1.1.1.1)

Neighbor ID     Pri   State           Dead Time   Interface ID    Interface
2.2.2.2           1   FULL/DR         00:00:37    2               GigabitEthernet0/0`,
      "show ipv6 route ospf":
`OE2 2001:DB8:2::/48 [110/20]
     via FE80::2, GigabitEthernet0/0
O   2001:DB8:1:23::/64 [110/2]
     via FE80::2, GigabitEthernet0/0`,
    },
    steps: [
      {
        id: "step-1",
        title: "Enable IPv6 routing",
        description: "เปิดใช้งาน IPv6 unicast routing บน Router",
        verify: "ipv6 unicast-routing",
        xp: 10,
      },
      {
        id: "step-2",
        title: "Assign IPv6 addresses",
        description: "กำหนด IPv6 address 2001:DB8:1:12::1/64 บน Gi0/0",
        hint: "interface gi0/0 → ipv6 address 2001:DB8:1:12::1/64",
        verify: "ipv6 address 2001:db8:1:12::1/64",
        xp: 20,
      },
      {
        id: "step-3",
        title: "Enable OSPFv3",
        description: "เปิด OSPFv3 process 1 และกำหนด router-id",
        verify: "ipv6 router ospf 1",
        xp: 15,
      },
      {
        id: "step-4",
        title: "Activate OSPFv3 on interfaces",
        description: "เปิด OSPFv3 บน interface ด้วย ipv6 ospf 1 area 0",
        verify: "ipv6 ospf 1 area 0",
        xp: 20,
      },
      {
        id: "step-5",
        title: "Verify OSPFv3 neighbors",
        description: "ตรวจสอบ OSPFv3 neighbor — ต้องเห็น FULL state",
        verify: "show ospfv3 neighbor",
        xp: 15,
      },
    ],
    configTemplate: `ipv6 unicast-routing
!
interface GigabitEthernet0/0
 ipv6 address ___:___:___:12::1/___
 ipv6 ospf ___ area ___
!
ipv6 router ospf 1
 router-id ___.___.___.___
!`,
    configSolution: `ipv6 unicast-routing
!
interface GigabitEthernet0/0
 ipv6 address 2001:DB8:1:12::1/64
 ipv6 ospf 1 area 0
!
ipv6 router ospf 1
 router-id 1.1.1.1
!`,
  },

  "hsrp-vrrp-lab": {
    hostname: "R1",
    welcome:  "HSRP Lab — configure Hot Standby Router Protocol for gateway redundancy",
    terminalCommands: {
      "show standby":       "GigabitEthernet0/0 - Group 1\n  State is Active\n  Virtual IP address is 192.168.1.1\n  Priority 110 (configured 110)\n  Preemption enabled",
      "show standby brief": "Interface   Grp  Pri P State    Active          Standby         Virtual IP\nGi0/0       1    110 P Active   local           192.168.1.3     192.168.1.1",
      "show ip interface brief": "Interface              IP-Address      OK? Method Status  Protocol\nGigabitEthernet0/0    192.168.1.2     YES NVRAM  up      up",
    },
    steps: [
      { id: "s1", title: "Set IP on Gi0/0", description: "Set IP 192.168.1.2/24 on GigabitEthernet0/0", xp: 50,
        verify: "ip address 192.168.1.2 255.255.255.0",
        solution: "interface GigabitEthernet0/0\n ip address 192.168.1.2 255.255.255.0\n no shutdown" },
      { id: "s2", title: "Set HSRP Virtual IP", description: "Set Virtual IP 192.168.1.1 for HSRP group 1", xp: 75,
        verify: "standby 1 ip 192.168.1.1",
        solution: "interface GigabitEthernet0/0\n standby 1 ip 192.168.1.1" },
      { id: "s3", title: "Set Priority 110", description: "Set priority 110 so R1 becomes Active", xp: 75,
        verify: "standby 1 priority 110",
        solution: "interface GigabitEthernet0/0\n standby 1 priority 110" },
      { id: "s4", title: "Enable Preempt", description: "Enable preempt so R1 recovers Active role automatically", xp: 50,
        verify: "standby 1 preempt",
        solution: "interface GigabitEthernet0/0\n standby 1 preempt" },
      { id: "s5", title: "Verify HSRP state", description: "Run show standby brief to confirm Active state", xp: 50,
        hint: "State column must show Active" },
    ],
    configTemplate: `! R1
interface GigabitEthernet0/0
 ip address ___.___.___.___  255.255.255.0
 standby ___ ip ___.___.___.___
 standby ___ priority ___
 standby ___ preempt`,
    configSolution: `! R1
interface GigabitEthernet0/0
 ip address 192.168.1.2 255.255.255.0
 standby 1 ip 192.168.1.1
 standby 1 priority 110
 standby 1 preempt`,
  },

  "eigrp-basic-lab": {
    hostname: "R2",
    welcome:  "EIGRP Lab — configure EIGRP AS 100 on 3 routers",
    terminalCommands: {
      "show ip eigrp neighbors": "H   Address         Interface   Hold  Uptime\n0   10.12.0.1       Gi0/0       12    00:05:23\n1   10.23.0.2       Gi0/1       11    00:05:20",
      "show ip route eigrp":    "D    10.1.1.0/24 [90/156160] via 10.12.0.1, GigabitEthernet0/0\nD    10.3.3.0/24 [90/156160] via 10.23.0.2, GigabitEthernet0/1",
      "show ip protocols":      "Routing Protocol is \"eigrp 100\"\n  EIGRP-IPv4 Protocol for AS(100)",
    },
    steps: [
      { id: "s1", title: "Start EIGRP Process 100", description: "Create EIGRP routing process AS 100", xp: 50,
        verify: "router eigrp 100", solution: "router eigrp 100" },
      { id: "s2", title: "Advertise 10.12.0.0/30", description: "Add network for link to R1", xp: 75,
        verify: "network 10.12.0.0 0.0.0.3",
        solution: "router eigrp 100\n network 10.12.0.0 0.0.0.3" },
      { id: "s3", title: "Advertise 10.23.0.0/30", description: "Add network for link to R3", xp: 75,
        verify: "network 10.23.0.0 0.0.0.3",
        solution: "router eigrp 100\n network 10.23.0.0 0.0.0.3" },
      { id: "s4", title: "Disable auto-summary", description: "Disable auto-summary for classless routing", xp: 50,
        verify: "no auto-summary", solution: "router eigrp 100\n no auto-summary" },
      { id: "s5", title: "Verify neighbors", description: "Run show ip eigrp neighbors to confirm", xp: 50,
        hint: "Must see R1 (10.12.0.1) and R3 (10.23.0.2)" },
    ],
    configTemplate: `router eigrp ___
 network ___.___.___.___  ___.___.___.___
 network ___.___.___.___  ___.___.___.___
 no auto-summary`,
    configSolution: `router eigrp 100
 network 10.12.0.0 0.0.0.3
 network 10.23.0.0 0.0.0.3
 no auto-summary`,
  },

  "nat-pat-advanced": {
    hostname: "R1",
    welcome:  "NAT/PAT Lab — configure Static NAT and PAT overload",
    terminalCommands: {
      "show ip nat translations": "Pro Inside global      Inside local       Outside local      Outside global\n--- 203.0.113.5        192.168.1.100      ---                ---\ntcp 203.0.113.1:1024   192.168.1.10:1024  8.8.8.8:80         8.8.8.8:80",
      "show ip nat statistics":   "Total active translations: 2 (1 static, 1 dynamic)\nOutside interfaces: GigabitEthernet0/1\nInside interfaces: GigabitEthernet0/0",
      "show ip interface brief":  "Interface              IP-Address      OK? Method Status  Protocol\nGigabitEthernet0/0    192.168.1.1     YES NVRAM  up      up\nGigabitEthernet0/1    203.0.113.1     YES NVRAM  up      up",
    },
    steps: [
      { id: "s1", title: "Set ip nat inside", description: "Set Gi0/0 as inside interface", xp: 50,
        verify: "ip nat inside",
        solution: "interface GigabitEthernet0/0\n ip nat inside" },
      { id: "s2", title: "Set ip nat outside", description: "Set Gi0/1 as outside interface", xp: 50,
        verify: "ip nat outside",
        solution: "interface GigabitEthernet0/1\n ip nat outside" },
      { id: "s3", title: "Configure Static NAT for Server", description: "Map 192.168.1.100 to 203.0.113.5", xp: 75,
        verify: "ip nat inside source static 192.168.1.100 203.0.113.5",
        solution: "ip nat inside source static 192.168.1.100 203.0.113.5" },
      { id: "s4", title: "Create ACL for PAT", description: "Create INSIDE-HOSTS ACL covering 192.168.1.0/24", xp: 75,
        verify: "ip access-list standard INSIDE-HOSTS",
        solution: "ip access-list standard INSIDE-HOSTS\n permit 192.168.1.0 0.0.0.255" },
      { id: "s5", title: "Configure PAT overload", description: "Apply NAT overload on outside interface", xp: 100,
        verify: "ip nat inside source list INSIDE-HOSTS interface GigabitEthernet0/1 overload",
        solution: "ip nat inside source list INSIDE-HOSTS interface GigabitEthernet0/1 overload" },
    ],
    configTemplate: `interface GigabitEthernet0/0
 ip nat ___

interface GigabitEthernet0/1
 ip nat ___

ip nat inside source static ___.___.___.___  ___.___.___.___

ip access-list standard INSIDE-HOSTS
 permit ___.___.___.___  ___.___.___.___

ip nat inside source list INSIDE-HOSTS interface GigabitEthernet0/1 ___`,
    configSolution: `interface GigabitEthernet0/0
 ip nat inside

interface GigabitEthernet0/1
 ip nat outside

ip nat inside source static 192.168.1.100 203.0.113.5

ip access-list standard INSIDE-HOSTS
 permit 192.168.1.0 0.0.0.255

ip nat inside source list INSIDE-HOSTS interface GigabitEthernet0/1 overload`,
  },

  "mpls-ldp-lab": {
    hostname: "P1",
    welcome:  "MPLS LDP Lab — enable MPLS label switching and configure LDP",
    terminalCommands: {
      "show mpls interfaces":      "Interface              IP            Operational\nGigabitEthernet0/0     Yes (ldp)     Yes\nGigabitEthernet0/1     Yes (ldp)     Yes",
      "show mpls ldp neighbor":     "Peer LDP Ident: 10.0.12.1:0; Local LDP Ident 10.0.13.1:0\n  State: Oper; Msgs sent/rcvd: 24/24",
      "show mpls forwarding-table": "Local  Outgoing  Prefix            Outgoing   Next Hop\nLabel  Label     or Tunnel Id      interface\n16     Pop Label 10.0.12.0/30      Gi0/0      10.0.12.1\n17     17        10.0.23.0/30      Gi0/1      10.0.23.2",
    },
    steps: [
      { id: "s1", title: "Enable OSPF as IGP", description: "Enable OSPF process 1 covering all interfaces", xp: 50,
        verify: "router ospf 1",
        solution: "router ospf 1\n network 10.0.0.0 0.255.255.255 area 0" },
      { id: "s2", title: "Set MPLS label protocol", description: "Set LDP as the label protocol", xp: 75,
        verify: "mpls label protocol ldp", solution: "mpls label protocol ldp" },
      { id: "s3", title: "Set LDP Router-ID", description: "Use Loopback0 as LDP Router-ID", xp: 75,
        verify: "mpls ldp router-id Loopback0",
        solution: "mpls ldp router-id Loopback0 force" },
      { id: "s4", title: "Enable MPLS on Gi0/0", description: "Enable mpls ip on interface toward PE1", xp: 50,
        verify: "mpls ip",
        solution: "interface GigabitEthernet0/0\n mpls ip" },
      { id: "s5", title: "Verify LDP neighbor", description: "Run show mpls ldp neighbor to confirm", xp: 50,
        hint: "Must see State: Oper for all neighbors" },
    ],
    configTemplate: `router ospf 1
 network ___.___.___.___  ___.___.___.___  area ___

mpls label protocol ___
mpls ldp router-id ___ force

interface GigabitEthernet0/0
 mpls ip

interface GigabitEthernet0/1
 mpls ip`,
    configSolution: `router ospf 1
 network 10.0.0.0 0.255.255.255 area 0

mpls label protocol ldp
mpls ldp router-id Loopback0 force

interface GigabitEthernet0/0
 mpls ip

interface GigabitEthernet0/1
 mpls ip`,
  },
};

export function getLabInteractive(labId: string): LabInteractive | null {
  return labInteractiveData[labId] ?? null;
}
