import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allFoundationLessons } from "@/data/foundationCourses";
import LessonPageClient from "@/components/lessons/LessonPageClient";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return allFoundationLessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = allFoundationLessons.find((l) => l.slug === params.slug);
  return { title: lesson ? `${lesson.title} | Foundation` : "Not Found" };
}

export default function FoundationLessonPage({ params }: Props) {
  const idx    = allFoundationLessons.findIndex((l) => l.slug === params.slug);
  const lesson = allFoundationLessons[idx];
  if (!lesson) notFound();
  const prev = allFoundationLessons[idx - 1] ?? null;
  const next = allFoundationLessons[idx + 1] ?? null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <LessonPageClient lesson={lesson as any} prev={prev} next={next} track="foundation" />;
}
