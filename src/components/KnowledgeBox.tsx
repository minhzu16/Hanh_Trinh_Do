import React from "react";
import type { Source } from "../engine/types";

interface KnowledgeBoxProps {
  text: string;
  sources: Source[];
  onContinue: () => void;
  title?: string;
  continueLabel?: string;
  altHistoryBadge?: boolean;
}

export const KnowledgeBox: React.FC<KnowledgeBoxProps> = ({
  text,
  sources,
  onContinue,
  title = "Kiến thức giáo trình",
  continueLabel = "Hiểu rồi",
  altHistoryBadge = false
}) => {
  // Build pages label from sources
  const pagesList = Array.from(new Set(sources.map((s) => s.pages))).join(", ");

  return (
    <div className="w-full max-w-3xl mx-auto animate-fadeIn">
      <div className="relative p-6 sm:p-7 rounded-xl bg-gradient-to-br from-[#261d18] to-[#1a1411] border-2 border-amber-600/70 shadow-2xl backdrop-blur-md">
        {/* Header Badge */}
        <div className="flex items-center justify-between mb-3 border-b border-amber-800/40 pb-2">
          <div className="flex items-center space-x-2">
            <span className="text-xl">📜</span>
            <h4 className="text-sm uppercase tracking-wider font-bold text-amber-300">
              {title}
            </h4>
          </div>
          {altHistoryBadge && (
            <span className="text-xs bg-red-950 text-red-300 border border-red-700/60 px-2 py-0.5 rounded font-semibold">
              ⚠️ Lịch sử giả định
            </span>
          )}
        </div>

        {/* Content text */}
        <div className="text-base sm:text-lg leading-relaxed text-[#f7f0e3] font-serif py-1">
          {text}
        </div>

        {/* Sources citations */}
        {pagesList && (
          <div className="mt-4 pt-3 border-t border-amber-900/50 flex flex-wrap items-center justify-between text-xs text-amber-400/90 gap-2">
            <span className="font-medium italic">
              Giáo trình, tr. {pagesList}
            </span>
            <div className="flex gap-1.5 flex-wrap">
              {sources.map((s) => (
                <span
                  key={s.id}
                  className="px-2 py-0.5 rounded bg-black/40 text-stone-400 border border-stone-800 text-[10px]"
                >
                  {s.id}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Continue button */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={onContinue}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#9E1B1B] to-[#7A1515] hover:from-[#B52020] hover:to-[#8E1818] text-amber-100 font-semibold text-sm shadow-md border border-amber-500/40 transition-transform active:scale-95 cursor-pointer flex items-center space-x-2"
          >
            <span>{continueLabel}</span>
            <span>↵</span>
          </button>
        </div>
      </div>
    </div>
  );
};

