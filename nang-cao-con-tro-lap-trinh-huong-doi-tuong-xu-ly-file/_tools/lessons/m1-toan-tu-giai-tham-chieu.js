// META {"module":1,"lesson":"Bài 1.1. Địa chỉ bộ nhớ, biến con trỏ và giải tham chiếu","activity":"Toán Tử Giải Tham Chiếu (* - Dereference)","title":"Toán tử * đi theo mũi tên","lead":"Xem *p đọc và ghi vào ô mà p đang trỏ tới. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["docghi","Đọc và ghi qua *p"],["doi","Đổi mục tiêu"],["null","Lỗi: *p khi p là nullptr"]],"codeTitle":"Mã nguồn C++","path":"con-tro-va-tham-chieu/dia-chi-bo-nho-bien-con-tro-va-giai-tham-chieu/toan-tu-giai-tham-chieu-dereference/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Bộ nhớ: hộp biến, địa chỉ và mũi tên con trỏ';

var PFX = '0x7ffeb67c';
function g3Box(id, name, type, v, addr, col, row, kind, s, size){ return {id:id, name:name, type:type, v:v, addr:addr ? '…' + addr : '', col:col, row:row, kind:kind || 'var', s:s, size:size}; }
function g3Hex(a){ return PFX + a; }

var EX = {
docghi:{inputs:[],
 intro:'Con trỏ p đang trỏ vào tuoi. Xem dấu * giúp đọc và ghi vào hộp tuoi thế nào. Bấm "Bước tiếp".',
 lines:function(){ return ['int main() {', '  int tuoi = 20;', '  int *p = &tuoi;', '  cout << p << endl;', '  cout << *p << endl;', '  *p = 99;', '  cout << tuoi << endl;', '  return 0;', '}']; },
 run:function(c){
  var T = function(v, s){ return g3Box('tuoi', 'tuoi', 'int', v, '1c2c', 0, 0, 'var', s, '4 byte'); };
  var P = function(s){ return g3Box('p', 'p', 'int*', '0x…1c2c', '1c30', 0, 1, 'ptr', s, '8 byte'); };
  var AR = function(s){ return [{from:'p', to:'tuoi', s:s}]; };
  c.snap({ln:1, title:'int tuoi = 20;', body:'Hộp tuoi ở địa chỉ ...1c2c, chứa số 20.', viz:vMem([T(20, 'new')], {cols:1})});
  c.snap({ln:2, title:'int *p = &tuoi;', body:'Ở dòng khai báo này, dấu * chỉ báo "p là con trỏ". p cất địa chỉ của tuoi nên có mũi tên chỉ vào tuoi.',
   viz:vMem([T(20), P('new')], {cols:1, arrows:AR()})});
  c.out(g3Hex('1c2c'));
  c.snap({ln:3, title:'In p',
   body:'p là địa chỉ nó đang giữ, nên in ra ' + g3Hex('1c2c') + '. Chưa đi theo mũi tên.',
   viz:[vMem([T(20), P('hi')], {cols:1, arrows:AR()}), vCard({kind:'info', title:'p', sub:'đang trỏ đâu (địa chỉ)'})]});
  c.out('20');
  c.snap({ln:4, title:'In *p',
   body:'Ở đây dấu * có nghĩa khác: đi theo mũi tên tới hộp tuoi và lấy giá trị trong đó, là 20.',
   viz:[vMem([T(20, 'hi'), P()], {cols:1, arrows:AR('hi')}), vCard({kind:'info', title:'*p', sub:'có gì ở đó (giá trị)'})]});
  c.snap({ln:5, title:'*p = 99;',
   body:'Ghi qua *p: số 99 được ghi thẳng vào hộp tuoi. Không có biến mới nào được tạo.',
   viz:[vMem([T(99, 'new'), P()], {cols:1, arrows:AR('hi')}), vScore([{k:'tuoi', v:'99'}, {k:'*p', v:'99'}])]});
  c.out('99');
  c.snap({ln:6, title:'In tuoi',
   body:'tuoi và *p là hai cách gọi cùng một hộp, nên biến gốc đã đổi thành 99.',
   viz:vMem([T(99, 'ok'), P()], {cols:1, arrows:AR()})});
  c.snap({ln:7, title:'Xong',
   body:'p cho biết đang trỏ đâu, *p cho biết có gì ở đó và cho phép ghi vào đó.',
   note:'* trong khai báo (int *p) báo "đây là con trỏ"; * trong biểu thức (*p) là đi theo mũi tên.',
   viz:[vMem([T(99, 'ok'), P('ok')], {cols:1, arrows:AR()}), vCard({kind:'info', title:'Hai dấu * khác nhau', rows:[['int *p', 'khai báo: p là con trỏ'], ['*p', 'giải tham chiếu: đi theo mũi tên']]})]});
 }},
doi:{inputs:[],
 intro:'Con trỏ p có thể đổi sang trỏ vào biến khác. Xem *p tác động vào biến nào. Bấm "Bước tiếp".',
 lines:function(){ return ['int main() {', '  int a = 10;', '  int b = 20;', '  int *p = &a;', '  *p = 111;', '  p = &b;', '  *p = 222;', '  cout << a << " " << b;', '  return 0;', '}']; },
 run:function(c){
  var a = 10, b = 20, to = null;
  var A = function(s){ return g3Box('a', 'a', 'int', a, 'a08', 0, 0, 'var', s, '4 byte'); };
  var B = function(s){ return g3Box('b', 'b', 'int', b, 'a0c', 1, 0, 'var', s, '4 byte'); };
  var P = function(s){ return g3Box('p', 'p', 'int*', '0x…' + (to === 'a' ? 'a08' : 'a0c'), 'a10', 0, 1, 'ptr', s, '8 byte'); };
  var AR = function(s){ return [{from:'p', to:to, s:s}]; };
  var SC = function(){ return vScore([{k:'a', v:a}, {k:'b', v:b}]); };
  c.snap({ln:1, title:'int a = 10; int b = 20;', body:'Hai hộp a và b, mỗi hộp một địa chỉ.', viz:vMem([A('new'), B('new')], {cols:2})});
  to = 'a';
  c.snap({ln:3, title:'int *p = &a;', body:'p trỏ vào a.', viz:[vMem([A(), B(), P('new')], {cols:2, arrows:AR()}), SC()]});
  a = 111;
  c.snap({ln:4, title:'*p = 111;', body:'p đang trỏ vào a nên *p = 111 chỉ đổi hộp a. Hộp b không bị đụng tới.',
   viz:[vMem([A('new'), B(), P()], {cols:2, arrows:AR('hi')}), SC()]});
  to = 'b';
  c.snap({ln:5, title:'p = &b;', body:'Không có dấu * nên đây là đổi mục tiêu: mũi tên của p chuyển sang b. Hộp a và hộp b vẫn y nguyên.',
   viz:[vMem([A(), B(), P('new')], {cols:2, arrows:AR('hi')}), SC()]});
  b = 222;
  c.snap({ln:6, title:'*p = 222;', body:'Bây giờ p đang trỏ vào b nên lần này chỉ hộp b đổi. Hộp a vẫn giữ 111.',
   viz:[vMem([A(), B('new'), P()], {cols:2, arrows:AR('hi')}), SC()]});
  c.out('111 222');
  c.snap({ln:7, title:'In a và b', body:'In ra 111 và 222.', viz:[vMem([A('ok'), B('ok'), P()], {cols:2, arrows:AR()}), SC()]});
  c.snap({ln:8, title:'Xong', body:'*p luôn tác động vào biến mà p đang trỏ tới ở thời điểm đó.',
   note:'*p tác động vào ô p đang trỏ tới lúc này; p = &b đổi ô đó sang b.',
   viz:[vMem([A('ok'), B('ok'), P('ok')], {cols:2, arrows:AR()}), SC()]});
 }},
'null':{inputs:[],
 intro:'Chuyện gì xảy ra khi p không trỏ tới đâu mà ta vẫn viết *p? Bấm "Bước tiếp".',
 lines:function(){ return ['int main() {', '  int *p = nullptr;', '  cout << "Truoc khi *p" << endl;', '  cout << *p << endl;', '  cout << "Sau khi *p" << endl;', '  return 0;', '}']; },
 run:function(c){
  var P = function(s){ return g3Box('p', 'p', 'int*', 'nullptr', '', 0, 0, 'ptr', s, '8 byte'); };
  var AR = [{from:'p', kind:'null'}];
  c.snap({ln:1, title:'int *p = nullptr;', body:'nullptr nghĩa là "chưa trỏ tới đâu". Mũi tên của p kết thúc bằng ký hiệu ⊘: không có hộp nào để đến.',
   viz:vMem([P('new')], {cols:2, arrows:AR})});
  c.out('Truoc khi *p');
  c.snap({ln:2, title:'In dòng báo trước', body:'Dòng này chạy bình thường vì chưa đụng tới *p.', viz:vMem([P()], {cols:2, arrows:AR})});
  c.err('Segmentation fault  (thường gặp, không đảm bảo)');
  c.snap({ln:3, title:'cout << *p;',
   body:'*p muốn đi theo mũi tên, nhưng không có ô nào ở đó. Đây là hành vi không xác định (chuẩn C++ không nói trước chuyện gì xảy ra), thường thì chương trình bị dừng đột ngột.',
   dim:[4], dimLabel:'thường không chạy tới',
   viz:[vMem([P('bad')], {cols:2, arrows:[{from:'p', kind:'null', s:'bad'}]}), vErr({kind:'runtime', msg:['Thường gặp: Segmentation fault (Linux, macOS)'], note:'không đảm bảo, tùy máy'})]});
  c.snap({ln:3, title:'Cách tránh: kiểm tra trước',
   body:'Trước khi viết *p, hãy kiểm tra p có phải nullptr không: if (p != nullptr). Bài sau sẽ học kỹ phần này.',
   viz:[vMem([P('ok')], {cols:2, arrows:AR}), vCard({kind:'ok', title:'Cách an toàn', sub:'if (p != nullptr) { cout << *p; }'})]});
  c.snap({ln:3, title:'Xong', body:'Không bao giờ viết *p khi p là nullptr hoặc con trỏ hoang.',
   note:'Chỉ dùng *p khi p đang trỏ tới một biến có thật.',
   viz:vMem([P('ok')], {cols:2, arrows:AR})});
 }}
};
