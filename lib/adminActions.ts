"use server";

import { revalidatePath } from "next/cache";
import { redirect }       from "next/navigation";
import prisma             from "@/lib/prisma";
import { checkAdmin }     from "@/lib/adminAuth";

// ─── Helper ────────────────────────────────────────────────────────────────────
async function guardAdmin() {
  const ok = await checkAdmin();
  if (!ok) throw new Error("FORBIDDEN");
}

// ─── Courses ───────────────────────────────────────────────────────────────────
export async function createCourseAction(formData: FormData) {
  await guardAdmin();
  const id          = String(formData.get("id") ?? "").trim();
  const title       = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const level       = String(formData.get("level") ?? "Beginner").trim();
  const category    = String(formData.get("category") ?? "").trim();
  const duration    = String(formData.get("duration") ?? "").trim();

  if (!id || !title) throw new Error("id และ title ห้ามว่าง");

  await prisma.course.create({ data: { id, title, description, level, category, duration } });
  revalidatePath("/admin/courses");
  redirect("/admin/courses");
}

export async function updateCourseAction(formData: FormData) {
  await guardAdmin();
  const id          = String(formData.get("id") ?? "").trim();
  const title       = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const level       = String(formData.get("level") ?? "Beginner").trim();
  const category    = String(formData.get("category") ?? "").trim();
  const duration    = String(formData.get("duration") ?? "").trim();

  if (!id || !title) throw new Error("id และ title ห้ามว่าง");

  await prisma.course.update({ where: { id }, data: { title, description, level, category, duration } });
  revalidatePath("/admin/courses");
  redirect("/admin/courses");
}

export async function deleteCourseAction(formData: FormData) {
  await guardAdmin();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) throw new Error("Missing id");
  await prisma.course.delete({ where: { id } });
  revalidatePath("/admin/courses");
}

// ─── Labs ─────────────────────────────────────────────────────────────────────
export async function createLabAction(formData: FormData) {
  await guardAdmin();
  const data = {
    title:       String(formData.get("title") ?? "").trim(),
    category:    String(formData.get("category") ?? "").trim(),
    level:       String(formData.get("level") ?? "Beginner").trim(),
    duration:    String(formData.get("duration") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    scenario:    String(formData.get("scenario") ?? "").trim() || undefined,
    objective:   String(formData.get("objective") ?? "").trim() || undefined,
    solution:    String(formData.get("solution") ?? "").trim() || undefined,
  };
  if (!data.title) throw new Error("title ห้ามว่าง");
  await prisma.lab.create({ data });
  revalidatePath("/admin/labs");
  redirect("/admin/labs");
}

export async function updateLabAction(formData: FormData) {
  await guardAdmin();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) throw new Error("Missing id");
  const data = {
    title:       String(formData.get("title") ?? "").trim(),
    category:    String(formData.get("category") ?? "").trim(),
    level:       String(formData.get("level") ?? "Beginner").trim(),
    duration:    String(formData.get("duration") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    scenario:    String(formData.get("scenario") ?? "").trim() || undefined,
    objective:   String(formData.get("objective") ?? "").trim() || undefined,
    solution:    String(formData.get("solution") ?? "").trim() || undefined,
  };
  await prisma.lab.update({ where: { id }, data });
  revalidatePath("/admin/labs");
  redirect("/admin/labs");
}

export async function deleteLabAction(formData: FormData) {
  await guardAdmin();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) throw new Error("Missing id");
  await prisma.lab.delete({ where: { id } });
  revalidatePath("/admin/labs");
}

