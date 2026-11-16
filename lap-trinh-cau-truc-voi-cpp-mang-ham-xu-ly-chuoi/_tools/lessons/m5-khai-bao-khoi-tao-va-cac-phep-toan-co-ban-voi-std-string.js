// META {"module":5,"lesson":"Bài 5.1. std::string: khai báo, phép toán và so sánh","activity":"Khai Báo, Khởi Tạo Và Các Phép Toán Cơ Bản Với std::string","title":"std::string là dải ký tự co giãn","lead":"Xem chuỗi được tạo, nối thêm, gán lại, và vì sao \"Hello\" + \"World\" bị lỗi. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["khaibao","Khai báo và khởi tạo"],["noi","Nối (+, +=) và gán lại (=)"],["bay","Bẫy \"Hello\" + \"World\""]],"codeTitle":"Mã nguồn C++","path":"xu-ly-chuoi/std-string-khai-bao-phep-toan-va-so-sanh/khai-bao-khoi-tao-va-cac-phep-toan-co-ban-voi-std-string/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Dải ký tự của chuỗi';

var EX = {
khaibao:{inputs:[],
 intro:'Một chuỗi std::string là một dải ô, mỗi ô giữ một ký tự. Xem bốn cách tạo chuỗi. Bấm "Bước tiếp".',
 lines:function(){ return ['string s1;', 'string s2 = "Xin chao";', 'string s3("Viet Nam");', 'string s4 = s2;', 'cout << "s1 = [" << s1 << "]";', 's4 = "Hi";']; },
 run:function(c){
  c.snap({ln:0, title:'string s1;',
   body:'Khai báo mà chưa gán gì: s1 là chuỗi rỗng, không có ô nào, độ dài 0. Rỗng là an toàn, không có "rác".',
   viz:vChars('', {name:'s1', len:true})});
  c.out('s1 = []');
  c.snap({ln:4, title:'In s1',
   body:'Chuỗi rỗng in ra không có chữ nào giữa hai dấu ngoặc vuông.',
   viz:vChars('', {name:'s1', len:true})});
  var a = 'Xin chao';
  c.snap({ln:1, title:'string s2 = "Xin chao";',
   body:'Dùng dấu = để khai báo và cho giá trị ngay. Dải có ' + a.length + ' ô, kể cả ô dấu cách.',
   viz:vChars(a, {name:'s2', len:true, cells:{0:'new', 1:'new', 2:'new', 3:'new', 4:'new', 5:'new', 6:'new', 7:'new'}})});
  var b = 'Viet Nam';
  c.snap({ln:2, title:'string s3("Viet Nam");',
   body:'Viết giá trị trong dấu ngoặc tròn cũng được, kết quả giống hệt dùng dấu =.',
   viz:vChars(b, {name:'s3', len:true, cells:{0:'new', 1:'new', 2:'new', 3:'new', 4:'new', 5:'new', 6:'new', 7:'new'}})});
  c.snap({ln:3, title:'string s4 = s2;',
   body:'s4 được tạo bằng cách chép s2. Hai dải riêng biệt, chỉ có nội dung giống nhau.',
   viz:[vChars(a, {name:'s2', len:true}), vChars(a, {name:'s4', len:true, cells:{0:'new', 1:'new', 2:'new', 3:'new', 4:'new', 5:'new', 6:'new', 7:'new'}})]});
  var h = 'Hi';
  c.snap({ln:5, title:'s4 = "Hi";',
   body:'Đổi s4 thì s2 vẫn nguyên vẹn, vì s4 là bản sao riêng.',
   note:'Có bốn cách tạo chuỗi; chuỗi rỗng có độ dài 0 và an toàn; chép chuỗi ra một bản riêng.',
   viz:[vChars(a, {name:'s2', len:true, cells:{0:'ok', 1:'ok', 2:'ok', 3:'ok', 4:'ok', 5:'ok', 6:'ok', 7:'ok'}}), vChars(h, {name:'s4', len:true, cells:{0:'new', 1:'new'}})]});
 }},
noi:{inputs:[],
 intro:'+ ghép thành chuỗi mới, += nối thêm vào đuôi, = thay hết. Bấm "Bước tiếp".',
 lines:function(){ return ['string ho = "Nguyen";', 'string ten = "An";', 'string day = ho + " " + ten;', 'cout << day << endl;', 'string tb = "Dang xu ly...";', 'tb = "Hoan tat!";', 'tb += " Cam on ban.";', 'cout << tb << endl;']; },
 run:function(c){
  var ho = 'Nguyen', ten = 'An', day = ho + ' ' + ten;
  c.snap({ln:1, title:'Hai chuỗi ho và ten',
   body:'ho có ' + ho.length + ' ký tự, ten có ' + ten.length + ' ký tự.',
   viz:[vChars(ho, {name:'ho', len:true}), vChars(ten, {name:'ten', len:true})]});
  var m = ho + ' ';
  c.snap({ln:2, title:'ho + " "',
   body:'Toán tử + ghép chuỗi: bước đầu ghép ho với một dấu cách, được chuỗi tạm dài ' + m.length + ' ký tự.',
   viz:vChars(m, {name:'ho + " "', len:true, cells:{6:'hi'}})});
  c.snap({ln:2, title:'... + ten',
   body:'Ghép tiếp với ten, được chuỗi mới dài ' + day.length + ' ký tự, cất vào day. ho và ten vẫn giữ nguyên.',
   viz:vChars(day, {name:'day', len:true, cells:{7:'new', 8:'new'}})});
  c.out(day);
  c.snap({ln:3, title:'In day', body:'Console in ra: ' + day,
   viz:vChars(day, {name:'day', len:true, cells:{0:'ok', 1:'ok', 2:'ok', 3:'ok', 4:'ok', 5:'ok', 6:'ok', 7:'ok', 8:'ok'}})});
  var t1 = 'Dang xu ly...', t2 = 'Hoan tat!', t3 = t2 + ' Cam on ban.';
  c.snap({ln:4, title:'string tb = "Dang xu ly...";',
   body:'Chuỗi tb ban đầu dài ' + t1.length + ' ký tự.',
   viz:vChars(t1, {name:'tb', len:true})});
  c.snap({ln:5, title:'tb = "Hoan tat!";',
   body:'Dấu = thay hết: nội dung cũ mất, tb giờ chỉ còn "Hoan tat!" dài ' + t2.length + ' ký tự.',
   viz:vChars(t2, {name:'tb', len:true, cells:{0:'new', 1:'new', 2:'new', 3:'new', 4:'new', 5:'new', 6:'new', 7:'new', 8:'new'}})});
  var nw = {}; for (var i = t2.length; i < t3.length; i++) nw[i] = 'new';
  c.snap({ln:6, title:'tb += " Cam on ban.";',
   body:'Dấu += giữ phần cũ, chỉ mọc thêm ô ở đuôi: độ dài từ ' + t2.length + ' thành ' + t3.length + '.',
   viz:vChars(t3, {name:'tb', len:true, cells:nw})});
  c.out(t3);
  c.snap({ln:7, title:'Xong',
   body:'Console in ra: ' + t3,
   note:'= thay hết, += nối thêm vào đuôi, + ghép thành chuỗi mới (hai chuỗi gốc không đổi).',
   viz:vChars(t3, {name:'tb', len:true, cells:nw})});
 }},
bay:{inputs:[],
 intro:'Chữ viết trong dấu ngoặc kép chưa phải std::string. Xem vì sao ghép hai chữ như vậy bị lỗi. Bấm "Bước tiếp".',
 lines:function(){ return ['// Cách 1: bị lỗi', 'string ketQua = "Hello" + "World";', '', '// Cách 2: đã sửa', 'string ketQua =', '    string("Hello") + "World";', 'cout << ketQua << endl;']; },
 run:function(c){
  var lit = function(t, nm){ return vChars(t, {name:nm, nul:true, cells:{0:'dim', 1:'dim', 2:'dim', 3:'dim', 4:'dim'}}); };
  var msg = "error: invalid operands of types 'const char [6]' and 'const char [6]' to binary 'operator+'";
  c.snap({ln:1, title:'"Hello" là chuỗi kiểu C',
   body:'Chữ trong ngoặc kép là chuỗi kiểu C (const char[6]): 5 ký tự cộng ô \\0 báo hết chuỗi. Nó chưa phải std::string.',
   viz:[lit('Hello', '"Hello"  const char[6]'), vCard({kind:'info', title:'Thẻ xám = chuỗi kiểu C', sub:'Chưa phải std::string'})]});
  c.snap({ln:1, title:'"Hello" + "World"',
   body:'Cả hai vế của dấu + đều là thẻ xám. C++ không biết ghép hai chuỗi kiểu C với nhau.',
   viz:[lit('Hello', '"Hello"'), lit('World', '"World"')]});
  c.err(msg);
  c.snap({ln:1, title:'Lỗi biên dịch',
   body:'Trình biên dịch dừng ngay, chương trình không chạy được.',
   viz:vErr({kind:'compile', note:'Không sinh được file chạy', msg:[msg], code:'"Hello" + "World"'})});
  c.clear();
  c.snap({ln:5, title:'Bọc string(...) cho vế đầu',
   body:'string("Hello") biến thẻ xám thành một std::string thật. Giờ vế trái là std::string nên dấu + dùng được.',
   viz:[vChars('Hello', {name:'string("Hello")', len:true, cells:{0:'new', 1:'new', 2:'new', 3:'new', 4:'new'}}), lit('World', '"World"')]});
  c.out('HelloWorld');
  c.snap({ln:6, title:'Xong',
   body:'Ghép được thành "HelloWorld", dài 10 ký tự.',
   note:'Với dấu +, ít nhất một vế phải là std::string.',
   viz:[vChars('HelloWorld', {name:'ketQua', len:true, cells:{5:'ok', 6:'ok', 7:'ok', 8:'ok', 9:'ok'}}), vCard({kind:'ok', title:'Đã sửa', sub:'string("Hello") + "World"'})]});
 }}
};
