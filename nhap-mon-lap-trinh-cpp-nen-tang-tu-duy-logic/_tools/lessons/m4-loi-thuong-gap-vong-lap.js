// META {"module":4,"lesson":"Bài 4.6. Tổng hợp và luyện tập vòng lặp","activity":"Lỗi Thường Gặp Khi Dùng Vòng Lặp","title":"Bốn thẻ lỗi thường gặp ở vòng lặp","lead":"Mỗi thẻ là một đoạn code có lỗi. Chọn thẻ rồi bấm <b>Bước tiếp</b> để xem lỗi xảy ra thế nào và cách sửa.","tabs":[["quen","Thẻ 1: Quên i++"],["luon","Thẻ 2: x > 0 || x < 20"],["chet","Thẻ 3: i = 10; while (i < 5)"],["thay","Thẻ 4: while thay cho for"]],"codeTitle":"Mã nguồn C++","path":"vong-lap/tong-hop-va-luyen-tap-vong-lap/loi-thuong-gap-khi-dung-vong-lap/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';

var B20_LIMIT = 1000;
/* nhãn loại lỗi trên thẻ (chỉ để đọc, không có câu hỏi) */
function b20Tag(kind, name, fix){
  return vCard({kind:kind, title:name, sub:fix});
}
function b20Fixed(lines, title){ return vText(lines, {title:title || 'Bản đã sửa'}); }
function b20Cnt(n, s){ return vScore([{k:'Số lượt đã chạy', v:n, s:s}]); }

