# Task 13: Xây Dựng Hệ Thống Panoramic Camera (Zoom Con Lăn, Kéo Lướt Toàn Cảnh, Minimap & Neo Tọa Độ Hotspots)

- **Mức độ ưu tiên:** 🔴 P0 (Nền tảng bắt buộc để phóng to và lướt ngang xem toàn cảnh bối cảnh)
- **Phụ trách đề xuất:** `GP` & `UI`
- **Các file liên quan:**
  - `src/screens/SceneScreen.tsx` (dòng 80–86, 453–595, 987–1023)
  - `data/hotspots.json`

---

## 1. Mô Tả Vấn Đề & Nguyên Nhân Gốc Rễ

Hiện tại người chơi không thể tự do zoom hoặc lướt sang hai bên để ngắm toàn cảnh vì **4 lỗi thiết kế trong `SceneScreen.tsx`**:

1. **Bị thoát chế độ xem ngay khi vừa kéo chuột xong (`SceneScreen.tsx:510–515`)**:
   - Nút `+ / - / Đặt lại` chỉ hiện khi ẩn giao diện (`isUiHidden === true`).
   - Nhưng thẻ `<div>` gốc lại gắn `onClick={() => { if (isUiHidden) setIsUiHidden(false); }}`. Khi người dùng nhấn giữ chuột trái để kéo bối cảnh (`mousedown` → `mousemove` → `mouseup`), trình duyệt lập tức phát sự kiện `click` ngay sau `mouseup`, làm `isUiHidden` bật về `false` và **đá người chơi khỏi chế độ xem cảnh ngay lập tức**!
2. **Không thể lướt ngang (Pan) hay Zoom trực tiếp khi đang chơi & thiếu hỗ trợ con lăn chuột (`onWheel`)**:
   - Người chơi không thể cuộn con lăn chuột (`wheel`) để zoom vào xem chi tiết văn kiện trên bàn, cũng không có thanh trượt ngang (Panorama Scrubber) hay nút điều hướng trái/phải (`◀` / `▶`) để lướt xem toàn cảnh khi hộp thoại đang mở.
3. **Bối cảnh bị lộ viền đen khi kéo (`SceneScreen.tsx:467–468`)**:
   - Khung vẽ hiện tại chỉ có tỉ lệ `1920x1080` bằng đúng màn hình và `zoomLevel = 1.04`, nhưng `panOffset.x` lại cho phép dịch chuyển cứng `[-350, 350]`. Khi kéo sang trái/phải, tấm ảnh SVG trượt khỏi mép màn hình để lộ mảng màu nâu đen `#161210` trống rỗng.
4. **Điểm tương tác (Hotspots) bị trôi lệch khỏi vật thể khi Zoom hoặc Pan (`SceneScreen.tsx:555–563`)**:
   - Các nút Hotspot đang nằm **bên ngoài** thẻ `<div>` chịu biến đổi `transform: translate3d(...) scale(zoomLevel)` của bối cảnh. Do đó khi người chơi zoom hoặc kéo cảnh sang ngang, bối cảnh dịch chuyển nhưng các đốm sáng Hotspot vẫn đứng yên một chỗ trên màn hình, lệch hoàn toàn khỏi vật thể!

---

## 2. Hướng Dẫn Triển Khai Chi Tiết

### Bước 1: Mở rộng Khung Toàn Cảnh Siêu Rộng (Panoramic Stage `160%` Width) & Clamp Biên Động
1. Thiết lập khung chứa bối cảnh (`panoramicCanvas`) có chiều rộng mặc định rộng hơn màn hình (ví dụ `width: 160vw` hoặc tỉ lệ khung `3200:1200` tức `2.66:1`), căn giữa ở vị trí mặc định (`panOffset = { x: 0, y: 0 }`).
2. Viết hàm `clampPanOffset(x, y, zoom, viewportW, viewportH)` tính toán giới hạn kéo tối đa `maxPanX` và `maxPanY` dựa trên kích thước thật của khung toàn cảnh nhân với `zoomLevel`:
   ```ts
   const canvasW = Math.max(viewportW * 1.6, viewportH * (3200 / 1200));
   const canvasH = viewportH;
   const maxPanX = Math.max(0, (canvasW * zoom - viewportW) / 2);
   const maxPanY = Math.max(0, (canvasH * zoom - viewportH) / 2);
   ```
   Nhờ công thức này:
   - Ngay ở mức `zoom = 1.0`, người chơi đã có thể **lướt sang trái và sang phải (`±30%` chiều rộng màn hình)** để nhìn toàn cảnh rộng lớn mà **không bao giờ bị hở viền đen**!
   - Khi zoom lên `1.5x` – `2.8x`, phạm vi kéo `maxPanX`, `maxPanY` tự động mở rộng tương ứng để soi cận cảnh mọi góc phòng, mặt bàn, trang báo.

