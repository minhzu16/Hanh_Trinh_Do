import React, { useState, useEffect, useMemo, useRef } from "react";
import type { Character, Source, GlossaryItem } from "../engine/types";
import { content } from "../content";
import { audioManager } from "../audio";
import { voiceManager } from "../voice";

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
  glossary?: GlossaryItem[];
}

export const DialogBox: React.FC<DialogBoxProps> = ({
  speaker,
  speakerId,
  text,
  isThought = false,
  onNext,
  nextLabel = "Tiếp",
  instant = false,
  glossary
}) => {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isInstant = instant || prefersReducedMotion;
  const [displayedLength, setDisplayedLength] = useState(isInstant ? text.length : 0);
  const [activeGlossary, setActiveGlossary] = useState<GlossaryItem | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isTyping = displayedLength < text.length;

  const handleCompleteTyping = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setDisplayedLength(text.length);
  };

  // Reset active glossary on text change
  useEffect(() => {
    setActiveGlossary(null);
  }, [text]);

  // Close tooltip on Escape key
  useEffect(() => {
    if (!activeGlossary) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveGlossary(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeGlossary]);

  const glossaryList = glossary ?? content.glossary ?? [];

  // Map of lowercase keyword -> GlossaryItem
  const termMap = useMemo(() => {
    const map = new Map<string, GlossaryItem>();
    for (const item of glossaryList) {
      map.set(item.term.toLowerCase(), item);
      if (item.aliases) {
        for (const alias of item.aliases) {
          map.set(alias.toLowerCase(), item);
        }
      }
    }
    return map;
  }, [glossaryList]);

  // Regex pattern for all keywords sorted by length descending
  const termRegex = useMemo(() => {
    const allKeywords = Array.from(termMap.keys()).sort((a, b) => b.length - a.length);
    if (allKeywords.length === 0) return null;
    const escaped = allKeywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    return new RegExp(`(${escaped.join("|")})`, "gi");
  }, [termMap]);

  // Helper to render text with glossary highlights
  const renderFormattedText = (rawText: string) => {
    if (!termRegex) return rawText;
    const parts = rawText.split(termRegex);
    return parts.map((part, index) => {
      const matched = termMap.get(part.toLowerCase());
      if (matched) {
        return (
          <span
            key={index}
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              handleCompleteTyping();
              setActiveGlossary(matched);
              audioManager.playSfx("sfx-chon");
            }}
            className="border-b-2 border-dotted border-amber-400 text-amber-200 hover:text-amber-100 hover:border-amber-300 font-semibold cursor-help transition-colors px-0.5 rounded-xs hover:bg-amber-950/40"
            title={`Tra cứu: ${matched.term}`}
          >
            {part}
            <span className="text-[10px] ml-0.5 text-amber-400/80 align-super select-none">📖</span>
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Typewriter effect on text change (tôn trọng prefers-reduced-motion và cài đặt tức thì)
  useEffect(() => {
    if (isInstant) {
      setDisplayedLength(text.length);
      return;
    }

    setDisplayedLength(0);
    let index = 0;
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      index += 2;
      if (index >= text.length) {
        setDisplayedLength(text.length);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      } else {
        setDisplayedLength(index);
        if (index % 6 === 0) {
          audioManager.playSfx("sfx-typewriter");
        }
      }
    }, 20);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [text, isInstant]);

  // Voice-over reading on dialogue text change
  useEffect(() => {
    voiceManager.speak(text, speakerId);
    return () => {
      voiceManager.stop();
    };
  }, [text, speakerId]);

  const handleBoxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeGlossary) {
      setActiveGlossary(null);
      return;
    }
    if (isTyping) {
      // First click completes the typing line immediately
      handleCompleteTyping();
      audioManager.playSfx("sfx-chon");
    } else {
      // Next click advances
      voiceManager.stop();
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
      {/* Pentiment-style Glossary Modal Popover */}
      {activeGlossary && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setActiveGlossary(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#2a1a12] via-[#1c120c] to-[#120a07] border-2 border-amber-400 shadow-[0_16px_50px_rgba(0,0,0,0.95)] text-left"
          >
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-amber-700/60">
              <div className="flex items-center space-x-2">
                <span className="text-xl text-amber-300">📖</span>
                <div>
                  <h4 className="font-serif font-bold text-amber-200 text-base sm:text-lg">
                    {activeGlossary.term}
                  </h4>
                  {activeGlossary.aliases && activeGlossary.aliases.length > 0 && (
                    <span className="text-[11px] text-stone-400 italic font-sans block">
                      Tên gọi khác: {activeGlossary.aliases.join(", ")}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveGlossary(null);
                }}
                className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center text-xs cursor-pointer border border-stone-600 transition"
                title="Đóng (Esc)"
              >
                ✕
              </button>
            </div>

            <p className="font-serif text-sm sm:text-base text-[#f5ede2] leading-relaxed mb-4">
              {activeGlossary.definition}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 pt-2.5 border-t border-amber-900/40 text-xs">
              <span className="text-stone-400 font-sans text-xs">Nguồn kiểm chứng:</span>
              {activeGlossary.sources.map((src) => (
                <span
                  key={src}
                  className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-700/70 text-amber-300 font-mono text-xs font-semibold"
                >
                  {src}
                </span>
              ))}
            </div>

            <div className="pt-3 mt-1 flex justify-end">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveGlossary(null);
                }}
                className="px-4 py-1.5 rounded-lg bg-amber-800 hover:bg-amber-700 text-amber-100 text-xs font-semibold border border-amber-500 cursor-pointer shadow transition"
              >
                Đã hiểu (Esc)
              </button>
            </div>
          </div>
        </div>
      )}

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
              "{renderFormattedText(displayedText)}"
              {isTyping && <span className="inline-block w-1.5 h-4 ml-1 bg-amber-400 animate-pulse" />}
            </p>
          ) : (
            <p className="font-serif">
              {renderFormattedText(displayedText)}
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
