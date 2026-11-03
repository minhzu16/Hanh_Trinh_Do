# Lộ trình hoàn thiện (sau MVP)

> Trạng thái: ĐANG DÙNG — lập ngày 03/11/2026. GP giữ file này; cập nhật cột "Trạng thái" mỗi khi đóng một cổng.

MVP (P0–P9, `08-cac-phase.md`) đã chơi được từ đầu đến cuối và `pnpm check` xanh. Điểm yếu còn lại nằm ở **chất visual novel**, không nằm ở kỹ thuật: truyện mỏng, lựa chọn giống câu hỏi trắc nghiệm, và game không nhớ người chơi đã chọn gì. File này đặt thang đo, liệt kê việc còn dở của MVP và chia phần nâng cấp thành các phase P10–P15. P10–P15 dùng cùng quy ước test và cổng như `08-cac-phase.md`.

## 1. Thang đo

Thang đo lấy từ các visual novel tiêu biểu (Ace Attorney, Steins;Gate, Slay the Princess, Pentiment) và các game lịch sử giáo dục (Attentat 1942, Svoboda 1945). Trọng số được chỉnh cho bối cảnh: game học tập, 20 phút, trình bày trên lớp.

| Trụ cột | Trọng số | Điểm 03/11 | Mục tiêu | Phase |
|---|---|---|---|---|
| Truyện và nhân vật | 20% | 5 | 7,5 | P10 |
| Thiết kế lựa chọn | 20% | 6 | 8 | P11 |
| Học tập và nguồn | 20% | 8 | 9 | P14 |
| Trình bày (art, nhạc, chuyển cảnh) | 15% | 7 | 8 | P12 |
| Tiện ích người đọc | 15% | 8 | 9 | P13 |
| Chơi lại | 10% | 5 | 7 | P11 |
| **Tổng** | | **6,6** | **≈ 8,2** | |

Số liệu đo ngày 03/11 trên tuyến chính, tức là không tính các nhánh sai:

| Chỉ số | Hiện tại | Mục tiêu |
|---|---|---|
| Câu thoại của Minh | 1 (cộng 10 câu độc thoại nội tâm) | ≥ 2 câu mỗi cảnh |
| Tỷ lệ thoại và độc thoại trong các nút trên tuyến chính | khoảng 40% | ≥ 50% |
| Hộp kiến thức trên tuyến chính | 7 | ≤ 1 mỗi cảnh |
| Lựa chọn có đáp án đúng ở vị trí A | 4/7 | 2–3/7 |
| Lựa chọn được nhắc lại về sau | 0/7 | ≥ 3/7 |
| Sprite có biểu cảm | 0 | 3 nhân vật hư cấu chính × 3 biểu cảm |

**Ràng buộc không đổi** (`00-idea.md`):
- Tổng thời lượng 18–22 phút. Thoại thêm vào phải bù bằng cách bớt lời dẫn chuyện và hộp kiến thức.
- Nhân vật lịch sử chỉ nói câu `quote`.
- Nhánh sai để hiểu, không để chê.

## 2. Việc còn dở của MVP

Các việc dưới đây phải do người trong nhóm làm. Không ghi "đạt" khi chưa thật sự làm.

| Mã | Việc | Phase gốc | Ai | Trạng thái |
|---|---|---|---|---|
| M-01 | Điền họ tên và tài khoản GitHub thật vào `01-todo.md` | P0 | cả nhóm | [ ] |
| M-02 | Mở giáo trình giấy, đối chiếu 51/51 dòng của `04-sources.md` | P3 | KB | [ ] |
| M-03 | Chơi thử với ít nhất 3 người ngoài nhóm, điền phiếu `10-can-sua.md` | P8 | KT | [ ] |
| M-04 | Kiểm tra trên Production: ẩn danh, không có 404 (DEP-02); tắt mạng vẫn chơi được (DEP-03); quay video dự phòng | P9 | GP, KT | [ ] |

Các lỗi nhất quán đã phát hiện trong `data/` và `src/` (chưa sửa):

