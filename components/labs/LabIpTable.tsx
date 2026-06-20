import type { Lab } from "@/data/labs";

export default function LabIpTable({ lab }: { lab: Lab }) {
  const hasVlan = lab.ipTable.some((r) => r.vlan);

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 md:p-6">
      <h2 className="text-sm font-semibold text-white/70 mb-4 flex items-center gap-2">
        <svg className="w-4 h-4 text-[#38bdf8]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18M10 3v18M14 3v18M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
        </svg>
        IP Address Table
      </h2>

      <div className="overflow-x-auto scrollbar-none -mx-1">
        <table className="w-full text-xs font-mono border-separate border-spacing-0 min-w-[460px]">
          <thead>
            <tr>
              {["Device", "Interface", "IP Address", "Subnet Mask", "Gateway", ...(hasVlan ? ["VLAN"] : [])].map((h) => (
                <th
                  key={h}
                  className="px-3 py-2 text-left text-[10px] uppercase tracking-wider text-white/25 font-semibold
                             border-b border-white/[0.06]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lab.ipTable.map((row, i) => (
              <tr key={i} className="group">
                <td className="px-3 py-2.5 text-[#38bdf8]/80 font-semibold border-b border-white/[0.04] group-last:border-0">
                  {row.device}
                </td>
                <td className="px-3 py-2.5 text-[#8b5cf6]/70 border-b border-white/[0.04] group-last:border-0">
                  {row.interface}
                </td>
                <td className="px-3 py-2.5 text-white/60 border-b border-white/[0.04] group-last:border-0">
                  {row.ip}
                </td>
                <td className="px-3 py-2.5 text-white/40 border-b border-white/[0.04] group-last:border-0">
                  {row.subnet}
                </td>
                <td className="px-3 py-2.5 text-white/40 border-b border-white/[0.04] group-last:border-0">
                  {row.gateway}
                </td>
                {hasVlan && (
                  <td className="px-3 py-2.5 border-b border-white/[0.04] group-last:border-0">
                    {row.vlan ? (
                      <span className="px-1.5 py-0.5 rounded bg-[#8b5cf6]/10 text-[#8b5cf6]/80 border border-[#8b5cf6]/20 text-[10px]">
                        {row.vlan}
                      </span>
                    ) : (
                      <span className="text-white/15">—</span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
