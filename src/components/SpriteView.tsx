import React from "react";
import type { Character } from "../engine/types";
import { CharacterSprite } from "../art/characterSprites";

interface SpriteViewProps {
  speaker?: Character;
  speakerId?: string;
  isThought?: boolean;
  chapterId?: string;
  sceneId?: string;
}

export const SpriteView: React.FC<SpriteViewProps> = ({
  speaker,
  speakerId,
  isThought = false,
  chapterId = "k0",
  sceneId = ""
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
    <div className="flex flex-col items-center justify-end select-none pointer-events-none animate-fadeIn">
      {/* Full standing character visual figure */}
      <div className="mb-[-15px] sm:mb-[-22px] z-10 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)]">
        <CharacterSprite
          characterId={charId}
          chapterId={chapterId}
          sceneId={sceneId}
          isSpeaking={true}
        />
      </div>

      {/* Character Identity & Status Badge */}
      <div className={`relative px-4 py-2 rounded-xl border-2 backdrop-blur-md shadow-2xl transition-all duration-300 flex items-center space-x-3 z-20 ${
        isHistorical
          ? "bg-gradient-to-r from-[#451212]/95 to-[#240a0a]/95 border-amber-400 text-amber-100 shadow-amber-950/60"
          : isThought
          ? "bg-stone-900/90 border-amber-600/60 text-stone-200"
          : "bg-[#251c17]/95 border-[#8b6f47] text-[#f5ece0]"
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
