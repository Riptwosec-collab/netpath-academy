import AppShell from "@/components/layout/AppShell";

export default function TroubleshootingLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell title="Troubleshooting" subtitle="คู่มือไล่ปัญหา Network แบบ Step-by-Step">
      {children}
    </AppShell>
  );
}
