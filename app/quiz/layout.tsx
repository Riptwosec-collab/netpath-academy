import AppShell from "@/components/layout/AppShell";

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell title="Quiz" subtitle="ทดสอบความเข้าใจด้วย Quiz ทุกหัวข้อ">
      {children}
    </AppShell>
  );
}
