#!/usr/bin/env python3
"""Sinh bo 7 tep PDF mau tieng Viet chuan Unicode bang Chrome headless + pdfplumber verification."""
from __future__ import annotations

import json
import os
import shutil
import subprocess
import tempfile
from pathlib import Path

from PIL import Image
import pdfplumber

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT_DIR = Path("/Users/khacnhat/Desktop/HocPython/programming-course-demos/hocpython/khoa-55/du-lieu")

CSS_BASE = """
<style>
  @page { size: A4; margin: 16mm 15mm; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
         color: #111827; font-size: 13px; line-height: 1.5; margin: 0; }
  h1 { font-size: 20px; margin: 0 0 6px; color: #1e3a8a; }
  h2 { font-size: 14px; margin: 14px 0 6px; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 3px; color: #0f172a; }
  .meta { background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px 12px; border-radius: 6px; margin-bottom: 12px; }
  table { width: 100%; border-collapse: collapse; margin-top: 8px; }
  th, td { border: 1px solid #475569; padding: 7px 8px; text-align: left; }
  th { background: #e2e8f0; font-weight: 700; }
  .num { text-align: right; font-variant-numeric: tabular-nums; }
  .summary { margin-top: 12px; margin-left: auto; width: 320px; border: 1px solid #334155; padding: 8px 12px; background: #f8fafc; }
  .summary div { display: flex; justify-content: space-between; margin: 3px 0; }
  .cols2 { display: grid; grid-template-columns: 1fr 1.6fr; gap: 18px; margin-top: 10px; }
  .side { background: #f1f5f9; padding: 12px; border-radius: 6px; }
</style>
"""

DOCS: dict[str, str] = {}

# 1. hd_01_van_phong_pham.pdf (1 page, exact match)
DOCS["hd_01_van_phong_pham.pdf"] = f"""<!doctype html><html lang="vi"><head><meta charset="utf-8">{CSS_BASE}</head><body>
<h1>HOÁ ĐƠN BÁN HÀNG (MẪU ĐIỆN TỬ)</h1>
<div class="meta">
  <b>Đơn vị bán:</b> Công ty TNHH Văn phòng phẩm Sao Mai<br>
  <b>Mã số thuế:</b> 0108456789<br>
  <b>Số hoá đơn:</b> HD-2026-0101 &nbsp;|&nbsp; <b>Ngày lập:</b> 12/05/2026<br>
  <b>Đơn vị mua:</b> Công ty CP Thương mại An Bình (MST: 0109998887)
</div>
<table>
  <thead>
    <tr><th>STT</th><th>Tên hàng hoá, dịch vụ</th><th class="num">SL</th><th class="num">Đơn giá (đ)</th><th class="num">Thành tiền (đ)</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>Giấy in A4 Double A 80gsm</td><td class="num">20</td><td class="num">85.000</td><td class="num">1.700.000</td></tr>
    <tr><td>2</td><td>Bút bi Thiên Long TL-027</td><td class="num">15</td><td class="num">62.000</td><td class="num">930.000</td></tr>
    <tr><td>3</td><td>Bìa còng F4 Plus 7cm</td><td class="num">30</td><td class="num">38.000</td><td class="num">1.140.000</td></tr>
    <tr><td>4</td><td>Mực in Laser HP 17A</td><td class="num">3</td><td class="num">1.250.000</td><td class="num">3.750.000</td></tr>
  </tbody>
</table>
<div class="summary">
  <div><span>Cộng tiền hàng:</span><b>7.520.000 đ</b></div>
  <div><span>Thuế suất GTGT (8%):</span><b>601.600 đ</b></div>
  <div style="border-top:1px solid #94a3b8;padding-top:4px"><span>Tổng cộng thanh toán:</span><b>8.121.600 đ</b></div>
</div>
</body></html>"""

