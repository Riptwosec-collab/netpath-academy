"use client";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Terminal, RotateCcw, HelpCircle } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────── */
interface Line {
  kind: "prompt" | "output" | "info" | "error";
  text: string;
}

export interface LabTerminalProps {
  hostname?:       string;
  /** Lab-specific commands: key = command string, value = expected output */
  commands?:       Record<string, string>;
  /** Welcome message shown on mount */
  welcome?:        string;
  /** Called whenever user runs a command */
  onCommand?:      (cmd: string, matched: boolean) => void;
}

/* ─── Built-in global commands ────────────────────────────────────── */
const GLOBAL: Record<string, string> = {
  "?": `Exec commands:
  ping         Send echo messages
  show         Show running system information
  traceroute   Trace route to destination
  clear        Clear screen
  enable       Enter privileged EXEC mode
  exit         Exit current mode
  help         Description of interactive help`,

  "help":
    "Use ? for interactive help. Arrow Up/Down for command history.",

  "show version":
    `Cisco IOS Software, Version 15.7(3)M5
ROM: Bootstrap program is IOSv
System image file is "flash0:/vios-adventerprisek9-m"
Uptime: 0 days, 0 hours, 12 minutes
Processor board ID 9KIBK2XS3M
License Level: adventerprise`,

  "show clock":
    new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" }) + " ICT",

  "show users":
    `    Line       User       Host(s)              Idle       Location
*  1 vty 0    admin      idle                 00:00:00  192.168.1.100`,

  "enable": `% Already in privileged EXEC mode.`,

  "exit": `% Connection closed. Type 'clear' to reset terminal.`,
};

/* ─── Component ───────────────────────────────────────────────────── */
export default function LabTerminal({
  hostname     = "Router",
  commands     = {},
  welcome,
  onCommand,
}: LabTerminalProps) {
  const allCmds: Record<string, string> = { ...GLOBAL, ...commands };

  const initLines: Line[] = [
    { kind: "info", text: "╔══════════════════════════════════════════╗" },
    { kind: "info", text: "║  NetPath Academy — IOS Simulator          ║" },
    { kind: "info", text: "║  Type ? for commands  |  ↑↓ history       ║" },
    { kind: "info", text: "╚══════════════════════════════════════════╝" },
    ...(welcome ? [{ kind: "info" as const, text: welcome }] : []),
  ];

  const [lines,      setLines]     = useState<Line[]>(initLines);
  const [input,      setInput]     = useState("");
  const [history,    setHistory]   = useState<string[]>([]);
  const [histIdx,    setHistIdx]   = useState(-1);
  const [cmdCount,   setCmdCount]  = useState(0);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  /* ── Execute ──────────────────────────────────────────────────── */
  function run(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;

    const key    = cmd.toLowerCase();
    const match  = Object.keys(allCmds).find(k => k.toLowerCase() === key);

    let output = "";
    let matched = true;

    if (match) {
      output = allCmds[match];
    } else if (key === "clear" || key === "cls") {
      setLines(initLines);
      setInput("");
      return;
    } else if (key.startsWith("ping ")) {
      const ip = cmd.slice(5).trim();
      const success = !ip.includes("0.0.0") && ip !== "";
      output = success
        ? `Type escape sequence to abort.\nSending 5, 100-byte ICMP Echos to ${ip}, timeout is 2 seconds:\n!!!!!\nSuccess rate is 100 percent (5/5), round-trip min/avg/max = 1/2/4 ms`
        : `Type escape sequence to abort.\nSending 5, 100-byte ICMP Echos to ${ip}, timeout is 2 seconds:\n.....\nSuccess rate is 0 percent (0/5)`;
    } else if (key.startsWith("traceroute ")) {
      const ip = cmd.slice(11).trim();
      output = `Tracing the route to ${ip}\n  1  192.168.1.1 4 msec 2 msec 3 msec\n  2  ${ip} 8 msec 7 msec 9 msec`;
    } else if (key === "?" || key.endsWith(" ?")) {
      const prefix = key.replace(/\s*\?$/, "").trim();
      const matches = Object.keys(allCmds)
        .filter(k => k.toLowerCase().startsWith(prefix))
        .map(k => `  ${k}`);
      output = matches.length
        ? matches.join("\n")
        : `% No commands found matching "${prefix}"`;
    } else {
      output  = `% Unrecognized command found at '^' marker.\n  "${cmd}"\n         ^\nType ? to see available commands`;
      matched = false;
    }

    setHistory(h => [cmd, ...h.slice(0, 49)]);
    setHistIdx(-1);
    setCmdCount(n => n + 1);
    onCommand?.(cmd, matched);

    setLines(prev => [
      ...prev,
      { kind: "prompt", text: `${hostname}# ${cmd}` },
      ...(output ? [{ kind: (matched ? "output" : "error") as "output" | "error", text: output }] : []),
    ]);
    setInput("");
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter")     { run(input); }
    if (e.key === "ArrowUp")   { const i = Math.min(histIdx + 1, history.length - 1); setHistIdx(i); setInput(history[i] ?? ""); }
    if (e.key === "ArrowDown") { const i = Math.max(histIdx - 1, -1); setHistIdx(i); setInput(i === -1 ? "" : history[i]); }
    if (e.key === "Tab")       { e.preventDefault(); /* autocomplete placeholder */ }
  }

  /* ── Render ──────────────────────────────────────────────────── */
  return (
    <div className="rounded-xl border border-white/10 overflow-hidden bg-[#090c10] font-mono text-xs">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border-b border-white/[0.07]">
        <span className="flex gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </span>
        <Terminal size={11} className="text-green-400 ml-1" />
        <span className="text-white/40 text-[10px]">{hostname} — Cisco IOS Simulator</span>
        <span className="ml-auto text-[10px] text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Connected
        </span>
        <button
          onClick={() => { setLines(initLines); setInput(""); setHistIdx(-1); setCmdCount(0); }}
          className="ml-2 text-white/25 hover:text-white/60 transition-colors"
          title="Reset terminal"
        >
          <RotateCcw size={11} />
        </button>
      </div>

      {/* Output area */}
      <div
        className="p-3 h-72 overflow-y-auto cursor-text space-y-0.5 scrollbar-thin scrollbar-thumb-white/10"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((l, i) => (
          <div key={i} className={
            l.kind === "info"   ? "text-cyan-400/60" :
            l.kind === "prompt" ? "text-emerald-400" :
            l.kind === "error"  ? "text-red-400/80"  :
            "text-white/70"
          }>
            <pre className="whitespace-pre-wrap font-mono leading-relaxed">{l.text}</pre>
          </div>
        ))}

        {/* Active input line */}
        <div className="flex items-center gap-1 mt-1">
          <span className="text-emerald-400 select-none">{hostname}#</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            className="bg-transparent outline-none text-emerald-300 flex-1 caret-emerald-400 min-w-0"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
          />
          <span className="animate-pulse text-emerald-400 select-none">▋</span>
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 px-3 py-1.5 bg-white/[0.02] border-t border-white/[0.06] text-[10px] text-white/25">
        <HelpCircle size={10} />
        <span>Type <kbd className="bg-white/10 px-1 rounded">?</kbd> for help</span>
        <span>·</span>
        <span>Commands run: {cmdCount}</span>
        <span className="ml-auto">↑↓ History</span>
      </div>
    </div>
  );
}
