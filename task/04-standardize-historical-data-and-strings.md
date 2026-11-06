# Task 04: Chuẩn Hóa Địa Danh Lịch Sử Trong `glossary.json`, Khôi Phục `strings.json` & Bổ Sung Luật Validate

- **Mức độ ưu tiên:** 🟠 P1 (Quan trọng — Chuẩn mực dữ liệu lịch sử & quy ước `02-bible.md`)
- **Phụ trách đề xuất:** `KB` (Kịch bản & Nguồn) & `GP` (Gameplay)
- **Các file liên quan:**
  - `data/glossary.json` (dòng 210–222)
  - `data/strings.json` (dòng 13)
  - `scripts/validate-data.mjs`
  - `scripts/validate-data.test.mjs`

---

## 1. Mô Tả Vấn Đề & Nguyên Nhân Gốc Rễ

1. **Vi phạm quy ước địa danh tại `data/glossary.json` (dòng 217)**:
   - Tài liệu `docs/02-bible.md` (dòng 39) và `docs/11-lo-trinh-hoan-thien.md` (mục `F-08`, `F-09`) quy định nghiêm ngặt: **Không dùng từ `"Hương Cảng"`**, bắt buộc dùng **`"Cửu Long (Hồng Kông)"`** theo đúng trang 61 Giáo trình Lịch sử Đảng Cộng sản Việt Nam.
   - Dù `scenes.json` và `quiz.json` đã được sửa, mục từ `"hoi-nghi-hop-nhat"` tại `data/glossary.json` (dòng 217) vẫn còn sót:
     ```json
     "definition": "Hội nghị do đồng chí Nguyễn Ái Quốc chủ trì tại Cửu Long (Hương Cảng) từ ngày 6/1 đến 7/2/1930, thống nhất các tổ chức cộng sản thành lập Đảng Cộng sản Việt Nam và thông qua Cương lĩnh đầu tiên."
     ```
2. **Chuỗi giao diện bị rỗng tại `data/strings.json` (dòng 13)**:
   - Trong `data/strings.json`, khóa `"knowledge.pages"` đang có giá trị `""` (chuỗi rỗng), trong khi thiết kế gốc ở `content/ui-text.md` (dòng 20) quy định `"knowledge.pages": "Giáo trình, tr. {pages}"`.
3. **Chưa có luật tự động bắt từ `"Hương Cảng"` trong `scripts/validate-data.mjs`**:
   - Hiện tại `validate-data.mjs` chưa quét từ cấm `"Hương Cảng"` trên toàn bộ các file JSON trong `data/`, dẫn tới việc sót lỗi ở `glossary.json`.
4. **5 mã nguồn trong `data/sources.json` chưa được tham chiếu**:
   - Có 5 mã nguồn đã khai báo trong `data/sources.json` (`GT-61-BAO-CAO`, `GT-64-LOI-KEU-GOI`, `GT-65-XA-HOI-KINH-TE`, `GT-67-QUOC-TE`, `GT-67-VAI-TRO`) nhưng chưa được gắn vào bất kỳ mục nào trong `glossary.json`, `journal.json`, `scenes.json` hoặc `quiz.json`.

---

## 2. Hướng Dẫn Triển Khai Chi Tiết

### Bước 1: Sửa `data/glossary.json` và gắn nốt các nguồn còn thiếu
1. Tại `data/glossary.json` dòng 217 (`id: "hoi-nghi-hop-nhat"`), đổi `"Cửu Long (Hương Cảng)"` thành `"Cửu Long (Hồng Kông)"`.
2. Bổ sung các mã nguồn liên quan (`GT-61-BAO-CAO`, `GT-64-LOI-KEU-GOI`, `GT-65-XA-HOI-KINH-TE`, `GT-67-QUOC-TE`, `GT-67-VAI-TRO`) vào mảng `sources` của các thuật ngữ tương ứng trong `data/glossary.json` hoặc `data/journal.json` để đạt độ phủ 51/51 (100%) nguồn giáo trình được sử dụng trong game.

### Bước 2: Khôi phục `"knowledge.pages"` trong `data/strings.json`
Tại `data/strings.json` dòng 13:
```json
"knowledge.pages": "Giáo trình, tr. {pages}",
```
Đồng thời trong `scripts/validate-data.mjs` (Tầng 1), kiểm tra các giá trị trong `strings.json` phải có `minLength: 1` (không chấp nhận chuỗi rỗng `""`).

### Bước 3: Thêm luật kiểm tra thuật ngữ chuẩn Bible vào `scripts/validate-data.mjs`
1. Trong `scripts/validate-data.mjs` (Tầng 2 hoặc Tầng 3), quét toàn bộ chuỗi văn bản trong 12 file `data/*.json`: nếu phát hiện chuỗi `"Hương Cảng"` (không phân biệt hoa thường), báo lỗi đỏ kèm thông báo: `"Vi phạm 02-bible.md: Dùng 'Cửu Long (Hồng Kông)' thay cho 'Hương Cảng'"`.
2. Thêm 1 test đột biến mới (`V-34`) vào `scripts/validate-data.test.mjs` để xác nhận validator báo đỏ khi chèn chữ `"Hương Cảng"` vào dữ liệu.

---

## 3. Tiêu Chí Nghiệm Thu (Acceptance Criteria)

- [ ] Toàn bộ thư mục `data/` và `content/` không còn bất kỳ chữ `"Hương Cảng"` nào.
- [ ] `data/strings.json` không còn khóa nào mang giá trị rỗng `""`.
- [ ] Cả 51/51 mã nguồn trong `data/sources.json` đều được tham chiếu ít nhất 1 lần trong dữ liệu game.
- [ ] Test đột biến `V-34` trong `scripts/validate-data.test.mjs` chạy xanh.
- [ ] Chạy `pnpm check` xanh 100%.

