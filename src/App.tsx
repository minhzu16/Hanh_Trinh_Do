import React, { lazy, Suspense, useReducer, useEffect, useState, useCallback } from "react";
import { content } from "./content";
import type { GameState, ScreenType } from "./engine/types";
import { start, next, choose, skipUnmetAndRecord } from "./engine/step";
import {
  loadState,
  saveState,
  clearSave,
  loadPermanentCollectibles,
  hasCompletedGame,
  markGameCompleted
} from "./engine/save";
import { MenuScreen } from "./screens/MenuScreen";
import { SceneScreen } from "./screens/SceneScreen";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { PresenterModal } from "./components/PresenterModal";
import { audioManager } from "./audio";
import { playTimer, buildRecord, addRecord } from "./engine/leaderboard";
import {
  QuizScreen as EagerQuizScreen,
  SummaryScreen as EagerSummaryScreen,
  CollectionScreen as EagerCollectionScreen
} from "./screens/eagerScreens";

const MAX_HISTORY_STEPS = 30;

const QuizScreen =
  import.meta.env.MODE === "test"
    ? EagerQuizScreen
    : lazy(() => import("./screens/QuizScreen").then(({ QuizScreen }) => ({ default: QuizScreen })));
const SummaryScreen =
  import.meta.env.MODE === "test"
    ? EagerSummaryScreen
    : lazy(() => import("./screens/SummaryScreen").then(({ SummaryScreen }) => ({ default: SummaryScreen })));
const CollectionScreen =
  import.meta.env.MODE === "test"
    ? EagerCollectionScreen
    : lazy(() => import("./screens/CollectionScreen").then(({ CollectionScreen }) => ({ default: CollectionScreen })));

interface AppState {
  gameState: GameState;
  lastGameScreen: ScreenType;
  previousScreen: ScreenType;
  hasSavedGame: boolean;
  isMuted: boolean;
  historyStack: GameState[];
}

type AppAction =
  | { type: "START_NEW_GAME" }
  | { type: "CONTINUE_GAME" }
  | { type: "NEXT_STEP" }
  | { type: "REWIND_STEP" }
  | { type: "CHOOSE_OPTION"; key: "A" | "B" | "C" }
  | { type: "FINISH_QUIZ"; results: Record<string, boolean> }
  | { type: "OPEN_COLLECTION" }
  | { type: "CLOSE_COLLECTION" }
  | { type: "RETURN_MENU" }
  | { type: "TOGGLE_MUTE" }
  | { type: "SET_MUTE"; isMuted: boolean }
  | { type: "JUMP_SCENE"; sceneId: string }
  | { type: "LOAD_SLOT"; slot: number };

