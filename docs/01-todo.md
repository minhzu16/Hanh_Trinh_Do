# Việc cần làm

> Trạng thái: ĐANG DÙNG — KT giữ file này, cập nhật cuối mỗi ngày

Bảng việc chính nằm trên GitHub: [milestones P0–P9](https://github.com/minhzu16/Hanh_Trinh_Do/milestones) và [issues](https://github.com/minhzu16/Hanh_Trinh_Do/issues), lọc theo nhãn vai trò `KB`, `GP`, `UI`, `KT` (bảng Kanban: README mục 1). File này chỉ giữ những thứ không hợp đặt trong issue. Chi tiết từng việc và mã test: `docs/08-cac-phase.md`.

## Phân vai

Điền tên trước khi bắt đầu P1. Gán issue trên GitHub theo đúng bảng này.

| Nhãn | Vai trò | Tên | GitHub |
|---|---|---|---|
| KB | Kịch bản và nguồn | | |
| GP | Gameplay | | |
| UI | Giao diện và art | | |
| KT | Kết và test | | |

## Người đang sửa `data/scenes.json`

Chỉ một người tại một thời điểm. Ghi tên trước khi sửa, xoá tên khi đã merge.

- (trống)

## Quyết định đã chốt

| Ngày | Quyết định | Ai chốt |
|---|---|---|
| 01/11 | Thời lượng MVP 20 phút, 7 lựa chọn (bỏ lựa chọn ở cảnh Yêu sách và cảnh vô sản hóa) | cả nhóm |
| 01/11 | Nhân vật lịch sử chỉ nói câu có trích dẫn trong giáo trình | cả nhóm |

## Ghi chú cuối ngày

- 02/11: Hoàn thành toàn diện các phase P0, P1, P2, P3, P4, P5, P6:
  - P0: Spec, schema, validate 3 tầng, 10 test đột biến xanh 100%.
  - P3: Chuyển dữ liệu nền strings.json, collectibles.json (8 tư liệu), quiz.json (6 câu).
  - P4: Chuyển toàn bộ kịch bản Kỳ 0–2 sang chapters.json và scenes.json (15 cảnh, 7 lựa chọn). Validate strict đạt 7/7 file xanh, 0 cảnh báo, thời lượng ước tính ~20.1 phút.
  - P1: Dựng khung Vite + React 19 + TypeScript + Tailwind v4 + Vitest.
  - P2: Cài đặt hoàn chỉnh Engine (types.ts, step.ts, save.ts, summary.ts) kèm 10 unit test (E-01 đến E-10).
  - P5: Viết và kiểm thử 4 bot tự động (B-01 đến B-04), chứng minh mọi nhánh và 21 phương án đi được đến kết thúc không kẹt.
  - P6: Hoàn thiện toàn bộ các màn hình giao diện: Menu, Scene, Quiz, Summary, Collection, kèm component test (UI-01 đến UI-03).
  - Lệnh kiểm tra tổng pnpm check chạy xanh hoàn hảo (validate + test:data + vitest + build).