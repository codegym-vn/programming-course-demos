// META {"module":1,"lesson":"Bài 1.4. Biến tham chiếu và so sánh với con trỏ","activity":"Khái Niệm Về Biến Tham Chiếu (Reference)","title":"Tham chiếu là tên thứ hai của một biến","lead":"Xem tham chiếu thamChieu chỉ là một cái tên dán thêm lên hộp tuoi, không phải hộp mới. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["badanh","Bí danh hai chiều"],["diachi","Địa chỉ giống hệt"],["bay","Bẫy r = b và lỗi thiếu khởi tạo"]],"codeTitle":"Mã nguồn C++","path":"con-tro-va-tham-chieu/bien-tham-chieu-va-so-sanh-voi-con-tro/khai-niem-ve-bien-tham-chieu-reference/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Bộ nhớ: hộp biến, bí danh và con trỏ';

var B6_PFX = 0x7ffe2483f000;
function b6Hex(n){ return '0x' + n.toString(16); }
function b6Short(n){ return '…' + n.toString(16).slice(-4); }
function b6Box(id, name, type, v, addr, col, row, kind, s, alias){
  return {id:id, name:name, type:type, v:v, addr:b6Short(addr), col:col, row:row, kind:kind || 'var', s:s, size:(kind === 'ptr' ? '8 byte' : '4 byte'), alias:alias};
}

