interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?:  string;
  error?: string;
}

export default function Textarea({ label, hint, error, className = "", id, ...props }: TextareaProps) {
  const elId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={elId} className="text-[10px] text-white/35 font-medium">{label}</label>
      )}
      <textarea
        id={elId}
        className={`
          w-full rounded-xl bg-white/[0.04] border px-3 py-2.5 text-sm text-white/80
          placeholder:text-white/18 outline-none transition-all resize-none
          focus:ring-2 focus:ring-offset-1 focus:ring-offset-[#050816]
          disabled:opacity-40 disabled:cursor-not-allowed
          ${error
            ? "border-rose-500/40 focus:border-rose-500/60 focus:ring-rose-500/20"
            : "border-white/[0.09] focus:border-cyan-500/40 focus:ring-cyan-500/15"}
          ${className}
        `}
        {...props}
      />
      {hint  && !error && <p className="text-[9px] text-white/20">{hint}</p>}
      {error && <p className="text-[9px] text-rose-400">{error}</p>}
    </div>
  );
}
