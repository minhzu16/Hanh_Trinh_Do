# Bible

> Trạng thái: CHỐT BẢN 2 (03/11) — KB giữ file này. Ai viết nội dung, tài liệu, slide, mini-game hay sự kiện tương tác cũng phải đọc trước. Mục 2 và 4 là chuẩn để viết lại truyện ở P10 (`11-lo-trinh-hoan-thien.md`).

## 1. Quy ước hư cấu – lịch sử

| Loại | Ví dụ | Được làm | Không được làm |
|---|---|---|---|
| Sự kiện, mốc, số liệu | Hội nghị 6/1–7/2/1930 | Kể qua lời dẫn chuyện hoặc lời nhân vật hư cấu, có nguồn | Đổi ngày; thêm chi tiết (ngày tháng, con số, tên người, giai thoại) không có trong `sources.json` |
| Nhân vật lịch sử | Nguyễn Ái Quốc, các đại biểu | Xuất hiện, được kể lại hành động | Nói câu không có trích dẫn (validate chặn) |
| Nhân vật hư cấu | Minh, Lan, Bác Tư | Thoại tự do, có mặt bên lề sự kiện thật | Thay đổi kết quả của sự kiện thật; đứng vào vị trí người có thật (làm đại biểu hội nghị, dùng bí danh của lãnh tụ…) |
| Nhánh sai | "Lịch sử giả định" | Cho thấy hệ quả của một lựa chọn đường lối | Bôi nhọ nhân vật hay phong trào có thật; cảnh bạo lực chi tiết |
| Mini-game, sự kiện tương tác, huy hiệu | Thử thách trong quiz | Luyện lại kiến thức đã có nguồn | Đưa thêm sự kiện mới chưa có nguồn; tên gọi hay lối cộng điểm làm nhẹ đi tính trang nghiêm của chủ đề |

Màn mở đầu luôn hiện chú thích hư cấu (`menu.disclaimer` trong `strings.json`).

## 2. Nhân vật và giọng nói

| Nhân vật | Quan điểm đại diện | Giọng | Ví dụ câu đúng giọng |
|---|---|---|---|
| **Minh** | Thanh niên đi tìm đường; người chơi nhập vai | Nói ít nhưng có nói: mỗi cảnh ít nhất 2 câu thành lời, cộng độc thoại ngắn. Kỳ 0 bồn chồn, hay hỏi; Kỳ 1 học hỏi, tranh luận; Kỳ 2 chín chắn, nhận trách nhiệm | "Bác ơi, đánh mãi mà thua mãi, vậy là tại ai?" |
| **Lan** | Phong trào công nhân, vô sản hóa | Nhanh, thẳng, hay hỏi lại; giọng Hà Nội, xưng "em" với Minh | "Anh ơi, nếu đã có công nông làm gốc rồi, thì còn thiếu gì nữa?" |
| **Bác Tư** | Thế hệ từng theo Cần Vương, Đông Du: kính trọng các bậc đi trước, nhưng đã thấy họ thất bại | Giọng Nam Kỳ, xưng "tao – mày" thân tình; kể chuyện cũ, kết bằng một câu hỏi | "Mày còn trẻ. Theo mày, giờ nên làm sao?" |
| **Dẫn chuyện** | — | Ngôi thứ ba, trung tính, câu ngắn, luôn có mốc thời gian | "Năm 1911. Nước Việt Nam đã là thuộc địa…" |

Nhân vật phụ (`ban-tho-anh`, `tho-viet-kieu`) chỉ xuất hiện trong một cảnh, mỗi lần tối đa 2 câu.

Khi viết phương án sai cho một lựa chọn, đặt nó vào miệng nhân vật đại diện quan điểm đó (ví dụ Bác Tư cho con đường cầu viện), để phương án sai là một lập luận có thật chứ không phải câu "người rơm".

## 3. Từ ngữ

Dùng tên gọi đúng như giáo trình, ở **mọi nơi**: trong game, trong `docs/`, trên slide.

| Viết | Không viết |
|---|---|
| *Đường cách mệnh* (bìa bản in 1927 ghi "Đường Kách mệnh"; chỉ giữ cách viết đó khi mô tả chính tấm bìa) | Đường Kách mệnh, Đường kách mệnh |
| Hội nghị Vécxay (lần đầu có thể ghi thêm "(Versailles)") | Versailles đứng một mình |
| Đại hội Tua (lần đầu có thể ghi thêm "(Tours)") | Tours đứng một mình |
| Cửu Long (Hồng Kông) | Hương Cảng |
| Hội Việt Nam Cách mạng Thanh niên | Hội Thanh niên Cách mạng |

- Giữ nguyên cách viết trong câu trích: "c.m", "cách mệnh", "An Nam".
- Tránh từ ngữ hiện đại trong lời thoại và giao diện (ví dụ "ok", "team", "deadline", "bó tay").

## 4. Mạch của Minh

| Kỳ | Minh ở đâu | Vai trò | Bước phát triển |
|---|---|---|---|
| 0 | Trên tàu (1911), Paris (1919–1920) | Phụ bếp, rồi thợ ảnh, phát truyền đơn Yêu sách | Bế tắc trước thất bại của các phong trào cũ → thấy hy vọng ở Luận cương của Lênin |
| 1 | Quảng Châu (1926), Hải Phòng (1928), Hà Nội (1929) | Học viên lớp huấn luyện, gặp Lan, đi vô sản hóa | Học, tranh luận với Lan; lo trước cảnh ba tổ chức tách rời nhau |
| 2 | Cửu Long, Hồng Kông (12/1929–2/1930) | Người liên lạc bên ngoài hội nghị, chép bản Chánh cương mang về nước | Nhận trách nhiệm; nhìn lại chặng đường cùng Bác Tư và Lan |

Tuổi: khoảng 16 tuổi ở Kỳ 0 (sinh khoảng 1895), khoảng 30–34 tuổi ở Kỳ 1–2.
