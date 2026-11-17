// META {"module":3,"lesson":"Bài 3.1. Vì sao cần hàm; khai báo và gọi hàm","activity":"Tại sao cần dùng hàm? (Tư duy DRY và tái sử dụng code)","title":"Vì sao cần hàm: viết một lần, dùng nhiều lần","lead":"So sánh chép-dán code với dùng hàm khi đổi công thức, rồi xem một hàm được dùng lại trong vòng lặp. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["thue","Đổi công thức: copy-paste và hàm"],["lap","Dùng lại hàm trong vòng lặp"]],"codeTitle":"Mã nguồn C++","path":"ham-function/vi-sao-can-ham-khai-bao-va-goi-ham/tai-sao-can-dung-ham-tu-duy-dry-va-tai-su-dung-code/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Hình minh họa';

/* ===== Tab 1: hai cột, cùng yêu cầu "cộng thuế 5%" ===== */
var b7Bill = [100000, 200000, 150000];
var b7Left = [
 'double hd1 = 100000;',
 'cout << hd1 * 1.05 << endl;',
 'double hd2 = 200000;',
 'cout << hd2 << endl;',
 'double hd3 = 150000;',
 'cout << hd3 * 1.05 << endl;'
];
var b7Right = [
 'double tinhTongTienCoThue(double hd) {',
 '  return hd * 1.05;',
 '}',
 'int main() {',
 '  cout << tinhTongTienCoThue(100000)',
 '       << endl;',
 '  cout << tinhTongTienCoThue(200000)',
 '       << endl;',
 '  cout << tinhTongTienCoThue(150000)',
 '       << endl;',
 '  return 0;',
 '}'
];
/* số liệu đếm từ chính đoạn code ở trên */
var b7LeftSpots = b7Left.filter(function(l){ return /^double hd\d/.test(l); }).length;
var b7RightSpots = b7Right.filter(function(l){ return /return hd/.test(l); }).length;
function b7Money(n){ return String(n); }
function b7Result(hd, taxed){ return taxed ? hd * 1.05 : hd; }
function b7Table(done, badIdx){
  var rows = [['Hóa đơn', 'Kết quả', 'Đúng?']];
  for (var i = 0; i < 3; i++) {
    if (i < done) {
      var wrong = (i === badIdx);
      var exp = b7Result(b7Bill[i], true);
      var got = b7Result(b7Bill[i], !wrong);
      rows.push([{t:'HD' + (i + 1) + ' (' + b7Bill[i] + ')'}, {t:b7Money(got), s:wrong ? 'bad' : 'ok'}, {t:wrong ? 'sai, phải là ' + exp : 'đúng', s:wrong ? 'bad' : 'ok'}]);
    } else rows.push([{t:'HD' + (i + 1) + ' (' + b7Bill[i] + ')', s:'dim'}, {t:'?', s:'dim'}, {t:'', s:'dim'}]);
  }
  return vGrid(rows, {head:true});
}
var b7Wrong = 1;
var b7Done = 'Cùng một yêu cầu: bên trái phải sửa ' + b7LeftSpots + ' chỗ và sót 1 chỗ nên có 1 kết quả sai mà máy không báo lỗi; bên phải chỉ sửa ' + b7RightSpots + ' chỗ và cả 3 kết quả đều đúng.';

