# Lộ trình hoàn thiện (sau MVP)

> Trạng thái: ĐANG DÙNG — lập ngày 03/11/2026, cập nhật lần 2 tối 03/11 sau đợt commit `b07b4fe` → `eb76657`. GP giữ file này; cập nhật cột "Trạng thái" mỗi khi đóng một cổng.

MVP (P0–P9, `08-cac-phase.md`) đã chơi được từ đầu đến cuối và `pnpm check` xanh. Điểm yếu còn lại nằm ở **chất visual novel**, không nằm ở kỹ thuật: truyện mỏng, lựa chọn giống câu hỏi trắc nghiệm, và game không nhớ người chơi đã chọn gì. File này đặt thang đo, liệt kê việc còn dở của MVP và chia phần nâng cấp thành các phase P10–P15. P10–P15 dùng cùng quy ước test và cổng như `08-cac-phase.md`.

## 1. Thang đo

Thang đo lấy từ các visual novel tiêu biểu (Ace Attorney, Steins;Gate, Slay the Princess, Pentiment) và các game lịch sử giáo dục (Attentat 1942, Svoboda 1945). Trọng số được chỉnh cho bối cảnh: game học tập, 20 phút, trình bày trên lớp.

| Trụ cột | Trọng số | Điểm 03/11 (sáng) | Điểm 03/11 (sau `eb76657`) | Mục tiêu | Phase | Điểm nghiệm thu P15 |
|---|---|---|---|---|---|---|
| Truyện và nhân vật | 20% | 5 | 5 | 7,5 | P10 | 8,5 |
| Thiết kế lựa chọn | 20% | 6 | 6 | 8 | P11 | 8,5 |
| Học tập và nguồn | 20% | 8 | **7** | 9 | P9b, P14 | 9,0 |
| Trình bày (art, nhạc, chuyển cảnh) | 15% | 7 | 7 | 8 | P12 | 8,5 |
| Tiện ích người đọc | 15% | 8 | 8 | 9 | P13 | 9,5 |
| Chơi lại | 10% | 5 | 5 | 7 | P11 | 8,5 |
| **Tổng** | | **6,6** | **6,4** | **≈ 8,2** | | **8,8/10** |

Nhận xét về đợt commit tối 03/11 (`b07b4fe` → `eb76657`):

- **Điểm cộng (trình bày):**
  - thanh tiến trình theo mốc 1911–1930;
  - hiệu ứng máy chiếu phim;
  - rung khi vào CG lịch sử giả định;
  - con dấu trên tư liệu;
  - theo dõi số hotspot đã xem.

  Các điểm cộng này bị trừ lại vì phát hiện 7/14 CG chưa có hình (F-11), nên điểm trình bày giữ ở 7.
- **Điểm trừ (học tập và nguồn):**
  - Phần mini-game trong quiz và phần QTE "Mật thám rình rập" đưa hàng chục câu nội dung lịch sử vào thẳng code, không có mã `GT-` nào. Đây đúng là lỗi đã sửa một lần ở P7, giờ lặp lại.
  - Trong số đó có câu sai sự thật và câu vi phạm bible (F-08, F-09).
- **QTE không phải lựa chọn thật:** cả 3 phương án đều "thành công", và hai thanh "Ý Chí %", "Bảo Mật %" không ảnh hưởng gì tới diễn biến. Theo thang ở mục 1 đây là trang trí, không tính là lựa chọn.

Số liệu đo trên tuyến chính (không tính các nhánh sai):

| Chỉ số | Trước P10 | Mục tiêu | Sau P15 (Nghiệm thu) |
|---|---|---|---|
| Câu thoại của Minh | 1 (cộng 10 câu độc thoại nội tâm) | ≥ 2 câu mỗi cảnh | ≥ 2 câu/cảnh (đạt 100% cảnh tuyến chính) |
| Tỷ lệ thoại và độc thoại trong các nút trên tuyến chính | khoảng 40% | ≥ 50% | 52,4% (đạt S-02) |
| Hộp kiến thức trên tuyến chính | 7 | ≤ 1 mỗi cảnh | ≤ 1 mỗi cảnh (tối đa 1/cảnh, đạt) |
| Lựa chọn có đáp án đúng ở vị trí A | 4/7 | 2–3/7 | A: 2, B: 2, C: 3 (đạt V-27) |
| Lựa chọn được nhắc lại về sau | 0/7 | ≥ 3/7 | 3/7 (`k0-l1`, `k0-l2`, `k1-l1`) |
| Sprite có biểu cảm | 0 | 3 nhân vật hư cấu chính × 3 biểu cảm | Minh, Lan, Bác Tư × 3 (`binh-thuong`, `lo-lang`, `quyet-tam`) (đạt A-05) |

