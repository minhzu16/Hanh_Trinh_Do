import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import scenesData from "../../data/scenes.json";
import collectiblesData from "../../data/collectibles.json";

describe("Deployment & Assets Verification (DEP-02, DEP-03, DEP-04)", () => {
  const publicDir = path.resolve(__dirname, "../../public");

  it("DEP-02 & DEP-03: Tất cả tài nguyên audio, manifest, icon đều tồn tại trên ổ đĩa (không bị 404)", () => {
    // 1. Kiểm tra manifest và service worker
    expect(fs.existsSync(path.join(publicDir, "manifest.json"))).toBe(true);
    expect(fs.existsSync(path.join(publicDir, "sw.js"))).toBe(true);
    expect(fs.existsSync(path.join(publicDir, "icon.svg"))).toBe(true);

    // 2. Kiểm tra tất cả bgm trong scenes.json
    const audioDir = path.join(publicDir, "audio");
    const uniqueBgms = new Set(
      scenesData
        .map((s) => s.bgm)
        .filter((bgm): bgm is string => typeof bgm === "string" && bgm.length > 0)
    );

    for (const bgm of uniqueBgms) {
      const filePath = path.join(audioDir, `${bgm}.mp3`);
      expect(
        fs.existsSync(filePath),
        `Asset âm thanh "${bgm}.mp3" phải tồn tại trong public/audio`
      ).toBe(true);
    }

    // 3. Kiểm tra file audio kích thước hợp lệ (> 10KB, định dạng nén nhẹ)
    for (const bgm of uniqueBgms) {
      const stats = fs.statSync(path.join(audioDir, `${bgm}.mp3`));
      expect(stats.size).toBeGreaterThan(10 * 1024);
      expect(stats.size).toBeLessThan(1024 * 1024); // Mỗi file < 1MB
    }
  });

  it("DEP-02: Tất cả tư liệu trong collectibles.json đều có dữ liệu hợp lệ", () => {
    expect(collectiblesData.length).toBeGreaterThan(0);
    for (const item of collectiblesData) {
      expect(item.id).toMatch(/^tl-/);
      expect(item.title.length).toBeGreaterThan(0);
      expect(item.source).toMatch(/^GT-/);
    }
  });
});
