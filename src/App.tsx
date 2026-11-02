import React, { useReducer, useEffect, useState } from "react";
import { content } from "./content";
import type { GameState, ScreenType } from "./engine/types";
import { start, next, choose } from "./engine/step";
import { loadState, saveState, clearSave, loadPermanentCollectibles } from "./engine/save";
import { MenuScreen } from "./screens/MenuScreen";
import { SceneScreen } from "./screens/SceneScreen";
import { QuizScreen } from "./screens/QuizScreen";
import { SummaryScreen } from "./screens/SummaryScreen";
import { CollectionScreen } from "./screens/CollectionScreen";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { audioManager } from "./audio";

interface AppState {
  gameState: GameState;
  lastGameScreen: ScreenType;
  previousScreen: ScreenType;
  hasSavedGame: boolean;
  isMuted: boolean;
}

type AppAction =
  | { type: "START_NEW_GAME" }
  | { type: "CONTINUE_GAME" }
  | { type: "NEXT_STEP" }
  | { type: "CHOOSE_OPTION"; key: "A" | "B" | "C" }
  | { type: "FINISH_QUIZ"; results: Record<string, boolean> }
  | { type: "OPEN_COLLECTION" }
  | { type: "CLOSE_COLLECTION" }
  | { type: "RETURN_MENU" }
  | { type: "TOGGLE_MUTE" }
  | { type: "JUMP_SCENE"; sceneId: string };

function initAppState(): AppState {
  // Check URL query param '?canh=<mã>' (DEP-04 requirement)
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const targetSceneId = params.get("canh");
    if (targetSceneId) {
      const foundScene = content.scenes.find((s) => s.id === targetSceneId);
      if (foundScene) {
        const queryState: GameState = {
          screen: "scene",
          currentChapterId: foundScene.chapter,
          currentSceneId: foundScene.id,
          nodeIndex: 0,
          activeOption: null,
          choiceScores: {},
          choiceAttempts: {},
          unlockedCollectibles: loadPermanentCollectibles(),
          quizAnswers: {},
          dialogLog: []
        };
        return {
          gameState: queryState,
          lastGameScreen: "scene",
          previousScreen: "menu",
          hasSavedGame: true,
          isMuted: audioManager.isMuted()
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
      isMuted: audioManager.isMuted()
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
    isMuted: audioManager.isMuted()
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
        hasSavedGame: true
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
          }
        };
      }
      // If no save, fallback to fresh game
      const fresh = start(content);
      fresh.unlockedCollectibles = loadPermanentCollectibles();
      return {
        ...state,
        gameState: fresh,
        lastGameScreen: "scene",
        hasSavedGame: true
      };
    }

    case "NEXT_STEP": {
      const nextGame = next(content, state.gameState);
      const newLastScreen =
        nextGame.screen !== "menu" && nextGame.screen !== "collection"
          ? nextGame.screen
          : state.lastGameScreen;
      return {
        ...state,
        gameState: nextGame,
        lastGameScreen: newLastScreen
      };
    }

    case "CHOOSE_OPTION": {
      try {
        const nextGame = choose(content, state.gameState, action.key);
        return {
          ...state,
          gameState: nextGame
        };
      } catch (err) {
        console.error("Choice reduction error:", err);
        return state;
      }
    }

    case "FINISH_QUIZ": {
      const summaryGame: GameState = {
        ...state.gameState,
        screen: "summary",
        quizAnswers: action.results
      };
      return {
        ...state,
        gameState: summaryGame,
        lastGameScreen: "summary"
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

    case "TOGGLE_MUTE": {
      const nextMuted = audioManager.toggleMute();
      return {
        ...state,
        isMuted: nextMuted
      };
    }

    case "JUMP_SCENE": {
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
        gameState: jumpedState,
        lastGameScreen: "scene"
      };
    }

    default:
      return state;
  }
}

