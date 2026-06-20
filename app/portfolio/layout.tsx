import AppShell from "@/components/layout/AppShell";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell title="Portfolio" subtitle="เก็บผลงาน Network สำหรับสมัครงาน">
      {children}
    </AppShell>
  );
}
