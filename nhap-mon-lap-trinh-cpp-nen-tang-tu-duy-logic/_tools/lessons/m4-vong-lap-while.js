// META {"module":4,"lesson":"Bài 4.4. Vòng lặp while","activity":"Vòng Lặp While","title":"while: người gác cổng kiểm tra trước","lead":"Xem while kiểm tra điều kiện trước mỗi lượt như một người gác cổng. Chọn ví dụ rồi bấm <b>Bước tiếp</b>.","tabs":[["pin","Pin điện thoại (100% đến 20%)"],["nhap","Bắt nhập lại số dương"],["vohan","Quên i++ dẫn tới lặp vô hạn"]],"codeTitle":"Mã nguồn C++","path":"vong-lap/vong-lap-while/vong-lap-while/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';

/* người gác cổng: ok = cho vào, no = dừng */
function b18Gate(cond, ok){
  return vFlow([{t:'Người gác cổng', s:ok === null ? 'dim' : ok ? 'ok' : 'no', sub:cond + (ok === null ? '' : ok ? ' : đúng, cho vào' : ' : sai, dừng')}, {t:'Thân vòng lặp', s:ok ? 'hi' : 'dim'}], {title:'Cửa vòng lặp'});
}

var EX = {
pin:{inputs:[],
 intro:'Điện thoại dùng đến khi pin chỉ còn 20%. Hãy để ý người gác cổng kiểm tra trước mỗi lượt. Bấm "Bước tiếp".',
 lines:function(){ return [
  'int pin = 100;',
  'while (pin > 20) {',
  '  cout << "Dang su dung... Pin con: "',
  '       << pin << "%" << endl;',
  '  pin -= 20;',
  '}',
  'cout << "Pin yeu (" << pin',
  '     << "%). Vui long cam sac!"',
  '     << endl;']; },
 run:function(c){
  var pin = 100, rows = [], checks = 0, runs = 0;
  var H = ['Lần kiểm tra', 'pin', 'pin > 20', 'Thân chạy?'];
  function tr(){ return vTrace(H, rows, {title:'Bảng theo dõi'}); }
  function bar(v){ var p = v === undefined ? pin : v; return vBuf({label:'Pin (dừng khi còn 20%)', fill:p, text:p + '%'}); }
  function sc(){ return vScore([{k:'Lần kiểm tra', v:checks}, {k:'Lượt thân chạy', v:runs}]); }
  c.snap({ln:0, title:'Khai báo pin = 100', body:'Pin đầy 100%. Vòng lặp chưa bắt đầu.', viz:[bar(), tr()]});
  var first = true;
  while (true) {
    checks++;
    var ok = pin > 20;
    rows.push([String(checks), String(pin), {v:ok ? 'đúng' : 'sai', s:ok ? 'ok' : 'bad'}, ok ? 'có' : 'không']);
    if (!ok) break;
    runs++;
    var old = pin;
    var msg = 'Dang su dung... Pin con: ' + pin + '%';
    pin -= 20;
    if (first) {
      first = false;
      c.snap({ln:1, title:'Kiểm tra: ' + old + ' > 20', body:'Người gác cổng kiểm tra trước: ' + old + ' > 20 là đúng, cho vào thân vòng lặp.', viz:[b18Gate('pin > 20', true), bar(old), tr()]});
      c.out(msg);
      c.snap({ln:3, title:'In pin còn ' + old + '%', body:'Máy in "Dang su dung... Pin con: ' + old + '%".', viz:[b18Gate('pin > 20', true), bar(old), tr()]});
      c.snap({ln:4, title:'pin -= 20', body:'Pin tụt 20%, từ ' + old + ' còn ' + pin + '. Hết thân, máy quay lại kiểm tra điều kiện.', viz:[b18Gate('pin > 20', null), bar(), tr()]});
    } else {
      c.out(msg);
      c.snap({ln:4, title:'Lượt ' + runs + ': pin ' + old + ' còn ' + pin, body:'Kiểm tra ' + old + ' > 20 đúng, in "Pin con: ' + old + '%", rồi pin -= 20.', viz:[b18Gate('pin > 20', true), bar(), tr()]});
    }
  }
  c.snap({ln:1, title:'Kiểm tra: ' + pin + ' > 20', body:pin + ' > 20 là sai (vì dùng > chứ không phải >=). Người gác cổng giơ biển dừng, vòng lặp kết thúc.', viz:[b18Gate('pin > 20', false), bar(), tr()]});
  c.out('Pin yeu (' + pin + '%). Vui long cam sac!');
  c.snap({ln:6, title:'In cảnh báo pin yếu', body:'Máy chạy tiếp lệnh sau vòng lặp: "Pin yeu (' + pin + '%)".', viz:[bar(), tr()]});
  c.snap({ln:8, title:'Xong', body:'Thân vòng lặp chạy ' + runs + ' lượt nhưng điều kiện được kiểm tra ' + checks + ' lần (lần cuối là lần sai).',
   note:'while kiểm tra điều kiện trước mỗi lượt, và số lần kiểm tra luôn nhiều hơn số lượt chạy thân đúng 1 lần.', viz:[bar(), tr(), sc()]});
 }},
nhap:{inputs:[],
 intro:'Bắt người dùng nhập lại cho đến khi nhập số dương. Có thể thấy while chạy bao nhiêu lần phụ thuộc vào người nhập. Bấm "Bước tiếp".',
 lines:function(){ return [
  'int n;',
  'cout << "Nhap so nguyen duong: ";',
  'cin >> n;',
  'while (n <= 0) {',
  '  cout << "Sai roi! Phai nhap so"',
  '       << " duong. Nhap lai: ";',
  '  cin >> n;',
  '}',
  'cout << "Cam on, ban da nhap: "',
  '     << n << endl;']; },
 run:function(c){
  var typed = [-3, -10, 7], rows = [], cards = [];
  var H = ['Lần kiểm tra', 'n', 'n <= 0', 'Thân chạy?'];
  function tr(){ return vTrace(H, rows, {title:'Bảng theo dõi'}); }
  function chips(){ return vChips(cards.length ? cards : [{t:'(chưa nhập)', s:'dim'}], {title:'Các giá trị đã nhập (đỏ = bị từ chối)'}); }
  function bx(v, s){ return vBoxes([{name:'n', type:'int', v:v, s:s}], {frame:'Bộ nhớ · main()'}); }
  c.snap({ln:0, title:'Khai báo int n', body:'Máy dành hộp n, chưa có giá trị.', viz:[bx(null, 'new'), chips()]});
  c.write('Nhap so nguyen duong: ');
  c.snap({ln:1, wait:true, title:'Máy hỏi một số dương', body:'cout in lời hỏi rồi chờ người dùng gõ.', viz:[bx(null), chips()]});
  c.input(String(typed[0]));
  cards.push({t:String(typed[0]), s:'bad'});
  c.snap({ln:2, title:'cin >> n: người dùng gõ ' + typed[0], body:'Số ' + typed[0] + ' được cất vào n.', viz:[bx(typed[0], 'new'), chips()]});
  rows.push(['1', String(typed[0]), {v:'đúng', s:'ok'}, 'có']);
  c.write('Sai roi! Phai nhap so duong. Nhap lai: ');
  c.snap({ln:3, wait:true, title:'Kiểm tra: ' + typed[0] + ' <= 0', body:'Điều kiện đúng, người gác cổng cho vào thân: in lời nhắc nhập lại và chờ.', viz:[b18Gate('n <= 0', true), bx(typed[0]), chips(), tr()]});
  c.input(String(typed[1]));
  cards.push({t:String(typed[1]), s:'bad'});
  rows.push(['2', String(typed[1]), {v:'đúng', s:'ok'}, 'có']);
  c.snap({ln:6, title:'Nhập lại: ' + typed[1], body:typed[1] + ' vẫn là số âm. Hết thân, máy quay lại kiểm tra: ' + typed[1] + ' <= 0 vẫn đúng.', viz:[b18Gate('n <= 0', true), bx(typed[1], 'new'), chips(), tr()]});
  c.write('Sai roi! Phai nhap so duong. Nhap lai: ');
  c.snap({ln:5, wait:true, title:'Lại bị nhắc nhập lại', body:'Lượt thứ hai của thân vòng lặp: máy nhắc và chờ lần nhập thứ ba.', viz:[bx(typed[1]), chips(), tr()]});
  c.input(String(typed[2]));
  cards.push({t:String(typed[2]), s:'ok'});
  rows.push(['3', String(typed[2]), {v:'sai', s:'bad'}, 'không']);
  c.snap({ln:6, title:'Nhập lại: ' + typed[2], body:'Người dùng gõ ' + typed[2] + '. Máy quay lại kiểm tra: ' + typed[2] + ' <= 0 là sai, người gác cổng giơ biển dừng.', viz:[b18Gate('n <= 0', false), bx(typed[2], 'new'), chips(), tr()]});
  c.out('Cam on, ban da nhap: ' + typed[2]);
  c.snap({ln:8, title:'Thoát vòng lặp', body:'Máy chạy lệnh sau vòng lặp và in "Cam on, ban da nhap: ' + typed[2] + '".', viz:[bx(typed[2], 'ok'), chips(), tr()]});
  c.snap({ln:9, title:'Xong', body:'Thân vòng lặp chạy 2 lượt. Nếu nhập 7 ngay lần đầu, điều kiện sai ngay và thân chạy 0 lượt.',
   note:'while kiểm tra trước nên có thể chạy 0 lần; số lượt phụ thuộc vào dữ liệu người dùng nhập, không biết trước.', viz:[bx(typed[2], 'ok'), chips(), tr()]});
 }},
vohan:{inputs:[],
 intro:'Vòng lặp in 1 đến 5 nhưng quên i++. Mô phỏng tự dừng ở 1000 lượt cho gọn; máy thật sẽ chạy mãi. Bấm "Bước tiếp".',
 lines:function(){ return [
  'int i = 1;',
  'while (i <= 5) {',
  '  cout << i << " ";',
  '  // quên i++ ở đây',
  '}']; },
 run:function(c){
  var LIMIT = 1000, i = 1, runs = 0, rows = [];
  var H = ['Lần kiểm tra', 'i', 'i <= 5'];
  function bx(s){ return vBoxes([{name:'i', type:'int', v:i, s:s}], {frame:'Bộ nhớ · main()'}); }
  function tr(){ return vTrace(H, rows, {title:'Bảng theo dõi'}); }
  function cnt(s){ return vScore([{k:'Số lượt đã chạy', v:runs, s:s}]); }
  c.snap({ln:0, title:'i = 1', body:'Hộp i có giá trị 1. Thân vòng lặp không có lệnh nào làm i thay đổi.', viz:[bx('new'), cnt()]});
  for (var k = 1; k <= 3; k++) {
    runs++; rows.push([String(k), '1', {v:'đúng', s:'ok'}]); c.write('1 ');
    if (k === 1) c.snap({ln:2, title:'Lượt 1: 1 <= 5, in 1', body:'Điều kiện đúng, máy in 1. Hết thân, i vẫn bằng 1, máy quay lại kiểm tra.', viz:[b18Gate('i <= 5', true), bx('hi'), cnt(), tr()]});
    else c.snap({ln:2, title:'Lượt ' + k + ': i vẫn là 1', body:'1 <= 5 vẫn đúng, máy lại in 1. i đứng yên.', viz:[b18Gate('i <= 5', true), bx('hi'), cnt(), tr()]});
  }
  runs = LIMIT;
  c.out(''); c.err('(Mô phỏng dừng ở ' + LIMIT + ' lượt. Máy thật chạy mãi, dừng bằng Ctrl + C.)');
  c.snap({ln:1, title:'Bộ đếm tăng vọt', body:'Bộ đếm lượt tăng mãi nhưng i vẫn là 1, nên điều kiện i <= 5 không bao giờ sai.',
   viz:[bx('bad'), cnt('bad'), vCard({kind:'warn', title:'Lặp vô hạn', sub:'Mô phỏng tự dừng ở ' + LIMIT + ' lượt. Máy thật chạy mãi tới khi bị ép dừng.'})]});
  c.out('--- Sau khi thêm i++ ---'); c.out('1 2 3 4 5');
  c.snap({ln:3, title:'Thêm i++ vào cuối thân', body:'Chỉ cần thêm một dòng i++ để i tăng sau mỗi lượt. Khi i = 6, điều kiện sai và vòng lặp dừng; màn hình in 1 2 3 4 5.',
   viz:[vText(['int i = 1;', 'while (i <= 5) {', '  cout << i << " ";', {t:'  i++;  // thêm dòng này', s:'ok'}, '}'], {title:'Bản đã sửa'}), vChips([1, 2, 3, 4, 5].map(function(n){ return {t:String(n), s:'ok'}; }), {title:'Kết quả sau khi sửa'})]});
  c.snap({ln:3, title:'Xong', body:'Có i++ thì biến điều khiển tiến dần tới điểm dừng.',
   note:'Trong thân while phải có lệnh làm điều kiện tiến dần tới sai (i++, cin >> n, pin -= 20), nếu không vòng lặp chạy mãi.',
   viz:[vChips([1, 2, 3, 4, 5].map(function(n){ return {t:String(n), s:'ok'}; }), {title:'Kết quả sau khi sửa'})]});
 }}
};
