import AppShell from "@/components/layout/AppShell";

export default function LabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell title="Labs" subtitle="ฝึกปฏิบัติ Network Engineering แบบ Hands-on">
      {children}
    </AppShell>
  );
}
