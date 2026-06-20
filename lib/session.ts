import { getServerSession } from "next-auth";
import { authOptions, type UserRole } from "@/lib/auth";

/** Get session on the server side */
export async function getSession() {
  return getServerSession(authOptions);
}

/** Get current user from session, or null */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user ?? null;
}

/** Require login — throws if not authed */
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

/** Require admin role */
export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHORIZED");
  if ((user.role as UserRole) !== "ADMIN") throw new Error("FORBIDDEN");
  return user;
}
