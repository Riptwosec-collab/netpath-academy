import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allHardwareLessons } from "@/data/hardwareCourses";
import LessonQuiz from "@/components/lessons/LessonQuiz";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return allHardwareLessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = allHardwareLessons.find((l) => l.slug === params.slug);
  return { title: lesson ? `Quiz: ${lesson.title} | Hardware` : "Not Found" };
}

export default function HardwareQuizPage({ params }: Props) {
  const lesson = allHardwareLessons.find((l) => l.slug === params.slug);
  if (!lesson) notFound();

  return (
    <LessonQuiz
      lessonTitle={lesson.title}
      lessonSlug={lesson.slug}
      backHref={`/hardware/lessons/${lesson.slug}`}
      questions={lesson.quiz ?? []}
      xp={lesson.xp}
    />
  );
}
