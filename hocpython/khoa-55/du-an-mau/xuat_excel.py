"""Xuất sổ Excel 4 Sheet với format tiền VNĐ, màu cảnh báo và HYPERLINK."""
from datetime import datetime
from pathlib import Path
from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter

MAU_BANG = {
    "LECH": ("DO", "FEE2E2", "991B1B"),
    "HET_HAN": ("DO", "FEE2E2", "991B1B"),
    "SAP_HET_HAN": ("DO", "FEE2E2", "991B1B"),
    "CO_RUI_RO": ("DO", "FEE2E2", "991B1B"),
    "CAN_SCAN_OCR": ("VANG", "FEF3C7", "92400E"),
    "LOI_DOC_FILE": ("VANG", "FEF3C7", "92400E"),
    "XEM_XET": ("VANG", "FEF3C7", "92400E"),
    "KHOP": ("XANH", "DCFCE7", "166534"),
    "DAT": ("XANH", "DCFCE7", "166534"),
    "AN_TOAN": ("XANH", "DCFCE7", "166534"),
    "HOP_LE": ("XANH", "DCFCE7", "166534"),
}


def chon_mau_trang_thai(trang_thai):
    """Ánh xạ trạng thái sang (nhãn_mức, fill_hex, text_hex)."""
    return MAU_BANG.get(trang_thai, ("MAC_DINH", "FFFFFF", "1E293B"))


def tao_hyperlink(duong_dan_pdf, nhan="Mở PDF"):
    """Sinh công thức Excel =HYPERLINK chuẩn dấu ngoặc kép."""
    sach = str(duong_dan_pdf).replace("\\", "/")
    return f'=HYPERLINK("{sach}", "{nhan}")'


def gop_khong_trung(ds_ban_ghi):
    """Loại bỏ bản ghi trùng theo khoá ten_file, giữ bản ghi sau cùng."""
    kho = {}
    for bg in ds_ban_ghi:
        kho[bg["ten_file"]] = bg
    return list(kho.values())


def trang_tri_sheet(ws, cot_tien=None):
    """Tô tiêu đề xanh navy, đóng băng A2, bo viền và co giãn độ rộng cột."""
    cot_tien = set(cot_tien or [])
    ws.freeze_panes = "A2"
    fill_head = PatternFill("solid", fgColor="1E3A8A")
    font_head = Font(bold=True, color="FFFFFF")
    vien_mong = Side(style="thin", color="CBD5E1")
    border = Border(left=vien_mong, right=vien_mong, top=vien_mong, bottom=vien_mong)

    for cell in ws[1]:
        cell.fill = fill_head
        cell.font = font_head
        cell.alignment = Alignment(horizontal="center", vertical="center")
        cell.border = border

    for r in range(2, ws.max_row + 1):
        for c in range(1, ws.max_column + 1):
            cell = ws.cell(r, c)
            cell.border = border
            if c in cot_tien and isinstance(cell.value, (int, float)):
                cell.number_format = '#,##0 "đ"'

    for col_idx in range(1, ws.max_column + 1):
        max_len = 0
        for row_idx in range(1, ws.max_row + 1):
            val = ws.cell(row_idx, col_idx).value
            if val is not None:
                s = str(val)
                if s.startswith("=HYPERLINK"):
                    s = "Mở PDF gốc"
                elif s.startswith("=SUM"):
                    s = "999.999.999 đ"
                max_len = max(max_len, len(s))
        rong = max(12, min(45, max_len + 4))
        ws.column_dimensions[get_column_letter(col_idx)].width = rong


def to_mau_cot_trang_thai(ws, cot_idx):
    """Tô màu nền chữ Đỏ/Vàng/Xanh cho cột trạng thái từ dòng 2 trở đi."""
    for r in range(2, ws.max_row + 1):
        cell = ws.cell(r, cot_idx)
        val = str(cell.value or "")
        if val in MAU_BANG:
            _, bg_hex, fg_hex = chon_mau_trang_thai(val)
            cell.fill = PatternFill("solid", fgColor=bg_hex)
            cell.font = Font(bold=True, color=fg_hex)


