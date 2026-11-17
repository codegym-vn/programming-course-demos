from __future__ import annotations

import io
import unicodedata
from datetime import timedelta

import pandas as pd

COT_BAT_BUOC = [
    "ma_don",
    "ngay_dat",
    "chi_nhanh",
    "so_luong",
    "thanh_tien",
    "trang_thai",
]

BAN_DO_CHI_NHANH = {
    "ha noi": "Hà Nội",
    "hà nội": "Hà Nội",
    "hn": "Hà Nội",
    "da nang": "Đà Nẵng",
    "đà nẵng": "Đà Nẵng",
    "dn": "Đà Nẵng",
    "tp hcm": "TP.HCM",
    "hcm": "TP.HCM",
    "tphcm": "TP.HCM",
    "ho chi minh": "TP.HCM",
    "hồ chí minh": "TP.HCM",
}

THU_TU_NHOM_RFM = ("VIP", "Thân thiết", "Cần chăm lại", "Khách mới")


def dinh_dang_vnd(so: int | float) -> str:
    """Định dạng số tiền VNĐ dùng dấu chấm phân cách hàng nghìn."""
    return f"{round(so):,}".replace(",", ".") + " đ"


def khoa_vn(chuoi: str) -> tuple[str, str]:
    """Khoá sắp xếp theo bảng chữ cái tiếng Việt chuẩn (đ trước e)."""
    s = str(chuoi).strip().lower().replace("đ", "d")
    nfd = unicodedata.normalize("NFD", s)
    khong_dau = "".join(c for c in nfd if unicodedata.category(c) != "Mn")
    return (khong_dau, s)


def tim_cot_thieu(danh_sach_cot) -> list[str]:
    """Trả về danh sách cột bắt buộc còn thiếu theo đúng thứ tự chuẩn."""
    co = {str(c).strip() for c in danh_sach_cot}
    return [c for c in COT_BAT_BUOC if c not in co]


def chuan_hoa_chi_nhanh(ten) -> str:
    """Chuẩn hoá các biến thể tên chi nhánh về Hà Nội, Đà Nẵng, TP.HCM hoặc Khác."""
    if pd.isna(ten):
        return "Khác"
    sach = " ".join(str(ten).strip().lower().replace(".", " ").split())
    return BAN_DO_CHI_NHANH.get(sach, "Khác")


def doi_ngay_hai_luot(cot_ngay: pd.Series) -> pd.Series:
    """Parse ngày lẫn %d/%m/%Y và %Y-%m-%d bằng hai lượt rõ ràng, tránh đảo tháng."""
    if pd.api.types.is_datetime64_any_dtype(cot_ngay):
        return cot_ngay
    chuoi = cot_ngay.astype(str).str.strip()
    d1 = pd.to_datetime(chuoi, format="%d/%m/%Y", errors="coerce")
    d2 = pd.to_datetime(chuoi, format="%Y-%m-%d", errors="coerce")
    return d1.fillna(d2)


