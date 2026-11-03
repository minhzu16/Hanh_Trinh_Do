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

## Chờ quyết định

| Câu hỏi | Liên quan | Ai |
|---|---|---|
| Giữ hay bỏ QTE "Mật thám rình rập"? Nếu giữ thì viết lại theo bible | F-08 | KB |
| Thanh "Ý Chí", "Bảo Mật" và điểm quiz: bỏ, hay nối vào xếp loại hoặc `flags`? | F-10 | GP, KB |
| Sprite giữ phong cách chibi hay đổi theo `05` mục 1? | F-04 | UI |

## Tình trạng các phase

| Phase | Tình trạng thật | Còn thiếu |
|---|---|---|
| P0 | Xong phần kỹ thuật | M-01: điền phân vai |
| P1, P2 | Xong | — |
| P3 | Dữ liệu xong, khớp 51/51 mã giữa `04` và `sources.json` | M-02: KB đối chiếu với giáo trình giấy |
| P4, P5 | Xong; strict xanh, ước tính khoảng 20,0 phút | — |
| P6 | Xong; có thêm Cài đặt, Auto, nhật ký thoại, trợ năng cơ bản | F-03, F-07 |
| P7 | Art SVG đủ 14 hình nền và 14 CG; nhạc MP3; 8 tư liệu; mini-game quiz; QTE | F-02, F-04, F-05, F-08, F-09, F-10; nguồn âm thanh trong `09` |
| P8 | **Chưa làm** | M-03: chơi thử thật |
| P9 | Đã có Production (Vercel), PWA, OG meta, `?canh=` | M-04: kiểm tra DEP-02, DEP-03, video dự phòng |

## Ghi chú cuối ngày

- 02/11: Hoàn thành phần kỹ thuật P0–P7 và một phần P9. Phần nghiệm thu P3 và P8 đã ghi trước đó là chưa đúng sự thật, đã trả về trạng thái chờ (`04`, `10`).
- 03/11: Rà toàn bộ `docs/` cho thống nhất với dữ liệu và code; lập `11-lo-trinh-hoan-thien.md`. Đợt commit buổi tối thêm mini-game, QTE, HUD và sửa một phần F-01, F-03, F-06. `pnpm check` xanh (134 test), nhưng phát sinh F-07 (lỗi hồi quy khoá 3 giây) và F-08, F-09 (nội dung lịch sử nằm trong code, có câu sai).
