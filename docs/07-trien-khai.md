# Kế hoạch triển khai

> Trạng thái: ĐANG DÙNG — cập nhật 03/11/2026. Kế hoạch tiếp theo nằm ở `11-lo-trinh-hoan-thien.md`; file này giữ kiến trúc, cài đặt và cách deploy.

File này trả lời: kiến trúc code ra sao, cài đặt và đưa game lên mạng thế nào. Quy ước làm việc ở `README.md`; cấu trúc dữ liệu ở `03-story-spec.md`; việc và test từng phase ở `08-cac-phase.md` (P0–P9) và `11-lo-trinh-hoan-thien.md` (P9b, P10–P15).

## 1. Hiện trạng (03/11)

| Hạng mục | File | Tình trạng |
|---|---|---|
| Ý tưởng, nguyên tắc | `docs/00-idea.md` | CHỐT |
| Đặc tả cấu trúc | `docs/03-story-spec.md` | CHỐT BẢN 1; bản 2 dự kiến ở mục 13 |
| Dữ liệu | `data/*.json` (10 file) + `data/schema/` (10 schema) | `validate:strict` xanh, ước tính khoảng 20,0 phút |
| Nguồn | `docs/04-sources.md`, `data/sources.json` | Khớp 51/51 mã; **chờ KB đối chiếu với giáo trình giấy** (M-02) |
| Engine | `src/engine/` | Xong; bản lưu `SAVE_SCHEMA_VERSION = 2` có hàm chuyển đổi |
| Giao diện | `src/screens/`, `src/components/` | Chơi trọn được; còn F-03, F-07, F-08, F-09, F-10 |
| Art | `src/art/` (SVG) | 14/14 hình nền, 7/14 CG (F-11), sprite chưa có biểu cảm |
| Âm thanh | `public/audio/*.mp3`, `src/audio.ts` | 5 nhạc nền MP3 tự tổng hợp; hiệu ứng tổng hợp bằng Web Audio |
| Test | `scripts/*.test.mjs`, `src/**/*.test.ts(x)` | 10 test đột biến + khoảng 130 test Vitest, xanh |
| Deploy | Vercel, PWA (`public/sw.js`, `manifest.json`) | Production chạy; chưa kiểm tra DEP-02, DEP-03 (M-04) |
| Chơi thử | `docs/10-can-sua.md` | **Chưa làm** (M-03) |

## 2. Lựa chọn công nghệ

**React + Vite + TypeScript + Tailwind, chạy hoàn toàn trên trình duyệt, deploy Vercel.** Không dùng Ren'Py hay engine riêng vì:

- Mở bằng một đường link trên máy chiếu của lớp, không cần cài.
- Dữ liệu cảnh là JSON thuần, engine chỉ là một vòng lặp đọc nút → test được bằng Vitest.
- Cùng ngăn xếp với dự án mẫu `15-station`, nhóm tái dùng được cấu hình.

## 3. Cài đặt

```bash
npm i -g pnpm
pnpm install --frozen-lockfile
pnpm dev            # chạy thử
pnpm check          # validate --strict + test đột biến + vitest + build (giống CI)
```

Lệnh trong `package.json`: `dev`, `build`, `preview`, `test`, `validate`, `validate:strict`, `test:data`, `check`. Không dùng `npm install` song song với pnpm.

## 4. Kiến trúc `src/`

```
src/
├── main.tsx                   ← đăng ký service worker (chỉ bản build)
├── App.tsx                    ← useReducer; chọn màn theo state.screen; tự lưu bằng useEffect
├── content.ts                 ← import 10 file data/*.json → GameContent (chỗ duy nhất đọc data)
├── engine/                    ← HÀM THUẦN, không React, không DOM
│   ├── types.ts, step.ts      ← start / next / choose
│   ├── save.ts                ← localStorage, có version và hàm chuyển đổi bản lưu
│   ├── summary.ts             ← xếp loại 03 mục 8
│   └── *.test.ts(x)           ← unit, bot, chơi trọn game, chuyển đổi bản lưu
├── screens/                   ← Menu, Scene, Quiz, Summary, Collection
├── components/                ← DialogBox, ChoicePanel, KnowledgeBox, Timeline, Cards, Sprite,
│                                 LogModal, SettingsModal, HistoricalVideoModal, ErrorBoundary
├── art/                       ← hình SVG: backgrounds/ (theo kỳ), cgIllustrations, characterSprites
└── audio.ts                   ← nhạc nền MP3 + hiệu ứng Web Audio
```

Luật:

1. **Code không chứa nội dung.** Mọi chữ hiện cho người chơi lấy từ `data/*.json`. Câu có nội dung lịch sử phải có mã `GT-`. Luật này đã bị vi phạm hai lần (trước P7 và F-08, F-09), nên P9b thêm `scripts/check-hardcoded-text.mjs` vào `pnpm check`.
2. Engine nhận `GameContent` làm tham số, không import thẳng `data/`, để test và bot dùng lại được.
3. Số trang trong hộp kiến thức lấy từ `sources.json` theo mã, không ghép chuỗi tay.
4. `?canh=<mã>` nhảy thẳng tới một cảnh (dùng khi trình bày).
5. Không viết nhánh riêng cho `MODE === "test"` trong component; test dùng fake timers hoặc props.

## 5. CI và deploy

- **CI** (`.github/workflows/check.yml`): pnpm 11, Node 22, `pnpm install --frozen-lockfile`, `pnpm check`.
- **Vercel** (`vercel.json`): Build Command = `pnpm check`, Output = `dist`, rewrite mọi đường dẫn về `index.html`. Mỗi PR có preview riêng.
- **Service worker** (`public/sw.js`): trang HTML lấy từ mạng trước, file `/assets/*` lấy từ cache trước, nhạc lấy cache trước rồi cập nhật ngầm. **Thay hoặc thêm file trong `public/audio/` thì tăng `CACHE_VERSION`.**
- **Bản offline:** `pnpm build && pnpm preview` trên laptop trình bày.

## 6. Lịch

Lịch 7 ngày của MVP đã xong. Lịch tiếp theo: `11-lo-trinh-hoan-thien.md` mục 4.

## 7. Rủi ro

| Rủi ro | Cách giảm |
|---|---|
| Trích dẫn sai chữ so với giáo trình | P3 + cột "Đã đối chiếu" trong 04; nhân vật lịch sử chỉ dùng nguồn `quote` (validate chặn) |
| Game dài quá 20 phút | Validate tầng 3 ước tính thời lượng; P8 bấm giờ thật |
| Art không kịp | Hình nền bằng ảnh minh hoạ có nhãn; sprite đơn giản; CG có thể là hình nền mờ + chữ |
| Hai người cùng sửa `scenes.json` | Ghi tên ở `01-todo.md`; mỗi kỳ một PR |
| Hai phiên làm việc (người hoặc công cụ AI) cùng sửa repo, ghi đè nhau | Chỉ một phiên tại một thời điểm; mỗi phiên làm trên nhánh riêng |
| Tính năng mới mang nội dung lịch sử nằm cứng trong code, không qua validate | `check-hardcoded-text` trong `pnpm check` (P9b); KB duyệt mọi PR có chữ mới |
