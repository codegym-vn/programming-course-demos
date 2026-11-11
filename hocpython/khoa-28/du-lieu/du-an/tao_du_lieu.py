# Tạo bộ dữ liệu mẫu cho dự án Module 7 (khoá 28).
# Dữ liệu hoàn toàn giả lập. Chạy: python tao_du_lieu.py
import random
import zipfile
from datetime import datetime
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Font

GOC = Path(__file__).parent
THU_MUC_CN = GOC / "chi_nhanh"

DANH_MUC = [
    ("GS01", "Giấy in A4 70gsm (ram)", "Giấy và sổ", 82000),
    ("GS02", "Giấy in A3 70gsm (ram)", "Giấy và sổ", 165000),
    ("GS03", "Sổ bìa da A5", "Giấy và sổ", 115000),
    ("BM01", "Bút bi xanh (hộp 20 cây)", "Bút và mực", 68000),
    ("BM02", "Bút dạ quang (hộp 10 cây)", "Bút và mực", 92000),
    ("BM03", "Hộp mực máy in laser", "Bút và mực", 1250000),
    ("TB01", "Máy tính cầm tay", "Thiết bị văn phòng", 640000),
    ("TB02", "Máy huỷ giấy mini", "Thiết bị văn phòng", 2450000),
    ("TB03", "Máy đóng gáy lò xo", "Thiết bị văn phòng", 3800000),
    ("DD01", "Kẹp giấy (hộp 100 cái)", "Đồ dùng bàn làm việc", 24000),
    ("DD02", "Bấm kim số 10", "Đồ dùng bàn làm việc", 45000),
    ("DD03", "Khay hồ sơ 3 tầng", "Đồ dùng bàn làm việc", 155000),
]
GIA = {m: g for m, _, _, g in DANH_MUC}
SL_MAX = {"GS": 40, "BM": 25, "TB": 3, "DD": 30}

CHI_NHANH = {
    "ha_noi": ("HN", 1001, 32,
               ["Nguyễn Văn An", "Trần Thị Bình", "Lê Minh Châu"]),
    "da_nang": ("DN", 2001, 26,
                ["Phạm Quốc Dũng", "Hoàng Thị Em"]),
    "tp_hcm": ("HCM", 3001, 34,
               ["Võ Thanh Giang", "Đặng Ngọc Hà", "Bùi Văn Khoa"]),
}
TIEU_DE = ["Ngày", "Mã đơn", "Nhân viên", "Mã SP", "Số lượng",
           "Đơn giá", "Trạng thái"]


def tao_dong(rng, tien_to, so, nhan_vien):
    ngay = datetime(2026, 10, rng.randint(1, 31))
    ma = rng.choice(list(GIA))
    sl = rng.randint(1, SL_MAX[ma[:2]])
    gia = GIA[ma]
    if rng.random() < 0.2:
        gia = round(gia * 0.95 / 1000) * 1000  # giảm 5%, hợp lệ
    nv = rng.choice(nhan_vien)
    return [ngay, f"{tien_to}-{so}", nv, ma, sl, gia, "Hoàn thành"]


def tao_chi_nhanh(rng, ten):
    tien_to, bat_dau, n, nhan_vien = CHI_NHANH[ten]
    dong = [tao_dong(rng, tien_to, bat_dau + i, nhan_vien)
            for i in range(n)]
    dong.sort(key=lambda d: (d[0], d[1]))
    # đánh lại mã đơn theo thứ tự ngày
    for i, d in enumerate(dong):
        d[1] = f"{tien_to}-{bat_dau + i}"
    return dong


def lam_ban(ten, dong):
    """Cài các dòng bẩn có chủ đích (không chồng nhau)."""
    if ten == "ha_noi":
        dong[4][6] = "Đã huỷ"
        dong[19][6] = "Đã huỷ"
        dong[8][3] = "GS09"            # mã không có trong danh mục
        dong[13][3] = " bm02"          # sai hoa thường + dấu cách
        dong[13][5] = GIA["BM02"]
        dong[22][3] = "TB02"           # giảm giá bất thường
        dong[22][4] = 1
        dong[22][5] = 1950000
        dong.insert(16, list(dong[11]))  # dòng trùng mã đơn
    elif ten == "da_nang":
        dong[6][6] = "Đã huỷ"
        dong[10][6] = " hoàn thành"
        dong[15][3] = "BM03"           # giảm giá bất thường
        dong[15][4] = 2
        dong[15][5] = 1050000
        for d in dong:                 # nhân viên gõ ngày dạng chữ
            d[0] = d[0].strftime("%d/%m/%Y")
        dong[20][0] = "31/09/2026"     # ngày không tồn tại
    elif ten == "tp_hcm":
        dong[3][6] = "Đã huỷ"
        dong[27][6] = "Đã huỷ"
        dong[12][3] = "TB09"           # mã không có trong danh mục
        dong[17][0] = "10/15/2026"     # ngày kiểu Mỹ, sai
        dong[24][3] = "TB03"           # giảm giá bất thường
        dong[24][4] = 1
        dong[24][5] = 3200000
    return dong


def ghi_xlsx(duong_dan, tieu_de, dong, ten_sheet, dinh_dang_ngay):
    wb = Workbook()
    ws = wb.active
    ws.title = ten_sheet
    ws.append(tieu_de)
    for o in ws[1]:
        o.font = Font(bold=True)
    for d in dong:
        ws.append(d)
    for r in range(2, ws.max_row + 1):
        if dinh_dang_ngay and isinstance(ws.cell(r, 1).value, datetime):
            ws.cell(r, 1).number_format = "dd/mm/yyyy"
    for cot, rong in zip("ABCDEFG", [12, 11, 18, 9, 9, 11, 13]):
        ws.column_dimensions[cot].width = rong
    wb.save(duong_dan)


def main():
    rng = random.Random(2026)
    THU_MUC_CN.mkdir(exist_ok=True)
    for ten in CHI_NHANH:
        dong = lam_ban(ten, tao_chi_nhanh(rng, ten))
        ghi_xlsx(THU_MUC_CN / f"{ten}.xlsx", TIEU_DE, dong,
                 "Doanh số", True)
    ghi_xlsx(GOC / "danh_muc_san_pham.xlsx",
             ["Mã SP", "Tên sản phẩm", "Nhóm hàng", "Giá niêm yết"],
             [list(x) for x in DANH_MUC], "Danh mục", False)
    # gói zip cho học viên: du_an_bao_cao/du_lieu/...
    with zipfile.ZipFile(GOC / "du_an_mau.zip", "w",
                         zipfile.ZIP_DEFLATED) as z:
        for ten in CHI_NHANH:
            z.write(THU_MUC_CN / f"{ten}.xlsx",
                    f"du_an_bao_cao/du_lieu/chi_nhanh/{ten}.xlsx")
        z.write(GOC / "danh_muc_san_pham.xlsx",
                "du_an_bao_cao/du_lieu/danh_muc_san_pham.xlsx")
    print("Đã tạo dữ liệu trong", GOC)


main()
