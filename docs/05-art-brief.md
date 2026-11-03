# Art brief

> Trạng thái: ĐANG DÙNG (03/11) — UI giữ file này. Danh sách mã sinh từ `content/ky-*.md`; thêm cảnh mới thì cập nhật bảng. Danh sách tìm tư liệu thật: `DANH-SACH-MEDIA-CAN-TIM.md`.

**Hiện trạng:** 14/14 hình nền và 7/14 CG đã có hình SVG riêng trong code (`src/art/backgrounds/`, `src/art/cgIllustrations.tsx`); 7 CG còn lại, gồm 6 CG "lịch sử giả định", đang hiện một hình mặc định chung (F-11). Cột "Xong" bên dưới đánh dấu bản SVG. `public/art/` đang rỗng: chưa có ảnh bitmap hay ảnh tư liệu thật nào.

## 1. Phong cách

- Semi-realistic hoặc anime nhẹ, trang nghiêm. Không vẽ kiểu hài hước, chibi.
- **Lệch hiện tại (F-04):** sprite trong `src/art/characterSprites.tsx` đang vẽ kiểu chibi. UI đề xuất, cả nhóm chốt ở P12: đổi theo dòng trên, hoặc sửa dòng trên để giữ chibi (khi đó chỉ áp dụng cho nhân vật hư cấu; Nguyễn Ái Quốc luôn vẽ trang nghiêm theo quy tắc 1).
- Bảng màu chủ đạo: đỏ trầm `#9E1B1B`, vàng đất `#C8A24A`, giấy cũ `#F3EAD7`, mực `#2B2420`. Cảnh trước 1920 ngả nâu sepia; cảnh 1929–1930 tăng dần sắc đỏ.
- Font: Noto Serif (thoại, kiến thức), Be Vietnam Pro (giao diện). Cả hai đủ dấu tiếng Việt.
- Khung hình 16:9, thiết kế ở 1920×1080, kiểm tra ở 1366×768.

## 2. Quy tắc bắt buộc

1. **Không dùng ảnh người thật cho sprite.** Sprite Nguyễn Ái Quốc vẽ trang nghiêm, dựa trên ảnh tư liệu công khai nhưng không chép một bức ảnh cụ thể; cả nhóm duyệt trước khi dùng.
2. Ảnh do AI tạo chỉ dùng cho hình nền và CG, góc dưới ghi "Ảnh minh hoạ, không phải tư liệu".
3. Ảnh tư liệu thật chỉ dùng trong bộ sưu tập, từ nguồn có giấy phép rõ (ví dụ Wikimedia Commons, bảo tàng có cho phép), ghi `image_credit`.
4. Các đại biểu Hội nghị hợp nhất xuất hiện dạng bóng người có tên, không vẽ chân dung chi tiết.

## 3. Hình nền (14)

| Mã | Cảnh | Mô tả | Xong |
|---|---|---|---|
| `bg-boong-tau-dem` | k0-c1 | Trên boong tàu, năm 1911 | [x] SVG |
| `bg-phong-tro-paris` | k0-c2 | Paris, tháng 6/1919 | [x] SVG |
| `bg-quan-ca-phe` | k0-c3 | Tháng 7/1920: tờ báo Nhân đạo | [x] SVG |
| `bg-hoi-truong-tours` | k0-c4 | Tháng 12/1920: Tua (Tours) | [x] SVG |
| `bg-ga-paris-tuyet` | k0-c5 | Kết Kỳ 0 | [x] SVG |
| `bg-ban-do-hanh-trinh` | k1-c1 | Từ Paris đến Quảng Châu | [x] SVG |
| `bg-lop-hoc-van-minh` | k1-c2 | Lớp huấn luyện, Quảng Châu, 1926 | [x] SVG |
| `bg-lop-hoc-chieu` | k1-c3 | "Người cầm lái" | [x] SVG |
| `bg-xuong-may` | k1-c4 | Hải Phòng, cuối năm 1928: "vô sản hóa" | [x] SVG |
| `bg-pho-kham-thien-dem` | k1-c5 | Năm 1929: ba ngọn cờ, một mục tiêu | [x] SVG |
| `bg-ben-cang-hong-kong` | k2-c1 | Hồng Kông, cuối tháng 12/1929 | [x] SVG |
| `bg-goc-phong-den-dau` | k2-c2 | Bản Chánh cương: kẻ thù nào trước? | [x] SVG |
| `bg-phong-rang-sang` | k2-c3, k2-c4 | Sách lược: ai đứng cùng chúng ta? | [x] SVG |
| `bg-boong-tau-binh-minh` | k2-c5 | Trở về và Lời kêu gọi | [x] SVG |

## 4. CG (14)

