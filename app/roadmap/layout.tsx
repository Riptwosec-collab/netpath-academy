import AppShell from "@/components/layout/AppShell";

export default function RoadmapLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell title="Roadmap" subtitle="10-Level Network Engineer Learning Path">
      {children}
    </AppShell>
  );
}
