// META {"module":1,"lesson":"Bài 1.1. Giới thiệu C++ và môi trường lập trình","activity":"Cài Đặt Môi Trường Lập Trình C++ Với VS Code","title":"Phía sau nút Play và lỗi PATH","lead":"Xem quy trình thật khi biên dịch hello.cpp, và vì sao máy báo không tìm thấy g++. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["chay","Biên dịch và chạy hello.cpp"],["path","Lỗi PATH: thiếu C:\\mingw64\\bin"]],"codeTitle":"Mã nguồn C++","path":"lam-quen-voi-cpp-va-tu-duy-thuat-toan/gioi-thieu-cpp-va-moi-truong-lap-trinh/cai-dat-moi-truong-lap-trinh-cpp-voi-vs-code/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Terminal';
var VIZ_TITLE = 'Hình minh họa';
var B2_PROMPT = 'C:\\HocLapTrinhCPP>';
var B2_HELLO = ['#include <iostream>', 'using namespace std;', '', 'int main() {', '  cout << "Xin chao! "', '       << "Toi dang code C++ "', '       << "tren VS Code."', '       << endl;', '  return 0;', '}'];
var B2_MSG = 'Xin chao! Toi dang code C++ tren VS Code.';
function b2Chain(st, tree){
  return [vFlow([{t:'hello.cpp', s:st[0]}, {t:'g++', s:st[1]}, {t:'hello.exe', s:st[2]}, {t:'Kết quả', s:st[3]}], {title:'Quy trình phía sau nút Play'}),
   vTree(tree)];
}
function b2Tree(exe, s){
  var t = [{t:'HocLapTrinhCPP', d:0, kind:'dir'}, {t:'hello.cpp', d:1, kind:'file'}];
  if (exe) t.push({t:'hello.exe', d:1, kind:'file', s:s || 'new'});
  return t;
}
function b2Path(items, extra){
  return '<div class="v-row"><div class="v-name">Các thư mục trong PATH (tìm từ trên xuống)</div></div>' + vGates(items.map(function(x){ return {t:x[0] + (x[2] ? ' · ' + x[2] : ''), s:x[1]}; }));
}
var B2_DIRS = ['C:\\Windows\\System32', 'C:\\Windows', 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0'];
var EX = {
chay:{inputs:[],
 intro:'Nút Play ▷ thật ra gõ giúp bạn hai lệnh trong Terminal. Ở đây ta gõ chúng bằng tay. Bấm "Bước tiếp".',
 lines:function(){ return B2_HELLO; },
 run:function(c){
  c.write(B2_PROMPT);
  c.snap({title:'Mở Terminal trong thư mục dự án', body:'VS Code chỉ là nơi gõ code. Tệp hello.cpp đã có, chưa có hello.exe.',
   wait:true, viz:b2Chain(['hi', 'dim', 'dim', 'dim'], b2Tree(false))});
  c.input('g++ hello.cpp -o hello');
  c.snap({title:'Gõ lệnh biên dịch', body:'g++ nhận hello.cpp, tùy chọn -o hello đặt tên tệp kết quả là hello.',
   viz:b2Chain(['ok', 'hi', 'dim', 'dim'], b2Tree(false))});
  c.write(B2_PROMPT);
  c.snap({title:'g++ dịch xong', body:'g++ không in gì khi dịch thành công. Trong thư mục đã có thêm tệp hello.exe (mã máy trên Windows).',
   wait:true, viz:b2Chain(['ok', 'ok', 'new', 'dim'], b2Tree(true))});
  c.input('.\\hello');
  c.snap({title:'Gõ lệnh chạy', body:'.\\hello chạy tệp hello.exe vừa tạo. Dấu .\\ nghĩa là "tệp nằm ở thư mục hiện tại".',
   viz:b2Chain(['dim', 'dim', 'hi', 'dim'], b2Tree(true, 'hi'))});
  c.out(B2_MSG); c.write(B2_PROMPT);
  c.snap({title:'Chương trình in kết quả', body:'hello.exe chạy và in câu chào ra Terminal.',
   wait:true, viz:b2Chain(['dim', 'dim', 'ok', 'ok'], b2Tree(true, 'ok'))});
  c.snap({title:'Xong', body:'Quy trình đầy đủ: hello.cpp, g++, hello.exe, rồi chạy.',
   note:'Nút Play ▷ của Code Runner làm đúng hai lệnh này. Trên macOS/Linux tệp là hello và lệnh chạy là ./hello.',
   wait:true, viz:b2Chain(['ok', 'ok', 'ok', 'ok'], b2Tree(true, 'ok'))});
 }},
path:{inputs:[],
 intro:'Windows chỉ chạy được lệnh g++ nếu tìm thấy g++.exe trong các thư mục của PATH. Bấm "Bước tiếp".',
 lines:function(){ return B2_HELLO; },
 run:function(c){
  var dirs = B2_DIRS.slice();
  function list(cur, found, hasNew){
   var items = dirs.map(function(d, i){
    var s = 'dim', sub = '';
    if (cur !== null && i < cur) { s = 'no'; sub = 'không có g++.exe'; }
    if (cur === i) { s = 'hi'; sub = 'đang tìm...'; }
    return [d, s, sub];
   });
   if (hasNew) {
    var k = dirs.length, s2 = 'dim', sub2 = 'vừa thêm';
    if (cur !== null && k < cur) { s2 = 'no'; sub2 = 'không có g++.exe'; }
    if (found) { s2 = 'ok'; sub2 = 'có g++.exe'; }
    else if (cur === k) { s2 = 'hi'; sub2 = 'đang tìm...'; }
    items.push(['C:\\mingw64\\bin', s2, sub2]);
   }
   return b2Path(items);
  }
  function scan(n, found, hasNew){ return list(n, found, hasNew); }
  c.write(B2_PROMPT);
  c.snap({title:'Mở Terminal, chưa thêm PATH', body:'Máy chưa biết thư mục MinGW ở đâu: C:\\mingw64\\bin chưa có trong PATH.', wait:true,
   viz:list(null, false, false)});
  c.input('g++ --version');
  c.snap({title:'Gõ g++ --version', body:'Windows đi tìm g++.exe lần lượt trong từng thư mục của PATH.', viz:list(0, false, false)});
  c.snap({title:'Thư mục 1 và 2: không có', body:'System32 và Windows đều không chứa g++.exe.', viz:list(2, false, false)});
  c.err("'g++' is not recognized as an internal or external command,");
  c.err('operable program or batch file.'); c.write(B2_PROMPT);
  c.snap({title:'Hết danh sách: báo lỗi', body:'Không thư mục nào có g++.exe nên máy báo "not recognized". Lỗi này do PATH thiếu, không phải do code sai.',
   wait:true, viz:list(3, false, false)});
  c.snap({title:'Thêm C:\\mingw64\\bin vào PATH', body:'Thêm thư mục bin của MinGW vào PATH. Terminal đang mở vẫn dùng PATH cũ nên gõ lại ở đây vẫn lỗi.',
   wait:true, viz:list(null, false, true)});
  c.input(''); c.out('--- Terminal mới ---'); c.write(B2_PROMPT); c.input('g++ --version');
  c.snap({title:'Mở Terminal MỚI, gõ lại', body:'Terminal mới đọc PATH đã cập nhật. Máy tìm lại từ đầu danh sách.', viz:list(0, false, true)});
  c.out('g++.exe (MinGW-W64 ...) 13.x.x'); c.write(B2_PROMPT);
  c.snap({title:'Tìm thấy ở thư mục thứ 4', body:'Ba thư mục đầu không có, nhưng C:\\mingw64\\bin có g++.exe nên máy chạy nó và in phiên bản (số phiên bản tùy bản bạn tải).',
   wait:true, viz:list(3, true, true)});
  c.snap({title:'Xong', body:'Sau khi thêm PATH và mở Terminal mới, lệnh g++ chạy được.',
   note:'Máy chỉ tìm thấy g++ khi thư mục bin của MinGW nằm trong PATH, và phải mở Terminal mới sau khi sửa PATH.', wait:true, viz:list(3, true, true)});
 }}
};
