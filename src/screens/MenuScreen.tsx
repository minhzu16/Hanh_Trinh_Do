import React, { useEffect } from "react";
import type { GameContent } from "../engine/types";
import { audioManager } from "../audio";

interface MenuScreenProps {
  content: GameContent;
  hasSave: boolean;
  onStartNew: () => void;
  onContinue: () => void;
  onOpenCollection: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  hasCompletedGame?: boolean;
  onSelectChapter?: (sceneId: string) => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({
  content,
  hasSave,
  onStartNew,
  onContinue,
  onOpenCollection,
  isMuted,
  onToggleMute,
  hasCompletedGame = false,
  onSelectChapter
}) => {
  const strings = content.strings;

  useEffect(() => {
    audioManager.playBgm("bgm-chu-de-chinh");
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col justify-between p-6 sm:p-12 overflow-hidden bg-gradient-to-b from-[#1c120c] via-[#24130d] to-[#140b07] select-none">
      {/* Background ambient pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#c8a24a_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Top right mute button */}
      <div className="flex justify-end z-10">
        <button
          onClick={onToggleMute}
          className="px-3 py-1.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 border border-stone-700 text-sm cursor-pointer transition flex items-center space-x-1.5 shadow-md"
          title="Bật/Tắt âm thanh"
        >
          <span>{isMuted ? "🔇" : "🔊"}</span>
          <span className="font-sans text-xs">{isMuted ? "Âm thanh: Tắt" : "Âm thanh: Bật"}</span>
        </button>
      </div>

      {/* Center title area */}
      <div className="max-w-2xl mx-auto text-center z-10 space-y-4 my-auto">
        <div className="inline-block px-4 py-1 rounded-full bg-red-950/80 border border-red-700/60 text-xs font-semibold tracking-widest text-red-300 uppercase">
          Visual Novel Lịch Sử Đảng
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-red-400 drop-shadow-md tracking-wide">
          {strings["menu.title"] || "Hành Trình Đỏ"}
        </h1>

        <p className="text-lg sm:text-xl font-serif text-amber-200/90 font-medium">
          {strings["menu.subtitle"] || "1911 – 1930: Con đường đến với Đảng"}
        </p>

        {/* Action buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          {hasSave && (
            <button
              onClick={() => {
                audioManager.resumeContext();
                audioManager.playSfx("sfx-chon");
                onContinue();
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-serif font-bold text-base shadow-xl border border-amber-400 transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              ▶ {strings["menu.continue"] || "Chơi tiếp"}
            </button>
          )}

          <button
            onClick={() => {
              audioManager.resumeContext();
              audioManager.playSfx("sfx-chon");
              onStartNew();
            }}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-lg font-serif font-bold text-base shadow-xl transition transform hover:-translate-y-0.5 cursor-pointer ${
              hasSave
                ? "bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600"
                : "bg-gradient-to-r from-[#9E1B1B] to-[#7A1515] hover:from-[#B52020] hover:to-[#8E1818] text-amber-100 border border-amber-500/50"
            }`}
          >
            {hasSave ? (strings["menu.restart"] || "Chơi lại từ đầu") : (strings["menu.start"] || "Bắt đầu hành trình")}
          </button>

          <button
            onClick={() => {
              audioManager.resumeContext();
              audioManager.playSfx("sfx-chon");
              onOpenCollection();
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-stone-900/90 hover:bg-stone-800 text-amber-200 font-serif font-semibold text-base border border-amber-800/60 transition cursor-pointer"
          >
            🏛️ {strings["menu.collection"] || "Bộ sưu tập tư liệu"}
          </button>
        </div>

        {/* Chapter Select (Unlocked after completing game once) */}
        {hasCompletedGame && onSelectChapter && (
          <div className="pt-4 max-w-xl mx-auto w-full text-center space-y-2">
            <div className="text-xs uppercase tracking-widest text-amber-400 font-mono flex items-center justify-center space-x-2">
              <span>👑</span>
              <span>Chọn kỳ lịch sử (Đã hoàn thành)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {content.chapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    audioManager.resumeContext();
                    audioManager.playSfx("sfx-chon");
                    onSelectChapter(ch.scenes[0]);
                  }}
                  className="p-2.5 rounded-lg bg-stone-900/90 hover:bg-stone-800 text-amber-200 border border-amber-800/60 hover:border-amber-500 font-serif transition cursor-pointer text-left sm:text-center shadow-md"
                >
                  <div className="font-bold text-amber-300">{ch.title}</div>
                  <div className="text-[10px] text-stone-400 font-sans mt-0.5">{ch.period}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom disclaimer */}
      <div className="max-w-3xl mx-auto text-center z-10 pt-4">
        <p className="text-xs sm:text-xs text-stone-400/90 leading-relaxed italic bg-black/40 p-3 rounded-lg border border-stone-800">
          📌 {strings["menu.disclaimer"]}
        </p>
      </div>
    </div>
  );
};
