import type { GameState } from "./types";

const SAVE_KEY = "hanh_trinh_do_save_v1";

export function saveState(state: GameState): void {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
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
        return JSON.parse(data) as GameState;
      }
    }
  } catch (e) {
    console.error("Failed to load state from localStorage", e);
  }
  return null;
}

export function clearSave(): void {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(SAVE_KEY);
    }
  } catch (e) {
    console.error("Failed to clear save in localStorage", e);
  }
}

