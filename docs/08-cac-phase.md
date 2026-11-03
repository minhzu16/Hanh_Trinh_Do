# Các phase và test

> Trạng thái: ĐANG DÙNG — lập 02/11/2026, cập nhật 03/11. Ô `[x]` chỉ đánh cho việc đã kiểm chứng được trong repo. Việc còn dở của P0–P9 được gom lại thành M-01 đến M-04, và phần tiếp theo (P9b, P10–P15) nằm ở `11-lo-trinh-hoan-thien.md`.

Bản MVP chia thành 10 phase P0–P9 (file này). Bản hoàn thiện thêm P9b và P10–P15 (`11-lo-trinh-hoan-thien.md`, cùng quy ước test). Mỗi phase ghi: mục tiêu, việc, đầu ra, **test** và cổng. Trên GitHub, mỗi phase là một **milestone**, mỗi việc là một **issue** có nhãn phase và nhãn vai trò (cách gom vào bảng Kanban: README mục 1).

- Kiến trúc, cài đặt, deploy, lịch: `07-trien-khai.md`.
- Cấu trúc dữ liệu và luật nhánh: `03-story-spec.md` (gọi tắt **03**). Test mâu thuẫn với 03 thì sửa test.
- Nhãn vai trò: **KB** kịch bản và nguồn, **GP** gameplay, **UI** giao diện và art, **KT** kết và test.

## Tổng quan

| Phase | Mục tiêu | Ai | Cần xong trước | Loại test chính | Cổng |
|---|---|---|---|---|---|
| P0 | Nền: spec, schema, validate, cảnh mẫu | GP, cả nhóm | — | Chạy lệnh, đột biến | `pnpm check` (hoặc `node` tương đương) xanh; 03 `CHỐT` |
| P1 | Khung Vite + React + TS + Tailwind | GP | P0 | Smoke | `dev`, `build`, `test` chạy; preview Vercel |
| P2 | Engine đọc cảnh (hàm thuần) | GP | P1 | Unit | `pnpm test` xanh |
| P3 | Nhân vật, nguồn, tư liệu, chữ giao diện | KB, UI | P0 | Validate tầng 1, soát tay | 4 file xanh tầng 1; 04 tick hết |
| P4 | Chuyển Kỳ 0–2 + 6 câu hỏi sang JSON | KB, GP | P3 | Validate, P2, P3 | `--strict` xanh; mọi file `ĐÃ CHUYỂN JSON` |
| P5 | Bot chơi thử, ước tính thời lượng | GP | P2, P4 | Bot | Bot đi hết 21 phương án; ước tính ≤ 22 phút |
| P6 | Giao diện chơi trọn 3 kỳ | UI, GP | P1, P2 | Component, test tay | Chơi hết chỉ bằng chuột hoặc phím Space |
| P7 | Art, âm thanh, bộ sưu tập, tổng kết | UI, KT | P6 | Kiểm asset tự động | Không thiếu asset; ảnh tư liệu có ghi nguồn |
| P8 | Chơi thử, chỉnh nhịp 20 phút | KT | P5, P7 | Playtest | ≥ 2/3 người chơi xong trong 18–24 phút |
| P9 | Deploy và trình bày | GP, KT | P8 | Smoke sau deploy | Checklist trình bày đủ |

```
P0 ─┬─► P1 ─┬─► P2 ───────────────┐
    │       └─► P6 (dữ liệu mẫu) ─┼─► P7 ─► P8 ─► P9
    └─► P3 ─► P4 ─────────────────┴─► P5 ─┘
```

## Quy ước test

| Loại | Kiểm gì | Công cụ | Đặt ở đâu | Lệnh |
|---|---|---|---|---|
| **Dữ liệu** | `data/*.json` đúng schema, tham chiếu, luật thiết kế | `scripts/validate-data.mjs` | — | `node scripts/validate-data.mjs` |
| **Đột biến** | Script validate có bắt được lỗi cài vào không | `node:test` | `scripts/*.test.mjs` | `node --test scripts/validate-data.test.mjs` |
| **Unit** | Từng hàm engine | Vitest | `src/engine/**/*.test.ts` | `pnpm test` |
| **Component** | Giao diện hiển thị và chặn thao tác đúng | Vitest + Testing Library | `src/**/*.test.tsx` | `pnpm test` |

