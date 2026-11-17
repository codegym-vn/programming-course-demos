"""Bóc tách thông tin và đối soát toán học Hoá đơn bằng Regex."""
import re


def boc_thong_tin_hd(van_ban):
    """Trích xuất (so_hoa_don, ma_so_thue) hỗ trợ MST 10 và 10-3 số."""
    m_shd = re.search(
        r"Số\s*(?:h(?:oá|óa)\s*đơn|HĐ)\s*:\s*([A-Za-z0-9\-]+)",
        van_ban,
        flags=re.IGNORECASE,
    )
    m_mst = re.search(
        r"(?:Mã số thuế|MST)\s*:\s*(\d{10}(?:-\d{3})?)",
        van_ban,
        flags=re.IGNORECASE,
    )
    return (
        m_shd.group(1) if m_shd else "",
        m_mst.group(1) if m_mst else "",
    )


def chuan_hoa_tien(chuoi):
    """Đổi chuỗi tiền Việt (vd '8.121.600 đ') thành số nguyên."""
    so_sach = re.sub(r"[^\d]", "", str(chuoi or ""))
    return int(so_sach) if so_sach else 0


def chuan_hoa_ngay(van_ban):
    """Tìm ngày dd/mm/yyyy hoặc dd-mm-yyyy và đổi sang YYYY-MM-DD."""
    m = re.search(r"(\d{2})[/\-](\d{2})[/\-](\d{4})", van_ban)
    if not m:
        return ""
    ngay, thang, nam = m.groups()
    return f"{nam}-{thang}-{ngay}"


def boc_tong_ket_hd(van_ban):
    """Lấy (cong_tien_hang, thue_gtgt, tong_cong) từ chân hoá đơn."""
    def lay_so(pattern):
        m = re.search(pattern, van_ban, flags=re.IGNORECASE)
        return chuan_hoa_tien(m.group(1)) if m else 0

    cong_hang = lay_so(r"Cộng tiền hàng\s*:\s*([^\n]+)")
    vat = lay_so(r"Thuế suất GTGT[^\n:]*:\s*([^\n]+)")
    tong_cong = lay_so(r"Tổng cộng thanh toán\s*:\s*([^\n]+)")
    return cong_hang, vat, tong_cong


def doi_soat_hoa_don(bang_hang, cong_hang_khai_bao, vat_khai_bao, tong_khai_bao):
    """Kiểm toán 3 tầng: dòng SL*DG, tổng mặt hàng vs khai báo, và +VAT=Tổng."""
    tong_dong = 0
    loi_chi_tiet = []
    for hang in bang_hang:
        if len(hang) < 5:
            continue
        sl = chuan_hoa_tien(hang[2])
        don_gia = chuan_hoa_tien(hang[3])
        thanh_tien = chuan_hoa_tien(hang[4])
        if sl * don_gia != thanh_tien:
            loi_chi_tiet.append(f"STT {hang[0]}: SL*DG != Thành tiền")
        tong_dong += thanh_tien

    lech_hang = abs(tong_dong - cong_hang_khai_bao)
    lech_vat_tong = abs((cong_hang_khai_bao + vat_khai_bao) - tong_khai_bao)
    tong_lech = lech_hang + lech_vat_tong

    if loi_chi_tiet or tong_lech > 0:
        ly_do = "; ".join(loi_chi_tiet)
        if lech_hang > 0:
            ly_do += f" Lệch cộng hàng: tính {tong_dong:,} vs ghi {cong_hang_khai_bao:,}".strip()
        return {
            "tong_tinh_toan": tong_dong,
            "chenh_lech": lech_hang if lech_hang else tong_lech,
            "trang_thai": "LECH",
            "ghi_chu_doi_soat": ly_do.strip(),
        }
    return {
        "tong_tinh_toan": tong_dong,
        "chenh_lech": 0,
        "trang_thai": "KHOP",
        "ghi_chu_doi_soat": "Khớp toàn bộ dòng hàng và VAT",
    }


def xu_ly_hoa_don(doc_info):
    """Tổng hợp bản ghi hoàn chỉnh cho 1 hoá đơn hợp lệ."""
    vb = doc_info["van_ban"]
    so_hd, mst = boc_thong_tin_hd(vb)
    ngay = chuan_hoa_ngay(vb)
    cong_hang, vat, tong_cong = boc_tong_ket_hd(vb)
    ds = doi_soat_hoa_don(doc_info["bang_hang"], cong_hang, vat, tong_cong)
    return {
        "ten_file": doc_info["ten_file"],
        "so_hoa_don": so_hd,
        "ma_so_thue": mst,
        "ngay_lap": ngay,
        "so_mat_hang": len(doc_info["bang_hang"]),
        "tong_dong_hang": ds["tong_tinh_toan"],
        "tien_hang_khai_bao": cong_hang,
        "vat": vat,
        "tong_thanh_toan": tong_cong,
        "chenh_lech": ds["chenh_lech"],
        "trang_thai": ds["trang_thai"],
        "ghi_chu": ds["ghi_chu_doi_soat"],
        "duong_dan": doc_info["duong_dan"],
    }
