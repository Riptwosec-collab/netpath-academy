"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react";

export interface MiniQuestion {
  q:       string;
  options: string[];
  answer:  number;   // index of correct option
  explain: string;
}

interface Props {
  title?: string;
  questions: MiniQuestion[];
  xpReward?: number;
}

export default function MiniQuiz({ title = "Check Your Understanding", questions, xpReward = 10 }: Props) {
  const [step,      setStep]      = useState(0);
  const [selected,  setSelected]  = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score,     setScore]     = useState(0);
  const [done,      setDone]      = useState(false);

  const q       = questions[step];
  const correct = selected === q.answer;
  const pct     = Math.round((score / questions.length) * 100);

  function confirm() {
    if (selected === null) return;
    setConfirmed(true);
    if (selected === q.answer) setScore(s => s + 1);
  }

  function next() {
    if (step + 1 >= questions.length) {
      setDone(true);
    } else {
      setStep(s => s + 1);
      setSelected(null);
      setConfirmed(false);
    }
  }

  function retry() {
    setStep(0); setSelected(null); setConfirmed(false); setScore(0); setDone(false);
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 text-center">
        <div className="flex justify-center mb-3">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${pct >= 70 ? "bg-green-500/15 border border-green-500/30" : "bg-amber-500/15 border border-amber-500/30"}`}>
            <Trophy size={24} className={pct >= 70 ? "text-green-400" : "text-amber-400"} />
          </div>
        </div>
        <p className="text-lg font-bold text-white/80 mb-1">{pct >= 70 ? "เยี่ยม! 🎉" : "ลองอีกครั้ง"}</p>
        <p className="text-sm text-white/40 mb-4">
          ตอบถูก {score}/{questions.length} ข้อ — {pct}%
          {pct >= 70 && <span className="text-green-400 ml-2">+{xpReward} XP</span>}
        </p>
        <div className="flex justify-center gap-3">
          <button onClick={retry} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/[0.08] text-white/40 text-sm hover:text-white/60 hover:border-white/20 transition-all">
            <RotateCcw size={13} /> ทำอีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.07] bg-white/[0.02]">
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{title}</span>
        <div className="flex gap-1 ml-auto">
          {questions.map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${
              i < step ? "bg-green-500/60" : i === step ? "bg-cyan-500" : "bg-white/[0.10]"
            }`} />
          ))}
        </div>
        <span className="text-[10px] text-white/25 ml-2">{step + 1}/{questions.length}</span>
      </div>

      <div className="p-4 space-y-3">
        {/* Question */}
        <p className="text-sm text-white/75 leading-relaxed">{q.q}</p>

        {/* Options */}
        <div className="space-y-2">
          {q.options.map((opt, i) => {
            let cls = "border-white/[0.08] text-white/55 hover:border-white/20 hover:text-white/75";
            if (selected === i && !confirmed) cls = "border-cyan-500/50 bg-cyan-500/8 text-cyan-300";
            if (confirmed) {
              if (i === q.answer)         cls = "border-green-500/50 bg-green-500/8 text-green-300";
              else if (selected === i)    cls = "border-red-500/50 bg-red-500/8 text-red-300";
              else                        cls = "border-white/[0.05] text-white/30 opacity-50";
            }
            return (
              <button key={i} disabled={confirmed}
                onClick={() => setSelected(i)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left text-xs transition-all ${cls}`}>
                <span className="w-5 h-5 rounded-md border border-current flex items-center justify-center text-[10px] font-bold flex-shrink-0 opacity-60">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{opt}</span>
                {confirmed && i === q.answer && <CheckCircle2 size={14} className="ml-auto text-green-400" />}
                {confirmed && selected === i && i !== q.answer && <XCircle size={14} className="ml-auto text-red-400" />}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {confirmed && (
          <div className={`rounded-xl border p-3 text-xs leading-relaxed ${
            correct ? "border-green-500/25 bg-green-500/[0.06] text-green-200/70"
                    : "border-amber-500/25 bg-amber-500/[0.06] text-amber-200/70"
          }`}>
            <span className="font-semibold">{correct ? "✅ ถูกต้อง!" : "❌ ไม่ถูกต้อง"}</span>{" "}
            {q.explain}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-1">
          {!confirmed ? (
            <button onClick={confirm} disabled={selected === null}
              className="px-4 py-2 rounded-xl bg-cyan-500/15 border border-cyan-500/35 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/25 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              ยืนยัน
            </button>
          ) : (
            <button onClick={next}
              className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/[0.10] text-white/60 text-xs font-semibold hover:bg-white/[0.10] transition-all">
              {step + 1 >= questions.length ? "ดูผล →" : "ข้อถัดไป →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
