// META {"module":2,"lesson":"Bài 2.1. Biến và kiểu dữ liệu cơ bản","activity":"Giới Thiệu Biến Trong C++","title":"Biến trong bộ nhớ","lead":"Xem biến là một ô nhớ có tên, kiểu và giá trị, và biến chỉ \"sống\" trong phạm vi khai báo nó. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["gan","Gán và gán lại"],["scope","Phạm vi: toàn cục và cục bộ"]],"codeTitle":"Mã nguồn C++","path":"bien-kieu-du-lieu-va-toan-tu/bien-va-kieu-du-lieu-co-ban/gioi-thieu-bien-trong-cpp/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Hình minh họa';
var B5_HEAD = ['#include <iostream>', 'using namespace std;', ''];
function b5Mem(boxes, frame){ return vBoxes(boxes, {frame:frame || 'Bộ nhớ (RAM) · main()', empty:'main() chưa có biến nào.'}); }
/* Tab phạm vi: vùng toàn cục + các khung hàm xếp chồng. frames: [{name, boxes, extra}] */
function b5Scope(glob, frames){
  var h = vBoxes(glob, {frame:'Toàn cục (ngoài mọi hàm)', empty:'Chưa có biến toàn cục.'});
  frames.forEach(function(f){ h += vBoxes(f.boxes, {frame:'Khung hàm ' + f.name, empty:f.empty || 'Chưa có biến nào.'}) + (f.extra || ''); });
  return h;
}
var EX = {
gan:{inputs:[],
 intro:'Biến giống chiếc hộp có nhãn tên và kiểu, giá trị nằm bên trong. Bấm "Bước tiếp" để xem hộp thay đổi.',
 lines:function(){ return B5_HEAD.concat(['int main() {', '  int diem = 8;', '  cout << diem << endl;', '  diem = 9;', '  cout << diem << endl;', '  int soLuong;', '  return 0;', '}']); },
 run:function(c){
  var D = function(v, s, note){ return {name:'diem', type:'int', v:v, s:s, note:note}; };
  c.snap({ln:3, dim:[0, 1], dimLabel:'xử lý lúc dịch', title:'Vào main()', body:'Chương trình bắt đầu ở main(). Bộ nhớ của main() còn trống.', viz:b5Mem([])});
  c.snap({ln:4, title:'int diem = 8;', body:'Máy tạo một hộp tên diem, kiểu int, và bỏ số 8 vào ngay khi khai báo.', viz:b5Mem([D(8, 'new')])});
  c.out('8');
  c.snap({ln:5, title:'cout << diem', body:'Máy mở hộp diem, đọc giá trị 8 và in ra màn hình. Đọc không làm đổi giá trị trong hộp.', viz:b5Mem([D(8, 'hi')])});
  c.snap({ln:6, title:'diem = 9;', body:'Gán lại: số 8 cũ bị lấy ra, số 9 mới vào chỗ đó. Hộp vẫn là hộp diem, chỉ giá trị đổi.',
   viz:[b5Mem([D(9, 'new', 'trước đó là 8')]), vChips([{t:'8', s:'del', label:'giá trị cũ, đã bị thay'}])]});
  c.out('9');
  c.snap({ln:7, title:'cout << diem', body:'Lần này mở hộp ra thấy 9.', viz:b5Mem([D(9, 'hi')])});
  c.snap({ln:8, title:'int soLuong; (không gán)', body:'Hộp soLuong được tạo nhưng chưa bỏ gì vào. Giá trị lúc này là rác (không xác định), không phải số 0. Dấu ? đỏ báo đừng dùng nó.',
   viz:b5Mem([D(9), {name:'soLuong', type:'int', v:null, s:'new', note:'giá trị rác'}])});
  c.snap({ln:9, title:'Xong', body:'diem đổi từ 8 sang 9 trong cùng một hộp; soLuong chưa có giá trị.',
   note:'Biến = tên + kiểu + giá trị. Giá trị có thể thay đổi bằng phép gán. Biến chưa gán thì giá trị không xác định.',
   viz:b5Mem([D(9), {name:'soLuong', type:'int', v:null}])});
 }},
scope:{inputs:[],
 intro:'Biến khai báo ở đâu thì chỉ sống ở đó. Bấm "Bước tiếp" để xem vùng Toàn cục và các khung hàm.',
 lines:function(){ return B5_HEAD.concat(['int namHoc = 2025;', '', 'void inNamHoc() {', '  cout << namHoc << endl;', '}', '', 'int main() {', '  int soHocSinh = 40;', '  cout << soHocSinh << endl;', '  inNamHoc();', '  return 0;', '}']); },
 run:function(c){
  var G = function(s){ return [{name:'namHoc', type:'int', v:2025, s:s}]; };
  var M = function(s){ return [{name:'soHocSinh', type:'int', v:40, s:s}]; };
  c.snap({ln:3, dim:[0, 1], dimLabel:'xử lý lúc dịch', title:'Biến toàn cục namHoc', body:'namHoc khai báo ngoài mọi hàm nên nằm ở vùng Toàn cục, có từ khi chương trình bắt đầu.', viz:b5Scope(G('new'), [])});
  c.snap({ln:9, title:'Vào main()', body:'main() chạy: một khung hàm main xuất hiện bên dưới vùng Toàn cục.', viz:b5Scope(G(), [{name:'main()', boxes:[], empty:'main() chưa có biến nào.'}])});
  c.snap({ln:10, title:'int soHocSinh = 40;', body:'soHocSinh là biến cục bộ: nó nằm trong khung main(), không phải ở vùng Toàn cục.', viz:b5Scope(G(), [{name:'main()', boxes:M('new')}])});
  c.out('40');
  c.snap({ln:11, title:'cout << soHocSinh', body:'main() đọc biến của chính nó, in 40.', viz:b5Scope(G(), [{name:'main()', boxes:M('hi')}])});
  c.snap({ln:12, title:'Gọi inNamHoc()', body:'Một khung mới của inNamHoc() xuất hiện, chồng lên trên main(). Khung này chưa có biến cục bộ nào.',
   viz:b5Scope(G(), [{name:'main()', boxes:M()}, {name:'inNamHoc()', boxes:[], empty:'Không có biến cục bộ.'}])});
  c.out('2025');
  c.snap({ln:6, title:'Trong inNamHoc(): in namHoc', body:'Hàm này thấy được namHoc ở vùng Toàn cục nên in được 2025. Nhưng soHocSinh nằm trong khung main() nên không thấy được từ đây.',
   viz:b5Scope(G('hi'), [{name:'main()', boxes:M('dim')}, {name:'inNamHoc()', boxes:[], empty:'Đọc namHoc ở vùng Toàn cục; không thấy soHocSinh của main().'}])});
  c.snap({ln:7, title:'inNamHoc() kết thúc', body:'Ra khỏi hàm, khung inNamHoc() biến mất. main() và vùng Toàn cục vẫn còn.', viz:b5Scope(G(), [{name:'main()', boxes:M()}])});
  c.snap({ln:14, title:'main() kết thúc', body:'Khung main() biến mất kéo theo soHocSinh. namHoc ở vùng Toàn cục vẫn còn đến hết chương trình.', viz:b5Scope(G(), [])});
  c.snap({ln:14, title:'Xong', body:'Biến cục bộ sống và mất cùng khung hàm chứa nó; biến toàn cục sống suốt chương trình.',
   note:'Biến cục bộ chỉ dùng được trong khối { } khai báo nó. Nên ưu tiên biến cục bộ, hạn chế biến toàn cục.', viz:b5Scope(G(), [])});
 }}
};
