# Mini-BI Dashboard Doanh số & Khách hàng (Streamlit)

Ứng dụng mẫu chuẩn cho khoá học **Biến File Excel thành Web Dashboard Chia sẻ được với Streamlit** (Khoá 54 — Học Python).

## Tính năng chính
1. **Upload linh hoạt & Dữ liệu mẫu:** Kéo thả tệp `.xlsx`/`.csv` bất kỳ; tự dùng `don_hang_mau.xlsx` khi chưa chọn tệp và kiểm tra 6 cột bắt buộc (`ma_don`, `ngay_dat`, `chi_nhanh`, `so_luong`, `thanh_tien`, `trang_thai`).
2. **Làm sạch dữ liệu Việt Nam:** Khử trùng `ma_don`, parse ngày hai lượt (`%d/%m/%Y` rồi `%Y-%m-%d`), chuẩn hoá tên chi nhánh (`Hà Nội`, `Đà Nẵng`, `TP.HCM`), lọc bỏ số lượng lỗi và tách đơn `Đã huỷ`.
3. **Bộ lọc Sidebar & Bố cục 3 Tab:** Lọc theo khoảng ngày, chi nhánh, nhóm hàng; nút Đặt lại qua `on_click`; phòng thủ tập lọc rỗng (`df_loc.empty`); tối ưu đọc/làm sạch bằng `@st.cache_data`.
4. **Trực quan hoá & Xuất Excel:** Biểu đồ đường/cột Plotly Express, phân nhóm khách hàng RFM (`VIP`, `Thân thiết`, `Cần chăm lại`, `Khách mới`) và tải về tệp `.xlsx` 3 sheet (`TongQuan`, `DonSach`, `KhachHang_RFM`) qua `io.BytesIO`.
5. **Cổng mật khẩu nội bộ:** Bảo vệ bằng `st.secrets["APP_PASSWORD"]` (tuỳ chọn) và `.gitignore` chặn lộ thông tin mật.

## Hướng dẫn đồng nghiệp sử dụng (3 bước)
1. Mở đường link Web Dashboard, nhập mật khẩu được cấp (nếu trang có khoá mật khẩu).
2. Chọn tệp báo cáo tuần/tháng mới từ máy tính vào ô upload phía trên (hoặc xem trực tiếp trên dữ liệu mẫu), rồi dùng thanh lọc bên trái để thu hẹp chi nhánh/khoảng ngày.
3. Xem tổng quan ở Tab 1, danh sách chăm sóc khách hàng RFM ở Tab 2, và bấm **Tải xuống báo cáo Excel sạch (.xlsx)** ở Tab 3 để lưu về máy.

## Chạy thử trên máy cá nhân
```bash
pip install -r requirements.txt
streamlit run app.py
```
