# Danh sách mô phỏng và hình ảnh theo từng bài — khóa Nhập môn Lập trình C++

Dùng để nhờ AI hoàn thiện nội dung bài đọc: mỗi bài có 1 link mô phỏng (nhúng bằng iframe) và các hình minh họa (chèn bằng Markdown). Link chạy được sau khi đẩy thư mục lên GitHub Pages.

Quy ước chèn vào bài:
- Mô phỏng: khối bọc trong ``` gồm đúng 1 dòng `<iframe src="LINK_MÔ_PHỎNG" title="TIÊU_ĐỀ" style="border:0;" allowfullscreen></iframe>`.
- Hình: `![mô tả](LINK_HÌNH)` đặt ngay tại đoạn mà hình minh họa (cột "Gợi ý vị trí").


## Module 1. Làm quen với C++ và tư duy thuật toán

### STT 1 — Giới Thiệu Về Ngôn Ngữ Lập Trình C++
- Bài học: Bài 1.1. Giới thiệu C++ và môi trường lập trình
- Mô phỏng (Vì sao C++ chạy nhanh?): https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/lam-quen-voi-cpp-va-tu-duy-thuat-toan/gioi-thieu-cpp-va-moi-truong-lap-trinh/gioi-thieu-ve-ngon-ngu-lap-trinh-cpp/
- Hình 1: Dòng thời gian các cột mốc của C++ từ 1979 đến 2023
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/lam-quen-voi-cpp-va-tu-duy-thuat-toan/gioi-thieu-cpp-va-moi-truong-lap-trinh/gioi-thieu-ve-ngon-ngu-lap-trinh-cpp/hinh/lich-su-cpp.png
  - Gợi ý vị trí: mục "3.2. Các Cột Mốc Phiên Bản (Chuẩn ISO)"
- Hình 2: Các lĩnh vực ứng dụng của C++: game, hệ điều hành và trình duyệt, đồ họa, hệ thống nhúng, tài chính, trí tuệ nhân tạo
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/lam-quen-voi-cpp-va-tu-duy-thuat-toan/gioi-thieu-cpp-va-moi-truong-lap-trinh/gioi-thieu-ve-ngon-ngu-lap-trinh-cpp/hinh/cpp-trong-doi-song.png
  - Gợi ý vị trí: mục "4. C++ Đang "Thống Trị" Ở Đâu? — Ứng Dụng Thực Tế"

### STT 2 — Cài Đặt Môi Trường Lập Trình C++ Với VS Code
- Bài học: Bài 1.1. Giới thiệu C++ và môi trường lập trình
- Mô phỏng (Phía sau nút Play và lỗi PATH): https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/lam-quen-voi-cpp-va-tu-duy-thuat-toan/gioi-thieu-cpp-va-moi-truong-lap-trinh/cai-dat-moi-truong-lap-trinh-cpp-voi-vs-code/
- Hình 1: VS Code là vỏ xe (trình soạn thảo), MinGW g++ là động cơ (trình biên dịch)
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/lam-quen-voi-cpp-va-tu-duy-thuat-toan/gioi-thieu-cpp-va-moi-truong-lap-trinh/cai-dat-moi-truong-lap-trinh-cpp-voi-vs-code/hinh/vo-xe-va-dong-co.png
  - Gợi ý vị trí: mục "2. Tại Sao Chọn VS Code?"
- Hình 2: Lộ trình cài đặt môi trường C++ gồm sáu bước
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/lam-quen-voi-cpp-va-tu-duy-thuat-toan/gioi-thieu-cpp-va-moi-truong-lap-trinh/cai-dat-moi-truong-lap-trinh-cpp-voi-vs-code/hinh/lo-trinh-cai-dat.png
  - Gợi ý vị trí: mục "2. Tại Sao Chọn VS Code?"

### STT 3 — Cấu Trúc Cơ Bản Của Một Chương Trình C++
- Bài học: Bài 1.2. Chương trình C++ đầu tiên
- Mô phỏng (Chương trình C++ chạy như thế nào?): https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/lam-quen-voi-cpp-va-tu-duy-thuat-toan/chuong-trinh-cpp-dau-tien/cau-truc-co-ban-cua-mot-chuong-trinh-cpp/
- Hình 1: Giải phẫu một chương trình C++: năm phần của bộ khung
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/lam-quen-voi-cpp-va-tu-duy-thuat-toan/chuong-trinh-cpp-dau-tien/cau-truc-co-ban-cua-mot-chuong-trinh-cpp/hinh/giai-phau-chuong-trinh.png
  - Gợi ý vị trí: mục "include <iostream>   // 1. Thư viện"
- Hình 2: Hướng đi của dữ liệu: cout << đưa dữ liệu ra màn hình, cin >> đưa dữ liệu từ bàn phím vào biến
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/lam-quen-voi-cpp-va-tu-duy-thuat-toan/chuong-trinh-cpp-dau-tien/cau-truc-co-ban-cua-mot-chuong-trinh-cpp/hinh/dong-chay-cout-cin.png
  - Gợi ý vị trí: mục "4.2. Giao Tiếp Với Máy Tính: cout Và cin"

### STT 4 — Mã Giả & Lưu Đồ Thuật Toán
- Bài học: Bài 1.3. Mã giả và lưu đồ thuật toán
- Mô phỏng (Chạy theo lưu đồ): https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/lam-quen-voi-cpp-va-tu-duy-thuat-toan/ma-gia-va-luu-do-thuat-toan/ma-gia-luu-do-thuat-toan/
- Hình 1: Bốn hình khối chuẩn của lưu đồ: oval, bình hành, chữ nhật, thoi
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/lam-quen-voi-cpp-va-tu-duy-thuat-toan/ma-gia-va-luu-do-thuat-toan/ma-gia-luu-do-thuat-toan/hinh/ky-hieu-luu-do.png
  - Gợi ý vị trí: mục "4.3. Các Ký Hiệu Chuẩn Trong Lưu Đồ"
- Hình 2: Lưu đồ tính tổng từ 1 đến n có vòng lặp, mũi tên quay lại hình thoi
  - Link: https://learn.codegym.vn/tenancy/assets/RExYXCjMnUEQJS2O4m0GjdjoPrDayWbkx2qdDEN0.png  (hình gốc trên CodeGym Learn)
  - Gợi ý vị trí: mục "Ví dụ 1: Bài toán tính tổng từ 1 đến n (có vòng lặp)"
- Hình 3: Lưu đồ tính tiền táo theo cấu trúc tuần tự
  - Link: https://learn.codegym.vn/tenancy/assets/k9CNETMX7yBlVtgA7IjSMvFoccOZirCK6hvzlQaP.png  (hình gốc trên CodeGym Learn)
  - Gợi ý vị trí: mục "Ví dụ 2: Tính tiền đi siêu thị (cấu trúc tuần tự)"
- Hình 4: Lưu đồ kiểm tra Đậu hay Rớt theo cấu trúc rẽ nhánh
  - Link: https://learn.codegym.vn/tenancy/assets/H2ReupLuEIUgPOgSBqwVSZ2N6rdffvQUWi0WK4d6.png  (hình gốc trên CodeGym Learn)
  - Gợi ý vị trí: mục "Ví dụ 3: Kiểm tra Đậu hay Rớt (cấu trúc rẽ nhánh)"
- Hình 5: Lưu đồ đếm số bài kiểm tra theo cấu trúc lặp
  - Link: https://learn.codegym.vn/tenancy/assets/LsXqEo0JGwXsbyQBJO3LTGq2yOcEVGmfmIHplXrr.png  (hình gốc trên CodeGym Learn)
  - Gợi ý vị trí: mục "Ví dụ 4: Đếm số học sinh nộp bài (cấu trúc lặp)"


## Module 2. Biến, kiểu dữ liệu và toán tử

### STT 5 — Giới Thiệu Biến Trong C++
- Bài học: Bài 2.1. Biến và kiểu dữ liệu cơ bản
- Mô phỏng (Biến trong bộ nhớ): https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/bien-kieu-du-lieu-va-toan-tu/bien-va-kieu-du-lieu-co-ban/gioi-thieu-bien-trong-cpp/
- Hình 1: Ba yếu tố của một biến: kiểu, tên và giá trị trong câu lệnh int tuoi = 18
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/bien-kieu-du-lieu-va-toan-tu/bien-va-kieu-du-lieu-co-ban/gioi-thieu-bien-trong-cpp/hinh/giai-phau-khai-bao-bien.png
  - Gợi ý vị trí: mục "4.2. Cách Tạo Ra Một Biến — Khai Báo"
- Hình 2: Quy tắc đặt tên biến: ba ví dụ đúng và ba ví dụ sai
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/bien-kieu-du-lieu-va-toan-tu/bien-va-kieu-du-lieu-co-ban/gioi-thieu-bien-trong-cpp/hinh/quy-tac-dat-ten-bien.png
  - Gợi ý vị trí: mục "4.3. Quy Tắc Đặt Tên Biến"

### STT 6 — Kiểu Dữ Liệu Cơ Bản Trong C++
- Bài học: Bài 2.1. Biến và kiểu dữ liệu cơ bản
- Mô phỏng (Chọn sai kiểu thì chuyện gì xảy ra?): https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/bien-kieu-du-lieu-va-toan-tu/bien-va-kieu-du-lieu-co-ban/kieu-du-lieu-co-ban-trong-cpp/
- Hình 1: Chọn kiểu theo loại dữ liệu: int, long long, double, char, string, bool
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/bien-kieu-du-lieu-va-toan-tu/bien-va-kieu-du-lieu-co-ban/kieu-du-lieu-co-ban-trong-cpp/hinh/chon-kieu-theo-du-lieu.png
  - Gợi ý vị trí: mục "4. Giải Thích"

### STT 7 — Hằng Số Trong C++
- Bài học: Bài 2.2. Hằng số
- Mô phỏng (#define và const khác nhau thế nào?): https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/bien-kieu-du-lieu-va-toan-tu/hang-so/hang-so-trong-cpp/
- Hình 1: Ai xử lý #define, ai xử lý const: #define làm việc ở bước tiền xử lý, const làm việc ở bước biên dịch
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/bien-kieu-du-lieu-va-toan-tu/hang-so/hang-so-trong-cpp/hinh/tien-xu-ly-va-bien-dich.png
  - Gợi ý vị trí: mục "define MAX_SIZE 100"

### STT 8 — Toán Tử Trong C++
- Bài học: Bài 2.3. Toán tử và biểu thức
- Mô phỏng (Các toán tử dễ nhầm trong C++): https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/bien-kieu-du-lieu-va-toan-tu/toan-tu-va-bieu-thuc/toan-tu-trong-cpp/
- Hình 1: Năm nhóm toán tử trong C++: số học, gán, so sánh, logic, tăng giảm
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/bien-kieu-du-lieu-va-toan-tu/toan-tu-va-bieu-thuc/toan-tu-trong-cpp/hinh/nhom-toan-tu.png
  - Gợi ý vị trí: mục "4. Giải Thích"
- Hình 2: Bảng chân trị của &&, || và ! với đủ bốn trường hợp của hai công tắc
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/bien-kieu-du-lieu-va-toan-tu/toan-tu-va-bieu-thuc/toan-tu-trong-cpp/hinh/bang-chan-tri.png
  - Gợi ý vị trí: mục "4.4. Nhóm 4: Toán Tử Logic (Logical)"


## Module 3. Cấu trúc điều kiện

### STT 9 — Giới Thiệu Cấu Trúc Điều Kiện
- Bài học: Bài 3.1. Tổng quan và câu lệnh if
- Mô phỏng (Chương trình rẽ nhánh theo điều kiện): https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/cau-truc-dieu-kien/tong-quan-va-cau-lenh-if/gioi-thieu-cau-truc-dieu-kien/
- Hình 1: Năm công cụ điều kiện sẽ học trong C++: if, if...else, if...else if...else, switch case và toán tử ba ngôi
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/cau-truc-dieu-kien/tong-quan-va-cau-lenh-if/gioi-thieu-cau-truc-dieu-kien/hinh/cong-cu-dieu-kien.png
  - Gợi ý vị trí: mục "4.4. Các Loại "Vũ Khí" Điều Kiện Trong C++"

### STT 10 — Câu Lệnh If Trong C++
- Bài học: Bài 3.1. Tổng quan và câu lệnh if
- Mô phỏng (Câu lệnh if chạy như thế nào?): https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/cau-truc-dieu-kien/tong-quan-va-cau-lenh-if/cau-lenh-if-trong-cpp/
- Hình 1: Các phần của if...else: từ khóa và điều kiện, khối lệnh của if, else, khối lệnh của else
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/cau-truc-dieu-kien/tong-quan-va-cau-lenh-if/cau-lenh-if-trong-cpp/hinh/cu-phap-if-else.png
  - Gợi ý vị trí: mục "4.2. Cấu Trúc if...else (Nếu... Ngược Lại...)"

### STT 11 — Câu Lệnh If Lồng Nhau Nested If
- Bài học: Bài 3.3. If lồng nhau
- Mô phỏng (If lồng nhau và lỗi dangling else): https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/cau-truc-dieu-kien/if-long-nhau/cau-lenh-if-long-nhau-nested-if/
- Hình 1: So sánh if bậc thang và if lồng nhau: một giá trị chia khoảng, hay hai điều kiện phụ thuộc nhau
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/cau-truc-dieu-kien/if-long-nhau/cau-lenh-if-long-nhau-nested-if/hinh/bac-thang-va-long-nhau.png
  - Gợi ý vị trí: mục "4.2. Phân Biệt If Lồng Nhau Và If Bậc Thang"

### STT 12 — Câu Lệnh If Bậc Thang if...else if...else
- Bài học: Bài 3.4. If bậc thang (if...else if...else)
- Mô phỏng (If bậc thang: dừng ở bậc đúng đầu tiên): https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/cau-truc-dieu-kien/if-bac-thang-if-else-if-else/cau-lenh-if-bac-thang-if-else-if-else/
- Hình 1: Điều kiện lỏng diem >= 5.0 bao trọn điều kiện chặt diem >= 8.0: điểm 9 thỏa cả hai, điều kiện đứng trên sẽ thắng
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/cau-truc-dieu-kien/if-bac-thang-if-else-if-else/cau-lenh-if-bac-thang-if-else-if-else/hinh/dieu-kien-long-bao-chat.png
  - Gợi ý vị trí: mục "4.2. Nguyên Tắc Vàng: Thứ Tự Kiểm Tra Quyết Định Kết Quả"
- Hình 2: Thang điểm 0 đến 10 chia thành 4 khoảng, mỗi khoảng ứng với một cửa của if bậc thang
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/cau-truc-dieu-kien/if-bac-thang-if-else-if-else/cau-lenh-if-bac-thang-if-else-if-else/hinh/thang-diem-bac-thang.png
  - Gợi ý vị trí: mục "Ví dụ 1: Xếp loại học lực theo điểm số (Mục tiêu: nắm cú pháp if bậc thang)"

### STT 13 — Toán Tử Điều Kiện (Ternary Operator)
- Bài học: Bài 3.5. Toán tử ba ngôi (Ternary)
- Mô phỏng (if...else và toán tử ?: cạnh nhau): https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/cau-truc-dieu-kien/toan-tu-ba-ngoi-ternary/toan-tu-dieu-kien-ternary-operator/
- Hình 1: Ba phần của toán tử ?: điều kiện, giá trị nếu đúng, giá trị nếu sai, đặt cạnh khối if...else tương ứng
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/cau-truc-dieu-kien/toan-tu-ba-ngoi-ternary/toan-tu-dieu-kien-ternary-operator/hinh/ba-phan-toan-tu-3-ngoi.png
  - Gợi ý vị trí: mục "4.1. Cú Pháp Toán Tử 3 Ngôi"

### STT 14 — Câu Lệnh điều kiện Switch Case
- Bài học: Bài 3.6. Câu lệnh switch case
- Mô phỏng (switch nhảy thẳng tới case khớp): https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/cau-truc-dieu-kien/cau-lenh-switch-case/cau-lenh-dieu-kien-switch-case/
- Hình 1: So sánh cách hình dung: if...else if hỏi lần lượt từng câu, switch nhảy thẳng tới case khớp
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/cau-truc-dieu-kien/cau-lenh-switch-case/cau-lenh-dieu-kien-switch-case/hinh/switch-nhay-thang-va-if-tuan-tu.png
  - Gợi ý vị trí: mục "4.1. Cú Pháp Cơ Bản"


## Module 4. Vòng lặp

### STT 15 — Giới Thiệu Về Vòng Lặp
- Bài học: Bài 4.1. Giới thiệu vòng lặp và vòng lặp for
- Mô phỏng (So sánh for, while và do...while): https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/vong-lap/gioi-thieu-vong-lap-va-vong-lap-for/gioi-thieu-ve-vong-lap/
- Hình 1: Sơ đồ chọn vòng lặp: biết trước số lần thì dùng for; không biết thì xét tiếp có cần chạy ít nhất 1 lần hay không
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/vong-lap/gioi-thieu-vong-lap-va-vong-lap-for/gioi-thieu-ve-vong-lap/hinh/chon-vong-lap.png
  - Gợi ý vị trí: mục "4.3. Bảng So Sánh Nhanh"

### STT 16 — Vòng Lặp For
- Bài học: Bài 4.1. Giới thiệu vòng lặp và vòng lặp for
- Mô phỏng (Vòng lặp for chạy theo thứ tự nào?): https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/vong-lap/gioi-thieu-vong-lap-va-vong-lap-for/vong-lap-for/
- Hình 1: Sơ đồ luồng hoạt động của vòng lặp for
  - Link: https://learn.codegym.vn/tenancy/assets/kOXvKqMxCVOmKSwBN1wNNLTktUhr391U1MN1rnKF.png  (hình gốc trên CodeGym Learn)
  - Gợi ý vị trí: mục "4.2. Luồng Hoạt Động — Cách Máy Tính Chạy"

### STT 17 — Từ Khóa Đặc Biệt: Break Và Continue
- Bài học: Bài 4.2. break và continue
- Mô phỏng (break dừng hẳn, continue bỏ lượt): https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/vong-lap/break-va-continue/tu-khoa-dac-biet-break-va-continue/
- Hình 1: So sánh break và continue trên cùng một dãy số
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/vong-lap/break-va-continue/tu-khoa-dac-biet-break-va-continue/hinh/so-sanh-break-continue.png
  - Gợi ý vị trí: mục "4.3. Bảng So Sánh"

### STT 18 — Vòng Lặp While
- Bài học: Bài 4.4. Vòng lặp while
- Mô phỏng (while: người gác cổng kiểm tra trước): https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/vong-lap/vong-lap-while/vong-lap-while/
- Hình 1: Quy tắc 3 bước của while và vị trí khởi tạo, điều kiện, cập nhật
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/vong-lap/vong-lap-while/vong-lap-while/hinh/quy-tac-3-buoc-while.png
  - Gợi ý vị trí: mục "4.1. Cú Pháp"

### STT 19 — Vòng Lặp Do...While
- Bài học: Bài 4.5. Vòng lặp do...while
- Mô phỏng (while và do...while chạy khác nhau thế nào?): https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/vong-lap/vong-lap-do-while/vong-lap-do-while/
- Hình 1: Cú pháp do...while và dấu chấm phẩy bắt buộc ở cuối
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/vong-lap/vong-lap-do-while/vong-lap-do-while/hinh/cu-phap-do-while.png
  - Gợi ý vị trí: mục "4.1. Cú Pháp"

### STT 20 — Lỗi Thường Gặp Khi Dùng Vòng Lặp
- Bài học: Bài 4.6. Tổng hợp và luyện tập vòng lặp
- Mô phỏng (Bốn thẻ lỗi thường gặp ở vòng lặp): https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/vong-lap/tong-hop-va-luyen-tap-vong-lap/loi-thuong-gap-khi-dung-vong-lap/
- Hình 1: Ba nhóm lỗi thường gặp ở vòng lặp: nguyên nhân, dạng hay gặp và cách kiểm tra
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/vong-lap/tong-hop-va-luyen-tap-vong-lap/loi-thuong-gap-khi-dung-vong-lap/hinh/ba-nhom-loi-vong-lap.png
  - Gợi ý vị trí: mục "4. Giải Thích"


## Module 5. Bài tập cuối khoá và dự án thực tế

### STT 21 — Đề bài dự án “Máy tính tiền cửa hàng mini” và tiêu chí chấm
- Bài học: Bài 5.2. Dự án: Phân tích yêu cầu và thiết kế
- Mô phỏng (Chương trình mẫu: máy tính tiền cửa hàng mini): https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/bai-tap-cuoi-khoa-va-du-an-thuc-te/du-an-phan-tich-yeu-cau-va-thiet-ke/de-bai-du-an-may-tinh-tien-cua-hang-mini-va-tieu-chi-cham/
- Hình 1: Thứ tự tính tiền trên hoá đơn: thành tiền, tổng tiền hàng, giảm giá, VAT, thanh toán
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/bai-tap-cuoi-khoa-va-du-an-thuc-te/du-an-phan-tich-yeu-cau-va-thiet-ke/de-bai-du-an-may-tinh-tien-cua-hang-mini-va-tieu-chi-cham/hinh/thu-tu-tinh-tien.png
  - Gợi ý vị trí: mục "Chức năng 1 — Tạo hoá đơn mới"
- Hình 2: Bản đồ nối từng yêu cầu của dự án với kỹ thuật đã học
  - Link: https://codegym-vn.github.io/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic/bai-tap-cuoi-khoa-va-du-an-thuc-te/du-an-phan-tich-yeu-cau-va-thiet-ke/de-bai-du-an-may-tinh-tien-cua-hang-mini-va-tieu-chi-cham/hinh/ban-do-ky-thuat-du-an.png
  - Gợi ý vị trí: mục "Yêu cầu kỹ thuật bắt buộc"
