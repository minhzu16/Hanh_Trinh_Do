import React, { useState, useMemo, useEffect } from "react";
import type { GameContent, Collectible, Source, HistoricalVideo } from "../engine/types";
import { audioManager } from "../audio";
import { savePermanentCollectibles } from "../engine/save";
import { CollectibleIllustration } from "../art/collectibleIllustrations";
import { HistoricalVideoModal } from "../components/HistoricalVideoModal";
import {
  HISTORICAL_COLLECTIBLE_PHOTOS,
  HISTORICAL_COLLECTIBLE_GALLERY,
  HISTORICAL_PORTRAITS,
  HISTORICAL_SCENE_PHOTOS,
  type HistoricalPortraitMeta,
  type HistoricalGalleryItem
} from "../data/historicalMedia";

interface CollectionScreenProps {
  content: GameContent;
  unlockedIds: string[];
  onBack: () => void;
}

type TabType = "collectibles" | "videos" | "photos";

interface LightboxMedia {
  url: string;
  title: string;
  subtitle?: string;
  caption?: string;
  source?: string;
}

export const CollectionScreen: React.FC<CollectionScreenProps> = ({
  content,
  unlockedIds,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("collectibles");
  const [collectibleViewMode, setCollectibleViewMode] = useState<"photo" | "art">("photo");
  const [unlockedList, setUnlockedList] = useState<string[]>(unlockedIds);
  const [lightboxMedia, setLightboxMedia] = useState<LightboxMedia | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState<number>(1);

  useEffect(() => {
    setUnlockedList(unlockedIds);
  }, [unlockedIds]);

  useEffect(() => {
    if (!lightboxMedia) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxMedia(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxMedia]);

  const [selectedItem, setSelectedItem] = useState<Collectible | null>(
    content.collectibles[0] || null
  );
  const [selectedVideo, setSelectedVideo] = useState<HistoricalVideo | null>(
    content.videos?.[0] || null
  );
  const [activeModalVideo, setActiveModalVideo] = useState<HistoricalVideo | null>(null);

  // Gallery photo selection (defaults to first core collectible photo)
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<HistoricalGalleryItem | null>(
    HISTORICAL_COLLECTIBLE_GALLERY[0] || null
  );
  const [selectedPortrait, setSelectedPortrait] = useState<HistoricalPortraitMeta | null>(null);

  const sourcesMap = useMemo(() => {
    return new Map<string, Source>(content.sources.map((s) => [s.id, s]));
  }, [content.sources]);

  const chaptersMap = useMemo(() => {
    return new Map<string, string>(content.chapters.map((c) => [c.id, c.title]));
  }, [content.chapters]);

  const isUnlocked = selectedItem ? unlockedList.includes(selectedItem.id) : false;
  const currentSource = selectedItem?.source ? sourcesMap.get(selectedItem.source) : undefined;
  const currentPhotoMeta = selectedItem ? HISTORICAL_COLLECTIBLE_PHOTOS[selectedItem.id] : undefined;

  const handleUnlockAll = () => {
    const allIds = content.collectibles.map((c) => c.id);
    setUnlockedList(allIds);
    savePermanentCollectibles(allIds);
    audioManager.playSfx("sfx-mo-khoa");
  };

  return (
    <div className="relative w-full h-screen flex flex-col justify-between p-4 sm:p-8 bg-gradient-to-b from-[#19120e] to-[#0f0a08] select-none overflow-hidden">
      {/* Top bar with Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-amber-900/60 pb-3 gap-3">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">🏛️</span>
          <div>
            <h2 className="font-serif font-bold text-amber-200 text-lg sm:text-xl">
              Bộ Sưu Tập Tư Liệu Lịch Sử
            </h2>
            <p className="text-xs text-stone-400">
              {activeTab === "collectibles" &&
                `Đã mở khoá: ${unlockedList.length} / ${content.collectibles.length} tư liệu`}
              {activeTab === "videos" &&
                `Thước phim tư liệu lịch sử: ${content.videos?.length || 7} đoạn phim`}
              {activeTab === "photos" &&
                "Toàn bộ 27 ảnh tư liệu lịch sử"}
            </p>
          </div>
        </div>

        {/* Tab Switcher & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {activeTab === "collectibles" && unlockedList.length < content.collectibles.length && (
            <button
              onClick={handleUnlockAll}
              className="px-3 py-1.5 rounded-lg bg-amber-600/90 hover:bg-amber-500 text-amber-100 text-xs font-serif font-bold border border-amber-400/60 shadow transition cursor-pointer flex items-center space-x-1"
              title="Mở khóa tất cả tư liệu"
            >
              <span>🔓 Mở xem tất cả</span>
            </button>
          )}

          <div className="flex items-center space-x-1 sm:space-x-1.5 bg-stone-900/90 p-1 rounded-xl border border-stone-800">
            <button
              onClick={() => {
                audioManager.playSfx("sfx-chon");
                setActiveTab("collectibles");
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition cursor-pointer flex items-center space-x-1.5 ${
                activeTab === "collectibles"
                  ? "bg-amber-700 text-white shadow"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              <span>📜 Hiện vật (8)</span>
            </button>

            <button
              onClick={() => {
                audioManager.playSfx("sfx-chon");
                setActiveTab("videos");
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition cursor-pointer flex items-center space-x-1.5 ${
                activeTab === "videos"
                  ? "bg-amber-700 text-white shadow"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              <span>🎞️ Phim tư liệu (7)</span>
            </button>

            <button
              onClick={() => {
                audioManager.playSfx("sfx-chon");
                setActiveTab("photos");
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition cursor-pointer flex items-center space-x-1.5 ${
                activeTab === "photos"
                  ? "bg-amber-700 text-white shadow"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              <span>📷 Ảnh tư liệu (27)</span>
            </button>
          </div>

          <button
            onClick={onBack}
            className="px-4 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-sm border border-stone-700 cursor-pointer font-serif"
          >
            ← Trở lại
          </button>
        </div>
      </div>

      {/* Main body (2 columns) */}
      <div className="flex-1 my-4 grid grid-cols-1 md:grid-cols-12 gap-6 overflow-hidden">
        {/* TAB 1: Collectibles */}
        {activeTab === "collectibles" && (
          <>
            {/* Left: Collectibles Grid (4 cols) */}
            <div className="md:col-span-4 lg:col-span-4 overflow-y-auto pr-2 space-y-2.5">
              {content.collectibles.map((item) => {
                const unlocked = unlockedList.includes(item.id);
                const isSelected = selectedItem?.id === item.id;
                const photoMeta = HISTORICAL_COLLECTIBLE_PHOTOS[item.id];

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      audioManager.playSfx("sfx-chon");
                      setSelectedItem(item);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition flex items-center space-x-3.5 cursor-pointer ${
                      isSelected
                        ? "bg-[#2d1f19] border-amber-500 shadow-lg text-amber-100"
                        : unlocked
                        ? "bg-stone-900/80 border-stone-800 hover:border-amber-700/60 text-stone-300"
                        : "bg-black/40 border-stone-900 text-stone-600 opacity-60"
                    }`}
                  >
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden border ${
                        unlocked
                          ? "bg-amber-950/80 border-amber-600/70 shadow"
                          : "bg-stone-950 border-stone-800 text-stone-600"
                      }`}
                    >
                      {unlocked && photoMeta ? (
                        <img
                          src={photoMeta.photoUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xl">{unlocked ? "📜" : "🔒"}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-xs text-amber-500/80 font-mono">
                        {chaptersMap.get(item.chapter) || item.chapter}
                      </span>
                      <p className="text-sm font-serif font-semibold truncate">
                        {unlocked ? item.title : "Tư liệu chưa mở khoá"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Item Detail View (8 cols) */}
            <div className="md:col-span-8 lg:col-span-8 bg-[#201713]/90 border-2 border-amber-800/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              {selectedItem && (
                <>
                  {isUnlocked ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-amber-900/40 pb-2">
                        <span className="text-xs uppercase tracking-wider text-amber-400 bg-amber-950/80 px-3 py-0.5 rounded border border-amber-800/40">
                          {chaptersMap.get(selectedItem.chapter)}
                        </span>
                        <span className="text-xs font-mono text-stone-400">
                          Mã: {selectedItem.id}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-200">
                          {selectedItem.title}
                        </h3>

                        {/* Switch View Mode & Zoom 2.5x */}
                        <div className="flex items-center space-x-2">
                          {collectibleViewMode === "photo" && currentPhotoMeta && (
                            <button
                              onClick={() => {
                                audioManager.playSfx("sfx-chon");
                                setLightboxMedia({
                                  url: currentPhotoMeta.photoUrl,
                                  title: selectedItem.title,
                                  subtitle: chaptersMap.get(selectedItem.chapter) || selectedItem.chapter,
                                  caption: selectedItem.caption,
                                  source: currentPhotoMeta.archiveSource,
                                });
                                setLightboxZoom(1.5);
                              }}
                              className="px-2.5 py-1 text-xs rounded-lg font-serif font-bold transition cursor-pointer flex items-center space-x-1 bg-amber-950/90 text-amber-200 border border-amber-600/70 hover:bg-amber-900 shadow"
                              title="Phóng to 2.5x"
                            >
                              <span>🔍 Phóng to 2.5x</span>
                            </button>
                          )}

                          <div className="flex items-center space-x-1.5 bg-black/50 p-1 rounded-lg border border-amber-900/40">
                            <button
                              onClick={() => setCollectibleViewMode("photo")}
                              className={`px-2.5 py-1 text-xs rounded font-serif transition cursor-pointer flex items-center space-x-1 ${
                                collectibleViewMode === "photo"
                                  ? "bg-amber-600 text-white font-bold shadow"
                                  : "text-stone-400 hover:text-stone-200"
                              }`}
                            >
                              <span>📷 Ảnh thật</span>
                            </button>
                            <button
                              onClick={() => setCollectibleViewMode("art")}
                              className={`px-2.5 py-1 text-xs rounded font-serif transition cursor-pointer flex items-center space-x-1 ${
                                collectibleViewMode === "art"
                                  ? "bg-amber-600 text-white font-bold shadow"
                                  : "text-stone-400 hover:text-stone-200"
                              }`}
                            >
                              <span>🎨 Đồ họa</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Display either Real Historical Photo or SVG Art (2.5x Enlarged) */}
                      <div className="relative">
                        {collectibleViewMode === "photo" && currentPhotoMeta ? (
                          <div
                            onClick={() => {
                              audioManager.playSfx("sfx-chon");
                              setLightboxMedia({
                                url: currentPhotoMeta.photoUrl,
                                title: selectedItem.title,
                                subtitle: chaptersMap.get(selectedItem.chapter) || selectedItem.chapter,
                                caption: selectedItem.caption,
                                source: currentPhotoMeta.archiveSource,
                              });
                              setLightboxZoom(1.5);
                            }}
                            className="relative w-full min-h-[500px] sm:min-h-[580px] lg:min-h-[620px] flex flex-col items-center justify-center bg-[#0d0907] rounded-xl border-2 border-amber-600/60 p-4 shadow-2xl overflow-hidden group cursor-zoom-in"
                            title="Nhấp để phóng to toàn màn hình"
                          >
                            <img
                              src={currentPhotoMeta.photoUrl}
                              alt={selectedItem.title}
                              className="max-h-[460px] sm:max-h-[520px] lg:max-h-[560px] w-auto max-w-full object-contain rounded-lg transition transform group-hover:scale-[1.03] shadow-2xl"
                            />
                            <div className="absolute top-3 right-3 bg-black/80 text-amber-300 px-2.5 py-1 rounded-lg text-xs font-serif font-bold border border-amber-600/60 shadow flex items-center space-x-1">
                              <span>🔍 Phóng to 2.5x</span>
                            </div>
                            <div className="absolute bottom-2 left-2 right-2 text-center bg-black/90 px-3 py-1 rounded text-xs text-amber-300 font-mono truncate border border-amber-900/40">
                              🏛️ {currentPhotoMeta.archiveSource} • Nhấp ảnh để phóng to
                            </div>
                          </div>
                        ) : (
                          <div className="relative">
                            <CollectibleIllustration
                              collectibleId={selectedItem.id}
                              className="w-full h-[460px] sm:h-[540px] lg:h-[580px]"
                            />
                            {selectedItem.image_credit && (
                              <span className="absolute bottom-2 left-0 right-0 text-center text-xs text-stone-300 italic drop-shadow bg-black/60 py-1">
                                Nguồn ảnh: {selectedItem.image_credit}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Caption */}
                      <div className="text-sm sm:text-base text-stone-200 font-serif leading-relaxed bg-black/30 p-3.5 rounded-xl border border-stone-800">
                        {selectedItem.caption}
                      </div>

                      {/* Academic Reference & Historical Excerpt */}
                      {currentSource && (
                        <div className="text-xs text-amber-300/90 bg-amber-950/40 p-3 rounded-lg border border-amber-900/50 space-y-1.5">
                          <div className="font-semibold text-amber-400 flex items-center justify-between not-italic">
                            <span>📚 Căn cứ học thuật: Giáo trình Lịch sử Đảng, tr. {currentSource.pages}</span>
                            <span className="font-mono text-[10px] text-stone-400 bg-black/40 px-1.5 py-0.5 rounded">
                              Mã: {currentSource.id}
                            </span>
                          </div>
                          <div className="italic text-stone-300 font-serif leading-relaxed">
                            📜 "{currentSource.text}"
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 my-auto">
                      <div className="w-20 h-20 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-3xl text-stone-600">
                        🔒
                      </div>
                      <h3 className="text-xl font-serif text-stone-400">
                        Tư liệu chưa được khám phá
                      </h3>
                      <p className="text-sm text-stone-500 max-w-sm font-serif">
                        Hãy trải nghiệm và đưa ra những lựa chọn lịch sử đúng đắn ở{" "}
                        <span className="text-amber-400 font-semibold">
                          {chaptersMap.get(selectedItem.chapter) || selectedItem.chapter}
                        </span>{" "}
                        để giải mã tư liệu này.
                      </p>
                      <button
                        onClick={handleUnlockAll}
                        className="px-4 py-2 rounded-xl bg-amber-700/80 hover:bg-amber-600 text-amber-100 text-xs font-serif font-bold border border-amber-500/60 shadow transition cursor-pointer"
                      >
                        🔓 Mở xem toàn bộ ảnh tư liệu thật
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}

        {/* TAB 2: Historical Videos Gallery */}
        {activeTab === "videos" && (
          <>
            {/* Left: Videos List (4 cols) */}
            <div className="md:col-span-4 lg:col-span-4 overflow-y-auto pr-2 space-y-2.5">
              {(content.videos || []).map((v) => {
                const isSelected = selectedVideo?.id === v.id;

                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      audioManager.playSfx("sfx-chon");
                      setSelectedVideo(v);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition flex items-center space-x-3 cursor-pointer ${
                      isSelected
                        ? "bg-[#2d1f19] border-amber-500 shadow-lg text-amber-100"
                        : "bg-stone-900/80 border-stone-800 hover:border-amber-700/60 text-stone-300"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 bg-red-950/80 border border-red-800/60 text-amber-300">
                      🎞️
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 text-[11px] font-mono text-amber-400">
                        <span>{v.year}</span>
                        <span>•</span>
                        <span>{v.duration}</span>
                      </div>
                      <p className="text-sm font-serif font-semibold truncate">
                        {v.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Selected Video Detail & Play Button (8 cols) */}
            <div className="md:col-span-8 lg:col-span-8 bg-[#201713]/90 border-2 border-amber-800/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              {selectedVideo && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-amber-900/40 pb-3">
                    <span className="text-xs uppercase tracking-wider text-amber-400 bg-amber-950/80 px-3 py-0.5 rounded border border-amber-800/40 font-mono">
                      {selectedVideo.label} • {selectedVideo.year}
                    </span>
                    <span className="text-xs font-mono text-stone-400">
                      Thời lượng: {selectedVideo.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-amber-200">
                    {selectedVideo.title}
                  </h3>

                  {/* Video Header & Fullscreen Projector Trigger */}
                  <div className="flex items-center justify-between pb-1">
                    <div className="flex items-center space-x-2 text-xs font-mono text-amber-400">
                      <span>▶</span>
                      <span>Thước phim tư liệu ({selectedVideo.duration})</span>
                    </div>
                    <button
                      onClick={() => {
                        audioManager.playSfx("sfx-chon");
                        setActiveModalVideo(selectedVideo);
                      }}
                      className="px-3 py-1 rounded-lg bg-red-950/90 hover:bg-red-900 text-amber-200 hover:text-white text-xs font-serif font-bold border border-amber-600/70 shadow transition cursor-pointer flex items-center space-x-1.5"
                      title="Mở chế độ rạp chiếu phim cổ điển 1920s"
                    >
                      <span>🎞️ Rạp chiếu 1920s</span>
                    </button>
                  </div>

                  {/* Inline Video Player */}
                  <div className="relative aspect-video rounded-xl bg-black border-2 border-amber-800/60 flex items-center justify-center overflow-hidden shadow-2xl">
                    <video
                      key={selectedVideo.id}
                      controls
                      playsInline
                      preload="metadata"
                      onPlay={() => audioManager.pauseActiveAudio()}
                      onPause={() => audioManager.resumeActiveAudio()}
                      onEnded={() => audioManager.resumeActiveAudio()}
                      className="w-full h-full object-contain filter sepia-[0.25]"
                    >
                      <source
                        src={
                          selectedVideo.mp4Url ||
                          selectedVideo.videoUrl?.replace(/\.webm$/, ".mp4")
                        }
                        type="video/mp4"
                      />
                      <source
                        src={selectedVideo.videoUrl}
                        type="video/webm"
                      />
                      Trình duyệt của bạn không hỗ trợ thẻ video HTML5.
                    </video>
                  </div>

                  {/* Summary */}
                  <div className="text-sm text-stone-200 font-serif leading-relaxed bg-black/30 p-4 rounded-xl border border-stone-800">
                    <p className="font-semibold text-amber-400 mb-1">Tóm tắt bối cảnh:</p>
                    {selectedVideo.summary}
                  </div>

                  {/* Historical Significance */}
                  <div className="text-xs text-amber-200/90 bg-amber-950/40 p-3.5 rounded-lg border border-amber-900/50">
                    <span className="font-semibold text-amber-400">Ý nghĩa lịch sử: </span>
                    <span className="italic font-serif leading-relaxed">
                      {selectedVideo.historicalSignificance}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* TAB 3: All 27 Authentic Historical Photos */}
        {activeTab === "photos" && (
          <>
            {/* Left: Photos List (4 cols) */}
            <div className="md:col-span-4 lg:col-span-4 overflow-y-auto pr-2 space-y-4">
              {/* Category 1: 8 Core Collectibles with Real Photos */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-2 px-1">
                  📜 8 Hiện vật & Văn kiện cốt lõi
                </span>
                <div className="space-y-2">
                  {HISTORICAL_COLLECTIBLE_GALLERY.map((item) => {
                    const isSelected = selectedGalleryItem?.id === item.id && !selectedPortrait;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          audioManager.playSfx("sfx-chon");
                          setSelectedGalleryItem(item);
                          setSelectedPortrait(null);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl border transition flex items-center space-x-3 cursor-pointer ${
                          isSelected
                            ? "bg-[#2d1f19] border-amber-500 shadow text-amber-100"
                            : "bg-stone-900/80 border-stone-800 hover:border-amber-700/60 text-stone-300"
                        }`}
                      >
                        <img
                          src={item.photoUrl}
                          alt={item.title}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-amber-800/40 flex-shrink-0 shadow"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs text-amber-400 font-mono block">
                            {item.year}
                          </span>
                          <p className="text-sm font-serif font-bold truncate">
                            {item.title}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category 2: 9 Historical Portraits */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-2 px-1">
                  👤 9 Chân dung nhân vật lịch sử
                </span>
                <div className="space-y-2">
                  {HISTORICAL_PORTRAITS.map((p) => {
                    const isSelected = selectedPortrait?.id === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          audioManager.playSfx("sfx-chon");
                          setSelectedPortrait(p);
                          setSelectedGalleryItem(null);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl border transition flex items-center space-x-3 cursor-pointer ${
                          isSelected
                            ? "bg-[#2d1f19] border-amber-500 shadow text-amber-100"
                            : "bg-stone-900/80 border-stone-800 hover:border-amber-700/60 text-stone-300"
                        }`}
                      >
                        <img
                          src={p.photoUrl}
                          alt={p.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-amber-800/40 flex-shrink-0 shadow"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs text-amber-400 font-mono block">
                            {p.period}
                          </span>
                          <p className="text-sm font-serif font-bold truncate">
                            {p.name}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category 3: 10 Historical Places & Documents */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-2 px-1">
                  🏛️ 10 Bối cảnh & Tư liệu bổ sung
                </span>
                <div className="space-y-2">
                  {HISTORICAL_SCENE_PHOTOS.map((s) => {
                    const isSelected = selectedGalleryItem?.id === s.id && !selectedPortrait;
                    return (
                      <button
                        key={s.id}
                        onClick={() => {
                          audioManager.playSfx("sfx-chon");
                          setSelectedGalleryItem(s);
                          setSelectedPortrait(null);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl border transition flex items-center space-x-3 cursor-pointer ${
                          isSelected
                            ? "bg-[#2d1f19] border-amber-500 shadow text-amber-100"
                            : "bg-stone-900/80 border-stone-800 hover:border-amber-700/60 text-stone-300"
                        }`}
                      >
                        <img
                          src={s.photoUrl}
                          alt={s.title}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-amber-800/40 flex-shrink-0 shadow"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs text-amber-400 font-mono block">
                            {s.year}
                          </span>
                          <p className="text-sm font-serif font-bold truncate">
                            {s.title}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Selected Photo Detail (8 cols) */}
            <div className="md:col-span-8 lg:col-span-8 bg-[#201713]/90 border-2 border-amber-800/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              {selectedPortrait && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-amber-900/40 pb-3">
                    <span className="text-xs uppercase tracking-wider text-amber-400 bg-amber-950/80 px-3 py-0.5 rounded border border-amber-800/40 font-mono">
                      Nhân vật lịch sử • {selectedPortrait.period}
                    </span>
                    <span className="text-xs font-mono text-stone-400">
                      Mã: {selectedPortrait.id}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-2xl font-serif font-bold text-amber-200">
                      {selectedPortrait.name}
                    </h3>
                    <button
                      onClick={() => {
                        audioManager.playSfx("sfx-chon");
                        setLightboxMedia({
                          url: selectedPortrait.photoUrl,
                          title: selectedPortrait.name,
                          subtitle: selectedPortrait.period,
                          caption: selectedPortrait.role,
                          source: "Kho tư liệu ảnh lịch sử Việt Nam",
                        });
                        setLightboxZoom(1.5);
                      }}
                      className="px-2.5 py-1 text-xs rounded-lg font-serif font-bold transition cursor-pointer flex items-center space-x-1 bg-amber-950/90 text-amber-200 border border-amber-600/70 hover:bg-amber-900 shadow"
                      title="Phóng to 2.5x"
                    >
                      <span>🔍 Phóng to 2.5x</span>
                    </button>
                  </div>

                  {/* Photo Frame - 2.5x Larger */}
                  <div
                    onClick={() => {
                      audioManager.playSfx("sfx-chon");
                      setLightboxMedia({
                        url: selectedPortrait.photoUrl,
                        title: selectedPortrait.name,
                        subtitle: selectedPortrait.period,
                        caption: selectedPortrait.role,
                        source: "Kho tư liệu ảnh lịch sử Việt Nam",
                      });
                      setLightboxZoom(1.5);
                    }}
                    className="relative w-full min-h-[560px] sm:min-h-[640px] lg:min-h-[700px] flex items-center justify-center bg-black/80 rounded-xl border-2 border-amber-600/50 p-4 shadow-2xl overflow-hidden group cursor-zoom-in"
                    title="Nhấp để phóng to toàn màn hình"
                  >
                    <img
                      src={selectedPortrait.photoUrl}
                      alt={selectedPortrait.name}
                      className="max-h-[520px] sm:max-h-[600px] lg:max-h-[660px] max-w-full object-contain rounded-lg transition transform group-hover:scale-[1.03] shadow-2xl"
                    />
                    <div className="absolute top-3 right-3 bg-black/80 text-amber-300 px-2.5 py-1 rounded-lg text-xs font-serif font-bold border border-amber-600/60 shadow flex items-center space-x-1">
                      <span>🔍 Phóng to 2.5x</span>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 text-center bg-black/90 px-3 py-1 rounded text-xs text-amber-300 font-mono truncate border border-amber-900/40">
                      👤 {selectedPortrait.name} ({selectedPortrait.period}) • Nhấp ảnh để phóng to
                    </div>
                  </div>

                  {/* Role Info */}
                  <div className="text-sm text-stone-200 font-serif leading-relaxed bg-black/30 p-4 rounded-xl border border-stone-800 space-y-2">
                    <p className="text-xs font-mono uppercase tracking-wider text-amber-400">
                      Vai trò lịch sử:
                    </p>
                    <p>{selectedPortrait.role}</p>
                  </div>
                </div>
              )}

              {selectedGalleryItem && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-amber-900/40 pb-3">
                    <span className="text-xs uppercase tracking-wider text-amber-400 bg-amber-950/80 px-3 py-0.5 rounded border border-amber-800/40 font-mono">
                      Ảnh tư liệu lịch sử • {selectedGalleryItem.year}
                    </span>
                    <span className="text-xs font-mono text-stone-400">
                      Mã: {selectedGalleryItem.id}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-2xl font-serif font-bold text-amber-200">
                      {selectedGalleryItem.title}
                    </h3>
                    <button
                      onClick={() => {
                        audioManager.playSfx("sfx-chon");
                        setLightboxMedia({
                          url: selectedGalleryItem.photoUrl,
                          title: selectedGalleryItem.title,
                          subtitle: selectedGalleryItem.year,
                          caption: selectedGalleryItem.caption,
                          source: selectedGalleryItem.source,
                        });
                        setLightboxZoom(1.5);
                      }}
                      className="px-2.5 py-1 text-xs rounded-lg font-serif font-bold transition cursor-pointer flex items-center space-x-1 bg-amber-950/90 text-amber-200 border border-amber-600/70 hover:bg-amber-900 shadow"
                      title="Phóng to 2.5x"
                    >
                      <span>🔍 Phóng to 2.5x</span>
                    </button>
                  </div>

                  {/* Photo Frame - 2.5x Larger */}
                  <div
                    onClick={() => {
                      audioManager.playSfx("sfx-chon");
                      setLightboxMedia({
                        url: selectedGalleryItem.photoUrl,
                        title: selectedGalleryItem.title,
                        subtitle: selectedGalleryItem.year,
                        caption: selectedGalleryItem.caption,
                        source: selectedGalleryItem.source,
                      });
                      setLightboxZoom(1.5);
                    }}
                    className="relative w-full min-h-[560px] sm:min-h-[640px] lg:min-h-[700px] flex items-center justify-center bg-black/80 rounded-xl border-2 border-amber-600/50 p-4 shadow-2xl overflow-hidden group cursor-zoom-in"
                    title="Nhấp để phóng to toàn màn hình"
                  >
                    <img
                      src={selectedGalleryItem.photoUrl}
                      alt={selectedGalleryItem.title}
                      className="max-h-[520px] sm:max-h-[600px] lg:max-h-[660px] max-w-full object-contain rounded-lg transition transform group-hover:scale-[1.03] shadow-2xl"
                    />
                    <div className="absolute top-3 right-3 bg-black/80 text-amber-300 px-2.5 py-1 rounded-lg text-xs font-serif font-bold border border-amber-600/60 shadow flex items-center space-x-1">
                      <span>🔍 Phóng to 2.5x</span>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 text-center bg-black/90 px-3 py-1 rounded text-xs text-amber-300 font-mono truncate border border-amber-900/40">
                      🏛️ {selectedGalleryItem.source} • Nhấp ảnh để phóng to
                    </div>
                  </div>

                  {/* Caption & Source Info */}
                  <div className="text-sm text-stone-200 font-serif leading-relaxed bg-black/30 p-4 rounded-xl border border-stone-800 space-y-2">
                    <p className="text-xs font-mono uppercase tracking-wider text-amber-400">
                      Bối cảnh lịch sử:
                    </p>
                    <p>{selectedGalleryItem.caption}</p>
                  </div>

                  <div className="text-xs text-amber-200/90 bg-amber-950/40 p-3.5 rounded-lg border border-amber-900/50">
                    <span className="font-semibold text-amber-400">Nguồn lưu trữ: </span>
                    <span className="italic font-serif leading-relaxed">
                      {selectedGalleryItem.source}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Modal Video Player when triggered from Collection */}
      {activeModalVideo && (
        <HistoricalVideoModal
          video={activeModalVideo}
          onClose={() => setActiveModalVideo(null)}
        />
      )}

      {/* Fullscreen Lightbox Modal for 2.5x Zoom */}
      {lightboxMedia && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setLightboxMedia(null);
            }
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-amber-900/60 pb-3 gap-3">
            <div>
              {lightboxMedia.subtitle && (
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">
                  {lightboxMedia.subtitle}
                </span>
              )}
              <h3 className="text-lg sm:text-2xl font-serif font-bold text-amber-100">
                {lightboxMedia.title}
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              {/* Zoom controls */}
              <div className="flex items-center space-x-1 bg-stone-900/90 p-1 rounded-xl border border-stone-800">
                <button
                  onClick={() => setLightboxZoom(1)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition cursor-pointer ${
                    lightboxZoom === 1
                      ? "bg-amber-600 text-white font-bold"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  1x
                </button>
                <button
                  onClick={() => setLightboxZoom(1.5)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition cursor-pointer ${
                    lightboxZoom === 1.5
                      ? "bg-amber-600 text-white font-bold"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  1.5x
                </button>
                <button
                  onClick={() => setLightboxZoom(2.5)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition cursor-pointer ${
                    lightboxZoom === 2.5
                      ? "bg-amber-600 text-white font-bold"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  2.5x
                </button>
              </div>
              <button
                onClick={() => setLightboxMedia(null)}
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white flex items-center justify-center font-bold text-lg border border-stone-700 cursor-pointer shadow"
                title="Đóng (ESC)"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Center Image Container with Zoom */}
          <div
            className="flex-1 flex items-center justify-center overflow-auto p-2 my-2 cursor-zoom-out"
            onClick={() => {
              setLightboxZoom((prev) => (prev >= 2.5 ? 1 : prev + 0.75));
            }}
          >
            <img
              src={lightboxMedia.url}
              alt={lightboxMedia.title}
              style={{
                transform: `scale(${lightboxZoom})`,
                transformOrigin: "center center",
                transition: "transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
              className="max-h-[75vh] max-w-[90vw] object-contain rounded-lg shadow-2xl select-none"
            />
          </div>

          {/* Footer info */}
          <div className="bg-[#1b130f]/90 border border-amber-900/60 rounded-xl p-3 sm:p-4 text-center max-w-4xl mx-auto w-full space-y-1">
            {lightboxMedia.caption && (
              <p className="text-sm sm:text-base font-serif text-stone-200 leading-relaxed">
                {lightboxMedia.caption}
              </p>
            )}
            {lightboxMedia.source && (
              <p className="text-xs font-mono text-amber-400">
                🏛️ {lightboxMedia.source}
              </p>
            )}
            <p className="text-[11px] text-stone-400 italic">
              Nhấp ảnh để phóng to (1x ➔ 1.75x ➔ 2.5x) • ESC hoặc ✕ để đóng
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
