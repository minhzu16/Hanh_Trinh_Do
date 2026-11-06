# Task 16: Đại Tu Chi Tiết & Mở Rộng Toàn Cảnh (`3200x1200`) Cho 5 Bối Cảnh Kỳ 1 (1923–1929)

- **Mức độ ưu tiên:** 🟠 P1 (Nâng cấp chất lượng mỹ thuật & độ chi tiết khi Zoom/Pan cho Kỳ 1)
- **Phụ trách đề xuất:** `UI` (Giao diện & Art)
- **Các file liên quan:**
  - `src/art/backgrounds/BackgroundKy1.tsx`
  - `data/hotspots.json` (cập nhật tọa độ `x, y` của các hotspot thuộc `k1-c2`, `k1-c5`)

---

## 1. Mục Tiêu Nâng Cấp

Chuyển toàn bộ 5 bối cảnh của Kỳ 1 trong `src/art/backgrounds/BackgroundKy1.tsx` sang khung toàn cảnh siêu rộng `viewBox="0 0 3200 1200"`, bổ sung kiến trúc trung tâm, chất liệu bề mặt và các chi tiết lịch sử cấp độ hiển vi (Micro-LOD) khi người chơi Zoom/Pan.

---

## 2. Đặc Tả Chi Tiết Từng Bối Cảnh Kỳ 1 (`3200x1200`)

### Cảnh 6: `bg-ban-do-hanh-trinh` — Bản đồ Hành trình Xuyên Á–Âu (Paris – Mátxcơva – Quảng Châu, 1923–1924)
- **Toàn cảnh (`x: 0 – 3200`)**: Mặt bàn gỗ sồi cổ điển trải tấm bản đồ hàng hải & địa chính trị thế giới khổ lớn (`3000x1060`) với đường lưới kinh vĩ tuyến, hoa gió la bàn 16 hướng (Compass Rose), đường bờ biển chi tiết của châu Âu, Liên Xô, Trung Quốc và bán đảo Đông Dương.
- **Cánh Trái (`x: 0 – 1050`)**: Khu vực Tây Âu với điểm mốc **Paris (6/1923)**, compa đo hải đồ bằng đồng thau, thước tỷ lệ hải lý, hộ chiếu và vé tàu hỏa đi Liên Xô.
- **Trung Tâm (`x: 1050 – 2150`)**: Tuyến đường sắt xuyên lục địa dẫn tới **Mátxcơva (1923–1924)** với biểu tượng Điện Kremlin, tài liệu **Đại hội V Quốc tế Cộng sản (1924)**, **Trường Đại học Phương Đông** và cuốn tạp chí *Thư tín Quốc tế (Inprekorr)*.
- **Cánh Phải (`x: 2150 – 3200`)**: Tuyến hải trình từ Vladivostok xuống **Quảng Châu (11/1924)** và mạng lưới đường dây liên lạc bí mật về **Hà Nội – Hải Phòng – Sài Gòn** được soi dưới chiếc kính lúp viền đồng và con dấu sáp đỏ.

### Cảnh 7: `bg-lop-hoc-van-minh` — Lớp huấn luyện chính trị số 13–13B đường Văn Minh, Quảng Châu (1925–1926)
- **Cánh Trái (`x: 0 – 1050`)**: Bảng đen lớn đóng khung gỗ lim ghi rõ các luận điểm cốt lõi bài giảng của Nguyễn Ái Quốc, giá sách gỗ xếp đầy các tập bài giảng đóng chỉ, bản đồ thế giới treo tường.
- **Trung Tâm (`x: 1050 – 2150`)**: Không gian lớp học kiến trúc Kỵ Lâu (Qilou) Quảng Châu với trần gỗ cao, quạt trần 3 cánh cổ điển, các dãy bàn ghế gỗ dài của học viên thanh niên yêu nước (có vở ghi chép mở sẵn, bút sắt, bình mực), và bàn in thạch bản (Hectograph) đặt bản in **Báo Thanh Niên Số 1 (21/6/1925)** có thể zoom đọc rõ chữ trên mặt giấy.
- **Cánh Phải (`x: 2150 – 3200`)**: Dãy cửa chớp lá sách màu xanh Đông Dương mở ra ban công nhìn xuống đường Văn Minh (Quảng Châu) với kiến trúc mái vòm phố cổ và ánh nắng xuyên qua khe cửa tạo hiệu ứng tia sáng (God rays).

