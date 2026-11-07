# Đặc tả cấu trúc truyện

> Trạng thái: CHỐT BẢN 2 (HOÀN THIỆN) — cấu trúc 3 kỳ, 15 cảnh, 7 lựa chọn bước ngoặt lịch sử + 1 lựa chọn đời tư (P11), đã tích hợp toàn bộ flags/if, expression (P12) và flowchart lịch sử giả định.

File này là nguồn của schema (`data/schema/`), template (`content/templates/`) và prompt P1. Sửa file này thì rà lại ba thứ đó trong cùng một commit.

Dữ liệu gồm 12 file: 7 file nội dung chính (`chapters`, `scenes`, `characters`, `sources`, `collectibles`, `quiz`, `strings`; mục 2–8), 3 file bổ trợ cho cảnh (`videos`, `hotspots`, `contexts`; mục 12), cùng `glossary.json` và `journal.json`. Chữ hiện cho người chơi chỉ được lấy từ 12 file này, không viết thẳng trong `src/`.

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

1. Đúng 3 phương án, khoá `A`, `B`, `C` (với lựa chọn lịch sử mặc định).
2. **Đúng một** phương án `correct: true`.
3. Phương án đúng có ít nhất một nút `knowledge` và **không** có `retry`.
4. Phương án sai có ít nhất một nút `knowledge`, và **nút cuối cùng là `retry`**.
5. Không lồng `choice` trong `choice`.
6. Mã lựa chọn không trùng trong toàn game.

### Lựa chọn đời tư (`kind: "personal"`)

Bên cạnh 7 lựa chọn lịch sử có phương án đúng/sai, game có lựa chọn đời tư ở cuối Kỳ 1 (`k1-l-doi-tu`):
- Khai báo `"kind": "personal"`.
- Phương án gồm 2 lựa chọn (`A`, `B`), không có đáp án đúng/sai (`correct: true` cho cả 2), không có `retry` hay hộp `knowledge` bắt buộc.
- Ghi nhận `flags` (`k1-l-doi-tu:A` hoặc `k1-l-doi-tu:B`) để dẫn tới các câu thoại điều kiện `if` ở `k2-c5` và hiển thị một dòng tổng kết ngã rẽ đời tư trên màn `SummaryScreen`.
- Không tính vào 7 lựa chọn lịch sử chấm điểm `dung_ngay` / `chon_lai`.

## 6. Nhân vật (`characters.json`)

| Trường | Kiểu | Ghi chú |
|---|---|---|
| `id` | kebab-case | |
| `name` | chuỗi | Tên hiển thị |
| `kind` | `fictional` \| `historical` \| `system` | `system` dùng cho `narrator` |
| `description` | chuỗi | |
| `sprites` | mảng tâm trạng | `binh-thuong`, `vui`, `lo-lang`, `quyet-tam`… Nhân vật `system` để mảng rỗng. Nút `line` dùng trường `expression` để chọn biểu cảm tương ứng (đã hoàn thành ở P12). |

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
- **Chưa đặc tả:** điểm cộng dồn trong quiz và hai thanh "Ý Chí", "Bảo Mật" trên màn chơi hiện không ảnh hưởng gì tới xếp loại. Phải chốt bỏ hay đặc tả vào mục này (F-10).

## 9. Các quyết định đã chốt (P0 & P4)

1. **Bỏ qua nhánh sai**: **Đã chốt: không cho bỏ qua.** Người chơi xem hết nhánh sai, kể cả hộp `knowledge` (nút "Hiểu rồi" chỉ hiện sau 3 giây, mỗi hộp đều phải đặt lại khoá này), rồi quay lại nút lựa chọn.
2. **Câu hỏi củng cố (Quiz)**: **Đã chốt.** Không cho chọn lại ngay trong lượt thi để đảm bảo tính khách quan của kết quả đánh giá. Tại màn tổng kết, hệ thống giải thích đáp án kèm số trang giáo trình và hiển thị nút "Ôn lại cảnh này" nhảy trực tiếp về cảnh có câu trả lời sai nhiều nhất.
3. **Lưu tiến độ**: **Đã chốt.** Tiến độ được tự động lưu vào `localStorage` kèm `SAVE_SCHEMA_VERSION = 2` và hàm chuyển đổi tương thích ngược (migration). Cung cấp nút "Chơi lại từ đầu" và menu chọn cảnh (`?canh=...`) phục vụ kiểm thử và báo cáo.

## 10. Bảng phân vai nhân vật (Casting)

