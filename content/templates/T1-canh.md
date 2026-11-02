# Template T1 — Cảnh

> Trạng thái: CHỐT

Mỗi cảnh là một khối bắt đầu bằng `## CẢNH <mã-cảnh>`, nằm trong `content/ky-N.md` ngay sau khối kỳ (T2). Prompt P1 chuyển mỗi khối thành một phần tử của `data/scenes.json`. Cấu trúc đứng sau từng dòng nằm ở `docs/03-story-spec.md` mục 3–5.

## Quy tắc viết

1. **Không đổi, không thêm, không bỏ tiêu đề nào.** P1 dựa vào đúng chữ của tiêu đề. Mục không dùng thì ghi `- không`.
2. Mỗi dòng trong mục `### Nút` là **một nút**, theo đúng thứ tự xuất hiện trong game.
3. Chữ sau ký hiệu được chép nguyên văn sang JSON. Sau khi chuyển, chỉ sửa trên JSON.
4. Nhân vật lịch sử (`kind: historical`) **chỉ được nói câu có mã nguồn `kind: quote`**. Viết câu thoại tự do cho nhân vật hư cấu.
5. Số trang không gõ trong chữ của hộp kiến thức: ghi mã nguồn, game tự hiện số trang.

## Ký hiệu trong mục `### Nút`

| Loại nút | Cách viết | Ví dụ |
|---|---|---|
| Lời dẫn | `- [narrator] nội dung` | `- [narrator] Năm 1911…` |
| Lời dẫn có nguồn | `- [narrator \| mã, mã] nội dung` | `- [narrator \| GT-38-PATONOT] Năm 1911…` |
| Thoại | `- [mã nhân vật] nội dung` | `- [bac-tu] Mày còn trẻ.` |
| Thoại có nguồn | `- [mã nhân vật \| mã nguồn] nội dung` | `- [nguyen-ai-quoc \| GT-61-BAO-CAO] Chúng tôi họp vào ngày mồng 6/1…` |
| Độc thoại | `- (nghĩ) nội dung` | `- (nghĩ) Vậy mình đi đường nào?` |
| CG | `- [CG mã-cg] chú thích` | `- [CG cg-cang-bien] Nhóm du học sinh bị áp giải.` |
| Hộp kiến thức | `- [KIẾN THỨC mã, mã] nội dung` | `- [KIẾN THỨC GT-45-DONG-DU] Năm 1908…` |
| Mở khoá | `- [MỞ KHÓA mã-tư-liệu]` | `- [MỞ KHÓA tl-bao-thanh-nien]` |
| Mốc thời gian | các dòng `- [MỐC] ngày \| nội dung` liền nhau | `- [MỐC] 17/6/1929 \| Đông Dương Cộng sản Đảng thành lập` |
| Thẻ lật | các dòng `- [THẺ tiêu đề \| mã nguồn] nội dung` liền nhau | `- [THẺ Phương pháp \| GT-66-PHUONG-PHAP] …` |
| Lựa chọn | `- [LỰA CHỌN mã] câu hỏi`, sau đó các mục `#### Phương án` | xem khối dưới |
| Quay lại | `- [QUAY LẠI]` | dòng cuối của mọi phương án sai |

## Khối để chép

```markdown
## CẢNH kX-cY

### Thông tin chung
- Mã cảnh: kX-cY
- Kỳ: kX
- Tiêu đề: 
- Hình nền: bg-
- Nhạc nền: không

### Nút
- [narrator] 
- [LỰA CHỌN kX-lZ] 

#### Phương án A (sai): 
- [CG cg-] 
- [KIẾN THỨC GT-] 
- [QUAY LẠI]

#### Phương án B (đúng): 
- [KIẾN THỨC GT-] 

#### Phương án C (sai): 
- [KIẾN THỨC GT-] 
- [QUAY LẠI]

### Ghi chú art
- không
```

Các nút viết **sau** khối phương án cuối cùng (sau một dòng `#### Sau lựa chọn`) là các nút chung, chạy sau khi người chơi chọn đúng.
