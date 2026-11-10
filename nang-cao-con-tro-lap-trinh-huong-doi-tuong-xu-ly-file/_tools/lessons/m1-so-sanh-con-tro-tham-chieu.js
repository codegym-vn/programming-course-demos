// META {"module":1,"lesson":"Bài 1.4. Biến tham chiếu và so sánh với con trỏ","activity":"So Sánh Con Trỏ (Pointer) Và Tham Chiếu (Reference)","title":"Con trỏ và tham chiếu đặt cạnh nhau","lead":"Hai cột chạy song song: bên trái dùng con trỏ, bên phải dùng tham chiếu. Bấm <b>Bước tiếp</b> để xem hai cách khác nhau thế nào.","tabs":[["swap","Hàm swap: con trỏ và tham chiếu"],["khac","Ba khác biệt: đổi mục tiêu, rỗng, chưa gán"]],"codeTitle":"Mã nguồn C++","path":"con-tro-va-tham-chieu/bien-tham-chieu-va-so-sanh-voi-con-tro/so-sanh-con-tro-pointer-va-tham-chieu-reference/index.html"}
var B7_PFX = 0x7ffe3a5c2000;
function b7Hex(n){ return '0x' + n.toString(16); }
function b7Short(n){ return '…' + n.toString(16).slice(-4); }
function b7Box(id, name, type, v, addr, col, row, kind, s, alias){
  return {id:id, name:name, type:type, v:v, addr:b7Short(addr), col:col, row:row, kind:kind || 'var', s:s, size:(kind === 'ptr' ? '8 byte' : '4 byte'), alias:alias};
}
function b7Count(lines, ch){ return lines.join('').split(ch).length - 1; }

var B7_AX = B7_PFX + 0xa3c, B7_AY = B7_PFX + 0xa38, B7_AA = B7_PFX + 0xa08, B7_AB = B7_PFX + 0xa10, B7_AT = B7_PFX + 0xa1c;
var B7_PL = ['void swapBangContro(int *a, int *b) {', '  int temp = *a;', '  *a = *b;', '  *b = temp;', '}', 'int x = 10, y = 20;', 'swapBangContro(&x, &y);', 'cout << x << " " << y << endl;'];
var B7_RL = ['void swapBangThamChieu(int &a, int &b) {', '  int temp = a;', '  a = b;', '  b = temp;', '}', 'int m = 100, n = 200;', 'swapBangThamChieu(m, n);', 'cout << m << " " << n << endl;'];

