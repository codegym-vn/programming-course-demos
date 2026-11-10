// META {"module":2,"lesson":"Bài 2.1. Biến và kiểu dữ liệu cơ bản","activity":"Kiểu Dữ Liệu Cơ Bản Trong C++","title":"Chọn sai kiểu thì chuyện gì xảy ra?","lead":"Xem ba hậu quả khi chọn sai kiểu: mất phần thập phân, tràn số và mất độ chính xác. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["cat","Cắt phần thập phân"],["tran","Tràn số"],["fd","float và double"]],"codeTitle":"Mã nguồn C++","path":"bien-kieu-du-lieu-va-toan-tu/bien-va-kieu-du-lieu-co-ban/kieu-du-lieu-co-ban-trong-cpp/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Hình minh họa';
var B6_HEAD = ['#include <iostream>', 'using namespace std;', ''];
var B6_MIN = -2147483648, B6_MAX = 2147483647;
function b6Dot(n){ return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
function b6Mem(boxes){ return vBoxes(boxes, {frame:'Bộ nhớ (RAM) · main()', empty:'main() chưa có biến nào.'}); }
function b6Bytes(hi){
  var all = [{name:'int', bytes:4}, {name:'long long', bytes:8}, {name:'float', bytes:4}, {name:'double', bytes:8}];
  return vBytes(all.map(function(t){ if (hi && hi.indexOf(t.name) >= 0) t.s = 'hi'; return t; }), {title:'Kích thước mỗi kiểu (máy 64-bit phổ biến)'});
}
function b6Wrap(v){ return ((v - B6_MIN) % 4294967296 + 4294967296) % 4294967296 + B6_MIN; }
var EX = {
cat:{inputs:[],
 intro:'Gán số có phần lẻ vào biến int: phần lẻ đi đâu? Bấm "Bước tiếp".',
 lines:function(){ return B6_HEAD.concat(['int main() {', '  int soLuong = 12.5;', '  cout << soLuong << endl;', '  int soAm = -3.9;', '  cout << soAm << endl;', '  return 0;', '}']); },
 run:function(c){
  var a = Math.trunc(12.5), b = Math.trunc(-3.9);
  function digits(txt, cut, s){ return vCells(txt.split('').map(function(ch, i){ return {v:ch, s:i >= cut ? 'del' : s}; }), {name:'giá trị gán vào (double)', small:true}); }
  c.snap({ln:3, dim:[0, 1], dimLabel:'xử lý lúc dịch', title:'Vào main()', body:'int chỉ chứa số nguyên. Xem điều gì xảy ra khi đưa số có phần lẻ vào.', viz:[b6Bytes(['int']), b6Mem([])]});
  c.snap({ln:4, title:'int soLuong = 12.5;', body:'Phần ".5" bị cắt bỏ hoàn toàn, hộp chỉ còn ' + a + '. Chương trình vẫn chạy bình thường và không báo lỗi.',
   viz:[digits('12.5', 2, 'ok'), b6Mem([{name:'soLuong', type:'int', v:a, s:'new'}])]});
  c.out(String(a));
  c.snap({ln:5, title:'cout << soLuong', body:'In ra ' + a + ', không phải 12.5.', viz:[digits('12.5', 2, 'ok'), b6Mem([{name:'soLuong', type:'int', v:a, s:'hi'}])]});
  c.snap({ln:6, title:'int soAm = -3.9;', body:'Số âm cũng bị cắt phần lẻ, về phía 0: còn ' + b + '. Đây không phải làm tròn (làm tròn sẽ ra -4).',
   viz:[digits('-3.9', 2, 'ok'), b6Mem([{name:'soLuong', type:'int', v:a}, {name:'soAm', type:'int', v:b, s:'new'}])]});
  c.out(String(b));
  c.snap({ln:7, title:'cout << soAm', body:'In ra ' + b + '.', viz:[digits('-3.9', 2, 'ok'), b6Mem([{name:'soLuong', type:'int', v:a}, {name:'soAm', type:'int', v:b, s:'hi'}])]});
  c.snap({ln:8, title:'Xong', body:'int luôn cắt bỏ phần thập phân, hướng về 0.',
   note:'Muốn giữ phần lẻ (giá tiền, chiều cao...) hãy dùng double. Chọn sai kiểu thường không báo lỗi mà chỉ cho kết quả sai.',
   viz:[b6Bytes(['int', 'double']), b6Mem([{name:'soLuong', type:'int', v:a}, {name:'soAm', type:'int', v:b}])]});
 }},
tran:{inputs:[],
 intro:'Cùng một số 8 tỷ, đưa vào long long và vào int. Bấm "Bước tiếp".',
 lines:function(){ return B6_HEAD.concat(['int main() {', '  long long lon = 8000000000;', '  cout << lon << endl;', '  int nho = 8000000000;', '  cout << nho << endl;', '  return 0;', '}']); },
 run:function(c){
  var V = 8000000000, W = b6Wrap(V), LL = 9223372036854775807;
  var rngInt = function(pos, v, s, note){ return vRange({min:b6Dot(B6_MIN), max:b6Dot(B6_MAX), pos:pos, v:v, s:s, note:note}); };
  var posW = (W - B6_MIN) / (B6_MAX - B6_MIN) * 100;
  c.snap({ln:3, dim:[0, 1], dimLabel:'xử lý lúc dịch', title:'Giới hạn của int', body:'int 4 byte chứa được từ ' + b6Dot(B6_MIN) + ' đến ' + b6Dot(B6_MAX) + ' (khoảng ±2,1 tỷ). long long 8 byte chứa được khoảng ±9,2 × 10^18.',
   viz:[b6Bytes(['int', 'long long']), rngInt(50, '0', null, 'Thanh phạm vi của int'), b6Mem([])]});
  c.snap({ln:4, title:'long long lon = 8000000000;', body:'long long có 8 byte nên chứa gọn 8 tỷ, nằm sâu trong phạm vi.',
   viz:[b6Bytes(['long long']), vRange({min:'-9,2 × 10^18', max:'9,2 × 10^18', pos:50, v:b6Dot(V), s:'ok', note:'Thanh phạm vi của long long: 8 tỷ rất nhỏ so với mép'}), b6Mem([{name:'lon', type:'long long', v:V, s:'new'}])]});
  c.out(String(V));
  c.snap({ln:5, title:'cout << lon', body:'In đúng ' + V + '.', viz:[b6Bytes(['long long']), vRange({min:'-9,2 × 10^18', max:'9,2 × 10^18', pos:50, v:b6Dot(V), s:'ok'}), b6Mem([{name:'lon', type:'long long', v:V, s:'hi'}])]});
  c.snap({ln:6, title:'int nho = 8000000000;', body:'8 tỷ vượt mép phải của int (' + b6Dot(B6_MAX) + '). Hộp 4 byte không chứa nổi. Trình biên dịch chỉ cảnh báo, không chặn.',
   viz:[b6Bytes(['int']), rngInt(100, b6Dot(V), 'bad', 'Vượt mép phải của int'), b6Mem([{name:'lon', type:'long long', v:V}])]});
  c.snap({ln:6, title:'Giá trị bị quay vòng', body:'g++ chỉ giữ lại 32 bit thấp của số này, nên kim nhảy sang phía âm và nho nhận giá trị ' + W + '.',
   viz:[b6Bytes(['int']), rngInt(posW, b6Dot(W), 'bad', 'Giá trị thực sự lưu trong int'), b6Mem([{name:'lon', type:'long long', v:V}, {name:'nho', type:'int', v:W, s:'bad'}])]});
  c.out(String(W));
  c.snap({ln:7, title:'cout << nho', body:'In ra ' + W + ', hoàn toàn sai so với 8 tỷ và không có thông báo lỗi nào khi chạy.',
   viz:[b6Bytes(['int']), rngInt(posW, b6Dot(W), 'bad'), b6Mem([{name:'lon', type:'long long', v:V}, {name:'nho', type:'int', v:W, s:'bad'}])]});
  c.snap({ln:8, title:'Xong', body:'Số lớn hơn mức int chứa được thì phải dùng long long.',
   note:'Lưu ý: kết quả -589934592 là cách g++ xử lý phép gán này, không phải quy tắc chung. Còn tràn khi tính toán trên int (ví dụ cộng hai số rất lớn) là hành vi không xác định: không được giả định là quay vòng.',
   viz:[b6Bytes(['int', 'long long']), rngInt(posW, b6Dot(W), 'bad'), b6Mem([{name:'lon', type:'long long', v:V}, {name:'nho', type:'int', v:W, s:'bad'}])]});
 }},
fd:{inputs:[],
 intro:'Lưu số π vào float và double rồi in ra. Bấm "Bước tiếp".',
 lines:function(){ return ['#include <iostream>', '#include <iomanip>', 'using namespace std;', '', 'int main() {', '  float f = 3.14159265358979;', '  double d = 3.14159265358979;', '  cout << f << " " << d << endl;', '  cout << fixed << setprecision(10);', '  cout << f << " " << d << endl;', '  return 0;', '}']; },
 run:function(c){
  var PI10 = Math.PI.toFixed(10), F10 = Math.fround(3.14159265358979).toFixed(10), D10 = (3.14159265358979).toFixed(10);
  var fv = Math.fround(3.14159265358979).toPrecision(8), dv = (3.14159265358979).toPrecision(15);
  var F = function(s){ return {name:'f', type:'float', v:fv, s:s}; }, D = function(s){ return {name:'d', type:'double', v:dv, s:s}; };
  var def = (3.14159265358979).toPrecision(6);
  function row(txt, name){
    var bad = false;
    return vCells(txt.split('').map(function(ch, i){ if (ch !== PI10[i]) bad = true; return {v:ch, s:bad ? 'bad' : 'ok'}; }), {name:name, small:true});
  }
  c.snap({ln:4, dim:[0, 1, 2], dimLabel:'xử lý lúc dịch', title:'Vào main()', body:'float và double đều lưu số thực, nhưng double có hộp lớn gấp đôi.', viz:[b6Bytes(['float', 'double']), b6Mem([])]});
  c.snap({ln:5, title:'float f = 3.14159265358979;', body:'float chỉ có 4 byte nên lưu π xấp xỉ, đúng khoảng 6 đến 7 chữ số có nghĩa.', viz:[b6Bytes(['float']), b6Mem([F('new')])]});
  c.snap({ln:6, title:'double d = 3.14159265358979;', body:'double có 8 byte nên lưu π chính xác hơn nhiều, khoảng 15 đến 16 chữ số có nghĩa.', viz:[b6Bytes(['double']), b6Mem([F(), D('new')])]});
  c.out(def + ' ' + def);
  c.snap({ln:7, title:'cout mặc định: giống hệt nhau', body:'Mặc định cout chỉ in 6 chữ số có nghĩa cho cả hai kiểu, nên ' + def + ' và ' + def + ' trông như nhau. Sự khác biệt vẫn có trong hộp nhưng chưa nhìn thấy.',
   viz:[b6Bytes(['float', 'double']), b6Mem([F('hi'), D('hi')])]});
  c.snap({ln:8, title:'fixed << setprecision(10)', body:'Yêu cầu cout in 10 chữ số sau dấu phẩy để thấy rõ sự khác biệt.', viz:[b6Bytes(['float', 'double']), b6Mem([F(), D()])]});
  c.out(F10 + ' ' + D10);
  c.snap({ln:9, title:'In 10 chữ số: float sai từ chữ số thứ 8', body:'So với π thật (' + PI10 + '), float đã lệch từ chữ số thứ 8 (xanh là đúng, đỏ là sai), còn double vẫn đúng đủ 10 chữ số.',
   viz:[row(PI10, 'π thật (10 chữ số thập phân)'), row(F10, 'float'), row(D10, 'double')]});
  c.snap({ln:10, title:'Xong', body:'float mất độ chính xác sớm hơn double.',
   note:'Tiền và đo lường nên dùng double; số đếm dùng int. float chỉ nên dùng khi cần tiết kiệm bộ nhớ.',
   viz:[row(PI10, 'π thật (10 chữ số thập phân)'), row(F10, 'float'), row(D10, 'double')]});
 }}
};
