import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allAdvancedLessons } from "@/data/advancedCourses";
import LessonQuiz from "@/components/lessons/LessonQuiz";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return allAdvancedLessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = allAdvancedLessons.find((l) => l.slug === params.slug);
  return { title: lesson ? `Quiz: ${lesson.title} | Advanced` : "Not Found" };
}

export default function AdvancedQuizPage({ params }: Props) {
  const lesson = allAdvancedLessons.find((l) => l.slug === params.slug);
  if (!lesson) notFound();

  return (
    <LessonQuiz
      lessonTitle={lesson.title}
      lessonSlug={lesson.slug}
      backHref={`/advanced/lessons/${lesson.slug}`}
      questions={lesson.quiz ?? []}
      xp={lesson.xp}
    />
  );
}
