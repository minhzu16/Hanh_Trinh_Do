# Task 14: Kiến Trúc Khung Cảnh Toàn Cảnh (`3200x1200`) & Bộ Thư Viện Chất Liệu / Ánh Sáng SVG Dùng Chung (`svgDefs.tsx`)

- **Mức độ ưu tiên:** 🔴 P0 (Nền tảng đồ họa để nâng cấp 14 bối cảnh từ hình khối đơn giản sang tranh lịch sử chi tiết cao)
- **Phụ trách đề xuất:** `UI` (Giao diện & Art)
- **Các file liên quan:**
  - `src/art/backgrounds/svgDefs.tsx` *(tạo mới)*
  - `src/art/sceneBackgrounds.tsx`
  - `src/art/backgrounds/BackgroundKy0.tsx`
  - `src/art/backgrounds/BackgroundKy1.tsx`
  - `src/art/backgrounds/BackgroundKy2.tsx`

---

## 1. Mô Tả Vấn Đề & Nguyên Nhân Gốc Rễ

Tại sao 14 bối cảnh hiện tại bị đánh giá là **"quá nhỏ, thiếu chi tiết và xấu"**?

1. **Khung nhìn `1920x1080` chật hẹp và vùng giữa (`x: 640–1250`) bị bỏ trống**:
   - Do trước đây thiết kế theo kiểu "chừa trống khu vực giữa cho nhân vật đứng", khoảng giữa từ `x = 640` đến `x = 1250` ở hầu hết các cảnh chỉ là một mảng màu phẳng `<rect>` đơn điệu. Khi không có nhân vật hoặc khi người chơi nhìn tổng thể, bức tranh trông trống rỗng và rời rạc thành 2 cụm nhỏ hai bên.
2. **Vẽ bằng hình học cơ bản (`rect`, `circle`, `line`) thiếu chiều sâu và chất liệu (Texture)**:
   - Tường nhà, mặt bàn gỗ, sàn đá, mặt biển, bầu trời chỉ dùng gradient 2–3 màu đơn giản.
   - Không có lớp tiền cảnh (Foreground silhouettes tạo chiều sâu ống kính), không có bóng đổ môi trường (Ambient Occlusion / Drop Shadow), không có họa tiết bề mặt (vân gỗ, mạch gạch vữa, sớ giấy cổ, tán lá, gợn sóng đa tầng).
