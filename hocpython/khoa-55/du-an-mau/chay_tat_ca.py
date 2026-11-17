"""Chạy toàn bộ pipeline Đọc PDF -> Che PII -> Regex/AI JSON -> Excel 4 Sheet."""
import json
from pathlib import Path

from bao_mat_pii import che_pii
from doc_pdf import doc_mot_pdf
from xu_ly_ai_json import cham_diem_cv, danh_gia_hop_dong, trich_xuat_theo_che_do
from xu_ly_hoa_don import xu_ly_hoa_don
from xuat_excel import xuat_bao_cao_excel


def chay_lo(thu_muc_du_lieu, tep_excel_ra, ngay_tham_chieu="2026-11-17"):
    """Quét đệ quy thư mục PDF và xuất sổ Excel 4 Sheet."""
    data_dir = Path(thu_muc_du_lieu)
    fallback_path = data_dir / "json_ai_fallback.json"
    fallback_db = json.loads(fallback_path.read_text(encoding="utf-8"))

    log_lo, hoa_dons, ung_viens, hop_dongs = [], [], [], []
    ky_nang_tuyen = ["Python", "Excel", "SQL"]

    for pdf_path in sorted(data_dir.rglob("*.pdf")):
        doc = doc_mot_pdf(pdf_path)
        log_lo.append(doc)
        if doc["trang_thai_doc"] != "HOP_LE":
            continue

        loai = doc["loai_tai_lieu"]
        if loai == "HOA_DON":
            hoa_dons.append(xu_ly_hoa_don(doc))
        elif loai == "CV":
            vb_an_toan = che_pii(doc["van_ban"])
            data, _ = trich_xuat_theo_che_do(doc["ten_file"], vb_an_toan, fallback_db)
            if data:
                kq = cham_diem_cv(data, ky_nang_tuyen)
                kq["ten_file"] = doc["ten_file"]
                ung_viens.append(kq)
        elif loai == "HOP_DONG":
            vb_an_toan = che_pii(doc["van_ban"])
            data, _ = trich_xuat_theo_che_do(doc["ten_file"], vb_an_toan, fallback_db)
            if data:
                kq = danh_gia_hop_dong(data, ngay_tham_chieu=ngay_tham_chieu)
                kq["ten_file"] = doc["ten_file"]
                hop_dongs.append(kq)

    saved_path = xuat_bao_cao_excel(tep_excel_ra, log_lo, hoa_dons, ung_viens, hop_dongs)
    return {
        "excel": saved_path,
        "log_lo": log_lo,
        "hoa_dons": hoa_dons,
        "ung_viens": ung_viens,
        "hop_dongs": hop_dongs,
    }


if __name__ == "__main__":
    base = Path(__file__).resolve().parent
    res = chay_lo(base.parent / "du-lieu", base / "Bao_Cao_PDF_Tong_Hop.xlsx")
    print(f"Đã xuất báo cáo: {res['excel']}")
    print(f"Tổng PDF: {len(res['log_lo'])} | Hoá đơn: {len(res['hoa_dons'])} | CV: {len(res['ung_viens'])} | Hợp đồng: {len(res['hop_dongs'])}")
