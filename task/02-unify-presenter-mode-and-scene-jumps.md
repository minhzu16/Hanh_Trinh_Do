# Task 02: Hợp Nhất Presenter Mode (`Ctrl+P` vs `P`) & Chuẩn Hóa `skipUnmetAndRecord` Khi Nhảy Cảnh

- **Mức độ ưu tiên:** 🟠 P1 (Quan trọng — Lỗi trùng lặp UI & thiếu trạng thái khi chuyển cảnh)
- **Phụ trách đề xuất:** `GP` (Gameplay)
- **Các file liên quan:**
  - `src/App.tsx` (dòng 78–92, 234–288, 360–466)
  - `src/screens/SceneScreen.tsx` (dòng 325–332)
  - `src/components/PresenterModal.tsx`
  - `src/engine/step.ts` (hàm `skipUnmetAndRecord`)

---

## 1. Mô Tả Vấn Đề & Nguyên Nhân Gốc Rễ

### Vấn đề A: Hai hệ thống Presenter Modal trùng lặp & xung đột phím `Ctrl+P`
1. Trong `src/App.tsx` (dòng 360–466), có một menu `"⚡ Chuyển cảnh nhanh"` (`showPresenterMenu`) mở bằng tổ hợp phím `Ctrl+P`.
2. Trong `src/components/PresenterModal.tsx` và `src/screens/SceneScreen.tsx` (dòng 327), lại có một modal `"🎤 Chế độ Diễn giả"` (`isPresenterOpen`) mở bằng phím `P`.
3. Tại `src/screens/SceneScreen.tsx` dòng 327:
   ```tsx
   if (e.key.toLowerCase() === "p") {
     e.preventDefault();
     setIsPresenterOpen((prev) => !prev);
     return;
   }
   ```
   Do không kiểm tra `!e.ctrlKey && !e.metaKey && !e.altKey`, khi người dùng ấn `Ctrl+P` trong màn chơi (`SceneScreen`), **cả 2 modal cùng bật lên chồng đè lên nhau**.

### Vấn đề B: Nhảy cảnh (`JUMP_SCENE`, `SELECT_CHAPTER`, `?canh=`) bỏ sót `skipUnmetAndRecord`
Trong `src/engine/step.ts`, các hàm `start()` và `next()` luôn gọi `skipUnmetAndRecord(content, state)` để:
- Bỏ qua các nút ở đầu cảnh nếu có điều kiện `if` không thỏa mãn.
- Tự động mở khóa vật phẩm nếu nút đầu tiên là `unlock`.
- Ghi câu thoại đầu tiên (`nodeIndex: 0`) của cảnh vào nhật ký hội thoại (`dialogLog`).

Tuy nhiên, tại `src/App.tsx`:
- Khởi tạo từ URL `?canh=k1-c2` (dòng 78–92)
- Action `SELECT_CHAPTER` (dòng 234–263)
- Action `JUMP_SCENE` (dòng 266–288)

đều gán trực tiếp `currentSceneId` và `nodeIndex: 0` mà **không gọi `skipUnmetAndRecord(content, nextGameState)`**. Hậu quả là khi mở `LogModal` (phím `L`) ngay sau khi nhảy cảnh, câu thoại đầu tiên của cảnh đó bị mất khỏi lịch sử hội thoại.

---

## 2. Hướng Dẫn Triển Khai Chi Tiết

### Bước 1: Chặn xung đột phím `Ctrl+P` và hợp nhất trải nghiệm Presenter (`SceneScreen.tsx` & `App.tsx`)
1. Trong `src/screens/SceneScreen.tsx` (dòng 327), sửa điều kiện bắt phím `P` (và các phím đơn `L`, `J`, `H`, `A`, `S`, `V`, `M`):
   ```tsx
   if (e.ctrlKey || e.metaKey || e.altKey) return;
   ```
   Đặt dòng kiểm tra modifier keys này ngay đầu hàm `handleKeyDown` của `SceneScreen.tsx` để mọi tổ hợp phím hệ thống (`Ctrl+P`, `Ctrl+R`, `Ctrl+F`, `Alt+Tab`...) không bao giờ kích hoạt nhầm phím tắt trong game.
2. Hợp nhất `PresenterModal`:
   - Sử dụng `PresenterModal.tsx` làm giao diện chuẩn duy nhất (hoặc thêm tab/danh sách đầy đủ 15 cảnh vào `PresenterModal.tsx` bên cạnh 8 mốc thuyết trình chính) để không phải duy trì 2 modal rời rạc ở `App.tsx` và `SceneScreen.tsx`.

### Bước 2: Gọi `skipUnmetAndRecord` ở mọi điểm nhảy cảnh trong `src/App.tsx`
Import `skipUnmetAndRecord` từ `./engine/step` vào `src/App.tsx`:
1. Trong `createInitialAppState()` khi xử lý `?canh=` (dòng 78–92):
   ```tsx
   const baseState = start(content);
   const jumpedState = skipUnmetAndRecord(content, {
     ...baseState,
     currentChapterId: matchedScene.chapter,
     currentSceneId: matchedScene.id,
     nodeIndex: 0,
     activeChoiceBranch: undefined,
     dialogLog: [],
   });
   ```
2. Trong `appReducer` tại `case "SELECT_CHAPTER"` (dòng 234–263) và `case "JUMP_SCENE"` (dòng 266–288):
   - Bọc state mới tạo qua `skipUnmetAndRecord(content, newGameState)` trước khi trả về.

---

## 3. Tiêu Chí Nghiệm Thu (Acceptance Criteria)

- [ ] Ấn `Ctrl+P` hoặc `P` chỉ mở đúng 1 modal diễn giả duy nhất, không bao giờ bật chồng 2 modal.
- [ ] Ấn các tổ hợp phím trình duyệt như `Ctrl+L`, `Ctrl+J`, `Ctrl+H`, `Ctrl+S`, `Ctrl+A` không kích hoạt nhầm các nút Log, Journal, Hide UI, Skip, Auto của game.
- [ ] Khi nhảy tới một cảnh bằng `JUMP_SCENE`, `SELECT_CHAPTER` hoặc URL `?canh=k0-c2`, câu thoại đầu tiên (`nodeIndex: 0`) xuất hiện đầy đủ trong `dialogLog` (kiểm tra bằng cách mở `LogModal`).
- [ ] Bổ sung unit test kiểm tra `JUMP_SCENE` và `SELECT_CHAPTER` ghi nhận `dialogLog` cho nút đầu tiên.
- [ ] Chạy `pnpm check` xanh 100%.

