import Sidebar   from "@/components/layout/Sidebar";
import Topbar    from "@/components/layout/Topbar";
import MobileNav from "@/components/layout/MobileNav";

type AppShellProps = {
  children:  React.ReactNode;
  title?:    string;
  subtitle?: string;
};

export default function AppShell({ children, title, subtitle }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#050816] flex">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[100px]" />
      </div>

      {/* Desktop sidebar */}
      <Sidebar />

      {/* Main column */}
      <div className="relative flex-1 flex flex-col min-w-0">
        <Topbar title={title} subtitle={subtitle} />

        <main className="flex-1 overflow-x-hidden">
          <div className="page-container pb-24 md:pb-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile nav */}
      <MobileNav />
    </div>
  );
}
