"use client";
import { useState, useMemo } from "react";
import { flashcards, flashcardCategories } from "@/data/flashcards";
import { cn } from "@/lib/utils";
import { RotateCcw, ChevronLeft, ChevronRight, Shuffle, BookOpen } from "lucide-react";

function FlipCard({ front, back }: { front: string; back: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="relative h-60 cursor-pointer select-none" style={{ perspective: "1200px" }} onClick={() => setFlipped(f => !f)}>
      <div className="relative w-full h-full transition-transform duration-500" style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
        <div className="absolute inset-0 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/[0.06] to-violet-500/[0.06] flex flex-col items-center justify-center p-6 text-center" style={{ backfaceVisibility: "hidden" }}>
          <span className="text-[10px] text-cyan-400/50 uppercase tracking-widest mb-4 font-semibold">คำถาม — แตะเพื่อดูคำตอบ</span>
          <p className="text-lg font-semibold text-white/85 leading-relaxed">{front}</p>
          <div className="absolute bottom-3 right-4 text-[10px] text-white/15">↻ flip</div>
        </div>
        <div className="absolute inset-0 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.06] to-emerald-500/[0.06] flex flex-col items-center justify-center p-6 text-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <span className="text-[10px] text-violet-400/50 uppercase tracking-widest mb-4 font-semibold">คำตอบ</span>
          <pre className="text-sm text-white/75 leading-relaxed whitespace-pre-wrap font-mono text-left w-full max-w-md">{back}</pre>
        </div>
      </div>
    </div>
  );
}

export default function FlashcardsPage() {
  const [category, setCategory] = useState("All");
  const [index, setIndex] = useState(0);
  const [seed, setSeed] = useState(0);
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [unknown, setUnknown] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const cards = category === "All" ? flashcards : flashcards.filter(f => f.category === category);
    if (seed > 0) return [...cards].sort(() => Math.random() - 0.5);
    return cards;
  }, [category, seed]);

  const card = filtered[index];
  const pct = filtered.length ? Math.round(((index + 1) / filtered.length) * 100) : 0;

  function next() { setIndex(i => Math.min(i + 1, filtered.length - 1)); }
  function prev() { setIndex(i => Math.max(i - 1, 0)); }
  function markKnown()   { setKnown(s => new Set(Array.from(s).concat(card.id)));   next(); }
  function markUnknown() { setUnknown(s => new Set(Array.from(s).concat(card.id))); next(); }
  function reset() { setIndex(0); setKnown(new Set()); setUnknown(new Set()); }

  return (
    <div className="px-4 md:px-6 py-6 max-w-3xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white/90">🃏 Flashcards</h1>
          <p className="text-xs text-white/35 mt-0.5">แตะการ์ดเพื่อดูคำตอบ · ทบทวนได้ทุกเวลา</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { setSeed(s => s + 1); setIndex(0); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white/35 hover:text-white/60 hover:border-white/20 transition-all">
            <Shuffle size={12} /> Shuffle
          </button>
          <button onClick={reset} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white/35 hover:text-white/60 hover:border-white/20 transition-all">
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["All", ...flashcardCategories].map(cat => (
          <button key={cat} onClick={() => { setCategory(cat); setIndex(0); }}
            className={cn("px-3 py-1 rounded-full text-xs font-medium transition-all border",
              category === cat ? "bg-cyan-500/15 text-cyan-400 border-cyan-500/30" : "bg-white/[0.03] text-white/30 border-white/[0.07] hover:border-white/20 hover:text-white/55")}>
            {cat}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-1 bg-white/[0.07] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-[11px] text-white/30 flex-shrink-0">{index + 1} / {filtered.length}</span>
        <span className="text-[11px] text-emerald-400/60">✓ {known.size}</span>
        <span className="text-[11px] text-rose-400/60">✗ {unknown.size}</span>
      </div>

      {card && (
        <div>
          <div className="text-[10px] text-white/20 mb-2 uppercase tracking-widest flex items-center gap-2">
            <BookOpen size={10} /> {card.category}
            {card.tags.map(t => <span key={t} className="bg-white/[0.04] px-1.5 rounded text-white/20">{t}</span>)}
          </div>
          <FlipCard front={card.front} back={card.back} />
        </div>
      )}

      <div className="flex items-center gap-3">
        <button onClick={prev} disabled={index === 0} className="flex items-center gap-1 px-4 py-2 rounded-xl border border-white/[0.07] text-white/30 text-sm disabled:opacity-30 hover:border-white/15 hover:text-white/50 transition-all">
          <ChevronLeft size={14} /> Prev
        </button>
        <button onClick={markUnknown} className="flex-1 py-2 rounded-xl border border-rose-500/20 bg-rose-500/[0.05] text-rose-400 text-sm font-medium hover:bg-rose-500/10 transition-all">
          ✗ ยังไม่รู้
        </button>
        <button onClick={markKnown} className="flex-1 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] text-emerald-400 text-sm font-medium hover:bg-emerald-500/10 transition-all">
          ✓ รู้แล้ว
        </button>
        <button onClick={next} disabled={index === filtered.length - 1} className="flex items-center gap-1 px-4 py-2 rounded-xl border border-white/[0.07] text-white/30 text-sm disabled:opacity-30 hover:border-white/15 hover:text-white/50 transition-all">
          Next <ChevronRight size={14} />
        </button>
      </div>

      {index === filtered.length - 1 && (known.size + unknown.size) >= filtered.length && (
        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/[0.05] p-5 text-center space-y-2">
          <div className="text-2xl">🎉</div>
          <p className="text-sm font-semibold text-white/75">รีวิวครบทุกการ์ดแล้ว!</p>
          <p className="text-xs text-white/35">รู้แล้ว {known.size} / ยังไม่รู้ {unknown.size}</p>
          <button onClick={reset} className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 underline">เริ่มใหม่</button>
        </div>
      )}
    </div>
  );
}
