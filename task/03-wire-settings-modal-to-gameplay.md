# Task 03: Kết Nối 3 Cài Đặt Bị Ngắt Trong `SettingsModal` (`textSpeed`, `skipRead`, `showCitations`)

- **Mức độ ưu tiên:** 🟠 P1 (Quan trọng — Tính năng có trên UI nhưng chưa hoạt động)
- **Phụ trách đề xuất:** `GP` & `UI`
- **Các file liên quan:**
  - `src/components/SettingsModal.tsx` (dòng 154–175, 278–288)
  - `src/screens/SceneScreen.tsx` (dòng 245–269, 910–922)
  - `src/components/DialogBox.tsx` (dòng 10–35, 130–146, 300–325)
  - `src/components/CardsView.tsx` (dòng 10–20, 50–70)

---

## 1. Mô Tả Vấn Đề & Nguyên Nhân Gốc Rễ

Người chơi có thể mở `SettingsModal` để tùy chỉnh các thông số, và dữ liệu được lưu vào `localStorage` qua `src/engine/settings.ts`. Tuy nhiên, **3 tùy chọn sau đang bị ngắt kết nối (dead wiring)**:

1. **Tốc độ chữ (`settings.textSpeed`: `"slow" | "normal" | "fast" | "instant"`)**:
   - Trong `SettingsModal.tsx` (dòng 154–175), có 4 nút chọn: `"Chậm"`, `"Vừa"`, `"Nhanh"`, `"Tức thì"`.
   - Nhưng ở `SceneScreen.tsx` (dòng 916), component chỉ truyền `instant={settings.textSpeed === "instant"}` xuống `<DialogBox />`.
   - Bên trong `DialogBox.tsx` (dòng 134), tốc độ chạy chữ bị gán cứng là `20ms` (`index += 2`) cho cả 3 mức `"Chậm"`, `"Vừa"` và `"Nhanh"`. Người chơi chỉnh từ `"Chậm"` sang `"Nhanh"` không thấy bất kỳ sự khác biệt nào khi chữ hiện ra!
2. **Chế độ Bỏ qua (`settings.skipRead`: `boolean`)**:
   - Trong `SettingsModal.tsx` (dòng 278–288), có checkbox `"Cho phép Bỏ qua nhanh (Skip)"` gắn với `settings.skipRead`.
   - Nhưng `SceneScreen.tsx` không hề đọc `settings.skipRead` ở bất kỳ đâu!
3. **Hiển thị trích dẫn nguồn trên hội thoại (`settings.showCitations`: `boolean`)**:
   - `SceneScreen.tsx` (dòng 917) truyền `showCitation={settings.showCitations}` và `source={...}` vào `<DialogBox />`.
   - Trong `DialogBox.tsx` (dòng 15), interface `DialogBoxProps` có khai báo `source?: Source` và `showCitation?: boolean`, nhưng ở phần destructuring props (dòng 20–29), hai prop này **không được lấy ra và không được render**!
   - Tương tự, ở `src/components/CardsView.tsx` (dòng 13), `sourcesMap: _sourcesMap` bị bỏ qua nên các thẻ so sánh không hiện mã nguồn giáo trình.

---

## 2. Hướng Dẫn Triển Khai Chi Tiết

### Bước 1: Kết nối `textSpeed` vào hiệu ứng chạy chữ của `DialogBox.tsx`
1. Thêm prop `textSpeed?: "slow" | "normal" | "fast" | "instant"` vào `DialogBoxProps` trong `src/components/DialogBox.tsx` và truyền `textSpeed={settings.textSpeed}` từ `SceneScreen.tsx`.
2. Quy đổi `textSpeed` thành khoảng thời gian timer (`intervalMs`) và bước nhảy ký tự (`stepChars`):
   - `"slow"`: `intervalMs = 38`, `stepChars = 1`
   - `"normal"`: `intervalMs = 20`, `stepChars = 2`
   - `"fast"`: `intervalMs = 10`, `stepChars = 3`
   - `"instant"` (hoặc khi `instant === true`): hiện toàn bộ chuỗi ngay lập tức (`0ms`).

### Bước 2: Hiển thị trích dẫn nguồn khi `showCitation === true` trong `DialogBox.tsx` và `CardsView.tsx`
1. Trong `src/components/DialogBox.tsx`:
   - Destructure `source` và `showCitation = true` từ props.
   - Khi `source && showCitation` đều có giá trị, hiển thị một badge nhỏ gọn ở góc hộp thoại:
     ```tsx
     {source && showCitation && (
       <div className="mt-2 flex items-center gap-2 text-[11px] text-amber-300/80 font-mono">
         <span>📚 Giáo trình, tr. {source.pages}</span>
         <span className="px-1.5 py-0.5 rounded bg-black/40 text-stone-400">
           {source.id}
         </span>
       </div>
     )}
     ```
2. Trong `src/components/CardsView.tsx`:
   - Sử dụng `sourcesMap.get(activeCard.source)` để hiển thị thông tin trang giáo trình và mã `GT-...` bên dưới nội dung mỗi tab.

### Bước 3: Kết nối `settings.skipRead` trong `SceneScreen.tsx`
Tại `useEffect` xử lý `isSkipping` trong `src/screens/SceneScreen.tsx` (dòng 245–265):
- Nếu `settings.skipRead === true` (mặc định chuẩn Visual Novel): chỉ tự động lướt qua các nút đã đọc (`isNodeRead(nodeKey) === true`), và tự động dừng lại khi gặp nút chưa đọc hoặc nút `choice`.
- Nếu người chơi tắt `settings.skipRead === false` (hoặc ngược lại tùy nhãn UI bạn làm rõ trong `SettingsModal.tsx`): đồng bộ hành vi nút Skip trên Header hoặc khóa nút Skip khi `settings.skipRead === false` đúng với mô tả `"Cho phép Bỏ qua nhanh (Skip)"` trong `SettingsModal.tsx`.

---

## 3. Tiêu Chí Nghiệm Thu (Acceptance Criteria)

- [ ] Chọn tốc độ `"Chậm"`, `"Vừa"`, `"Nhanh"`, `"Tức thì"` trong `SettingsModal` làm thay đổi rõ rệt tốc độ gõ chữ trong `DialogBox`.
- [ ] Khi câu thoại của nhân vật lịch sử (hoặc lời dẫn) có gắn `source`, `DialogBox` và `CardsView` hiển thị rõ `"Giáo trình, tr. X · GT-..."` khi `showCitations` bật.
- [ ] Cài đặt `skipRead` trong `SettingsModal` thực sự điều khiển hành vi Skip trong `SceneScreen`.
- [ ] Viết bổ sung unit tests trong `src/components/components.test.tsx` kiểm tra `DialogBox` render badge nguồn trích dẫn khi truyền `source` + `showCitation={true}`.
- [ ] Chạy `pnpm check` xanh 100%.