function initAppState(): AppState {
  // Check URL query param '?canh=<mã>' (DEP-04 requirement)
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const targetSceneId = params.get("canh");
    if (targetSceneId) {
      if (targetSceneId === "quiz") {
        return {
          gameState: {
            ...start(content),
            screen: "quiz",
            unlockedCollectibles: loadPermanentCollectibles()
          },
          lastGameScreen: "quiz",
          previousScreen: "menu",
          hasSavedGame: true,
          isMuted: audioManager.isMuted(),
          historyStack: []
        };
      }
      if (targetSceneId === "summary") {
        return {
          gameState: {
            ...start(content),
            screen: "summary",
            unlockedCollectibles: loadPermanentCollectibles()
          },
          lastGameScreen: "summary",
          previousScreen: "menu",
          hasSavedGame: true,
          isMuted: audioManager.isMuted(),
          historyStack: []
        };
      }
      const foundScene = content.scenes.find((s) => s.id === targetSceneId);
      if (foundScene) {
        const queryState = skipUnmetAndRecord(content, {
          screen: "scene",
          currentChapterId: foundScene.chapter,
          currentSceneId: foundScene.id,
          nodeIndex: 0,
          activeOption: null,
          flags: {},
          choiceScores: {},
          choiceAttempts: {},
          unlockedCollectibles: loadPermanentCollectibles(),
          quizAnswers: {},
          dialogLog: []
        });
        return {
          gameState: queryState,
          lastGameScreen: "scene",
          previousScreen: "menu",
          hasSavedGame: true,
          isMuted: audioManager.isMuted(),
          historyStack: []
        };
      }
    }
  }

  const saved = loadState();
  if (saved) {
    const resumeScreen =
      saved.screen && saved.screen !== "menu" && saved.screen !== "collection"
        ? saved.screen
        : "scene";
    return {
      gameState: {
        ...saved,
        screen: "menu"
      },
      lastGameScreen: resumeScreen,
      previousScreen: "menu",
      hasSavedGame: true,
      isMuted: audioManager.isMuted(),
      historyStack: []
    };
  }

  const fresh = start(content);
  fresh.unlockedCollectibles = loadPermanentCollectibles();
  return {
    gameState: {
      ...fresh,
      screen: "menu"
    },
    lastGameScreen: "scene",
    previousScreen: "menu",
    hasSavedGame: false,
    isMuted: audioManager.isMuted(),
    historyStack: []
  };
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "START_NEW_GAME": {
      clearSave(true);
      const fresh = start(content);
      fresh.unlockedCollectibles = loadPermanentCollectibles();
      return {
        ...state,
        gameState: fresh,
        lastGameScreen: "scene",
        hasSavedGame: true,
        historyStack: []
      };
    }

    case "CONTINUE_GAME": {
      const saved = loadState();
      if (saved) {
        const resumeScreen =
          saved.screen === "menu" || saved.screen === "collection"
            ? state.lastGameScreen
            : saved.screen;
        return {
          ...state,
          gameState: {
            ...saved,
            screen: resumeScreen
          },
          historyStack: []
        };
      }
      // If no save, fallback to fresh game
      const fresh = start(content);
      fresh.unlockedCollectibles = loadPermanentCollectibles();
      return {
        ...state,
        gameState: fresh,
        lastGameScreen: "scene",
        hasSavedGame: true,
        historyStack: []
      };
    }

    case "NEXT_STEP": {
      const nextGame = next(content, state.gameState);
      const newLastScreen =
        nextGame.screen !== "menu" && nextGame.screen !== "collection"
          ? nextGame.screen
          : state.lastGameScreen;
      const newHistory = state.gameState.screen === "scene"
        ? [...state.historyStack, state.gameState].slice(-MAX_HISTORY_STEPS)
        : state.historyStack;
      return {
        ...state,
        gameState: nextGame,
        lastGameScreen: newLastScreen,
        historyStack: newHistory
      };
    }

    case "REWIND_STEP": {
      if (state.historyStack.length === 0) return state;
      const prev = state.historyStack[state.historyStack.length - 1];
      const remaining = state.historyStack.slice(0, -1);
      return {
        ...state,
        gameState: prev,
        lastGameScreen: prev.screen,
        historyStack: remaining
      };
    }

    case "CHOOSE_OPTION": {
      try {
        const nextGame = choose(content, state.gameState, action.key);
        return {
          ...state,
          gameState: nextGame,
          historyStack: [] // Locked in! Cannot rewind past a committed choice (UI-23)
        };
      } catch (err) {
        console.error("Choice reduction error:", err);
        return state;
      }
    }

    case "FINISH_QUIZ": {
      markGameCompleted();
      const summaryGame: GameState = {
        ...state.gameState,
        screen: "summary",
        quizAnswers: action.results
      };
      return {
        ...state,
        gameState: summaryGame,
        lastGameScreen: "summary",
        historyStack: []
      };
    }

    case "OPEN_COLLECTION": {
      return {
        ...state,
        previousScreen: state.gameState.screen,
        gameState: {
          ...state.gameState,
          screen: "collection"
        }
      };
    }

    case "CLOSE_COLLECTION": {
      return {
        ...state,
        gameState: {
          ...state.gameState,
          screen: state.previousScreen
        }
      };
    }

    case "RETURN_MENU": {
      const newLastScreen =
        state.gameState.screen !== "menu" && state.gameState.screen !== "collection"
          ? state.gameState.screen
          : state.lastGameScreen;
      return {
        ...state,
        lastGameScreen: newLastScreen,
        gameState: {
          ...state.gameState,
          screen: "menu"
        }
      };
    }

    case "SET_MUTE": {
      return {
        ...state,
        isMuted: action.isMuted
      };
    }

    case "TOGGLE_MUTE": {
      return {
        ...state,
        isMuted: !state.isMuted
      };
    }

    case "JUMP_SCENE": {
      if (action.sceneId === "quiz") {
        return {
          ...state,
          gameState: {
            ...state.gameState,
            screen: "quiz"
          },
          lastGameScreen: "quiz",
          historyStack: []
        };
      }
      if (action.sceneId === "summary") {
        return {
          ...state,
          gameState: {
            ...state.gameState,
            screen: "summary"
          },
          lastGameScreen: "summary",
          historyStack: []
        };
      }
      const found = content.scenes.find((s) => s.id === action.sceneId);
      if (!found) return state;
      const jumpedState: GameState = {
        ...state.gameState,
        screen: "scene",
        currentChapterId: found.chapter,
        currentSceneId: found.id,
        nodeIndex: 0,
        activeOption: null
      };
      return {
        ...state,
        gameState: skipUnmetAndRecord(content, jumpedState),
        lastGameScreen: "scene",
        historyStack: []
      };
    }

    case "LOAD_SLOT": {
      const loaded = loadState(action.slot);
      if (loaded) {
        return {
          ...state,
          gameState: loaded,
          lastGameScreen: loaded.screen,
          historyStack: []
        };
      }
      return state;
    }

    default:
      return state;
  }
}

