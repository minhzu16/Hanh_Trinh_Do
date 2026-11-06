# Task 11: Vá Lỗ Hổng `check-hardcoded-text.mjs`, Chống Hỏng Dữ Liệu `localStorage` & Cấu Hình Security Headers

- **Mức độ ưu tiên:** 🟡 P2 (Trung bình — An toàn dữ liệu phía client, kỷ luật code & bảo mật HTTP)
- **Phụ trách đề xuất:** `GP` & `KT`
- **Các file liên quan:**
  - `scripts/check-hardcoded-text.mjs` (dòng 13–38, 70, 85)
  - `src/engine/settings.ts` (dòng 21–42)
  - `src/engine/save.ts` (dòng 69–118)
  - `vercel.json` (dòng 1–12)

---

## 1. Mô Tả Vấn Đề & Nguyên Nhân Gốc Rễ

### Vấn đề A: Lỗ hổng `includes()` trong `scripts/check-hardcoded-text.mjs`
Tại `scripts/check-hardcoded-text.mjs` (dòng 70 và dòng 85), điều kiện bỏ qua chuỗi trong `ALLOWLIST` đang viết là:
```js
if (!ALLOWLIST.has(text) && !Array.from(ALLOWLIST).some(allowed => text.includes(allowed) || allowed.includes(text)))
```
- Vì `ALLOWLIST` có chứa các chuỗi ngắn như `"Đã tìm đủ"` (dòng 36) và `"Khám phá: "` (dòng 37), biểu thức `text.includes(allowed)` sẽ trả về `true` cho **bất kỳ đoạn văn bản hardcoded dài hàng trăm ký tự nào tình cờ chứa cụm từ `"Khám phá: "` hoặc `"Đã tìm đủ"`**!
- Ngoài ra, mặc định `targetDirs` (dòng 16) chỉ quét `src/screens` và `src/components`, bỏ sót `src/App.tsx`.

### Vấn đề B: Nguy cơ văng lỗi `DOMException` / `TypeError` khi dữ liệu `localStorage` bị hỏng
1. Trong `src/engine/settings.ts` (dòng 35–41):
   ```ts
   const parsed = JSON.parse(raw);
   return { ...DEFAULT_SETTINGS, ...parsed };
   ```
   Nếu dữ liệu trong `localStorage` bị sửa hoặc hỏng (ví dụ `voiceVolume: "abc"` hoặc `bgmVolume: null`), phép tính `Math.max(0, Math.min(1, Number("abc")))` ra `NaN`. Khi gán `audio.volume = NaN` trong `src/audio.ts` hoặc `src/voice.ts`, trình duyệt sẽ ném ngoại lệ `DOMException: Failed to set the 'volume' property on 'HTMLMediaElement': The volume provided (NaN) is outside the range [0, 1]`, làm sập ứng dụng.
2. Trong `src/engine/save.ts` (`migrateSavedState`, dòng 69–118):
   - Chưa kiểm tra `candidate.screen` có nằm trong tập `["menu", "scene", "quiz", "summary", "collection"]` hay không.
   - Chưa kiểm tra các trường object (`flags`, `choiceScores`, `choiceAttempts`, `quizAnswers`) có bị `null` hoặc là mảng (`Array.isArray`) hay không.

### Vấn đề C: Thiếu HTTP Security Headers và Cache Headers cho âm thanh trong `vercel.json`
`vercel.json` hiện tại mới chỉ cấu hình rewrite SPA mà chưa có `headers` bảo mật (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) cũng như header `Cache-Control` cho 120 file `.mp3` giọng đọc đã được băm theo nội dung (`/audio/voices/*.mp3`).

---

## 2. Hướng Dẫn Triển Khai Chi Tiết

### Bước 1: Thắt chặt `scripts/check-hardcoded-text.mjs`
1. Sửa điều kiện kiểm tra `ALLOWLIST` tại dòng 70 và 85: chỉ cho phép khớp chính xác `ALLOWLIST.has(text)` (đối với JSX text có ghép biến, cắt khoảng trắng hai đầu trước khi so khớp).
2. Bổ sung quét file `src/App.tsx` (và đưa các chuỗi UI tĩnh hợp lệ của `App.tsx` vào `ALLOWLIST` hoặc chuyển sang `data/strings.json`).

### Bước 2: Sanitize dữ liệu đọc từ `localStorage` trong `settings.ts` và `save.ts`
1. Trong `src/engine/settings.ts`, viết hàm `clampVolume(val: unknown, fallback: number): number`:
   ```ts
   function clampVolume(val: unknown, fallback: number): number {
     if (typeof val !== "number" || !Number.isFinite(val)) return fallback;
     return Math.max(0, Math.min(1, val));
   }
   ```
   Kiểm tra chặt kiểu của `textSpeed` (`"slow" | "normal" | "fast" | "instant"`), `bgmVolume`, `sfxVolume`, `voiceVolume`, và các biến boolean trước khi trả về từ `loadSettings()`.
2. Trong `src/engine/save.ts` (`migrateSavedState`), đảm bảo `flags`, `choiceScores`, `choiceAttempts`, `quizAnswers` luôn là plain object hợp lệ (`typeof obj === "object" && obj !== null && !Array.isArray(obj) ? obj : {}`).

### Bước 3: Bổ sung `headers` vào `vercel.json`
Cập nhật `vercel.json`:
```json
{
  "framework": "vite",
  "buildCommand": "pnpm check",
  "outputDirectory": "dist",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/audio/voices/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 3. Tiêu Chí Nghiệm Thu (Acceptance Criteria)

- [ ] `check-hardcoded-text.mjs` bắt được các chuỗi tiếng Việt > 40 ký tự kể cả khi chuỗi đó có chứa từ khóa con như `"Khám phá: "`.
- [ ] Khi `localStorage` chứa dữ liệu lỗi như `{"bgmVolume": "NaN", "voiceVolume": -5, "textSpeed": "invalid"}`, `loadSettings()` tự động khôi phục về giá trị hợp lệ trong đoạn `[0, 1]` mà không văng lỗi.
- [ ] Thêm unit test kiểm tra `loadSettings()` với dữ liệu hỏng trong `src/engine/settings.test.ts`.
- [ ] Chạy `pnpm check` xanh 100%.
