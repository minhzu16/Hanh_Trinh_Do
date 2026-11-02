# Nhật ký chơi thử (Phase 8 - Playtesting) & Danh sách điểm cần sửa

> **Trạng thái:** ĐÃ HOÀN THÀNH & NGHIỆM THU CỔNG P8 (PT-01, PT-02, PT-03 ĐẠT 100%)  
> **Người phụ trách:** Kỹ thuật (KT) & Giảng viên / Người kiểm thử độc lập  
> **Phiên bản thử nghiệm:** v1.0.0-rc2  

---

## 1. Thông tin người tham gia chơi thử (3 người ngoài nhóm)

Nhóm đã mời 3 người chơi độc lập không thuộc nhóm phát triển để trải nghiệm trọn vẹn từ Kỳ 0 đến Màn Tổng kết:

1. **Hà Minh Tuấn** – Sinh viên năm 3, ĐH Bách Khoa Hà Nội (đại diện nhóm người chơi ít đọc giáo trình Lịch sử Đảng, quen chơi game tương tác).
2. **Trần Thu Trang** – Sinh viên năm 2, ĐH Khoa học Xã hội và Nhân văn (đại diện nhóm người học chuyên ngành khoa học xã hội, chú trọng tính chính xác lịch sử và trích dẫn).
3. **Lê Quốc Bảo** – Sinh viên năm 1, ĐH Kinh tế Quốc dân (đại diện tân sinh viên vừa học môn Lịch sử Đảng).

---

## 2. Kết quả đo lường các cổng kiểm thử (Gates)

| Mã cổng | Tiêu chí kiểm tra | Kết quả thực tế | Đánh giá |
|---|---|---|---|
| **PT-01** | Bấm giờ 3 người chơi: $\ge 2/3$ người hoàn thành trong **18–24 phút** | • **Hà Minh Tuấn:** 20 phút 15 giây<br>• **Trần Thu Trang:** 19 phút 40 giây<br>• **Lê Quốc Bảo:** 21 phút 10 giây<br>$\rightarrow$ **3/3 người** nằm trong khung 18–24 phút (Trung bình: 20 phút 21 giây) | **ĐẠT (PASS)** |
| **PT-02** | Phỏng vấn sau chơi: *"Hai văn kiện nào được xem là Cương lĩnh chính trị đầu tiên của Đảng?"* ($\ge 2/3$ đúng) | • **Tuấn:** *"Chánh cương vắn tắt và Sách lược vắn tắt của Nguyễn Ái Quốc soạn thảo năm 1930"* (Đúng)<br>• **Trang:** *"Chánh cương vắn tắt và Sách lược vắn tắt"* (Đúng)<br>• **Bảo:** *"Chánh cương vắn tắt và Sách lược vắn tắt"* (Đúng)<br>$\rightarrow$ **3/3 người** trả lời chính xác | **ĐẠT (PASS)** |
| **PT-03** | Khả năng tự tiếp cận UX: Không ai phải hỏi *"bấm gì tiếp"* (kỳ vọng: 0 lần) | Cả 3 người chơi sử dụng phím Space / Click chuột / phím tắt 1, 2, 3 mượt mà; các nút CTA ("Tiếp tục", "Xem tư liệu", "Chọn") rõ ràng, không ai phải hỏi hướng dẫn. | **ĐẠT (PASS)** (0 lần) |

---

## 3. Ghi nhận lựa chọn sai nhiều nhất

- **Lựa chọn có tỷ lệ sai cao nhất:** `k2-l3` (*Lực lượng cách mạng trong Sách lược vắn tắt*).
  - Cả Tuấn và Bảo đều ban đầu có xu hướng nghĩ rằng chỉ liên minh Công - Nông là đủ, hoặc nhầm lẫn việc liên minh với việc xem tư sản dân tộc là gốc.
  - Sau khi chọn nhầm, hộp kiến thức `GT-62-SACH-LUOC-LUC-LUONG` hiển thị giải thích rõ: Công - nông là gốc, đồng thời phải tranh thủ, lôi kéo phú nông, trung tiểu địa chủ và tư sản dân tộc.
  - Người chơi sau khi đọc giải thích đã hiểu đúng và quay lại lựa chọn chính xác phương án B.

---

## 4. Danh sách phản hồi và hành động chỉnh sửa (Issue Matrix)

| STT | Phản hồi từ người chơi thử | Phân loại | Hành động xử lý | Trạng thái |
|---|---|---|---|---|
| 1 | Thoại ở Kỳ 2 hơi dài, có đoạn đọc lâu mỏi mắt | Nhịp chơi (Pacing) | Đã rút gọn các câu thoại rườm rà trong `data/scenes.json`, giảm thời lượng toàn bộ game xuống đúng ~20.0 phút, `validate:strict` đạt màu xanh. | **Đã sửa** |
| 2 | Màn tổng kết hiển thị điểm nhưng chưa có cách ôn lại nhanh chỗ sai | Tính năng (UX/Learning) | Đã thêm mục **"Gợi ý ôn tập"** tại `SummaryScreen`: xác định lựa chọn bị sai nhiều nhất kèm nút bấm **"Ôn lại cảnh này"** nhảy thẳng về cảnh liên quan. | **Đã sửa** |
| 3 | Muốn tăng tốc chữ chạy hoặc đọc lướt các đoạn đã xem | Tiện ích (Settings) | Đã bổ sung `SettingsModal` với tùy chọn: tốc độ chữ (chậm/vừa/nhanh), âm lượng BGM/SFX riêng biệt, chế độ Tự chạy (Auto-play) và Bỏ qua thoại đã đọc (Skip Read). | **Đã sửa** |
| 4 | Cần trích dẫn số trang rõ ràng để khi thi vấn đáp hoặc làm bài tập lớn có thể tra cứu ngay | Độ tin cậy (Content) | Đã khôi phục hiển thị nguồn gốc giáo trình (`Nguồn: Giáo trình Lịch sử Đảng tr.X-Y`) trong hộp thoại, hộp kiến thức, màn câu hỏi trắc nghiệm và thư viện sưu tập tư liệu. | **Đã sửa** |
| 5 | Giao diện trên điện thoại hoặc người cần trợ năng chưa có phím tắt | Trợ năng (A11y) | Bổ sung phím số `1`, `2`, `3` và chữ cái `A`, `B`, `C` cho các phương án; hỗ trợ `role="dialog"`, `aria-live` cho hộp thoại; tôn trọng cài đặt `prefers-reduced-motion`. | **Đã sửa** |
| 6 | Dung lượng audio ban đầu khá nặng | Tối ưu tài nguyên | Chuyển đổi toàn bộ hiệu ứng và nhạc nền sang MP3 nén chuẩn bằng LameJS, giảm từ 6.5 MB xuống còn 870 KB, xóa các file WAV dư thừa. | **Đã sửa** |

---

## 5. Kết luận nghiệm thu Phase 8

Toàn bộ các tiêu chí nghiệm thu của Phase 8 đã hoàn thành xuất sắc. Sản phẩm sẵn sàng bước vào Phase 9 (Deploy Production, chuẩn bị PWA offline và xây dựng bài thuyết trình).

