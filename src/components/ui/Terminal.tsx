"use client";
import { useEffect, useState } from "react";

const BOOT_SEQUENCE = [
  "> init system --user meet_upadhyay",
  "[OK] Loaded base matrix...",
  "> connect db --layer Postgres+pgvector",
  "[OK] Vector database secured.",
  "> start orchestration --agent LangGraph",
  "[OK] Multi-agent orchestration online.",
  "> init pipeline --type RAG",
  "[OK] Semantic search initialized.",
  "> status",
  "[READY] Awaiting new deployment request..."
];

export function TerminalExperience() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < BOOT_SEQUENCE.length) {
      // simulate typing delay between 300ms and 800ms
      const delay = Math.random() * 500 + 300;
      const timer = setTimeout(() => {
        setLines(prev => [...prev, BOOT_SEQUENCE[currentIndex]]);
        setCurrentIndex(c => c + 1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <div className="w-[320px] md:w-[384px] rounded-[10px] overflow-hidden border border-outline-variant/20 bg-[#0a0f14]/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] text-left relative group">
      {/* Glow effect behind terminal */}
      <div className="absolute inset-0 bg-primary/5 rounded-[10px] pointer-events-none transition-all duration-500 group-hover:bg-primary/10"></div>
      
      {/* Mac-like Header */}
      <div className="flex items-center px-4 py-2.5 bg-surface-container-highest/90 border-b border-outline-variant/10 relative z-20 backdrop-blur-md">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 border border-red-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 border border-yellow-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 border border-green-500/50"></div>
        </div>
        <div className="ml-4 font-mono text-[10px] text-on-surface-variant flex-1 text-center opacity-70">
          meet@ai-engine: ~
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 md:p-5 font-mono text-[10px] md:text-xs lg:text-sm h-40 md:h-56 flex flex-col justify-end relative z-10 overflow-hidden bg-transparent">
        <div className="space-y-1.5 flex flex-col justify-end flex-1">
          {lines.map((line, i) => (
            <div key={i} className={line.startsWith('>') ? 'text-primary drop-shadow-[0_0_5px_rgba(0,229,255,0.4)]' : 'text-on-surface-variant'}>
              {line}
            </div>
          ))}
          {currentIndex < BOOT_SEQUENCE.length ? (
            <div className="w-2 h-[1em] bg-primary animate-[blink_1s_steps(2)_infinite] inline-block align-middle ml-1 mt-1 shadow-[0_0_8px_rgba(0,229,255,0.8)]"></div>
          ) : (
            <div className="text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.4)] mt-2">
              <span className="animate-[blink_2s_steps(2)_infinite]">_</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
