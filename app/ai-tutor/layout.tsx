import AppShell from "@/components/layout/AppShell";

export default function AiTutorLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell title="AI Tutor" subtitle="ผู้ช่วย Network Engineer — อธิบาย, วิเคราะห์, สร้าง Lab & Quiz">
      {children}
    </AppShell>
  );
}
