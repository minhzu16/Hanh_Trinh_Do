# Task 08: Thiết Kế & Tích Hợp Minh Họa Vector SVG Cho 8 Tư Liệu Lịch Sử (`Collectibles`)

- **Mức độ ưu tiên:** 🟡 P2 (Trung bình — Hoàn thiện thẩm mỹ Bộ Sưu Tập đúng với `05-art-brief.md`)
- **Phụ trách đề xuất:** `UI` (Giao diện & Art)
- **Các file liên quan:**
  - `src/art/collectibleIllustrations.tsx` *(tạo mới hoặc mở rộng từ `src/art/cgIllustrations.tsx`)*
  - `src/screens/CollectionScreen.tsx` (dòng 115–126)
  - `src/screens/SceneScreen.tsx` (dòng 841–886 — hộp mở khóa tư liệu)
  - `data/collectibles.json`

---

## 1. Mô Tả Vấn Đề & Nguyên Nhân Gốc Rễ

Trong `data/collectibles.json`, cả 8 tư liệu lịch sử đều ghi:
```json
"image_credit": "Minh hoạ đồ hoạ SVG (Hành Trình Đỏ)"
```
Và tài liệu `docs/05-art-brief.md` (dòng 5) khẳng định: *"Toàn bộ 8 tư liệu bảo vật đều có minh hoạ vector SVG chất lượng cao"*.

Tuy nhiên, khi kiểm tra thực tế `src/screens/CollectionScreen.tsx` (dòng 115–126):
```tsx
{/* Artwork / Image placeholder */}
<div className="w-full h-48 sm:h-56 rounded-xl bg-gradient-to-br from-stone-900 via-amber-950/40 to-stone-950 border border-amber-700/40 flex flex-col items-center justify-center p-4 text-center">
  <span className="text-5xl mb-2">📜</span>
  <span className="text-xs font-serif text-amber-300 font-medium">
    {selectedItem.title}
  </span>
```
Màn hình Bộ Sưu Tập chỉ hiển thị một biểu tượng emoji cuộn giấy `📜` cho cả 8 tư liệu, dù trong `src/art/cgIllustrations.tsx` đã có sẵn nhiều tranh SVG tương ứng!

Danh sách 8 mã tư liệu trong `data/collectibles.json`:
1. `tl-bao-nhan-dao` — *Báo L'Humanité, 16–17/7/1920* (đã có CG tương ứng: `cg-bao-nhan-dao`)
2. `tl-ban-yeu-sach` — *Bản Yêu sách của nhân dân An Nam (18/6/1919)* (đã có CG tương ứng: `cg-ban-yeu-sach`)
3. `tl-dai-hoi-tours` — *Đại hội Tua (12/1920)* (đã có CG tương ứng: `cg-phieu-bau-tours`)
4. `tl-bao-thanh-nien` — *Báo Thanh niên số 1 (21/6/1925)* (đã có CG tương ứng: `cg-bao-thanh-nien`)
5. `tl-duong-cach-menh` — *Cuốn Đường cách mệnh (1927)* (đã có CG tương ứng: `cg-duong-cach-menh`)
6. `tl-so-nha-5d-ham-long` — *Số nhà 5D Hàm Long, Hà Nội* (cần vẽ SVG ngôi nhà 5D Hàm Long với ánh đèn đêm & lá cờ búa liềm)
7. `tl-so-nha-312-kham-thien` — *Số nhà 312 Khâm Thiên, Hà Nội* (cần vẽ SVG căn gác 312 Khâm Thiên & tờ báo Búa liềm)
8. `tl-chanh-cuong-sach-luoc` — *Chánh cương vắn tắt và Sách lược vắn tắt* (đã có CG tương ứng: `cg-so-tay-cuong-linh`)

---

## 2. Hướng Dẫn Triển Khai Chi Tiết

### Bước 1: Tạo component `CollectibleIllustration` (`src/art/collectibleIllustrations.tsx`)
1. Tạo file `src/art/collectibleIllustrations.tsx` nhận prop `collectibleId: string` và `className?: string`.
2. Đối với 6 tư liệu đã có tranh tương đương trong `CgIllustration` (`tl-bao-nhan-dao`, `tl-ban-yeu-sach`, `tl-dai-hoi-tours`, `tl-bao-thanh-nien`, `tl-duong-cach-menh`, `tl-chanh-cuong-sach-luoc`), tái sử dụng `<CgIllustration cgId={...} />` (tuân thủ nguyên tắc DRY).
3. Đối với 2 tư liệu địa danh (`tl-so-nha-5d-ham-long` và `tl-so-nha-312-kham-thien`), thiết kế 2 tranh SVG vector `viewBox="0 0 600 300"` theo phong cách sơn mài Indochine đồng bộ với `cgIllustrations.tsx` (kiến trúc phố cổ Hà Nội năm 1929, biển số nhà `5D HÀM LONG` và `312 KHÂM THIÊN`, ấn phẩm *Tuyên ngôn* / báo *Búa liềm*).

### Bước 2: Tích hợp vào `CollectionScreen.tsx` và `SceneScreen.tsx`
1. Trong `src/screens/CollectionScreen.tsx` (dòng 115–126):
   - Thay khối placeholder `📜` bằng `<CollectibleIllustration collectibleId={selectedItem.id} className="w-full h-full object-contain" />` kèm chú thích `selectedItem.image_credit` ở góc dưới.
2. Trong `src/screens/SceneScreen.tsx` (dòng 841–886, khi hiển thị nút `unlock`):
   - Hiển thị hình thu nhỏ `<CollectibleIllustration collectibleId={currentNode.item} />` ngay trong hộp thông báo mở khóa tư liệu mới để tăng cảm giác phần thưởng cho người chơi.

---

## 3. Tiêu Chí Nghiệm Thu (Acceptance Criteria)

- [ ] Cả 8/8 tư liệu trong `CollectionScreen.tsx` đều hiển thị hình minh họa SVG vector sắc nét, không còn tư liệu nào chỉ hiện chữ `📜` trống trải.
- [ ] Viết thêm 1 unit test trong `src/components/components.test.tsx` (tương tự test `A-07` của `CgIllustration`) lặp qua toàn bộ 8 mã `content.collectibles.map(c => c.id)` và khẳng định `CollectibleIllustration` render ra thẻ `<svg>` riêng biệt cho từng mã.
- [ ] Chạy `pnpm check` xanh 100%.

