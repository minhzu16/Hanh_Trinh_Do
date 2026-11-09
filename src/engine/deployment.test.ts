import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import scenesData from "../../data/scenes.json";
import collectiblesData from "../../data/collectibles.json";
import videosData from "../../data/videos.json";
import voiceManifest from "./voiceManifest.json";
import {
  HISTORICAL_COLLECTIBLE_PHOTOS,
  HISTORICAL_PORTRAITS,
  HISTORICAL_SCENE_PHOTOS,
  HISTORICAL_COLLECTIBLE_GALLERY
} from "../data/historicalMedia";

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

  it("DEP-03: manifest.json chứa đầy đủ cấu hình chuẩn PWA", () => {
    const manifestPath = path.join(publicDir, "manifest.json");
    const manifestContent = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    expect(manifestContent.name).toBeTruthy();
    expect(manifestContent.short_name).toBeTruthy();
    expect(manifestContent.start_url).toBe("/");
    expect(manifestContent.display).toBe("standalone");
    expect(manifestContent.icons.length).toBeGreaterThan(0);
  });

  it("DEP-04: vercel.json cấu hình chính xác cho single-page app trên Vercel", () => {
    const vercelConfigPath = path.resolve(__dirname, "../../vercel.json");
    expect(fs.existsSync(vercelConfigPath)).toBe(true);
    const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, "utf-8"));
    expect(vercelConfig.framework).toBe("vite");
    expect(vercelConfig.buildCommand).toBe("pnpm check");
    expect(vercelConfig.outputDirectory).toBe("dist");
    expect(vercelConfig.rewrites).toBeDefined();
    expect(vercelConfig.rewrites[0].destination).toBe("/index.html");
  });

  it("DEP-09: sw.js kích hoạt chiến lược Stale-While-Revalidate cho audio", () => {
    const swPath = path.join(publicDir, "sw.js");
    const swCode = fs.readFileSync(swPath, "utf-8");
    expect(swCode).toContain("CACHE_VERSION");
    expect(swCode).toContain("/audio/");
    expect(swCode).toContain("caches.match");
  });

  it("DEP-10: index.html có đầy đủ thẻ Open Graph (OG) và thẻ PWA cho trình duyệt di động", () => {
    const indexPath = path.resolve(__dirname, "../../index.html");
    const indexHtml = fs.readFileSync(indexPath, "utf-8");
    expect(indexHtml).toContain("og:title");
    expect(indexHtml).toContain("og:description");
    expect(indexHtml).toContain("theme-color");
    expect(indexHtml).toContain("manifest.json");
  });

  it("DEP-11: Mọi file âm thanh lồng tiếng trong voiceManifest.json đều tồn tại và lớn hơn 1KB", () => {
    const uniqueUrls = new Set(
      Object.values(voiceManifest).map((entry) => entry.url)
    );
    expect(uniqueUrls.size).toBeGreaterThanOrEqual(100);

    for (const relUrl of uniqueUrls) {
      const filePath = path.join(publicDir, relUrl.replace(/^\/+/, ""));
      expect(fs.existsSync(filePath), `Thiếu file voice: ${relUrl}`).toBe(true);
      const stat = fs.statSync(filePath);
      expect(stat.size, `File voice rỗng: ${relUrl}`).toBeGreaterThan(1024);
    }
  });

  it("DEP-08: Diễn giả & Kịch bản thuyết trình có đầy đủ các mốc scene hợp lệ trên hệ thống dữ liệu", () => {
    const validSceneIds = new Set(scenesData.map((s) => s.id));
    const presenterMilestoneIds = ["k0-c1", "k0-c5", "k1-c2", "k1-c5", "k2-c2", "k2-c4"];
    for (const id of presenterMilestoneIds) {
      expect(validSceneIds.has(id), `Mốc trình diễn ${id} phải tồn tại trong scenes.json`).toBe(true);
    }
  });

  it("DEP-12: Toàn bộ 7 thước phim tư liệu lịch sử trong videos.json đều có file MP4 và WebM thực tế (> 500KB)", () => {
    expect(videosData.length).toBe(7);
    for (const v of videosData) {
      expect(v.mp4Url, `Video ${v.id} phải có mp4Url`).toBeTruthy();
      expect(v.videoUrl, `Video ${v.id} phải có videoUrl (WebM)`).toBeTruthy();

      const mp4Path = path.join(publicDir, v.mp4Url.replace(/^\/+/, ""));
      const webmPath = path.join(publicDir, v.videoUrl.replace(/^\/+/, ""));

      expect(fs.existsSync(mp4Path), `Thiếu file MP4: ${v.mp4Url}`).toBe(true);
      expect(fs.existsSync(webmPath), `Thiếu file WebM: ${v.videoUrl}`).toBe(true);

      const mp4Stat = fs.statSync(mp4Path);
      const webmStat = fs.statSync(webmPath);

      expect(mp4Stat.size, `File MP4 quá nhỏ: ${v.mp4Url}`).toBeGreaterThan(500 * 1024);
      expect(webmStat.size, `File WebM quá nhỏ: ${v.videoUrl}`).toBeGreaterThan(500 * 1024);
    }
  });

  it("DEP-13: Toàn bộ ảnh tư liệu và chân dung lịch sử trong historicalMedia.ts đều tồn tại và không bị rỗng (> 1KB)", () => {
    const photoUrls = new Set<string>();

    Object.values(HISTORICAL_COLLECTIBLE_PHOTOS).forEach((item) => photoUrls.add(item.photoUrl));
    Object.values(HISTORICAL_PORTRAITS).forEach((item) => photoUrls.add(item.photoUrl));
    Object.values(HISTORICAL_SCENE_PHOTOS).forEach((item) => photoUrls.add(item.photoUrl));
    HISTORICAL_COLLECTIBLE_GALLERY.forEach((item) => photoUrls.add(item.photoUrl));

    expect(photoUrls.size).toBeGreaterThanOrEqual(25);

    for (const url of photoUrls) {
      const filePath = path.join(publicDir, url.replace(/^\/+/, ""));
      expect(fs.existsSync(filePath), `Thiếu ảnh tư liệu lịch sử: ${url}`).toBe(true);

      const stat = fs.statSync(filePath);
      expect(stat.size, `Ảnh tư liệu rỗng: ${url}`).toBeGreaterThan(1024);
    }
  });
});