| Mã | Lỗi | File | Ai |
|---|---|---|---|
| F-01 | Hotspot ghi ngày "5/6/1911", nhưng không có nguồn `GT-` nào nêu ngày này | `data/hotspots.json` | KB |
| F-02 | `image_credit` của tư liệu ghi "Bảo tàng Lịch sử Quốc gia", "Di tích…", nhưng hình thật trong game là minh hoạ SVG; `public/art/` đang rỗng | `data/collectibles.json` | UI, KB |
| F-03 | Công tắc "Bỏ qua đoạn đã đọc" (`skipRead`) không có tác dụng: không đoạn code nào đọc giá trị này | `src/components/SettingsModal.tsx`, `src/screens/SceneScreen.tsx` | GP |
| F-04 | Sprite đang vẽ kiểu chibi, trái với `05-art-brief.md` mục 1; nhóm cần chốt giữ hay đổi | `src/art/characterSprites.tsx` | UI |
| F-05 | `03-story-spec.md` mục 6 định nghĩa `sprites` (tâm trạng), nhưng nút `line` chưa có trường chọn biểu cảm và code chưa vẽ biểu cảm | schema, `src/art/` | GP, UI |
| F-06 | `KnowledgeBox`, `DialogBox` có nhánh riêng cho `MODE === "test"`, nên khoá 3 giây (03 mục 9) không được test | `src/components/` | GP |

## 3. Thứ tự

```
M-01..M-04 (song song, suốt lộ trình)
F-01..F-06 ─► P13 (tiện ích) ─┐
P11a (engine flags) ──────────┼─► P10 (viết lại truyện) ─► P11b (lựa chọn mới) ─► P15 (nghiệm thu)
P12 (biểu cảm, chuyển cảnh) ──┘                          P14 (học tập) ─────────────┘
```

Engine (P11a) và biểu cảm sprite (P12) làm trước, để KB viết lại truyện ở P10 dùng được ngay.

---

## P10 — Truyện và nhân vật

**Mục tiêu:** Minh có giọng nói và có tuyến phát triển. Mỗi nhân vật hư cấu đại diện một quan điểm của thời đại. **Ai:** KB; GP rà JSON. **Ước tính:** 2–3 ngày.

### Việc
- [ ] Cập nhật `02-bible.md` mục 2 và mục 4, rồi viết lại `content/ky-*.md` theo đúng bible
- [ ] Minh: mỗi cảnh trên tuyến chính có ít nhất 2 câu thoại. Tuyến phát triển: bế tắc khi các phong trào cũ thất bại (Kỳ 0) → hoài nghi rồi học hỏi (Kỳ 1) → tin tưởng, nhận nhiệm vụ (Kỳ 2)
- [ ] Bác Tư mang góc nhìn thế hệ Cần Vương và Đông Du, được tôn trọng. Lan mang góc nhìn phong trào công nhân, vô sản hóa
- [ ] Chuyển phần kiến thức vào lời nhân vật hư cấu. Trên tuyến chính giữ tối đa 1 hộp kiến thức mỗi cảnh
- [ ] Bớt lời dẫn chuyện để tổng thời lượng vẫn trong 18–22 phút
- [ ] Validate tầng 3: thêm kiểm tra tỷ lệ thoại và giới hạn số hộp kiến thức (cảnh báo khi chạy thường, lỗi khi chạy `--strict`)

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
- [ ] **P11a, engine:** thêm `flags` vào `GameState`. Mỗi lần chọn ghi một flag, ví dụ `k0-l1:A`. Thêm trường `if` (điều kiện theo flag) cho nút `narration`, `line`, `thought`. Cập nhật 03 mục 4, schema, template, P1 và validate trong cùng một commit
- [ ] **P11a:** tăng `SAVE_SCHEMA_VERSION` và viết hàm chuyển đổi bản lưu cũ
- [ ] **P11b, nội dung:** viết lại phương án của 7 lựa chọn:
  - mỗi phương án sai là lập luận của một nhân vật hoặc một phong trào có thật (có nguồn `GT-`), không còn câu "người rơm";
  - độ dài ba phương án chênh nhau không quá 30%;
  - đáp án đúng nằm ở A, B, C mỗi vị trí 2–3 lần
