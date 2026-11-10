// META {"module":1,"lesson":"Bài 1.2. Chương trình C++ đầu tiên","activity":"Cấu Trúc Cơ Bản Của Một Chương Trình C++","title":"Chương trình C++ chạy như thế nào?","lead":"Xem chương trình bắt đầu từ main(), in chữ ra màn hình bằng cout và nhận số vào biến bằng cin. Chọn ví dụ rồi bấm <b>Bước tiếp</b>.","tabs":[["hello","Hello World"],["tong","Tính tổng hai số"]],"codeTitle":"Mã nguồn C++","path":"lam-quen-voi-cpp-va-tu-duy-thuat-toan/chuong-trinh-cpp-dau-tien/cau-truc-co-ban-cua-mot-chuong-trinh-cpp/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var CPP_HEAD = ['#include <iostream>', 'using namespace std;', ''];

/* Hình minh họa dùng chung: dòng chảy dữ liệu + bộ nhớ của main() */
function cppMem(boxes){ return vBoxes(boxes, {frame:'Bộ nhớ (RAM) · main()', empty:'main() chưa có biến nào.'}); }
function cppFlow(from, op, to, s){
  return vFlow([{t:from}, {t:op, s:'hi'}, {t:to, s:s || 'ok'}], {title:'Dòng chảy dữ liệu'});
}

