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
    <div className="relative w-full h-screen flex flex-col justify-between p-6 sm:p-12 overflow-hidden bg-gradient-to-b from-[#180e0a] via-[#1f110c] to-[#0f0704] select-none">
      {/* Hero Visual: Historic Latouche-Tréville Steamship cutting across the sea towards the red dawn */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <radialGradient id="menuDawnGlow" cx="50%" cy="65%" r="60%">
              <stop offset="0%" stopColor="#b91c1c" stopOpacity="0.45" />
              <stop offset="45%" stopColor="#d97706" stopOpacity="0.25" />
              <stop offset="80%" stopColor="#78350f" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Dawn horizon glow */}
          <rect width="1920" height="1080" fill="url(#menuDawnGlow)" />
          {/* Distant stars */}
          <circle cx="340" cy="180" r="1.5" fill="#fef08a" opacity="0.7" />
          <circle cx="620" cy="120" r="2" fill="#ffffff" opacity="0.8" />
          <circle cx="960" cy="90" r="1.5" fill="#ffffff" opacity="0.6" />
          <circle cx="1320" cy="150" r="2.2" fill="#fef08a" opacity="0.8" />
          <circle cx="1640" cy="110" r="1.5" fill="#ffffff" opacity="0.7" />
          {/* Ocean waves */}
          <path d="M0 720 Q480 690 960 720 T1920 720 L1920 1080 L0 1080 Z" fill="#0b0806" opacity="0.9" />
          <path d="M0 760 Q480 730 960 760 T1920 760 L1920 1080 L0 1080 Z" fill="#140d09" opacity="0.7" />
          {/* Latouche-Tréville Silhouette */}
          <g transform="translate(680, 520) scale(0.75)" opacity="0.65">
            <polygon points="0,220 540,220 620,160 540,160 80,160" fill="#24160f" />
            <rect x="220" y="80" width="35" height="80" fill="#180e0a" />
            <rect x="280" y="85" width="35" height="75" fill="#180e0a" />
            {/* Red band on funnels */}
            <rect x="220" y="105" width="35" height="20" fill="#991b1b" />
            <rect x="280" y="110" width="35" height="20" fill="#991b1b" />
            {/* Billowing smoke */}
            <path d="M220 80 C160 40 80 50 20 80" stroke="#2a1a12" strokeWidth="28" strokeLinecap="round" opacity="0.4" fill="none" />
            <path d="M280 85 C220 45 140 55 70 85" stroke="#321e15" strokeWidth="22" strokeLinecap="round" opacity="0.3" fill="none" />
          </g>
        </svg>
      </div>

      {/* Floating ambient embers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-400 vn-ember-particle"
            style={{
              left: `${10 + (i * 7.5) % 80}%`,
              bottom: `${5 + (i % 4) * 8}%`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              boxShadow: "0 0 6px #f59e0b",
              animationDuration: `${5 + (i % 4) * 1.5}s`,
              animationDelay: `${(i * 0.6) % 3}s`
            }}
          />
        ))}
      </div>

      {/* Vintage film grain & deep vignette */}
      <div className="absolute inset-0 vn-film-grain opacity-45 pointer-events-none" />
      <div className="absolute inset-0 vn-cinematic-vignette pointer-events-none" />

      {/* Background ambient pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#c8a24a_1px,transparent_1px)] [background-size:28px_28px]"></div>

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
