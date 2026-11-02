# Nhật ký chơi thử (Phase 8 - Playtesting) & Phiếu ghi nhận chỉnh sửa

> **Trạng thái:** CHỜ TỔ CHỨC CHƠI THỬ THỰC TẾ (PHASE 8)  
> **Người thực hiện:** Thành viên phụ trách Kỹ thuật (KT) và Kịch bản (KB)  
> **Phiên bản thử nghiệm:** v1.0.2  
> **Nguyên tắc nghiệm thu:** Tuyệt đối không ngụy tạo kết quả kiểm thử. Cần mời tối thiểu 3 người chơi độc lập ngoài nhóm trực tiếp trải nghiệm và ghi lại số liệu trung thực vào phiếu dưới đây.

---

## 1. Kế hoạch và Tiêu chí nghiệm thu cổng Phase 8

| Mã cổng | Tiêu chí đánh giá | Mục tiêu | Hướng dẫn đo lường |
|---|---|---|---|
| **PT-01** | Thời lượng chơi trọn vẹn (Kỳ 0 $\rightarrow$ Tổng kết) | $\ge 2/3$ người chơi hoàn thành trong **18–24 phút** | Bấm giờ từ khi người chơi nhấn "Bắt đầu hành trình" đến khi màn Tổng kết xuất hiện. Không giục người chơi, để họ đọc theo nhịp tự nhiên. |
| **PT-02** | Khả năng tiếp thu kiến thức trọng tâm | $\ge 2/3$ người trả lời đúng | Đặt câu hỏi phỏng vấn ngay sau khi chơi: *"Hai văn kiện nào được xem là Cương lĩnh chính trị đầu tiên của Đảng?"*<br>*(Đáp án đúng theo GT tr.62–63: **Chánh cương vắn tắt** và **Sách lược vắn tắt**).* |
| **PT-03** | Mức độ trực quan của giao diện (UX) | **0 lần** phải hỏi "bấm gì tiếp" | Quan sát người chơi. Đếm số lần người chơi ngập ngừng, lúng túng không biết thao tác hoặc phải hỏi người quan sát cách đi tiếp. |

---

## 2. Bảng theo dõi 7 lựa chọn thực tế trong game

Khi người chơi trải nghiệm, người quan sát tích vào các lựa chọn mà người chơi bấm sai lần đầu để xác định nội dung gây nhầm lẫn:

| Mã lựa chọn | Cảnh | Nội dung câu hỏi | Phương án Đúng | Các phương án Sai & Nguồn kiến thức giáo trình giải thích khi chọn sai |
|---|---|---|:---:|---|
| `k0-l1` | `k0-c1` | Con đường cứu nước (1911) | **C** | • **A** (Bạo động theo cụ Phan Bội Châu) & **B** (Cải cách theo cụ Phan Châu Trinh).<br>$\rightarrow$ Kiến thức: `GT-49-RA-DI` (tr.49–50). |
| `k0-l2` | `k0-c4` | Quốc tế nào? (12/1920) | **A** | • **B** (Quốc tế II) & **C** (Lập hội riêng).<br>$\rightarrow$ Kiến thức: `GT-51-TOURS` (tr.51). |
| `k1-l1` | `k1-c2` | Lực lượng cách mạng (1925) | **B** | • **A** (Chỉ trí thức học trò) & **C** (Trông chờ viện trợ ngoại bang).<br>$\rightarrow$ Kiến thức: `GT-54-CONG-NONG` (tr.54). |
| `k1-l2` | `k1-c3` | Điều kiện cách mạng thành công | **A** | • **B** (Chờ chiến tranh đế quốc) & **C** (Biểu tình bất bạo động).<br>$\rightarrow$ Kiến thức: `GT-55-CAM-LAI` (tr.55). |
| `k2-l1` | `k2-c1` | Việc đầu tiên của hội nghị (1930) | **A** | • **B** (Bỏ phiếu khai trừ nhóm khác) & **C** (Hoãn chờ Quốc tế Cộng sản).<br>$\rightarrow$ Kiến thức: `GT-62-NAM-DIEM` (tr.62). |
| `k2-l2` | `k2-c2` | Nhiệm vụ chủ yếu trước mắt | **A** | • **B** (Tịch thu chia ruộng ngay) & **C** (Liên hiệp với Pháp).<br>$\rightarrow$ Kiến thức: `GT-62-VAN-KIEN` (tr.62–63). |
| `k2-l3` | `k2-c3` | Lực lượng trong Sách lược vắn tắt | **B** | • **A** (*Chỉ công nông, ai khác đều không đáng tin*) $\rightarrow$ Kiến thức: `GT-66-LUC-LUONG` (tr.66).<br>• **C** (*Đoàn kết cả đại địa chủ và tư sản mại bản*) $\rightarrow$ Kiến thức: `GT-66-LUC-LUONG` (tr.66). |

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
