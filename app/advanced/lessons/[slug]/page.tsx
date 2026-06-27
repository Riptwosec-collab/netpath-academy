import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allAdvancedLessons } from "@/data/advancedCourses";
import LessonPageClient from "@/components/lessons/LessonPageClient";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return allAdvancedLessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = allAdvancedLessons.find((l) => l.slug === params.slug);
  return { title: lesson ? `${lesson.title} | Advanced` : "Not Found" };
}

export default function AdvancedLessonPage({ params }: Props) {
  const idx    = allAdvancedLessons.findIndex((l) => l.slug === params.slug);
  const lesson = allAdvancedLessons[idx];
  if (!lesson) notFound();
  const prev = allAdvancedLessons[idx - 1] ?? null;
  const next = allAdvancedLessons[idx + 1] ?? null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <LessonPageClient lesson={lesson as any} prev={prev} next={next} track="advanced" />;
}
