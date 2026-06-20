"use client";
import { useState } from "react";

type Field = { key: string; label: string; placeholder: string; hint?: string };
type Template = { id: string; label: string; color: string; fields: Field[]; generate: (vals: Record<string, string>) => string };

const TEMPLATES: Template[] = [
  {
    id: "vlan-access",
    label: "VLAN Access Port",
    color: "#8b5cf6",
    fields: [
      { key: "intf",   label: "Interface",   placeholder: "GigabitEthernet0/1", hint: "เช่น Gi0/1" },
      { key: "vlan",   label: "VLAN ID",     placeholder: "10" },
      { key: "desc",   label: "Description", placeholder: "PC-User" },
    ],
    generate: (v) => `interface ${v.intf || "GigabitEthernet0/1"}
 description ${v.desc || "Access Port"}
 switchport mode access
 switchport access vlan ${v.vlan || "10"}
 spanning-tree portfast
 no shutdown`,
  },
  {
    id: "trunk",
    label: "Trunk Port",
    color: "#38bdf8",
    fields: [
      { key: "intf",  label: "Interface",       placeholder: "GigabitEthernet0/24" },
      { key: "vlans", label: "Allowed VLANs",   placeholder: "10,20,30,99" },
      { key: "native",label: "Native VLAN",     placeholder: "99" },
    ],
    generate: (v) => `interface ${v.intf || "GigabitEthernet0/24"}
 description Trunk-Link
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan ${v.vlans || "10,20,30"}
 switchport trunk native vlan ${v.native || "99"}
 no shutdown`,
  },
  {
    id: "ospf",
    label: "OSPF Config",
    color: "#22c55e",
    fields: [
      { key: "pid",      label: "Process ID",     placeholder: "1" },
      { key: "network",  label: "Network",         placeholder: "192.168.1.0" },
      { key: "wildcard", label: "Wildcard Mask",   placeholder: "0.0.0.255" },
      { key: "area",     label: "Area",            placeholder: "0" },
      { key: "routerid", label: "Router ID",       placeholder: "1.1.1.1" },
    ],
    generate: (v) => `router ospf ${v.pid || "1"}
 router-id ${v.routerid || "1.1.1.1"}
 network ${v.network || "192.168.1.0"} ${v.wildcard || "0.0.0.255"} area ${v.area || "0"}
 passive-interface default
 no passive-interface GigabitEthernet0/0`,
  },
  {
    id: "dhcp",
    label: "DHCP Server",
    color: "#f97316",
    fields: [
      { key: "pool",    label: "Pool Name",     placeholder: "VLAN10-POOL" },
      { key: "network", label: "Network",        placeholder: "192.168.10.0" },
      { key: "mask",    label: "Subnet Mask",   placeholder: "255.255.255.0" },
      { key: "gw",      label: "Default GW",    placeholder: "192.168.10.1" },
      { key: "dns",     label: "DNS Server",    placeholder: "8.8.8.8" },
      { key: "excl",    label: "Excluded IPs",  placeholder: "192.168.10.1 192.168.10.10" },
    ],
    generate: (v) => `ip dhcp excluded-address ${v.excl || "192.168.10.1 192.168.10.10"}
!
ip dhcp pool ${v.pool || "VLAN10-POOL"}
 network ${v.network || "192.168.10.0"} ${v.mask || "255.255.255.0"}
 default-router ${v.gw || "192.168.10.1"}
 dns-server ${v.dns || "8.8.8.8"}
 lease 1`,
  },
  {
    id: "nat",
    label: "PAT / NAT Overload",
    color: "#facc15",
    fields: [
      { key: "inside",  label: "Inside Interface",  placeholder: "GigabitEthernet0/1" },
      { key: "outside", label: "Outside Interface", placeholder: "GigabitEthernet0/0" },
      { key: "acl",     label: "ACL Number",        placeholder: "10" },
      { key: "network", label: "Inside Network",    placeholder: "192.168.0.0" },
      { key: "wildcard",label: "Wildcard Mask",     placeholder: "0.0.255.255" },
    ],
    generate: (v) => `access-list ${v.acl || "10"} permit ${v.network || "192.168.0.0"} ${v.wildcard || "0.0.255.255"}
!
ip nat inside source list ${v.acl || "10"} interface ${v.outside || "GigabitEthernet0/0"} overload
!
interface ${v.inside || "GigabitEthernet0/1"}
 ip nat inside
!
interface ${v.outside || "GigabitEthernet0/0"}
 ip nat outside`,
  },
];

export default function ConfigGenerator() {
  const [tmpl, setTmpl] = useState<Template>(TEMPLATES[0]);
  const [vals, setVals] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const config = tmpl.generate(vals);

  const handleCopy = () => {
    navigator.clipboard.writeText(config).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleTmpl = (t: Template) => { setTmpl(t); setVals({}); };

  return (
    <div className="space-y-4">
      {/* Template Picker */}
      <div className="flex flex-wrap gap-2">
        {TEMPLATES.map((t) => (
          <button key={t.id} onClick={() => handleTmpl(t)}
            className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
              tmpl.id === t.id ? "" : "bg-white/[0.03] border-white/[0.08] text-white/35 hover:border-white/20"
            }`}
            style={tmpl.id === t.id ? { borderColor: t.color, backgroundColor: `${t.color}15`, color: t.color } : {}}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Fields + Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Fields */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 space-y-3">
          <p className="text-[10px] font-semibold text-white/35 uppercase tracking-wider">Parameters</p>
          {tmpl.fields.map((f) => (
            <div key={f.key}>
              <label className="text-[10px] text-white/30 mb-1 block">{f.label}</label>
              <input value={vals[f.key] ?? ""}
                onChange={(e) => setVals((p) => ({ ...p, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-2
                           text-xs text-white/75 font-mono placeholder:text-white/18
                           focus:outline-none focus:border-[#8b5cf6]/40 transition-all" />
              {f.hint && <p className="text-[10px] text-white/20 mt-0.5">{f.hint}</p>}
            </div>
          ))}
        </div>

        {/* Output */}
        <div className="rounded-2xl border border-white/[0.07] bg-[#080d1a] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
            <span className="text-[10px] text-white/25 font-mono uppercase">Generated Config</span>
            <button onClick={handleCopy}
              className="text-[10px] text-white/30 hover:text-white/60 transition-colors">
              {copied ? <span className="text-[#22c55e]">✓ Copied</span> : "Copy"}
            </button>
          </div>
          <pre className="p-4 overflow-x-auto text-xs flex-1">
            <code className="text-[#38bdf8]/75 font-mono leading-relaxed">{config}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
