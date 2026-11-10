# Skill: codegym-mo-phong-hoc-lieu

Quy trình làm học liệu cho khóa lập trình CodeGym bằng Claude Code:
1. Phân tích đề cương → file Excel chọn bài cần hoạt động mô phỏng (có mô tả chi tiết, hình minh họa).
2. Viết các trang mô phỏng tương tác `index.html` (đăng GitHub Pages, nhúng vào bài bằng iframe).
3. Ghép "Nội dung cũ" trong Excel với mô phỏng → bài đọc Markdown hoàn chỉnh ở cột "Nội dung mới".

## Cài đặt (mỗi máy một lần)
1. Cài Claude Code, Python 3, Node.js. (Tùy chọn: .NET SDK để biên dịch thử code trong bài đọc.)
2. `python3 -m pip install --user openpyxl`
3. `bash <thư mục skill>/scripts/setup_playwright.sh` (công cụ kiểm thử trang mô phỏng).
4. Đặt skill vào một trong hai chỗ:
   - Trong repo `programming-course-demos`: `.claude/skills/codegym-mo-phong-hoc-lieu/` (cả nhóm tự có khi `git pull`).
   - Hoặc máy cá nhân: `~/.claude/skills/codegym-mo-phong-hoc-lieu/`.

## Cách dùng
Mở Claude Code trong thư mục repo rồi nói, ví dụ:
- "Phân tích khóa học này xem học liệu nào cần hoạt động mô phỏng" (dán đề cương hoặc gửi ảnh) — tạo thư mục khóa và file Excel.
- "Viết toàn bộ các file index mô phỏng" — sau khi đã duyệt Excel.
- "Tôi đã dán nội dung cũ vào Excel, viết lại bài đọc vào cột nội dung mới".
Hoặc gõ `/codegym-mo-phong-hoc-lieu`.

## Làm việc theo nhóm
- Mỗi khóa có `<khóa>/_tools/course.json` và dữ liệu làm việc trong `<khóa>/_tools/` (bài .js, đầu vào cho tác nhân, ảnh kiểm thử, bản sao lưu Excel). Commit thư mục này để người khác làm tiếp được.
- Mỗi người nên nhận các khóa khác nhau (hoặc các chương khác nhau) để không cùng sửa một file Excel.
- File Excel là nơi theo dõi: cột Trạng thái (Done/Chưa done), cột Duyệt (OK/Sửa/Bỏ), Nội dung cũ, Nội dung mới. Đóng Excel trước khi nhờ Claude ghi vào file.

## File Excel mẫu
`assets/mau-phan-tich-mo-phong.xlsx`: 2 bài ví dụ đã làm xong (khóa C# Ứng dụng) và sheet "Huong dan" chỉ rõ cột nào bạn điền (màu vàng: Duyệt, Ý kiến, Nội dung cũ), cột nào Claude điền.
