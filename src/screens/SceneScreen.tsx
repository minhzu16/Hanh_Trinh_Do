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

  const scene = getCurrentScene(content, state);
  const currentNode = getCurrentNode(content, state);

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
    [currentNode, onNext, onChoose, onToggleMute, showLog]
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
    <div className="relative w-full h-screen overflow-hidden flex flex-col justify-between bg-stone-950 select-none">
      {/* Background visual placeholder / artwork */}
      <div className="absolute inset-0 z-0 bg-[#161210]">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 z-10 pointer-events-none" />
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 opacity-25">
          <span className="text-6xl mb-4">🏛️</span>
          <span className="text-sm font-mono text-amber-500/70 uppercase tracking-widest">
            {scene.bg}
          </span>
          <h2 className="text-3xl font-serif text-stone-300 mt-2">{scene.title}</h2>
        </div>
      </div>

      {/* Header bar */}
      <Header
        chapterTitle={currentChapter?.title}
        sceneTitle={scene.title}
        onOpenLog={() => setShowLog((prev) => !prev)}
        onOpenCollection={onOpenCollection}
        onReturnMenu={onReturnMenu}
        isMuted={isMuted}
        onToggleMute={onToggleMute}
      />

      {/* Alternative History Warning Banner across the entire wrong branch */}
      {isAltHistory && (
        <div className="absolute top-12 left-0 right-0 z-25 flex justify-center pointer-events-none animate-fadeIn">
          <div className="px-5 py-1.5 rounded-full bg-red-950/90 border-2 border-red-500 text-red-200 text-xs sm:text-sm font-serif font-bold shadow-2xl flex items-center space-x-2">
            <span>⚠️</span>
            <span>LỊCH SỬ GIẢ ĐỊNH — Diễn biến này không có thật trong lịch sử</span>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 bg-amber-900/95 border-2 border-amber-400 text-amber-100 px-6 py-2.5 rounded-full shadow-2xl text-sm font-serif font-semibold animate-bounce flex items-center space-x-2">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Auto-play & Skip Controls */}
      <div className="absolute top-14 right-6 z-25 flex items-center space-x-2">
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
        />
      </div>

      {/* CG Fullscreen Display with Click to Advance */}
      {currentNode.type === "cg" && (
        <div
          onClick={onNext}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-black/80 backdrop-blur-xs cursor-pointer select-none"
        >
          <div className="max-w-3xl w-full p-8 rounded-2xl bg-[#2b1f1a]/95 border-2 border-amber-600/80 shadow-2xl text-center space-y-4 transition transform hover:scale-[1.01]">
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-900/60 border border-amber-500/50 flex items-center justify-center text-3xl">
              🖼️
            </div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-mono">
              [Minh họa CG] {currentNode.asset}
            </div>
            {currentNode.caption && (
              <p className="text-xl sm:text-2xl font-serif italic text-amber-100 max-w-xl mx-auto leading-relaxed">
                "{currentNode.caption}"
              </p>
            )}
            <div className="pt-3 text-xs text-amber-400/90 font-mono flex items-center justify-center space-x-2">
              <span>Nhấp chuột bất kỳ hoặc gõ Space để tiếp tục</span>
              <span>▼</span>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Bottom Control Panel */}
      <div className="relative z-20 pb-6 px-4 sm:px-8 w-full max-h-[85vh] overflow-y-auto">
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
