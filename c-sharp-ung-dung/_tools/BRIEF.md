# Làm bài mô phỏng cho khóa "C# Ứng dụng" (CodeGym)

Bạn viết các bài mô phỏng tương tác (mỗi bài một file HTML độc lập) cho học viên mới. Bạn CHỈ viết phần DỮ LIỆU của bài (file `.js`). Khung trang, engine, CSS và thư viện hình minh họa đã có sẵn; `build.py` ghép lại.

Biến `$S` = `/private/tmp/claude-501/-Users-tuananhcan-Downloads-programming-course-demos/3e4056f8-3850-4b3a-b9e7-246b6151df9e/scratchpad/csud`
Biến `$PW` = `/private/tmp/claude-501/-Users-tuananhcan-Downloads-programming-course-demos/3e4056f8-3850-4b3a-b9e7-246b6151df9e/scratchpad/pwnode`

## 1. Nguyên tắc
- Rất đơn giản, dễ hiểu, dễ dùng, bám sát tên học liệu, MỘT ý chính mỗi bài. Học viên chỉ quan sát và bấm từng bước. KHÔNG quiz, KHÔNG thử thách, KHÔNG chấm điểm. Tab chỉ để đổi tình huống.
- Mỗi tab 4-9 bước. Bước cuối có title 'Xong' (hoặc kết luận) và `note` nêu ý chính cần nhớ.
- Tiếng Việt, giọng ấm, ngắn gọn, không emoji. "rồi bấm" viết thường, không có dấu chấm đôi. Mỗi bước 1-2 câu giải thích (`body`).
- Điểm khác khóa trước: mỗi bài có thêm khung "Hình minh họa" (HTML/SVG thuần) để đẹp mắt và dễ hiểu. Hình là nhân vật chính, khung code vẫn có để học viên thấy dòng đang chạy.

## 2. Đầu vào
- `$S/specs/groupN.json` (N được giao). Mỗi phần tử là một học liệu với bản mô tả chi tiết đã được người dùng duyệt: `goal`, `layout` (1 cột / 2 cột song song / số tab), `visual` (hình minh họa), `components` (mã H01-H22, xem mục 4), `tabs`, `steps` (kịch bản từng bước), `sample_data`, `key_takeaway`, `csharp_notes`, `output_path`.
- LÀM THEO `steps` / `tabs` / `visual`. Được tinh chỉnh lời văn, tách hoặc gộp bước cho dễ hiểu, nhưng không làm phức tạp hơn và không đổi ý chính. Số liệu, thông điệp lỗi, kết quả phải TÍNH BẰNG CODE JS THẬT trong `run` khi có phép tính (tổng, đếm, độ dài, so sánh), không bịa.
- Xem 3 bài mẫu của khóa OOP để biết hình thức bài (cùng engine): `/Users/tuananhcan/Downloads/programming-course-demos/oop_ooad/_tools/lessons/m2-tao-va-su-dung-doi-tuong.js` (nhiều tab) và `m2-dong-goi-la-gi.js` (2 cột). Phần `viz` là mới ở khóa này (mục 4).

## 3. Định dạng file `$S/lessons/m<chuong>-<slug-khong-dau>.js`
Dòng 1 là META, JSON một dòng:
`// META {"module":1,"lesson":"<đúng nguyên văn lesson>","activity":"<đúng nguyên văn activity>","title":"<tiêu đề ngắn>","lead":"<1 câu, có chữ \"Bấm <b>Bước tiếp</b>\">","tabs":[["key","Nhãn tab"]],"codeTitle":"Mã nguồn C#"}`
- `module`, `lesson`, `activity` khớp NGUYÊN VĂN spec (build dùng chúng để đặt thư mục). `tabs` luôn có ít nhất 1 phần tử; nhãn tab đúng như cột `tabs` của spec; key là chữ không dấu.
Phần còn lại: `var EX = { key: bài, ... }`.

