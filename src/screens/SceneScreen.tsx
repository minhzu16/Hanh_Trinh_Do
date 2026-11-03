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
import { HISTORICAL_VIDEOS, HistoricalVideoRecord } from "../art/historicalVideos";
import { HistoricalVideoModal } from "../components/HistoricalVideoModal";
import { SettingsModal, type SettingsConfig } from "../components/SettingsModal";

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
  const [discoveredHotspots, setDiscoveredHotspots] = useState<Set<string>>(new Set());
  const [inspectedHotspots, setInspectedHotspots] = useState<Set<string>>(new Set());
  const [revolutionMorale, setRevolutionMorale] = useState<number>(65);
  const [covertSecurity, setCovertSecurity] = useState<number>(100);
  const [moraleToast, setMoraleToast] = useState<string | null>(null);
  const [flashCorrect, setFlashCorrect] = useState<boolean>(false);
  const [stealthEventTriggered, setStealthEventTriggered] = useState<Record<string, boolean>>({});
  const [activeStealthEvent, setActiveStealthEvent] = useState<boolean>(false);
  const [stealthResult, setStealthResult] = useState<string | null>(null);
  const [isUiHidden, setIsUiHidden] = useState<boolean>(false);
  const [activeVideo, setActiveVideo] = useState<HistoricalVideoRecord | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [settings, setSettings] = useState<SettingsConfig>({
    textSpeed: "normal",
    bgmVolume: 0.75,
    sfxVolume: 0.85,
    autoPlay: false,
    skipRead: false,
    showCitations: true
  });
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [mouseParallax, setMouseParallax] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState<number>(1.04);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });

  const scene = getCurrentScene(content, state);
  const currentNode = getCurrentNode(content, state);
  const sceneContext = scene ? SCENE_CONTEXTS[scene.id] : undefined;
  const sceneHotspots = scene ? SCENE_HOTSPOTS[scene.id] || [] : [];
  const sceneVideo = scene ? HISTORICAL_VIDEOS[scene.id] : undefined;
  const isNightScene = scene ? ["bg-boong-tau-dem", "bg-pho-kham-thien-dem", "bg-goc-phong-den-dau"].includes(scene.bg) : false;

  // Sync settings with audio and auto-play
  useEffect(() => {
    audioManager.setBgmVolume(settings.bgmVolume);
    audioManager.setSfxVolume(settings.sfxVolume);
    setIsAutoPlay(settings.autoPlay);
  }, [settings.bgmVolume, settings.sfxVolume, settings.autoPlay]);

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

    const speed = settings.skipRead
      ? 500
      : settings.textSpeed === "fast"
      ? 1800
      : settings.textSpeed === "slow"
      ? 5000
      : 3500;

    const timer = setTimeout(() => {
      audioManager.playSfx("sfx-chon");
      onNext();
    }, speed);

    return () => clearTimeout(timer);
  }, [isAutoPlay, currentNode, onNext]);

  // Play dramatic suspense sound when reaching historical turning point choice
  useEffect(() => {
    if (currentNode?.type === "choice") {
      audioManager.playSfx("sfx-choice-open");
    }
  }, [currentNode]);

  // Trigger spy stealth alert in historically dangerous espionage scenes
  useEffect(() => {
    if (
      scene &&
      ["s4_paris_nghiencuu", "s8_quangchau_taphoi", "s14_huongcang_hopnhat"].includes(scene.id) &&
      state.nodeIndex === 2 &&
      !stealthEventTriggered[scene.id]
    ) {
      setStealthEventTriggered((prev) => ({ ...prev, [scene.id]: true }));
      setActiveStealthEvent(true);
      audioManager.playSfx("sfx-choice-open");
    }
  }, [scene, state.nodeIndex, stealthEventTriggered]);

  // Auto-dismiss morale toast
  useEffect(() => {
    if (!moraleToast) return;
    const t = setTimeout(() => setMoraleToast(null), 2500);
    return () => clearTimeout(t);
  }, [moraleToast]);

  const handleStealthAction = useCallback((actionTitle: string) => {
    audioManager.playSfx("sfx-mo-khoa");
    setRevolutionMorale((prev) => Math.min(100, prev + 15));
    setMoraleToast("+15 Ý Chí!");
    setStealthResult(`✓ ${actionTitle} thành công! Cắt đuôi mật thám, nhận huy hiệu "Mật Thám Bó Tay" (+15 Ý Chí)`);
  }, []);

  const handleForensicInspect = useCallback((spotId: string) => {
    setInspectedHotspots((prev) => new Set(prev).add(spotId));
    setRevolutionMorale((prev) => Math.min(100, prev + 10));
    setMoraleToast("+10 Ý Chí!");
    audioManager.playSfx("sfx-correct");
  }, []);

  const handleOptionChoose = useCallback(
    (key: "A" | "B" | "C") => {
      if (currentNode?.type === "choice") {
        const choiceNode = currentNode as ChoiceNode;
        const selected = choiceNode.options.find((o) => o.key === key);
        if (selected?.correct) {
          audioManager.playSfx("sfx-correct");
          setFlashCorrect(true);
          setRevolutionMorale((prev) => Math.min(100, prev + 15));
          setMoraleToast("+15 Ý Chí Lịch Sử!");
          setTimeout(() => setFlashCorrect(false), 1200);
        } else {
          audioManager.playSfx("sfx-wrong");
          setCovertSecurity((prev) => Math.max(30, prev - 25));
        }
      }
      onChoose(key);
    },
    [currentNode, onChoose]
  );

  // Keyboard shortcut listener
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeStealthEvent) {
        if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
          setActiveStealthEvent(false);
          setStealthResult(null);
        }
        return;
      }

      if (activeVideo) {
        if (e.key === "Escape") {
          setActiveVideo(null);
        }
        return;
      }

      if (activeHotspot) {
        if (e.key === "Escape") {
          setActiveHotspot(null);
        }
        return;
      }

      if (e.key.toLowerCase() === "v" && sceneVideo) {
        setActiveVideo(sceneVideo);
        return;
      }

      if (e.key.toLowerCase() === "r") {
        setPanOffset({ x: 0, y: 0 });
        setZoomLevel(1.04);
        return;
      }

      if (e.key === "+" || e.key === "=") {
        setZoomLevel((prev) => Math.min(2.0, prev + 0.15));
        return;
      }

      if (e.key === "-" || e.key === "_") {
        setZoomLevel((prev) => Math.max(1.0, prev - 0.15));
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

      if (currentNode.type !== "choice") {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          audioManager.playSfx("sfx-chon");
          onNext();
        }
      }
    },
    [currentNode, onNext, onChoose, onToggleMute, showLog, activeHotspot, isUiHidden, activeVideo, sceneVideo]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { clientX, clientY } = e;
      if (!prefersReducedMotion) {
        const nx = (clientX / window.innerWidth - 0.5) * 2;
        const ny = (clientY / window.innerHeight - 0.5) * 2;
        setMouseParallax({ x: nx, y: ny });
      }
      setCursorPos({ x: clientX, y: clientY });

      if (isDragging) {
        const dx = clientX - dragStart.x;
        const dy = clientY - dragStart.y;
        setPanOffset((prev) => ({
          x: Math.max(-350, Math.min(350, prev.x + dx)),
          y: Math.max(-200, Math.min(200, prev.y + dy))
        }));
        setDragStart({ x: clientX, y: clientY });
      }
    },
    [isDragging, dragStart, prefersReducedMotion]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleResetCamera = useCallback(() => {
    setPanOffset({ x: 0, y: 0 });
    setZoomLevel(1.04);
  }, []);

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
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={`relative w-full h-screen overflow-hidden flex flex-col justify-between bg-stone-950 select-none ${
        isAltHistory ? "vn-screen-shake vn-alt-history-vignette" : ""
      } ${flashCorrect ? "vn-gold-radiance" : ""} ${isUiHidden ? (isDragging ? "cursor-grabbing" : "cursor-grab") : ""}`}
    >
      {/* Dynamic Historical Background Artwork with 2.5D Parallax & Drag-to-Pan */}
      <div
        className="absolute inset-0 z-0 bg-[#161210] overflow-hidden"
        onDoubleClick={handleResetCamera}
      >
        <div
          className="w-full h-full will-change-transform"
          style={{
            transform: `translate3d(${panOffset.x + mouseParallax.x * -18}px, ${panOffset.y + mouseParallax.y * -12}px, 0) rotateY(${mouseParallax.x * 1.6}deg) rotateX(${mouseParallax.y * -1.2}deg) scale(${zoomLevel})`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)"
          }}
        >
          <SceneBackground bgId={scene.bg} />
        </div>

        {/* Night Scene Interactive Lantern Light following Cursor */}
        {isNightScene && cursorPos.x > 0 && (
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-amber-400/12 blur-3xl transition-transform duration-75"
            style={{ left: cursorPos.x, top: cursorPos.y }}
          />
        )}

        {/* Subtle vignette gradient overlay for text readability & atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/60 pointer-events-none" />
      </div>

      {/* Interactive Exploration Hotspots on Background */}
      {showHotspots && !isUiHidden && sceneHotspots.map((spot) => {
        const isDiscovered = discoveredHotspots.has(spot.id);
        return (
          <button
            key={spot.id}
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            onClick={(e) => {
              e.stopPropagation();
              setDiscoveredHotspots((prev) => new Set(prev).add(spot.id));
              setActiveHotspot(spot);
              audioManager.playSfx("sfx-mo-khoa");
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-15 group cursor-pointer focus:outline-none transition-transform hover:scale-125"
            title={`Khám phá: ${spot.title} ${isDiscovered ? "(Đã xem ✓)" : ""}`}
          >
            <div className="relative flex items-center justify-center">
              {!isDiscovered && (
                <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-amber-400 opacity-60" />
              )}
              <div className={`relative w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-2xl transition-colors ${
                isDiscovered
                  ? "bg-emerald-950/95 border-2 border-emerald-400 text-emerald-200"
                  : "bg-[#2a170e]/95 border-2 border-amber-400 text-amber-200"
              }`}>
                {spot.icon}
                {isDiscovered && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full text-[9px] text-black font-bold flex items-center justify-center shadow">
                    ✓
                  </span>
                )}
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded bg-[#1c1410]/95 border border-amber-500/70 text-[11px] text-amber-200 font-serif whitespace-nowrap shadow-2xl">
              {spot.title} {isDiscovered && "✓"}
            </div>
          </button>
        );
      })}

      {/* Header bar (Fades out when UI is hidden) */}
      <div className={`transition-opacity duration-300 ${isUiHidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <Header
          chapterTitle={currentChapter?.title}
          sceneTitle={scene.title}
          sceneId={scene.id}
          onOpenLog={() => setShowLog((prev) => !prev)}
          onOpenCollection={onOpenCollection}
          onReturnMenu={onReturnMenu}
          isMuted={isMuted}
          onToggleMute={onToggleMute}
          onToggleHideUi={() => setIsUiHidden((prev) => !prev)}
          onToggleHotspots={() => setShowHotspots((prev) => !prev)}
          showHotspots={showHotspots}
          hasHotspots={sceneHotspots.length > 0}
          hasVideo={!!sceneVideo}
          onOpenVideo={() => {
            if (sceneVideo) setActiveVideo(sceneVideo);
          }}
          onOpenSettings={() => setIsSettingsOpen(true)}
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
            {sceneHotspots.length > 0 && showHotspots && (
              <div className={`mt-1.5 pt-1 border-t border-amber-900/40 flex items-center justify-between text-[11px] font-sans ${
                sceneHotspots.every((s) => discoveredHotspots.has(s.id))
                  ? "text-emerald-300 font-semibold"
                  : "text-amber-300"
              }`}>
                <span className="flex items-center space-x-1">
                  <span>{sceneHotspots.every((s) => discoveredHotspots.has(s.id)) ? "✨" : "🔍"}</span>
                  <span>
                    {sceneHotspots.every((s) => discoveredHotspots.has(s.id))
                      ? `Đã tìm đủ ${sceneHotspots.length}/${sceneHotspots.length} manh mối!`
                      : `Khám phá: ${sceneHotspots.filter((s) => discoveredHotspots.has(s.id)).length}/${sceneHotspots.length} manh mối`}
                  </span>
                </span>
                <span className="text-stone-400 text-[10px]">
                  {sceneHotspots.every((s) => discoveredHotspots.has(s.id)) ? "Hoàn thành ✓" : "Chạm đốm sáng"}
                </span>
              </div>
            )}
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

      {/* Auto-play & Dynamic Revolution HUD Controls */}
      <div className={`absolute top-14 right-6 z-25 flex items-center space-x-2.5 transition-opacity duration-300 ${isUiHidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        {/* Dynamic Revolution HUD */}
        <div className="hidden sm:flex items-center space-x-2 bg-stone-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-amber-900/60 shadow-lg text-xs">
          <span className="flex items-center space-x-1 font-mono text-amber-300 font-bold">
            <span>🔥</span>
            <span>Ý Chí: {revolutionMorale}%</span>
          </span>
          <span className="text-stone-600">|</span>
          <span className={`flex items-center space-x-1 font-mono font-bold ${
            covertSecurity < 50 ? "text-red-400 animate-pulse" : "text-emerald-300"
          }`}>
            <span>🛡️</span>
            <span>Bảo Mật: {covertSecurity}%</span>
          </span>
        </div>

        {moraleToast && (
          <div className="bg-amber-500 text-black px-2.5 py-0.5 rounded-full text-xs font-bold animate-bounce shadow-md">
            {moraleToast}
          </div>
        )}

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
          onClick={() => {
            audioManager.playSfx("sfx-chon");
            onNext();
          }}
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
      <div className={`relative z-20 pt-4 pb-6 px-4 sm:px-8 w-full max-h-[85vh] overflow-y-auto transition-opacity duration-300 ${isUiHidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        {/* 1. Choice Node */}
        {currentNode.type === "choice" && (
          <ChoicePanel
            prompt={currentNode.prompt}
            options={currentNode.options}
            onSelect={handleOptionChoose}
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

        {/* 5. Unlocked Relic Celebration Card */}
        {currentNode.type === "unlock" && (
          <div className="w-full max-w-2xl mx-auto p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#2a1a12]/95 via-[#1a110c]/95 to-[#120a06]/95 border-2 border-amber-400 shadow-[0_0_40px_rgba(200,162,74,0.35)] backdrop-blur-md text-center space-y-3.5 animate-fadeIn">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/80 text-amber-200 text-xs font-serif font-bold tracking-widest uppercase">
              <span className="text-base">⭐</span>
              <span>Bảo Vật Lịch Sử Được Khám Phá!</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-amber-100 drop-shadow">
              {content.collectibles.find((c) => c.id === currentNode.item)?.title || currentNode.item}
            </h3>

            {content.collectibles.find((c) => c.id === currentNode.item)?.caption && (
              <p className="text-sm sm:text-base font-serif italic text-amber-200/90 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-amber-800/40 max-w-xl mx-auto">
                "{content.collectibles.find((c) => c.id === currentNode.item)?.caption}"
              </p>
            )}

            {content.collectibles.find((c) => c.id === currentNode.item) && (
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-stone-400 font-sans pt-1">
                <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-amber-300 font-mono">
                  Nguồn: {content.collectibles.find((c) => c.id === currentNode.item)?.source}
                </span>
                <span>•</span>
                <span>{content.collectibles.find((c) => c.id === currentNode.item)?.image_credit}</span>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onOpenCollection}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-200 font-serif font-semibold text-xs sm:text-sm border border-amber-700/60 transition cursor-pointer"
              >
                🏛️ Xem trong phòng tư liệu
              </button>
              <button
                onClick={() => {
                  audioManager.playSfx("sfx-chon");
                  onNext();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-red-700 hover:from-amber-500 hover:to-red-600 text-amber-100 font-serif font-bold text-xs sm:text-sm shadow-xl border border-amber-400 transition cursor-pointer"
              >
                Tiếp tục hành trình ↵
              </button>
            </div>
          </div>
        )}

        {/* 6. Standard Dialog (Excluding CG, to prevent duplicate caption rendering!) */}
        {(currentNode.type === "line" ||
          currentNode.type === "thought" ||
          currentNode.type === "narration") && (
          <DialogBox
            speaker={
              currentNode.type === "line"
                ? charactersMap.get(currentNode.speaker)
                : currentNode.type === "thought"
                ? charactersMap.get("minh")
                : undefined
            }
            speakerId={
              currentNode.type === "line"
                ? currentNode.speaker
                : currentNode.type === "thought"
                ? "minh"
                : undefined
            }
            source={
              currentNode.type === "line" && currentNode.source
                ? sourcesMap.get(currentNode.source)
                : undefined
            }
            text={currentNode.text}
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

            <div className="pt-2 flex items-center justify-between border-t border-amber-900/40">
              <button
                onClick={() => handleForensicInspect(activeHotspot.id)}
                disabled={inspectedHotspots.has(activeHotspot.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer flex items-center space-x-1.5 ${
                  inspectedHotspots.has(activeHotspot.id)
                    ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                    : "bg-amber-700 hover:bg-amber-600 border-amber-400 text-amber-100"
                }`}
              >
                <span>{inspectedHotspots.has(activeHotspot.id) ? "✓ Đã Giám Định (+10 Ý Chí)" : "🔍 Giám định hiện vật (+10 Ý Chí)"}</span>
              </button>
              <button
                onClick={() => setActiveHotspot(null)}
                className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold border border-stone-600 cursor-pointer"
              >
                Đóng (Esc)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Surprise Minigame: Shadow Alert (Mật Thám Pháp Rình Rập) */}
      {activeStealthEvent && !isUiHidden && (
        <div
          onClick={() => {
            setActiveStealthEvent(false);
            setStealthResult(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-fadeIn select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-lg w-full bg-gradient-to-b from-[#2a130f] via-[#1a0c0a] to-[#0f0706] border-2 border-red-500 rounded-2xl p-6 sm:p-7 shadow-[0_0_50px_rgba(239,68,68,0.45)] text-stone-200 space-y-4 vn-stealth-pulse"
          >
            <div className="flex items-center space-x-3 border-b border-red-900/60 pb-3">
              <span className="text-3xl animate-bounce">🚨</span>
              <div>
                <h3 className="font-serif font-extrabold text-red-400 text-base sm:text-lg tracking-wide uppercase">
                  Báo Động: Mật Thám Rình Rập!
                </h3>
                <p className="text-xs text-stone-400">
                  {scene.id === "s4_paris_nghiencuu"
                    ? "Mật thám Paul Arnoux đang bám theo Người qua các ngả phố Paris"
                    : scene.id === "s8_quangchau_taphoi"
                    ? "Mật thám Tô giới rà soát các cơ sở cách mạng Quảng Châu"
                    : "Cảnh sát Tô giới Hương Cảng theo dõi Đại hội hợp nhất"}
                </p>
              </div>
            </div>

            <p className="text-sm font-serif text-amber-100 leading-relaxed italic bg-black/40 p-3 rounded-xl border border-red-950">
              "Lực lượng cảnh sát thuộc địa luôn theo dõi gắt gao từng bước chân của nhà cách mạng. Hãy chọn phương án ứng biến nhanh nhất để bảo toàn bí mật:"
            </p>

            {stealthResult ? (
              <div className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs sm:text-sm font-serif space-y-3 animate-fadeIn">
                <p className="font-bold">{stealthResult}</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setActiveStealthEvent(false);
                      setStealthResult(null);
                    }}
                    className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs cursor-pointer shadow-lg"
                  >
                    Tiếp tục hành trình ↵
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5">
                {(scene.id === "s4_paris_nghiencuu"
                  ? [
                      { icon: "🏃", text: "Rẽ gấp vào ngõ cụt Compoint, cắt đuôi trong làn sương mù Paris" },
                      { icon: "🧥", text: "Giấu nhanh bản thảo Yêu sách vào đáy túi đồ nghề thợ ảnh" },
                      { icon: "🚇", text: "Bước vội qua ga tàu điện ngầm ngầm, hòa vào dòng người lao động" }
                    ]
                  : scene.id === "s8_quangchau_taphoi"
                  ? [
                      { icon: "📜", text: "Chuyển tài liệu huấn luyện chính trị sang trạm liên lạc bí mật" },
                      { icon: "🎭", text: "Đổi mật danh công tác, ngụy trang thành giáo viên Lý Thụy" },
                      { icon: "🚩", text: "Hòa vào phong trào công nhân bãi công Quảng Châu - Hồng Kông" }
                    ]
                  : [
                      { icon: "⚽", text: "Đóng vai cổ động viên bóng đá Cửu Long ra về giữa đám đông" },
                      { icon: "💼", text: "Bảo quản an toàn bản Chánh cương & Sách lược trong va-li than" },
                      { icon: "🏠", text: "Bí mật di chuyển về khu nhà an toàn của kiều bào yêu nước" }
                    ]
                ).map((act, aIdx) => (
                  <button
                    key={aIdx}
                    onClick={() => handleStealthAction(act.text)}
                    className="w-full text-left p-3 rounded-xl bg-stone-900/90 hover:bg-red-950/80 border border-stone-700 hover:border-red-400 text-stone-200 hover:text-white transition cursor-pointer flex items-center space-x-3 group"
                  >
                    <span className="text-xl flex-shrink-0 group-hover:scale-125 transition-transform">
                      {act.icon}
                    </span>
                    <span className="text-xs sm:text-sm font-serif flex-1">
                      {act.text}
                    </span>
                    <span className="text-xs text-amber-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                      Chọn ↵
                    </span>
                  </button>
                ))}

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setActiveStealthEvent(false);
                      setStealthResult(null);
                    }}
                    className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 text-xs border border-stone-700 cursor-pointer"
                  >
                    Bỏ qua (Tiếp tục)
                  </button>
                </div>
              </div>
            )}
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

      {/* Floating Canvas Controls when UI is hidden or when exploring with Pan/Zoom */}
      {isUiHidden && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-6 right-6 z-30 flex items-center space-x-2 bg-stone-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-900/50 shadow-2xl text-xs font-mono text-stone-300 animate-fadeIn"
        >
          <span className="text-[11px] text-amber-400 hidden sm:inline">Kéo chuột di chuyển • Di chuột tạo chiều sâu 3D</span>
          <button
            onClick={() => setZoomLevel((prev) => Math.min(2.0, prev + 0.15))}
            className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-200 flex items-center justify-center border border-stone-700 cursor-pointer font-bold"
            title="Phóng to (+)"
          >
            +
          </button>
          <button
            onClick={() => setZoomLevel((prev) => Math.max(1.0, prev - 0.15))}
            className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-200 flex items-center justify-center border border-stone-700 cursor-pointer font-bold"
            title="Thu nhỏ (-)"
          >
            -
          </button>
          <button
            onClick={handleResetCamera}
            className="px-2.5 h-7 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-200 flex items-center justify-center border border-stone-700 cursor-pointer text-[11px]"
            title="Đặt lại góc nhìn (R)"
          >
            ↺ Đặt lại
          </button>
          <button
            onClick={() => setIsUiHidden(false)}
            className="px-3 h-7 rounded-full bg-amber-800 hover:bg-amber-700 text-white flex items-center justify-center border border-amber-600 cursor-pointer text-xs font-semibold"
            title="Hiện lại giao diện (H)"
          >
            Hiện UI
          </button>
        </div>
      )}

      {/* Historical Documentary Video Modal */}
      {activeVideo && (
        <HistoricalVideoModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}

      {/* Settings & Accessibility Modal */}
      {isSettingsOpen && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={setSettings}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
};
