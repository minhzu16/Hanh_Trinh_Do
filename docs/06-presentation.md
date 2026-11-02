# Kịch bản trình bày & Báo cáo dự án (Phase 9)

> **Trạng thái:** ĐÃ HOÀN THIỆN (NGHIỆM THU P9 — SẴN SÀNG BÁO CÁO TRƯỚC HỘI ĐỒNG / LỚP HỌC)  
> **Sản phẩm:** Visual Novel Lịch Sử Đảng "Hành Trình Đỏ" (1911–1930)  
> **Thời lượng báo cáo chuẩn:** 10 phút (kèm 5 phút Q&A)

---

## 1. Khung thời gian 10 phút

| Mốc thời gian | Nội dung trình bày | Người phụ trách | Thiết bị / Thao tác minh hoạ |
|---|---|---|---|
| **00:00 – 01:30** | **Đặt vấn đề & Giải pháp:**<br>• Thực trạng học Lịch sử Đảng: thường nặng tính học thuộc lòng các mốc số liệu.<br>• Ý tưởng cốt lõi: Đưa người học "sống trong lịch sử", nhập vai người thanh niên cùng thời để thấu hiểu từng ngã rẽ tư tưởng. | **Kịch bản (KB)** | Slide mở đầu, giới thiệu triết lý sản phẩm |
| **01:30 – 03:00** | **Kiến trúc & Độ tin cậy học thuật:**<br>• 3 tầng kiểm định dữ liệu tự động (`validate:strict`).<br>• Nguyên tắc bất biến: Mọi phát ngôn của lãnh tụ Nguyễn Ái Quốc đều trích nguyên văn từ Giáo trình Lịch sử Đảng (`GT-`, loại `quote`). Toàn bộ 51/51 nguồn được đối chiếu thực tế. | **Kỹ thuật (KT) / Giải pháp (GP)** | Mở terminal chạy `pnpm validate:strict` trực tiếp (10/10 file xanh) |
| **03:00 – 07:30** | **Trình diễn trực tiếp (Live Demo):**<br>• Bắt đầu từ Cảnh 1 (Kỳ 0 - Bến cảng Nhà Rồng 1911): Giới thiệu tương tác Hotspot, BGM sóng biển sinh động.<br>• Thử chọn một nhánh sai ở lựa chọn `k0-l1` để minh hoạ khái niệm "lịch sử giả định" và cách hộp kiến thức chuẩn dẫn người chơi về đúng con đường.<br>• Thao tác nhảy nhanh bằng tính năng diễn giả: `?canh=k2-c2` (Hội nghị thành lập Đảng 1930).<br>• Thử nghiệm phím tắt 1/2/3, mở Modal tư liệu lịch sử có trích nguồn rõ ràng. | **Kỹ thuật (KT)** | Thao tác trực tiếp trên trình duyệt Web (hoặc PWA offline) |
| **07:30 – 09:00** | **Đánh giá hiệu quả học tập & Củng cố:**<br>• Trình diễn màn Câu hỏi trắc nghiệm (Quiz).<br>• Màn Tổng kết: Phân loại danh hiệu ("Người đi cùng lịch sử"), gợi ý ôn tập thông minh cho câu sai nhiều nhất với nút bấm "Ôn lại cảnh này". | **Kịch bản (KB) & UI** | Trình diễn kết quả chơi và hệ thống phân tích học tập |
| **09:00 – 10:00** | **Khả năng triển khai & Kế hoạch mở rộng:**<br>• Ứng dụng PWA chơi ngoại tuyến không cần mạng (DEP-03).<br>• Âm thanh nén tối ưu (MP3 chuẩn < 1MB).<br>• Khả năng mở rộng Kỳ 3 (1930–1945) trên cùng nền tảng Engine. | **Đại diện nhóm** | Giới thiệu mã QR chơi thử trên điện thoại / link Production |
| **10:00 – 15:00** | **Hỏi & Đáp (Q&A)** cùng Giảng viên và người nghe. | **Cả nhóm** | Trả lời theo bộ câu hỏi chuẩn bị sẵn |

---

## 2. Bộ câu hỏi dự kiến và phương án trả lời chuẩn xác

