import { labProgressData } from "@/data/progress";
import Link from "next/link";

const statusStyle = {
  completed:   { label: "✓ Done",     cls: "bg-[#22c55e]/15 text-[#22c55e]" },
  "in-progress":{ label: "In Progress",cls: "bg-[#38bdf8]/15 text-[#38bdf8]" },
  "not-started":{ label: "ยังไม่เริ่ม", cls: "bg-white/[0.07] text-white/30" },
};

export default function LabProgressList() {
  const shown = labProgressData.slice(0, 10);
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
      <div className="px-5 py-3.5 border-b border-white/[0.06] flex items-center justify-between">
        <h2 className="text-xs font-semibold text-white/50">Lab Progress</h2>
        <span className="text-[10px] text-white/25">
          {labProgressData.filter((l) => l.status === "completed").length}/{labProgressData.length} Done
        </span>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {shown.map((lab) => {
          const s = statusStyle[lab.status];
          return (
            <div key={lab.id} className="px-5 py-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white/65 truncate">{lab.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[9px] text-white/25">{lab.category}</span>
                  {lab.completedAt && <span className="text-[9px] text-white/20">{lab.completedAt}</span>}
                </div>
              </div>
              <span className={`flex-shrink-0 text-[9px] px-2 py-0.5 rounded-full font-medium ${s.cls}`}>
                {s.label}
              </span>
              <span className="flex-shrink-0 text-[10px] text-[#38bdf8]/50">+{lab.xp} XP</span>
            </div>
          );
        })}
      </div>
      {labProgressData.length > 10 && (
        <div className="px-5 py-3 border-t border-white/[0.05]">
          <Link href="/labs" className="text-[10px] text-[#38bdf8]/50 hover:text-[#38bdf8] transition-colors">
            ดู Lab ทั้งหมด {labProgressData.length} รายการ →
          </Link>
        </div>
      )}
    </div>
  );
}
