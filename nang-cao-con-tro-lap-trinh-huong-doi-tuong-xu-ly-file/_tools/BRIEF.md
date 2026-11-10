# Làm trọn học liệu khóa "C++ Nâng cao: Con trỏ, Lập trình Hướng đối tượng & Xử lý File"

Với MỖI bài trong nhóm được giao, làm 3 việc theo thứ tự: (A) mô phỏng tương tác, (B) 1-2 hình minh họa cho bài đọc, (C) nội dung mới của bài đọc. Bài STT 2 đã làm xong và được người dùng duyệt: đó là MẪU CHUẨN cho cả 3 việc, đọc kỹ trước khi bắt đầu.

**Người học là người MỚI học lập trình.** Mô phỏng phải cơ bản, dễ hiểu: mỗi tab một ý, chữ trong bước ngắn (1-3 câu), không thuật ngữ khó (bắt buộc dùng thì giải nghĩa ngắn ngay lần đầu), hình đơn giản, không nhồi nhiều hình trong một bước (tối đa 2 hình/bước). Thà ít mà rõ.

Biến: `SKILL=~/.claude/skills/codegym-mo-phong-hoc-lieu`, `C=/Users/tuananhcan/Downloads/programming-course-demos/nang-cao-con-tro-lap-trinh-huong-doi-tuong-xu-ly-file`, `T=$C/_tools`, `CFG=$T/course.json`. Trước khi chạy check_pages.js / render_image.js: `export CHROME_PATH=$(ls -d ~/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell)`. File tạm đặt trong `$T/tmp/<tên nhóm>/` (tạo nếu chưa có), KHÔNG dùng /tmp.

## Đầu vào
- `$T/specs/groupN.json`: mỗi bài có phân tích đã duyệt (`goal`, `layout`, `visual`, `components`, `tabs`, `steps`, `sample_data`, `key_takeaway`, `notes`, `remark` — remark nêu lỗi bài cũ cần sửa), `meta_path` (đưa NGUYÊN VĂN vào META "path"), `iframe_url`, `image_base_url`, `old_content` (bài đọc cũ). Đọc từng bài: `python3 -c "import json;d=json.load(open('$T/specs/groupN.json'));print(d[i]['old_content'])"`.
- Mẫu chuẩn STT 2: mô phỏng `$T/lessons/m1-bien-con-tro-la-gi.js`; hình `$T/hinh/bien-con-tro-la-gi-cach-khai-bao-va-khoi-tao/*.html`; nội dung mới `$T/content/out/2.md`.
- Hướng dẫn mô phỏng (API `c.snap`, quy tắc chung): `$SKILL/references/mo-phong-brief.md`. Sự thật C++: `$SKILL/references/cpp-facts.md`. Chú thích từng hàm hình: đọc trong `$SKILL/assets/template.html` (tìm `function v`).

## (A) Mô phỏng: `$T/lessons/m<module>-<slug>.js`
- Bám spec của bài (ý tưởng đã được duyệt), nhưng ĐƯỢC rút gọn nếu spec quá dày: tối đa 3 tab, 4-8 bước mỗi tab, không quiz/thử thách. Số liệu tính bằng JS thật. Địa chỉ bộ nhớ dùng dạng rút gọn `…1c2c` trong hình, dạng đầy đủ `0x7ffe…` trong console (giữ nhất quán với bài đọc).
- META: `"module"`, `"lesson"`, `"activity"` nguyên văn spec; `"path": <meta_path>`; `"codeTitle":"Mã nguồn C++"`; `tabs` đúng nhãn trong spec (được rút gọn nhãn nếu quá dài).
- Khung: `var LAYOUT = 'side';` (code trái; console + hình phải), `var CONSOLE_TITLE = 'Màn hình (Console)';`, `var VIZ_TITLE = '...';`.
- Console (H25): `c.write(t)` in tiếp trên dòng (không endl), `c.out(t)` in cả dòng, `c.input(t)` chữ người dùng gõ, `c.err(t)` dòng đỏ, `c.clear()` xóa console khi chuyển sang chương trình khác trong cùng tab. Mã nguồn chạy từng dòng (H26): `snap({ln, dim:[...], dimLabel})`.
- Bảng thành phần hình (mã H trong spec → hàm):
  - H36/H37/H38 `vMem(items, {arrows, title, note, cols})`: hộp biến có địa chỉ, con trỏ là hộp tím + mũi tên; `item.alias:['r']` = nhãn cam "bí danh: r" (tham chiếu KHÔNG có hộp riêng), `s:'alias'` viền cam; mũi tên `kind:'dashed'` (hoang), `{from, kind:'null'}` (nullptr ⊘); `kind:'junk'` vùng ??? kẻ sọc.
  - H39 `vErr({kind:'compile'|'runtime'|'warn', msg:[...], code, fix, note})`.
  - H40 `vBlueprint({cls, fields, methods, ctor, ctorS, objs:[{name, vals:[[k,v,s]], s, sub}], arrow, title, note})`.
  - H41 `vZones({cls, zones:[{kind:'private'|'protected'|'public', items, s}], tests:[{who, target, ok, note}], title, note})`.
  - H42 `vLayers({name, layers:[{cls, items, s:'wait'|'new'|'ok'|'del', sub}] (từ ĐÁY lên), title, note})`.
  - H43 `vLookup({call, chain:[{cls, m, has, s:'no'|'ok'|'dim'}], title, note})`.
  - H44 `vTimeline({events:[...], now, bars:[{name, from, to, end, leak}], title, note})`.
  - H45 `vFlags({stream, flags:[{n:'good()', v:true}], title, note})`. H46 `vModes({modes:[{n:'ios::app', sub, on}], title, note})`.
  - Cũ: H07 `vStack`, H08 `vLamps`+`vScore`, H09 `vLamps`/`vFlow`, H10 `vPair`, H11 `vFlow`/`vCells`, H12 `vText`, H13 `vBuf`, H15 `vTree`, H22 `vScore`, H23 `snap.objs` hoặc `vBlueprint`, H24 `snap.uml`, H26 code, H27 `vBoxes`, H28 `vTrace`; `vCard`, `vCells`, `vChips`, `vGrid` vẫn dùng được.
