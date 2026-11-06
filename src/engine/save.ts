import type { GameState } from "./types";
import { content } from "../content";

export const SAVE_SCHEMA_VERSION = 3;
const SAVE_KEY = `hanh_trinh_do_save_v${SAVE_SCHEMA_VERSION}`;
const LEGACY_V2_KEY = "hanh_trinh_do_save_v2";
const LEGACY_V1_KEY = "hanh_trinh_do_save_v1";
const COLLECTION_KEY = "hanh_trinh_do_collection_v2";
const LEGACY_COLLECTION_KEY = "hanh_trinh_do_collection_v1";
const READ_NODES_KEY = "hanh_trinh_do_read_nodes";
const COMPLETED_GAME_KEY = "hanh_trinh_do_completed";
const SLOT_KEY_PREFIX = "hanh_trinh_do_save_slot_";
let readNodesCache: Set<string> | null = null;
let readNodesCacheRaw: string | null = null;
const SCREEN_TYPES = new Set<GameState["screen"]>(["menu", "scene", "quiz", "summary", "collection"]);

export interface SavedEnvelope {
  version: number;
  savedAt: string;
  state: GameState;
}

export interface SaveSlotInfo {
  slot: number;
  savedAt: string | null;
  state: GameState | null;
  chapterTitle?: string;
  sceneTitle?: string;
  sceneId?: string;
}

function getSlotStorageKey(slot: number): string {
  return `${SLOT_KEY_PREFIX}${slot}`;
}

function plainRecord<T extends Record<string, unknown>>(value: unknown, fallback: T): T {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as T
    : fallback;
}

export function loadPermanentCollectibles(): string[] {
  try {
    if (typeof localStorage !== "undefined") {
      let data = localStorage.getItem(COLLECTION_KEY);
      if (!data) {
        // Fallback to legacy v1 collection
        data = localStorage.getItem(LEGACY_COLLECTION_KEY);
      }
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          return parsed.filter((id) => typeof id === "string");
        }
      }
    }
  } catch (e) {
    console.error("Failed to load collection from localStorage", e);
  }
  return [];
}

export function savePermanentCollectibles(unlocked: string[]): void {
  try {
    if (typeof localStorage !== "undefined") {
      const existing = loadPermanentCollectibles();
      const merged = Array.from(new Set([...existing, ...unlocked]));
      localStorage.setItem(COLLECTION_KEY, JSON.stringify(merged));
    }
  } catch (e) {
    console.error("Failed to save collection to localStorage", e);
  }
}

/**
 * Migration helper: Validates and adapts previous save versions (v1, v2 -> v3)
 */
export function migrateSavedState(raw: unknown): GameState | null {
  if (!raw || typeof raw !== "object") return null;

  try {
    let stateCandidate: unknown = raw;

    // If wrapped in envelope
    if ("version" in (raw as Record<string, unknown>) && "state" in (raw as Record<string, unknown>)) {
      const envelope = raw as SavedEnvelope;
      stateCandidate = envelope.state;
    }

    const candidate = stateCandidate as Partial<GameState>;

    // Validate essential keys
    if (!candidate.currentSceneId || typeof candidate.currentSceneId !== "string") {
      return null;
    }

    // Verify scene exists in current game content
    const sceneExists = content.scenes.some((s) => s.id === candidate.currentSceneId);
    if (!sceneExists) {
      console.warn(`Saved scene "${candidate.currentSceneId}" not found in current content; resetting save.`);
      return null;
    }

    // Sanitize and complete state with v3 fields (flags)
    const permCollectibles = loadPermanentCollectibles();
    const migrated: GameState = {
      screen: SCREEN_TYPES.has(candidate.screen as GameState["screen"])
        ? candidate.screen as GameState["screen"]
        : "scene",
      currentChapterId: candidate.currentChapterId || "k0",
      currentSceneId: candidate.currentSceneId,
      nodeIndex: typeof candidate.nodeIndex === "number" ? candidate.nodeIndex : 0,
      activeOption: candidate.activeOption || null,
      flags: plainRecord<Record<string, boolean>>(candidate.flags, {}),
      choiceScores: plainRecord<Record<string, "dung_ngay" | "chon_lai">>(candidate.choiceScores, {}),
      choiceAttempts: plainRecord<Record<string, number>>(candidate.choiceAttempts, {}),
      unlockedCollectibles: Array.from(
        new Set([...(candidate.unlockedCollectibles || []), ...permCollectibles])
      ),
      quizAnswers: plainRecord<Record<string, boolean>>(candidate.quizAnswers, {}),
      dialogLog: Array.isArray(candidate.dialogLog) ? candidate.dialogLog : []
    };

    return migrated;
  } catch (err) {
    console.error("Error migrating saved state:", err);
    return null;
  }
}

export function saveState(state: GameState, slot: number = 1): void {
  try {
    if (typeof localStorage !== "undefined") {
      const envelope: SavedEnvelope = {
        version: SAVE_SCHEMA_VERSION,
        savedAt: new Date().toISOString(),
        state
      };
      const json = JSON.stringify(envelope);
      localStorage.setItem(getSlotStorageKey(slot), json);
      if (slot === 1) {
        localStorage.setItem(SAVE_KEY, json);
      }
      if (state.unlockedCollectibles && state.unlockedCollectibles.length > 0) {
        savePermanentCollectibles(state.unlockedCollectibles);
      }
    }
  } catch (e) {
    console.error("Failed to save state to localStorage", e);
  }
}

