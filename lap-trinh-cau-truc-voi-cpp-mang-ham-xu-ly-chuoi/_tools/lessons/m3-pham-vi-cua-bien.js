// META {"module":3,"lesson":"Bài 3.4. Phạm vi của biến","activity":"Phạm Vi Của Biến (Biến Cục Bộ & Biến Toàn Cục)","title":"Biến sống trong phạm vi của nó","lead":"Xem biến cục bộ sinh ra rồi mất theo hàm, biến toàn cục sống suốt chương trình, và biến cục bộ che biến toàn cục cùng tên. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["cucbo","Biến cục bộ"],["toancuc","Biến toàn cục"],["chekhuat","Che khuất"]],"codeTitle":"Mã nguồn C++","path":"ham-function/pham-vi-cua-bien/pham-vi-cua-bien-bien-cuc-bo-bien-toan-cuc/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Khu toàn cục và các khung hàm';

/* Vẽ khu toàn cục (trên) rồi các khung hàm, khung hàm đang chạy ở trên, main ở đáy. */
function p13View(globals, frames){
  var out = [vBoxes(globals, {frame:'Khu toàn cục (sống suốt chương trình)', empty:'Chưa có biến toàn cục nào.'})];
  frames.forEach(function(f){ out.push(vBoxes(f.boxes, {frame:f.t, empty:'Chưa có biến nào.'})); });
  return out;
}