- KHÔNG sửa `$SKILL/assets/template.html` (file dùng chung, nhiều người chạy song song). Thiếu gì thì ghép từ hàm có sẵn hoặc trả HTML đơn giản trong hàm phụ của bài, và nêu trong báo cáo.
- Không đặt hàm toàn cục trùng tên khung (xem mo-phong-brief mục 4); hàm/biến phụ đặt tiền tố theo bài (ví dụ `b8Obj`).
- Build: `python3 $SKILL/scripts/build.py --config $CFG $T/lessons/<file>.js`. Kiểm thử: `node $SKILL/scripts/check_pages.js --shots $T/shots <đường dẫn tuyệt đối index.html>` phải ALL OK; đọc log từng bước (đúng thứ tự, console đúng); XEM ẢNH 390px và 1280px (Read) của mỗi tab. Ảnh chỉ chụp bước cuối: nếu bước giữa có hình phức tạp, tạm đảo bước để xem rồi trả lại.

## (B) Hình minh họa cho bài đọc
- 1-2 hình cho chỗ mà hình giúp người mới hiểu nhanh hơn chữ (ẩn dụ, so sánh, giải phẫu cú pháp, bảng trực quan). Không lặp đúng nội dung mô phỏng; không vẽ ảnh giao diện phần mềm giả.
- Nếu bài cũ đã có hình dạng `[Hình: link]` hay link ảnh: GIỮ (đổi sang `![mô tả](link gốc)`), chỉ vẽ thêm khi thật sự thiếu.
- HTML ở `$T/hinh/<thư mục học liệu>/<ten-hinh>.html`, dùng `<link rel="stylesheet" href="../_style.css">`, phần tử gốc `id="art"` (rộng 880px trong _style.css), nền trắng, tiếng Việt có dấu, chữ đủ lớn. Tên file không dấu. Xem 2 hình mẫu của STT 2 để theo phong cách.
- Xuất PNG: `node $SKILL/scripts/render_image.js <hinh.html> $C/<meta_path bỏ index.html>hinh/<ten-hinh>.png`. Mở PNG bằng Read: không chữ đè nhau, không tràn, không khoảng trắng thừa lớn, đúng kiến thức.
- Link trong bài: `<image_base_url><ten-hinh>.png`.

## (C) Nội dung mới: `$T/content/out/<stt>.md`
- VIẾT LẠI THEO KHUNG CŨ (như 2.md): giữ các mục, thứ tự, giọng văn và ý đúng của bài cũ. Sửa: lỗi nêu trong `remark`, code mất thụt lề → ```cpp thụt 4 dấu cách, code thiếu, sai kiến thức C++ (đối chiếu cpp-facts), chính tả, định dạng **đậm** bị vỡ. Output trong ``` không ngôn ngữ.
- KHÔNG TRÙNG LẶP: chèn một mục nhỏ (### hoặc ## theo khung) ngay sau phần mà mô phỏng minh họa (thường cuối mục Ví dụ), gồm: 1 câu dẫn có "bấm **Bước tiếp**"; mỗi tab một gạch "Tab **Nhãn tab**: ..." CHỈ nêu điều mô phỏng cho thấy mà chữ chưa nói, KHÔNG kể lại ví dụ; rồi khối iframe; rồi đoạn "Điều rút ra: ...". Ý nào bài cũ và mô phỏng trùng nhau thì giữ một chỗ.
- Iframe đúng mẫu (bọc trong ``` không ngôn ngữ):
```
<iframe src="<iframe_url>" title="<tiêu đề mô phỏng>" style="border:0;" allowfullscreen></iframe>
```
- Hình: `![mô tả ngắn có dấu](<image_base_url><ten-hinh>.png)` đặt đúng chỗ. Mọi link lấy nguyên từ spec (`iframe_url`, `image_base_url`), không tự ghép.
- Code C++ phải biên dịch được: mọi khối có `int main` kiểm bằng `clang++ -std=c++17 -Wall` và CHẠY THỬ, đối chiếu output ghi trong bài (sửa bài nếu sai; địa chỉ bộ nhớ thì ghi chú "khác nhau mỗi lần chạy"). Khối cố ý lỗi phải đúng là lỗi. Thông báo lỗi ghi theo g++ (máy chỉ có clang: giữ nguyên văn g++ của bài cũ nếu hợp lý, nêu trong báo cáo nếu không chắc). Có sẵn script kiểm tra: `python3 $T/tmp/chk.py $C <thư mục tạm> <stt>` (biên dịch từng khối, kiểm iframe và hình tồn tại).
- Không emoji, không quiz/bài tập mới, không nhắc Excel/agent/file nội bộ.

## Báo cáo cuối (ngắn)
Mỗi bài một dòng: `stt | file .js | số tab/bước | hình mô phỏng dùng | hình bài đọc (tên) | đã sửa gì trong bài cũ | bỏ trùng lặp gì`. Cuối: điểm nghi ngờ (kiến thức chưa chắc, lệch spec), đề xuất.
