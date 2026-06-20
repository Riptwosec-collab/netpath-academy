import prisma           from "@/lib/prisma";
import { deleteLabAction } from "@/lib/adminActions";
import AdminHeader      from "@/components/admin/AdminHeader";
import AdminDataTable   from "@/components/admin/AdminDataTable";
import AdminEmptyState  from "@/components/admin/AdminEmptyState";

export default async function AdminLabsPage() {
  const labs = await prisma.lab.findMany({ orderBy: { createdAt: "desc" } });

  const columns = [
    { key: "title",    label: "Title" },
    { key: "category", label: "Category" },
    { key: "level",    label: "Level" },
    { key: "duration", label: "Duration" },
  ];

  const rows = labs.map((l) => ({ id: l.id, title: l.title, category: l.category, level: l.level, duration: l.duration }));

  return (
    <div>
      <AdminHeader title="Labs" subtitle={`${labs.length} labs`}
        action={{ href: "/admin/labs/new", label: "New Lab" }} />

      {labs.length === 0
        ? <AdminEmptyState message="ยังไม่มี Lab" createHref="/admin/labs/new" createLabel="สร้าง Lab แรก" />
        : <AdminDataTable columns={columns} rows={rows} editBase="/admin/labs" deleteAction={deleteLabAction} />
      }
    </div>
  );
}
