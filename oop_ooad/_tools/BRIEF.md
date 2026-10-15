# Làm bài mô phỏng cho khóa C#: OOP + OOAD (CodeGym)

Bạn viết các bài mô phỏng tương tác (1 file HTML độc lập mỗi bài) cho học viên mới học. Chỉ viết PHẦN DỮ LIỆU của bài (file `.js`); khung trang, engine, CSS đã có sẵn và `build.py` ghép lại.

## 1. Nguyên tắc nội dung (người dùng nhấn mạnh)
- Thật basic, dễ hiểu, dễ dùng, không cầu kỳ. Bám sát tên học liệu, mỗi bài MỘT ý chính.
- KHÔNG quiz, KHÔNG thử thách, KHÔNG chấm điểm. Chỉ quan sát và bấm từng bước. Tab chỉ để đổi tình huống.
- Chỉ làm đúng các bài trong file spec của bạn (`specs/mN.json`). Mỗi mục có `description` là cách hoạt động đã được duyệt: làm theo nó. Có thể đơn giản hóa thêm, không làm phức tạp hơn.
- Tiếng Việt, giọng ấm, ngắn gọn, không emoji. "rồi bấm" viết thường, không có dấu chấm đôi. Câu giải thích mỗi bước 1-2 câu.
- Mỗi bài 5-12 bước (mỗi tab). Bước cuối có title 'Xong' (hoặc kết luận tương đương) và `note` nêu ý chính cần nhớ.

## 2. Đọc trước khi viết (đừng đọc thêm thứ khác)
- `lessons/m2-lop-la-gi.js` (1 cột, đối tượng trong heap), `lessons/m2-tao-va-su-dung-doi-tuong.js` (nhiều tab, lỗi console), `lessons/m2-dong-goi-la-gi.js` (2 cột song song).
- Không cần đọc `template.html` trừ khi gặp lỗi lạ. Không sửa `template.html`, `base.css`, `build.py`, `test.js`. Nếu cần thay đổi khung, ghi vào báo cáo cuối.

## 3. Định dạng file `lessons/m<chuong>-<slug-khong-dau>.js`
Dòng 1 là META (JSON, một dòng):
`// META {"module":3,"lesson":"<đúng nguyên văn Lesson trong spec>","activity":"<đúng nguyên văn Activity trong spec>","title":"<tiêu đề ngắn>","lead":"<1 câu, có chữ \"Bấm <b>Bước tiếp</b>\">","tabs":[["key","Nhãn tab"]],"codeTitle":"Mã nguồn C#"}`
- `module`, `lesson`, `activity` phải khớp NGUYÊN VĂN spec (build dùng chúng để đặt thư mục). `codeTitle` tùy chọn (đổi nhãn khung code, ví dụ "Kịch bản Use Case").
- `tabs`: luôn có ít nhất 1 phần tử; key là chữ không dấu. Bài không nhiều tình huống thì 1 tab có nhãn mô tả.
Phần còn lại định nghĩa `var EX = { key: bài, ... }` (key khớp tabs).

Bài 1 cột:
```
{ inputs:[],            // hoặc [{id:'step',label:'step',def:2,min:1,max:9}]; P.step là số
  chips:[1,2,5],        // gợi ý, chỉ gán cho ô nhập đầu tiên (chỉ khi có inputs)
  intro:'Câu hướng dẫn... Bấm "Bước tiếp".',
  lines:function(P){ return ['dòng code 1', ...]; },
  run:function(c,P){ c.snap({...}); ... } }
```
Bài 2 cột (chạy song song): `{ intro, running, done, note, cols:[{title, sub, lines:[...], run:function(c){...}}, {...}] }`. Mỗi lần bấm cả hai cột tiến một snapshot, cột xong sớm giữ nguyên bước cuối. `done` ghi kết luận so sánh (nên tính từ dữ liệu thật). Chỉ dùng đúng 2 cột.

