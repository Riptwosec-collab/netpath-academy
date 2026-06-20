export default function TopologyViewer({ devices }: { devices: string[] }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
      <p className="text-sm text-gray-400 mb-3">Topology</p>
      <div className="flex flex-wrap gap-3 justify-center">
        {devices.map((device) => (
          <div key={device} className="px-4 py-2 border border-[#38bdf8]/40 rounded-lg text-sm text-[#38bdf8] bg-[#38bdf8]/5">
            {device}
          </div>
        ))}
      </div>
    </div>
  );
}
