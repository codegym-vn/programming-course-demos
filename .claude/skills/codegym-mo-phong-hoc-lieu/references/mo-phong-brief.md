# Hướng dẫn cho tác nhân viết mô phỏng

(Người điều phối điền `<SKILL>` = thư mục skill, `<CFG>` = đường dẫn course.json, `<TOOLS>` = <course_dir>/_tools, và số nhóm khi giao việc.)

Bạn viết các bài mô phỏng tương tác (mỗi bài một file HTML độc lập) cho học viên mới học lập trình. Bạn CHỈ viết phần DỮ LIỆU của bài (file `.js`). Khung trang, engine, CSS và thư viện hình minh họa có sẵn trong `<SKILL>/assets/template.html`; `build.py` ghép lại.

## 1. Nguyên tắc
- Rất đơn giản, dễ hiểu, dễ dùng, bám sát tên học liệu, MỘT ý chính mỗi bài. Học viên chỉ quan sát và bấm từng bước. KHÔNG quiz, KHÔNG thử thách, KHÔNG chấm điểm. Tab chỉ để đổi tình huống.
- Mỗi tab 4-9 bước. Bước cuối có title 'Xong' (hoặc kết luận) và `note` nêu ý chính cần nhớ.
- Tiếng Việt, giọng ấm, ngắn gọn, không emoji. "rồi bấm" viết thường. Mỗi bước 1-2 câu (`body`).
- Có khung "Hình minh họa" (HTML/SVG thuần) là nhân vật chính; khung code vẫn có để thấy dòng đang chạy.

## 2. Đầu vào
- `<TOOLS>/specs/groupN.json`: mỗi phần tử là một học liệu đã được người dùng duyệt với `goal`, `layout`, `visual`, `components`, `tabs`, `steps`, `sample_data`, `key_takeaway`, `notes`, `remark`, `opinion` (ý kiến người dùng — ưu tiên làm theo), `output_path`.
- LÀM THEO `steps` / `tabs` / `visual`. Được tinh chỉnh lời văn, tách/gộp bước cho dễ hiểu, không làm phức tạp hơn, không đổi ý chính. Số liệu, độ dài, kết quả: TÍNH BẰNG CODE JS THẬT trong `run`, không bịa.
- Đọc 2 bài mẫu trước khi viết: `<SKILL>/assets/examples/viz-nhieu-tab-catch.js` (nhiều tab + hình) và `<SKILL>/assets/examples/viz-hai-cot-list.js` (2 cột + hình). Bài OOP (đối tượng trong heap): `oop-nhieu-tab-doi-tuong.js`, `oop-hai-cot.js`.
- Sự thật kỹ thuật: `<SKILL>/references/csharp-facts.md`.

## 3. Định dạng file `<TOOLS>/lessons/m<chuong>-<slug-khong-dau>.js`
Dòng 1 là META (JSON một dòng):
`// META {"module":1,"lesson":"<nguyên văn>","activity":"<nguyên văn>","title":"<tiêu đề ngắn>","lead":"<1 câu, có chữ \"Bấm <b>Bước tiếp</b>\">","tabs":[["key","Nhãn tab"]],"codeTitle":"Mã nguồn C#"}`
- `module`, `lesson`, `activity` khớp NGUYÊN VĂN spec (build đặt thư mục theo chúng). `tabs` ít nhất 1 phần tử; nhãn đúng cột `tabs`; key không dấu. `codeTitle` tùy chọn (ví dụ "Tệp sp.csv", "Kịch bản Use Case" khi khung code chứa văn bản).
Phần còn lại: `var EX = { key: bài, ... }`.

Bài 1 cột:
```
{ inputs:[], chips:[],
  intro:'Câu hướng dẫn... Bấm "Bước tiếp".',
  lines:function(P){ return ['dòng code 1', ...]; },
  run:function(c,P){ c.snap({...}); ... } }
```
Bài 2 cột (đúng 2 cột, chạy song song): `{ intro, running, done, note, cols:[{title, sub, lines:[...], run:function(c){...}}, {...}] }`; mỗi lần bấm hai cột cùng tiến một snapshot, cột xong sớm giữ bước cuối; `done` ghi kết luận so sánh (tính từ dữ liệu).
Ô nhập (chỉ khi thật sự giúp hiểu): số `{id:'n',label:'n',def:5,min:1,max:99}`; chuỗi `{id:'input',label:'input',def:'abc',text:'^.{0,10}$',msg:'Nhập tối đa 10 ký tự',w:130}`; `chips:['abc','20']` gợi ý cho ô đầu tiên.

`c.snap({ ln, title, body, note, viz, vars, arrs, objs, uml })`
- `ln` dòng code tô sáng (từ 0). `title` ngắn (tự thêm "Bước n · "). `body` 1-2 câu. `note` chỉ ở bước cuối.
- `viz`: HTML khung Hình minh họa — chuỗi hoặc mảng chuỗi từ các hàm `v*` (mục 4). Có viz ở một bước thì nên có ở mọi bước (cùng cấu trúc, đổi trạng thái).
- `vars: [['tên', giá trị, hi?]]`; `arrs: [AR('tên', [...], hiIdx[], doneIdx[], dimIdx[])]`; `objs: [O('Car#1', [['Trường', giá trị, 'hi'|'ok'|'bad']], {hi, dim, tag})]` (biến tham chiếu viết `'→ Car#1'`, `S('abc')` = chuỗi có nháy); `uml: {boxes:[{id,name,stereo,attrs,methods,c,r,hi,dim,abs}], links:[{a,b,type,la,lb,label,hi}]}` (type: inherit | real | assoc | dassoc | aggr | comp | dep; tối đa 2 cột hộp). Khung Bộ nhớ tự ẩn nếu không có vars/arrs/objs/uml.
- `c.out('dòng console')`, `c.err('dòng lỗi chữ đỏ')` gọi TRƯỚC `c.snap` của bước tạo ra dòng đó. Console cộng dồn qua các bước.

