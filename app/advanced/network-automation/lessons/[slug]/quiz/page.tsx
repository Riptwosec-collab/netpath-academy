import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { automationLessons } from "@/data/automationCourses";
import LessonQuiz from "@/components/lessons/LessonQuiz";

interface Props { params: { slug: string } }

interface AutoQuizItem {
  question: string;
  options?: string[];
  choices?: string[];
  correct?: number;
  answer?: string;
  explanation: string;
}

function normalise(raw: AutoQuizItem[]) {
  return raw.map((q) => {
    const choices = q.choices ?? q.options ?? [];
    const answer = q.answer ?? (typeof q.correct === "number" ? choices[q.correct] : "");
    return { question: q.question, choices, answer, explanation: q.explanation };
  });
}

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

  const questions = normalise((lesson.quiz ?? []) as AutoQuizItem[]);

  return (
    <LessonQuiz
      lessonTitle={lesson.title}
      lessonSlug={lesson.slug}
      backHref={`/advanced/network-automation/lessons/${lesson.slug}`}
      questions={questions}
      xp={lesson.xp}
    />
  );
}
