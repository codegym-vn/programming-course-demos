// META {"module":3,"lesson":"Bài 3.1. Vì sao cần hàm; khai báo và gọi hàm","activity":"Cú pháp khai báo và gọi hàm","title":"Gọi hàm: nhảy vào, chạy xong, quay lại","lead":"Xem chương trình nhảy vào thân hàm rồi quay về đúng chỗ gọi, giá trị đi vào và ra khỏi hàm ra sao, và lỗi khi gọi hàm chưa được khai báo. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["nhay","Nhảy vào hàm rồi quay lại"],["thamso","Tham số và return"],["loi","Gọi hàm trước khi khai báo"]],"codeTitle":"Mã nguồn C++","path":"ham-function/vi-sao-can-ham-khai-bao-va-goi-ham/cu-phap-khai-bao-va-goi-ham/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Hình minh họa';

/* Khung ngăn xếp: frames liệt kê từ đáy (main) lên đỉnh */
function b8Main(sub, s){ return {t:'main', sub:sub, s:s}; }

var EX = {
nhay:{inputs:[],
 intro:'Mỗi lần gọi hàm, chương trình nhảy vào thân hàm rồi quay lại đúng dòng đã gọi. Bấm "Bước tiếp".',
 lines:function(){ return [
  'void inDong() {',
  '  cout << "  -> Trong inDong()" << endl;',
  '}',
  '',
  'int main() {',
  '  cout << "1. Bat dau" << endl;',
  '  cout << "2. Chuan bi goi ham" << endl;',
  '  inDong();',
  '  cout << "3. Da quay lai main" << endl;',
  '  cout << "4. Ket thuc" << endl;',
  '  return 0;',
  '}']; },
 run:function(c){
  c.out('1. Bat dau');
  c.snap({ln:5, title:'main chạy từ trên xuống',
   body:'Chương trình bắt đầu ở main và chạy từng dòng. Dòng 6 in "1. Bat dau".',
   viz:vStack([b8Main('đang chạy', 'hi')])});
  c.out('2. Chuan bi goi ham');
  c.snap({ln:6, title:'Dòng tiếp theo',
   body:'Dòng 7 in "2. Chuan bi goi ham". Hàm inDong chưa được gọi nên chưa chạy.',
   viz:vStack([b8Main('đang chạy', 'hi')])});
  c.snap({ln:7, title:'Gặp lời gọi inDong();',
   body:'Máy cắm một dấu trang ở dòng 8 trong main, rồi nhảy vào thân hàm inDong. Một khung mới xếp lên trên main.',
   viz:vStack([b8Main('dấu trang: dòng 8', 'dim'), {t:'inDong', sub:'vừa được gọi', s:'new'}])});
  c.out('  -> Trong inDong()');
  c.snap({ln:1, title:'Chạy bên trong hàm',
   body:'Dòng đang chạy đã nhảy lên thân hàm. Hàm in dòng có thụt vào.',
   viz:vStack([b8Main('đang chờ ở dòng 8', 'dim'), {t:'inDong', sub:'đang chạy', s:'hi'}])});
  c.snap({ln:2, title:'Hết thân hàm',
   body:'Gặp dấu } là hết hàm. Máy quay về dấu trang ở dòng 8 và bỏ khung inDong đi.',
   viz:vStack([b8Main('dấu trang: dòng 8', 'dim'), {t:'inDong', sub:'sắp kết thúc', s:'del'}])});
  c.out('3. Da quay lai main');
  c.snap({ln:8, title:'Quay lại main',
   body:'Khung inDong biến mất, main chạy tiếp ở dòng 9 ngay sau chỗ đã gọi.',
   viz:vStack([b8Main('đang chạy', 'hi')])});
  c.out('4. Ket thuc');
  c.snap({ln:9, title:'Dòng cuối',
   body:'Dòng 10 in "4. Ket thuc".',
   viz:vStack([b8Main('đang chạy', 'hi')])});
  c.snap({ln:10, title:'Xong',
   body:'Thứ tự in ra là 1, 2, rồi dòng trong hàm, rồi 3, 4. Hàm chen vào đúng chỗ được gọi.',
   note:'Gọi hàm là nhảy vào, chạy hết thân hàm, rồi quay lại đúng chỗ cũ.',
   viz:vStack([b8Main('sắp kết thúc', 'ok')])});
 }},

thamso:{inputs:[],
 intro:'Giá trị 5 và 3 ở lời gọi được gọi là đối số. Chúng được chép vào tham số a và b của hàm. Bấm "Bước tiếp".',
 lines:function(){ return [
  'int tinhTong(int a, int b) {',
  '  int ketQua = a + b;',
  '  return ketQua;',
  '}',
  '',
  'int main() {',
  '  int tong1 = tinhTong(5, 3);',
  '  cout << "Tong 1: " << tong1 << endl;',
  '  cout << "Tong 2: "',
  '       << tinhTong(10, 20) << endl;',
  '  return 0;',
  '}']; },
 run:function(c){
  function fn(x, y){ return x + y; }
  var FN = 'int tinhTong(int a, int b)';
  function args(x, y, ret, s){
    return vArgs({call:'tinhTong(' + x + ', ' + y + ')', args:[{v:String(x)}, {v:String(y)}], fn:FN,
      params:[{name:'a', type:'int', v:String(x), s:s}, {name:'b', type:'int', v:String(y), s:s}], ret:ret});
  }
  var s1 = fn(5, 3), s2 = fn(10, 20);
  c.snap({ln:6, title:'Gọi tinhTong(5, 3)',
   body:'Hai giá trị 5 và 3 được chép vào tham số a và b. Khung tinhTong xếp lên trên main.',
   viz:[vStack([b8Main('tong1 = ?', 'dim'), {t:'tinhTong', sub:'a = 5, b = 3', s:'new'}]), args(5, 3, null, 'new')]});
  c.snap({ln:1, title:'Tính trong hàm',
   body:'Bên trong hàm: ketQua = a + b = ' + s1 + '.',
   viz:[vStack([b8Main('tong1 = ?', 'dim'), {t:'tinhTong', sub:'a = 5, b = 3, ketQua = ' + s1, s:'hi'}]), args(5, 3, null, 'ok')]});
  c.snap({ln:2, title:'return ketQua;',
   body:'return đưa giá trị ' + s1 + ' ra khỏi hàm, về chỗ đã gọi.',
   viz:[vStack([b8Main('tong1 = ?', 'dim'), {t:'tinhTong', sub:'return ' + s1, s:'hi'}]), args(5, 3, {v:String(s1), to:'tong1'}, 'ok')]});
  c.snap({ln:6, title:'Quay về, gán vào tong1',
   body:'Khung tinhTong biến mất. Giá trị ' + s1 + ' thay chỗ cho tinhTong(5, 3) và được gán vào tong1.',
   viz:[vStack([b8Main('tong1 = ' + s1, 'hi')]), args(5, 3, {v:String(s1), to:'tong1'}, 'dim')]});
  c.out('Tong 1: ' + s1);
  c.snap({ln:7, title:'In tong1',
   body:'Dòng này chỉ in biến tong1 nên in ra "Tong 1: ' + s1 + '".',
   viz:vStack([b8Main('tong1 = ' + s1, 'hi')])});
  c.snap({ln:9, title:'Gọi tinhTong(10, 20)',
   body:'Lần này gọi ngay trong cout. Hàm nhận 10 và 20 làm giá trị mới cho a và b.',
   viz:[vStack([b8Main('tong1 = ' + s1, 'dim'), {t:'tinhTong', sub:'a = 10, b = 20', s:'new'}]), args(10, 20, null, 'new')]});
  c.snap({ln:2, title:'return ketQua;',
   body:'ketQua = ' + s2 + ', và return đưa ' + s2 + ' ra khỏi hàm.',
   viz:[vStack([b8Main('tong1 = ' + s1, 'dim'), {t:'tinhTong', sub:'ketQua = ' + s2 + ', return ' + s2, s:'hi'}]), args(10, 20, {v:String(s2), to:''}, 'ok')]});
  c.out('Tong 2: ' + s2);
  c.snap({ln:9, title:'Xong',
   body:'Giá trị ' + s2 + ' thay chỗ lời gọi, đi thẳng vào cout và in ra "Tong 2: ' + s2 + '".',
   note:'Tham số nhận giá trị mới ở mỗi lần gọi, còn return mang kết quả về đúng chỗ gọi.',
   viz:[vStack([b8Main('tong1 = ' + s1, 'ok')]), args(10, 20, {v:String(s2), to:''}, 'dim')]});
 }},

loi:{inputs:[],
 intro:'Hàm tinhBinhPhuong nằm dưới main. Hãy xem chuyện gì xảy ra khi main gọi nó. Bấm "Bước tiếp".',
 lines:function(){ return [
  'int tinhBinhPhuong(int x);',
  '',
  'int main() {',
  '  cout << "Ket qua: "',
  '       << tinhBinhPhuong(5) << endl;',
  '  return 0;',
  '}',
  '',
  'int tinhBinhPhuong(int x) {',
  '  return x * x;',
  '}']; },
 run:function(c){
  var MSG = "error: 'tinhBinhPhuong' was not declared in this scope";
  var DIM = {dim:[0], dimLabel:'chưa có dòng này'};
  c.snap({ln:2, dim:DIM.dim, dimLabel:DIM.dimLabel, title:'Thử khi chưa có dòng 1',
   body:'Tạm xem như file chưa có dòng 1. Trình biên dịch đọc từ trên xuống nên mới đi tới main mà chưa biết hàm nào.',
   viz:vScanTop({book:[]})});
  c.err(MSG);
  c.snap({ln:4, dim:DIM.dim, dimLabel:DIM.dimLabel, title:'Gặp tinhBinhPhuong(5)',
   body:'Trình biên dịch chưa gặp hàm này ở phía trên nên báo lỗi. Hàm có nằm ở dưới file cũng không giúp được.',
   viz:[vScanTop({book:[], check:{call:'tinhBinhPhuong(5)', ok:false}}), vErr({kind:'compile', msg:[MSG], code:'tinhBinhPhuong(5)', note:'Không tạo được chương trình'})]});
  c.clear();
  c.snap({ln:0, title:'Sửa: thêm dòng 1',
   body:'Dòng 1 là nguyên mẫu hàm (prototype): chỉ ghi kiểu trả về, tên, tham số và kết thúc bằng dấu ;, chưa có thân hàm. Nó báo trước cho trình biên dịch.',
   viz:vScanTop({book:[{sig:'int tinhBinhPhuong(int)', kind:'hua', s:'new'}]})});
  c.snap({ln:4, title:'Gặp lại tinhBinhPhuong(5)',
   body:'Lần này tên hàm đã có trong danh bạ nên lời gọi được chấp nhận.',
   viz:vScanTop({book:[{sig:'int tinhBinhPhuong(int)', kind:'hua'}], check:{call:'tinhBinhPhuong(5)', ok:true}})});
  c.snap({ln:8, title:'Gặp phần định nghĩa',
   body:'Cuối file là thân hàm đầy đủ, khớp với lời báo trước. Biên dịch thành công.',
   viz:vScanTop({book:[{sig:'int tinhBinhPhuong(int)', kind:'than', s:'ok'}]})});
  c.out('Ket qua: 25');
  c.snap({ln:4, title:'Xong',
   body:'Chương trình chạy và in "Ket qua: 25".',
   note:'Hàm phải được khai báo trước chỗ gọi: viết hàm lên trước main, hoặc thêm nguyên mẫu hàm ở đầu file.',
   viz:vScanTop({book:[{sig:'int tinhBinhPhuong(int)', kind:'than', s:'ok'}]})});
 }}
};
