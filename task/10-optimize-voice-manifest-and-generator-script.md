# Task 10: Tối Ưu `generate-voices.py`, Giảm 30% Dung Lượng `voiceManifest.json` & Thêm Test Kiểm Tra 120 File MP3

- **Mức độ ưu tiên:** 🟡 P2 (Trung bình — Tối ưu hóa tài sản âm thanh lồng tiếng & kiểm thử toàn vẹn)
- **Phụ trách đề xuất:** `KT` (Kết & Test) & `GP` (Gameplay)
- **Các file liên quan:**
  - `scripts/generate-voices.py` (dòng 102–115, 209–230)
  - `src/engine/voiceManifest.json`
  - `public/audio/voices/manifest.json`
  - `src/engine/deployment.test.ts`

---

## 1. Mô Tả Vấn Đề & Nguyên Nhân Gốc Rễ

### Vấn đề A: Lỗi gộp trùng câu thoại khác nhân vật trong `scripts/generate-voices.py`
Tại `scripts/generate-voices.py` (dòng 112–114):
```python
cleaned = clean_text(text)
if not cleaned:
    return
h = compute_hash(cleaned)
if h in seen_hashes:
    return
seen_hashes.add(h)
```
- Hàm `compute_hash(cleaned)` chỉ băm nội dung chữ (`cleaned`) mà **không kèm `speaker`**. Nếu hai nhân vật khác nhau (ví dụ `minh` giọng nam và `lan` giọng nữ) có một câu thoại ngắn giống nhau, nhân vật thứ hai sẽ bị bỏ qua không tạo file âm thanh riêng và phải dùng chung giọng của nhân vật đầu tiên!

### Vấn đề B: Phình dung lượng `src/engine/voiceManifest.json` gấp 3 lần cần thiết
Tại `scripts/generate-voices.py` (dòng 221–223):
```python
manifest[item["hash"]] = entry
manifest[item["text"]] = entry
manifest[f"{item['speaker']}:{item['text']}"] = entry
```
- Script ghi lặp lại cùng một object `entry` (`url`, `speaker`, `voice`, `rate`, `pitch`) dưới **3 khóa khác nhau** cho mỗi câu thoại, khiến `src/engine/voiceManifest.json` dài tới 2.162 dòng (`82.5 KB`).
- Trong khi đó, `src/voice.ts` (dòng 117) chỉ tra cứu:
  ```ts
  const entry = manifest[`${speakerId}:${cleaned}`] || manifest[cleaned];
  ```
  Khóa `manifest[item["hash"]]` **không bao giờ được sử dụng** trong code runtime! Ngoài ra, các trường metadata chỉ dùng lúc build (`voice`, `rate`, `pitch`) cũng không được `src/voice.ts` đọc lúc phát file `.mp3`.

### Vấn đề C: `deployment.test.ts` chưa kiểm tra sự tồn tại của 120 file `.mp3` giọng đọc
- `src/engine/deployment.test.ts` (dòng 17–37) mới chỉ kiểm tra 5 file nhạc nền BGM trong `public/audio/`, chưa kiểm tra xem toàn bộ các đường dẫn `/audio/voices/<hash>.mp3` khai báo trong `src/engine/voiceManifest.json` có thực sự tồn tại trên ổ đĩa và không bị rỗng (`> 1 KB`) hay không.

---

## 2. Hướng Dẫn Triển Khai Chi Tiết

### Bước 1: Sửa khóa băm và thu gọn cấu trúc `voiceManifest.json` trong `scripts/generate-voices.py`
1. Trong `scripts/generate-voices.py`:
   - Nếu muốn phân biệt giọng theo người nói khi trùng câu chữ, kiểm tra trùng trên cặp `(speaker, cleaned)`.
   - Loại bỏ dòng `manifest[item["hash"]] = entry` khi xuất ra `src/engine/voiceManifest.json` để giảm ngay 1/3 số lượng key dư thừa (giữ lại `manifest[f"{item['speaker']}:{item['text']}"]` và `manifest[item["text"]]`).
2. Cập nhật lại `src/engine/voiceManifest.json` và `public/audio/voices/manifest.json` (có thể viết 1 script Node nhỏ hoặc chạy lại bước xuất manifest mà không cần gọi lại API TTS cho 120 file MP3 đã có sẵn trên đĩa).

### Bước 2: Thêm bài test `DEP-11` vào `src/engine/deployment.test.ts`
Trong `src/engine/deployment.test.ts`, import `voiceManifest` từ `./voiceManifest.json` và thêm test:
```ts
it("DEP-11: Mọi file âm thanh lồng tiếng trong voiceManifest.json đều tồn tại trong public/audio/voices/ và > 1KB", () => {
  const uniqueUrls = new Set(
    Object.values(voiceManifest).map((entry) => entry.url)
  );
  expect(uniqueUrls.size).toBeGreaterThanOrEqual(100);

  for (const relUrl of uniqueUrls) {
    const filePath = path.join(publicDir, relUrl);
    expect(fs.existsSync(filePath), `Thiếu file voice: ${relUrl}`).toBe(true);
    const stat = fs.statSync(filePath);
    expect(stat.size, `File voice rỗng: ${relUrl}`).toBeGreaterThan(1024);
  }
});
```

---

## 3. Tiêu Chí Nghiệm Thu (Acceptance Criteria)

- [ ] Dung lượng `src/engine/voiceManifest.json` giảm ít nhất 25–30% sau khi bỏ các key `hash` dư thừa.
- [ ] Test `DEP-11` trong `src/engine/deployment.test.ts` kiểm tra 100% file `.mp3` trong `public/audio/voices/` và chạy xanh.
- [ ] Toàn bộ 7 unit tests trong `src/voice.test.ts` chạy xanh.
- [ ] Chạy `pnpm check` xanh 100%.

