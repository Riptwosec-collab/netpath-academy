type OptionState = "default" | "selected" | "correct" | "incorrect";

interface QuizOptionProps {
  label:       string;
  index:       number;
  state:       OptionState;
  disabled:    boolean;
  onSelect:    () => void;
}

const letters = ["A", "B", "C", "D", "E"];

const stateStyles: Record<OptionState, string> = {
  default:   "border-white/[0.08] bg-white/[0.02] text-white/60 hover:border-white/20 hover:bg-white/[0.05] hover:text-white/80",
  selected:  "border-[#38bdf8]/50 bg-[#38bdf8]/10 text-[#38bdf8]",
  correct:   "border-[#22c55e]/50 bg-[#22c55e]/10 text-[#22c55e]",
  incorrect: "border-[#ef4444]/50 bg-[#ef4444]/10 text-[#ef4444]/90",
};

const letterStyles: Record<OptionState, string> = {
  default:   "border-white/10 text-white/25",
  selected:  "border-[#38bdf8]/40 bg-[#38bdf8]/15 text-[#38bdf8]",
  correct:   "border-[#22c55e]/40 bg-[#22c55e]/15 text-[#22c55e]",
  incorrect: "border-[#ef4444]/40 bg-[#ef4444]/15 text-[#ef4444]",
};

export default function QuizOption({ label, index, state, disabled, onSelect }: QuizOptionProps) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-sm
                  transition-all duration-150 disabled:cursor-default
                  ${stateStyles[state]}`}
    >
      {/* Letter badge */}
      <span className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg border text-[11px] font-bold
                        ${letterStyles[state]}`}>
        {/* Show check/X icon when answered */}
        {state === "correct" ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : state === "incorrect" ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : letters[index] ?? String(index + 1)}
      </span>

      <span className="flex-1 leading-snug">{label}</span>
    </button>
  );
}