3. **Thiếu chi tiết cận cảnh (Micro-LOD) khi Zoom**:
   - Các văn kiện lịch sử trên bàn (báo *L'Humanité*, *Yêu sách 8 điểm*, *Đường Kách mệnh*, *Chánh cương vắn tắt*), bản đồ, đồng hồ, biển hiệu chỉ vẽ vài đường kẻ `<line>` sơ sài. Khi người chơi zoom vào để xem thì không có chi tiết nào để khám phá.

---

## 2. Hướng Dẫn Triển Khai Chi Tiết

### Bước 1: Chuẩn hóa Khung Toàn Cảnh Siêu Rộng `viewBox="0 0 3200 1200"` (Tỉ lệ `8:3` Panoramic)
Mọi bối cảnh trong `BackgroundKy0.tsx`, `BackgroundKy1.tsx`, `BackgroundKy2.tsx` sẽ chuyển sang chuẩn `viewBox="0 0 3200 1200"`:
- **Vùng Cánh Trái Mở Rộng (`x: 0 → 950`)**: Không gian khám phá mở rộng bên trái (khi người chơi lướt camera sang trái sẽ thấy trọn vẹn kiến trúc phụ, kệ sách, bến cảng, phố xá, công xưởng).
- **Vùng Trung Tâm Có Chiều Sâu (`x: 950 → 2250`)**: Không còn bỏ trống! Được lấp đầy bằng kiến trúc hậu cảnh – trung cảnh có độ tương phản dịu (mái vòm, hành lang, khung cửa sổ lớn, bản đồ, dãy phố, đường chân trời) giúp bức tranh liền mạch từ trái sang phải mà vẫn làm nổi bật nhân vật khi xuất hiện.
- **Vùng Cánh Phải Mở Rộng (`x: 2250 → 3200`)**: Không gian khám phá mở rộng bên phải (khi người chơi lướt camera sang phải sẽ thấy toàn cảnh tàu thuyền, đầu máy xe lửa, dòng sông Châu Giang, cảng Cửu Long...).

### Bước 2: Quy hoạch 4 Lớp Chiều Sâu Không Gian (4-Layer Depth Composition) cho mỗi bối cảnh
Mỗi `<svg>` bối cảnh bắt buộc tổ chức thành 4 nhóm `<g>` rõ ràng:
1. **`<g id="layer-sky-vista">` (Viễn cảnh)**: Bầu trời đa sắc, mây chiều/sương mù, núi non, đường chân trời thành phố (Paris / Quảng Châu / Hà Nội / Hồng Kông), mặt trăng/mặt trời.
2. **`<g id="layer-architecture-mid">` (Kiến trúc & Trung cảnh)**: Tường gạch/gỗ có phào chỉ, cột trụ, mái vòm, cửa sổ chớp, cầu cảng, tàu thuyền, nội thất chính.
3. **`<g id="layer-historical-props-lod">` (Đạo cụ lịch sử chi tiết cao - Micro-LOD)**: Bàn làm việc, văn kiện có tiêu đề và các dòng chữ nhỏ sắc nét (đọc được khi zoom `200%`), đèn dầu, bản đồ, máy in thạch bản, đồng hồ chỉ đúng giờ lịch sử.
4. **`<g id="layer-foreground-vignette">` (Tiền cảnh & Ánh sáng khí quyển)**: Rèm nhung, xà nhà, bóng cột tiền cảnh ở hai mép `x: 0–200` và `x: 3000–3200`, luồng sáng thể tích (Volumetric God Rays), bóng đổ mềm và lớp phủ ánh sáng.

### Bước 3: Xây dựng `src/art/backgrounds/svgDefs.tsx` (Thư viện Pattern, Filter & đạo cụ tinh xảo)
Tạo file `src/art/backgrounds/svgDefs.tsx` cung cấp component `<SharedBackgroundDefs />` gồm:
1. **SVG `<pattern>` chất liệu**:
   - `pattern-woodgrain`: Vân gỗ tếch / gỗ lim cổ điển.
   - `pattern-brick-wall`: Tường gạch cổ Pháp / gạch xanh Lĩnh Nam có mạch vữa.
   - `pattern-cobblestone`: Mặt đường đá cuội ướt phản chiếu ánh đèn đêm.
   - `pattern-parchment`: Bề mặt giấy báo cổ / giấy bản thế kỷ XX.
   - `pattern-encaustic-tile`: Gạch bông Đông Dương (Indochine tiles).
2. **SVG `<filter>` ánh sáng & đổ bóng**:
   - `filter-drop-shadow`: Đổ bóng mềm chân thực cho mọi đồ vật trên bàn và khung cửa.
   - `filter-lantern-bloom`: Hiệu ứng quầng sáng ấm áp lan tỏa từ đèn dầu / đèn đường.
   - `filter-water-reflection`: Gợn sóng phản chiếu ánh trăng/ánh đèn trên mặt nước cảng Sài Gòn, sông Châu Giang, cảng Victoria.

---

## 3. Tiêu Chí Nghiệm Thu (Acceptance Criteria)

- [ ] File `src/art/backgrounds/svgDefs.tsx` được tạo đầy đủ các `<pattern>` và `<filter>` dùng chung, không trùng lặp ID.
- [ ] Không còn bất kỳ cảnh nào bị trống rỗng ở vùng trung tâm hay vẽ bằng các khối hình học thô sơ thiếu đổ bóng/chất liệu.
- [ ] Chạy `pnpm check` xanh 100%.

