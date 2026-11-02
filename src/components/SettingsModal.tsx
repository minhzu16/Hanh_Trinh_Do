import React, { useEffect } from "react";

export type TextSpeed = "slow" | "normal" | "fast" | "instant";

export interface SettingsConfig {
  textSpeed: TextSpeed;
  bgmVolume: number;
  sfxVolume: number;
  autoPlay: boolean;
  skipRead: boolean;
  showCitations: boolean;
}

interface SettingsModalProps {
  settings: SettingsConfig;
  onUpdateSettings: (updater: (prev: SettingsConfig) => SettingsConfig) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onClose
}) => {
  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#1a1410] border-2 border-amber-800/80 rounded-2xl p-6 sm:p-7 shadow-2xl text-stone-200 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-900/40 pb-3">
          <div className="flex items-center space-x-2 text-amber-200">
            <span className="text-xl">⚙️</span>
            <h3 id="settings-modal-title" className="text-lg font-serif font-bold">
              Cài đặt Trải nghiệm & Trợ năng
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 text-sm flex items-center justify-center border border-stone-600 cursor-pointer"
            title="Đóng (ESC)"
          >
            ✕
          </button>
        </div>

        {/* 1. Tốc độ hiển thị chữ (Typewriter Speed) */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block">
            Tốc độ chạy chữ lời thoại
          </label>
          <div className="grid grid-cols-4 gap-2 text-xs">
            {(
              [
                ["slow", "Chậm"],
                ["normal", "Chuẩn"],
                ["fast", "Nhanh"],
                ["instant", "Tức thì"]
              ] as const
            ).map(([speedKey, label]) => (
              <button
                key={speedKey}
                onClick={() =>
                  onUpdateSettings((prev) => ({ ...prev, textSpeed: speedKey }))
                }
                className={`py-2 px-1 rounded-lg border font-medium transition cursor-pointer text-center ${
                  settings.textSpeed === speedKey
                    ? "bg-amber-900/60 border-amber-500 text-amber-100 font-bold shadow-md"
                    : "bg-stone-900/80 border-stone-800 text-stone-400 hover:text-stone-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Âm lượng Nhạc nền (BGM) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-amber-400 font-bold uppercase tracking-wider">
              Âm lượng Nhạc nền (BGM)
            </span>
            <span className="text-stone-300">{Math.round(settings.bgmVolume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={settings.bgmVolume}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              onUpdateSettings((prev) => ({ ...prev, bgmVolume: val }));
            }}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* 3. Âm lượng Hiệu ứng (SFX) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-amber-400 font-bold uppercase tracking-wider">
              Âm lượng Hiệu ứng (SFX)
            </span>
            <span className="text-stone-300">{Math.round(settings.sfxVolume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={settings.sfxVolume}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              onUpdateSettings((prev) => ({ ...prev, sfxVolume: val }));
            }}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* 4. Tùy chọn nâng cao */}
        <div className="pt-2 border-t border-amber-900/40 space-y-3 text-xs">
          {/* Tự động chạy */}
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-stone-300">Chế độ Tự chạy (Auto-play thoại)</span>
            <input
              type="checkbox"
              checked={settings.autoPlay}
              onChange={(e) =>
                onUpdateSettings((prev) => ({ ...prev, autoPlay: e.target.checked }))
              }
              className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
            />
          </label>

          {/* Bỏ qua đoạn đã đọc */}
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-stone-300">Cho phép Bỏ qua nhanh (Skip)</span>
            <input
              type="checkbox"
              checked={settings.skipRead}
              onChange={(e) =>
                onUpdateSettings((prev) => ({ ...prev, skipRead: e.target.checked }))
              }
              className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
            />
          </label>

          {/* Hiện trích dẫn số trang */}
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-stone-300">Luôn hiển thị số trang Giáo trình</span>
            <input
              type="checkbox"
              checked={settings.showCitations}
              onChange={(e) =>
                onUpdateSettings((prev) => ({ ...prev, showCitations: e.target.checked }))
              }
              className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
            />
          </label>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-amber-900/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-amber-800 hover:bg-amber-700 text-white font-semibold text-xs transition cursor-pointer shadow-md"
          >
            Đóng & Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
};