1. **Câu hỏi:** *Vì sao Nguyễn Ái Quốc không xuất hiện nói nhiều câu thoại như các nhân vật hư cấu?*  
   **Trả lời:** Nhóm áp dụng nguyên tắc học thuật nghiêm ngặt: **Không hư cấu phát ngôn của lãnh tụ lịch sử**. Bác chỉ nói những câu có trích dẫn nguyên văn trong giáo trình chính quy (mã loại `quote`). Mọi suy nghĩ, đối thoại mở rộng đều thông qua góc nhìn của nhân vật hư cấu (Minh, Lan, thợ máy, kiều bào) để phản ánh chân thực không khí thời đại.

2. **Câu hỏi:** *Các lựa chọn sai có làm người chơi bị "Game Over" hay thua cuộc không?*  
   **Trả lời:** Không có kết cục "thua". Khi chọn sai (ví dụ: bạo động vũ trang theo cụ Phan Bội Châu hay cải cách theo cụ Phan Châu Trinh), game sẽ giải thích rõ bối cảnh và hạn chế lịch sử qua hộp kiến thức, sau đó cho phép người học chọn lại. Điểm tổng kết sẽ đánh giá dựa trên tỷ lệ "Đúng ngay lần đầu".

3. **Câu hỏi:** *Hội nghị thành lập Đảng diễn ra từ 6/1 đến 7/2/1930, vậy tại sao ngày kỷ niệm thành lập Đảng lại là 3/2?*  
   **Trả lời:** Theo Giáo trình Lịch sử Đảng Cộng sản Việt Nam (trang 61), Đại hội đại biểu toàn quốc lần thứ III của Đảng (tháng 9/1960) đã quyết nghị lấy ngày 3 tháng 2 dương lịch mỗi năm làm ngày kỷ niệm thành lập Đảng. Nội dung này được giải thích rõ trong cả câu hỏi củng cố và hộp tư liệu của game.

4. **Câu hỏi:** *Tư liệu hình ảnh trong game có bản quyền và nguồn gốc như thế nào?*  
   **Trả lời:** 
   - Phần hình nền và CG nhân vật là đồ họa minh họa nghệ thuật (SVG vector và tranh vẽ tái hiện) do nhóm tự thiết kế.
   - Các tư liệu mở khóa trong Thư viện sưu tập (Báo L'Humanité, Bản Yêu sách 8 điểm, Báo Thanh Niên, Đường Kách mệnh...) đều là ảnh hiện vật lịch sử từ Bảo tàng Lịch sử Quốc gia và tư liệu công khai, ghi rõ nguồn trích dẫn giáo trình và nguồn hiện vật.
   - Các trích đoạn video được gắn nhãn minh bạch: *"Minh hoạ tái hiện lịch sử"* kèm số trang giáo trình tương ứng.

5. **Câu hỏi:** *Nếu giảng đường mất kết nối Internet trong lúc thuyết trình thì sao?*  
   **Trả lời:** Trò chơi đã được tích hợp đầy đủ chuẩn **PWA (Progressive Web App)** với Service Worker tự động lưu đệm (cache) toàn bộ mã nguồn, dữ liệu JSON, hình ảnh và âm thanh. Nhóm có thể chạy `pnpm preview` hoặc mở trực tiếp trên trình duyệt mà không cần kết nối mạng (đạt chuẩn kiểm thử `DEP-03`). Đồng thời nhóm có sẵn video quay dự phòng cảnh then chốt `k2-c2`.

---

## 3. Checklist sẵn sàng ngày thuyết trình

- [x] **Môi trường Production:** Đã deploy thành công trên Vercel/Web tĩnh, không có lỗi console hay 404 (DEP-02).
- [x] **Bản dự phòng ngoại tuyến:** Laptop đã chạy thử bản offline bằng lệnh `pnpm preview` và bật chế độ Airplane mode (DEP-03).
- [x] **Tính năng chuyển cảnh nhanh:** Đã kiểm thử tính năng tham số URL `?canh=k2-c2` để vào thẳng nội dung trọng tâm khi cần rút ngắn thời gian (DEP-04).
- [x] **Âm thanh & Visual:** Âm thanh nén MP3 chuẩn, hoạt động mượt mà, hỗ trợ điều chỉnh âm lượng BGM/SFX riêng biệt qua Settings.
- [x] **Trang thiết bị hỗ trợ:** Cáp chuyển đổi máy chiếu HDMI/Type-C, loa ngoài mini hoặc jack âm thanh 3.5mm, chuột trình chiếu.
- [x] **Phân công thành viên:** Mọi thành viên nắm vững phần thuyết trình và sẵn sàng trả lời phản biện từ giảng viên.
