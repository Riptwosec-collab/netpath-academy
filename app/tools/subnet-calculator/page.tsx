import SubnetCalculator from "@/components/tools/SubnetCalculator";

export const metadata = {
  title: "Subnet Calculator | NetPath Academy",
};

export default function SubnetCalculatorPage() {
  return (
    <div className="px-4 md:px-6 py-6 max-w-3xl mx-auto space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white/95 mb-1">Subnet Calculator</h1>
        <p className="text-sm text-white/40">คำนวณ Network Address, Broadcast, Usable Host และ Mask</p>
      </div>

      <div className="rounded-2xl border border-[#22c55e]/15 bg-[#22c55e]/[0.03] p-5">
        <SubnetCalculator />
      </div>

      {/* Quick Reference */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
        <h2 className="text-xs font-semibold text-white/50 mb-3">Quick Reference — Common CIDR</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["CIDR","Subnet Mask","Usable Hosts","Class"].map((h) => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] text-white/25 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {[
                ["/8",  "255.0.0.0",       "16,777,214","A"],
                ["/16", "255.255.0.0",     "65,534",    "B"],
                ["/24", "255.255.255.0",   "254",       "C"],
                ["/25", "255.255.255.128", "126",       "C sub"],
                ["/26", "255.255.255.192", "62",        "C sub"],
                ["/27", "255.255.255.224", "30",        "C sub"],
                ["/28", "255.255.255.240", "14",        "C sub"],
                ["/30", "255.255.255.252", "2",         "P2P"],
                ["/32", "255.255.255.255", "1",         "Host"],
              ].map(([cidr, mask, hosts, cls]) => (
                <tr key={cidr} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-3 py-2 text-[#22c55e]/80 font-mono font-semibold">{cidr}</td>
                  <td className="px-3 py-2 text-white/55 font-mono">{mask}</td>
                  <td className="px-3 py-2 text-white/50">{hosts}</td>
                  <td className="px-3 py-2 text-white/30">{cls}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
