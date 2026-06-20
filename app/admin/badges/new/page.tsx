import AdminHeader from "@/components/admin/AdminHeader";
import BadgeForm   from "@/components/admin/forms/BadgeForm";

export default function NewBadgePage() {
  return (
    <div>
      <AdminHeader title="New Badge" subtitle="สร้าง Badge ใหม่" />
      <BadgeForm />
    </div>
  );
}
