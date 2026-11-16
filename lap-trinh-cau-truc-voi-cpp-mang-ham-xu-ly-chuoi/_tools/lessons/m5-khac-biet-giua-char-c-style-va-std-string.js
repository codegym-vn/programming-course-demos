// META {"module":5,"lesson":"Bài 5.4. Chuyển đổi chuỗi – số; char[] và std::string","activity":"Khác Biệt Giữa char[] (C-style) Và std::string","title":"char[] là khay cố định, std::string tự co giãn","lead":"Xem chuỗi kiểu char[] nằm trong khay ô cố định, chuyện gì xảy ra khi tràn khay, và vì sao std::string dễ dùng hơn. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["len","strlen và sizeof"],["tran","Tràn bộ nhớ khi strcpy"],["sosanh","So sánh == và nối chuỗi"]],"codeTitle":"Mã nguồn C++","path":"xu-ly-chuoi/chuyen-doi-chuoi-so-char-va-std-string/khac-biet-giua-char-c-style-va-std-string/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Khay ô nhớ của chuỗi';

function kbAll(n, st){ var o = {}; for (var i = 0; i < n; i++) o[i] = st; return o; }

var EX = {
len:{inputs:[],
 intro:'char[] là một khay có sẵn số ô cố định. Chuỗi nằm ở các ô đầu, ô \\0 đánh dấu chỗ kết thúc. Bấm "Bước tiếp".',
 lines:function(){ return ['char ten[20] = "Nguyen An";', 'cout << strlen(ten) << endl;', 'cout << sizeof(ten) << endl;']; },
 run:function(c){
  var t = 'Nguyen An';
  c.snap({ln:0, title:'char ten[20] = "Nguyen An";', body:'Máy cấp sẵn khay 20 ô. Chữ chiếm ' + t.length + ' ô đầu, kế đó là ô \\0 báo hết chuỗi. Các ô sau còn trống.',
   viz:vChars(t, {name:'ten', nul:true, cap:20, cells:kbAll(t.length, 'new')})});
  c.out(String(t.length));
  c.snap({ln:1, title:'strlen(ten)', body:'strlen đếm từ đầu tới trước ô \\0, nên ra ' + t.length + '.',
   viz:vChars(t, {name:'ten', nul:true, cap:20, len:true, cells:kbAll(t.length, 'ok')})});
  c.out('20');
  c.snap({ln:2, title:'sizeof(ten)', body:'sizeof cho biết cả khay có bao nhiêu byte: 20, bất kể chữ dài hay ngắn.',
   viz:vChars(t, {name:'ten', nul:true, cap:20, size:true, cells:kbAll(20, 'hi')})});
  c.snap({ln:2, title:'Xong', body:'strlen là độ dài chữ (9), sizeof là cỡ cả khay (20). Hai số này khác nhau.',
   note:'Chuỗi char[] tự kết thúc bằng ô \\0, nên khay cần chứa thêm 1 ô cho nó.',
   viz:vChars(t, {name:'ten', nul:true, cap:20, len:true, size:true})});
 }},
tran:{inputs:[],
 intro:'Chép chuỗi dài vào khay nhỏ thì chữ thừa tràn sang vùng nhớ bên cạnh. Bấm "Bước tiếp".',
 lines:function(){ return ['char ten[10];', 'strcpy(ten, "Nguyen Van An Binh");', 'cout << ten << endl;', '', '// Dùng string', 'string ten = "Nguyen Van An Binh";', 'cout << ten << endl;']; },
 run:function(c){
  var t = 'Nguyen Van An Binh', tray = t.substr(0, 10), spill = t.substr(10) + '\0';
  c.snap({ln:0, title:'char ten[10];', body:'Khay chỉ có 10 ô, chưa có chữ nào.',
   viz:vChars('', {name:'ten', cap:10, size:true})});
  c.snap({ln:1, title:'Trình biên dịch cảnh báo', body:'Chuỗi cần ' + (t.length + 1) + ' byte (gồm cả \\0) mà khay chỉ có 10. Trình biên dịch báo trước, nhưng vẫn cho chạy.',
   viz:vErr({kind:'warn', msg:['warning: writing ' + (t.length + 1) + ' bytes into a region of size 10 overflows the destination [-Wstringop-overflow=]'], code:'strcpy(ten, "Nguyen Van An Binh");'})});
  c.snap({ln:1, title:'strcpy chép chữ', body:'10 ký tự đầu vừa khít khay. Các ký tự còn lại tràn sang vùng nhớ bên cạnh, có thể đè lên dữ liệu khác.',
   viz:vChars(tray, {name:'ten', cap:10, spill:spill, neighbor:'vùng nhớ bên cạnh', cells:kbAll(10, 'ok')}),
   note:'Đây là hành vi không xác định: kết quả cụ thể tùy máy, hình chỉ là ví dụ.'});
  c.out(t);
  c.snap({ln:2, title:'cout << ten;', body:'cout cứ đọc tiếp tới khi gặp \\0 nên vẫn in ra cả chuỗi. Trông như chạy đúng, nhưng dữ liệu bên cạnh đã bị hỏng.',
   viz:vChars(tray, {name:'ten', cap:10, spill:spill, neighbor:'vùng nhớ bên cạnh', cells:kbAll(10, 'ok')})});
  c.err('*** stack smashing detected ***: terminated');
  c.err('Aborted');
  c.snap({ln:2, title:'Kết thúc hàm', body:'Nếu máy bật cơ chế bảo vệ, nó phát hiện vùng nhớ đã bị ghi đè và dừng chương trình. Trên máy khác có thể lỗi theo cách khác.',
   viz:vErr({kind:'runtime', msg:['*** stack smashing detected ***: terminated', 'Aborted'], note:'có thể xảy ra'})});
  c.clear();
  c.snap({ln:5, title:'string ten = "Nguyen Van An Binh";', body:'string tự xin thêm chỗ cho đủ ' + t.length + ' ký tự, không tràn.',
   viz:vChars(t, {name:'ten', len:true, cells:kbAll(t.length, 'new')})});
  c.out(t);
  c.snap({ln:6, title:'Xong', body:'Chuỗi dài bao nhiêu, string co giãn bấy nhiêu.',
   note:'char[] không tự kiểm tra cỡ khay; std::string tự lo bộ nhớ.',
   viz:vChars(t, {name:'ten', len:true, cells:kbAll(t.length, 'ok')})});
 }},
sosanh:{inputs:[],
 intro:'Hai char[] giống chữ nhưng == vẫn cho 0. Xem cách so sánh và nối đúng. Bấm "Bước tiếp".',
 lines:function(){ return ['char a[] = "abc";', 'char b[] = "abc";', 'cout << (a == b) << endl;', 'cout << (strcmp(a, b) == 0) << endl;', 'string sa = "abc", sb = "abc";', 'cout << (sa == sb) << endl;', 'char ho[20] = "Nguyen";', 'strcat(ho, " An");', 'string s = "Nguyen An";', 's += " Nguyen Thi Kim Ngan";']; },
 run:function(c){
  var ca = {0:'new', 1:'new', 2:'new'};
  var A = function(st){ return vChars('abc', {name:'a (ở địa chỉ 0x…a0)', nul:true, cells:st}); };
  var B = function(st){ return vChars('abc', {name:'b (ở địa chỉ 0x…b0)', nul:true, cells:st}); };
  c.snap({ln:1, title:'Hai mảng giống chữ', body:'a và b đều chứa "abc", nhưng là hai khay riêng, nằm ở hai địa chỉ khác nhau.',
   viz:[A(ca), B(ca)]});
  c.out('0');
  c.snap({ln:2, title:'a == b', body:'Với char[], == so địa chỉ của hai khay, không so chữ bên trong. Hai địa chỉ khác nhau nên ra 0.',
   viz:[A(), B(), vScore([{k:'0x…a0 == 0x…b0 ?', v:'0 (sai)', s:'bad'}])]});
  c.out('1');
  c.snap({ln:3, title:'strcmp(a, b) == 0', body:'strcmp so từng ký tự, thấy giống hệt nên ra đúng: 1.',
   viz:[A(kbAll(3, 'ok')), B(kbAll(3, 'ok')), vScore([{k:'strcmp: so từng ký tự', v:'1 (đúng)', s:'ok'}])]});
  c.out('1');
  c.snap({ln:5, title:'sa == sb', body:'Với std::string, == so nội dung từng ký tự, nên ra 1.',
   viz:[vChars('abc', {name:'sa', cells:kbAll(3, 'ok')}), vChars('abc', {name:'sb', cells:kbAll(3, 'ok')})]});
  c.clear();
  c.snap({ln:6, title:'char ho[20] = "Nguyen";', body:'Khay 20 ô, hiện chứa "Nguyen".',
   viz:vChars('Nguyen', {name:'ho', nul:true, cap:20, cells:kbAll(6, 'new')})});
  var h2 = 'Nguyen An';
  c.snap({ln:7, title:'strcat(ho, " An")', body:'strcat ghi thêm vào sau chữ cũ. Khay còn đủ chỗ nên ổn. Nếu khay nhỏ hơn thì sẽ tràn như ở tab trước.',
   viz:vChars(h2, {name:'ho', nul:true, cap:20, cells:{6:'new', 7:'new', 8:'new'}})});
  var s0 = 'Nguyen An', s1 = s0 + ' Nguyen Thi Kim Ngan', nw = {};
  for (var i = s0.length; i < s1.length; i++) nw[i] = 'new';
  c.snap({ln:9, title:'s += "..."', body:'string tự kéo dài thêm, giờ dài ' + s1.length + ' ký tự, không cần lo khay đủ hay không.',
   note:'char[] phải tự dùng strcmp, strcat và tự lo đủ chỗ; std::string dùng == và + tự nhiên.',
   viz:vChars(s1, {name:'s', len:true, cells:nw})});
 }}
};