# 2. hd_02_thiet_bi_it_2trang.pdf (2 pages, deliberate 1.000.000 mismatch on subtotal -> LECH)
filler_rows = "".join([
    f"<tr><td>{i}</td><td>{ten}</td><td class='num'>{sl}</td><td class='num'>{dg}</td><td class='num'>{tt}</td></tr>"
    for i, ten, sl, dg, tt in [
        (1, "Màn hình Dell 24 inch P2422H", 4, "3.850.000", "15.400.000"),
        (2, "Bàn phím cơ không dây K8", 6, "950.000", "5.700.000"),
        (3, "Chuột không dây Logitech M650", 6, "620.000", "3.720.000"),
        (4, "Tai nghe họp trực tuyến H390", 5, "780.000", "3.900.000"),
    ]
])
DOCS["hd_02_thiet_bi_it_2trang.pdf"] = f"""<!doctype html><html lang="vi"><head><meta charset="utf-8">{CSS_BASE}
<style>.pb {{ page-break-before: always; }} .note {{ margin-top: 260px; color: #475569; font-style: italic; }}</style>
</head><body>
<h1>HOÁ ĐƠN GIÁ TRỊ GIA TĂNG (NHIỀU TRANG)</h1>
<div class="meta">
  <b>Đơn vị bán:</b> Công ty CP Giải pháp Thiết bị Việt<br>
  <b>Mã số thuế:</b> 0312987654-001<br>
  <b>Số hoá đơn:</b> HD-2026-0102 &nbsp;|&nbsp; <b>Ngày lập:</b> 18/05/2026<br>
  <b>Đơn vị mua:</b> Công ty CP Thương mại An Bình
</div>
<table>
  <thead>
    <tr><th>STT</th><th>Tên thiết bị &amp; phụ kiện IT</th><th class="num">SL</th><th class="num">Đơn giá (đ)</th><th class="num">Thành tiền (đ)</th></tr>
  </thead>
  <tbody>{filler_rows}</tbody>
</table>
<div class="note">Điều khoản giao hàng: Giao lắp đặt tận nơi tại tầng 5, toà nhà Hoàng Thành. Bảo hành chính hãng 24 tháng kể từ ngày nghiệm thu. (Danh sách tiếp tục ở Trang 2)</div>

<div class="pb"></div>
<h2>Phụ lục chi tiết hàng hoá (tiếp theo - Trang 2)</h2>
<table>
  <thead>
    <tr><th>STT</th><th>Tên thiết bị &amp; phụ kiện IT</th><th class="num">SL</th><th class="num">Đơn giá (đ)</th><th class="num">Thành tiền (đ)</th></tr>
  </thead>
  <tbody>
    <tr><td>5</td><td>Hub chuyển đổi USB-C 7 cổng</td><td class="num">4</td><td class="num">690.000</td><td class="num">2.760.000</td></tr>
    <tr><td>6</td><td>Dây mạng Cat6 bấm sẵn (cuộn)</td><td class="num">3</td><td class="num">1.100.000</td><td class="num">3.300.000</td></tr>
    <tr><td>7</td><td>Bộ phát Wi-Fi doanh nghiệp AC1200</td><td class="num">2</td><td class="num">2.450.000</td><td class="num">4.900.000</td></tr>
  </tbody>
</table>
<div class="summary">
  <div><span>Cộng tiền hàng:</span><b>38.680.000 đ</b></div>
  <div><span>Thuế suất GTGT (10%):</span><b>3.868.000 đ</b></div>
  <div style="border-top:1px solid #94a3b8;padding-top:4px"><span>Tổng cộng thanh toán:</span><b>42.548.000 đ</b></div>
</div>
</body></html>"""

