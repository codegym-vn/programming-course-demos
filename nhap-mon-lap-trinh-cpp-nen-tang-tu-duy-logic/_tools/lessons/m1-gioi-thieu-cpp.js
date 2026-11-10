// META {"module":1,"lesson":"Bài 1.1. Giới thiệu C++ và môi trường lập trình","activity":"Giới Thiệu Về Ngôn Ngữ Lập Trình C++","title":"Vì sao C++ chạy nhanh?","lead":"Hai cột cùng chạy một chương trình in 3 dòng chữ, 3 lần liên tiếp. Bấm <b>Bước tiếp</b> để xem số lần \"dịch\" của mỗi bên.","tabs":[["chay","Chạy cùng chương trình 3 lần"]],"codeTitle":"Mã nguồn C++","path":"lam-quen-voi-cpp-va-tu-duy-thuat-toan/gioi-thieu-cpp-va-moi-truong-lap-trinh/gioi-thieu-ve-ngon-ngu-lap-trinh-cpp/index.html"}
var B1_LINES = 3, B1_RUNS = 3;
function b1Score(dich, lan){
  return vScore([{k:'Số lần dịch', v:dich, s:dich ? 'hi' : null}, {k:'Lần chạy', v:lan + '/' + B1_RUNS}]);
}
function b1Chain(kind, st, dich, lan, item){
  var nodes = kind === 'cpp'
    ? [{t:'hello.cpp', sub:'mã nguồn', s:st[0]}, {t:'g++', sub:'bộ biên dịch', s:st[1]}, {t:'hello.exe', sub:'mã máy', s:st[2], item:item}, {t:'CPU', s:st[3]}]
    : [{t:'hello.py', sub:'mã nguồn', s:st[0]}, {t:'Thông dịch', sub:'đọc từng dòng', s:st[1], item:item}, {t:'CPU', s:st[2]}];
  return [vFlow(nodes), b1Score(dich, lan)];
}
function b1Sep(c, n){ c.out('--- Lần chạy ' + n + ' ---'); }
var EX = {chay:{
 intro:'Cột trái là C++ (biên dịch), cột phải là Python (thông dịch). Cả hai cùng chạy chương trình in "Hello" 3 dòng. Bấm "Bước tiếp".',
 running:'Quan sát hai bộ đếm "Số lần dịch" ở phía dưới mỗi cột.',
 cols:[
 {title:'Biên dịch (C++)', sub:'Dịch cả chương trình một lần, sau đó chạy tệp mã máy.',
  lines:['#include <iostream>', 'using namespace std;', 'int main() {', '  cout << "Hello 1\\n";', '  cout << "Hello 2\\n";', '  cout << "Hello 3\\n";', '  return 0;', '}'],
  run:function(c){
   c.snap({title:'Nhận chương trình', body:'Chương trình hello.cpp mới chỉ là chữ. CPU chưa hiểu được nó và chưa có tệp mã máy nào.',
    viz:b1Chain('cpp', ['hi', 'dim', 'dim', 'dim'], 0, 0)});
   c.snap({title:'Biên dịch một lần', body:'g++ đọc cả 3 dòng, dịch hết một lượt và sinh ra tệp hello.exe (mã máy). Số lần dịch: 1.',
    viz:b1Chain('cpp', ['ok', 'hi', 'new', 'dim'], 1, 0)});
   c.out('Hello 1'); c.out('Hello 2'); c.out('Hello 3');
   c.snap({ln:3, title:'Lần 1: CPU chạy hello.exe', body:'CPU chạy thẳng tệp mã máy, không cần dịch gì thêm, và in ra 3 dòng.',
    viz:b1Chain('cpp', ['dim', 'dim', 'ok', 'hi'], 1, 1, 'chạy')});
   c.snap({title:'Xong lần 1', body:'Số lần dịch vẫn là 1. Cột bên phải còn đang dịch dòng 3.',
    viz:b1Chain('cpp', ['dim', 'dim', 'ok', 'ok'], 1, 1)});
   b1Sep(c, 2); c.out('Hello 1'); c.out('Hello 2'); c.out('Hello 3');
   c.snap({ln:3, title:'Lần 2: bỏ qua biên dịch', body:'hello.exe đã có sẵn nên CPU chạy thẳng luôn. Số lần dịch vẫn là 1.',
    viz:b1Chain('cpp', ['dim', 'dim', 'ok', 'hi'], 1, 2, 'chạy')});
   b1Sep(c, 3); c.out('Hello 1'); c.out('Hello 2'); c.out('Hello 3');
   c.snap({ln:3, title:'Lần 3: vẫn chạy thẳng', body:'Lại chạy thẳng hello.exe. Chỉ khi sửa code mới phải biên dịch lại.',
    viz:b1Chain('cpp', ['dim', 'dim', 'ok', 'hi'], 1, 3, 'chạy')});
   c.snap({title:'Xong', body:'Cả 3 lần chạy chỉ tốn đúng 1 lần dịch (lúc biên dịch).',
    note:'C++ được dịch một lần thành mã máy, CPU chạy trực tiếp.',
    viz:b1Chain('cpp', ['dim', 'dim', 'ok', 'ok'], 1, 3)});
  }},
 {title:'Thông dịch (Python)', sub:'Đọc và dịch từng dòng, mỗi lần chạy.',
  lines:['print("Hello 1")', 'print("Hello 2")', 'print("Hello 3")'],
  run:function(c){
   var dich = 0;
   c.snap({title:'Nhận chương trình', body:'Chương trình hello.py là chữ. Không có bước tạo tệp mã máy: trình thông dịch sẽ đọc thẳng tệp này.',
    viz:b1Chain('py', ['hi', 'dim', 'dim'], 0, 0)});
   for (var i = 0; i < B1_LINES; i++) {
    dich++; c.out('Hello ' + (i + 1));
    c.snap({ln:i, title:'Lần 1 · dòng ' + (i + 1), body:'Trình thông dịch đọc dòng ' + (i + 1) + ', dịch ngay rồi mới chạy. Số lần dịch: ' + dich + '.',
     viz:b1Chain('py', ['ok', 'hi', 'hi'], dich, 1, 'dòng ' + (i + 1))});
   }
   for (var r = 2; r <= B1_RUNS; r++) {
    dich += B1_LINES; b1Sep(c, r);
    for (var k = 1; k <= B1_LINES; k++) c.out('Hello ' + k);
    c.snap({title:'Lần ' + r + ': dịch lại từ đầu', body:'Không có tệp mã máy để dùng lại, nên trình thông dịch đọc, dịch và chạy lần lượt cả ' + B1_LINES + ' dòng thêm một lần nữa. Số lần dịch: ' + dich + '.',
     viz:b1Chain('py', ['ok', 'hi', 'hi'], dich, r, '3 dòng')});
   }
   c.snap({title:'Xong', body:'Tổng cộng ' + dich + ' lần dịch (' + B1_LINES + ' dòng × ' + B1_RUNS + ' lần chạy), so với 1 lần dịch của C++.',
    note:'Đơn giản hóa: Python thật dịch sang bytecode rồi máy ảo chạy. Mô phỏng chỉ so sánh cách làm, không đo tốc độ.',
    viz:b1Chain('py', ['ok', 'ok', 'ok'], dich, B1_RUNS)});
  }}
 ],
 done:'C++ dịch 1 lần rồi chạy thẳng mã máy; Python dịch lại ' + (B1_LINES * B1_RUNS) + ' lần (' + B1_LINES + ' dòng × ' + B1_RUNS + ' lần chạy). Đây là lý do chính C++ nhanh hơn ngôn ngữ thông dịch.',
 note:'Mô phỏng đã đơn giản hóa: Python thật dịch sang bytecode rồi máy ảo chạy. Không nêu số đo tốc độ vì phụ thuộc máy.'
}};
