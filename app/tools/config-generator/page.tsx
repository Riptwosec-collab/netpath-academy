import ConfigGenerator from "@/components/tools/ConfigGenerator";

export const metadata = {
  title: "Config Generator | NetPath Academy",
};

export default function ConfigGeneratorPage() {
  return (
    <div className="px-4 md:px-6 py-6 max-w-5xl mx-auto space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white/95 mb-1">Config Template Generator</h1>
        <p className="text-sm text-white/40">เลือก Template กรอก Parameter รับ Cisco Config พร้อม Copy</p>
      </div>

      <div className="rounded-2xl border border-[#facc15]/15 bg-[#facc15]/[0.03] p-5">
        <ConfigGenerator />
      </div>
    </div>
  );
}
