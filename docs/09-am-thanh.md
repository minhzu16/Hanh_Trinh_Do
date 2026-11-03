# Âm thanh

> Trạng thái: ĐANG DÙNG (03/11) — KT giữ file này. Bảng dưới ghi đúng những gì đang có trong `public/audio/` và `src/audio.ts`.

Chỉ dùng âm thanh tự tạo, hoặc có giấy phép miễn phí cho mục đích giáo dục (CC0, CC BY có ghi tên tác giả). Ghi nguồn vào cột "Nguồn".

Thay hoặc thêm file trong `public/audio/` thì tăng `CACHE_VERSION` trong `public/sw.js` (`07-trien-khai.md` mục 5).

## Nhạc nền

5 file MP3 (96 kbps, mono, khoảng 900 KB tổng cộng), lặp vòng.

| Mã | Dùng ở | Cảm giác | Nguồn | Xong |
|---|---|---|---|---|
| `bgm-song-bien` | `k0-c1` | Sóng biển, piano trầm | Tự tổng hợp bằng `scripts/generate-audio.mjs` | [x] |
| `bgm-day-dan-dang` | `k0-c3` | Dây đàn dâng dần | Tự tổng hợp bằng `scripts/generate-audio.mjs` | [x] |
| `bgm-hanh-quan` | `k1-c1` | Nhịp đều, hành quân | Tự tổng hợp bằng `scripts/generate-audio.mjs` | [x] |
| `bgm-hoi-hop` | `k2-c1` | Dây đàn hồi hộp | Tự tổng hợp bằng `scripts/generate-audio.mjs` | [x] |
| `bgm-chu-de-chinh` | `k2-c5`, menu | Chủ đề chính, hùng tráng | Tự tổng hợp bằng `scripts/generate-audio.mjs` | [x] |

## Hiệu ứng

Mọi hiệu ứng hiện được tạo trực tiếp trong trình duyệt bằng Web Audio (`src/audio.ts`), không có file.

| Mã trong code | Dùng khi | Nguồn | Xong |
|---|---|---|---|
| `sfx-chon` | Bấm nút, chọn phương án | Web Audio, tự tổng hợp | [x] |
| `sfx-choice-open` | Hiện bảng lựa chọn | Web Audio, tự tổng hợp | [x] |
| `sfx-correct` | Chọn đúng | Web Audio, tự tổng hợp | [x] |
| `sfx-wrong` | Chọn sai (vào lịch sử giả định) | Web Audio, tự tổng hợp | [x] |
| `sfx-vo-tay` | Trả lời đúng câu hỏi củng cố | Web Audio, tự tổng hợp | [x] |
| `sfx-mo-khoa` | Mọi nút `unlock` | Web Audio, tự tổng hợp | [x] |
| `sfx-page-turn` | Đã có trong `audio.ts` nhưng chưa màn nào gọi tới | Web Audio, tự tổng hợp | [ ] |
| `sfx-typewriter` | Chữ chạy trong hộp thoại | Web Audio, tự tổng hợp | [x] |

Hiệu ứng có trong kế hoạch ban đầu nhưng chưa làm. Làm ở P12 nếu kịp; không bắt buộc:

| Mã | Dùng khi | Xong |
|---|---|---|
| `sfx-may-in` | `k0-c2` | [ ] |
| `sfx-ngoi-but` | Chọn đúng ở `k2-l2` | [ ] |
| `sfx-go-cua` | `k1-c5` | [ ] |
| `sfx-coi-ca` | `k1-c4` | [ ] |
