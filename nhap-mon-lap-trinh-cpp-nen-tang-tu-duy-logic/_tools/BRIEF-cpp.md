# Làm trọn học liệu cho khóa "Nhập môn Lập trình C++: Nền tảng & Tư duy Logic"

Với MỖI bài trong nhóm được giao, bạn làm 3 việc theo thứ tự: (A) mô phỏng tương tác, (B) 1-2 hình minh họa cho bài đọc, (C) nội dung mới của bài đọc. Bài STT 3 đã làm xong và được dùng làm MẪU CHUẨN cho cả 3 việc — đọc kỹ trước khi bắt đầu.

Biến: `SKILL=~/.claude/skills/codegym-mo-phong-hoc-lieu`, `C=/Users/tuananhcan/Downloads/programming-course-demos/nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic`, `T=$C/_tools`, `CFG=$T/course.json`, `CHROME_PATH=$(ls -d ~/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell)` (export biến này trước khi chạy check_pages.js / render_image.js).

## Đầu vào
- `$T/specs/groupN.json`: mỗi bài có bản phân tích đã duyệt (`goal`, `layout`, `visual`, `components`, `tabs`, `steps`, `sample_data`, `key_takeaway`, `notes`, `remark` — remark có thể nêu lỗi của bài cũ cần sửa), `meta_path` (đưa NGUYÊN VĂN vào META "path"), `iframe_url`, `image_base_url`, `old_content` (bài đọc cũ). File lớn: đọc từng bài bằng `python3 -c "import json;d=json.load(open('$T/specs/groupN.json'));print(d[i]['old_content'])"`.
- Mẫu chuẩn STT 3: mô phỏng `$T/lessons/m1-cau-truc-chuong-trinh-cpp.js`; hình `$T/hinh/cau-truc-co-ban-cua-mot-chuong-trinh-cpp/*.html` (+ `_style.css`); nội dung mới `$T/content/out/3.md`.
- Hướng dẫn chung về mô phỏng (API `c.snap`, thư viện hình, quy tắc): `$SKILL/references/mo-phong-brief.md`. Sự thật C++: `$SKILL/references/cpp-facts.md` (C++ KHÁC C#: tràn số có dấu là hành vi không xác định, chia nguyên cho 0 không có exception, cout in 6 chữ số có nghĩa...).

## (A) Mô phỏng: `$T/lessons/m<module>-<slug>.js`
- Làm theo spec của bài (ý tưởng đã được người dùng duyệt). Đơn giản, 4-10 bước mỗi tab, không quiz/thử thách. Số liệu tính bằng JS thật.
- META: `"module"`, `"lesson"`, `"activity"` nguyên văn spec; `"path": <meta_path>`; `"codeTitle":"Mã nguồn C++"`; `tabs` đúng nhãn trong spec.
- Tùy chọn khung: `var LAYOUT = 'side';` (code trái; console + hình + bộ nhớ ở phải — dùng khi spec ghi "2 cột: Mã nguồn | ..."), `var CONSOLE_TITLE = 'Màn hình (Console)';`, `var VIZ_TITLE = '...';`.
- Console giả lập (H25): `c.write(t)` in tiếp trên dòng hiện tại (cout không endl), `c.out(t)` in cả dòng, `c.input(t)` chữ người dùng gõ (xanh) rồi xuống dòng, `c.err(t)` dòng đỏ; `snap({wait:true})` hiện con trỏ chờ nhập. Mã nguồn chạy từng dòng (H26): `snap({ln, dim:[các dòng không chạy], dimLabel:'không chạy'})`.
- Thành phần hình mới (đọc chú thích trong `$SKILL/assets/template.html`): `vBoxes([{name,type,v,s,note,konst}], {frame,empty})` H27 hộp biến (v null → `?` đỏ; konst → nhãn const); `vTrace(head, rows, {title, hiRow})` H28; `vFlowchart(nodes, edges, {title})` H29 lưu đồ (kind start|end|io|proc|cond; tọa độ x cột, y hàng; edge back:true cho cạnh quay lui; label 'Đúng'/'Sai'); `vFlow` cho H30 dây chuyền biên dịch; `vCycle([Khởi tạo, Điều kiện, Thân, Cập nhật], {center, title})` H31; `vCells` với trạng thái ok/no/bad/dim + `sub` cho H32 dải lượt lặp; `vScore` + `vCard({kind:'warn'})` cho H33 lặp vô hạn (tự dừng ở ngưỡng, ghi rõ); `vSwitch({head, cases:[{label, body, brk, s:'hi'|'fall'|'dim'|'ok'}]})` H34; `vBytes([{name,bytes,note,s}])` + `vRange({min,max,pos,v,s,note})` H35. Các hàm cũ (`vCard`, `vFlow`, `vText`, `vGrid`, `vLamps`, `vGates`, `vPair`, `vScore`, `vChips`, `vBins`...) vẫn dùng được.
- Không đặt hàm toàn cục trùng tên khung (xem mo-phong-brief mục 4); hàm phụ đặt tiền tố riêng theo bài (ví dụ `b7Mem`).
- Build: `python3 $SKILL/scripts/build.py --config $CFG $T/lessons/<file>.js`. Kiểm thử: `node $SKILL/scripts/check_pages.js --shots $T/shots <đường dẫn tuyệt đối index.html>` phải ALL OK; đọc log từng bước; XEM ẢNH 390px và 1280px (Read) của mỗi tab chính.

## (B) Hình minh họa cho bài đọc ("hình ảnh nên có")
- Đọc bài cũ, chọn 1-2 chỗ mà một hình giúp hiểu nhanh hơn chữ (sơ đồ khái niệm, so sánh, bảng trực quan). Không vẽ hình lặp lại đúng nội dung mô phỏng; không vẽ ảnh chụp giao diện phần mềm giả.
- Nếu bài cũ đã có hình dạng `[Hình: link]`: GIỮ hình đó (đổi sang cú pháp `![mô tả](link)` với link gốc), chỉ vẽ thêm khi thật sự thiếu.
- Viết HTML ở `$T/hinh/<thư mục học liệu>/<ten-hinh>.html`, dùng chung `../cau-truc-co-ban-cua-mot-chuong-trinh-cpp/_style.css` (link tương đối `../cau-truc-co-ban-cua-mot-chuong-trinh-cpp/_style.css`), phần tử gốc `id="art"` rộng 880px, nền trắng, tiếng Việt có dấu, chữ đủ lớn. Tên file không dấu.
- Xuất PNG vào thư mục của bài: `node $SKILL/scripts/render_image.js <hinh.html> $C/<meta_path bỏ index.html>/hinh/<ten-hinh>.png`. Mở PNG bằng Read để kiểm tra (không tràn chữ, không khoảng trắng thừa, đúng kiến thức).
- Link dùng trong bài: `<image_base_url><ten-hinh>.png`.

## (C) Nội dung mới: `$T/content/out/<stt>.md`
- VIẾT LẠI BÀI THEO KHUNG CŨ: giữ nguyên các mục, thứ tự, giọng văn và ý đúng của bài cũ (như mẫu 3.md). Sửa lỗi: lỗi nêu trong `remark`, khối code mất thụt lề → ```cpp có thụt lề 4 dấu cách, code thiếu, sai kiến thức C++ (đối chiếu cpp-facts), chính tả.
- KHÔNG TRÙNG LẶP giữa bài đọc và mô phỏng: chèn một mục nhỏ (### hoặc ## tùy khung) ngay sau phần ví dụ/giải thích mà mô phỏng minh họa, gồm: 1 câu dẫn "... bấm **Bước tiếp** ...", mỗi tab một gạch đầu dòng "Tab **Nhãn tab**: ..." CHỈ nêu điều mô phỏng cho thấy mà chữ chưa nói (bộ nhớ, thứ tự chạy, dòng bị bỏ qua...), KHÔNG kể lại ví dụ; rồi khối iframe; rồi một đoạn "Điều rút ra: ...". Nếu ý nào bài cũ và mô phỏng trùng nhau, giữ một chỗ (ưu tiên giữ trong mô phỏng, rút gọn chữ) — không lặp.
- Khối iframe đúng mẫu (bọc trong ``` không ngôn ngữ):
```
<iframe src="<iframe_url>" title="<tiêu đề mô phỏng>" style="border:0;" allowfullscreen></iframe>
```
- Hình: `![mô tả ngắn có dấu](<image_base_url><ten-hinh>.png)` đặt đúng chỗ nó minh họa. Mọi link (iframe, hình) phải là link GitHub Pages đầy đủ, đúng thư mục `nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic` (lấy từ spec, không tự ghép).
- Code C++ trong bài phải biên dịch được: kiểm bằng `clang++ -std=c++17 -Wall` cho mọi khối có `int main` (chạy thử, đối chiếu kết quả ghi trong bài). Đoạn trích ngắn không cần main.
- Không emoji, không quiz/bài tập mới, không nhắc Excel/agent/file nội bộ.

## Báo cáo cuối (ngắn)
Mỗi bài một dòng: `stt | file .js | số tab/bước | hình mô phỏng dùng | hình bài đọc đã vẽ (tên) | đã sửa gì trong bài cũ | đã bỏ trùng lặp gì`. Cuối: điểm nghi ngờ (kiến thức chưa chắc, chỗ lệch spec), đề xuất cho khung.