## 4. Thư viện hình minh họa (chú thích chi tiết ở đầu mỗi hàm trong template; danh mục: `<SKILL>/references/thu-vien-hinh.json`)
Trạng thái `s`: 'hi' vàng (đang xét) | 'ok' xanh | 'bad' đỏ | 'dim' mờ | 'new' xanh + hiệu ứng xuất hiện | 'del' đỏ gạch | 'no' xám | 'f1'..'f4' bốn màu theo trường.
- `vCells(items, {name, cap, idx:false, small:true, ptr, ptrLabel, badges:[[nhãn,giá trị]]})` dãy ô; `vDrawers([{k,v,s}], {name})` tủ ngăn Dictionary; `vCard({kind:'err'|'ok'|'info'|'warn', title, sub, lines, rows:[[k,v]], tip})` thẻ lỗi/thông tin;
- `vFlow([{t,s,sub,item}], {title})` sơ đồ luồng/băng chuyền; `vGates([{t,s}], {pill, at})` cửa lọc catch; `vTree([{t,d,kind:'dir'|'file'|'cls',s,sub}])` cây; `vStack(frames từ ĐÁY lên, {ballText})` ngăn xếp lời gọi;
- `vLamps([{t,s,sub}], {title})` đèn; `vPair(htmlA, htmlB, {ta, tb, mid})` hai khung cạnh nhau; `vText(lines, {title, cursor, eol, noNo})` trình xem tệp/JSON (dòng là chuỗi, `{t,s}` hoặc `{seg:[{t,s,c}]}`, c: str|num|bool|null|key|tag);
- `vGrid(rows, {head, hiRow, hiCell, title})` bảng; `vBuf({label, fill, text})` bộ đệm; `vChips([{t,s,label}])` chip; `vBins({title,items,kind:'ok'}, {title,items,kind:'bad'})` hai thùng; `vScore([{k,v,s}])` bộ đếm.
Quy tắc: 1-3 hình mỗi bước, giữ cùng bộ hình xuyên suốt; hình đúng trạng thái của bước đó; màu thống nhất (vàng đang xét, xanh thành công/mới, đỏ lỗi, xám bỏ qua); 390px: tối đa ~8-10 ô một hàng, chuỗi dài thì tách. Được viết HTML riêng (dùng `esc()` và biến CSS `var(--cur)`, `var(--true)`, `var(--false)`...) nếu thật cần.
KHÔNG đặt hàm/biến toàn cục trùng tên khung: `mk`, `O`, `S`, `AR`, `CC`, `esc`, `hl`, `P`, `EX`, `vizHtml`, mọi tên `v` + chữ hoa (`vCells`...), `memHtml`, `arrHtml`, `render`, `build`, `step`, `snaps`, `err`. Hàm phụ đặt tên có tiền tố riêng (`myRow`, `tabData`) hoặc đặt trong `run`.

## 5. Code trong khung `lines`
Dòng ngắn (≤ ~36 ký tự), thụt lề 2 dấu cách, tách dòng dài. Mã biên dịch được (trừ chỗ cố ý minh họa lỗi biên dịch: `c.err('error CS0160: ...')`). Từ khóa tự tô màu.

## 6. Build và kiểm thử (BẮT BUỘC cho từng bài)
1. Viết `<TOOLS>/lessons/m<chuong>-<slug>.js` (chỉ file của mình).
2. `python3 <SKILL>/scripts/build.py --config <CFG> <file1.js> <file2.js>` (chỉ file của mình; không build không tham số).
3. `node <SKILL>/scripts/check_pages.js --shots <TOOLS>/shots <đường dẫn tuyệt đối index.html...>` — bấm hết mọi tab ở 390px/1280px, báo tràn ngang, lỗi JS, chữ hỏng ([object Object]/undefined/NaN) ở mọi bước, dòng code bị cắt, in tiêu đề + giải thích từng bước. Phải ra `ALL OK`.
4. ĐỌC log từng bước: đúng sự thật kỹ thuật, số liệu đúng, lời giải thích khớp dòng code tô sáng và hình. XEM ẢNH (Read) `<TOOLS>/shots/<thu-muc-bai>-<tab>-390.png` cho MỌI bài (ít nhất một tab, bài nhiều hình xem thêm): không cắt, không chồng chéo, không quá nhỏ. Sửa tới khi đạt.
5. Không sửa template/script của skill, không sửa Excel, không chạy git. Cần chức năng khung chưa có thì tự dựng HTML trong bài và ghi vào báo cáo.

## 7. Báo cáo (ngắn, tiếng Việt)
Mỗi bài một dòng: `stt | file .js | đường dẫn index.html | số tab / số bước | hình dùng | giả định, đơn giản hóa`. Cuối: bài lệch spec và lý do; đề xuất cho khung/thư viện.
