# Task 01: Sửa Lỗi Phím `Space`/`Enter` Vượt Khóa 3 Giây `KnowledgeBox`, Nhảy Cóc `CardsView` & `DialogBox`

- **Mức độ ưu tiên:** 🔴 P0 (Nghiêm trọng — Lỗi logic cốt lõi của gameplay)
- **Phụ trách đề xuất:** `GP` (Gameplay)
- **Các file liên quan:**
  - `src/screens/SceneScreen.tsx` (dòng 389–435, 890–925)
  - `src/components/KnowledgeBox.tsx` (dòng 24–56)
  - `src/components/CardsView.tsx` (dòng 15–35)
  - `src/components/DialogBox.tsx` (dòng 130–165)
  - `src/screens/screens.test.tsx`

---

## 1. Mô Tả Vấn Đề & Nguyên Nhân Gốc Rễ

Hiện tại trong `src/screens/SceneScreen.tsx` (dòng 429–435), trình lắng nghe bàn phím toàn cục (`window.addEventListener("keydown", ...)`) đang xử lý phím `Space` và `Enter` như sau:

```tsx
if (currentNode.type !== "choice") {
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    audioManager.playSfx("sfx-chon");
    handleNextNode();
  }
}
```

Cách viết này gây ra **4 lỗi logic nghiêm trọng**:
1. **Phá vỡ khóa 3 giây của `KnowledgeBox` (Vi phạm cổng `UI-24` / `F-07`)**:
   - `KnowledgeBox.tsx` có bộ đếm ngược `countdown` 3 giây để buộc người chơi đọc hộp kiến thức lịch sử trước khi nút `"Đã hiểu — Tiếp tục"` được mở khóa.
   - Tuy nhiên, nếu người chơi bấm `Space` hoặc `Enter` trên bàn phím, `SceneScreen.tsx` gọi thẳng `handleNextNode()` ngay ở giây thứ 0, bỏ qua hoàn toàn khóa 3 giây!
2. **Nhảy cóc các tab chưa đọc trong `CardsView`**:
   - Ở cảnh có nút `cards` (`CardsView.tsx`), nút bấm chuột yêu cầu người chơi xem lần lượt từng tab (`activeTab < node.cards.length - 1`) rồi mới gọi `onNext()`.
   - Nhưng khi bấm `Space` hoặc `Enter`, `SceneScreen.tsx` gọi thẳng `handleNextNode()`, bỏ qua toàn bộ các tab còn lại.
3. **Bỏ qua câu thoại đang gõ dở trong `DialogBox`**:
   - `DialogBox.tsx` ghi hướng dẫn: `"Nhấp chuột hoặc gõ Space để hiện nhanh"`. Khi nhấp chuột lúc chữ đang chạy (`isTyping === true`), `DialogBox` hiện toàn bộ câu thoại; nhấp lần 2 mới qua câu tiếp theo.
   - Nhưng khi gõ `Space` hoặc `Enter`, `SceneScreen.tsx` lại nhảy thẳng sang câu tiếp theo thay vì hoàn tất hiệu ứng gõ chữ của câu hiện tại trước.
4. **Phím `Enter` không hoạt động ở `JournalModal` cuối kỳ**:
   - Tại `SceneScreen.tsx` (dòng 389–396), khi `isJournalOpen` đang mở (cuối mỗi kỳ), nút chính ghi `"Tiếp tục hành trình ↵"`, nhưng code chỉ bắt `e.key === "Escape" || e.key.toLowerCase() === "j"` rồi `return`, khiến phím `Enter` bị vô hiệu hóa.

---

## 2. Hướng Dẫn Triển Khai Chi Tiết

### Bước 1: Cho phép phím `Enter` đóng/tiếp tục tại `JournalModal` (`src/screens/SceneScreen.tsx`)
Tại đoạn kiểm tra `if (isJournalOpen)` (khoảng dòng 389):
```tsx
if (isJournalOpen) {
  if (
    e.key === "Escape" ||
    e.key.toLowerCase() === "j" ||
    (e.key === "Enter" && pendingChapterEnd)
  ) {
    e.preventDefault();
    if (pendingChapterEnd) handleJournalContinue();
    else setIsJournalOpen(false);
  }
  return;
}
```

### Bước 2: Chặn `Space`/`Enter` ở `SceneScreen.tsx` đối với `knowledge`, `cards`, và `DialogBox` đang gõ chữ
1. **Đối với `KnowledgeBox` (`currentNode.type === "knowledge"`)**:
   - Không xử lý `Space`/`Enter` ở `SceneScreen.tsx` khi `currentNode.type === "knowledge"`.
   - Thay vào đó, bên trong `src/components/KnowledgeBox.tsx`, thêm `useEffect` lắng nghe phím `Space`/`Enter` và **chỉ gọi `onContinue()` khi `countdown === 0`**:
     ```tsx
     useEffect(() => {
       const handleKeyDown = (e: KeyboardEvent) => {
         if (e.repeat) return;
         if ((e.key === " " || e.key === "Enter") && countdown <= 0) {
           e.preventDefault();
           onContinue();
         }
       };
       window.addEventListener("keydown", handleKeyDown);
       return () => window.removeEventListener("keydown", handleKeyDown);
     }, [countdown, onContinue]);
     ```
2. **Đối với `CardsView` (`currentNode.type === "cards"`)**:
   - Không xử lý `Space`/`Enter` ở `SceneScreen.tsx` khi `currentNode.type === "cards"`.
   - Bên trong `src/components/CardsView.tsx`, lắng nghe phím `Space`/`Enter` để gọi hàm chuyển tab (`if (activeTab < node.cards.length - 1) setActiveTab(prev => prev + 1); else onNext();`).
3. **Đối với `DialogBox` (`narration`, `line`, `thought`)**:
   - Trong `src/components/DialogBox.tsx`, xử lý phím `Space`/`Enter` (khi không có modal nào mở) hoặc truyền callback/ref để:
     - Nếu `isTyping === true`: dừng timer gõ chữ, hiển thị toàn bộ `text` (`setDisplayedText(text)`, `setIsTyping(false)`).
     - Nếu `isTyping === false`: gọi `onNext()`.
   - Trong `SceneScreen.tsx` (dòng 429–435), chỉ giữ xử lý `Space`/`Enter` trực tiếp cho các nút đơn giản không có trạng thái nội bộ (`cg`, `timeline`, `retry`).

---

## 3. Tiêu Chí Nghiệm Thu (Acceptance Criteria)

- [ ] Khi đang ở nút `knowledge` và thời gian đếm ngược chưa về `0`, bấm `Space` hoặc `Enter` **không** chuyển sang nút tiếp theo. Sau khi hết 3 giây (`countdown === 0`), bấm `Space` hoặc `Enter` chuyển nút bình thường.
- [ ] Khi đang ở nút `cards` có 3 tab, bấm `Space` hoặc `Enter` chuyển lần lượt từ tab 1 → tab 2 → tab 3 → nút kế tiếp.
- [ ] Khi `DialogBox` đang chạy chữ (`isTyping === true`), bấm `Space`/`Enter` lần 1 sẽ hiện trọn vẹn câu chữ; bấm lần 2 mới chuyển sang câu tiếp theo.
- [ ] Khi `JournalModal` hiện lên ở cuối kỳ, bấm `Enter` kích hoạt `handleJournalContinue()`.
- [ ] Viết thêm ít nhất 3 unit tests trong `src/screens/screens.test.tsx` kiểm tra các trường hợp trên.
- [ ] Chạy `pnpm check` xanh 100%.