var EX = {
hello:{inputs:[],
 intro:'Chương trình ngắn nhất: chỉ in một dòng chữ. Hãy để ý chương trình bắt đầu chạy ở đâu. Bấm "Bước tiếp".',
 lines:function(){ return CPP_HEAD.concat(['int main() {', '  cout << "Hello!";', '  return 0;', '}']); },
 run:function(c){
  c.snap({ln:3, dim:[0,1], dimLabel:'xử lý lúc dịch', title:'Bắt đầu từ main()',
   body:'Khi chạy, máy tìm tới hàm main() trước tiên. Hai dòng #include và using đã được xử lý từ lúc dịch code, nên không phải điểm bắt đầu.',
   viz:cppMem([])});
  c.write('Hello!');
  c.snap({ln:4, title:'cout << "Hello!"',
   body:'Toán tử << đẩy chuỗi "Hello!" ra màn hình. Không có endl nên con trỏ vẫn đứng ở cuối dòng.',
   viz:[cppFlow('"Hello!"', 'cout <<', 'Màn hình'), cppMem([])]});
  c.snap({ln:5, title:'return 0',
   body:'main() trả về số 0 cho hệ điều hành, nghĩa là chương trình đã chạy xong và không có lỗi.',
   viz:[vCard({kind:'ok', title:'Chương trình kết thúc', sub:'Mã trả về: 0 = thành công'}), cppMem([])]});
  c.snap({ln:6, title:'Xong',
   body:'Màn hình hiện "Hello!". Chương trình đi qua đúng 2 lệnh trong main(): in chữ, rồi trả về 0.',
   note:'Mọi chương trình C++ đều bắt đầu từ main(); cout << đưa dữ liệu ra màn hình; return 0 báo kết thúc thành công.',
   viz:[vCard({kind:'ok', title:'Chương trình kết thúc', sub:'Mã trả về: 0 = thành công'}), cppMem([])]});
 }},
tong:{inputs:[{id:'a', label:'soA', def:10, min:-99, max:999}, {id:'b', label:'soB', def:25, min:-99, max:999}],
 intro:'Máy hỏi hai số, người dùng nhập, máy in ra tổng. Có thể đổi soA, soB ở ô nhập. Bấm "Bước tiếp".',
 lines:function(){ return CPP_HEAD.concat([
  'int main() {',
  '  int soA;',
  '  int soB;',
  '  cout << "Nhap so thu nhat: ";',
  '  cin >> soA;',
  '  cout << "Nhap so thu hai: ";',
  '  cin >> soB;',
  '  cout << "Tong hai so la: "',
  '       << soA + soB << endl;',
  '  return 0;',
  '}']); },
 run:function(c, P){
  var a = P.a, b = P.b, sum = a + b;
  var A = function(v, s){ return {name:'soA', type:'int', v:v, s:s}; };
  var B = function(v, s){ return {name:'soB', type:'int', v:v, s:s}; };
  c.snap({ln:3, dim:[0,1], dimLabel:'xử lý lúc dịch', title:'Bắt đầu từ main()',
   body:'Chương trình vào main(). Bộ nhớ của main() lúc này còn trống.', viz:cppMem([])});
  c.snap({ln:4, title:'Khai báo int soA;',
   body:'Máy dành một hộp tên soA, kiểu int. Chưa gán nên giá trị chưa xác định (dấu ?), không phải số 0.',
   viz:cppMem([A(null, 'new')])});
  c.snap({ln:5, title:'Khai báo int soB;', body:'Thêm hộp soB, cũng chưa có giá trị.',
   viz:cppMem([A(null), B(null, 'new')])});
  c.write('Nhap so thu nhat: ');
  c.snap({ln:6, wait:true, title:'Máy hỏi số thứ nhất',
   body:'cout in câu hỏi. Không có endl nên con trỏ đứng ngay sau dấu hai chấm, chờ người dùng gõ.',
   viz:[cppFlow('"Nhap so thu nhat: "', 'cout <<', 'Màn hình'), cppMem([A(null), B(null)])]});
  c.input(String(a));
  c.snap({ln:7, title:'cin >> soA',
   body:'Người dùng gõ ' + a + ' rồi Enter. Toán tử >> đưa số ' + a + ' từ bàn phím vào hộp soA.',
   viz:[cppFlow('Bàn phím: ' + a, 'cin >>', 'soA'), cppMem([A(a, 'new'), B(null)])]});
  c.write('Nhap so thu hai: ');
  c.snap({ln:8, wait:true, title:'Máy hỏi số thứ hai', body:'cout in câu hỏi thứ hai rồi chờ.',
   viz:[cppFlow('"Nhap so thu hai: "', 'cout <<', 'Màn hình'), cppMem([A(a), B(null)])]});
  c.input(String(b));
  c.snap({ln:9, title:'cin >> soB',
   body:'Người dùng gõ ' + b + '. Số ' + b + ' chảy qua >> vào hộp soB.',
   viz:[cppFlow('Bàn phím: ' + b, 'cin >>', 'soB'), cppMem([A(a), B(b, 'new')])]});
  c.write('Tong hai so la: ');
  c.out(String(sum));
  c.snap({ln:10, title:'In tổng: ' + a + ' + ' + b + ' = ' + sum,
   body:'Máy lấy giá trị trong hai hộp ra cộng (' + a + ' + ' + b + ' = ' + sum + '), rồi in cả câu và số ' + sum + '. endl đưa con trỏ xuống dòng mới.',
   viz:[cppFlow('soA + soB = ' + sum, 'cout <<', 'Màn hình'), cppMem([A(a, 'hi'), B(b, 'hi')])]});
  c.snap({ln:12, title:'return 0',
   body:'main() trả về 0: chương trình kết thúc thành công.',
   viz:[vCard({kind:'ok', title:'Chương trình kết thúc', sub:'Mã trả về: 0 = thành công'}), cppMem([A(a), B(b)])]});
  c.snap({ln:13, title:'Xong',
   body:'Hai số đi vào biến qua cin >>, kết quả đi ra màn hình qua cout <<.',
   note:'Chương trình luôn bắt đầu từ main(); cout << đưa dữ liệu ra màn hình, cin >> đưa dữ liệu từ bàn phím vào biến; return 0 báo kết thúc thành công.',
   viz:[vCard({kind:'ok', title:'Chương trình kết thúc', sub:'Mã trả về: 0 = thành công'}), cppMem([A(a), B(b)])]});
 }}
};