# 3. cv_01_nguyen_minh_anh.pdf (1 column CV)
DOCS["cv_01_nguyen_minh_anh.pdf"] = f"""<!doctype html><html lang="vi"><head><meta charset="utf-8">{CSS_BASE}</head><body>
<h1>NGUYỄN MINH ANH</h1>
<div class="meta">
  <b>Vị trí ứng tuyển:</b> Chuyên viên Phân tích Dữ liệu &amp; Báo cáo<br>
  <b>Điện thoại:</b> 0912345678 &nbsp;|&nbsp; <b>Email:</b> minhanh.demo@example.com<br>
  <b>Số năm kinh nghiệm:</b> 4 năm &nbsp;|&nbsp; <b>Mức lương mong muốn:</b> 22.000.000 VNĐ
</div>
<h2>Kỹ năng chuyên môn</h2>
<p>Python, Excel, SQL, Power BI, Streamlit, tự động hoá báo cáo tuần.</p>
<h2>Kinh nghiệm làm việc</h2>
<ul>
  <li><b>2024 – 2026 | Công ty Retail X:</b> Chuyên viên Phân tích Kinh doanh — viết script Python tổng hợp báo cáo Excel 3 miền, tiết kiệm 6 giờ/tuần.</li>
  <li><b>2022 – 2024 | Công ty Tài chính Y:</b> Chuyên viên Dữ liệu — xây dựng dashboard theo dõi công nợ bằng Power BI và SQL.</li>
</ul>
<h2>Học vấn</h2>
<p>Cử nhân Hệ thống Thông tin Quản lý — Đại học Kinh tế Quốc dân (2022).</p>
</body></html>"""

# 4. cv_02_tran_quoc_bao.pdf (2 column CV layout)
DOCS["cv_02_tran_quoc_bao.pdf"] = f"""<!doctype html><html lang="vi"><head><meta charset="utf-8">{CSS_BASE}</head><body>
<div class="cols2">
  <div class="side">
    <h1 style="font-size:18px">TRẦN QUỐC BẢO</h1>
    <p><b>Lập trình viên Tự động hoá</b></p>
    <p>SĐT: 0987654321<br>Email: quocbao.test@example.org<br>Khu vực: TP. Hồ Chí Minh</p>
    <h2>Kỹ năng chính</h2>
    <ul><li>Python 3</li><li>pdfplumber &amp; Regex</li><li>Pandas &amp; OpenPyXL</li><li>Git &amp; Docker</li></ul>
    <h2>Mức lương kỳ vọng</h2>
    <p><b>18.000.000 VNĐ</b></p>
  </div>
  <div>
    <h2>Giới thiệu bản thân</h2>
    <p>Có 2 năm kinh nghiệm phát triển công cụ xử lý tài liệu PDF, chuyển đổi bảng biểu ngân hàng và hoá đơn điện tử cho bộ phận kế toán.</p>
    <h2>Dự án tiêu biểu</h2>
    <ul>
      <li><b>Công cụ bóc bảng kê PDF (2025):</b> Tự động trích 120 tệp PDF/ngày bằng Python sang Excel nhiều sheet.</li>
      <li><b>Hệ thống lưu trữ hồ sơ (2024):</b> Phân loại tự động PDF hồ sơ nhân sự theo từ khoá.</li>
    </ul>
    <h2>Học vấn</h2>
    <p>Kỹ sư Công nghệ Thông tin — ĐH Bách Khoa TP.HCM (2024).</p>
  </div>
</div>
</body></html>"""

# 5. hop_dong_01_dich_vu_cntt.pdf (expiring soon: 2026-11-30, 13 days from 2026-11-17!)
DOCS["hop_dong_01_dich_vu_cntt.pdf"] = f"""<!doctype html><html lang="vi"><head><meta charset="utf-8">{CSS_BASE}</head><body>
<h1>HỢP ĐỒNG CUNG CẤP DỊCH VỤ PHẦN MỀM</h1>
<p><b>Số hợp đồng:</b> HĐ-DV-2026-08 &nbsp;|&nbsp; <b>Ngày ký:</b> 01/12/2025 &nbsp;|&nbsp; <b>Ngày hết hạn:</b> 30/11/2026</p>
<div class="meta">
  <b>Bên A (Bên thuê):</b> Công ty CP Thương mại An Bình (MST: 0109998887)<br>
  <b>Bên B (Bên cung cấp):</b> Công ty TNHH Phần mềm Minh Quang (MST: 0107776665)<br>
  <b>Tổng giá trị hợp đồng:</b> 180.000.000 đ (đã bao gồm VAT)
</div>
<h2>Điều 1. Phạm vi dịch vụ</h2>
<p>Bên B cung cấp bản quyền hệ thống quản trị kho và bảo trì kỹ thuật định kỳ 12 tháng cho Bên A.</p>
<h2>Điều 2. Thanh toán và Chế tài</h2>
<ul>
  <li>Thanh toán chia 2 đợt trong vòng 10 ngày làm việc kể từ ngày nhận hoá đơn hợp lệ.</li>
  <li><b>Phạt chậm thanh toán:</b> Nếu quá hạn, Bên A chịu mức phạt chậm thanh toán 0,1%/ngày trên số tiền chậm trả.</li>
</ul>
<h2>Điều 3. Gia hạn hợp đồng</h2>
<p><b>Tự động gia hạn:</b> Hợp đồng sẽ tự động gia hạn thêm 12 tháng với đơn giá mới nếu Bên A không gửi thông báo chấm dứt bằng văn bản trước 30 ngày so với ngày hết hạn.</p>
</body></html>"""

