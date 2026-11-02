import React from "react";

interface HeaderProps {
  chapterTitle?: string;
  sceneTitle?: string;
  onOpenLog?: () => void;
  onOpenCollection?: () => void;
  onReturnMenu?: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onToggleHideUi?: () => void;
  onToggleHotspots?: () => void;
  showHotspots?: boolean;
  hasHotspots?: boolean;
  hasVideo?: boolean;
  onOpenVideo?: () => void;
  onOpenSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  chapterTitle,
  sceneTitle,
  onOpenLog,
  onOpenCollection,
  onReturnMenu,
  isMuted,
  onToggleMute,
  onToggleHideUi,
  onToggleHotspots,
  showHotspots = false,
  hasHotspots = false,
  hasVideo = false,
  onOpenVideo,
  onOpenSettings
}) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3 bg-gradient-to-b from-black/85 via-black/40 to-transparent text-sm select-none">
      <div className="flex items-center space-x-2 sm:space-x-3">
        <span className="font-serif font-bold text-red-400 tracking-wider text-xs sm:text-sm">HÀNH TRÌNH ĐỎ</span>
        {chapterTitle && (
          <>
            <span className="text-stone-500">/</span>
            <span className="text-amber-200/90 font-medium text-xs sm:text-sm hidden xs:inline">{chapterTitle}</span>
          </>
        )}
        {sceneTitle && (
          <>
            <span className="text-stone-500 hidden md:inline">/</span>
            <span className="text-stone-300 text-xs hidden md:inline truncate max-w-[200px]">{sceneTitle}</span>
          </>
        )}
      </div>

      <div className="flex items-center space-x-1.5 sm:space-x-2">
        {/* Historical Video Reel Button */}
        {hasVideo && onOpenVideo && (
          <button
            onClick={onOpenVideo}
            className="px-2.5 py-1 rounded text-xs bg-red-900/80 hover:bg-red-800 text-amber-200 border border-amber-600/80 shadow-red-950/60 shadow-md transition cursor-pointer flex items-center space-x-1 animate-pulse"
            title="Xem thước phim tư liệu lịch sử (V)"
          >
            <span>🎞️</span>
            <span className="hidden sm:inline font-semibold">Phim tư liệu</span>
          </button>
        )}

        {/* Toggle Interactive Hotspots */}
        {hasHotspots && onToggleHotspots && (
          <button
            onClick={onToggleHotspots}
            className={`px-2.5 py-1 rounded text-xs border transition cursor-pointer flex items-center space-x-1 ${
              showHotspots
                ? "bg-amber-600/90 text-white border-amber-400 shadow-amber-900/50 shadow-md animate-pulse"
                : "bg-stone-800/80 hover:bg-stone-700 text-amber-200 border-stone-700"
            }`}
            title="Bật/Tắt điểm khám phá bối cảnh (E)"
          >
            <span>🔍</span>
            <span className="hidden sm:inline">Khám phá</span>
          </button>
        )}

        {/* Hide UI to admire scenery */}
        {onToggleHideUi && (
          <button
            onClick={onToggleHideUi}
            className="px-2.5 py-1 rounded bg-stone-800/80 hover:bg-stone-700 text-stone-200 text-xs border border-stone-700 transition cursor-pointer flex items-center space-x-1"
            title="Ẩn giao diện ngắm tranh bối cảnh (H)"
          >
            <span>👁️</span>
            <span className="hidden sm:inline">Ẩn UI</span>
          </button>
        )}

        {onOpenLog && (
          <button
            onClick={onOpenLog}
            className="px-2.5 py-1 rounded bg-stone-800/80 hover:bg-stone-700 text-stone-200 text-xs border border-stone-700 transition cursor-pointer"
            title="Xem lại lời thoại (L)"
          >
            📜 <span className="hidden sm:inline">Nhật ký</span>
          </button>
        )}
        {onOpenCollection && (
          <button
            onClick={onOpenCollection}
            className="px-2.5 py-1 rounded bg-stone-800/80 hover:bg-stone-700 text-amber-200 text-xs border border-stone-700 transition cursor-pointer"
            title="Bộ sưu tập tư liệu"
          >
            🏛️ <span className="hidden sm:inline">Tư liệu</span>
          </button>
        )}
        <button
          onClick={onToggleMute}
          className="p-1 px-2 rounded bg-stone-800/80 hover:bg-stone-700 text-stone-300 text-xs border border-stone-700 transition cursor-pointer"
          title="Bật/Tắt âm thanh (M)"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
        {onOpenSettings && (
          <button
            onClick={onOpenSettings}
            className="p-1 px-2 rounded bg-stone-800/80 hover:bg-stone-700 text-stone-300 text-xs border border-stone-700 transition cursor-pointer"
            title="Cài đặt & Trợ năng"
          >
            ⚙️
          </button>
        )}
        {onReturnMenu && (
          <button
            onClick={onReturnMenu}
            className="px-2.5 py-1 rounded bg-stone-900/80 hover:bg-red-950 text-stone-300 hover:text-red-200 text-xs border border-stone-700 transition cursor-pointer"
          >
            Menu
          </button>
        )}
      </div>
    </header>
  );
};
