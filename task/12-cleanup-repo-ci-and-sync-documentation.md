# Task 12: Dọn Dẹp Repo, Tối Ưu GitHub Actions CI & Đồng Bộ Hóa Toàn Bộ Tài Liệu (`docs/` & `README.md`)

- **Mức độ ưu tiên:** 🟢 P3 (Hoàn thiện — Sạch sẽ mã nguồn, tối ưu CI/CD và đồng bộ tài liệu nộp báo cáo)
- **Phụ trách đề xuất:** Cả nhóm (`KB`, `GP`, `UI`, `KT`)
- **Các file liên quan:**
  - `plan_audio_voiceover.md` *(xóa bỏ)*
  - `package.json` (dòng 25–41)
  - `.github/workflows/check.yml` (dòng 1–16)
  - `.gitignore`
  - `README.md` (dòng 9, 65–77)
  - `docs/03-story-spec.md` (dòng 7, 153–158)
  - `docs/01-todo.md` (dòng 14–19 — mục `M-01`)

---

## 1. Mô Tả Vấn Đề & Nguyên Nhân Gốc Rễ

1. **File rác ở thư mục gốc (`plan_audio_voiceover.md`)**:
   - File `plan_audio_voiceover.md` đang được Git theo dõi (`git ls-files`) nhưng chỉ chứa 1 dòng văn bản lỗi của AI: `"Là một mô hình ngôn ngữ, tôi không được thiết kế để trợ giúp về điều đó."`
2. **Gói thư viện thừa trong `package.json`**:
   - Trong `devDependencies` của `package.json`, cả `"@breezystack/lamejs": "^1.2.7"` (dòng 26) và `"lamejs": "^1.2.1"` (dòng 36) đều được khai báo, nhưng `scripts/generate-audio.mjs` chỉ dùng `@breezystack/lamejs`.
   - Trong `src/engine/save-migration.test.ts`, có 2 bài test bị đặt trùng mã `SM-15` (ở dòng 179 và dòng 216).
3. **Cấu hình `.github/workflows/check.yml` chưa tối ưu**:
   - Chưa khai báo `permissions: contents: read` (nguyên tắc đặc quyền tối thiểu cho GitHub Token).
   - Chưa khai báo `concurrency` để tự động hủy các lượt chạy CI cũ khi có commit mới đẩy lên liên tiếp trong cùng một nhánh/PR.
4. **Lệch thông tin giữa Tài liệu (`README.md`, `docs/03-story-spec.md`) và Dữ liệu thật (`data/`)**:
   - `README.md` (dòng 65–77) và `docs/03-story-spec.md` (dòng 7) vẫn liệt kê 10 file JSON trong `data/` (thiếu `glossary.json` và `journal.json` đã thêm ở P14).
   - `README.md` (dòng 9) vẫn ghi trạng thái cũ ngày 03/11 (*"Chưa làm: đối chiếu nguồn với giáo trình giấy (P3), chơi thử với người thật (P8)..."*) trong khi `docs/01-todo.md` và `docs/11-lo-trinh-hoan-thien.md` đã hoàn thành tới P17.
   - Bảng đáp án đúng của 7 lựa chọn trong `docs/03-story-spec.md` (dòng 153–158) vẫn ghi vị trí cũ trước khi cân bằng ở P11b (`k1-l2` ghi A thay vì C; `k2-l1` ghi A thay vì B; `k2-l3` ghi B thay vì C).
   - Bảng phân vai tại `docs/01-todo.md` (dòng 14–19, việc `M-01`) còn để trống tên thành viên và tài khoản GitHub.

---

## 2. Hướng Dẫn Triển Khai Chi Tiết

### Bước 1: Xóa file rác & dọn dẹp `package.json`, `.gitignore`, mã test trùng
1. Xóa file `plan_audio_voiceover.md`:
   ```bash
   git rm plan_audio_voiceover.md
   ```
2. Trong `package.json`:
   - Xóa dòng `"lamejs": "^1.2.1"` khỏi `devDependencies` (giữ lại `"@breezystack/lamejs"`).
   - Thêm script tiện ích `"audio:bgm": "node scripts/generate-audio.mjs"` nếu cần.
3. Trong `.gitignore`, thêm `coverage/` và `!.env.example`.
4. Trong `src/engine/save-migration.test.ts` (dòng 216), đổi mã test `SM-15` thứ hai thành `SM-18` để không trùng mã.

### Bước 2: Tối ưu `.github/workflows/check.yml`
Cập nhật `.github/workflows/check.yml`:
```yaml
name: check
on: [push, pull_request]

permissions:
  contents: read

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 11.15.0
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm check
```

### Bước 3: Đồng bộ `README.md`, `docs/03-story-spec.md` và `docs/01-todo.md`
1. Cập nhật `README.md`:
   - Cập nhật dòng trạng thái lên phiên bản mới nhất (đã hoàn thành P0–P17 + 120 file lồng tiếng Neural TTS).
   - Bổ sung `glossary.json`, `journal.json` và `scripts/generate-voices.py`, `scripts/check-hardcoded-text.mjs` vào cây thư mục.
2. Cập nhật `docs/03-story-spec.md`:
   - Sửa số lượng file trong `data/` thành 12 file.
   - Cập nhật bảng đáp án đúng của 7 lựa chọn khớp 100% với `data/scenes.json` (`k0-l1`: C, `k0-l2`: A, `k1-l1`: B, `k1-l2`: C, `k2-l1`: B, `k2-l2`: A, `k2-l3`: C).
3. Điền đầy đủ Họ tên và GitHub của các thành viên vào bảng Phân vai trong `docs/01-todo.md` (đóng cổng `M-01`).

---

## 3. Tiêu Chí Nghiệm Thu (Acceptance Criteria)

- [ ] Không còn file `plan_audio_voiceover.md` trong repo.
- [ ] `README.md` và `docs/03-story-spec.md` khớp 100% với cấu trúc file và dữ liệu thực tế trong `data/` và `scripts/`.
- [ ] `.github/workflows/check.yml` có đầy đủ `permissions` và `concurrency`.
- [ ] Chạy `pnpm check` xanh 100%.
