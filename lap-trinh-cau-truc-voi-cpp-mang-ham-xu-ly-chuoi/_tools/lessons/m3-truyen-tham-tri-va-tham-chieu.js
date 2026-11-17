// META {"module":3,"lesson":"Bài 3.5. Truyền tham trị và tham chiếu","activity":"Truyền Tham Số: Theo Giá Trị Và Theo Tham Chiếu","title":"Bản sao hay chính biến gốc","lead":"Xem hàm nhận bản sao hay làm việc trên chính biến gốc. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["sosanh","Tham trị và tham chiếu"],["swap","Hoán đổi hai biến"],["minmax","Trả về hai giá trị"]],"codeTitle":"Mã nguồn C++","path":"ham-function/truyen-tham-tri-va-tham-chieu/truyen-tham-so-theo-gia-tri-va-theo-tham-chieu/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Hàm nhận gì từ nơi gọi?';

/* Các khung hàm, khung đang chạy ở trên, main ở đáy. f: {t, boxes, empty} */
function p14Frames(frames){
  return frames.map(function(f){ return vBoxes(f.boxes, {frame:f.t, empty:f.empty || 'Chưa có biến nào.'}); });
}

var EX = {
sosanh:{inputs:[],
 intro:'Hai hàm làm cùng một việc: nhân tham số lên 10. Chỉ khác dấu &. Bấm "Bước tiếp".',
 lines:function(){ return ['void theoGiaTri(int x) {', '  x = x * 10;', '}', 'void theoThamChieu(int &x) {', '  x = x * 10;', '}', 'int main() {', '  int a = 5, b = 5;', '  theoGiaTri(a);', '  theoThamChieu(b);', '  cout << "a = " << a << endl;', '  cout << "b = " << b << endl;', '}']; },
 run:function(c){
  var A = 5, B = 5, F1 = 'void theoGiaTri(int x)', F2 = 'void theoThamChieu(int &x)';
  var main = function(sa, sb, nb){ return {t:'main()', boxes:[{name:'a', type:'int', v:A, s:sa}, {name:'b', type:'int', v:B, s:sb, note:nb}]}; };
  c.snap({ln:7, title:'a = 5, b = 5',
   body:'main có hai biến a và b, cùng bằng 5.',
   viz:p14Frames([main('new', 'new')])});
  c.snap({ln:8, title:'Gọi theoGiaTri(a)',
   body:'Truyền theo giá trị: giá trị 5 được chép sang một hộp mới tên x trong khung của hàm.',
   viz:[vArgs({call:'theoGiaTri(a)', args:[{v:'a = 5'}], fn:F1, params:[{name:'x', type:'int', v:5, s:'new'}]})].concat(p14Frames([{t:'theoGiaTri()', boxes:[{name:'x', type:'int', v:5, s:'new'}]}, main()]))});
  c.snap({ln:1, title:'x = x * 10',
   body:'Hộp x đổi thành 50. Hộp a của main không hề đổi: x chỉ là bản sao.',
   viz:p14Frames([{t:'theoGiaTri()', boxes:[{name:'x', type:'int', v:A * 10, s:'hi'}]}, main()])});
  c.snap({ln:2, title:'Hàm kết thúc',
   body:'Khung đóng lại, hộp x mất. a vẫn là 5.',
   viz:p14Frames([{t:'theoGiaTri()', boxes:[{name:'x', type:'int', v:A * 10, s:'del'}]}, main()])});
  c.snap({ln:9, title:'Gọi theoThamChieu(b)',
   body:'Có dấu & thì không có hộp mới. x chỉ là một cái tên khác dán lên chính hộp b của main.',
   viz:[vArgs({call:'theoThamChieu(b)', args:[{v:'b = 5'}], fn:F2, params:[{name:'x', type:'int', ref:'b'}]})].concat(p14Frames([{t:'theoThamChieu()', boxes:[], empty:'Không có hộp mới: x là tên khác của b.'}, main('', 'hi', 'cũng gọi là x')]))});
  B = B * 10;
  c.snap({ln:4, title:'x = x * 10',
   body:'Sửa x chính là sửa b. Hộp b của main đổi thành 50.',
   viz:p14Frames([{t:'theoThamChieu()', boxes:[], empty:'Không có hộp mới: x là tên khác của b.'}, main('', 'hi', 'cũng gọi là x')])});
  c.snap({ln:5, title:'Hàm kết thúc',
   body:'Cái tên x được bóc ra. b vẫn giữ giá trị 50.',
   viz:p14Frames([main('', 'ok')])});
  c.out('a = ' + A);
  c.out('b = ' + B);
  c.snap({ln:11, title:'Xong',
   body:'Console in a = ' + A + ' và b = ' + B + '. Cùng một phép tính nhưng kết quả khác nhau.',
   note:'Mặc định C++ truyền bản sao, nên hàm không sửa được biến gốc. Thêm & thì tham số là tên khác của chính biến gốc, sửa nó là sửa biến gốc.',
   viz:vScore([{k:'a (tham trị)', v:A}, {k:'b (tham chiếu)', v:B, s:'ok'}])});
 }},
swap:{inputs:[],
 intro:'Đổi chỗ hai biến: thiếu & thì chỉ đổi bản sao, có & mới đổi được biến gốc. Bấm "Bước tiếp".',
 lines:function(){ return ['void swapSai(int a, int b) {', '  int temp = a;', '  a = b;', '  b = temp;', '}', 'void swapDung(int &a, int &b) {', '  int temp = a;', '  a = b;', '  b = temp;', '}', 'int main() {', '  int x = 10, y = 20;', '  swapSai(x, y);', '  cout << "x = " << x', '       << ", y = " << y << endl;', '  swapDung(x, y);', '  cout << "x = " << x', '       << ", y = " << y << endl;', '}']; },
 run:function(c){
  var X = 10, Y = 20;
  var main = function(sx, sy, nx, ny){ return {t:'main()', boxes:[{name:'x', type:'int', v:X, s:sx, note:nx}, {name:'y', type:'int', v:Y, s:sy, note:ny}]}; };
  var F1 = 'void swapSai(int a, int b)', F2 = 'void swapDung(int &a, int &b)';
  c.snap({ln:12, title:'Gọi swapSai(x, y)',
   body:'main có x = 10 và y = 20. Không có & nên a và b là hai hộp mới, chép từ x và y.',
   viz:[vArgs({call:'swapSai(x, y)', args:[{v:'x = 10'}, {v:'y = 20'}], fn:F1, params:[{name:'a', type:'int', v:10, s:'new'}, {name:'b', type:'int', v:20, s:'new'}]})].concat(p14Frames([{t:'swapSai()', boxes:[{name:'a', type:'int', v:10, s:'new'}, {name:'b', type:'int', v:20, s:'new'}]}, main()]))});
  c.snap({ln:3, title:'Đổi chỗ trong khung',
   body:'Hàm đổi chỗ thành công, nhưng chỉ đổi a và b. x và y của main vẫn là 10 và 20.',
   viz:p14Frames([{t:'swapSai()', boxes:[{name:'a', type:'int', v:20, s:'hi'}, {name:'b', type:'int', v:10, s:'hi'}, {name:'temp', type:'int', v:10, s:'new'}]}, main()])});
  c.out('x = 10, y = 20');
  c.snap({ln:14, title:'Khung đóng, x và y không đổi',
   body:'Khung swapSai đóng lại, bản sao mất. Console vẫn in x = 10, y = 20.',
   viz:[p14Frames([main('bad', 'bad')]), vCard({kind:'warn', title:'Chỉ đổi chỗ bản sao', sub:'Thiếu & nên hàm không đụng tới x và y.'})]});
  c.snap({ln:15, title:'Gọi swapDung(x, y)',
   body:'Có & thì không có hộp mới. a là tên khác của x, b là tên khác của y.',
   viz:[vArgs({call:'swapDung(x, y)', args:[{v:'x = 10'}, {v:'y = 20'}], fn:F2, params:[{name:'a', type:'int', ref:'x'}, {name:'b', type:'int', ref:'y'}]})].concat(p14Frames([{t:'swapDung()', boxes:[], empty:'Không có hộp mới: a là x, b là y.'}, main('hi', 'hi', 'cũng gọi là a', 'cũng gọi là b')]))});
  c.snap({ln:6, title:'int temp = a;',
   body:'temp là biến riêng của hàm, cất tạm giá trị 10 của a (tức của x).',
   viz:p14Frames([{t:'swapDung()', boxes:[{name:'temp', type:'int', v:10, s:'new'}]}, main('hi', 'hi', 'cũng gọi là a', 'cũng gọi là b')])});
  X = 20;
  c.snap({ln:7, title:'a = b;',
   body:'Giá trị của b (20) được gán cho a. a là x nên x đổi thành 20.',
   viz:p14Frames([{t:'swapDung()', boxes:[{name:'temp', type:'int', v:10}]}, main('hi', 'hi', 'cũng gọi là a', 'cũng gọi là b')])});
  Y = 10;
  c.snap({ln:8, title:'b = temp;',
   body:'temp (10) được gán cho b. b là y nên y đổi thành 10.',
   viz:p14Frames([{t:'swapDung()', boxes:[{name:'temp', type:'int', v:10}]}, main('hi', 'hi', 'cũng gọi là a', 'cũng gọi là b')])});
  c.out('x = ' + X + ', y = ' + Y);
  c.snap({ln:17, title:'Xong',
   body:'Hàm kết thúc, hai cái tên a, b được bóc ra. x và y đã thật sự đổi chỗ: ' + X + ' và ' + Y + '.',
   note:'Muốn hàm đổi được biến gốc thì tham số phải có &. Hàm hoán đổi hai biến chỉ chạy đúng khi truyền theo tham chiếu.',
   viz:p14Frames([main('ok', 'ok')])});
 }},
minmax:{inputs:[],
 intro:'Hàm cần trả về hai kết quả cùng lúc. Dấu & cho phép hàm ghi thẳng vào hai biến của main. Bấm "Bước tiếp".',
 lines:function(){ return ['void timMinMax(int arr[], int n,', '    int &min, int &max) {', '  min = arr[0];', '  max = arr[0];', '  for (int i = 1; i < n; i++) {', '    if (arr[i] < min) min = arr[i];', '    if (arr[i] > max) max = arr[i];', '  }', '}', 'int main() {', '  int arr[6] = {8, 3, 9, 1, 7, 5};', '  int giaTriMin, giaTriMax;', '  timMinMax(arr, 6,', '            giaTriMin, giaTriMax);', '  cout << "Nho nhat: "', '       << giaTriMin << endl;', '  cout << "Lon nhat: "', '       << giaTriMax << endl;', '}']; },
 run:function(c){
  var arr = [8, 3, 9, 1, 7, 5], mn = null, mx = null;
  var F = 'void timMinMax(int arr[], int n, int &min, int &max)';
  var nb = 'cũng gọi là ';
  var main = function(sn, sx, hasRef){ return {t:'main()', boxes:[{name:'giaTriMin', type:'int', v:mn, s:sn, note:hasRef ? nb + 'min' : undefined}, {name:'giaTriMax', type:'int', v:mx, s:sx, note:hasRef ? nb + 'max' : undefined}]}; };
  var fr = function(i){ return {t:'timMinMax()', boxes:i === undefined ? [] : [{name:'i', type:'int', v:i, s:'hi'}], empty:'min và max không có hộp riêng: chúng là tên khác của hai biến main.'}; };
  var arrV = function(i, hiS){ return vArray(arr.map(function(v, k){ return {v:v, s:(k === i ? hiS || 'hi' : undefined)}; }), {name:'arr', ptr:i, ptrLabel:'i'}); };
  c.snap({ln:11, title:'Hai biến chưa có giá trị',
   body:'main có mảng arr và hai biến giaTriMin, giaTriMax. Hai biến này chưa được gán nên đang là "?".',
   viz:[arrV(), p14Frames([main('new', 'new')])]});
  c.snap({ln:12, title:'Gọi timMinMax',
   body:'min là tên khác của giaTriMin, max là tên khác của giaTriMax. Hàm sẽ ghi kết quả thẳng vào hai biến của main.',
   viz:[vArgs({call:'timMinMax(arr, 6, giaTriMin, giaTriMax)', args:[{v:'arr'}, {v:'6'}, {v:'giaTriMin'}, {v:'giaTriMax'}], fn:F, params:[{name:'arr', type:'int[]', v:'chính mảng arr'}, {name:'n', type:'int', v:6, s:'new'}, {name:'min', type:'int', ref:'giaTriMin'}, {name:'max', type:'int', ref:'giaTriMax'}]}), p14Frames([fr(), main('hi', 'hi', true)])]});
  mn = arr[0]; mx = arr[0];
  c.snap({ln:3, title:'min = arr[0]; max = arr[0];',
   body:'Cả hai bắt đầu bằng phần tử đầu tiên: 8. Hai hộp của main đã có giá trị.',
   viz:[arrV(0), p14Frames([fr(), main('hi', 'hi', true)])]});
  mn = 3;
  c.snap({ln:5, title:'i = 1: 3 nhỏ hơn min',
   body:'arr[1] = 3 nhỏ hơn 8, nên min đổi thành 3. Hộp giaTriMin của main đổi theo.',
   viz:[arrV(1), p14Frames([fr(1), main('hi', undefined, true)])]});
  mx = 9;
  c.snap({ln:6, title:'i = 2: 9 lớn hơn max',
   body:'arr[2] = 9 lớn hơn 8, nên max đổi thành 9.',
   viz:[arrV(2), p14Frames([fr(2), main(undefined, 'hi', true)])]});
  mn = 1;
  c.snap({ln:5, title:'i = 3: 1 nhỏ hơn min',
   body:'arr[3] = 1 nhỏ hơn 3, nên min đổi thành 1. Hai phần tử còn lại (7 và 5) không làm thay đổi gì.',
   viz:[arrV(3), p14Frames([fr(3), main('hi', undefined, true)])]});
  c.out('Nho nhat: ' + mn);
  c.out('Lon nhat: ' + mx);
  c.snap({ln:17, title:'Xong',
   body:'Hàm kết thúc, hai cái tên min, max được bóc ra. main in ' + mn + ' và ' + mx + '.',
   note:'return chỉ trả về một giá trị. Tham số tham chiếu (&) cho hàm ghi kết quả thẳng vào biến của nơi gọi, nên một hàm có thể "trả về" nhiều giá trị.',
   viz:[arrV(), p14Frames([main('ok', 'ok')])]});
 }}
};
