import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
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
import { voiceManager } from "../voice";
import { SceneBackground } from "../art/sceneBackgrounds";
import { CgIllustration } from "../art/cgIllustrations";
import { CollectibleIllustration } from "../art/collectibleIllustrations";
import { HISTORICAL_COLLECTIBLE_PHOTOS } from "../data/historicalMedia";
import { SCENE_CONTEXTS } from "../art/sceneContexts";
import { SCENE_HOTSPOTS, SceneHotspot } from "../art/sceneHotspots";
import { HISTORICAL_VIDEOS, HistoricalVideoRecord } from "../art/historicalVideos";
import { HistoricalVideoModal } from "../components/HistoricalVideoModal";
import { SettingsModal, type SettingsConfig } from "../components/SettingsModal";
import { loadSettings, saveSettings } from "../engine/settings";
import { JournalModal } from "../components/JournalModal";
import { CinematicAtmosphere } from "../components/CinematicAtmosphere";
import { isNodeRead, markNodeRead } from "../engine/save";

interface SceneScreenProps {
  content: GameContent;
  state: GameState;
  onNext: () => void;
  onChoose: (key: "A" | "B" | "C") => void;
  onReturnMenu: () => void;
  onOpenCollection: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  canRewind?: boolean;
  onRewind?: () => void;
  onSaveSlot?: (slot: number) => void;
  onLoadSlot?: (slot: number) => void;
  onJumpScene?: (sceneId: string) => void;
  onOpenPresenter?: () => void;
}

export const CAMERA_MIN_ZOOM = 0.65;
export const CAMERA_MAX_ZOOM = 2.8;
export const CAMERA_ZOOM_STEP = 0.12;
export const CAMERA_DEFAULT_ZOOM = 0.88;
export const CAMERA_FIT_ZOOM = 0.72;
const PANORAMA_WIDTH_RATIO = 1.25;
const PANORAMA_ASPECT_RATIO = 3200 / 1200;

export function getPanoramaMetrics(viewportW: number, viewportH: number, zoom: number) {
  const canvasW = Math.max(viewportW * PANORAMA_WIDTH_RATIO, viewportH * PANORAMA_ASPECT_RATIO);
  const canvasH = viewportH;
  return {
    canvasW,
    canvasH,
    maxPanX: Math.max(0, (canvasW * zoom - viewportW) / 2),
    maxPanY: Math.max(0, (canvasH * zoom - viewportH) / 2)
  };
}

function clampPanOffset(
  x: number,
  y: number,
  zoom: number,
  viewportW: number,
  viewportH: number
) {
  const { maxPanX, maxPanY } = getPanoramaMetrics(viewportW, viewportH, zoom);
  return {
    x: maxPanX <= 0 ? 0 : Math.max(-maxPanX, Math.min(maxPanX, x)),
    y: maxPanY <= 0 ? 0 : Math.max(-maxPanY, Math.min(maxPanY, y))
  };
}

