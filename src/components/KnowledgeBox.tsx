import React, { useState, useEffect } from "react";
import type { Source } from "../engine/types";

interface KnowledgeBoxProps {
  text: string;
  sources?: Source[];
  onContinue: () => void;
  title?: string;
  continueLabel?: string;
  altHistoryBadge?: boolean;
}

export const KnowledgeBox: React.FC<KnowledgeBoxProps> = ({
  text,
  onContinue,
  title = "Kiến thức lịch sử",
  continueLabel = "Hiểu rồi",
  altHistoryBadge = false
}) => {
  const isTest = import.meta.env.MODE === "test";
  // 3-second timer per docs/03-story-spec.md mục 9 (ngay lập tức trong môi trường test)
  const [countdown, setCountdown] = useState<number>(isTest ? 0 : 3);

  useEffect(() => {
    if (isTest) return;
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
  }, [text, isTest]);

  const canContinue = countdown === 0;

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
            <span>↵</span>
          </button>
        </div>
      </div>
    </div>
  );
};
