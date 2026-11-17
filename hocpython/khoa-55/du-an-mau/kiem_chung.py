"""Kiểm chứng toàn bộ pipeline du-an-mau Khoá 55 trên 7 PDF thật."""
from pathlib import Path
from openpyxl import load_workbook

from bao_mat_pii import che_pii
from chay_tat_ca import chay_lo
from xu_ly_ai_json import boc_json_tu_ai


def main():
    base = Path(__file__).resolve().parent
    res = chay_lo(base.parent / "du-lieu", base / "Bao_Cao_PDF_Tong_Hop.xlsx", ngay_tham_chieu="2026-11-17")

    assert len(res["log_lo"]) == 7, f"Expected 7 PDFs, got {len(res['log_lo'])}"
    assert len(res["hoa_dons"]) == 2
    assert len(res["ung_viens"]) == 2
    assert len(res["hop_dongs"]) == 2

    # Kiểm tra đối soát Hoá đơn
    hd_map = {h["ten_file"]: h for h in res["hoa_dons"]}
    assert hd_map["hd_01_van_phong_pham.pdf"]["trang_thai"] == "KHOP"
    assert hd_map["hd_01_van_phong_pham.pdf"]["tong_dong_hang"] == 7520000
    assert hd_map["hd_02_thiet_bi_it_2trang.pdf"]["trang_thai"] == "LECH"
    assert hd_map["hd_02_thiet_bi_it_2trang.pdf"]["chenh_lech"] == 1000000

    # Kiểm tra Scan PDF
    log_map = {x["ten_file"]: x for x in res["log_lo"]}
    assert log_map["hd_03_scan_anh.pdf"]["trang_thai_doc"] == "CAN_SCAN_OCR"

    # Kiểm tra Hợp đồng & CV
    hdo_map = {x["ten_file"]: x for x in res["hop_dongs"]}
    assert hdo_map["hop_dong_01_dich_vu_cntt.pdf"]["trang_thai"] == "SAP_HET_HAN"
    assert hdo_map["hop_dong_01_dich_vu_cntt.pdf"]["so_ngay_con_lai"] == 13
    assert hdo_map["hop_dong_02_thue_kho.pdf"]["trang_thai"] == "AN_TOAN"

    # Kiểm tra PII Redaction & bóc JSON AI
    sample_pii = "SĐT: 0912345678 | Email: minhanh.demo@example.com | Lương: 22.000.000 VNĐ | CCCD: 001098001234"
    masked = che_pii(sample_pii)
    assert "[AN_SDT]" in masked and "[AN_EMAIL]" in masked and "[AN_CCCD]" in masked
    assert "22.000.000" in masked, f"Bị che nhầm tiền: {masked}"
    assert boc_json_tu_ai('Mời bạn:\n```json\n{"ho_ten": "Test"}\n```') == {"ho_ten": "Test"}

    # Mở và kiểm tra thật tệp Excel đầu ra
    wb = load_workbook(res["excel"], data_only=False)
    assert wb.sheetnames == ["Tong_Hop_Loi", "Hoa_Don", "Ung_Vien_CV", "Hop_Dong"]
    ws_hd = wb["Hoa_Don"]
    assert ws_hd["F4"].value == "=SUM(F2:F3)"
    assert ws_hd["K2"].value == '=HYPERLINK("../du-lieu/hd_01_van_phong_pham.pdf", "Mở PDF")'
    assert ws_hd["I3"].value == "LECH"
    assert ws_hd["I3"].fill.fgColor.rgb.endswith("FEE2E2")
    print("ALL KHOA-55 DU-AN-MAU CHECKS PASSED!")
    for k, v in hd_map.items():
        print("HD:", k, v["so_hoa_don"], v["ma_so_thue"], v["ngay_lap"], v["trang_thai"], v["chenh_lech"])
    for k, v in hdo_map.items():
        print("HOP_DONG:", k, v["so_hop_dong"], v["so_ngay_con_lai"], v["trang_thai"])
    for cv in res["ung_viens"]:
        print("CV:", cv["ten_file"], cv["ho_ten"], cv["diem_khop"], cv["trang_thai"])


if __name__ == "__main__":
    main()
