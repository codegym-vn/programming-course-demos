from __future__ import annotations

import io
from pathlib import Path

import pandas as pd
import plotly.express as px
import streamlit as st

from xu_ly import (
    dinh_dang_vnd,
    khoa_vn,
    lam_sach_don_hang,
    loc_don_hang,
    tim_cot_thieu,
    tinh_4_kpi,
    tinh_rfm_va_phan_nhom,
    tong_hop_theo_thang,
    top_nhan_vien,
    xuat_excel_bytes,
)

THU_MUC_GOC = Path(__file__).parent
DUONG_DAN_MAU = THU_MUC_GOC.parent / "du-lieu" / "don_hang_mau.xlsx"
MIME_XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"


def kiem_tra_mat_khau() -> None:
    """Hiển thị cổng xác thực dùng st.secrets (nếu APP_PASSWORD được cấu hình)."""
    mat_khau_chuan = st.secrets.get("APP_PASSWORD")
    if not mat_khau_chuan:
        return
    if "da_dang_nhap" not in st.session_state:
        st.session_state["da_dang_nhap"] = False
    if not st.session_state["da_dang_nhap"]:
        st.title("Mini-BI Dashboard Doanh số")
        st.info("Vui lòng nhập mật khẩu nội bộ để xem báo cáo.")
        nhap = st.text_input("Mật khẩu truy cập", type="password")
        if st.button("Mở khoá Dashboard"):
            if nhap == mat_khau_chuan:
                st.session_state["da_dang_nhap"] = True
                st.rerun()
            else:
                st.error("Mật khẩu chưa chính xác.")
        st.stop()


@st.cache_data
def doc_va_lam_sach(du_lieu_bytes: bytes | None, ten_tep: str):
    """Đọc tệp upload hoặc mẫu, kiểm tra schema và làm sạch dữ liệu (có cache)."""
    if du_lieu_bytes is None:
        df_tho = pd.read_excel(DUONG_DAN_MAU, sheet_name="DonHang")
    elif ten_tep.lower().endswith(".csv"):
        df_tho = pd.read_csv(io.BytesIO(du_lieu_bytes))
    else:
        df_tho = pd.read_excel(io.BytesIO(du_lieu_bytes), sheet_name="DonHang")

    thieu = tim_cot_thieu(df_tho.columns)
    if thieu:
        return None, None, thieu
    df_sach, nhat_ky = lam_sach_don_hang(df_tho)
    return df_sach, nhat_ky, []


