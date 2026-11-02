import React from "react";
import type { Character } from "../engine/types";

interface SpriteViewProps {
  speaker?: Character;
  speakerId?: string;
  isThought?: boolean;
}

export const SpriteView: React.FC<SpriteViewProps> = ({
  speaker,
  speakerId,
  isThought = false
}) => {
  // If system narrator, don't show character portrait
  if (speakerId === "narrator" || (!speaker && !isThought && speakerId !== "minh")) {
    return null;
  }

  const charId = isThought ? "minh" : (speaker?.id || speakerId || "minh");
  const charName = isThought ? "Minh (Nội tâm)" : (speaker?.name || "Minh");
  const isHistorical = speaker?.kind === "historical";

  // Visual avatar configurations
  const getAvatarIcon = (id: string) => {
    switch (id) {
      case "nguyen-ai-quoc":
        return "⭐";
      case "lan":
        return "🌸";
      case "bac-tu":
        return "⚓";
      case "ban-tho-anh":
        return "📷";
      case "tho-viet-kieu":
        return "⚙️";
      case "minh":
      default:
        return "👤";
    }
  };

  const getRoleTag = (id: string) => {
    switch (id) {
      case "nguyen-ai-quoc":
        return "Lãnh tụ Nguyễn Ái Quốc";
      case "lan":
        return "Học viên Quảng Châu";
      case "bac-tu":
        return "Thợ máy Bác Tư";
      case "ban-tho-anh":
        return "Thợ ảnh Paris";
      case "tho-viet-kieu":
        return "Thợ Việt kiều tại Pháp";
      case "minh":
      default:
        return isThought ? "Suy ngẫm" : "Thanh niên Minh";
    }
  };

  return (
    <div className="flex flex-col items-center justify-end pb-2 animate-fadeIn pointer-events-none select-none">
      <div className={`relative px-5 py-3 rounded-2xl border-2 backdrop-blur-md shadow-2xl transition-all duration-300 flex items-center space-x-3.5 ${
        isHistorical
          ? "bg-gradient-to-r from-[#3e1313]/90 to-[#290d0d]/90 border-amber-500 shadow-amber-950/50"
          : isThought
          ? "bg-stone-900/85 border-amber-700/50"
          : "bg-[#251c17]/90 border-[#8b6f47]"
      }`}>
        {/* Avatar circle */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 shadow-inner ${
          isHistorical
            ? "bg-[#8B1A1A] border-amber-400 text-amber-200"
            : "bg-[#33261f] border-[#a08257] text-[#f3ead7]"
        }`}>
          {getAvatarIcon(charId)}
        </div>

        {/* Character info */}
        <div className="text-left">
          <div className="flex items-center space-x-2">
            <h4 className={`font-serif font-bold text-base leading-tight ${
              isHistorical ? "text-amber-200" : "text-[#f5ece0]"
            }`}>
              {charName}
            </h4>
            {isHistorical && (
              <span className="text-[10px] bg-red-950 text-amber-300 font-semibold px-2 py-0.5 rounded border border-amber-700/60 uppercase tracking-wider">
                Lịch sử
              </span>
            )}
          </div>
          <span className="text-xs text-stone-400 font-sans block mt-0.5">
            {getRoleTag(charId)}
          </span>
        </div>
      </div>
    </div>
  );
};
