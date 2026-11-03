# Nhật ký chơi thử (Phase 8 - Playtesting) & Phiếu ghi nhận chỉnh sửa

> **Trạng thái:** CHỜ TỔ CHỨC CHƠI THỬ THỰC TẾ (PHASE 8)  
> **Người thực hiện:** Thành viên phụ trách Kỹ thuật (KT) và Kịch bản (KB)  
> **Bản chơi thử:** ghi mã commit hoặc link Production đã dùng: ............  
> **Vòng:** vòng 1 = cổng P8 trên bản MVP (việc M-03); vòng 2 = cổng P15, thêm câu hỏi PT-04, PT-05 (`11-lo-trinh-hoan-thien.md`)  
> **Nguyên tắc nghiệm thu:** Tuyệt đối không ngụy tạo kết quả kiểm thử. Cần mời tối thiểu 3 người chơi độc lập ngoài nhóm trực tiếp trải nghiệm và ghi lại số liệu trung thực vào phiếu dưới đây.

---

## 1. Kế hoạch và Tiêu chí nghiệm thu cổng Phase 8

| Mã cổng | Tiêu chí đánh giá | Mục tiêu | Hướng dẫn đo lường |
|---|---|---|---|
| **PT-01** | Thời lượng chơi trọn vẹn (Kỳ 0 $\rightarrow$ Tổng kết) | $\ge 2/3$ người chơi hoàn thành trong **18–24 phút** | Bấm giờ từ khi người chơi nhấn "Bắt đầu hành trình" đến khi màn Tổng kết xuất hiện. Không giục người chơi, để họ đọc theo nhịp tự nhiên. |
| **PT-02** | Khả năng tiếp thu kiến thức trọng tâm | $\ge 2/3$ người trả lời đúng | Đặt câu hỏi phỏng vấn ngay sau khi chơi: *"Hai văn kiện nào được xem là Cương lĩnh chính trị đầu tiên của Đảng?"*<br>*(Đáp án đúng: **Chánh cương vắn tắt** và **Sách lược vắn tắt**, theo `GT-64-CUONG-LINH`, tr.64).* |
| **PT-03** | Mức độ trực quan của giao diện (UX) | **0 lần** phải hỏi "bấm gì tiếp" | Quan sát người chơi. Đếm số lần người chơi ngập ngừng, lúng túng không biết thao tác hoặc phải hỏi người quan sát cách đi tiếp. |

---

## 2. Bảng theo dõi 7 lựa chọn thực tế trong game

Khi người chơi trải nghiệm, người quan sát tích vào các lựa chọn mà người chơi bấm sai lần đầu để xác định nội dung gây nhầm lẫn:

| Mã lựa chọn | Cảnh | Nội dung câu hỏi | Phương án đúng | Các phương án sai và nguồn của hộp kiến thức (sinh từ `data/scenes.json` ngày 03/11; sửa dữ liệu thì sinh lại bảng) |
|---|---|---|:---:|---|
| `k0-l1` | `k0-c1` | Con đường cứu nước | **C** | • **A** (Nhờ một nước mạnh châu Á giúp đánh đuổi Pháp.)<br>→ Kiến thức: `GT-45-DONG-DU` (tr.45–46)<br>• **B** (Xin chính phủ bảo hộ cho cải cách dần dần.)<br>→ Kiến thức: `GT-46-CAI-CACH` (tr.46–47), `GT-47-CHONG-THUE` (tr.47) |
| `k0-l2` | `k0-c4` | Quốc tế nào? | **A** | • **B** (Quốc tế II, vì nó lâu đời hơn.)<br>→ Kiến thức: `GT-51-TOURS` (tr.51)<br>• **C** (Không theo bên nào, chuyện của người Pháp.)<br>→ Kiến thức: `GT-51-TOURS` (tr.51) |
| `k1-l1` | `k1-c2` | Lực lượng cách mạng | **B** | • **A** (Đúng, cứ dựa vào học sinh, sinh viên và binh lính là đủ.)<br>→ Kiến thức: `GT-48-YEN-BAI` (tr.48)<br>• **C** (Trước hết cứ chờ nước ngoài giúp đã.)<br>→ Kiến thức: `GT-54-KHONG-PHU-THUOC` (tr.54) |
| `k1-l2` | `k1-c3` | Điều kiện để cách mạng thành công | **A** | • **B** (Thiếu tiền mua súng. Có súng là có tất cả.)<br>→ Kiến thức: `GT-49-NGUYEN-NHAN` (tr.49)<br>• **C** (Không thiếu gì. Quần chúng tự nổi dậy là được.)<br>→ Kiến thức: `GT-49-NGUYEN-NHAN` (tr.49) |
| `k2-l1` | `k2-c1` | Việc đầu tiên của hội nghị | **A** | • **B** (Mỗi tổ chức cứ phát triển riêng, sau này hợp nhất cũng được.)<br>→ Kiến thức: `GT-60-PHAN-TAN` (tr.60), `GT-61-TRIEU-TAP` (tr.61)<br>• **C** (Giữ lại tổ chức mạnh nhất, các tổ chức còn lại tự giải tán.)<br>→ Kiến thức: `GT-62-NAM-DIEM` (tr.62) |
| `k2-l2` | `k2-c2` | Nhiệm vụ chủ yếu trước mắt | **A** | • **B** (Chia hết ruộng đất của địa chủ trước, chuyện độc lập tính sau.)<br>→ Kiến thức: `GT-43-MAU-THUAN` (tr.43)<br>• **C** (Đòi chính quyền bảo hộ mở rộng quyền tự do dân chủ.)<br>→ Kiến thức: `GT-46-CAI-CACH` (tr.46–47) |
| `k2-l3` | `k2-c3` | Lực lượng cách mạng | **B** | • **A** (Chỉ công nhân và nông dân. Ai không phải công nông đều không đáng tin.)<br>→ Kiến thức: `GT-66-LUC-LUONG` (tr.66)<br>• **C** (Đoàn kết tất cả, kể cả những kẻ đã ra mặt làm tay sai.)<br>→ Kiến thức: `GT-66-PHUONG-PHAP` (tr.66–67), `GT-67-DANH-DO` (tr.67) |

