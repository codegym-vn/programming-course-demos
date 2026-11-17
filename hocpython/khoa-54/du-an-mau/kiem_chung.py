import ast
import datetime
import io
from pathlib import Path

import openpyxl
import pandas as pd

import xu_ly

BASE = Path(__file__).parent
MAU = BASE.parent / "du-lieu" / "don_hang_mau.xlsx"
MOI = BASE.parent / "du-lieu" / "don_hang_thang_moi.xlsx"

# 1. Kiem tra cu phap app.py
ast.parse((BASE / "app.py").read_text(encoding="utf-8"), filename="app.py")

# 2. Kiem tra don_hang_mau.xlsx
df_raw_mau = pd.read_excel(MAU, sheet_name="DonHang")
assert xu_ly.tim_cot_thieu(df_raw_mau.columns) == []
assert xu_ly.tim_cot_thieu(["ma_don", "chi_nhanh"]) == [
    "ngay_dat",
    "so_luong",
    "thanh_tien",
    "trang_thai",
]

df_sach, log = xu_ly.lam_sach_don_hang(df_raw_mau)
assert log == {
    "tong_tho": 184,
    "trung_ma": 4,
    "loi_du_lieu": 4,
    "da_huy": 13,
    "hop_le": 163,
}, log

kpi = xu_ly.tinh_4_kpi(df_sach)
assert kpi == {
    "doanh_thu": 1_426_350_000,
    "so_don": 163,
    "aov": 8_750_613,
    "khach_hang": 15,
}, kpi

# Sap xep chi nhanh tieng Viet
cn_sorted = sorted(df_sach["chi_nhanh"].unique(), key=xu_ly.khoa_vn)
assert cn_sorted == ["Đà Nẵng", "Hà Nội", "TP.HCM"], cn_sorted

# Loc rieng Ha Noi & loc rong
df_hn = xu_ly.loc_don_hang(
    df_sach,
    datetime.date(2026, 1, 1),
    datetime.date(2026, 6, 30),
    ["Hà Nội"],
)
assert xu_ly.tinh_4_kpi(df_hn)["doanh_thu"] == 539_420_000
df_empty = xu_ly.loc_don_hang(
    df_sach,
    datetime.date(2026, 1, 1),
    datetime.date(2026, 6, 30),
    [],
)
assert xu_ly.tinh_4_kpi(df_empty) == {
    "doanh_thu": 0,
    "so_don": 0,
    "aov": 0,
    "khach_hang": 0,
}

# Tang truong
assert xu_ly.tinh_tang_truong(0, 169_500_000) is None
assert xu_ly.tinh_tang_truong(200_000_000, 250_000_000) == "+25.0%"
assert xu_ly.tinh_tang_truong(1_000_000, 999_990) == "0.0%"

# Theo thang & Top NV
df_thang = xu_ly.tong_hop_theo_thang(df_sach)
assert df_thang["thang"].tolist() == [
    "2026-01",
    "2026-02",
    "2026-03",
    "2026-04",
    "2026-05",
    "2026-06",
], df_thang
assert dict(zip(df_thang["thang"], df_thang["doanh_thu"]))["2026-05"] == 310_290_000

df_nv = xu_ly.top_nhan_vien(df_sach, top_k=3)
assert df_nv.iloc[0]["nhan_vien"] == "Nguyễn Văn An"
assert int(df_nv.iloc[0]["doanh_thu"]) == 305_800_000

# RFM
df_rfm, df_tk = xu_ly.tinh_rfm_va_phan_nhom(
    df_sach, ngay_chot=pd.Timestamp("2026-07-01")
)
tk_map = dict(zip(df_tk["nhom"], df_tk["so_khach"]))
assert tk_map == {
    "VIP": 6,
    "Thân thiết": 5,
    "Cần chăm lại": 2,
    "Khách mới": 2,
}, tk_map

# Xuat Excel BytesIO & doc nguoc bang openpyxl
xlsx_bytes = xu_ly.xuat_excel_bytes(pd.DataFrame([kpi]), df_sach, df_rfm)
assert len(xlsx_bytes) > 1000
wb = openpyxl.load_workbook(io.BytesIO(xlsx_bytes))
assert wb.sheetnames == ["TongQuan", "DonSach", "KhachHang_RFM"], wb.sheetnames
assert wb["DonSach"].max_row == 164  # 1 header + 163 data rows
assert wb["KhachHang_RFM"].max_row == 16  # 1 header + 15 customers

# 3. Kiem tra don_hang_thang_moi.xlsx
df_raw_moi = pd.read_excel(MOI, sheet_name="DonHang")
df_sach_moi, log_moi = xu_ly.lam_sach_don_hang(df_raw_moi)
assert log_moi == {
    "tong_tho": 40,
    "trung_ma": 0,
    "loi_du_lieu": 0,
    "da_huy": 4,
    "hop_le": 36,
}, log_moi
assert xu_ly.tinh_4_kpi(df_sach_moi) == {
    "doanh_thu": 299_760_000,
    "so_don": 36,
    "aov": 8_326_667,
    "khach_hang": 13,
}

print("ALL KHOA-54 DU-AN-MAU CHECKS PASSED!")
