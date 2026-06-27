"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Terminal, ChevronRight } from "lucide-react";

/* ── Command database ──────────────────────────────────────────── */
type CmdFn = (args: string[], state: SimState) => { output: string; newState?: Partial<SimState> };

interface SimState {
  mode:     "user" | "enable" | "config" | "config-if" | "config-router";
  hostname: string;
  iface:    string;
  history:  string[];
}

const PROMPTS: Record<SimState["mode"], (s: SimState) => string> = {
  "user":          s => `${s.hostname}>`,
  "enable":        s => `${s.hostname}#`,
  "config":        s => `${s.hostname}(config)#`,
  "config-if":     s => `${s.hostname}(config-if)#`,
  "config-router": s => `${s.hostname}(config-router)#`,
};

const COMMANDS: Record<string, CmdFn> = {
  "enable": (_, st) => st.mode !== "user"
    ? { output: "% Already in privileged mode" }
    : { output: "", newState: { mode: "enable" } },

  "disable": (_, st) => st.mode === "user"
    ? { output: "% Already in user mode" }
    : { output: "", newState: { mode: "user" } },

  "configure terminal": (_, st) => st.mode !== "enable"
    ? { output: "% Enter privileged mode first (type: enable)" }
    : { output: "Enter configuration commands, one per line.  End with CNTL/Z.", newState: { mode: "config" } },

  "conf t": (args, st) => COMMANDS["configure terminal"](args, st),

  "end": (_, st) => ({ output: "", newState: { mode: "enable" } }),

  "exit": (_, st) => {
    const next: Record<SimState["mode"], SimState["mode"]> = {
      "user": "user", "enable": "user", "config": "enable",
      "config-if": "config", "config-router": "config",
    };
    return { output: "", newState: { mode: next[st.mode] } };
  },

  "show version": () => ({ output: `Cisco IOS Software, Version 15.2(4)M7, RELEASE SOFTWARE (fc2)
Technical Support: http://www.cisco.com/techsupport
Copyright (c) 1986-2014 by Cisco Systems, Inc.
ROM: System Bootstrap, Version 15.1(4)M4
Uptime: 2 days, 3 hours, 47 minutes
System image file: "flash:c2900-universalk9-mz.SPA.152-4.M7.bin"
cisco 2901 (revision 1.0) with 483328K/40960K bytes of memory.
Processor board ID FTX152400KS
2 Gigabit Ethernet interfaces
1 Serial(sync/async) interface
DRAM configuration: 64 bits wide with parity disabled.
255K bytes of non-volatile configuration memory.
250880K bytes of ATA System CompactFlash 0 (Read/Write)` }),

  "show ip interface brief": () => ({ output: `Interface              IP-Address      OK? Method Status                Protocol
GigabitEthernet0/0     192.168.1.1     YES NVRAM  up                    up
GigabitEthernet0/1     10.0.0.1        YES NVRAM  up                    up
GigabitEthernet0/2     unassigned      YES unset  administratively down down
Serial0/0/0            203.0.113.1     YES NVRAM  up                    up` }),

  "show ip route": () => ({ output: `Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area

Gateway of last resort is 203.0.113.254 to network 0.0.0.0

S*    0.0.0.0/0 [1/0] via 203.0.113.254
      10.0.0.0/8 is variably subnetted, 2 subnets, 2 masks
C        10.0.0.0/24 is directly connected, GigabitEthernet0/1
L        10.0.0.1/32 is directly connected, GigabitEthernet0/1
      192.168.1.0/24 is variably subnetted, 2 subnets, 2 masks
C        192.168.1.0/24 is directly connected, GigabitEthernet0/0
L        192.168.1.1/32 is directly connected, GigabitEthernet0/0
O     172.16.0.0/16 [110/2] via 10.0.0.2, 00:15:33, GigabitEthernet0/1` }),

  "show running-config": () => ({ output: `Building configuration...

Current configuration : 1847 bytes
!
version 15.2
service timestamps debug datetime msec
service timestamps log datetime msec
no service password-encryption
!
hostname Router
!
ip dhcp pool LAN
   network 192.168.1.0 255.255.255.0
   default-router 192.168.1.1
   dns-server 8.8.8.8
!
interface GigabitEthernet0/0
 ip address 192.168.1.1 255.255.255.0
 duplex auto
 speed auto
!
interface GigabitEthernet0/1
 ip address 10.0.0.1 255.255.255.0
 duplex auto
 speed auto
!
router ospf 1
 router-id 1.1.1.1
 network 10.0.0.0 0.0.0.255 area 0
 network 192.168.1.0 0.0.0.255 area 0
!
ip route 0.0.0.0 0.0.0.0 203.0.113.254
!
end` }),

  "show arp": () => ({ output: `Protocol  Address          Age (min)  Hardware Addr   Type   Interface
Internet  192.168.1.1             -   c0:01:04:14:00:00  ARPA   GigabitEthernet0/0
Internet  192.168.1.10           15   a4:b1:c1:23:45:67  ARPA   GigabitEthernet0/0
Internet  192.168.1.20            3   b8:27:eb:12:34:56  ARPA   GigabitEthernet0/0
Internet  10.0.0.1                -   c0:01:04:14:00:01  ARPA   GigabitEthernet0/1
Internet  10.0.0.2                8   aa:bb:cc:dd:ee:ff  ARPA   GigabitEthernet0/1` }),

  "show vlan brief": () => ({ output: `VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active    Fa0/1, Fa0/2, Fa0/3
10   MGMT                             active    Fa0/5, Fa0/6
20   DATA                             active    Fa0/7, Fa0/8, Fa0/9
30   VOICE                            active    Fa0/10, Fa0/11
99   NATIVE                           active
1002 fddi-default                     act/unsup
1003 token-ring-default               act/unsup` }),

  "show interfaces": () => ({ output: `GigabitEthernet0/0 is up, line protocol is up
  Hardware is CN Gigabit Ethernet, address is c001.0414.0000 (bia c001.0414.0000)
  Internet address is 192.168.1.1/24
  MTU 1500 bytes, BW 1000000 Kbit/sec, DLY 10 usec,
     reliability 255/255, txload 1/255, rxload 1/255
  Encapsulation ARPA, loopback not set
  Keepalive set (10 sec)
  Full Duplex, 1Gbps, media type is RJ45
  Input queue: 0/75/0/0 (size/max/drops/flushes); Total output drops: 0
  5 minute input rate 1248000 bits/sec, 185 packets/sec
  5 minute output rate 856000 bits/sec, 120 packets/sec
     1847392 packets input, 2103947892 bytes, 0 no buffer
     0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored` }),

  "show ospf neighbor": (_, st) => st.mode === "user"
    ? { output: "% Command not available in user mode. Type 'enable' first." }
    : { output: `Neighbor ID     Pri   State           Dead Time   Address         Interface
2.2.2.2           1   FULL/DR         00:00:39    10.0.0.2        GigabitEthernet0/1
3.3.3.3           1   FULL/BDR        00:00:31    10.0.0.3        GigabitEthernet0/1` },

  "show ip ospf": (_, st) => st.mode === "user"
    ? { output: "% Command not available in user mode. Type 'enable' first." }
    : { output: `Routing Process "ospf 1" with ID 1.1.1.1
 Start time: 00:15:20.308, Time elapsed: 2d03h
 Supports only single TOS(TOS0) routes
 Supports opaque LSA
 Supports Link-local Signaling (LLS)
 SPF schedule delay 5 secs, Hold time between two SPFs 10 secs
 Number of areas in this router is 1. 1 normal 0 stub 0 nssa
 Number of interfaces in this area is 2
    Area BACKBONE(0)
        Number of interfaces in this area is 2
        SPF algorithm last executed 00:13:24.300 ago
        SPF algorithm executed 5 times
        Number of LSA 7. Checksum Sum 0x045A82` },

  "ping": (args) => {
    const target = args[0] || "192.168.1.1";
    const success = !target.startsWith("9") && !target.startsWith("0");
    if (!success) return { output: `Sending 5, 100-byte ICMP Echos to ${target}, timeout is 2 seconds:\n.....\nSuccess rate is 0 percent (0/5)` };
    return { output: `Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to ${target}, timeout is 2 seconds:
!!!!!
Success rate is 100 percent (5/5), round-trip min/avg/max = 1/2/4 ms` };
  },

  "traceroute": (args) => {
    const target = args[0] || "8.8.8.8";
    return { output: `Type escape sequence to abort.
Tracing the route to ${target}
  1 192.168.1.1 4 msec 4 msec 4 msec
  2 10.0.0.1 8 msec 8 msec 8 msec
  3 203.0.113.254 12 msec 12 msec 12 msec
  4 72.14.196.120 20 msec 19 msec 20 msec
  5 ${target} 24 msec 22 msec 24 msec` };
  },

  "hostname": (args, st) => {
    if (st.mode !== "config") return { output: "% Not in config mode. Type: configure terminal" };
    const name = args[0];
    if (!name) return { output: "% Usage: hostname <name>" };
    return { output: `Hostname changed to ${name}`, newState: { hostname: name } };
  },

  "interface": (args, st) => {
    if (st.mode !== "config") return { output: "% Not in config mode" };
    const iface = args.join(" ");
    if (!iface) return { output: "% Usage: interface <type> <number>" };
    return { output: `\nEnter configuration commands for interface ${iface}`, newState: { mode: "config-if", iface } };
  },

  "ip address": (args, st) => {
    if (st.mode !== "config-if") return { output: "% Not in interface config mode" };
    if (args.length < 2) return { output: "% Usage: ip address <ip> <mask>" };
    return { output: `IP address ${args[0]} ${args[1]} assigned to ${st.iface}` };
  },

  "no shutdown": (_, st) => st.mode !== "config-if"
    ? { output: "% Not in interface config mode" }
    : { output: `%LINK-5-CHANGED: Interface ${st.iface}, changed state to up\n%LINEPROTO-5-UPDOWN: Line protocol on Interface ${st.iface}, changed state to up` },

  "shutdown": (_, st) => st.mode !== "config-if"
    ? { output: "% Not in interface config mode" }
    : { output: `%LINK-5-CHANGED: Interface ${st.iface}, changed state to administratively down` },

  "copy running-config startup-config": (_, st) => st.mode !== "enable"
    ? { output: "% Must be in privileged mode" }
    : { output: "Destination filename [startup-config]? \nBuilding configuration...\n[OK]\n1847 bytes copied in 0.586 secs (3151 bytes/sec)" },

  "write memory": (args, st) => COMMANDS["copy running-config startup-config"](args, st),
  "wr": (args, st) => COMMANDS["copy running-config startup-config"](args, st),

  "clear": () => ({ output: "__CLEAR__" }),
  "cls": () => ({ output: "__CLEAR__" }),

  "?": (_, st) => {
    const helps: Record<SimState["mode"], string> = {
      "user": "clear         Clear screen\nenable        Enter privileged mode\nexit          Exit\nping          Test connectivity\nshow          Show system info\ntraceroute    Trace route to destination",
      "enable": "clear         Clear screen\nconfigure terminal  Enter config mode\ncopy          Copy config\ndisable       Back to user mode\nexit          Exit\nping          Test connectivity\nshow          Show system info\ntraceroute    Trace route\nwrite memory  Save config",
      "config": "end           Exit to enable mode\nexit          Exit one level\nhostname      Set router name\ninterface     Configure interface\nip            IP commands\nrouter        Configure routing\nno            Negate a command",
      "config-if": "end           Exit to enable mode\nexit          Exit one level\nip address    Assign IP address\nno shutdown   Enable interface\nshutdown      Disable interface",
      "config-router": "end           Exit to enable mode\nexit          Exit one level\nnetwork       Advertise network\nrouter-id     Set OSPF router ID",
    };
    return { output: helps[st.mode] };
  },

  "help": (args, st) => COMMANDS["?"](args, st),
};

