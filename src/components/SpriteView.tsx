import React from "react";
import type { Character } from "../engine/types";
import { CharacterSprite } from "../art/characterSprites";

interface SpriteViewProps {
  speaker?: Character;
  speakerId?: string;
  isThought?: boolean;
  chapterId?: string;
  sceneId?: string;
  expression?: string;
}

export const SpriteView: React.FC<SpriteViewProps> = ({
  speaker,
  speakerId,
  isThought = false,
  chapterId = "k0",
  sceneId = "",
  expression
}) => {
  // If system narrator, don't show character portrait
  if (speakerId === "narrator" || (!speaker && !isThought && speakerId !== "minh")) {
    return null;
  }

  const charId = isThought ? "minh" : (speaker?.id || speakerId || "minh");
  const charName = isThought ? "Minh (Nội tâm)" : (speaker?.name || "Minh");
  const isHistorical = speaker?.kind === "historical";

  const getRoleTag = (id: string) => {
    switch (id) {
      case "nguyen-ai-quoc":
        return "Lãnh tụ Nguyễn Ái Quốc";
      case "lan":
        return "Học viên Quảng Châu";
      case "bac-tu":
        return "Thợ máy tàu buôn";
      case "ban-tho-anh":
        return "Thợ ảnh Paris";
      case "tho-viet-kieu":
        return "Thợ Việt kiều tại Pháp";
      case "minh":
      default:
        return isThought ? "Suy ngẫm thầm kín" : "Thanh niên yêu nước";
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-end select-none pointer-events-none animate-fadeIn">
      {/* Ambient Halo & Backlight Pedestal to make character pop from dark scene */}
      <div className="absolute -top-10 flex items-center justify-center pointer-events-none -z-10">
        <div
          className={`w-56 h-56 sm:w-72 sm:h-72 rounded-full blur-2xl opacity-45 transition-all duration-700 ${
            isHistorical
              ? "bg-gradient-to-t from-red-600/50 via-amber-400/40 to-yellow-200/30 scale-110 animate-pulse"
              : isThought
              ? "bg-gradient-to-t from-stone-800 via-amber-700/20 to-transparent"
              : "bg-gradient-to-t from-amber-700/35 via-amber-900/25 to-transparent"
          }`}
        />
      </div>

      {/* Ground Contact Shadow - Đổ bóng sàn tiếp đất tạo chiều sâu không gian thật */}
      <div className="absolute bottom-5 sm:bottom-6 w-52 sm:w-64 h-6 vn-character-pedestal -z-5 rounded-full" />

      {/* Full standing character visual figure */}
      <div className={`mb-[-15px] sm:mb-[-22px] z-10 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] ${
        isHistorical ? "vn-rim-glow" : ""
      }`}>
        <CharacterSprite
          characterId={charId}
          chapterId={chapterId}
          sceneId={sceneId}
          isSpeaking={true}
          expression={expression}
        />
      </div>

      {/* Character Identity & Status Badge */}
      <div className={`relative px-4 py-2 rounded-xl border-2 backdrop-blur-md shadow-2xl transition-all duration-300 flex items-center space-x-3 z-20 ${
        isHistorical
          ? "bg-gradient-to-r from-[#451212]/95 to-[#240a0a]/95 border-amber-400 text-amber-100 shadow-amber-950/60"
          : isThought
          ? "bg-stone-900/95 border-amber-600/70 text-stone-200 shadow-black/80"
          : "bg-gradient-to-b from-[#2a1d17]/95 to-[#160f0b]/98 border-amber-700/70 border-t-amber-500/80 text-[#f5ece0] shadow-black/80"
      }`}>
        <div className="text-left">
          <div className="flex items-center space-x-2">
            <h4 className={`font-serif font-bold text-sm sm:text-base leading-tight ${
              isHistorical ? "text-amber-200" : "text-[#f5ece0]"
            }`}>
              {charName}
            </h4>
            {isHistorical && (
              <span className="text-[10px] bg-red-900/90 text-amber-200 font-semibold px-2 py-0.5 rounded border border-amber-500/60 uppercase tracking-wider flex items-center space-x-1">
                <span>⭐</span>
                <span>Lịch sử</span>
              </span>
            )}
            {isThought && (
              <span className="text-[10px] bg-amber-950/80 text-amber-300 px-1.5 py-0.5 rounded border border-amber-700/50">
                💭 Độc thoại
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
