import VlanPlanner from "@/components/tools/VlanPlanner";

export const metadata = {
  title: "VLAN Planner | NetPath Academy",
};

export default function VlanPlannerPage() {
  return (
    <div className="px-4 md:px-6 py-6 max-w-5xl mx-auto space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white/95 mb-1">VLAN Planner</h1>
        <p className="text-sm text-white/40">วางแผน VLAN, Subnet, Gateway และ Generate Cisco Config</p>
      </div>

      <div className="rounded-2xl border border-[#8b5cf6]/15 bg-[#8b5cf6]/[0.03] p-5">
        <VlanPlanner />
      </div>
    </div>
  );
}
