import type { GameState } from "./types";
import { content } from "../content";

export const SAVE_SCHEMA_VERSION = 2;
const SAVE_KEY = `hanh_trinh_do_save_v${SAVE_SCHEMA_VERSION}`;
const LEGACY_V1_KEY = "hanh_trinh_do_save_v1";
const COLLECTION_KEY = "hanh_trinh_do_collection_v2";
const LEGACY_COLLECTION_KEY = "hanh_trinh_do_collection_v1";

interface SavedEnvelope {
  version: number;
  savedAt: string;
  state: GameState;
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
 * Migration helper: Validates and adapts previous save versions
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

    // Sanitize and complete state
    const permCollectibles = loadPermanentCollectibles();
    const migrated: GameState = {
      screen: candidate.screen || "scene",
      currentChapterId: candidate.currentChapterId || "k0",
      currentSceneId: candidate.currentSceneId,
      nodeIndex: typeof candidate.nodeIndex === "number" ? candidate.nodeIndex : 0,
      activeOption: candidate.activeOption || null,
      choiceScores: candidate.choiceScores || {},
      choiceAttempts: candidate.choiceAttempts || {},
      unlockedCollectibles: Array.from(
        new Set([...(candidate.unlockedCollectibles || []), ...permCollectibles])
      ),
      quizAnswers: candidate.quizAnswers || {},
      dialogLog: Array.isArray(candidate.dialogLog) ? candidate.dialogLog : []
    };

    return migrated;
  } catch (err) {
    console.error("Error migrating saved state:", err);
    return null;
  }
}

export function saveState(state: GameState): void {
  try {
    if (typeof localStorage !== "undefined") {
      const envelope: SavedEnvelope = {
        version: SAVE_SCHEMA_VERSION,
        savedAt: new Date().toISOString(),
        state
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(envelope));
      if (state.unlockedCollectibles && state.unlockedCollectibles.length > 0) {
        savePermanentCollectibles(state.unlockedCollectibles);
      }
    }
  } catch (e) {
    console.error("Failed to save state to localStorage", e);
  }
}

export function loadState(): GameState | null {
  try {
    if (typeof localStorage !== "undefined") {
      let rawData = localStorage.getItem(SAVE_KEY);
      if (!rawData) {
        // Try migrating from legacy v1 save
        rawData = localStorage.getItem(LEGACY_V1_KEY);
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

export function clearSave(keepCollectibles: boolean = true): void {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(SAVE_KEY);
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
