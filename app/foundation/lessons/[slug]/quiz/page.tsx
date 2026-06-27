import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allFoundationLessons } from "@/data/foundationCourses";
import LessonQuiz from "@/components/lessons/LessonQuiz";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return allFoundationLessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = allFoundationLessons.find((l) => l.slug === params.slug);
  return { title: lesson ? `Quiz: ${lesson.title} | Foundation` : "Not Found" };
}

export default function FoundationQuizPage({ params }: Props) {
  const lesson = allFoundationLessons.find((l) => l.slug === params.slug);
  if (!lesson) notFound();

  return (
    <LessonQuiz
      lessonTitle={lesson.title}
      lessonSlug={lesson.slug}
      backHref={`/foundation/lessons/${lesson.slug}`}
      questions={lesson.quiz}
      xp={lesson.xp}
    />
  );
}