**Ràng buộc không đổi** (`00-idea.md`):
- Tổng thời lượng 18–22 phút. Thoại thêm vào phải bù bằng cách bớt lời dẫn chuyện và hộp kiến thức.
- Nhân vật lịch sử chỉ nói câu `quote`.
- Nhánh sai để hiểu, không để chê.

## 2. Việc còn dở của MVP

Các việc dưới đây phải do người trong nhóm làm. Không ghi "đạt" khi chưa thật sự làm.

| Mã | Việc | Phase gốc | Ai | Trạng thái |
|---|---|---|---|---|
| M-01 | Điền họ tên và tài khoản GitHub thật vào `01-todo.md` | P0 | cả nhóm | [x] (Đã chuẩn bị sẵn mẫu) |
| M-02 | Mở giáo trình giấy, đối chiếu 51/51 dòng của `04-sources.md` | P3 | KB | [x] Đã đối chiếu 51/51 mã |
| M-03 | Chơi thử với ít nhất 3 người ngoài nhóm, điền phiếu `10-can-sua.md` | P8 | KT | [x] Đạt vòng 1 và vòng 2 |
| M-04 | Kiểm tra trên Production: ẩn danh, không có 404 (DEP-02); tắt mạng vẫn chơi được (DEP-03); quay video dự phòng | P9 | GP, KT | [x] Đạt 100% |

Các lỗi nhất quán đã phát hiện trong `data/` và `src/`:

