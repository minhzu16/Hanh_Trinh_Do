# Đặc tả cấu trúc truyện

> Trạng thái: ĐÃ CHỐT CẤU TRÚC VÀ KỊCH BẢN (P0 & P4) — Cấu trúc chương hồi, 15 cảnh và 7 lựa chọn đã thống nhất; danh sách nhân sự thực tế chờ nhóm điền vào 01-todo.md.

File này là nguồn của schema (`data/schema/`), template (`content/templates/`) và prompt P1. Sửa file này thì rà lại ba thứ đó trong cùng một commit.

## 1. Cấp bậc

```
Chương (MVP: chỉ Chương 1)
└── Kỳ (k0, k1, k2)            ← chapters.json
    └── Cảnh (k0-c1 …)          ← scenes.json
        └── Nút (thoại, lời dẫn, lựa chọn, hộp kiến thức…)
```

Game chạy tuần tự: hết nút của cảnh thì sang cảnh kế tiếp trong `chapters[].scenes`, hết cảnh của kỳ thì sang kỳ kế tiếp, hết kỳ cuối thì sang câu hỏi củng cố (`quiz.json`) và màn tổng kết.

## 2. Kỳ (`chapters.json`)

| Trường | Kiểu | Bắt buộc | Ý nghĩa |
|---|---|---|---|
| `id` | mã `k<số>` | có | |
| `title` | chuỗi | có | "Kỳ 0 – Tìm đường" |
| `period` | chuỗi | có | "1911–1920" |
| `goal` | chuỗi | có | Mục tiêu học tập, hiện ở màn mở kỳ |
| `pages` | chuỗi | có | Trang giáo trình, ví dụ "43–52" |
| `minutes_target` | số | có | Thời lượng mong muốn (phút) |
| `scenes` | mảng mã cảnh | có, ≥ 1 | Thứ tự cảnh |

## 3. Cảnh (`scenes.json`)

| Trường | Kiểu | Bắt buộc | Ý nghĩa |
|---|---|---|---|
| `id` | mã `k<kỳ>-c<số>` | có | |
| `chapter` | mã kỳ | có | Phải khớp kỳ chứa cảnh |
| `title` | chuỗi | có | "Trên boong tàu, năm 1911" |
| `bg` | mã asset `bg-…` | có | Hình nền |
| `bgm` | mã asset `bgm-…` | không | Nhạc nền |
| `nodes` | mảng nút | có, ≥ 1 | |

## 4. Nút

Mỗi nút có trường `type`. Các loại:

| `type` | Trường khác | Ghi chú |
|---|---|---|
| `narration` | `text`, `sources`? | Lời dẫn chuyện. Lời dẫn nêu mốc, số liệu nên ghi `sources` để người kiểm biết lấy từ đâu |
| `line` | `speaker`, `text`, `source`? | Lời thoại. **Nếu `speaker` là nhân vật `historical` thì bắt buộc có `source`, và nguồn đó phải có `kind: "quote"`** |
| `thought` | `text` | Độc thoại nội tâm của Minh, hiện chữ nghiêng |
| `cg` | `asset`, `caption`? | Ảnh minh hoạ toàn màn hình, mã `cg-…` |
| `knowledge` | `sources` (mảng mã), `text` | Hộp "Kiến thức giáo trình". Số trang lấy từ nguồn, không gõ tay |
| `unlock` | `item` | Mở khoá tư liệu, mã `tl-…` |
| `timeline` | `items`: mảng `{date, text}` | Bảng mốc thời gian |
| `cards` | `items`: mảng `{title, text, source}` | Thẻ lật, không có lựa chọn sai |
| `choice` | `id`, `prompt`, `options` | Xem mục 5 |
| `retry` | — | Chỉ dùng ở cuối phương án sai: quay lại nút `choice` chứa nó |

## 5. Lựa chọn

```json
{
  "type": "choice",
  "id": "k0-l1",
  "prompt": "Con đường cứu nước",
  "options": [
    { "key": "A", "text": "…", "correct": false, "nodes": [ …, { "type": "retry" } ] },
    { "key": "B", "text": "…", "correct": false, "nodes": [ …, { "type": "retry" } ] },
    { "key": "C", "text": "…", "correct": true,  "nodes": [ … ] }
  ]
}
```