# 6. hop_dong_02_thue_kho.pdf (normal active contract: expires 2027-03-15)
DOCS["hop_dong_02_thue_kho.pdf"] = f"""<!doctype html><html lang="vi"><head><meta charset="utf-8">{CSS_BASE}</head><body>
<h1>HỢP ĐỒNG THUÊ KHO BÃI &amp; LOGISTICS</h1>
<p><b>Số hợp đồng:</b> HĐ-TK-2026-15 &nbsp;|&nbsp; <b>Ngày ký:</b> 15/03/2026 &nbsp;|&nbsp; <b>Ngày hết hạn:</b> 15/03/2027</p>
<div class="meta">
  <b>Bên A (Bên thuê):</b> Công ty CP Thương mại An Bình (MST: 0109998887)<br>
  <b>Bên B (Bên cho thuê):</b> Công ty Kho vận Đông Nam (MST: 0305554443)<br>
  <b>Tổng giá trị hợp đồng:</b> 360.000.000 đ (30.000.000 đ/tháng)
</div>
<h2>Điều 1. Diện tích và Địa điểm</h2>
<p>Bên B cho Bên A thuê 200m2 kho tiêu chuẩn tại Khu công nghiệp Tân Bình.</p>
<h2>Điều 2. Thanh toán và Bảo trì</h2>
<ul>
  <li>Bên A thanh toán theo quý vào ngày mùng 05 của tháng đầu quý.</li>
  <li>Bên B bảo trì hệ thống phòng cháy chữa cháy và an ninh miễn phí trong suốt thời hạn thuê.</li>
</ul>
<h2>Điều 3. Chấm dứt hợp đồng</h2>
<p>Hai bên có quyền thương lượng gia hạn hoặc chấm dứt trước hạn khi thông báo trước 45 ngày, không áp dụng gia hạn tự động.</p>
</body></html>"""

OUT_DIR.mkdir(parents=True, exist_ok=True)
with tempfile.TemporaryDirectory() as td:
    td_path = Path(td)
    for fname, html in DOCS.items():
        html_p = td_path / f"{fname}.html"
        pdf_p = OUT_DIR / fname
        html_p.write_text(html, encoding="utf-8")
        subprocess.run(
            [CHROME, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
             f"--user-data-dir={td}/ud", f"--print-to-pdf={pdf_p}", html_p.as_uri()],
            check=True, capture_output=True, timeout=60
        )

    # 7. Create image-only scan PDF (hd_03_scan_anh.pdf) with NO selectable text layer
    scan_html = td_path / "scan.html"
    scan_png = td_path / "scan.png"
    scan_html.write_text(f"""<!doctype html><html lang="vi"><head><meta charset="utf-8">{CSS_BASE}</head>
    <body style="padding:36px"><h1>HOÁ ĐƠN GIẤY BẢN SCAN (ẢNH CHỤP)</h1>
    <div class="meta"><b>Số hoá đơn:</b> HD-SCAN-2026-099 &nbsp;|&nbsp; <b>Ngày:</b> 20/05/2026<br>
    <b>Đơn vị bán:</b> Cửa hàng Văn phòng Tiến Phát<br><b>Tổng thanh toán:</b> 1.850.000 đ</div>
    <p>(Tệp này được lưu hoàn toàn dưới dạng ảnh raster để kiểm thử cơ chế phát hiện PDF scan không có lớp text.)</p>
    </body></html>""", encoding="utf-8")
    subprocess.run(
        [CHROME, "--headless=new", "--disable-gpu", f"--user-data-dir={td}/ud2",
         "--window-size=800,600", f"--screenshot={scan_png}", scan_html.as_uri()],
        check=True, capture_output=True, timeout=60
    )
    Image.open(scan_png).convert("RGB").save(OUT_DIR / "hd_03_scan_anh.pdf", "PDF", resolution=150.0)

