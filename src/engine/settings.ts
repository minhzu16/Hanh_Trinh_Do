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
  skipRead: true,
  showCitations: true
};

const SETTINGS_STORAGE_KEY = "hanh_trinh_do_user_settings_v1";

function clampVolume(val: unknown, fallback: number): number {
  if (typeof val !== "number" || !Number.isFinite(val)) return fallback;
  return Math.max(0, Math.min(1, val));
}

function isTextSpeed(value: unknown): value is TextSpeed {
  return value === "slow" || value === "normal" || value === "fast" || value === "instant";
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

export function loadSettings(): SettingsConfig {
  if (typeof localStorage === "undefined") {
    return { ...DEFAULT_SETTINGS };
  }
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        return { ...DEFAULT_SETTINGS };
      }
      return {
        textSpeed: isTextSpeed(parsed.textSpeed) ? parsed.textSpeed : DEFAULT_SETTINGS.textSpeed,
        bgmVolume: clampVolume(parsed.bgmVolume, DEFAULT_SETTINGS.bgmVolume),
        sfxVolume: clampVolume(parsed.sfxVolume, DEFAULT_SETTINGS.sfxVolume),
        voiceVolume: clampVolume(parsed.voiceVolume, DEFAULT_SETTINGS.voiceVolume ?? 1),
        voiceEnabled: isBoolean(parsed.voiceEnabled) ? parsed.voiceEnabled : DEFAULT_SETTINGS.voiceEnabled,
        autoPlay: isBoolean(parsed.autoPlay) ? parsed.autoPlay : DEFAULT_SETTINGS.autoPlay,
        skipRead: isBoolean(parsed.skipRead) ? parsed.skipRead : DEFAULT_SETTINGS.skipRead,
        showCitations: isBoolean(parsed.showCitations) ? parsed.showCitations : DEFAULT_SETTINGS.showCitations
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