var EX = {
thue:{
 intro:'Yêu cầu mới: mọi hóa đơn phải cộng thêm thuế 5%. Bên trái chép-dán công thức 3 lần, bên phải đặt công thức trong một hàm. Bấm "Bước tiếp".',
 running:'Hai cột cùng chạy 3 hóa đơn. Hãy so sánh kết quả.',
 done:b7Done,
 note:'Logic viết một lần trong hàm thì sửa một chỗ, mọi nơi gọi đều đúng. Chép-dán dễ sót chỗ và máy không báo lỗi.',
 cols:[
 {title:'Chép-dán (3 khối giống nhau)', sub:'Công thức nằm ở 3 chỗ.', lines:b7Left,
  run:function(c){
   c.snap({ln:0, title:'Ba khối giống nhau',
    body:'Mỗi hóa đơn có một khối code riêng, công thức tính tiền bị chép ra 3 lần. Để thêm thuế phải sửa cả 3 chỗ.',
    viz:[b7Table(0, b7Wrong), vScore([{k:'chỗ phải sửa', v:b7LeftSpots, s:'hi'}])]});
   c.out('105000');
   c.snap({ln:1, title:'Khối 1: đã sửa',
    body:'Người viết đã thêm * 1.05 ở khối 1. Kết quả đúng: 105000.',
    viz:[b7Table(1, b7Wrong), vScore([{k:'chỗ phải sửa', v:b7LeftSpots, s:'hi'}])]});
   c.out('200000');
   c.snap({ln:3, title:'Khối 2: quên sửa',
    body:'Khối 2 bị bỏ sót, không có * 1.05. Máy vẫn chạy bình thường và in 200000, nhưng đáng lẽ phải là 210000.',
    viz:[b7Table(2, b7Wrong), vScore([{k:'chỗ phải sửa', v:b7LeftSpots, s:'hi'}, {k:'kết quả sai', v:1, s:'bad'}])]});
   c.out('157500');
   c.snap({ln:5, title:'Khối 3: đã sửa',
    body:'Khối 3 đã sửa nên in đúng 157500. Không có thông báo lỗi nào, nên rất khó nhận ra khối 2 sai.',
    viz:[b7Table(3, b7Wrong), vScore([{k:'chỗ phải sửa', v:b7LeftSpots, s:'hi'}, {k:'kết quả sai', v:1, s:'bad'}])]});
   c.snap({ln:5, title:'Xong',
    body:'Sửa ' + b7LeftSpots + ' chỗ, sót 1 chỗ nên có 1 kết quả sai.',
    note:'Chép-dán công thức nhiều lần là nguồn lỗi: chỉ cần quên một chỗ là kết quả lệch mà không ai báo.',
    viz:[b7Table(3, b7Wrong), vScore([{k:'chỗ phải sửa', v:b7LeftSpots, s:'bad'}, {k:'kết quả sai', v:1, s:'bad'}])]});
  }},
 {title:'Dùng hàm (công thức ở một chỗ)', sub:'Ba lời gọi dùng chung một công thức.', lines:b7Right,
  run:function(c){
   function lamps(n){
     var a = [];
     for (var i = 0; i < 3; i++) a.push({t:'Lời gọi ' + (i + 1), s:i < n ? 'ok' : 'off', sub:i < n ? 'dùng công thức mới' : ''});
     return vLamps(a, {title:'Ba lời gọi nối vào một hàm'});
   }
   c.snap({ln:1, title:'Công thức nằm trong hàm',
    body:'Công thức chỉ viết đúng một lần, bên trong hàm tinhTongTienCoThue. Thêm thuế chỉ cần sửa dòng này thành hd * 1.05.',
    viz:[b7Table(0, -1), vScore([{k:'chỗ phải sửa', v:b7RightSpots, s:'ok'}])]});
   c.out('105000');
   c.snap({ln:4, title:'Gọi lần 1',
    body:'Gọi hàm với 100000, hàm dùng công thức mới và trả về 105000.',
    viz:[lamps(1), b7Table(1, -1)]});
   c.out('210000');
   c.snap({ln:6, title:'Gọi lần 2',
    body:'Lần gọi thứ hai cũng đi qua đúng công thức đó nên ra 210000. Không thể bị sót.',
    viz:[lamps(2), b7Table(2, -1)]});
   c.out('157500');
   c.snap({ln:8, title:'Gọi lần 3',
    body:'Lần gọi thứ ba cho 157500. Ba dây cùng sáng vì cùng nối vào một hàm.',
    viz:[lamps(3), b7Table(3, -1)]});
   c.snap({ln:8, title:'Xong',
    body:'Chỉ sửa ' + b7RightSpots + ' chỗ mà cả 3 kết quả đều đúng.',
    note:'Muốn đổi mức thuế, chỉ cần sửa một dòng trong hàm.',
    viz:[b7Table(3, -1), vScore([{k:'chỗ phải sửa', v:b7RightSpots, s:'ok'}, {k:'kết quả sai', v:0, s:'ok'}])]});
  }}
 ]},

lap:{inputs:[],
 intro:'Một hàm laSoNguyenTo như trạm kiểm tra: mỗi số trong mảng đi qua trạm và nhận kết quả đúng hoặc sai. Bấm "Bước tiếp".',
 lines:function(){ return [
  'bool laSoNguyenTo(int n) {',
  '  if (n < 2) return false;',
  '  for (int i = 2; i * i <= n; i++) {',
  '    if (n % i == 0) return false;',
  '  }',
  '  return true;',
  '}',
  'int main() {',
  '  int cacSo[6] = {7, 10, 13, 15, 2, 21};',
  '  for (int i = 0; i < 6; i++) {',
  '    int so = cacSo[i];',
  '    cout << so << ": ";',
  '    if (laSoNguyenTo(so))',
  '      cout << "nguyen to\\n";',
  '    else',
  '      cout << "khong phai\\n";',
  '  }',
  '  return 0;',
  '}']; },
 run:function(c){
  var nums = [7, 10, 13, 15, 2, 21], res = [];
  function isPrime(n){ if (n < 2) return false; for (var i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; }
  function firstDiv(n){ for (var i = 2; i * i <= n; i++) if (n % i === 0) return i; return 0; }
  function strip(cur){
    return vCells(nums.map(function(v, k){ return {v:v, s:k < cur ? (res[k] ? 'ok' : 'bad') : k === cur ? 'hi' : null}; }), {name:'cacSo', ptr:cur < 6 ? cur : undefined, ptrLabel:'i'});
  }
  c.snap({ln:8, title:'Mảng 6 số',
   body:'Mảng cacSo có 6 số. Vòng lặp sẽ đưa từng số qua hàm laSoNguyenTo.',
   viz:strip(-1)});
  nums.forEach(function(n, i){
   var p = isPrime(n); res[i] = p;
   var d = firstDiv(n);
   var why = n < 2 ? n + ' nhỏ hơn 2.' : p ? (4 > n ? 'Với ' + n + ', điều kiện i * i <= n sai ngay (2 * 2 > ' + n + ') nên không phải thử số nào.' : 'Thử chia ' + n + ' cho các số từ 2 tới căn bậc hai của nó: không lần nào chia hết.') : n + ' chia hết cho ' + d + '.';
   c.write(n + ': '); c.out(p ? 'nguyen to' : 'khong phai');
   c.snap({ln:p ? 13 : 15, title:'laSoNguyenTo(' + n + ') trả về ' + p,
    body:why + (p ? ' Hàm trả về true nên in "nguyen to".' : ' Hàm trả về false nên in "khong phai".'),
    viz:[strip(i), vArgs({call:'laSoNguyenTo(' + n + ')', args:[{v:String(n)}], fn:'bool laSoNguyenTo(int n)', params:[{name:'n', type:'int', v:String(n), s:'ok'}], ret:{v:String(p), to:''}})]});
   res[i] = p;
  });
  var primes = nums.filter(isPrime);
  c.snap({ln:18, title:'Xong',
   body:'Cả 6 số đều đi qua cùng một hàm. Số nguyên tố là ' + primes.join(', ') + '.',
   note:'Logic phức tạp chỉ viết một lần trong hàm, rồi gọi lại trong vòng lặp bao nhiêu lần cũng được.',
   viz:strip(6)});
 }}
};