| Mã | Cảnh đầu tiên dùng | Mô tả | Xong |
|---|---|---|---|
| `cg-cang-bien-truc-xuat` | k0-c1 | Nhóm du học sinh bị lính áp giải xuống tàu. | [ ] (đang dùng hình mặc định) |
| `cg-chong-thue` | k0-c1 | Đoàn biểu tình chống thuế bị giải tán. | [ ] (đang dùng hình mặc định) |
| `cg-to-yeu-sach` | k0-c2 | Tờ Yêu sách được phát cho khách qua đường. | [x] SVG |
| `cg-bao-nhan-dao` | k0-c3 | Tờ L'Humanité số ra ngày 16 và 17/7/1920. | [ ] (đang dùng hình mặc định) |
| `cg-don-linh-dem` | k1-c2 | Cuộc nổi dậy ở một thị xã bị dập tắt chỉ sau một đêm. | [ ] (đang dùng hình mặc định) |
| `cg-bang-den` | k1-c2 | Dòng chữ trên bảng đen phát sáng. | [x] SVG |
| `cg-con-thuyen` | k1-c3 | Con thuyền giữa sóng, người cầm lái đứng vững. | [x] SVG |
| `cg-dam-dong-mua` | k1-c3 | Đám đông tản mát dưới mưa. | [ ] (đang dùng hình mặc định) |
| `cg-ba-la-co` | k1-c5 | Ba lá cờ đỏ đặt rời nhau trên bản đồ ba kỳ. | [x] SVG |
| `cg-phong-cuu-long` | k2-c1 | Căn phòng nhỏ ở Cửu Long, năm bóng người quanh chiếc bàn, nhìn qua khe cửa. | [x] SVG |
| `cg-truyen-don-trai-nguoc` | k2-c1 | Ba nhóm phát truyền đơn trái ngược nhau trên cùng một con phố. | [ ] (đang dùng hình mặc định) |
| `cg-lang-chia-re` | k2-c2 | Làng quê chia rẽ, một địa chủ nhỏ yêu nước quay lưng bỏ đi. | [ ] (đang dùng hình mặc định) |
| `cg-vong-doan-ket` | k2-c3 | Bản đồ các giai cấp sáng lên, vòng "Đoàn kết" rộng ra. | [x] SVG |
| `cg-ba-la-co-nhap-mot` | k2-c5 | Ba lá cờ đỏ của Kỳ 1 nhập lại thành một. | [x] SVG |

## 5. Sprite

Hiện mỗi nhân vật chỉ có một dáng; chưa có biểu cảm nào (F-05, làm ở P12 với 3 biểu cảm `binh-thuong`, `lo-lang`, `quyet-tam` cho Minh, Lan, Bác Tư).

| Nhân vật | Tâm trạng | Ghi chú |
|---|---|---|
| `minh` | binh-thuong, vui, lo-lang, quyet-tam | 16 tuổi ở Kỳ 0, khoảng 30–34 tuổi ở Kỳ 1–2: cần 2 bộ tuổi |
| `lan` | binh-thuong, vui, lo-lang, quyet-tam | 2 trang phục: áo dài nữ sinh, áo công nhân (`k1-c4` trở đi) |
| `bac-tu` | binh-thuong, vui | Thợ máy khoảng 55 tuổi |
| `ban-tho-anh` | binh-thuong, lo-lang | |
| `tho-viet-kieu` | binh-thuong | |
| `nguyen-ai-quoc` | binh-thuong | Xem quy tắc 1 |

## 6. Tư liệu trong bộ sưu tập (8)

Hình của 8 tư liệu hiện là minh hoạ SVG. `image_credit` trong `collectibles.json` phải khớp với hình đang hiện (F-02).

| Mã | Tên | Mở ở cảnh |
|---|---|---|
| `tl-bao-nhan-dao` | Báo L'Humanité, 16–17/7/1920 | `k0-c3` |
| `tl-ban-yeu-sach` | Bản Yêu sách của nhân dân An Nam (18/6/1919) | `k0-c5` |
| `tl-dai-hoi-tours` | Đại hội Tua (12/1920) | `k0-c5` |
| `tl-bao-thanh-nien` | Báo Thanh niên số 1 (21/6/1925) | `k1-c1` |
| `tl-duong-cach-menh` | Cuốn Đường cách mệnh (1927) | `k1-c3` |
| `tl-so-nha-5d-ham-long` | Số nhà 5D Hàm Long | `k1-c5` |
| `tl-so-nha-312-kham-thien` | Số nhà 312 Khâm Thiên | `k1-c5` |
| `tl-chanh-cuong-sach-luoc` | Chánh cương vắn tắt và Sách lược vắn tắt | `k2-c4` |
