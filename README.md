# Hành Trình Đỏ

> Game visual novel học Lịch sử Đảng Cộng sản Việt Nam. Người chơi là Minh, một thanh niên hư cấu "đi cùng" lịch sử từ năm 1911 đến khi Đảng ra đời năm 1930: đọc, đưa ra lựa chọn, và nếu chọn sai thì xem một "lịch sử giả định" rồi được giải thích theo giáo trình vì sao sai. Bản đầu tiên (MVP) phủ Chương 1, phần I của giáo trình (trang 36–71), chơi trong khoảng 20 phút.

## Mục lục

1. [Bắt đầu nhanh](#1-bắt-đầu-nhanh)
2. [Cây thư mục](#2-cây-thư-mục)
3. [Luồng công việc](#3-luồng-công-việc)
4. [Vai trò trong nhóm](#4-vai-trò-trong-nhóm)
5. [Bảng tra cứu file](#5-bảng-tra-cứu-file)
6. [Quy ước đặt mã](#6-quy-ước-đặt-mã)
7. [Các phase](#7-các-phase)
8. [Lệnh thường dùng và quy ước Git](#8-lệnh-thường-dùng-và-quy-ước-git)

---

## 1. Bắt đầu nhanh

Cần Node 20 trở lên. Script kiểm tra dữ liệu không cần cài gói nào.

```bash
git clone https://github.com/minhzu16/Hanh_Trinh_Do.git
cd Hanh_Trinh_Do
node scripts/validate-data.mjs     # kiểm tra toàn bộ data/
```

Từ phase P1, dự án dùng **pnpm** (React + Vite + TypeScript). Không dùng `npm install` song song với pnpm, vì hai công cụ làm lockfile lệch nhau.

Kế hoạch triển khai: `docs/07-trien-khai.md`. Việc và test của từng phase: `docs/08-cac-phase.md`.

**Việc trên GitHub:** mỗi phase là một [milestone](https://github.com/minhzu16/Hanh_Trinh_Do/milestones) (P0–P9), mỗi việc là một [issue](https://github.com/minhzu16/Hanh_Trinh_Do/issues) có nhãn phase (`P0`…`P9`) và nhãn vai trò (`KB`, `GP`, `UI`, `KT`).

Tạo bảng Kanban (làm một lần, khoảng 2 phút):

1. Tab **Projects** của repo → **Link a project** → **New project** → chọn mẫu **Board**, đặt tên `Hành Trình Đỏ`.
2. Trong bảng: **+ Add item** → gõ `#` → **Add items from repository** → chọn `Hanh_Trinh_Do`, lọc `is:issue`, chọn tất cả.
3. **View options** → **Group by: Milestone** để mỗi phase thành một nhóm; hoặc **Slice by: Labels** để lọc theo vai trò.
4. **Workflows** → bật **Auto-add to project** (filter `is:issue`) để issue mới tự vào bảng.

---

## 2. Cây thư mục

```
Hanh_Trinh_Do/
├── README.md                   ← file này
├── docs/                       ← tài liệu định hướng, không phải nội dung game
│   ├── 00-idea.md              ← ý tưởng gốc, ba nguyên tắc thiết kế
│   ├── 01-todo.md              ← việc theo người, cập nhật cuối mỗi ngày
│   ├── 02-bible.md             ← nhân vật hư cấu, giọng văn, quy ước
│   ├── 03-story-spec.md        ← đặc tả cấu trúc kỳ/cảnh/lựa chọn — CHỐT ĐẦU TIÊN
│   ├── 04-sources.md           ← mọi câu trích giáo trình kèm số trang
│   ├── 05-art-brief.md         ← danh sách hình nền, sprite, CG
│   ├── 06-presentation.md      ← kịch bản trình bày, hỏi đáp
│   ├── 07-trien-khai.md        ← kiến trúc src/, deploy, lịch
│   ├── 08-cac-phase.md         ← việc, test, cổng của P0–P9
│   └── 09-am-thanh.md          ← danh sách nhạc nền, hiệu ứng
├── content/                    ← nội dung viết bằng văn (Markdown)
│   ├── templates/
│   │   ├── T1-canh.md          ← khung một cảnh
│   │   ├── T2-ky.md            ← khung một kỳ
│   │   ├── T3-nhan-vat.md      ← khung một nhân vật
│   │   └── T4-cau-hoi.md       ← khung câu hỏi củng cố
│   ├── characters.md
│   ├── ky-0.md, ky-1.md, ky-2.md
│   ├── quiz.md
│   └── ui-text.md
├── prompts/                    ← prompt chuyển đổi và soát lỗi
│   ├── P1-script-to-json.md
│   ├── P2-logic-review.md
│   └── P3-fact-check.md
├── data/                       ← JSON game đọc — NGUỒN DUY NHẤT sau khi kiểm tra
│   ├── schema/                 ← một schema cho mỗi file dữ liệu
│   ├── chapters.json
│   ├── scenes.json
│   ├── characters.json
│   ├── sources.json
│   ├── collectibles.json
│   ├── quiz.json
│   └── strings.json
├── scripts/
│   ├── validate-data.mjs       ← kiểm tra dữ liệu 3 tầng, không cần cài gói
│   └── validate-data.test.mjs  ← test đột biến cho script validate
└── src/                        ← code game (React + Vite + Tailwind, từ P1)
```

---

## 3. Luồng công việc

```
 content/*.md  ──── P1 ────►  data/*.json  ──── validate ────►  ✅  ────►  src/ (game)
  Viết theo                  Bản chuyển         3 tầng           JSON là
  template                   từ LLM                              nguồn duy nhất
                                  ▲                  │
                                  └──── sửa lỗi ─────┘
                                   (sửa trực tiếp trên JSON)
```

1. **Viết.** Điền nội dung vào `content/*.md` theo template trong `content/templates/`.
2. **Chuyển.** Chạy prompt `P1-script-to-json.md` trên từng file, dán kết quả vào `data/*.json`.
3. **Kiểm.** Chạy `node scripts/validate-data.mjs`. Sau đó chạy `P2` (logic nhánh) và `P3` (nguồn) để bắt thêm lỗi mà script không thấy.
4. **Khoá.** Khi validate xanh, đổi trạng thái file Markdown thành `ĐÃ CHUYỂN JSON`.

> **Quy tắc vàng: JSON là nguồn duy nhất sau khi đã qua kiểm tra.** Từ lúc một kỳ được chuyển sang JSON và validate báo xanh, mọi chỉnh sửa về sau làm trên `data/*.json`. Không sửa Markdown rồi chạy P1 lại, vì LLM không cho ra kết quả giống hệt nhau mỗi lần và sẽ ghi đè các chỗ đã sửa tay.

### Trạng thái file Markdown

Dòng thứ hai của mọi file trong `content/` là dòng trạng thái:

| Trạng thái | Ý nghĩa | Được sửa ở đâu |
|---|---|---|
| `NHÁP` | Đang viết | Markdown |
| `CHỐT` | Viết xong, chờ chuyển | Markdown, nhưng phải báo nhóm |
| `ĐÃ CHUYỂN JSON (dd/mm, tên người chuyển)` | Đã chuyển và qua validate | **Chỉ trên JSON** |

---

## 4. Vai trò trong nhóm

| Nhãn | Vai trò | Phụ trách chính |
|---|---|---|
| **KB** | Kịch bản và nguồn | Nội dung, đối chiếu giáo trình, `04-sources.md` |
| **GP** | Gameplay | Engine đọc cảnh, schema, prompt P1, script validate |
| **UI** | Giao diện và art | Hộp thoại, màn lựa chọn, hình nền, sprite, CG |
| **KT** | Kết và test | Câu hỏi củng cố, âm thanh, chơi thử, trình bày |

Nhóm 3 người: gộp KT vào KB và GP.

---

## 5. Bảng tra cứu file

| File | Mục đích | Phụ trách | Ràng buộc |
|---|---|---|---|
| `docs/00-idea.md` | Ý tưởng, ba nguyên tắc thiết kế, phạm vi MVP | KB, chỉ đọc | Mâu thuẫn với `03`: `03` thắng về cấu trúc, `00` thắng về nguyên tắc |
| `docs/03-story-spec.md` | Cấu trúc kỳ → cảnh → nút, luật nhánh, cách tính điểm, **danh mục mã** | KB + GP | **Chốt đầu tiên.** Sửa file này thì rà lại schema, template, P1 trong cùng commit |
| `docs/04-sources.md` | Mọi câu trích và mốc thời gian kèm trang giáo trình | KB | Mọi trích dẫn trong game hoặc slide phải có ở đây; khớp `data/sources.json` |
| `content/templates/T1–T4` | Khung viết cảnh, kỳ, nhân vật, câu hỏi | KB + GP | **Không đổi tên tiêu đề**: P1 dựa vào tiêu đề |
| `content/ky-*.md` | Nội dung từng kỳ | KB | Một khối T2 + các khối T1 |
| `data/schema/*.schema.json` | Cấu trúc hợp lệ của từng file dữ liệu | GP | Sửa schema thì sửa template và P1 cùng commit |
| `data/scenes.json` | Mọi cảnh — file lớn nhất | KB | Chỉ một người sửa tại một thời điểm |
| `data/sources.json` | Câu trích dạng máy đọc | KB | Mỗi hộp kiến thức và câu thoại của nhân vật lịch sử phải trỏ tới một mã ở đây |
| `scripts/validate-data.mjs` | Kiểm tra 3 tầng: cấu trúc, tham chiếu, ràng buộc thiết kế | GP | Chạy trước mỗi commit đụng vào `data/` |
| `src/` | Code game | GP + UI | **Code không chứa nội dung cứng**: chữ lấy từ `strings.json`, cảnh lấy từ `scenes.json` |

---

## 6. Quy ước đặt mã

Danh mục mã chính thức nằm trong `docs/03-story-spec.md`.

| Loại | Quy tắc | Ví dụ |
|---|---|---|
| Kỳ | `k` + số | `k0`, `k1`, `k2` |
| Cảnh | `k<kỳ>-c<số>` | `k0-c1`, `k2-c5` |
| Lựa chọn | `k<kỳ>-l<số>` | `k0-l1` |
| Nhân vật | kebab-case, không dấu | `minh`, `lan`, `bac-tu`, `nguyen-ai-quoc`, `narrator` |
| Nguồn trích | `GT-<trang>-<tên>` | `GT-50-HAI-GIONG-NGUOI` |
| Tư liệu mở khoá | `tl-<tên>` | `tl-ban-yeu-sach`, `tl-duong-cach-menh` |
| Câu hỏi củng cố | `q<số>` | `q1` … `q6` |

---

## 7. Các phase

| Phase | Mục tiêu | Ai | Cổng |
|---|---|---|---|
| P0 | Nền: spec, schema, validate tầng 1 | GP, cả nhóm | `node scripts/validate-data.mjs` chạy, cảnh mẫu `k0-c1` xanh |
| P1 | Khung Vite + React + Tailwind | GP | `dev`, `build`, `test` chạy; có preview Vercel |
| P2 | Engine đọc cảnh (thuần, có unit test) | GP | Unit test xanh |
| P3 | Nội dung nền: nhân vật, nguồn, chữ giao diện | KB, UI | 4 file dữ liệu xanh tầng 1 |
| P4 | Chuyển Kỳ 0–2 + câu hỏi sang JSON; validate tầng 2 | KB, GP | Tầng 1–2 xanh, mọi file `ĐÃ CHUYỂN JSON` |
| P5 | Validate tầng 3 (thời lượng, nhánh), bot chơi thử | GP | Bot đi hết mọi nhánh; ước tính ≤ 22 phút |
| P6 | Giao diện chơi trọn 3 kỳ | UI, GP | Chơi hết chỉ bằng chuột hoặc phím Space |
| P7 | Art, âm thanh, bộ sưu tập, màn tổng kết | UI, KT | Không thiếu asset, ảnh tư liệu có ghi nguồn |
| P8 | Chơi thử và chỉnh nhịp 20 phút | KT | ≥ 2/3 người chơi xong trong 18–24 phút |
| P9 | Deploy và trình bày | GP, KT | Checklist trình bày đủ |

Chi tiết: `docs/08-cac-phase.md`.

---

## 8. Lệnh thường dùng và quy ước Git

```bash
node scripts/validate-data.mjs                 # kiểm tra toàn bộ data/
node scripts/validate-data.mjs --data <thư mục>  # kiểm tra một thư mục dữ liệu khác
```

- Không commit thay đổi trong `data/` khi validate đang đỏ.
- `scenes.json` chỉ một người sửa tại một thời điểm. Ghi tên vào `docs/01-todo.md` trước khi sửa.
- Mỗi việc làm trên một nhánh `p<phase>/<tên-việc>`, mở PR có dòng `Closes #<số issue>`.
- Tiền tố commit: `docs:`, `content:`, `data:`, `feat:`, `fix:`, `art:`.
