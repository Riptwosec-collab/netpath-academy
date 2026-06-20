import CommandGenerator from "@/components/tools/CommandGenerator";

export const metadata = {
  title: "Command Generator | NetPath Academy",
};

export default function CommandGeneratorPage() {
  return (
    <div className="px-4 md:px-6 py-6 max-w-3xl mx-auto space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white/95 mb-1">Command Generator</h1>
        <p className="text-sm text-white/40">เลือกหมวดและอาการ รับคำสั่ง Cisco IOS พร้อมใช้งาน</p>
      </div>

      <div className="rounded-2xl border border-[#f97316]/15 bg-[#f97316]/[0.03] p-5">
        <CommandGenerator />
      </div>
    </div>
  );
}
