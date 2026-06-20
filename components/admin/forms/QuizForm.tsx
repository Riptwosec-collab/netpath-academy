import Link from "next/link";
import { createQuizAction, updateQuizAction } from "@/lib/adminActions";

type QuizData = { id: string; title: string; description: string; category: string; level: string; duration: string; passingScore: number; questionsJson?: string | null };

const LEVELS = ["Beginner","Intermediate","Advanced"];
const CATEGORIES = ["Fundamentals","IP Addressing","Routing","Switching","Security","Services","Automation"];

export default function QuizForm({ quiz }: { quiz?: QuizData }) {
  const action = quiz ? updateQuizAction : createQuizAction;
  const isEdit = Boolean(quiz);

  return (
    <form action={action} className="space-y-4 max-w-2xl">
      {isEdit && <input type="hidden" name="id" value={quiz!.id} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] text-white/35 mb-1 block">Title *</label>
          <input name="title" required defaultValue={quiz?.title} placeholder="OSI Model & TCP/IP"
            className="w-full rounded-xl bg-white/[0.04] border border-white/[0.09] px-3 py-2.5
                       text-sm text-white/75 placeholder:text-white/18
                       focus:outline-none focus:border-cyan-500/40 transition-all" />
        </div>
        <div>
          <label className="text-[10px] text-white/35 mb-1 block">Duration</label>
          <input name="duration" defaultValue={quiz?.duration ?? "15 min"} placeholder="15 min"
            className="w-full rounded-xl bg-white/[0.04] border border-white/[0.09] px-3 py-2.5
                       text-sm text-white/75 placeholder:text-white/18
                       focus:outline-none focus:border-cyan-500/40 transition-all" />
        </div>
        <div>
          <label className="text-[10px] text-white/35 mb-1 block">Category</label>
          <select name="category" defaultValue={quiz?.category ?? "Fundamentals"}
            className="w-full rounded-xl bg-white/[0.04] border border-white/[0.09] px-3 py-2.5
                       text-sm text-white/75 focus:outline-none focus:border-cyan-500/40 transition-all">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] text-white/35 mb-1 block">Level</label>
          <select name="level" defaultValue={quiz?.level ?? "Beginner"}
            className="w-full rounded-xl bg-white/[0.04] border border-white/[0.09] px-3 py-2.5
                       text-sm text-white/75 focus:outline-none focus:border-cyan-500/40 transition-all">
            {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] text-white/35 mb-1 block">Passing Score (%)</label>
          <input name="passingScore" type="number" min={0} max={100} defaultValue={quiz?.passingScore ?? 70}
            className="w-full rounded-xl bg-white/[0.04] border border-white/[0.09] px-3 py-2.5
                       text-sm text-white/75 focus:outline-none focus:border-cyan-500/40 transition-all" />
        </div>
      </div>

      <div>
        <label className="text-[10px] text-white/35 mb-1 block">Description</label>
        <textarea name="description" rows={2} defaultValue={quiz?.description}
          className="w-full rounded-xl bg-white/[0.04] border border-white/[0.09] px-3 py-2.5
                     text-sm text-white/75 resize-none
                     focus:outline-none focus:border-cyan-500/40 transition-all" />
      </div>

      <div>
        <label className="text-[10px] text-white/35 mb-1 block">Questions JSON (optional)</label>
        <textarea name="questionsJson" rows={6} defaultValue={quiz?.questionsJson ?? ""}
          placeholder='[{"id":1,"question":"...","options":["A","B","C","D"],"answer":0,"explanation":"..."}]'
          className="w-full rounded-xl bg-white/[0.04] border border-white/[0.09] px-3 py-2.5
                     text-xs text-white/60 font-mono resize-y
                     focus:outline-none focus:border-cyan-500/40 transition-all" />
        <p className="text-[9px] text-white/20 mt-1">ต้องเป็น JSON array ที่ถูกต้อง หรือเว้นว่างได้</p>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit"
          className="px-5 py-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-sm font-semibold text-cyan-400 hover:bg-cyan-500/25 transition-all">
          {isEdit ? "Update Quiz" : "Create Quiz"}
        </button>
        <Link href="/admin/quizzes"
          className="px-5 py-2.5 rounded-xl border border-white/[0.08] text-sm text-white/35 hover:border-white/20 hover:text-white/60 transition-all">
          Cancel
        </Link>
      </div>
    </form>
  );
}
