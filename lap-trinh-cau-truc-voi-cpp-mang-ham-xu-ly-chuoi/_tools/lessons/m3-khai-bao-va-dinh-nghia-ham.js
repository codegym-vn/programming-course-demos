// META {"module":3,"lesson":"Bài 3.1. Vì sao cần hàm; khai báo và gọi hàm","activity":"Khai Báo Hàm (Function Declaration) Và Định Nghĩa Hàm (Function Definition)","title":"Khai báo hàm và định nghĩa hàm","lead":"Xem trình biên dịch đọc file từ trên xuống, ghi nhớ những hàm đã biết, và chuyện gì xảy ra khi lời báo trước không khớp phần định nghĩa. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["goi","Gọi trước, định nghĩa sau"],["cach","Cách 1 và Cách 2"],["lech","Lỗi: khai báo lệch định nghĩa"]],"codeTitle":"Mã nguồn C++","path":"ham-function/vi-sao-can-ham-khai-bao-va-goi-ham/khai-bao-ham-function-declaration-va-dinh-nghia-ham-function-definition/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Danh bạ hàm của trình biên dịch';

var b9Sum = 'int tinhTong(int, int)', b9Diff = 'int tinhHieu(int, int)', b9Print = 'void inKetQua(int, int)';
function b9Book(arr){ return arr.map(function(x){ return {sig:x[0], kind:x[1], s:x[2]}; }); }

