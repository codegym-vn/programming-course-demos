// META {"module":1,"lesson":"Bài 1.1. Địa chỉ bộ nhớ, biến con trỏ và giải tham chiếu","activity":"Biến Con Trỏ Là Gì? Cách Khai Báo Và Khởi Tạo","title":"Con trỏ là một biến chứa địa chỉ","lead":"Xem con trỏ p lưu địa chỉ của biến khác, đổi mục tiêu, và hai lỗi hay gặp. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["khoitao","Khai báo và khởi tạo"],["doi","Đổi mục tiêu"],["loi","Lỗi: sai kiểu và con trỏ hoang"]],"codeTitle":"Mã nguồn C++","path":"con-tro-va-tham-chieu/dia-chi-bo-nho-bien-con-tro-va-giai-tham-chieu/bien-con-tro-la-gi-cach-khai-bao-va-khoi-tao/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Bộ nhớ: hộp biến, địa chỉ và mũi tên con trỏ';

/* Địa chỉ ví dụ (rút gọn hiển thị …xxxx, đầy đủ khi in ra console) */
var PFX = '0x7ffeb67c';
function box(id, name, type, v, addr, col, row, kind, s, size){ return {id:id, name:name, type:type, v:v, addr:addr ? '…' + addr : '', col:col, row:row, kind:kind || 'var', s:s, size:size}; }
function hex(addr){ return PFX + addr; }

