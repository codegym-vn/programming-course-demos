// META {"module":2,"lesson":"Bài 2.1. Các phép tính trên mảng","activity":"Các phép tính toán trên mảng","title":"Biến tích lũy: khởi tạo trước, cập nhật sau mỗi ô","lead":"Xem một biến \"kết quả tạm\" được cập nhật qua từng ô của mảng để ra tổng, trung bình, max/min và các bộ đếm. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["tong","Tổng và trung bình"],["maxmin","Max/min kèm vị trí"],["dem","Đếm và tổng theo điều kiện"]],"codeTitle":"Mã nguồn C++","path":"ky-thuat-xu-ly-mang-va-thuat-toan-co-ban/cac-phep-tinh-tren-mang/cac-phep-tinh-toan-tren-mang/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Mảng và các biến tích lũy';

/* làm tròn như cout mặc định: 6 chữ số có nghĩa */
function b4fmt(x){ return String(Number(x.toPrecision(6))); }
/* dải ô mảng: st(i) trả về {s, sub} cho ô i */
function b4arr(arr, st, o){
  o = o || {};
  var items = arr.map(function(v, i){ var r = st(i) || {}; return {v:v, s:r.s || '', sub:r.sub || ''}; });
  return vArray(items, {name:o.name || 'arr', ptr:o.ptr, ptrLabel:'i', note:o.note, title:o.title});
}

