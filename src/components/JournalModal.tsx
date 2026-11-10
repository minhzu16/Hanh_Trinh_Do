import React, { useState, useEffect } from "react";
import type { ChapterJournal } from "../engine/types";
import { audioManager } from "../audio";

interface JournalModalProps {
  journals: ChapterJournal[];
  currentChapterId: string;
  isOpen: boolean;
  onClose: () => void;
  onProceed?: () => void;
  isEndOfChapter?: boolean;
}

export const JournalModal: React.FC<JournalModalProps> = ({
  journals,
  currentChapterId,
  isOpen,
  onClose,
  onProceed,
  isEndOfChapter = false
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(currentChapterId);

  // Sync selected chapter when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedChapterId(currentChapterId);
    }
  }, [isOpen, currentChapterId]);

  // Keyboard shortcut listener (Escape to close if not mandatory end-of-chapter)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        audioManager.playSfx("sfx-chon");
        if (isEndOfChapter && onProceed) {
          onProceed();
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isEndOfChapter, onProceed, onClose]);

  if (!isOpen) return null;

  const currentJournal =
    journals.find((j) => j.chapterId === selectedChapterId) ||
    journals.find((j) => j.chapterId === currentChapterId) ||
    journals[0];

  const handleProceedClick = () => {
    audioManager.playSfx("sfx-chon");
    if (onProceed) {
      onProceed();
    } else {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Nhật ký của Minh"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isEndOfChapter) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#1c120c]/98 border-2 border-amber-500/80 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden">
        {/* Brass corner accents */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#c8a24a] pointer-events-none" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#c8a24a] pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#c8a24a] pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#c8a24a] pointer-events-none" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-amber-900/60 bg-gradient-to-r from-[#29170e] via-[#1c120c] to-[#29170e] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-amber-600/20 border border-amber-400 flex items-center justify-center text-xl shadow-inner">
              📖
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-amber-200">
                Nhật ký của Minh
              </h2>
              <p className="text-xs text-stone-400 font-serif italic">
                {currentJournal?.title || "Ghi chép hành trình"}
              </p>
            </div>
          </div>

          {!isEndOfChapter && (
            <button
              onClick={() => {
                audioManager.playSfx("sfx-chon");
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center border border-stone-600 cursor-pointer transition text-sm"
              title="Đóng (Esc)"
            >
              ✕
            </button>
          )}
        </div>

        {/* Chapter Tabs */}
        <div className="px-5 py-2.5 bg-black/40 border-b border-amber-900/40 flex items-center gap-2 overflow-x-auto">
          {journals.map((j) => {
            const isSelected = j.chapterId === (currentJournal?.chapterId ?? "");
            return (
              <button
                key={j.chapterId}
                onClick={() => {
                  audioManager.playSfx("sfx-chon");
                  setSelectedChapterId(j.chapterId);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-serif font-semibold border transition cursor-pointer shrink-0 ${
                  isSelected
                    ? "bg-amber-600/30 text-amber-200 border-amber-400 shadow-sm"
                    : "bg-stone-900/60 text-stone-400 border-stone-800 hover:text-stone-200 hover:bg-stone-800"
                }`}
              >
                {j.chapterId.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Entries Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {currentJournal?.entries.map((entry, idx) => (
            <div
              key={entry.id || idx}
              className="p-4 sm:p-5 rounded-xl bg-[#241710]/80 border border-amber-800/50 shadow-md space-y-2.5 transition hover:border-amber-600/70"
            >
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-amber-900/60 border border-amber-500/50 text-[11px] font-mono text-amber-300 flex items-center justify-center font-bold shrink-0">
                  {idx + 1}
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg text-amber-100">
                  {entry.title}
                </h3>
              </div>

              <p className="font-serif text-sm sm:text-base text-stone-300 leading-relaxed italic pl-7">
                "{entry.text}"
              </p>

            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-amber-900/60 bg-gradient-to-r from-[#29170e] via-[#1c120c] to-[#29170e] flex items-center justify-between">
          <span className="text-xs text-stone-400 font-serif italic hidden sm:inline">
            {isEndOfChapter ? "Đã ghi nhận 3 bài học lịch sử của kỳ" : "Ghi chép của Minh"}
          </span>

          <div className="flex items-center space-x-3 ml-auto">
            {isEndOfChapter ? (
              <button
                onClick={handleProceedClick}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-red-700 hover:from-amber-500 hover:to-red-600 text-amber-100 font-serif font-bold text-xs sm:text-sm shadow-xl border border-amber-400 transition cursor-pointer"
              >
                Tiếp tục hành trình ↵
              </button>
            ) : (
              <button
                onClick={() => {
                  audioManager.playSfx("sfx-chon");
                  onClose();
                }}
                className="px-5 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-serif border border-stone-600 transition cursor-pointer"
              >
                Đóng nhật ký (Esc)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

