import React from "react";
import type { Character, Source } from "../engine/types";

interface DialogBoxProps {
  speaker?: Character;
  speakerId?: string;
  source?: Source;
  text: string;
  isThought?: boolean;
  onNext: () => void;
  nextLabel?: string;
}

export const DialogBox: React.FC<DialogBoxProps> = ({
  speaker,
  speakerId,
  source,
  text,
  isThought = false,
  onNext,
  nextLabel = "Tiếp"
}) => {
  const speakerName = speaker?.name || (speakerId === "minh" ? "Minh" : undefined);
  const isHistorical = speaker?.kind === "historical";

  return (
    <div
      onClick={onNext}
      className="relative w-full max-w-4xl mx-auto cursor-pointer select-none"
    >
      <div className="bg-[#1f1a17]/95 border-2 border-[#8b6f47] rounded-lg shadow-2xl p-6 sm:p-7 backdrop-blur-md transition-all hover:border-[#c8a24a]">
        {/* Name tag */}
        {speakerName && (
          <div className="absolute -top-4 left-6">
            <div className={`px-4 py-1 rounded shadow-md text-sm font-semibold tracking-wide border ${
              isHistorical 
                ? "bg-[#8B1A1A] text-amber-200 border-amber-500/50" 
                : "bg-[#2e2621] text-[#f3ead7] border-[#8b6f47]"
            }`}>
              {speakerName}
            </div>
          </div>
        )}

        {/* Text */}
        <div className="mt-1 text-base sm:text-lg leading-relaxed text-[#f3ead7]">
          {isThought ? (
            <p className="italic text-stone-300 font-serif">
              "{text}"
            </p>
          ) : (
            <p className="font-serif">
              {text}
            </p>
          )}

          {/* Historical Source Citation under quote */}
          {source && (
            <div className="mt-3 pt-2 border-t border-amber-900/40 flex items-center justify-between text-xs text-amber-300/80">
              <span className="italic">
                {`📖 Giáo trình Lịch sử Đảng, tr. ${source.pages}`}
              </span>
              <span className="text-[11px] bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                Trích dẫn nguyên văn
              </span>
            </div>
          )}
        </div>

        {/* Next indicator */}
        <div className="mt-4 flex items-center justify-end space-x-2 text-xs text-amber-400/80 animate-pulse">
          <span>{nextLabel}</span>
          <span className="px-1.5 py-0.5 rounded bg-stone-800 border border-stone-700 text-[10px] text-stone-300">
            Space ↵
          </span>
          <span className="text-amber-400">▼</span>
        </div>
      </div>
    </div>
  );
};
