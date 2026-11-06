# Task 17: Đại Tu Chi Tiết & Mở Rộng Toàn Cảnh (`3200x1200`) Cho 4 Bối Cảnh Kỳ 2 (1930)

- **Mức độ ưu tiên:** 🟠 P1 (Nâng cấp chất lượng mỹ thuật & độ chi tiết khi Zoom/Pan cho Kỳ 2 — Cao trào thành lập Đảng)
- **Phụ trách đề xuất:** `UI` (Giao diện & Art)
- **Các file liên quan:**
  - `src/art/backgrounds/BackgroundKy2.tsx`
  - `data/hotspots.json` (cập nhật tọa độ `x, y` của các hotspot thuộc `k2-c2`)

---

## 1. Mục Tiêu Nâng Cấp

Chuyển toàn bộ 4 bối cảnh của Kỳ 2 trong `src/art/backgrounds/BackgroundKy2.tsx` sang khung toàn cảnh siêu rộng `viewBox="0 0 3200 1200"`, tái hiện trang trọng, giàu chiều sâu lịch sử và sắc nét đến từng chi tiết nhỏ cho sự kiện Hội nghị hợp nhất thành lập Đảng Cộng sản Việt Nam đầu xuân Canh Ngọ 1930.

---

## 2. Đặc Tả Chi Tiết Từng Bối Cảnh Kỳ 2 (`3200x1200`)

### Cảnh 11: `bg-ben-cang-hong-kong` — Bến cảng Cửu Long (Hồng Kông) trong sương đêm mùa đông (1/1930)
- **Cánh Trái (`x: 0 – 1050`)**: Cầu cảng đá hoa cương (Kowloon Public Pier) với biển hiệu song ngữ Anh–Hoa `"PIER 3 / 三號碼頭"`, cột đèn lồng đồng thau tỏa quầng sáng vàng trong sương mù, cọc bích buộc dây cáp tàu và các kiện hàng gỗ đóng dấu cảng Hồng Kông.
- **Trung Tâm (`x: 1050 – 2150`)**: Toàn cảnh eo biển **Victoria Harbour** rộng mênh mông về đêm: làn sương mù biển bảng lảng trôi ngang mặt nước, chiếc phà hai tầng **Star Ferry** sáng đèn vàng đang rẽ sóng qua vịnh, phía xa là dãy núi **Thái Bình Sơn (Victoria Peak)** với hàng trăm ánh đèn biệt thự thuộc địa lấp lánh phản chiếu xuống mặt nước.
- **Cánh Phải (`x: 2150 – 3200`)**: Những chiếc thuyền buồm cánh dơi truyền thống Quảng Đông (Cantonese Junk) neo đậu, tháp đồng hồ ga Cửu Long (Kowloon-Canton Railway Clock Tower) bằng gạch đỏ đặc trưng vươn cao trong đêm.

### Cảnh 12: `bg-goc-phong-den-dau` — Căn phòng Hội nghị Hợp nhất thành lập Đảng tại Cửu Long (Hồng Kông, 6/1 – 7/2/1930)
- **Cánh Trái (`x: 0 – 1050`)**: Rèm nhung đỏ sẫm kéo kín che mắt mật thám Anh, kệ tủ gỗ đặt bình gốm men lam cắm **cành hoa đào Tết Canh Ngọ 1930** nở hoa phớt hồng, bộ ấm chén trà nóng và bếp than sưởi ấm đêm xuân.
- **Trung Tâm (`x: 1050 – 2150`)**: Chiếc bàn tròn gỗ hồng sắc đặt ngay trung tâm căn phòng dưới ánh đèn dầu treo trần tỏa sáng kiểu Chiaroscuro:
  - Trên mặt bàn (khi **Zoom cận cảnh `200%`**): hiện rõ các bản thảo viết tay **"CHÁNH CƯƠNG VẮN TẮT"**, **"SÁCH LƯỢC VẮN TẮT"**, **"CHƯƠNG TRÌNH TÓM TẮT"**, **"ĐIỀU LỆ VẮN TẮT CỦA ĐẢNG CỘNG SẢN VIỆT NAM"**, nghiên mực và bút sắt.