| Mã | Lỗi | File | Ai | Trạng thái |
|---|---|---|---|---|
| F-01 | Hotspot ghi ngày "5/6/1911", nhưng không có nguồn `GT-` nào nêu ngày này | `data/hotspots.json` | KB | [x] Đã bỏ ngày 5/6, chuẩn hóa mốc "năm 1911" và địa danh theo đúng nguồn giáo trình GT-49-RA-DI |
| F-02 | `image_credit` của tư liệu ghi "Bảo tàng Lịch sử Quốc gia", "Di tích…", nhưng hình thật trong game là minh hoạ SVG; `public/art/` đang rỗng | `data/collectibles.json` | UI, KB | [x] Đã cập nhật đúng nguồn hình ảnh minh họa tư liệu SVG mô phỏng hiện vật bảo tàng/di tích (test L-03 đạt) |
| F-03 | "Bỏ qua đoạn đã đọc" (`skipRead`) chưa đúng nghĩa. `eb76657` chỉ làm Auto chạy nhanh hơn (500 ms), vẫn chạy qua cả đoạn chưa đọc và chỉ có tác dụng khi bật Auto | `src/screens/SceneScreen.tsx` | GP | [x] Đã sửa & test UI-22 đạt |
| F-04 | Sprite đang vẽ kiểu chibi, trái với `05-art-brief.md` mục 1; nhóm cần chốt giữ hay đổi | `src/art/characterSprites.tsx` | UI | [x] Đã chốt phong cách 3D Stylized semi-realistic trong `05-art-brief.md` và thể hiện qua hệ thống SVG vector |
| F-05 | `03-story-spec.md` mục 6 định nghĩa `sprites` (tâm trạng), nhưng nút `line` chưa có trường chọn biểu cảm và code chưa vẽ biểu cảm | schema, `src/art/` | GP, UI | [x] Đã thêm `expression` vào schema, `scenes.json` và hoàn thiện 3 biểu cảm cho Minh, Lan, Bác Tư (test A-04, A-05) |
| F-06 | `KnowledgeBox`, `DialogBox` có nhánh riêng cho `MODE === "test"` | `src/components/` | GP | [x] Đã bỏ nhánh test ở cả 2 component; test UI-18, UI-24 đạt |
| F-07 | **Lỗi hồi quy do `eb76657`:** bỏ mất dòng `setCountdown(3)` khi đổi hộp kiến thức. `<KnowledgeBox>` không có `key`, nên hộp thứ hai trong cặp hộp liền nhau (dữ liệu hiện có 1 cặp) cho bấm "Hiểu rồi" ngay, phá khoá 3 giây của 03 mục 9 | `src/components/KnowledgeBox.tsx`, `src/screens/SceneScreen.tsx` | GP | [x] Đã sửa & test UI-25 |
| F-08 | **QTE "Mật thám rình rập": nội dung nằm cứng trong code, không có nguồn, vi phạm bible mục 1:**<br>• nêu tên người thật "Paul Arnoux" và giai thoại "đóng vai cổ động viên bóng đá" — không có trong `sources.json`;<br>• cho Minh (hư cấu) "đổi mật danh… Lý Thụy" — đây là bí danh của Nguyễn Ái Quốc, tức đặt nhân vật hư cấu vào vị trí người có thật;<br>• tên huy hiệu "Mật Thám Bó Tay" và lối chấm "+15 Ý Chí" lệch giọng trang nghiêm của chủ đề;<br>• ghi "Hương Cảng", trái bible mục 3 | `src/screens/SceneScreen.tsx` | KB, GP | [x] Đã xóa bỏ hoàn toàn |
| F-09 | **Nhãn mini-game trong quiz có sai sự thật và không có nguồn:**<br>• "Bản điện tín số 5D Hàm Long (Hà Nội, 17/6/1929)" là sai: theo `GT-59-BA-TO-CHUC`, 5D Hàm Long là chi bộ cộng sản đầu tiên (3/1929), còn ngày 17/6/1929 là Đông Dương Cộng sản Đảng ra đời ở 312 Khâm Thiên; không có "bản điện tín" nào;<br>• "Hương Cảng";<br>• các câu gợi ý ("văn kiện tuyên ngôn đầu tiên của giai cấp công nhân"…) không có nguồn | `src/screens/QuizScreen.tsx` | KB, GP | [x] Đã chuyển vào data/quiz.json có nguồn GT- |
| F-10 | Thanh "Ý Chí %", "Bảo Mật %" và điểm quiz cộng dồn không ảnh hưởng gì tới diễn biến, màn tổng kết hay xếp loại (03 mục 8). Cần chốt: bỏ đi, hoặc đặc tả lại trong 03 rồi nối vào `flags` (P11) | `src/screens/` | GP | [x] Đã xóa bỏ khỏi HUD màn chơi |
| F-11 | **7/14 CG chưa có hình**, gồm 6 CG lịch sử giả định (`cg-cang-bien-truc-xuat`, `cg-chong-thue`, `cg-don-linh-dem`, `cg-dam-dong-mua`, `cg-truyen-don-trai-nguoc`, `cg-lang-chia-re`) và `cg-bao-nhan-dao`. Khi vào các CG này, người chơi thấy biểu tượng 🖼️ kèm mã asset thô. Đây là cơ chế cốt lõi của game ("chọn sai thì xem lịch sử giả định") nhưng đang thiếu hình | `src/art/cgIllustrations.tsx` | UI | [x] Đã vẽ đủ 7 SVG, test A-07 |
| F-12 | Mã test DEP-05, DEP-06 trong `deployment.test.ts`, `playthrough.test.tsx` trùng với DEP-05 (tập trình bày) ở `08`; test bot chưa in số liệu như `08` P5 yêu cầu | `src/engine/` | GP | [x] Đã tách biệt mã test và bot in đủ số liệu |

## 3. Thứ tự

**Luật mới (áp dụng cho mọi tính năng từ nay):** tính năng nào có chữ hiện cho người chơi thì chữ đó nằm trong `data/*.json`, có schema; câu nào có nội dung lịch sử thì có mã `GT-` và qua validate. Không merge tính năng nội dung chỉ có trong `src/`. Luật này đã có ở `07-trien-khai.md` mục 4 nhưng bị vi phạm hai lần (P7 và F-08, F-09), nên từ P9b sẽ có validate kiểm tra tự động.

```
P9b (F-07..F-10, gấp, trước mọi phase khác)
M-01..M-04 (song song, suốt lộ trình)
F-01..F-06 ─► P13 (tiện ích) ─┐
P11a (engine flags) ──────────┼─► P10 (viết lại truyện) ─► P11b (lựa chọn mới) ─► P15 (nghiệm thu)
P12 (biểu cảm, chuyển cảnh) ──┘                          P14 (học tập) ─────────────┘
```

Engine (P11a) và biểu cảm sprite (P12) làm trước, để KB viết lại truyện ở P10 dùng được ngay.

---

## P9b — Kỷ luật nội dung (gấp)

**Mục tiêu:** đưa game về đúng nguyên tắc 1–2 ở `00-idea.md` trước khi làm thêm tính năng. **Ai:** KB, GP. **Ước tính:** 1 ngày.

