"use client";
import { useState } from "react";
import { CheckCircle2, Circle, ChevronDown, ChevronRight, Lightbulb, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  id:          string;
  title:       string;
  description: string;
  hint?:       string;
  /** Expected command or answer to verify */
  verify?:     string;
  /** Expected command output (shown when user checks) */
  solution?:   string;
  xp?:         number;
}

interface Props {
  steps:     Step[];
  onComplete?: (completedCount: number, total: number, totalXp: number) => void;
}

export default function LabStepTracker({ steps, onComplete }: Props) {
  const [done,     setDone]     = useState<Record<string, boolean>>({});
  const [open,     setOpen]     = useState<Record<string, boolean>>({ [steps[0]?.id]: true });
  const [answers,  setAnswers]  = useState<Record<string, string>>({});
  const [checked,  setChecked]  = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});
  const [showSol,  setShowSol]  = useState<Record<string, boolean>>({});
  const [wrong,    setWrong]    = useState<Record<string, boolean>>({});

  const doneCount = Object.values(done).filter(Boolean).length;
  const totalXp   = steps
    .filter(s => done[s.id])
    .reduce((acc, s) => acc + (s.xp ?? 10), 0);

  function toggle(id: string) {
    setOpen(p => ({ ...p, [id]: !p[id] }));
  }

  function mark(id: string) {
    const step    = steps.find(s => s.id === id);
    const newDone = { ...done, [id]: true };
    setDone(newDone);

    // Auto-open next step
    const idx  = steps.findIndex(s => s.id === id);
    const next = steps[idx + 1];
    if (next) setOpen(p => ({ ...p, [next.id]: true }));

    const doneC = Object.values(newDone).filter(Boolean).length;
    onComplete?.(doneC, steps.length, steps.filter(s => newDone[s.id]).reduce((a, s) => a + (s.xp ?? 10), 0));
  }

  function checkAnswer(step: Step) {
    if (!step.verify) { mark(step.id); return; }
    const expected = step.verify.trim().toLowerCase();
    const given    = (answers[step.id] ?? "").trim().toLowerCase();
    if (given === expected) {
      setChecked(p => ({ ...p, [step.id]: true }));
      setWrong(p => ({ ...p, [step.id]: false }));
      mark(step.id);
    } else {
      setWrong(p => ({ ...p, [step.id]: true }));
    }
  }

  return (
    <div className="space-y-2">
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full transition-all duration-500"
            style={{ width: `${steps.length ? (doneCount / steps.length) * 100 : 0}%` }}
          />
        </div>
        <span className="text-xs text-white/40 flex-shrink-0">
          {doneCount}/{steps.length} tasks · +{totalXp} XP
        </span>
      </div>

      {doneCount === steps.length && steps.length > 0 && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center text-sm text-emerald-400 font-semibold mb-3">
          ✅ Lab Complete! You earned +{totalXp} XP
        </div>
      )}

      {steps.map((step, idx) => {
        const isDone  = done[step.id];
        const isOpen  = open[step.id];
        const isFirst = idx === 0;
        const locked  = idx > 0 && !done[steps[idx - 1].id];

        return (
          <div
            key={step.id}
            className={cn(
              "rounded-xl border transition-all duration-200",
              isDone  ? "border-emerald-500/25 bg-emerald-500/[0.04]" :
              locked  ? "border-white/[0.04] opacity-50" :
              isOpen  ? "border-cyan-500/25 bg-cyan-500/[0.04]" :
              "border-white/[0.07] bg-white/[0.02]",
            )}
          >
            {/* Step header */}
            <button
              className="w-full flex items-center gap-3 px-4 py-3 text-left"
              onClick={() => !locked && toggle(step.id)}
              disabled={locked}
            >
              {isDone
                ? <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                : <Circle      size={16} className={cn("flex-shrink-0", locked ? "text-white/15" : "text-white/25")} />}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/20 font-mono">#{idx + 1}</span>
                  <span className={cn("text-sm font-medium", isDone ? "text-emerald-400" : locked ? "text-white/25" : "text-white/75")}>
                    {step.title}
                  </span>
                  {step.xp && (
                    <span className="text-[9px] text-amber-400/60 bg-amber-500/10 px-1.5 py-0.5 rounded-full">
                      +{step.xp} XP
                    </span>
                  )}
                </div>
              </div>

              {!locked && (
                isOpen
                  ? <ChevronDown size={14} className="text-white/20 flex-shrink-0" />
                  : <ChevronRight size={14} className="text-white/20 flex-shrink-0" />
              )}
            </button>

            {/* Expanded content */}
            {isOpen && !locked && (
              <div className="px-4 pb-4 space-y-3 border-t border-white/[0.06] pt-3">
                <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>

                {/* Hint */}
                {step.hint && (
                  <div>
                    <button
                      onClick={() => setShowHint(p => ({ ...p, [step.id]: !p[step.id] }))}
                      className="flex items-center gap-1.5 text-[11px] text-amber-400/70 hover:text-amber-400 transition-colors"
                    >
                      <Lightbulb size={11} />
                      {showHint[step.id] ? "Hide hint" : "Show hint"}
                    </button>
                    {showHint[step.id] && (
                      <div className="mt-2 px-3 py-2 rounded-lg bg-amber-500/[0.06] border border-amber-500/15 text-xs text-amber-300/70">
                        {step.hint}
                      </div>
                    )}
                  </div>
                )}

                {/* Verify input */}
                {step.verify && !isDone && (
                  <div className="space-y-2">
                    <label className="text-[11px] text-white/30">
                      Type the exact command to verify:
                    </label>
                    <div className="flex gap-2">
                      <input
                        value={answers[step.id] ?? ""}
                        onChange={e => setAnswers(p => ({ ...p, [step.id]: e.target.value }))}
                        onKeyDown={e => e.key === "Enter" && checkAnswer(step)}
                        placeholder={`e.g. ${step.verify.slice(0, 30)}…`}
                        className={cn(
                          "flex-1 px-3 py-1.5 rounded-lg border text-xs font-mono bg-black/30 text-white/80 outline-none transition-colors",
                          wrong[step.id]
                            ? "border-red-500/40 focus:border-red-500/60"
                            : "border-white/10 focus:border-cyan-500/40",
                        )}
                      />
                      <button
                        onClick={() => checkAnswer(step)}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium hover:bg-cyan-500/20 transition-colors"
                      >
                        Check
                      </button>
                    </div>
                    {wrong[step.id] && (
                      <p className="text-[11px] text-red-400/80">Incorrect — try again or reveal solution below.</p>
                    )}
                  </div>
                )}

                {/* Mark done (no verify) */}
                {!step.verify && !isDone && (
                  <button
                    onClick={() => mark(step.id)}
                    className="px-4 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium hover:bg-cyan-500/20 transition-colors"
                  >
                    Mark as Done
                  </button>
                )}

                {/* Solution reveal */}
                {step.solution && (
                  <div>
                    <button
                      onClick={() => setShowSol(p => ({ ...p, [step.id]: !p[step.id] }))}
                      className="flex items-center gap-1.5 text-[11px] text-white/25 hover:text-white/50 transition-colors"
                    >
                      {showSol[step.id] ? <EyeOff size={11} /> : <Eye size={11} />}
                      {showSol[step.id] ? "Hide solution" : "Reveal solution"}
                    </button>
                    {showSol[step.id] && (
                      <pre className="mt-2 px-3 py-2 rounded-lg bg-black/40 border border-white/[0.07] text-[11px] text-white/50 font-mono whitespace-pre-wrap leading-relaxed">
                        {step.solution}
                      </pre>
                    )}
                  </div>
                )}

                {isDone && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <CheckCircle2 size={13} /> Completed
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
