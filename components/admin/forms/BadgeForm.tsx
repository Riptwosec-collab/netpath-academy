import Link from "next/link";
import { createBadgeAction, updateBadgeAction } from "@/lib/adminActions";

type BadgeData = { id: string; title: string; description: string; icon: string; xpReward: number };

export default function BadgeForm({ badge }: { badge?: BadgeData }) {
  const action = badge ? updateBadgeAction : createBadgeAction;
  const isEdit = Boolean(badge);

  return (
    <form action={action} className="space-y-4 max-w-lg">
      {isEdit && <input type="hidden" name="id" value={badge!.id} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {!isEdit && (
          <div className="sm:col-span-2">
            <label className="text-[10px] text-white/35 mb-1 block">Badge ID *</label>
            <input name="id" required placeholder="first-lab"
              className="w-full rounded-xl bg-white/[0.04] border border-white/[0.09] px-3 py-2.5
                         text-sm text-white/75 font-mono placeholder:text-white/18
                         focus:outline-none focus:border-cyan-500/40 transition-all" />
          </div>
        )}

        <div>
          <label className="text-[10px] text-white/35 mb-1 block">Title *</label>
          <input name="title" required defaultValue={badge?.title} placeholder="First Lab"
            className="w-full rounded-xl bg-white/[0.04] border border-white/[0.09] px-3 py-2.5
                       text-sm text-white/75 placeholder:text-white/18
                       focus:outline-none focus:border-cyan-500/40 transition-all" />
        </div>

        <div>
          <label className="text-[10px] text-white/35 mb-1 block">Icon (emoji)</label>
          <input name="icon" defaultValue={badge?.icon ?? "🏆"} placeholder="🏆"
            className="w-full rounded-xl bg-white/[0.04] border border-white/[0.09] px-3 py-2.5
                       text-sm text-white/75 placeholder:text-white/18
                       focus:outline-none focus:border-cyan-500/40 transition-all" />
        </div>

        <div>
          <label className="text-[10px] text-white/35 mb-1 block">XP Reward</label>
          <input name="xpReward" type="number" min={0} defaultValue={badge?.xpReward ?? 100}
            className="w-full rounded-xl bg-white/[0.04] border border-white/[0.09] px-3 py-2.5
                       text-sm text-white/75 focus:outline-none focus:border-cyan-500/40 transition-all" />
        </div>
      </div>

      <div>
        <label className="text-[10px] text-white/35 mb-1 block">Description</label>
        <textarea name="description" rows={2} defaultValue={badge?.description}
          className="w-full rounded-xl bg-white/[0.04] border border-white/[0.09] px-3 py-2.5
                     text-sm text-white/75 resize-none
                     focus:outline-none focus:border-cyan-500/40 transition-all" />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit"
          className="px-5 py-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-sm font-semibold text-cyan-400 hover:bg-cyan-500/25 transition-all">
          {isEdit ? "Update Badge" : "Create Badge"}
        </button>
        <Link href="/admin/badges"
          className="px-5 py-2.5 rounded-xl border border-white/[0.08] text-sm text-white/35 hover:border-white/20 hover:text-white/60 transition-all">
          Cancel
        </Link>
      </div>
    </form>
  );
}
