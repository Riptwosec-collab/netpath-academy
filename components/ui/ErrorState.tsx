type ErrorStateProps = {
  title?:    string;
  message?:  string;
  onRetry?:  () => void;
  className?: string;
};

export default function ErrorState({
  title   = "เกิดข้อผิดพลาด",
  message = "ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่",
  onRetry,
  className = "",
}: ErrorStateProps) {
  return (
    <div className={`flex flex-col items-center gap-4 py-14 text-center ${className}`}>
      <div className="w-12 h-12 rounded-xl border border-rose-500/20 bg-rose-500/[0.06] flex items-center justify-center">
        <svg className="w-6 h-6 text-rose-400/50" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-rose-400/70">{title}</p>
        <p className="text-xs text-white/30 mt-1 max-w-xs">{message}</p>
      </div>
      {onRetry && (
        <button onClick={onRetry}
          className="text-xs px-4 py-2 rounded-xl border border-rose-500/25 text-rose-400/60
                     hover:border-rose-500/40 hover:text-rose-400 transition-all">
          ลองใหม่
        </button>
      )}
    </div>
  );
}