Bài 1 cột:
```
{ inputs:[], chips:[],
  intro:'Câu hướng dẫn... Bấm "Bước tiếp".',
  lines:function(P){ return ['dòng code 1', ...]; },
  run:function(c,P){ c.snap({...}); ... } }
```
Bài 2 cột (chạy song song, đúng 2 cột): `{ intro, running, done, note, cols:[{title, sub, lines:[...], run:function(c){...}}, {...}] }`; mỗi lần bấm cả hai cột tiến một snapshot, cột xong sớm giữ nguyên bước cuối; `done` ghi kết luận so sánh (tính từ dữ liệu thật).
Ô nhập (chỉ khi thật sự giúp hiểu): số `{id:'n',label:'n',def:5,min:1,max:99}`; chuỗi `{id:'input',label:'input',def:'abc',text:'^.{0,10}$',msg:'Nhập tối đa 10 ký tự',w:130}` (P.input là chuỗi, có thể rỗng; giá trị bị trim()). `chips:['abc','20','']` là giá trị gợi ý, chỉ gán cho ô nhập đầu tiên.

`c.snap({ ln, title, body, note, viz, vars, arrs, objs, uml })`
- `ln` chỉ số dòng code (từ 0) tô sáng. `title` ngắn (hệ thống tự thêm "Bước n · "). `body` 1-2 câu. `note` chỉ ở bước cuối.
- `viz`: HTML của khung Hình minh họa: một chuỗi hoặc mảng chuỗi lấy từ các hàm `v*` (mục 4). Khung hiện toàn chiều rộng ngay dưới câu giải thích (1 cột) hoặc trong từng cột (2 cột). Nếu bài có `viz` ở bất kỳ bước nào thì NÊN có `viz` ở mọi bước (cùng cấu trúc, đổi trạng thái).
- `vars: [['tên', giá trị, hi?]]` ô biến; `arrs: [AR('tên', [...], hiIdx[], doneIdx[], dimIdx[])]`; `objs: [O('Car#1', [['Trường', giá trị, 'hi'|'ok'|'bad']], {hi, dim, tag})]`; `S('abc')` = chuỗi có nháy. Khung Bộ nhớ chỉ hiện khi có `vars/arrs/objs`; nếu hình đã đủ thì có thể bỏ qua Bộ nhớ (khung tự ẩn).
- `c.out('dòng console')`, `c.err('dòng lỗi (chữ đỏ)')`: gọi TRƯỚC `c.snap` của bước tạo ra dòng đó.
- Không dùng thư viện ngoài, không localStorage.