def xuat_bao_cao_excel(duong_dan_ra, log_lo, hoa_dons, ung_viens, hop_dongs):
    """Ghi sổ Excel 4 Sheet hoàn chỉnh và trả về đường dẫn tệp đã lưu."""
    wb = Workbook()

    # Sheet 1: Tong_Hop_Loi
    ws1 = wb.active
    ws1.title = "Tong_Hop_Loi"
    ws1.append(["Tệp PDF", "Số trang", "Trạng thái đọc", "Loại tài liệu", "Ghi chú", "Liên kết"])
    for item in gop_khong_trung(log_lo):
        ws1.append([
            item["ten_file"],
            item["so_trang"],
            item["trang_thai_doc"],
            item["loai_tai_lieu"],
            item["ghi_chu"],
            tao_hyperlink(f"../du-lieu/{item['ten_file']}", "Mở PDF"),
        ])
    to_mau_cot_trang_thai(ws1, 3)
    trang_tri_sheet(ws1)

    # Sheet 2: Hoa_Don
    ws2 = wb.create_sheet("Hoa_Don")
    ws2.append(["Tệp PDF", "Số HĐ", "MST", "Ngày lập", "Số mặt hàng", "Tổng dòng hàng", "Khai báo + VAT", "Chênh lệch", "Trạng thái", "Ghi chú", "Liên kết"])
    ds_hd = gop_khong_trung(hoa_dons)
    for hd in ds_hd:
        ws2.append([
            hd["ten_file"],
            hd["so_hoa_don"],
            hd["ma_so_thue"],
            hd["ngay_lap"],
            hd["so_mat_hang"],
            hd["tong_dong_hang"],
            hd["tong_thanh_toan"],
            hd["chenh_lech"],
            hd["trang_thai"],
            hd["ghi_chu"],
            tao_hyperlink(f"../du-lieu/{hd['ten_file']}", "Mở PDF"),
        ])
    if ds_hd:
        n_end = 1 + len(ds_hd)
        ws2.append(["TỔNG CỘNG", "", "", "", "", f"=SUM(F2:F{n_end})", f"=SUM(G2:G{n_end})", f"=SUM(H2:H{n_end})", "", "", ""])
        for c in range(1, 12):
            ws2.cell(n_end + 1, c).font = Font(bold=True)
    to_mau_cot_trang_thai(ws2, 9)
    trang_tri_sheet(ws2, cot_tien={6, 7, 8})

    # Sheet 3: Ung_Vien_CV
    ws3 = wb.create_sheet("Ung_Vien_CV")
    ws3.append(["Tệp PDF", "Họ tên", "Vị trí", "Kinh nghiệm (năm)", "Kỹ năng", "Mức lương mong muốn", "Điểm khớp (%)", "Trạng thái", "Liên kết"])
    for cv in gop_khong_trung(ung_viens):
        ws3.append([
            cv["ten_file"],
            cv["ho_ten"],
            cv["vi_tri"],
            cv["so_nam"],
            cv["ky_nang_chuoi"],
            cv["muc_luong_vnd"],
            cv["diem_khop"],
            cv["trang_thai"],
            tao_hyperlink(f"../du-lieu/{cv['ten_file']}", "Mở PDF"),
        ])
    to_mau_cot_trang_thai(ws3, 8)
    trang_tri_sheet(ws3, cot_tien={6})

    # Sheet 4: Hop_Dong
    ws4 = wb.create_sheet("Hop_Dong")
    ws4.append(["Tệp PDF", "Số Hợp đồng", "Đối tác (Bên B)", "Giá trị HĐ", "Ngày ký", "Ngày hết hạn", "Còn lại (ngày)", "Điều khoản rủi ro", "Trạng thái", "Liên kết"])
    ds_hop_dong = gop_khong_trung(hop_dongs)
    for h in ds_hop_dong:
        ws4.append([
            h["ten_file"],
            h["so_hop_dong"],
            h["ben_b"],
            h["gia_tri_vnd"],
            h["ngay_ky"],
            h["ngay_het_han"],
            h["so_ngay_con_lai"],
            h["rui_ro_chuoi"],
            h["trang_thai"],
            tao_hyperlink(f"../du-lieu/{h['ten_file']}", "Mở PDF"),
        ])
    if ds_hop_dong:
        n4 = 1 + len(ds_hop_dong)
        ws4.append(["TỔNG GIÁ TRỊ", "", "", f"=SUM(D2:D{n4})", "", "", "", "", "", ""])
        for c in range(1, 11):
            ws4.cell(n4 + 1, c).font = Font(bold=True)
    to_mau_cot_trang_thai(ws4, 9)
    trang_tri_sheet(ws4, cot_tien={4})

    out = Path(duong_dan_ra)
    try:
        wb.save(out)
        return out
    except PermissionError:
        ts = datetime.now().strftime("%Y%m%d_%H%M%S")
        du_phong = out.with_name(f"{out.stem}_{ts}{out.suffix}")
        wb.save(du_phong)
        return du_phong
