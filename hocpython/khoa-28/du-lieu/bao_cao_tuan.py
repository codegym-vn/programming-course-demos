import logging
from pathlib import Path

import pandas as pd
from openpyxl import load_workbook
from openpyxl.chart import BarChart, Reference
from openpyxl.styles import Font

THU_MUC = Path(__file__).parent
TEP_VAO = THU_MUC / "ban_hang_tuan.xlsx"

logging.basicConfig(
    filename=THU_MUC / "bao_cao.log",
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
    encoding="utf-8",
)


def tinh_tong_hop(df):
    bang = df.groupby("Chi nhánh").agg(
        so_don=("Mã đơn", "count"),
        doanh_thu=("Số tiền", "sum"),
    )
    bang = bang.sort_values("doanh_thu", ascending=False)
    bang = bang.reset_index()
    bang.columns = ["Chi nhánh", "Số đơn", "Doanh thu"]
    return bang


def dinh_dang(duong_dan):
    wb = load_workbook(duong_dan)
    ws = wb["Tổng hợp"]
    for o in ws[1]:
        o.font = Font(bold=True)
    for (o,) in ws.iter_rows(min_row=2, min_col=3,
                             max_col=3):
        o.number_format = "#,##0"
    ws.column_dimensions["A"].width = 14
    ws.column_dimensions["C"].width = 16

    so_dong = ws.max_row
    bieu_do = BarChart()
    bieu_do.title = "Doanh thu theo chi nhánh"
    du_lieu = Reference(ws, min_col=3, min_row=1,
                        max_row=so_dong)
    nhan = Reference(ws, min_col=1, min_row=2,
                     max_row=so_dong)
    bieu_do.add_data(du_lieu, titles_from_data=True)
    bieu_do.set_categories(nhan)
    ws.add_chart(bieu_do, "E2")

    ct = wb["Chi tiết"]
    for (o,) in ct.iter_rows(min_row=2, max_col=1):
        o.number_format = "dd/mm/yyyy"
    ct.column_dimensions["A"].width = 12
    wb.save(duong_dan)


def main():
    df = pd.read_excel(TEP_VAO)
    ngay_cuoi = df["Ngày"].max()
    nam, tuan, _ = ngay_cuoi.isocalendar()
    ten = f"bao_cao_{nam}_tuan_{tuan:02d}.xlsx"
    tep_ra = THU_MUC / ten

    bang = tinh_tong_hop(df)
    with pd.ExcelWriter(tep_ra) as writer:
        bang.to_excel(writer, sheet_name="Tổng hợp",
                      index=False)
        df.to_excel(writer, sheet_name="Chi tiết",
                    index=False)
    dinh_dang(tep_ra)

    tong = int(bang["Doanh thu"].sum())
    logging.info(f"Đã tạo {ten}: {len(df)} đơn, "
                 f"{tong} đồng")
    print("Đã tạo", ten)


try:
    main()
except Exception:
    logging.exception("Lỗi khi tạo báo cáo")
    raise
