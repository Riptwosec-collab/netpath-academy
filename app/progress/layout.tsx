import AppShell from "@/components/layout/AppShell";

export default function ProgressLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell title="Progress" subtitle="ติดตามความก้าวหน้า XP Badge และ Level ของคุณ">
      {children}
    </AppShell>
  );
}
