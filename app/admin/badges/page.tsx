export const dynamic = "force-dynamic";
import prisma              from "@/lib/prisma";
import { deleteBadgeAction } from "@/lib/adminActions";
import AdminHeader         from "@/components/admin/AdminHeader";
import AdminEmptyState     from "@/components/admin/AdminEmptyState";
import AdminDataTable      from "@/components/admin/AdminDataTable";
import Link                from "next/link";

export default async function AdminBadgesPage() {
  const badges = await prisma.badge.findMany({ orderBy: { xpReward: "desc" } });

  const columns = [
    { key: "icon",      label: "Icon" },
    { key: "id",        label: "ID" },
    { key: "title",     label: "Title" },
    { key: "xpReward",  label: "XP" },
    { key: "description", label: "Description" },
  ];

  const rows = badges.map((b) => ({
    id: b.id, icon: b.icon, title: b.title, xpReward: b.xpReward, description: b.description,
  }));

  return (
    <div>
      <AdminHeader title="Badges" subtitle={`${badges.length} badges`}
        action={{ href: "/admin/badges/new", label: "New Badge" }} />

      {badges.length === 0
        ? <AdminEmptyState message="ยังไม่มี Badge" createHref="/admin/badges/new" createLabel="สร้าง Badge แรก" />
        : <AdminDataTable columns={columns} rows={rows} editBase="/admin/badges" deleteAction={deleteBadgeAction} />
      }
    </div>
  );
}
