import { notFound } from "next/navigation";
import prisma       from "@/lib/prisma";
import AdminHeader  from "@/components/admin/AdminHeader";
import BadgeForm    from "@/components/admin/forms/BadgeForm";

type Props = { params: { id: string } };

export default async function EditBadgePage({ params }: Props) {
  const badge = await prisma.badge.findUnique({ where: { id: params.id } });
  if (!badge) notFound();

  return (
    <div>
      <AdminHeader title="Edit Badge" subtitle={badge.title} />
      <BadgeForm badge={badge} />
    </div>
  );
}
