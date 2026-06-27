"use client";
import { useEffect, useRef } from "react";

interface Props { chart: string }

export default function MermaidDiagram({ chart }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          darkMode: true,
          background: "#0a0f1e",
          primaryColor: "#0e7490",
          primaryTextColor: "#e2e8f0",
          primaryBorderColor: "#164e63",
          lineColor: "#64748b",
          secondaryColor: "#1e293b",
          tertiaryColor: "#0f172a",
          edgeLabelBackground: "#1e293b",
          clusterBkg: "#0f172a",
          titleColor: "#94a3b8",
          nodeTextColor: "#e2e8f0",
        },
      });

      if (!ref.current || cancelled) return;
      const id = `mermaid-${Math.random().toString(36).slice(2)}`;
      try {
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
          // make SVG responsive
          const svgEl = ref.current.querySelector("svg");
          if (svgEl) {
            svgEl.style.width = "100%";
            svgEl.style.height = "auto";
            svgEl.style.maxWidth = "100%";
          }
        }
      } catch {
        if (!cancelled && ref.current) {
          ref.current.innerHTML = `<pre class="text-xs text-red-400 p-4">${chart}</pre>`;
        }
      }
    }

    render();
    return () => { cancelled = true; };
  }, [chart]);

  return (
    <div
      ref={ref}
      className="w-full overflow-x-auto rounded-xl bg-[#0a0f1e] p-4 text-xs text-gray-400"
    >
      <span className="animate-pulse">กำลังโหลดแผนภาพ...</span>
    </div>
  );
}
