# Làm trọn học liệu khóa "Lập trình Cấu trúc với C++: Mảng, Hàm & Xử lý Chuỗi"

Với MỖI bài trong nhóm được giao, làm 3 việc theo thứ tự: (A) mô phỏng tương tác, (B) 1-2 hình minh họa cho bài đọc, (C) nội dung mới của bài đọc.

MẪU CHUẨN (người dùng đã duyệt) là bài STT 2 của khóa trước, ở `M=/Users/tuananhcan/Downloads/programming-course-demos/nang-cao-con-tro-lap-trinh-huong-doi-tuong-xu-ly-file/_tools`: mô phỏng `$M/lessons/m1-bien-con-tro-la-gi.js`, hình `$M/hinh/bien-con-tro-la-gi-cach-khai-bao-va-khoi-tao/*.html`, nội dung mới `$M/content/out/2.md`. Đọc kỹ trước khi bắt đầu. CHỈ ĐỌC, không sửa gì trong thư mục khóa trước.

**Người học là người MỚI học lập trình.** Mô phỏng phải cơ bản, dễ hiểu: mỗi tab một ý, chữ trong bước ngắn (1-3 câu), không thuật ngữ khó (bắt buộc dùng thì giải nghĩa ngắn ngay lần đầu), hình đơn giản, tối đa 2 hình/bước. Thà ít mà rõ.

Biến: `SKILL=~/.claude/skills/codegym-mo-phong-hoc-lieu`, `C=/Users/tuananhcan/Downloads/programming-course-demos/lap-trinh-cau-truc-voi-cpp-mang-ham-xu-ly-chuoi`, `T=$C/_tools`, `CFG=$T/course.json`. Trước khi chạy check_pages.js / render_image.js: `export CHROME_PATH=$(ls -d ~/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell)`. File tạm đặt trong `$T/tmp/<tên nhóm>/`, KHÔNG dùng /tmp, không tạo file rác trong thư mục khóa học.

## Đầu vào
- `$T/specs/groupN.json`: mỗi bài có phân tích đã duyệt (`goal`, `layout`, `visual`, `components`, `tabs`, `steps`, `sample_data`, `key_takeaway`, `notes`, `remark` — remark có thể nêu lỗi bài cũ cần sửa), `meta_path` (đưa NGUYÊN VĂN vào META "path"), `iframe_url`, `image_base_url`, `old_content` (bài đọc cũ). Đọc từng bài: `python3 -c "import json;d=json.load(open('$T/specs/groupN.json'));print(d[i]['old_content'])"`.
- Hướng dẫn mô phỏng (API `c.snap`, quy tắc chung): `$SKILL/references/mo-phong-brief.md`. Sự thật C++: `$SKILL/references/cpp-facts.md`. Chú thích tham số từng hàm hình: đọc trong `$SKILL/assets/template.html` (tìm `function v`).

