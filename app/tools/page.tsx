import { tools } from "@/data/tools";
import ToolCard from "@/components/tools/ToolCard";

export const metadata = {
  title: "Network Tools | NetPath Academy",
  description: "Subnet Calculator, VLAN Planner, Config Generator และเครื่องมือ Network อื่น ๆ",
};

export default function ToolsPage() {
  return (
    <div className="px-4 md:px-6 py-6 max-w-7xl mx-auto space-y-6">

      {/* Hero */}
      <div className="relative rounded-2xl border border-[#38bdf8]/15 bg-[#38bdf8]/[0.03] overflow-hidden p-5 md:p-6">
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#38bdf8]/6 blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-xl font-bold text-white/95 mb-1">Network Tools</h1>
          <p className="text-sm text-white/40 max-w-lg">
            เครื่องมือสำหรับ Network Engineer — คำนวณ Subnet, วางแผน VLAN, สร้าง Config และตรวจสอบ Packet Flow
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
