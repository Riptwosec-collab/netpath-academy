"use client";
import { useState } from "react";
import DeviceNode from "./DeviceNode";
import ConnectionLine from "./ConnectionLine";

type Topology = { id: string; label: string; color: string };

const TOPOLOGIES: Topology[] = [
  { id: "star",    label: "Star",     color: "#38bdf8" },
  { id: "roaS",   label: "Router-on-a-Stick", color: "#8b5cf6" },
  { id: "ospf",   label: "OSPF Area 0", color: "#22c55e" },
  { id: "dmz",    label: "DMZ / 3-Zone", color: "#f97316" },
];

export default function NetworkDiagramViewer() {
  const [topo, setTopo] = useState<string>("star");

  return (
    <div className="space-y-4">
      {/* Selector */}
      <div className="flex flex-wrap gap-2">
        {TOPOLOGIES.map((t) => (
          <button key={t.id} onClick={() => setTopo(t.id)}
            className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
              topo === t.id ? "" : "bg-white/[0.03] border-white/[0.08] text-white/35 hover:border-white/20"
            }`}
            style={topo === t.id ? { borderColor: t.color, backgroundColor: `${t.color}15`, color: t.color } : {}}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-[#08111f] overflow-hidden">
        <div className="p-2">
          <svg viewBox="0 0 700 380" className="w-full h-auto">
            {topo === "star" && <StarTopology />}
            {topo === "roaS" && <RoaSTopology />}
            {topo === "ospf" && <OspfTopology />}
            {topo === "dmz"  && <DmzTopology />}
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Star Topology ─────────────────────────────────────────────────────────────
function StarTopology() {
  const cx = 350; const cy = 190;
  const pcs = [
    { x: 350, y: 60, label: "PC-1", ip: "192.168.1.10" },
    { x: 530, y: 140, label: "PC-2", ip: "192.168.1.11" },
    { x: 530, y: 250, label: "PC-3", ip: "192.168.1.12" },
    { x: 350, y: 320, label: "PC-4", ip: "192.168.1.13" },
    { x: 170, y: 250, label: "PC-5", ip: "192.168.1.14" },
    { x: 170, y: 140, label: "PC-6", ip: "192.168.1.15" },
  ];
  return (
    <g>
      {pcs.map((pc) => (
        <ConnectionLine key={pc.label} x1={cx} y1={cy} x2={pc.x} y2={pc.y} />
      ))}
      <DeviceNode x={cx} y={cy} type="switch" label="SW1" color="#38bdf8" ip="192.168.1.1" />
      {pcs.map((pc) => (
        <DeviceNode key={pc.label} x={pc.x} y={pc.y} type="pc" label={pc.label} color="#8b5cf6" ip={pc.ip} />
      ))}
      <text x={350} y={370} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize={10} fontFamily="system-ui">
        Star Topology — Single Switch
      </text>
    </g>
  );
}

// ─── Router-on-a-Stick ─────────────────────────────────────────────────────────
function RoaSTopology() {
  return (
    <g>
      {/* Connections */}
      <ConnectionLine x1={350} y1={80} x2={350} y2={180} label="Trunk" color="rgba(139,92,246,0.5)" />
      <ConnectionLine x1={350} y1={220} x2={200} y2={310} color="rgba(56,189,248,0.3)" />
      <ConnectionLine x1={350} y1={220} x2={350} y2={310} color="rgba(34,197,94,0.3)" />
      <ConnectionLine x1={350} y1={220} x2={500} y2={310} color="rgba(249,115,22,0.3)" />
      {/* Devices */}
      <DeviceNode x={350} y={80} type="router" label="R1" color="#8b5cf6" ip=".10/30 .20/30 .30/30" />
      <DeviceNode x={350} y={200} type="switch" label="SW1" color="#38bdf8" />
      <DeviceNode x={200} y={310} type="pc" label="VLAN 10" color="#38bdf8" ip="192.168.10.x/24" />
      <DeviceNode x={350} y={310} type="pc" label="VLAN 20" color="#22c55e" ip="192.168.20.x/24" />
      <DeviceNode x={500} y={310} type="pc" label="VLAN 30" color="#f97316" ip="192.168.30.x/24" />
      <text x={350} y={370} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize={10} fontFamily="system-ui">
        Router-on-a-Stick — Inter-VLAN Routing
      </text>
    </g>
  );
}

// ─── OSPF 4-Router ─────────────────────────────────────────────────────────────
function OspfTopology() {
  return (
    <g>
      <ConnectionLine x1={280} y1={130} x2={420} y2={130} label="10.0.0.0/30" color="rgba(34,197,94,0.4)" />
      <ConnectionLine x1={280} y1={130} x2={200} y2={250} label="10.0.1.0/30" color="rgba(34,197,94,0.4)" />
      <ConnectionLine x1={420} y1={130} x2={500} y2={250} label="10.0.2.0/30" color="rgba(34,197,94,0.4)" />
      <ConnectionLine x1={200} y1={250} x2={500} y2={250} label="10.0.3.0/30" color="rgba(34,197,94,0.4)" dashed />
      <DeviceNode x={280} y={130} type="router" label="R1" color="#22c55e" ip="1.1.1.1" />
      <DeviceNode x={420} y={130} type="router" label="R2" color="#22c55e" ip="2.2.2.2" />
      <DeviceNode x={200} y={250} type="router" label="R3" color="#22c55e" ip="3.3.3.3" />
      <DeviceNode x={500} y={250} type="router" label="R4" color="#22c55e" ip="4.4.4.4" />
      {/* Networks */}
      <DeviceNode x={280} y={50} type="pc" label="LAN 1" color="#38bdf8" ip="192.168.1.0/24" />
      <DeviceNode x={420} y={50} type="pc" label="LAN 2" color="#38bdf8" ip="192.168.2.0/24" />
      <ConnectionLine x1={280} y1={100} x2={280} y2={70} />
      <ConnectionLine x1={420} y1={100} x2={420} y2={70} />
      <text x={350} y={310} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize={10} fontFamily="system-ui">
        OSPF Area 0 — 4 Router Full Mesh
      </text>
    </g>
  );
}

// ─── DMZ 3-Zone ────────────────────────────────────────────────────────────────
function DmzTopology() {
  return (
    <g>
      {/* Zone backgrounds */}
      <rect x={40} y={60} width={160} height={260} rx={8} fill="rgba(239,68,68,0.04)" stroke="rgba(239,68,68,0.1)" strokeWidth={1} strokeDasharray="4 3" />
      <rect x={270} y={60} width={160} height={260} rx={8} fill="rgba(250,204,21,0.04)" stroke="rgba(250,204,21,0.1)" strokeWidth={1} strokeDasharray="4 3" />
      <rect x={500} y={60} width={160} height={260} rx={8} fill="rgba(34,197,94,0.04)" stroke="rgba(34,197,94,0.1)" strokeWidth={1} strokeDasharray="4 3" />

      <text x={120} y={78} textAnchor="middle" fill="rgba(239,68,68,0.4)" fontSize={9} fontFamily="system-ui">OUTSIDE</text>
      <text x={350} y={78} textAnchor="middle" fill="rgba(250,204,21,0.4)" fontSize={9} fontFamily="system-ui">DMZ</text>
      <text x={580} y={78} textAnchor="middle" fill="rgba(34,197,94,0.4)" fontSize={9} fontFamily="system-ui">INSIDE</text>

      <ConnectionLine x1={215} y1={190} x2={275} y2={190} label="outside" color="rgba(239,68,68,0.4)" />
      <ConnectionLine x1={425} y1={190} x2={505} y2={190} label="inside" color="rgba(34,197,94,0.4)" />
      <ConnectionLine x1={350} y1={120} x2={350} y2={160} color="rgba(250,204,21,0.4)" />
      <ConnectionLine x1={350} y1={220} x2={350} y2={265} color="rgba(250,204,21,0.4)" />

      <DeviceNode x={120} y={190} type="cloud" label="Internet" color="#ef4444" />
      <DeviceNode x={350} y={190} type="firewall" label="ASA" color="#facc15" ip="NAT/ACL" />
      <DeviceNode x={350} y={100} type="server" label="Web Server" color="#facc15" ip="10.0.2.10" />
      <DeviceNode x={350} y={285} type="server" label="Mail Server" color="#facc15" ip="10.0.2.20" />
      <DeviceNode x={580} y={150} type="pc" label="PC Users" color="#22c55e" ip="10.0.1.0/24" />
      <DeviceNode x={580} y={240} type="server" label="DB Server" color="#22c55e" ip="10.0.1.100" />
    </g>
  );
}