## (A) Mô phỏng: `$T/lessons/m<module>-<slug>.js`
- Bám spec của bài, nhưng ĐƯỢC rút gọn nếu spec quá dày: tối đa 3 tab, 4-8 bước mỗi tab, không quiz/thử thách/kéo thả/dự đoán. Số liệu tính bằng JS thật.
- META: `"module"` (số), `"lesson"`, `"activity"` nguyên văn spec; `"path": <meta_path>` (BẮT BUỘC, sai là build ra thư mục sai); `"codeTitle":"Mã nguồn C++"`; `tabs` đúng nhãn trong spec (được rút gọn nếu quá dài).
- Khung: `var LAYOUT = 'side';`, `var CONSOLE_TITLE = 'Màn hình (Console)';`, `var VIZ_TITLE = '...';`.
- Console (H25): `c.write(t)` in tiếp trên dòng (không endl), `c.out(t)` in cả dòng, `c.input(t)` chữ người dùng gõ, `c.err(t)` dòng đỏ, `c.clear()` xóa console khi chuyển sang chương trình khác trong cùng tab; `snap({wait:true})` con trỏ chờ nhập. Mã nguồn chạy từng dòng (H26): `snap({ln, dim:[...], dimLabel})`.
- Khung code PHẢI khớp với điều hình nói (khóa trước có lỗi: hình nói "đã thêm virtual" nhưng code không có). Muốn so sánh hai phiên bản code thì tách hai tab, mỗi tab code thật của nó.
- Bảng thành phần hình (mã H trong spec → hàm):
  - H47 `vArray(items, {name, ptr, ptrLabel, ptr2, ptr2Label, out, outV, outHi, bars, done, doneFrom, swap, bytes, title, note})`: dải ô mảng; ô null = '?'; `out` = số ô kẻ sọc "ngoài mảng"; `bars:true` dạng cột cho sắp xếp; `done` số ô đã sắp xong.
  - H48 `vGrid2D(rows, {name, hi:[r,c], title, note})`. H49 `vAcc([{k, v, op:'30 + 9 = 39', s, crown}], {title, note})`.
  - H50 `vArgs({call, args, fn, params:[{name, type, v, def, s, ref}], ret:{v, to:'kq'|'trash'|'none'}, title, note})`: đối số → tham số (mặc định hiện xám nghiêng; `ref:'a'` = tham chiếu, nhãn cam, không có hộp mới) → return.
  - H51 `vInBuf(text, {pos, used, take:[a,b], drop, stuck, title, note})`: băng bộ đệm bàn phím; text chứa ký tự ' ' và '\n' thật.
  - H52 `vCharCmp(a, b, {na, nb, at, done, title, note})`: tự tìm cột khác đầu tiên và kết luận theo mã ASCII.
  - H53 `vChars(str, {name, nul, cap, sel:[pos,len], find, npos, cells, spill, neighbor, len, size, title, note})`: `str` chỉ gồm phần nằm TRONG khay; phần tràn đưa vào `spill` (ký tự kết thúc dùng '\0' thật).
  - H54 `vOverload({call, types, doors:[{sig, s:'ok'|'warn'|'no'|'bad'|'dim', note}], result:{kind:'ok'|'ambig'|'none'|'dup', text}, title, note})`.
  - H55 `vScanTop({book:[{sig, kind:'hua'|'than', s}], check:{call, ok, msg}, link:{ok, msg}, title, note})`; kết hợp `snap({ln})` để thấy trình biên dịch đang đọc tới dòng nào.
  - Đã có từ trước: H07 `vStack` (ngăn xếp lời gọi, liệt kê từ đáy main lên), H22 `vScore`, H27 `vBoxes` (hộp biến), H28 `vTrace` (bảng trace), H36/H38 `vMem` (hộp có địa chỉ, `alias`), H39 `vErr` (thẻ lỗi); `vCard`, `vCells`, `vGrid`, `vLamps`, `vPair`, `vFlow` vẫn dùng được.
- KHÔNG sửa `$SKILL/assets/template.html` (dùng chung, nhiều người chạy song song). Thiếu gì thì ghép từ hàm có sẵn hoặc trả HTML đơn giản trong hàm phụ của bài, và nêu trong báo cáo.
- Không đặt hàm toàn cục trùng tên khung (xem mo-phong-brief mục 4); hàm/biến phụ đặt tiền tố theo bài (ví dụ `b7Frame`).
- Build: `python3 $SKILL/scripts/build.py --config $CFG $T/lessons/<file>.js`. Kiểm thử: `node $SKILL/scripts/check_pages.js --shots $T/shots <đường dẫn tuyệt đối index.html>` phải ALL OK; đọc log từng bước (thứ tự đúng, console đúng); XEM ẢNH 390px và 1280px (Read) của MỌI tab. Ảnh chỉ chụp bước cuối: nếu bước giữa có hình phức tạp, tạm đảo bước để xem rồi trả lại.

## (B) Hình minh họa cho bài đọc
- 1-2 hình cho chỗ mà hình giúp người mới hiểu nhanh hơn chữ: ẩn dụ, giải phẫu cú pháp, sơ đồ chọn/so sánh khái niệm.
- KHÔNG TRÙNG với mô phỏng: hình không được vẽ lại đúng điều mô phỏng đã cho thấy (khóa trước phải bỏ 4 hình vì lỗi này). Nếu không tìm được hình bổ sung thật sự thì thôi, không vẽ.
- Không vẽ ảnh giao diện phần mềm giả. Nếu bài cũ đã có hình (link ảnh): GIỮ, đưa vào khung ảnh với link gốc.
- HTML ở `$T/hinh/<thư mục học liệu>/<ten-hinh>.html`, dùng `<link rel="stylesheet" href="../_style.css">` (đã có `$T/hinh/_style.css`), phần tử gốc `id="art"`, nền trắng, tiếng Việt có dấu, chữ đủ lớn. Tên file không dấu. Xem 2 hình mẫu của STT 2 khóa trước để theo phong cách.
- Xuất PNG: `node $SKILL/scripts/render_image.js <hinh.html> $C/<meta_path bỏ index.html>hinh/<ten-hinh>.png`. Mở PNG bằng Read: không chữ đè nhau, không tràn, không khoảng trắng thừa lớn, đúng kiến thức.

