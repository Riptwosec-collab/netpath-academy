"use client";
import { useState } from "react";
import { Code2, CheckCircle2, XCircle, Eye, EyeOff, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ConfigEditorProps {
  title?:    string;
  template?: string;   // Skeleton with blanks like "ip address ___ ___"
  solution:  string;   // Correct config to compare against
  hint?:     string;
}

export default function LabConfigEditor({
  title    = "Configuration Editor",
  template = "",
  solution,
  hint,
}: ConfigEditorProps) {
  const [userInput,  setUserInput]  = useState(template);
  const [showSol,    setShowSol]    = useState(false);
  const [result,     setResult]     = useState<{ score: number; lines: { ok: boolean; user: string; expected: string }[] } | null>(null);
  const [copied,     setCopied]     = useState(false);

  function normalize(s: string) {
    return s.trim().replace(/\r\n/g, "\n").split("\n").map(l => l.trim()).filter(Boolean);
  }

  function compare() {
    const userLines = normalize(userInput);
    const solLines  = normalize(solution);

    const maxLen = Math.max(userLines.length, solLines.length);
    const lines = Array.from({ length: maxLen }, (_, i) => {
      const u = userLines[i] ?? "";
      const e = solLines[i] ?? "";
      return { ok: u.toLowerCase() === e.toLowerCase(), user: u, expected: e };
    });

    const score = Math.round((lines.filter(l => l.ok).length / Math.max(solLines.length, 1)) * 100);
    setResult({ score, lines });
  }

  function copyConfig() {
    navigator.clipboard.writeText(solution).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const scoreColor =
    !result           ? ""               :
    result.score >= 90 ? "text-emerald-400" :
    result.score >= 60 ? "text-amber-400"   :
    "text-red-400";

  return (
    <div className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.02]">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.07] bg-white/[0.03]">
        <Code2 size={13} className="text-violet-400" />
        <span className="text-xs font-semibold text-white/60">{title}</span>
        {result && (
          <span className={cn("ml-auto text-xs font-bold", scoreColor)}>
            Score: {result.score}%
          </span>
        )}
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.07]">
        {/* Left: User input */}
        <div className="flex flex-col">
          <div className="px-3 py-1.5 border-b border-white/[0.07] text-[10px] text-white/20 uppercase tracking-widest">
            Your Configuration
          </div>
          <textarea
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            className="flex-1 p-3 bg-transparent text-[11px] font-mono text-white/65 resize-none outline-none min-h-[200px] leading-relaxed placeholder:text-white/15"
            placeholder={`! Type your Cisco IOS config here\n!\nhostname Router\n!`}
            spellCheck={false}
          />
        </div>

        {/* Right: Expected / diff */}
        <div className="flex flex-col">
          <div className="flex items-center px-3 py-1.5 border-b border-white/[0.07]">
            <span className="text-[10px] text-white/20 uppercase tracking-widest flex-1">
              {result ? "Line-by-line Diff" : "Expected Solution"}
            </span>
            <button
              onClick={() => setShowSol(s => !s)}
              className="flex items-center gap-1 text-[10px] text-white/25 hover:text-white/50 transition-colors mr-2"
            >
              {showSol ? <EyeOff size={10} /> : <Eye size={10} />}
              {showSol ? "Hide" : "Reveal"}
            </button>
            <button
              onClick={copyConfig}
              className="flex items-center gap-1 text-[10px] text-white/25 hover:text-white/50 transition-colors"
            >
              {copied ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="p-3 min-h-[200px] text-[11px] font-mono leading-relaxed overflow-y-auto">
            {result ? (
              result.lines.map((l, i) => (
                <div key={i} className={cn("flex items-start gap-2 py-0.5 px-1 rounded", l.ok ? "bg-emerald-500/[0.06]" : "bg-red-500/[0.06]")}>
                  {l.ok
                    ? <CheckCircle2 size={10} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    : <XCircle      size={10} className="text-red-400 mt-0.5 flex-shrink-0" />}
                  <div className="min-w-0 flex-1">
                    <div className={l.ok ? "text-emerald-300/80" : "text-red-300/70"}>{l.user || <em className="opacity-40">empty</em>}</div>
                    {!l.ok && (
                      <div className="text-white/25 text-[10px] mt-0.5">Expected: {l.expected}</div>
                    )}
                  </div>
                </div>
              ))
            ) : showSol ? (
              <pre className="text-white/40 whitespace-pre-wrap">{solution}</pre>
            ) : (
              <div className="flex items-center justify-center h-full text-white/15 text-xs">
                Click Reveal to see expected config
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-t border-white/[0.07] bg-white/[0.02]">
        {hint && (
          <span className="text-[11px] text-amber-400/50 flex-1 truncate">💡 {hint}</span>
        )}
        <button
          onClick={() => { setResult(null); setUserInput(template); }}
          className="ml-auto text-[11px] text-white/25 hover:text-white/50 transition-colors px-3 py-1"
        >
          Reset
        </button>
        <button
          onClick={compare}
          className="px-4 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium hover:bg-violet-500/20 transition-colors"
        >
          Check Config
        </button>
      </div>
    </div>
  );
}