def lam_sach_don_hang(df_tho: pd.DataFrame) -> tuple[pd.DataFrame, dict[str, int]]:
    """Khử trùng mã đơn, làm sạch ngày/chi nhánh/số lượng và tách đơn Hoàn thành."""
    tong_tho = len(df_tho)
    df = df_tho.copy()
    df["ma_don"] = df["ma_don"].astype(str).str.strip()

    # 1. Khử trùng lặp theo ma_don (giữ bản đầu tiên)
    df = df.drop_duplicates(subset=["ma_don"], keep="first")
    trung_ma = tong_tho - len(df)

    # 2. Kiểm tra số lượng dương và ngày đặt hợp lệ
    df["so_luong_num"] = pd.to_numeric(df["so_luong"], errors="coerce")
    df["ngay_dt"] = doi_ngay_hai_luot(df["ngay_dat"])
    hop_le_sl_ngay = (
        df["so_luong_num"].notna() & (df["so_luong_num"] > 0) & df["ngay_dt"].notna()
    )
    loi_du_lieu = int((~hop_le_sl_ngay).sum())
    df = df[hop_le_sl_ngay].copy()

    # 3. Chuẩn hoá cột văn bản và tách đơn Hoàn thành
    df["chi_nhanh"] = df["chi_nhanh"].apply(chuan_hoa_chi_nhanh)
    df["trang_thai"] = df["trang_thai"].astype(str).str.strip()
    df["so_luong"] = df["so_luong_num"].astype(int)
    df["thanh_tien"] = pd.to_numeric(df["thanh_tien"], errors="coerce").fillna(0).astype(int)
    if "khach_hang" in df.columns:
        df["khach_hang"] = df["khach_hang"].astype(str).str.strip()
    if "nhan_vien" in df.columns:
        df["nhan_vien"] = df["nhan_vien"].astype(str).str.strip()
    if "nhom_hang" in df.columns:
        df["nhom_hang"] = df["nhom_hang"].astype(str).str.strip()

    da_huy = int((df["trang_thai"] == "Đã huỷ").sum())
    df_sach = df[df["trang_thai"] == "Hoàn thành"].drop(columns=["so_luong_num"]).copy()
    df_sach["thang"] = df_sach["ngay_dt"].dt.strftime("%Y-%m")

    nhat_ky = {
        "tong_tho": tong_tho,
        "trung_ma": trung_ma,
        "loi_du_lieu": loi_du_lieu,
        "da_huy": da_huy,
        "hop_le": len(df_sach),
    }
    return df_sach.reset_index(drop=True), nhat_ky


def loc_don_hang(
    df: pd.DataFrame,
    tu_ngay,
    den_ngay,
    ds_chi_nhanh: list[str],
    ds_nhom_hang: list[str] | None = None,
) -> pd.DataFrame:
    """Lọc đồng thời theo khoảng ngày, danh sách chi nhánh và nhóm hàng."""
    ngay = df["ngay_dt"].dt.date
    dk = (ngay >= tu_ngay) & (ngay <= den_ngay) & df["chi_nhanh"].isin(ds_chi_nhanh)
    if ds_nhom_hang is not None and "nhom_hang" in df.columns:
        dk = dk & df["nhom_hang"].isin(ds_nhom_hang)
    return df[dk].copy()


def tinh_4_kpi(df: pd.DataFrame) -> dict[str, int]:
    """Tính 4 KPI tổng quan an toàn cả khi df rỗng."""
    if df.empty:
        return {"doanh_thu": 0, "so_don": 0, "aov": 0, "khach_hang": 0}
    tong = int(df["thanh_tien"].sum())
    so_don = int(len(df))
    khach = int(df["khach_hang"].nunique()) if "khach_hang" in df.columns else 0
    return {
        "doanh_thu": tong,
        "so_don": so_don,
        "aov": round(tong / so_don),
        "khach_hang": khach,
    }


def tinh_tang_truong(ky_truoc: int | float, ky_hien_tai: int | float) -> str | None:
    """Tính phần trăm tăng trưởng cho st.metric; trả None nếu kỳ trước <= 0."""
    if ky_truoc <= 0:
        return None
    pct = round((ky_hien_tai - ky_truoc) / ky_truoc * 100, 1)
    if abs(pct) < 1e-9:
        return "0.0%"
    return f"+{pct:.1f}%" if pct > 0 else f"{pct:.1f}%"


def tong_hop_theo_thang(df: pd.DataFrame) -> pd.DataFrame:
    """Gom nhóm doanh thu theo tháng YYYY-MM sắp xếp tăng dần."""
    if df.empty:
        return pd.DataFrame(columns=["thang", "doanh_thu", "so_don"])
    return (
        df.groupby("thang", as_index=False)
        .agg(doanh_thu=("thanh_tien", "sum"), so_don=("ma_don", "count"))
        .sort_values("thang")
        .reset_index(drop=True)
    )


