"""Sinh bộ dữ liệu bán hàng mẫu (số liệu minh hoạ) cho khoá 54: Streamlit Dashboard."""

from pathlib import Path
import random
import pandas as pd

OUT_DIR = Path(__file__).resolve().parent


def build_datasets() -> None:
    random.seed(20261117)

    chi_nhanh_raw = [
        "Hà Nội", "ha noi", " Hà Nội ", "HÀ NỘI",
        "TP.HCM", "HCM", "tp.hcm", " TP.HCM ",
        "Đà Nẵng", "da nang", "Đà nẵng",
    ]
    nhan_vien_theo_cn = {
        "hanoi": ["Nguyễn Văn An", "Trần Thị Bình"],
        "hcm": ["Lê Minh Cường", "Phạm Thu Dung"],
        "danang": ["Hoàng Quốc Bảo", "Vũ Thị Hoa"],
    }
    san_pham_list = [
        ("Thiết bị văn phòng", 1_850_000),
        ("Thiết bị văn phòng", 3_200_000),
        ("Văn phòng phẩm", 240_000),
        ("Văn phòng phẩm", 450_000),
        ("Phụ kiện máy tính", 690_000),
        ("Phụ kiện máy tính", 1_250_000),
        ("Phần mềm", 2_400_000),
    ]
    khach_hang_list = [
        "Công ty Minh Phát", "Công ty An Khang", "Công ty Hải Đăng",
        "Cửa hàng Thành Đạt", "Công ty Sao Mai", "Công ty Phương Nam",
        "Văn phòng Việt Tiến", "Công ty Hoàng Gia", "Cửa hàng Bảo Ngọc",
        "Công ty Tân Tiến", "Công ty Đại Dương", "Công ty Gia Hưng",
        "Công ty Trường Thịnh", "Cửa hàng Phúc Lộc", "Công ty Kim Ngân",
    ]

    def norm_cn(s: str) -> str:
        t = s.strip().lower()
        if "ha" in t or "hà" in t:
            return "hanoi"
        if "hcm" in t:
            return "hcm"
        return "danang"

    rows = []
    for idx in range(1, 181):
        ma_don = f"DH{idx:04d}"
        thang = random.randint(1, 6)
        ngay = random.randint(1, 28)
        if idx % 5 == 0:
            ngay_str = f"2026-{thang:02d}-{ngay:02d}"
        else:
            ngay_str = f"{ngay:02d}/{thang:02d}/2026"

        cn_dirty = random.choice(chi_nhanh_raw)
        nv = random.choice(nhan_vien_theo_cn[norm_cn(cn_dirty)])
        kh = random.choice(khach_hang_list)
        nhom, don_gia = random.choice(san_pham_list)
        so_luong = random.randint(1, 12)
        trang_thai = "Đã huỷ" if idx % 13 == 0 else "Hoàn thành"

        # Co y tao 4 dong thieu so luong hoac so luong am de day lam sach o Module 2
        if idx in (27, 63, 118):
            so_luong_val = None
            thanh_tien = None
        elif idx == 94:
            so_luong_val = -2
            thanh_tien = -2 * don_gia
        else:
            so_luong_val = so_luong
            thanh_tien = so_luong * don_gia

        rows.append({
            "ma_don": ma_don,
            "ngay_dat": ngay_str,
            "chi_nhanh": cn_dirty,
            "nhan_vien": nv,
            "khach_hang": kh,
            "nhom_hang": nhom,
            "so_luong": so_luong_val,
            "don_gia": don_gia,
            "thanh_tien": thanh_tien,
            "trang_thai": trang_thai,
        })

    # Co y nhan ban 4 dong trung ma don
    for dup_i in (10, 45, 88, 132):
        rows.append(dict(rows[dup_i]))

    df_mau = pd.DataFrame(rows)
    out_mau = OUT_DIR / "don_hang_mau.xlsx"
    df_mau.to_excel(out_mau, index=False, sheet_name="DonHang")

    # Bo du lieu thang 07/2026 cho Module 5
    rows_moi = []
    for idx in range(181, 221):
        ma_don = f"DH{idx:04d}"
        ngay = random.randint(1, 28)
        ngay_str = f"{ngay:02d}/07/2026"
        cn_dirty = random.choice(["Hà Nội", "TP.HCM", "Đà Nẵng", "ha noi", "HCM"])
        nv = random.choice(nhan_vien_theo_cn[norm_cn(cn_dirty)])
        kh = random.choice(khach_hang_list)
        nhom, don_gia = random.choice(san_pham_list)
        so_luong = random.randint(1, 10)
        trang_thai = "Đã huỷ" if idx % 11 == 0 else "Hoàn thành"
        rows_moi.append({
            "ma_don": ma_don,
            "ngay_dat": ngay_str,
            "chi_nhanh": cn_dirty,
            "nhan_vien": nv,
            "khach_hang": kh,
            "nhom_hang": nhom,
            "so_luong": so_luong,
            "don_gia": don_gia,
            "thanh_tien": so_luong * don_gia,
            "trang_thai": trang_thai,
        })

    df_moi = pd.DataFrame(rows_moi)
    out_moi = OUT_DIR / "don_hang_thang_moi.xlsx"
    df_moi.to_excel(out_moi, index=False, sheet_name="DonHang")

    # In thong ke kiem chung
    df_read = pd.read_excel(out_mau, sheet_name="DonHang")
    print("don_hang_mau.xlsx shape:", df_read.shape)
    print("columns:", list(df_read.columns))
    print("raw sum thanh_tien:", int(df_read["thanh_tien"].fillna(0).sum()))
    hoan_thanh = df_read[df_read["trang_thai"] == "Hoàn thành"]
    print("hoan_thanh count:", len(hoan_thanh), "sum:", int(hoan_thanh["thanh_tien"].fillna(0).sum()))
    print("head(3):\n", df_read.head(3).to_string())


if __name__ == "__main__":
    build_datasets()
