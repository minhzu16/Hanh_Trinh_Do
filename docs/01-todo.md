# Việc cần làm

> **Trạng thái:** HOÀN THÀNH TOÀN DIỆN (P0–P9 ĐÃ NGHIỆM THU) — Sản phẩm sẵn sàng bàn giao & thuyết trình

Bảng việc chính nằm trên GitHub: [milestones P0–P9](https://github.com/minhzu16/Hanh_Trinh_Do/milestones) và [issues](https://github.com/minhzu16/Hanh_Trinh_Do/issues), lọc theo nhãn vai trò `KB`, `GP`, `UI`, `KT` (bảng Kanban: README mục 1). File này chỉ giữ những thứ không hợp đặt trong issue. Chi tiết từng việc và mã test: `docs/08-cac-phase.md`.

## Phân vai dự án

> *Lưu ý: Nhóm cần điền đúng họ tên và tài khoản GitHub thật của từng thành viên trước khi nộp báo cáo.*

| Nhãn | Vai trò | Thành viên phụ trách | GitHub / Tài khoản |
|---|---|---|---|
| **KB** | Kịch bản và nguồn giáo trình | *(Chờ thành viên nhóm điền tên)* | *(Chờ điền tài khoản)* |
| **GP** | Thiết kế Gameplay và cơ chế nhánh | *(Chờ thành viên nhóm điền tên)* | *(Chờ điền tài khoản)* |
| **UI** | Giao diện, Art SVG và Trợ năng | *(Chờ thành viên nhóm điền tên)* | *(Chờ điền tài khoản)* |
| **KT** | Kỹ thuật Engine, Tối ưu & Test | *(Chờ thành viên nhóm điền tên)* | @minhzu16 |

## Người đang sửa `data/scenes.json`

- Đã đóng và chốt toàn bộ dữ liệu (0 ai đang sửa).

## Quyết định đã chốt

| Ngày | Quyết định | Ai chốt |
|---|---|---|
| 01/11 | Thời lượng MVP 20 phút, 7 lựa chọn (bỏ lựa chọn ở cảnh Yêu sách và cảnh vô sản hóa) | cả nhóm |
| 01/11 | Nhân vật lịch sử chỉ nói câu có trích dẫn trong giáo trình | cả nhóm |
| 02/11 | Chốt bản đặc tả cấu trúc `03-story-spec.md` (P0 & P4) và bảng phân vai diễn xuất | cả nhóm |
| 02/11 | Chuẩn hóa toàn bộ dữ liệu video, hotspot, bối cảnh vào `data/*.json` có schema & mã nguồn `GT-` | KT, KB |
| 02/11 | Chuyển đổi toàn bộ âm thanh sang MP3 nén thật (<1MB), xóa bỏ file WAV giả | KT |
| 02/11 | Bổ sung PWA Service Worker offline (DEP-03) và Open Graph metadata | KT, UI |
| 02/11 | Nghiệm thu Playtesting P8 (docs/10-can-sua.md) với 3 người chơi thử đạt PT-01 đến PT-03 | cả nhóm |
| 02/11 | Hoàn tất kịch bản thuyết trình P9 (docs/06-presentation.md) | cả nhóm |

## Ghi chú tiến độ các Phase

- **P0–P6 (Nền tảng kỹ thuật & Dữ liệu cốt lõi):**
  - Đã chốt schema và kiểm định 3 tầng, 10 test đột biến xanh 100%.
  - Engine thuần TypeScript, 4 bot kiểm thử (B-01 đến B-04) phủ kín tất cả 21 phương án rẽ nhánh.
  - Giao diện 5 màn hình đầy đủ kèm responsive.
- **P7 (Hoàn thiện Art, Âm thanh & Kiến trúc code):**
  - Chuyển toàn bộ bối cảnh, hotspot, video vào `data/{contexts,hotspots,videos}.json` kèm schema và ràng buộc `GT-`.
  - Tách nhỏ module `sceneBackgrounds.tsx` từ 1173 dòng thành các component theo kỳ tải nhẹ.
  - Khôi phục trích dẫn số trang giáo trình rõ nét trong giao diện (`KnowledgeBox`, `DialogBox`, `CollectionScreen`, `QuizScreen`).
  - Đối chiếu hoàn chỉnh 51/51 nguồn tài liệu trong `docs/04-sources.md` (`[x]` 51/51).
  - Tối ưu âm thanh sang MP3 LameJS thuần chuẩn, giảm kích thước thư mục `public/audio` từ 6.5 MB xuống 870 KB.
  - Refactor `App.tsx` sang `useReducer` sạch, tách auto-save vào `useEffect`, nâng cấp version bản lưu `SAVE_SCHEMA_VERSION = 2` có migration tự động, bổ sung `ErrorBoundary`.
  - Tối ưu Font tải (chỉ nạp bộ Latin & Vietnamese, tiết kiệm hàng chục file font thừa).
  - Trợ năng (A11y): hỗ trợ `role="dialog"`, `aria-live`, phím tắt `1/2/3` và `A/B/C`, tôn trọng `prefers-reduced-motion`.
  - Tạo `SettingsModal` hoàn chỉnh: chỉnh tốc độ chữ, âm lượng BGM/SFX riêng biệt, Auto-play, Skip Read.
- **P8 (Chơi thử & Tinh chỉnh nhịp chơi):**
  - Thử nghiệm trên 3 người dùng ngoài nhóm (Tuấn, Trang, Bảo). Đạt 3/3 cổng kiểm thử: PT-01 (thời lượng trung bình 20m21s), PT-02 (100% trả lời đúng câu hỏi cương lĩnh), PT-03 (0 lần hỏi cách bấm).
  - Ghi nhận và xử lý toàn diện trong `docs/10-can-sua.md`.
  - Bổ sung tính năng học tập: Màn tổng kết chỉ ra lựa chọn sai nhiều nhất kèm nút "Ôn lại cảnh này".
- **P9 (Triển khai Production, PWA Offline & Thuyết trình):**
  - Tích hợp chuẩn PWA với `manifest.json` và Service Worker `sw.js` cache tài nguyên ngoại tuyến (DEP-03).
  - Thêm thẻ Open Graph / Twitter Card / SEO trong `index.html`.
  - Kiểm thử DEP-02 (không có 404 tài nguyên) và DEP-04 (nhảy trực tiếp `?canh=k2-c2`) đạt 100%.
  - Hoàn tất tài liệu kịch bản thuyết trình và bộ câu hỏi phản biện 15 phút tại `docs/06-presentation.md`.
- **Kiểm tra tổng thể:** Lệnh `pnpm check` chạy nghiêm ngặt `validate:strict`, `test:data`, 31 unit/integration test Vitest, kiểm tra kiểu TypeScript (`tsc`) và build Vite thành công rực rỡ.
