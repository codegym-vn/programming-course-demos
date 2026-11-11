# Tạo dữ liệu mẫu cho Module 6 (khoá "Python cho Excel và báo cáo tự động")
# Dữ liệu giả định, không phải số liệu thật.
from datetime import datetime
from openpyxl import Workbook
from openpyxl.styles import Font

# 1) Doanh thu 6 tháng của 3 chi nhánh
wb = Workbook()
ws = wb.active
ws.title = "Doanh thu"
ws.append(["Tháng", "Hà Nội", "Đà Nẵng", "TP.HCM"])
du_lieu = [
    ["05/2026", 412500000, 198000000, 530200000],
    ["06/2026", 389700000, 215400000, 498600000],
    ["07/2026", 455300000, 230100000, 561900000],
    ["08/2026", 470800000, 187600000, 602300000],
    ["09/2026", 431200000, 241800000, 585400000],
    ["10/2026", 498600000, 256300000, 640100000],
]
for dong in du_lieu:
    ws.append(dong)
for o in ws[1]:
    o.font = Font(bold=True)
for dong in ws.iter_rows(min_row=2, min_col=2, max_col=4):
    for o in dong:
        o.number_format = "#,##0"
ws.column_dimensions["A"].width = 10
for c in "BCD":
    ws.column_dimensions[c].width = 15
wb.save("doanh_thu_6_thang.xlsx")

# 2) Đơn hàng một tuần (02/11/2026 - 06/11/2026), xuất từ phần mềm bán hàng
don = [
    ("02/11/2026", "DH4501", "Hà Nội", "Nguyễn Văn An", 12500000),
    ("02/11/2026", "DH4502", "TP.HCM", "Lê Thị Cúc", 18400000),
    ("02/11/2026", "DH4503", "Đà Nẵng", "Phạm Minh Đức", 6200000),
    ("03/11/2026", "DH4504", "Hà Nội", "Trần Thị Bình", 9800000),
    ("03/11/2026", "DH4505", "TP.HCM", "Võ Thanh Hải", 21300000),
    ("03/11/2026", "DH4506", "TP.HCM", "Lê Thị Cúc", 7600000),
    ("04/11/2026", "DH4507", "Đà Nẵng", "Hoàng Thu Giang", 11900000),
    ("04/11/2026", "DH4508", "Hà Nội", "Nguyễn Văn An", 15200000),
    ("04/11/2026", "DH4509", "TP.HCM", "Võ Thanh Hải", 13700000),
    ("05/11/2026", "DH4510", "Hà Nội", "Trần Thị Bình", 8400000),
    ("05/11/2026", "DH4511", "Đà Nẵng", "Phạm Minh Đức", 9300000),
    ("05/11/2026", "DH4512", "TP.HCM", "Lê Thị Cúc", 16800000),
    ("05/11/2026", "DH4513", "Hà Nội", "Nguyễn Văn An", 5600000),
    ("06/11/2026", "DH4514", "TP.HCM", "Võ Thanh Hải", 19500000),
    ("06/11/2026", "DH4515", "Đà Nẵng", "Hoàng Thu Giang", 7400000),
    ("06/11/2026", "DH4516", "Hà Nội", "Trần Thị Bình", 13100000),
    ("06/11/2026", "DH4517", "TP.HCM", "Lê Thị Cúc", 10200000),
    ("06/11/2026", "DH4518", "Đà Nẵng", "Phạm Minh Đức", 8700000),
]
wb = Workbook()
ws = wb.active
ws.title = "Đơn hàng"
ws.append(["Ngày", "Mã đơn", "Chi nhánh", "Nhân viên", "Số tiền"])
for ngay, ma, cn, nv, tien in don:
    ws.append([datetime.strptime(ngay, "%d/%m/%Y"), ma, cn, nv, tien])
for o in ws[1]:
    o.font = Font(bold=True)
for (o_ngay,) in ws.iter_rows(min_row=2, max_col=1):
    o_ngay.number_format = "dd/mm/yyyy"
for (o_tien,) in ws.iter_rows(min_row=2, min_col=5, max_col=5):
    o_tien.number_format = "#,##0"
for c, w in zip("ABCDE", [12, 10, 12, 18, 14]):
    ws.column_dimensions[c].width = w
wb.save("ban_hang_tuan.xlsx")
print("Đã tạo doanh_thu_6_thang.xlsx và ban_hang_tuan.xlsx")
