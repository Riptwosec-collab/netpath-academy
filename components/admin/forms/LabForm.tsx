import Link from "next/link";
import { createLabAction, updateLabAction } from "@/lib/adminActions";

type LabData = { id: string; title: string; category: string; level: string; duration: string; description: string; scenario?: string | null; objective?: string | null; solution?: string | null };

const LEVELS = ["Beginner","Intermediate","Advanced","Expert"];
const CATEGORIES = ["Switching","Routing","Security","Services","Automation","Monitoring","Design"];

export default function LabForm({ lab }: { lab?: LabData }) {
  const action = lab ? updateLabAction : createLabAction;
  const isEdit = Boolean(lab);

  return (
    <form action={action} className="space-y-4 max-w-2xl">
      {isEdit && <input type="hidden" name="id" value={lab!.id} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { name: "title",    label: "Title *",    ph: "Inter-VLAN Routing Lab", required: true  },
          { name: "duration", label: "Duration",   ph: "30 min",                 required: false },
        ].map(({ name, label, ph, required }) => (
          <div key={name}>
            <label className="text-[10px] text-white/35 mb-1 block">{label}</label>
            <input name={name} required={required} defaultValue={lab?.[name as keyof LabData] as string ?? ""}
              placeholder={ph}
              className="w-full rounded-xl bg-white/[0.04] border border-white/[0.09] px-3 py-2.5
                         text-sm text-white/75 placeholder:text-white/18
                         focus:outline-none focus:border-cyan-500/40 transition-all" />
          </div>
        ))}

        <div>
          <label className="text-[10px] text-white/35 mb-1 block">Category</label>
          <select name="category" defaultValue={lab?.category ?? "Switching"}
            className="w-full rounded-xl bg-white/[0.04] border border-white/[0.09] px-3 py-2.5
                       text-sm text-white/75 focus:outline-none focus:border-cyan-500/40 transition-all">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="text-[10px] text-white/35 mb-1 block">Level</label>
          <select name="level" defaultValue={lab?.level ?? "Beginner"}
            className="w-full rounded-xl bg-white/[0.04] border border-white/[0.09] px-3 py-2.5
                       text-sm text-white/75 focus:outline-none focus:border-cyan-500/40 transition-all">
            {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>

      {[
        { name: "description", label: "Description *", rows: 2, required: true },
        { name: "scenario",    label: "Scenario",      rows: 3, required: false },
        { name: "objective",   label: "Objective",     rows: 2, required: false },
        { name: "solution",    label: "Solution",      rows: 3, required: false },
      ].map(({ name, label, rows, required }) => (
        <div key={name}>
          <label className="text-[10px] text-white/35 mb-1 block">{label}</label>
          <textarea name={name} rows={rows} required={required}
            defaultValue={lab?.[name as keyof LabData] as string ?? ""}
            className="w-full rounded-xl bg-white/[0.04] border border-white/[0.09] px-3 py-2.5
                       text-sm text-white/75 resize-none
                       focus:outline-none focus:border-cyan-500/40 transition-all" />
        </div>
      ))}

      <div className="flex gap-3 pt-2">
        <button type="submit"
          className="px-5 py-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-sm font-semibold text-cyan-400 hover:bg-cyan-500/25 transition-all">
          {isEdit ? "Update Lab" : "Create Lab"}
        </button>
        <Link href="/admin/labs"
          className="px-5 py-2.5 rounded-xl border border-white/[0.08] text-sm text-white/35 hover:border-white/20 hover:text-white/60 transition-all">
          Cancel
        </Link>
      </div>
    </form>
  );
}
