"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Clock, ChevronRight, ChevronLeft, Check, X, Trophy, RotateCcw, Download, Home, BookOpen } from "lucide-react";
import Link    from "next/link";
import { cn }  from "@/lib/utils";
import type { Exam } from "@/data/exams";

/* ─── States ──────────────────────────────────────────────────────── */
type Phase = "intro" | "exam" | "result";

interface Answer { questionIdx: number; selected: number | null; }

/* ─── Certificate SVG ─────────────────────────────────────────────── */
function CertSVG({ name, examTitle, certName, score, date }: {
  name: string; examTitle: string; certName: string; score: number; date: string;
}) {
  return (
    <svg viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xl mx-auto">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="700" height="480" rx="16" fill="url(#bg)" />
      <rect x="16" y="16" width="668" height="448" rx="12" fill="none" stroke="url(#gold)" strokeWidth="2" strokeDasharray="8 4" />

      {/* Logo area */}
      <text x="350" y="70" textAnchor="middle" fill="#38bdf8" fontSize="13" fontFamily="monospace" letterSpacing="4">NETPATH ACADEMY</text>
      <text x="350" y="95" textAnchor="middle" fill="#60a5fa" fontSize="9" fontFamily="monospace" letterSpacing="2">CERTIFICATE OF ACHIEVEMENT</text>

      {/* Trophy icon representation */}
      <text x="350" y="150" textAnchor="middle" fontSize="42">🏆</text>

      {/* Cert name */}
      <text x="350" y="200" textAnchor="middle" fill="url(#gold)" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif">{certName}</text>

      {/* Awarded to */}
      <text x="350" y="235" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">This certifies that</text>
      <text x="350" y="268" textAnchor="middle" fill="#f1f5f9" fontSize="22" fontWeight="bold" fontFamily="Georgia, serif">{name || "Candidate"}</text>

      {/* Divider */}
      <line x1="150" y1="280" x2="550" y2="280" stroke="url(#gold)" strokeWidth="0.8" opacity="0.5" />

      {/* Exam info */}
      <text x="350" y="306" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">
        has successfully completed
      </text>
      <text x="350" y="328" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="600" fontFamily="sans-serif">{examTitle}</text>

      {/* Score */}
      <rect x="270" y="348" width="160" height="32" rx="6" fill="#1e40af" fillOpacity="0.4" />
      <text x="350" y="369" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="700" fontFamily="monospace">
        Score: {score}% — PASSED
      </text>

      {/* Footer */}
      <text x="350" y="420" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="monospace">{date}</text>
      <text x="350" y="440" textAnchor="middle" fill="#334155" fontSize="8" fontFamily="monospace">netpath-academy.vercel.app</text>
    </svg>
  );
}

/* ─── Timer ───────────────────────────────────────────────────────── */
function useTimer(minutes: number, onExpire: () => void) {
  const [secs, setSecs]     = useState(minutes * 60);
  const intervalRef         = useRef<NodeJS.Timeout | null>(null);
  const expiredRef           = useRef(false);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecs(s => {
        if (s <= 1 && !expiredRef.current) { expiredRef.current = true; onExpire(); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [onExpire]);

  const mm  = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss  = String(secs % 60).padStart(2, "0");
  const pct = secs / (minutes * 60);

  return { display: `${mm}:${ss}`, pct, secs };
}

/* ─── Main Component ──────────────────────────────────────────────── */
export default function ExamClient({ exam }: { exam: Exam }) {
  const [phase,   setPhase]   = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showing, setShowing] = useState(false); // show explanation after answer

  const shuffled  = useRef(exam.questions.slice().sort(() => Math.random() - 0.5));
  const questions = shuffled.current;

  const handleExpire = useCallback(() => submitExam(), []);

  const { display: timerDisplay, pct: timerPct, secs: timerSecs } = useTimer(
    exam.timeLimit,
    handleExpire,
  );

  function submitExam() {
    setPhase("result");
  }

  function pickAnswer(optIdx: number) {
    if (phase !== "exam") return;
    if (answers.find(a => a.questionIdx === current)) return; // already answered

    setAnswers(prev => [...prev.filter(a => a.questionIdx !== current), { questionIdx: current, selected: optIdx }]);
    setShowing(true);
  }

  function next() {
    setShowing(false);
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
    } else {
      submitExam();
    }
  }

  function prev() {
    setShowing(false);
    setCurrent(c => Math.max(0, c - 1));
  }

  /* ── Score ──────────────────────────────────────────────────────── */
  const score = Math.round(
    (answers.filter(a => {
      const q = questions[a.questionIdx];
      return a.selected === q?.answer;
    }).length / questions.length) * 100
  );
  const passed = score >= exam.passingScore;

  /* ── Render ─────────────────────────────────────────────────────── */

  /* INTRO */
  if (phase === "intro") {
    return (
      <div className="px-4 md:px-6 py-8 max-w-2xl mx-auto">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-8 text-center space-y-5">
          <div className="text-5xl">{exam.icon}</div>
          <div>
            <h1 className="text-xl font-bold text-white/90">{exam.title}</h1>
            <p className="text-sm text-white/40 mt-1">{exam.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: "Questions",   value: exam.questions.length },
              { label: "Time Limit",  value: `${exam.timeLimit} min` },
              { label: "Pass Score",  value: `${exam.passingScore}%` },
            ].map(i => (
              <div key={i.label} className="rounded-xl border border-white/[0.06] bg-white/[0.03] py-3">
                <div className="text-lg font-bold text-cyan-400">{i.value}</div>
                <div className="text-[10px] text-white/25 mt-0.5">{i.label}</div>
              </div>
            ))}
          </div>

          <div className="text-xs text-white/30 bg-white/[0.02] rounded-xl p-4 text-left space-y-1">
            <p>• คำถามจะ shuffle ทุกครั้ง</p>
            <p>• เลือกคำตอบแล้วเห็น explanation ก่อนข้อถัดไป</p>
            <p>• ผ่าน {exam.passingScore}% ขึ้นไปจะได้รับ Certificate</p>
            <p>• หมดเวลาระบบส่งอัตโนมัติ</p>
          </div>

          <button
            onClick={() => setPhase("exam")}
            className="w-full py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-semibold text-sm hover:bg-cyan-500/20 transition-all"
          >
            เริ่มสอบเลย →
          </button>
        </div>
      </div>
    );
  }

  /* RESULT */
  if (phase === "result") {
    const today = new Date().toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" });
    return (
      <div className="px-4 md:px-6 py-6 max-w-3xl mx-auto space-y-5">
        {/* Score card */}
        <div className={cn(
          "rounded-2xl border p-8 text-center space-y-3",
          passed ? "border-emerald-500/30 bg-emerald-500/[0.04]" : "border-rose-500/25 bg-rose-500/[0.04]",
        )}>
          <div className="text-5xl">{passed ? "🏆" : "📋"}</div>
          <div className={cn("text-4xl font-bold", passed ? "text-emerald-400" : "text-rose-400")}>
            {score}%
          </div>
          <div className="text-white/60 text-sm">
            {answers.filter(a => questions[a.questionIdx]?.answer === a.selected).length} / {questions.length} ข้อถูก
          </div>
          <div className={cn(
            "text-sm font-semibold px-4 py-2 rounded-lg inline-block",
            passed ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/10 text-rose-400",
          )}>
            {passed ? `✅ ผ่าน! — ${exam.certName}` : `❌ ไม่ผ่าน — ต้องการ ${exam.passingScore}%`}
          </div>
        </div>

        {/* Certificate */}
        {passed && (
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] p-5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-400">
              <Trophy size={14} /> Certificate
            </div>
            <CertSVG
              name="You"
              examTitle={exam.title}
              certName={exam.certName}
              score={score}
              date={today}
            />
            <button
              onClick={() => {
                const svgEl = document.querySelector("svg");
                if (!svgEl) return;
                const blob = new Blob([svgEl.outerHTML], { type: "image/svg+xml" });
                const url  = URL.createObjectURL(blob);
                const a    = document.createElement("a");
                a.href     = url;
                a.download = `${exam.id}-certificate.svg`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex items-center gap-2 text-xs text-amber-400/60 hover:text-amber-400 transition-colors"
            >
              <Download size={12} /> Download Certificate (SVG)
            </button>
          </div>
        )}

        {/* Review */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-white/50 uppercase tracking-widest">Review</h2>
          {questions.map((q, qi) => {
            const ans = answers.find(a => a.questionIdx === qi);
            const correct = ans?.selected === q.answer;
            return (
              <div key={q.id} className={cn(
                "rounded-xl border p-4 space-y-2",
                correct ? "border-emerald-500/15 bg-emerald-500/[0.03]" : "border-rose-500/15 bg-rose-500/[0.03]",
              )}>
                <div className="flex items-start gap-2">
                  {correct
                    ? <Check size={13} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    : <X     size={13} className="text-rose-400 mt-0.5 flex-shrink-0" />}
                  <p className="text-sm text-white/75">{q.question}</p>
                </div>
                {!correct && (
                  <div className="ml-5 text-[11px] space-y-0.5">
                    <p className="text-rose-400/70">คุณเลือก: {ans?.selected != null ? q.options[ans.selected] : "ไม่ได้ตอบ"}</p>
                    <p className="text-emerald-400/70">คำตอบที่ถูก: {q.options[q.answer]}</p>
                  </div>
                )}
                {q.explain && (
                  <p className="ml-5 text-[11px] text-white/30 bg-white/[0.03] rounded-lg px-2.5 py-1.5">
                    💡 {q.explain}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => { setPhase("intro"); setCurrent(0); setAnswers([]); shuffled.current = exam.questions.slice().sort(() => Math.random() - 0.5); }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-white/40 text-sm hover:border-white/20 hover:text-white/60 transition-all"
          >
            <RotateCcw size={13} /> สอบใหม่
          </button>
          <Link href="/exam" className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-white/40 text-sm hover:border-white/20 hover:text-white/60 transition-all">
            <Home size={13} /> Exam Center
          </Link>
          {exam.relatedCourse && (
            <Link href={`/courses/${exam.relatedCourse}`} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm hover:bg-cyan-500/20 transition-all ml-auto">
              <BookOpen size={13} /> ทบทวน Course
            </Link>
          )}
        </div>
      </div>
    );
  }

  /* EXAM */
  const q         = questions[current];
  const userAns   = answers.find(a => a.questionIdx === current);
  const answered  = userAns !== undefined;

  return (
    <div className="px-4 md:px-6 py-6 max-w-2xl mx-auto space-y-4">

      {/* Timer + Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all", timerSecs < 60 ? "bg-rose-500" : timerSecs < 180 ? "bg-amber-400" : "bg-cyan-500")}
            style={{ width: `${timerPct * 100}%` }}
          />
        </div>
        <div className={cn("flex items-center gap-1 text-xs font-mono flex-shrink-0", timerSecs < 60 ? "text-rose-400" : "text-white/40")}>
          <Clock size={11} /> {timerDisplay}
        </div>
        <span className="text-[11px] text-white/25">{current + 1}/{questions.length}</span>
      </div>

      {/* Question card */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 space-y-5">
        <div className="flex items-start gap-3">
          <span className="text-[11px] text-white/20 font-mono bg-white/[0.04] px-2 py-1 rounded-lg flex-shrink-0 mt-0.5">
            Q{current + 1}
          </span>
          <p className="text-base text-white/85 leading-relaxed">{q.question}</p>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {q.options.map((opt, oi) => {
            let style = "border-white/[0.07] bg-white/[0.02] text-white/60 hover:border-white/20 hover:bg-white/[0.05]";

            if (answered) {
              if (oi === q.answer) {
                style = "border-emerald-500/40 bg-emerald-500/10 text-emerald-300";
              } else if (oi === userAns?.selected && oi !== q.answer) {
                style = "border-rose-500/40 bg-rose-500/10 text-rose-300";
              } else {
                style = "border-white/[0.04] text-white/25 opacity-50";
              }
            }

            return (
              <button
                key={oi}
                disabled={answered}
                onClick={() => pickAnswer(oi)}
                className={cn("w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-150", style)}
              >
                <span className="font-mono text-[11px] mr-2 opacity-50">{String.fromCharCode(65 + oi)}.</span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showing && q.explain && (
          <div className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.07] text-sm text-white/45 leading-relaxed">
            <span className="text-amber-400/70 font-semibold">💡 Explanation: </span>
            {q.explain}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/[0.07] text-white/30 text-sm disabled:opacity-30 hover:border-white/15 hover:text-white/50 transition-all"
        >
          <ChevronLeft size={14} /> Prev
        </button>

        {/* Mini map */}
        <div className="flex-1 flex gap-1 flex-wrap justify-center">
          {questions.map((_, qi) => {
            const a = answers.find(x => x.questionIdx === qi);
            const c = a?.selected === questions[qi].answer;
            return (
              <button
                key={qi}
                onClick={() => { setShowing(false); setCurrent(qi); }}
                className={cn(
                  "w-5 h-5 rounded text-[9px] font-mono border transition-colors",
                  qi === current ? "border-cyan-500/50 bg-cyan-500/20 text-cyan-400" :
                  a !== undefined ? (c ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" : "border-rose-500/30 bg-rose-500/10 text-rose-400") :
                  "border-white/[0.06] text-white/15",
                )}
              >
                {qi + 1}
              </button>
            );
          })}
        </div>

        {current < questions.length - 1 ? (
          <button
            onClick={next}
            disabled={!showing}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm disabled:opacity-30 hover:bg-cyan-500/20 transition-all"
          >
            Next <ChevronRight size={14} />
          </button>
        ) : (
          <button
            onClick={submitExam}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-sm hover:bg-emerald-500/20 transition-all"
          >
            Submit <Check size={14} />
          </button>
        )}
      </div>

      {/* Progress text */}
      <p className="text-center text-[10px] text-white/20">
        ตอบแล้ว {answers.length}/{questions.length} ข้อ
        {answers.length === questions.length && " · พร้อม Submit"}
      </p>
    </div>
  );
}