var EX = {
tong:{inputs:[], chips:[],
 intro:'Cộng dồn các số của mảng vào biến tong, rồi tính trung bình. Bấm "Bước tiếp".',
 lines:function(){ return ['int arr[6] = {8, 5, 9, 3, 7, 6};', 'int n = 6;', 'int tong = 0;', 'for (int i = 0; i < n; i++) {', '  tong += arr[i];', '}', 'double tb = (double)tong / n;', 'cout << "Tong: " << tong << endl;', 'cout << "Trung binh cong: "', '     << tb << endl;']; },
 run:function(c){
  var arr = [8, 5, 9, 3, 7, 6], n = arr.length, tong = 0, sums = [];
  for (var i = 0; i < n; i++) { sums.push(tong); tong += arr[i]; }   /* sums[i] = tong trước ô i */
  var final = tong;
  function A(cur, hiFrom){ return b4arr(arr, function(k){ return k >= hiFrom && k <= cur ? {s:'hi'} : (k < hiFrom ? {s:'ok'} : {}); }, {ptr:cur}); }
  c.snap({ln:2, title:'int tong = 0;',
   body:'Biến tong bắt đầu từ 0: cộng thêm 0 thì kết quả không đổi. Từ đây, mỗi ô của mảng sẽ được cộng vào tong.',
   viz:[b4arr(arr, function(){ return {}; }), vAcc([{k:'tong', v:0, s:'new'}])]});
  [0, 1, 2, 3].forEach(function(k){
   c.snap({ln:4, title:'tong += arr[' + k + '];',
    body:'Ô thứ ' + k + ' có giá trị ' + arr[k] + '. Cộng vào tong: ' + sums[k] + ' + ' + arr[k] + ' = ' + (sums[k] + arr[k]) + '.',
    viz:[A(k, k), vAcc([{k:'tong', v:sums[k] + arr[k], op:sums[k] + ' + ' + arr[k] + ' = ' + (sums[k] + arr[k]), s:'hi'}])]});
  });
  c.snap({ln:4, title:'tong += arr[4]; tong += arr[5];',
   body:'Hai lượt cuối cộng thêm 7 rồi 6 (gộp thành một bước cho gọn): ' + sums[4] + ' + 7 + 6 = ' + final + '.',
   viz:[A(5, 4), vAcc([{k:'tong', v:final, op:sums[4] + ' + 7 + 6 = ' + final, s:'ok'}])]});
  var cut = Math.trunc(final / n), tb = final / n;
  c.snap({ln:6, title:'double tb = (double)tong / n;',
   body:'Chia hai số nguyên thì C++ cắt phần lẻ: ' + final + ' / ' + n + ' = ' + cut + '. Ép kiểu (double) cho tong trước khi chia thì mới ra số thập phân.',
   viz:[b4arr(arr, function(){ return {s:'ok'}; }), vAcc([{k:'tong / n (không ép kiểu)', v:cut, op:final + ' / ' + n + ' = ' + cut + ' (mất phần lẻ)', s:'bad'}, {k:'(double)tong / n', v:b4fmt(tb), op:final + '.0 / ' + n, s:'ok'}])]});
  c.out('Tong: ' + final);
  c.out('Trung binh cong: ' + b4fmt(tb));
  c.snap({ln:7, title:'Xong',
   body:'Các lệnh cout cuối in tổng và trung bình. cout mặc định in 6 chữ số có nghĩa nên 6.333333... hiện thành 6.33333.',
   note:'Tổng bắt đầu từ 0 và cộng thêm sau mỗi ô. Khi chia lấy trung bình, nhớ ép kiểu (double) ở tong trước khi chia.',
   viz:[b4arr(arr, function(){ return {s:'ok'}; }), vAcc([{k:'tong', v:final, s:'ok'}, {k:'tb', v:b4fmt(tb), s:'ok'}])]});
 }},

maxmin:{inputs:[], chips:[],
 intro:'Tìm số lớn nhất và nhỏ nhất, kèm vị trí của chúng. Bấm "Bước tiếp".',
 lines:function(){ return ['int arr[6] = {8, 5, 9, 3, 7, 6};', 'int n = 6;', 'int maxVal = arr[0];', 'int viTriMax = 0;', 'int minVal = arr[0];', 'int viTriMin = 0;', 'for (int i = 1; i < n; i++) {', '  if (arr[i] > maxVal) {', '    maxVal = arr[i];', '    viTriMax = i;', '  }', '  if (arr[i] < minVal) {', '    minVal = arr[i];', '    viTriMin = i;', '  }', '}', 'cout << "Gia tri lon nhat: "', '     << maxVal << " (tai chi so "', '     << viTriMax << ")" << endl;', 'cout << "Gia tri nho nhat: "', '     << minVal << " (tai chi so "', '     << viTriMin << ")" << endl;']; },
 run:function(c){
  var arr = [8, 5, 9, 3, 7, 6], n = arr.length;
  var mx = arr[0], px = 0, mn = arr[0], pn = 0, hist = [];
  hist.push({mx:mx, px:px, mn:mn, pn:pn, chMax:false, chMin:false});
  for (var i = 1; i < n; i++) {
   var chMax = arr[i] > mx, chMin = arr[i] < mn;
   if (chMax) { mx = arr[i]; px = i; }
   if (chMin) { mn = arr[i]; pn = i; }
   hist.push({mx:mx, px:px, mn:mn, pn:pn, chMax:chMax, chMin:chMin});
  }
  function V(k, cur, from){   /* k: chỉ số trong hist; cur: ô vừa xét (hoặc null) */
   var h = hist[k], cells = b4arr(arr, function(j){
    var sub = (j === h.px ? '♛' : '') + (j === h.pn ? '▼' : '');
    var s = (cur !== null && j >= (from === undefined ? cur : from) && j <= cur) ? 'hi' : '';
    return {s:s, sub:sub};
   }, {ptr:cur === null ? undefined : cur, note:'♛ = ô đang giữ số lớn nhất, ▼ = ô đang giữ số nhỏ nhất'});
   return [cells, vAcc([{k:'maxVal', v:h.mx, crown:true, s:h.chMax ? 'new' : ''}, {k:'viTriMax', v:h.px, s:h.chMax ? 'new' : ''}, {k:'minVal', v:h.mn, s:h.chMin ? 'new' : ''}, {k:'viTriMin', v:h.pn, s:h.chMin ? 'new' : ''}])];
  }
  c.snap({ln:2, title:'maxVal và minVal bắt đầu từ arr[0]',
   body:'Cả max và min đều bắt đầu bằng phần tử đầu tiên (8). arr[0] chắc chắn có trong mảng, nên là điểm xuất phát an toàn. Vòng lặp vì thế bắt đầu từ i = 1.',
   viz:V(0, null)});
  c.snap({ln:12, title:'i = 1: so với 5',
   body:'5 không lớn hơn 8 nên max giữ nguyên. 5 nhỏ hơn 8 nên min đổi thành 5, ở chỉ số 1.',
   viz:V(1, 1)});
  c.snap({ln:8, title:'i = 2: so với 9',
   body:'9 lớn hơn 8, nên max = 9 và viTriMax = 2. Vương miện nhảy sang ô 2. Còn 9 không nhỏ hơn 5 nên min giữ nguyên.',
   viz:V(2, 2)});
  c.snap({ln:12, title:'i = 3: so với 3',
   body:'3 không lớn hơn 9. Nhưng 3 nhỏ hơn 5, nên min = 3 và viTriMin = 3.',
   viz:V(3, 3)});
  c.snap({ln:6, title:'i = 4 và i = 5',
   body:'Hai ô cuối (7 và 6) không lớn hơn 9 và không nhỏ hơn 3, nên không có gì đổi (gộp thành một bước cho gọn).',
   viz:V(5, 5, 4)});
  var h = hist[n - 1];
  c.out('Gia tri lon nhat: ' + h.mx + ' (tai chi so ' + h.px + ')');
  c.out('Gia tri nho nhat: ' + h.mn + ' (tai chi so ' + h.pn + ')');
  c.snap({ln:16, title:'In kết quả',
   body:'In ra max và min cùng chỉ số của chúng (hai lệnh cout cuối). Biết chỉ số thì tra được ô đó thuộc về ai, ví dụ học sinh nào cao điểm nhất.',
   viz:V(n - 1, null)});
  c.snap({ln:16, title:'Xong',
   body:'Một lần duyệt cho cả max lẫn min. maxVal và minVal bắt đầu từ arr[0] nên kết quả luôn là một ô có thật trong mảng.',
   note:'Max/min khởi tạo bằng arr[0] (không phải 0); vòng lặp chạy từ i = 1; lưu thêm chỉ số để biết ô đó ở đâu.',
   viz:V(n - 1, null)});
 }},

dem:{inputs:[], chips:[],
 intro:'Một lần duyệt mảng nhưng cập nhật nhiều biến cùng lúc: đếm và cộng dồn số dương, số âm. Bấm "Bước tiếp".',
 lines:function(){ return ['int arr[8] = {5,-3,8,-7,0,12,-1,4};', 'int demDuong = 0, demAm = 0;', 'int demKhong = 0;', 'int tongDuong = 0, tongAm = 0;', 'for (int i = 0; i < 8; i++) {', '  if (arr[i] > 0) {', '    demDuong++;', '    tongDuong += arr[i];', '  } else if (arr[i] < 0) {', '    demAm++;', '    tongAm += arr[i];', '  } else {', '    demKhong++;', '  }', '}', 'cout << "So duong: " << demDuong', '     << endl;', 'cout << "So am: " << demAm << endl;', 'cout << "So khong: " << demKhong', '     << endl;', 'cout << "Tong cac so duong: "', '     << tongDuong << endl;', 'cout << "Tong cac so am: "', '     << tongAm << endl;']; },
 run:function(c){
  var arr = [5, -3, 8, -7, 0, 12, -1, 4], n = arr.length;
  var st = {dd:0, da:0, dk:0, td:0, ta:0};
  function acc(){ return vAcc([{k:'demDuong', v:st.dd}, {k:'demAm', v:st.da}, {k:'demKhong', v:st.dk}, {k:'tongDuong', v:st.td}, {k:'tongAm', v:st.ta}]); }
  function accHi(which, ops){   /* which: danh sách khóa vừa đổi */
   var d = {demDuong:st.dd, demAm:st.da, demKhong:st.dk, tongDuong:st.td, tongAm:st.ta};
   return vAcc(['demDuong', 'demAm', 'demKhong', 'tongDuong', 'tongAm'].map(function(k){ return {k:k, v:d[k], s:which.indexOf(k) >= 0 ? 'hi' : '', op:ops && ops[k] ? ops[k] : ''}; }));
  }
  function A(from, to){ return b4arr(arr, function(k){ return k >= from && k <= to ? {s:'hi'} : {}; }, {ptr:to}); }
  function doOne(i){   /* trả về danh sách khóa đổi + phép tính */
   var v = arr[i], ch = [], ops = {};
   if (v > 0) { ops.tongDuong = st.td + ' + ' + v + ' = ' + (st.td + v); st.dd++; st.td += v; ch = ['demDuong', 'tongDuong']; }
   else if (v < 0) { ops.tongAm = st.ta + ' + (' + v + ') = ' + (st.ta + v); st.da++; st.ta += v; ch = ['demAm', 'tongAm']; }
   else { st.dk++; ch = ['demKhong']; }
   return {ch:ch, ops:ops};
  }
  c.snap({ln:3, title:'Khởi tạo 5 biến về 0',
   body:'Có đến 5 biến tích lũy: ba biến đếm và hai biến tính tổng. Tất cả bắt đầu từ 0.',
   viz:[A(0, -1), acc()]});
  var r = doOne(0);
  c.snap({ln:6, title:'i = 0: số 5',
   body:'5 lớn hơn 0 nên rẽ vào nhánh "dương": demDuong tăng 1, tongDuong cộng thêm 5.',
   viz:[A(0, 0), accHi(r.ch, r.ops)]});
  r = doOne(1);
  c.snap({ln:9, title:'i = 1: số -3',
   body:'-3 nhỏ hơn 0 nên rẽ vào nhánh "âm": demAm tăng 1, tongAm cộng thêm -3.',
   viz:[A(1, 1), accHi(r.ch, r.ops)]});
  doOne(2); r = doOne(3);
  c.snap({ln:9, title:'i = 2 và i = 3: số 8 và -7',
   body:'8 vào nhánh dương, -7 vào nhánh âm (gộp thành một bước cho gọn). Mỗi ô chỉ rẽ vào đúng một nhánh.',
   viz:[A(2, 3), accHi(['demDuong', 'demAm', 'tongDuong', 'tongAm'])]});
  r = doOne(4);
  c.snap({ln:12, title:'i = 4: số 0',
   body:'0 không lớn hơn 0 và cũng không nhỏ hơn 0, nên rơi vào nhánh còn lại: chỉ demKhong tăng 1.',
   viz:[A(4, 4), accHi(r.ch, r.ops)]});
  doOne(5); doOne(6); doOne(7);
  c.snap({ln:4, title:'i = 5, 6, 7: số 12, -1, 4',
   body:'Ba ô cuối: 12 và 4 là số dương, -1 là số âm (gộp thành một bước). Cả mảng chỉ duyệt đúng một lần mà đã có cả năm kết quả.',
   viz:[A(5, 7), accHi(['demDuong', 'demAm', 'tongDuong', 'tongAm'])]});
  c.out('So duong: ' + st.dd); c.out('So am: ' + st.da); c.out('So khong: ' + st.dk);
  c.out('Tong cac so duong: ' + st.td); c.out('Tong cac so am: ' + st.ta);
  c.snap({ln:15, title:'Xong',
   body:'Các lệnh cout cuối in cả năm kết quả. Đếm dùng ++ (cộng 1 mỗi lần), còn tính tổng dùng += arr[i] (cộng giá trị thật).',
   note:'Một lần duyệt có thể cập nhật nhiều biến tích lũy cùng lúc. Đếm dùng ++, tính tổng dùng += arr[i].',
   viz:[b4arr(arr, function(){ return {s:'ok'}; }), acc()]});
 }}
};
