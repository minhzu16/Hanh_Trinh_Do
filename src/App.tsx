import React, { useState } from "react";
import { content } from "./content";
import type { GameState, ScreenType } from "./engine/types";
import { start, next, choose } from "./engine/step";
import { loadState, saveState, clearSave } from "./engine/save";
import { MenuScreen } from "./screens/MenuScreen";
import { SceneScreen } from "./screens/SceneScreen";
import { QuizScreen } from "./screens/QuizScreen";
import { SummaryScreen } from "./screens/SummaryScreen";
import { CollectionScreen } from "./screens/CollectionScreen";
import { audioManager } from "./audio";

export const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    // Check URL query param '?canh=<mã>' (DEP-04 requirement)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const targetSceneId = params.get("canh");
      if (targetSceneId) {
        const foundScene = content.scenes.find((s) => s.id === targetSceneId);
        if (foundScene) {
          return {
            screen: "scene",
            currentChapterId: foundScene.chapter,
            currentSceneId: foundScene.id,
            nodeIndex: 0,
            activeOption: null,
            choiceScores: {},
            choiceAttempts: {},
            unlockedCollectibles: [],
            quizAnswers: {},
            dialogLog: []
          };
        }
      }
    }

    // Default start screen is menu
    const saved = loadState();
    if (saved) {
      return {
        ...saved,
        screen: "menu"
      };
    }

    return {
      ...start(content),
      screen: "menu"
    };
  });

  const [hasSavedGame, setHasSavedGame] = useState<boolean>(() => {
    return loadState() !== null;
  });

  const [previousScreen, setPreviousScreen] = useState<ScreenType>("menu");
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Sync mute state with audioManager
  const handleToggleMute = () => {
    const nextMuted = audioManager.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleStartNewGame = () => {
    clearSave();
    const freshState = start(content);
    setGameState(freshState);
    saveState(freshState);
    setHasSavedGame(true);
  };

  const handleContinueGame = () => {
    const saved = loadState();
    if (saved) {
      setGameState({
        ...saved,
        screen: saved.screen === "menu" ? "scene" : saved.screen
      });
    } else {
      handleStartNewGame();
    }
  };

  const handleNextStep = () => {
    setGameState((prev) => {
      const nextState = next(content, prev);
      saveState(nextState);
      return nextState;
    });
  };

  const handleChooseOption = (key: "A" | "B" | "C") => {
    setGameState((prev) => {
      try {
        const nextState = choose(content, prev, key);
        saveState(nextState);
        return nextState;
      } catch (err) {
        console.error("Choice error:", err);
        return prev;
      }
    });
  };

  const handleFinishQuiz = (results: Record<string, boolean>) => {
    setGameState((prev) => {
      const nextState: GameState = {
        ...prev,
        screen: "summary",
        quizAnswers: results
      };
      saveState(nextState);
      return nextState;
    });
  };

  const handleOpenCollection = () => {
    setPreviousScreen(gameState.screen);
    setGameState((prev) => ({
      ...prev,
      screen: "collection"
    }));
  };

  const handleBackFromCollection = () => {
    setGameState((prev) => ({
      ...prev,
      screen: previousScreen
    }));
  };

  const handleReturnMenu = () => {
    saveState(gameState);
    setGameState((prev) => ({
      ...prev,
      screen: "menu"
    }));
  };

  // Render appropriate screen
  return (
    <main className="w-full h-screen overflow-hidden">
      {gameState.screen === "menu" && (
        <MenuScreen
          content={content}
          hasSave={hasSavedGame}
          onStartNew={handleStartNewGame}
          onContinue={handleContinueGame}
          onOpenCollection={handleOpenCollection}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {gameState.screen === "scene" && (
        <SceneScreen
          content={content}
          state={gameState}
          onNext={handleNextStep}
          onChoose={handleChooseOption}
          onReturnMenu={handleReturnMenu}
          onOpenCollection={handleOpenCollection}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {gameState.screen === "quiz" && (
        <QuizScreen
          content={content}
          onFinishQuiz={handleFinishQuiz}
          onReturnMenu={handleReturnMenu}
        />
      )}

      {gameState.screen === "summary" && (
        <SummaryScreen
          content={content}
          state={gameState}
          onRestart={handleStartNewGame}
          onOpenCollection={handleOpenCollection}
          onReturnMenu={handleReturnMenu}
        />
      )}

      {gameState.screen === "collection" && (
        <CollectionScreen
          content={content}
          unlockedIds={gameState.unlockedCollectibles}
          onBack={handleBackFromCollection}
        />
      )}
    </main>
  );
};
