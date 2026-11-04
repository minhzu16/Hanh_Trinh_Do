import type { GameContent, GameState } from "./types";

export interface SummaryResult {
  correctFirstTry: number;
  totalChoices: number;
  quizCorrect: number;
  totalQuiz: number;
  unlockedCount: number;
  totalCollectibles: number;
  rankKey: "summary.rank.7" | "summary.rank.5" | "summary.rank.0";
  rankTitle: string;
}

export function getSummary(content: GameContent, state: GameState): SummaryResult {
  let totalChoices = 0;
  for (const scene of content.scenes) {
    for (const node of scene.nodes) {
      if (node.type === "choice" && node.kind !== "personal") {
        totalChoices++;
      }
    }
  }

  const correctFirstTry = Object.values(state.choiceScores).filter(
    (score) => score === "dung_ngay"
  ).length;

  const quizCorrect = Object.values(state.quizAnswers).filter(Boolean).length;
  const totalQuiz = content.quiz.length;

  const unlockedCount = state.unlockedCollectibles.length;
  const totalCollectibles = content.collectibles.length;

  let rankKey: "summary.rank.7" | "summary.rank.5" | "summary.rank.0" = "summary.rank.0";
  if (correctFirstTry >= 7) {
    rankKey = "summary.rank.7";
  } else if (correctFirstTry >= 5) {
    rankKey = "summary.rank.5";
  }

  const rankTitle = content.strings[rankKey] || rankKey;

  return {
    correctFirstTry,
    totalChoices,
    quizCorrect,
    totalQuiz,
    unlockedCount,
    totalCollectibles,
    rankKey,
    rankTitle
  };
}

