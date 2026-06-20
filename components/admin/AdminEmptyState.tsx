import Link from "next/link";

type Props = { message: string; createHref?: string; createLabel?: string };

export default function AdminEmptyState({ message, createHref, createLabel }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <div className="w-12 h-12 rounded-xl border border-white/[0.07] bg-white/[0.03] flex items-center justify-center">
        <svg className="w-6 h-6 text-white/20" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <p className="text-sm text-white/35">{message}</p>
      {createHref && createLabel && (
        <Link href={createHref}
          className="text-xs px-4 py-2 rounded-xl bg-cyan-500/15 border border-cyan-500/35 text-cyan-400 hover:bg-cyan-500/25 transition-all">
          {createLabel}
        </Link>
      )}
    </div>
  );
}
