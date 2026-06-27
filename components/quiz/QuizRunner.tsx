"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Quiz } from "@/data/quizzes";
import QuizProgress  from "./QuizProgress";
import QuestionCard  from "./QuestionCard";
import QuizResult    from "./QuizResult";
import AnswerReview  from "./AnswerReview";

export default function QuizRunner({ quiz, onBack }: { quiz: Quiz; onBack?: () => void }) {
  const router = useRouter();
  const handleBack = onBack ?? (() => router.push("/quiz"));

  /* ── State ────────────────────────────────────────────────────── */
  const [currentIdx,       setCurrentIdx]       = useState(0);
  const [selectedAnswers,  setSelectedAnswers]   = useState<(string | null)[]>(
    Array(quiz.questions.length).fill(null)
  );
  const [showExplanation,  setShowExplanation]   = useState(false);
  const [isSubmitted,      setIsSubmitted]       = useState(false);
  const [showReview,       setShowReview]        = useState(false);
  const [validationError,  setValidationError]   = useState(false);

  /* ── Derived ──────────────────────────────────────────────────── */
  const question   = quiz.questions[currentIdx];
  const isLast     = currentIdx === quiz.questions.length - 1;
  const selected   = selectedAnswers[currentIdx] ?? null;

  const score = quiz.questions.reduce((acc, q, i) => {
    return acc + (selectedAnswers[i] === q.correctAnswer ? 1 : 0);
  }, 0);

  /* ── Handlers ─────────────────────────────────────────────────── */
  function handleSelect(answer: string) {
    if (showExplanation) return;
    setValidationError(false);
    const next = [...selectedAnswers];
    next[currentIdx] = answer;
    setSelectedAnswers(next);
  }

  function handleConfirm() {
    if (!selectedAnswers[currentIdx]) {
      setValidationError(true);
      return;
    }
    setShowExplanation(true);
    setValidationError(false);
  }

  function handleNext() {
    if (currentIdx < quiz.questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setShowExplanation(false);
      setValidationError(false);
    }
  }

  function handlePrev() {
    if (currentIdx > 0) {
      setCurrentIdx((i) => i - 1);
      setShowExplanation(!!selectedAnswers[currentIdx - 1]);
      setValidationError(false);
    }
  }

  function handleSubmit() {
    if (!selectedAnswers[currentIdx]) {
      setValidationError(true);
      return;
    }
    setShowExplanation(true);
    setIsSubmitted(true);
  }

  function handleRetry() {
    setCurrentIdx(0);
    setSelectedAnswers(Array(quiz.questions.length).fill(null));
    setShowExplanation(false);
    setIsSubmitted(false);
    setShowReview(false);
    setValidationError(false);
  }

  /* ── Render: Review ───────────────────────────────────────────── */
  if (showReview) {
    return (
      <AnswerReview
        questions={quiz.questions}
        selectedAnswers={selectedAnswers}
        onBack={() => setShowReview(false)}
      />
    );
  }

  /* ── Render: Result ───────────────────────────────────────────── */
  if (isSubmitted && showExplanation) {
    // Wait for user to click "Submit" then show result
    // Determine if we should show result or current last question
    const allAnswered = selectedAnswers.every((a) => a !== null);

    if (allAnswered) {
      return (
        <div className="flex flex-col gap-5">
          {/* Show last question explanation first */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
            <p className="text-xs text-white/30 mb-3 uppercase tracking-wide font-medium">
              ข้อสุดท้าย — ข้อที่ {quiz.questions.length}
            </p>
            <QuestionCard
              question={question}
              selectedAnswer={selected}
              showExplanation={showExplanation}
              onSelect={handleSelect}
            />
          </div>

          {/* Result card */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 md:p-6">
            <p className="text-xs text-white/30 mb-4 uppercase tracking-wide font-medium text-center">
              ผลการทดสอบ
            </p>
            <QuizResult
              quiz={quiz}
              score={score}
              selectedAnswers={selectedAnswers}
              onRetry={handleRetry}
              onReview={() => setShowReview(true)}
              onBack={handleBack}
            />
          </div>
        </div>
      );
    }
  }

  /* ── Render: Quiz in progress ────────────────────────────────── */
  return (
    <div className="flex flex-col gap-4">
      {/* Progress */}
      <QuizProgress current={currentIdx + 1} total={quiz.questions.length} />

      {/* Question */}
      <QuestionCard
        question={question}
        selectedAnswer={selected}
        showExplanation={showExplanation}
        onSelect={handleSelect}
      />

      {/* Validation error */}
      {validationError && (
        <p className="text-xs text-[#facc15]/80 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          กรุณาเลือกคำตอบก่อนดำเนินการต่อ
        </p>
      )}

      {/* Navigation buttons */}
      <div className="flex items-center gap-3">
        {/* Previous */}
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/[0.08]
                     text-white/40 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed
                     hover:border-white/20 hover:text-white/60 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          ก่อนหน้า
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Confirm / Next / Submit */}
        {!showExplanation ? (
          /* Not yet answered this question */
          <button
            onClick={handleConfirm}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                       bg-[#38bdf8]/15 border border-[#38bdf8]/35 text-[#38bdf8] text-sm font-medium
                       hover:bg-[#38bdf8]/25 hover:border-[#38bdf8]/60 transition-all"
          >
            ยืนยันคำตอบ
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        ) : isLast ? (
          /* Last question answered — show Submit */
          <button
            onClick={handleSubmit}
            disabled={isSubmitted}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                       bg-[#22c55e]/15 border border-[#22c55e]/35 text-[#22c55e] text-sm font-medium
                       hover:bg-[#22c55e]/25 hover:border-[#22c55e]/60 transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ส่งคำตอบ
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        ) : (
          /* Question answered, not last */
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                       bg-[#38bdf8]/15 border border-[#38bdf8]/35 text-[#38bdf8] text-sm font-medium
                       hover:bg-[#38bdf8]/25 hover:border-[#38bdf8]/60 transition-all"
          >
            คำถามถัดไป
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Question dots */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {quiz.questions.map((_, i) => {
          const ans     = selectedAnswers[i];
          const correct = quiz.questions[i].correctAnswer;
          const isCurr  = i === currentIdx;
          let dotColor  = "bg-white/[0.08]";
          if (isCurr)          dotColor = "bg-[#38bdf8]/60 ring-2 ring-[#38bdf8]/30";
          else if (ans === correct) dotColor = "bg-[#22c55e]/60";
          else if (ans !== null)    dotColor = "bg-[#ef4444]/50";

          return (
            <button
              key={i}
              onClick={() => { setCurrentIdx(i); setShowExplanation(!!selectedAnswers[i]); }}
              className={`w-5 h-5 rounded-full transition-all ${dotColor}`}
              title={`ข้อที่ ${i + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
