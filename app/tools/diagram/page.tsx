import NetworkDiagramViewer from "@/components/tools/NetworkDiagramViewer";
import PacketFlowViewer    from "@/components/tools/PacketFlowViewer";

export const metadata = {
  title: "Network Diagram Viewer | NetPath Academy",
};

export default function DiagramPage() {
  return (
    <div className="px-4 md:px-6 py-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-lg font-bold text-white/95 mb-1">Network Diagram Viewer</h1>
        <p className="text-sm text-white/40">ดูตัวอย่าง Network Topology และ Packet Flow</p>
      </div>

      <div>
        <h2 className="text-xs font-semibold text-white/50 mb-3">Network Topologies</h2>
        <NetworkDiagramViewer />
      </div>

      <div>
        <h2 className="text-xs font-semibold text-white/50 mb-3">Packet Flow Viewer</h2>
        <PacketFlowViewer />
      </div>
    </div>
  );
}
