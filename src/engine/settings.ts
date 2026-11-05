// Settings Configuration and Persistence for "Hành Trình Đỏ" Visual Novel

export type TextSpeed = "slow" | "normal" | "fast" | "instant";

export interface SettingsConfig {
  textSpeed: TextSpeed;
  bgmVolume: number;
  sfxVolume: number;
  voiceVolume?: number;
  voiceEnabled?: boolean;
  autoPlay: boolean;
  skipRead: boolean;
  showCitations: boolean;
}

export const DEFAULT_SETTINGS: SettingsConfig = {
  textSpeed: "normal",
  bgmVolume: 0.75,
  sfxVolume: 0.85,
  voiceVolume: 1.0,
  voiceEnabled: true,
  autoPlay: false,
  skipRead: false,
  showCitations: true
};

const SETTINGS_STORAGE_KEY = "hanh_trinh_do_user_settings_v1";

export function loadSettings(): SettingsConfig {
  if (typeof localStorage === "undefined") {
    return { ...DEFAULT_SETTINGS };
  }
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_SETTINGS,
        ...parsed
      };
    }
  } catch (e) {
    console.error("Failed to load settings from localStorage", e);
  }
  return { ...DEFAULT_SETTINGS };
}

export function saveSettings(settings: SettingsConfig): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save settings to localStorage", e);
  }
}
