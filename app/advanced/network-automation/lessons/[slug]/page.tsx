import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { automationLessons } from "@/data/automationCourses";
import LessonPageClient from "@/components/lessons/LessonPageClient";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return automationLessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = automationLessons.find((l) => l.slug === params.slug);
  return { title: lesson ? `${lesson.title} | Network Automation` : "Not Found" };
}

export default function AutomationLessonPage({ params }: Props) {
  const idx    = automationLessons.findIndex((l) => l.slug === params.slug);
  const lesson = automationLessons[idx];
  if (!lesson) notFound();
  const prev = automationLessons[idx - 1] ?? null;
  const next = automationLessons[idx + 1] ?? null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <LessonPageClient lesson={lesson as any} prev={prev} next={next} track="automation" />;
}