def main() -> None:
    st.set_page_config(
        page_title="Dashboard Doanh số & Khách hàng",
        page_icon="📊",
        layout="wide",
    )
    kiem_tra_mat_khau()

    st.title("Dashboard Quản trị Doanh số & Khách hàng")
    st.caption("Upload tệp Excel bán hàng mới hoặc trải nghiệm ngay trên dữ liệu mẫu.")

    tep_tai = st.file_uploader(
        "Tải lên tệp báo cáo Excel (.xlsx) hoặc CSV",
        type=["xlsx", "csv"],
    )
    if tep_tai is None:
        st.info("Đang hiển thị dữ liệu mẫu mặc định (don_hang_mau.xlsx).")
        df_sach, nhat_ky, cot_thieu = doc_va_lam_sach(None, "don_hang_mau.xlsx")
    else:
        df_sach, nhat_ky, cot_thieu = doc_va_lam_sach(tep_tai.getvalue(), tep_tai.name)

    if cot_thieu:
        st.error("Tệp vừa tải lên còn thiếu các cột bắt buộc: " + ", ".join(cot_thieu))
        st.stop()

    ds_cn = sorted(df_sach["chi_nhanh"].unique(), key=khoa_vn)
    has_nhom = "nhom_hang" in df_sach.columns
    ds_nhom = sorted(df_sach["nhom_hang"].unique(), key=khoa_vn) if has_nhom else []
    min_ngay = df_sach["ngay_dt"].min().date()
    max_ngay = df_sach["ngay_dt"].max().date()

    def dat_lai_bo_loc() -> None:
        st.session_state["loc_ngay"] = (min_ngay, max_ngay)
        st.session_state["loc_cn"] = ds_cn
        if has_nhom:
            st.session_state["loc_nhom"] = ds_nhom

    with st.sidebar:
        st.header("Bộ lọc báo cáo")
        khoang_ngay = st.date_input(
            "Khoảng ngày",
            value=(min_ngay, max_ngay),
            min_value=min_ngay,
            max_value=max_ngay,
            key="loc_ngay",
        )
        chon_cn = st.multiselect(
            "Chi nhánh",
            options=ds_cn,
            default=ds_cn,
            key="loc_cn",
        )
        chon_nhom = (
            st.multiselect(
                "Nhóm hàng",
                options=ds_nhom,
                default=ds_nhom,
                key="loc_nhom",
            )
            if has_nhom
            else None
        )
        st.button("Đặt lại bộ lọc", on_click=dat_lai_bo_loc, use_container_width=True)

    if isinstance(khoang_ngay, (tuple, list)) and len(khoang_ngay) == 2:
        tu_ngay, den_ngay = khoang_ngay
    elif isinstance(khoang_ngay, (tuple, list)) and len(khoang_ngay) == 1:
        tu_ngay = den_ngay = khoang_ngay[0]
    else:
        tu_ngay = den_ngay = khoang_ngay

    df_loc = loc_don_hang(df_sach, tu_ngay, den_ngay, chon_cn, chon_nhom)
    if df_loc.empty:
        st.warning("Không có đơn hàng nào khớp bộ lọc hiện tại. Hãy nới rộng lựa chọn ở thanh bên trái.")
        st.stop()

    kpi = tinh_4_kpi(df_loc)
    df_thang = tong_hop_theo_thang(df_loc)
    df_nv = top_nhan_vien(df_loc, top_k=10)
    ngay_chot = df_sach["ngay_dt"].max() + pd.Timedelta(days=1)
    df_rfm, df_rfm_tk = tinh_rfm_va_phan_nhom(df_loc, ngay_chot=ngay_chot)

    tab1, tab2, tab3 = st.tabs([
        "Tổng quan doanh số",
        "Phân tích khách hàng",
        "Dữ liệu & Xuất báo cáo",
    ])

    with tab1:
        c1, c2, c3, c4 = st.columns(4)
        c1.metric("Tổng doanh thu", dinh_dang_vnd(kpi["doanh_thu"]))
        c2.metric("Đơn hoàn thành", f"{kpi['so_don']} đơn")
        c3.metric("Giá trị TB / đơn", dinh_dang_vnd(kpi["aov"]))
        c4.metric("Khách hàng", f"{kpi['khach_hang']} khách")

        col_l, col_r = st.columns(2)
        with col_l:
            fig_thang = px.line(
                df_thang,
                x="thang",
                y="doanh_thu",
                markers=True,
                title="Xu hướng doanh thu theo tháng",
                labels={"thang": "Tháng", "doanh_thu": "Doanh thu (VNĐ)"},
            )
            fig_thang.update_yaxes(tickformat=",.0f")
            st.plotly_chart(fig_thang, use_container_width=True)
        with col_r:
            fig_nv = px.bar(
                df_nv.sort_values("doanh_thu", ascending=True),
                x="doanh_thu",
                y="nhan_vien",
                orientation="h",
                title="Xếp hạng nhân viên theo doanh thu",
                labels={"doanh_thu": "Doanh thu (VNĐ)", "nhan_vien": "Nhân viên"},
            )
            fig_nv.update_xaxes(tickformat=",.0f")
            st.plotly_chart(fig_nv, use_container_width=True)

    with tab2:
        fig_rfm = px.bar(
            df_rfm_tk,
            x="nhom",
            y="so_khach",
            color="nhom",
            title="Phân bố khách hàng theo 4 nhóm hành động RFM",
            labels={"nhom": "Nhóm khách hàng", "so_khach": "Số khách hàng"},
        )
        st.plotly_chart(fig_rfm, use_container_width=True)
        st.dataframe(df_rfm, use_container_width=True)

    with tab3:
        with st.expander("Xem nhật ký làm sạch dữ liệu"):
            st.write(
                f"Tổng dòng thô: **{nhat_ky['tong_tho']}** | "
                f"Trùng mã: **{nhat_ky['trung_ma']}** | "
                f"Lỗi số lượng/ngày: **{nhat_ky['loi_du_lieu']}** | "
                f"Đã huỷ: **{nhat_ky['da_huy']}** | "
                f"Đơn Hoàn thành sạch: **{nhat_ky['hop_le']}**"
            )
        df_kpi_sheet = pd.DataFrame([kpi])
        du_lieu_excel = xuat_excel_bytes(df_kpi_sheet, df_loc, df_rfm)
        st.download_button(
            "Tải xuống báo cáo Excel sạch (.xlsx)",
            data=du_lieu_excel,
            file_name="bao_cao_doanh_so_sach.xlsx",
            mime=MIME_XLSX,
        )
        st.dataframe(df_loc, use_container_width=True)


if __name__ == "__main__":
    main()
