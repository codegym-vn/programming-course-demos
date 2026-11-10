// META {"module":1,"lesson":"Bài 1.1. Địa chỉ bộ nhớ, biến con trỏ và giải tham chiếu","activity":"Khái Niệm Về Địa Chỉ Bộ Nhớ & Toán Tử Địa Chỉ (&)","title":"Địa chỉ của biến và toán tử &","lead":"Xem mỗi biến nằm ở một địa chỉ riêng và toán tử & lấy địa chỉ đó ra. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["tuoi","Giá trị và địa chỉ"],["ba","3 biến liên tiếp"],["char","Bẫy với kiểu char"]],"codeTitle":"Mã nguồn C++","path":"con-tro-va-tham-chieu/dia-chi-bo-nho-bien-con-tro-va-giai-tham-chieu/khai-niem-ve-dia-chi-bo-nho-toan-tu-dia-chi/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Bộ nhớ: mỗi biến là một hộp có địa chỉ';

function g1Box(id, name, type, v, addr, col, row, s, size){ return {id:id, name:name, type:type, v:v, addr:'…' + addr, col:col, row:row, kind:'var', s:s, size:size}; }
function g1Hex4(n){ return ('0000' + n.toString(16)).slice(-4); }

var EX = {
tuoi:{inputs:[],
 intro:'Mỗi biến nằm ở một chỗ trong bộ nhớ, và chỗ đó có địa chỉ. Bấm "Bước tiếp".',
 lines:function(){ return ['int main() {', '  int tuoi = 20;', '  cout << "Gia tri cua tuoi: "', '       << tuoi << endl;', '  cout << "Dia chi cua tuoi: "', '       << &tuoi << endl;', '  return 0;', '}']; },
 run:function(c){
  var T = function(s){ return g1Box('tuoi', 'tuoi', 'int', 20, '2164', 0, 0, s, '4 byte'); };
  c.snap({ln:1, title:'int tuoi = 20;',
   body:'Máy cấp cho biến tuoi một hộp nhớ 4 byte và cất số 20 vào. Hộp này nằm ở một địa chỉ, ở đây là ...2164.',
   viz:vMem([T('new')], {cols:1})});
  c.out('Gia tri cua tuoi: 20');
  c.snap({ln:2, title:'In tuoi',
   body:'Viết tuoi thì lấy giá trị trong hộp, nên in ra 20.',
   viz:vMem([T('hi')], {cols:1})});
  c.out('Dia chi cua tuoi: 0x7ffcda622164');
  c.snap({ln:4, title:'In &tuoi',
   body:'Viết &tuoi thì lấy địa chỉ của hộp, tức là vị trí của byte đầu tiên. Số in ra bắt đầu bằng 0x vì viết theo hệ thập lục phân (hệ 16).',
   viz:vMem([T('hi')], {cols:1, note:'&tuoi = 0x7ffcda622164'})});
  c.snap({ln:5, title:'Xong',
   body:'Giống một ngôi nhà: tuoi là đồ đạc bên trong, còn &tuoi là số nhà.',
   note:'tuoi cho giá trị, &tuoi cho địa chỉ. Địa chỉ đổi mỗi lần chạy chương trình.',
   viz:[vMem([T('ok')], {cols:1}), vCard({kind:'info', title:'Hai cách nhìn một biến', rows:[['tuoi', '20 (đồ trong nhà)'], ['&tuoi', '…2164 (số nhà)']]})]});
 }},
ba:{inputs:[],
 intro:'Ba biến int khai báo liên tiếp. Hãy xem địa chỉ của chúng cách nhau bao nhiêu. Bấm "Bước tiếp".',
 lines:function(){ return ['int main() {', '  int x = 1;', '  int y = 2;', '  int z = 3;', '  cout << &x << endl;', '  cout << &y << endl;', '  cout << &z << endl;', '  cout << sizeof(int);', '  return 0;', '}']; },
 run:function(c){
  var base = 0x7c5c, NAMES = ['x', 'y', 'z'];
  function B(run, k, s){ var b = run === 1 ? 0x7c5c : 0x79e4; return g1Box(NAMES[k], NAMES[k], 'int', k + 1, g1Hex4(b + 4 * k), k, 0, s, '4 byte'); }
  function row(run, n, hiK){ var a = []; for (var k = 0; k < n; k++) a.push(B(run, k, k === hiK ? 'new' : null)); return a; }
  var pre1 = '0x7fff4b7e', pre2 = '0x7fffbd2d';
  c.snap({ln:1, title:'int x = 1;', body:'Hộp của x nằm ở địa chỉ ...7c5c, chiếm 4 byte.', viz:vMem(row(1, 1, 0), {cols:3})});
  c.snap({ln:2, title:'int y = 2;', body:'Hộp của y nằm ngay sau x: ...7c60. Hai địa chỉ cách nhau 4.', viz:vMem(row(1, 2, 1), {cols:3})});
  c.snap({ln:3, title:'int z = 3;', body:'Hộp của z là ...7c64, lại cách y đúng 4.', viz:vMem(row(1, 3, 2), {cols:3})});
  c.out(pre1 + g1Hex4(base)); c.out(pre1 + g1Hex4(base + 4)); c.out(pre1 + g1Hex4(base + 8));
  c.snap({ln:4, title:'In &x, &y, &z',
   body:'Console in ba địa chỉ. Nhìn mấy ký tự cuối: 7c5c, 7c60, 7c64, mỗi số hơn số trước 4 (tính theo hệ 16).',
   viz:[vMem(row(1, 3, -1), {cols:3}), vScore([{k:'y - x', v:'+4'}, {k:'z - y', v:'+4'}])]});
  c.out('Kich thuoc 1 bien int: ' + 4 + ' bytes');
  c.snap({ln:7, title:'sizeof(int)',
   body:'Một biến int chiếm 4 byte, nên biến kế tiếp bắt đầu sau đó 4 byte. Đây là cách xếp thường gặp, không phải quy tắc bắt buộc của C++.',
   viz:[vMem(row(1, 3, -1), {cols:3}), vScore([{k:'sizeof(int)', v:'4 byte', s:'hi'}])]});
  c.clear();
  var r2 = [];
  c.out(pre2 + g1Hex4(0x79e4)); c.out(pre2 + g1Hex4(0x79e4 + 4)); c.out(pre2 + g1Hex4(0x79e4 + 8));
  c.snap({ln:4, title:'Chạy lại chương trình',
   body:'Chạy lần hai, hệ điều hành cấp vùng nhớ khác: x giờ ở ...79e4. Địa chỉ khác hẳn nhưng khoảng cách vẫn là 4.',
   viz:[vMem(row(2, 3, -1), {cols:3}), vScore([{k:'y - x', v:'+4'}, {k:'z - y', v:'+4'}])]});
  c.snap({ln:7, title:'Xong',
   body:'Số nhà đổi mỗi lần chạy, còn khoảng cách giữa các biến cùng kiểu thì giữ nguyên.',
   note:'Địa chỉ thay đổi mỗi lần chạy; biến int liên tiếp thường cách nhau sizeof(int) = 4.',
   viz:vMem(row(2, 3, -1).map(function(b){ b.s = 'ok'; return b; }), {cols:3})});
 }},
char:{inputs:[],
 intro:'Với biến kiểu char, in &c cho kết quả bất ngờ. Bấm "Bước tiếp".',
 lines:function(){ return ['int main() {', "  char c = 'X';", '  cout << &c << endl;', '  cout << (void*)&c << endl;', '  return 0;', '}']; },
 run:function(c){
  var C = function(s){ return g1Box('c', 'c', 'char', "'X'", 'a60b', 0, 0, s, '1 byte'); };
  c.snap({ln:1, title:"char c = 'X';", body:'Biến char chỉ chiếm 1 byte. Hộp c nằm ở địa chỉ ...a60b.', viz:vMem([C('new')], {cols:1})});
  c.out('X');
  c.snap({ln:2, title:'cout << &c;',
   body:'&c có kiểu char*. cout coi char* là chuỗi chữ nên đọc từ ô c rồi in ra chữ X, không in địa chỉ.',
   viz:[vMem([C('hi')], {cols:1}), vCard({kind:'warn', title:'cout thấy kiểu char*', rows:[['&c', 'kiểu char*'], ['cout làm gì', 'đọc như chuỗi, in chữ']], tip:'Chuỗi chỉ dừng khi gặp ký tự \\0, nên có thể in thêm ký tự lạ. Đây là hành vi không xác định.'})]});
  c.out('0x7ffe0450a60b');
  c.snap({ln:3, title:'cout << (void*)&c;',
   body:'Ép sang void* (con trỏ không gắn với kiểu nào) thì cout không đoán là chuỗi nữa, và in đúng địa chỉ.',
   viz:[vMem([C('hi')], {cols:1}), vCard({kind:'ok', title:'cout thấy kiểu void*', rows:[['(void*)&c', 'kiểu void*'], ['cout làm gì', 'in địa chỉ']]})]});
  c.snap({ln:4, title:'Xong',
   body:'Muốn in địa chỉ của một biến char, hãy viết (void*)&c.',
   note:'cout << &c với char in ra chữ, không phải địa chỉ. Muốn in địa chỉ phải ép (void*).',
   viz:vMem([C('ok')], {cols:1})});
 }}
};
