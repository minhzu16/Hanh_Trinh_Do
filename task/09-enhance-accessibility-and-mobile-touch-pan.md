# Task 09: Hoàn Thiện Accessibility Chuẩn WCAG (`onKeyDown`, `role="dialog"`, `prefers-reduced-motion`) & Touch Pan Di Động

- **Mức độ ưu tiên:** 🟡 P2 (Trung bình — Trải nghiệm người dùng bàn phím, người nhạy cảm chuyển động & thiết bị di động)
- **Phụ trách đề xuất:** `UI` (Giao diện & Art)
- **Các file liên quan:**
  - `src/components/DialogBox.tsx` (dòng 98–114, 195–210)
  - `src/screens/QuizScreen.tsx` (dòng 513–533)
  - `src/components/PresenterModal.tsx` (dòng 110)
  - `src/screens/SceneScreen.tsx` (dòng 510–518, 930–940)
  - `src/index.css` (dòng 366–375)
  - `src/screens/screens.test.tsx` (dòng 845–855)

---

## 1. Mô Tả Vấn Đề & Nguyên Nhân Gốc Rễ

1. **Phần tử tương tác `<span>` thiếu sự kiện bàn phím (`onKeyDown`)**:
   - Trong `src/components/DialogBox.tsx` (dòng 98–114), các thuật ngữ lịch sử gạch chân được render là `<span role="button" tabIndex={0} onClick={...}>` nhưng **không có `onKeyDown`**. Khi người dùng nhấn `Tab` tới thuật ngữ rồi ấn `Enter` hoặc `Space`, hộp giải thích không mở ra (thậm chí sự kiện còn nổi bọt lên `window` làm nhảy sang câu thoại tiếp theo!).
   - Trong `src/screens/QuizScreen.tsx` (dòng 513–533), các ô trống `[ ? ]` của câu hỏi `fill_blank` chỉ là `<span onClick={...}>`, thiếu `role="button"`, `tabIndex={0}` và `onKeyDown`.
2. **Một số Modal thiếu `role="dialog"` và `aria-modal="true"`**:
   - `PresenterModal.tsx` (dòng 110), Modal chi tiết Hotspot (`SceneScreen.tsx` dòng 931), và Modal giải thích thuật ngữ (`DialogBox.tsx` dòng 197) chưa có `role="dialog" aria-modal="true"`.
3. **Chưa tắt hết chuyển động khi bật `prefers-reduced-motion` & lỗi selector trong test `A-06`**:
   - Trong `src/index.css` (dòng 366–373), `@media (prefers-reduced-motion: reduce)` mới chỉ tắt `.vn-eye-blink*` và `.vn-eye-shimmer`, mà quên tắt `.vn-screen-shake`, `.vn-character-breathe`, `.vn-scene-drift`, `.vn-lamp-flicker`, `.vn-wave-swell`, `.vn-stealth-pulse`.
   - Trong `src/screens/SceneScreen.tsx` (dòng 517), class `"vn-screen-shake"` vẫn được gắn khi `isShaking === true` mà không kiểm tra `!prefersReducedMotion`.
   - Đáng chú ý: Test `A-06` trong `src/screens/screens.test.tsx` (dòng 848) đang tìm `.animate-shake` (một class không tồn tại) thay vì `.vn-screen-shake`, nên test luôn pass giả (`toBeNull()`)!
4. **Chế độ ẩn UI (`isUiHidden`) chưa hỗ trợ kéo camera bằng cảm ứng (`touch`) trên điện thoại**:
   - Tại `src/screens/SceneScreen.tsx` (dòng 512–515), khung cảnh chỉ gắn `onMouseDown`, `onMouseMove`, `onMouseUp`, `onMouseLeave`, chưa có `onTouchStart`, `onTouchMove`, `onTouchEnd`.

---

## 2. Hướng Dẫn Triển Khai Chi Tiết

### Bước 1: Bổ sung `onKeyDown` cho thuật ngữ Glossary (`DialogBox.tsx`) và ô trống Quiz (`QuizScreen.tsx`)
1. Trong `src/components/DialogBox.tsx` (dòng 98–114):
   ```tsx
   onKeyDown={(e) => {
     if (e.key === "Enter" || e.key === " ") {
       e.preventDefault();
       e.stopPropagation();
       audioManager.playSfx("sfx-chon");
       setActiveGlossary(matchedEntry);
     }
   }}
   ```
2. Trong `src/screens/QuizScreen.tsx` (dòng 513–533), chuyển `<span onClick={...}>` của ô khuyết thành `<button type="button" onClick={...}>` (hoặc thêm `role="button" tabIndex={0} onKeyDown={...}`).

### Bước 2: Bổ sung `role="dialog" aria-modal="true"` cho 3 Modal còn thiếu
- Thêm `role="dialog" aria-modal="true"` vào container của `PresenterModal.tsx`, Hotspot Modal trong `SceneScreen.tsx`, và Glossary Modal trong `DialogBox.tsx`.

### Bước 3: Hoàn thiện `prefers-reduced-motion` và sửa test `A-06`
1. Trong `src/screens/SceneScreen.tsx` (dòng 517):
   ```tsx
   ${isShaking && !prefersReducedMotion ? "vn-screen-shake" : ""}
   ```
2. Trong `src/index.css` (dòng 366–375):
   ```css
   @media (prefers-reduced-motion: reduce) {
     .vn-eye-blink,
     .vn-eye-blink-slow,
     .vn-eye-blink-calm,
     .vn-eye-shimmer,
     .vn-character-breathe,
     .vn-scene-drift,
     .vn-lamp-flicker,
     .vn-wave-swell,
     .vn-stealth-pulse,
     .vn-screen-shake {
       animation: none !important;
       transform: none !important;
     }
   }
   ```
3. Trong `src/screens/screens.test.tsx` (dòng 848), sửa selector `.animate-shake` thành `.vn-screen-shake` để test `A-06` kiểm tra đúng class thật.

### Bước 4: Thêm Touch Pan cho `SceneScreen.tsx`
Thêm `onTouchStart`, `onTouchMove`, `onTouchEnd` dựa trên `e.touches[0].clientX` và `e.touches[0].clientY` tương tự logic `handleMouseDown`/`handleMouseMove`/`handleMouseUp` khi `isUiHidden === true`.

---

## 3. Tiêu Chí Nghiệm Thu (Acceptance Criteria)

- [ ] Nhấn `Tab` tới thuật ngữ gạch chân trong `DialogBox` và ấn `Enter` mở đúng popup giải thích thuật ngữ mà không làm trôi câu thoại.
- [ ] Khi bật `prefers-reduced-motion: reduce`, phần tử màn chơi không gắn class `.vn-screen-shake` (test `A-06` kiểm tra `.vn-screen-shake` xanh).
- [ ] Mọi modal trong ứng dụng đều có `role="dialog"` và `aria-modal="true"`.
- [ ] Chạy `pnpm check` xanh 100%.