- [ ] **P11b:** ít nhất 3 lựa chọn được nhắc lại về sau. Ví dụ: chọn sai `k0-l1` thì Bác Tư nhắc lại ở Kỳ 2; màn tổng kết nói "Bạn từng tin vào…"
- [ ] **P11b:** thêm 1–2 lựa chọn đời tư của Minh, không có đúng/sai (ví dụ ở lại hay ra đi). Lựa chọn này chỉ đổi giọng phần kết, không đổi lịch sử. Bổ sung luật cho loại lựa chọn này vào 03 mục 5
- [ ] Màn tổng kết có **flowchart lịch sử giả định**: 7 lựa chọn × 3 nhánh, nhánh đã đi thì mở; bấm vào nhánh thì nhảy tới cảnh đó

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| E-11 | Unit test: chọn A ở `k0-l1` | `flags` có `k0-l1:A` |
| E-12 | Nút có `if` không thoả | Bị bỏ qua, không làm kẹt |
| E-13 | Khôi phục bản lưu phiên bản cũ | Chuyển đổi thành công, `flags` rỗng |
| B-05 | Bot đi mọi tổ hợp flag | Không lần nào kẹt; thời lượng xấu nhất ≤ 28 phút |
| V-10 | Validate: `if` trỏ tới mã lựa chọn không tồn tại | Đỏ ở tầng 2 |
| V-11 | Validate: độ dài phương án lệch quá 30%, hoặc đáp án đúng nằm ở một vị trí quá 3 lần | Cảnh báo; đỏ khi chạy `--strict` |

**Cổng:** E-11 đến E-13, B-05, V-10, V-11 đạt; 03 cập nhật xong.

---

## P12 — Trình bày

**Mục tiêu:** nhân vật có biểu cảm; có nhịp chuyển cảnh. **Ai:** UI. **Ước tính:** 1–2 ngày.

### Việc
- [ ] Chốt phong cách sprite (F-04) và cập nhật `05-art-brief.md` mục 1
- [ ] Trường `expression` cho nút `line` (giá trị lấy từ `characters[].sprites`), validate tầng 2 kiểm tra
- [ ] Vẽ 3 biểu cảm (`binh-thuong`, `lo-lang`, `quyet-tam`) cho Minh, Lan, Bác Tư
- [ ] Thẻ tiêu đề đầu mỗi kỳ; phủ sepia và rung nhẹ cho CG lịch sử giả định (tắt khi người dùng bật `prefers-reduced-motion`)
- [ ] Hoàn thiện `09-am-thanh.md`: ghi nguồn cho mọi file nhạc và hiệu ứng

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| A-04 | Validate: `expression` không có trong `sprites` của nhân vật | Đỏ ở tầng 2 |
| A-05 | Component test `SpriteView` với 3 biểu cảm | Ra 3 hình khác nhau |
| A-06 | Bật `prefers-reduced-motion` | Không rung, không parallax |

**Cổng:** A-04 đến A-06 đạt.

---

## P13 — Tiện ích người đọc

**Mục tiêu:** đạt mức tối thiểu của thể loại. **Ai:** GP. **Ước tính:** 1 ngày.

### Việc
- [ ] Sửa F-03: lưu danh sách id các nút đã đọc vào `localStorage`. Skip chỉ chạy qua nút đã đọc và dừng ở mọi lựa chọn
- [ ] Nút lùi một câu: giữ ngăn xếp `GameState` trong phiên chơi; không cho lùi qua một lựa chọn đã chốt
- [ ] Phím H ẩn giao diện để xem CG; 3 ô lưu; chọn chương sau khi đã chơi xong một lần
- [ ] Sửa F-06: bỏ nhánh `MODE === "test"`, dùng `vi.useFakeTimers()` trong test

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| UI-07 | Bật Skip ở lần chơi thứ hai | Chạy qua nút đã đọc, dừng ở nút chưa đọc và ở lựa chọn |
| UI-08 | Lùi một câu 3 lần | Về đúng nút; không lùi qua lựa chọn |
| UI-09 | Bấm "Hiểu rồi" trước khi hết 3 giây (dùng fake timers) | Không có tác dụng |

