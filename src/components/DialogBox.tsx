import React, { useState, useEffect } from "react";
import type { Character, Source } from "../engine/types";
import { audioManager } from "../audio";

interface DialogBoxProps {
  speaker?: Character;
  speakerId?: string;
  source?: Source;
  text: string;
  isThought?: boolean;
  onNext: () => void;
  nextLabel?: string;
  showCitation?: boolean;
  instant?: boolean;
}

export const DialogBox: React.FC<DialogBoxProps> = ({
  speaker,
  speakerId,
  text,
  isThought = false,
  onNext,
  nextLabel = "Tiếp",
  instant = false
}) => {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isInstant = instant || prefersReducedMotion;
  const [displayedLength, setDisplayedLength] = useState(isInstant ? text.length : 0);

  const isTyping = displayedLength < text.length;

  // Typewriter effect on text change (tôn trọng prefers-reduced-motion và cài đặt tức thì)
  useEffect(() => {
    if (isInstant) {
      setDisplayedLength(text.length);
      return;
    }

    setDisplayedLength(0);
    let index = 0;
    const timer = setInterval(() => {
      index += 2;
      if (index >= text.length) {
        setDisplayedLength(text.length);
        clearInterval(timer);
      } else {
        setDisplayedLength(index);
        if (index % 6 === 0) {
          audioManager.playSfx("sfx-typewriter");
        }
      }
    }, 20);

    return () => clearInterval(timer);
  }, [text, isInstant]);

  const handleBoxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTyping) {
      // First click completes the typing line immediately
      setDisplayedLength(text.length);
      audioManager.playSfx("sfx-chon");
    } else {
      // Next click advances
      audioManager.playSfx("sfx-chon");
      onNext();
    }
  };

  // Xác định chính xác tên nhân vật hiển thị
  const isHistorical = speaker?.kind === "historical" || speakerId === "nguyen-ai-quoc";
  const speakerName = isThought
    ? (speaker?.name ? `${speaker.name} (Nội tâm)` : "Minh (Nội tâm)")
    : (speaker?.name || (speakerId === "minh" ? "Minh" : (speakerId && speakerId !== "narrator" ? speakerId : undefined)));

  const displayedText = text.slice(0, displayedLength);

  return (
    <div
      onClick={handleBoxClick}
      className="relative w-full max-w-4xl mx-auto cursor-pointer select-none group pt-5 sm:pt-6"
    >
      {/* Lacquer frame with Indochine corner accents */}
      <div className="relative bg-[#1a110d]/95 border-2 border-[#8b6f47]/80 rounded-sm shadow-[0_12px_40px_rgba(0,0,0,0.95)] p-6 sm:p-7 backdrop-blur-md transition-all hover:border-[#c8a24a]">
        {/* 4 Indochine Brass Corner Accents */}
        <div className="absolute top-1 left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-[#c8a24a] pointer-events-none" />
        <div className="absolute top-1 right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-[#c8a24a] pointer-events-none" />
        <div className="absolute bottom-1 left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-[#c8a24a] pointer-events-none" />
        <div className="absolute bottom-1 right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-[#c8a24a] pointer-events-none" />

        {/* Speaker Nameplate - Luôn hiển thị đầy đủ, không bị cắt viền và nổi bật rõ ràng */}
        {speakerName && (
          <div className="absolute -top-3.5 left-6 z-30 pointer-events-none">
            <div
              className={`px-3.5 py-1 rounded shadow-lg text-xs sm:text-sm font-serif font-bold tracking-wider uppercase border flex items-center space-x-1.5 transition-all ${
                isHistorical
                  ? "bg-gradient-to-r from-[#8B1A1A] to-[#631212] text-amber-200 border-amber-400 shadow-amber-950/70"
                  : isThought
                  ? "bg-gradient-to-r from-[#291e17] to-[#1e1510] text-amber-300 border-amber-600/70 shadow-black/70"
                  : "bg-gradient-to-r from-[#2e231c] to-[#201712] text-[#f3ead7] border-[#8b6f47] shadow-black/60"
              }`}
            >
              {isHistorical && <span className="text-amber-300">⭐</span>}
              {isThought && <span>💭</span>}
              <span>{speakerName}</span>
            </div>
          </div>
        )}

        {/* Text Area with Accessibility live region */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="mt-1 text-base sm:text-lg leading-relaxed text-[#f3ead7] min-h-[56px]"
        >
          {isThought ? (
            <p className="italic text-stone-300 font-serif">
              "{displayedText}"
              {isTyping && <span className="inline-block w-1.5 h-4 ml-1 bg-amber-400 animate-pulse" />}
            </p>
          ) : (
            <p className="font-serif">
              {displayedText}
              {isTyping && <span className="inline-block w-1.5 h-4 ml-1 bg-amber-400 animate-pulse" />}
            </p>
          )}
        </div>

        {/* Next indicator */}
        <div className="mt-4 flex items-center justify-between text-xs text-stone-400">
          <span className="text-[11px] text-stone-500 italic hidden sm:inline">
            {isTyping ? "Nhấp chuột hoặc gõ Space để hiện nhanh" : "Nhấp hoặc gõ Space để tiếp tục"}
          </span>
          <div className="flex items-center space-x-2 text-amber-400/90 animate-pulse ml-auto">
            <span>{nextLabel}</span>
            <span className="px-1.5 py-0.5 rounded bg-stone-800 border border-stone-700 text-[10px] text-stone-300 font-mono">
              Space ↵
            </span>
            <span className="text-amber-400">▼</span>
          </div>
        </div>
      </div>
    </div>
  );
};