var EX = {
quen:{inputs:[],
 intro:'Thẻ lỗi 1: vòng while không có i++. Bấm "Bước tiếp" để xem biến điều khiển qua từng lượt. Mô phỏng tự dừng ở 1000 lượt.',
 lines:function(){ return ['int i = 1;', 'while (i <= 5) {', '  cout << i << " ";', '  // quên i++', '}']; },
 run:function(c){
  var rows = [], runs = 0;
  var H = ['Lượt', 'i', 'i <= 5'];
  function tr(){ return vTrace(H, rows, {title:'Bảng theo dõi biến điều khiển'}); }
  c.snap({ln:0, title:'Thẻ lỗi 1: quên cập nhật biến', body:'Đoạn code này biên dịch được, không có thông báo lỗi nào. Hãy theo dõi biến điều khiển i.',
   viz:[b20Tag('warn', 'Quên i++', 'Biến điều khiển i không bao giờ thay đổi.'), tr()]});
  for (var k = 1; k <= 3; k++) { runs++; rows.push([String(k), '1', {v:'đúng', s:'ok'}]); c.write('1 '); }
  c.snap({ln:2, title:'Ba lượt đầu: i luôn bằng 1', body:'Mỗi lượt máy in 1 rồi quay lại kiểm tra. i vẫn là 1 nên 1 <= 5 luôn đúng.', viz:[b20Cnt(runs), tr()]});
  runs = B20_LIMIT; rows = [['1', '1', {v:'đúng', s:'ok'}], ['2', '1', {v:'đúng', s:'ok'}], ['...', '1', {v:'đúng', s:'ok'}], [String(B20_LIMIT), '1', {v:'đúng', s:'ok'}]];
  c.out(''); c.err('(Mô phỏng dừng ở ' + B20_LIMIT + ' lượt. Máy thật chạy mãi, dừng bằng Ctrl + C.)');
  c.snap({ln:1, title:'Lặp vô hạn', body:'Bộ đếm lượt vọt lên mà i vẫn bằng 1. Điều kiện không bao giờ sai: đây là vòng lặp vô hạn.', viz:[b20Cnt(runs, 'bad'), tr(), vCard({kind:'warn', title:'Vòng lặp vô hạn', sub:'Mô phỏng tự dừng ở ' + B20_LIMIT + ' lượt.'})]});
  c.out('--- Sau khi thêm i++ ---'); c.out('1 2 3 4 5');
  c.snap({ln:3, title:'Cách sửa: thêm i++', body:'Thêm i++ vào cuối thân để i tăng 1, 2, 3, 4, 5, 6. Khi i = 6, điều kiện sai và vòng lặp dừng.',
   viz:[b20Fixed(['int i = 1;', 'while (i <= 5) {', '  cout << i << " ";', {t:'  i++;  // thêm dòng này', s:'ok'}, '}']), vChips([1, 2, 3, 4, 5].map(function(n){ return {t:String(n), s:'ok'}; }), {title:'Kết quả sau khi sửa'})]});
  c.snap({ln:3, title:'Xong', body:'Câu hỏi cần tự hỏi: biến điều khiển có tiến dần tới điểm dừng không?',
   note:'Vòng lặp lỗi thường vẫn biên dịch được. Cách bắt lỗi là theo dõi biến điều khiển qua từng lượt.', viz:[b20Tag('ok', 'Nhóm lỗi: lặp vô hạn', 'Sửa bằng cách cập nhật biến điều khiển trong thân vòng lặp.')]});
 }},
luon:{inputs:[],
 intro:'Thẻ lỗi 2: điều kiện x > 0 || x < 20 trông có vẻ hợp lý. Bấm "Bước tiếp" để thử vài giá trị của x.',
 lines:function(){ return ['int x = 10;', 'while (x > 0 || x < 20) {', '  x++;', '}']; },
 run:function(c){
  function t(x){ var a = x > 0, b = x < 20; return [String(x), {v:a ? 'đúng' : 'sai', s:a ? 'ok' : 'bad'}, {v:b ? 'đúng' : 'sai', s:b ? 'ok' : 'bad'}, {v:(a || b) ? 'đúng' : 'sai', s:(a || b) ? 'ok' : 'bad'}]; }
  var HH = ['x', 'x > 0', 'x < 20', 'x > 0 || x < 20'];
  c.snap({ln:0, title:'Thẻ lỗi 2: điều kiện luôn đúng', body:'Dấu || (HOẶC) chỉ cần một vế đúng là cả điều kiện đúng. Hãy thử vài giá trị x.', viz:[b20Tag('warn', 'Điều kiện luôn đúng', 'Vòng lặp không có lúc nào dừng.')]});
  c.snap({ln:1, title:'Thử x = -5, 10, 50', body:'x = -5: vế x < 20 đúng. x = 10: cả hai vế đúng. x = 50: vế x > 0 đúng. Giá trị nào cũng cho kết quả đúng.', viz:[vGrid([HH, t(-5), t(10), t(50)], {head:true, title:'Thử từng giá trị của x'})]});
  var x = 10, rows = [];
  for (var k = 1; k <= 4; k++) { rows.push([String(k), String(x), {v:'đúng', s:'ok'}]); x++; }
  c.snap({ln:2, title:'Chạy thật với x = 10', body:'Mỗi lượt x tăng 1: 10, 11, 12, 13... Điều kiện vẫn đúng vì x > 0 luôn đúng khi x đang tăng.', viz:[vTrace(['Lượt', 'x', 'Điều kiện'], rows, {title:'Bảng theo dõi'}), b20Cnt(4)]});
  c.out(''); c.err('(Mô phỏng dừng ở ' + B20_LIMIT + ' lượt, x = ' + (10 + B20_LIMIT) + '. Máy thật chạy mãi, dừng bằng Ctrl + C.)');
  c.snap({ln:1, title:'Lặp vô hạn', body:'Sau ' + B20_LIMIT + ' lượt x đã là ' + (10 + B20_LIMIT) + ' mà điều kiện vẫn đúng. Với mọi số nguyên x, ít nhất một vế luôn đúng.', viz:[b20Cnt(B20_LIMIT, 'bad'), vCard({kind:'warn', title:'Vòng lặp vô hạn', sub:'Mô phỏng tự dừng ở ' + B20_LIMIT + ' lượt.'})]});
  var r2 = [], y = 10; while (y > 0 && y < 20) { r2.push([String(r2.length + 1), String(y), {v:'đúng', s:'ok'}]); y++; }
  r2.push([String(r2.length + 1), String(y), {v:'sai', s:'bad'}]);
  c.out('--- Sau khi đổi || thành && ---'); c.out('Vong lap chay ' + (r2.length - 1) + ' luot, dung khi x = ' + y);
  c.snap({ln:1, title:'Cách sửa: đổi || thành &&', body:'Với &&, cả hai vế phải đúng. x = 10 tới 19 thì đúng; x = ' + y + ' làm vế x < 20 sai nên vòng lặp dừng sau ' + (r2.length - 1) + ' lượt.',
   viz:[b20Fixed(['int x = 10;', {t:'while (x > 0 && x < 20) {', s:'ok'}, '  x++;', '}']), vTrace(['Lượt', 'x', 'Điều kiện'], r2, {title:'Bảng theo dõi sau khi sửa'})]});
  c.snap({ln:1, title:'Xong', body:'Khi dùng && hoặc ||, hãy thử vài giá trị cụ thể để xem điều kiện có lúc nào sai không.',
   note:'x > 0 || x < 20 đúng với mọi số nguyên x. Điều kiện phải có khả năng sai thì vòng lặp mới dừng được.', viz:[b20Tag('ok', 'Nhóm lỗi: lặp vô hạn (do điều kiện logic)', 'Sửa bằng cách đổi || thành && để điều kiện có thể sai.')]});
 }},
chet:{inputs:[],
 intro:'Thẻ lỗi 3: i bắt đầu bằng 10 nhưng điều kiện đòi i < 5. Bấm "Bước tiếp" để xem điều gì xảy ra.',
 lines:function(){ return ['int i = 10;', 'while (i < 5) {', '  cout << "Cau lenh nay se"', '       << " khong hien ra";', '  i++;', '}', 'cout << "Ket thuc, khong in gi o tren";']; },
 run:function(c){
  function bx(v, s){ return vBoxes([{name:'i', type:'int', v:v, s:s}], {frame:'Bộ nhớ · main()'}); }
  c.snap({ln:0, title:'Thẻ lỗi 3: vòng lặp chết yểu', body:'i = 10. Lỗi này không làm chương trình treo, nhưng vòng lặp có thể không chạy lần nào.', viz:[bx(10, 'new'), b20Cnt(0)]});
  c.snap({ln:1, title:'Kiểm tra 10 < 5', body:'Điều kiện sai ngay từ lần kiểm tra đầu tiên. Máy bỏ qua cả thân vòng lặp.', viz:[bx(10, 'bad'), vCard({kind:'warn', title:'Điều kiện sai ngay từ đầu', sub:'10 < 5 là sai nên thân không chạy lần nào.'}), b20Cnt(0, 'no')]});
  c.out('Ket thuc, khong in gi o tren');
  c.snap({ln:6, title:'Nhảy tới lệnh sau vòng lặp', body:'Máy chạy ngay dòng cout cuối. Dòng bên trong vòng lặp không được in ra.', viz:[bx(10), b20Cnt(0, 'no')]});
  var r = [], i = 1; while (i < 5) { r.push([String(r.length + 1), String(i), {v:'đúng', s:'ok'}]); i++; }
  r.push([String(r.length + 1), String(i), {v:'sai', s:'bad'}]);
  c.snap({ln:0, title:'Cách sửa: khởi tạo cho hợp với điều kiện', body:'Nếu muốn chạy tới 4, i phải bắt đầu nhỏ hơn 5, ví dụ i = 1. Khi đó thân chạy ' + (r.length - 1) + ' lượt (i = 1 tới 4).',
   viz:[b20Fixed([{t:'int i = 1;', s:'ok'}, 'while (i < 5) {', '  cout << i << " ";', '  i++;', '}']), vTrace(['Lần kiểm tra', 'i', 'i < 5'], r, {title:'Bảng theo dõi sau khi sửa'})]});
  c.snap({ln:0, title:'Xong', body:'Cần kiểm tra ba thứ nhất quán: giá trị khởi tạo, dấu so sánh và chiều tăng giảm.',
   note:'Điều kiện sai ngay từ lần kiểm tra đầu tiên thì while chạy 0 lần; đây là lỗi logic, trình biên dịch không báo.', viz:[b20Tag('ok', 'Nhóm lỗi: chết yểu (không chạy lần nào)', 'Sửa giá trị khởi tạo hoặc dấu so sánh cho nhất quán.')]});
 }},
thay:{inputs:[],
 intro:'Thẻ lỗi 4: cùng in 5 dòng Hello, một cách dùng while và một cách dùng for. Bấm "Bước tiếp" để so sánh.',
 lines:function(){ return ['cout << "-- while --\\n";', 'int i = 1;', 'while (i <= 5) {', '  cout << "Hello\\n";', '  i++;', '}', 'cout << "-- for --\\n";', 'for (int k = 1; k <= 5; k++) {', '  cout << "Hello\\n";', '}']; },
 run:function(c){
  function parts(s1, s2, s3){ return vChips([{t:'i = 1', s:s1, label:'khởi tạo (dòng 2)'}, {t:'i <= 5', s:s2, label:'điều kiện (dòng 3)'}, {t:'i++', s:s3, label:'cập nhật (dòng 5)'}], {title:'Ba phần việc nằm ở 3 chỗ'}); }
  function parts2(){ return vChips([{t:'int k = 1; k <= 5; k++', s:'ok', label:'cả ba phần trên một dòng'}], {title:'Ba phần việc nằm trên 1 dòng'}); }
  c.out('-- while --');
  c.snap({ln:1, title:'Cách 1: dùng while', body:'while tách ba phần việc ra ba chỗ: khởi tạo i, điều kiện, và cập nhật i++. Quên dòng i++ là chương trình chạy vô hạn.', viz:[parts('hi', 'hi', 'hi')]});
  for (var k = 0; k < 5; k++) c.out('Hello');
  c.snap({ln:5, title:'Chạy cách 1', body:'Thân chạy 5 lượt, in 5 dòng Hello. Kết thúc với i = 6.', viz:[parts('ok', 'ok', 'ok'), vScore([{k:'Dòng Hello', v:5, s:'ok'}, {k:'Chỗ cần nhớ', v:3}])]});
  c.out('-- for --');
  c.snap({ln:7, title:'Cách 2: dùng for', body:'for gom khởi tạo, điều kiện và cập nhật vào chung một dòng, nên khó quên bước cập nhật.', viz:[parts2()]});
  for (var j = 0; j < 5; j++) c.out('Hello');
  c.snap({ln:9, title:'Chạy cách 2', body:'Cũng 5 lượt, cũng in 5 dòng Hello. Kết quả giống hệt cách 1.', viz:[parts2(), vScore([{k:'Dòng Hello', v:5, s:'ok'}, {k:'Chỗ cần nhớ', v:1, s:'ok'}])]});
  c.snap({ln:9, title:'Xong', body:'Hai cách cho kết quả giống nhau, nhưng biết trước số lần lặp thì for gọn và ít lỗi hơn.',
   note:'Chọn đúng công cụ: biết trước số lần lặp thì dùng for; số lần phụ thuộc điều kiện thì dùng while; cần chạy ít nhất một lần thì dùng do...while.',
   viz:[vText(['1. Điểm dừng: biến điều khiển có tiến tới điều kiện dừng không?', '2. Logic điều kiện: điều kiện có lúc nào sai không?', '3. Công cụ phù hợp: for, while hay do...while?'], {title:'Ba điều cần nhìn trước khi chạy vòng lặp', noNo:true})]});
 }}
};
