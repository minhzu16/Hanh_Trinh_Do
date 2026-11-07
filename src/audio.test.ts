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
      audioManager.playSfx("sfx-match");
      audioManager.playSfx("sfx-fill");
      audioManager.playSfx("sfx-fanfare");
      audioManager.playSfx("sfx-mac-dinh");
    }).not.toThrow();
  });

  it("AUD-05 toggleMute duy trì track mục tiêu và khôi phục khi bật lại âm", () => {
    audioManager.playBgm("bgm-song-bien");
    expect(audioManager.getTargetBgmName()).toBe("bgm-song-bien");

    // Tắt âm -> dừng audio nhưng vẫn lưu track mục tiêu
    audioManager.toggleMute();
    expect(audioManager.isMuted()).toBe(true);
    expect(audioManager.getTargetBgmName()).toBe("bgm-song-bien");

    // Khi đang mute, chuyển cảnh gọi bài khác -> lưu bài mới
    audioManager.playBgm("bgm-day-dan-dang");
    expect(audioManager.getTargetBgmName()).toBe("bgm-day-dan-dang");

    // Bật lại âm -> tự động phát bài mới đã lưu
    audioManager.toggleMute();
    expect(audioManager.isMuted()).toBe(false);
    expect(audioManager.getTargetBgmName()).toBe("bgm-day-dan-dang");
  });

  it("AUD-06 setBgmVolume và getBgmVolume điều chỉnh và clamp trong khoảng 0.0 - 1.0", () => {
    audioManager.setBgmVolume(0.7);
    expect(audioManager.getBgmVolume()).toBe(0.7);

    audioManager.setBgmVolume(-0.5);
    expect(audioManager.getBgmVolume()).toBe(0.0);

    audioManager.setBgmVolume(2.5);
    expect(audioManager.getBgmVolume()).toBe(1.0);
  });

  it("AUD-07 setSfxVolume và getSfxVolume điều chỉnh và clamp trong khoảng 0.0 - 1.0", () => {
    audioManager.setSfxVolume(0.8);
    expect(audioManager.getSfxVolume()).toBe(0.8);

    audioManager.setSfxVolume(-1.0);
    expect(audioManager.getSfxVolume()).toBe(0.0);

    audioManager.setSfxVolume(1.8);
    expect(audioManager.getSfxVolume()).toBe(1.0);
  });

  it("AUD-08 stopBgm(false) dừng nhạc nhưng giữ lại targetBgmName", () => {
    audioManager.playBgm("bgm-chu-de-chinh");
    expect(audioManager.getTargetBgmName()).toBe("bgm-chu-de-chinh");

    audioManager.stopBgm(false);
    expect(audioManager.getTargetBgmName()).toBe("bgm-chu-de-chinh");
  });

  it("AUD-09 stopBgm(true) dừng nhạc và xóa sạch targetBgmName", () => {
    audioManager.playBgm("bgm-chu-de-chinh");
    expect(audioManager.getTargetBgmName()).toBe("bgm-chu-de-chinh");

    audioManager.stopBgm(true);
    expect(audioManager.getTargetBgmName()).toBeNull();
  });

  it("AUD-10 Khi đang tắt âm (isMuted=true), playSfx không gây lỗi và tôn trọng trạng thái tắt âm", () => {
    audioManager.toggleMute();
    expect(audioManager.isMuted()).toBe(true);

    expect(() => {
      audioManager.playSfx("sfx-chon");
      audioManager.playSfx("sfx-vo-tay");
    }).not.toThrow();
  });

  it("AUD-11 toggleMute lưu và cập nhật trạng thái vào localStorage", () => {
    const initialMuted = audioManager.isMuted();
    audioManager.toggleMute();
    expect(localStorage.getItem("hanh_trinh_do_muted")).toBe(String(!initialMuted));

    audioManager.toggleMute();
    expect(localStorage.getItem("hanh_trinh_do_muted")).toBe(String(initialMuted));
  });

  it("AUD-12 Ngắt an toàn khi toggleMute() ngay sau khi gọi playBgm()", () => {
    audioManager.playBgm("bgm-song-bien");
    // Ngay lập tức mute trước khi bất kỳ promise nào hoàn tất
    audioManager.toggleMute();
    expect(audioManager.isMuted()).toBe(true);
    expect(audioManager.getTargetBgmName()).toBe("bgm-song-bien");
  });

  it("AUD-13 setMuted(boolean) thiết lập chính xác trạng thái tắt/bật âm thanh", () => {
    audioManager.setMuted(true);
    expect(audioManager.isMuted()).toBe(true);
    audioManager.setMuted(true); // idempotency
    expect(audioManager.isMuted()).toBe(true);

    audioManager.setMuted(false);
    expect(audioManager.isMuted()).toBe(false);
    audioManager.setMuted(false);
    expect(audioManager.isMuted()).toBe(false);
  });

  it("AUD-14 pauseActiveAudio và resumeActiveAudio tạm dừng và khôi phục BGM cho chế độ xem video tư liệu", () => {
    audioManager.playBgm("bgm-saigon-cang");
    expect(audioManager.getTargetBgmName()).toBe("bgm-saigon-cang");

    // Tạm dừng khi mở video modal
    audioManager.pauseActiveAudio();
    expect(audioManager.getTargetBgmName()).toBe("bgm-saigon-cang");

    // Khôi phục khi đóng video modal
    audioManager.resumeActiveAudio();
    expect(audioManager.getTargetBgmName()).toBe("bgm-saigon-cang");
  });
});
