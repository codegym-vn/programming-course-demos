"""Trích xuất có cấu trúc JSON cho CV và Hợp đồng (Live AI / Offline Fallback)."""
import json
import os
import re
from datetime import datetime
from typing import List
from pydantic import BaseModel, Field


class HoSoCV(BaseModel):
    ho_ten: str
    vi_tri: str = ""
    so_nam_kinh_nghiem: int = 0
    ky_nang: List[str] = Field(default_factory=list)
    muc_luong_vnd: int = 0


class HopDongSchema(BaseModel):
    so_hop_dong: str
    ben_a: str = ""
    ben_b: str = ""
    gia_tri_vnd: int = 0
    ngay_ky: str = ""
    ngay_het_han: str = ""
    dieu_khoan_rui_ro: List[str] = Field(default_factory=list)


def boc_json_tu_ai(chuoi):
    """Loại bỏ rào ```json và lời dẫn quanh chuỗi JSON do AI trả về."""
    sach = str(chuoi or "").strip()
    sach = re.sub(r"^```(?:json)?\s*", "", sach, flags=re.IGNORECASE)
    sach = re.sub(r"\s*```$", "", sach)
    m = re.search(r"\{.*\}", sach, flags=re.DOTALL)
    if not m:
        return None
    try:
        return json.loads(m.group(0))
    except json.JSONDecodeError:
        return None


def trich_xuat_theo_che_do(ten_file, van_ban_da_che_pii, fallback_db, use_ai=False):
    """Lấy JSON theo Live AI (nếu bật & có API Key) hoặc Offline Fallback."""
    if use_ai and os.getenv("GEMINI_API_KEY"):
        pass  # Điểm mở rộng gọi google-genai khi triển khai sản phẩm thực tế
    ban_ghi = fallback_db.get(ten_file)
    if not ban_ghi:
        return None, "CHUA_CO_DU_LIEU"
    return ban_ghi, "OFFLINE_FALLBACK"


def cham_diem_cv(ho_so, ky_nang_can):
    """Chấm tỷ lệ khớp kỹ năng không phân biệt hoa thường."""
    cv = HoSoCV(**ho_so)
    tap_ung_vien = {k.strip().lower() for k in cv.ky_nang}
    so_khop = sum(1 for y in ky_nang_can if y.strip().lower() in tap_ung_vien)
    ty_le = round(so_khop * 100 / len(ky_nang_can)) if ky_nang_can else 0
    xep_loai = "DAT" if ty_le >= 60 else "XEM_XET"
    return {
        "ho_ten": cv.ho_ten,
        "vi_tri": cv.vi_tri,
        "so_nam": cv.so_nam_kinh_nghiem,
        "ky_nang_chuoi": ", ".join(cv.ky_nang),
        "muc_luong_vnd": cv.muc_luong_vnd,
        "diem_khop": ty_le,
        "trang_thai": xep_loai,
    }


def danh_gia_hop_dong(du_lieu_hd, ngay_tham_chieu="2026-11-17"):
    """Tính số ngày tới hạn và gắn cờ HET_HAN / SAP_HET_HAN / CO_RUI_RO / AN_TOAN."""
    hd = HopDongSchema(**du_lieu_hd)
    ref_dt = datetime.strptime(ngay_tham_chieu, "%Y-%m-%d")
    exp_dt = datetime.strptime(hd.ngay_het_han, "%Y-%m-%d")
    con_lai = (exp_dt - ref_dt).days

    if con_lai < 0:
        trang_thai = "HET_HAN"
    elif con_lai <= 30:
        trang_thai = "SAP_HET_HAN"
    elif hd.dieu_khoan_rui_ro:
        trang_thai = "CO_RUI_RO"
    else:
        trang_thai = "AN_TOAN"

    return {
        "so_hop_dong": hd.so_hop_dong,
        "ben_b": hd.ben_b,
        "gia_tri_vnd": hd.gia_tri_vnd,
        "ngay_ky": hd.ngay_ky,
        "ngay_het_han": hd.ngay_het_han,
        "so_ngay_con_lai": con_lai,
        "rui_ro_chuoi": "; ".join(hd.dieu_khoan_rui_ro) or "Không có",
        "trang_thai": trang_thai,
    }
