# 📋 Danh Mục Công Việc Nâng Cấp Dự Án (Project Audit & Upgrade Tasks)

Thư mục `task/` này chứa **Báo cáo chấm điểm kỹ thuật hiện trạng (8.61 / 10)** và **12 Task nâng cấp chi tiết (đánh số từ `01` đến `12`)** dành cho các thành viên khi clone dự án `Hanh_Trinh_Do` về máy để tiếp tục hoàn thiện lên mức **9.8 / 10**.

---

## 1. Bảng Chấm Điểm Hiện Trạng Dự Án (`8.61 / 10`)

Kết quả đo đạc thực tế trên nhánh `main` (với `pnpm check` đạt **12/12 JSON schemas xanh**, **26/26 test đột biến**, **185/185 unit & E2E tests**):

| Hạng mục đánh giá | Trọng số | Điểm hiện tại | Điểm mục tiêu | Tóm tắt nguyên nhân trừ điểm & hướng khắc phục |
| :--- | :---: | :---: | :---: | :--- |
| **1. Học thuật, Dữ liệu & Kịch bản** | 25% | **9.2 / 10** | **10.0 / 10** | Còn sót từ `"Hương Cảng"` tại `data/glossary.json:217` (vi phạm `docs/02-bible.md`), chuỗi rỗng `knowledge.pages` tại `data/strings.json:13` → **Giải quyết ở Task 04**. |
| **2. Kiến trúc Engine & Type Safety** | 20% | **8.8 / 10** | **9.8 / 10** | `SceneScreen.tsx` quá lớn (1.072 dòng, 18 `useState`), trùng lặp 2 hệ thống Presenter Modal, nhảy cảnh thiếu `skipUnmetAndRecord` → **Giải quyết ở Task 02, 05, 07**. |
| **3. Gameplay, UI/UX & Accessibility** | 20% | **8.0 / 10** | **9.8 / 10** | Phím `Space`/`Enter` vượt khóa 3 giây của `KnowledgeBox`, 3 cài đặt trong `SettingsModal` chưa nối vào gameplay, 8 tư liệu chỉ hiện emoji `📜`, thiếu `onKeyDown` & `prefers-reduced-motion` → **Giải quyết ở Task 01, 03, 08, 09**. |
| **4. Hiệu năng & Tối ưu Bundle** | 15% | **7.5 / 10** | **9.6 / 10** | `setParallaxPos`/`setCursorPos` gây re-render toàn màn hình 60fps khi di chuột, mount đồng thời cả 3 kỳ SVG (`124.5 KB`), chưa dùng `React.lazy` → **Giải quyết ở Task 05, 06, 07**. |
| **5. Kiểm thử, CI/CD & Bảo mật** | 20% | **9.1 / 10** | **9.8 / 10** | Thiếu test kiểm tra 120 file `.mp3` giọng đọc, lỗi `includes()` trong `check-hardcoded-text.mjs`, dư 3x key trong `voiceManifest.json`, thiếu HTTP Security Headers & còn file rác → **Giải quyết ở Task 10, 11, 12**. |
| **TỔNG ĐIỂM** | **100%** | **8.61 / 10** | **9.82 / 10** | Hoàn thành trọn vẹn 12 task dưới đây để đạt chuẩn xuất sắc. |

---

## 2. Danh Sách 12 Task Nâng Cấp (Theo Thứ Tự Ưu Tiên)