export const App: React.FC = () => {
  const [appState, dispatch] = useReducer(appReducer, undefined, initAppState);
  const [showPresenterMenu, setShowPresenterMenu] = useState<boolean>(false);

  // Pure persistence: React useEffect handles state saving without impure setState side-effects
  useEffect(() => {
    if (
      appState.gameState.screen !== "menu" &&
      appState.gameState.screen !== "collection"
    ) {
      saveState(appState.gameState);
    }
  }, [appState.gameState]);

  // Keyboard shortcut Ctrl+P to toggle Presenter scene selector
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        setShowPresenterMenu((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleStartNewGame = () => dispatch({ type: "START_NEW_GAME" });
  const handleContinueGame = () => dispatch({ type: "CONTINUE_GAME" });
  const handleNextStep = () => dispatch({ type: "NEXT_STEP" });
  const handleChooseOption = (key: "A" | "B" | "C") => dispatch({ type: "CHOOSE_OPTION", key });
  const handleFinishQuiz = (results: Record<string, boolean>) => dispatch({ type: "FINISH_QUIZ", results });
  const handleOpenCollection = () => dispatch({ type: "OPEN_COLLECTION" });
  const handleBackFromCollection = () => dispatch({ type: "CLOSE_COLLECTION" });
  const handleReturnMenu = () => dispatch({ type: "RETURN_MENU" });
  const handleToggleMute = () => dispatch({ type: "TOGGLE_MUTE" });
  const handleJumpScene = (sceneId: string) => {
    dispatch({ type: "JUMP_SCENE", sceneId });
    setShowPresenterMenu(false);
  };

  return (
    <ErrorBoundary>
      <main className="relative w-full h-screen overflow-hidden">
        {/* Presenter Quick Scene Jumper Pill */}
        <button
          type="button"
          onClick={() => setShowPresenterMenu((prev) => !prev)}
          className="fixed bottom-2 right-2 z-40 px-2 py-1 rounded bg-black/60 hover:bg-black/90 border border-stone-800 hover:border-amber-700/60 text-[10px] text-stone-400 hover:text-amber-300 font-mono transition cursor-pointer backdrop-blur-xs select-none"
          title="Trình chiếu: Nhảy nhanh tới cảnh (Ctrl + P)"
        >
          ⚡ Cảnh (Ctrl+P)
        </button>

        {/* Presenter Modal Selector */}
        {showPresenterMenu && (
          <div
            onClick={() => setShowPresenterMenu(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="presenter-menu-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn select-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg max-h-[80vh] overflow-y-auto bg-[#18110d] border border-amber-800/60 rounded-xl p-5 shadow-2xl text-stone-200"
            >
              <div className="flex items-center justify-between border-b border-amber-900/40 pb-3 mb-4">
                <h3 id="presenter-menu-title" className="text-base font-serif font-bold text-amber-200 flex items-center space-x-2">
                  <span>🎓</span>
                  <span>Chế độ Trình chiếu: Chọn cảnh giảng dạy</span>
                </h3>
                <button
                  onClick={() => setShowPresenterMenu(false)}
                  className="p-1 px-2.5 rounded bg-stone-800 hover:bg-stone-700 text-xs font-bold text-stone-300"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs font-mono">
                {content.chapters.map((ch) => (
                  <div key={ch.id} className="space-y-1.5">
                    <div className="text-amber-400 font-bold font-serif text-sm border-b border-stone-800 pb-1">
                      {ch.title} ({ch.period})
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      {ch.scenes.map((scId) => {
                        const sc = content.scenes.find((s) => s.id === scId);
                        const isCurrent = appState.gameState.currentSceneId === scId;
                        return (
                          <button
                            key={scId}
                            onClick={() => handleJumpScene(scId)}
                            className={`w-full text-left px-3 py-1.5 rounded border transition flex items-center justify-between cursor-pointer ${
                              isCurrent
                                ? "bg-amber-900/40 border-amber-500 text-amber-200 font-bold"
                                : "bg-stone-900/80 border-stone-800 hover:border-amber-700/60 text-stone-300 hover:text-white"
                            }`}
                          >
                            <span>{scId}: {sc?.title || "Cảnh"}</span>
                            {isCurrent && <span className="text-[10px] text-amber-400">Đang chọn</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {appState.gameState.screen === "menu" && (
          <MenuScreen
            content={content}
            hasSave={appState.hasSavedGame}
            onStartNew={handleStartNewGame}
            onContinue={handleContinueGame}
            onOpenCollection={handleOpenCollection}
            isMuted={appState.isMuted}
            onToggleMute={handleToggleMute}
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
          />
        )}

        {appState.gameState.screen === "quiz" && (
          <QuizScreen
            content={content}
            onFinishQuiz={handleFinishQuiz}
            onReturnMenu={handleReturnMenu}
          />
        )}

        {appState.gameState.screen === "summary" && (
          <SummaryScreen
            content={content}
            state={appState.gameState}
            onRestart={handleStartNewGame}
            onOpenCollection={handleOpenCollection}
            onReturnMenu={handleReturnMenu}
            onReplayScene={handleJumpScene}
          />
        )}

        {appState.gameState.screen === "collection" && (
          <CollectionScreen
            content={content}
            unlockedIds={appState.gameState.unlockedCollectibles}
            onBack={handleBackFromCollection}
          />
        )}
      </main>
    </ErrorBoundary>
  );
};
