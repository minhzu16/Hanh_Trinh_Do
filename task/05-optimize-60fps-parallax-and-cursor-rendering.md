# Task 05: Tối Ưu Hóa Hiệu Năng 60fps — Loại Bỏ Re-render Toàn Màn Hình Khi Di Chuột (`SceneScreen.tsx`)

- **Mức độ ưu tiên:** 🔴 P0 (Nghiêm trọng — Điểm nghẽn hiệu năng đồ họa & hao pin/CPU)
- **Phụ trách đề xuất:** `UI` & `GP`
- **Các file liên quan:**
  - `src/screens/SceneScreen.tsx` (dòng 66–70, 122–149, 453–474, 520–595)

---

## 1. Mô Tả Vấn Đề & Nguyên Nhân Gốc Rễ

Trong `src/screens/SceneScreen.tsx`, hiệu ứng 2.5D Parallax và đèn dầu soi đêm (Night Lantern) đang được cài đặt bằng `useState` của React:

1. **Tại dòng 461 (`handleMouseMove`)**:
   ```tsx
   setCursorPos({ x: e.clientX, y: e.clientY });
   ```
   Hàm này được gọi **trên mọi sự kiện `mousemove`**, kể cả ở các cảnh ban ngày (`isNightScene === false`) khi lớp phủ đèn dầu không hề hiển thị!
2. **Tại dòng 122–149 (Vòng lặp `requestAnimationFrame`)**:
   ```tsx
   const loop = () => {
     setParallaxPos((prev) => {
       const nextX = prev.x + (targetParallaxRef.current.x - prev.x) * 0.08;
       const nextY = prev.y + (targetParallaxRef.current.y - prev.y) * 0.08;
       if (Math.abs(nextX - prev.x) < 0.0005 && Math.abs(nextY - prev.y) < 0.0005) {
         return prev;
       }
       return { x: nextX, y: nextY };
     });
     rafId = requestAnimationFrame(loop);
   };
   ```
   - Mỗi khi người chơi di chuột, `setCursorPos` và `setParallaxPos` kích hoạt **60 đến 144 lần re-render mỗi giây** cho toàn bộ component khổng lồ `SceneScreen` (dài 1.072 dòng, chứa `Header`, `SceneBackground` với hàng ngàn thẻ SVG, `CinematicAtmosphere`, `SpriteView`, `Hotspots`, `DialogBox`...).
   - Ngay cả khi chuột đứng yên, vòng lặp `requestAnimationFrame(loop)` vẫn chạy ngầm liên tục không bao giờ nghỉ!

---

## 2. Hướng Dẫn Triển Khai Chi Tiết

### Bước 1: Chuyển `parallaxPos` và `cursorPos` từ React State sang `useRef` + CSS Custom Properties
1. Xóa `const [parallaxPos, setParallaxPos] = useState(...)` và `const [cursorPos, setCursorPos] = useState(...)` trong `src/screens/SceneScreen.tsx`.
2. Tạo các `useRef` trỏ trực tiếp tới phần tử DOM của lớp nền (`bgLayerRef`), lớp nhân vật (`spriteLayerRef`), và lớp đèn dầu (`lanternRef`), hoặc cập nhật CSS Variables (`--px`, `--py`, `--cx`, `--cy`) trên `stageRef.current`:
   ```tsx
   const currentParallaxRef = useRef({ x: 0, y: 0 });
   const rafIdRef = useRef<number | null>(null);
   ```
3. Chỉ khởi chạy `requestAnimationFrame` khi có sự kiện `mousemove` / `deviceorientation` làm thay đổi `targetParallaxRef`, và **tự động dừng (`rafIdRef.current = null`)** ngay khi khoảng cách hội tụ `< 0.0005`:
   ```tsx
   const startParallaxLoop = useCallback(() => {
     if (rafIdRef.current !== null) return;
     const step = () => {
       const cur = currentParallaxRef.current;
       const tgt = targetParallaxRef.current;
       const nextX = cur.x + (tgt.x - cur.x) * 0.08;
       const nextY = cur.y + (tgt.y - cur.y) * 0.08;
       cur.x = nextX;
       cur.y = nextY;

       if (stageRef.current) {
         stageRef.current.style.setProperty("--px", nextX.toFixed(4));
         stageRef.current.style.setProperty("--py", nextY.toFixed(4));
       }

       if (Math.abs(tgt.x - nextX) > 0.0005 || Math.abs(tgt.y - nextY) > 0.0005) {
         rafIdRef.current = requestAnimationFrame(step);
       } else {
         rafIdRef.current = null;
       }
     };
     rafIdRef.current = requestAnimationFrame(step);
   }, []);
   ```
4. Đối với hiệu ứng đèn dầu ban đêm (`isNightScene`):
   - Trong `handleMouseMove`, chỉ cập nhật tọa độ chuột lên `lanternRef.current.style.background = ...` khi `isNightScene && !prefersReducedMotion` là `true`.

### Bước 2: Áp dụng `calc()` với CSS Variables cho Transform của Background & Sprite
Trên phần tử bọc Background và Sprite, sử dụng `calc(var(--px, 0) * -14px)` thay vì nối chuỗi bằng state `parallaxPos.x` của React. Nhờ đó, trình duyệt xử lý chuyển động hoàn toàn trên tầng Compositor GPU với **0 lần React re-render** khi di chuột!

---

## 3. Tiêu Chí Nghiệm Thu (Acceptance Criteria)

- [ ] Di chuột liên tục trên màn hình `SceneScreen` **không gây ra bất kỳ lần re-render React nào** cho `SceneScreen`, `SceneBackground`, `SpriteView` hay `DialogBox` (ngoại trừ khi đang kéo pan camera `isDragging === true`).
- [ ] Khi chuột dừng di chuyển, vòng lặp `requestAnimationFrame` tự động dừng hẳn (0% CPU khi đứng yên).
- [ ] Hiệu ứng nghiêng 2.5D Parallax và vùng sáng đèn dầu ban đêm vẫn hoạt động mượt mà như cũ.
- [ ] Chạy `pnpm check` xanh 100%.
