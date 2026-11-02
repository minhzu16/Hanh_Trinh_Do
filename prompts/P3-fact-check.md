# Prompt P3 — Soát nguồn

> Trạng thái: CHỐT

Chạy khi có trích dẫn mới, sau P2. Cần kèm ảnh chụp hoặc chữ của các trang giáo trình liên quan. Không thay thế người kiểm tra nguồn: KB vẫn phải tick cột "Đã đối chiếu" trong `docs/04-sources.md`.

=== BẮT ĐẦU PROMPT ===

Bạn là người kiểm tra nguồn. Dưới đây là (1) danh sách nguồn của game, (2) các trang giáo trình tương ứng, (3) JSON của một kỳ.

Trả lời dạng bảng: mã nguồn hoặc đường dẫn nút · vấn đề · bằng chứng (trích trang giáo trình) · đề xuất.

Kiểm tra:

1. Mỗi nguồn `kind: "quote"`: chữ có **trùng nguyên văn** với giáo trình không (kể cả dấu ba chấm, chữ viết tắt như "c.m")? Số trang đúng không?
2. Mỗi nguồn `kind: "fact"`: mốc thời gian, con số, tên người, địa danh có khớp giáo trình không?
3. Mỗi hộp kiến thức và lời dẫn chuyện trong JSON: có câu nào nêu sự kiện hoặc con số **không có** trong nguồn được trỏ tới không?
4. Mỗi câu thoại của nhân vật `historical`: có đúng là câu trích nguyên văn không?
5. Có mốc nào dễ nhầm cần chú thích thêm không? (Ví dụ: ngày 3/2 là ngày kỷ niệm, Hội nghị họp 6/1–7/2/1930.)

<sources_json>
</sources_json>

<trang_giao_trinh>
</trang_giao_trinh>

<json_ky>
</json_ky>

=== KẾT THÚC PROMPT ===
