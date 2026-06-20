import AppShell from "@/components/layout/AppShell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell title="Dashboard" subtitle="ศูนย์กลางการเรียนรู้ของคุณ">
      {children}
    </AppShell>
  );
}