var EX = {
cucbo:{inputs:[],
 intro:'Biến khai báo trong hàm chỉ sống trong hàm đó. Bấm "Bước tiếp".',
 lines:function(){ return ['void tinhToan() {', '  int ketQua = 100;', '  cout << "Ben trong ham: "', '       << ketQua << endl;', '}', 'int main() {', '  tinhToan();', '  cout << ketQua << endl;', '}']; },
 run:function(c){
  var MAIN = {t:'main()', boxes:[]};
  c.snap({ln:5, title:'main bắt đầu',
   body:'Chương trình bắt đầu ở main. Mỗi hàm đang chạy có một khung riêng để chứa biến của nó. Hiện chưa có biến nào.',
   viz:p13View([], [MAIN])});
  c.snap({ln:6, title:'Gọi tinhToan()',
   body:'Một khung mới của tinhToan mở lên trên khung main. Khung này còn trống.',
   viz:p13View([], [{t:'tinhToan()', boxes:[]}, MAIN])});
  c.snap({ln:1, title:'int ketQua = 100;',
   body:'Biến ketQua được tạo ra trong khung của tinhToan. Đây là biến cục bộ: chỉ thuộc về hàm này.',
   viz:p13View([], [{t:'tinhToan()', boxes:[{name:'ketQua', type:'int', v:100, s:'new'}]}, MAIN])});
  c.out('Ben trong ham: 100');
  c.snap({ln:2, title:'In ketQua',
   body:'Trong hàm, tên ketQua dùng được. Console in 100.',
   viz:p13View([], [{t:'tinhToan()', boxes:[{name:'ketQua', type:'int', v:100, s:'hi'}]}, MAIN])});
  c.snap({ln:4, title:'Hàm kết thúc',
   body:'Hàm chạy xong, khung của nó đóng lại và biến ketQua mất theo.',
   viz:p13View([], [{t:'tinhToan()', boxes:[{name:'ketQua', type:'int', v:100, s:'del'}]}, MAIN])});
  var e = "error: 'ketQua' was not declared in this scope";
  c.err(e);
  c.snap({ln:7, title:'main dùng ketQua',
   body:'Máy tìm ketQua trong khung main: không có. Tìm ở khu toàn cục: cũng không có. Kết quả là lỗi biên dịch.',
   viz:[p13View([], [MAIN]), vErr({kind:'compile', msg:[e], code:'cout << ketQua << endl;'})]});
  c.snap({ln:7, title:'Xong',
   body:'Từ main, biến ketQua của tinhToan chưa từng tồn tại.',
   note:'Biến khai báo trong hàm chỉ dùng được trong hàm đó. Ra khỏi hàm là biến mất; dùng ngoài phạm vi là lỗi "was not declared in this scope".',
   viz:vCard({kind:'ok', title:'Ghi nhớ', rows:[['Biến cục bộ', 'chỉ sống trong hàm khai báo nó'], ['Hàm kết thúc', 'biến cục bộ mất']]})});
 }},
toancuc:{inputs:[],
 intro:'Biến cục bộ được tạo mới mỗi lần gọi hàm. Biến toàn cục thì giữ giá trị. Bấm "Bước tiếp".',
 lines:function(){ return ['int demToanCuc;', 'void demCucBo() {', '  int dem = 0;', '  dem++;', '  demToanCuc++;', '  cout << "dem = " << dem', '       << " | demToanCuc = "', '       << demToanCuc << endl;', '}', 'int main() {', '  demCucBo();', '  demCucBo();', '  demCucBo();', '}']; },
 run:function(c){
  var g = 0, MAIN = {t:'main()', boxes:[]};
  var G = function(s, note){ return [{name:'demToanCuc', type:'int', v:g, s:s, note:note}]; };
  c.snap({ln:0, title:'Biến toàn cục demToanCuc',
   body:'Biến khai báo ngoài mọi hàm là biến toàn cục. Nó sống từ đầu đến cuối chương trình. Không gán giá trị thì tự bằng 0.',
   viz:p13View(G('new', 'tự bằng 0'), [MAIN])});
  for (var k = 1; k <= 3; k++) {
   c.snap({ln:2, title:'Gọi demCucBo() lần ' + k,
    body:(k === 1 ? 'Khung mới mở ra và biến cục bộ dem được tạo, bằng 0.' : 'Khung cũ đã đóng, dem cũ đã mất. Khung mới có dem mới, lại bằng 0. demToanCuc vẫn giữ ' + g + '.'),
    viz:p13View(G(), [{t:'demCucBo()', boxes:[{name:'dem', type:'int', v:0, s:'new'}]}, MAIN])});
   g++;
   c.out('dem = 1 | demToanCuc = ' + g);
   c.snap({ln:7, title:'dem = 1, demToanCuc = ' + g,
    body:'dem tăng lên 1, demToanCuc tăng lên ' + g + '. Console in cả hai.',
    viz:p13View(G('hi'), [{t:'demCucBo()', boxes:[{name:'dem', type:'int', v:1, s:'hi'}]}, MAIN])});
  }
  c.snap({ln:13, title:'Xong',
   body:'Sau ba lần gọi, dem luôn chỉ là 1, còn demToanCuc đã đếm tới ' + g + '.',
   note:'Biến cục bộ được tạo mới mỗi lần gọi hàm nên không nhớ gì từ lần trước. Biến toàn cục chỉ có một hộp duy nhất và giữ giá trị suốt chương trình.',
   viz:p13View(G('ok'), [MAIN])});
 }},
chekhuat:{inputs:[],
 intro:'Biến cục bộ đặt trùng tên với biến toàn cục thì che nó trong hàm. Bấm "Bước tiếp".',
 lines:function(){ return ['int x = 10;', 'void thayDoi() {', '  int x = 99;', '  cout << "x = " << x << endl;', '}', 'int main() {', '  cout << "x = " << x << endl;', '  thayDoi();', '  cout << "x = " << x << endl;', '}']; },
 run:function(c){
  var MAIN = {t:'main()', boxes:[]};
  var GX = function(s, note){ return [{name:'x', type:'int', v:10, s:s, note:note}]; };
  c.snap({ln:0, title:'x toàn cục = 10',
   body:'Biến x được khai báo ngoài mọi hàm, nên là biến toàn cục.',
   viz:p13View(GX('new'), [MAIN])});
  c.out('x = 10');
  c.snap({ln:6, title:'main in x',
   body:'Máy tìm x trong khung main: không có. Máy tìm tiếp ở khu toàn cục: thấy x = 10.',
   viz:p13View(GX('hi', 'máy tìm thấy ở đây'), [MAIN])});
  c.snap({ln:7, title:'Gọi thayDoi()',
   body:'Khung mới của thayDoi mở ra, còn trống.',
   viz:p13View(GX(), [{t:'thayDoi()', boxes:[]}, MAIN])});
  var w = 'warning: declaration of \'x\' shadows a global declaration [-Wshadow]';
  c.snap({ln:2, title:'int x = 99;',
   body:'Hàm tạo thêm một biến x của riêng nó. x này che x toàn cục: trong hàm, tên x chỉ còn trỏ tới biến cục bộ.',
   viz:[p13View(GX('dim', 'bị che'), [{t:'thayDoi()', boxes:[{name:'x', type:'int', v:99, s:'new'}]}, MAIN]), vErr({kind:'warn', note:'khi bật cờ -Wshadow', msg:[w]})]});
  c.out('x = 99');
  c.snap({ln:3, title:'In x trong hàm',
   body:'Máy tìm x trong khung thayDoi và thấy ngay x = 99, nên dừng lại. Console in 99.',
   viz:p13View(GX('dim', 'bị che'), [{t:'thayDoi()', boxes:[{name:'x', type:'int', v:99, s:'hi'}]}, MAIN])});
  c.snap({ln:4, title:'Hàm kết thúc',
   body:'Khung thayDoi đóng lại, x = 99 mất. Biến x toàn cục không bị đụng tới, hết bị che.',
   viz:p13View(GX('ok'), [{t:'thayDoi()', boxes:[{name:'x', type:'int', v:99, s:'del'}]}, MAIN])});
  c.out('x = 10');
  c.snap({ln:8, title:'Xong',
   body:'main in x và lại thấy x toàn cục, vẫn bằng 10.',
   note:'Biến cục bộ trùng tên sẽ che biến toàn cục trong phạm vi của nó. Tên được tìm từ trong ra ngoài: khung hiện tại trước, khu toàn cục sau.',
   viz:p13View(GX('ok'), [MAIN])});
 }}
};