## (C) Nội dung mới: `$T/content/out/<stt>.md`
- VIẾT LẠI THEO KHUNG CŨ (như 2.md mẫu): giữ các mục, thứ tự, giọng văn và ý đúng của bài cũ. Sửa: lỗi nêu trong `remark`, code mất thụt lề → ```cpp thụt 4 dấu cách, code thiếu, output không khớp code, sai kiến thức C++ (đối chiếu cpp-facts), chính tả, định dạng **đậm** bị vỡ. Output đặt trong ``` không ngôn ngữ.
- KHÔNG TRÙNG LẶP chữ và mô phỏng: chèn một mục nhỏ "### Xem ... từng bước" ngay sau phần mà mô phỏng minh họa (thường cuối mục Ví dụ), gồm: 1 câu dẫn có "bấm **Bước tiếp**"; mỗi tab một gạch "- Tab **Nhãn tab**: ..." CHỈ nêu điều mô phỏng cho thấy mà chữ chưa nói, KHÔNG kể lại ví dụ; rồi khung mô phỏng; rồi đoạn "Điều rút ra: ...". Ý nào bài cũ và mô phỏng trùng nhau thì giữ một chỗ.
- ĐÁNH DẤU CHỖ CHÈN bằng khung riêng (người dùng đã duyệt; KHÔNG dùng `![...](...)` hay khối iframe trong ```). Mỗi khung cách một dòng trống trước và sau, viết sát lề trái, không bọc trong ```, chép đúng số dấu như mẫu 2.md:

Khung mô phỏng (đúng 1 khung mỗi bài, trong mục "Xem ... từng bước", sau các gạch Tab, trước "Điều rút ra"):

    #################### [CHÈN MÔ PHỎNG] ####################
    Tên mô phỏng: <title trong META>
    Link mô phỏng: <iframe_url>
    Mã nhúng (iframe): <iframe src="<iframe_url>" title="<title trong META>" style="border:0;" allowfullscreen></iframe>
    ########################################################

Khung ảnh (đánh số 1, 2 theo thứ tự xuất hiện, đặt ngay sau đoạn mà ảnh minh họa):

    ==================== [CHÈN ẢNH 1] ====================
    Mô tả ảnh: <mô tả ngắn có dấu>
    Link ảnh: <image_base_url><ten-hinh>.png
    ======================================================

- Mọi link lấy nguyên từ spec (`iframe_url`, `image_base_url`), không tự ghép.
- Code C++ phải biên dịch được: mọi khối có `int main` kiểm bằng `clang++ -std=c++17 -Wall` và CHẠY THỬ, đối chiếu output ghi trong bài (sửa bài nếu sai). Khối cố ý lỗi phải đúng là lỗi. Thông báo lỗi ghi theo g++ (máy chỉ có clang: giữ nguyên văn g++ của bài cũ nếu hợp lý, nêu trong báo cáo nếu không chắc). Script kiểm tra: `python3 $T/tmp/chk.py $C $T/tmp/<nhóm>/chk <stt>` (biên dịch từng khối, kiểm khung mô phỏng/ảnh đúng mẫu, link đúng, hình tồn tại) — phải ra "khung mô phỏng: 1 | link đúng: True" và mọi ảnh "tồn tại: True".
- Không emoji, không quiz/bài tập mới, không nhắc Excel/agent/file nội bộ.

## Báo cáo cuối (ngắn)
Mỗi bài một dòng: `stt | file .js | số tab/bước | hình mô phỏng dùng | hình bài đọc (tên) | đã sửa gì trong bài cũ | bỏ trùng lặp gì`. Cuối: điểm nghi ngờ (kiến thức chưa chắc, lệch spec), đề xuất.
