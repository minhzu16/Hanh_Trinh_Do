import type { GameState } from "./types";

const SAVE_KEY = "hanh_trinh_do_save_v1";
const COLLECTION_KEY = "hanh_trinh_do_collection_v1";

export function loadPermanentCollectibles(): string[] {
  try {
    if (typeof localStorage !== "undefined") {
      const data = localStorage.getItem(COLLECTION_KEY);
      if (data) {
        return JSON.parse(data) as string[];
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

export function saveState(state: GameState): void {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
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
      const data = localStorage.getItem(SAVE_KEY);
      if (data) {
        const state = JSON.parse(data) as GameState;
        // Merge with permanent collection
        const permCollectibles = loadPermanentCollectibles();
        state.unlockedCollectibles = Array.from(
          new Set([...(state.unlockedCollectibles || []), ...permCollectibles])
        );
        return state;
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
      if (!keepCollectibles) {
        localStorage.removeItem(COLLECTION_KEY);
      }
    }
  } catch (e) {
    console.error("Failed to clear save in localStorage", e);
  }
}
