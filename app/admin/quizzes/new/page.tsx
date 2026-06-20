import AdminHeader from "@/components/admin/AdminHeader";
import QuizForm    from "@/components/admin/forms/QuizForm";

export default function NewQuizPage() {
  return (
    <div>
      <AdminHeader title="New Quiz" subtitle="สร้าง Quiz ใหม่" />
      <QuizForm />
    </div>
  );
}
