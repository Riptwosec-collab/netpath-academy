import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body as {
      name?: string; email?: string; password?: string;
    };

    // ── Validation ─────────────────────────────────────────────────────────
    if (!name?.trim())                   return NextResponse.json({ error: "กรุณาใส่ชื่อ" }, { status: 400 });
    if (!email?.trim())                  return NextResponse.json({ error: "กรุณาใส่ Email" }, { status: 400 });
    if (!password || password.length < 6) return NextResponse.json({ error: "Password ต้องมีอย่างน้อย 6 ตัวอักษร" }, { status: 400 });

    const emailLower = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailLower)) return NextResponse.json({ error: "Email ไม่ถูกต้อง" }, { status: 400 });

    // ── Check duplicate ─────────────────────────────────────────────────────
    const existing = await prisma.user.findUnique({ where: { email: emailLower } });
    if (existing) return NextResponse.json({ error: "Email นี้ถูกใช้งานแล้ว" }, { status: 409 });

    // ── Hash & create ───────────────────────────────────────────────────────
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name:     name.trim(),
        email:    emailLower,
        password: hashedPassword,
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "เกิดข้อผิดพลาด กรุณาลองใหม่" }, { status: 500 });
  }
}
