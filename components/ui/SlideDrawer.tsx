"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface Props {
  open:     boolean;
  onClose:  () => void;
  title?:   string;
  size?:    "md" | "lg" | "xl";
  children: React.ReactNode;
}

const sizeClass: Record<string, string> = {
  md: "max-w-xl",
  lg: "max-w-2xl",
  xl: "max-w-3xl",
};

export default function SlideDrawer({ open, onClose, title, size = "lg", children }: Props) {
  /* lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className={[
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        className={[
          "fixed right-0 top-0 h-full z-50 flex flex-col w-full",
          sizeClass[size] ?? "max-w-2xl",
          "bg-[#0d1117] border-l border-white/[0.08] shadow-2xl",
          "transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.07] flex-shrink-0">
          {title && (
            <h2 className="flex-1 text-sm font-semibold text-white/80 truncate">{title}</h2>
          )}
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-auto flex-shrink-0 p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07]
                       text-white/40 hover:text-white/80 hover:bg-white/[0.08] transition-all"
          >
            <X size={15} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {open && children}
        </div>
      </div>
    </>
  );
}