const LATEST_RECORD_KEY = "hanh_trinh_do_latest_record_id";

function getStoredLatestRecordId(): string | null {
  try {
    if (typeof window !== "undefined" && window.sessionStorage) {
      return window.sessionStorage.getItem(LATEST_RECORD_KEY);
    }
  } catch {
    // ignore
  }
  return null;
}

function setStoredLatestRecordId(id: string | null): void {
  try {
    if (typeof window !== "undefined" && window.sessionStorage) {
      if (id) {
        window.sessionStorage.setItem(LATEST_RECORD_KEY, id);
      } else {
        window.sessionStorage.removeItem(LATEST_RECORD_KEY);
      }
    }
  } catch {
    // ignore
  }
}

export const App: React.FC = () => {
  const [appState, dispatch] = useReducer(appReducer, undefined, initAppState);
  const [showPresenterMenu, setShowPresenterMenu] = useState<boolean>(false);
  const [latestRecordId, setLatestRecordIdState] = useState<string | null>(() => getStoredLatestRecordId());

  const setLatestRecordId = useCallback((id: string | null) => {
    setStoredLatestRecordId(id);
    setLatestRecordIdState(id);
  }, []);

  // Đồng hồ thời gian chơi thực: chỉ chạy ở màn cảnh/câu hỏi khi tab đang hiển thị
  const currentScreen = appState.gameState.screen;
  useEffect(() => {
    const isPlaying = () =>
      (currentScreen === "scene" || currentScreen === "quiz") &&
      (typeof document === "undefined" || document.visibilityState !== "hidden");
    if (isPlaying()) playTimer.resume();
    else playTimer.pause();

    const handleVisibility = () => {
      if (isPlaying()) playTimer.resume();
      else playTimer.pause();
    };
    const handlePageHide = () => playTimer.pause();
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pagehide", handlePageHide);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", handlePageHide);
      playTimer.pause();
    };
  }, [currentScreen]);

  // Pure persistence: React useEffect handles state saving without impure setState side-effects
  useEffect(() => {
    if (
      appState.gameState.screen !== "menu" &&
      appState.gameState.screen !== "collection"
    ) {
      saveState(appState.gameState, 1);
    }
  }, [appState.gameState]);

  const handleToggleMute = useCallback(() => {
    const nextMuted = audioManager.toggleMute();
    dispatch({ type: "SET_MUTE", isMuted: nextMuted });
  }, []);

  // Synchronize audioManager with appState.isMuted
  useEffect(() => {
    if (audioManager.isMuted() !== appState.isMuted) {
      audioManager.setMuted(appState.isMuted);
    }
  }, [appState.isMuted]);

  // Keyboard shortcuts: P/Ctrl+P (Presenter) and M (Global Mute Toggle)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "p" && !e.altKey) {
        e.preventDefault();
        setShowPresenterMenu((prev) => !prev);
        return;
      }

      if ((e.key === "m" || e.key === "M") && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
        if (targetTag !== "input" && targetTag !== "textarea") {
          e.preventDefault();
          handleToggleMute();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleToggleMute]);

  const handleStartNewGame = () => {
    playTimer.reset();
    setLatestRecordId(null);
    dispatch({ type: "START_NEW_GAME" });
  };
  const handleContinueGame = () => dispatch({ type: "CONTINUE_GAME" });
  const handleNextStep = () => dispatch({ type: "NEXT_STEP" });
  const handleRewindStep = () => dispatch({ type: "REWIND_STEP" });
  const handleChooseOption = (key: "A" | "B" | "C") => dispatch({ type: "CHOOSE_OPTION", key });
  const handleFinishQuiz = (results: Record<string, boolean>) => {
    // Ghi lại lịch sử lượt chơi vào bảng xếp hạng (thời gian chơi thực + điểm + danh hiệu)
    playTimer.pause();
    const record = buildRecord(content, { ...appState.gameState, quizAnswers: results }, playTimer.elapsed());
    addRecord(record);
    setLatestRecordId(record.id);
    playTimer.reset();
    dispatch({ type: "FINISH_QUIZ", results });
  };
  const handleOpenCollection = () => dispatch({ type: "OPEN_COLLECTION" });
  const handleBackFromCollection = () => dispatch({ type: "CLOSE_COLLECTION" });
  const handleReturnMenu = () => dispatch({ type: "RETURN_MENU" });
  const handleJumpScene = (sceneId: string) => {
    dispatch({ type: "JUMP_SCENE", sceneId });
    setShowPresenterMenu(false);
  };
  const handleLoadSlot = (slot: number) => dispatch({ type: "LOAD_SLOT", slot });
  const handleSaveSlot = (slot: number) => saveState(appState.gameState, slot);

  return (
    <ErrorBoundary>
      <main className="relative w-full h-screen overflow-hidden">
        <PresenterModal
          isOpen={showPresenterMenu}
          onClose={() => setShowPresenterMenu(false)}
          onJump={handleJumpScene}
          currentSceneId={appState.gameState.currentSceneId}
          chapters={content.chapters}
        />

        {/* Presenter Quick Scene Jumper Pill */}
        <button
          type="button"
          onClick={() => setShowPresenterMenu((prev) => !prev)}
          className="fixed bottom-2 left-2 z-40 px-2.5 py-1 rounded-full bg-black/70 hover:bg-black/90 border border-stone-800 hover:border-amber-700/60 text-[10px] text-stone-400 hover:text-amber-300 font-mono transition cursor-pointer backdrop-blur-xs select-none shadow-md"
          title="Trình chiếu: Nhảy nhanh tới cảnh (Ctrl + P)"
        >
          ⚡ Cảnh (Ctrl+P)
        </button>

        {appState.gameState.screen === "menu" && (
          <MenuScreen
            content={content}
            hasSave={appState.hasSavedGame}
            onStartNew={handleStartNewGame}
            onContinue={handleContinueGame}
            onOpenCollection={handleOpenCollection}
            isMuted={appState.isMuted}
            onToggleMute={handleToggleMute}
            hasCompletedGame={hasCompletedGame()}
            onSelectChapter={handleJumpScene}
          />
        )}

        {appState.gameState.screen === "scene" && (
          <SceneScreen
            content={content}
            state={appState.gameState}
            onNext={handleNextStep}
            onChoose={handleChooseOption}
            onReturnMenu={handleReturnMenu}
            onOpenCollection={handleOpenCollection}
            isMuted={appState.isMuted}
            onToggleMute={handleToggleMute}
            canRewind={appState.historyStack.length > 0}
            onRewind={handleRewindStep}
            onSaveSlot={handleSaveSlot}
            onLoadSlot={handleLoadSlot}
            onJumpScene={handleJumpScene}
            onOpenPresenter={() => setShowPresenterMenu(true)}
          />
        )}

        <Suspense fallback={null}>
          {appState.gameState.screen === "quiz" && (
            <QuizScreen
              content={content}
              onFinishQuiz={handleFinishQuiz}
              onReturnMenu={handleReturnMenu}
              onReplayScene={handleJumpScene}
              isMuted={appState.isMuted}
              onToggleMute={handleToggleMute}
            />
          )}

          {appState.gameState.screen === "summary" && (
            <SummaryScreen
              content={content}
              state={appState.gameState}
              latestRecordId={latestRecordId}
              onRestart={handleStartNewGame}
              onOpenCollection={handleOpenCollection}
              onReturnMenu={handleReturnMenu}
              onReplayScene={handleJumpScene}
              isMuted={appState.isMuted}
              onToggleMute={handleToggleMute}
            />
          )}

          {appState.gameState.screen === "collection" && (
            <CollectionScreen
              content={content}
              unlockedIds={appState.gameState.unlockedCollectibles}
              onBack={handleBackFromCollection}
            />
          )}
        </Suspense>
      </main>
    </ErrorBoundary>
  );
};
