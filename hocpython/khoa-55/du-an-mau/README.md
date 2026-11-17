# Dự án Mẫu Khoá 55: Tự động hoá PDF sang Excel bằng Python

Công cụ đọc hàng loạt tệp PDF (**Hoá đơn**, **CV ứng viên**, **Hợp đồng**) trong `../du-lieu/`, phân loại PDF ảnh scan, đối soát sai số tiền hàng bằng Regex, che ẩn thông tin cá nhân (PII) trước bước trích xuất JSON (chế độ Offline Fallback dùng `json_ai_fallback.json`) và xuất sổ Excel 4 sheet có tô màu cảnh báo cùng liên kết mở tệp PDF gốc.

## Hướng dẫn chạy trong 3 bước

1. Tạo môi trường ảo và cài thư viện:
   ```bash
   python -m venv .venv
   source .venv/bin/activate   # Windows: .venv\Scripts\Activate.ps1
   pip install pdfplumber pypdf openpyxl pydantic
   ```
2. Chạy toàn bộ quy trình bằng một lệnh:
   ```bash
   python chay_tat_ca.py
   ```
3. Mở tệp `Bao_Cao_PDF_Tong_Hop.xlsx` vừa tạo để xem 4 sheet (`Tong_Hop_Loi`, `Hoa_Don`, `Ung_Vien_CV`, `Hop_Dong`) cùng cảnh báo Đỏ (`hd_02` lệch 1.000.000 đ, `hop_dong_01` sắp hết hạn/có rủi ro) và Vàng (`hd_03_scan_anh.pdf`).