def top_nhan_vien(df: pd.DataFrame, top_k: int = 10) -> pd.DataFrame:
    """Xếp hạng nhân viên theo doanh thu giảm dần (bằng nhau xếp theo tên A-Z)."""
    if df.empty or "nhan_vien" not in df.columns:
        return pd.DataFrame(columns=["nhan_vien", "doanh_thu", "so_don"])
    bang = (
        df.groupby("nhan_vien", as_index=False)
        .agg(doanh_thu=("thanh_tien", "sum"), so_don=("ma_don", "count"))
        .sort_values(["doanh_thu", "nhan_vien"], ascending=[False, True])
        .head(max(0, top_k))
        .reset_index(drop=True)
    )
    return bang


def gan_nhan_rfm(r: int, f: int, m: int) -> str:
    """Phân nhóm hành động RFM theo thứ tự ưu tiên từ VIP xuống Khách mới."""
    if r <= 30 and f >= 10 and m >= 80_000_000:
        return "VIP"
    if r <= 45 and f >= 8:
        return "Thân thiết"
    if r > 45:
        return "Cần chăm lại"
    return "Khách mới"


def tinh_rfm_va_phan_nhom(
    df: pd.DataFrame, ngay_chot: pd.Timestamp | None = None
) -> tuple[pd.DataFrame, pd.DataFrame]:
    """Tính R, F, M cho từng khách hàng và bảng tóm tắt 4 nhóm."""
    if df.empty or "khach_hang" not in df.columns:
        return (
            pd.DataFrame(columns=["khach_hang", "recency", "frequency", "monetary", "nhom"]),
            pd.DataFrame({"nhom": THU_TU_NHOM_RFM, "so_khach": 0, "tong_chi_tieu": 0}),
        )
    if ngay_chot is None:
        ngay_chot = df["ngay_dt"].max() + timedelta(days=1)

    rfm = df.groupby("khach_hang", as_index=False).agg(
        lan_mua_cuoi=("ngay_dt", "max"),
        frequency=("ma_don", "count"),
        monetary=("thanh_tien", "sum"),
    )
    rfm["recency"] = (ngay_chot - rfm["lan_mua_cuoi"]).dt.days.astype(int)
    rfm["nhom"] = [
        gan_nhan_rfm(int(r), int(f), int(m))
        for r, f, m in zip(rfm["recency"], rfm["frequency"], rfm["monetary"])
    ]
    rfm = rfm[["khach_hang", "recency", "frequency", "monetary", "nhom"]].sort_values(
        ["monetary", "khach_hang"], ascending=[False, True]
    ).reset_index(drop=True)

    dem_nhom = (
        rfm.groupby("nhom", as_index=False)
        .agg(so_khach=("khach_hang", "count"), tong_chi_tieu=("monetary", "sum"))
        .set_index("nhom")
    )
    thong_ke = pd.DataFrame(
        [
            {
                "nhom": ten,
                "so_khach": int(dem_nhom.loc[ten, "so_khach"]) if ten in dem_nhom.index else 0,
                "tong_chi_tieu": int(dem_nhom.loc[ten, "tong_chi_tieu"]) if ten in dem_nhom.index else 0,
            }
            for ten in THU_TU_NHOM_RFM
        ]
    )
    return rfm, thong_ke


def xuat_excel_bytes(
    df_kpi: pd.DataFrame, df_don: pd.DataFrame, df_rfm: pd.DataFrame
) -> bytes:
    """Đóng gói 3 sheet báo cáo thành luồng byte .xlsx hoàn chỉnh trên RAM."""
    buf = io.BytesIO()
    with pd.ExcelWriter(buf, engine="openpyxl") as writer:
        df_kpi.to_excel(writer, sheet_name="TongQuan", index=False)
        df_don.to_excel(writer, sheet_name="DonSach", index=False)
        df_rfm.to_excel(writer, sheet_name="KhachHang_RFM", index=False)
    buf.seek(0)
    return buf.getvalue()