## 4. Thư viện hình minh họa (đọc kỹ chú thích ở đầu mỗi hàm trong `$S/viz_lib.js`)
Trạng thái dùng chung `s`: 'hi' vàng (đang xét) | 'ok' xanh (đúng/xong) | 'bad' đỏ (lỗi) | 'dim' mờ (bị bỏ qua/chưa tới) | 'new' xanh + hiệu ứng xuất hiện (vừa thêm) | 'del' đỏ gạch (sắp xóa/đã xóa) | 'no' xám (không khớp) | 'f1'..'f4' bốn màu cho các trường (byte nhị phân).
- `vCells(items, {name, cap, idx:false, small:true, ptr, ptrLabel, badges:[[nhãn,giá trị]]})` — H01/H11/H20: dãy ô có chỉ số, ô trống nét đứt (`cap`), mũi tên ▲ chỉ vị trí (`ptr`), nhãn phụ `sub` (ví dụ '1→2' khi dịch chỉ số).
- `vDrawers([{k,v,s}], {name})` — H02: tủ ngăn kéo Dictionary.
- `vCard({kind:'err'|'ok'|'info'|'warn', title, sub, lines, rows:[[k,v]], tip})` — H03: thẻ Exception (title = tên loại, sub = thông điệp thật, lines = dòng code, tip = cách phòng tránh).
- `vFlow([{t,s,sub,item}], {title})` — H04/H17/H09 băng chuyền: các nút nối mũi tên; `item` là viên dữ liệu đang đi qua nút.
- `vGates([{t,s}], {pill, at})` — H05: cửa lọc catch xếp dọc; `pill` là viên đỏ (tên exception), `at` là chỉ số cửa đang chứa viên.
- `vTree([{t,d,kind:'dir'|'file'|'cls',s,sub}])` — H06/H15: cây thụt lề (d = độ sâu).
- `vStack(frames từ ĐÁY lên ĐỈNH, {ballText})` — H07: ngăn xếp lời gọi, `ball:true` đặt quả bóng đỏ ở khung đó.
- `vLamps([{t,s,sub}], {title})` — H08/H09: hàng đèn; s: 'ok' | 'bad' | 'hi' | 'off'.
- `vPair(htmlA, htmlB, {ta, tb, mid})` — H10/H16/H19: hai khung cạnh nhau (xếp dọc trên điện thoại).
- `vText(lines, {title, cursor, eol, noNo})` — H12/H16/H19: trình xem tệp/JSON/XML; mỗi dòng là chuỗi, `{t,s}` (tô cả dòng) hoặc `{seg:[{t, s, c}]}` (tô từng đoạn; c: 'str'|'num'|'bool'|'null'|'key'|'tag').
- `vGrid(rows, {head:true, hiRow, hiCell:[r,c], title})` — H16: bảng/lưới.
- `vBuf({label, fill 0-100, text})` — H13: thanh bộ đệm đầy dần.
- `vChips([{t,s,label}], {title})` — H14: các chip (đường dẫn...).
- `vBins({title,items:[{t,s}],kind:'ok'}, {title,items,kind:'bad'})` — H21: hai thùng Hợp lệ / Lỗi.
- `vScore([{k,v,s}])` — H22: bộ đếm lớn ('số bước', 'số lần so sánh').
Quy tắc dùng hình:
- Mỗi bước 1-3 hình, cùng bộ hình xuyên suốt các bước để học viên theo dõi được sự thay đổi. Không nhồi quá nhiều hình một lúc.
- Hình phải phản ánh ĐÚNG trạng thái ở bước đó (ví dụ sau Remove: ô bị xóa 's:del' ở bước xóa, ở bước sau thì biến mất và các ô sau dịch chỉ số).
- Màu thống nhất: vàng = đang xét; xanh = thành công/xong/mới; đỏ = lỗi/mất dữ liệu; xám/mờ = bị bỏ qua.
- Điện thoại 390px: tối đa khoảng 8-10 ô một hàng (ô tự xuống dòng); hai hộp đặt cạnh nhau bằng `vPair` (tự xếp dọc).
- Được tạo thêm HTML tùy chỉnh bằng chuỗi (dùng `esc()` cho chữ) nếu thật cần, nhưng ưu tiên dùng thư viện; dùng biến CSS có sẵn (`var(--cur)`, `var(--true)`, `var(--false)`...) để hợp chế độ tối.
- Không đặt hàm/biến toàn cục trong file bài trùng tên: `mk`, `O`, `S`, `AR`, `CC`, `esc`, `hl`, `P`, `EX`, `vizHtml`, mọi tên bắt đầu bằng `v` viết hoa tiếp theo (`vCells`, `vCard`...), `memHtml`, `arrHtml`, `render`, `build`, `step`, `snaps`. Khi cần hàm phụ trong file bài hãy đặt tên có tiền tố riêng (ví dụ `myFlow`, `tabData`) hoặc đặt trong `run`.

## 5. Quy tắc code C# trong khung `lines`
- Dòng ngắn (tối đa khoảng 36 ký tự), thụt lề 2 dấu cách, tách dòng dài thành nhiều dòng. Mã phải biên dịch được trong C# thật (trừ chỗ cố ý minh họa lỗi biên dịch: dùng `c.err('error CS...: ...')`).
- Từ khóa tự được tô màu. Không cần tự tô.