### Cảnh 8: `bg-lop-hoc-chieu` — Lớp học chiều tà Quảng Châu & Tác phẩm *Đường Kách mệnh* (1927)
- **Cánh Trái (`x: 0 – 1050`)**: Bảng gỗ khắc câu nói bất hủ trong *Đường Kách mệnh*: *"Đảng có vững cách mệnh mới thành công, cũng như người cầm lái có vững thuyền mới chạy"*, kệ tài liệu mật và chiếc va-li mây chuẩn bị lên đường về nước của các học viên.
- **Trung Tâm (`x: 1050 – 2150`)**: Bàn giảng viên giữa phòng dưới ánh hoàng hôn đỏ cam: cuốn **Đường Kách mệnh (1927)** mở đôi trang giấy (zoom cận cảnh đọc được mục lục: *Tư cách một người cách mệnh*, *Vì sao phải viết sách này?*), đồng hồ báo thức cơ khí bằng đồng, ấm trà sứ thanh hoa.
- **Cánh Phải (`x: 2150 – 3200`)**: Hàng hiên vòm cuốn rộng lớn mở ra toàn cảnh **Sông Châu Giang (Pearl River)** lúc chiều tà với mặt nước phản chiếu ráng chiều vàng rực, những chiếc thuyền tam bản căng buồm nan quạt và tháp cổ Lĩnh Nam phía chân trời.

### Cảnh 9: `bg-xuong-may` — Nhà máy dệt / Cơ khí thời kỳ *Vô sản hóa* (1928)
- **Cánh Trái (`x: 0 – 1050`)**: Cột thép tán đinh, bảng **Nội quy xưởngợ thực dân Pháp (1928)** bằng hai thứ tiếng Pháp–Việt, đồng hồ áp suất hơi nước, giá treo cà-mên nhôm 3 ngăn của công nhân (bên dưới đáy cà-mên hé lộ tờ truyền đơn cách mạng bí mật).
- **Trung Tâm (`x: 1050 – 2150`)**: Toàn cảnh lòng phân xưởng công nghiệp rộng lớn với mái răng cưa kính mờ, hệ thống trục truyền động, dây curoa da chạy dọc trần nhà, các dãy máy dệt sợi / máy tiện kim loại nối tiếp nhau trong làn khói bụi công nghiệp và ánh đèn dây tóc lồng sắt.
- **Cánh Phải (`x: 2150 – 3200`)**: Khu vực lò rèn và đe sắt bắn tia lửa đỏ rực, những kiện vải bông chất cao, cổng sắt công xưởng với tháp ống khói gạch đỏ vươn lên bầu trời xám.

### Cảnh 10: `bg-pho-kham-thien-dem` — Phố cổ Hà Nội đêm mưa: 5D Hàm Long & 312 Khâm Thiên (1929)
- **Cánh Trái (`x: 0 – 1050`)**: Mặt tiền ngôi nhà ống hai tầng kiểu Pháp cổ số **5D Hàm Long** (nơi thành lập chi bộ cộng sản đầu tiên tháng 3/1929) với cổng gỗ, tường vàng sẫm rêu phong, cây bàng mùa đông và chiếc xe tay (pousse-pousse) đậu dưới mưa.
- **Trung Tâm (`x: 1050 – 2150`)**: Toàn cảnh góc phố Hà Nội năm 1929 dưới cơn mưa phùn đêm: mặt đường đá cuội ướt loáng nước phản chiếu ánh đèn vàng, đường ray tàu điện Bờ Hồ – Khâm Thiên chạy dọc lòng đường, những mái ngói âm dương nhấp nhô, cột điện gỗ chằng chịt dây cáp sứ trắng.
- **Cánh Phải (`x: 2150 – 3200`)**: Ngôi nhà số **312 Khâm Thiên** (nơi thành lập Đông Dương Cộng sản Đảng ngày 17/6/1929) với biển số nhà men xanh trắng, ô cửa sổ tầng gác sáng đèn dầu ấm áp in bóng các đồng chí đang họp và in tờ báo **Búa Liềm Số 1**.

---

## 3. Tiêu Chí Nghiệm Thu (Acceptance Criteria)

- [ ] Cả 5 bối cảnh trong `BackgroundKy1.tsx` đều có `viewBox="0 0 3200 1200"`, lấp đầy chi tiết ở cả 3 vùng Trái – Giữa – Phải.
- [ ] Khi zoom cận cảnh (`200%+`) vào Bản đồ Á–Âu, Báo *Thanh Niên*, cuốn *Đường Kách mệnh*, Bảng nội quy xưởng thợ, và Cửa sổ 312 Khâm Thiên, mọi chi tiết chữ và họa tiết đều rõ nét.
- [ ] Tọa độ `x, y` của các Hotspot thuộc `k1-c2` và `k1-c5` trong `data/hotspots.json` khớp chính xác với vị trí vật thể mới.
- [ ] Chạy `pnpm check` xanh 100%.

