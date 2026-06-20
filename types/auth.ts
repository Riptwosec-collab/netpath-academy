import type { UserRole } from "@/lib/auth";

export type SafeUser = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: UserRole;
  xp: number;
  level: number;
  skillLevel: string;
  learningStreak: number;
  createdAt: Date;
};

export type SessionUser = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: UserRole;
};

// Extend next-auth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: UserRole;
    };
  }
  interface User {
    id: string;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
  }
}