// ─── Quizzes ──────────────────────────────────────────────────────────────────
export async function createQuizAction(formData: FormData) {
  await guardAdmin();
  const passingScoreStr = String(formData.get("passingScore") ?? "70");
  const passingScore    = parseInt(passingScoreStr, 10);
  if (isNaN(passingScore) || passingScore < 0 || passingScore > 100) throw new Error("passingScore ต้องเป็น 0-100");
  const data = {
    title:         String(formData.get("title") ?? "").trim(),
    description:   String(formData.get("description") ?? "").trim(),
    category:      String(formData.get("category") ?? "").trim(),
    level:         String(formData.get("level") ?? "Beginner").trim(),
    duration:      String(formData.get("duration") ?? "15 min").trim(),
    passingScore,
    questionsJson: String(formData.get("questionsJson") ?? "").trim() || undefined,
  };
  if (!data.title) throw new Error("title ห้ามว่าง");
  if (data.questionsJson) {
    try { JSON.parse(data.questionsJson); } catch { throw new Error("questionsJson ต้องเป็น JSON ที่ถูกต้อง"); }
  }
  await prisma.quiz.create({ data });
  revalidatePath("/admin/quizzes");
  redirect("/admin/quizzes");
}

export async function updateQuizAction(formData: FormData) {
  await guardAdmin();
  const id          = String(formData.get("id") ?? "").trim();
  const passingScore = parseInt(String(formData.get("passingScore") ?? "70"), 10);
  if (!id) throw new Error("Missing id");
  const data = {
    title:         String(formData.get("title") ?? "").trim(),
    description:   String(formData.get("description") ?? "").trim(),
    category:      String(formData.get("category") ?? "").trim(),
    level:         String(formData.get("level") ?? "Beginner").trim(),
    duration:      String(formData.get("duration") ?? "15 min").trim(),
    passingScore,
    questionsJson: String(formData.get("questionsJson") ?? "").trim() || undefined,
  };
  await prisma.quiz.update({ where: { id }, data });
  revalidatePath("/admin/quizzes");
  redirect("/admin/quizzes");
}

export async function deleteQuizAction(formData: FormData) {
  await guardAdmin();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) throw new Error("Missing id");
  await prisma.quiz.delete({ where: { id } });
  revalidatePath("/admin/quizzes");
}

// ─── Badges ───────────────────────────────────────────────────────────────────
export async function createBadgeAction(formData: FormData) {
  await guardAdmin();
  const xpReward = parseInt(String(formData.get("xpReward") ?? "100"), 10);
  const data = {
    id:          String(formData.get("id") ?? "").trim(),
    title:       String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    icon:        String(formData.get("icon") ?? "🏆").trim(),
    xpReward:    isNaN(xpReward) ? 100 : xpReward,
  };
  if (!data.id || !data.title) throw new Error("id และ title ห้ามว่าง");
  await prisma.badge.create({ data });
  revalidatePath("/admin/badges");
  redirect("/admin/badges");
}

export async function updateBadgeAction(formData: FormData) {
  await guardAdmin();
  const id       = String(formData.get("id") ?? "").trim();
  const xpReward = parseInt(String(formData.get("xpReward") ?? "100"), 10);
  if (!id) throw new Error("Missing id");
  await prisma.badge.update({
    where: { id },
    data: {
      title:       String(formData.get("title") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      icon:        String(formData.get("icon") ?? "🏆").trim(),
      xpReward:    isNaN(xpReward) ? 100 : xpReward,
    },
  });
  revalidatePath("/admin/badges");
  redirect("/admin/badges");
}

export async function deleteBadgeAction(formData: FormData) {
  await guardAdmin();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) throw new Error("Missing id");
  await prisma.badge.delete({ where: { id } });
  revalidatePath("/admin/badges");
}

// ─── Users ─────────────────────────────────────────────────────────────────────
export async function updateUserRoleAction(formData: FormData) {
  await guardAdmin();
  const id   = String(formData.get("id") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim() as "USER" | "ADMIN";
  if (!id) throw new Error("Missing user id");
  if (role !== "USER" && role !== "ADMIN") throw new Error("role ต้องเป็น USER หรือ ADMIN");
  await prisma.user.update({ where: { id }, data: { role } });
  revalidatePath("/admin/users");
}
