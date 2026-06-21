"use client";

import { useEffect, useState, useCallback } from "react";
import { CheckCircle2, Trophy } from "lucide-react";
import { isLessonCompleted, markLessonComplete, type ProgressData } from "@/lib/progress";
import { cn } from "@/lib/utils";

interface LessonCompleteButtonProps {
  lessonId:  string;
  track:     string;
  xp:        number;
  className?: string;
  onComplete?: (data: ProgressData) => void;
}

export default function LessonCompleteButton({
  lessonId, track, xp, className, onComplete,
}: LessonCompleteButtonProps) {
  const [done,    setDone]    = useState(false);
  const [popped,  setPopped]  = useState(false);

  useEffect(() => {
    setDone(isLessonCompleted(lessonId));
  }, [lessonId]);

  const handleComplete = useCallback(() => {
    if (done) return;
    const data = markLessonComplete({ id: lessonId, track, xp });
    setDone(true);
    setPopped(true);
    onComplete?.(data);
    setTimeout(() => setPopped(false), 2000);
  }, [done, lessonId, track, xp, onComplete]);

  if (done) {
    return (
      <span className={cn(
        "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl",
        "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium",
        className,
      )}>
        <CheckCircle2 size={16} />
        เรียนจบแล้ว • +{xp} XP
      </span>
    );
  }

  return (
    <div className="relative">
      {popped && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap animate-bounce z-10">
          <Trophy size={13} />
          +{xp} XP ได้แล้ว!
        </div>
      )}
      <button
        onClick={handleComplete}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200",
          "bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-500/40",
          "text-cyan-400 hover:text-cyan-300 text-sm font-medium active:scale-95",
          className,
        )}
      >
        <CheckCircle2 size={16} />
        Mark as Complete &nbsp;·&nbsp; +{xp} XP
      </button>
    </div>
  );
}
