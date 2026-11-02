import { describe, it, expect, beforeEach } from "vitest";
import { audioManager } from "./audio";

describe("Audio Manager System", () => {
  beforeEach(() => {
    audioManager.stopBgm();
    if (audioManager.isMuted()) {
      audioManager.toggleMute();
    }
  });

  it("AUD-01 playBgm khởi động không lỗi và ghi nhận track hiện tại", () => {
    audioManager.playBgm("bgm-song-bien");
    expect(audioManager.isMuted()).toBe(false);

    audioManager.playBgm("bgm-day-dan-dang");
    expect(audioManager.isMuted()).toBe(false);

    audioManager.stopBgm();
  });

  it("AUD-02 toggleMute bật/tắt chính xác và ngắt BGM khi mute", () => {
    expect(audioManager.isMuted()).toBe(false);

    const isNowMuted = audioManager.toggleMute();
    expect(isNowMuted).toBe(true);
    expect(audioManager.isMuted()).toBe(true);

    // Khi mute, gọi playBgm sẽ không phát
    audioManager.playBgm("bgm-hoi-hop");
    expect(audioManager.isMuted()).toBe(true);

    // Mở lại mute
    const unmuted = audioManager.toggleMute();
    expect(unmuted).toBe(false);
    expect(audioManager.isMuted()).toBe(false);
  });

  it("AUD-03 setVolume và getVolume điều chỉnh âm lượng chính xác trong khoảng 0.0 - 1.0", () => {
    audioManager.setVolume(0.5);
    expect(audioManager.getVolume()).toBe(0.5);

    // Clamp giá trị biên
    audioManager.setVolume(1.5);
    expect(audioManager.getVolume()).toBe(1.0);

    audioManager.setVolume(-0.2);
    expect(audioManager.getVolume()).toBe(0.0);

    audioManager.setVolume(0.35);
    expect(audioManager.getVolume()).toBe(0.35);
  });

  it("AUD-04 playSfx phát các hiệu ứng âm thanh mà không văng lỗi", () => {
    expect(() => {
      audioManager.playSfx("sfx-chon");
      audioManager.playSfx("sfx-mo-khoa");
      audioManager.playSfx("sfx-vo-tay");
      audioManager.playSfx("sfx-mac-dinh");
    }).not.toThrow();
  });
});
