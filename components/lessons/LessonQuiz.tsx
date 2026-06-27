"use client";

import { useState } from "react";
import Link from "next/link";

interface QuizQuestion {
  question: string;
  choices: string[];
  answer: string;
  explanation: string;
}

interface Props {
  lessonTitle: string;
  lessonSlug: string;
  backHref: string;       // /foundation/lessons/slug
  questions: QuizQuestion[];
  xp: number;
}

export default function LessonQuiz({ lessonTitle, lessonSlug, backHref, questions, xp }: Props) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(questions.length).fill(null));
  const [done, setDone] = useState(false);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#050816] text-gray-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">ยังไม่มี Quiz สำหรับ lesson นี้</p>
          <Link href={backHref} className="text-cyan-400 hover:underline text-sm">← กลับไป Lesson</Link>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const score = answers.filter((a, i) => a === questions[i].answer).length;
  const pct = Math.round((score / questions.length) * 100);

  function handleSelect(choice: string) {
    if (selected !== null) return;          // already answered
    const next = [...answers];
    next[current] = choice;
    setAnswers(next);
    setSelected(choice);
    setShowAnswer(true);
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrent(current + 1);
      setSelected(null);
      setShowAnswer(false);
    }
  }

  function handleReveal() {
    setShowAnswer(true);
  }

  // ─── Results Screen ─────────────────────────────────────────────
  if (done) {
    return (
      <div className="min-h-screen bg-[#050816] text-gray-200">
        <div className="max-w-2xl mx-auto px-6 py-12">
          {/* Score card */}
          <div className={`rounded-2xl border p-8 text-center mb-8 ${
            pct >= 75
              ? "border-emerald-500/30 bg-emerald-500/5"
              : pct >= 50
              ? "border-yellow-500/30 bg-yellow-500/5"
              : "border-red-500/30 bg-red-500/5"
          }`}>
            <div className="text-6xl mb-3">
              {pct >= 75 ? "🏆" : pct >= 50 ? "📚" : "💪"}
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Quiz เสร็จสิ้น!</h1>
            <p className="text-gray-400 text-sm mb-4">{lessonTitle}</p>
            <div className="text-5xl font-bold text-white mb-1">{score}/{questions.length}</div>
            <div className={`text-lg font-semibold mb-4 ${
              pct >= 75 ? "text-emerald-400" : pct >= 50 ? "text-yellow-400" : "text-red-400"
            }`}>{pct}%</div>
            {pct >= 75 && (
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-4 py-2 text-yellow-400 text-sm font-semibold">
                🎉 ผ่านแล้ว! ได้ +{xp} XP
              </div>
            )}
          </div>

          {/* Review all answers */}
          <h2 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4">เฉลยทุกข้อ</h2>
          <div className="space-y-4 mb-8">
            {questions.map((question, i) => {
              const userAns = answers[i];
              const correct = userAns === question.answer;
              return (
                <div key={i} className={`rounded-xl border p-4 ${
                  correct
                    ? "border-emerald-500/25 bg-emerald-500/5"
                    : "border-red-500/25 bg-red-500/5"
                }`}>
                  <div className="flex items-start gap-2 mb-3">
                    <span className={`text-sm shrink-0 font-bold ${correct ? "text-emerald-400" : "text-red-400"}`}>
                      {correct ? "✓" : "✗"}
                    </span>
                    <p className="text-sm text-gray-200 font-medium">{i + 1}. {question.question}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-1.5 mb-3 pl-5">
                    {question.choices.map((c, ci) => (
                      <div key={ci} className={`text-xs px-2.5 py-1.5 rounded-lg border ${
                        c === question.answer
                          ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300 font-medium"
                          : c === userAns && !correct
                          ? "border-red-500/40 bg-red-500/10 text-red-300 line-through"
                          : "border-gray-700/30 text-gray-500"
                      }`}>
                        {String.fromCharCode(65 + ci)}. {c}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 pl-5 border-t border-white/[0.05] pt-2">
                    💡 {question.explanation}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={backHref}
              className="px-5 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 text-sm transition-colors"
            >
              ← กลับไป Lesson
            </Link>
            {pct < 75 && (
              <button
                onClick={() => {
                  setCurrent(0); setSelected(null); setShowAnswer(false);
                  setAnswers(Array(questions.length).fill(null)); setDone(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 text-sm transition-colors"
              >
                🔄 ทำซ้ำ
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── Question Screen ─────────────────────────────────────────────
  const isCorrect = selected === q.answer;

  return (
    <div className="min-h-screen bg-[#050816] text-gray-200">
      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href={backHref} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
            ← Lesson
          </Link>
          <span className="text-xs text-gray-500">{lessonTitle}</span>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>ข้อ {current + 1} จาก {questions.length}</span>
            <span>{Math.round(((current) / questions.length) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full transition-all duration-500"
              style={{ width: `${((current) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 mb-4">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">ข้อ {current + 1}</div>
          <h2 className="text-base font-semibold text-white leading-relaxed mb-6">{q.question}</h2>

          {/* Choices */}
          <div className="space-y-2.5">
            {q.choices.map((choice, ci) => {
              let style = "border-white/[0.08] bg-white/[0.02] text-gray-300 hover:border-white/20 hover:bg-white/[0.05] cursor-pointer";
              if (selected !== null) {
                if (choice === q.answer) {
                  style = "border-emerald-500/50 bg-emerald-500/10 text-emerald-300 font-medium";
                } else if (choice === selected) {
                  style = "border-red-500/50 bg-red-500/10 text-red-300";
                } else {
                  style = "border-white/[0.05] bg-transparent text-gray-600";
                }
              }
              return (
                <button
                  key={ci}
                  onClick={() => handleSelect(choice)}
                  disabled={selected !== null}
                  className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-all duration-150 ${style}`}
                >
                  <span className="w-6 h-6 shrink-0 rounded-full border border-current flex items-center justify-center text-xs font-bold opacity-60">
                    {String.fromCharCode(65 + ci)}
                  </span>
                  {choice}
                  {selected !== null && choice === q.answer && (
                    <span className="ml-auto text-emerald-400 text-base">✓</span>
                  )}
                  {selected !== null && choice === selected && choice !== q.answer && (
                    <span className="ml-auto text-red-400 text-base">✗</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {showAnswer && (
          <div className={`rounded-xl border p-4 mb-4 ${
            isCorrect
              ? "border-emerald-500/25 bg-emerald-500/5"
              : "border-amber-500/25 bg-amber-500/5"
          }`}>
            {selected !== null && (
              <p className={`text-sm font-semibold mb-1 ${isCorrect ? "text-emerald-400" : "text-amber-400"}`}>
                {isCorrect ? "✓ ถูกต้อง!" : `✗ ผิด — คำตอบที่ถูกคือ: ${q.answer}`}
              </p>
            )}
            <p className="text-xs text-gray-300 leading-relaxed">💡 {q.explanation}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3">
          {!showAnswer && selected === null ? (
            <button
              onClick={handleReveal}
              className="px-4 py-2 rounded-xl border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 text-sm transition-colors"
            >
              👁 ดูเฉลย
            </button>
          ) : (
            <div />
          )}

          {(selected !== null || showAnswer) && (
            <button
              onClick={handleNext}
              className="ml-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-semibold transition-colors"
            >
              {current + 1 >= questions.length ? "ดูผลลัพธ์ 🏁" : "ข้อต่อไป →"}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
