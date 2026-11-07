import React, { useState, useMemo } from "react";
import type { GameContent, Collectible, Source, HistoricalVideo } from "../engine/types";
import { audioManager } from "../audio";
import { CollectibleIllustration } from "../art/collectibleIllustrations";
import { HistoricalVideoModal } from "../components/HistoricalVideoModal";

interface CollectionScreenProps {
  content: GameContent;
  unlockedIds: string[];
  onBack: () => void;
}

export const CollectionScreen: React.FC<CollectionScreenProps> = ({
  content,
  unlockedIds,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<"collectibles" | "videos">("collectibles");
  const [selectedItem, setSelectedItem] = useState<Collectible | null>(
    content.collectibles[0] || null
  );
  const [selectedVideo, setSelectedVideo] = useState<HistoricalVideo | null>(
    content.videos?.[0] || null
  );
  const [activeModalVideo, setActiveModalVideo] = useState<HistoricalVideo | null>(null);

  const sourcesMap = useMemo(() => {
    return new Map<string, Source>(content.sources.map((s) => [s.id, s]));
  }, [content.sources]);

  const chaptersMap = useMemo(() => {
    return new Map<string, string>(content.chapters.map((c) => [c.id, c.title]));
  }, [content.chapters]);

  const isUnlocked = selectedItem ? unlockedIds.includes(selectedItem.id) : false;
  const currentSource = selectedItem?.source ? sourcesMap.get(selectedItem.source) : undefined;

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
              {activeTab === "collectibles"
                ? `Đã mở khoá: ${unlockedIds.length} / ${content.collectibles.length} tư liệu`
                : `Thước phim tư liệu lịch sử: ${content.videos?.length || 7} đoạn phim`}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-2 bg-stone-900/90 p-1 rounded-xl border border-stone-800">
          <button
            onClick={() => {
              audioManager.playSfx("sfx-chon");
              setActiveTab("collectibles");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition cursor-pointer flex items-center space-x-1.5 ${
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
            className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition cursor-pointer flex items-center space-x-1.5 ${
              activeTab === "videos"
                ? "bg-amber-700 text-white shadow"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            <span>🎞️ Phim tư liệu (7)</span>
          </button>
        </div>

        <button
          onClick={onBack}
          className="px-4 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-sm border border-stone-700 cursor-pointer font-serif"
        >
          ← Trở lại
        </button>
      </div>

      {/* Main body (2 columns) */}
      <div className="flex-1 my-4 grid grid-cols-1 md:grid-cols-12 gap-6 overflow-hidden">
        {activeTab === "collectibles" ? (
          <>
            {/* Left: Collectibles Grid (5 cols) */}
            <div className="md:col-span-5 overflow-y-auto pr-2 space-y-2.5">
              {content.collectibles.map((item) => {
                const unlocked = unlockedIds.includes(item.id);
                const isSelected = selectedItem?.id === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      audioManager.playSfx("sfx-chon");
                      setSelectedItem(item);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition flex items-center space-x-3 cursor-pointer ${
                      isSelected
                        ? "bg-[#2d1f19] border-amber-500 shadow-lg text-amber-100"
                        : unlocked
                        ? "bg-stone-900/80 border-stone-800 hover:border-amber-700/60 text-stone-300"
                        : "bg-black/40 border-stone-900 text-stone-600 opacity-60"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${
                      unlocked ? "bg-amber-950/80 border border-amber-800/60" : "bg-stone-950"
                    }`}>
                      {unlocked ? "📜" : "🔒"}
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

            {/* Right: Item Detail View (7 cols) */}
            <div className="md:col-span-7 bg-[#201713]/90 border-2 border-amber-800/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              {selectedItem && (
                <>
                  {isUnlocked ? (
                    <div className="space-y-5">
                      <div className="flex items-center justify-between border-b border-amber-900/40 pb-3">
                        <span className="text-xs uppercase tracking-wider text-amber-400 bg-amber-950/80 px-3 py-0.5 rounded border border-amber-800/40">
                          {chaptersMap.get(selectedItem.chapter)}
                        </span>
                        <span className="text-xs font-mono text-stone-400">
                          Mã: {selectedItem.id}
                        </span>
                      </div>

                      <h3 className="text-2xl font-serif font-bold text-amber-200">
                        {selectedItem.title}
                      </h3>

                      <div className="relative">
                        <CollectibleIllustration
                          collectibleId={selectedItem.id}
                          className="w-full h-48 sm:h-56"
                        />
                        {selectedItem.image_credit && (
                          <span className="absolute bottom-2 left-0 right-0 text-center text-[11px] text-stone-300 italic drop-shadow">
                            Nguồn ảnh: {selectedItem.image_credit}
                          </span>
                        )}
                      </div>

                      {/* Caption */}
                      <div className="text-base text-stone-200 font-serif leading-relaxed bg-black/30 p-4 rounded-xl border border-stone-800">
                        {selectedItem.caption}
                      </div>

                      {/* Academic Reference & Historical Excerpt */}
                      {currentSource && (
                        <div className="text-xs text-amber-300/90 bg-amber-950/40 p-3.5 rounded-lg border border-amber-900/50 space-y-2">
                          <div className="font-semibold text-amber-400 flex items-center justify-between not-italic">
                            <span>📚 Căn cứ học thuật: Giáo trình Lịch sử Đảng, tr. {currentSource.pages}</span>
                            <span className="font-mono text-[10px] text-stone-400 bg-black/40 px-1.5 py-0.5 rounded">Mã: {currentSource.id}</span>
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
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          /* TAB 2: Historical Videos Gallery */
          <>
            {/* Left: Videos List (5 cols) */}
            <div className="md:col-span-5 overflow-y-auto pr-2 space-y-2.5">
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

            {/* Right: Selected Video Detail & Play Button (7 cols) */}
            <div className="md:col-span-7 bg-[#201713]/90 border-2 border-amber-800/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
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

                  {/* Play Action Banner */}
                  <div className="relative aspect-video rounded-xl bg-black/60 border border-amber-900/50 flex flex-col items-center justify-center p-6 text-center overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                    
                    <button
                      onClick={() => {
                        audioManager.playSfx("sfx-chon");
                        setActiveModalVideo(selectedVideo);
                      }}
                      className="relative z-10 px-6 py-3 rounded-xl bg-red-700 hover:bg-red-600 text-white font-serif font-bold text-base shadow-2xl border-2 border-amber-400/80 transition transform hover:scale-105 cursor-pointer flex items-center space-x-2.5 animate-pulse"
                    >
                      <span className="text-xl">▶</span>
                      <span>Mở Thước Phim Tư Liệu</span>
                    </button>
                    <p className="relative z-10 text-xs text-amber-300/80 font-mono mt-3">
                      Bấm để phát video toàn màn hình máy chiếu cổ điển
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="text-sm text-stone-200 font-serif leading-relaxed bg-black/30 p-4 rounded-xl border border-stone-800">
                    <p className="font-semibold text-amber-400 mb-1">Tóm tắt bối cảnh:</p>
                    {selectedVideo.summary}
                  </div>

                  {/* Historical Significance */}
                  <div className="text-xs text-amber-200/90 bg-amber-950/40 p-3.5 rounded-lg border border-amber-900/50">
                    <span className="font-semibold text-amber-400">Ý nghĩa lịch sử: </span>
                    <span className="italic font-serif leading-relaxed">{selectedVideo.historicalSignificance}</span>
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
    </div>
  );
};
