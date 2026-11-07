# -*- coding: utf-8 -*-
"""
Script tạo tài liệu Word (.docx) chuyên nghiệp:
KỊCH BẢN THUYẾT TRÌNH & CẨM NANG BẢO VỆ DỰ ÁN "HÀNH TRÌNH ĐỎ"
Môn: Lịch sử Đảng Cộng sản Việt Nam (VNR202)
"""

import os
import shutil
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, color_hex):
    """Đặt màu nền cho ô trong bảng"""
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{color_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def set_cell_margins(cell, top=120, bottom=120, left=150, right=150):
    """Đặt lề trong cho ô (padding) tính bằng dxa"""
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('w:top', top), ('w:bottom', bottom), ('w:left', left), ('w:right', right)]:
        node = OxmlElement(m)
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_table_borders(table, color="D1D5DB", sz="4", val="single"):
    """Đặt viền thanh lịch cho toàn bộ bảng"""
    tblPr = table._tbl.tblPr
    borders = parse_xml(
        f'<w:tblBorders {nsdecls("w")}>'
        f'  <w:top w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:bottom w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:insideH w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:insideV w:val="none"/>'
        f'  <w:left w:val="none"/>'
        f'  <w:right w:val="none"/>'
        f'</w:tblBorders>'
    )
    tblPr.append(borders)

def add_callout(doc, text, title="LƯU Ý DIỄN GIẢ", border_color="B91C1C", bg_color="FEF2F2"):
    """Tạo hộp ghi chú / callout thanh lịch với viền trái dày"""
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    table.columns[0].width = Inches(6.5)
    
    cell = table.cell(0, 0)
    set_cell_background(cell, bg_color)
    set_cell_margins(cell, top=140, bottom=140, left=200, right=180)
    
    tcPr = cell._tc.get_or_add_tcPr()
    borders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'  <w:left w:val="single" w:sz="36" w:space="0" w:color="{border_color}"/>'
        f'  <w:top w:val="none"/>'
        f'  <w:right w:val="none"/>'
        f'  <w:bottom w:val="none"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(borders)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.15
    
    run_title = p.add_run(f"📌 {title}: ")
    run_title.bold = True
    run_title.font.name = "Calibri"
    run_title.font.size = Pt(10.5)
    run_title.font.color.rgb = RGBColor(185, 28, 28) if border_color == "B91C1C" else RGBColor(30, 64, 175)
    
    run_text = p.add_run(text)
    run_text.font.name = "Calibri"
    run_text.font.size = Pt(10.5)
    run_text.font.color.rgb = RGBColor(31, 41, 55)
    
    # Khoảng cách sau bảng
    p_after = doc.add_paragraph()
    p_after.paragraph_format.space_before = Pt(0)
    p_after.paragraph_format.space_after = Pt(4)

def add_cue_box(doc, time_str, slide_str, speech_text, action_text, cue_text):
    """Tạo khối kịch bản gồm Lời thoại, Thao tác bấm máy và Ghi chú"""
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    table.columns[0].width = Inches(6.5)
    
    cell = table.cell(0, 0)
    set_cell_background(cell, "FFFFFF")
    set_cell_margins(cell, top=140, bottom=140, left=180, right=180)
    
    tcPr = cell._tc.get_or_add_tcPr()
    borders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'  <w:left w:val="single" w:sz="18" w:space="0" w:color="B91C1C"/>'
        f'  <w:top w:val="single" w:sz="6" w:space="0" w:color="E5E7EB"/>'
        f'  <w:right w:val="single" w:sz="6" w:space="0" w:color="E5E7EB"/>'
        f'  <w:bottom w:val="single" w:sz="6" w:space="0" w:color="E5E7EB"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(borders)
    
    # Tiêu đề khối
    p0 = cell.paragraphs[0]
    p0.paragraph_format.space_before = Pt(2)
    p0.paragraph_format.space_after = Pt(4)
    r_hdr = p0.add_run(f"⏱️ Mốc: {time_str}  |  🖥️ Slide/Màn hình: {slide_str}")
    r_hdr.bold = True
    r_hdr.font.name = "Calibri"
    r_hdr.font.size = Pt(11)
    r_hdr.font.color.rgb = RGBColor(185, 28, 28)
    
    # Lời thoại
    p1 = cell.add_paragraph()
    p1.paragraph_format.space_before = Pt(2)
    p1.paragraph_format.space_after = Pt(4)
    p1.paragraph_format.line_spacing = 1.2
    r_spk_lbl = p1.add_run("🎙️ Lời thoại diễn giả: ")
    r_spk_lbl.bold = True
    r_spk_lbl.font.name = "Calibri"
    r_spk_lbl.font.size = Pt(10.5)
    r_spk_lbl.font.color.rgb = RGBColor(17, 24, 39)
    
    r_spk_txt = p1.add_run(speech_text)
    r_spk_txt.font.name = "Calibri"
    r_spk_txt.font.size = Pt(10.5)
    r_spk_txt.font.color.rgb = RGBColor(55, 65, 81)
    
    # Thao tác máy tính
    p2 = cell.add_paragraph()
    p2.paragraph_format.space_before = Pt(2)
    p2.paragraph_format.space_after = Pt(4)
    p2.paragraph_format.line_spacing = 1.15
    r_act_lbl = p2.add_run("🖱️ Thao tác máy tính: ")
    r_act_lbl.bold = True
    r_act_lbl.font.name = "Calibri"
    r_act_lbl.font.size = Pt(10)
    r_act_lbl.font.color.rgb = RGBColor(3, 105, 161)
    
    r_act_txt = p2.add_run(action_text)
    r_act_txt.italic = True
    r_act_txt.font.name = "Calibri"
    r_act_txt.font.size = Pt(10)
    r_act_txt.font.color.rgb = RGBColor(30, 58, 138)
    
    # Cue nhắc diễn giả
    if cue_text:
        p3 = cell.add_paragraph()
        p3.paragraph_format.space_before = Pt(2)
        p3.paragraph_format.space_after = Pt(2)
        r_cue_lbl = p3.add_run("⚡ Lưu ý & Cảm xúc: ")
        r_cue_lbl.bold = True
        r_cue_lbl.font.name = "Calibri"
        r_cue_lbl.font.size = Pt(9.5)
        r_cue_lbl.font.color.rgb = RGBColor(180, 83, 9)
        
        r_cue_txt = p3.add_run(cue_text)
        r_cue_txt.font.name = "Calibri"
        r_cue_txt.font.size = Pt(9.5)
        r_cue_txt.font.color.rgb = RGBColor(146, 64, 14)
        
    p_end = doc.add_paragraph()
    p_end.paragraph_format.space_before = Pt(0)
    p_end.paragraph_format.space_after = Pt(6)

