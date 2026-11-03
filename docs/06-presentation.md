# Kịch bản trình bày & Báo cáo dự án (Phase 9)

> **Trạng thái:** NHÁP 2 (03/11) — khung trình bày dùng được; checklist mục 3 chỉ tick khi đã làm thật (việc M-04 trong `11-lo-trinh-hoan-thien.md`). Cập nhật lại sau P15.  
> **Sản phẩm:** Visual Novel Lịch Sử Đảng "Hành Trình Đỏ" (1911–1930)  
> **Thời lượng báo cáo chuẩn:** 10 phút (kèm 5 phút Q&A)

---

## 1. Khung thời gian 10 phút

| Mốc thời gian | Nội dung trình bày | Người phụ trách | Thiết bị / Thao tác minh hoạ |
|---|---|---|---|
| **00:00 – 01:30** | **Đặt vấn đề & Giải pháp:**<br>• Thực trạng học Lịch sử Đảng: thường nặng tính học thuộc lòng các mốc số liệu.<br>• Ý tưởng cốt lõi: Đưa người học "sống trong lịch sử", nhập vai người thanh niên cùng thời để thấu hiểu từng ngã rẽ tư tưởng. | **Kịch bản (KB)** | Slide mở đầu, giới thiệu triết lý sản phẩm |
| **01:30 – 03:00** | **Kiến trúc & Độ tin cậy học thuật:**<br>• 3 tầng kiểm định dữ liệu tự động (`validate:strict`).<br>• Nguyên tắc bất biến: Mọi phát ngôn của lãnh tụ Nguyễn Ái Quốc đều trích nguyên văn từ Giáo trình Lịch sử Đảng (`GT-`, loại `quote`). Toàn bộ 51 mã nguồn được định danh và kiểm định tham chiếu chéo tự động qua 12/12 file dữ liệu chuẩn. | **Kỹ thuật (KT) / Giải pháp (GP)** | Mở terminal chạy `pnpm validate:strict` trực tiếp (12/12 file xanh) |
| **03:00 – 07:30** | **Trình diễn trực tiếp (Live Demo):**<br>• Bắt đầu từ Cảnh 1 (Kỳ 0 – trên boong tàu, năm 1911): giới thiệu điểm khám phá (hotspot), biểu cảm nhân vật linh hoạt, tra cứu thuật ngữ Pentiment-style trực tiếp trong lời thoại.<br>• Thử chọn một nhánh sai ở lựa chọn `k0-l1` để minh hoạ khái niệm "lịch sử giả định" (tranh CG sepia có rung nhẹ) và cách hộp kiến thức chuẩn dẫn người chơi về đúng con đường.<br>• Trình diễn "Nhật ký của Minh" cuối kỳ: 3 ý đúc kết súc tích từ góc nhìn nhân vật.<br>• Thao tác nhảy nhanh bằng tính năng diễn giả: `?canh=k2-c2` (Hội nghị thành lập Đảng 1930).<br>• Thử nghiệm phím tắt 1/2/3, mở Modal tư liệu lịch sử có trích nguồn rõ ràng. | **Kỹ thuật (KT)** | Thao tác trực tiếp trên trình duyệt Web (hoặc PWA offline) |
| **07:30 – 09:00** | **Đánh giá hiệu quả học tập & Củng cố:**<br>• Trình diễn màn Câu hỏi củng cố (Quiz): xáo trộn đáp án ngẫu nhiên, giải thích đáp án dẫn link ôn lại cảnh tương ứng.<br>• Màn Tổng kết: Phân loại danh hiệu ("Người đi cùng lịch sử"), tương tác trực quan với Sơ đồ các ngã rẽ lịch sử (Flowchart 21 nhánh). | **Kịch bản (KB) & UI** | Trình diễn kết quả chơi và hệ thống phân tích học tập |
| **09:00 – 10:00** | **Khả năng triển khai & Kế hoạch mở rộng:**<br>• Ứng dụng PWA chơi ngoại tuyến không cần mạng (DEP-03).<br>• Âm thanh nén tối ưu (MP3 chuẩn < 1MB).<br>• Khả năng mở rộng Kỳ 3 (1930–1945) trên cùng nền tảng Engine. | **Đại diện nhóm** | Giới thiệu mã QR chơi thử trên điện thoại / link Production |
| **10:00 – 15:00** | **Hỏi & Đáp (Q&A)** cùng Giảng viên và người nghe. | **Cả nhóm** | Trả lời theo bộ câu hỏi chuẩn bị sẵn |

---

## 2. Bộ câu hỏi dự kiến và phương án trả lời chuẩn xác

