import React from "react";

interface HeaderProps {
  chapterTitle?: string;
  sceneTitle?: string;
  onOpenLog?: () => void;
  onOpenCollection?: () => void;
  onReturnMenu?: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  chapterTitle,
  sceneTitle,
  onOpenLog,
  onOpenCollection,
  onReturnMenu,
  isMuted,
  onToggleMute
}) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent text-sm">
      <div className="flex items-center space-x-3">
        <span className="font-serif font-bold text-red-400 tracking-wider">HÀNH TRÌNH ĐỎ</span>
        {chapterTitle && (
          <>
            <span className="text-stone-500">/</span>
            <span className="text-amber-200/90 font-medium">{chapterTitle}</span>
          </>
        )}
        {sceneTitle && (
          <>
            <span className="text-stone-500 hidden sm:inline">/</span>
            <span className="text-stone-300 text-xs hidden sm:inline">{sceneTitle}</span>
          </>
        )}
      </div>

      <div className="flex items-center space-x-2">
        {onOpenLog && (
          <button
            onClick={onOpenLog}
            className="px-2.5 py-1 rounded bg-stone-800/80 hover:bg-stone-700 text-stone-200 text-xs border border-stone-700 transition"
            title="Xem lại lời thoại (L)"
          >
            📜 Nhật ký
          </button>
        )}
        {onOpenCollection && (
          <button
            onClick={onOpenCollection}
            className="px-2.5 py-1 rounded bg-stone-800/80 hover:bg-stone-700 text-amber-200 text-xs border border-stone-700 transition"
            title="Bộ sưu tập tư liệu"
          >
            🏛️ Tư liệu
          </button>
        )}
        <button
          onClick={onToggleMute}
          className="p-1 px-2 rounded bg-stone-800/80 hover:bg-stone-700 text-stone-300 text-xs border border-stone-700 transition"
          title="Bật/Tắt âm thanh (M)"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
        {onReturnMenu && (
          <button
            onClick={onReturnMenu}
            className="px-2.5 py-1 rounded bg-stone-900/80 hover:bg-red-950 text-stone-300 hover:text-red-200 text-xs border border-stone-700 transition"
          >
            Menu
          </button>
        )}
      </div>
    </header>
  );
};

