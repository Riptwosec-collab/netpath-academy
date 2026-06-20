type EmptyStateProps = {
  title?:    string;
  message:   string;
  icon?:     string; // SVG path d
  action?:   React.ReactNode;
  className?: string;
};

export default function EmptyState({
  title,
  message,
  icon = "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4",
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center gap-4 py-14 text-center ${className}`}>
      <div className="w-12 h-12 rounded-xl border border-white/[0.07] bg-white/[0.03] flex items-center justify-center">
        <svg className="w-6 h-6 text-white/20" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
      </div>
      {title && <p className="text-sm font-semibold text-white/50">{title}</p>}
      <p className="text-xs text-white/30 max-w-xs">{message}</p>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
