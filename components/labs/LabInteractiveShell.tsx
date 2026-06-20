"use client";
import { useState } from "react";
import { Terminal, ListChecks, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import LabTerminal    from "./LabTerminal";
import LabStepTracker from "./LabStepTracker";
import LabConfigEditor from "./LabConfigEditor";
import type { Step } from "./LabStepTracker";

type Tab = "steps" | "terminal" | "config";

interface Props {
  labId:            string;
  hostname:         string;
  terminalCommands: Record<string, string>;
  steps:            Step[];
  configTemplate:   string;
  configSolution:   string;
}

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "steps",    label: "Step Tracker",        icon: ListChecks },
  { id: "terminal", label: "CLI Terminal",         icon: Terminal   },
  { id: "config",   label: "Config Editor",        icon: Code2      },
];

export default function LabInteractiveShell({
  labId,
  hostname,
  terminalCommands,
  steps,
  configTemplate,
  configSolution,
}: Props) {
  const [active, setActive] = useState<Tab>("steps");
  const [xp,     setXp]     = useState(0);
  const [done,   setDone]   = useState(0);
  const [cmds,   setCmds]   = useState(0);

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
      {/* Panel header */}
      <div className="flex items-center gap-1 px-4 py-2.5 border-b border-white/[0.07] bg-white/[0.03]">
        <span className="text-[11px] font-semibold text-white/40 mr-2 uppercase tracking-widest">
          Interactive Lab
        </span>

        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
              active === t.id
                ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20"
                : "text-white/30 hover:text-white/55 hover:bg-white/[0.04]",
            )}
          >
            <t.icon size={12} />
            {t.label}
          </button>
        ))}

        {/* Live stats */}
        <div className="ml-auto flex items-center gap-3 text-[10px] text-white/20">
          {done > 0 && (
            <span className="text-emerald-400/70">✓ {done} tasks</span>
          )}
          {xp  > 0 && (
            <span className="text-amber-400/60">+{xp} XP</span>
          )}
          {cmds > 0 && (
            <span className="text-white/25">{cmds} cmds</span>
          )}
        </div>
      </div>

      {/* Tab content */}
      <div className="p-4">
        {active === "steps" && (
          <LabStepTracker
            steps={steps}
            onComplete={(doneCount, _, totalXp) => {
              setDone(doneCount);
              setXp(totalXp);
            }}
          />
        )}

        {active === "terminal" && (
          <div className="space-y-3">
            <p className="text-xs text-white/35">
              พิมพ์คำสั่ง Cisco IOS เหมือนใช้จริง — กด <kbd className="bg-white/10 px-1.5 rounded text-[10px]">Enter</kbd> เพื่อรัน
            </p>
            <LabTerminal
              hostname={hostname}
              commands={terminalCommands}
              welcome={`Lab: ${labId} — type ? to see available commands`}
              onCommand={(_, matched) => {
                if (matched) setCmds(n => n + 1);
              }}
            />
            <div className="text-[10px] text-white/20 mt-2">
              คำสั่งที่ใช้ได้ใน Lab นี้: {Object.keys(terminalCommands).map(k => (
                <code key={k} className="mx-1 bg-white/[0.05] px-1 rounded font-mono">{k}</code>
              ))}
            </div>
          </div>
        )}

        {active === "config" && (
          <div className="space-y-3">
            <p className="text-xs text-white/35">
              เติม configuration ที่ถูกต้องแล้วกด <strong className="text-white/50">Check Config</strong> เพื่อเปรียบเทียบกับ expected
            </p>
            <LabConfigEditor
              title={`${hostname} Configuration`}
              template={configTemplate}
              solution={configSolution}
              hint="กรอก IP address, subnet mask, protocol หรือ keyword ที่หายไป"
            />
          </div>
        )}
      </div>
    </div>
  );
}