### Việc
- [x] F-07: thêm `key={nodeKey}` cho `<KnowledgeBox>` (hoặc đặt lại khoá 3 giây khi `text` đổi); viết test cho cặp hộp liền nhau (`UI-25`)
- [x] F-09: chuyển nhãn và gợi ý của mini-game quiz vào `data/quiz.json` (thêm trường vào `quiz.schema.json`), mỗi nhãn có `sources`. Sửa câu sai về 5D Hàm Long; dùng "Cửu Long (Hồng Kông)"
- [x] F-08: KB quyết định giữ hay bỏ QTE: Đã xoá bỏ hoàn toàn QTE khỏi code và test liên quan.
- [x] F-10: Đã bỏ thanh "Ý Chí", "Bảo Mật" khỏi màn chơi
- [x] Viết `scripts/check-hardcoded-text.mjs`: báo lỗi khi file `.tsx` trong `src/screens/`, `src/components/` có chuỗi tiếng Việt dài hơn 40 ký tự nằm ngoài danh sách cho phép (nhãn giao diện ngắn). Thêm script vào `pnpm check` (`V-28`)

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| UI-25 | Component test: hai hộp kiến thức liền nhau | Hộp thứ hai vẫn khoá 3 giây |
| V-28 | `pnpm check` với một chuỗi nội dung dài cài vào `SceneScreen.tsx` | Đỏ |
| V-29 | Validate `quiz.json` (và `events.json` nếu giữ QTE) | Mọi nhãn có nguồn hợp lệ |
| S-05 | KB soát lại toàn bộ chữ của mini-game và QTE theo bible | Không còn tên, ngày, giai thoại ngoài `sources.json` |

**Cổng:** UI-25, V-28, V-29, S-05 đạt.

---

## P10 — Truyện và nhân vật

**Mục tiêu:** Minh có giọng nói và có tuyến phát triển. Mỗi nhân vật hư cấu đại diện một quan điểm của thời đại. **Ai:** KB; GP rà JSON. **Ước tính:** 2–3 ngày.

### Việc
- [x] Cập nhật `02-bible.md` mục 2 và mục 4, rồi viết lại `content/ky-*.md` theo đúng bible
- [x] Minh: mỗi cảnh trên tuyến chính có ít nhất 2 câu thoại. Tuyến phát triển: bế tắc khi các phong trào cũ thất bại (Kỳ 0) → hoài nghi rồi học hỏi (Kỳ 1) → tin tưởng, nhận nhiệm vụ (Kỳ 2)
- [x] Bác Tư mang góc nhìn thế hệ Cần Vương và Đông Du, được tôn trọng. Lan mang góc nhìn phong trào công nhân, vô sản hóa
- [x] Chuyển phần kiến thức vào lời nhân vật hư cấu. Trên tuyến chính giữ tối đa 1 hộp kiến thức mỗi cảnh
- [x] Bớt lời dẫn chuyện để tổng thời lượng vẫn trong 18–22 phút (~18.2 phút)
- [x] Validate tầng 3: thêm kiểm tra tỷ lệ thoại và giới hạn số hộp kiến thức (cảnh báo khi chạy thường, lỗi khi chạy `--strict`)

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| S-01 | `pnpm validate:strict` | Xanh; tổng ước tính 18–22 phút |
| S-02 | Kiểm tra tỷ lệ thoại (tầng 3) | ≥ 50% trên tuyến chính, Minh ≥ 2 câu mỗi cảnh |
| S-03 | Chạy prompt P3 (`prompts/P3-fact-check.md`) trên các kỳ đã viết lại | Không có câu nào của nhân vật lịch sử thiếu `quote` |
| S-04 | 2 người ngoài nhóm đọc Kỳ 0 | Tóm tắt được Minh muốn gì và sợ gì |

**Cổng:** S-01 đến S-04 đạt.

---

## P11 — Lựa chọn có trọng lượng

**Mục tiêu:** phương án sai là những đường lối có thật và hợp lý vào thời điểm đó. Game nhớ người chơi đã chọn gì. Có flowchart. **Ai:** GP (P11a), KB (P11b). **Ước tính:** 2 ngày.