var EX = {
badanh:{inputs:[],
 intro:'Tạo biến tuoi, rồi dán thêm cho nó một cái tên thứ hai là thamChieu. Bấm "Bước tiếp".',
 lines:function(){ return ['int tuoi = 20;', 'int &thamChieu = tuoi;', 'thamChieu = 99;', 'cout << tuoi << endl;', 'tuoi = 50;', 'cout << thamChieu << endl;']; },
 run:function(c){
  var AD = B6_PFX + 0x45c, tuoi = 20;
  function V(s, alias, hiBox){ return vMem([b6Box('tuoi', 'tuoi', 'int', tuoi, AD, 0, 0, 'var', s, alias)], {cols:1}); }
  c.snap({ln:0, title:'int tuoi = 20;', body:'Máy cấp một hộp nhớ tên tuoi ở địa chỉ ' + b6Short(AD) + ' và cất 20 vào.', viz:V('new')});
  c.snap({ln:1, title:'int &thamChieu = tuoi;', body:'Dấu & ở đây báo thamChieu là tham chiếu. Nó không có hộp mới: chỉ là nhãn "bí danh" dán thêm lên chính hộp tuoi.',
   viz:V('alias', ['thamChieu'])});
  tuoi = 99;
  c.snap({ln:2, title:'thamChieu = 99;', body:'Ghi qua tên thamChieu thì số 99 vào chính hộp đó, vì chỉ có một hộp duy nhất.', viz:V('hi', ['thamChieu'])});
  c.out(String(tuoi));
  c.snap({ln:3, title:'In tuoi', body:'Đọc bằng tên tuoi cũng thấy 99. Không cần "đồng bộ" gì cả, vì hai tên cùng chỉ một hộp.', viz:V('alias', ['thamChieu'])});
  tuoi = 50;
  c.snap({ln:4, title:'tuoi = 50;', body:'Giờ sửa bằng tên tuoi: hộp đổi thành 50.', viz:V('hi', ['thamChieu'])});
  c.out(String(tuoi));
  c.snap({ln:5, title:'Xong', body:'Đọc bằng tên thamChieu cũng ra 50. Sửa bằng tên nào cũng là sửa cùng một hộp.',
   note:'Tham chiếu là tên khác của cùng một biến, không phải biến thứ hai.', viz:V('ok', ['thamChieu'])});
 }},
diachi:{inputs:[],
 intro:'In địa chỉ của tuoi và của thamChieu, rồi so với một con trỏ. Bấm "Bước tiếp".',
 lines:function(){ return ['int tuoi = 20;', 'int &thamChieu = tuoi;', 'cout << &tuoi << endl;', 'cout << &thamChieu << endl;', 'int *p = &tuoi;', 'cout << &p << endl;']; },
 run:function(c){
  var AD = B6_PFX + 0x45c, AP = B6_PFX + 0x460;
  function T(s, alias){ return b6Box('tuoi', 'tuoi', 'int', 20, AD, 0, 0, 'var', s, alias); }
  function P(s){ return b6Box('p', 'p', 'int*', '0x…' + AD.toString(16).slice(-4), AP, 1, 0, 'ptr', s); }
  c.snap({ln:0, title:'int tuoi = 20;', body:'Hộp tuoi nằm ở địa chỉ ' + b6Short(AD) + '.', viz:vMem([T('new')], {cols:2})});
  c.snap({ln:1, title:'int &thamChieu = tuoi;', body:'thamChieu là bí danh dán lên hộp tuoi, không có hộp riêng.', viz:vMem([T('alias', ['thamChieu'])], {cols:2})});
  c.out(b6Hex(AD));
  c.snap({ln:2, title:'In &tuoi', body:'&tuoi là địa chỉ của hộp tuoi: ' + b6Hex(AD) + '.', viz:vMem([T('hi', ['thamChieu'])], {cols:2})});
  c.out(b6Hex(AD));
  c.snap({ln:3, title:'In &thamChieu', body:'&thamChieu cho đúng số đó. Vì thamChieu không có hộp riêng, nên không có địa chỉ riêng.',
   viz:[vMem([T('hi', ['thamChieu'])], {cols:2}), vCard({kind:'ok', title:'GIỐNG HỆT', sub:'&tuoi và &thamChieu là cùng một địa chỉ'})]});
  c.snap({ln:4, title:'int *p = &tuoi;', body:'Để so sánh: con trỏ p thì có hộp riêng ở địa chỉ khác (' + b6Short(AP) + '), bên trong cất địa chỉ của tuoi.',
   viz:vMem([T(null, ['thamChieu']), P('new')], {cols:2, arrows:[{from:'p', to:'tuoi', s:'hi'}]})});
  c.out(b6Hex(AP));
  c.snap({ln:5, title:'In &p', body:'&p là địa chỉ của hộp p, khác với &tuoi. Con trỏ có địa chỉ riêng, tham chiếu thì không.',
   viz:vMem([T(null, ['thamChieu']), P('hi')], {cols:2, arrows:[{from:'p', to:'tuoi'}]})});
  c.snap({ln:5, title:'Xong', body:'Tham chiếu dùng chung địa chỉ với biến gốc. Con trỏ thì có địa chỉ riêng.',
   note:'&r luôn là địa chỉ của biến mà r là bí danh.',
   viz:[vMem([T('ok', ['thamChieu']), P('ok')], {cols:2, arrows:[{from:'p', to:'tuoi'}]}), vScore([{k:'&tuoi', v:b6Short(AD)}, {k:'&thamChieu', v:b6Short(AD)}, {k:'&p', v:b6Short(AP), s:'hi'}])]});
 }},
bay:{inputs:[],
 intro:'Tham chiếu r gắn với a. Xem r = b làm gì, rồi xem lỗi khi quên khởi tạo. Bấm "Bước tiếp".',
 lines:function(){ return ['int a = 10;', 'int b = 20;', 'int &r = a;', 'r = b;', "cout << a << ' ' << b << ' ' << r;", 'b = 999;', "cout << a << ' ' << b << ' ' << r;", '// Quên gắn ngay khi khai báo:', 'int &r2;']; },
 run:function(c){
  var AA = B6_PFX + 0x3c, AB = B6_PFX + 0x38, a = 10, b = 20;
  function M(sa, sb, alias, extra){
    return vMem([b6Box('a', 'a', 'int', a, AA, 0, 0, 'var', sa, alias ? ['r'] : null), b6Box('b', 'b', 'int', b, AB, 1, 0, 'var', sb)], {cols:2});
  }
  c.snap({ln:1, title:'int a = 10; int b = 20;', body:'Hai biến riêng: hộp a chứa 10, hộp b chứa 20.', viz:M('new', 'new', false)});
  c.snap({ln:2, title:'int &r = a;', body:'r là bí danh của a. Từ giờ r gắn với a mãi mãi.', viz:M('alias', null, true)});
  a = b;
  c.snap({ln:3, title:'r = b;', body:'Cẩn thận: câu này KHÔNG đổi r sang b. Nó chép giá trị 20 của b vào hộp a, vì r là tên của a. Nhãn r vẫn nằm trên a.',
   viz:[M('hi', null, true), vCard({kind:'info', title:'Chỉ sao chép giá trị', sub:'r vẫn là bí danh của a'})]});
  c.out(a + ' ' + b + ' ' + a);
  c.snap({ln:4, title:'In a, b, r', body:'Cả ba đều là 20: a đã bị đổi, b giữ nguyên, r là a.', viz:M('alias', null, true)});
  b = 999;
  c.snap({ln:5, title:'b = 999;', body:'Đổi b thành 999. Chỉ hộp b đổi. Hộp a (và r) không bị ảnh hưởng.', viz:M('alias', 'hi', true)});
  c.out(a + ' ' + b + ' ' + a);
  c.snap({ln:6, title:'In a, b, r', body:'a và r vẫn là 20, b là 999. Chứng tỏ r chưa bao giờ chuyển sang b.', viz:M('alias', null, true)});
  c.err("error: 'r2' declared as reference but not initialized");
  c.snap({ln:8, title:'int &r2; (lỗi)', body:'Tham chiếu phải được gắn với một biến ngay lúc khai báo. Quên là trình biên dịch dừng ngay.',
   viz:[M('alias', null, true), vErr({kind:'compile', note:'Không sinh được file chạy', msg:["error: 'r2' declared as reference but not initialized"], code:'int &r2;', fix:'Gắn ngay khi khai báo: int &r2 = a;'})]});
  c.snap({ln:8, title:'Xong', body:'Tham chiếu gắn một lần là gắn mãi, và phải gắn ngay khi khai báo.',
   note:'r = b là gán giá trị, không phải đổi mục tiêu. Con trỏ mới đổi mục tiêu được.', viz:M('alias', null, true)});
 }}
};
