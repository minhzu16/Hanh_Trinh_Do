# Task 06: Tối Ưu Hóa Mount SVG Background Theo Kỳ & Code Splitting (`React.lazy` + `vite.config.ts`)

- **Mức độ ưu tiên:** 🟠 P1 (Quan trọng — Giảm thời gian tải trang & số lượng node DOM)
- **Phụ trách đề xuất:** `GP` & `UI`
- **Các file liên quan:**
  - `src/art/sceneBackgrounds.tsx` (dòng 1–18)
  - `src/App.tsx` (dòng 18–25)
  - `vite.config.ts` (dòng 10–22)

---

## 1. Mô Tả Vấn Đề & Nguyên Nhân Gốc Rễ

### Vấn đề A: Mount đồng thời cả 3 kỳ SVG Background trong mỗi khung hình
Hãy xem `src/art/sceneBackgrounds.tsx` hiện tại (dòng 1–18):
```tsx
export const SceneBackground: React.FC<SceneBackgroundProps> = ({
  backgroundId,
  className = "w-full h-full object-cover",
}) => {
  return (
    <>
      <BackgroundKy0 backgroundId={backgroundId} className={className} />
      <BackgroundKy1 backgroundId={backgroundId} className={className} />
      <BackgroundKy2 backgroundId={backgroundId} className={className} />
    </>
  );
};
```
- Mỗi lần render một cảnh, React phải gọi cả 3 component `BackgroundKy0` (722 dòng), `BackgroundKy1` (819 dòng) và `BackgroundKy2` (529 dòng), và component `SceneBackground` cũng không được bọc `React.memo`.

### Vấn đề B: Chưa áp dụng `React.lazy` và chunk `index.js` còn nặng (`336 KB`)
- Khi chạy `pnpm build`, file bundle chính `dist/assets/index-*.js` nặng **336.04 KB**, bởi vì:
  1. `QuizScreen.tsx` (27.3 KB), `SummaryScreen.tsx` (15.2 KB), `CollectionScreen.tsx` (7.2 KB) được import tĩnh trong `src/App.tsx` dù người chơi mới vào chỉ thấy `MenuScreen`.
  2. `src/art/characterSprites.tsx` (55.2 KB) và `src/engine/voiceManifest.json` (82.5 KB) chưa được cấu hình tách riêng trong `manualChunks` của `vite.config.ts`.

---

## 2. Hướng Dẫn Triển Khai Chi Tiết

### Bước 1: Phân nhánh chính xác và bọc `React.memo` tại `src/art/sceneBackgrounds.tsx`
1. Phân loại các mã `backgroundId` thuộc Kỳ 0, Kỳ 1, Kỳ 2 bằng một `Set` hoặc `Record` để chỉ mount đúng 1 component duy nhất, đồng thời bọc `React.memo`:
   ```tsx
   const KY0_BGS = new Set([
     "bg-ben-cang-nha-rong",
     "bg-boong-tau-latouche",
     "bg-ham-tau-dem",
     "bg-cang-marseille",
     "bg-ishigaki-cau-cang",
   ]);
   const KY1_BGS = new Set([
     "bg-ban-do-hanh-trinh",
     "bg-buoi-hop-viet-kieu",
     "bg-toa-soan-le-paria",
     "bg-dai-hoi-tours",
     "bg-can-buong-ngo-compoint",
   ]);

   export const SceneBackground: React.FC<SceneBackgroundProps> = React.memo(({
     backgroundId,
     className = "w-full h-full object-cover",
   }) => {
     if (KY0_BGS.has(backgroundId)) {
       return <BackgroundKy0 backgroundId={backgroundId} className={className} />;
     }
     if (KY1_BGS.has(backgroundId)) {
       return <BackgroundKy1 backgroundId={backgroundId} className={className} />;
     }
     return <BackgroundKy2 backgroundId={backgroundId} className={className} />;
   });
   ```
2. Bọc thêm `React.memo` cho `SpriteView` (`src/components/SpriteView.tsx`) và `CinematicAtmosphere` (`src/components/CinematicAtmosphere.tsx`).

### Bước 2: Tách Chunk trong `vite.config.ts` và Lazy Load các màn hình phụ
1. Trong `vite.config.ts`, bổ sung `art-sprites` (`src/art/characterSprites`) và `voice-manifest` (`src/engine/voiceManifest.json`) vào `manualChunks`:
   ```ts
   manualChunks(id) {
     if (id.includes("node_modules")) return "vendor";
     if (id.includes("src/art/backgrounds/")) return "art-backgrounds";
     if (id.includes("src/art/cgIllustrations")) return "art-cg";
     if (id.includes("src/art/characterSprites")) return "art-sprites";
     if (id.includes("src/engine/voiceManifest")) return "voice-manifest";
   }
   ```
2. Trong `src/App.tsx`, có thể dùng `React.lazy` + `<Suspense>` cho `QuizScreen`, `SummaryScreen`, `CollectionScreen` (lưu ý đảm bảo các test đồng bộ trong `screens.test.tsx` và `playthrough.test.tsx` vẫn chạy mượt mà).

---

## 3. Tiêu Chí Nghiệm Thu (Acceptance Criteria)

- [ ] `SceneBackground` chỉ mount duy nhất 1 trong 3 component `BackgroundKy0`, `BackgroundKy1` hoặc `BackgroundKy2` ứng với `backgroundId`.
- [ ] Khi chạy `pnpm build`, dung lượng file `dist/assets/index-*.js` giảm từ `336 KB` xuống dưới `200 KB` nhờ tách `art-sprites` và `voice-manifest`.
- [ ] Mọi bài test trong `src/components/components.test.tsx` và `src/engine/playthrough.test.tsx` đều vượt qua.
- [ ] Chạy `pnpm check` xanh 100%.

