"""Đọc và tiền xử lý tệp PDF tiếng Việt bằng pdfplumber."""
import re
from pathlib import Path
import pdfplumber


def phan_loai_pdf(trang_list):
    """Phân loại tài liệu theo tổng ký tự sau strip."""
    tong = sum(len((t or "").strip()) for t in trang_list)
    if tong == 0:
        return "TRONG"
    if tong < 20:
        return "CAN_SCAN_OCR"
    return "HOP_LE"


def don_chu_pdf(van_ban):
    """Chuẩn hoá chữ Ð (U+00D0), \\xa0 và khoảng trắng dư."""
    sach = van_ban.replace("\u00d0", "Đ").replace("\xa0", " ")
    cac_dong = []
    for dong in sach.splitlines():
        gom = re.sub(r"\s+", " ", dong).strip()
        if gom:
            cac_dong.append(gom)
    return "\n".join(cac_dong)


def gop_bang_hoa_don(ds_trang):
    """Gộp các bảng từ nhiều trang và bỏ tiêu đề lặp STT."""
    ket_qua = []
    for trang in ds_trang:
        for hang in trang:
            if not hang or not any(hang):
                continue
            o_dau = str(hang[0] or "").strip()
            if o_dau.upper() == "STT":
                continue
            sach_hang = [
                str(o or "").replace("\u00d0", "Đ").strip()
                for o in hang
            ]
            ket_qua.append(sach_hang)
    return ket_qua


def phan_loai_tai_lieu(van_ban_sach):
    """Định tuyến tài liệu sang nhóm HOA_DON, HOP_DONG, CV hay KHAC."""
    sach = don_chu_pdf(van_ban_sach)
    tieu_de = sach.splitlines()[0].lower() if sach else ""
    thuong = sach.lower()
    if (
        "hợp đồng" in tieu_de
        or "số hợp đồng" in thuong
        or "điều 1." in thuong
    ):
        return "HOP_DONG"
    if (
        "hoá đơn" in tieu_de
        or "hóa đơn" in tieu_de
        or "số hoá đơn" in thuong
        or "số hóa đơn" in thuong
        or "cộng tiền hàng" in thuong
    ):
        return "HOA_DON"
    if "ứng tuyển" in thuong or "kinh nghiệm" in thuong or "kỹ năng" in thuong or "học vấn" in thuong:
        return "CV"
    return "KHAC"


def doc_mot_pdf(duong_dan):
    """Đọc an toàn một tệp PDF, trả về dict kết quả chuẩn hoá."""
    path = Path(duong_dan)
    try:
        with pdfplumber.open(path) as pdf:
            pages_raw = [p.extract_text() or "" for p in pdf.pages]
            tong_ky_tu = sum(len((t or "").strip()) for t in pages_raw)
            if len(pdf.pages) > 0 and tong_ky_tu < 20:
                return {
                    "ten_file": path.name,
                    "duong_dan": str(path),
                    "so_trang": len(pdf.pages),
                    "trang_thai_doc": "CAN_SCAN_OCR",
                    "loai_tai_lieu": "KHAC",
                    "van_ban": "",
                    "bang_hang": [],
                    "ghi_chu": "Không có lớp chữ số, cần chạy OCR riêng",
                }
            if len(pdf.pages) == 0:
                return {
                    "ten_file": path.name,
                    "duong_dan": str(path),
                    "so_trang": 0,
                    "trang_thai_doc": "TRONG",
                    "loai_tai_lieu": "KHAC",
                    "van_ban": "",
                    "bang_hang": [],
                    "ghi_chu": "Tệp PDF không có trang nào",
                }
            van_ban_sach = don_chu_pdf("\n".join(pages_raw))
            ds_bang = []
            for p in pdf.pages:
                for tbl in p.extract_tables():
                    ds_bang.append(tbl)
            return {
                "ten_file": path.name,
                "duong_dan": str(path),
                "so_trang": len(pdf.pages),
                "trang_thai_doc": "HOP_LE",
                "loai_tai_lieu": phan_loai_tai_lieu(van_ban_sach),
                "van_ban": van_ban_sach,
                "bang_hang": gop_bang_hoa_don(ds_bang),
                "ghi_chu": "Đọc thành công",
            }
    except Exception as err:
        return {
            "ten_file": path.name,
            "duong_dan": str(path),
            "so_trang": 0,
            "trang_thai_doc": "LOI_DOC_FILE",
            "loai_tai_lieu": "KHAC",
            "van_ban": "",
            "bang_hang": [],
            "ghi_chu": str(err),
        }
