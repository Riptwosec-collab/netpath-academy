import AppShell from "@/components/layout/AppShell";

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell title="Courses" subtitle="เรียนรู้ Network Engineering อย่างเป็นระบบ">
      {children}
    </AppShell>
  );
}
