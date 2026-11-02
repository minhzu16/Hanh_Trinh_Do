# Prompt P2 — Soát logic nhánh

> Trạng thái: CHỐT

Chạy sau P1 và sau khi validate xanh. Script đã kiểm luật cứng (đúng một phương án đúng, phương án sai kết thúc bằng retry…). P2 bắt những lỗi script không thấy được. Không thay thế người đọc lại.

=== BẮT ĐẦU PROMPT ===

Bạn là người soát kịch bản cho một game visual novel học Lịch sử Đảng. Đọc phần JSON của một kỳ dưới đây cùng các nguồn trích kèm theo, và trả lời **dạng bảng**: mã cảnh/lựa chọn · vấn đề · đề xuất sửa. Không viết lại kịch bản.

Kiểm tra:

1. **Phương án đúng có thật sự đúng theo nguồn không?** Đối chiếu chữ của phương án đúng với `sources` trong hộp kiến thức của nó.
2. **Phương án sai có sai rõ ràng không?** Có phương án sai nào thực ra cũng đúng một phần, khiến người chơi giỏi bị phạt oan không?
3. **Lời thoại trước lựa chọn có lộ đáp án quá rõ không?** Ví dụ câu hỏi chép gần nguyên văn phương án đúng.
4. **Hộp kiến thức của nhánh sai có giải thích vì sao sai không**, hay chỉ nhắc lại sự kiện?
5. **Nhánh sai có bôi nhọ nhân vật hay phong trào có thật không?** (00-idea nguyên tắc 3)
6. **Mạch truyện**: Minh có xuất hiện ở nơi, thời điểm hợp lý không? Có cảnh nào Minh thay đổi sự kiện thật không?
7. **Độ dài**: cảnh nào có hơn 8 nút thoại liền nhau không có tương tác?

<json_ky>
</json_ky>

<sources_json>
</sources_json>

=== KẾT THÚC PROMPT ===
