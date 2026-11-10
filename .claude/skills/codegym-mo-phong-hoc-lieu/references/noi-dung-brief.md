# Hướng dẫn cho tác nhân viết bài đọc mới (ghép nội dung cũ + mô phỏng)

(Người điều phối điền `<SKILL>`, `<CFG>`, `<TOOLS>` và số nhóm khi giao việc.)

Mỗi bài bạn nhận có: nội dung cũ (`old_content`, văn bản thô lấy từ web, có thể rỗng) và một hoạt động mô phỏng đã làm xong. Nhiệm vụ: KIỂM TRA nội dung cũ rồi kết hợp hai đầu vào thành MỘT bài đọc hoàn chỉnh, chuẩn nhất, định dạng Markdown.

## Đầu vào
- `<TOOLS>/content/in/groupN.json`: `stt`, `chapter`, `lesson`, `activity` (tên bài), `old_content`, `sim_js` (file dữ liệu mô phỏng), `sim_tabs` ([key, nhãn]), `sim_title`, `sim_goal`, `iframe_url`.
  File có thể lớn: đọc từng bài bằng `python3 -c "import json;d=json.load(open('<file>',encoding='utf-8'));print(d[i]['old_content'])"` thay vì Read cả file. Bài nào cũng phải được đối chiếu với nội dung cũ của chính nó.
- BẮT BUỘC đọc bài mẫu đã được người dùng duyệt: `<SKILL>/references/bai-mau-noi-dung.md` (cấu trúc, giọng văn, độ dài, cách viết phần Hoạt động).
- Đọc `sim_js` để biết CHÍNH XÁC mô phỏng hiển thị gì (tên lớp/biến, từng tab, từng bước, số liệu, thông điệp lỗi, hình minh họa trong `viz:`). Phần Hoạt động phải khớp từng chi tiết.
- Sự thật kỹ thuật: `<SKILL>/references/csharp-facts.md`.

## Cấu trúc bài (đúng thứ tự)
1. `# <Tên bài>` (dùng `activity`).
2. `## Mục tiêu học tập`, dòng `Sau bài học này, bạn có thể:`, 3-5 gạch đầu dòng bắt đầu bằng động từ; gạch cuối nói về quan sát bằng hoạt động mô phỏng.
3. Nội dung chính: `##`, `###`; ý ngắn rõ; từ khóa in đậm; thuật ngữ tiếng Anh trong ngoặc ở lần đầu; code ```csharp; tên lớp/phương thức trong `backtick`; bảng Markdown khi so sánh.
4. `## Hoạt động: <tên ngắn>` (SAU phần khái niệm, TRƯỚC lợi ích/tóm tắt): 1 câu dẫn ("Mô phỏng dưới đây ... Hãy thao tác theo thứ tự sau, bấm **Bước tiếp** để chạy từng dòng:"), rồi mỗi tab một gạch "Mở tab **Nhãn tab**. <mô tả ngắn, đúng số liệu/kết quả, nêu cả thứ thấy trong hình minh họa>". Bài 2 cột nói rõ cột trái/phải. Nhãn tab có `*` thì viết `\*`.
5. Ngay sau danh sách, khối iframe đúng mẫu (KHÔNG có ngôn ngữ sau ```), `src` = `iframe_url`:
```
<iframe src="<iframe_url>" title="<tên bài hoặc sim_title>" style="border:0;" allowfullscreen></iframe>
```
6. Đoạn `Điều rút ra:` (1-3 câu).
7. (Tùy bài) `## Lợi ích` / phần mở rộng ngắn nếu nội dung cũ có và đáng giữ.
8. `## Tóm tắt` 4-6 gạch đầu dòng.

## Quy tắc kết hợp
- Kiểm tra nội dung cũ: sai kiến thức, ví dụ không biên dịch được hoặc output sai, thông điệp .NET Framework cũ, lỗi chính tả/dính chữ, đoạn nháp rối, lặp ý. Giữ ý đúng và có giá trị; sửa hoặc bỏ phần sai; viết theo .NET hiện đại.
- Bỏ "trong trang này/trang trước" (viết "bài này/bài trước"). Phần không liên quan tên bài hoặc quá dài: chỉ giữ trọng tâm. Độ dài đích 5.000-9.500 ký tự (ngắn hơn nếu nội dung vốn hẹp; không độn).
- ĐỒNG BỘ tên với mô phỏng: viết lại ví dụ theo tên lớp/biến/dữ liệu của mô phỏng để chữ và hoạt động khớp (kết quả trong chữ = kết quả mô phỏng).
- Nội dung lỗi thời/nguy hiểm (ví dụ BinaryFormatter): không dạy như cách nên dùng; viết theo hướng mô phỏng và thêm "Lưu ý" ngắn giải thích vì sao tránh. Không khẳng định chi tiết mà bạn không chắc (ví dụ tên exception cụ thể) — viết chung chung hoặc ghi vào điểm nghi ngờ.
- `old_content` rỗng: viết từ đầu dựa trên mô phỏng, ngắn gọn, đúng chủ đề.
- Rất basic, dễ hiểu. Tiếng Việt, giọng ấm, ngắn gọn, không emoji. "rồi bấm" viết thường. KHÔNG thêm quiz, bài tập, thử thách.
- Code C# biên dịch được: `using` đầy đủ, `public class Program` + `Main` khi cần in; kết quả mong đợi trong comment `// ...`; thụt lề 4 dấu cách.
- Không nhắc Excel, "nội dung cũ", "agent", file nội bộ. Không dán lại toàn bộ code mô phỏng.

## Đầu ra
- `<TOOLS>/content/out/<stt>.md`: Markdown thuần của bài. Không sửa file khác, không chạy git.
- Tự kiểm tra: `python3 <SKILL>/scripts/check_content.py --config <CFG>` (xem các dòng có stt của mình).
- Báo cáo ngắn: mỗi bài "stt | tiêu đề | số ký tự | đã lấy ý gì từ nội dung cũ, đã sửa lỗi gì, đã đổi ví dụ nào cho khớp mô phỏng". Cuối: điểm nghi ngờ.
