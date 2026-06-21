import type { Lab } from "@/data/labs";

/* Icon paths by device keyword */
const deviceIcon = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes("router") || n.includes("r1") || n.includes("r2") || n.includes("r3") || n.includes("isp"))
    return "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"; // layers → router
  if (n.includes("switch") || n.includes("sw"))
    return "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"; // terminal → switch
  if (n.includes("server") || n.includes("srv"))
    return "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"; // server
  // PC / default
  return "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"; // monitor
};

const deviceColor = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes("router") || n.includes("r1") || n.includes("r2") || n.includes("r3") || n.includes("isp"))
    return "#38bdf8";
  if (n.includes("switch") || n.includes("sw"))
    return "#8b5cf6";
  if (n.includes("server") || n.includes("srv"))
    return "#f97316";
  return "#22c55e";
};

export default function LabTopology({ lab }: { lab: Lab }) {
  /* Collect unique nodes */
  const nodeSet = new Set<string>();
  (Array.isArray(lab.topology) ? lab.topology : (lab.topology.links ?? [])).forEach((l) => { nodeSet.add(l.from); nodeSet.add(l.to); });
  const nodes = Array.from(nodeSet);

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 md:p-6">
      <h2 className="text-sm font-semibold text-white/70 mb-4 flex items-center gap-2">
        <svg className="w-4 h-4 text-[#8b5cf6]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        Network Topology
      </h2>

      {/* Topology diagram */}
      <div className="overflow-x-auto scrollbar-none pb-2">
        <div className="flex flex-wrap gap-3 justify-center min-w-[260px]">
          {nodes.map((node) => {
            const color = deviceColor(node);
            return (
              <div key={node} className="flex flex-col items-center gap-1.5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border"
                  style={{
                    background: `${color}14`,
                    borderColor: `${color}30`,
                    boxShadow: `0 0 12px ${color}18`,
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke={color}
                    strokeWidth={1.6}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={deviceIcon(node)} />
                  </svg>
                </div>
                <span className="text-[10px] font-mono text-white/50">{node}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Connection list */}
      <div className="mt-4 space-y-1.5">
        <p className="text-[10px] uppercase tracking-wider text-white/25 font-medium mb-2">
          การเชื่อมต่อ
        </p>
        {(Array.isArray(lab.topology) ? lab.topology : (lab.topology.links ?? [])).map((link, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-xs text-white/45 font-mono py-1.5 px-3
                       rounded-lg bg-white/[0.02] border border-white/[0.04]"
          >
            <span className="text-[#38bdf8]/70">{link.from}</span>
            <svg className="w-3.5 h-3.5 text-white/20 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span className="text-[#8b5cf6]/70">{link.to}</span>
            {link.port && (
              <span className="ml-auto text-[10px] text-white/20 hidden sm:block">{link.port}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
