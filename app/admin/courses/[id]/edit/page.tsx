export const dynamic = "force-dynamic";
import { notFound }  from "next/navigation";
import prisma        from "@/lib/prisma";
import AdminHeader   from "@/components/admin/AdminHeader";
import CourseForm    from "@/components/admin/forms/CourseForm";

type Props = { params: { id: string } };

export default async function EditCoursePage({ params }: Props) {
  const course = await prisma.course.findUnique({ where: { id: params.id } });
  if (!course) notFound();

  return (
    <div>
      <AdminHeader title="Edit Course" subtitle={course.title} />
      <CourseForm course={course} />
    </div>
  );
}