# Create offline JSON fallback for CV & HopDong so learners without API keys can still build 100% of Modules 3-5
fallback_ai = {
    "cv_01_nguyen_minh_anh.pdf": {
        "ho_ten": "Nguyễn Minh Anh",
        "vi_tri": "Chuyên viên Phân tích Dữ liệu & Báo cáo",
        "so_nam_kinh_nghiem": 4,
        "ky_nang": ["Python", "Excel", "SQL", "Power BI", "Streamlit"],
        "muc_luong_vnd": 22000000,
    },
    "cv_02_tran_quoc_bao.pdf": {
        "ho_ten": "Trần Quốc Bảo",
        "vi_tri": "Lập trình viên Tự động hoá",
        "so_nam_kinh_nghiem": 2,
        "ky_nang": ["Python 3", "pdfplumber", "Regex", "Pandas", "OpenPyXL"],
        "muc_luong_vnd": 18000000,
    },
    "hop_dong_01_dich_vu_cntt.pdf": {
        "so_hop_dong": "HĐ-DV-2026-08",
        "ben_a": "Công ty CP Thương mại An Bình",
        "ben_b": "Công ty TNHH Phần mềm Minh Quang",
        "gia_tri_vnd": 180000000,
        "ngay_ky": "2025-12-01",
        "ngay_het_han": "2026-11-30",
        "dieu_khoan_rui_ro": ["Tự động gia hạn 12 tháng nếu không báo trước 30 ngày", "Phạt chậm thanh toán 0,1%/ngày"],
    },
    "hop_dong_02_thue_kho.pdf": {
        "so_hop_dong": "HĐ-TK-2026-15",
        "ben_a": "Công ty CP Thương mại An Bình",
        "ben_b": "Công ty Kho vận Đông Nam",
        "gia_tri_vnd": 360000000,
        "ngay_ky": "2026-03-15",
        "ngay_het_han": "2027-03-15",
        "dieu_khoan_rui_ro": [],
    },
}
(OUT_DIR / "json_ai_fallback.json").write_text(json.dumps(fallback_ai, ensure_ascii=False, indent=2), encoding="utf-8")

# Verify EVERY single generated PDF with pdfplumber
print("=== VERIFYING GENERATED PDFS WITH PDFPLUMBER ===")
for p in sorted(OUT_DIR.glob("*.pdf")):
    with pdfplumber.open(p) as pdf:
        pages = len(pdf.pages)
        texts = [(pg.extract_text() or "").strip() for pg in pdf.pages]
        tables = [pg.extract_tables() or [] for pg in pdf.pages]
        total_chars = sum(len(t) for t in texts)
        total_tables = sum(len(tb) for tb in tables)
        print(f"{p.name}: pages={pages}, chars={total_chars}, tables={total_tables}")
        if p.name == "hd_03_scan_anh.pdf":
            assert total_chars == 0, f"Scan PDF should have 0 chars, got {total_chars}"
        else:
            assert total_chars > 100, f"{p.name} extracted too little text: {total_chars}"
        if p.name in ("hd_01_van_phong_pham.pdf", "hd_02_thiet_bi_it_2trang.pdf"):
            print("  FIRST LINE:", texts[0].splitlines()[0])
            for pi, tbs in enumerate(tables):
                print(f"  Page {pi+1} tables:", tbs)
