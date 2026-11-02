import React, { useState, useEffect } from "react";
import type { Source } from "../engine/types";

interface KnowledgeBoxProps {
  text: string;
  sources: Source[];
  onContinue: () => void;
  title?: string;
  continueLabel?: string;
  altHistoryBadge?: boolean;
  showPagesCitation?: boolean;
}

export const KnowledgeBox: React.FC<KnowledgeBoxProps> = ({
  text,
  sources,
  onContinue,
  title = "Kiến thức lịch sử",
  continueLabel = "Hiểu rồi",
  altHistoryBadge = false,
  showPagesCitation = true
}) => {
  // 3-second timer per docs/03-story-spec.md mục 9
  const [countdown, setCountdown] = useState<number>(3);
  const [showSourceDetails, setShowSourceDetails] = useState<boolean>(false);

  useEffect(() => {
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [text]);

  const canContinue = countdown === 0;

  // Build pages label from sources
  const pagesList = Array.from(new Set(sources.map((s) => s.pages))).join(", ");

  const handleContinue = () => {
    if (!canContinue) return;
    onContinue();
  };

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
            <span className="text-xs bg-red-950 text-red-300 border border-red-700/60 px-2.5 py-0.5 rounded font-semibold animate-pulse">
              ⚠️ Lịch sử giả định
            </span>
          )}
        </div>

        {/* Content text */}
        <div className="text-base sm:text-lg leading-relaxed text-[#f7f0e3] font-serif py-1">
          {text}
        </div>

        {/* Sources citations - Tinh tế, có thể bật/tắt chi tiết */}
        {showPagesCitation && pagesList && (
          <div className="mt-4 pt-3 border-t border-amber-900/50 text-xs">
            <div className="flex flex-wrap items-center justify-between text-amber-400/90 gap-2">
              <span className="font-medium">
                📖 Giáo trình, tr. {pagesList}
              </span>
              <button
                type="button"
                onClick={() => setShowSourceDetails((prev) => !prev)}
                className="px-2 py-0.5 rounded bg-amber-950/80 hover:bg-amber-900 border border-amber-700/60 text-[11px] text-amber-200 cursor-pointer transition"
              >
                {showSourceDetails ? "Ẩn mã đối chứng" : "Xem mã đối chứng"}
              </button>
            </div>
            {showSourceDetails && (
              <div className="mt-2.5 p-2 rounded bg-black/50 border border-amber-900/40 space-y-1.5 animate-fadeIn">
                {sources.map((s) => (
                  <div key={s.id} className="text-[11px] text-stone-300 flex items-start space-x-1.5">
                    <span className="font-mono text-amber-400 font-semibold">{s.id}:</span>
                    <span className="italic">"{s.text}"</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Continue button with 3-second reading timer */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs text-stone-400 italic">
            {!canContinue ? `Vui lòng đọc kỹ nội dung (${countdown}s)...` : "Bạn đã đọc xong kiến thức"}
          </span>
          <button
            disabled={!canContinue}
            onClick={handleContinue}
            className={`px-6 py-2 rounded-lg font-semibold text-sm shadow-md border transition-all flex items-center space-x-2 ${
              canContinue
                ? "bg-gradient-to-r from-[#9E1B1B] to-[#7A1515] hover:from-[#B52020] hover:to-[#8E1818] text-amber-100 border-amber-500/50 cursor-pointer active:scale-95"
                : "bg-stone-800/80 text-stone-500 border-stone-700 cursor-not-allowed opacity-70"
            }`}
          >
            <span>{continueLabel}</span>
            <span>{canContinue ? "↵" : `(${countdown}s)`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
