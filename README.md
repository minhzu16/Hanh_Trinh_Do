# 🚩 Hành Trình Đỏ — Visual Novel Lịch Sử Đảng

> **"Không phải học thuộc lòng lịch sử, mà là cùng sống và cùng đưa ra lựa chọn với lịch sử."**  
> 🌐 **Chơi trực tiếp trên Web & Di động (Live Production):** [https://hanh-trinh-do.vercel.app](https://hanh-trinh-do.vercel.app)  
> 📖 **Xem tài liệu giới thiệu chi tiết cho người chơi & người xem:** [Cẩm Nang Giới Thiệu Game (docs/GIOI-THIEU-GAME.md)](docs/GIOI-THIEU-GAME.md)

Game Visual Novel tương tác học Lịch sử Đảng Cộng sản Việt Nam. Người chơi hóa thân vào Minh — một thanh niên yêu nước "đi cùng" dòng chảy lịch sử từ năm 1911 đến khi Đảng ra đời năm 1930: chứng kiến các sự kiện, đứng trước 7 lựa chọn tư tưởng bước ngoặt, và nếu chọn sai thì trải nghiệm một "lịch sử giả định" (Alternate History) kèm hộp kiến thức giải thích cặn kẽ căn cứ giáo trình. Bản đầu tiên (MVP) phủ trọn vẹn Chương 1, mục I của Giáo trình Lịch sử Đảng (trang 36–71), thời lượng khoảng 20 phút.

> **Tình trạng (07/11):** Đã hoàn thành P0–P17, gồm chuẩn hóa dữ liệu, đối chiếu 51/51 nguồn giáo trình, tối ưu gameplay/UI, accessibility, code splitting, 120 file lồng tiếng Neural TTS, validation storage và CI. `pnpm check` xanh; tài liệu chi tiết nằm tại [docs/11-lo-trinh-hoan-thien.md](docs/11-lo-trinh-hoan-thien.md).

---

## Mục lục

1. [Giới thiệu & Trải nghiệm nhanh](#1-giới-thiệu--trải-nghiệm-nhanh)
2. [Cây thư mục dự án](#2-cây-thư-mục-dự-án)
3. [Luồng công việc](#3-luồng-công-việc)
4. [Vai trò trong nhóm](#4-vai-trò-trong-nhóm)
5. [Bảng tra cứu file](#5-bảng-tra-cứu-file)
6. [Quy ước đặt mã](#6-quy-ước-đặt-mã)
7. [Các phase](#7-các-phase)
8. [Lệnh thường dùng và quy ước Git](#8-lệnh-thường-dùng-và-quy-ước-git)

---

## 1. Giới thiệu & Trải nghiệm nhanh

- **Trải nghiệm ngay không cần cài đặt:** Truy cập trực tiếp tại [https://hanh-trinh-do.vercel.app](https://hanh-trinh-do.vercel.app).
- **Hỗ trợ thiết bị:** Máy tính để bàn, laptop, máy tính bảng và điện thoại di động (có thể cài đặt thành ứng dụng PWA ngoại tuyến).
- **Xem cẩm nang đầy đủ:** Vui lòng xem [docs/GIOI-THIEU-GAME.md](docs/GIOI-THIEU-GAME.md) để tìm hiểu cốt truyện, tuyến nhân vật, 7 lựa chọn bước ngoặt và 8 tư liệu mở khoá.

### Chạy mã nguồn cục bộ (Dành cho Lập trình viên)
Cần Node 20 trở lên và pnpm:

```bash
git clone https://github.com/minhzu16/Hanh_Trinh_Do.git
cd Hanh_Trinh_Do
pnpm install --frozen-lockfile
pnpm dev        # Chạy máy chủ phát triển cục bộ
pnpm check      # validate --strict + test đột biến + Vitest + build (giống CI)
```

---

## 2. Cây thư mục dự án

```
Hanh_Trinh_Do/
├── README.md                   ← file này
├── docs/                       ← tài liệu dự án và cẩm nang
│   ├── GIOI-THIEU-GAME.md      ← cẩm nang giới thiệu đầy đủ cho người chơi & người xem
│   ├── 00-idea.md              ← ý tưởng gốc, ba nguyên tắc thiết kế
│   ├── 01-todo.md              ← việc theo người, cập nhật cuối mỗi ngày
│   ├── 02-bible.md             ← nhân vật hư cấu, giọng văn, quy ước
│   ├── 03-story-spec.md        ← đặc tả cấu trúc kỳ/cảnh/lựa chọn — CHỐT ĐẦU TIÊN
│   ├── 04-sources.md           ← mọi câu trích giáo trình kèm số trang (51 nguồn)
│   ├── 05-art-brief.md         ← danh sách hình nền, sprite, CG minh họa
│   ├── 06-presentation.md      ← kịch bản trình bày, bảng tra cứu nguồn phản biện
│   ├── 07-trien-khai.md        ← kiến trúc src/, deploy Vercel
│   ├── 08-cac-phase.md         ← việc, test, cổng của P0–P9; bảng mã test đã dùng
│   ├── 09-am-thanh.md          ← nhạc nền, hiệu ứng, nguồn
│   ├── 10-can-sua.md           ← phiếu chơi thử (P8, P15)
│   ├── 11-lo-trinh-hoan-thien.md ← thang điểm, lỗi F-xx, P9b, P10–P15
│   └── DANH-SACH-MEDIA-CAN-TIM.md ← tư liệu ảnh, video cần tìm (có giấy phép)
├── data/                       ← JSON game đọc — NGUỒN DUY NHẤT sau khi kiểm tra
│   ├── schema/                 ← schema kiểm định JSON Schema
│   ├── chapters.json
│   ├── scenes.json
│   ├── characters.json
│   ├── sources.json
│   ├── collectibles.json
│   ├── quiz.json
│   ├── strings.json
│   ├── videos.json             ← minh hoạ tái hiện theo cảnh (03 mục 12)
│   ├── hotspots.json           ← điểm khám phá trên hình nền
│   ├── contexts.json           ← địa danh, thời gian đầu cảnh
│   ├── glossary.json           ← thuật ngữ và định nghĩa
│   └── journal.json            ← nhật ký tổng kết theo kỳ
├── scripts/
│   ├── validate-data.mjs       ← kiểm tra dữ liệu 3 tầng, không cần cài gói
│   ├── validate-data.test.mjs  ← 10 test đột biến cho script validate
│   ├── check-hardcoded-text.mjs ← kiểm tra chuỗi tiếng Việt hardcoded
│   ├── generate-audio.mjs      ← tổng hợp 5 nhạc nền MP3
│   └── generate-voices.py      ← tạo manifest và voice MP3 Neural TTS
├── public/                     ← nhạc MP3, manifest, service worker (sw.js)
└── src/                        ← code game (React + Vite + Tailwind): engine/, screens/, components/, art/ (SVG)
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

---

## 4. Vai trò trong nhóm

| Nhãn | Vai trò | Phụ trách chính |
|---|---|---|
| **KB** | Kịch bản và nguồn | Nội dung, đối chiếu giáo trình, `04-sources.md` |
| **GP** | Gameplay | Engine đọc cảnh, schema, prompt P1, script validate |
| **UI** | Giao diện và art | Hộp thoại, màn lựa chọn, hình nền, sprite, CG |
| **KT** | Kết và test | Câu hỏi củng cố, âm thanh, chơi thử, trình bày |

---

## 5. Bảng tra cứu file

| File | Mục đích | Phụ trách | Ràng buộc |
|---|---|---|---|
| `docs/GIOI-THIEU-GAME.md` | Cẩm nang giới thiệu game cho giảng viên và người chơi | Cả nhóm | Phản ánh chính xác gameplay và bối cảnh |
| `docs/00-idea.md` | Ý tưởng, ba nguyên tắc thiết kế, phạm vi MVP | KB, chỉ đọc | Mâu thuẫn với `03`: `03` thắng về cấu trúc, `00` thắng về nguyên tắc |
| `docs/03-story-spec.md` | Cấu trúc kỳ → cảnh → nút, luật nhánh, cách tính điểm, **danh mục mã** | KB + GP | **Chốt đầu tiên.** Sửa file này thì rà lại schema, template, P1 trong cùng commit |
| `docs/04-sources.md` | Mọi câu trích và mốc thời gian kèm trang giáo trình | KB | Mọi trích dẫn trong game hoặc slide phải có ở đây; khớp `data/sources.json` |
| `docs/06-presentation.md` | Kịch bản thuyết trình, bộ câu hỏi Q&A và bảng tra cứu nguồn | Cả nhóm | Chuẩn bị cho buổi báo cáo trước hội đồng |
| `data/scenes.json` | Mọi cảnh — file lớn nhất | KB | Chỉ một người sửa tại một thời điểm; ghi tên ở `01-todo.md` |
| `data/sources.json` | 51 câu trích dạng máy đọc | KB | Mỗi hộp kiến thức và câu thoại của nhân vật lịch sử phải trỏ tới một mã ở đây |
| `scripts/validate-data.mjs` | Kiểm tra 3 tầng: cấu trúc, tham chiếu, ràng buộc thiết kế | GP | Chạy trước mỗi commit đụng vào `data/` |
| `src/` | Code game | GP + UI | **Code không chứa nội dung cứng**: mọi chữ hiện cho người chơi lấy từ `data/*.json`; câu có nội dung lịch sử phải có mã `GT-` |
| `docs/11-lo-trinh-hoan-thien.md` | Thang điểm, lỗi đang mở, lộ trình tiếp theo | GP | Cập nhật trạng thái mỗi khi đóng một cổng |

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

**MVP (P0–P9)**, chi tiết ở `docs/08-cac-phase.md`; tình trạng thật cập nhật ở `docs/01-todo.md`.

| Phase | Mục tiêu | Ai | Trạng thái |
|---|---|---|:---:|
| P0 | Nền: spec, schema, validate tầng 1 | GP, cả nhóm | Xong (còn M-01: điền phân vai) |
| P1 | Khung Vite + React + Tailwind | GP | Xong |
| P2 | Engine đọc cảnh (thuần, có unit test) | GP | Xong |
| P3 | Nội dung nền: nhân vật, nguồn, chữ giao diện | KB, UI | Dữ liệu xong; **chưa đối chiếu giáo trình giấy** (M-02) |
| P4 | Chuyển Kỳ 0–2 + câu hỏi sang JSON; validate tầng 2 | KB, GP | Xong |
| P5 | Validate tầng 3 (thời lượng, nhánh), bot chơi thử | GP | Xong |
| P6 | Giao diện chơi trọn 3 kỳ | UI, GP | Xong (còn F-03, F-07) |
| P7 | Art, âm thanh, bộ sưu tập, màn tổng kết | UI, KT | Phần lớn (7/14 CG chưa có hình: F-11) |
| P8 | Chơi thử, chỉnh nhịp 20 phút | KT | **Chưa làm** (M-03) |
| P9 | Deploy Vercel, PWA, tài liệu thuyết trình | GP, KT | Đã deploy; **chưa kiểm tra offline, chưa có video dự phòng** (M-04) |

**Bản hoàn thiện (P9b, P10–P15)**, chi tiết ở `docs/11-lo-trinh-hoan-thien.md`:

| Phase | Mục tiêu | Ai | Cổng |
|---|---|---|---|
| P9b | Kỷ luật nội dung: đưa chữ của mini-game, QTE vào `data/`; sửa F-07 (khoá 3 giây) | KB, GP | UI-25, V-28, V-29, S-05 |
| P10 | Truyện: Minh có tiếng nói, nhân vật đại diện các quan điểm | KB | S-01 đến S-04 |
| P11 | Lựa chọn có trọng lượng: `flags`, nhắc lại lựa chọn, flowchart | GP, KB | E-19 đến E-21, B-05, V-26, V-27 |
| P12 | Trình bày: 7 CG còn thiếu, biểu cảm sprite, chuyển cảnh | UI | A-04 đến A-07 |
| P13 | Tiện ích: Skip đúng nghĩa, lùi câu, ô lưu | GP | UI-22 đến UI-24 |
| P14 | Học tập: tooltip thuật ngữ, nhật ký cuối kỳ | KB, UI | L-01 đến L-03 |
| P15 | Nghiệm thu: chơi thử vòng 2, chấm lại | KT | PT-01 đến PT-05, DEP-01 đến DEP-05 |

---

## 8. Lệnh thường dùng và quy ước Git

```bash
pnpm dev                       # Khởi chạy dev server
pnpm test                      # Chạy bộ test Vitest
pnpm validate:strict           # Kiểm tra dữ liệu 3 tầng nghiêm ngặt
pnpm check                     # Chạy toàn bộ quy trình kiểm định CI/CD
```

- Không commit thay đổi trong `data/` khi validate đang đỏ.
- Chỉ một phiên làm việc (người hoặc công cụ AI) sửa repo tại một thời điểm.
- Không đánh dấu một cổng là "đạt" khi chưa thật sự làm; phiếu chơi thử và cột đối chiếu nguồn phải do người thật điền.
- Tiền tố commit: `docs:`, `content:`, `data:`, `feat:`, `fix:`, `art:`, `test:`, `chore:`.