| Mã ID | Tên hiển thị | Loại (`kind`) | Bối cảnh xuất hiện & Vai trò kịch bản | Biểu cảm (`sprites`) | Nguyên tắc lịch sử |
|---|---|---|---|---|---|
| `minh` | Minh | `fictional` | Nhân vật chính (quê Nghệ An, sinh ~1895). Xuất hiện xuyên suốt Kỳ 0, 1, 2: từ phụ bếp trên tàu Amiral Latouche-Tréville, thợ ảnh ngõ Compoint (Paris), học viên lớp Quảng Châu, đến người liên lạc bên ngoài Hội nghị hợp nhất ở Cửu Long (Hồng Kông) đầu năm 1930. | `binh-thuong`, `vui`, `lo-lang`, `quyet-tam` | Hư cấu nhưng phản ánh hành trình tiêu biểu của thanh niên yêu nước theo chân Nguyễn Ái Quốc. |
| `lan` | Lan | `fictional` | Nữ sinh Hà Nội yêu nước. Xuất hiện ở Kỳ 1 & Kỳ 2: học viên lớp huấn luyện chính trị Quảng Châu, tham gia phong trào "vô sản hóa", đảng viên Đông Dương Cộng sản Đảng. | `binh-thuong`, `vui`, `lo-lang`, `quyet-tam` | Đại diện cho thế hệ thanh niên trí thức dấn thân vào phong trào công nhân. |
| `bac-tu` | Bác Tư | `fictional` | Thợ máy người Nam Kỳ trên tàu Latouche-Tréville (Kỳ 0 - Cảnh 1) và thủy thủ tàu viễn dương đưa đón đoàn đại biểu tại Cửu Long (Kỳ 2 - Cảnh 1). | `binh-thuong`, `vui`, `lo-lang`, `quyet-tam` | Đại diện cho các bậc tiền bối Cần Vương, Đông Du; chuyển giao niềm tin cho thế hệ Minh và Lan. |
| `ban-tho-anh` | Bạn thợ ảnh | `fictional` | Bạn cùng làm thợ ảnh với Minh và Nguyễn Ái Quốc tại Paris năm 1919 (Kỳ 0 - Cảnh 3). | `binh-thuong`, `lo-lang` | Góp phần thể hiện đời sống gian khổ của người Việt lao động tại Pháp. |
| `tho-viet-kieu` | Thợ Việt kiều | `fictional` | Nhóm thợ Việt kiều bên ngoài hành lang Đại hội Tours tháng 12/1920 (Kỳ 0 - Cảnh 4). | `binh-thuong` | Thể hiện sự ngóng trông, phấn khởi của kiều bào trước ngã rẽ lịch sử. |
| `nguyen-ai-quoc` | Nguyễn Ái Quốc | `historical` | Lãnh tụ cách mạng. Xuất hiện tại Paris (Kỳ 0), Quảng Châu (Kỳ 1), Cửu Long, Hồng Kông (Kỳ 2). | `binh-thuong` | **Tuân thủ tuyệt đối**: Mọi phát ngôn đều bắt buộc trích nguyên văn từ giáo trình với mã `GT-` (`kind: "quote"`). Không hư cấu lời thoại. |
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
| `k1-l2` | `k1-c3` | Điều kiện để cách mạng thành công | C |
| `k2-l1` | `k2-c1` | Việc đầu tiên của hội nghị | B |
| `k2-l2` | `k2-c2` | Nhiệm vụ chủ yếu trước mắt | A |
| `k2-l3` | `k2-c3` | Lực lượng cách mạng trong Sách lược | C |

### Nhân vật

`minh`, `lan`, `bac-tu`, `ban-tho-anh`, `tho-viet-kieu` (hư cấu) · `nguyen-ai-quoc` (lịch sử) · `narrator` (hệ thống).

## 12. Dữ liệu bổ trợ cho cảnh

Ba file này được validate tầng 1 (schema) và tầng 2: `sceneId` phải là cảnh có thật, mọi mã trong `sources` phải có trong `sources.json`.

| File | Trường bắt buộc | Dùng ở đâu | Luật nội dung |
|---|---|---|---|
| `videos.json` | `id`, `sceneId`, `title`, `label`, `year`, `curriculumNote`, `duration`, `summary`, `description`, `historicalSignificance`, `sources`, `thumbnailColor` (`videoUrl` không bắt buộc) | Nút "Xem tư liệu" (phím V) | `label` luôn là "Minh hoạ tái hiện lịch sử" khi không có phim tư liệu thật có giấy phép. Không ghi tên kho lưu trữ khi chưa kiểm chứng |
| `hotspots.json` | `id` (`hs-…`), `sceneId`, `title`, `x`, `y` (phần trăm), `icon`, `description`, `historicalNote`, `sources` | Điểm khám phá trên hình nền | `historicalNote` chỉ nêu chi tiết có trong nguồn đã dẫn |
| `contexts.json` | `sceneId`, `location`, `time`, `subtitle`, `sources` | Dòng địa danh và thời gian đầu cảnh | `time` không chi tiết hơn nguồn (nguồn ghi "năm 1911" thì không ghi "tháng 6/1911") |

## 13. Tiến độ cập nhật Bản 2 (Đã hoàn thành toàn bộ)

Chi tiết và test: `11-lo-trinh-hoan-thien.md`. Tất cả các mục dưới đây đã được tích hợp đầy đủ vào code, schema và vượt qua bộ kiểm thử tự động.

| Thay đổi | Phase | Mục bị ảnh hưởng | Trạng thái |
|---|---|---|---|
| `GameState.flags` ghi lại lựa chọn (`k0-l1:A`); trường `if` trên nút `narration`, `line`, `thought` | P11 | 4, 5 | [x] Đã hoàn thành (E-19, E-20, B-05, V-26) |
| Lựa chọn đời tư `k1-l-doi-tu` không có đúng/sai, rẽ nhánh độc thoại ở `k2-c5` và thẻ tổng kết | P11 | 5, 8 | [x] Đã hoàn thành |
| Trường `expression` trên nút `line`, giá trị lấy từ `characters[].sprites` | P12 | 4, 6 | [x] Đã hoàn thành (A-04, A-05) |
| `glossary.json` (thuật ngữ kèm nguồn), nhật ký cuối kỳ | P14 | 1, 12 | [x] Đã hoàn thành |
| Chữ của mini-game quiz chuyển vào `quiz.json`; QTE đã xoá bỏ hoàn toàn | P9b | 12 | [x] Đã hoàn thành (V-28, V-29) |