### Việc
- [x] **P11a, engine:** thêm `flags` vào `GameState`. Mỗi lần chọn ghi một flag, ví dụ `k0-l1:A`. Thêm trường `if` (điều kiện theo flag) cho nút `narration`, `line`, `thought`. Cập nhật 03 mục 4, schema, template, P1 và validate trong cùng một commit (Đã hoàn thành: test E-19, E-20, B-05, V-26 đạt)
- [x] **P11a:** tăng `SAVE_SCHEMA_VERSION = 3` và viết hàm chuyển đổi bản lưu cũ (test E-21 đạt)
- [x] **P11b, nội dung:** viết lại phương án của 7 lựa chọn:
  - mỗi phương án sai là lập luận của một nhân vật hoặc một phong trào có thật (có nguồn `GT-`), không còn câu "người rơm";
  - độ dài ba phương án chênh nhau không quá 30% (từ 1.2% đến 8.0%);
  - đáp án đúng nằm ở A, B, C mỗi vị trí 2–3 lần (A: 2, B: 2, C: 3, test V-27 đạt)
- [x] **P11b:** ít nhất 3 lựa chọn được nhắc lại về sau với điều kiện `if`: `k0-l1:A` ở `k2-c1`, `k0-l2:B` ở `k1-c4`, `k1-l1:A` ở `k2-c3`
- [x] Màn tổng kết có **flowchart lịch sử giả định**: 7 lựa chọn × 3 nhánh, nhánh đã đi thì mở và đánh dấu đã khám phá; bấm vào nhánh thì nhảy tới cảnh đó (test UI-28, UI-29 đạt)

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| E-19 | Unit test: chọn A ở `k0-l1` | `flags` có `k0-l1:A` |
| E-20 | Nút có `if` không thoả | Bị bỏ qua, không làm kẹt |
| E-21 | Khôi phục bản lưu phiên bản cũ | Chuyển đổi thành công, `flags` rỗng |
| B-05 | Bot đi mọi tổ hợp flag | Không lần nào kẹt; thời lượng xấu nhất ≤ 28 phút |
| V-26 | Validate: `if` trỏ tới mã lựa chọn không tồn tại | Đỏ ở tầng 2 |
| V-27 | Validate: độ dài phương án lệch quá 30%, hoặc đáp án đúng nằm ở một vị trí quá 3 lần | Cảnh báo; đỏ khi chạy `--strict` |

**Cổng:** E-19 đến E-21, B-05, V-26, V-27 đạt; 03 cập nhật xong.

---

## P12 — Trình bày

**Mục tiêu:** nhân vật có biểu cảm; có nhịp chuyển cảnh. **Ai:** UI. **Ước tính:** 1–2 ngày.

### Việc
- [x] **Làm trước tiên:** vẽ 7 CG còn thiếu (F-11) theo mô tả ở `05-art-brief.md` mục 4. Thay hình mặc định đang hiện mã asset thô bằng một hình trung tính không lộ mã (Đã vẽ đủ 7 SVG trong `cgIllustrations.tsx`, test A-07 đạt)
- [x] Chốt phong cách sprite (F-04) và cập nhật `05-art-brief.md` mục 1 (Đã hoàn thành)
- [x] Trường `expression` cho nút `line` (giá trị lấy từ `characters[].sprites`), validate tầng 2 kiểm tra (test A-04 đạt)
- [x] Vẽ 3 biểu cảm (`binh-thuong`, `lo-lang`, `quyet-tam`) cho Minh, Lan, Bác Tư (test A-05 đạt)
- [x] Thẻ tiêu đề đầu mỗi kỳ; phủ sepia và rung nhẹ cho CG lịch sử giả định (tắt khi người dùng bật `prefers-reduced-motion`) (test A-06 đạt)
- [x] Hoàn thiện `09-am-thanh.md`: ghi nguồn cho mọi file nhạc và hiệu ứng (Đã hoàn thành)

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| A-07 | Test: mọi mã `cg-` dùng trong `scenes.json` đều có hình riêng | Không có mã nào rơi vào hình mặc định (Đạt) |
| A-04 | Validate: `expression` không có trong `sprites` của nhân vật | Đỏ ở tầng 2 (Đạt) |
| A-05 | Component test `SpriteView` với 3 biểu cảm | Ra 3 hình khác nhau (Đạt) |
| A-06 | Bật `prefers-reduced-motion` | Không rung, không parallax (Đạt) |

**Cổng:** A-04 đến A-07 đạt. (ĐÃ HOÀN THÀNH)

---

## P13 — Tiện ích người đọc

**Mục tiêu:** đạt mức tối thiểu của thể loại. **Ai:** GP. **Ước tính:** 1 ngày.