### Bước 2: Hỗ trợ Zoom bằng Con Lăn Chuột (`onWheel`), Pinch-to-Zoom & Kéo Lướt Mọi Lúc
1. **Zoom bằng con lăn chuột (`handleWheel`)**:
   - Cho phép cuộn con lăn chuột trên vùng bối cảnh để phóng to/thu nhỏ mượt mà trong khoảng `[1.0, 2.8]` (bước nhảy `0.12`), đồng thời zoom hướng vào vị trí con trỏ chuột (Zoom-to-Cursor).
2. **Sửa lỗi `onClick` hủy chế độ ẩn UI khi vừa kéo chuột (`hasDraggedRef`)**:
   - Dùng `const hasDraggedRef = useRef(false);`. Trong `handleMouseDown`, đặt `hasDraggedRef.current = false`. Trong `handleMouseMove` khi `isDragging`, nếu khoảng cách kéo `Math.hypot(dx, dy) > 4`, đặt `hasDraggedRef.current = true`.
   - Trong `onClick` của root `div`: nếu `hasDraggedRef.current === true` thì `return` (không tắt `isUiHidden`!).
3. **Cho phép kéo lướt ngang bối cảnh ngay cả khi không ẩn UI**:
   - Khi người chơi nhấn giữ chuột (hoặc vuốt ngón tay trên điện thoại) vào vùng bối cảnh phía trên hộp thoại, cho phép kéo lướt (`pan`) sang trái/phải mượt mà.
4. **Thanh điều khiển Camera & Panorama Minimap nổi**:
   - Hiển thị cụm điều khiển nhỏ gọn ở góc màn hình (cả khi hiện UI lẫn khi ẩn UI):
     - Nút `◀ Lướt trái` / `Lướt phải ▶`
     - Nút `🔍 -` / Hiển thị `% Zoom` (`100%` – `280%`) / `🔍 +` / `↺ Đặt lại`
     - Thanh chỉ báo vị trí góc nhìn hiện tại trên toàn cảnh (`Panorama Viewport Indicator`).

### Bước 3: Neo Chặt Hotspots Vào Bên Trong Không Gian Bối Cảnh
1. Di chuyển vòng lặp render `sceneHotspots.map(...)` vào **bên trong** thẻ `<div>` có `transform: translate3d(panOffset...) scale(zoomLevel)` của bối cảnh!
2. Để biểu tượng nút Hotspot không bị phóng to quá cỡ khi `zoomLevel = 2.5`, áp dụng biến đổi nghịch đảo trên chính nút Hotspot:
   ```tsx
   style={{
     left: `${spot.x}%`,
     top: `${spot.y}%`,
     transform: `translate(-50%, -50%) scale(${1 / zoomLevel})`,
   }}
   ```
3. Cho phép hiển thị và bấm vào Hotspots ngay cả khi đang ở chế độ `isUiHidden` (chế độ soi bối cảnh toàn màn hình).

---

## 3. Tiêu Chí Nghiệm Thu (Acceptance Criteria)

- [ ] Người chơi có thể cuộn con lăn chuột (`wheel`) hoặc bấm nút `🔍 +` / `🔍 -` để zoom từ `100%` lên `280%` ở bất kỳ cảnh nào mà không cần phải bấm phím `H` ẩn UI trước.
- [ ] Người chơi có thể kéo chuột trái hoặc bấm `◀` / `▶` để lướt ngang qua toàn cảnh rộng (`3200x1200`), không bao giờ bị lộ viền đen trống bên ngoài SVG.
- [ ] Kéo chuột trong chế độ ẩn UI (`isUiHidden`) không bị tự động bật lại UI khi nhả chuột.
- [ ] Khi zoom lên `200%` và kéo cảnh sang trái/phải, toàn bộ các điểm sáng Hotspot bám dính chính xác tuyệt đối vào vật thể trên nền tranh.
- [ ] Chạy `pnpm check` xanh 100%.

