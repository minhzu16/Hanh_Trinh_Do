# Task 15: Đại Tu Chi Tiết & Mở Rộng Toàn Cảnh (`3200x1200`) Cho 5 Bối Cảnh Kỳ 0 (1911–1920)

- **Mức độ ưu tiên:** 🟠 P1 (Nâng cấp chất lượng mỹ thuật & độ chi tiết khi Zoom/Pan cho Kỳ 0)
- **Phụ trách đề xuất:** `UI` (Giao diện & Art)
- **Các file liên quan:**
  - `src/art/backgrounds/BackgroundKy0.tsx`
  - `data/hotspots.json` (cập nhật lại tọa độ `x, y` của các hotspot thuộc `k0-c1`, `k0-c2` cho khớp khung `3200x1200`)

---

## 1. Mục Tiêu Nâng Cấp

Chuyển toàn bộ 5 bối cảnh của Kỳ 0 trong `src/art/backgrounds/BackgroundKy0.tsx` sang khung toàn cảnh siêu rộng `viewBox="0 0 3200 1200"` với mật độ chi tiết kiến trúc, ánh sáng và đạo cụ lịch sử cao gấp 3–4 lần hiện tại, hỗ trợ người chơi lướt ngang (`Pan`) và phóng to (`Zoom 200%+`) để đọc từng dòng chữ trên hiện vật.

---

## 2. Đặc Tả Chi Tiết Từng Bối Cảnh Kỳ 0 (`3200x1200`)

### Cảnh 1: `bg-boong-tau-dem` — Tàu *Amiral Latouche-Tréville* rời Bến cảng Nhà Rồng (1911)
- **Cánh Trái (`x: 0 – 1000`)**: Mũi tàu và đài chỉ huy (Wheelhouse) bằng gỗ tếch nhiều tầng, cửa kính buồng lái sáng đèn vàng ấm nhìn thấy bánh lái đồng và hải đồ bên trong; phao cứu sinh in rõ chữ `"AMIRAL LATOUCHE-TRÉVILLE • LE HAVRE"`; dây thừng neo quấn cọc bích gang.
- **Trung Tâm (`x: 1000 – 2200`)**: Boong tàu dài hun hút lát ván gỗ tếch có đinh tán đồng, hành lang lan can tàu nhìn ra mặt sông Sài Gòn lấp lánh ánh đèn; phía xa bên kia mặt nước là **toàn cảnh Bến Nhà Rồng (Trụ sở hãng Messageries Maritimes)** với mái ngói gắn đôi rồng chầu mặt trăng và đèn cảng Sài Gòn nhỏ dần phía chân trời.
- **Cánh Phải (`x: 2200 – 3200`)**: Ống khói lớn màu vàng đất của hãng *Chargeurs Réunis* (với băng đỏ 5 ngôi sao), cột buồm cần cẩu hàng hóa, xuồng cứu sinh treo trên giá sắt (davits), nắp hầm tàu, khu vực bếp tàu bốc hơi nóng và bầu trời đêm đầy sao hướng ra biển Đông.

### Cảnh 2: `bg-phong-tro-paris` — Căn gác trọ số 9 ngõ Compoint / Paris (1919)
- **Cánh Trái (`x: 0 – 1050`)**: Góc sinh hoạt và làm nghề ảnh của Nguyễn Ái Quốc: giá treo áo khoác, lò sưởi nhỏ bằng gang với viên gạch hồng sưởi ấm mùa đông, chậu rửa ảnh tráng phim, kệ gỗ xếp đầy sách của Shakespeare, Dickens, Hugo, Lỗ Tấn và từ điển Pháp–Việt.
- **Trung Tâm (`x: 1050 – 2150`)**: Bàn viết gỗ sồi lớn giữa phòng dưới ánh đèn dầu:
  - Khi **Zoom cận cảnh (`200%`)** vào mặt bàn: đọc rõ từng tiêu đề của bản thảo **"REVENDICATIONS DU PEUPLE ANNAMITE — YÊU SÁCH CỦA NHÂN DÂN AN NAM (8 ĐIỂM)"**, lọ mực tím, bút sắt, kính lúp đồng, và những tấm bưu thiếp gửi về Tổ quốc.
  - Phía sau bàn là bức tường giấy dán hoa văn cổ điển Pháp đã bong tróc lộ lớp gạch đỏ.
- **Cánh Phải (`x: 2150 – 3200`)**: Khung cửa sổ áp mái kiểu Pháp mở rộng nhìn ra toàn cảnh mái nhà kẽm xanh xám của Paris lúc hoàng hôn, những ống khói đất nung, đại lộ rực ánh đèn gas và **Tháp Eiffel** chi tiết với kết cấu giàn thép đan chéo tỏa tia sáng đèn pha ngang bầu trời.

