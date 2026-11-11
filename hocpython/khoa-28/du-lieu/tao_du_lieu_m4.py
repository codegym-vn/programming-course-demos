# Tạo dữ liệu mẫu Module 4 (khoá 28): bang_luong.xlsx, doanh_so_chi_nhanh.xlsx
# Dữ liệu giả lập, không phải dữ liệu thật.
import random
from datetime import date
from openpyxl import Workbook
from openpyxl.styles import Font

TIEN = "#,##0"
NGAY = "dd/mm/yyyy"


def dinh_dang(ws, cot_tien, cot_ngay, do_rong):
    for o in ws[1]:
        o.font = Font(bold=True)
    for hang in ws.iter_rows(min_row=2):
        for o in hang:
            if o.column_letter in cot_tien:
                o.number_format = TIEN
            if o.column_letter in cot_ngay:
                o.number_format = NGAY
    for cot, w in do_rong.items():
        ws.column_dimensions[cot].width = w


# ---------- bang_luong.xlsx ----------
NHAN_VIEN = [
    ("NV01", "Nguyễn Văn An", "Kinh doanh", 15000000, 2000000, date(2020, 3, 3)),
    ("NV02", "Trần Thị Bình", "Kế toán", 13500000, 1500000, date(2019, 7, 15)),
    ("NV03", "Lê Hoàng Cường", "Kinh doanh", 12000000, 2000000, date(2022, 10, 1)),
    ("NV04", "Phạm Thị Dung", "Nhân sự", 11000000, 1000000, date(2021, 5, 20)),
    ("NV05", "Hoàng Văn Em", "Kỹ thuật", 18000000, 2500000, date(2018, 1, 10)),
    ("NV06", "Vũ Thị Hoa", "Kế toán", 10500000, 1000000, date(2023, 11, 2)),
    ("NV07", "Đặng Minh Khoa", "Kỹ thuật", 16500000, 2500000, date(2020, 8, 14)),
    ("NV08", "Bùi Thu Lan", "Kinh doanh", 9800000, 1500000, date(2024, 6, 5)),
]
TIEU_DE_LUONG = ["Mã NV", "Họ tên", "Phòng ban", "Lương cơ bản",
                 "Phụ cấp", "Ngày vào làm"]

wb = Workbook()
ws10 = wb.active
ws10.title = "Tháng 10"
ws10.append(TIEU_DE_LUONG)
for nv in NHAN_VIEN:
    ws10.append(list(nv))

ws11 = wb.create_sheet("Tháng 11")
ws11.append(TIEU_DE_LUONG)
for nv in NHAN_VIEN:
    hang = list(nv)
    if hang[0] == "NV08":
        hang[3] = 10500000  # tăng lương từ tháng 11
    ws11.append(hang)
# nhân viên mới, chưa có phụ cấp (ô trống)
ws11.append(["NV09", "Ngô Thanh Mai", "Nhân sự", 9500000, None,
             date(2026, 11, 2)])

rong_luong = {"A": 8, "B": 20, "C": 13, "D": 15, "E": 12, "F": 15}
for ws in (ws10, ws11):
    dinh_dang(ws, "DE", "F", rong_luong)
wb.save("bang_luong.xlsx")

# ---------- doanh_so_chi_nhanh.xlsx ----------
random.seed(28)
NV_CN = [
    ("Hà Nội", "Nguyễn Văn An"), ("Hà Nội", "Lê Hoàng Cường"),
    ("Hà Nội", "Phan Thị Giang"),
    ("Đà Nẵng", "Trần Quốc Duy"), ("Đà Nẵng", "Võ Thị Hằng"),
    ("TP.HCM", "Bùi Thu Lan"), ("TP.HCM", "Đỗ Văn Hải"),
    ("TP.HCM", "Lý Thị Kim"),
    ("Cần Thơ", "Châu Minh Tâm"), ("Cần Thơ", "Huỳnh Thị Yến"),
]
dong = []
for i in range(24):
    cn, nv = NV_CN[i % len(NV_CN)]
    ngay = date(2026, 10, 1 + (i * 30) // 24)
    so_tien = random.randint(8, 60) * 1000000 + random.choice(
        [0, 250000, 500000, 750000])
    dong.append((ngay, cn, nv, so_tien))

wb = Workbook()
ws = wb.active
ws.title = "Tháng 10"
ws.append(["Ngày", "Chi nhánh", "Nhân viên", "Doanh số"])
for k, d in enumerate(dong):
    if k == 12:
        ws.append([])  # một dòng trống do người nhập để lại
    ws.append(list(d))
dinh_dang(ws, "D", "A", {"A": 12, "B": 12, "C": 18, "D": 14})

ws2 = wb.create_sheet("Chỉ tiêu")
ws2.append(["Chi nhánh", "Chỉ tiêu"])
for cn, ct in [("Hà Nội", 250000000), ("Đà Nẵng", 200000000),
               ("TP.HCM", 220000000), ("Cần Thơ", 120000000)]:
    ws2.append([cn, ct])
dinh_dang(ws2, "B", "", {"A": 12, "B": 14})
wb.save("doanh_so_chi_nhanh.xlsx")
print("Đã tạo bang_luong.xlsx và doanh_so_chi_nhanh.xlsx")
