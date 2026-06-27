import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { automationLessons } from "@/data/automationCourses";
import LessonQuiz from "@/components/lessons/LessonQuiz";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return automationLessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = automationLessons.find((l) => l.slug === params.slug);
  return { title: lesson ? `Quiz: ${lesson.title} | Network Automation` : "Not Found" };
}

export default function AutomationQuizPage({ params }: Props) {
  const lesson = automationLessons.find((l) => l.slug === params.slug);
  if (!lesson) notFound();

  return (
    <LessonQuiz
      lessonTitle={lesson.title}
      lessonSlug={lesson.slug}
      backHref={`/advanced/network-automation/lessons/${lesson.slug}`}
      questions={lesson.quiz ?? []}
      xp={lesson.xp}
    />
  );
}
