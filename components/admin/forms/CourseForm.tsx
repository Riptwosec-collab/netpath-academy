import Link from "next/link";
import { createCourseAction, updateCourseAction } from "@/lib/adminActions";

type CourseData = { id: string; title: string; description: string; level: string; category: string; duration: string };

const LEVELS = ["Beginner","Intermediate","Advanced","Expert"];

export default function CourseForm({ course }: { course?: CourseData }) {
  const action = course ? updateCourseAction : createCourseAction;
  const isEdit = Boolean(course);

  return (
    <form action={action} className="space-y-4 max-w-2xl">
      {isEdit && <input type="hidden" name="id" value={course!.id} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {!isEdit && (
          <div>
            <label className="text-[10px] text-white/35 mb-1 block">Course ID *</label>
            <input name="id" required placeholder="network-fundamentals"
              className="w-full rounded-xl bg-white/[0.04] border border-white/[0.09] px-3 py-2.5
                         text-sm text-white/75 font-mono placeholder:text-white/18
                         focus:outline-none focus:border-cyan-500/40 transition-all" />
            <p className="text-[9px] text-white/20 mt-1">ใช้ lowercase-hyphen เท่านั้น</p>
          </div>
        )}

        <div>
          <label className="text-[10px] text-white/35 mb-1 block">Title *</label>
          <input name="title" required defaultValue={course?.title} placeholder="Network Fundamentals"
            className="w-full rounded-xl bg-white/[0.04] border border-white/[0.09] px-3 py-2.5
                       text-sm text-white/75 placeholder:text-white/18
                       focus:outline-none focus:border-cyan-500/40 transition-all" />
        </div>

        <div>
          <label className="text-[10px] text-white/35 mb-1 block">Category</label>
          <input name="category" defaultValue={course?.category} placeholder="Routing, Switching, Security..."
            className="w-full rounded-xl bg-white/[0.04] border border-white/[0.09] px-3 py-2.5
                       text-sm text-white/75 placeholder:text-white/18
                       focus:outline-none focus:border-cyan-500/40 transition-all" />
        </div>

        <div>
          <label className="text-[10px] text-white/35 mb-1 block">Level</label>
          <select name="level" defaultValue={course?.level ?? "Beginner"}
            className="w-full rounded-xl bg-white/[0.04] border border-white/[0.09] px-3 py-2.5
                       text-sm text-white/75 focus:outline-none focus:border-cyan-500/40 transition-all">
            {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        <div>
          <label className="text-[10px] text-white/35 mb-1 block">Duration</label>
          <input name="duration" defaultValue={course?.duration} placeholder="12 hrs"
            className="w-full rounded-xl bg-white/[0.04] border border-white/[0.09] px-3 py-2.5
                       text-sm text-white/75 placeholder:text-white/18
                       focus:outline-none focus:border-cyan-500/40 transition-all" />
        </div>
      </div>

      <div>
        <label className="text-[10px] text-white/35 mb-1 block">Description</label>
        <textarea name="description" rows={3} defaultValue={course?.description} placeholder="อธิบาย course..."
          className="w-full rounded-xl bg-white/[0.04] border border-white/[0.09] px-3 py-2.5
                     text-sm text-white/75 placeholder:text-white/18 resize-none
                     focus:outline-none focus:border-cyan-500/40 transition-all" />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit"
          className="px-5 py-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-sm font-semibold text-cyan-400 hover:bg-cyan-500/25 transition-all">
          {isEdit ? "Update Course" : "Create Course"}
        </button>
        <Link href="/admin/courses"
          className="px-5 py-2.5 rounded-xl border border-white/[0.08] text-sm text-white/35 hover:border-white/20 hover:text-white/60 transition-all">
          Cancel
        </Link>
      </div>
    </form>
  );
}