**Cổng:** UI-07 đến UI-09 đạt.

---

## P14 — Học tập

**Mục tiêu:** kiến thức đến qua câu chữ của truyện, có chỗ ôn lại. **Ai:** KB, UI. **Ước tính:** 1–2 ngày.

### Việc
- [ ] Tooltip thuật ngữ (kiểu Pentiment): "Quốc tế III", "vô sản hóa", "Chánh cương"… được gạch chân trong lời thoại, bấm vào hiện giải thích kèm mã `GT-`. Dữ liệu đặt ở `data/glossary.json` (có schema, mỗi mục có nguồn)
- [ ] "Nhật ký của Minh" cuối mỗi kỳ: 3 ý chính viết bằng giọng Minh, mỗi ý có nguồn
- [ ] Quiz: trộn thứ tự đáp án; giải thích đáp án dẫn về cảnh liên quan
- [ ] Sửa F-01, F-02

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| L-01 | Validate `glossary.json` | Mọi mục có nguồn hợp lệ |
| L-02 | Quiz chạy 2 lần | Thứ tự đáp án khác nhau, chấm điểm vẫn đúng |
| L-03 | Soát `collectibles.json` | `image_credit` khớp với hình thật đang hiển thị |

**Cổng:** L-01 đến L-03 đạt.

---

## P15 — Nghiệm thu bản hoàn thiện

**Mục tiêu:** đo lại bằng người chơi thật và chấm lại theo thang ở mục 1. **Ai:** KT, cả nhóm.

### Việc
- [ ] Chơi thử vòng 2 với ít nhất 3 người mới, dùng phiếu `10-can-sua.md`, thêm câu hỏi PT-04 và PT-05
- [ ] Chấm lại thang mục 1 và ghi kết quả vào file này
- [ ] Cập nhật `06-presentation.md` và `GIOI-THIEU-GAME.md` theo những gì đã làm thật

### Test
| Mã | Làm gì | Mong đợi |
|---|---|---|
| PT-01..03 | Như P8 | Đạt |
| PT-04 | Hỏi sau khi chơi: "Minh thay đổi thế nào từ đầu đến cuối?" | ≥ 2/3 người trả lời có nội dung |
| PT-05 | Hỏi: "Có lúc nào bạn phân vân thật sự giữa hai phương án không?" | ≥ 2/3 người trả lời "có" |
| DEP-01..05 | Như P9 | Đạt |

**Cổng:** tất cả đạt; tổng điểm thang mục 1 ≥ 8.

## 4. Lịch gợi ý (8 ngày làm việc)

| Ngày | KB | GP | UI | KT |
|---|---|---|---|---|
| 1 | M-02; cập nhật bible | P11a engine | F-04 chốt phong cách sprite | M-01, M-04 |
| 2 | P10 Kỳ 0 | P13, F-03, F-06 | P12 biểu cảm | M-03 (chơi thử vòng 1 trên bản MVP) |
| 3 | P10 Kỳ 1 | Validate tầng 3 (S-02, V-11) | P12 chuyển cảnh | Ghi kết quả vòng 1 |
| 4 | P10 Kỳ 2 | P11a flowchart | P12 xong | Rà P10 |
| 5 | P11b 7 lựa chọn | Hỗ trợ JSON | P14 tooltip | Bot B-05 |
| 6 | P14 nhật ký, glossary | P14 quiz | Rà giao diện | F-01, F-02 |
| 7 | Rà nguồn toàn bộ | Sửa lỗi | Sửa lỗi | P15 chơi thử vòng 2 |
| 8 | Tập trình bày | Deploy | Slide | Chấm lại, chốt |