var EX = {
khoitao:{inputs:[],
 intro:'Con trỏ p sẽ cất địa chỉ của biến tuoi. Hãy để ý: p chứa địa chỉ của tuoi, nhưng chính p cũng nằm ở một chỗ riêng. Bấm "Bước tiếp".',
 lines:function(){ return ['int main() {', '  int tuoi = 20;', '  int *p = &tuoi;', '  cout << &tuoi << endl;', '  cout << p << endl;', '  cout << &p << endl;', '  return 0;', '}']; },
 run:function(c){
  var T = function(s){ return box('tuoi', 'tuoi', 'int', 20, '1c2c', 0, 0, 'var', s, '4 byte'); };
  var P = function(s){ return box('p', 'p', 'int*', '0x…1c2c', '1c30', 0, 1, 'ptr', s, '8 byte'); };
  c.snap({ln:1, title:'int tuoi = 20;',
   body:'Máy cấp cho biến tuoi một hộp nhớ 4 byte, đặt ở địa chỉ ...1c2c, và cất số 20 vào.',
   viz:vMem([T('new')], {cols:1})});
  c.snap({ln:2, title:'int *p = &tuoi;',
   body:'Dấu * báo p là con trỏ. p cũng là một biến, nằm ở hộp riêng (...1c30), và lưu địa chỉ của tuoi: 0x...1c2c. Mũi tên cho thấy p đang trỏ vào tuoi.',
   viz:vMem([T(), P('new')], {cols:1, arrows:[{from:'p', to:'tuoi', s:'hi'}]})});
  c.out(hex('1c2c'));
  c.snap({ln:3, title:'In &tuoi',
   body:'&tuoi là địa chỉ của hộp tuoi. Console in ra ' + hex('1c2c') + '.',
   viz:vMem([T('hi'), P()], {cols:1, arrows:[{from:'p', to:'tuoi'}]})});
  c.out(hex('1c2c'));
  c.snap({ln:4, title:'In p',
   body:'p là nội dung hộp p, chính là địa chỉ của tuoi. Hai số in ra giống hệt nhau: ' + hex('1c2c') + '.',
   viz:[vMem([T('ok'), P('ok')], {cols:1, arrows:[{from:'p', to:'tuoi', s:'hi'}]}), vCard({kind:'ok', title:'Trùng khớp', sub:'&tuoi và p là cùng một địa chỉ'})]});
  c.out(hex('1c30'));
  c.snap({ln:5, title:'In &p',
   body:'&p là địa chỉ của chính hộp p, một số khác: ' + hex('1c30') + '. Con trỏ cũng là một biến nên cũng nằm ở một chỗ trong bộ nhớ.',
   viz:vMem([T(), P('hi')], {cols:1, arrows:[{from:'p', to:'tuoi'}]})});
  c.snap({ln:6, title:'Xong',
   body:'p là nơi nó trỏ tới (...1c2c), còn &p là nơi bản thân nó nằm (...1c30). Giống tờ giấy ghi địa chỉ nhà: tờ giấy không phải ngôi nhà, và cũng phải nằm ở một chỗ nào đó.',
   note:'Trên máy 64-bit, mọi con trỏ đều chiếm 8 byte, dù trỏ tới kiểu gì. Dấu * trong khai báo (int *p) khác dấu * giải tham chiếu (*p) học ở bài sau.',
   viz:[vMem([T('ok'), P('ok')], {cols:1, arrows:[{from:'p', to:'tuoi'}]}), vScore([{k:'p (nơi trỏ tới)', v:'…1c2c'}, {k:'&p (nơi p nằm)', v:'…1c30', s:'hi'}])]});
 }},
doi:{inputs:[],
 intro:'Một con trỏ có thể đổi sang trỏ vào biến khác. Hai con trỏ p1, p2 đang trỏ vào a và b. Bấm "Bước tiếp".',
 lines:function(){ return ['int main() {', '  int a = 10;', '  int b = 20;', '  int *p1 = &a;', '  int *p2 = &b;', '  cout << *p1 << " " << *p2;', '  p1 = &b;', '  cout << "Sau khi doi: " << *p1;', '  return 0;', '}']; },
 run:function(c){
  var A = function(s){ return box('a', 'a', 'int', 10, 'a0c', 0, 0, 'var', s, '4 byte'); };
  var B = function(s){ return box('b', 'b', 'int', 20, 'a08', 1, 0, 'var', s, '4 byte'); };
  var P1 = function(to, s){ return box('p1', 'p1', 'int*', '0x…' + (to === 'a' ? 'a0c' : 'a08'), 'a10', 0, 1, 'ptr', s, '8 byte'); };
  var P2 = function(s){ return box('p2', 'p2', 'int*', '0x…a08', 'a18', 1, 1, 'ptr', s, '8 byte'); };
  c.snap({ln:1, title:'int a = 10; int b = 20;', body:'Hai biến thường a và b, mỗi biến một hộp có địa chỉ riêng.',
   viz:vMem([A('new'), B('new')], {cols:2})});
  c.snap({ln:3, title:'int *p1 = &a;', body:'p1 cất địa chỉ của a nên mũi tên đi từ p1 tới a.',
   viz:vMem([A(), B(), P1('a', 'new')], {cols:2, arrows:[{from:'p1', to:'a', s:'hi'}]})});
  c.snap({ln:4, title:'int *p2 = &b;', body:'p2 cất địa chỉ của b, mũi tên đi từ p2 tới b.',
   viz:vMem([A(), B(), P1('a'), P2('new')], {cols:2, arrows:[{from:'p1', to:'a'}, {from:'p2', to:'b', s:'hi'}]})});
  c.out('10 20');
  c.snap({ln:5, title:'cout << *p1 << " " << *p2;', body:'*p1 và *p2 là giá trị nằm trong hộp mà con trỏ chỉ tới, nên in ra 10 và 20. (Dấu * này sẽ học kỹ ở bài sau.)',
   viz:vMem([A('ok'), B('ok'), P1('a'), P2()], {cols:2, arrows:[{from:'p1', to:'a', s:'hi'}, {from:'p2', to:'b', s:'hi'}]})});
  c.snap({ln:6, title:'p1 = &b;', body:'Gán lại: p1 bỏ a và chuyển sang trỏ vào b. Địa chỉ cất trong hộp p1 đổi thành ...a08. Hộp a không hề thay đổi.',
   viz:vMem([A('dim'), B('hi'), P1('b', 'new'), P2()], {cols:2, arrows:[{from:'p1', to:'b', s:'hi'}, {from:'p2', to:'b'}]})});
  c.out('Sau khi doi: 20');
  c.snap({ln:7, title:'cout << *p1;', body:'p1 đang trỏ vào b nên *p1 là 20.',
   viz:vMem([A(), B('ok'), P1('b'), P2()], {cols:2, arrows:[{from:'p1', to:'b', s:'hi'}, {from:'p2', to:'b'}]})});
  c.snap({ln:8, title:'Xong', body:'Con trỏ không bị buộc chặt vào một biến: gán lại là nó trỏ sang biến khác (cùng kiểu). Lúc này cả p1 và p2 cùng trỏ vào b.',
   note:'Con trỏ có thể đổi mục tiêu bất cứ lúc nào, miễn là cùng kiểu.',
   viz:vMem([A(), B('ok'), P1('b'), P2()], {cols:2, arrows:[{from:'p1', to:'b'}, {from:'p2', to:'b'}]})});
 }},
loi:{inputs:[],
 intro:'Hai lỗi hay gặp khi dùng con trỏ: gán địa chỉ sai kiểu (trình biên dịch chặn) và con trỏ chưa khởi tạo (chứa địa chỉ rác). Bấm "Bước tiếp".',
 lines:function(){ return ['// Ví dụ 4: sai kiểu', 'double diem = 8.5;', 'int *p = &diem;', '', '// Ví dụ 5: chưa khởi tạo', 'int *p;', 'cout << p << endl;']; },
 run:function(c){
  var D = function(s){ return box('diem', 'diem', 'double', 8.5, '2e48', 0, 0, 'var', s, '8 byte'); };
  c.snap({ln:1, title:'double diem = 8.5;', body:'Biến diem kiểu double, một hộp 8 byte chứa 8.5.',
   viz:vMem([D('new')], {cols:2})});
  c.err("error: cannot convert 'double*' to 'int*' in initialization");
  c.snap({ln:2, title:'int *p = &diem; (sai kiểu)',
   body:'&diem có kiểu double*, nhưng p khai báo là int*. Hai kiểu không khớp nên trình biên dịch dừng ngay. Chương trình không được dịch ra file chạy.',
   viz:[vMem([D('bad'), box('p', 'p', 'int*', null, '', 1, 0, 'ptr', 'bad')], {cols:2, arrows:[{from:'p', to:'diem', kind:'dashed', s:'bad'}]}),
        vErr({kind:'compile', note:'Không sinh file .exe, không có gì để chạy', msg:["error: cannot convert 'double*' to 'int*' in initialization"], code:'int *p = &diem;'})]});
  c.snap({ln:2, title:'Cách sửa: dùng đúng kiểu con trỏ',
   body:'Con trỏ phải cùng kiểu với biến nó trỏ tới: biến double thì dùng con trỏ double*.',
   viz:[vMem([D('ok'), box('p', 'p', 'double*', '0x…2e48', '2e50', 1, 0, 'ptr', 'ok', '8 byte')], {cols:2, arrows:[{from:'p', to:'diem'}]}),
        vCard({kind:'ok', title:'Đã sửa', sub:'double *p = &diem;'})]});
  c.clear();
  c.snap({ln:5, title:'int *p;',
   body:'Khai báo con trỏ mà không gán gì. Hộp p chứa một số rác còn sót lại trong bộ nhớ: 0x7ffedb4cf688. Số đó không phải địa chỉ của biến nào ta khai báo.',
   viz:vMem([box('p', 'p', 'int*', '0x…f688', '', 0, 1, 'ptr', 'bad', '8 byte'), box('junk', '', '', '', '', 1, 0, 'junk')], {cols:2, arrows:[{from:'p', to:'junk', kind:'dashed', s:'bad'}]})});
  c.snap({ln:5, title:'Trình biên dịch cảnh báo',
   body:'Khi biên dịch với -Wall, g++ báo p dùng khi chưa khởi tạo. Đây mới là cảnh báo nên chương trình vẫn chạy được, nhưng đừng bỏ qua.',
   viz:[vMem([box('p', 'p', 'int*', '0x…f688', '', 0, 1, 'ptr', 'bad', '8 byte'), box('junk', '', '', '', '', 1, 0, 'junk')], {cols:2, arrows:[{from:'p', to:'junk', kind:'dashed', s:'bad'}]}),
        vErr({kind:'warn', msg:["warning: 'p' is used uninitialized [-Wuninitialized]"], code:'cout << p << endl;'})]});
  c.out('0x7ffedb4cf688');
  c.snap({ln:6, title:'cout << p;',
   body:'In ra con số rác 0x7ffedb4cf688. Con số này thay đổi tùy lần chạy và không có ý nghĩa gì.',
   viz:vMem([box('p', 'p', 'int*', '0x…f688', '', 0, 1, 'ptr', 'bad', '8 byte'), box('junk', '', '', '', '', 1, 0, 'junk')], {cols:2, arrows:[{from:'p', to:'junk', kind:'dashed', s:'bad'}]})});
  c.snap({ln:6, title:'Nếu đọc giá trị mà p trỏ tới',
   body:'Mở "tờ giấy" ghi địa chỉ rác để lấy giá trị bên trong có thể làm chương trình dừng đột ngột, hoặc đọc ra số bậy: không thể đoán trước. (Cách mở con trỏ sẽ học ở bài sau.)',
   viz:[vMem([box('p', 'p', 'int*', '0x…f688', '', 0, 1, 'ptr', 'bad', '8 byte'), box('junk', '', '', '', '', 1, 0, 'junk')], {cols:2, arrows:[{from:'p', to:'junk', kind:'dashed', s:'bad'}]}),
        vErr({kind:'runtime', msg:['Có thể dừng đột ngột (Segmentation fault) hoặc đọc ra giá trị rác'], fix:'Luôn khởi tạo con trỏ ngay khi khai báo.'})]});
  c.snap({ln:5, title:'Xong',
   body:'Hãy khởi tạo con trỏ ngay: gán địa chỉ hợp lệ, hoặc gán nullptr nếu chưa có gì để trỏ.',
   note:'Kiểu con trỏ phải khớp kiểu biến; luôn khởi tạo con trỏ ngay khi khai báo (int *p = nullptr;).',
   viz:[vMem([box('p', 'p', 'int*', 'nullptr', '', 0, 0, 'ptr', 'ok', '8 byte')], {cols:2, arrows:[{from:'p', kind:'null'}]}), vCard({kind:'ok', title:'Cách an toàn', sub:'int *p = nullptr;'})]});
 }}
};
