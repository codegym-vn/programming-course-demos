# Tạo dữ liệu mẫu cho Module 5 (pandas) - khoá "Python cho Excel và báo cáo tự động".
# Dữ liệu giả lập, không phải dữ liệu thật.
# Chạy: python tao_du_lieu_m5.py  -> doanh_so_q1.xlsx, san_pham.xlsx
import random
from openpyxl import Workbook
from openpyxl.styles import Font

random.seed(28052026)

NHAN_VIEN = {
    "Hà Nội": ["Nguyễn Văn An", "Trần Thị Bình"],
    "Đà Nẵng": ["Lê Văn Cường", "Phạm Thị Dung"],
    "TP.HCM": ["Hoàng Văn Em", "Vũ Thị Hoa"],
}
SAN_PHAM = [
    ("SP01", "Giấy A4 (thùng 5 ram)", "Văn phòng phẩm", 350000),
    ("SP02", "Mực in laser 85A", "Văn phòng phẩm", 1200000),
    ("SP03", "Bút bi (hộp 20 cây)", "Văn phòng phẩm", 60000),
    ("SP04", "Ghế xoay văn phòng", "Thiết bị", 1850000),
    ("SP05", "Máy tính cầm tay", "Thiết bị", 650000),
    ("SP06", "Bàn phím có dây", "Thiết bị", 220000),
]

dong = []
so = 1
for thang in (1, 2, 3):
    ngays = sorted(random.sample(range(2, 29), 12))
    for ngay in ngays:
        cn = random.choice(list(NHAN_VIEN))
        nv = random.choice(NHAN_VIEN[cn])
        ma, ten, nhom, gia = random.choice(SAN_PHAM)
        sl = random.randint(1, 12)
        dong.append([
            f"{ngay:02d}/{thang:02d}/2026", f"DH{so:03d}", cn, nv,
            ma, sl, gia, sl * gia,
        ])
        so += 1

wb = Workbook()
ws = wb.active
ws.title = "DonHang"
ws.append(["ngay", "ma_don", "chi_nhanh", "nhan_vien",
           "ma_sp", "so_luong", "don_gia", "thanh_tien"])
for d in dong:
    ws.append(d)
for c in ws[1]:
    c.font = Font(bold=True)
for col, w in zip("ABCDEFGH", (12, 9, 10, 16, 7, 9, 11, 12)):
    ws.column_dimensions[col].width = w
for r in ws.iter_rows(min_row=2, min_col=7, max_col=8):
    for c in r:
        c.number_format = "#,##0"
wb.save("doanh_so_q1.xlsx")

# Danh mục sản phẩm: CỐ Ý thiếu SP06 (mã mới chưa cập nhật danh mục)
wb2 = Workbook()
ws2 = wb2.active
ws2.title = "SanPham"
ws2.append(["ma_sp", "ten_sp", "nhom_hang"])
for ma, ten, nhom, gia in SAN_PHAM[:5]:
    ws2.append([ma, ten, nhom])
for c in ws2[1]:
    c.font = Font(bold=True)
ws2.column_dimensions["B"].width = 24
ws2.column_dimensions["C"].width = 16
wb2.save("san_pham.xlsx")
print(len(dong), "đơn hàng")