---

## 3. Phiếu ghi chép kết quả chơi thử (Nhóm điền trực tiếp khi thử nghiệm)

### Người chơi 1:
- **Họ và tên / Đối tượng:** ............................................................
- **Thời lượng hoàn thành:** ...... phút ...... giây (Đạt 18–24 phút: [ ] Có  [ ] Không)
- **Trả lời câu hỏi Cương lĩnh (PT-02):** [ ] Đúng  [ ] Sai (Ghi chú câu trả lời: ...................................)
- **Số lần hỏi cách thao tác UX (PT-03):** ...... lần
- **Các lựa chọn chọn sai lần đầu:** [ ] `k0-l1`  [ ] `k0-l2`  [ ] `k1-l1`  [ ] `k1-l2`  [ ] `k2-l1`  [ ] `k2-l2`  [ ] `k2-l3`
- **Góp ý cụ thể của người chơi:** ........................................................................................

### Người chơi 2:
- **Họ và tên / Đối tượng:** ............................................................
- **Thời lượng hoàn thành:** ...... phút ...... giây (Đạt 18–24 phút: [ ] Có  [ ] Không)
- **Trả lời câu hỏi Cương lĩnh (PT-02):** [ ] Đúng  [ ] Sai (Ghi chú câu trả lời: ...................................)
- **Số lần hỏi cách thao tác UX (PT-03):** ...... lần
- **Các lựa chọn chọn sai lần đầu:** [ ] `k0-l1`  [ ] `k0-l2`  [ ] `k1-l1`  [ ] `k1-l2`  [ ] `k2-l1`  [ ] `k2-l2`  [ ] `k2-l3`
- **Góp ý cụ thể của người chơi:** ........................................................................................

### Người chơi 3:
- **Họ và tên / Đối tượng:** ............................................................
- **Thời lượng hoàn thành:** ...... phút ...... giây (Đạt 18–24 phút: [ ] Có  [ ] Không)
- **Trả lời câu hỏi Cương lĩnh (PT-02):** [ ] Đúng  [ ] Sai (Ghi chú câu trả lời: ...................................)
- **Số lần hỏi cách thao tác UX (PT-03):** ...... lần
- **Các lựa chọn chọn sai lần đầu:** [ ] `k0-l1`  [ ] `k0-l2`  [ ] `k1-l1`  [ ] `k1-l2`  [ ] `k2-l1`  [ ] `k2-l2`  [ ] `k2-l3`
- **Góp ý cụ thể của người chơi:** ........................................................................................

---

## 4. Danh sách các điểm cần sửa phát sinh từ buổi chơi thử

| STT | Vấn đề phát hiện | Cảnh / Màn hình | Đề xuất chỉnh sửa | Thành viên phụ trách | Trạng thái |
|---|---|---|---|---|---|
| 1 | *(Ghi nhận sau khi chơi thử)* | | | | Chờ thử |
| 2 | *(Ghi nhận sau khi chơi thử)* | | | | Chờ thử |
| 3 | *(Ghi nhận sau khi chơi thử)* | | | | Chờ thử |

---

## 5. Kết luận nghiệm thu Phase 8

- Cổng **PT-01** (Thời lượng 18–24 phút): `[ ] ĐẠT`  `[ ] CHƯA ĐẠT`
- Cổng **PT-02** ($\ge 2/3$ nhớ Cương lĩnh): `[ ] ĐẠT`  `[ ] CHƯA ĐẠT`
- Cổng **PT-03** (0 lần hỏi thao tác): `[ ] ĐẠT`  `[ ] CHƯA ĐẠT`

*Xác nhận của nhóm:* *(Ký và ghi rõ họ tên sau khi hoàn thành buổi chơi thử thực tế)*
