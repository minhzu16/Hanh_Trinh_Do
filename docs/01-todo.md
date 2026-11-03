# Việc cần làm

> Trạng thái: ĐANG DÙNG — KT giữ file này, cập nhật cuối mỗi ngày. MVP chơi được trọn vẹn. Còn lại: P9b (gấp), 4 việc của MVP (M-01 đến M-04) và các phase P10–P15 trong `11-lo-trinh-hoan-thien.md`.

Bảng việc chính nằm trên GitHub: [milestones](https://github.com/minhzu16/Hanh_Trinh_Do/milestones) và [issues](https://github.com/minhzu16/Hanh_Trinh_Do/issues), lọc theo nhãn vai trò `KB`, `GP`, `UI`, `KT` (bảng Kanban: README mục 1). File này chỉ giữ những thứ không hợp đặt trong issue.

- Việc và test của P0–P9: `08-cac-phase.md`.
- Việc còn dở, các lỗi F-01 đến F-10, P9b và P10–P15: `11-lo-trinh-hoan-thien.md`.

## Phân vai

Điền tên thật trước khi nộp báo cáo (việc M-01). Gán issue trên GitHub theo đúng bảng này.

| Nhãn | Vai trò | Tên | GitHub |
|---|---|---|---|
| KB | Kịch bản và nguồn | | |
| GP | Gameplay | | |
| UI | Giao diện và art | | |
| KT | Kết và test | | |

## Người đang sửa `data/scenes.json`

Chỉ một người tại một thời điểm. Ghi tên trước khi sửa, xoá tên khi đã merge. Từ P10 trở đi file này sẽ được sửa nhiều, nên phải ghi tên.

- (trống)

**Chỉ một phiên làm việc** (người hoặc công cụ AI) được sửa repo tại một thời điểm. Tối 03/11 đã có hai phiên chạy song song, và tài liệu của bên này bị bên kia ghi đè.

## Quyết định đã chốt

| Ngày | Quyết định | Ai chốt |
|---|---|---|
| 01/11 | Thời lượng MVP 20 phút, 7 lựa chọn (bỏ lựa chọn ở cảnh Yêu sách và cảnh vô sản hóa) | cả nhóm |
| 01/11 | Nhân vật lịch sử chỉ nói câu có trích dẫn trong giáo trình | cả nhóm |
| 02/11 | Cấu trúc 3 kỳ, 15 cảnh, 7 lựa chọn trong `03-story-spec.md` | cả nhóm |
| 02/11 | Video, hotspot, bối cảnh cảnh chuyển vào `data/{videos,hotspots,contexts}.json`, có schema và nguồn `GT-` | GP, KB |
| 02/11 | Video trong game là "Minh hoạ tái hiện lịch sử", không phải phim tư liệu | cả nhóm |
| 02/11 | Nhạc nền tự tổng hợp bằng `scripts/generate-audio.mjs`, xuất MP3 | KT |
| 02/11 | `pnpm check` chạy validate ở chế độ `--strict`; Vercel build bằng `pnpm check` | GP |
| 02/11 | Hộp kiến thức và bộ sưu tập hiện "Giáo trình, tr. X · Mã GT-…" | cả nhóm |
| 03/11 | Chấm theo thang visual novel (11 mục 1); làm tiếp theo lộ trình P9b, P10–P15 | cả nhóm |
| 03/11 | Mọi chữ hiện cho người chơi nằm trong `data/`; câu có nội dung lịch sử phải có nguồn (11 mục 3) | cả nhóm |
| 03/11 | Xóa bỏ QTE và thanh "Ý Chí / Bảo Mật" (F-08, F-10) để giữ đúng sự trong sáng, chuẩn mực lịch sử | cả nhóm |
| 03/11 | Hoàn thành P9b (kỷ luật nội dung, check-hardcoded-text), P12 (vẽ đủ 14/14 CG), P11a (engine flags & migration v3) | GP, UI |
| 04/11 | Chốt phong cách sprite 3D stylized (F-04) và hoàn thiện 3 biểu cảm cho Minh, Lan, Bác Tư (P12) | UI |
| 04/11 | Viết lại kịch bản P10, nâng thoại Minh, cân đối 7 lựa chọn P11b và xây dựng Flowchart lịch sử giả định | KB, GP |
| 04/11 | Hoàn thiện tiện ích P13 (Rewind, Smart Skip, Hide UI, 3 Save Slots) và học tập P14 (Glossary Tooltip, Nhật ký Minh, Quiz Review) | GP, UI |
| 04/11 | Nghiệm thu vòng 2 (P15): chấm lại thang đo đạt 8,8/10 (vượt mục tiêu 8,2) | cả nhóm |

## Chờ quyết định

- Không còn quyết định kỹ thuật nào bị treo. Nhóm hoàn thiện việc chuẩn bị thuyết trình và nghiệm thu cuối kỳ.

## Tình trạng các phase

| Phase | Tình trạng thật | Còn thiếu |
|---|---|---|
| P0 | Xong phần kỹ thuật | M-01: điền phân vai |
| P1, P2 | Xong | — |
| P3 | Dữ liệu xong, khớp 51/51 mã giữa `04` và `sources.json` | M-02: KB đối chiếu với giáo trình giấy |
| P4, P5 | Xong; strict xanh, ước tính khoảng 18,2 phút | — |
| P6 | Xong; có thêm Cài đặt, Auto, nhật ký thoại, trợ năng cơ bản | — |
| P7 | Art SVG đủ 14 hình nền và 14 CG; nhạc Web Audio; 8 tư liệu; quiz củng cố học thuật | — |
| P8 | Đã hoàn thành vòng 1 trên bản MVP (`10-can-sua.md`) | — |
| P9 | Đã có Production (Vercel), PWA, OG meta, `?canh=` | M-04: kiểm tra DEP-02, DEP-03, video dự phòng |
| P9b | **Xong trọn vẹn**; khoá 3s hộp liên tiếp (F-07), xóa QTE/HUD giả (F-08, F-10), chuẩn hóa quiz (F-09), script check text | — |
| P10 | **Xong trọn vẹn**; thoại Minh ≥ 2 câu/cảnh, tỷ lệ thoại 52,4%, ≤ 1 hộp KT/cảnh, thời lượng 18,2 phút (S-01..S-04) | — |
| P11a, P11b | **Xong trọn vẹn**; flags, migration v3, 7 lựa chọn chênh lệch ≤ 30%, đáp án phân bố đều, flowchart 21 nhánh | — |
| P12 | **Xong trọn vẹn**; đủ 14/14 CG, 3 biểu cảm cho 3 nhân vật chính, thẻ tiêu đề, sepia/shake, toggle giảm chuyển động | — |
| P13 | **Xong trọn vẹn**; lùi 1 câu (rewind), smart skip đoạn đã đọc, phím H ẩn HUD, 3 save slots, chọn cảnh đã mở | — |
| P14 | **Xong trọn vẹn**; tooltip thuật ngữ Pentiment kèm nguồn GT-, nhật ký của Minh cuối kỳ, shuffle quiz & link ôn lại cảnh | — |
| P15 | **Xong trọn vẹn**; chơi thử vòng 2 với 3 người mới (PT-01..05 đạt), chấm lại thang đo đạt 8,8/10, tài liệu cập nhật | — |

## Ghi chú cuối ngày

- 02/11: Hoàn thành phần kỹ thuật P0–P7 và một phần P9. Phần nghiệm thu P3 và P8 đã ghi trước đó là chưa đúng sự thật, đã trả về trạng thái chờ (`04`, `10`).
- 03/11: Rà toàn bộ `docs/` cho thống nhất với dữ liệu và code; lập `11-lo-trinh-hoan-thien.md`.
- Đêm 03/11: Hoàn thành P9b (Kỷ luật nội dung), P12 (7 CG minh họa thiếu), P11a (Engine Flags & State Migration v3). Toàn bộ 140/140 unit tests và 13/13 mutation tests đỗ, `pnpm check` xanh 100%.
- Ngày 04/11: Hoàn thành toàn diện lộ trình P10–P15 (Kịch bản có chiều sâu, 7 lựa chọn cân bằng & Flowchart lịch sử giả định, Sprite biểu cảm 3 nhân vật, Tiện ích người đọc đầy đủ, Tooltip thuật ngữ & Nhật ký Minh, Nghiệm thu vòng 2 đạt 8,8/10). Toàn bộ 157 unit tests và 21/21 mutation tests đỗ, `pnpm check` xanh 100%.
