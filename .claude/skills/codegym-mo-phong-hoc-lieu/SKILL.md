---
name: codegym-mo-phong-hoc-lieu
description: Quy trình làm học liệu cho khóa học lập trình CodeGym (C#, OOP, OOAD, thuật toán...) gồm 3 giai đoạn - (1) phân tích đề cương khóa học để chọn học liệu cần hoạt động mô phỏng và xuất file Excel phân tích chi tiết, (2) viết các trang mô phỏng tương tác index.html (bấm Bước tiếp, có khung code, console, bộ nhớ, hình minh họa) đăng GitHub Pages, (3) ghép "nội dung cũ" trong Excel với hoạt động mô phỏng thành bài đọc Markdown hoàn chỉnh rồi chèn vào cột "nội dung mới". LUÔN dùng skill này khi người dùng gửi ảnh/đề cương "Trình xây dựng khóa học", nói "phân tích học liệu nào cần mô phỏng", "viết hoạt động mô phỏng", "làm file index mô phỏng", "ghép nội dung cũ", "viết lại bài đọc vào nội dung mới", "thêm iframe mô phỏng vào bài", hoặc nhắc tới khóa học mới cần làm học liệu tương tự các khóa giai-thuat-1, oop_ooad, c-sharp-ung-dung — kể cả khi họ chỉ yêu cầu một phần của quy trình.
---

# Làm học liệu: phân tích → mô phỏng → bài đọc mới

Người dùng là người thiết kế học liệu khóa lập trình ở CodeGym. Trả lời bằng tiếng Việt, ngắn gọn, giọng ấm, không emoji. Repo thường là `programming-course-demos` (mỗi khóa một thư mục, đẩy lên GitHub Pages `https://codegym-vn.github.io/programming-course-demos/`).

Quy trình có 3 giai đoạn, mỗi giai đoạn kết thúc bằng một điểm duyệt của người dùng. Người dùng có thể vào thẳng giai đoạn nào cũng được (ví dụ chỉ nhờ ghép nội dung cũ). Xác định họ đang ở đâu rồi làm tiếp.

```
Đề cương ──► [1] Excel phân tích ──duyệt──► [2] Mô phỏng index.html ──duyệt──► [3] Bài đọc mới trong Excel
```

## 0. Chuẩn bị (mỗi khóa một lần)
- Biến dùng trong tài liệu: `<SKILL>` = thư mục của skill này; `<COURSE>` = `<repo>/<thư mục khóa>`; `<TOOLS>` = `<COURSE>/_tools`; `<CFG>` = `<TOOLS>/course.json`.
- Tạo `<CFG>` (xem chú thích đầu `scripts/common.py`): bắt buộc `course_name`, `modules` (tên chương NGUYÊN VĂN theo thứ tự đề cương), `excel` (ví dụ `phan-tich-mo-phong-<slug-khoa>.xlsx`); tùy chọn `code_title` ("Mã nguồn C#"), `language` ("C#"). KHÔNG ghi `repo_root`/`course_dir`: script tự suy ra từ vị trí file, nhờ vậy cả nhóm dùng chung được khi commit `course.json` vào repo.
- Công cụ: `python3 -m pip install --user openpyxl` (nếu thiếu); `bash <SKILL>/scripts/setup_playwright.sh` (một lần, cho kiểm thử trang); `dotnet` nếu có thì dùng để biên dịch thử code trong bài đọc.
- Thư mục `<TOOLS>` chứa toàn bộ dữ liệu làm việc (lessons, specs, content, shots, backup) nên phiên sau làm tiếp được. Nhắc người dùng `_tools` sẽ lên GitHub Pages nếu đẩy cả thư mục; họ có thể thêm vào `.gitignore`.

## 1. Phân tích đề cương → Excel
Đọc `references/phan-tich.md` và làm theo. Kết quả: `analysis.json` (lưu ở `<TOOLS>`) → `python3 <SKILL>/scripts/excel_tools.py create --config <CFG> --rows <TOOLS>/analysis.json`.
- Excel chỉ chứa bài cần làm ("Nên làm", "Làm thêm nếu muốn"); bài không cần chỉ tóm tắt trong câu trả lời.
- Phần mô tả mô phỏng phải cực kỳ rõ ràng, chuyên nghiệp, có hình minh họa cụ thể (người dùng chấm kỹ phần này).
- Trả lời ngắn: bảng số bài theo chương, lý do loại các bài còn lại, nội dung lỗi thời, giả định cần xác nhận. Chờ duyệt.

## 2. Viết mô phỏng (index.html)
Mỗi bài là MỘT file HTML độc lập: khung có sẵn ở `assets/template.html` (engine snapshot, khung code + console + bộ nhớ + "Hình minh họa", chế độ tối, vừa điện thoại 390px). Chỉ cần viết file dữ liệu `.js` cho từng bài.
1. `python3 <SKILL>/scripts/excel_tools.py specs --config <CFG> --groups <n>` → `<TOOLS>/specs/groupN.json` (thêm `--pending` để chỉ lấy bài Chưa done).
2. Nếu người dùng muốn thử trước: tự làm 2-3 bài đại diện, cho họ xem, rồi mới làm hàng loạt. Nếu họ bảo làm hết thì giao luôn.
3. Giao song song cho tác nhân (mỗi tác nhân 6-8 bài, model Sonnet là đủ vì thiết kế đã có trong spec). Prompt cho tác nhân: "Đọc `<SKILL>/references/mo-phong-brief.md` và làm đúng theo đó, với SKILL=..., CFG=..., TOOLS=...; nhóm của bạn: `<TOOLS>/specs/groupN.json`".
4. Khi tất cả xong: build lại toàn bộ (`build.py --config <CFG>`), chạy `node <SKILL>/scripts/check_pages.js --quiet --shots <TOOLS>/shots <mọi index.html>` phải ra ALL OK, rồi TỰ XEM ẢNH vài bài đại diện mỗi chương (Read ảnh 390px). Đọc kỹ báo cáo của tác nhân: các "điểm nghi ngờ" và sửa những gì sai sự thật.
5. `python3 <SKILL>/scripts/excel_tools.py status --config <CFG>` cập nhật cột Trạng thái (Done / Chưa done). Trả lời ngắn: số bài theo chương, đường dẫn, điểm người dùng nên xem.

Nếu tác nhân đề xuất sửa khung chung (template.html): sửa ở `assets/template.html` một lần, build lại tất cả, kiểm thử lại tất cả.

## 3. Bài đọc mới (ghép nội dung cũ + mô phỏng)
Người dùng dán bài đọc hiện có vào cột "Nội dung cũ" của Excel. Kiểm tra trước: dòng nào thiếu nội dung cũ, nội dung cũ có khớp tên bài không, người dùng đã xóa dòng nào (nói lại cho họ).
1. `python3 <SKILL>/scripts/excel_tools.py content --config <CFG> --groups <n>` → `<TOOLS>/content/in/groupN.json` (kèm đường dẫn file mô phỏng, link iframe, các tab).
2. Lần đầu với một khóa (hoặc khi người dùng yêu cầu): làm 1 bài mẫu, chèn vào Excel, báo bài nào để họ duyệt. Đã có mẫu duyệt rồi thì làm hết.
3. Giao song song cho tác nhân: "Đọc `<SKILL>/references/noi-dung-brief.md` và làm đúng theo đó, với SKILL=..., CFG=..., TOOLS=...; nhóm: `<TOOLS>/content/in/groupN.json`". Nhắc tác nhân đọc nội dung cũ của TỪNG bài (từng có tác nhân chỉ đọc được vài bài đầu do file lớn rồi viết phần còn lại không đối chiếu — kiểm tra báo cáo, phát hiện thì yêu cầu làm lại).
4. Kiểm tra: `python3 <SKILL>/scripts/check_content.py --config <CFG> --fix-iframe` (lỗi hay gặp: iframe không bọc trong ```), `python3 <SKILL>/scripts/compile_check.py --config <CFG>` nếu có dotnet (đọc từng lỗi: đoạn trích hợp lý hay lỗi thật). Đọc lướt phần Hoạt động của vài bài.
5. `python3 <SKILL>/scripts/excel_tools.py insert --config <CFG>` (tự sao lưu, chỉ điền ô trống; `--overwrite` khi người dùng muốn viết lại).
6. Định dạng là Markdown theo mẫu người dùng gửi (tiêu đề `#`, khối iframe nằm trong ```). Nếu người dùng dán vào web mà thấy nguyên ký hiệu `#`, `-`: dùng `scripts/md2html.py` để tạo bản HTML — nhưng chỉ khi họ yêu cầu (đã từng có lần họ bảo bỏ bản HTML, giữ Markdown).

## Những điều người dùng quan tâm (rút ra từ các khóa trước)
- Mô phỏng: thật đơn giản, mỗi bài một ý, chỉ quan sát và bấm từng bước, không quiz/thử thách; có hình minh họa đẹp, đa dạng; chạy tốt trên điện thoại; số liệu tính bằng code thật; sự thật C# đúng (xem `references/csharp-facts.md`).
- Excel là nơi theo dõi chính: cột Trạng thái phải cập nhật sau khi làm; không làm mất ý kiến/nội dung người dùng đã nhập (scripts chỉ sửa cột cần sửa, luôn sao lưu trước; nhắc đóng Excel nếu đang mở).
- Tiết kiệm token: chia việc cho tác nhân Sonnet với hướng dẫn ngắn gọn; người điều phối tập trung kiểm tra, không làm lại việc của tác nhân.
- Báo cáo trung thực: nói rõ phần nào đã kiểm bằng máy, phần nào chưa xem bằng mắt, giả định nào cần người dùng xác nhận.

## Tài nguyên
| Tệp | Dùng khi |
|---|---|
| `references/phan-tich.md` | Giai đoạn 1: tiêu chí chọn bài, cách viết mô tả, định dạng analysis.json |
| `references/mo-phong-brief.md` | Giai đoạn 2: hướng dẫn giao cho tác nhân viết mô phỏng (API snap, thư viện hình, kiểm thử) |
| `references/noi-dung-brief.md` | Giai đoạn 3: hướng dẫn giao cho tác nhân viết bài đọc |
| `references/bai-mau-noi-dung.md` | Bài đọc mẫu đã được duyệt |
| `references/csharp-facts.md` | Thông điệp lỗi, hành vi .NET cần giữ đúng |
| `references/cpp-facts.md` | Sự thật C++ (khác C#: tràn số, chia 0, cout 6 chữ số, switch...) |
| `scripts/render_image.js` | Vẽ hình minh họa cho bài đọc: HTML (#art) → PNG đặt cạnh trang mô phỏng |
| `references/thu-vien-hinh.json` | Danh mục 24 thành phần hình minh họa (mã H01-H24) |
| `assets/mau-phan-tich-mo-phong.xlsx` | File Excel mẫu (2 dòng ví dụ thật + sheet Huong dan) để giới thiệu cho người dùng mới |
| `assets/template.html`, `assets/base.css` | Khung trang mô phỏng (engine + thư viện hình) |
| `assets/examples/*.js` | Bài mẫu: nhiều tab, 2 cột, có hình, OOP |
| `scripts/build.py` | Ghép .js → index.html |
| `scripts/check_pages.js` | Kiểm thử trang (Playwright) |
| `scripts/excel_tools.py` | create / status / specs / content / insert |
| `scripts/check_content.py`, `scripts/compile_check.py` | Kiểm tra bài đọc mới |
| `scripts/md2html.py` | Đổi bài đọc Markdown sang HTML khi cần |

## Ghi chú thêm (khóa C++ Nhập môn, 11/2026)
- Excel có thể do người khác chuẩn bị, đường dẫn khác quy tắc slug: dùng META `"path"` (tương đối so với thư mục khóa) để giữ đúng cấu trúc thư mục của Excel, và sửa cột Đường dẫn/Link cho khớp thư mục thật.
- Khung có thêm: console giả lập (`c.write`, `c.input`, `snap({wait:true})`), dòng không chạy (`snap({dim:[...]})`), bố cục `var LAYOUT='side'`, và các hình `vBoxes`, `vTrace`, `vFlowchart`, `vCycle`, `vSwitch`, `vBytes`, `vRange` (xem chú thích trong template).
- "Nội dung mới" khi người dùng yêu cầu giữ khung bài cũ: giữ mục/giọng văn bài cũ, sửa lỗi, chèn hình `![mô tả](link GitHub Pages đầy đủ)` và một mục nhỏ mô phỏng (không kể lại ví dụ, chỉ nêu điều mô phỏng cho thấy thêm) + iframe. Có thể giao mỗi tác nhân làm trọn một bài (mô phỏng → hình → nội dung), xem mẫu `_tools/BRIEF-cpp.md` của khóa C++.
