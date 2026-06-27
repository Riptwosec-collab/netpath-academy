import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allHardwareLessons } from "@/data/hardwareCourses";
import LessonPageClient from "@/components/lessons/LessonPageClient";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return allHardwareLessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = allHardwareLessons.find((l) => l.slug === params.slug);
  return { title: lesson ? `${lesson.title} | Hardware` : "Not Found" };
}

export default function HardwareLessonPage({ params }: Props) {
  const idx    = allHardwareLessons.findIndex((l) => l.slug === params.slug);
  const lesson = allHardwareLessons[idx];
  if (!lesson) notFound();
  const prev = allHardwareLessons[idx - 1] ?? null;
  const next = allHardwareLessons[idx + 1] ?? null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <LessonPageClient lesson={lesson as any} prev={prev} next={next} track="hardware" />;
}
