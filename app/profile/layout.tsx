import AppShell from "@/components/layout/AppShell";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell title="Profile" subtitle="ข้อมูลบัญชีและ Progress ของคุณ">
      {children}
    </AppShell>
  );
}