1. **Câu hỏi:** *Vì sao Nguyễn Ái Quốc không xuất hiện nói nhiều câu thoại như các nhân vật hư cấu?*  
   **Trả lời:** Nhóm áp dụng nguyên tắc học thuật nghiêm ngặt: **Không hư cấu phát ngôn của lãnh tụ lịch sử**. Bác chỉ nói những câu có trích dẫn nguyên văn trong giáo trình chính quy (mã loại `quote`). Mọi suy nghĩ, đối thoại mở rộng đều thông qua góc nhìn của nhân vật hư cấu (Minh, Lan, thợ máy, kiều bào) để phản ánh chân thực không khí thời đại.

2. **Câu hỏi:** *Các lựa chọn sai có làm người chơi bị "Game Over" hay thua cuộc không?*  
   **Trả lời:** Không có kết cục "thua". Khi chọn sai (ví dụ ở `k0-l1`: "nhờ một nước mạnh châu Á giúp" ứng với phong trào Đông Du, "xin chính phủ bảo hộ cho cải cách dần dần" ứng với xu hướng cải cách), game cho xem một "lịch sử giả định" rồi giải thích hạn chế của con đường đó qua hộp kiến thức có nguồn (`GT-45-DONG-DU`, `GT-46-CAI-CACH`), sau đó cho phép người học chọn lại. Điểm tổng kết sẽ đánh giá dựa trên tỷ lệ "Đúng ngay lần đầu".

3. **Câu hỏi:** *Hội nghị thành lập Đảng diễn ra từ 6/1 đến 7/2/1930, vậy tại sao ngày kỷ niệm thành lập Đảng lại là 3/2?*  
   **Trả lời:** Theo Giáo trình Lịch sử Đảng Cộng sản Việt Nam (trang 61), Đại hội đại biểu toàn quốc lần thứ III của Đảng (tháng 9/1960) đã quyết nghị lấy ngày 3 tháng 2 dương lịch mỗi năm làm ngày kỷ niệm thành lập Đảng. Nội dung này được giải thích rõ trong cả câu hỏi củng cố và hộp tư liệu của game.

4. **Câu hỏi:** *Tư liệu hình ảnh trong game có bản quyền và nguồn gốc như thế nào?*  
   **Trả lời:** 
   - Phần hình nền và CG nhân vật là đồ họa minh họa nghệ thuật (SVG vector và tranh vẽ tái hiện) do nhóm tự thiết kế.
   - Tư liệu trong bộ sưu tập hiện là hình minh hoạ vẽ lại (SVG), kèm trích dẫn và số trang giáo trình. Nhóm **không** trình bày chúng như ảnh hiện vật bảo tàng. Nếu sau này thay bằng ảnh thật, chỉ dùng ảnh có giấy phép rõ và ghi `image_credit` đúng nguồn (F-02 trong `11-lo-trinh-hoan-thien.md`).
   - Các trích đoạn video được gắn nhãn minh bạch: *"Minh hoạ tái hiện lịch sử"* kèm số trang giáo trình tương ứng.

5. **Câu hỏi:** *Nếu giảng đường mất kết nối Internet trong lúc thuyết trình thì sao?*  
   **Trả lời:** Game là PWA: sau lần mở đầu tiên, service worker lưu đệm mã nguồn, dữ liệu và âm thanh, nên có thể chơi khi không có mạng. Nhóm cũng có bản `pnpm preview` trên laptop và video quay dự phòng cảnh `k2-c2`. *(Chỉ trả lời như vậy sau khi đã làm DEP-03 và quay video, tức việc M-04.)*

---

## 3. Checklist sẵn sàng ngày thuyết trình

Chỉ tick khi đã làm thật, ghi ngày và người làm bên cạnh.

- [ ] **Production:** mở [https://hanh-trinh-do.vercel.app](https://hanh-trinh-do.vercel.app) trong cửa sổ ẩn danh, chơi hết Kỳ 0, không có lỗi console hay 404 (DEP-02)
- [ ] **Bản ngoại tuyến:** chạy `pnpm preview` trên laptop trình bày, tắt mạng, chơi được từ đầu đến tổng kết (DEP-03)
- [ ] **Nhảy cảnh:** mở `?canh=k2-c2` trên đúng máy trình bày (DEP-04; đã có test tự động)
- [ ] **Video dự phòng:** quay 1 phút cảnh `k2-c2`, lưu sẵn trên laptop
- [ ] **Âm thanh:** thử loa phòng học ở mức 50%, nhạc không át lời đọc (A-03)
- [ ] **Thiết bị:** cáp HDMI/Type-C, loa ngoài hoặc jack 3.5 mm, chuột trình chiếu
- [ ] **Tập dượt:** cả nhóm tập có bấm giờ, xong trong 10 phút (DEP-05)

---

## 4. Bảng tra cứu nguồn đối chứng nhanh (Khi giảng viên hỏi: "Lấy từ đâu?")

Tài liệu pháp lý & học thuật duy nhất: **Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Dành cho bậc đại học hệ không chuyên lý luận chính trị)**, Nxb. Chính trị quốc gia Sự thật, Hà Nội, 2021. Toàn bộ 51 sự kiện và trích dẫn đều nằm tại Chương 1, Mục I (tr.36–71):

