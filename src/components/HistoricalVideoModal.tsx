import React, { useState, useEffect, useRef, useMemo } from "react";
import type { HistoricalVideoRecord } from "../art/historicalVideos";
import { audioManager } from "../audio";

interface HistoricalVideoModalProps {
  video: HistoricalVideoRecord;
  onClose: () => void;
}

export const HistoricalVideoModal: React.FC<HistoricalVideoModalProps> = ({ video, onClose }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [durationSec, setDurationSec] = useState<number>(0);
  const [filmSpeed, setFilmSpeed] = useState<"16fps" | "24fps">("16fps");
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [hasVideoError, setHasVideoError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [viewMode, setViewMode] = useState<"video" | "simulation">("video");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const resolvePath = (url?: string) => {
    if (!url) return undefined;
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    const cleanPath = url.startsWith("/") ? url.slice(1) : url;
    const base = import.meta.env.BASE_URL || "/";
    return `${base.replace(/\/$/, "")}/${cleanPath}`;
  };

  const resolvedMp4Url = useMemo(() => {
    if (video.mp4Url) return resolvePath(video.mp4Url);
    if (video.videoUrl?.endsWith(".webm")) {
      return resolvePath(video.videoUrl.replace(/\.webm$/, ".mp4"));
    }
    return resolvePath(video.videoUrl);
  }, [video.mp4Url, video.videoUrl]);

  const resolvedWebmUrl = useMemo(() => {
    if (video.videoUrl?.endsWith(".webm")) return resolvePath(video.videoUrl);
    if (video.mp4Url?.endsWith(".mp4")) {
      return resolvePath(video.mp4Url.replace(/\.mp4$/, ".webm"));
    }
    return resolvePath(video.videoUrl);
  }, [video.videoUrl, video.mp4Url]);

  const primaryVideoUrl = resolvedMp4Url || resolvedWebmUrl;

  // Keyboard shortcuts: ESC to close, Space to Play/Pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        togglePlayPause();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Adjust playback rate when film speed toggles (16fps silent era vs 24fps modern)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = filmSpeed === "16fps" ? 0.75 : 1.0;
    }
  }, [filmSpeed]);

  // Sync play/pause with video element safely
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (isPlaying) {
      const playPromise = el.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback: try muted
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play()?.catch(() => {
              setIsPlaying(false);
            });
          }
        });
      }
    } else {
      el.pause();
    }
  }, [isPlaying]);

  // Fallback timer when running in simulation mode or video error
  useEffect(() => {
    if (viewMode === "video" && primaryVideoUrl && !hasVideoError) return;
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTimeSec((prev) => {
        if (prev >= 105) return 0;
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, primaryVideoUrl, hasVideoError, viewMode]);

  const togglePlayPause = () => {
    audioManager.playSfx("sfx-chon");
    setIsPlaying((prev) => !prev);
  };

  const toggleSpeed = () => {
    audioManager.playSfx("sfx-chon");
    setFilmSpeed((prev) => (prev === "16fps" ? "24fps" : "16fps"));
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted((prev) => !prev);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = Number(e.target.value);
    setCurrentTimeSec(target);
    if (videoRef.current) {
      videoRef.current.currentTime = target;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const retryVideo = () => {
    setHasVideoError(false);
    setErrorMessage("");
    setViewMode("video");
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play()?.catch(() => {});
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const totalTimeDisplay = durationSec > 0 ? formatTime(durationSec) : video.duration;

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-md animate-fadeIn select-none"
    >
      <div
        ref={containerRef}
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
                <span className="text-stone-400">{totalTimeDisplay}</span>
              </div>
              <h2 id="video-modal-title" className="text-base sm:text-lg font-serif font-bold text-amber-100 mt-0.5 line-clamp-1">
                {video.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Mode Toggle */}
            {primaryVideoUrl && !hasVideoError && (
              <button
                onClick={() => setViewMode((prev) => (prev === "video" ? "simulation" : "video"))}
                className="px-2.5 py-1 rounded bg-stone-800/90 hover:bg-stone-700 text-amber-300 text-xs font-mono border border-amber-900/50 transition cursor-pointer"
                title="Chuyển chế độ xem video hoặc thẻ tóm tắt bối cảnh"
              >
                {viewMode === "video" ? "📜 Thẻ bối cảnh" : "🎞️ Thước phim"}
              </button>
            )}

            {/* Direct Open in new tab fallback */}
            {primaryVideoUrl && (
              <a
                href={primaryVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-stone-800/90 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-mono border border-stone-700 transition"
                title="Mở tệp video trực tiếp trong tab mới"
              >
                <span>↗ Mở tab mới</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="p-1.5 px-3 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition cursor-pointer text-sm font-bold border border-stone-700"
              title="Đóng (ESC)"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Vintage 1920s Projector Screen Viewport */}
        <div
          onClick={togglePlayPause}
          className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden border-b border-amber-900/40 group cursor-pointer"
        >
          {/* Real Video Player with Dual MP4/WebM Source */}
          {primaryVideoUrl && viewMode === "video" && !hasVideoError ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                crossOrigin="anonymous"
                className="w-full h-full object-contain filter sepia-[0.30] contrast-125 brightness-95"
                onTimeUpdate={() => {
                  if (videoRef.current) {
                    setCurrentTimeSec(Math.floor(videoRef.current.currentTime));
                  }
                }}
                onLoadedMetadata={() => {
                  if (videoRef.current && videoRef.current.duration) {
                    setDurationSec(Math.floor(videoRef.current.duration));
                  }
                }}
                onError={(e) => {
                  const mediaErr = e.currentTarget.error;
                  setErrorMessage(mediaErr?.message || "Lỗi nạp tệp video");
                  setHasVideoError(true);
                }}
              >
                {resolvedMp4Url && <source src={resolvedMp4Url} type="video/mp4" />}
                {resolvedWebmUrl && <source src={resolvedWebmUrl} type="video/webm" />}
                Trình duyệt của bạn không hỗ trợ thẻ video HTML5.
              </video>

              {/* Big Play Overlay Icon when paused */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-amber-600/80 flex items-center justify-center text-white text-3xl shadow-2xl border-2 border-amber-300/80">
                    ▶
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Historical Sepia Projection Fallback / Simulation Card */
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 text-center bg-gradient-to-br from-[#2a1b12] to-[#0d0907] text-amber-100">
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

                {hasVideoError && (
                  <div className="mt-3 p-2.5 rounded bg-red-950/90 border border-red-700/60 text-xs text-red-200 space-y-2">
                    <p>⚠️ Không thể phát video trực tiếp ({errorMessage || "Chưa nạp xong tệp video"}).</p>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          retryVideo();
                        }}
                        className="px-3 py-1 rounded bg-red-800 hover:bg-red-700 text-white font-bold text-[11px] cursor-pointer"
                      >
                        🔄 Thử tải lại video
                      </button>
                      {primaryVideoUrl && (
                        <a
                          href={primaryVideoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-3 py-1 rounded bg-amber-700 hover:bg-amber-600 text-white font-bold text-[11px] inline-flex items-center space-x-1"
                        >
                          <span>↗ Xem trực tiếp file video</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-center space-x-3 text-xs font-mono text-amber-400">
                  <span className={`inline-block w-2.5 h-2.5 rounded-full ${isPlaying ? "bg-red-500 animate-ping" : "bg-stone-600"}`} />
                  <span>{isPlaying ? `ĐANG CHIẾU (${filmSpeed})` : "TẠM DỪNG"}</span>
                  <span>•</span>
                  <span>{formatTime(currentTimeSec)} / {video.duration}</span>
                </div>
              </div>
            </div>
          )}

          {/* Film Grain & Scratches Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen bg-repeat bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] animate-pulse" />

          {/* Projector Flicker Light Beam Effect */}
          <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isPlaying ? "opacity-15 animate-pulse bg-gradient-to-b from-amber-100/10 via-transparent to-black" : "opacity-0"}`} />

          {/* Watermark vintage badge */}
          <div className="absolute top-3 left-3 z-20 pointer-events-none px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-amber-800/40 text-[10px] font-mono text-amber-300/80 uppercase">
            🎞️ Phim tư liệu 1920s • {filmSpeed}
          </div>

          {/* Bottom Player Control Bar with Scrubber */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-0 left-0 right-0 z-20 px-4 py-2 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col space-y-1.5 text-xs font-mono text-stone-300"
          >
            {/* Interactive Timeline Scrubber */}
            <div className="w-full flex items-center space-x-2">
              <input
                type="range"
                min={0}
                max={durationSec > 0 ? durationSec : 100}
                value={currentTimeSec}
                onChange={handleSeek}
                className="w-full h-1.5 bg-stone-700 accent-amber-500 rounded cursor-pointer"
                aria-label="Thanh tiến trình video"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={togglePlayPause}
                  className="px-3 py-1 rounded bg-amber-700 hover:bg-amber-600 text-white font-bold transition cursor-pointer flex items-center space-x-1 shadow"
                >
                  <span>{isPlaying ? "⏸ Tạm dừng" : "▶ Phát"}</span>
                </button>

                <button
                  onClick={toggleSpeed}
                  className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-amber-300 transition cursor-pointer border border-stone-700 text-[11px]"
                  title="Tốc độ máy quay phim câm thời kỳ 1920 (0.75x vs 1.0x)"
                >
                  Tốc độ: {filmSpeed}
                </button>

                {primaryVideoUrl && viewMode === "video" && !hasVideoError && (
                  <button
                    onClick={toggleMute}
                    className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition cursor-pointer border border-stone-700 text-[11px]"
                    title={isMuted ? "Bật âm thanh video" : "Tắt tiếng"}
                  >
                    {isMuted ? "🔇 Tắt tiếng" : "🔊 Bật tiếng"}
                  </button>
                )}

                <button
                  onClick={toggleFullscreen}
                  className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition cursor-pointer border border-stone-700 text-[11px]"
                  title="Toàn màn hình máy chiếu"
                >
                  ⛶
                </button>

                <span className="text-amber-400 font-mono text-[11px]">
                  {formatTime(currentTimeSec)} / {totalTimeDisplay}
                </span>
              </div>

              <div className="text-stone-400 text-[11px] hidden sm:block truncate max-w-xs">
                Bối cảnh: <span className="text-amber-300">{video.curriculumNote}</span>
              </div>
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
            <span>Mẹo: Click vào khung hình hoặc phím Space để Phát/Dừng, ESC để đóng</span>
          </div>
        </div>
      </div>
    </div>
  );
};
