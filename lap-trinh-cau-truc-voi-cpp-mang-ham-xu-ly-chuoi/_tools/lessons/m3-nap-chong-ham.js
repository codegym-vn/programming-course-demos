// META {"module":3,"lesson":"Bài 3.7. Nạp chồng hàm (Function Overloading)","activity":"Nạp Chồng Hàm (Function Overloading)","title":"Máy chọn phiên bản hàm","lead":"Xem trình biên dịch chọn một trong nhiều hàm cùng tên bằng cách so số lượng và kiểu đối số. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["chon","Chọn phiên bản"],["khonghople","Nạp chồng không hợp lệ"],["momho","Gọi mơ hồ"]],"codeTitle":"Mã nguồn C++","path":"ham-function/nap-chong-ham-function-overloading/nap-chong-ham-function-overloading/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Các cửa (phiên bản hàm)';

var EX = {
chon:{inputs:[],
 intro:'Bốn hàm cùng tên tinhTong. Mỗi lời gọi sẽ đi vào đúng một cửa. Bấm "Bước tiếp".',
 lines:function(){ return ['int tinhTong(int a, int b) {', '  return a + b;', '}', 'int tinhTong(int a, int b, int c) {', '  return a + b + c;', '}', 'double tinhTong(double a, double b) {', '  return a + b;', '}', 'string tinhTong(string a, string b) {', '  return a + b;', '}', 'int main() {', '  cout << tinhTong(3, 4) << endl;', '  cout << tinhTong(3, 4, 5) << endl;', '  cout << tinhTong(3.5, 4.2) << endl;', '  cout << tinhTong(string("Hello "),', '                   "World") << endl;', '}']; },
 run:function(c){
  var SIG = ['tinhTong(int, int)', 'tinhTong(int, int, int)', 'tinhTong(double, double)', 'tinhTong(string, string)'];
  var doors = function(st, notes){ return SIG.map(function(sg, i){ return {sig:sg, s:st[i], note:notes && notes[i]}; }); };
  c.snap({ln:0, title:'Bốn phiên bản, cùng một tên',
   body:'Mỗi phiên bản có "chữ ký" riêng: số lượng và kiểu của tham số. Máy dựa vào chữ ký để chọn.',
   viz:vOverload({doors:doors(['dim', 'dim', 'dim', 'dim']), title:'Bốn cửa tinhTong'})});
  c.out(String(3 + 4));
  c.snap({ln:12, title:'tinhTong(3, 4)',
   body:'Hai đối số kiểu int. Cửa 3 tham số bị loại vì sai số lượng. Cửa (int, int) khớp chính xác. Console in 7.',
   viz:vOverload({call:'tinhTong(3, 4)', types:['int', 'int'], doors:doors(['ok', 'no', 'warn', 'no'], ['', 'thiếu/thừa đối số', 'đổi kiểu được, nhưng kém hơn', 'không đổi được']), result:{kind:'ok', text:'Chọn tinhTong(int, int)'}})});
  c.out(String(3 + 4 + 5));
  c.snap({ln:13, title:'tinhTong(3, 4, 5)',
   body:'Ba đối số: chỉ có một cửa nhận ba tham số. Máy chọn nó. Console in ' + (3 + 4 + 5) + '.',
   viz:vOverload({call:'tinhTong(3, 4, 5)', types:['int', 'int', 'int'], doors:doors(['no', 'ok', 'no', 'no'], ['sai số lượng', '', 'sai số lượng', 'sai số lượng']), result:{kind:'ok', text:'Chọn tinhTong(int, int, int)'}})});
  c.out('7.7');
  c.snap({ln:14, title:'tinhTong(3.5, 4.2)',
   body:'Hai đối số kiểu double. Cửa (double, double) khớp chính xác. Cửa (int, int) cũng nhận được nhưng phải đổi kiểu, nên thua. Console in 7.7.',
   viz:vOverload({call:'tinhTong(3.5, 4.2)', types:['double', 'double'], doors:doors(['warn', 'no', 'ok', 'no'], ['phải đổi kiểu', 'sai số lượng', '', 'không đổi được']), result:{kind:'ok', text:'Chọn tinhTong(double, double)'}})});
  c.out('Hello World');
  c.snap({ln:15, title:'tinhTong("Hello ", "World")',
   body:'Chữ trong ngoặc kép đổi được thành string, còn thành số thì không. Chỉ còn một cửa dùng được. Với string, dấu + là nối chuỗi.',
   viz:vOverload({call:'tinhTong(string("Hello "), "World")', types:['string', 'const char*'], doors:doors(['no', 'no', 'no', 'warn'], ['không đổi chữ thành số', 'sai số lượng', 'không đổi chữ thành số', 'chỉ cửa này dùng được']), result:{kind:'ok', text:'Chọn tinhTong(string, string)'}})});
  c.snap({ln:17, title:'Xong',
   body:'Mỗi lời gọi đi vào đúng một cửa, và máy chọn xong ngay lúc biên dịch.',
   note:'Nạp chồng: nhiều hàm cùng tên nhưng khác số lượng hoặc kiểu tham số. Máy chọn phiên bản khớp nhất với các đối số.',
   viz:vCard({kind:'ok', title:'Ghi nhớ', rows:[['Cùng tên', 'khác số lượng hoặc kiểu tham số'], ['Máy chọn', 'phiên bản khớp nhất với đối số']]})});
 }},
khonghople:{inputs:[],
 intro:'Máy chỉ nhìn số lượng và kiểu tham số. Kiểu trả về và tên tham số không giúp phân biệt. Bấm "Bước tiếp".',
 lines:function(){ return ['int layGiaTri(int a, int b) {', '  return a + b;', '}', 'double layGiaTri(int a, int b) {', '  return a + b;', '}', 'double tinhDienTich(double canh) {', '  return canh * canh;', '}', 'double tinhDienTich(double banKinh) {', '  return 3.14 * banKinh * banKinh;', '}']; },
 run:function(c){
  var e1 = "error: ambiguating new declaration of 'double layGiaTri(int, int)'";
  var e2 = "error: redefinition of 'double tinhDienTich(double)'";
  c.snap({ln:0, title:'Cửa layGiaTri(int, int)',
   body:'Hàm đầu tiên được đặt vào một cửa. Trên cửa chỉ ghi tên hàm và kiểu tham số.',
   viz:vOverload({doors:[{sig:'layGiaTri(int, int)', s:'ok', note:'trả về int'}], title:'Các cửa layGiaTri'})});
  c.err(e1);
  c.snap({ln:3, title:'Hàm thứ hai chỉ khác kiểu trả về',
   body:'Hàm này trả về double nhưng tham số vẫn là (int, int). Kiểu trả về không ghi trên cửa, nên cửa mới chồng khít lên cửa cũ.',
   viz:[vOverload({doors:[{sig:'layGiaTri(int, int)', s:'ok', note:'trả về int'}, {sig:'layGiaTri(int, int)', s:'bad', note:'trả về double'}], result:{kind:'dup', text:'Hai cửa giống hệt nhau'}}), vErr({kind:'compile', msg:[e1]})]});
  c.snap({ln:6, title:'Cửa tinhDienTich(double)',
   body:'Hàm tính diện tích hình vuông, nhận tham số tên canh kiểu double.',
   viz:vOverload({doors:[{sig:'tinhDienTich(double)', s:'ok', note:'tên tham số: canh'}], title:'Các cửa tinhDienTich'})});
  c.err(e2);
  c.snap({ln:9, title:'Hàm thứ hai chỉ khác tên tham số',
   body:'Tham số đổi tên thành banKinh nhưng vẫn là double. Tên tham số không ghi trên cửa, nên đây cũng là hai cửa giống hệt nhau.',
   viz:[vOverload({doors:[{sig:'tinhDienTich(double)', s:'ok', note:'tên tham số: canh'}, {sig:'tinhDienTich(double)', s:'bad', note:'tên tham số: banKinh'}], result:{kind:'dup', text:'Hai cửa giống hệt nhau'}}), vErr({kind:'compile', msg:[e2]})]});
  c.snap({ln:9, title:'Xong',
   body:'Cách sửa: đổi số lượng hoặc kiểu tham số, hoặc đặt tên hàm khác (ví dụ tinhDienTichTron).',
   note:'Hai hàm chỉ khác kiểu trả về hoặc chỉ khác tên tham số không phải là nạp chồng, mà là lỗi biên dịch. Chữ ký chỉ gồm tên hàm và danh sách kiểu tham số.',
   viz:vCard({kind:'ok', title:'Chữ ký hàm', rows:[['Có tính', 'tên hàm, số lượng và kiểu tham số'], ['Không tính', 'kiểu trả về, tên tham số']]})});
 }},
momho:{inputs:[],
 intro:'Khi hai cửa đều vừa "tạm được" như nhau, máy không biết chọn cửa nào. Bấm "Bước tiếp".',
 lines:function(){ return ['void inSo(float x) {', '  cout << "FLOAT: " << x;', '}', 'void inSo(double x) {', '  cout << "DOUBLE: " << x;', '}', 'int main() {', '  inSo(5.0);', '  inSo(5);', '}']; },
 run:function(c){
  var e = "error: call of overloaded 'inSo(int)' is ambiguous";
  c.snap({ln:0, title:'Hai cửa: float và double',
   body:'Có hai phiên bản inSo: một nhận float, một nhận double. Máy sẽ kiểm tra từng lời gọi lúc biên dịch.',
   viz:vOverload({doors:[{sig:'inSo(float)', s:'dim'}, {sig:'inSo(double)', s:'dim'}], title:'Hai cửa inSo'})});
  c.snap({ln:7, title:'inSo(5.0)',
   body:'5.0 là kiểu double. Cửa double khớp chính xác, cửa float phải đổi kiểu. Máy chọn cửa double.',
   viz:vOverload({call:'inSo(5.0)', types:['double'], doors:[{sig:'inSo(float)', s:'warn', note:'phải đổi kiểu'}, {sig:'inSo(double)', s:'ok'}], result:{kind:'ok', text:'Chọn inSo(double)'}})});
  c.err(e);
  c.snap({ln:8, title:'inSo(5)',
   body:'5 là kiểu int, không khớp chính xác với cửa nào. Đổi sang float và đổi sang double đều "tạm được" như nhau, nên máy không chọn được.',
   viz:[vOverload({call:'inSo(5)', types:['int'], doors:[{sig:'inSo(float)', s:'warn', note:'int đổi thành float'}, {sig:'inSo(double)', s:'warn', note:'int đổi thành double'}], result:{kind:'ambig', text:'Hai cửa ngang nhau: gọi mơ hồ'}}), vErr({kind:'compile', msg:[e]})]});
  c.snap({ln:8, title:'Xong',
   body:'Vì có lỗi biên dịch nên chương trình không chạy. Cách sửa: viết inSo(5.0) để khớp chính xác với cửa double.',
   note:'Gọi mơ hồ xảy ra khi đối số không khớp chính xác và có từ hai phiên bản trở lên cùng "tạm được". Sửa bằng cách truyền đúng kiểu, hoặc đổi kiểu đối số trước khi gọi.',
   viz:vOverload({call:'inSo(5.0)', types:['double'], doors:[{sig:'inSo(float)', s:'warn'}, {sig:'inSo(double)', s:'ok'}], result:{kind:'ok', text:'Cách sửa: truyền 5.0 (double)'}, title:'Sau khi sửa'})});
 }}
};
