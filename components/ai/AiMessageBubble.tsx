import type { AiMessage } from "@/lib/mockAiTutor";

/* Minimal markdown-like renderer: code blocks, headers, bold, lists */
function renderContent(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <div key={i} className="my-2 rounded-lg overflow-hidden border border-white/[0.08]">
          {lang && (
            <div className="flex items-center justify-between px-3 py-1.5 bg-white/[0.04] border-b border-white/[0.06]">
              <span className="text-[10px] text-white/30 font-mono uppercase">{lang}</span>
            </div>
          )}
          <pre className="p-3 bg-[#080d1a] overflow-x-auto text-xs leading-relaxed">
            <code className="text-[#38bdf8]/80 font-mono">{codeLines.join("\n")}</code>
          </pre>
        </div>
      );
      i++;
      continue;
    }

    // Table row (starts with |)
    if (line.startsWith("|")) {
      const tableRows: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        if (!lines[i].match(/^\|[-| ]+\|$/)) tableRows.push(lines[i]);
        i++;
      }
      if (tableRows.length > 0) {
        const headers = tableRows[0].split("|").filter(Boolean).map((c) => c.trim());
        const rows = tableRows.slice(1).map((r) =>
          r.split("|").filter(Boolean).map((c) => c.trim())
        );
        elements.push(
          <div key={i} className="my-2 overflow-x-auto rounded-lg border border-white/[0.08]">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/[0.04] border-b border-white/[0.06]">
                  {headers.map((h, hi) => (
                    <th key={hi} className="px-3 py-2 text-left text-white/50 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-white/[0.04] last:border-0">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-3 py-2 text-white/60">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-sm font-bold text-white/90 mt-3 mb-1">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-xs font-semibold text-[#38bdf8]/80 mt-2 mb-0.5">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // HR
    if (line.startsWith("---")) {
      elements.push(<hr key={i} className="border-white/[0.07] my-3" />);
      i++;
      continue;
    }

    // List item
    if (line.match(/^[-*] /) || line.match(/^\d+\. /)) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].match(/^[-*] /) || lines[i].match(/^\d+\. /) || lines[i].match(/^- \[/))) {
        listItems.push(lines[i]);
        i++;
      }
      elements.push(
        <ul key={i} className="flex flex-col gap-0.5 my-1 pl-1">
          {listItems.map((item, li) => {
            const isChecked = item.startsWith("- [x]");
            const isUnchecked = item.startsWith("- [ ]");
            const text = item.replace(/^[-*\d.] /, "").replace(/^\[.\] /, "");
            return (
              <li key={li} className="flex items-start gap-2 text-xs text-white/60 leading-relaxed">
                {isChecked ? (
                  <span className="text-[#22c55e] mt-0.5 flex-shrink-0">✓</span>
                ) : isUnchecked ? (
                  <span className="text-white/25 mt-0.5 flex-shrink-0">☐</span>
                ) : (
                  <span className="text-[#38bdf8]/50 mt-1.5 w-1 h-1 rounded-full bg-current flex-shrink-0" />
                )}
                <span dangerouslySetInnerHTML={{ __html: formatInline(text) }} />
              </li>
            );
          })}
        </ul>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      elements.push(<div key={i} className="h-1" />);
      i++;
      continue;
    }

    // Bold **text** header bold line
    elements.push(
      <p key={i} className="text-xs text-white/70 leading-relaxed"
         dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
    );
    i++;
  }

  return <div className="flex flex-col gap-0.5">{elements}</div>;
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white/90 font-semibold">$1</strong>')
    .replace(/`(.+?)`/g, '<code class="px-1 py-0.5 rounded bg-white/[0.07] text-[#38bdf8]/80 text-[11px] font-mono">$1</code>');
}

export default function AiMessageBubble({ message }: { message: AiMessage }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-tr-sm
                        bg-gradient-to-br from-[#38bdf8]/15 to-[#8b5cf6]/10
                        border border-[#38bdf8]/20 text-xs text-white/80 leading-relaxed whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      {/* AI avatar */}
      <div className="w-7 h-7 rounded-lg flex-shrink-0 bg-gradient-to-br from-[#38bdf8]/20 to-[#8b5cf6]/20
                      border border-[#38bdf8]/25 flex items-center justify-center mt-0.5">
        <svg className="w-3.5 h-3.5 text-[#38bdf8]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0 px-4 py-3 rounded-2xl rounded-tl-sm
                      bg-white/[0.04] border border-white/[0.08]">
        {renderContent(message.content)}
        <p className="text-[10px] text-white/20 mt-2">{message.createdAt}</p>
      </div>
    </div>
  );
}
