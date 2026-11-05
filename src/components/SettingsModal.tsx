import React, { useEffect, useState } from "react";
import { listSaveSlots, clearSaveSlot, type SaveSlotInfo } from "../engine/save";
import type { TextSpeed, SettingsConfig } from "../engine/settings";
export type { TextSpeed, SettingsConfig };

interface SettingsModalProps {
  settings: SettingsConfig;
  onUpdateSettings: (updater: (prev: SettingsConfig) => SettingsConfig) => void;
  onClose: () => void;
  onSaveSlot?: (slot: number) => void;
  onLoadSlot?: (slot: number) => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onClose,
  onSaveSlot,
  onLoadSlot,
  isMuted = false,
  onToggleMute
}) => {
  const [activeTab, setActiveTab] = useState<"settings" | "saves">("settings");
  const [slots, setSlots] = useState<SaveSlotInfo[]>(() => listSaveSlots());
  const [slotToast, setSlotToast] = useState<string | null>(null);

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const refreshSlots = () => {
    setSlots(listSaveSlots());
  };

  const handleSaveToSlot = (slotNum: number) => {
    if (onSaveSlot) {
      onSaveSlot(slotNum);
      refreshSlots();
      setSlotToast(`Đã lưu vào Ô ${slotNum}`);
      setTimeout(() => setSlotToast(null), 2500);
    }
  };

  const handleLoadFromSlot = (slotNum: number) => {
    if (onLoadSlot) {
      onLoadSlot(slotNum);
      onClose();
    }
  };

  const handleClearSlot = (slotNum: number) => {
    clearSaveSlot(slotNum);
    refreshSlots();
    setSlotToast(`Đã xóa Ô ${slotNum}`);
    setTimeout(() => setSlotToast(null), 2500);
  };

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
        className="w-full max-w-lg bg-[#1a1410] border-2 border-amber-800/80 rounded-2xl p-6 sm:p-7 shadow-2xl text-stone-200 space-y-5"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-900/40 pb-2.5">
          <div className="flex items-center space-x-2">
            <span className="text-xl">⚙️</span>
            <h3 id="settings-modal-title" className="text-base font-serif font-bold text-amber-200">
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

        {/* Tab navigation */}
        <div className="flex items-center space-x-3 border-b border-stone-800 pb-2">
          <button
            onClick={() => setActiveTab("settings")}
            className={`text-xs sm:text-sm font-medium transition cursor-pointer pb-0.5 border-b-2 ${
              activeTab === "settings"
                ? "text-amber-200 border-amber-400 font-bold"
                : "text-stone-400 border-transparent hover:text-stone-200"
            }`}
          >
            ⚙️ Tùy chọn âm thanh & Chữ
          </button>
          <button
            onClick={() => setActiveTab("saves")}
            className={`text-xs sm:text-sm font-medium transition cursor-pointer pb-0.5 border-b-2 ${
              activeTab === "saves"
                ? "text-amber-200 border-amber-400 font-bold"
                : "text-stone-400 border-transparent hover:text-stone-200"
            }`}
          >
            💾 3 Ô lưu tiến trình
          </button>
        </div>

        {slotToast && (
          <div className="px-3 py-1.5 rounded bg-amber-900/80 border border-amber-500 text-amber-200 text-xs text-center font-mono">
            {slotToast}
          </div>
        )}

        {/* Tab 1: Settings */}
        {activeTab === "settings" && (
          <div className="space-y-4">
            {/* 0. Tắt toàn bộ âm thanh (Master Mute Toggle) */}
            {onToggleMute && (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900/90 border border-stone-800">
                <div className="flex items-center space-x-2">
                  <span className="text-base">{isMuted ? "🔇" : "🔊"}</span>
                  <span className="text-xs text-stone-200 font-medium">Toàn bộ âm thanh</span>
                </div>
                <button
                  type="button"
                  onClick={onToggleMute}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer border ${
                    isMuted
                      ? "bg-red-950/80 border-red-500 text-red-200"
                      : "bg-emerald-950/80 border-emerald-500 text-emerald-200"
                  }`}
                >
                  {isMuted ? "Đang Tắt" : "Đang Bật"}
                </button>
              </div>
            )}

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

            {/* 3.5. Giọng đọc thoại AI (Voice-over) */}
            <div className="p-3 rounded-xl bg-stone-900/80 border border-amber-900/40 space-y-2">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-2">
                  <span>🎙️</span>
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                    Giọng đọc AI (Voice-over)
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.voiceEnabled ?? true}
                  onChange={(e) =>
                    onUpdateSettings((prev) => ({ ...prev, voiceEnabled: e.target.checked }))
                  }
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </label>

              {(settings.voiceEnabled ?? true) && (
                <div className="space-y-1 pt-1.5 border-t border-stone-800">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-stone-400">Âm lượng Giọng đọc</span>
                    <span className="text-stone-300">{Math.round((settings.voiceVolume ?? 1.0) * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={settings.voiceVolume ?? 1.0}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      onUpdateSettings((prev) => ({ ...prev, voiceVolume: val }));
                    }}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* 4. Tùy chọn nâng cao */}
            <div className="pt-2 border-t border-amber-900/40 space-y-3 text-xs">
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
            </div>
          </div>
        )}

        {/* Tab 2: 3 Save Slots */}
        {activeTab === "saves" && (
          <div className="space-y-3">
            {slots.map((slotInfo) => {
              const hasData = slotInfo.state !== null;
              const formattedDate = slotInfo.savedAt
                ? new Date(slotInfo.savedAt).toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit"
                  })
                : null;

              return (
                <div
                  key={slotInfo.slot}
                  className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 hover:border-amber-700/60 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-amber-300 font-mono">
                        Ô lưu #{slotInfo.slot}
                      </span>
                      {hasData && (
                        <span className="text-[10px] text-stone-400 font-mono">
                          {formattedDate}
                        </span>
                      )}
                    </div>
                    {hasData ? (
                      <p className="text-stone-300 font-serif truncate">
                        {slotInfo.sceneTitle || slotInfo.sceneId}
                      </p>
                    ) : (
                      <p className="text-stone-500 italic">Trống (Chưa có dữ liệu)</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-1.5 shrink-0">
                    {onSaveSlot && (
                      <button
                        onClick={() => handleSaveToSlot(slotInfo.slot)}
                        className="px-2.5 py-1 rounded bg-amber-900/70 hover:bg-amber-800 text-amber-200 border border-amber-600/70 cursor-pointer font-medium"
                      >
                        Lưu vào ô
                      </button>
                    )}
                    {hasData && onLoadSlot && (
                      <button
                        onClick={() => handleLoadFromSlot(slotInfo.slot)}
                        className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-emerald-300 border border-emerald-600/60 cursor-pointer font-medium"
                      >
                        Tải
                      </button>
                    )}
                    {hasData && (
                      <button
                        onClick={() => handleClearSlot(slotInfo.slot)}
                        className="px-2 py-1 rounded bg-stone-800 hover:bg-red-950 text-stone-400 hover:text-red-300 border border-stone-700 cursor-pointer"
                        title="Xóa ô này"
                      >
                        🗑
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 border-t border-amber-900/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-amber-800 hover:bg-amber-700 text-white font-semibold text-xs transition cursor-pointer shadow-md"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
