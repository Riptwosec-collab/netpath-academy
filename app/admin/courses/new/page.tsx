import AdminHeader from "@/components/admin/AdminHeader";
import CourseForm  from "@/components/admin/forms/CourseForm";

export default function NewCoursePage() {
  return (
    <div>
      <AdminHeader title="New Course" subtitle="สร้าง Course ใหม่" />
      <CourseForm />
    </div>
  );
}