var EX = {
swap:{
 intro:'Cùng một việc: hoán đổi hai số. Cột trái dùng con trỏ, cột phải dùng tham chiếu. Bấm "Bước tiếp".',
 running:'Hai cột cùng chạy một bước. Để ý hộp a, b ở khung hàm.',
 done:'Cả hai đều đổi được biến gốc. Con trỏ phải viết &x, &y khi gọi và *a, *b trong thân hàm. Tham chiếu thì gọi và viết tự nhiên.',
 note:'Cả hai cho hàm sửa biến gốc; tham chiếu gọn hơn và không thể rỗng.',
 cols:[
 {title:'Dùng con trỏ', sub:'Hàm nhận địa chỉ của biến.', lines:B7_PL,
  run:function(c){
   var x = 10, y = 20, temp = null;
   function X(s){ return b7Box('x', 'x', 'int', x, B7_AX, 0, 0, 'var', s); }
   function Y(s){ return b7Box('y', 'y', 'int', y, B7_AY, 1, 0, 'var', s); }
   function A(s){ return b7Box('a', 'a', 'int*', '0x…' + B7_AX.toString(16).slice(-4), B7_AA, 0, 1, 'ptr', s); }
   function B(s){ return b7Box('b', 'b', 'int*', '0x…' + B7_AY.toString(16).slice(-4), B7_AB, 1, 1, 'ptr', s); }
   function T(s){ return b7Box('t', 'temp', 'int', temp, B7_AT, 0, 2, 'var', s); }
   var ttl = 'Hàng trên: hàm main. Hàng dưới: hàm swap';
   var AR = function(a, b){ return [{from:'a', to:'x', s:a}, {from:'b', to:'y', s:b}]; };
   c.snap({ln:5, title:'int x = 10, y = 20;', body:'Hai biến x và y nằm trong hàm main.', viz:vMem([X('new'), Y('new')], {cols:2, title:ttl})});
   c.snap({ln:6, title:'swapBangContro(&x, &y)', body:'Phải viết &x, &y để đưa địa chỉ vào hàm. Hàm có hai con trỏ a, b; a chứa địa chỉ của x, b chứa địa chỉ của y.',
    viz:vMem([X(), Y(), A('new'), B('new')], {cols:2, title:ttl, arrows:AR('hi', 'hi')})});
   temp = x;
   c.snap({ln:1, title:'int temp = *a;', body:'*a là giá trị trong hộp mà a trỏ tới (x): 10. Cất vào hộp temp.',
    viz:vMem([X('hi'), Y(), A(), B(), T('new')], {cols:2, title:ttl, arrows:AR('hi')})});
   x = y;
   c.snap({ln:2, title:'*a = *b;', body:'Lấy 20 từ hộp y (theo mũi tên b), đặt vào hộp x (theo mũi tên a).',
    viz:vMem([X('hi'), Y('hi'), A(), B(), T()], {cols:2, title:ttl, arrows:AR('hi', 'hi')})});
   y = temp;
   c.snap({ln:3, title:'*b = temp;', body:'Đặt 10 từ temp vào hộp y (theo mũi tên b).',
    viz:vMem([X(), Y('hi'), A(), B(), T()], {cols:2, title:ttl, arrows:AR(null, 'hi')})});
   c.snap({ln:4, title:'Hàm kết thúc', body:'Khung hàm đóng: a, b, temp biến mất. x và y vẫn còn và đã đổi chỗ.',
    viz:vMem([X('ok'), Y('ok')], {cols:2, title:ttl})});
   c.out(x + ' ' + y);
   c.snap({ln:7, title:'In x và y', body:'In ra ' + x + ' ' + y + '. Hoán đổi thành công.', viz:vMem([X('ok'), Y('ok')], {cols:2, title:ttl})});
   c.snap({ln:7, title:'Xong', body:'Đúng kết quả, nhưng phải viết nhiều dấu đặc biệt.', note:'Số dấu cần viết ở cột này nhiều hơn cột tham chiếu.',
    viz:[vMem([X('ok'), Y('ok')], {cols:2, title:ttl}), vScore([{k:'Dấu & khi gọi', v:b7Count([B7_PL[6]], '&')}, {k:'Dấu * trong thân hàm', v:b7Count(B7_PL.slice(1, 4), '*'), s:'hi'}])]});
  }},
 {title:'Dùng tham chiếu', sub:'Hàm nhận bí danh của biến.', lines:B7_RL,
  run:function(c){
   var m = 100, n = 200, temp = null;
   function M(s, al){ return b7Box('m', 'm', 'int', m, B7_AX, 0, 0, 'var', s, al ? ['a'] : null); }
   function N(s, al){ return b7Box('n', 'n', 'int', n, B7_AY, 1, 0, 'var', s, al ? ['b'] : null); }
   function T(s){ return b7Box('t', 'temp', 'int', temp, B7_AT, 0, 1, 'var', s); }
   var ttl = 'Hàng trên: hàm main. Hàng dưới: hàm swap';
   c.snap({ln:5, title:'int m = 100, n = 200;', body:'Hai biến m và n nằm trong hàm main.', viz:vMem([M('new'), N('new')], {cols:2, title:ttl})});
   c.snap({ln:6, title:'swapBangThamChieu(m, n)', body:'Gọi tự nhiên, không cần &. Trong hàm, a và b chỉ là nhãn bí danh dán lên m và n, không có hộp mới.',
    viz:vMem([M('alias', true), N('alias', true)], {cols:2, title:ttl})});
   temp = m;
   c.snap({ln:1, title:'int temp = a;', body:'a chính là m nên đọc ra 100. Cất vào hộp temp.', viz:vMem([M('hi', true), N('alias', true), T('new')], {cols:2, title:ttl})});
   m = n;
   c.snap({ln:2, title:'a = b;', body:'b chính là n (200), đặt vào a tức là hộp m.', viz:vMem([M('hi', true), N('hi', true), T()], {cols:2, title:ttl})});
   n = temp;
   c.snap({ln:3, title:'b = temp;', body:'Đặt 100 từ temp vào b tức là hộp n.', viz:vMem([M('alias', true), N('hi', true), T()], {cols:2, title:ttl})});
   c.snap({ln:4, title:'Hàm kết thúc', body:'Khung hàm đóng: các nhãn a, b bóc ra, temp biến mất. m và n đã đổi chỗ.', viz:vMem([M('ok'), N('ok')], {cols:2, title:ttl})});
   c.out(m + ' ' + n);
   c.snap({ln:7, title:'In m và n', body:'In ra ' + m + ' ' + n + '. Cũng hoán đổi thành công.', viz:vMem([M('ok'), N('ok')], {cols:2, title:ttl})});
   c.snap({ln:7, title:'Xong', body:'Cùng kết quả, nhưng không phải viết thêm dấu & hay * nào.', note:'Tham chiếu gọn hơn khi truyền tham số cho hàm.',
    viz:[vMem([M('ok'), N('ok')], {cols:2, title:ttl}), vScore([{k:'Dấu & khi gọi', v:b7Count([B7_RL[6]], '&')}, {k:'Dấu * trong thân hàm', v:b7Count(B7_RL.slice(1, 4), '*'), s:'ok'}])]});
  }}
 ]},
khac:{
 intro:'Ba tình huống chạy song song: đổi mục tiêu, gán rỗng, khai báo chưa gán. Bấm "Bước tiếp".',
 running:'Hai cột cùng làm một việc. Xem cột nào được, cột nào bị lỗi.',
 done:'Con trỏ đổi được mục tiêu và có thể rỗng; tham chiếu thì không. Tham chiếu bắt buộc khởi tạo ngay.',
 note:'Cần nullptr hoặc cần đổi mục tiêu thì dùng con trỏ; còn lại ưu tiên tham chiếu.',
 cols:[
 {title:'Con trỏ', sub:'Có hộp riêng và mũi tên.', lines:['int a = 1, b = 2;', 'int *p = &a;', 'p = &b;', 'p = nullptr;', 'int *q;'],
  run:function(c){
   var A = function(s){ return b7Box('a', 'a', 'int', 1, B7_AX, 0, 0, 'var', s); }, B = function(s){ return b7Box('b', 'b', 'int', 2, B7_AY, 1, 0, 'var', s); };
   var P = function(v, s){ return b7Box('p', 'p', 'int*', v, B7_AA, 0, 1, 'ptr', s); };
   c.snap({ln:0, title:'int a = 1, b = 2;', body:'Hai biến a và b.', viz:vMem([A('new'), B('new')], {cols:2})});
   c.snap({ln:1, title:'int *p = &a;', body:'p có hộp riêng, cất địa chỉ của a. Mũi tên chỉ từ p tới a.', viz:vMem([A(), B(), P('0x…' + B7_AX.toString(16).slice(-4), 'new')], {cols:2, arrows:[{from:'p', to:'a', s:'hi'}]})});
   c.snap({ln:2, title:'p = &b;', body:'Đổi mục tiêu được: mũi tên chuyển sang b, địa chỉ trong hộp p đổi theo.',
    viz:[vMem([A('dim'), B('hi'), P('0x…' + B7_AY.toString(16).slice(-4), 'hi')], {cols:2, arrows:[{from:'p', to:'b', s:'hi'}]}), vCard({kind:'ok', title:'Được', sub:'Con trỏ đổi mục tiêu'})]});
   c.snap({ln:3, title:'p = nullptr;', body:'Con trỏ được phép rỗng, nghĩa là không trỏ vào đâu cả.',
    viz:[vMem([A(), B(), P('nullptr', 'hi')], {cols:2, arrows:[{from:'p', kind:'null'}]}), vCard({kind:'ok', title:'Được', sub:'Con trỏ có thể là nullptr'})]});
   c.snap({ln:4, title:'int *q;', body:'Khai báo mà chưa gán thì vẫn được, nhưng q chứa số rác. Nguy hiểm, nên gán ngay (ví dụ nullptr).',
    viz:[vMem([A(), B(), b7Box('q', 'q', 'int*', null, B7_AB, 0, 1, 'ptr', 'bad')], {cols:2}), vCard({kind:'warn', title:'Được, nhưng nguy hiểm', sub:'Con trỏ chưa gán chứa số rác'})]});
   c.snap({ln:4, title:'Xong', body:'Con trỏ linh hoạt: đổi mục tiêu, rỗng, khai báo trước gán sau đều được.', note:'Linh hoạt hơn nhưng cần cẩn thận hơn.',
    viz:vMem([A(), B(), b7Box('p', 'p', 'int*', 'nullptr', B7_AA, 0, 1, 'ptr', 'ok')], {cols:2, arrows:[{from:'p', kind:'null'}]})});
  }},
 {title:'Tham chiếu', sub:'Chỉ là bí danh, không có hộp riêng.', lines:['int a = 1, b = 2;', 'int &r = a;', 'r = b;', 'int &r2 = nullptr;', 'int &r3;'],
  run:function(c){
   var a = 1, b = 2;
   var A = function(s, al){ return b7Box('a', 'a', 'int', a, B7_AX, 0, 0, 'var', s, al ? ['r'] : null); }, B = function(s){ return b7Box('b', 'b', 'int', b, B7_AY, 1, 0, 'var', s); };
   c.snap({ln:0, title:'int a = 1, b = 2;', body:'Hai biến a và b.', viz:vMem([A('new'), B('new')], {cols:2})});
   c.snap({ln:1, title:'int &r = a;', body:'r là bí danh dán lên hộp a. Không có hộp riêng, không có mũi tên.', viz:vMem([A('alias', true), B()], {cols:2})});
   a = b;
   c.snap({ln:2, title:'r = b;', body:'Không đổi được mục tiêu: câu này chỉ chép giá trị 2 của b vào a. Nhãn r vẫn ở a.',
    viz:[vMem([A('hi', true), B()], {cols:2}), vCard({kind:'warn', title:'Không đổi được mục tiêu', sub:'r = b chỉ sao chép giá trị'})]});
   c.err("error: cannot bind non-const lvalue reference of type 'int&' to an rvalue of type 'std::nullptr_t'");
   c.snap({ln:3, title:'int &r2 = nullptr;', body:'Tham chiếu không thể rỗng: phải gắn với một biến có thật. Trình biên dịch báo lỗi.',
    viz:[vMem([A('alias', true), B()], {cols:2}), vErr({kind:'compile', msg:["error: cannot bind non-const lvalue reference of type 'int&' to an rvalue of type 'std::nullptr_t'"], code:'int &r2 = nullptr;'})]});
   c.err("error: 'r3' declared as reference but not initialized");
   c.snap({ln:4, title:'int &r3;', body:'Khai báo mà chưa gắn vào biến nào cũng bị lỗi. Tham chiếu bắt buộc khởi tạo ngay.',
    viz:[vMem([A('alias', true), B()], {cols:2}), vErr({kind:'compile', msg:["error: 'r3' declared as reference but not initialized"], code:'int &r3;'})]});
   c.snap({ln:4, title:'Xong', body:'Tham chiếu chặt chẽ hơn: không đổi mục tiêu, không rỗng, phải khởi tạo ngay. Đổi lại, nó an toàn và dễ dùng.', note:'Chặt chẽ hơn nên ít lỗi hơn.',
    viz:vMem([A('alias', true), B()], {cols:2})});
  }}
 ]}
};