## 6. Sự thật C#/.NET phải đúng (thông điệp theo .NET 8)
- `int.Parse("abc")` → FormatException: "The input string 'abc' was not in a correct format." `10 / 0` (int) → DivideByZeroException: "Attempted to divide by zero." (double chia 0 ra ∞, không lỗi). `arr[3]` (mảng 3 phần tử) → IndexOutOfRangeException: "Index was outside the bounds of the array." `s.Length` với s = null → NullReferenceException: "Object reference not set to an instance of an object." `(int)obj` khi obj là string → InvalidCastException: "Unable to cast object of type 'System.String' to type 'System.Int32'." `checked` + `int.MaxValue + 1` → OverflowException: "Arithmetic operation resulted in an overflow." `int.Parse("99999999999")` → OverflowException: "Value was either too large or too small for an Int32."
- `List<T>`: `new List<T>()` Capacity 0; lần Add đầu cấp 4, sau đó nhân đôi (4 → 8 → 16). `list[i]` sai chỉ số → ArgumentOutOfRangeException ("Index was out of range. Must be non-negative and less than the size of the collection. (Parameter 'index')"). `Remove(x)` trả bool; `RemoveAt(i)` sai chỉ số → ArgumentOutOfRangeException. Sửa danh sách trong `foreach` → InvalidOperationException: "Collection was modified; enumeration operation may not execute."
- `Dictionary`: `Add` trùng khóa → ArgumentException: "An item with the same key has already been added. Key: <khóa>"; đọc khóa không có → KeyNotFoundException: "The given key '<khóa>' was not present in the dictionary."; `TryGetValue` trả bool.
- catch xếp sai (Exception đứng trước catch cụ thể) → lỗi biên dịch CS0160: "A previous catch clause already catches all exceptions of this or of a super type ('Exception')".
- File: `File.ReadAllText` tệp không có → FileNotFoundException ("Could not find file '...'."); thư mục không có → DirectoryNotFoundException; `Directory.Delete` thư mục không rỗng → IOException; `new XmlSerializer` lớp thiếu constructor không tham số → InvalidOperationException "... cannot be serialized because it does not have a parameterless constructor.".
- BinaryWriter (little-endian): int 4 byte byte-thấp-trước; string = 1 byte độ dài (mã hóa 7-bit) + các byte UTF-8 ('ú' = C3 BA). BinaryFormatter đã bị loại bỏ trong .NET 9: KHÔNG dùng trong mô phỏng.
- System.Text.Json mặc định phân biệt chữ hoa thường khi đọc; thuộc tính thiếu → giá trị mặc định; thuộc tính thừa → bị bỏ qua.
- Xuống dòng: `\r\n` Windows, `\n` macOS/Linux. Ví dụ đường dẫn dùng kiểu Windows có chú thích ngắn khi cần.

## 7. Tạo file, build, kiểm thử (BẮT BUỘC cho từng bài)
1. Viết file `$S/lessons/m<chuong>-<slug>.js` bằng Write (CHỈ file của bài mình; đặt tên có số chương).
2. Build đúng file của bạn: `python3 $S/build.py $S/lessons/m1-a.js $S/lessons/m1-b.js` (in ra đường dẫn index.html; không chạy build cho file người khác, không chạy build không tham số).
3. Kiểm thử: `cd $PW && node test.js $S/shots <đường dẫn tuyệt đối index.html...>` rồi `node scan.js <đường dẫn tuyệt đối index.html...>` rồi `node cut.js <...>`. test.js bấm hết các bước của mọi tab ở 390px và 1280px, in tiêu đề và giải thích từng bước, báo tràn ngang, lỗi JS, bài không có bước, khung code bị cắt. scan.js quét mọi bước tìm `[object Object]`, `undefined`, `NaN`. cut.js liệt kê dòng code bị cắt (nên không còn dòng nào).
   Đường dẫn index.html tuyệt đối: `/Users/tuananhcan/Downloads/programming-course-demos/<output_path>` (có trong spec).
4. ĐỌC output: kiểm từng bước đúng sự thật C#, số liệu đúng, lời giải thích khớp với dòng code được tô sáng và với hình ở bước đó. XEM ẢNH: mở bằng Read `$S/shots/<ten-thu-muc-bai>-<tab>-390.png` cho MỌI bài (ít nhất một tab mỗi bài; bài nhiều hình thì xem thêm tab khác): hình không bị cắt, không quá nhỏ, không chồng chéo, dễ nhìn. Sửa rồi chạy lại tới khi `ALL OK`, scan không lỗi và hình đẹp.
5. Không ghi file ngoài `$S/lessons/` và thư mục đầu ra của build. Không sửa `template.html`, `viz_lib.js`, `viz.css`, `build.py`. Nếu cần hình/chức năng khung chưa có: tạo bằng HTML tùy chỉnh trong bài và ghi vào báo cáo để người điều phối cân nhắc thêm vào thư viện. Không chạy git. Không sửa file Excel.

## 8. Báo cáo cuối (ngắn, tiếng Việt)
Mỗi bài một dòng: `stt | tên file .js | đường dẫn index.html | số tab / số bước | hình dùng | giả định hoặc đơn giản hóa`. Cuối cùng: bài nào không làm được hoặc lệch spec và lý do; đề xuất thay đổi khung/thư viện nếu có. Không dán lại code.