| Số TT | File Task | Tên công việc | Ưu tiên | Vai trò | Trạng thái |
| :---: | :--- | :--- | :---: | :---: | :---: |
| **01** | [01-fix-keyboard-navigation-and-locks.md](./01-fix-keyboard-navigation-and-locks.md) | Sửa lỗi phím `Space`/`Enter` vượt khóa 3s `KnowledgeBox`, nhảy cóc `CardsView` & `DialogBox` | 🔴 P0 | `GP` | [ ] Chưa làm |
| **02** | [02-unify-presenter-mode-and-scene-jumps.md](./02-unify-presenter-mode-and-scene-jumps.md) | Hợp nhất Presenter Mode (`Ctrl+P` vs `P`) & chuẩn hóa `skipUnmetAndRecord` khi nhảy cảnh | 🟠 P1 | `GP` | [ ] Chưa làm |
| **03** | [03-wire-settings-modal-to-gameplay.md](./03-wire-settings-modal-to-gameplay.md) | Kết nối 3 cài đặt bị ngắt trong `SettingsModal` (`textSpeed`, `skipRead`, `showCitations`) | 🟠 P1 | `GP`, `UI` | [ ] Chưa làm |
| **04** | [04-standardize-historical-data-and-strings.md](./04-standardize-historical-data-and-strings.md) | Chuẩn hóa địa danh `"Cửu Long (Hồng Kông)"` trong `glossary.json`, `strings.json` & validator | 🟠 P1 | `KB`, `GP` | [ ] Chưa làm |
| **05** | [05-optimize-60fps-parallax-and-cursor-rendering.md](./05-optimize-60fps-parallax-and-cursor-rendering.md) | Tối ưu hiệu năng 60fps: Loại bỏ re-render React khi di chuột bằng `useRef` & CSS Variables | 🔴 P0 | `UI`, `GP` | [ ] Chưa làm |
| **06** | [06-optimize-svg-mounting-and-code-splitting.md](./06-optimize-svg-mounting-and-code-splitting.md) | Chỉ mount đúng kỳ SVG đang chơi, áp dụng `React.lazy` & tách chunk trong `vite.config.ts` | 🟠 P1 | `GP`, `UI` | [ ] Chưa làm |
| **07** | [07-bound-history-stack-and-storage-caching.md](./07-bound-history-stack-and-storage-caching.md) | Giới hạn `historyStack` (30 bước), cache `readNodes` trên RAM & dọn listener `audio.ts` | 🟡 P2 | `GP` | [ ] Chưa làm |
| **08** | [08-create-svg-illustrations-for-8-collectibles.md](./08-create-svg-illustrations-for-8-collectibles.md) | Vẽ và tích hợp 8 tranh minh họa vector SVG cho 8 Tư liệu lịch sử (thay thế placeholder `📜`) | 🟡 P2 | `UI` | [ ] Chưa làm |
| **09** | [09-enhance-accessibility-and-mobile-touch-pan.md](./09-enhance-accessibility-and-mobile-touch-pan.md) | Nâng cấp Accessibility (Keyboard, `role="dialog"`, `prefers-reduced-motion`) & Touch Pan | 🟡 P2 | `UI` | [ ] Chưa làm |
| **10** | [10-optimize-voice-manifest-and-generator-script.md](./10-optimize-voice-manifest-and-generator-script.md) | Tối ưu `generate-voices.py`, giảm 30% `voiceManifest.json` & thêm test kiểm tra 120 file MP3 | 🟡 P2 | `KT`, `GP` | [ ] Chưa làm |
| **11** | [11-harden-validation-scripts-and-storage-security.md](./11-harden-validation-scripts-and-storage-security.md) | Vá lỗ hổng `check-hardcoded-text.mjs`, chống lỗi `NaN`/`null` `localStorage` & thêm Security Headers | 🟡 P2 | `GP`, `KT` | [ ] Chưa làm |
| **12** | [12-cleanup-repo-ci-and-sync-documentation.md](./12-cleanup-repo-ci-and-sync-documentation.md) | Xóa file rác, gỡ gói thừa, tối ưu GitHub Actions CI & đồng bộ tài liệu `docs/` + `README.md` | 🟢 P3 | Cả nhóm | [ ] Chưa làm |

---

## 3. Sơ Đồ Thứ Tự Thực Hiện Đề Xuất

Các thành viên có thể chia nhau làm song song theo nhánh (`git checkout -b feat/task-XX-...`), lưu ý các phụ thuộc sau:

```
[Nhánh Gameplay & UI]   Task 01 ──► Task 02 ──► Task 03 ──► Task 09
[Nhánh Hiệu năng & Art] Task 05 ──► Task 06 ──► Task 07 ──► Task 08
[Nhánh Dữ liệu & CI]    Task 04 ──► Task 10 ──► Task 11 ──► Task 12
```

> **Lưu ý khi làm việc nhóm:**
> 1. Trước khi bắt đầu một task, hãy chạy `pnpm install --frozen-lockfile && pnpm check` để đảm bảo môi trường máy bạn đang xanh.
> 2. Mỗi task đều có mục **Tiêu chí nghiệm thu (Acceptance Criteria)** và hướng dẫn viết bổ sung Unit Test tương ứng.
> 3. Chỉ tạo Pull Request / Merge vào `main` khi lệnh `pnpm check` chạy thành công 100% (0 lỗi, 0 cảnh báo).
