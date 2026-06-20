"use client";
import { useState } from "react";
import type { PortfolioType } from "@/data/portfolio";
import { typeLabel } from "@/data/portfolio";

type NewItem = {
  title: string; type: PortfolioType; category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string; skills: string; tools: string; summary: string;
};

const TYPES: PortfolioType[] = ["lab-summary","network-diagram","config","rca-report","automation-script","monitoring","design"];
const LEVELS = ["Beginner","Intermediate","Advanced"] as const;

const EMPTY: NewItem = { title:"", type:"lab-summary", category:"", level:"Beginner", description:"", skills:"", tools:"", summary:"" };

export default function AddPortfolioForm({ onAdd }: { onAdd: (item: NewItem) => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<NewItem>(EMPTY);

  const set = (k: keyof NewItem, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    onAdd(form);
    setForm(EMPTY);
    setOpen(false);
  };

  return (
    <div className="rounded-2xl border border-[#22c55e]/20 bg-[#22c55e]/[0.03] overflow-hidden">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-[#22c55e]/80">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Portfolio Item
        </span>
        <svg className={`w-4 h-4 text-white/30 transition-transform ${open ? "rotate-180" : ""}`}
             fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { key: "title" as const,       label: "Project Title *",  ph: "เช่น OSPF Multi-Area Lab" },
            { key: "category" as const,    label: "Category",         ph: "เช่น Routing, Security" },
            { key: "description" as const, label: "Description",      ph: "อธิบายสั้น ๆ" },
            { key: "skills" as const,      label: "Skills (comma)",   ph: "OSPF, VLAN, Python" },
            { key: "tools" as const,       label: "Tools (comma)",    ph: "GNS3, Wireshark" },
          ].map(({ key, label, ph }) => (
            <div key={key}>
              <label className="text-[10px] text-white/30 mb-1 block">{label}</label>
              <input value={form[key] as string} onChange={(e) => set(key, e.target.value)}
                placeholder={ph}
                className="w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-2
                           text-xs text-white/70 placeholder:text-white/20
                           focus:outline-none focus:border-[#22c55e]/40 transition-all" />
            </div>
          ))}

          <div>
            <label className="text-[10px] text-white/30 mb-1 block">Type</label>
            <select value={form.type} onChange={(e) => set("type", e.target.value)}
              className="w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-2
                         text-xs text-white/70 focus:outline-none focus:border-[#22c55e]/40 transition-all">
              {TYPES.map((t) => <option key={t} value={t}>{typeLabel[t]}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[10px] text-white/30 mb-1 block">Level</label>
            <div className="flex gap-2">
              {LEVELS.map((l) => (
                <button key={l} onClick={() => set("level", l)}
                  className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-all ${
                    form.level === l
                      ? "bg-[#22c55e]/15 border-[#22c55e]/40 text-[#22c55e]"
                      : "bg-white/[0.03] border-white/[0.07] text-white/30 hover:border-white/20"
                  }`}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="text-[10px] text-white/30 mb-1 block">Summary</label>
            <textarea value={form.summary} onChange={(e) => set("summary", e.target.value)}
              placeholder="สรุปสิ่งที่ทำ..."
              rows={3}
              className="w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-2
                         text-xs text-white/70 placeholder:text-white/20
                         focus:outline-none focus:border-[#22c55e]/40 resize-none transition-all" />
          </div>

          <div className="sm:col-span-2 flex gap-2">
            <button onClick={handleSubmit} disabled={!form.title.trim()}
              className="flex-1 py-2.5 rounded-xl bg-[#22c55e]/15 border border-[#22c55e]/40 text-[#22c55e]
                         text-xs font-semibold hover:bg-[#22c55e]/25 transition-all
                         disabled:opacity-30 disabled:cursor-not-allowed">
              Add to Portfolio
            </button>
            <button onClick={() => setOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-white/[0.07] text-white/30 text-xs hover:border-white/20 transition-all">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