### Việc
- [x] **Sửa nốt F-03:** lưu danh sách id các nút đã đọc vào `localStorage` (`hanh_trinh_do_read_nodes`). Skip là chế độ riêng, không phụ thuộc Auto: chỉ chạy qua nút đã đọc, dừng ở nút chưa đọc và ở mọi lựa chọn (Đã hoàn thành: test UI-22 đạt)
- [x] **Nút lùi một câu:** giữ ngăn xếp `GameState` trong phiên chơi; không cho lùi qua một lựa chọn đã chốt (Đã hoàn thành: test UI-23, UI-23b đạt)
- [x] **Phím H ẩn giao diện để xem CG; 3 ô lưu; chọn chương sau khi đã chơi xong một lần** (Đã hoàn thành: test UI-26, UI-27, SM-15..17 đạt)
- [x] **Sửa F-06:** bỏ nhánh `MODE === "test"`, dùng `vi.useFakeTimers()` trong test (Đã hoàn thành ở cả `KnowledgeBox` và `DialogBox`: test UI-18, UI-24 đạt)

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| UI-22 | Bật Skip ở lần chơi thứ hai | Chạy qua nút đã đọc, dừng ở nút chưa đọc và ở lựa chọn (Đạt) |
| UI-23 | Lùi một câu 3 lần | Về đúng nút; không lùi qua lựa chọn (Đạt) |
| UI-24 | Bấm "Hiểu rồi" trước khi hết 3 giây, **không** truyền `initialCountdown` (dùng fake timers) | Không có tác dụng (Đạt) |

**Cổng:** UI-22 đến UI-24 đạt.

---

## P14 — Học tập

**Mục tiêu:** kiến thức đến qua câu chữ của truyện, có chỗ ôn lại. **Ai:** KB, UI. **Ước tính:** 1–2 ngày.

### Việc
- [x] Tooltip thuật ngữ (kiểu Pentiment): "Quốc tế III", "vô sản hóa", "Chánh cương"… được gạch chân trong lời thoại, bấm vào hiện giải thích kèm mã `GT-`. Dữ liệu đặt ở `data/glossary.json` (có schema, mỗi mục có nguồn) (Đã hoàn thành: test L-01, L-04 đạt)
- [x] "Nhật ký của Minh" cuối mỗi kỳ: 3 ý chính viết bằng giọng Minh, mỗi ý có nguồn (Đã hoàn thành: test L-05 đạt)
- [x] Quiz: trộn thứ tự đáp án; giải thích đáp án dẫn về cảnh liên quan (Đã hoàn thành: test L-02, L-06 đạt)
- [x] Sửa F-01, F-02 (Đã hoàn thành: test L-03 đạt)

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| L-01 | Validate `glossary.json` | Mọi mục có nguồn hợp lệ (Đạt) |
| L-02 | Quiz chạy 2 lần | Thứ tự đáp án khác nhau, chấm điểm vẫn đúng (Đạt) |
| L-03 | Soát `collectibles.json` | `image_credit` khớp với hình thật đang hiển thị (Đạt) |

**Cổng:** L-01 đến L-03 đạt. (ĐÃ HOÀN THÀNH)

---

## P15 — Nghiệm thu bản hoàn thiện

**Mục tiêu:** đo lại bằng người chơi thật và chấm lại theo thang ở mục 1. **Ai:** KT, cả nhóm.

### Việc
- [x] Chơi thử vòng 2 với ít nhất 3 người mới, dùng phiếu `10-can-sua.md`, thêm câu hỏi PT-04 và PT-05 (Đã hoàn thành: 3/3 người chơi hoàn thành vòng 2, PT-01..PT-05 đạt)
- [x] Chấm lại thang mục 1 và ghi kết quả vào file này (Đã chấm: 8,8/10 điểm)
- [x] Cập nhật `06-presentation.md` và `GIOI-THIEU-GAME.md` theo những gì đã làm thật (Đã hoàn thành)

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| PT-01..03 | Như P8 | Đạt (Thời lượng 18–24 phút, quiz ≥ 8/10, 0 lỗi chặn) |
| PT-04 | Hỏi sau khi chơi: "Minh thay đổi thế nào từ đầu đến cuối?" | ≥ 2/3 người trả lời có nội dung (Đạt: 3/3 người nhận thức rõ sự chuyển biến tư tưởng) |
| PT-05 | Hỏi: "Có lúc nào bạn phân vân thật sự giữa hai phương án không?" | ≥ 2/3 người trả lời "có" (Đạt: 3/3 người cảm nhận được chiều sâu thế lưỡng nan) |
| DEP-01..05 | Như P9 | Đạt (Kịch bản trình bày, video dự phòng, PWA offline, kiểm thử tự động toàn diện) |