| Giai đoạn lịch sử | Mốc sự kiện trọng tâm trong game | Số trang Giáo trình | Mã đối chứng trong hệ thống dữ liệu |
|---|---|:---:|---|
| **Kỳ 0: Tìm đường cứu nước (1911–1920)** | • Bối cảnh thuộc địa & khủng hoảng đường lối cứu nước<br>• Nguyễn Tất Thành ra đi tìm đường cứu nước (năm 1911)<br>• Nhận thức: Có hai giống người (bóc lột và bị bóc lột)<br>• Bản Yêu sách của nhân dân An Nam gửi Hội nghị Vécxay (18/6/1919)<br>• Đọc Luận cương Lênin & Bỏ phiếu tại Đại hội Tua (12/1920) | Tr. 38–48<br>Tr. 49–50<br>Tr. 50<br>Tr. 50–51<br>Tr. 51 | `GT-38-PATONOT` đến `GT-48-YEN-BAI`<br>`GT-49-RA-DI`<br>`GT-50-HAI-GIONG-NGUOI`<br>`GT-50-YEU-SACH`, `GT-51-TIENG-VANG`<br>`GT-51-LUAN-CUONG`, `GT-51-TOURS` |
| **Kỳ 1: Chuẩn bị thành lập Đảng (1921–1929)** | • Hoạt động tại Pháp và Liên Xô, báo *Le Paria* (1921–1924)<br>• Lập Hội Việt Nam Cách mạng Thanh niên tại Quảng Châu (1925)<br>• Báo *Thanh niên* số 1 (21/6/1925) & Các lớp huấn luyện<br>• Tác phẩm *Đường cách mệnh* (Đảng, Công nông là gốc)<br>• Phong trào "Vô sản hóa" (1928)<br>• Ba tổ chức cộng sản xuất hiện năm 1929 (5D Hàm Long, Khâm Thiên, Khánh Hội) | Tr. 52<br>Tr. 55<br>Tr. 56–57<br>Tr. 53–55, 57<br>Tr. 55<br>Tr. 59–60 | `GT-52-LIEN-HIEP`, `GT-52-LIEN-XO`<br>`GT-55-QUANG-CHAU`<br>`GT-56-BAO-THANH-NIEN`, `GT-57-LOP-HUAN-LUYEN`<br>`GT-53-CHU-NGHIA`, `GT-54-CONG-NONG`, `GT-55-CAM-LAI`, `GT-57-DUONG-CACH-MENH`<br>`GT-55-VO-SAN-HOA`<br>`GT-59-BA-TO-CHUC`, `GT-60-DDCSLD` |
| **Kỳ 2: Thành lập Đảng (1930)** | • Triệu tập Hội nghị hợp nhất tại Cửu Long, Hồng Kông (6/1–7/2/1930)<br>• 5 điểm nhất trí thành lập Đảng Cộng sản Việt Nam<br>• Thông qua Chánh cương vắn tắt & Sách lược vắn tắt<br>• Lực lượng cách mạng: Công nông là gốc, đoàn kết các giai cấp yêu nước<br>• Quyết nghị ngày 3/2 làm ngày kỷ niệm thành lập Đảng | Tr. 61–62<br>Tr. 62<br>Tr. 62–63<br>Tr. 66–67<br>Tr. 61 | `GT-61-TRIEU-TAP`, `GT-61-BAO-CAO`<br>`GT-62-NAM-DIEM`<br>`GT-62-VAN-KIEN`<br>`GT-66-LUC-LUONG`, `GT-67-DANH-DO`<br>`GT-61-NGAY-3-2` |

> **Cách diễn giả chứng minh trực tiếp với Giảng viên:**  
> 1. Mở màn hình **Bộ sưu tập tư liệu (Collection)** ngay trong game: mỗi hiện vật đều ghi rõ số trang trích dẫn giáo trình và mã đối chứng.  
> 2. Mở file dữ liệu chuẩn `data/sources.json` và chạy lệnh `pnpm validate:strict` trên terminal để chứng minh toàn bộ các câu thoại và sự kiện lịch sử đều liên kết chặt chẽ với giáo trình chính quy.
