import prisma             from "@/lib/prisma";
import { deleteQuizAction } from "@/lib/adminActions";
import AdminHeader        from "@/components/admin/AdminHeader";
import AdminDataTable     from "@/components/admin/AdminDataTable";
import AdminEmptyState    from "@/components/admin/AdminEmptyState";

export default async function AdminQuizzesPage() {
  const quizzes = await prisma.quiz.findMany({ orderBy: { createdAt: "desc" } });

  const columns = [
    { key: "title",        label: "Title" },
    { key: "category",     label: "Category" },
    { key: "level",        label: "Level" },
    { key: "passingScore", label: "Pass %" },
    { key: "duration",     label: "Duration" },
  ];

  const rows = quizzes.map((q) => ({
    id: q.id, title: q.title, category: q.category, level: q.level,
    passingScore: `${q.passingScore}%`, duration: q.duration,
  }));

  return (
    <div>
      <AdminHeader title="Quizzes" subtitle={`${quizzes.length} quizzes`}
        action={{ href: "/admin/quizzes/new", label: "New Quiz" }} />

      {quizzes.length === 0
        ? <AdminEmptyState message="ยังไม่มี Quiz" createHref="/admin/quizzes/new" createLabel="สร้าง Quiz แรก" />
        : <AdminDataTable columns={columns} rows={rows} editBase="/admin/quizzes" deleteAction={deleteQuizAction} />
      }
    </div>
  );
}