- **Cánh Phải (`x: 2150 – 3200`)**: Bóng dáng trang nghiêm của các đại biểu dự Hội nghị (Đông Dương Cộng sản Đảng và An Nam Cộng sản Đảng) quanh bàn họp, chiếc đồng hồ quả lắc gỗ cổ điển trên tường điểm thời khắc lịch sử, và bức tường ốp gỗ căn nhà công nhân tại bán đảo Cửu Long.

### Cảnh 13: `bg-phong-rang-sang` — Rạng sáng 7/2/1930: Bế mạc Hội nghị & Thông qua Cương lĩnh đầu tiên
- **Cánh Trái (`x: 0 – 1050`)**: Bàn làm việc gỗ gụ với chiếc đồng hồ đồng chỉ 5:30 sáng, cây đèn dầu đã vặn nhỏ bấc, tách trà nguội và những que diêm đã cháy hết sau đêm làm việc xuyên Tết.
- **Trung Tâm (`x: 1050 – 2150`)**: Văn kiện lịch sử **"ĐẢNG CỘNG SẢN VIỆT NAM — Chánh cương vắn tắt & Sách lược vắn tắt (Tháng 2/1930)"** đặt trang trọng giữa luồng ánh nắng bình minh chiếu xiên qua phòng (zoom cận cảnh đọc rõ các dòng chữ lịch sử: *"Làm tư sản dân quyền cách mạng và thổ địa cách mạng để đi tới xã hội cộng sản"*).
- **Cánh Phải (`x: 2150 – 3200`)**: Khung cửa sổ lớn vén rèm nhung đỏ mở toang đón bầu trời bình minh tím hồng rực rỡ trên bán đảo Cửu Long, những mái nhà phố cảng trong sương sớm và đàn chim én mùa xuân chao liệng.

### Cảnh 14: `bg-boong-tau-binh-minh` — Con tàu rẽ sóng trở về Tổ quốc trong Bình minh Mùa xuân 1930
- **Cánh Trái (`x: 0 – 1050`)**: Mũi tàu (Forecastle deck) với chiếc chuông đồng khắc số **"1930"**, tời kéo neo bằng thép, dây xích sắt và sóng trắng xóa vỗ tung hai bên mạn tàu.
- **Trung Tâm (`x: 1050 – 2150`)**: Toàn cảnh boong tàu hướng thẳng về phía chân trời biển Đông rực sáng ánh bình minh đỏ vàng; phía xa thấp thoáng dãy núi bờ biển Tổ quốc Việt Nam xanh thẫm và hình ảnh tượng trưng ánh sáng của **Lời kêu gọi nhân dịp thành lập Đảng**.
- **Cánh Phải (`x: 2150 – 3200`)**: Mặt trời mùa xuân năm 1930 đỏ rực mọc lên từ mặt biển tỏa 16 tia nắng vàng kim rực rỡ, dải sóng vàng lấp lánh trải dài trên biển và đàn hải âu bay dẫn đường.

---

## 3. Tiêu Chí Nghiệm Thu (Acceptance Criteria)

- [ ] Cả 4 bối cảnh trong `BackgroundKy2.tsx` có `viewBox="0 0 3200 1200"`, bố cục hoành tráng, liền mạch từ `x = 0` đến `x = 3200`.
- [ ] Khi zoom cận cảnh (`200%+`) vào mặt bàn Hội nghị hợp nhất (`bg-goc-phong-den-dau` & `bg-phong-rang-sang`), người chơi đọc rõ tiêu đề và các dòng luận điểm chính của *Chánh cương vắn tắt*, *Sách lược vắn tắt*.
- [ ] Tọa độ `x, y` của các Hotspot thuộc `k2-c2` trong `data/hotspots.json` khớp chính xác với vị trí vật thể mới.
- [ ] Chạy `pnpm check` xanh 100%.

