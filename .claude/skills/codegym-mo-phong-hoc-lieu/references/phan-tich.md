# Giai đoạn 1: Phân tích đề cương → Excel

Mục tiêu: từ đề cương khóa học (ảnh chụp hoặc văn bản dán), chọn học liệu nào cần hoạt động mô phỏng và viết bản mô tả đủ rõ để người khác (hoặc tác nhân) làm được ngay, rồi xuất Excel cho người dùng duyệt.

## 1. Hiểu cấu trúc đề cương
- Module (chương, chữ đậm, có nút "Thêm Lesson") → Lesson (bài học, có nút "Thêm Activity") → Activity (học liệu, có biểu tượng và nhãn).
- Nhãn học liệu: "đã viết · N từ" = bài đọc; "N câu hỏi" = trắc nghiệm; "đã có nội dung" = hoạt động khác (bài tập nộp, thảo luận, phân tích, thực hành).
- Ghi lại tên NGUYÊN VĂN của chương, bài học, học liệu (đường dẫn thư mục và việc ghép mô phỏng sau này dựa vào đó).
- Nếu có khóa cũ để tham khảo trong repo, mở 1-2 file `index.html` đã làm để thấy phong cách.

## 2. Chọn học liệu
Ứng viên chính là BÀI ĐỌC. Giữ nguyên (không làm mô phỏng): trắc nghiệm, bài tập nộp, thảo luận, bài tóm tắt thuần túy, bài giới thiệu dự án, bài viết báo cáo.
- **Nên làm**: bài có quá trình chạy hoặc hiện tượng khó hình dung bằng chữ: dòng code chạy từng bước, bộ nhớ/đối tượng thay đổi, luồng exception, dịch chuyển phần tử, bộ đệm tệp, phân tích chuỗi...
- **Làm thêm nếu muốn**: có ích nhưng ý chính đã được bài khác truyền tải khá tốt.
- **Không cần**: lý thuyết/lịch sử, tóm tắt, hướng dẫn ra quyết định (mô phỏng sẽ thành câu đố), bài TRÙNG Ý với bài khác (ghi "đính kèm lại mô phỏng X"), nội dung lỗi thời (ví dụ BinaryFormatter).
- Đề cương thường lặp ý giữa các chương (ví dụ chương "nâng cao" lặp lại chương "cơ bản"): làm mô phỏng ở lần xuất hiện đầu, các lần sau ghi đính kèm lại; chỉ làm mới khi có góc nhìn khác hẳn.
- Hoạt động "đã có nội dung" chỉ đề xuất khi mô phỏng bổ trợ rõ (ghi chú "học liệu là hoạt động, mô phỏng đính kèm bổ trợ").
- Người dùng muốn Excel CHỈ chứa bài cần làm: bài "Không cần" chỉ nêu tóm tắt trong câu trả lời, không đưa vào Excel (trừ khi người dùng muốn xem).

## 3. Viết bản mô tả cho từng học liệu (đây là phần người dùng chấm kỹ: phải rõ ràng, chuyên nghiệp)
Mỗi dòng của analysis.json:
| Trường | Nội dung |
|---|---|
| goal | 1 câu: sau mô phỏng học viên thấy/hiểu điều gì |
| layout | "1 cột", "1 cột, 3 tab", "2 cột song song: A \| B" |
| visual | mô tả hình minh họa cụ thể: vẽ gì, tô màu gì, chuyển động gì (dùng thành phần trong thu-vien-hinh.json) |
| components | mã thành phần hình, ví dụ "H01, H03" |
| tabs | nhãn các tab, ngăn bằng " \| " |
| steps | mảng các bước, mỗi bước 1 câu cụ thể có dữ liệu thật ("Add(7) → lấp ô dự phòng, Count 4") |
| data | dữ liệu mẫu cố định |
| key | điểm chốt ở bước cuối (câu học viên cần nhớ) |
| notes | sự thật kỹ thuật cần giữ đúng: thông điệp lỗi nguyên văn, mã lỗi, khác biệt hệ điều hành, phiên bản .NET |
| remark | ghi chú cho người duyệt (giả định, nội dung cũ lỗi thời, đề xuất cập nhật học liệu) |
| type, level | "Bài đọc"/"Hoạt động (đã có nội dung)"; "Nên làm"/"Làm thêm nếu muốn"/"Không cần" |
| module, lesson, activity | số chương (từ 1) và tên nguyên văn |

Nguyên tắc nội dung mô phỏng (người dùng nhấn mạnh): thật đơn giản, một ý chính mỗi bài, 4-9 bước mỗi tab, chỉ bấm Bước tiếp. KHÔNG quiz, KHÔNG thử thách. Tab chỉ để đổi tình huống. Ưu tiên có hình minh họa đẹp (khóa đầu tiên chỉ có code + bộ nhớ, người dùng muốn đa dạng hơn).

Ví dụ một dòng tốt:
```json
{"module": 2, "lesson": "Cấu trúc try-catch cơ bản", "activity": "Giới thiệu về khối try-catch", "type": "Bài đọc", "level": "Nên làm",
 "goal": "Thấy đường đi của chương trình qua try-catch khi không lỗi và khi có lỗi.",
 "layout": "1 cột, 2 tab",
 "visual": "Sơ đồ luồng try → catch → sau khối; đường đi tô xanh khi bình thường, đỏ khi nhảy sang catch; dòng còn lại trong try bị bỏ qua hiện mờ.",
 "components": "H04, H03", "tabs": "Không lỗi (\"25\") | Có lỗi (\"abc\")",
 "steps": ["Không lỗi: vào try → Parse thành công → in \"Bạn 25 tuổi\" → bỏ qua catch → in \"Kết thúc\".",
           "Có lỗi: vào try → Parse ném FormatException.",
           "Dòng in tuổi còn lại trong try bị bỏ qua (mờ), nhảy vào catch.",
           "catch in \"Vui lòng nhập số\"; chương trình chạy tiếp, in \"Kết thúc\"."],
 "data": "\"25\" và \"abc\"",
 "key": "Lỗi trong try làm phần còn lại của try bị bỏ qua; catch chỉ chạy khi có lỗi; chương trình tiếp tục sau khối.",
 "notes": "Thông điệp .NET 8: The input string 'abc' was not in a correct format."}
```

## 4. Xuất Excel và báo cáo
```bash
python3 <SKILL>/scripts/excel_tools.py create --config <CFG> --rows <analysis.json>
```
Rồi trả lời người dùng ngắn gọn: bảng số bài theo chương (Nên làm / Làm thêm), các bài không làm và lý do (gom nhóm), nội dung lỗi thời phát hiện được, các giả định cần xác nhận. Chờ duyệt trước khi viết mô phỏng.
