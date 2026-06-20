interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:   string;
  hint?:    string;
  error?:   string;
}

export default function Input({ label, hint, error, className = "", id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-[10px] text-white/35 font-medium">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full rounded-xl bg-white/[0.04] border px-3 py-2.5 text-sm text-white/80
          placeholder:text-white/18 outline-none transition-all
          focus:ring-2 focus:ring-offset-1 focus:ring-offset-[#050816]
          disabled:opacity-40 disabled:cursor-not-allowed
          ${error
            ? "border-rose-500/40 focus:border-rose-500/60 focus:ring-rose-500/20"
            : "border-white/[0.09] focus:border-cyan-500/40 focus:ring-cyan-500/15"}
          ${className}
        `}
        aria-describedby={hint ? `${inputId}-hint` : undefined}
        {...props}
      />
      {hint  && !error && <p id={`${inputId}-hint`} className="text-[9px] text-white/20">{hint}</p>}
      {error && <p className="text-[9px] text-rose-400">{error}</p>}
    </div>
  );
}