export function loadState(slot: number = 1): GameState | null {
  try {
    if (typeof localStorage !== "undefined") {
      let rawData = localStorage.getItem(getSlotStorageKey(slot));
      if (!rawData && slot === 1) {
        rawData = localStorage.getItem(SAVE_KEY);
      }
      if (!rawData && slot === 1) {
        // Try migrating from legacy v2 or v1 save
        rawData = localStorage.getItem(LEGACY_V2_KEY) || localStorage.getItem(LEGACY_V1_KEY);
      }
      if (rawData) {
        const parsed = JSON.parse(rawData);
        const migrated = migrateSavedState(parsed);
        if (migrated) {
          return migrated;
        }
      }
    }
  } catch (e) {
    console.error("Failed to load state from localStorage", e);
  }
  return null;
}

export function listSaveSlots(): SaveSlotInfo[] {
  const slots: SaveSlotInfo[] = [];
  for (let s = 1; s <= 3; s++) {
    const raw =
      typeof localStorage !== "undefined"
        ? localStorage.getItem(getSlotStorageKey(s)) || (s === 1 ? localStorage.getItem(SAVE_KEY) : null)
        : null;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        const state = migrateSavedState(parsed);
        if (state) {
          const sc = content.scenes.find((item) => item.id === state.currentSceneId);
          const ch = content.chapters.find((item) => item.id === state.currentChapterId);
          slots.push({
            slot: s,
            savedAt: parsed.savedAt || null,
            state,
            sceneId: state.currentSceneId,
            sceneTitle: sc?.title,
            chapterTitle: ch?.title
          });
          continue;
        }
      } catch (e) {
        console.error(`Error parsing slot ${s}`, e);
      }
    }
    slots.push({
      slot: s,
      savedAt: null,
      state: null
    });
  }
  return slots;
}

export function clearSaveSlot(slot: number): void {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(getSlotStorageKey(slot));
      if (slot === 1) {
        localStorage.removeItem(SAVE_KEY);
        localStorage.removeItem(LEGACY_V2_KEY);
        localStorage.removeItem(LEGACY_V1_KEY);
      }
    }
  } catch (e) {
    console.error(`Failed to clear save slot ${slot}`, e);
  }
}

export function clearSave(keepCollectibles: boolean = true, slot?: number): void {
  try {
    if (typeof localStorage !== "undefined") {
      if (slot !== undefined) {
        clearSaveSlot(slot);
        return;
      }
      for (let s = 1; s <= 3; s++) {
        localStorage.removeItem(getSlotStorageKey(s));
      }
      localStorage.removeItem(SAVE_KEY);
      localStorage.removeItem(LEGACY_V2_KEY);
      localStorage.removeItem(LEGACY_V1_KEY);
      if (!keepCollectibles) {
        localStorage.removeItem(COLLECTION_KEY);
        localStorage.removeItem(LEGACY_COLLECTION_KEY);
      }
    }
  } catch (e) {
    console.error("Failed to clear localStorage", e);
  }
}

// ==================== Read Nodes Tracker (F-03) ====================

export function loadReadNodes(): Set<string> {
  try {
    if (typeof localStorage !== "undefined") {
      const data = localStorage.getItem(READ_NODES_KEY);
      if (readNodesCache && readNodesCacheRaw === data) {
        return readNodesCache;
      }
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          readNodesCache = new Set(parsed.filter((k) => typeof k === "string"));
          readNodesCacheRaw = data;
          return readNodesCache;
        }
      }
      readNodesCache = new Set();
      readNodesCacheRaw = data;
      return readNodesCache;
    }
  } catch (e) {
    console.error("Failed to load read nodes", e);
  }
  readNodesCache = new Set();
  readNodesCacheRaw = null;
  return readNodesCache;
}

export function saveReadNodes(nodes: Set<string>): void {
  try {
    if (typeof localStorage !== "undefined") {
      const data = JSON.stringify(Array.from(nodes));
      localStorage.setItem(READ_NODES_KEY, data);
      readNodesCache = nodes;
      readNodesCacheRaw = data;
    }
  } catch (e) {
    console.error("Failed to save read nodes", e);
  }
}

export function markNodeRead(sceneId: string, nodeIndex: number): void {
  const current = loadReadNodes();
  const key = `${sceneId}:${nodeIndex}`;
  if (!current.has(key)) {
    current.add(key);
    saveReadNodes(current);
  }
}

export function isNodeRead(sceneId: string, nodeIndex: number): boolean {
  const current = loadReadNodes();
  return current.has(`${sceneId}:${nodeIndex}`);
}

export function clearReadNodes(): void {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(READ_NODES_KEY);
    }
    readNodesCache = new Set();
    readNodesCacheRaw = null;
  } catch (e) {
    console.error("Failed to clear read nodes", e);
  }
}

// ==================== Game Completion Status ====================

export function hasCompletedGame(): boolean {
  try {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(COMPLETED_GAME_KEY) === "true";
    }
  } catch (e) {
    console.error("Failed to check completed game status", e);
  }
  return false;
}

export function markGameCompleted(): void {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(COMPLETED_GAME_KEY, "true");
    }
  } catch (e) {
    console.error("Failed to mark game completed", e);
  }
}

export function clearGameCompleted(): void {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(COMPLETED_GAME_KEY);
    }
  } catch (e) {
    console.error("Failed to clear game completed", e);
  }
}