1. Mỗi test có mã, ví dụ `E-05`. Ghi mã vào tên test.
2. Test engine dùng `data/*.json` thật, không chép bản giả.
3. Sửa lỗi nào thì thêm một test tái hiện lỗi đó trước khi sửa.
4. Không merge khi CI đỏ.
5. Mỗi mã chỉ dùng cho một test. Trước khi đặt mã mới, tra bảng dưới đây.

| Tiền tố | Đã dùng (03/11) | Mã kế tiếp |
|---|---|---|
| `E-` (engine) | E-01 … E-18 | E-19 (đã đặt chỗ ở `11`: E-19 … E-21) |
| `UI-` (giao diện) | UI-01 … UI-21 (riêng UI-04 là test tay) | UI-22 (đã đặt chỗ: UI-22 … UI-25) |
| `V-` (validate) | V-00 … V-25 | V-26 (đã đặt chỗ: V-26 … V-29) |
| `B-` (bot) | B-01 … B-04 | B-05 |
| `DEP-` (deploy) | DEP-01 … DEP-05 ở file này; **trùng:** `src/engine/deployment.test.ts` và `playthrough.test.tsx` cũng dùng DEP-05, DEP-06 cho service worker, thẻ OG và test chơi trọn game | Đổi mã trong test thành DEP-07, DEP-08 (F-12) |
| `A-`, `S-`, `L-`, `PT-` | A-01 … A-03, PT-01 … PT-03 ở file này; phần còn lại ở `11` | — |

---

## P0 — Nền

