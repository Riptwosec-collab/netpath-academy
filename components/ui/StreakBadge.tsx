"use client";

import { useEffect, useState } from "react";
import { getStreak, touchStreak } from "@/lib/progress";

interface StreakBadgeProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function StreakBadge({ size = "md", className = "" }: StreakBadgeProps) {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    touchStreak();
    setStreak(getStreak());
  }, []);

  const sizeMap = {
    sm: { text: "text-[11px]", icon: "text-sm", px: "px-2 py-0.5" },
    md: { text: "text-xs",     icon: "text-base", px: "px-2.5 py-1" },
    lg: { text: "text-sm",     icon: "text-lg",   px: "px-3 py-1.5" },
  };
  const s = sizeMap[size];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-orange-500/10 border border-orange-500/20 font-semibold text-orange-400 ${s.px} ${s.text} ${className}`}
      title={`${streak} day streak`}
    >
      <span className={s.icon} aria-hidden="true">🔥</span>
      <span>{streak}</span>
      {size !== "sm" && <span className="text-orange-400/60 font-normal">days</span>}
    </span>
  );
}
