import { notFound }          from "next/navigation";
import Link                   from "next/link";
import { getQuizById, quizzes } from "@/data/quizzes";
import QuizHeader             from "@/components/quiz/QuizHeader";
import QuizRunner             from "@/components/quiz/QuizRunner";

export function generateStaticParams() {
  return quizzes.map((q) => ({ id: q.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const quiz = getQuizById(params.id);
  return {
    title:       quiz ? `${quiz.title} | NetPath Academy` : "Quiz Not Found",
    description: quiz?.description,
  };
}

export default function QuizDetailPage({ params }: { params: { id: string } }) {
  const quiz = getQuizById(params.id);

  if (!quiz) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 px-4">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center">
          <svg className="w-7 h-7 text-white/15" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-base font-semibold text-white/60 mb-1">ไม่พบ Quiz นี้</p>
          <p className="text-xs text-white/25">Quiz ID: {params.id} ไม่มีในระบบ</p>
        </div>
        <Link href="/quiz"
          className="px-5 py-2.5 rounded-xl bg-[#38bdf8]/15 border border-[#38bdf8]/35 text-[#38bdf8] text-sm font-medium
                     hover:bg-[#38bdf8]/25 transition-all">
          กลับไปรายการ Quiz
        </Link>
      </div>
    );
  }

  if (!quiz.questions || quiz.questions.length === 0) notFound();

  return (
    <div className="px-4 md:px-6 py-6 max-w-3xl mx-auto space-y-5">
      {/* Back link */}
      <Link href="/quiz"
        className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        กลับไปรายการ Quiz
      </Link>

      {/* Header */}
      <QuizHeader quiz={quiz} />

      {/* Quiz runner — all state management here */}
      <QuizRunner quiz={quiz} />
    </div>
  );
}
