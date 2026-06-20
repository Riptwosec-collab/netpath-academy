import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

// SQLite schema uses String instead of enum — type alias for clarity
export type UserRole = "USER" | "ADMIN";

declare module "next-auth" {
  interface User   { id: string; role: UserRole; }
  interface Session { user: { id: string; role: UserRole; name?: string | null; email?: string | null; image?: string | null; }; }
}

declare module "next-auth/jwt" {
  interface JWT { id: string; role: UserRole; }
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error:  "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
        });

        if (!user || !user.password) return null;

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;

        return {
          id:    user.id,
          name:  user.name,
          email: user.email,
          image: user.image,
          role:  (user.role as UserRole) ?? "USER",
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id   = token.id   as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id   = user.id;
        token.role = (user as { id: string; role: UserRole }).role;
      }
      return token;
    },
  },
};
