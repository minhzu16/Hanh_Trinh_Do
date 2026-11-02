# Đặc tả cấu trúc truyện

> Trạng thái: CHỐT BẢN 1 — chờ nhóm duyệt mục 9 trước khi bắt đầu P4

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

## 9. Câu hỏi cần chốt trước P4

1. Có cho người chơi **bỏ qua** nhánh sai (bấm "Hiểu rồi" để về ngay lựa chọn) không? Đề xuất: có, sau khi hộp kiến thức hiện ít nhất 3 giây.
2. Câu hỏi củng cố có cho làm lại không? Đề xuất: không, để điểm tổng kết có ý nghĩa.
3. Có lưu tiến độ giữa các lần mở game không? Đề xuất: lưu kỳ đang chơi vào `localStorage`, có nút "Chơi lại từ đầu".

## 10. Danh mục mã chính thức

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