`c.snap({ ln, title, body, note, vars, arrs, objs, uml })`:
- `ln`: chỉ số dòng code (từ 0) được tô sáng. Mọi snapshot nên có ln hợp lệ (trừ bước giới thiệu chưa chạy dòng nào thì để ln:0 hoặc bỏ).
- `title`: ngắn (hệ thống tự thêm "Bước n · "). `body`: giải thích 1-2 câu. `note`: chỉ ở bước cuối.
- `vars`: `[['tên', giá trị, hi?]]` ô biến (hi=1 tô vàng). Biến tham chiếu viết `'→ Car#1'`, null viết `'null'`.
- `objs`: đối tượng trong heap: `O('Car#1', [['Color', S('Đỏ'), 'hi'], ['Speed', 0]], {hi:1, dim:0, tag:'đang chạy Bark()'})`. Field = `[tên, giá trị, cờ]` cờ: 'hi' (vàng) | 'ok' (xanh) | 'bad' (đỏ). `S('abc')` cho chuỗi có nháy, `'null'` cho null. Đối tượng không còn ai tham chiếu: `{dim:1}` (mờ, nét đứt). Mã đối tượng #1, #2... theo thứ tự tạo.
- `arrs`: `[AR('tên', [giá trị...], hiIdx[], doneIdx[], dimIdx[])]` mảng/danh sách ô (dùng cho List<T>, danh sách ứng viên...). Rỗng thì hiện ô trống.
- `uml`: sơ đồ lớp UML vẽ bằng SVG, hiện trong khung Bộ nhớ: `{boxes:[{id,name,stereo,attrs:[],methods:[],c,r,hi,dim,bad,abs}], links:[{a,b,type,la,lb,label,hi}]}`
  - `c`,`r`: cột, hàng (từ 0). Đúng tối đa 2 cột (điện thoại 390px), số hàng tùy ý. `stereo`:'interface'|'enumeration'. `abs:1` = tên in nghiêng (abstract). `attrs/methods`: chuỗi như `'- name: string'` hoặc `{t:'+ Eat(): void', hi:true}`.
  - `type`: 'inherit' (a kế thừa b, tam giác rỗng ở b) | 'real' (a thực thi interface b, nét đứt) | 'assoc' | 'dassoc' (mũi tên ở b) | 'aggr' (thoi rỗng ở a = toàn thể) | 'comp' (thoi đặc ở a) | 'dep' (nét đứt, mũi tên ở b). `la`,`lb` = đa số (multiplicity) đầu a, đầu b. `label` nhãn giữa.
  - Giữ nguyên vị trí (c,r) của mỗi hộp qua các bước, chỉ đổi hi/dim/links; thêm hộp/liên kết dần theo bước.
- `c.out('dòng in ra console')`, `c.err('dòng lỗi (chữ đỏ)')`. Gọi TRƯỚC `c.snap` của bước tạo ra dòng đó.
- Helper có sẵn: `O`, `S`, `AR`, `CC`. Không dùng thư viện ngoài, không localStorage.

Ô nhập số nguyên: 1-3 chữ số, min/max; chỉ dùng khi thật sự giúp hiểu (ví dụ đổi tham số). Ô nhập chuỗi: `text:'^[A-Za-z0-9#]{1,8}$', msg:'...', w:110`. Mặc định (def) phải cho kết quả minh họa tốt.

## 4. Quy tắc code C# trong khung `lines`
- Dòng ngắn (tối đa khoảng 34 ký tự, tránh bị cắt trên điện thoại): thụt lề 2 dấu cách, tách dòng dài ra nhiều dòng (ví dụ `if (x > balance)` rồi `return false;` ở dòng sau).
- Tô màu cú pháp tự động cho: class public private protected internal static this base virtual override abstract interface readonly get set value is as new return int string bool double decimal void var true false null if else for foreach while try catch throw. Không cần tự tô.
- Mã phải biên dịch được trong C# thật (trừ chỗ cố ý minh họa lỗi biên dịch: khi đó ghi mã lỗi thật bằng `c.err('error CS0122: ...')` và dòng bị lỗi tô sáng).
- Với bài mô phỏng không có code (kịch bản, đoạn mô tả), `lines` là các dòng văn bản; đặt `codeTitle` phù hợp.