def build_presentation_docx():
    doc = docx.Document()
    
    # Thiết lập lề trang chuẩn A4
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.9)
        section.right_margin = Inches(0.8)
        
        # Header & Footer
        header = section.header
        p_hdr = header.paragraphs[0]
        p_hdr.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        r_h = p_hdr.add_run("Hành Trình Đỏ — Kịch Bản Thuyết Trình & Cẩm Nang Bảo Vệ")
        r_h.font.name = "Calibri"
        r_h.font.size = Pt(8.5)
        r_h.font.color.rgb = RGBColor(156, 163, 175)
        
        footer = section.footer
        p_ftr = footer.paragraphs[0]
        p_ftr.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r_f = p_ftr.add_run("Báo cáo môn Lịch sử Đảng Cộng sản Việt Nam (VNR202) • https://hanh-trinh-do.vercel.app")
        r_f.font.name = "Calibri"
        r_f.font.size = Pt(8.5)
        r_f.font.color.rgb = RGBColor(156, 163, 175)

    # ----------------- PHẦN TRANG BÌA -----------------
    p_inst = doc.add_paragraph()
    p_inst.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_inst.paragraph_format.space_before = Pt(10)
    p_inst.paragraph_format.space_after = Pt(4)
    r_inst = p_inst.add_run("HỌC VIỆN / TRƯỜNG ĐẠI HỌC — BỘ MÔN LÝ LUẬN CHÍNH TRỊ")
    r_inst.bold = True
    r_inst.font.name = "Calibri"
    r_inst.font.size = Pt(11)
    r_inst.font.color.rgb = RGBColor(107, 114, 128)

    p_sub_inst = doc.add_paragraph()
    p_sub_inst.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub_inst.paragraph_format.space_before = Pt(0)
    p_sub_inst.paragraph_format.space_after = Pt(24)
    r_sub = p_sub_inst.add_run("MÔN HỌC: LỊCH SỬ ĐẢNG CỘNG SẢN VIỆT NAM (VNR202)")
    r_sub.bold = True
    r_sub.font.name = "Calibri"
    r_sub.font.size = Pt(12)
    r_sub.font.color.rgb = RGBColor(185, 28, 28)

    # Tiêu đề lớn
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(12)
    p_title.paragraph_format.space_after = Pt(8)
    r_title = p_title.add_run("🚩 HÀNH TRÌNH ĐỎ")
    r_title.bold = True
    r_title.font.name = "Calibri"
    r_title.font.size = Pt(28)
    r_title.font.color.rgb = RGBColor(185, 28, 28)

    p_subtitle = doc.add_paragraph()
    p_subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_subtitle.paragraph_format.space_before = Pt(0)
    p_subtitle.paragraph_format.space_after = Pt(12)
    r_subt = p_subtitle.add_run("VISUAL NOVEL LỊCH SỬ ĐẢNG (1911 – 1930)\nĐỔI MỚI PHƯƠNG PHÁP HỌC TẬP VÀ GIẢNG DẠY QUA TRẢI NGHIỆM TƯƠNG TÁC")
    r_subt.bold = True
    r_subt.font.name = "Calibri"
    r_subt.font.size = Pt(13)
    r_subt.font.color.rgb = RGBColor(31, 41, 55)

    p_motto = doc.add_paragraph()
    p_motto.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_motto.paragraph_format.space_before = Pt(4)
    p_motto.paragraph_format.space_after = Pt(28)
    r_motto = p_motto.add_run('“Không phải học thuộc lòng lịch sử, mà là cùng sống và cùng đưa ra lựa chọn với lịch sử”')
    r_motto.italic = True
    r_motto.font.name = "Calibri"
    r_motto.font.size = Pt(11.5)
    r_motto.font.color.rgb = RGBColor(180, 83, 9)

    # Hộp thông tin sản phẩm
    add_callout(
        doc,
        "Sản phẩm Web & Di động (PWA Live): https://hanh-trinh-do.vercel.app\n"
        "Đối tượng kiến thức: Chương 1, Mục I Giáo trình Lịch sử Đảng Cộng sản Việt Nam (tr. 36–71)\n"
        "Định dạng tài liệu: Kịch bản Thuyết trình Chuẩn mực (10 phút) + Hướng dẫn Phản biện Q&A (5 phút)\n"
        "Bản nghiệm thu: v2.5 — 100% mã nguồn và 51/51 dữ liệu đối chứng giáo trình giấy đạt kiểm định",
        title="THÔNG TIN HỒ SƠ NGHIỆM THU ĐỀ TÀI",
        border_color="B91C1C",
        bg_color="FEF2F2"
    )

    doc.add_page_break()

    # ----------------- MỤC LỤC & CẤU TRÚC -----------------
    p_h1 = doc.add_paragraph()
    p_h1.paragraph_format.space_before = Pt(12)
    p_h1.paragraph_format.space_after = Pt(8)
    r_h1 = p_h1.add_run("MỤC LỤC TÀI LIỆU")
    r_h1.bold = True
    r_h1.font.name = "Calibri"
    r_h1.font.size = Pt(16)
    r_h1.font.color.rgb = RGBColor(185, 28, 28)

    toc_items = [
        ("PHẦN I", "TỔNG QUAN BÁO CÁO & PHÂN BỔ THỜI LƯỢNG (10 PHÚT + 5 PHÚT Q&A)", "Khung thời gian, phân vai nhóm và chuẩn bị kỹ thuật"),
        ("PHẦN II", "KỊCH BẢN THUYẾT TRÌNH CHI TIẾT TỪNG PHÚT (SPEAKER SCRIPT)", "Lời thoại mẫu verbatim, thao tác bấm máy và lưu ý diễn giả"),
        ("PHẦN III", "HƯỚNG DẪN THAO TÁC DIỄN GIẢ & HỘP ĐIỀU KHIỂN (PRESENTER PLAYBOOK)", "Bảng phím tắt P, 1-8, tham số URL và kịch bản dự phòng mất mạng"),
        ("PHẦN IV", "BỘ CẨM NANG PHẢN BIỆN Q&A VỚI GIẢNG VIÊN (10 CÂU HỎI TRỌNG TÂM)", "Đối thoại học thuật, chứng minh phương pháp luận và trả lời câu hỏi khó"),
        ("PHẦN V", "BẢNG TRA CỨU NHANH 51 NGUỒN ĐỐI CHỨNG GIÁO TRÌNH (TR. 36–71)", "Số trang sách giấy, mã hệ thống GT- và câu trích nguyên văn"),
    ]

    for part, title, desc in toc_items:
        p_t = doc.add_paragraph()
        p_t.paragraph_format.space_before = Pt(4)
        p_t.paragraph_format.space_after = Pt(2)
        r_p = p_t.add_run(f"{part}: {title}")
        r_p.bold = True
        r_p.font.name = "Calibri"
        r_p.font.size = Pt(11)
        r_p.font.color.rgb = RGBColor(31, 41, 55)
        
        p_d = doc.add_paragraph()
        p_d.paragraph_format.left_indent = Inches(0.3)
        p_d.paragraph_format.space_before = Pt(0)
        p_d.paragraph_format.space_after = Pt(4)
        r_d = p_d.add_run(f"• {desc}")
        r_d.italic = True
        r_d.font.name = "Calibri"
        r_d.font.size = Pt(10)
        r_d.font.color.rgb = RGBColor(107, 114, 128)

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # ----------------- PHẦN I: TỔNG QUAN & PHÂN BỔ THỜI LƯỢNG -----------------
    p_sec1 = doc.add_paragraph()
    p_sec1.paragraph_format.space_before = Pt(14)
    p_sec1.paragraph_format.space_after = Pt(8)
    r_s1 = p_sec1.add_run("PHẦN I. TỔNG QUAN BÁO CÁO & PHÂN BỔ THỜI LƯỢNG")
    r_s1.bold = True
    r_s1.font.name = "Calibri"
    r_s1.font.size = Pt(14)
    r_s1.font.color.rgb = RGBColor(185, 28, 28)

    # Bảng phân vai nhóm
    p_tbl_lbl1 = doc.add_paragraph()
    p_tbl_lbl1.paragraph_format.space_before = Pt(4)
    p_tbl_lbl1.paragraph_format.space_after = Pt(4)
    r_tl1 = p_tbl_lbl1.add_run("1. Bảng phân vai nhóm trong buổi bảo vệ đề tài")
    r_tl1.bold = True
    r_tl1.font.name = "Calibri"
    r_tl1.font.size = Pt(11)

    t_roles = doc.add_table(rows=5, cols=4)
    t_roles.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_roles)
    
    headers = ["Vai trò", "Nhiệm vụ chính trong buổi thuyết trình", "Người phụ trách", "Ghi chú thiết bị"]
    col_w = [Inches(1.2), Inches(2.8), Inches(1.2), Inches(1.3)]
    
    for i, h in enumerate(headers):
        cell = t_roles.cell(0, i)
        cell.width = col_w[i]
        set_cell_background(cell, "B91C1C")
        set_cell_margins(cell, top=100, bottom=100, left=120, right=120)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(h)
        r.bold = True
        r.font.name = "Calibri"
        r.font.size = Pt(10)
        r.font.color.rgb = RGBColor(255, 255, 255)

    roles_data = [
        ("Diễn giả 1 (KB)", "Trình bày Đặt vấn đề, Sứ mệnh đề tài, Phương pháp luận học thuật và Kết luận", "Thành viên 1", "Mic nói chính, slide bấm tay"),
        ("Thao tác viên (GP/UI)", "Bấm máy chiếu Live Demo, dùng phím tắt diễn giả P, số 1-8, phím Space, 1/2/3", "Thành viên 2", "Laptop chính nối máy chiếu"),
        ("Kỹ thuật viên (KT)", "Báo cáo kiến trúc công nghệ, chạy validate:strict, trả lời câu hỏi kỹ thuật & PWA", "Thành viên 3", "Laptop dự phòng, terminal"),
        ("Điều phối & Ghi chép", "Bấm giờ, ghi nhận câu hỏi Q&A từ Giảng viên, hỗ trợ đối chiếu số trang giáo trình", "Thành viên 4", "Giáo trình giấy + tài liệu này")
    ]

    for row_idx, data in enumerate(roles_data, start=1):
        bg = "F9FAFB" if row_idx % 2 == 1 else "FFFFFF"
        for col_idx, text in enumerate(data):
            cell = t_roles.cell(row_idx, col_idx)
            cell.width = col_w[col_idx]
            set_cell_background(cell, bg)
            set_cell_margins(cell, top=80, bottom=80, left=100, right=100)
            p = cell.paragraphs[0]
            if col_idx in [0, 2]:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r = p.add_run(text)
            r.font.name = "Calibri"
            r.font.size = Pt(9.5)
            r.font.color.rgb = RGBColor(31, 41, 55)
            if col_idx == 0:
                r.bold = True

    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    # Bảng phân bổ timeline 10 phút
    p_tbl_lbl2 = doc.add_paragraph()
    p_tbl_lbl2.paragraph_format.space_before = Pt(4)
    p_tbl_lbl2.paragraph_format.space_after = Pt(4)
    r_tl2 = p_tbl_lbl2.add_run("2. Phân bổ thời gian chuẩn xác 10 phút thuyết trình")
    r_tl2.bold = True
    r_tl2.font.name = "Calibri"
    r_tl2.font.size = Pt(11)

    t_time = doc.add_table(rows=6, cols=4)
    t_time.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_time)
    
    headers_time = ["Mốc thời gian", "Giai đoạn nội dung", "Trọng tâm cần đạt", "Màn hình minh họa"]
    col_w_t = [Inches(1.2), Inches(2.2), Inches(2.1), Inches(1.0)]
    
    for i, h in enumerate(headers_time):
        cell = t_time.cell(0, i)
        cell.width = col_w_t[i]
        set_cell_background(cell, "B91C1C")
        set_cell_margins(cell, top=100, bottom=100, left=120, right=120)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(h)
        r.bold = True
        r.font.name = "Calibri"
        r.font.size = Pt(10)
        r.font.color.rgb = RGBColor(255, 255, 255)

    timeline_data = [
        ("00:00 – 01:30 (1.5p)", "1. Đặt vấn đề & Ý tưởng", "Nêu thực trạng học vẹt Lịch sử Đảng và triết lý nhập vai 'sống cùng lịch sử'", "Slide 1, 2, 3"),
        ("01:30 – 03:00 (1.5p)", "2. Tính liêm chính học thuật", "3 nguyên tắc bất biến: không hư cấu phát ngôn Bác, kiểm định tự động 51 nguồn", "Slide 4, 5 + Terminal"),
        ("03:00 – 07:30 (4.5p)", "3. Trình diễn trực tiếp (Demo)", "Demo Cảnh 1 (1911), ngã rẽ sai k0-l1 (lịch sử giả định), phím P nhảy k2-c2, Quiz & Sơ đồ", "Trình duyệt Web Live"),
        ("07:30 – 09:00 (1.5p)", "4. Đánh giá & Công nghệ", "Kết quả playtest thực tế 8.8/10, kiến trúc PWA offline không sợ rớt mạng", "Slide 6, 7"),
        ("09:00 – 10:00 (1.0p)", "5. Kết luận & Mở rộng", "Khả năng nhân rộng Kỳ 3 (1930-1945), mã QR trải nghiệm ngay trên di động", "Slide 8, 9 (QR code)")
    ]

    for row_idx, data in enumerate(timeline_data, start=1):
        bg = "F9FAFB" if row_idx % 2 == 1 else "FFFFFF"
        for col_idx, text in enumerate(data):
            cell = t_time.cell(row_idx, col_idx)
            cell.width = col_w_t[col_idx]
            set_cell_background(cell, bg)
            set_cell_margins(cell, top=80, bottom=80, left=100, right=100)
            p = cell.paragraphs[0]
            if col_idx in [0, 3]:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r = p.add_run(text)
            r.font.name = "Calibri"
            r.font.size = Pt(9.5)
            r.font.color.rgb = RGBColor(31, 41, 55)
            if col_idx == 0:
                r.bold = True

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # ----------------- PHẦN II: KỊCH BẢN THUYẾT TRÌNH CHI TIẾT -----------------
    p_sec2 = doc.add_paragraph()
    p_sec2.paragraph_format.space_before = Pt(14)
    p_sec2.paragraph_format.space_after = Pt(8)
    r_s2 = p_sec2.add_run("PHẦN II. KỊCH BẢN THUYẾT TRÌNH CHI TIẾT TỪNG PHÚT")
    r_s2.bold = True
    r_s2.font.name = "Calibri"
    r_s2.font.size = Pt(14)
    r_s2.font.color.rgb = RGBColor(185, 28, 28)

    add_callout(
        doc,
        "Diễn giả hãy đọc lời thoại bằng giọng tự nhiên, dõng dạc, truyền cảm hứng và tự tin. "
        "Thao tác viên bấm máy cần lắng nghe từ khóa chốt (trigger words) của diễn giả để bấm phím chuẩn xác. "
        "Mỗi mốc nội dung dưới đây đều ghi rõ thao tác kỹ thuật tương ứng.",
        title="QUY TẮC PHỐI HỢP DIỄN GIẢ & BẤM MÁY",
        border_color="D97706",
        bg_color="FFFBEB"
    )

    # Mốc 1
    add_cue_box(
        doc,
        time_str="00:00 – 01:30",
        slide_str="Slide 1, 2, 3 (Mở đầu & Đặt vấn đề)",
        speech_text=(
            "Kính thưa quý Thầy Cô trong Hội đồng và toàn thể các bạn sinh viên!\n\n"
            "Chắc hẳn trong mỗi chúng ta khi học môn Lịch sử Đảng, đã không ít lần chúng ta phải đối mặt "
            "với cảm giác choáng ngợp trước hàng trăm mốc thời gian, sự kiện và số liệu cần phải ghi nhớ. "
            "Nhiều bạn sinh viên chia sẻ rằng: 'Học Lịch sử Đảng rất khó nhớ vì chỉ học thuộc lòng để đi thi, "
            "thi xong là quên hết!'. Nhưng nguyên nhân không phải do lịch sử khô khan, mà là do chúng ta "
            "đang đứng ở vị thế người đứng ngoài nhìn vào quá khứ qua những dòng chữ tĩnh.\n\n"
            "Chính vì trăn trở đó, nhóm chúng em đã phát triển dự án 'HÀNH TRÌNH ĐỎ' — một Visual Novel tương tác "
            "học Lịch sử Đảng Cộng sản Việt Nam. Triết lý cốt lõi của chúng em gói gọn trong một câu: "
            "'Không phải học thuộc lòng lịch sử, mà là cùng sống và cùng đưa ra lựa chọn với lịch sử'. "
            "Người chơi sẽ vào vai Minh — một thanh niên yêu nước rời bến cảng Sài Gòn năm 1911, đi cùng "
            "dòng chảy lịch sử suốt 20 năm để thấu hiểu tại sao con đường cứu nước của dân tộc ta tất yếu "
            "phải dẫn tới sự ra đời của Đảng vào mùa xuân năm 1930."
        ),
        action_text=(
            "• 00:00: Chiếu Slide 1 (Bìa sản phẩm, logo cờ đỏ búa liềm).\n"
            "• 00:35: Chuyển Slide 2 (Thực trạng học vẹt vs Nỗi đau sinh viên).\n"
            "• 01:05: Chuyển Slide 3 (Giới thiệu tên game, khẩu hiệu và nhân vật Minh)."
        ),
        cue_text="Giọng mở đầu ấm áp, chân thành, nhìn thẳng vào mắt Giảng viên khi nhắc tới nỗi sợ học vẹt."
    )

    # Mốc 2
    add_cue_box(
        doc,
        time_str="01:30 – 03:00",
        slide_str="Slide 4, 5 & Terminal (Liêm chính học thuật)",
        speech_text=(
            "Thưa Thầy Cô, khi làm một tựa game về đề tài Lịch sử Đảng, ranh giới giữa sáng tạo tương tác "
            "và sai lệch lịch sử là vô cùng mong manh. Nhóm chúng em đặt 'Tính liêm chính học thuật' "
            "(Academic Integrity) lên hàng đầu với 3 nguyên tắc bất biến:\n\n"
            "Thứ nhất: Giáo trình chính thống là chuẩn mực duy nhất. Mọi sự kiện, nhân vật và trích dẫn "
            "đều lấy từ Giáo trình Lịch sử Đảng Cộng sản Việt Nam năm 2021 của Nxb Chính trị quốc gia Sự thật, "
            "Chương 1 Mục I từ trang 36 đến trang 71.\n\n"
            "Thứ hai: Tuyệt đối không hư cấu phát ngôn của lãnh tụ lịch sử. Trong game, đồng chí Nguyễn Ái Quốc "
            "chỉ nói những câu trích nguyên văn từ giáo trình có mã nguồn 'quote'. Mọi tâm tư, đối thoại mở rộng "
            "đều thông qua các nhân vật hư cấu là Minh, Lan và Bác Tư.\n\n"
            "Thứ ba: Cơ chế kiểm định tự động 3 tầng. Toàn bộ 51 sự kiện lịch sử đều được mã hóa và kiểm thử "
            "bằng script tự động. Như Thầy Cô thấy trên màn hình terminal, lệnh 'pnpm validate:strict' đang chạy "
            "và 12/12 file dữ liệu đều xanh tuyệt đối, không có bất kỳ mốc thời gian hay câu trích nào bị gõ sai!"
        ),
        action_text=(
            "• 01:30: Chuyển Slide 4 (Bìa cuốn Giáo trình Lịch sử Đảng 2021 và sơ đồ 51 mã GT-).\n"
            "• 02:00: Chuyển Slide 5 (3 Nguyên tắc học thuật bất biến).\n"
            "• 02:30: Thao tác viên chuyển nhanh sang Terminal, gõ lệnh 'pnpm validate:strict' (show 12 file xanh)."
        ),
        cue_text="Nhấn mạnh chữ 'Tuyệt đối không hư cấu', phong thái tự tin, chuyên nghiệp."
    )

    # Mốc 3 (Live Demo phần 1)
    add_cue_box(
        doc,
        time_str="03:00 – 05:00",
        slide_str="Web Live: Kỳ 0 (1911 – 1920) & Cơ chế Lịch sử giả định",
        speech_text=(
            "Và ngay sau đây, xin kính mời Hội đồng cùng bước vào trải nghiệm trực tiếp 'Hành Trình Đỏ'!\n\n"
            "Chúng ta đang ở Cảnh 1 — Đêm hè năm 1911 trên boong tàu Amiral Latouche-Tréville rời bến cảng Sài Gòn. "
            "Người chơi có thể nghe thấy tiếng sóng biển rì rào và tiếng động cơ tàu. Nhấp chuột vào điểm phát sáng Hotspot, "
            "chúng ta khám phá thêm tư liệu về chuyến hải trình. Khi gặp các thuật ngữ lịch sử như 'bảo hộ' hay 'Đông Du', "
            "tính năng Tooltip kiểu Pentiment cho phép nhấp vào để đọc ngay định nghĩa kèm số trang giáo trình đối chứng.\n\n"
            "Điểm độc đáo nhất của game nằm ở các NGÃ RẼ TƯ TƯỞNG. Ở lựa chọn k0-l1 này: 'Đứng trước con đường cứu nước, "
            "ta nên chọn hướng nào?'. Bây giờ, em sẽ cố tình chọn phương án sai: 'Sang Nhật Bản cầu viện vũ khí'. "
            "Ngay lập tức, màn hình chuyển sang màu sepia và rung lắc nhẹ — đó là cơ chế 'Lịch sử giả định' (Alternate History)! "
            "Nhân vật chứng kiến thực tế năm 1908 Nhật Bản bắt tay Pháp trục xuất du học sinh Việt Nam. "
            "Trò chơi KHÔNG phạt Game Over, mà hiển thị Hộp kiến thức trích dẫn Giáo trình trang 45–46 giải thích vì sao "
            "con đường đó bế tắc, rồi nhẹ nhàng đưa người học trở về chọn con đường đúng: Đi sang phương Tây!"
        ),
        action_text=(
            "• 03:00: Bật trình duyệt full screen tại https://hanh-trinh-do.vercel.app.\n"
            "• 03:20: Bấm chuột vào Hotspot trên boong tàu để hiện popup thông tin.\n"
            "• 03:40: Nhấp vào một từ gạch chân chấm (Tooltip thuật ngữ) để hiện định nghĩa.\n"
            "• 04:10: Đến lựa chọn k0-l1 -> Bấm phím '1' (chọn phương án A sai: Nhật Bản).\n"
            "• 04:30: Chỉ tay lên màn hình khi xuất hiện hiệu ứng sepia rung lắc và Hộp kiến thức trích trang 45–46.\n"
            "• 04:50: Bấm phím 'Space' để quay lại và chọn phương án 3 (Sang phương Tây)."
        ),
        cue_text="Đây là 'khoảnh khắc đắt giá nhất' (Aha moment) của bài thuyết trình. Hãy để màn hình rung lắc tạo ấn tượng mạnh."
    )

    # Mốc 4 (Live Demo phần 2)
    add_cue_box(
        doc,
        time_str="05:00 – 06:30",
        slide_str="Web Live: Tính năng Diễn giả & Kỳ 2 (Hội nghị thành lập Đảng 1930)",
        speech_text=(
            "Để phục vụ buổi báo cáo hôm nay một cách linh hoạt, nhóm đã tích hợp BẢNG ĐIỀU KHIỂN DIỄN GIẢ (Presenter Drawer). "
            "Chỉ cần bấm phím P trên bàn phím, một thanh điều hướng 8 mốc trọng tâm mở ra. "
            "Em xin phép bấm phím số 6 để nhảy thẳng tới Cảnh Hội nghị thành lập Đảng đầu năm 1930 tại Cửu Long (Hồng Kông)!\n\n"
            "Tại đây, người chơi được chứng kiến không khí trang nghiêm của căn phòng nhỏ. Đồng chí Nguyễn Ái Quốc "
            "chủ trì cuộc họp hợp nhất các tổ chức cộng sản. Đứng trước lựa chọn k2-l2: 'Nhiệm vụ hàng đầu của cách mạng "
            "nước ta là gì?', người học được củng cố luận điểm sáng tạo của Cương lĩnh chính trị đầu tiên: "
            "Đặt nhiệm vụ giải phóng dân tộc lên hàng đầu, 'Đánh đổ đế quốc Pháp và bọn phong kiến, làm cho nước Nam "
            "được hoàn toàn độc lập' (Giáo trình tr. 65), hoàn toàn phù hợp với bối cảnh một nước thuộc địa nửa phong kiến."
        ),
        action_text=(
            "• 05:00: Gõ phím 'P' -> Presenter Drawer trượt ra từ cạnh phải.\n"
            "• 05:15: Gõ phím số '6' -> Nhảy lập tức tới cảnh k2-c2 (Hội nghị Cửu Long 1930).\n"
            "• 05:40: Bấm phím Space đọc qua 2 câu thoại của Nguyễn Ái Quốc (trích nguyên văn Cương lĩnh).\n"
            "• 06:10: Bấm phím '1' chọn phương án đúng giải phóng dân tộc."
        ),
        cue_text="Thao tác mượt mà, dứt khoát. Nhấn mạnh việc chuyển cảnh tức thì chứng minh tính hoàn thiện kỹ thuật."
    )

    # Mốc 5 (Live Demo phần 3 & Tổng kết)
    add_cue_box(
        doc,
        time_str="06:30 – 07:30",
        slide_str="Web Live: Bảo tàng Tư liệu, Trắc nghiệm & Sơ đồ Flowchart",
        speech_text=(
            "Sau khi hoàn thành chuyến đi, người chơi mở khóa 8 tư liệu lịch sử trong Phòng trưng bày (Collection) "
            "với hình vẽ vector SVG sắc nét: từ Báo L'Humanité, Báo Thanh niên số 1, cho đến cuốn Đường cách mệnh. "
            "Mỗi tư liệu đều ghi rõ số trang giáo trình đối chứng.\n\n"
            "Tiếp theo là 6 câu hỏi củng cố (Quiz). Các câu hỏi được xáo trộn ngẫu nhiên. Khi người học trả lời xong, "
            "mỗi câu hỏi đều có nút '📖 Ôn lại cảnh' để đưa người học quay ngược lại đúng phân đoạn lịch sử đã học.\n\n"
            "Đặc biệt, tại Màn Tổng kết, game trang bị SƠ ĐỒ NGÃ RẼ LỊCH SỬ (Flowchart 21 nhánh). "
            "Sơ đồ này phân định trực quan giữa dòng chảy lịch sử thật và các nhánh giả định mà người học đã trải nghiệm, "
            "vinh danh danh hiệu 'Người đi cùng lịch sử' cho những ai có tư duy lập trường vững vàng!"
        ),
        action_text=(
            "• 06:30: Gõ phím 'P' rồi bấm số '7' -> Mở nhanh màn Quiz -> Nhấp chọn nhanh 1 câu để show nút 'Ôn lại cảnh'.\n"
            "• 07:00: Gõ phím số '8' -> Mở Màn Tổng kết (SummaryScreen).\n"
            "• 07:15: Cuộn chuột xem Sơ đồ Flowchart 21 nhánh tương tác sáng lên các nhánh đã đi qua."
        ),
        cue_text="Chỉ tay vào Sơ đồ Flowchart, nhấn mạnh tính sư phạm giúp củng cố toàn bộ bức tranh lịch sử."
    )

    # Mốc 6 (Đánh giá & Công nghệ)
    add_cue_box(
        doc,
        time_str="07:30 – 09:00",
        slide_str="Slide 6, 7 (Kiểm chứng thực tế & Nền tảng công nghệ)",
        speech_text=(
            "Kính thưa Thầy Cô, sản phẩm của chúng em không chỉ dừng lại ở ý tưởng trên giấy mà đã trải qua "
            "2 vòng chơi thử nghiệm (Playtest) thực tế với sinh viên trong trường. Kết quả đo lường đạt điểm số "
            "hài lòng trung bình 8.8 / 10. Hơn 85% người chơi phản hồi rằng việc được tự tay đưa ra lựa chọn "
            "khiến họ nhớ lâu hơn gấp nhiều lần so với việc đọc vẹt giáo trình.\n\n"
            "Về mặt công nghệ: Dự án được xây dựng trên nền tảng React 18, Vite và TypeScript, tối ưu hiệu năng "
            "đạt chuẩn 60 khung hình/giây. Đặc biệt, ứng dụng hỗ trợ Progressive Web App (PWA). "
            "Sau khi truy cập lần đầu, toàn bộ dữ liệu, hình ảnh và âm thanh được lưu đệm ngoại tuyến. "
            "Điều đó có nghĩa là ngay cả khi giảng đường mất mạng Internet hoàn toàn, trò chơi vẫn vận hành "
            "trơn tru 100% mà không gặp bất kỳ sự cố nào!"
        ),
        action_text=(
            "• 07:30: Chuyển sang Slide 6 (Biểu đồ cột kết quả Playtest và trích dẫn cảm nhận sinh viên).\n"
            "• 08:15: Chuyển sang Slide 7 (Sơ đồ kiến trúc công nghệ: React, PWA Offline Service Worker, 185 Unit Tests)."
        ),
        cue_text="Nhấn mạnh tính ổn định kỹ thuật, giải tỏa nỗi lo mất mạng của Giảng viên khi thuyết trình."
    )

    # Mốc 7 (Kết luận & Q&A)
    add_cue_box(
        doc,
        time_str="09:00 – 10:00",
        slide_str="Slide 8, 9 (Lộ trình mở rộng, Mã QR & Lời cảm ơn)",
        speech_text=(
            "Nhìn về tương lai, với kiến trúc Engine mô-đun hóa hiện tại, 'Hành Trình Đỏ' đã sẵn sàng "
            "để mở rộng tiếp Kỳ 3: Giai đoạn 1930–1945 (Đỉnh cao Cao trào Xô viết Nghệ Tĩnh và Cách mạng Tháng Tám), "
            "và Kỳ 4: Hai cuộc kháng chiến trường kỳ giải phóng dân tộc.\n\n"
            "Kính thưa Thầy Cô, cố Thủ tướng Phạm Văn Đồng từng nói: 'Lịch sử là ngọn đèn soi sáng con đường "
            "đi tới tương lai'. Bằng cách kết hợp giữa công nghệ hiện đại và sự liêm chính học thuật, chúng em hy vọng "
            "'Hành Trình Đỏ' sẽ góp phần đưa môn Lịch sử Đảng trở nên gần gũi, sống động và truyền cảm hứng "
            "tự hào dân tộc cho thế hệ trẻ hôm nay.\n\n"
            "Xin trân trọng cảm ơn quý Thầy Cô đã lắng nghe. Mọi người có thể quét mã QR trên màn hình "
            "để trải nghiệm game ngay trên điện thoại. Sau đây, nhóm chúng em xin sẵn sàng lắng nghe các câu hỏi "
            "và đóng góp quý báu từ Hội đồng!"
        ),
        action_text=(
            "• 09:00: Chuyển Slide 8 (Lộ trình Kỳ 3, Kỳ 4).\n"
            "• 09:30: Chuyển Slide 9 (Mã QR code to rõ ràng, link https://hanh-trinh-do.vercel.app, thông tin nhóm).\n"
            "• 09:55: Cả nhóm đứng nghiêm trang, cúi đầu cảm ơn Hội đồng."
        ),
        cue_text="Kết thúc dứt khoát, nụ cười tự tin, chuyển quyền sang Giảng viên điều phối phần Q&A."
    )

    doc.add_page_break()

    # ----------------- PHẦN III: HƯỚNG DẪN THAO TÁC DIỄN GIẢ -----------------
    p_sec3 = doc.add_paragraph()
    p_sec3.paragraph_format.space_before = Pt(14)
    p_sec3.paragraph_format.space_after = Pt(8)
    r_s3 = p_sec3.add_run("PHẦN III. HƯỚNG DẪN THAO TÁC DIỄN GIẢ (PRESENTER PLAYBOOK)")
    r_s3.bold = True
    r_s3.font.name = "Calibri"
    r_s3.font.size = Pt(14)
    r_s3.font.color.rgb = RGBColor(185, 28, 28)

    p_pb_desc = doc.add_paragraph()
    p_pb_desc.paragraph_format.space_after = Pt(6)
    r_pbd = p_pb_desc.add_run(
        "Bảng điều khiển diễn giả (Presenter Drawer) được thiết kế đặc quyền cho buổi báo cáo. "
        "Thao tác viên có thể điều khiển toàn bộ bài thuyết trình bằng các phím tắt bàn phím một cách chuyên nghiệp mà không để lộ thao tác thừa trên màn chiếu."
    )
    r_pbd.font.name = "Calibri"
    r_pbd.font.size = Pt(10.5)

    # Bảng phím tắt diễn giả
    t_keys = doc.add_table(rows=10, cols=3)
    t_keys.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_keys)
    
    headers_keys = ["Phím tắt", "Chức năng trong buổi báo cáo", "Thời điểm sử dụng khuyến nghị"]
    col_w_k = [Inches(1.5), Inches(3.2), Inches(1.8)]
    
    for i, h in enumerate(headers_keys):
        cell = t_keys.cell(0, i)
        cell.width = col_w_k[i]
        set_cell_background(cell, "B91C1C")
        set_cell_margins(cell, top=100, bottom=100, left=120, right=120)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(h)
        r.bold = True
        r.font.name = "Calibri"
        r.font.size = Pt(10)
        r.font.color.rgb = RGBColor(255, 255, 255)

    keys_data = [
        ("P", "Bật / Tắt Ngăn điều khiển Diễn giả (Presenter Drawer)", "Khi bắt đầu Demo và khi cần nhảy mốc"),
        ("1 đến 8", "Nhảy nhanh 8 mốc quan trọng (Kỳ 0, Cửu Long, Quiz, Summary)", "Khi diễn giả gọi mốc tương ứng"),
        ("Space / Enter", "Tiến tới dòng thoại tiếp theo (Đọc thoại)", "Xuyên suốt các cảnh có hội thoại"),
        ("1 / 2 / 3", "Chọn phương án A / B / C tại ngã rẽ tư tưởng", "Tại các ngã rẽ k0-l1, k2-l2..."),
        ("H", "Ẩn / Hiện toàn bộ giao diện (Hide HUD) để ngắm hình nền/CG", "Khi muốn khoe đồ họa SVG toàn màn hình"),
        ("V", "Mở modal xem Thước phim tư liệu minh họa", "Tại các cảnh có nút video tư liệu"),
        ("J", "Mở cuốn Nhật ký của Minh ghi chép tổng kết kỳ", "Cuối Kỳ 0, Kỳ 1 hoặc khi muốn mở nhanh"),
        ("Ctrl + P", "Mở danh sách nhảy tới bất kỳ cảnh nào trong 15 cảnh", "Dự phòng khi Giảng viên hỏi lại cảnh cũ"),
        ("Esc", "Đóng các Modal đang mở (Cài đặt, Nhật ký, Tư liệu, Diễn giả)", "Khi muốn quay lại màn hình chính ngay lập tức")
    ]

    for row_idx, data in enumerate(keys_data, start=1):
        bg = "F9FAFB" if row_idx % 2 == 1 else "FFFFFF"
        for col_idx, text in enumerate(data):
            cell = t_keys.cell(row_idx, col_idx)
            cell.width = col_w_k[col_idx]
            set_cell_background(cell, bg)
            set_cell_margins(cell, top=80, bottom=80, left=100, right=100)
            p = cell.paragraphs[0]
            if col_idx in [0]:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r = p.add_run(text)
            r.font.name = "Calibri"
            r.font.size = Pt(9.5)
            r.font.color.rgb = RGBColor(31, 41, 55)
            if col_idx == 0:
                r.bold = True
                r.font.color.rgb = RGBColor(185, 28, 28)

    doc.add_paragraph().paragraph_format.space_after = Pt(10)

    # Bảng kịch bản dự phòng rủi ro
    p_risk_lbl = doc.add_paragraph()
    p_risk_lbl.paragraph_format.space_before = Pt(4)
    p_risk_lbl.paragraph_format.space_after = Pt(4)
    r_rl = p_risk_lbl.add_run("Kế hoạch phòng ngừa rủi ro kỹ thuật (Contingency Plan)")
    r_rl.bold = True
    r_rl.font.name = "Calibri"
    r_rl.font.size = Pt(11)

    add_callout(
        doc,
        "1. Mất kết nối Internet: Trò chơi đã cài sẵn Service Worker PWA, mở tab ẩn danh hoặc chạy 'pnpm preview' offline 100%.\n"
        "2. Máy chiếu không phát được âm thanh: Trò chơi có phụ đề đầy đủ và hiệu ứng visual rung lắc, tắt âm lượng trên thanh Header để tiếp tục.\n"
        "3. Cháy thời gian (Hội đồng giơ biển 2 phút): Diễn giả lập tức gõ phím 'P' -> bấm phím '6' (Hội nghị Đảng) -> bấm phím '8' (Tổng kết), bỏ qua các đoạn thoại phụ.",
        title="3 KỊCH BẢN ỨNG PHÓ SỰ CỐ KHẨN CẤP",
        border_color="B91C1C",
        bg_color="FEF2F2"
    )

    doc.add_page_break()

    # ----------------- PHẦN IV: CẨM NANG PHẢN BIỆN Q&A -----------------
    p_sec4 = doc.add_paragraph()
    p_sec4.paragraph_format.space_before = Pt(14)
    p_sec4.paragraph_format.space_after = Pt(8)
    r_s4 = p_sec4.add_run("PHẦN IV. BỘ CẨM NANG PHẢN BIỆN Q&A VỚI GIẢNG VIÊN (10 CÂU HỎI TRỌNG TÂM)")
    r_s4.bold = True
    r_s4.font.name = "Calibri"
    r_s4.font.size = Pt(14)
    r_s4.font.color.rgb = RGBColor(185, 28, 28)

    p_qa_intro = doc.add_paragraph()
    p_qa_intro.paragraph_format.space_after = Pt(8)
    r_qai = p_qa_intro.add_run(
        "Dưới đây là 10 câu hỏi điển hình mà Giảng viên và Hội đồng phản biện thường đặt ra cho các đề tài đổi mới phương pháp giảng dạy lịch sử. "
        "Mỗi câu trả lời đều được trang bị lập luận lý luận chặt chẽ và số trang giáo trình đối chứng chính xác."
    )
    r_qai.italic = True
    r_qai.font.name = "Calibri"
    r_qai.font.size = Pt(10.5)

    qa_list = [
        (
            "Câu 1: Vì sao nhân vật Nguyễn Ái Quốc không xuất hiện nói nhiều câu thoại như các nhân vật hư cấu?",
            "Dạ kính thưa Thầy Cô, đây là nguyên tắc 'Liêm chính học thuật' quan trọng nhất mà nhóm quán triệt ngay từ ngày đầu. "
            "Chúng em xác định tuyệt đối không được hư cấu phát ngôn của lãnh tụ cách mạng. Trong game, Bác Hồ chỉ phát ngôn những câu "
            "trích dẫn nguyên văn trong giáo trình chính quy (loại mã 'quote'). Mọi suy tư trăn trở, đối thoại mở rộng nhằm tái hiện không khí "
            "thời đại đều được chuyển tải qua góc nhìn của các nhân vật hư cấu đại diện cho các tầng lớp nhân dân (Minh - thanh niên yêu nước, "
            "Lan - học sinh giác ngộ, Bác Tư - công nhân thợ máy). Cách tiếp cận này vừa đảm bảo sự tôn nghiêm lịch sử, vừa giúp cốt truyện gần gũi."
        ),
        (
            "Câu 2: Cơ chế 'Lịch sử giả định' (Alternate History) khi chọn sai có làm sinh viên bị lệch lạc nhận thức không?",
            "Dạ thưa Thầy Cô, hoàn toàn không ạ. Ngược lại, đây chính là phương pháp sư phạm phản chứng giúp sinh viên hiểu sâu bản chất. "
            "Khi người chơi chọn một hướng đi sai (ví dụ: nhờ Nhật Bản giúp đỡ vũ khí), game không phạt Game Over mà cho người chơi chứng kiến "
            "ngay thất bại thực tế trong lịch sử (phong trào Đông Du bị đàn áp năm 1908 do Nhật câu kết với Pháp, theo Giáo trình trang 45–46). "
            "Sau đó, Hộp kiến thức xuất hiện giải thích cặn kẽ căn cứ giáo trình trước khi cho người học chọn lại con đường đúng. "
            "Nhờ vậy, sinh viên hiểu được 'Vì sao con đường đó lại bế tắc' thay vì chỉ học thuộc một đáp án đúng một cách máy móc."
        ),
        (
            "Câu 3: Hội nghị thành lập Đảng họp từ 6/1 đến 7/2/1930, tại sao ngày kỷ niệm thành lập Đảng lại lấy là ngày 3/2?",
            "Dạ thưa Thầy Cô, căn cứ theo Giáo trình Lịch sử Đảng Cộng sản Việt Nam (trang 61), Hội nghị hợp nhất các tổ chức cộng sản "
            "bắt đầu họp từ ngày 6/1/1930 đến ngày 7/2/1930 tại Cửu Long (Hồng Kông). Sau này, Đại hội đại biểu toàn quốc lần thứ III của Đảng "
            "(tháng 9/1960) đã ra quyết nghị chính thức lấy ngày 3 tháng 2 dương lịch hằng năm làm ngày kỷ niệm thành lập Đảng Cộng sản Việt Nam. "
            "Chi tiết lịch sử quan trọng này được nhóm đưa vào cả câu hỏi củng cố (Quiz) và Hộp tư liệu số 8 trong game để giúp sinh viên nắm vững."
        ),
        (
            "Câu 4: Tư liệu tranh ảnh, âm thanh và video trong game có đảm bảo bản quyền và tính trung thực không?",
            "Dạ thưa Thầy Cô, nhóm tuân thủ nghiêm ngặt quy định về tư liệu:\n"
            "1. Hình nền và chân dung nhân vật: 100% đồ họa vector SVG và tranh minh họa nghệ thuật do nhóm tự vẽ và thiết kế.\n"
            "2. 8 Hiện vật bảo tàng: Là hình minh họa tái hiện kèm trích dẫn số trang giáo trình rõ ràng, nhóm không mạo nhận là ảnh chụp hiện vật gốc vật lý.\n"
            "3. Các trích đoạn video: Được gắn nhãn minh bạch 'Minh họa tái hiện lịch sử' kèm số trang giáo trình đối chứng.\n"
            "4. Âm thanh và tiếng động: Sử dụng thư viện bản quyền mở (Creative Commons Zero / Web Audio) do nhóm tự tổng hợp qua script."
        ),
        (
            "Câu 5: 'Hành Trình Đỏ' khác biệt gì so với việc dùng Kahoot hay Quizizz để ôn tập?",
            "Dạ thưa Thầy Cô, Kahoot và Quizizz là công cụ trắc nghiệm đánh giá ở bậc nhận biết và nhớ lại (Bloom mức 1-2). "
            "Sinh viên chỉ nhìn thấy câu hỏi và 4 đáp án rời rạc. Còn 'Hành Trình Đỏ' là một môi trường học tập nhập vai (Immersive Learning): "
            "sinh viên được đặt mình vào bối cảnh lịch sử, có nhân vật đồng hành, có cảm xúc, và quan trọng nhất là được trực tiếp đưa ra quyết định "
            "ở 7 bước ngoặt tư tưởng then chốt của dân tộc. Sau khi chơi, sinh viên không chỉ nhớ sự kiện mà còn thấu hiểu quy luật lịch sử và tính tất yếu."
        ),
        (
            "Câu 6: Nếu trong lúc báo cáo ở trường mà phòng học mất mạng Internet thì sao?",
            "Dạ thưa Thầy Cô, nhóm đã tính toán kỹ bài toán môi trường giảng đường. Sản phẩm là ứng dụng Progressive Web App (PWA). "
            "Toàn bộ tài nguyên mã nguồn, hình ảnh SVG và dữ liệu 51 nguồn được Service Worker lưu đệm hoàn toàn vào bộ nhớ cache. "
            "Chỉ cần mở một lần, sau đó ngắt kết nối mạng trò chơi vẫn chạy mượt mà 100%. "
            "Đồng thời, trên máy tính của nhóm luôn có sẵn bản máy chủ cục bộ (Local Server) dự phòng để sẵn sàng bật ngay trong 3 giây."
        ),
        (
            "Câu 7: Vì sao Cương lĩnh chính trị đầu tiên lại xác định nhiệm vụ chống đế quốc lên hàng đầu trước chống phong kiến?",
            "Dạ thưa Thầy Cô, căn cứ Giáo trình trang 64–65, đây chính là sự sáng tạo độc đáo của Nguyễn Ái Quốc khi vận dụng chủ nghĩa Mác – Lênin "
            "vào hoàn cảnh một nước thuộc địa nửa phong kiến như Việt Nam. Mâu thuẫn chủ yếu và gay gắt nhất lúc bấy giờ là mâu thuẫn giữa toàn thể "
            "dân tộc Việt Nam với thực dân Pháp xâm lược (Giáo trình tr. 43). Vì vậy, nhiệm vụ giải phóng dân tộc phải đặt lên hàng đầu. "
            "Nếu máy móc rập khuôn công thức của các nước tư bản là đặt đấu tranh giai cấp lên trên hết thì sẽ không tập hợp được sức mạnh của toàn dân tộc."
        ),
        (
            "Câu 8: Sự xuất hiện của 3 tổ chức cộng sản năm 1929 là bước tiến hay bước lùi của phong trào cách mạng?",
            "Dạ thưa Thầy Cô, theo Giáo trình trang 59–60, sự ra đời liên tiếp của Đông Dương Cộng sản Đảng (6/1929), An Nam Cộng sản Đảng (11/1929) "
            "và Đông Dương Cộng sản Liên đoàn (9/1929) là một xu thế khách quan tất yếu, phản ánh sự phát triển nhảy vọt của phong trào công nhân "
            "và phong trào yêu nước theo khuynh hướng vô sản. Tuy nhiên, việc tồn tại 3 tổ chức độc lập dẫn đến nguy cơ tranh giành ảnh hưởng, "
            "phân tán lực lượng (Giáo trình tr. 60). Do đó, yêu cầu cấp bách hàng đầu là phải thống nhất lại thành một chính đảng duy nhất, "
            "và Nguyễn Ái Quốc đã hoàn thành xuất sắc sứ mệnh lịch sử đó tại Hội nghị tháng 2/1930."
        ),
        (
            "Câu 9: Làm thế nào để đo lường người học thực sự hiểu bài chứ không phải click bừa cho xong?",
            "Dạ thưa Thầy Cô, hệ thống của game có 3 tầng đo lường:\n"
            "1. Cơ chế khóa 3 giây: Tại các Hộp kiến thức giáo trình, hệ thống khóa nút bấm tối thiểu 3 giây để người học có thời gian đọc hiểu.\n"
            "2. Hệ thống phân loại danh hiệu: Người chơi chỉ nhận được danh hiệu cao quý 'Người đi cùng lịch sử' khi chọn đúng ngay lần đầu ở 7/7 ngã rẽ.\n"
            "3. Bài Quiz cuối game: 6 câu hỏi được xáo trộn thứ tự đáp án ngẫu nhiên mỗi lượt chơi, đòi hỏi sinh viên phải nắm vững bản chất kiến thức mới đạt điểm tối đa."
        ),
        (
            "Câu 10: Nhóm có kế hoạch chuyển giao hoặc mở rộng mô hình này như thế nào?",
            "Dạ thưa Thầy Cô, toàn bộ mã nguồn của game được thiết kế theo kiến trúc Engine tách biệt dữ liệu (Data-driven Engine). "
            "Toàn bộ kịch bản và câu hỏi nằm gọn trong các file JSON có cấu trúc chuẩn. Nhờ kiến trúc này, nhóm có thể dễ dàng mở rộng sang "
            "Kỳ 3 (Giai đoạn 1930–1945: Khởi nghĩa giành chính quyền), Kỳ 4 (1945–1975: Kháng chiến thống nhất), hoặc thậm chí nhân rộng mô hình này "
            "sang các môn Lý luận chính trị khác như Tư tưởng Hồ Chí Minh và Chủ nghĩa Xã hội Khoa học mà không cần viết lại mã nguồn giao diện."
        )
    ]

    for q, a in qa_list:
        p_q = doc.add_paragraph()
        p_q.paragraph_format.space_before = Pt(8)
        p_q.paragraph_format.space_after = Pt(2)
        r_q = p_q.add_run(f"❓ {q}")
        r_q.bold = True
        r_q.font.name = "Calibri"
        r_q.font.size = Pt(11)
        r_q.font.color.rgb = RGBColor(185, 28, 28)
        
        p_a = doc.add_paragraph()
        p_a.paragraph_format.left_indent = Inches(0.2)
        p_a.paragraph_format.space_before = Pt(0)
        p_a.paragraph_format.space_after = Pt(6)
        p_a.paragraph_format.line_spacing = 1.15
        r_a = p_a.add_run(f"💡 Trả lời: {a}")
        r_a.font.name = "Calibri"
        r_a.font.size = Pt(10)
        r_a.font.color.rgb = RGBColor(31, 41, 55)

    doc.add_page_break()

    # ----------------- PHẦN V: BẢNG TRA CỨU 51 NGUỒN ĐỐI CHỨNG -----------------
    p_sec5 = doc.add_paragraph()
    p_sec5.paragraph_format.space_before = Pt(14)
    p_sec5.paragraph_format.space_after = Pt(8)
    r_s5 = p_sec5.add_run("PHẦN V. BẢNG TRA CỨU NHANH 51 NGUỒN ĐỐI CHỨNG GIÁO TRÌNH (TR. 36–71)")
    r_s5.bold = True
    r_s5.font.name = "Calibri"
    r_s5.font.size = Pt(14)
    r_s5.font.color.rgb = RGBColor(185, 28, 28)

    p_src_desc = doc.add_paragraph()
    p_src_desc.paragraph_format.space_after = Pt(6)
    r_sd = p_src_desc.add_run(
        "Bảng tra cứu 'Vũ khí phản biện' giúp nhóm đối chứng ngay lập tức số trang sách giấy khi Giảng viên hỏi: "
        "'Chi tiết này nằm ở đâu trong giáo trình?'. Nguồn trích duy nhất: Giáo trình Lịch sử Đảng Cộng sản Việt Nam "
        "(dành cho bậc đại học hệ không chuyên), Nxb. Chính trị quốc gia Sự thật, Hà Nội, 2021."
    )
    r_sd.italic = True
    r_sd.font.name = "Calibri"
    r_sd.font.size = Pt(10)

    # Đọc dữ liệu từ docs/04-sources.md hoặc tạo bảng đầy đủ
    sources_summary = [
        # Kỳ 0: 1911 - 1920
        ("GT-38-PATONOT", "Tr. 38", "fact", "Ngày 6/6/1884, với Hiệp ước Patơnốt, triều Nguyễn đầu hàng; Việt Nam thành thuộc địa."),
        ("GT-41-NONG-DAN", "Tr. 41", "fact", "Nông dân chiếm hơn 90% dân số, là giai cấp bị bóc lột nặng nề nhất."),
        ("GT-43-MAU-THUAN", "Tr. 43", "fact", "Mâu thuẫn giữa dân tộc Việt Nam với thực dân Pháp là mâu thuẫn chủ yếu nhất."),
        ("GT-44-CAN-VUONG", "Tr. 44", "fact", "Phong trào Cần Vương thất bại chấm dứt vai trò lãnh đạo của phong kiến."),
        ("GT-45-DONG-DU", "Tr. 45–46", "fact", "Năm 1908, Nhật Bản câu kết thực dân Pháp trục xuất lưu học sinh; Đông Du thất bại."),
        ("GT-46-CAI-CACH", "Tr. 46–47", "quote", "'đặt vào lòng độ lượng của Pháp cái hy vọng cải tử hoàn sinh cho nước Nam'"),
        ("GT-47-CHONG-THUE", "Tr. 47", "fact", "Phong trào chống thuế Trung Kỳ 1908 bị đàn áp; đóng cửa Đông Kinh Nghĩa Thục."),
        ("GT-48-YEN-BAI", "Tr. 48", "fact", "Khởi nghĩa Yên Bái (2/1930) của VN Quốc dân Đảng thất bại: 'Không thành công cũng thành nhân'."),
        ("GT-49-NGUYEN-NHAN", "Tr. 49", "quote", "'chưa có một tổ chức vững mạnh để tập hợp, giác ngộ và lãnh đạo toàn dân tộc'"),
        ("GT-49-RA-DI", "Tr. 49–50", "quote", "'với nhãn quan chính trị sắc bén... năm 1911, Nguyễn Tất Thành ra đi tìm đường cứu nước'"),
        ("GT-50-HAI-GIONG-NGUOI", "Tr. 50", "quote", "'dù màu da có khác nhau, trên đời này chỉ có hai giống người: bóc lột và bị bóc lột'"),
        ("GT-50-YEU-SACH", "Tr. 50", "fact", "Ngày 18/6/1919, gửi Yêu sách của nhân dân An Nam (8 điểm) tới Hội nghị Vécxay."),
        ("GT-51-TIENG-VANG", "Tr. 51", "fact", "Bản Yêu sách tạo tiếng vang lớn; Người thấu hiểu bản chất đế quốc chủ nghĩa."),
        ("GT-51-LUAN-CUONG", "Tr. 51", "fact", "Tháng 7/1920: đọc Sơ thảo Luận cương Lênin trên báo L'Humanité (ngày 16–17/7/1920)."),
        ("GT-51-TOURS", "Tr. 51", "fact", "Tháng 12/1920 tại Đại hội Tua: bỏ phiếu tán thành Quốc tế III, sáng lập Đảng CS Pháp."),
        
        # Kỳ 1: 1921 - 1929
        ("GT-52-LIEN-HIEP", "Tr. 52", "fact", "Giữa năm 1921: lập Hội Liên hiệp thuộc địa, sáng lập báo Le Paria (Người cùng khổ)."),
        ("GT-52-LIEN-XO", "Tr. 52", "fact", "30/6/1923 sang Liên Xô; tham dự Đại hội V Quốc tế Cộng sản (1924)."),
        ("GT-53-CHU-NGHIA", "Tr. 53", "quote", "'Đảng muốn vững thì phải có chủ nghĩa làm cốt... như tàu không có bàn chỉ nam'"),
        ("GT-54-CONG-NONG", "Tr. 54", "quote", "'công nông là gốc cách mệnh; còn học trò, nhà buôn nhỏ... là bầu bạn cách mệnh'"),
        ("GT-54-VIEC-CHUNG", "Tr. 54", "quote", "'là việc chung của cả dân chúng chứ không phải là việc của một hai người'"),
        ("GT-54-KHONG-PHU-THUOC", "Tr. 54", "fact", "CM thuộc địa không phụ thuộc vào CM chính quốc, có thể giành thắng lợi trước."),
        ("GT-55-CAM-LAI", "Tr. 55", "quote", "'Đảng có vững cách mệnh mới thành công, cũng như người cầm lái có vững thuyền mới chạy'"),
        ("GT-55-VO-SAN-HOA", "Tr. 55", "fact", "Phong trào 'vô sản hóa' (29/9/1928) truyền bá tư tưởng vô sản vào nhà máy hầm mỏ."),
        ("GT-55-QUANG-CHAU", "Tr. 55", "fact", "11/1924 đến Quảng Châu; tháng 6/1925 lập Hội Việt Nam Cách mạng Thanh niên."),
        ("GT-56-BAO-THANH-NIEN", "Tr. 56", "fact", "Báo Thanh niên số 1 ra ngày 21/6/1925, khởi đầu nền báo chí cách mạng Việt Nam."),
        ("GT-57-LOP-HUAN-LUYEN", "Tr. 57", "fact", "Mở hơn 10 lớp huấn luyện chính trị tại nhà 13A-13B đường Văn Minh, Quảng Châu."),
        ("GT-57-DUONG-CACH-MENH", "Tr. 57", "fact", "Xuất bản tác phẩm Đường cách mệnh (1927), cuốn sách chính trị đầu tiên của CMVN."),
        ("GT-58-TIEN-THAN", "Tr. 58", "fact", "Hội VN Cách mạng Thanh niên là tổ chức tiền thân của Đảng Cộng sản Việt Nam."),
        ("GT-59-GAP-2-5", "Tr. 59", "fact", "Số cuộc bãi công 1928–1929 tăng gấp 2,5 lần so với giai đoạn 1926–1927."),
        ("GT-59-BA-TO-CHUC", "Tr. 59", "fact", "3/1929: Chi bộ 5D Hàm Long; 17/6/1929: Đông Dương CS Đảng; 11/1929: An Nam CS Đảng."),
        ("GT-60-DDCSLD", "Tr. 60", "fact", "Tháng 9/1929: thành lập Đông Dương Cộng sản Liên đoàn."),
        ("GT-60-PHAN-TAN", "Tr. 60", "quote", "'không tránh khỏi phân tán về lực lượng và thiếu thống nhất về tổ chức'"),

        # Kỳ 2: 1930 & Cương lĩnh
        ("GT-61-TRIEU-TAP", "Tr. 61", "fact", "Hội nghị hợp nhất diễn ra từ 6/1 đến 7/2/1930 tại Cửu Long (Hồng Kông)."),
        ("GT-61-BAO-CAO", "Tr. 61", "quote", "'Chúng tôi họp vào ngày mồng 6/1... Họ đồng ý thống nhất vào một đảng'"),
        ("GT-61-NGAY-3-2", "Tr. 61", "fact", "Đại hội III (9/1960) quyết nghị lấy ngày 3/2 hằng năm làm ngày kỷ niệm thành lập Đảng."),
        ("GT-62-THANH-PHAN", "Tr. 62", "fact", "Đại biểu dự: Trịnh Đình Cửu, Nguyễn Đức Cảnh, Châu Văn Liêm, Nguyễn Thiệu; Nguyễn Ái Quốc chủ trì."),
        ("GT-62-NAM-DIEM", "Tr. 62", "quote", "5 điểm nhất trí: Bỏ thành kiến cũ; Định tên Đảng; Thảo Chính cương Điều lệ; Kế hoạch thống nhất; Cử Ban TW lâm thời."),
        ("GT-62-VAN-KIEN", "Tr. 62–63", "fact", "Thông qua Chánh cương vắn tắt, Sách lược vắn tắt, Chương trình và Điều lệ vắn tắt."),
        ("GT-63-24-2", "Tr. 63", "fact", "Ngày 24/2/1930: Đông Dương Cộng sản Liên đoàn chính thức gia nhập Đảng."),
        ("GT-64-LOI-KEU-GOI", "Tr. 64", "quote", "'Nhận chỉ thị của Quốc tế Cộng sản... tôi đã hoàn thành nhiệm vụ'"),
        ("GT-64-CUONG-LINH", "Tr. 64", "fact", "Chánh cương vắn tắt và Sách lược vắn tắt là Cương lĩnh chính trị đầu tiên."),
        ("GT-64-MUC-TIEU", "Tr. 64", "quote", "'chủ trương làm tư sản dân quyền c.m và thổ địa c.m để đi tới xã hội cộng sản'"),
        ("GT-65-NHIEM-VU", "Tr. 65", "quote", "'Đánh đổ đế quốc chủ nghĩa Pháp và bọn phong kiến, làm cho nước Nam được hoàn toàn độc lập'"),
        ("GT-65-XA-HOI-KINH-TE", "Tr. 65", "fact", "Quyền tự do tổ chức, nam nữ bình quyền, ngày làm 8 giờ, tịch thu ruộng đất chia cho dân cày nghèo."),
        ("GT-66-LUC-LUONG", "Tr. 66", "quote", "'công nông là nòng cốt; hết sức liên lạc với tiểu tư sản, trí thức... lôi kéo họ về phe vô sản'"),
        ("GT-66-PHUONG-PHAP", "Tr. 66–67", "quote", "'không khi nào nhượng một chút lợi ích gì của công nông mà đi vào đường thỏa hiệp'"),
        ("GT-67-DANH-DO", "Tr. 67", "quote", "'bộ phận nào đã ra mặt phản cách mạng (Đảng Lập hiến...) thì phải đánh đổ'"),
        ("GT-67-QUOC-TE", "Tr. 67", "quote", "'phải đồng tuyên truyền và thực hành liên lạc với bị áp bức dân tộc và vô sản thế giới'")
    ]

    t_src = doc.add_table(rows=len(sources_summary) + 1, cols=4)
    t_src.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_src)
    
    headers_src = ["Mã hệ thống", "Trang giáo trình", "Phân loại", "Tóm tắt sự kiện / Câu trích nguyên văn"]
    col_w_s = [Inches(1.5), Inches(1.1), Inches(0.9), Inches(3.0)]
    
    for i, h in enumerate(headers_src):
        cell = t_src.cell(0, i)
        cell.width = col_w_s[i]
        set_cell_background(cell, "B91C1C")
        set_cell_margins(cell, top=100, bottom=100, left=100, right=100)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(h)
        r.bold = True
        r.font.name = "Calibri"
        r.font.size = Pt(9.5)
        r.font.color.rgb = RGBColor(255, 255, 255)

    for row_idx, data in enumerate(sources_summary, start=1):
        bg = "F9FAFB" if row_idx % 2 == 1 else "FFFFFF"
        for col_idx, text in enumerate(data):
            cell = t_src.cell(row_idx, col_idx)
            cell.width = col_w_s[col_idx]
            set_cell_background(cell, bg)
            set_cell_margins(cell, top=60, bottom=60, left=80, right=80)
            p = cell.paragraphs[0]
            if col_idx in [0, 1, 2]:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r = p.add_run(text)
            r.font.name = "Calibri"
            r.font.size = Pt(8.5)
            r.font.color.rgb = RGBColor(31, 41, 55)
            if col_idx == 0:
                r.bold = True
                r.font.color.rgb = RGBColor(185, 28, 28)
            elif col_idx == 2 and text == "quote":
                r.bold = True
                r.font.color.rgb = RGBColor(3, 105, 161)

    # Lưu file
    output_dir = "docs"
    os.makedirs(output_dir, exist_ok=True)
    target_path = os.path.join(output_dir, "KICH-BAN-THUYET-TRINH-HANH-TRINH-DO.docx")
    doc.save(target_path)
    print(f"✅ Đã tạo thành công file Word tại: {target_path}")

    # Copy một bản ra thư mục gốc để người dùng dễ mở ngay
    root_target_path = "KICH-BAN-THUYET-TRINH-HANH-TRINH-DO.docx"
    shutil.copyfile(target_path, root_target_path)
    print(f"✅ Đã sao chép 1 bản tại thư mục gốc: {root_target_path}")

if __name__ == "__main__":
    build_presentation_docx()

