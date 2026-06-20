import Link from "next/link";

type Props = {
  title: string;
  subtitle?: string;
  action?: { href: string; label: string };
};

export default function AdminHeader({ title, subtitle, action }: Props) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-lg font-bold text-white/95">{title}</h1>
        {subtitle && <p className="text-xs text-white/35 mt-0.5">{subtitle}</p>}
      </div>
      {action && (
        <Link href={action.href}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-xs font-semibold text-cyan-400 hover:bg-cyan-500/25 transition-all">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          {action.label}
        </Link>
      )}
    </div>
  );
}