export const SceneScreen: React.FC<SceneScreenProps> = ({
  content,
  state,
  onNext,
  onChoose,
  onReturnMenu,
  onOpenCollection,
  isMuted,
  onToggleMute,
  canRewind = false,
  onRewind,
  onSaveSlot,
  onLoadSlot,
  onOpenPresenter
}) => {
  const [showLog, setShowLog] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [isSkipMode, setIsSkipMode] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<SceneHotspot | null>(null);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [discoveredHotspots, setDiscoveredHotspots] = useState<Set<string>>(new Set());
  const [flashCorrect, setFlashCorrect] = useState<boolean>(false);
  const [isUiHidden, setIsUiHidden] = useState<boolean>(false);
  const [activeVideo, setActiveVideo] = useState<HistoricalVideoRecord | null>(null);
  const [isJournalOpen, setIsJournalOpen] = useState<boolean>(false);
  const [isChapterEndJournal, setIsChapterEndJournal] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [settings, setSettings] = useState<SettingsConfig>(() => loadSettings());
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 2.5D Physics-based LERP Parallax with Smooth Inertia
  const targetParallax = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentParallax = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);
  const lanternRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState<number>(CAMERA_DEFAULT_ZOOM);
  const hasDraggedRef = useRef(false);

  const scene = getCurrentScene(content, state);
  const currentNode = getCurrentNode(content, state);
  const sceneContext = scene ? SCENE_CONTEXTS[scene.id] : undefined;
  const sceneHotspots = scene ? SCENE_HOTSPOTS[scene.id] || [] : [];
  const sceneVideo = scene ? HISTORICAL_VIDEOS[scene.id] : undefined;
  const isNightScene = scene ? ["bg-boong-tau-dem", "bg-pho-kham-thien-dem", "bg-goc-phong-den-dau"].includes(scene.bg) : false;

  // Sync settings with audio, voice-over, auto-play, and localStorage
  useEffect(() => {
    saveSettings(settings);
    audioManager.setBgmVolume(settings.bgmVolume);
    audioManager.setSfxVolume(settings.sfxVolume);
    voiceManager.setVolume(settings.voiceVolume ?? 1.0);
    voiceManager.setEnabled(settings.voiceEnabled ?? true);
    setIsAutoPlay(settings.autoPlay);
  }, [
    settings.bgmVolume,
    settings.sfxVolume,
    settings.voiceVolume,
    settings.voiceEnabled,
    settings.autoPlay,
    settings.textSpeed,
    settings.skipRead,
    settings.showCitations
  ]);

  // Play bgm if scene has bgm
  useEffect(() => {
    if (scene?.bgm) {
      audioManager.playBgm(scene.bgm);
    }
  }, [scene?.bgm]);

  // 2.5D LERP Parallax Physics Loop (Smooth inertia damping without React renders)
  const startParallaxLoop = useCallback(() => {
    if (prefersReducedMotion || rafIdRef.current !== null) return;

    const step = () => {
      const current = currentParallax.current;
      const target = targetParallax.current;
      const nextX = current.x + (target.x - current.x) * 0.065;
      const nextY = current.y + (target.y - current.y) * 0.065;
      current.x = nextX;
      current.y = nextY;

      if (stageRef.current) {
        stageRef.current.style.setProperty("--px", nextX.toFixed(5));
        stageRef.current.style.setProperty("--py", nextY.toFixed(5));
      }

      if (Math.abs(target.x - nextX) > 0.0005 || Math.abs(target.y - nextY) > 0.0005) {
        rafIdRef.current = requestAnimationFrame(step);
      } else {
        current.x = target.x;
        current.y = target.y;
        if (stageRef.current) {
          stageRef.current.style.setProperty("--px", target.x.toFixed(5));
          stageRef.current.style.setProperty("--py", target.y.toFixed(5));
        }
        rafIdRef.current = null;
      }
    };

    rafIdRef.current = requestAnimationFrame(step);
  }, [prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  // Device orientation (Gyroscope on mobile / tablet)
  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      const nx = Math.max(-1, Math.min(1, e.gamma / 25));
      const ny = Math.max(-1, Math.min(1, (e.beta - 50) / 25));
      targetParallax.current = { x: nx, y: ny };
      startParallaxLoop();
    };

    window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [prefersReducedMotion, startParallaxLoop]);

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

  // Check if current node is the final node of the chapter
  const isLastNodeOfChapter = useMemo(() => {
    if (!currentChapter || !scene) return false;
    const isLastScene = currentChapter.scenes[currentChapter.scenes.length - 1] === scene.id;
    const isLastNode = state.nodeIndex === scene.nodes.length - 1 && state.activeOption === null;
    return isLastScene && isLastNode;
  }, [currentChapter, scene, state.nodeIndex, state.activeOption]);

  const handleNextNode = useCallback(() => {
    voiceManager.stop();
    if (isLastNodeOfChapter && !isJournalOpen) {
      setIsJournalOpen(true);
      setIsChapterEndJournal(true);
      return;
    }
    onNext();
  }, [isLastNodeOfChapter, isJournalOpen, onNext]);

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

    const speed =
      settings.textSpeed === "fast"
        ? 1800
        : settings.textSpeed === "slow"
        ? 5000
        : 3500;

    const timer = setTimeout(() => {
      audioManager.playSfx("sfx-chon");
      handleNextNode();
    }, speed);

    return () => clearTimeout(timer);
  }, [isAutoPlay, currentNode, handleNextNode, settings.textSpeed]);

  // Read Nodes & Skip Mode logic (F-03)
  useEffect(() => {
    if (!currentNode) return;

    const alreadyRead = isNodeRead(state.currentSceneId, state.nodeIndex);

    if (isSkipMode) {
      if (!settings.skipRead) {
        setIsSkipMode(false);
      }
      // Rule 1: Always stop at choices
      else if (currentNode.type === "choice") {
        setIsSkipMode(false);
      }
      // Rule 2: If encountering an unread node, stop skip immediately
      else if (settings.skipRead && !alreadyRead) {
        setIsSkipMode(false);
      }
      // Rule 3: For already-read node, fast-forward to next
      else {
        const timer = setTimeout(() => {
          handleNextNode();
        }, 80);
        return () => clearTimeout(timer);
      }
    }

    // Persist this node as read
    markNodeRead(state.currentSceneId, state.nodeIndex);
  }, [state.currentSceneId, state.nodeIndex, currentNode, isSkipMode, handleNextNode, settings.skipRead]);

  // Play dramatic suspense sound when reaching historical turning point choice
  useEffect(() => {
    if (currentNode?.type === "choice") {
      audioManager.playSfx("sfx-choice-open");
    }
  }, [currentNode]);

  // Stop any voice-over on unmount
  useEffect(() => {
    return () => {
      voiceManager.stop();
    };
  }, []);

  const handleOptionChoose = useCallback(
    (key: "A" | "B" | "C") => {
      voiceManager.stop();
      if (currentNode?.type === "choice") {
        const choiceNode = currentNode as ChoiceNode;
        const selected = choiceNode.options.find((o) => o.key === key);
        if (selected?.correct) {
          audioManager.playSfx("sfx-correct");
          setFlashCorrect(true);
          setTimeout(() => setFlashCorrect(false), 1200);
        } else {
          audioManager.playSfx("sfx-wrong");
        }
      }
      onChoose(key);
    },
    [currentNode, onChoose]
  );

  // Keyboard shortcut listener
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      // Chặn giữ phím liên tục (ngăn việc ấn giữ space/phím tắt để skip nhanh mạch truyện)
      if (e.repeat) {
        e.preventDefault();
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
        handleResetCamera();
        return;
      }

      if (e.key.toLowerCase() === "f") {
        handleFitCamera();
        return;
      }

      if (e.key === "+" || e.key === "=") {
        setZoomLevel((prev) => Math.min(CAMERA_MAX_ZOOM, prev + CAMERA_ZOOM_STEP));
        return;
      }

      if (e.key === "-" || e.key === "_") {
        setZoomLevel((prev) => Math.max(CAMERA_MIN_ZOOM, prev - CAMERA_ZOOM_STEP));
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

      if (isJournalOpen) {
        if (e.key === "Enter" && isChapterEndJournal) {
          e.preventDefault();
          setIsJournalOpen(false);
          setIsChapterEndJournal(false);
          onNext();
        } else if (e.key === "Escape" || e.key.toLowerCase() === "j") {
          setIsJournalOpen(false);
          setIsChapterEndJournal(false);
        }
        return;
      }

      if (e.key.toLowerCase() === "j") {
        setIsJournalOpen(true);
        setIsChapterEndJournal(false);
        return;
      }

      if (e.key.toLowerCase() === "a") {
        if (currentNode?.type !== "choice") {
          setIsSkipMode(false);
          setIsAutoPlay((prev) => !prev);
        }
        return;
      }

      if (e.key.toLowerCase() === "s") {
        if (currentNode?.type !== "choice") {
          setIsAutoPlay(false);
          setIsSkipMode((prev) => !prev);
        }
        return;
      }

      if (e.key.toLowerCase() === "b") {
        if (canRewind && onRewind) {
          audioManager.playSfx("sfx-chon");
          onRewind();
        }
        return;
      }

      if (!currentNode) return;

      if (
        currentNode.type === "cg" ||
        currentNode.type === "timeline" ||
        currentNode.type === "unlock" ||
        currentNode.type === "retry"
      ) {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          audioManager.playSfx("sfx-chon");
          handleNextNode();
        }
      }
    },
    [
      currentNode,
      handleNextNode,
      onChoose,
      onToggleMute,
      showLog,
      isJournalOpen,
      isChapterEndJournal,
      activeHotspot,
      isUiHidden,
      activeVideo,
      sceneVideo,
      canRewind,
      onRewind,
      onNext
    ]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { clientX, clientY } = e;
      if (!prefersReducedMotion) {
        const nx = (clientX / window.innerWidth - 0.5) * 2;
        const ny = (clientY / window.innerHeight - 0.5) * 2;
        targetParallax.current = { x: nx, y: ny };
        startParallaxLoop();
      }
      if (isNightScene && !prefersReducedMotion && lanternRef.current) {
        lanternRef.current.style.left = `${clientX}px`;
        lanternRef.current.style.top = `${clientY}px`;
      }

      if (isDragging) {
        const dx = clientX - dragStart.x;
        const dy = clientY - dragStart.y;
        if (Math.hypot(dx, dy) > 4) hasDraggedRef.current = true;
        const viewportW = stageRef.current?.clientWidth || window.innerWidth;
        const viewportH = stageRef.current?.clientHeight || window.innerHeight;
        setPanOffset((prev) => clampPanOffset(
          prev.x + dx,
          prev.y + dy,
          zoomLevel,
          viewportW,
          viewportH
        ));
        setDragStart({ x: clientX, y: clientY });
      }
    },
    [isDragging, dragStart, isNightScene, prefersReducedMotion, startParallaxLoop, zoomLevel]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      hasDraggedRef.current = false;
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    hasDraggedRef.current = false;
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || e.touches.length === 0) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStart.x;
    const dy = touch.clientY - dragStart.y;
    if (Math.hypot(dx, dy) > 4) hasDraggedRef.current = true;
    const viewportW = stageRef.current?.clientWidth || window.innerWidth;
    const viewportH = stageRef.current?.clientHeight || window.innerHeight;
    setPanOffset((prev) => clampPanOffset(
      prev.x + dx,
      prev.y + dy,
      zoomLevel,
      viewportW,
      viewportH
    ));
    setDragStart({ x: touch.clientX, y: touch.clientY });
  }, [dragStart, isDragging, zoomLevel]);

  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const direction = e.deltaY < 0 ? 1 : -1;
    const nextZoom = Math.max(
      CAMERA_MIN_ZOOM,
      Math.min(CAMERA_MAX_ZOOM, zoomLevel + direction * CAMERA_ZOOM_STEP)
    );
    const rect = e.currentTarget.getBoundingClientRect();
    const cursorX = e.clientX - (rect.left + rect.width / 2);
    const cursorY = e.clientY - (rect.top + rect.height / 2);
    const ratio = nextZoom / zoomLevel - 1;
    const viewportW = stageRef.current?.clientWidth || window.innerWidth;
    const viewportH = stageRef.current?.clientHeight || window.innerHeight;
    setPanOffset((prev) => clampPanOffset(
      prev.x - cursorX * ratio,
      prev.y - cursorY * ratio,
      nextZoom,
      viewportW,
      viewportH
    ));
    setZoomLevel(nextZoom);
  }, [zoomLevel]);

  const nudgePan = useCallback((direction: -1 | 1) => {
    const viewportW = stageRef.current?.clientWidth || window.innerWidth;
    const viewportH = stageRef.current?.clientHeight || window.innerHeight;
    setPanOffset((prev) => clampPanOffset(
      prev.x + direction * viewportW * 0.25,
      prev.y,
      zoomLevel,
      viewportW,
      viewportH
    ));
  }, [zoomLevel]);

  const updateZoom = useCallback((delta: number) => {
    const nextZoom = Math.max(CAMERA_MIN_ZOOM, Math.min(CAMERA_MAX_ZOOM, zoomLevel + delta));
    const viewportW = stageRef.current?.clientWidth || window.innerWidth;
    const viewportH = stageRef.current?.clientHeight || window.innerHeight;
    setPanOffset((prev) => clampPanOffset(prev.x, prev.y, nextZoom, viewportW, viewportH));
    setZoomLevel(nextZoom);
  }, [zoomLevel]);

  const handleResetCamera = useCallback(() => {
    setPanOffset({ x: 0, y: 0 });
    setZoomLevel(CAMERA_DEFAULT_ZOOM);
    targetParallax.current = { x: 0, y: 0 };
    currentParallax.current = { x: 0, y: 0 };
    if (stageRef.current) {
      stageRef.current.style.setProperty("--px", "0");
      stageRef.current.style.setProperty("--py", "0");
    }
  }, []);

  const handleFitCamera = useCallback(() => {
    setPanOffset({ x: 0, y: 0 });
    setZoomLevel(CAMERA_FIT_ZOOM);
    targetParallax.current = { x: 0, y: 0 };
    currentParallax.current = { x: 0, y: 0 };
    if (stageRef.current) {
      stageRef.current.style.setProperty("--px", "0");
      stageRef.current.style.setProperty("--py", "0");
    }
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

  const viewportW = stageRef.current?.clientWidth || (typeof window !== "undefined" ? window.innerWidth : 1280);
  const viewportH = stageRef.current?.clientHeight || (typeof window !== "undefined" ? window.innerHeight : 720);
  const panoramaMetrics = getPanoramaMetrics(viewportW, viewportH, zoomLevel);
  const panoramaPosition = panoramaMetrics.maxPanX === 0
    ? 50
    : 50 + (panOffset.x / panoramaMetrics.maxPanX) * 50;

  return (
    <div
      ref={stageRef}
      style={{ "--px": "0", "--py": "0", touchAction: "none" } as React.CSSProperties}
      onClick={() => {
        if (hasDraggedRef.current) {
          hasDraggedRef.current = false;
          return;
        }
        if (isUiHidden) setIsUiHidden(false);
      }}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      onWheel={handleWheel}
      className={`relative w-full h-screen overflow-hidden flex flex-col justify-between bg-stone-950 select-none vn-cinema-scope ${
        isAltHistory && !prefersReducedMotion ? "vn-screen-shake vn-alt-history-vignette" : isAltHistory ? "vn-alt-history-vignette" : ""
      } ${flashCorrect ? "vn-gold-radiance" : ""} ${isUiHidden ? (isDragging ? "cursor-grabbing" : "cursor-grab") : ""}`}
    >
      {/* Dynamic Historical Background Artwork with 2.5D Parallax & Drag-to-Pan */}
      <div
        className="absolute inset-0 z-0 bg-[#161210] overflow-hidden"
        onDoubleClick={handleResetCamera}
      >
        <div
          className="absolute top-0 left-1/2 will-change-transform"
          style={{
            width: panoramaMetrics.canvasW,
            height: panoramaMetrics.canvasH,
            marginLeft: -panoramaMetrics.canvasW / 2,
            transform: `translate3d(${panOffset.x}px, ${panOffset.y}px, 0) scale(${zoomLevel})`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.08s ease-out"
          }}
        >
          <SceneBackground bgId={scene.bg} />
          {/* Cinematic atmospheric weather & lighting post-processing */}
          <CinematicAtmosphere
            bgId={scene.bg}
            chapterId={state.currentChapterId}
            prefersReducedMotion={prefersReducedMotion}
          />
          {showHotspots && sceneHotspots.map((spot) => {
        const isDiscovered = discoveredHotspots.has(spot.id);
        return (
          <button
            key={spot.id}
            style={{
              left: `${spot.x}%`,
              top: `${spot.y}%`,
              transform: `translate(-50%, -50%) scale(${1 / zoomLevel})`
            }}
            onClick={(e) => {
              e.stopPropagation();
              setDiscoveredHotspots((prev) => new Set(prev).add(spot.id));
              setActiveHotspot(spot);
              audioManager.playSfx("sfx-mo-khoa");
            }}
            className="absolute z-15 group cursor-pointer focus:outline-none transition-transform hover:scale-125"
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
        </div>

        {/* Night Scene Interactive Lantern Light following Cursor */}
        {isNightScene && (
          <div
            ref={lanternRef}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-amber-400/12 blur-3xl transition-transform duration-75"
            style={{ left: -1000, top: -1000 }}
          />
        )}

        {/* Subtle vignette gradient overlay for text readability & atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* Header bar (Fades out when UI is hidden) */}
      <div className={`transition-opacity duration-300 ${isUiHidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <Header
          chapterTitle={currentChapter?.title}
          sceneTitle={scene.title}
          sceneId={scene.id}
          onOpenLog={() => setShowLog((prev) => !prev)}
          onOpenJournal={() => {
            setIsJournalOpen(true);
            setIsChapterEndJournal(false);
          }}
          onOpenCollection={onOpenCollection}
          onReturnMenu={onReturnMenu}
          isMuted={isMuted}
          onToggleMute={onToggleMute}
          isVoiceEnabled={settings.voiceEnabled}
          onToggleVoice={() =>
            setSettings((prev) => ({ ...prev, voiceEnabled: !prev.voiceEnabled }))
          }
          onToggleHideUi={() => setIsUiHidden((prev) => !prev)}
          onToggleHotspots={() => setShowHotspots((prev) => !prev)}
          showHotspots={showHotspots}
          hasHotspots={sceneHotspots.length > 0}
          hasVideo={!!sceneVideo}
          onOpenVideo={() => {
            if (sceneVideo) setActiveVideo(sceneVideo);
          }}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenPresenter={onOpenPresenter}
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

      {/* Auto, Skip & Rewind Controls */}
      <div className={`absolute top-14 right-6 z-25 flex items-center space-x-2 transition-opacity duration-300 ${isUiHidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        {canRewind && onRewind && (
          <button
            onClick={() => {
              audioManager.playSfx("sfx-chon");
              onRewind();
            }}
            className="px-3 py-1 rounded-full text-xs font-semibold border bg-stone-900/80 hover:bg-stone-800 text-stone-300 border-stone-700 cursor-pointer shadow-md transition"
            title="Lùi lại một câu thoại (B)"
          >
            ⏮ Lùi
          </button>
        )}
        {currentNode.type !== "choice" && (
          <>
            <button
              onClick={() => {
                setIsSkipMode(false);
                setIsAutoPlay((prev) => !prev);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition cursor-pointer shadow-md ${
                isAutoPlay
                  ? "bg-amber-600 text-white border-amber-400 animate-pulse"
                  : "bg-stone-900/80 hover:bg-stone-800 text-stone-300 border-stone-700"
              }`}
              title="Tự động chạy lời thoại (A)"
            >
              {isAutoPlay ? "⏸ Tắt Auto" : "▶ Auto"}
            </button>

            <button
              onClick={() => {
                setIsAutoPlay(false);
                setIsSkipMode((prev) => !prev);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition cursor-pointer shadow-md ${
                isSkipMode
                  ? "bg-red-700 text-white border-red-400 animate-pulse"
                  : "bg-stone-900/80 hover:bg-stone-800 text-stone-300 border-stone-700"
              }`}
              title="Bỏ qua các đoạn đã đọc (S)"
            >
              {isSkipMode ? "⏹ Dừng Skip" : "⏩ Bỏ qua (Skip)"}
            </button>
          </>
        )}
      </div>

      {/* Character Sprite / Avatar on Stage with 2.5D Optical Counter-Parallax */}
      <div
        className="relative z-15 mt-auto mb-2 flex justify-center w-full px-4 will-change-transform"
        style={{
          transform: prefersReducedMotion
            ? "none"
            : "translate3d(calc(var(--px, 0) * 12px), calc(var(--py, 0) * 4px), 0) rotateY(calc(var(--px, 0) * -1.1deg))",
          transformOrigin: "bottom center",
          transition: "transform 0.08s ease-out"
        }}
      >
        <SpriteView
          speaker={currentNode.type === "line" ? charactersMap.get(currentNode.speaker) : undefined}
          speakerId={currentNode.type === "line" ? currentNode.speaker : undefined}
          isThought={currentNode.type === "thought"}
          chapterId={state.currentChapterId}
          sceneId={scene.id}
          expression={currentNode.type === "line" ? currentNode.expression : undefined}
        />
      </div>

      {/* CG Fullscreen Display with Click to Advance */}
      {currentNode.type === "cg" && !isUiHidden && (
        <div
          onClick={() => {
            audioManager.playSfx("sfx-chon");
            handleNextNode();
          }}
          className={`absolute inset-0 z-30 flex flex-col items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xs cursor-pointer select-none animate-fadeIn ${
            isAltHistory ? "sepia-60" : ""
          } ${isAltHistory && !prefersReducedMotion ? "animate-pulse" : ""}`}
        >
          <div className="max-w-4xl sm:max-w-5xl w-full p-5 sm:p-7 rounded-2xl bg-[#1d1410]/95 border-2 border-amber-600/80 shadow-2xl text-center space-y-3 transition transform hover:scale-[1.005]">
            <div className="text-xs uppercase tracking-widest text-amber-400 font-mono flex items-center justify-center space-x-2">
              <span>🖼️ Minh hoạ sự kiện lịch sử</span>
              <span className="text-stone-500">•</span>
              <span className="text-stone-400 italic">Ảnh minh hoạ, không phải tư liệu</span>
            </div>

            {/* Vector CG Artwork */}
            <CgIllustration assetId={currentNode.asset} className="w-full h-64 sm:h-80 md:h-[420px] my-3" />

            {currentNode.caption && (
              <p className="text-base sm:text-xl font-serif italic text-amber-100 max-w-3xl mx-auto leading-relaxed pt-1">
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
            key={`kb-${state.currentSceneId}-${state.nodeIndex}`}
            text={currentNode.text}
            sources={currentNode.sources.map((sId) => sourcesMap.get(sId)!).filter(Boolean)}
            onContinue={handleNextNode}
            title={content.strings["knowledge.title"]}
            continueLabel={content.strings["knowledge.continue"]}
            altHistoryBadge={isAltHistory}
          />
        )}

        {/* 3. Timeline View */}
        {currentNode.type === "timeline" && (
          <TimelineView
            items={currentNode.items}
            onNext={handleNextNode}
            nextLabel={content.strings["dialog.next"]}
          />
        )}

        {/* 4. Cards View */}
        {currentNode.type === "cards" && (
          <CardsView
            items={currentNode.items}
            sourcesMap={sourcesMap}
            showCitations={settings.showCitations}
            onNext={handleNextNode}
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

            {currentNode.item && (
              <div className="relative w-full max-w-md mx-auto my-2">
                {HISTORICAL_COLLECTIBLE_PHOTOS[currentNode.item] ? (
                  <div className="relative w-full h-44 sm:h-52 flex flex-col items-center justify-center bg-black/85 rounded-xl border-2 border-amber-500/80 p-2 shadow-2xl overflow-hidden group">
                    <img
                      src={HISTORICAL_COLLECTIBLE_PHOTOS[currentNode.item].photoUrl}
                      alt={content.collectibles.find((c) => c.id === currentNode.item)?.title}
                      className="max-h-36 sm:max-h-42 w-auto object-contain rounded transition transform group-hover:scale-105"
                    />
                    <div className="absolute bottom-1 left-2 right-2 text-center bg-black/90 px-2 py-0.5 rounded text-[10px] text-amber-300 font-mono truncate border border-amber-900/50">
                      🏛️ {HISTORICAL_COLLECTIBLE_PHOTOS[currentNode.item].archiveSource}
                    </div>
                  </div>
                ) : (
                  <CollectibleIllustration
                    collectibleId={currentNode.item}
                    className="w-full max-w-md h-32 sm:h-40 mx-auto"
                  />
                )}
              </div>
            )}

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
                <span>
                  {HISTORICAL_COLLECTIBLE_PHOTOS[currentNode.item]?.archiveSource ||
                    content.collectibles.find((c) => c.id === currentNode.item)?.image_credit}
                </span>
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
                  handleNextNode();
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
                : "narrator"
            }
            source={
              currentNode.type === "line" && currentNode.source
                ? sourcesMap.get(currentNode.source)
                : undefined
            }
            text={currentNode.text}
            isThought={currentNode.type === "thought"}
            onNext={handleNextNode}
            nextLabel={content.strings["dialog.next"] || "Tiếp"}
            instant={settings.textSpeed === "instant"}
            textSpeed={settings.textSpeed}
            showCitation={settings.showCitations}
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
            role="dialog"
            aria-modal="true"
            aria-labelledby="hotspot-dialog-title"
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full bg-[#1e1511]/98 border-2 border-amber-500 rounded-xl p-6 shadow-2xl text-stone-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-amber-900/60 pb-3">
              <div className="flex items-center space-x-2 text-amber-300 font-serif font-bold text-base">
                <span className="text-xl">{activeHotspot.icon}</span>
                <span id="hotspot-dialog-title">{activeHotspot.title}</span>
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

            <div className="pt-2 flex items-center justify-end border-t border-amber-900/40">
              <button
                onClick={() => setActiveHotspot(null)}
                className="px-5 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-600 text-amber-100 text-xs font-semibold border border-amber-500/80 cursor-pointer shadow-md transition"
              >
                Đã ghi nhận (Esc)
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

      {/* Floating Canvas Controls */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute bottom-6 right-4 sm:right-6 z-30 flex items-center gap-1.5 bg-stone-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-amber-900/50 shadow-2xl text-xs font-mono text-stone-300 transition-opacity ${
          isUiHidden ? "animate-fadeIn" : "opacity-90"
        }`}
      >
        <button
          onClick={() => nudgePan(-1)}
          className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-200 flex items-center justify-center border border-stone-700 cursor-pointer font-bold"
          title="Lướt trái"
          aria-label="Lướt trái"
        >
          ◀
        </button>
        <button
          onClick={() => updateZoom(-CAMERA_ZOOM_STEP)}
          className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-200 flex items-center justify-center border border-stone-700 cursor-pointer font-bold"
          title="Thu nhỏ (-)"
          aria-label="Thu nhỏ"
        >
          −
        </button>
        <span className="min-w-[3.5rem] text-center text-amber-300" aria-label={`Zoom ${Math.round(zoomLevel * 100)}%`}>
          {Math.round(zoomLevel * 100)}%
        </span>
        <button
          onClick={() => updateZoom(CAMERA_ZOOM_STEP)}
          className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-200 flex items-center justify-center border border-stone-700 cursor-pointer font-bold"
          title="Phóng to (+)"
          aria-label="Phóng to"
        >
          +
        </button>
        <button
          onClick={() => nudgePan(1)}
          className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-200 flex items-center justify-center border border-stone-700 cursor-pointer font-bold"
          title="Lướt phải"
          aria-label="Lướt phải"
        >
          ▶
        </button>
        <div className="hidden sm:block w-20 h-1 rounded-full bg-stone-700 overflow-hidden" aria-label="Vị trí toàn cảnh">
          <div className="h-full bg-amber-400 transition-all" style={{ width: "20%", marginLeft: `${Math.max(0, Math.min(80, panoramaPosition - 10))}%` }} />
        </div>
        <button
          onClick={handleResetCamera}
          className="px-2.5 h-7 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-200 flex items-center justify-center border border-stone-700 cursor-pointer text-[11px]"
          title="Đặt lại góc nhìn chuẩn (R)"
        >
          ↺
        </button>
        <button
          onClick={handleFitCamera}
          className="px-2.5 h-7 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-200 flex items-center justify-center border border-stone-700 cursor-pointer text-[11px] font-medium"
          title="Vừa khung nhìn toàn cảnh (F)"
        >
          🖼️ Vừa khung
        </button>
        {isUiHidden && (
          <button
            onClick={() => setIsUiHidden(false)}
            className="px-3 h-7 rounded-full bg-amber-800 hover:bg-amber-700 text-white flex items-center justify-center border border-amber-600 cursor-pointer text-xs font-semibold"
            title="Hiện lại giao diện (H)"
          >
            Hiện UI
          </button>
        )}
      </div>
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
          onSaveSlot={onSaveSlot}
          onLoadSlot={onLoadSlot}
          isMuted={isMuted}
          onToggleMute={onToggleMute}
        />
      )}

      {/* Minh's Historical Journal Modal */}
      <JournalModal
        journals={content.journal || []}
        currentChapterId={state.currentChapterId}
        isOpen={isJournalOpen}
        isEndOfChapter={isChapterEndJournal}
        onClose={() => {
          setIsJournalOpen(false);
          setIsChapterEndJournal(false);
        }}
        onProceed={() => {
          setIsJournalOpen(false);
          setIsChapterEndJournal(false);
          onNext();
        }}
      />

    </div>
  );
};
