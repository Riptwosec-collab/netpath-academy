import prisma            from "@/lib/prisma";
import { deleteCourseAction } from "@/lib/adminActions";
import AdminHeader       from "@/components/admin/AdminHeader";
import AdminDataTable    from "@/components/admin/AdminDataTable";
import AdminEmptyState   from "@/components/admin/AdminEmptyState";

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({ orderBy: { createdAt: "desc" } });

  const columns = [
    { key: "id",       label: "ID" },
    { key: "title",    label: "Title" },
    { key: "level",    label: "Level" },
    { key: "category", label: "Category" },
    { key: "duration", label: "Duration" },
  ];

  const rows = courses.map((c) => ({
    id:       c.id,
    title:    c.title,
    level:    c.level,
    category: c.category,
    duration: c.duration,
  }));

  return (
    <div>
      <AdminHeader title="Courses" subtitle={`${courses.length} courses`}
        action={{ href: "/admin/courses/new", label: "New Course" }} />

      {courses.length === 0
        ? <AdminEmptyState message="ยังไม่มี Course" createHref="/admin/courses/new" createLabel="สร้าง Course แรก" />
        : <AdminDataTable columns={columns} rows={rows} editBase="/admin/courses" deleteAction={deleteCourseAction} />
      }
    </div>
  );
}
