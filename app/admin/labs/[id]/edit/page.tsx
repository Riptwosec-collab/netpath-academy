import { notFound } from "next/navigation";
import prisma       from "@/lib/prisma";
import AdminHeader  from "@/components/admin/AdminHeader";
import LabForm      from "@/components/admin/forms/LabForm";

type Props = { params: { id: string } };

export default async function EditLabPage({ params }: Props) {
  const lab = await prisma.lab.findUnique({ where: { id: params.id } });
  if (!lab) notFound();

  return (
    <div>
      <AdminHeader title="Edit Lab" subtitle={lab.title} />
      <LabForm lab={lab} />
    </div>
  );
}
