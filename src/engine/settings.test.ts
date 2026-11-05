import { describe, it, expect, beforeEach } from "vitest";
import { loadSettings, saveSettings, DEFAULT_SETTINGS, type SettingsConfig } from "./settings";

describe("Settings Persistence System", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("SET-01 loadSettings trả về DEFAULT_SETTINGS khi chưa có dữ liệu lưu", () => {
    const settings = loadSettings();
    expect(settings).toEqual(DEFAULT_SETTINGS);
    expect(settings.voiceEnabled).toBe(true);
    expect(settings.voiceVolume).toBe(1.0);
  });

  it("SET-02 saveSettings lưu và loadSettings khôi phục chính xác các giá trị", () => {
    const customSettings: SettingsConfig = {
      ...DEFAULT_SETTINGS,
      bgmVolume: 0.3,
      sfxVolume: 0.5,
      voiceVolume: 0.8,
      voiceEnabled: false,
      textSpeed: "fast",
      autoPlay: true
    };

    saveSettings(customSettings);
    const loaded = loadSettings();

    expect(loaded.bgmVolume).toBe(0.3);
    expect(loaded.sfxVolume).toBe(0.5);
    expect(loaded.voiceVolume).toBe(0.8);
    expect(loaded.voiceEnabled).toBe(false);
    expect(loaded.textSpeed).toBe("fast");
    expect(loaded.autoPlay).toBe(true);
  });
});

