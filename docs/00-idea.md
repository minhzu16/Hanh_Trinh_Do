# Ý tưởng gốc

> Trạng thái: CHỐT — chỉ đọc. Muốn đổi phải cả nhóm đồng ý.

## 1. Một câu

Visual novel 20 phút: người chơi "đi cùng" lịch sử từ năm 1911 đến khi Đảng Cộng sản Việt Nam ra đời đầu năm 1930, đưa ra lựa chọn ở những chỗ lịch sử từng phải chọn, và hiểu vì sao lựa chọn thật là lựa chọn đúng.

## 2. Vì sao là visual novel

- Học qua tình huống và hậu quả, không phải học thuộc.
- Gây cảm xúc nên nhớ lâu hơn quiz.
- Dễ mở rộng: thêm kỳ, thêm cảnh, thêm tư liệu mà không đổi engine.

## 3. Ba nguyên tắc thiết kế

1. **Bám giáo trình.** Mọi mốc thời gian, số liệu và câu trích đều lấy từ *Giáo trình Lịch sử Đảng Cộng sản Việt Nam* (Nxb. Chính trị quốc gia Sự thật, 2021), có ghi số trang. Mỗi hộp kiến thức trỏ tới một mã nguồn trong `data/sources.json`.
2. **Không bịa lời nhân vật lịch sử.** Nhân vật có thật (Nguyễn Ái Quốc, các đại biểu Hội nghị hợp nhất…) chỉ nói những câu có trích dẫn trong giáo trình. Lời thoại tự do giao cho nhân vật hư cấu (Minh, Lan, Bác Tư). Validate chặn vi phạm này.
3. **Nhánh sai để hiểu, không để chê.** Nhánh sai cho thấy hệ quả của một *lựa chọn đường lối* rồi giải thích theo giáo trình. Không bôi nhọ nhân vật có thật. Các phong trào yêu nước trước năm 1930 được tôn trọng: chúng thất bại vì thiếu đường lối, nhưng đã "cổ vũ mạnh mẽ tinh thần yêu nước" (tr.49).

## 4. Phạm vi

### MVP (bản trình bày)

| Kỳ | Thời gian lịch sử | Nội dung | Giáo trình | Thời lượng |
|---|---|---|---|---|
| Kỳ 0 – Tìm đường | 1911–1920 | Các phong trào cũ thất bại, Bản yêu sách, Luận cương Lênin, Đại hội Tours | tr.43–52 | ~6 phút |
| Kỳ 1 – Chuẩn bị | 1921–1929 | Quảng Châu, Hội VN Cách mạng Thanh niên, *Đường cách mệnh*, vô sản hóa, ba tổ chức cộng sản | tr.52–61 | ~5 phút |
| Kỳ 2 – Thành lập Đảng | 6/1–7/2/1930 | Hội nghị hợp nhất, Cương lĩnh chính trị đầu tiên, ý nghĩa | tr.61–71 | ~7 phút |
| Câu hỏi củng cố | — | 6 câu trắc nghiệm | — | ~2 phút |

Tổng: khoảng 20 phút, 7 lựa chọn quan trọng.

### Mở rộng (sau MVP)

Kỳ 3 (1930–1945), Kỳ 4 (1945–1975), Kỳ 5 (1975–nay) theo cùng khuôn. Không làm trong 10 phase này.

## 5. Vòng chơi

1. Đọc thoại và lời dẫn chuyện.
2. Gặp **lựa chọn**: 3 phương án, đúng một phương án khớp lịch sử.
3. Chọn đúng → lịch sử diễn ra như thật, hộp kiến thức hiện ra, có thể mở khoá tư liệu.
4. Chọn sai → một CG "lịch sử giả định" + hộp kiến thức giải thích vì sao sai, rồi quay lại chọn. Chọn sai tốn thêm khoảng 30 giây.
5. Cuối chương: 6 câu hỏi củng cố, màn tổng kết số lựa chọn đúng ngay lần đầu và bộ sưu tập tư liệu.

## 6. Nguồn kịch bản

Kịch bản đầy đủ của Kỳ 0–2 nằm trong tài liệu "Hành Trình Đỏ – Kịch bản Visual Novel (Chương 1: 1911–1930)" và đã được chép vào `content/ky-0.md`, `ky-1.md`, `ky-2.md` theo template.
