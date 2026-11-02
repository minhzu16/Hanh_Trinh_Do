import chaptersData from "../data/chapters.json";
import scenesData from "../data/scenes.json";
import charactersData from "../data/characters.json";
import sourcesData from "../data/sources.json";
import collectiblesData from "../data/collectibles.json";
import quizData from "../data/quiz.json";
import stringsData from "../data/strings.json";
import type { GameContent, Chapter, Scene, Character, Source, Collectible, QuizQuestion } from "./engine/types";

export const content: GameContent = {
  chapters: chaptersData as Chapter[],
  scenes: scenesData as unknown as Scene[],
  characters: charactersData as Character[],
  sources: sourcesData as Source[],
  collectibles: collectiblesData as Collectible[],
  quiz: quizData as QuizQuestion[],
  strings: stringsData as Record<string, string>
};

