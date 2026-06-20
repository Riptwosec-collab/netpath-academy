import AdminHeader from "@/components/admin/AdminHeader";
import LabForm     from "@/components/admin/forms/LabForm";

export default function NewLabPage() {
  return (
    <div>
      <AdminHeader title="New Lab" subtitle="สร้าง Lab ใหม่" />
      <LabForm />
    </div>
  );
}
