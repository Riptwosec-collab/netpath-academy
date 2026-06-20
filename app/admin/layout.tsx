import { requireAdmin } from "@/lib/adminAuth";
import AdminSidebar   from "@/components/admin/AdminSidebar";

export const metadata = { title: "Admin — NetPath Academy" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin(); // redirects /login or /dashboard if not admin

  return (
    <div className="min-h-screen bg-[#050816] flex">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 max-w-6xl w-full">
        {children}
      </main>
    </div>
  );
}