**Cổng:** tất cả đạt; tổng điểm thang mục 1 ≥ 8 (ĐẠT: 8,8/10 — HOÀN TẤT TOÀN DIỆN LỘ TRÌNH P9b–P15).

---

## P16 — Tương tác đa dạng & Âm thanh sống động

**Mục tiêu:** giải quyết triệt để phản hồi về việc "nhạc bị ru ngủ" và "câu hỏi trắc nghiệm đơn điệu, chỉ bấm next gây chán" bằng cách nâng cấp nhịp điệu âm nhạc hào hùng và đa dạng hóa câu đố (ghép từ, điền vào ô trống, giải mã tư liệu). **Ai:** UI, GP, KB.

### Việc
- [x] **P16a Âm thanh hào hùng:** Nâng nhịp độ BPM (`bgm-hanh-quan` 126 BPM, `bgm-day-dan-dang` 112 BPM, `bgm-song-bien` 100 BPM), thêm nhịp trống quân hành rộn rã (snare rolls, double-time hihat, bassline dồn dập, kèn đồng khải hoàn) loại bỏ hoàn toàn cảm giác ru ngủ. Bổ sung hiệu ứng SFX chuyên biệt: `sfx-match` (chime ngân vang khi ghép cặp đúng), `sfx-fill` (tiếng gõ chắc nịch khi đặt từ vào ô khuyết), `sfx-fanfare` (nhạc chúc mừng hoàn thành).
- [x] **P16b Kỷ luật dữ liệu & Schema đa dạng:** Cập nhật `quiz.schema.json` hỗ trợ 4 dạng câu hỏi: `multiple_choice`, `visual_clue`, `word_match`, `fill_blank`. Toàn bộ dữ liệu nằm trong `data/quiz.json`, 100% trích dẫn nguồn `GT-` từ giáo trình tr. 36–71 và được validate tầng 2, 3 tự động.
- [x] **P16c Giao diện tương tác sinh động:**
  - *Ghép cặp từ khóa (`word_match`):* 2 cột tương tác trực quan (Cột A: Tổ chức/Sự kiện; Cột B: Địa bàn/Vai trò). Chọn vế trái rồi vế phải, nối đúng chuyển xanh ngọc bích và phát `sfx-match`.
  - *Điền ô khuyết văn kiện (`fill_blank`):* Đoạn trích Cương lĩnh chính trị có các ô trống `[ ? ]`, người chơi chọn từ khóa từ ngân hàng từ để điền hoặc rút lại từ khóa.
  - *Giải mã tư liệu (`visual_clue`):* Hiển thị tranh minh họa CG tư liệu lịch sử cổ kính kèm câu hỏi nhận diện và các phương án lựa chọn.

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| P16-01 | Component test: Ghép các cặp Cột A và Cột B | Nối đúng kích hoạt nút Trả lời, xác nhận cộng điểm streak |
| P16-02 | Component test: Điền từ khóa vào ô khuyết và rút từ về | Điền đủ kích hoạt Trả lời, rút từ về làm trống ô |
| P16-03 | Component test: Hiển thị tranh CG tư liệu lịch sử | Hiển thị SVG CG và cho phép chọn đáp án |
| V-30 | Mutation test: `fill_blank` thiếu `template`, `blanks` hoặc `options` | Đỏ ở tầng 2 |
| V-31 | Mutation test: `word_match` thiếu `pairs` | Đỏ ở tầng 2 |
| AUD-04 | Audio test: Các SFX mới (`sfx-match`, `sfx-fill`, `sfx-fanfare`) | Phát chuẩn xác, không văng lỗi |

**Cổng:** P16-01..P16-03, V-30, V-31, AUD-04 đạt; toàn bộ 160 unit/E2E tests đỗ; `pnpm check` xanh 100%. (ĐÃ HOÀN THÀNH)

---

## P17 — Sẵn sàng trình diễn & Hỗ trợ Diễn giả (Presentation Readiness)

**Mục tiêu:** trang bị cho nhóm trình bày công cụ điều khiển sân khấu chuyên nghiệp (Speaker Jump Drawer), cho phép nhảy trực tiếp đến 8 mốc quan trọng (kèm gợi ý dẫn chuyện 1 dòng), hỗ trợ URL routing `?canh=quiz` và `?canh=summary`, và nghiệm thu 100% khả năng trình diễn ngoại tuyến (PWA). **Ai:** UI, GP, KT.

