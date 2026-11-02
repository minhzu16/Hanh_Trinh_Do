import React, { useState, useEffect } from "react";
import type { HistoricalVideoRecord } from "../art/historicalVideos";

interface HistoricalVideoModalProps {
  video: HistoricalVideoRecord;
  onClose: () => void;
}

export const HistoricalVideoModal: React.FC<HistoricalVideoModalProps> = ({ video, onClose }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [filmSpeed, setFilmSpeed] = useState<"16fps" | "24fps">("16fps");

  // Keyboard shortcut ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Simulated projector reel playback timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTimeSec((prev) => {
        if (prev >= 105) return 0; // loop
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-md animate-fadeIn select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-xl bg-[#140f0c] border border-amber-900/60 shadow-2xl text-stone-200 flex flex-col"
      >
        {/* Cinema Marquee Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-amber-900/40 bg-gradient-to-r from-[#21150f] via-[#1a110c] to-[#21150f]">
          <div className="flex items-center space-x-2.5">
            <span className="text-xl">🎞️</span>
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-amber-400">
                <span className="px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-700/60 font-semibold">
                  {video.label.toUpperCase()} {video.year}
                </span>
                <span>•</span>
                <span className="text-stone-400">{video.duration}</span>
              </div>
              <h2 id="video-modal-title" className="text-base sm:text-lg font-serif font-bold text-amber-100 mt-0.5 line-clamp-1">
                {video.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 px-3 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition cursor-pointer text-sm font-bold border border-stone-700"
            title="Đóng (ESC)"
          >
            ✕
          </button>
        </div>

        {/* Vintage 1920s Projector Screen Viewport */}
        <div className="relative w-full aspect-video bg-black flex flex-col items-center justify-center overflow-hidden border-b border-amber-900/40">
          {/* Film Grain & Scratches Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen bg-repeat bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] animate-pulse" />

          {/* Projector Flicker Light Beam Effect */}
          <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isPlaying ? "opacity-20 animate-pulse bg-gradient-to-b from-amber-100/10 via-transparent to-black" : "opacity-0"}`} />

          {/* Historical Sepia Projection Content */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 text-center bg-gradient-to-br from-[#2a1b12] to-[#0d0907] text-amber-100">
            {/* Film Countdown / Title Card */}
            <div className="max-w-xl mx-auto p-6 rounded-lg border-2 border-amber-700/60 bg-black/60 backdrop-blur-sm shadow-2xl">
              <div className="text-[11px] font-mono tracking-widest uppercase text-amber-500 mb-2">
                HÀNH TRÌNH ĐỎ — MINH HOẠ TÁI HIỆN BỐI CẢNH LỊCH SỬ (1911–1930)
              </div>
              <h3 className="text-lg sm:text-2xl font-serif font-bold text-amber-200 mb-3 tracking-wide">
                « {video.title} »
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-serif italic leading-relaxed line-clamp-3">
                "{video.description}"
              </p>

              {/* Simulated Reel Running Indicator */}
              <div className="mt-4 flex items-center justify-center space-x-3 text-xs font-mono text-amber-400">
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${isPlaying ? "bg-red-500 animate-ping" : "bg-stone-600"}`} />
                <span>{isPlaying ? `ĐANG CHIẾU (${filmSpeed})` : "TẠM DỪNG"}</span>
                <span>•</span>
                <span>{formatTime(currentTimeSec)} / {video.duration}</span>
              </div>
            </div>
          </div>

          {/* Bottom Player Control Bar */}
          <div className="absolute bottom-0 left-0 right-0 z-20 px-4 py-2 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between text-xs font-mono text-stone-300">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsPlaying((prev) => !prev)}
                className="px-3 py-1 rounded bg-amber-700 hover:bg-amber-600 text-white font-bold transition cursor-pointer flex items-center space-x-1"
              >
                <span>{isPlaying ? "⏸ Tạm dừng" : "▶ Phát"}</span>
              </button>

              <button
                onClick={() => setFilmSpeed((prev) => (prev === "16fps" ? "24fps" : "16fps"))}
                className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-amber-300 transition cursor-pointer border border-stone-700 text-[11px]"
                title="Tốc độ máy quay phim câm thời kỳ 1920"
              >
                Tốc độ: {filmSpeed}
              </button>
            </div>

            <div className="text-stone-400 text-[11px] hidden sm:block">
              Bối cảnh: <span className="text-amber-300">{video.curriculumNote}</span>
            </div>
          </div>
        </div>

        {/* Detailed Archival Context & Educational Notes */}
        <div className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm leading-relaxed">
          <div>
            <h4 className="text-xs font-mono font-bold tracking-wider text-amber-400 uppercase">
              Tóm tắt bối cảnh thước phim
            </h4>
            <p className="text-stone-200 mt-1 font-serif leading-normal">
              {video.summary}
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#1e1510] border border-amber-900/40">
            <h4 className="text-xs font-mono font-bold tracking-wider text-amber-400 uppercase">
              Ý nghĩa lịch sử
            </h4>
            <p className="text-amber-100/90 mt-1 font-serif italic leading-normal">
              {video.historicalSignificance}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-amber-900/30 text-xs text-stone-400 font-mono">
            <span>🎬 Tư liệu lịch sử tái hiện</span>
            <span>Mẹo: Bấm Space để Phát/Dừng, ESC để đóng</span>
          </div>
        </div>
      </div>
    </div>
  );
};

