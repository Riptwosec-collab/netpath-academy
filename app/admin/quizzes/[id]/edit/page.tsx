export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import prisma       from "@/lib/prisma";
import AdminHeader  from "@/components/admin/AdminHeader";
import QuizForm     from "@/components/admin/forms/QuizForm";

type Props = { params: { id: string } };

export default async function EditQuizPage({ params }: Props) {
  const quiz = await prisma.quiz.findUnique({ where: { id: params.id } });
  if (!quiz) notFound();

  return (
    <div>
      <AdminHeader title="Edit Quiz" subtitle={quiz.title} />
      <QuizForm quiz={quiz} />
    </div>
  );
}
