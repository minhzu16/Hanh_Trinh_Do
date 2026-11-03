export interface Chapter {
  id: string;
  title: string;
  period: string;
  goal: string;
  pages: string;
  minutes_target: number;
  scenes: string[];
}

export interface Source {
  id: string;
  pages: string;
  kind: "quote" | "fact";
  text: string;
}

export interface Character {
  id: string;
  name: string;
  kind: "fictional" | "historical" | "system";
  description: string;
  sprites: string[];
}

export interface Collectible {
  id: string;
  title: string;
  chapter: string;
  caption: string;
  source?: string;
  image_credit?: string;
}

export interface WordMatchPair {
  left: string;
  right: string;
}

export interface BlankSlot {
  id: string;
  answer: string;
}

export interface QuizQuestion {
  id: string;
  type?: "multiple_choice" | "word_match" | "fill_blank" | "visual_clue";
  question: string;
  answer?: string;
  distractors?: string[];
  pairs?: WordMatchPair[];
  template?: string;
  blanks?: BlankSlot[];
  options?: string[];
  asset?: string;
  source: string;
  scene?: string;
  badge?: string;
  tag?: string;
  hint?: string;
}

export interface GlossaryItem {
  id: string;
  term: string;
  aliases?: string[];
  definition: string;
  sources: string[];
}

export interface JournalEntry {
  id: string;
  title: string;
  text: string;
  sources: string[];
}

export interface ChapterJournal {
  chapterId: string;
  title: string;
  entries: JournalEntry[];
}

export interface NarrationNode {
  type: "narration";
  text: string;
  sources?: string[];
  if?: string;
}

export interface LineNode {
  type: "line";
  speaker: string;
  text: string;
  source?: string;
  expression?: string;
  if?: string;
}

export interface ThoughtNode {
  type: "thought";
  text: string;
  if?: string;
}

export interface CgNode {
  type: "cg";
  asset: string;
  caption?: string;
}

export interface KnowledgeNode {
  type: "knowledge";
  sources: string[];
  text: string;
}

export interface UnlockNode {
  type: "unlock";
  item: string;
}

export interface TimelineItem {
  date: string;
  text: string;
}

export interface TimelineNode {
  type: "timeline";
  items: TimelineItem[];
}

export interface CardItem {
  title: string;
  text: string;
  source: string;
}

export interface CardsNode {
  type: "cards";
  items: CardItem[];
}

export interface ChoiceOption {
  key: "A" | "B" | "C";
  text: string;
  correct: boolean;
  nodes: SceneNode[];
}

export interface ChoiceNode {
  type: "choice";
  id: string;
  prompt: string;
  options: ChoiceOption[];
}

export interface RetryNode {
  type: "retry";
}

export type SceneNode =
  | NarrationNode
  | LineNode
  | ThoughtNode
  | CgNode
  | KnowledgeNode
  | UnlockNode
  | TimelineNode
  | CardsNode
  | ChoiceNode
  | RetryNode;

export interface Scene {
  id: string;
  chapter: string;
  title: string;
  bg: string;
  bgm?: string;
  nodes: SceneNode[];
}

export interface HistoricalVideo {
  id: string;
  sceneId: string;
  title: string;
  label: string;
  year: string;
  curriculumNote: string;
  duration: string;
  summary: string;
  description: string;
  historicalSignificance: string;
  sources: string[];
  videoUrl?: string;
  thumbnailColor: string;
}

export interface SceneHotspot {
  id: string;
  sceneId: string;
  title: string;
  x: number;
  y: number;
  icon: string;
  description: string;
  historicalNote: string;
  sources: string[];
}

export interface SceneContext {
  sceneId: string;
  location: string;
  time: string;
  subtitle: string;
  sources: string[];
}

export interface GameContent {
  chapters: Chapter[];
  scenes: Scene[];
  characters: Character[];
  sources: Source[];
  collectibles: Collectible[];
  quiz: QuizQuestion[];
  strings: Record<string, string>;
  videos?: HistoricalVideo[];
  hotspots?: SceneHotspot[];
  contexts?: SceneContext[];
  glossary?: GlossaryItem[];
  journal?: ChapterJournal[];
}

export type ScreenType = "menu" | "scene" | "quiz" | "summary" | "collection";

export interface ActiveOptionState {
  choiceId: string;
  optionKey: "A" | "B" | "C";
  nodeIndex: number;
}

export interface DialogLogEntry {
  speaker?: string;
  text: string;
}

export interface GameState {
  screen: ScreenType;
  currentChapterId: string;
  currentSceneId: string;
  nodeIndex: number;
  activeOption: ActiveOptionState | null;
  flags: Record<string, boolean>;
  choiceScores: Record<string, "dung_ngay" | "chon_lai">;
  choiceAttempts: Record<string, number>;
  unlockedCollectibles: string[];
  quizAnswers: Record<string, boolean>;
  dialogLog: DialogLogEntry[];
}

