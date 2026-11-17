// META {"module":5,"lesson":"Bài 5.3. Hàm xử lý chuỗi và duyệt ký tự","activity":"Các Hàm Xử Lý Chuỗi Thông Dụng","title":"Hàm string: length, substr, find","lead":"Xem string như một dải ô có chỉ số, và các hàm đếm, cắt, tìm trên dải đó. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["cat","length() và substr()"],["tim","find() và npos"],["tach","Tách họ và tên"]],"codeTitle":"Mã nguồn C++","path":"xu-ly-chuoi/ham-xu-ly-chuoi-va-duyet-ky-tu/cac-ham-xu-ly-chuoi-thong-dung/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Dải ký tự và chỉ số';

/* Số liệu lấy từ JS thật: string::npos của máy 64-bit = 2^64 - 1 */
var B8_NPOS = (BigInt(1) << BigInt(64)) - BigInt(1);
function b8Chars(s, name, o){ o = o || {}; o.name = name; return vChars(s, o); }

var EX = {
'cat':{inputs:[],
 intro:'Chuỗi ngayStr là một dải ô, mỗi ô một ký tự, đánh số từ 0. Xem length() đếm và substr() cắt. Bấm "Bước tiếp".',
 lines:function(){ return [
  'string ngayStr = "15/07/2026";',
  'cout << ngayStr.length();',
  'cout << ngayStr.substr(0, 2);',
  'cout << ngayStr.substr(3, 2);',
  'cout << ngayStr.substr(6, 4);',
  'cout << ngayStr.substr(6);',
  'cout << ngayStr.substr(2, 5);']; },
 run:function(c){
  var s = '15/07/2026', n = s.length;
  var all = function(st){ var m = {}; for (var i = 0; i < n; i++) m[i] = st; return m; };
  c.snap({ln:0, title:'Chuỗi là dải ô', body:'Mỗi ký tự nằm trong một ô, chỉ số bắt đầu từ 0. Dấu / cũng là một ký tự.',
   viz:b8Chars(s, 'ngayStr', {})});
  c.out(String(n));
  c.snap({ln:1, title:'length() đếm số ô', body:'length() đếm tất cả các ô: ' + n + ' ký tự.',
   viz:b8Chars(s, 'ngayStr', {cells:all('hi'), len:true})});
  var parts = [[0, 2, 'substr(0, 2)', 'Bắt đầu ở ô 0, lấy 2 ô.'], [3, 2, 'substr(3, 2)', 'Bắt đầu ở ô 3, lấy 2 ô. Dấu / ở ô 2 bị bỏ qua.'], [6, 4, 'substr(6, 4)', 'Bắt đầu ở ô 6, lấy 4 ô.']];
  parts.forEach(function(p, k){
   var r = s.substr(p[0], p[1]); c.out(r);
   c.snap({ln:2 + k, title:p[2] + ' = "' + r + '"', body:p[3] + ' Số thứ hai là số ô cần lấy.', viz:b8Chars(s, 'ngayStr', {sel:[p[0], p[1]]})});
  });
  var r5 = s.substr(6); c.out(r5);
  c.snap({ln:5, title:'substr(6) = "' + r5 + '"', body:'Không có số thứ hai thì lấy từ ô 6 cho tới hết chuỗi.', viz:b8Chars(s, 'ngayStr', {sel:[6, n - 6]})});
  var r6 = s.substr(2, 5); c.out(r6);
  c.snap({ln:6, title:'Bẫy: substr(2, 5)', body:'Số thứ hai là số ô, không phải vị trí kết thúc. Lấy 5 ô từ ô 2 được "' + r6 + '", không phải "từ ô 2 đến ô 5".',
   note:'substr(vị trí, số ký tự): số thứ hai là SỐ LƯỢNG ô cần lấy. length() đếm mọi ký tự, kể cả dấu cách.',
   viz:b8Chars(s, 'ngayStr', {sel:[2, 5]})});
 }},

'tim':{inputs:[],
 intro:'find() quét chuỗi từ trái sang phải để tìm một ký tự. Xem khi tìm thấy và khi không thấy. Bấm "Bước tiếp".',
 lines:function(){ return [
  'string email = "hocvien@gmail.com";',
  'size_t a = email.find(\'@\');',
  'cout << a << endl;',
  'size_t b = email.find(\'#\');',
  'cout << b << endl;',
  'if (b == string::npos)',
  '  cout << "Khong tim thay";']; },
 run:function(c){
  var s = 'hocvien@gmail.com', n = s.length, a = s.indexOf('@');
  var scan = function(upTo){ var m = {}; for (var i = 0; i < upTo; i++) m[i] = 'dim'; return m; };
  c.snap({ln:0, title:'Chuỗi email', body:'Chuỗi có ' + n + ' ký tự. Dấu @ nằm ở ô ' + a + '.', viz:b8Chars(s, 'email', {idx:true})});
  c.snap({ln:1, title:'find(\'@\') quét từ trái', body:'find() xét từng ô từ ô 0. Các ô hocvien không phải @ nên được bỏ qua.',
   viz:b8Chars(s, 'email', {cells:scan(a)})});
  c.out(String(a));
  c.snap({ln:2, title:'Tìm thấy ở ô ' + a, body:'Gặp @ ở ô ' + a + ' thì dừng, trả về vị trí đầu tiên tìm thấy.',
   viz:b8Chars(s, 'email', {cells:scan(a), find:a})});
  c.snap({ln:3, title:'find(\'#\') quét hết chuỗi', body:'Không có ô nào chứa #, find() quét tới hết chuỗi mà không thấy.',
   viz:b8Chars(s, 'email', {cells:scan(n), npos:true})});
  c.out(B8_NPOS.toString());
  c.snap({ln:4, title:'In ra số rất lớn', body:'Không thấy thì find() trả về string::npos, là một số rất lớn (trên máy 64-bit là ' + B8_NPOS + '). Không phải -1.',
   viz:vScore([{k:'b = string::npos', v:B8_NPOS.toString(), s:'hi'}])});
  c.out('Khong tim thay');
  c.snap({ln:6, title:'So với string::npos', body:'Điều kiện b == string::npos đúng, nên chương trình biết là không tìm thấy.',
   note:'find() trả về vị trí đầu tiên, hoặc string::npos nếu không thấy. Luôn so với string::npos, đừng so với -1.',
   viz:[vCard({kind:'ok', title:'b == string::npos', sub:'Đúng, không tìm thấy'}), vScore([{k:'a (tìm @)', v:String(a)}, {k:'b (tìm #)', v:'npos', s:'hi'}])]});
 }},

'tach':{inputs:[],
 intro:'Tách họ tên "Nguyen Van An" thành phần họ và phần tên: tìm dấu cách cuối cùng rồi cắt hai lần. Bấm "Bước tiếp".',
 lines:function(){ return [
  'string hoTen = "Nguyen Van An";',
  'size_t vt = hoTen.find_last_of(\' \');',
  'string ho = hoTen.substr(0, vt);',
  'string ten = hoTen.substr(vt + 1);',
  'cout << "Ho va ten dem: " << ho;',
  'cout << "Ten: " << ten;']; },
 run:function(c){
  var s = 'Nguyen Van An', vt = s.lastIndexOf(' '), ho = s.substr(0, vt), ten = s.substr(vt + 1);
  var rest = function(){ var m = {}; for (var i = vt + 1; i < s.length; i++) m[i] = 'dim'; return m; };
  c.snap({ln:0, title:'Chuỗi họ tên', body:'Có 2 dấu cách (ô 6 và ô ' + vt + '). Ta muốn tìm dấu cách cuối cùng.', viz:b8Chars(s, 'hoTen', {})});
  c.snap({ln:1, title:'find_last_of(\' \') quét từ phải', body:'Hàm này quét từ cuối chuỗi về đầu. Gặp dấu cách đầu tiên bên phải là ô ' + vt + '.',
   viz:b8Chars(s, 'hoTen', {cells:rest(), find:vt})});
  c.snap({ln:1, title:'vt = ' + vt, body:'Biến vt giữ vị trí ' + vt + '. Ô này là chỗ để cắt.', viz:[b8Chars(s, 'hoTen', {cells:rest(), find:vt}), vScore([{k:'vt', v:String(vt), s:'hi'}])]});
  c.snap({ln:2, title:'substr(0, vt) = "' + ho + '"', body:'Từ ô 0, lấy vt = ' + vt + ' ô. Đó là phần họ và tên đệm.', viz:b8Chars(s, 'hoTen', {sel:[0, vt]})});
  c.snap({ln:3, title:'substr(vt + 1) = "' + ten + '"', body:'Từ ô vt + 1 (bỏ dấu cách) cho tới hết chuỗi. Đó là phần tên.', viz:b8Chars(s, 'hoTen', {sel:[vt + 1, s.length - vt - 1]})});
  c.out('Ho va ten dem: ' + ho);
  c.snap({ln:4, title:'In phần họ', body:'Console in phần họ và tên đệm.', viz:b8Chars(s, 'hoTen', {sel:[0, vt]})});
  c.out('Ten: ' + ten);
  c.snap({ln:5, title:'Xong', body:'Một lần find_last_of và hai lần substr là đủ để tách.',
   note:'Kết hợp find (hoặc find_last_of) để tìm vị trí, rồi substr để cắt.',
   viz:[b8Chars(s, 'hoTen', {cells:(function(){ var m = {}; for (var i = 0; i < s.length; i++) m[i] = i < vt ? 'ok' : (i === vt ? 'dim' : 'new'); return m; })()}), vScore([{k:'ho', v:ho, s:'ok'}, {k:'ten', v:ten, s:'ok'}])]});
 }}
};