### Cảnh 3: `bg-quan-ca-phe` — Quán cà phê Paris, đọc báo *L'Humanité* (7/1920)
- **Cánh Trái (`x: 0 – 1050`)**: Quầy bar bằng gỗ gụ và mặt đồng thau của quán Bistro Paris, kệ rượu/cà phê cổ điển, tấm gương lớn mài vát viền vàng phản chiếu đèn chùm pha lê, và bảng đen viết phấn menu tiếng Pháp chi tiết.
- **Trung Tâm (`x: 1050 – 2150`)**: Bàn tròn mặt đá cẩm thạch vân trắng (Guéridon) đặt tờ báo **L'HUMANITÉ (Số ra ngày 16–17 Juillet 1920)**:
  - Khi **Zoom cận cảnh (`200%`)** vào tờ báo: thấy rõ măng-sét báo *L'Humanité* của Jean Jaurès, tiêu đề lớn *"PREMIÈRE ESQUISSE DES THÈSES SUR LES QUESTIONS NATIONALE ET COLONIALE — V.I. LÉNINE"* và các cột báo in chữ nhỏ kèm tách cà phê phin bốc khói, cặp kính gọng tròn.
- **Cánh Phải (`x: 2150 – 3200`)**: Khung cửa kính vòm lớn nhìn ra đại lộ Paris mùa hè tháng 7: hàng cây tiêu huyền (platane) tán lá xanh rậm rạp, cột báo Morris cổ điển dán áp phích, xe điện mặt đất (tramway) và dãy kiến trúc đá Haussmann.

### Cảnh 4: `bg-hoi-truong-tours` — Hội trường Đại hội XVIII tại Tours (12/1920)
- **Cánh Trái (`x: 0 – 1050`)**: Khu vực lễ đài (Tribune) và bàn Đoàn Chủ tịch với cờ đỏ, chuông đồng của chủ tọa, bàn thư ký tốc ký, máy ảnh hộp gỗ có chớp đèn flash magnesium của phóng viên báo chí năm 1920.
- **Trung Tâm (`x: 1050 – 2150`)**: Toàn cảnh kiến trúc mái vòm khung thép và kính của *Salle du Manège* tại thành phố Tours, biểu ngữ nhung đỏ khổng lồ **"PARTI SOCIALISTE (S.F.I.O.) — 18e CONGRÈS NATIONAL — TOURS (25–30 DÉCEMBRE 1920)"**, đèn chùm lớn và những luồng ánh sáng chiếu xuống diễn đàn.
- **Cánh Phải (`x: 2150 – 3200`)**: Các dãy ghế đại biểu chia tầng từ tiền cảnh đến hậu cảnh đang giơ cao hàng loạt thẻ biểu quyết màu đỏ tán thành gia nhập **Quốc tế thứ ba (Quốc tế Cộng sản)**, hành lang tầng lửng và cửa sổ kính màu.

### Cảnh 5: `bg-ga-paris-tuyet` — Nhà ga *Gare du Nord* trong đêm tuyết rơi (1923)
- **Cánh Trái (`x: 0 – 1050`)**: Sân ga lát đá phủ tuyết trắng, quầy bán vé tàu quốc tế (*Billets Internationaux: Paris – Berlin – Moscou*), bảng giờ tàu cơ khí, cột đèn gas kiểu Pháp, chiếc vali mây và giấy thông hành mang tên *Chen Vang*.
- **Trung Tâm (`x: 1050 – 2150`)**: Vòm mái kính khung gang cao vút của nhà ga *Gare du Nord*, đồng hồ hai mặt treo giữa vòm chỉ đúng 19:00, làn hơi nước trắng xóa cuồn cuộn hòa cùng bông tuyết rơi dày đặc.
- **Cánh Phải (`x: 2150 – 3200`)**: Đầu máy xe lửa hơi nước **231 Pacific** đồ sộ bằng thép đen bóng với hệ thống bánh đà, thanh truyền động, đèn pha vàng rực xuyên màn tuyết, nối liền với các toa tàu gỗ hạng ba có cửa sổ sáng đèn ấm áp.

---

## 3. Tiêu Chí Nghiệm Thu (Acceptance Criteria)

- [ ] Cả 5 bối cảnh trong `BackgroundKy0.tsx` có `viewBox="0 0 3200 1200"`, bố cục liền mạch từ `x = 0` đến `x = 3200`, không có vùng trống đơn điệu ở giữa.
- [ ] Khi zoom lên `200%` tại các văn kiện trên bàn (Yêu sách 8 điểm, báo *L'Humanité*, thẻ biểu quyết Đại hội Tours, bảng giờ tàu), người chơi đọc được các dòng chữ lịch sử sắc nét.
- [ ] Tọa độ `x, y` của các Hotspot thuộc `k0-c1` và `k0-c2` trong `data/hotspots.json` khớp chính xác với vị trí vật thể trên khung vẽ mới.
- [ ] Chạy `pnpm check` xanh 100%.