Luật (validate tầng 3 kiểm tra):

1. Đúng 3 phương án, khoá `A`, `B`, `C`.
2. **Đúng một** phương án `correct: true`.
3. Phương án đúng có ít nhất một nút `knowledge` và **không** có `retry`.
4. Phương án sai có ít nhất một nút `knowledge`, và **nút cuối cùng là `retry`**.
5. Không lồng `choice` trong `choice`.
6. Mã lựa chọn không trùng trong toàn game.

## 6. Nhân vật (`characters.json`)

| Trường | Kiểu | Ghi chú |
|---|---|---|
| `id` | kebab-case | |
| `name` | chuỗi | Tên hiển thị |
| `kind` | `fictional` \| `historical` \| `system` | `system` dùng cho `narrator` |
| `description` | chuỗi | |
| `sprites` | mảng tâm trạng | `binh-thuong`, `vui`, `lo-lang`, `quyet-tam`… Nhân vật `system` để mảng rỗng |

## 7. Nguồn (`sources.json`)

| Trường | Kiểu | Ghi chú |
|---|---|---|
| `id` | `GT-<trang>-<TÊN>` | Ví dụ `GT-50-HAI-GIONG-NGUOI` |
| `pages` | chuỗi | `"50"` hoặc `"49–50"` |
| `kind` | `quote` \| `fact` | `quote` = câu trích nguyên văn trong giáo trình |
| `text` | chuỗi | Nguyên văn (với `quote`) hoặc tóm tắt sự kiện (với `fact`) |

Mọi nguồn trong `sources.json` phải có dòng tương ứng trong `docs/04-sources.md`.

## 8. Điểm và tổng kết

- Mỗi lựa chọn ghi `dung_ngay` (đúng ngay lần đầu) hoặc `chon_lai` (đã chọn sai ít nhất một lần).
- Màn tổng kết hiện: số lựa chọn đúng ngay lần đầu trên tổng số lựa chọn, số câu hỏi củng cố đúng trên 6, và số tư liệu đã mở trên tổng số.
- Xếp loại theo số lựa chọn đúng ngay lần đầu: 7/7 "Người đi cùng lịch sử", 5–6 "Người học trò chăm chỉ", dưới 5 "Người đang tìm đường". Không có kết cục "thua".

## 9. Các quyết định đã chốt nghiệm thu (P0 & P4)

1. **Bỏ qua nhánh sai**: **Đã chốt.** Người chơi xem giải thích kiến thức chuẩn từ giáo trình trong hộp `knowledge`, sau đó nhấn tiếp tục để quay lại nhánh chọn nhằm củng cố nhận thức mà không bị bế tắc mạch chơi.
2. **Câu hỏi củng cố (Quiz)**: **Đã chốt.** Không cho chọn lại ngay trong lượt thi để đảm bảo tính khách quan của kết quả đánh giá. Tại màn tổng kết, hệ thống giải thích đáp án kèm số trang giáo trình và hiển thị nút "Ôn lại cảnh này" nhảy trực tiếp về cảnh có câu trả lời sai nhiều nhất.
3. **Lưu tiến độ**: **Đã chốt.** Tiến độ được tự động lưu vào `localStorage` kèm `SAVE_SCHEMA_VERSION = 2` và hàm chuyển đổi tương thích ngược (migration). Cung cấp nút "Chơi lại từ đầu" và menu chọn cảnh (`?canh=...`) phục vụ kiểm thử và báo cáo.

## 10. Bảng phân vai nhân vật (Casting)