var EX = {
goi:{inputs:[],
 intro:'Trình biên dịch đọc file từ trên xuống và chỉ biết những hàm nó đã gặp. Bấm "Bước tiếp".',
 lines:function(){ return [
  'int tinhTong(int a, int b);',
  '',
  'int main() {',
  '  int kq = tinhTong(3, 5);',
  '  cout << "Tong: " << kq << endl;',
  '  return 0;',
  '}',
  '',
  'int tinhTong(int a, int b) {',
  '  return a + b;',
  '}']; },
 run:function(c){
  var D = {dim:[0], dimLabel:'chưa có dòng này'};
  var MSG = "error: 'tinhTong' was not declared in this scope";
  c.snap({ln:2, dim:D.dim, dimLabel:D.dimLabel, title:'Thử khi chưa có dòng 1',
   body:'Tạm xem như file chưa có dòng 1. Vạch quét đi từ trên xuống, và danh bạ hàm đang trống.',
   viz:vScanTop({book:[]})});
  c.err(MSG);
  c.snap({ln:3, dim:D.dim, dimLabel:D.dimLabel, title:'Gặp lời gọi tinhTong(3, 5)',
   body:'Tra danh bạ không thấy tinhTong. Hàm có ở cuối file cũng vô ích vì vạch quét chưa tới đó.',
   viz:vScanTop({book:[], check:{call:'tinhTong(3, 5)', ok:false, msg:'báo lỗi biên dịch'}})});
  c.clear();
  c.snap({ln:0, title:'Thêm dòng 1: lời hứa',
   body:'Dòng 1 chỉ ghi chữ ký của hàm, kết thúc bằng dấu ;. Danh bạ ghi thêm một thẻ "đã hứa": hàm này sẽ có thân ở đâu đó phía sau.',
   viz:vScanTop({book:b9Book([[b9Sum, 'hua', 'new']])})});
  c.snap({ln:3, title:'Gặp lời gọi tinhTong(3, 5)',
   body:'Lần này tra danh bạ thấy có tinhTong nên lời gọi được chấp nhận.',
   viz:vScanTop({book:b9Book([[b9Sum, 'hua']]), check:{call:'tinhTong(3, 5)', ok:true}})});
  c.snap({ln:8, title:'Gặp phần định nghĩa',
   body:'Vạch quét tới thân hàm đầy đủ ở cuối file. Thẻ được đóng dấu "có thân hàm".',
   viz:vScanTop({book:b9Book([[b9Sum, 'than', 'ok']])})});
  c.snap({ln:10, title:'Bước liên kết',
   body:'Sau khi đọc hết file, máy nối mỗi lời hứa với một thân hàm. Lời hứa tinhTong đã có thân nên mọi thứ khớp.',
   viz:vScanTop({book:b9Book([[b9Sum, 'than', 'ok']]), link:{ok:true}})});
  c.out('Tong: 8');
  c.snap({ln:3, title:'Xong',
   body:'Chương trình chạy và in "Tong: 8".',
   note:'Hàm phải được khai báo (nguyên mẫu hoặc định nghĩa) trước chỗ gọi. Nguyên mẫu kết thúc bằng dấu ;.',
   viz:vScanTop({book:b9Book([[b9Sum, 'than', 'ok']]), link:{ok:true}})});
 }},

cach:{
 intro:'Cùng một chương trình, viết theo hai cách. Cả hai cột cùng chạy từng bước. Bấm "Bước tiếp".',
 running:'Quan sát vị trí của main trong mỗi file.',
 done:'Cách 1 và Cách 2 cho cùng kết quả. Cách 2 đặt main ngay đầu file nên đọc lướt là thấy chương trình làm gì.',
 note:'Cách 1: viết định nghĩa trước main, không cần nguyên mẫu. Cách 2: nguyên mẫu ở đầu, main kế tiếp, định nghĩa ở dưới.',
 cols:[
 {title:'Cách 1: định nghĩa trước main', sub:'Không cần nguyên mẫu.',
  lines:[
   'int tinhTong(int a, int b) {',
   '  return a + b;',
   '}',
   'int tinhHieu(int a, int b) {',
   '  return a - b;',
   '}',
   'void inKetQua(int t, int h) {',
   '  cout << "Tong: " << t',
   '       << ", Hieu: " << h << endl;',
   '}',
   'int main() {',
   '  int a = 10, b = 4;',
   '  inKetQua(tinhTong(a, b),',
   '           tinhHieu(a, b));',
   '}'],
  run:function(c){
   var CALLS = 'tinhTong, tinhHieu, inKetQua';
   c.snap({ln:0, title:'Gặp tinhTong',
    body:'Định nghĩa đầy đủ xuất hiện trước, nên tinhTong vào danh bạ với dấu "có thân hàm".',
    viz:vScanTop({book:b9Book([[b9Sum, 'than', 'new']])})});
   c.snap({ln:3, title:'Gặp tinhHieu',
    body:'tinhHieu cũng vào danh bạ như vậy.',
    viz:vScanTop({book:b9Book([[b9Sum, 'than'], [b9Diff, 'than', 'new']])})});
   c.snap({ln:6, title:'Gặp inKetQua',
    body:'Hàm thứ ba cũng được ghi nhớ.',
    viz:vScanTop({book:b9Book([[b9Sum, 'than'], [b9Diff, 'than'], [b9Print, 'than', 'new']])})});
   c.snap({ln:12, title:'Tới main và gặp các lời gọi',
    body:'main nằm ở gần cuối file. Cả ba hàm đã có trong danh bạ nên mọi lời gọi hợp lệ.',
    viz:vScanTop({book:b9Book([[b9Sum, 'than'], [b9Diff, 'than'], [b9Print, 'than']]), check:{call:CALLS, ok:true}})});
   c.snap({ln:14, title:'Hết file',
    body:'Không có lời hứa nào thiếu thân hàm, nên bước liên kết thành công.',
    viz:vScanTop({book:b9Book([[b9Sum, 'than', 'ok'], [b9Diff, 'than', 'ok'], [b9Print, 'than', 'ok']]), link:{ok:true}})});
   c.out('Tong: 14, Hieu: 6');
   c.snap({ln:12, title:'Xong',
    body:'Chạy ra "Tong: 14, Hieu: 6". Muốn đọc main phải cuộn xuống tận dưới.',
    viz:vScanTop({book:b9Book([[b9Sum, 'than'], [b9Diff, 'than'], [b9Print, 'than']]), link:{ok:true}})});
  }},
 {title:'Cách 2: nguyên mẫu, main, định nghĩa', sub:'main nằm ngay đầu file.',
  lines:[
   'int tinhTong(int a, int b);',
   'int tinhHieu(int a, int b);',
   'void inKetQua(int t, int h);',
   '',
   'int main() {',
   '  int a = 10, b = 4;',
   '  inKetQua(tinhTong(a, b),',
   '           tinhHieu(a, b));',
   '}',
   '',
   'int tinhTong(int a, int b) {',
   '  return a + b;',
   '}',
   'int tinhHieu(int a, int b) {',
   '  return a - b;',
   '}',
   'void inKetQua(int t, int h) {',
   '  cout << "Tong: " << t',
   '       << ", Hieu: " << h << endl;',
   '}'],
  run:function(c){
   var CALLS = 'tinhTong, tinhHieu, inKetQua';
   c.snap({ln:0, title:'Nguyên mẫu tinhTong',
    body:'Chỉ có chữ ký, nên thẻ tinhTong mang dấu "đã hứa".',
    viz:vScanTop({book:b9Book([[b9Sum, 'hua', 'new']])})});
   c.snap({ln:1, title:'Nguyên mẫu tinhHieu',
    body:'Thêm một lời hứa nữa.',
    viz:vScanTop({book:b9Book([[b9Sum, 'hua'], [b9Diff, 'hua', 'new']])})});
   c.snap({ln:2, title:'Nguyên mẫu inKetQua',
    body:'Ba lời hứa đã nằm trong danh bạ, và file mới đọc được 3 dòng.',
    viz:vScanTop({book:b9Book([[b9Sum, 'hua'], [b9Diff, 'hua'], [b9Print, 'hua', 'new']])})});
   c.snap({ln:6, title:'main ngay đầu file',
    body:'main xuất hiện sớm và gọi được cả ba hàm, vì chúng đã được hứa. Đọc main là hiểu chương trình làm gì.',
    viz:vScanTop({book:b9Book([[b9Sum, 'hua'], [b9Diff, 'hua'], [b9Print, 'hua']]), check:{call:CALLS, ok:true}})});
   c.snap({ln:19, title:'Các định nghĩa ở cuối file',
    body:'Mỗi định nghĩa đóng dấu "có thân hàm" cho lời hứa tương ứng. Bước liên kết thấy đủ cả ba nên thành công.',
    viz:vScanTop({book:b9Book([[b9Sum, 'than', 'ok'], [b9Diff, 'than', 'ok'], [b9Print, 'than', 'ok']]), link:{ok:true}})});
   c.out('Tong: 14, Hieu: 6');
   c.snap({ln:6, title:'Xong',
    body:'Cũng ra "Tong: 14, Hieu: 6". Lần này main nằm ngay đầu file.',
    viz:vScanTop({book:b9Book([[b9Sum, 'than'], [b9Diff, 'than'], [b9Print, 'than']]), link:{ok:true}})});
  }}
 ]},

lech:{inputs:[],
 intro:'Lời báo trước nói tinhTong nhận hai số int, nhưng phần định nghĩa lại viết cho double. Bấm "Bước tiếp".',
 lines:function(){ return [
  'int tinhTong(int a, int b);',
  '',
  'int main() {',
  '  cout << tinhTong(3, 5) << endl;',
  '  return 0;',
  '}',
  '',
  'int tinhTong(double a, double b) {',
  '  return a + b;',
  '}']; },
 run:function(c){
  var PROM = 'int tinhTong(int, int)', DEF = 'int tinhTong(double, double)';
  c.snap({ln:0, title:'Lời hứa: (int, int)',
   body:'Danh bạ ghi lời hứa: có hàm tinhTong nhận hai số int.',
   viz:vScanTop({book:b9Book([[PROM, 'hua', 'new']])})});
  c.snap({ln:3, title:'Gặp lời gọi tinhTong(3, 5)',
   body:'Lời gọi khớp với lời hứa nên trình biên dịch chấp nhận. main chỉ cần lời hứa, chưa cần thân hàm.',
   viz:vScanTop({book:b9Book([[PROM, 'hua']]), check:{call:'tinhTong(3, 5)', ok:true}})});
  c.snap({ln:7, title:'Gặp định nghĩa (double, double)',
   body:'Thân hàm này nhận hai số double, nên C++ coi nó là một hàm khác. Lời hứa (int, int) vẫn chưa có thân. Biên dịch vẫn qua.',
   viz:vScanTop({book:b9Book([[PROM, 'hua', 'bad'], [DEF, 'than', 'new']])})});
  c.err("undefined reference to `tinhTong(int, int)'");
  c.err('collect2: error: ld returned 1 exit status');
  c.snap({ln:9, title:'Bước liên kết thất bại',
   body:'Máy tìm thân hàm cho lời hứa tinhTong(int, int) nhưng không có cái nào khớp. Đây là lỗi liên kết, không phải lỗi biên dịch.',
   viz:vScanTop({book:b9Book([[PROM, 'hua', 'bad'], [DEF, 'than']]), link:{ok:false, msg:"undefined reference to `tinhTong(int, int)'"}})});
  c.snap({ln:9, title:'Xong',
   body:'Khác kiểu tham số thì là hàm khác. Chương trình không được tạo ra.',
   note:'Nguyên mẫu và định nghĩa phải khớp chữ ký (kiểu và số lượng tham số). Nếu lệch, lỗi chỉ lộ ra ở bước liên kết.',
   viz:vScanTop({book:b9Book([[PROM, 'hua', 'bad'], [DEF, 'than']]), link:{ok:false, msg:"undefined reference to `tinhTong(int, int)'"}})});
 }}
};
