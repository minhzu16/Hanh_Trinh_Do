# Task 07: Giới Hạn `historyStack` (Chặn Rò Rỉ Bộ Nhớ $O(N^2)$), Cache `readNodes` Trên RAM & Dọn Listener `audio.ts`

- **Mức độ ưu tiên:** 🟡 P2 (Trung bình — Tối ưu bộ nhớ RAM, giảm I/O `localStorage` & dọn rò rỉ sự kiện)
- **Phụ trách đề xuất:** `GP` (Gameplay)
- **Các file liên quan:**
  - `src/App.tsx` (dòng 185–205)
  - `src/engine/save.ts` (dòng 240–280)
  - `src/audio.ts` (dòng 35–48)

---

## 1. Mô Tả Vấn Đề & Nguyên Nhân Gốc Rễ

### Vấn đề A: Tăng trưởng bộ nhớ $O(N^2)$ trong `historyStack` (`src/App.tsx`)
Tại `src/App.tsx` (dòng 190), mỗi khi người chơi bấm qua một câu thoại (`NEXT_STEP`), reducer thực hiện:
```tsx
historyStack: [...state.historyStack, state.gameState]
```
- Vì mỗi `state.gameState` chứa mảng `dialogLog` (tích lũy toàn bộ câu thoại từ đầu game), việc lưu không giới hạn mọi bước vào `historyStack` khiến bộ nhớ phình ra theo cấp số bậc hai $O(N^2)$ khi chơi qua 171 nút.
- Ngoài ra, tính năng "Lùi 1 câu" (Rewind) chỉ cho phép lùi trong phạm vi sau lựa chọn gần nhất, nên việc giữ hơn 30 bước trong `historyStack` là hoàn toàn dư thừa.

### Vấn đề B: Đọc/ghi `JSON.parse` + `JSON.stringify` vào `localStorage` ở mỗi câu thoại (`src/engine/save.ts`)
Trong `src/screens/SceneScreen.tsx` (dòng 252, 268), ở mỗi câu thoại, game gọi:
- `isNodeRead(nodeKey)`: gọi `localStorage.getItem` + `JSON.parse` toàn bộ mảng các nút đã đọc.
- `markNodeRead(nodeKey)`: gọi `localStorage.getItem` + `JSON.parse` + `JSON.stringify` + `localStorage.setItem`.
Với hàng trăm nút, việc parse/stringify mảng liên tục trên luồng chính (main thread) là không cần thiết khi có thể giữ một `Set<string>` cache ngay trong bộ nhớ RAM.

### Vấn đề C: Rò rỉ 3 Event Listeners toàn cục trong `AudioManager` (`src/audio.ts`)
Tại `src/audio.ts` (dòng 36–47):
```ts
const unlockAudio = () => {
  this.hasUnlocked = true;
  if (this.ctx && this.ctx.state === "suspended") {
    this.ctx.resume().catch(() => {});
  }
};
window.addEventListener("click", unlockAudio);
window.addEventListener("keydown", unlockAudio);
window.addEventListener("touchstart", unlockAudio);
```
Ba listener này không bao giờ được gỡ bỏ (`removeEventListener`) sau khi `this.hasUnlocked` đã thành `true`, khiến hàm `unlockAudio` vẫn bị gọi ở mọi cú click chuột và gõ phím suốt phiên chơi.

---

## 2. Hướng Dẫn Triển Khai Chi Tiết

### Bước 1: Giới hạn `MAX_HISTORY_STEPS = 30` trong `src/App.tsx`
Khai báo hằng số `const MAX_HISTORY_STEPS = 30;` ở đầu `src/App.tsx`. Khi push vào `historyStack` tại `case "NEXT_STEP"`:
```tsx
const nextHistory = [...state.historyStack, state.gameState];
if (nextHistory.length > MAX_HISTORY_STEPS) {
  nextHistory.shift();
}
```

### Bước 2: Cache `readNodes` bằng `Set<string>` trong `src/engine/save.ts`
Trong `src/engine/save.ts`:
- Duy trì một biến cache cấp module `let readNodesCache: Set<string> | null = null;` (và đồng bộ lại nếu `localStorage` thay đổi hoặc khi test gọi `localStorage.clear()`).
- Trong `isNodeRead(nodeKey)`: tra cứu $O(1)$ qua `Set.has(nodeKey)`.
- Trong `markNodeRead(nodeKey)`: nếu `Set.has(nodeKey)` đã là `true` thì return ngay lập tức (không gọi `localStorage.setItem` lại!). Chỉ ghi xuống `localStorage` khi có `nodeKey` mới.

### Bước 3: Tự động gỡ bỏ listener `unlockAudio` trong `src/audio.ts`
Trong constructor của `AudioManager` (`src/audio.ts` dòng 36–47):
```ts
const unlockAudio = () => {
  this.hasUnlocked = true;
  if (this.ctx && this.ctx.state === "suspended") {
    this.ctx.resume().catch(() => {});
  }
  window.removeEventListener("click", unlockAudio);
  window.removeEventListener("keydown", unlockAudio);
  window.removeEventListener("touchstart", unlockAudio);
};
```

---

## 3. Tiêu Chí Nghiệm Thu (Acceptance Criteria)

- [ ] `historyStack` không bao giờ vượt quá 30 phần tử.
- [ ] `markNodeRead` không ghi lặp lại vào `localStorage` nếu `nodeKey` đã được đánh dấu đọc trước đó.
- [ ] Các listener `unlockAudio` trên `window` tự động được gỡ bỏ ngay sau tương tác đầu tiên của người dùng.
- [ ] Toàn bộ 18 unit tests trong `src/engine/save-migration.test.ts` và 12 tests trong `src/audio.test.ts` chạy xanh.
- [ ] Chạy `pnpm check` xanh 100%.