**Issue:** [#1](https://github.com/minhzu16/Hanh_Trinh_Do/issues/1), [#2](https://github.com/minhzu16/Hanh_Trinh_Do/issues/2), [#3](https://github.com/minhzu16/Hanh_Trinh_Do/issues/3), [#4](https://github.com/minhzu16/Hanh_Trinh_Do/issues/4) · **Milestone:** [P0](https://github.com/minhzu16/Hanh_Trinh_Do/milestone/1)

**Mục tiêu:** cấu trúc dữ liệu được chốt, validate chạy được, có một cảnh mẫu đi qua đủ ba tầng. **Ai:** GP; cả nhóm duyệt 03.

### Việc
- [x] Viết `docs/03-story-spec.md`, 7 schema trong `data/schema/`
- [x] `scripts/validate-data.mjs` tầng 1–3 và 10 test đột biến
- [x] Cảnh mẫu `k0-c1` viết tay bằng JSON; `characters.json`, `sources.json` bản đầu
- [x] Template T1–T4, prompt P1–P3, kịch bản Kỳ 0–2 trong `content/`
- [x] Cả nhóm duyệt 03 mục 9, đổi trạng thái 03 thành `CHỐT` (CHỐT BẢN 1)
- [ ] Ghi tên vào bảng phân vai ở `01-todo.md`
- [ ] Chạy P1 trên khối `k0-c1` của `content/ky-0.md`, so với `data/scenes.json`

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| P0-01 | `node scripts/validate-data.mjs` | XANH; 3/7 file xanh, 4 file chờ nội dung |
| P0-02 | `node --test scripts/validate-data.test.mjs` | 10/10 test xanh |
| P0-03 | Chạy P1 trên khối `k0-c1`, thay vào một bản sao `data/`, `--data <bản sao>` | Xanh, và nút JSON giống bản viết tay (khác nhau chỉ ở khoảng trắng) |
| P0-04 | Mọi thành viên chạy P0-01, P0-02 trên máy mình | Cùng kết quả |

**Cổng:** P0-01 đến P0-04 đạt; 03 ở trạng thái `CHỐT`.

---

## P1 — Khung dự án

**Issue:** [#5](https://github.com/minhzu16/Hanh_Trinh_Do/issues/5), [#6](https://github.com/minhzu16/Hanh_Trinh_Do/issues/6), [#7](https://github.com/minhzu16/Hanh_Trinh_Do/issues/7) · **Milestone:** [P1](https://github.com/minhzu16/Hanh_Trinh_Do/milestone/2)

**Mục tiêu:** khung Vite + React + TypeScript + Tailwind + Vitest; đọc được 7 file dữ liệu; có bản preview trên mạng. **Ai:** GP.

### Việc
- [x] `pnpm init`, cài gói (07 mục 3), thêm `packageManager` và các lệnh `dev`, `build`, `test`, `check`
- [x] `index.html`, `vite.config.ts`, `tsconfig.json`, `src/main.tsx`, `src/App.tsx`
- [x] `src/content.ts`: import 7 file (nay là 10 file) `data/*.json`, gói thành kiểu `GameContent`
- [x] Một test mẫu để Vitest chạy
- [x] Kết nối Vercel, có preview đầu tiên; cập nhật CI dùng pnpm (đã kết nối https://hanh-trinh-do.vercel.app)

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| P1-01 | `pnpm dev` | Trang hiện, class Tailwind có tác dụng, console không lỗi |
| P1-02 | `pnpm build` | Ra `dist/`, không lỗi TypeScript |
| P1-03 | `pnpm test` | Test mẫu xanh |
| P1-04 | Mở URL preview Vercel | Giống P1-01 |

**Cổng:** P1-01 đến P1-04 đạt.

---

## P2 — Engine

**Issue:** [#8](https://github.com/minhzu16/Hanh_Trinh_Do/issues/8), [#9](https://github.com/minhzu16/Hanh_Trinh_Do/issues/9), [#10](https://github.com/minhzu16/Hanh_Trinh_Do/issues/10) · **Milestone:** [P2](https://github.com/minhzu16/Hanh_Trinh_Do/milestone/3)

**Mục tiêu:** engine thuần (không React) đi qua cảnh, xử lý lựa chọn và retry, đếm điểm, theo 03 mục 1–8. **Ai:** GP.

### Việc
- [x] `src/engine/types.ts`: kiểu cho mọi loại nút, `GameState`
- [x] `src/engine/step.ts`: `start(content)`, `next(state)`, `choose(state, key)` trả về state mới
- [x] Retry: phương án sai chạy hết các nút rồi quay về đúng nút `choice`
- [x] Đếm `dung_ngay` / `chon_lai` cho từng lựa chọn; danh sách tư liệu đã mở
- [x] `src/engine/save.ts`: lưu/khôi phục state vào `localStorage` (nếu 03 mục 9 câu 3 = có)
- [x] `src/engine/summary.ts`: xếp loại theo 03 mục 8

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| E-01 | `start` | State ở nút đầu của `k0-c1` |
| E-02 | `next` đến hết cảnh | Sang cảnh kế tiếp theo `chapters[].scenes` |
| E-03 | Chọn phương án sai ở `k0-l1` | Đi qua CG, hộp kiến thức rồi quay về `k0-l1` |
| E-04 | Sai một lần rồi đúng | Lựa chọn ghi `chon_lai` |
| E-05 | Đúng ngay | Ghi `dung_ngay` |
| E-06 | Gọi `choose` khi nút hiện tại không phải choice | Ném lỗi, state không đổi |
| E-07 | Nút `unlock` | Tư liệu vào danh sách, không trùng khi đi lại |
| E-08 | Hết kỳ cuối | Chuyển sang trạng thái `quiz` |
| E-09 | `summary` với 7/7, 5/7, 4/7 | Đúng ba xếp loại ở 03 mục 8 |
| E-10 | Lưu rồi khôi phục giữa cảnh | Tiếp tục đúng nút |

**Cổng:** E-01 đến E-10 xanh.

---

## P3 — Nội dung nền

**Issue:** [#11](https://github.com/minhzu16/Hanh_Trinh_Do/issues/11), [#12](https://github.com/minhzu16/Hanh_Trinh_Do/issues/12), [#13](https://github.com/minhzu16/Hanh_Trinh_Do/issues/13), [#14](https://github.com/minhzu16/Hanh_Trinh_Do/issues/14) · **Milestone:** [P3](https://github.com/minhzu16/Hanh_Trinh_Do/milestone/4)

**Mục tiêu:** nhân vật, nguồn, tư liệu, chữ giao diện chốt và qua tầng 1. **Ai:** KB, UI. **Làm song song với P1–P2.**

### Việc
- [x] KB: soát `content/characters.md` → `data/characters.json` (bản đầu đã có, chỉ soát)
- [ ] KB: đối chiếu từng dòng `docs/04-sources.md` với giáo trình, tick cột "Đã đối chiếu"; sửa `data/sources.json` nếu lệch
- [x] KB: viết `data/collectibles.json` cho 8 tư liệu (`05-art-brief.md` mục 4); `tl-bao-thanh-nien` trỏ nguồn `GT-56-BAO-THANH-NIEN`
- [x] UI: chuyển `content/ui-text.md` → `data/strings.json`
- [ ] KB: hoàn thiện `docs/02-bible.md` (giọng nói từng nhân vật)

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| P3-01 | `node scripts/validate-data.mjs` | `characters`, `sources`, `collectibles`, `strings` xanh tầng 1 |
| P3-02 | Đếm dấu tick trong cột "Đã đối chiếu" ở 04 | 51/51 |
| P3-03 | Chạy P3 trên `sources.json` | Không còn lỗi mở |

**Cổng:** P3-01 đến P3-03 đạt.

---

## P4 — Nội dung ba kỳ

**Issue:** [#15](https://github.com/minhzu16/Hanh_Trinh_Do/issues/15), [#16](https://github.com/minhzu16/Hanh_Trinh_Do/issues/16), [#17](https://github.com/minhzu16/Hanh_Trinh_Do/issues/17), [#18](https://github.com/minhzu16/Hanh_Trinh_Do/issues/18), [#19](https://github.com/minhzu16/Hanh_Trinh_Do/issues/19) · **Milestone:** [P4](https://github.com/minhzu16/Hanh_Trinh_Do/milestone/5)

**Mục tiêu:** toàn bộ Kỳ 0–2 và 6 câu hỏi nằm trong JSON, qua tầng 1–3 ở chế độ `--strict`. **Ai:** KB, GP.

### Việc
- [x] Chạy P1 cho `content/ky-0.md` → `chapters.json` + `scenes.json` (thay cảnh mẫu)
- [x] Chạy P1 cho `ky-1.md`, `ky-2.md`
- [x] Chuyển `content/quiz.md` → `data/quiz.json`
- [ ] Chạy P2 và P3 cho từng kỳ, xử lý hết vấn đề
- [x] Đổi trạng thái các file `content/` thành `ĐÃ CHUYỂN JSON`

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| P4-01 | `node scripts/validate-data.mjs --strict` | XANH, 7/7 file |
| P4-02 | Đọc dòng "Tổng ước tính" | 18–22 phút |
| P4-03 | Đếm lựa chọn | Đúng 7, khớp bảng 03 mục 11 |
| P4-04 | Không còn cảnh báo "nguồn chưa được dùng" hay "chưa có cảnh nào mở khoá" | 0 cảnh báo, hoặc đã ghi lý do vào `01-todo.md` |

**Cổng:** P4-01 đến P4-04 đạt.

---

## P5 — Bot chơi thử

**Issue:** [#20](https://github.com/minhzu16/Hanh_Trinh_Do/issues/20) · **Milestone:** [P5](https://github.com/minhzu16/Hanh_Trinh_Do/milestone/6)

**Mục tiêu:** chứng minh mọi nhánh đi được đến cuối. **Ai:** GP.

### Việc
- [x] Bot (thực tế nằm ở `src/engine/bots.test.ts`): bot "luôn đúng", bot "luôn sai trước rồi đúng", bot "ngẫu nhiên" (100 lần)
- [ ] Ghi tổng số nút, số retry, thời lượng ước tính của từng bot (hiện chỉ có kiểm tra B-04 ≤ 28 phút, chưa in số liệu)

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| B-01 | Bot luôn đúng | Hết game, 7/7 `dung_ngay`, xếp loại "Người đi cùng lịch sử" |
| B-02 | Bot sai hết hai phương án rồi mới đúng | Hết game, đi qua đủ 21 phương án, 0/7 `dung_ngay` |
| B-03 | Bot ngẫu nhiên 100 lần | Không lần nào kẹt hoặc lặp vô hạn |
| B-04 | Ước tính của bot B-02 | ≤ 28 phút (trường hợp tệ nhất) |

**Cổng:** B-01 đến B-04 đạt.

---

## P6 — Giao diện

**Issue:** [#21](https://github.com/minhzu16/Hanh_Trinh_Do/issues/21), [#22](https://github.com/minhzu16/Hanh_Trinh_Do/issues/22), [#23](https://github.com/minhzu16/Hanh_Trinh_Do/issues/23), [#24](https://github.com/minhzu16/Hanh_Trinh_Do/issues/24), [#25](https://github.com/minhzu16/Hanh_Trinh_Do/issues/25) · **Milestone:** [P6](https://github.com/minhzu16/Hanh_Trinh_Do/milestone/7)

**Mục tiêu:** chơi trọn 3 kỳ trên trình duyệt. **Ai:** UI, GP. Có thể bắt đầu ngay sau P1 với cảnh mẫu `k0-c1`.

### Việc
- [x] `MenuScreen`: tiêu đề, màn chú thích hư cấu (`menu.disclaimer`), Bắt đầu / Chơi tiếp / Chơi lại
- [x] `SceneScreen`: hình nền, sprite, hộp thoại, độc thoại chữ nghiêng, CG toàn màn hình
- [x] `ChoicePanel`: 3 nút; nhánh sai có nhãn "Lịch sử giả định"
- [x] `KnowledgeBox`: chữ + "Giáo trình, tr. …" lấy từ nguồn; nút "Hiểu rồi" hiện sau 3 giây
- [x] `Timeline`, `Cards` (thẻ lật)
- [x] `QuizScreen`, `SummaryScreen`, `CollectionScreen`
- [x] Phím tắt: Space/Enter = Tiếp, 1/2/3 = chọn phương án
- [x] Hiển thị số trang ngay dưới câu thoại của nhân vật lịch sử

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| UI-01 | Component test `KnowledgeBox` với nguồn `GT-49-RA-DI` | Hiện "Giáo trình, tr. 49–50" |
| UI-02 | `ChoicePanel` | Bấm 2 lần liên tiếp chỉ tính một lần |
| UI-03 | Câu thoại `nguyen-ai-quoc` | Có dòng số trang |
| UI-04 | Chơi tay hết game chỉ bằng chuột | Không kẹt |
| UI-05 | Chơi tay hết game chỉ bằng bàn phím | Không kẹt |
| UI-06 | Màn hình 1366×768 và 1920×1080 | Chữ không bị cắt |

**Cổng:** UI-01 đến UI-06 đạt.

---

## P7 — Art, âm thanh, màn kết

**Issue:** [#26](https://github.com/minhzu16/Hanh_Trinh_Do/issues/26), [#27](https://github.com/minhzu16/Hanh_Trinh_Do/issues/27), [#28](https://github.com/minhzu16/Hanh_Trinh_Do/issues/28), [#29](https://github.com/minhzu16/Hanh_Trinh_Do/issues/29), [#30](https://github.com/minhzu16/Hanh_Trinh_Do/issues/30) · **Milestone:** [P7](https://github.com/minhzu16/Hanh_Trinh_Do/milestone/8)

**Mục tiêu:** đủ asset theo `05-art-brief.md` và `09-am-thanh.md`. **Ai:** UI, KT.

### Việc
- [ ] Hình nền (14), sprite (5 nhân vật hư cấu + Nguyễn Ái Quốc), CG (14) theo 05 — đã có 14/14 hình nền, sprite một dáng, 7/14 CG (F-11)
- [ ] Tư liệu thật cho bộ sưu tập: chỉ dùng ảnh có giấy phép rõ, ghi `image_credit`
- [x] Nhạc nền và hiệu ứng theo 09 (tự tổng hợp; cột nguồn trong 09 đã ghi)
- [ ] ~~`scripts/check-assets.mjs`~~ — art nằm trong code SVG chứ không ở `public/`, nên thay bằng test A-07 trong `11-lo-trinh-hoan-thien.md` (mọi mã `cg-` có hình riêng); nhạc `bgm-` đã có test trong `src/audio.test.ts`

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| A-01 | `node scripts/check-assets.mjs` | 0 asset thiếu |
| A-02 | Soát tay bộ sưu tập | Mọi tư liệu có `image_credit`; ảnh AI có nhãn "ảnh minh hoạ" |
| A-03 | Chơi với âm lượng 50% | Nhạc không át lời thoại |

**Cổng:** A-01 đến A-03 đạt.

---

## P8 — Chơi thử

**Issue:** [#31](https://github.com/minhzu16/Hanh_Trinh_Do/issues/31), [#32](https://github.com/minhzu16/Hanh_Trinh_Do/issues/32) · **Milestone:** [P8](https://github.com/minhzu16/Hanh_Trinh_Do/milestone/9)

**Mục tiêu:** nhịp 20 phút, không ai phải hỏi cách chơi. **Ai:** KT.

### Việc
- [ ] Ít nhất 3 người ngoài nhóm chơi, bấm giờ, ghi lựa chọn sai nhiều nhất
- [ ] Ghi các chỗ cần sửa vào `docs/10-can-sua.md` (tạo khi bắt đầu P8)
- [ ] Sửa trực tiếp trên JSON; chạy lại validate

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| PT-01 | Bấm giờ 3 người chơi | ≥ 2/3 người xong trong 18–24 phút |
| PT-02 | Hỏi sau khi chơi: "Hai văn kiện nào là Cương lĩnh đầu tiên?" | ≥ 2/3 trả lời đúng |
| PT-03 | Không ai phải hỏi "bấm gì tiếp" | 0 lần |

**Cổng:** PT-01 đến PT-03 đạt.

---

## P9 — Deploy và trình bày

**Issue:** [#33](https://github.com/minhzu16/Hanh_Trinh_Do/issues/33), [#34](https://github.com/minhzu16/Hanh_Trinh_Do/issues/34) · **Milestone:** [P9](https://github.com/minhzu16/Hanh_Trinh_Do/milestone/10)

**Mục tiêu:** bản Production ổn định, có bản dự phòng offline. **Ai:** GP, KT.

### Việc
- [x] Build Command trên Vercel = `pnpm check`; Production: https://hanh-trinh-do.vercel.app
- [ ] Bản offline trên laptop trình bày (`pnpm preview`)
- [ ] Quay video dự phòng 1 phút (Kỳ 2, cảnh `k2-c2`)
- [ ] Hoàn thiện `06-presentation.md`, tập trình bày

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| DEP-01 | Đẩy commit làm `data/` đỏ lên nhánh thử | CI đỏ, Vercel không deploy |
| DEP-02 | Mở Production trong cửa sổ ẩn danh, chơi hết Kỳ 0 | Không có 404 trong Network |
| DEP-03 | Tắt wifi, `pnpm preview` | Chơi được từ đầu đến tổng kết |
| DEP-04 | Mở `?canh=k2-c2` | Vào thẳng cảnh Chánh cương |
| DEP-05 | Tập trình bày có bấm giờ | Xong trong thời gian lớp cho phép |

**Cổng:** DEP-01 đến DEP-05 đạt.