interface Line { prompt: string; cmd: string; output: string }

export default function CliSimulator({ device = "Router" }: { device?: string }) {
  const [lines, setLines]   = useState<Line[]>([
    { prompt: "", cmd: "", output: `NetPath Academy — Cisco IOS Simulator\nType '?' or 'help' for available commands\n──────────────────────────────────────` }
  ]);
  const [input,    setInput]   = useState("");
  const [history,  setHistory] = useState<string[]>([]);
  const [histIdx,  setHistIdx] = useState(-1);
  const [simState, setSimState]= useState<SimState>({ mode: "user", hostname: device, iface: "", history: [] });
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  const prompt = PROMPTS[simState.mode](simState);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [lines]);

  function runCommand(raw: string) {
    const trimmed = raw.trim().toLowerCase();
    if (!trimmed) { setLines(l => [...l, { prompt, cmd: "", output: "" }]); return; }

    // history
    const newHist = [raw.trim(), ...history.slice(0, 19)];
    setHistory(newHist);
    setHistIdx(-1);

    // find command
    const cmdKey = Object.keys(COMMANDS).find(k => trimmed === k || trimmed.startsWith(k + " "));
    let output = "% Unrecognized command or invalid input. Type '?' for help.";
    let newState: Partial<SimState> | undefined;

    if (cmdKey) {
      const args = trimmed.slice(cmdKey.length).trim().split(/\s+/).filter(Boolean);
      const result = COMMANDS[cmdKey](args, simState);
      output = result.output;
      newState = result.newState;
    }

    if (output === "__CLEAR__") {
      setLines([]);
      if (newState) setSimState(s => ({ ...s, ...newState }));
      return;
    }

    setLines(l => [...l, { prompt, cmd: raw.trim(), output }]);
    if (newState) setSimState(s => ({ ...s, ...newState }));
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(idx);
      setInput(history[idx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? "" : history[idx] ?? "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.toLowerCase();
      const match = Object.keys(COMMANDS).find(k => k.startsWith(partial) && k !== partial);
      if (match) setInput(match);
    }
  }

  const QUICK = ["show ip interface brief","show ip route","show running-config","show vlan brief","ping 8.8.8.8","show arp"];

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0a0e14] overflow-hidden font-mono">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.07] bg-gradient-to-r from-green-500/[0.06] to-cyan-500/[0.04]">
        <div className="w-7 h-7 rounded-lg bg-green-500/15 border border-green-500/25 flex items-center justify-center flex-shrink-0">
          <Terminal size={13} className="text-green-400" />
        </div>
        <div>
          <p className="text-xs font-bold text-white/80">CLI Simulator — Cisco IOS</p>
          <p className="text-[10px] text-white/35">จำลอง router commands · Tab=autocomplete · ↑↓=history</p>
        </div>
        <button onClick={() => { setLines([]); setSimState({ mode: "user", hostname: device, iface: "", history: [] }); }}
          className="ml-auto text-[10px] px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.07] text-white/35 hover:text-red-400 hover:border-red-500/30 transition-all">
          Reset
        </button>
      </div>

      {/* Quick commands */}
      <div className="flex flex-wrap gap-1.5 px-4 py-2 border-b border-white/[0.04] bg-white/[0.01]">
        {QUICK.map(q => (
          <button key={q} onClick={() => { runCommand(q); inputRef.current?.focus(); }}
            className="text-[9px] px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-green-400/60 hover:text-green-400 hover:border-green-500/25 transition-all font-mono">
            {q}
          </button>
        ))}
      </div>

      {/* Terminal output */}
      <div className="h-72 overflow-y-auto p-4 space-y-2 text-[11px] leading-relaxed scrollbar-thin scrollbar-thumb-white/10"
           onClick={() => inputRef.current?.focus()}>
        {lines.map((line, i) => (
          <div key={i}>
            {line.cmd && (
              <div className="flex items-center gap-1.5">
                <span className="text-green-400">{line.prompt}</span>
                <span className="text-white/80">{line.cmd}</span>
              </div>
            )}
            {!line.cmd && !line.prompt && line.output && (
              <pre className="text-cyan-300/70 whitespace-pre-wrap">{line.output}</pre>
            )}
            {line.output && (line.cmd || line.prompt) && (
              <pre className="text-white/55 whitespace-pre-wrap pl-1">{line.output}</pre>
            )}
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <span className="text-green-400">{prompt}</span>
          <ChevronRight size={10} className="text-green-400/40" />
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-white/[0.06] flex items-center gap-2 px-4 py-2.5 bg-white/[0.01]">
        <span className="text-green-400 text-xs">{prompt}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="พิมพ์คำสั่ง..."
          autoComplete="off"
          spellCheck={false}
          className="flex-1 bg-transparent text-xs text-white/80 placeholder-white/15 focus:outline-none caret-green-400"
        />
      </div>
    </div>
  );
}
