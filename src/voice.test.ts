import { describe, it, expect, beforeEach, vi } from "vitest";
import { voiceManager, CHARACTER_PROFILES, voiceManifest } from "./voice";

describe("Voice-over & Speech Synthesis Manager", () => {
  beforeEach(() => {
    voiceManager.stop();
    voiceManager.setEnabled(true);
    voiceManager.setMuted(false);
    voiceManager.setVolume(1.0);
  });

  it("VOICE-01 cleanText lọc sạch mã nguồn [GT-...] và ký tự trích dẫn", () => {
    const raw = `Nguyễn Tất Thành ra đi tìm đường cứu nước [GT-49-RA-DI]. "Người thanh niên yêu nước" [1] bước lên tàu.`;
    const cleaned = voiceManager.cleanText(raw);
    expect(cleaned).not.toContain("GT-49-RA-DI");
    expect(cleaned).not.toContain("[1]");
    expect(cleaned).not.toContain('"');
    expect(cleaned).toContain("Nguyễn Tất Thành ra đi tìm đường cứu nước");
  });

  it("VOICE-02 Character voice profiles có đầy đủ cấu hình cho các nhân vật cốt lõi", () => {
    expect(CHARACTER_PROFILES["minh"]).toBeDefined();
    expect(CHARACTER_PROFILES["lan"]).toBeDefined();
    expect(CHARACTER_PROFILES["bac-tu"]).toBeDefined();
    expect(CHARACTER_PROFILES["nguyen-ai-quoc"]).toBeDefined();
    expect(CHARACTER_PROFILES["narrator"]).toBeDefined();
    expect(CHARACTER_PROFILES["knowledge"]).toBeDefined();

    // Giọng Lan có pitch cao hơn giọng Bác Tư
    expect(CHARACTER_PROFILES["lan"].pitch).toBeGreaterThan(CHARACTER_PROFILES["bac-tu"].pitch);
  });

  it("VOICE-03 setEnabled bật/tắt đúng trạng thái", () => {
    expect(voiceManager.isVoiceEnabled()).toBe(true);
    voiceManager.setEnabled(false);
    expect(voiceManager.isVoiceEnabled()).toBe(false);
    voiceManager.setEnabled(true);
    expect(voiceManager.isVoiceEnabled()).toBe(true);
  });

  it("VOICE-04 setVolume clamp trong khoảng 0.0 - 1.0", () => {
    voiceManager.setVolume(0.6);
    expect(voiceManager.getVolume()).toBe(0.6);

    voiceManager.setVolume(1.8);
    expect(voiceManager.getVolume()).toBe(1.0);

    voiceManager.setVolume(-0.5);
    expect(voiceManager.getVolume()).toBe(0.0);
  });

  it("VOICE-05 speak và stop không gây lỗi khi Web Speech API không sẵn sàng (môi trường Node/jsdom)", () => {
    expect(() => {
      voiceManager.speak("Thử nghiệm câu thoại", "minh");
      voiceManager.stop();
    }).not.toThrow();
  });

  it("VOICE-06 voiceManifest có cấu trúc tra cứu song ngữ O(1) theo text và hash", () => {
    expect(voiceManifest).toBeDefined();
    const keys = Object.keys(voiceManifest);
    expect(keys.length).toBeGreaterThan(100);

    // Kiểm tra câu thoại mở đầu k0-c1
    const testText = "Năm 1911, Nguyễn Tất Thành ra đi tìm đường cứu nước. Trên con tàu Latouche-Tréville, Minh cũng rời quê hương.";
    const entry = voiceManifest[testText];
    expect(entry).toBeDefined();
    expect(entry.url).toMatch(/^\/audio\/voices\/[a-f0-9]+\.mp3$/);
    expect(entry.speaker).toBe("narrator");
  });

  it("VOICE-07 speak phát audio file từ manifest qua HTML5 Audio", () => {
    const playMock = vi.fn().mockResolvedValue(undefined);
    const pauseMock = vi.fn();

    // Mock Audio constructor
    const originalAudio = global.Audio;
    // @ts-expect-error Mocking Audio for testing
    global.Audio = class {
      public src: string;
      public volume: number = 1.0;
      public paused: boolean = false;
      constructor(src: string) {
        this.src = src;
      }
      public play = playMock;
      public pause = pauseMock;
    };

    try {
      const testText = "Năm 1911, Nguyễn Tất Thành ra đi tìm đường cứu nước. Trên con tàu Latouche-Tréville, Minh cũng rời quê hương.";
      voiceManager.speak(testText, "narrator");

      expect(playMock).toHaveBeenCalled();
      expect(voiceManager.getActiveText()).toBe(testText);

      voiceManager.stop();
      expect(pauseMock).toHaveBeenCalled();
      expect(voiceManager.getActiveText()).toBeNull();
    } finally {
      global.Audio = originalAudio;
    }
  });
});