## 5. Sự thật C# phải đúng
- `new` tạo đối tượng; trường chưa gán nhận mặc định (string/đối tượng: null, int: 0, bool: false, double: 0). Biến kiểu lớp chứa tham chiếu; gán `b = a` chỉ chép tham chiếu. Gọi thành viên trên null: NullReferenceException ("Object reference not set to an instance of an object.").
- Truyền int/struct vào phương thức: truyền bản sao; truyền đối tượng: truyền bản sao tham chiếu (sửa trường thấy ở ngoài, gán lại tham số không ảnh hưởng ngoài).
- Truy cập trái quy tắc là LỖI BIÊN DỊCH, không phải lỗi lúc chạy: private -> `CS0122: 'X.y' is inaccessible due to its protection level`; protected truy cập từ ngoài cũng CS0122; chỉ-đọc gán ngoài: `CS0200`/`CS0272` (property không có set / set private); abstract `new`: `CS0144: Cannot create an instance of the abstract type or interface 'X'`; lớp con không override abstract: `CS0534`; không thực thi đủ interface: `CS0535`; nạp chồng chỉ khác kiểu trả về: `CS0111`; kế thừa 2 lớp: `CS1721`; gọi phương thức không có trên kiểu của biến: `CS1061`.
- Constructor: new -> cấp bộ nhớ (trường mặc định) -> chạy constructor lớp CHA trước (`: base(...)`), rồi constructor lớp con. `: this(...)` gọi constructor khác cùng lớp trước. Trong constructor `name = name;` (tham số trùng tên trường) chỉ gán tham số cho chính nó, trường vẫn null; phải `this.name = name;`.
- virtual/override: gọi qua biến kiểu cha trỏ đối tượng con -> chạy bản override của đối tượng thật. Không có virtual (che bằng `new`) -> chạy theo kiểu của biến. Overloading chọn lúc biên dịch theo số lượng/kiểu đối số; overriding chọn lúc chạy.
- `(Cat)a` khi a là Dog: InvalidCastException ("Unable to cast object of type 'Dog' to type 'Cat'."); `a as Cat` cho null; `a is Dog d` kiểm tra rồi gán.
- Chuỗi bất biến. `int.Parse("abc")` ném FormatException; `int.TryParse` trả false. Chia int/int là chia nguyên.
- Rác: đối tượng không còn tham chiếu sẽ được bộ gom rác thu hồi lúc nào đó; trong mô phỏng ghi "không còn ai tham chiếu, sẽ bị thu hồi" (đừng nói bị xóa ngay).
- Interface: lớp thực thi nhiều interface được; một lớp cha duy nhất. Abstract class có constructor/trường/phương thức đầy đủ.
- Không bịa kết quả: tính bằng code JS thật trong `run` khi có phép tính (tổng, đếm, so sánh).

## 6. Tạo file, build, kiểm thử (BẮT BUỘC cho từng bài)
Thư mục gốc: `/private/tmp/claude-501/-Users-tuananhcan-Downloads-programming-course-demos/3e4056f8-3850-4b3a-b9e7-246b6151df9e/scratchpad` (gọi là $S).
1. Viết file `$S/oopsim/lessons/m<chuong>-<slug>.js` bằng Write (CHỈ file của bài mình làm; không chạy build cho file người khác).
2. Build đúng các file của bạn: `python3 $S/oopsim/build.py $S/oopsim/lessons/mX-a.js $S/oopsim/lessons/mX-b.js` (in ra đường dẫn index.html; đường dẫn tương đối từ thư mục repo `/Users/tuananhcan/Downloads/programming-course-demos`).
3. Kiểm thử: `cd $S/pwnode && node test.js $S/shots <đường dẫn tuyệt đối index.html...>`. Công cụ bấm hết các bước của mọi tab ở 390px và 1280px, in tiêu đề + giải thích từng bước, báo tràn ngang (scrollWidth > 390), lỗi JS, bài không có bước. Cuối cùng in `ALL OK` hoặc `FAIL`.
4. ĐỌC output: kiểm từng bước đúng sự thật C#, số liệu đúng, lời giải thích khớp với dòng code tô sáng và với trạng thái bộ nhớ, không còn sót bước vô nghĩa. Với bài có sơ đồ UML, bài 2 cột hoặc bài lạ: mở 1 ảnh `$S/shots/<ten-thu-muc-bai>-<tab>-390.png` bằng Read để xem bố cục (code không bị cắt, sơ đồ không quá nhỏ). Sửa rồi chạy lại cho tới khi `ALL OK` và nội dung đúng.
5. Không viết file ra ngoài `$S/oopsim/lessons/` và thư mục build đầu ra. Không chạy git. Không sửa file Excel.

## 7. Báo cáo cuối (ngắn, tiếng Việt)
Mỗi bài một dòng: tên file `.js`, đường dẫn index.html, số tab/số bước, giả định/đơn giản hóa đã chọn. Cuối cùng liệt kê bài nào KHÔNG làm được/lệch spec và lý do, hoặc đề xuất thay đổi khung nếu có. Không dán lại code.

## 8. Lưu ý rút ra
- Không đặt hàm/biến toàn cục tên `mk`, `O`, `S`, `AR`, `CC`, `esc`, `hl`, `P`, `EX` trong file bài (trùng với khung, gây lỗi `c.snap is not a function`).
- Thư mục ảnh `shots` dùng chung: tên ảnh theo tên thư mục bài nên dễ bị ghi đè nếu hai bài trùng tên; xem ảnh ngay sau khi test.
