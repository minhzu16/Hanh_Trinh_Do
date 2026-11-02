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
}

export const DialogBox: React.FC<DialogBoxProps> = ({
  speaker,
  speakerId,
  source,
  text,
  isThought = false,
  onNext,
  nextLabel = "Tiếp",
  showCitation = false
}) => {
  const isTest = import.meta.env.MODE === "test";
  const [displayedLength, setDisplayedLength] = useState(isTest ? text.length : 0);
  const [showCitationModal, setShowCitationModal] = useState(false);

  const isTyping = displayedLength < text.length;

  // Typewriter effect on text change
  useEffect(() => {
    if (isTest) {
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
      }
    }, 16);

    return () => clearInterval(timer);
  }, [text]);

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

  const speakerName = speaker?.name || (speakerId === "minh" ? "Minh" : undefined);
  const isHistorical = speaker?.kind === "historical";
  const displayedText = text.slice(0, displayedLength);

  return (
    <div
      onClick={handleBoxClick}
      className="relative w-full max-w-4xl mx-auto cursor-pointer select-none group"
    >
      {/* Lacquer frame with Indochine corner accents */}
      <div className="relative bg-[#1a110d]/95 border-2 border-[#8b6f47]/80 rounded-sm shadow-[0_12px_40px_rgba(0,0,0,0.95)] p-6 sm:p-7 backdrop-blur-md transition-all hover:border-[#c8a24a]">
        {/* 4 Indochine Brass Corner Accents */}
        <div className="absolute top-1 left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-[#c8a24a] pointer-events-none" />
        <div className="absolute top-1 right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-[#c8a24a] pointer-events-none" />
        <div className="absolute bottom-1 left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-[#c8a24a] pointer-events-none" />
        <div className="absolute bottom-1 right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-[#c8a24a] pointer-events-none" />

        {/* Speaker Nameplate */}
        {speakerName && (
          <div className="absolute -top-4 left-6">
            <div className={`px-4 py-1 rounded shadow-lg text-xs sm:text-sm font-serif font-bold tracking-wider uppercase border flex items-center space-x-1.5 ${
              isHistorical 
                ? "bg-gradient-to-r from-[#8B1A1A] to-[#631212] text-amber-200 border-amber-400" 
                : "bg-[#2e231c] text-[#f3ead7] border-[#8b6f47]"
            }`}>
              {isHistorical && <span>⭐</span>}
              <span>{speakerName}</span>
            </div>
          </div>
        )}

        {/* Text Area */}
        <div className="mt-1 text-base sm:text-lg leading-relaxed text-[#f3ead7] min-h-[56px]">
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

          {/* Historical Source Citation Button - Only rendered if showCitation is true */}
          {showCitation && source && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setShowCitationModal(true);
                audioManager.playSfx("sfx-chon");
              }}
              className="mt-3 pt-2.5 border-t border-amber-900/40 flex items-center justify-between text-xs text-amber-300/90 hover:text-amber-200 transition cursor-pointer"
              title="Nhấp để soi tư liệu lịch sử đối chứng"
            >
              <span className="italic flex items-center space-x-1.5">
                <span>📖</span>
                <span>{`Giáo trình Lịch sử Đảng, tr. ${source.pages}`}</span>
              </span>
              <span className="text-[11px] bg-amber-950/80 hover:bg-amber-900 text-amber-300 px-2.5 py-0.5 rounded border border-amber-700/60 shadow-xs flex items-center space-x-1">
                <span>🔍</span>
                <span>Soi tư liệu gốc</span>
              </span>
            </div>
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

      {/* Interactive Archival Citation Modal */}
      {showCitationModal && source && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowCitationModal(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-lg w-full bg-[#1e1713] border-2 border-amber-500/80 rounded-xl p-6 shadow-2xl text-stone-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-amber-900/60 pb-3">
              <div className="flex items-center space-x-2 text-amber-300 font-serif font-bold text-base">
                <span>🏛️</span>
                <span>Tư liệu lịch sử đối chứng</span>
              </div>
              <button
                onClick={() => setShowCitationModal(false)}
                className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 text-sm flex items-center justify-center border border-stone-600"
              >
                ✕
              </button>
            </div>

            <div className="bg-stone-900/80 p-4 rounded-lg border border-stone-800 space-y-2">
              <div className="text-xs text-amber-400 font-mono uppercase tracking-wider">
                Mã nguồn: {source.id}
              </div>
              <div className="text-sm font-serif italic text-amber-100/90">
                "{source.text}"
              </div>
            </div>

            <div className="text-xs text-stone-400 leading-relaxed space-y-1">
              <p>
                <strong>Xuất xứ:</strong> Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Dành cho bậc đại học hệ không chuyên lý luận chính trị), Nhà xuất bản Chính trị quốc gia Sự thật.
              </p>
              <p>
                <strong>Vị trí trang:</strong> Trang {source.pages}.
              </p>
              <p>
                <strong>Phân loại:</strong> {source.kind === "quote" ? "Trích dẫn nguyên văn phát biểu / văn kiện" : "Sự kiện lịch sử chuẩn xác"}.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowCitationModal(false)}
                className="px-5 py-1.5 rounded-lg bg-amber-800 hover:bg-amber-700 text-amber-100 text-xs font-semibold border border-amber-500/50"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
