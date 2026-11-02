import React, { useState, useEffect, useMemo, useCallback } from "react";
import type { GameContent, GameState, Source, Character, ChoiceNode } from "../engine/types";
import { getCurrentNode, getCurrentScene } from "../engine/step";
import { Header } from "../components/Header";
import { DialogBox } from "../components/DialogBox";
import { ChoicePanel } from "../components/ChoicePanel";
import { KnowledgeBox } from "../components/KnowledgeBox";
import { TimelineView } from "../components/TimelineView";
import { CardsView } from "../components/CardsView";
import { LogModal } from "../components/LogModal";
import { SpriteView } from "../components/SpriteView";
import { audioManager } from "../audio";
import { SceneBackground } from "../art/sceneBackgrounds";
import { CgIllustration } from "../art/cgIllustrations";
import { SCENE_CONTEXTS } from "../art/sceneContexts";
import { SCENE_HOTSPOTS, SceneHotspot } from "../art/sceneHotspots";

interface SceneScreenProps {
  content: GameContent;
  state: GameState;
  onNext: () => void;
  onChoose: (key: "A" | "B" | "C") => void;
  onReturnMenu: () => void;
  onOpenCollection: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const SceneScreen: React.FC<SceneScreenProps> = ({
  content,
  state,
  onNext,
  onChoose,
  onReturnMenu,
  onOpenCollection,
  isMuted,
  onToggleMute
}) => {
  const [showLog, setShowLog] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<SceneHotspot | null>(null);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [isUiHidden, setIsUiHidden] = useState<boolean>(false);

  const scene = getCurrentScene(content, state);
  const currentNode = getCurrentNode(content, state);
  const sceneContext = scene ? SCENE_CONTEXTS[scene.id] : undefined;
  const sceneHotspots = scene ? SCENE_HOTSPOTS[scene.id] || [] : [];

  // Play bgm if scene has bgm
  useEffect(() => {
    if (scene?.bgm) {
      audioManager.playBgm(scene.bgm);
    }
  }, [scene?.bgm]);

  // Lookup maps
  const sourcesMap = useMemo(() => {
    return new Map<string, Source>(content.sources.map((s) => [s.id, s]));
  }, [content.sources]);

  const charactersMap = useMemo(() => {
    return new Map<string, Character>(content.characters.map((c) => [c.id, c]));
  }, [content.characters]);

  const currentChapter = content.chapters.find((c) => c.id === state.currentChapterId);

  // Check if currently inside an alternative history (wrong choice) branch
  const isAltHistory = useMemo(() => {
    if (!state.activeOption || !scene) return false;
    const choiceNode = scene.nodes[state.nodeIndex] as ChoiceNode | undefined;
    if (choiceNode?.type !== "choice") return false;
    const currentOpt = choiceNode.options.find((o) => o.key === state.activeOption!.optionKey);
    return currentOpt ? !currentOpt.correct : false;
  }, [state.activeOption, scene, state.nodeIndex]);

  // Trigger toast on unlock node
  useEffect(() => {
    if (currentNode?.type === "unlock") {
      const item = content.collectibles.find((c) => c.id === currentNode.item);
      const title = item ? item.title : currentNode.item;
      const msg = content.strings["unlock.toast"]
        ? content.strings["unlock.toast"].replace("{title}", title)
        : `Đã mở khoá tư liệu: ${title}`;
      setToastMessage(msg);
      audioManager.playSfx("sfx-mo-khoa");
      const timer = setTimeout(() => setToastMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [currentNode, content]);

  // Auto-play timer for dialog/narration/thought
  useEffect(() => {
    if (!isAutoPlay || !currentNode) return;
    if (currentNode.type === "choice" || currentNode.type === "knowledge") {
      setIsAutoPlay(false); // Pause auto-play at choice or knowledge box
      return;
    }

    const timer = setTimeout(() => {
      onNext();
    }, 3500);

    return () => clearTimeout(timer);
  }, [isAutoPlay, currentNode, onNext]);

  // Keyboard shortcut listener
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeHotspot) {
        if (e.key === "Escape") {
          setActiveHotspot(null);
        }
        return;
      }

      if (isUiHidden) {
        if (e.key === "Escape" || e.key.toLowerCase() === "h") {
          setIsUiHidden(false);
        }
        return;
      }

      if (e.key.toLowerCase() === "h") {
        setIsUiHidden((prev) => !prev);
        return;
      }

      if (e.key.toLowerCase() === "e") {
        setShowHotspots((prev) => !prev);
        return;
      }

      if (showLog) {
        if (e.key === "Escape" || e.key.toLowerCase() === "l") {
          setShowLog(false);
        }
        return;
      }

      if (e.key.toLowerCase() === "l") {
        setShowLog(true);
        return;
      }

      if (e.key.toLowerCase() === "m") {
        onToggleMute();
        return;
      }

      if (!currentNode) return;

      if (currentNode.type === "choice") {
        const key = e.key.toUpperCase();
        if (key === "1" || key === "A") onChoose("A");
        if (key === "2" || key === "B") onChoose("B");
        if (key === "3" || key === "C") onChoose("C");
      } else {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onNext();
        }
      }
    },
    [currentNode, onNext, onChoose, onToggleMute, showLog, activeHotspot, isUiHidden]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!scene || !currentNode) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-stone-950 text-stone-200">
        <p>Đang tải cảnh...</p>
      </div>
    );
  }

  return (
    <div
      onClick={() => {
        if (isUiHidden) setIsUiHidden(false);
      }}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between bg-stone-950 select-none"
    >
      {/* Dynamic Historical Background Artwork */}
      <div className="absolute inset-0 z-0 bg-[#161210]">
        <SceneBackground bgId={scene.bg} />
        {/* Subtle vignette gradient overlay for text readability & atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/60 pointer-events-none" />
      </div>

      {/* Interactive Exploration Hotspots on Background */}
      {showHotspots && !isUiHidden && sceneHotspots.map((spot) => (
        <button
          key={spot.id}
          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          onClick={(e) => {
            e.stopPropagation();
            setActiveHotspot(spot);
            audioManager.playSfx("sfx-mo-khoa");
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-15 group cursor-pointer focus:outline-none transition-transform hover:scale-125"
          title={`Khám phá: ${spot.title}`}
        >
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-amber-400 opacity-60" />
            <div className="relative w-8 h-8 rounded-full bg-[#2a170e]/95 border-2 border-amber-400 text-amber-200 flex items-center justify-center text-sm shadow-2xl">
              {spot.icon}
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded bg-[#1c1410]/95 border border-amber-500/70 text-[11px] text-amber-200 font-serif whitespace-nowrap shadow-2xl">
            {spot.title}
          </div>
        </button>
      ))}

      {/* Header bar (Fades out when UI is hidden) */}
      <div className={`transition-opacity duration-300 ${isUiHidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <Header
          chapterTitle={currentChapter?.title}
          sceneTitle={scene.title}
          onOpenLog={() => setShowLog((prev) => !prev)}
          onOpenCollection={onOpenCollection}
          onReturnMenu={onReturnMenu}
          isMuted={isMuted}
          onToggleMute={onToggleMute}
          onToggleHideUi={() => setIsUiHidden((prev) => !prev)}
          onToggleHotspots={() => setShowHotspots((prev) => !prev)}
          showHotspots={showHotspots}
          hasHotspots={sceneHotspots.length > 0}
        />
      </div>

      {/* Historical Context & Setting Description ("Bối cảnh miêu tả") */}
      {sceneContext && (
        <div className={`absolute top-14 left-4 sm:left-8 z-20 pointer-events-none max-w-md sm:max-w-lg transition-opacity duration-300 ${isUiHidden ? "opacity-0" : "opacity-100"}`}>
          <div className="bg-[#18120e]/90 backdrop-blur-md border-l-4 border-amber-500 px-3.5 py-1.5 sm:py-2 rounded-r-lg shadow-2xl text-stone-200 border-t border-b border-r border-amber-900/40">
            <div className="flex items-center space-x-2 text-[11px] sm:text-xs text-amber-400 font-mono tracking-wide">
              <span className="font-semibold">📍 {sceneContext.location}</span>
              <span className="text-stone-500">•</span>
              <span>⏳ {sceneContext.time}</span>
            </div>
            <p className="text-xs text-stone-300 font-serif mt-0.5 italic leading-snug line-clamp-2">
              {sceneContext.subtitle}
            </p>
          </div>
        </div>
      )}

      {/* Alternative History Warning Banner across the entire wrong branch */}
      {isAltHistory && !isUiHidden && (
        <div className="absolute top-12 left-0 right-0 z-25 flex justify-center pointer-events-none animate-fadeIn">
          <div className="px-5 py-1.5 rounded-full bg-red-950/90 border-2 border-red-500 text-red-200 text-xs sm:text-sm font-serif font-bold shadow-2xl flex items-center space-x-2">
            <span>⚠️</span>
            <span>LỊCH SỬ GIẢ ĐỊNH — Diễn biến này không có thật trong lịch sử</span>
          </div>
        </div>
      )}

      {/* Toast Notification with Direct Document Inspector Button */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 bg-amber-900/95 border-2 border-amber-400 text-amber-100 px-5 py-2 rounded-full shadow-2xl text-xs sm:text-sm font-serif font-semibold animate-bounce flex items-center space-x-3">
          <span>✨</span>
          <span>{toastMessage}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setToastMessage(null);
              onOpenCollection();
            }}
            className="ml-2 px-2.5 py-0.5 rounded-full bg-amber-700 hover:bg-amber-600 text-amber-100 text-xs border border-amber-300/70 cursor-pointer font-sans"
          >
            Soi tư liệu ↗
          </button>
        </div>
      )}

      {/* Auto-play & Skip Controls */}
      <div className={`absolute top-14 right-6 z-25 flex items-center space-x-2 transition-opacity duration-300 ${isUiHidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        {currentNode.type !== "choice" && (
          <button
            onClick={() => setIsAutoPlay((prev) => !prev)}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition cursor-pointer shadow-md ${
              isAutoPlay
                ? "bg-amber-600 text-white border-amber-400 animate-pulse"
                : "bg-stone-900/80 hover:bg-stone-800 text-stone-300 border-stone-700"
            }`}
          >
            {isAutoPlay ? "⏸ Tắt Auto" : "▶ Auto (Tự chạy)"}
          </button>
        )}
      </div>

      {/* Character Sprite / Avatar on Stage */}
      <div className="relative z-15 mt-auto mb-2 flex justify-center w-full px-4">
        <SpriteView
          speaker={currentNode.type === "line" ? charactersMap.get(currentNode.speaker) : undefined}
          speakerId={currentNode.type === "line" ? currentNode.speaker : undefined}
          isThought={currentNode.type === "thought"}
          chapterId={state.currentChapterId}
          sceneId={scene.id}
        />
      </div>

      {/* CG Fullscreen Display with Click to Advance */}
      {currentNode.type === "cg" && !isUiHidden && (
        <div
          onClick={onNext}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xs cursor-pointer select-none animate-fadeIn"
        >
          <div className="max-w-3xl w-full p-6 sm:p-8 rounded-2xl bg-[#221712]/95 border-2 border-amber-600/80 shadow-2xl text-center space-y-3 transition transform hover:scale-[1.01]">
            <div className="text-xs uppercase tracking-widest text-amber-400 font-mono flex items-center justify-center space-x-2">
              <span>🖼️ Minh hoạ sự kiện lịch sử</span>
              <span className="text-stone-500">•</span>
              <span className="text-stone-400 italic">Ảnh minh hoạ, không phải tư liệu</span>
            </div>

            {/* Vector CG Artwork */}
            <CgIllustration assetId={currentNode.asset} />

            {currentNode.caption && (
              <p className="text-lg sm:text-2xl font-serif italic text-amber-100 max-w-2xl mx-auto leading-relaxed pt-1">
                "{currentNode.caption}"
              </p>
            )}
            <div className="pt-2 text-xs text-amber-400/90 font-mono flex items-center justify-center space-x-2">
              <span>Nhấp chuột bất kỳ hoặc gõ Space để tiếp tục</span>
              <span>▼</span>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Bottom Control Panel (Fades when UI is hidden) */}
      <div className={`relative z-20 pb-6 px-4 sm:px-8 w-full max-h-[85vh] overflow-y-auto transition-opacity duration-300 ${isUiHidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        {/* 1. Choice Node */}
        {currentNode.type === "choice" && (
          <ChoicePanel
            prompt={currentNode.prompt}
            options={currentNode.options}
            onSelect={onChoose}
            title={content.strings["choice.title"]}
          />
        )}

        {/* 2. Knowledge Box */}
        {currentNode.type === "knowledge" && (
          <KnowledgeBox
            text={currentNode.text}
            sources={currentNode.sources.map((sId) => sourcesMap.get(sId)!).filter(Boolean)}
            onContinue={onNext}
            title={content.strings["knowledge.title"]}
            continueLabel={content.strings["knowledge.continue"]}
            altHistoryBadge={isAltHistory}
          />
        )}

        {/* 3. Timeline View */}
        {currentNode.type === "timeline" && (
          <TimelineView
            items={currentNode.items}
            onNext={onNext}
            nextLabel={content.strings["dialog.next"]}
          />
        )}

        {/* 4. Cards View */}
        {currentNode.type === "cards" && (
          <CardsView
            items={currentNode.items}
            sourcesMap={sourcesMap}
            onNext={onNext}
            nextLabel={content.strings["dialog.next"]}
          />
        )}

        {/* 5. Standard Dialog (Excluding CG, to prevent duplicate caption rendering!) */}
        {(currentNode.type === "line" ||
          currentNode.type === "thought" ||
          currentNode.type === "narration" ||
          currentNode.type === "unlock") && (
          <DialogBox
            speaker={currentNode.type === "line" ? charactersMap.get(currentNode.speaker) : undefined}
            speakerId={currentNode.type === "line" ? currentNode.speaker : undefined}
            source={
              currentNode.type === "line" && currentNode.source
                ? sourcesMap.get(currentNode.source)
                : undefined
            }
            text={
              currentNode.type === "unlock"
                ? "Đã mở khoá tư liệu trong bộ sưu tập."
                : currentNode.text
            }
            isThought={currentNode.type === "thought"}
            onNext={onNext}
            nextLabel={content.strings["dialog.next"] || "Tiếp"}
          />
        )}
      </div>

      {/* Floating Indicator when UI is hidden */}
      {isUiHidden && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 bg-black/75 backdrop-blur-md px-5 py-2 rounded-full text-xs text-amber-200 border border-amber-500/50 shadow-2xl flex items-center space-x-2 animate-pulse pointer-events-none">
          <span>👁️</span>
          <span>Đang ẩn giao diện — Nhấp chuột hoặc bấm H để hiện lại</span>
        </div>
      )}

      {/* Active Hotspot Historical Inspection Modal */}
      {activeHotspot && (
        <div
          onClick={() => setActiveHotspot(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full bg-[#1e1511]/98 border-2 border-amber-500 rounded-xl p-6 shadow-2xl text-stone-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-amber-900/60 pb-3">
              <div className="flex items-center space-x-2 text-amber-300 font-serif font-bold text-base">
                <span className="text-xl">{activeHotspot.icon}</span>
                <span>{activeHotspot.title}</span>
              </div>
              <button
                onClick={() => setActiveHotspot(null)}
                className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 text-sm flex items-center justify-center border border-stone-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="text-sm font-serif text-[#f3ead7] leading-relaxed bg-black/30 p-3.5 rounded-lg border border-amber-950">
              "{activeHotspot.description}"
            </div>

            <div className="text-xs text-amber-300/90 bg-amber-950/60 p-3 rounded-lg border border-amber-800/40 space-y-1">
              <div className="font-semibold text-amber-200 flex items-center space-x-1">
                <span>📜</span>
                <span>Ghi chép lịch sử:</span>
              </div>
              <p className="font-serif leading-relaxed text-stone-300">
                {activeHotspot.historicalNote}
              </p>
            </div>

            <div className="pt-1 flex justify-end">
              <button
                onClick={() => setActiveHotspot(null)}
                className="px-5 py-1.5 rounded-lg bg-amber-800 hover:bg-amber-700 text-amber-100 text-xs font-semibold border border-amber-500/50 cursor-pointer"
              >
                Đóng (Esc)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Log Modal */}
      {showLog && (
        <LogModal
          log={state.dialogLog}
          onClose={() => setShowLog(false)}
          title={content.strings["dialog.log"]}
        />
      )}
    </div>
  );
};