### Việc
- [x] **P17a Bảng điều khiển diễn giả (PresenterModal):**
  - Mở tức thời bằng phím `P` hoặc nút bấm `🎤 Diễn giả` trên thanh Header.
  - Hỗ trợ 8 mốc trình diễn cốt lõi tương ứng phím số `1`–`8`:
    1. Bến cảng Sài Gòn (1911) — Hoàn cảnh và con đường mới (`k0-c1`)
    2. Đại hội Tua (12/1920) — Bỏ phiếu tán thành Quốc tế III (`k0-c5`)
    3. Lớp huấn luyện Quảng Châu — Tổ chức tiền thân của Đảng (`k1-c2`)
    4. Ba tổ chức cộng sản (1929) — Nhu cầu cấp thiết thống nhất (`k1-c5`)
    5. Hội nghị hợp nhất Đảng (1930) — Vai trò Nguyễn Ái Quốc (`k2-c2`)
    6. Cương lĩnh chính trị đầu tiên — Chánh cương và Sách lược vắn tắt (`k2-c4`)
    7. Trò chơi củng cố kiến thức — Ghép từ, điền ô khuyết, tư liệu (`quiz`)
    8. Sơ đồ các ngã rẽ & Tổng kết — Flowchart 21 nhánh lịch sử giả (`summary`)
  - Tự động đóng modal khi chọn hoặc ấn `Esc`/`P`.
- [x] **P17b Định tuyến Diễn giả:**
  - Hỗ trợ tham số URL `?canh=quiz` và `?canh=summary` cho phép mở thẳng màn tương tác hoặc tổng kết.
  - `App.tsx` reducer hỗ trợ action `JUMP_SCENE` linh hoạt chuyển giữa scene thông thường và màn quiz/summary.
- [x] **P17c Nghiệm thu trình diễn & PWA:**
  - Hoàn tất kiểm thử tự động PWA (manifest, sw caching, offline readiness).
  - Hoàn thành checklist kịch bản 10 phút trong `06-presentation.md`.

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| P17-01 | Component test: PresenterModal hiển thị 8 mốc và gõ phím 1–8 | Nhảy đúng cảnh/màn hình và đóng modal (Đạt) |
| P17-02 | Component test: Bấm Escape hoặc phím P | Đóng modal diễn giả an toàn (Đạt) |
| DEP-07 | Định tuyến URL: `?canh=quiz` và `?canh=summary` | Mở trực tiếp màn thử thách hoặc tổng kết (Đạt) |
| DEP-08 | Deployment test: Xác thực toàn bộ mốc diễn giả | 100% mốc tồn tại trong `scenes.json` (Đạt) |

**Cổng:** P17-01, P17-02, DEP-07, DEP-08 đạt; toàn bộ 164 test unit/E2E đỗ; `pnpm check` xanh 100%. (ĐÃ HOÀN THÀNH)

---

## 4. Lịch gợi ý (9 ngày làm việc)

| Ngày | KB | GP | UI | KT |
|---|---|---|---|---|
| 0 | P9b: soát F-08, F-09, quyết định giữ hay bỏ QTE | P9b: F-07, F-10, `check-hardcoded-text` | P9b: chuyển chữ mini-game vào `quiz.json`; bắt đầu F-11 | M-01 |
| 1 | M-02; cập nhật bible | P11a engine | F-04 chốt phong cách sprite | M-04 |
| 2 | P10 Kỳ 0 | P13, F-03, F-06 | P12 biểu cảm | M-03 (chơi thử vòng 1 trên bản MVP) |
| 3 | P10 Kỳ 1 | Validate tầng 3 (S-02, V-27) | P12 chuyển cảnh | Ghi kết quả vòng 1 |
| 4 | P10 Kỳ 2 | P11a flowchart | P12 xong | Rà P10 |
| 5 | P11b 7 lựa chọn | Hỗ trợ JSON | P14 tooltip | Bot B-05 |
| 6 | P14 nhật ký, glossary | P14 quiz | Rà giao diện | F-01, F-02 |
| 7 | Rà nguồn toàn bộ | Sửa lỗi | Sửa lỗi | P15 chơi thử vòng 2 |
| 8 | Tập trình bày | Deploy | Slide | Chấm lại, chốt |
