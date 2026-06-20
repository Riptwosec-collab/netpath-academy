import { notFound }         from "next/navigation";
import { getExamById, exams } from "@/data/exams";
import ExamClient             from "@/components/exam/ExamClient";

export function generateStaticParams() {
  return exams.map(e => ({ id: e.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const exam = getExamById(params.id);
  return {
    title:       exam ? `${exam.title} | Exam Center` : "Exam Not Found",
    description: exam?.description,
  };
}

export default function ExamPage({ params }: { params: { id: string } }) {
  const exam = getExamById(params.id);
  if (!exam) notFound();

  return <ExamClient exam={exam} />;
}
