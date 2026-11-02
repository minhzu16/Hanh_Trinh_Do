# Kế hoạch triển khai

> Trạng thái: NHÁP — lập ngày 02/11/2026

File này trả lời: làm gì tiếp, theo thứ tự nào, kiến trúc code ra sao, và đưa game lên mạng thế nào. Quy ước làm việc ở `README.md`; cấu trúc dữ liệu ở `03-story-spec.md`; việc và test từng phase ở `08-cac-phase.md`.

## 1. Hiện trạng (sau P0)

| Hạng mục | File | Tình trạng |
|---|---|---|
| Ý tưởng, nguyên tắc | `docs/00-idea.md` | Xong |
| Đặc tả cấu trúc | `docs/03-story-spec.md` | CHỐT BẢN 1, **chờ nhóm duyệt mục 9** |
| 7 schema | `data/schema/` | Xong |
| Validate 3 tầng + 10 test đột biến | `scripts/` | Xong, xanh |
| Kịch bản Kỳ 0–2, câu hỏi, nhân vật | `content/` | CHỐT, chờ chuyển JSON |
| Nhân vật, 51 nguồn | `data/characters.json`, `data/sources.json` | Bản đầu, chờ KB đối chiếu (P3) |
| Cảnh mẫu `k0-c1` | `data/scenes.json` | Viết tay, qua 3 tầng |
| Prompt P1–P3, template T1–T4 | `prompts/`, `content/templates/` | CHỐT |
| `src/` | — | Chưa có (P1) |

## 2. Lựa chọn công nghệ

**React + Vite + TypeScript + Tailwind, chạy hoàn toàn trên trình duyệt, deploy Vercel.** Không dùng Ren'Py hay engine riêng vì:

- Mở bằng một đường link trên máy chiếu của lớp, không cần cài.
- Dữ liệu cảnh là JSON thuần, engine chỉ là một vòng lặp đọc nút → test được bằng Vitest.
- Cùng ngăn xếp với dự án mẫu `15-station`, nhóm tái dùng được cấu hình.

## 3. Cài đặt ở P1

```bash
npm i -g pnpm
pnpm init
pnpm add react react-dom
pnpm add -D vite @vitejs/plugin-react typescript @types/react @types/react-dom \
  tailwindcss @tailwindcss/vite vitest jsdom @testing-library/react @testing-library/user-event
pnpm add @fontsource/noto-serif @fontsource/be-vietnam-pro
```

Ghi phiên bản pnpm vào trường `packageManager`. Lệnh trong `package.json`:

```json
"dev": "vite",
"build": "tsc && vite build",
"preview": "vite preview",
"test": "vitest run",
"validate": "node scripts/validate-data.mjs",
"check": "pnpm validate && node --test scripts/validate-data.test.mjs && pnpm test && pnpm build"
```

## 4. Kiến trúc `src/`

```
src/
├── main.tsx, App.tsx          ← chọn màn theo state.screen
├── content.ts                 ← import data/*.json → GameContent (một chỗ duy nhất đọc data)
├── engine/                    ← HÀM THUẦN, không React, không DOM
│   ├── types.ts               ← Node, Scene, Chapter, GameState
│   ├── step.ts                ← start / next / choose
│   ├── save.ts                ← localStorage
│   ├── summary.ts             ← xếp loại 03 mục 8
│   └── *.test.ts
├── screens/                   ← MenuScreen, SceneScreen, QuizScreen, SummaryScreen, CollectionScreen
├── components/                ← DialogBox, ChoicePanel, KnowledgeBox, Timeline, Cards, Sprite
└── audio.ts
```

Luật:

1. **Code không chứa nội dung cứng.** Mọi chữ lấy từ `strings.json` hoặc `scenes.json`.
2. Engine nhận `GameContent` làm tham số, không import thẳng `data/`, để test và bot dùng lại được.
3. Số trang trong hộp kiến thức lấy từ `sources.json` theo mã, không ghép chuỗi tay.
4. `?canh=<mã>` nhảy thẳng tới một cảnh (dùng khi trình bày).

## 5. CI và deploy

- **CI** (`.github/workflows/check.yml`): hiện chạy validate + test đột biến. Từ P1 thêm `pnpm/action-setup@v4`, `pnpm install --frozen-lockfile`, `pnpm check`.
- **Vercel:** import repo, Framework = Vite, Build Command = `pnpm build` (P1) → `pnpm check` (P9), Output = `dist`. Mỗi PR có preview riêng.
- **Bản offline:** `pnpm build && pnpm preview` trên laptop trình bày.

## 6. Lịch gợi ý (7 ngày)

| Ngày | Việc |
|---|---|
| 1 | P0 xong (duyệt 03); P1; bắt đầu P3 |
| 2 | P2 engine; P3 nguồn và tư liệu |
| 3 | P4 chuyển Kỳ 0–1; P6 dựng màn chơi với `k0-c1` |
| 4 | P4 Kỳ 2 + câu hỏi; P5 bot; P6 tiếp |
| 5 | P6 xong; P7 art, âm thanh |
| 6 | P8 chơi thử, sửa trên JSON |
| 7 | P9 deploy, tập trình bày |

## 7. Rủi ro

| Rủi ro | Cách giảm |
|---|---|
| Trích dẫn sai chữ so với giáo trình | P3 + cột "Đã đối chiếu" trong 04; nhân vật lịch sử chỉ dùng nguồn `quote` (validate chặn) |
| Game dài quá 20 phút | Validate tầng 3 ước tính thời lượng; P8 bấm giờ thật |
| Art không kịp | Hình nền bằng ảnh minh hoạ có nhãn; sprite đơn giản; CG có thể là hình nền mờ + chữ |
| Hai người cùng sửa `scenes.json` | Ghi tên ở `01-todo.md`; mỗi kỳ một PR |