| Mã ID | Tên hiển thị | Loại (`kind`) | Bối cảnh xuất hiện & Vai trò kịch bản | Biểu cảm (`sprites`) | Nguyên tắc lịch sử |
|---|---|---|---|---|---|
| `minh` | Minh | `fictional` | Nhân vật chính (quê Nghệ An, sinh ~1895). Xuất hiện xuyên suốt Kỳ 0, 1, 2: từ phụ bếp trên tàu Amiral Latouche-Tréville, thợ ảnh ngõ Compoint (Paris), học viên lớp Quảng Châu, đến người bảo vệ/liên lạc tại Hương Cảng 1930. | `binh-thuong`, `vui`, `lo-lang`, `quyet-tam` | Hư cấu nhưng phản ánh hành trình tiêu biểu của thanh niên yêu nước theo chân Nguyễn Ái Quốc. |
| `lan` | Lan | `fictional` | Nữ sinh Hà Nội yêu nước. Xuất hiện ở Kỳ 1 & Kỳ 2: học viên lớp huấn luyện chính trị Quảng Châu, tham gia phong trào "vô sản hóa", đảng viên Đông Dương Cộng sản Đảng. | `binh-thuong`, `vui`, `lo-lang`, `quyet-tam` | Đại diện cho thế hệ thanh niên trí thức dấn thân vào phong trào công nhân. |
| `bac-tu` | Bác Tư | `fictional` | Thợ máy lớn tuổi trên tàu Latouche-Tréville (Kỳ 0 - Cảnh 1). | `binh-thuong`, `vui` | Nhân vật phụ đại diện cho người lao động bình dân Nam Kỳ giàu nghĩa khí. |
| `ban-tho-anh` | Bạn thợ ảnh | `fictional` | Bạn cùng làm thợ ảnh với Minh và Nguyễn Ái Quốc tại Paris năm 1919 (Kỳ 0 - Cảnh 3). | `binh-thuong`, `lo-lang` | Góp phần thể hiện đời sống gian khổ của người Việt lao động tại Pháp. |
| `tho-viet-kieu` | Thợ Việt kiều | `fictional` | Nhóm thợ Việt kiều bên ngoài hành lang Đại hội Tours tháng 12/1920 (Kỳ 0 - Cảnh 4). | `binh-thuong` | Thể hiện sự ngóng trông, phấn khởi của kiều bào trước ngã rẽ lịch sử. |
| `nguyen-ai-quoc` | Nguyễn Ái Quốc | `historical` | Lãnh tụ cách mạng. Xuất hiện tại Paris (Kỳ 0), Quảng Châu (Kỳ 1), Hương Cảng (Kỳ 2). | `binh-thuong` | **Tuân thủ tuyệt đối**: Mọi phát ngôn đều bắt buộc trích nguyên văn từ giáo trình với mã `GT-` (`kind: "quote"`). Không hư cấu lời thoại. |
| `narrator` | Dẫn chuyện | `system` | Người kể chuyện ngôi thứ ba khách quan, dẫn dắt bối cảnh lịch sử và kết nối các giai đoạn. | *(Không có)* | Khách quan, trung thực với tư liệu giáo trình Lịch sử Đảng. |

## 11. Danh mục mã chính thức

### Kỳ

| Mã | Tên |
|---|---|
| `k0` | Kỳ 0 – Tìm đường |
| `k1` | Kỳ 1 – Chuẩn bị |
| `k2` | Kỳ 2 – Thành lập Đảng |

### Lựa chọn trong MVP (7)

| Mã | Cảnh | Nội dung | Phương án đúng |
|---|---|---|---|
| `k0-l1` | `k0-c1` | Con đường cứu nước | C |
| `k0-l2` | `k0-c4` | Quốc tế nào? | A |
| `k1-l1` | `k1-c2` | Lực lượng cách mạng | B |
| `k1-l2` | `k1-c3` | Điều kiện để cách mạng thành công | A |
| `k2-l1` | `k2-c1` | Việc đầu tiên của hội nghị | A |
| `k2-l2` | `k2-c2` | Nhiệm vụ chủ yếu trước mắt | A |
| `k2-l3` | `k2-c3` | Lực lượng cách mạng trong Sách lược | B |

### Nhân vật

`minh`, `lan`, `bac-tu`, `ban-tho-anh`, `tho-viet-kieu` (hư cấu) · `nguyen-ai-quoc` (lịch sử) · `narrator` (hệ thống).
