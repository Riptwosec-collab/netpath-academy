export const dynamic = "force-dynamic";
import prisma                from "@/lib/prisma";
import { updateUserRoleAction } from "@/lib/adminActions";
import AdminHeader           from "@/components/admin/AdminHeader";
import AdminEmptyState       from "@/components/admin/AdminEmptyState";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, role: true, xp: true, level: true, createdAt: true },
  });

  return (
    <div>
      <AdminHeader title="Users" subtitle={`${users.length} users`} />

      {users.length === 0 ? (
        <AdminEmptyState message="ยังไม่มี User" />
      ) : (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Name","Email","Role","XP","Level","Joined","Action"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[10px] text-white/25 font-semibold uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 text-white/65 font-medium">{u.name ?? "—"}</td>
                    <td className="px-4 py-3 text-white/40">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        u.role === "ADMIN"
                          ? "bg-amber-500/15 text-amber-400 border border-amber-500/25"
                          : "bg-white/[0.05] text-white/30 border border-white/[0.07]"
                      }`}>{u.role}</span>
                    </td>
                    <td className="px-4 py-3 text-cyan-400/70">{u.xp.toLocaleString()}</td>
                    <td className="px-4 py-3 text-white/40">{u.level}</td>
                    <td className="px-4 py-3 text-white/30">{new Date(u.createdAt).toLocaleDateString("th-TH")}</td>
                    <td className="px-4 py-3">
                      <form action={updateUserRoleAction} className="flex gap-1">
                        <input type="hidden" name="id" value={u.id} />
                        <input type="hidden" name="role" value={u.role === "ADMIN" ? "USER" : "ADMIN"} />
                        <button type="submit"
                          className={`text-[9px] px-2.5 py-1 rounded-lg border transition-all ${
                            u.role === "ADMIN"
                              ? "border-rose-500/20 text-rose-400/50 hover:border-rose-500/40 hover:text-rose-400"
                              : "border-amber-500/20 text-amber-400/50 hover:border-amber-500/40 hover:text-amber-400"
                          }`}
                          onClick={(e) => { if (!confirm(`${u.role === "ADMIN" ? "Demote" : "Promote"} user ${u.name}?`)) e.preventDefault(); }}>
                          {u.role === "ADMIN" ? "Demote" : "Promote"}
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
