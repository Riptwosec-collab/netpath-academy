import AppShell from "@/components/layout/AppShell";

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell title="Network Tools" subtitle="Subnet Calculator, VLAN Planner, Config Generator">
      {children}
    </AppShell>
  );
}
