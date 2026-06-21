// ─── Network Automation Track ─────────────────────────────────────────────────
// 7 lessons: Python → Netmiko → NAPALM → Ansible → Nornir → Terraform → RESTCONF


// ─────────────────────────────────────────────────────────────────────────────
// Lesson 1 — Python for Network Engineers
// ─────────────────────────────────────────────────────────────────────────────
const pythonForNetworks = {
  id:          "auto-001",
  slug:        "python-for-network-engineers",
  title:       "Python for Network Engineers",
  description: "เรียน Python เฉพาะที่ Network Engineer ต้องใช้จริง: parsing, regex, IP manipulation, SSH scripting",
  level:       "Intermediate",
  duration:    "90 min",
  xp:          125,
  tags:        ["python", "scripting", "automation", "paramiko"],
  prerequisites: [],
  objectives: [
    "ใช้ Python libraries สำหรับ networking: ipaddress, socket, paramiko",
    "Parse show command output ด้วย TextFSM และ regex",
    "เขียน script อ่าน/เขียน config ผ่าน SSH",
    "จัดการ IP addresses และ subnets ด้วย ipaddress module",
    "Error handling สำหรับ network connection failures",
  ],
  content: [
    {
      type:  "concept",
      title: "Python Libraries for Networking",
      body:  "ไม่ต้องเรียน Python ทั้งหมด — Network Engineer ต้องรู้แค่ไม่กี่ module: ipaddress (IP calc), socket (connectivity test), paramiko (SSH), re (regex parsing), json/yaml (config files), netmiko (device abstraction).",
    },
    {
      type:  "concept",
      title: "IP Address Manipulation",
      body:  "ipaddress module built-in ใน Python 3 — ทำทุกอย่างที่ subnet calculator ทำได้ plus more: ตรวจ overlap, หา network address, iterate hosts",
    },
    {
      type:  "code",
      title: "ipaddress — subnet calculation",
      body:  `import ipaddress

net = ipaddress.ip_network("192.168.1.0/24")
print(net.network_address)    # 192.168.1.0
print(net.broadcast_address)  # 192.168.1.255
print(net.num_addresses)      # 256

# List first 5 hosts
for host in list(net.hosts())[:5]:
    print(host)

# Check if IP is in subnet
ip = ipaddress.ip_address("192.168.1.50")
print(ip in net)   # True`,
    },
    {
      type:  "code",
      title: "Paramiko — SSH to Cisco IOS",
      body:  `import paramiko, time

def get_show_ip_route(host, user, password):
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(host, username=user, password=password, timeout=10)

    shell = client.invoke_shell()
    shell.send("terminal length 0\\n")
    time.sleep(0.5)
    shell.send("show ip route\\n")
    time.sleep(2)

    output = shell.recv(65535).decode("utf-8")
    client.close()
    return output

output = get_show_ip_route("192.168.1.1", "admin", "cisco123")
print(output)`,
    },
    {
      type:  "concept",
      title: "TextFSM — Structured Parsing",
      body:  "TextFSM ใช้ template-based parsing แปลง show command output เป็น list ของ dict พร้อมใช้งาน NTC Templates มี template สำเร็จรูปสำหรับ Cisco/Juniper/Arista ทุก show command",
    },
    {
      type:  "code",
      title: "TextFSM template parsing",
      body:  `import textfsm

template = """Value IP (\\d+\\.\\d+\\.\\d+\\.\\d+)
Value INTERFACE (\\S+)
Value STATUS (up|down)

Start
  ^Interface\\s+IP-Address\\s+OK\\?
  ^\${INTERFACE}\\s+\${IP}\\s+YES\\s+\\S+\\s+\${STATUS} -> Record

EOF
"""

with open("intf_template.textfsm", "w") as f:
    f.write(template)

# Parse output
show_output = """Interface   IP-Address    OK? Method Status
GigabitEthernet0/0 10.0.0.1 YES NVRAM up
GigabitEthernet0/1 10.0.1.1 YES NVRAM up
"""

with open("intf_template.textfsm") as t:
    fsm = textfsm.TextFSM(t)
    rows = fsm.ParseText(show_output)

for row in rows:
    print(dict(zip(fsm.header, row)))`,
    },
  ],
  commands: [
    { command: "pip install netmiko napalm nornir paramiko textfsm", description: "ติดตั้ง core automation libraries" },
    { command: "python3 -c 'import netmiko; print(netmiko.__version__)'", description: "verify netmiko installation" },
    { command: "python3 -m pytest tests/", description: "run automation tests" },
  ],
  quiz: [
    { id: "q1", question: "Python module ไหนใช้สำหรับ SSH connection?", options: ["socket", "paramiko", "netmiko", "telnetlib"], correct: 1, explanation: "paramiko เป็น pure-Python SSH2 library ที่ใช้กันมากที่สุด netmiko build on top ของ paramiko แต่ paramiko เป็น base" },
    { id: "q2", question: "TextFSM ใช้ทำอะไร?", options: ["เขียน config ส่งไปยัง device", "Parse structured output จาก CLI", "Test connectivity", "Backup configuration"], correct: 1, explanation: "TextFSM template-based parser แปลง unstructured CLI text เป็น structured data (list of dicts)" },
    { id: "q3", question: "ipaddress.ip_network('10.0.0.0/8').num_addresses คืนค่าอะไร?", options: ["254", "256", "16777214", "16777216"], correct: 3, explanation: "/8 = 2^24 = 16,777,216 addresses (รวม network และ broadcast)" },
    { id: "q4", question: "ข้อดีของ TextFSM เหนือ regex ธรรมดาคืออะไร?", options: ["เร็วกว่า", "Template reusable ข้าม script", "ไม่ต้องใช้ regex", "ทำงานบน Windows เท่านั้น"], correct: 1, explanation: "TextFSM template เป็น file แยกต่างหาก นำกลับมาใช้ซ้ำได้ และ community มี NTC templates สำเร็จรูปพร้อมใช้" },
    { id: "q5", question: "error handling ที่ดีสำหรับ SSH connection failure ควรจัดการ exception ใด?", options: ["ValueError", "paramiko.AuthenticationException + socket.timeout", "KeyError", "IndexError"], correct: 1, explanation: "ต้อง catch AuthenticationException (wrong password), NoValidConnectionsError (port closed), socket.timeout (device unreachable)" },
  ],
  interviewQuestions: [
    { level: "Junior", question: "บอก Python library ที่ใช้ connect SSH ไปยัง network device ได้บ้าง", answerGuide: "paramiko (low-level SSH), netmiko (abstraction layer บน paramiko, support หลาย vendor), asyncssh (async)" },
    { level: "Mid", question: "อธิบาย TextFSM และ NTC Templates คืออะไร", answerGuide: "TextFSM เป็น template-based state machine parser สร้างโดย Google แปลง CLI text → structured data NTC Templates คือ community repository ของ TextFSM templates สำหรับ show commands ทั้งหมดของทุก vendor" },
    { level: "Senior", question: "เมื่อ network automation script ต้อง scale ไป 1000+ devices จะออกแบบ architecture อย่างไร?", answerGuide: "ใช้ async IO (asyncio + asyncssh) หรือ thread pool สำหรับ parallel connections, Nornir สำหรับ inventory management, circuit breaker pattern สำหรับ failed devices, idempotent operations, dry-run mode, structured logging" },
  ],
  lab: {
    id:          "lab-python-net",
    title:       "Python Network Automation Starter",
    description: "เขียน script collect 'show ip interface brief' จาก 3 devices พร้อม parse output เป็น JSON",
    objectives:  ["Connect ผ่าน SSH", "Parse output ด้วย TextFSM", "Export เป็น JSON file"],
    steps:       ["Setup paramiko/netmiko", "Write TextFSM template", "Loop over device list", "Export results"],
    difficulty:  "Intermediate",
    duration:    "45 min",
  },
  troubleshootingTips: [
    { issue: "SSH key error", solution: "set_missing_host_key_policy(paramiko.AutoAddPolicy()) หรือ ใส่ known_hosts" },
    { issue: "Output truncated", solution: "ส่ง 'terminal length 0' ก่อน เพื่อ disable paging" },
    { issue: "Unicode decode error", solution: "ใช้ .decode('utf-8', errors='ignore')" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 2 — Netmiko
// ─────────────────────────────────────────────────────────────────────────────
const netmikoLesson = {
  id:          "auto-002",
  slug:        "netmiko-ssh-automation",
  title:       "Netmiko — Multi-vendor SSH Automation",
  description: "ใช้ Netmiko abstraction layer connect Cisco, Juniper, Arista, Huawei ด้วย code เดียวกัน",
  level:       "Intermediate",
  duration:    "75 min",
  xp:          125,
  tags:        ["netmiko", "ssh", "cisco", "juniper", "multi-vendor"],
  prerequisites: ["python-for-network-engineers"],
  objectives: [
    "เชื่อมต่อ multi-vendor devices ด้วย ConnectHandler",
    "ส่ง show commands และ config commands",
    "ใช้ send_config_set สำหรับ bulk config push",
    "Handle timeout และ authentication errors",
    "ทำ parallel connections ด้วย ThreadPoolExecutor",
  ],
  content: [
    {
      type:  "concept",
      title: "Netmiko — Why it exists",
      body:  "Cisco IOS, NX-OS, Junos, EOS ต่างกันมาก: prompt character ต่างกัน, paging ต่างกัน, config mode ต่างกัน Netmiko handle ความแตกต่างเหล่านี้แทนเรา — เราแค่ระบุ device_type",
    },
    {
      type:  "code",
      title: "Basic ConnectHandler",
      body:  `from netmiko import ConnectHandler

# Device definitions
cisco_router = {
    "device_type": "cisco_ios",
    "host":        "192.168.1.1",
    "username":    "admin",
    "password":    "cisco123",
    "secret":      "enable_pass",   # enable password
}

juniper_switch = {
    "device_type": "juniper_junos",
    "host":        "192.168.1.2",
    "username":    "admin",
    "password":    "juniper123",
}

# Connect and run show command
with ConnectHandler(**cisco_router) as conn:
    conn.enable()   # enter enable mode
    output = conn.send_command("show ip route")
    print(output)`,
    },
    {
      type:  "code",
      title: "Bulk config push — send_config_set",
      body:  `from netmiko import ConnectHandler

device = {
    "device_type": "cisco_ios",
    "host":        "10.0.0.1",
    "username":    "admin",
    "password":    "cisco",
}

config_commands = [
    "interface GigabitEthernet0/1",
    "description ## WAN Link to ISP ##",
    "ip address 203.0.113.1 255.255.255.252",
    "no shutdown",
    "exit",
    "ip route 0.0.0.0 0.0.0.0 203.0.113.2",
]

with ConnectHandler(**device) as conn:
    conn.enable()
    output = conn.send_config_set(config_commands)
    conn.save_config()   # write mem
    print(output)`,
    },
    {
      type:  "code",
      title: "Parallel connections — ThreadPoolExecutor",
      body:  `from netmiko import ConnectHandler
from concurrent.futures import ThreadPoolExecutor, as_completed

devices = [
    {"device_type": "cisco_ios", "host": "10.0.0.1", "username": "admin", "password": "cisco"},
    {"device_type": "cisco_ios", "host": "10.0.0.2", "username": "admin", "password": "cisco"},
    {"device_type": "cisco_nxos", "host": "10.0.0.3", "username": "admin", "password": "cisco"},
]

def collect_version(device):
    with ConnectHandler(**device) as conn:
        return {"host": device["host"], "output": conn.send_command("show version")}

results = []
with ThreadPoolExecutor(max_workers=10) as pool:
    futures = {pool.submit(collect_version, d): d for d in devices}
    for future in as_completed(futures):
        results.append(future.result())

for r in results:
    print(f"--- {r['host']} ---\\n{r['output'][:200]}")`,
    },
    {
      type:  "concept",
      title: "Supported Device Types",
      body:  "Netmiko support 70+ device types: cisco_ios, cisco_nxos, cisco_xr, juniper_junos, arista_eos, huawei, paloalto_panos, fortinet, linux, mikrotik_routeros และอื่นๆ ดู full list ที่ github.com/ktbyers/netmiko",
    },
  ],
  commands: [
    { command: "pip install netmiko", description: "install netmiko" },
    { command: "python -c \"from netmiko import ConnectHandler; print('OK')\"", description: "verify install" },
  ],
  quiz: [
    { id: "q1", question: "Netmiko device_type สำหรับ Cisco NX-OS คืออะไร?", options: ["cisco_ios", "cisco_nxos", "cisco_nexus", "cisco_dc"], correct: 1, explanation: "cisco_nxos สำหรับ Nexus switches, cisco_ios สำหรับ IOS/IOS-XE, cisco_xr สำหรับ IOS-XR" },
    { id: "q2", question: "send_config_set รับ argument เป็นอะไร?", options: ["string", "list of strings", "dict", "file path"], correct: 1, explanation: "รับ list of strings โดยแต่ละ element คือ 1 config command ที่จะ send ไปตาม sequence" },
    { id: "q3", question: "conn.save_config() ทำอะไร?", options: ["Save startup-config เป็น file", "เทียบเท่า 'write memory'", "Backup config ไป TFTP", "Download running config"], correct: 1, explanation: "save_config() ส่ง 'write memory' หรือ 'copy run start' แล้วแต่ device type โดยอัตโนมัติ" },
    { id: "q4", question: "วิธีที่ดีที่สุดสำหรับ connect 500 devices พร้อมกันคืออะไร?", options: ["Loop ทีละ device", "ThreadPoolExecutor", "subprocess", "asyncio เท่านั้น"], correct: 1, explanation: "ThreadPoolExecutor จาก concurrent.futures control จำนวน parallel workers ได้ (max_workers) ป้องกัน overwhelm" },
    { id: "q5", question: "เมื่อ device ใช้ enable password ต้องทำอะไรก่อน run show commands?", options: ["ไม่ต้องทำอะไร", "conn.enable()", "conn.config_mode()", "conn.send_command('enable')"], correct: 1, explanation: "conn.enable() จะ enter privileged exec mode โดยใช้ 'secret' parameter ที่ระบุใน device dict" },
  ],
  interviewQuestions: [
    { level: "Junior", question: "Netmiko ต่างจาก paramiko อย่างไร?", answerGuide: "paramiko เป็น raw SSH library, Netmiko เป็น abstraction layer บน paramiko ที่ handle device-specific behavior: prompt handling, paging, enable mode, config mode ทำให้ code เดียว support หลาย vendor ได้" },
    { level: "Senior", question: "Design automation system ที่ต้อง push config ไป 2000 devices ภายใน 30 นาที พร้อม rollback ถ้า fail", answerGuide: "ใช้ Nornir (async) + netmiko, pre-backup config ก่อน push, idempotent check (compare desired vs current), transaction log, parallel execution 50-100 workers, failed device list สำหรับ rollback, post-push verification" },
  ],
  lab: {
    id:          "lab-netmiko-01",
    title:       "Multi-vendor Config Collector",
    description: "Connect 3 device types, collect show version, export CSV report",
    objectives:  ["Multi-vendor connection", "Parallel collection", "CSV export"],
    steps:       ["Define device inventory", "Write collector function", "ThreadPoolExecutor", "Parse and export"],
    difficulty:  "Intermediate",
    duration:    "45 min",
  },
  troubleshootingTips: [
    { issue: "NetmikoTimeoutException", solution: "เพิ่ม timeout parameter, ตรวจ SSH reachability ด้วย ping ก่อน" },
    { issue: "Pattern not found after login", solution: "ระบุ device_type ถูกต้อง หรือใช้ autodetect" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 3 — Ansible for Networks
// ─────────────────────────────────────────────────────────────────────────────
const ansibleLesson = {
  id:          "auto-003",
  slug:        "ansible-for-networks",
  title:       "Ansible for Network Automation",
  description: "ใช้ Ansible playbook push config, collect facts, manage network infrastructure แบบ declarative",
  level:       "Intermediate",
  duration:    "90 min",
  xp:          125,
  tags:        ["ansible", "playbook", "declarative", "idempotent", "network"],
  prerequisites: ["python-for-network-engineers"],
  objectives: [
    "เขียน Ansible inventory สำหรับ network devices",
    "สร้าง playbook ใช้ cisco.ios.ios_config module",
    "ใช้ Jinja2 template สร้าง config จาก variables",
    "Implement idempotent configuration management",
    "ใช้ ansible-vault encrypt secrets",
  ],
  content: [
    {
      type:  "concept",
      title: "Ansible vs Script — เมื่อไหรใช้อะไร",
      body:  "Script (Netmiko/Nornir): real-time reaction, complex logic, custom parsing. Ansible: declarative state management, inventory + role organization, built-in idempotency, team collaboration, CI/CD integration. Production ส่วนใหญ่ใช้ทั้งสอง",
    },
    {
      type:  "code",
      title: "Inventory file — hosts.yml",
      body:  `all:
  children:
    routers:
      hosts:
        R1:
          ansible_host: 192.168.1.1
        R2:
          ansible_host: 192.168.1.2
      vars:
        ansible_network_os: cisco.ios.ios
        ansible_user: admin
        ansible_password: "{{ vault_password }}"
        ansible_become: yes
        ansible_become_method: enable
        ansible_become_password: "{{ vault_enable }}"
        ansible_connection: ansible.netcommon.network_cli

    switches:
      hosts:
        SW1:
          ansible_host: 192.168.2.1
        SW2:
          ansible_host: 192.168.2.2
      vars:
        ansible_network_os: cisco.ios.ios`,
    },
    {
      type:  "code",
      title: "Playbook — configure OSPF",
      body:  `---
- name: Configure OSPF on all routers
  hosts: routers
  gather_facts: no

  vars:
    ospf_process: 1
    ospf_router_id: "{{ ansible_host }}"

  tasks:
    - name: Configure OSPF process
      cisco.ios.ios_config:
        lines:
          - "router ospf {{ ospf_process }}"
          - " router-id {{ ospf_router_id }}"
          - " network 10.0.0.0 0.255.255.255 area 0"
          - " passive-interface default"
          - " no passive-interface GigabitEthernet0/0"
        save_when: modified

    - name: Verify OSPF neighbors
      cisco.ios.ios_command:
        commands: "show ip ospf neighbor"
      register: ospf_output

    - name: Display result
      debug:
        var: ospf_output.stdout_lines`,
    },
    {
      type:  "code",
      title: "Jinja2 template config",
      body:  `{# templates/interface.j2 #}
{% for intf in interfaces %}
interface {{ intf.name }}
  description {{ intf.description }}
  ip address {{ intf.ip }} {{ intf.mask }}
  {% if intf.shutdown is defined and intf.shutdown %}
  shutdown
  {% else %}
  no shutdown
  {% endif %}
!
{% endfor %}

{# playbook using template #}
- name: Configure interfaces from template
  cisco.ios.ios_config:
    src: "templates/interface.j2"`,
    },
    {
      type:  "concept",
      title: "Ansible Vault — Encrypt Secrets",
      body:  "ansible-vault encrypt_string 'cisco123' --name vault_password → encrypt inline หรือ ansible-vault create secrets.yml → file ทั้งไฟล์ run ด้วย ansible-playbook site.yml --ask-vault-pass หรือ --vault-password-file",
    },
  ],
  commands: [
    { command: "pip install ansible ansible-pylibssh", description: "install ansible" },
    { command: "ansible-galaxy collection install cisco.ios cisco.nxos junipernetworks.junos", description: "install network collections" },
    { command: "ansible-playbook -i hosts.yml site.yml --check", description: "dry-run ไม่ apply จริง" },
    { command: "ansible-vault encrypt_string 'secret' --name myvar", description: "encrypt string สำหรับ inline vault" },
  ],
  quiz: [
    { id: "q1", question: "Ansible connection plugin ที่ถูกต้องสำหรับ network device (agentless) คืออะไร?", options: ["ssh", "paramiko", "ansible.netcommon.network_cli", "local"], correct: 2, explanation: "network_cli เป็น connection plugin ที่ออกแบบสำหรับ network CLI — handle enable mode, paging, prompts" },
    { id: "q2", question: "save_when: modified ใน ios_config ทำอะไร?", options: ["Save เสมอทุกครั้ง", "บันทึก startup-config เฉพาะเมื่อมีการเปลี่ยนแปลง", "ไม่ save เลย", "Save ทุก 5 นาที"], correct: 1, explanation: "บันทึก startup-config (write mem) เฉพาะเมื่อ task มี change — ลด write operations และ idempotent" },
    { id: "q3", question: "Jinja2 template ใน Ansible ใช้ทำอะไรกับ network automation?", options: ["Generate config จาก variables", "Connect ไปยัง device", "Parse show output", "Encrypt passwords"], correct: 0, explanation: "Jinja2 สร้าง config text จาก template + variables เช่น hostname, IP, VLAN list — เหมือน mail merge" },
    { id: "q4", question: "--check flag เมื่อ run ansible-playbook ทำอะไร?", options: ["Check syntax error เท่านั้น", "Dry-run: simulate but don't change", "Check inventory", "Check vault password"], correct: 1, explanation: "Dry-run mode แสดงว่าจะมี change อะไรบ้างโดยไม่ apply จริง — ใช้ก่อน production push เสมอ" },
    { id: "q5", question: "ansible-vault ใช้ทำอะไร?", options: ["Run playbook แบบ async", "Encrypt secrets ใน vars/inventory", "Test connectivity", "Document network"], correct: 1, explanation: "Vault encrypt passwords, API keys, secrets ใน plaintext YAML files ทำให้ push ขึ้น Git ได้อย่างปลอดภัย" },
  ],
  interviewQuestions: [
    { level: "Junior", question: "Ansible idempotent หมายความว่าอะไร?", answerGuide: "run playbook กี่ครั้งก็ได้ผลลัพธ์เหมือนกัน ถ้า config ตรงกับที่ต้องการอยู่แล้วก็ไม่มี change เป็น property สำคัญของ declarative automation" },
    { level: "Mid", question: "อธิบายความแตกต่างระหว่าง ios_config กับ ios_command", answerGuide: "ios_config: push configuration (idempotent, config mode). ios_command: run show commands (exec mode, not idempotent). ios_config ใช้สำหรับ state management, ios_command ใช้สำหรับ data collection และ verification" },
  ],
  lab: {
    id:          "lab-ansible-01",
    title:       "Ansible VLAN Deployment",
    description: "Deploy 5 VLANs ไปยัง 4 switches พร้อม Jinja2 template และ vault-encrypted credentials",
    objectives:  ["Write inventory", "Create VLAN template", "Deploy with playbook", "Verify with ios_command"],
    steps:       ["Setup inventory + vault", "Write Jinja2 VLAN template", "Write playbook", "Test --check", "Deploy"],
    difficulty:  "Intermediate",
    duration:    "60 min",
  },
  troubleshootingTips: [
    { issue: "UNREACHABLE error", solution: "ตรวจ ansible_host, ansible_user, ansible_connection ใน inventory" },
    { issue: "MODULE FAILURE", solution: "ตรวจ ansible_network_os ถูก vendor หรือเปล่า install collection ครบหรือไม่" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 4 — NAPALM
// ─────────────────────────────────────────────────────────────────────────────
const napalmLesson = {
  id:          "auto-004",
  slug:        "napalm-multi-vendor",
  title:       "NAPALM — Network Automation and Programmability Abstraction Layer with Multivendor support",
  description: "ใช้ NAPALM เป็น abstraction layer ที่ทำให้ code เดียวทำงานได้กับ Cisco IOS, NX-OS, Junos, EOS",
  level:       "Advanced",
  duration:    "75 min",
  xp:          125,
  tags:        ["napalm", "multi-vendor", "abstraction", "getters", "config-diff"],
  prerequisites: ["netmiko-ssh-automation"],
  objectives: [
    "ใช้ NAPALM getters: get_facts, get_interfaces, get_bgp_neighbors",
    "Compare config diff ก่อน push ด้วย compare_config",
    "Commit / rollback config atomically",
    "ใช้ NAPALM กับ Cisco IOS, Junos, EOS",
  ],
  content: [
    {
      type:  "concept",
      title: "NAPALM Architecture",
      body:  "NAPALM driver สำหรับแต่ละ OS: ios, iosxr, eos, junos, nxos ทุก driver implement interface เดียวกัน: get_facts(), get_interfaces(), get_bgp_neighbors() ทำให้เปลี่ยน vendor โดยแก้แค่ driver_name",
    },
    {
      type:  "code",
      title: "NAPALM get_facts + get_interfaces",
      body:  `from napalm import get_network_driver

# Connect to Cisco IOS
driver = get_network_driver("ios")
device = driver(
    hostname="192.168.1.1",
    username="admin",
    password="cisco123",
    optional_args={"secret": "enable_pass"},
)
device.open()

facts = device.get_facts()
print(facts)
# {'hostname': 'R1', 'fqdn': 'R1.local', 'vendor': 'Cisco',
#  'model': 'IOSv', 'os_version': '15.9...', 'uptime': 86400,
#  'interface_list': ['GigabitEthernet0/0', ...]}

interfaces = device.get_interfaces()
for name, data in interfaces.items():
    print(f"{name}: up={data['is_up']} speed={data['speed']}Mbps")

device.close()`,
    },
    {
      type:  "code",
      title: "Config diff and atomic commit",
      body:  `from napalm import get_network_driver

driver = get_network_driver("junos")
device = driver("192.168.1.2", "admin", "juniper123")
device.open()

# Load config to candidate (not live yet)
device.load_merge_candidate(filename="ospf_config.txt")

# Show diff before commit
diff = device.compare_config()
print("--- Config Diff ---")
print(diff)

if diff:
    confirm = input("Apply? [y/N]: ")
    if confirm.lower() == "y":
        device.commit_config()
        print("✅ Committed")
    else:
        device.discard_config()
        print("❌ Discarded")

device.close()`,
    },
  ],
  commands: [
    { command: "pip install napalm", description: "install NAPALM" },
    { command: "napalm --user admin --password cisco --vendor ios 192.168.1.1 call get_facts", description: "CLI test" },
  ],
  quiz: [
    { id: "q1", question: "NAPALM driver สำหรับ Juniper Junos คืออะไร?", options: ["juniper", "junos", "jnpr", "juniper_junos"], correct: 1, explanation: "get_network_driver('junos') — NAPALM ใช้ชื่อ OS ไม่ใช่ vendor" },
    { id: "q2", question: "compare_config() ทำอะไร?", options: ["Apply config", "Show diff between candidate และ running config", "Backup config", "Rollback"], correct: 1, explanation: "แสดง unified diff ระหว่าง candidate config (ที่ load ไว้) กับ running config ก่อน commit" },
    { id: "q3", question: "NAPALM atomic commit หมายความว่าอะไร?", options: ["เร็วมาก", "Commit สำเร็จทั้งหมดหรือ rollback ทั้งหมด", "Commit ทีละ command", "Require root"], correct: 1, explanation: "Transaction-style: ถ้า commit fail config กลับไปสถานะเดิมทั้งหมด — เฉพาะ platform ที่ support เช่น Junos" },
    { id: "q4", question: "get_bgp_neighbors() return ข้อมูลในรูปแบบใด?", options: ["Plain text", "Structured dict พร้อม AS, state, prefix count", "JSON string", "CSV"], correct: 1, explanation: "NAPALM getters return structured Python dict ทุก driver ใช้ schema เดียวกันทำให้ process ง่าย" },
    { id: "q5", question: "ข้อดีหลักของ NAPALM เหนือ raw netmiko คืออะไร?", options: ["เร็วกว่า", "Structured getters + atomic commit abstraction", "ฟรี", "Support มากกว่า"], correct: 1, explanation: "NAPALM ให้ structured data (getters) และ config management ที่ safe (diff/commit/rollback) ข้าม vendor" },
  ],
  interviewQuestions: [
    { level: "Mid", question: "NAPALM getter คืออะไร ยกตัวอย่าง 3 getters", answerGuide: "Getter คือ method ที่ดึงข้อมูลจาก device เป็น structured dict เช่น get_facts (hostname, model, OS), get_interfaces (speed, status), get_bgp_neighbors (AS, state, prefix count)" },
    { level: "Senior", question: "เมื่อไหรควรเลือก NAPALM แทน Ansible สำหรับ network automation", answerGuide: "NAPALM: ต้องการ config diff และ rollback, Python-native workflow, structured data collection. Ansible: declarative state management, team ที่ไม่ถนัด Python, orchestration complex, CI/CD integration ง่ายกว่า" },
  ],
  lab: {
    id:          "lab-napalm-01",
    title:       "Multi-vendor Facts Collector",
    description: "ใช้ NAPALM collect facts จาก IOS + Junos + EOS แล้ว compare ด้วย structure เดียวกัน",
    objectives:  ["Connect multi-vendor", "Structured data comparison", "Config diff workflow"],
    steps:       ["Connect drivers", "Run getters", "Format output", "Config diff demo"],
    difficulty:  "Advanced",
    duration:    "45 min",
  },
  troubleshootingTips: [
    { issue: "Module not found", solution: "pip install napalm[ios] หรือ napalm[junos] ตาม driver" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 5 — Nornir
// ─────────────────────────────────────────────────────────────────────────────
const nornirLesson = {
  id:          "auto-005",
  slug:        "nornir-python-framework",
  title:       "Nornir — Python-native Automation Framework",
  description: "Nornir คือ Python framework ที่ทำให้ automation เป็น pure Python ไม่ต้องพึ่ง YAML/DSL เหมือน Ansible",
  level:       "Advanced",
  duration:    "75 min",
  xp:          125,
  tags:        ["nornir", "framework", "parallel", "inventory", "tasks"],
  prerequisites: ["netmiko-ssh-automation", "napalm-multi-vendor"],
  objectives: [
    "Setup Nornir inventory (hosts.yaml + groups.yaml + defaults.yaml)",
    "เขียน Nornir task function",
    "ใช้ nornir-netmiko และ nornir-napalm plugins",
    "Filter hosts ด้วย F() object",
    "Process results และ handle failures",
  ],
  content: [
    {
      type:  "concept",
      title: "Nornir vs Ansible — ทำไมต้องมี",
      body:  "Ansible ดีสำหรับ declarative state แต่ถ้าต้องการ: complex Python logic, real-time decision making, custom data processing, fast parallel execution — Nornir เหมาะกว่า เพราะเป็น pure Python ทุกอย่างเป็น Python function",
    },
    {
      type:  "code",
      title: "Nornir inventory structure",
      body:  `# inventory/hosts.yaml
R1:
  hostname: 192.168.1.1
  groups:
    - cisco_routers
  data:
    site: "Bangkok"
    role: "core"

R2:
  hostname: 192.168.1.2
  groups:
    - cisco_routers
  data:
    site: "Chiangmai"
    role: "edge"

# inventory/groups.yaml
cisco_routers:
  platform: ios
  username: admin
  password: cisco123
  connection_options:
    netmiko:
      extras:
        secret: enable_pass

# inventory/defaults.yaml
data:
  domain: company.local`,
    },
    {
      type:  "code",
      title: "Nornir task + filter + results",
      body:  `from nornir import InitNornir
from nornir_netmiko.tasks import netmiko_send_command
from nornir_utils.plugins.functions import print_result
from nornir.core.filter import F

# Initialize
nr = InitNornir(config_file="config.yaml")

# Filter: only core routers in Bangkok
core_bkk = nr.filter(F(role="core") & F(site="Bangkok"))

# Run task on filtered hosts
result = core_bkk.run(
    task=netmiko_send_command,
    command_string="show ip route summary",
)

# Print results
print_result(result)

# Access individual results
for host, task_result in result.items():
    if task_result.failed:
        print(f"❌ {host}: {task_result.exception}")
    else:
        print(f"✅ {host}:\\n{task_result.result}")`,
    },
    {
      type:  "code",
      title: "Custom task function",
      body:  `from nornir.core.task import Task, Result
from nornir_netmiko.tasks import netmiko_send_command, netmiko_send_config_set

def configure_ntp(task: Task, ntp_servers: list[str]) -> Result:
    """Custom Nornir task: configure NTP servers"""
    commands = [f"ntp server {s}" for s in ntp_servers]

    # Send config
    task.run(
        task=netmiko_send_config_set,
        config_commands=commands,
    )

    # Verify
    result = task.run(
        task=netmiko_send_command,
        command_string="show ntp status",
    )

    return Result(host=task.host, result=result.result)

# Run the custom task
nr = InitNornir(config_file="config.yaml")
result = nr.run(
    task=configure_ntp,
    ntp_servers=["1.1.1.1", "8.8.8.8"],
)`,
    },
  ],
  commands: [
    { command: "pip install nornir nornir-netmiko nornir-napalm nornir-utils", description: "install nornir ecosystem" },
    { command: "python automation.py", description: "run nornir script" },
  ],
  quiz: [
    { id: "q1", question: "Nornir ต่างจาก Ansible อย่างไรที่สำคัญที่สุด?", options: ["Nornir เร็วกว่า", "Nornir เป็น pure Python ไม่ใช้ YAML/DSL", "Nornir ฟรีกว่า", "Nornir support device มากกว่า"], correct: 1, explanation: "Nornir automation เขียนเป็น Python function ทุกอย่าง ให้ flexibility เต็มที่สำหรับ complex logic" },
    { id: "q2", question: "F() ใน Nornir ใช้ทำอะไร?", options: ["Format output", "Filter hosts จาก inventory", "Connect to device", "Define task"], correct: 1, explanation: "F() object ใช้ filter hosts ตาม data fields เช่น F(role='core') & F(site='Bangkok') — ใช้ AND/OR/NOT" },
    { id: "q3", question: "Nornir task function รับ parameter แรกเป็นอะไรเสมอ?", options: ["hostname: str", "task: Task", "hosts: list", "nr: InitNornir"], correct: 1, explanation: "Task object ส่งผ่าน Nornir runner มี properties: task.host (current host), task.run() (run sub-task)" },
    { id: "q4", question: "nornir_netmiko.tasks.netmiko_send_command เทียบเท่ากับอะไร?", options: ["conn.send_command()", "conn.send_config_set()", "conn.enable()", "conn.disconnect()"], correct: 0, explanation: "netmiko_send_command เรียก send_command() ของ netmiko connection ที่ Nornir manage ให้" },
    { id: "q5", question: "result.failed ใน Nornir หมายความว่าอะไร?", options: ["result เป็น empty", "Task นั้น raise exception", "host ไม่ตอบสนอง", "Password ผิด"], correct: 1, explanation: "failed=True หมายความว่า task raise exception เข้าถึง exception ได้ที่ result.exception" },
  ],
  interviewQuestions: [
    { level: "Senior", question: "อธิบาย Nornir architecture และ use case ที่เหมาะสม", answerGuide: "Nornir มี: Inventory (hosts/groups/defaults), Runner (parallel execution control), Task (Python function), Result (structured output). เหมาะสำหรับ complex automation ที่ต้องการ Python logic เต็มที่ เช่น conditional config, multi-step verification, custom reporting" },
  ],
  lab: {
    id:          "lab-nornir-01",
    title:       "Nornir Parallel Config Backup",
    description: "Backup running-config จากทุก device ใน inventory พร้อมกัน บันทึกเป็นไฟล์แยกตาม hostname",
    objectives:  ["Setup inventory", "Write backup task", "Parallel execution", "File output"],
    steps:       ["Create inventory YAML", "Write backup task function", "Run on all hosts", "Save to files"],
    difficulty:  "Advanced",
    duration:    "45 min",
  },
  troubleshootingTips: [
    { issue: "Import error nornir_netmiko", solution: "pip install nornir-netmiko (ขีดกลาง ไม่ใช่ underscore)" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 6 — Terraform for Networks
// ─────────────────────────────────────────────────────────────────────────────
const terraformLesson = {
  id:          "auto-006",
  slug:        "terraform-for-networks",
  title:       "Terraform for Network Infrastructure",
  description: "Infrastructure as Code ด้วย Terraform: provision cloud networking, VPC, security groups, load balancers",
  level:       "Advanced",
  duration:    "90 min",
  xp:          125,
  tags:        ["terraform", "iac", "aws", "vpc", "infrastructure-as-code"],
  prerequisites: ["python-for-network-engineers"],
  objectives: [
    "เขียน Terraform configuration สำหรับ AWS VPC",
    "ใช้ variables, outputs, และ modules",
    "terraform plan / apply / destroy",
    "ใช้ remote state backend (S3)",
    "Implement network security groups และ NACLs",
  ],
  content: [
    {
      type:  "concept",
      title: "Infrastructure as Code (IaC)",
      body:  "IaC = ใช้ code บอกว่า infrastructure ควรเป็นอะไร แทนการ click UI Terraform: declarative, provider ecosystem (AWS, Azure, GCP, Cisco NSO, Palo Alto), state management, plan before apply. เหมาะสำหรับ cloud network infrastructure",
    },
    {
      type:  "code",
      title: "AWS VPC + Subnets",
      body:  `# main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.region
}

# VPC
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true

  tags = {
    Name        = "netpath-vpc"
    Environment = var.environment
  }
}

# Public subnets
resource "aws_subnet" "public" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet("10.0.0.0/16", 8, count.index)
  availability_zone = data.aws_availability_zones.available.names[count.index]

  map_public_ip_on_launch = true
  tags = { Name = "public-\${count.index + 1}" }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
}

# Route table
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
}`,
    },
    {
      type:  "code",
      title: "Security Groups + variables",
      body:  `# variables.tf
variable "region" {
  description = "AWS region"
  type        = string
  default     = "ap-southeast-1"
}
variable "environment" {
  type    = string
  default = "prod"
}

# security_groups.tf
resource "aws_security_group" "web" {
  name   = "web-sg"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# outputs.tf
output "vpc_id" {
  value = aws_vpc.main.id
}
output "public_subnet_ids" {
  value = aws_subnet.public[*].id
}`,
    },
    {
      type:  "concept",
      title: "Terraform Workflow",
      body:  "1. terraform init — download providers. 2. terraform plan — show what will change (CRITICAL step). 3. terraform apply — create/update resources. 4. terraform destroy — delete all. State file (.tfstate) tracks resources — ใช้ remote backend (S3 + DynamoDB lock) ใน production เสมอ",
    },
  ],
  commands: [
    { command: "terraform init", description: "initialize + download providers" },
    { command: "terraform plan -out=tfplan", description: "plan และ save ไว้ apply" },
    { command: "terraform apply tfplan", description: "apply ที่ plan ไว้" },
    { command: "terraform destroy -target=aws_instance.web", description: "destroy เฉพาะ resource" },
    { command: "terraform state list", description: "list managed resources" },
  ],
  quiz: [
    { id: "q1", question: "terraform plan ทำอะไร?", options: ["Create resources ทันที", "Show changes ที่จะเกิดขึ้นโดยไม่ apply", "Validate syntax", "Download providers"], correct: 1, explanation: "plan แสดง diff ระหว่าง current state กับ desired state ช่วยให้ review ก่อน apply — เสมือน dry-run" },
    { id: "q2", question: "Terraform state file ใช้ทำอะไร?", options: ["Log ทุก action", "Track real-world resources ที่ Terraform manage", "Store passwords", "Backup config"], correct: 1, explanation: "State file map resource ใน .tf กับ real infrastructure ที่มีอยู่จริง — อย่า edit manually" },
    { id: "q3", question: "count = 2 ใน resource block หมายความว่าอะไร?", options: ["Create resource 2 ครั้ง", "Create 2 instances ของ resource นั้น", "Timeout 2 seconds", "Retry 2 ครั้ง"], correct: 1, explanation: "สร้าง 2 copies ของ resource เข้าถึงด้วย resource.name[0] และ resource.name[1] หรือ resource.name[*]" },
    { id: "q4", question: "ทำไมต้องใช้ remote backend (S3) แทน local state?", options: ["เร็วกว่า", "Team share state + lock ป้องกัน concurrent apply", "ปลอดภัยกว่า", "ฟรี"], correct: 1, explanation: "Remote backend: ทำงานร่วมกันได้ (state shared), DynamoDB lock ป้องกัน 2 คน apply พร้อมกัน, disaster recovery" },
    { id: "q5", question: "cidrsubnet('10.0.0.0/16', 8, 0) return อะไร?", options: ["10.0.0.0/8", "10.0.0.0/24", "10.0.1.0/24", "10.0.0.1/32"], correct: 1, explanation: "cidrsubnet(base, newbits, netnum): /16 + 8 bits = /24, netnum=0 → 10.0.0.0/24" },
  ],
  interviewQuestions: [
    { level: "Mid", question: "อธิบาย Terraform state และทำไมต้องใช้ remote backend ใน production", answerGuide: "State file track mapping ระหว่าง .tf resources กับ real infrastructure Remote backend (S3+DynamoDB): team share state ได้, lock ป้องกัน concurrent apply, state ไม่สูญหายถ้า local machine พัง, audit trail" },
    { level: "Senior", question: "Design multi-environment (dev/staging/prod) Terraform setup", answerGuide: "ใช้ Terraform workspaces หรือ directory structure แยก per environment, module reuse ด้วย module blocks, variables override per environment, separate S3 bucket per environment สำหรับ state, tfvars files สำหรับ environment-specific values" },
  ],
  lab: {
    id:          "lab-terraform-01",
    title:       "Terraform VPC + 3-tier Network",
    description: "สร้าง AWS VPC พร้อม public/private/database subnets, IGW, NAT Gateway, Security Groups",
    objectives:  ["VPC + subnets", "Internet Gateway + NAT", "Security Groups", "Route tables"],
    steps:       ["Write main.tf", "terraform init + plan", "Review plan", "terraform apply", "Verify in AWS Console"],
    difficulty:  "Advanced",
    duration:    "60 min",
  },
  troubleshootingTips: [
    { issue: "Error: No valid credential sources found", solution: "aws configure หรือ set AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY" },
    { issue: "State lock", solution: "terraform force-unlock <lock-id> ถ้า previous apply crash" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 7 — RESTCONF / NETCONF
// ─────────────────────────────────────────────────────────────────────────────
const restconfLesson = {
  id:          "auto-007",
  slug:        "restconf-netconf",
  title:       "RESTCONF & NETCONF — Model-driven Programmability",
  description: "ใช้ RESTCONF (HTTP/JSON) และ NETCONF (SSH/XML) เป็น modern API สำหรับ network device management",
  level:       "Expert",
  duration:    "90 min",
  xp:          125,
  tags:        ["restconf", "netconf", "yang", "api", "model-driven"],
  prerequisites: ["python-for-network-engineers"],
  objectives: [
    "ใช้ RESTCONF GET/PUT/PATCH ผ่าน requests library",
    "Understand YANG data model structure",
    "ใช้ NETCONF ผ่าน ncclient library",
    "อ่านและเปลี่ยน interface config ผ่าน REST API",
    "ใช้ YANG model browser (Postman/YANG Suite)",
  ],
  content: [
    {
      type:  "concept",
      title: "NETCONF vs RESTCONF vs CLI",
      body:  "CLI: human interface, unstructured text. NETCONF (RFC 6241): SSH transport, XML encoding, transaction model, candidate/running/startup datastores. RESTCONF (RFC 8040): HTTP transport, JSON/XML, stateless, easier integration. ทั้งสองใช้ YANG data models",
    },
    {
      type:  "concept",
      title: "YANG — Data Model Language",
      body:  "YANG (RFC 6020) เป็น language สำหรับ define structure ของ network configuration และ state data เช่น ietf-interfaces YANG model define: interfaces → interface → name, type, enabled, ipv4/ipv6. Cisco ใช้ Cisco-IOS-XE-native YANG + standard IETF models",
    },
    {
      type:  "code",
      title: "RESTCONF — GET interface info",
      body:  `import requests
import json
requests.packages.urllib3.disable_warnings()

BASE_URL = "https://192.168.1.1/restconf/data"
HEADERS = {
    "Content-Type": "application/yang-data+json",
    "Accept":        "application/yang-data+json",
}
AUTH = ("admin", "cisco123")

# GET all interfaces
response = requests.get(
    f"{BASE_URL}/ietf-interfaces:interfaces",
    headers=HEADERS,
    auth=AUTH,
    verify=False,
)

data = response.json()
for intf in data["ietf-interfaces:interfaces"]["interface"]:
    print(f"{intf['name']}: enabled={intf.get('enabled', True)}")`,
    },
    {
      type:  "code",
      title: "RESTCONF — PUT/PATCH config",
      body:  `import requests, json
requests.packages.urllib3.disable_warnings()

BASE_URL = "https://192.168.1.1/restconf/data"
AUTH    = ("admin", "cisco123")
HEADERS = {"Content-Type": "application/yang-data+json"}

# Configure loopback0
loopback_config = {
    "ietf-interfaces:interface": {
        "name":    "Loopback0",
        "type":    "iana-if-type:softwareLoopback",
        "enabled": True,
        "ietf-ip:ipv4": {
            "address": [{"ip": "1.1.1.1", "prefix-length": 32}]
        }
    }
}

resp = requests.put(
    f"{BASE_URL}/ietf-interfaces:interfaces/interface=Loopback0",
    headers=HEADERS,
    auth=AUTH,
    json=loopback_config,
    verify=False,
)
print(f"Status: {resp.status_code}")   # 201 Created or 204 No Content`,
    },
    {
      type:  "code",
      title: "NETCONF — ncclient",
      body:  `from ncclient import manager

with manager.connect(
    host="192.168.1.1",
    port=830,
    username="admin",
    password="cisco123",
    hostkey_verify=False,
    device_params={"name": "csr"},
) as m:
    # Get running config
    running = m.get_config(source="running")
    print(running.xml[:500])

    # Filter: get only interfaces
    interface_filter = """
    <filter>
      <interfaces xmlns="urn:ietf:params:xml:ns:yang:ietf-interfaces">
        <interface/>
      </interfaces>
    </filter>"""

    result = m.get_config("running", interface_filter)
    print(result.xml)`,
    },
  ],
  commands: [
    { command: "pip install requests ncclient", description: "install libraries" },
    { command: "curl -k -u admin:cisco https://router/restconf/data/ietf-interfaces:interfaces -H 'Accept: application/yang-data+json'", description: "test RESTCONF via curl" },
  ],
  quiz: [
    { id: "q1", question: "RESTCONF ใช้ transport protocol ใด?", options: ["SSH", "Telnet", "HTTPS", "SFTP"], correct: 2, explanation: "RESTCONF ใช้ HTTPS (HTTP/TLS) ทำให้ integrate กับ web tools ได้ง่าย NETCONF ใช้ SSH port 830" },
    { id: "q2", question: "YANG คืออะไร?", options: ["Protocol", "Data modeling language สำหรับ network config", "Encoding format", "Transport"], correct: 1, explanation: "YANG (Yet Another Next Generation) เป็น language define structure ของ data ที่ NETCONF/RESTCONF ใช้ — เหมือน schema สำหรับ network config" },
    { id: "q3", question: "RESTCONF HTTP method ที่ใช้ replace config ทั้งหมดคืออะไร?", options: ["GET", "POST", "PUT", "PATCH"], correct: 2, explanation: "PUT = replace entire resource. PATCH = partial update. POST = create new. GET = read" },
    { id: "q4", question: "NETCONF ต่างจาก RESTCONF อย่างไร?", options: ["NETCONF ใช้ JSON, RESTCONF ใช้ XML", "NETCONF ใช้ SSH+XML, RESTCONF ใช้ HTTPS+JSON", "NETCONF ใหม่กว่า", "NETCONF ไม่ใช้ YANG"], correct: 1, explanation: "NETCONF: SSH port 830, XML, stateful transactions, candidate datastore. RESTCONF: HTTPS, JSON/XML, stateless" },
    { id: "q5", question: "ncclient ใน Python ใช้สำหรับ?", options: ["REST API calls", "NETCONF sessions", "SNMP polling", "Telnet"], correct: 1, explanation: "ncclient เป็น Python library สำหรับ NETCONF protocol ทำให้ connect, get-config, edit-config ผ่าน Python ได้" },
  ],
  interviewQuestions: [
    { level: "Senior", question: "อธิบายความแตกต่างระหว่าง NETCONF candidate datastore กับ running datastore", answerGuide: "Running datastore: config ที่ active อยู่ตอนนี้. Candidate datastore: staging area ทำ edit ก่อน commit ทำให้ preview changes ก่อน apply, rollback ง่าย, atomic transaction — คล้าย git staging area" },
  ],
  lab: {
    id:          "lab-restconf-01",
    title:       "RESTCONF Interface Manager",
    description: "สร้าง Python script ที่อ่าน, สร้าง, และลบ interface ผ่าน RESTCONF API",
    objectives:  ["GET interfaces", "PUT new interface", "DELETE interface", "Error handling"],
    steps:       ["Test RESTCONF reachability", "GET all interfaces", "Configure new loopback", "Verify via CLI", "DELETE"],
    difficulty:  "Expert",
    duration:    "60 min",
  },
  troubleshootingTips: [
    { issue: "HTTP 406 Not Acceptable", solution: "ใส่ Accept: application/yang-data+json header" },
    { issue: "NETCONF timeout", solution: "ตรวจ 'netconf-yang' enable บน device: 'netconf-yang'" },
  ],
};

// ─── Export ───────────────────────────────────────────────────────────────────
export const automationLessons = [
  pythonForNetworks,
  netmikoLesson,
  ansibleLesson,
  napalmLesson,
  nornirLesson,
  terraformLesson,
  restconfLesson,
];

export const automationTrack = {
  id:          "network-automation",
  title:       "Network Automation",
  description: "Python, Netmiko, Ansible, NAPALM, Nornir, Terraform, RESTCONF — ทุกอย่างที่ Network Automation Engineer ต้องรู้",
  totalXp:     875,
  lessons:     automationLessons,
};
