// META {"module":4,"lesson":"Bài 4.1. Giới thiệu vòng lặp và vòng lặp for","activity":"Vòng Lặp For","title":"Vòng lặp for chạy theo thứ tự nào?","lead":"Xem for chạy qua bốn trạm: Khởi tạo, Điều kiện, Thân, Cập nhật, và theo dõi biến qua từng lượt. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["tong","Tổng 1..n (heo đất)"],["dem","Đếm ngược và nhảy cóc"],["loi","3 lỗi thường gặp"]],"codeTitle":"Mã nguồn C++","path":"vong-lap/gioi-thieu-vong-lap-va-vong-lap-for/vong-lap-for/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Vòng 4 bước của for';

function b16Cy(init, cond, body, upd, ss, center){
  return vCycle([{t:'Khởi tạo', sub:init, s:ss[0]}, {t:'Điều kiện', sub:cond, s:ss[1]}, {t:'Thân', sub:body, s:ss[2]}, {t:'Cập nhật', sub:upd, s:ss[3]}], {center:center});
}
function b16Ok(v){ return {v:v ? '✓' : '✗', s:v ? 'ok' : 'bad'}; }

var EX = {
tong:{inputs:[{id:'n', label:'n', def:5, min:1, max:8}],
 intro:'Tính tổng 1 + 2 + ... + n bằng for, với sum là "con heo đất" ban đầu rỗng. Có thể đổi n. Bấm "Bước tiếp".',
 lines:function(P){ return ['int n = ' + P.n + ';', 'int sum = 0;', 'for (int i = 1; i <= n; i++) {', '  sum += i;', '}', 'cout << "Tong la: " << sum << endl;']; },
 run:function(c, P){
  var n = P.n, rows = [], sum = 0, head = ['Lượt', 'i', 'i <= ' + n, 'sum'];
  var cy = function(ss, center){ return b16Cy('i = 1', 'i <= ' + n, 'sum += i', 'i++', ss, center); };
  var tr = function(hi){ return vTrace(head, rows.length ? rows : [['', '', '', '']], {title:'Bảng trace', hiRow:hi}); };
  var V = function(i, hiSum, hiI){ var v = [['n', n], ['sum', sum, hiSum]]; if (i !== null) v.push(['i', i, hiI]); return v; };
  c.snap({ln:0, title:'Khai báo n = ' + n, body:'Tính tổng các số từ 1 đến ' + n + '.', vars:V(null), viz:[cy([]), tr()]});
  c.snap({ln:1, title:'sum = 0: heo đất rỗng', body:'sum là con heo đất, ban đầu bằng 0.', vars:V(null, true), viz:[cy([]), tr()]});
  c.snap({ln:2, title:'Khởi tạo: i = 1 (chỉ 1 lần)', body:'Trạm Khởi tạo chỉ sáng một lần, ở lượt đầu tiên. Sau đó vòng lặp quay quanh ba trạm còn lại.', vars:V(1, false, true), viz:[cy(['hi'], 'Lượt 1'), tr()]});
  var i;
  for (i = 1; i <= n; i++) {
   if (i === 1) {
    rows.push([String(i), String(i), b16Ok(true), '?']);
    c.snap({ln:2, title:'Lượt 1: kiểm tra điều kiện', body:'1 <= ' + n + ' đúng nên được vào thân vòng lặp.', vars:V(i, false, true), viz:[cy(['dim', 'ok'], 'Lượt 1'), tr()]});
    sum += i; rows[0][3] = {v:sum, s:'hi'};
    c.snap({ln:3, title:'Lượt 1: thân, sum += 1', body:'Bỏ số 1 vào heo đất: sum = 1.', vars:V(i, true, false), viz:[cy(['dim', 'ok', 'hi'], 'Lượt 1'), tr()]});
    c.snap({ln:2, title:'Lượt 1: cập nhật, i++', body:'Cập nhật chạy sau thân: i tăng thành 2, rồi quay lại trạm Điều kiện.', vars:V(2, false, true), viz:[cy(['dim', 'ok', 'ok', 'hi'], 'Lượt 1'), tr()]});
   } else {
    rows[rows.length - 1][3] = sum;
    rows.push([String(i), String(i), b16Ok(true), '?']); sum += i; rows[rows.length - 1][3] = {v:sum, s:'hi'};
    c.snap({ln:3, title:'Lượt ' + i + ': ' + i + ' <= ' + n + ', sum += ' + i, body:'Điều kiện đúng, thân chạy: sum = ' + (sum - i) + ' + ' + i + ' = ' + sum + '. Rồi i++ thành ' + (i + 1) + '.',
     vars:V(i + 1, true, true), viz:[cy(['dim', 'ok', 'ok', 'ok'], 'Lượt ' + i), tr()]});
   }
  }
  rows[rows.length - 1][3] = sum;
  rows.push([String(n + 1), String(n + 1), b16Ok(false), String(sum)]);
  c.snap({ln:2, title:'Lần kiểm tra thứ ' + (n + 1) + ': ' + (n + 1) + ' <= ' + n + ' sai', body:'Điều kiện sai nên for thoát. Điều kiện được kiểm tra ' + (n + 1) + ' lần, còn thân chỉ chạy ' + n + ' lần.',
   vars:V(n + 1, false, true), viz:[cy(['dim', 'bad'], 'Thoát'), tr()]});
  c.out('Tong la: ' + sum);
  c.snap({ln:5, title:'Xong: in "Tong la: ' + sum + '"', body:'for đã kết thúc, cout in tổng ' + sum + '.', note:'Khởi tạo chạy 1 lần; điều kiện kiểm tra trước mỗi lượt; cập nhật chạy sau thân.',
   vars:V(n + 1, true, false), viz:[cy(['dim', 'bad'], 'Thoát'), tr()]});
 }},

dem:{inputs:[],
 intro:'Hai vòng for: đếm ngược từ 10 về 1 (i--), rồi nhảy cóc từ 0 đến 10 (i += 2). Bấm "Bước tiếp".',
 lines:function(){ return ['for (int i = 10; i >= 1; i--)', '  cout << i << " ";', 'cout << endl;', 'for (int i = 0; i <= 10; i += 2)', '  cout << i << " ";']; },
 run:function(c){
  var A = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1], B = [0, 2, 4, 6, 8, 10];
  function cells(arr, name, upto, hi){ return vCells(arr.map(function(v, k){ return {v:v, s:k < upto ? 'ok' : (k === hi ? 'hi' : 'dim')}; }), {name:name, idx:false, small:true}); }
  function cy(i, init, cond, upd, ss, center){ return b16Cy(init, cond, 'in i', upd, ss, center); }
  var cA = function(ss, center){ return cy(0, 'i = 10', 'i >= 1', 'i--', ss, center); }, cB = function(ss, center){ return cy(0, 'i = 0', 'i <= 10', 'i += 2', ss, center); };
  c.snap({ln:0, title:'Vòng 1, khởi tạo: i = 10', body:'Đếm ngược: bắt đầu từ 10, điều kiện i >= 1, cập nhật i-- (giảm 1).', vars:[['i', 10, true]], viz:[cA(['hi']), cells(A, 'Số đã in', 0, -1)]});
  c.write('10 ');
  c.snap({ln:1, title:'Lượt 1: in 10, i-- thành 9', body:'10 >= 1 đúng, in 10, rồi cập nhật i giảm còn 9.', vars:[['i', 9, true]], viz:[cA(['dim', 'ok', 'ok', 'hi'], 'Lượt 1'), cells(A, 'Số đã in', 1, -1)]});
  c.write('9 8 7 6 5 4 3 2 1 '); c.out('');
  c.snap({ln:0, title:'Lượt 2 đến lượt 10', body:'Mỗi lượt in i rồi giảm 1: 9, 8, ..., 1. Sau lượt 10, i = 0.', vars:[['i', 0, true]], viz:[cA(['dim', 'ok', 'ok', 'ok'], 'Lượt 10'), cells(A, 'Số đã in', 10, -1)]});
  c.snap({ln:2, title:'Kiểm tra 0 >= 1: sai, thoát', body:'Điều kiện sai nên vòng 1 kết thúc. Dòng cout << endl xuống dòng.', vars:[['i', 0]], viz:[cA(['dim', 'bad'], 'Thoát'), cells(A, 'Số đã in', 10, -1)]});
  c.snap({ln:3, title:'Vòng 2, khởi tạo: i = 0', body:'Nhảy cóc: bắt đầu từ 0, điều kiện i <= 10, cập nhật i += 2 (mỗi lần tăng 2).', vars:[['i', 0, true]], viz:[cB(['hi']), cells(B, 'Số đã in', 0, -1)]});
  c.write('0 ');
  c.snap({ln:4, title:'Lượt 1: in 0, i += 2 thành 2', body:'0 <= 10 đúng, in 0 rồi i tăng thêm 2.', vars:[['i', 2, true]], viz:[cB(['dim', 'ok', 'ok', 'hi'], 'Lượt 1'), cells(B, 'Số đã in', 1, -1)]});
  c.write('2 4 6 8 10 ');
  c.snap({ln:3, title:'Các lượt tiếp theo', body:'Máy in lần lượt 2, 4, 6, 8, 10. Sau lượt 6, i = 12.', vars:[['i', 12, true]], viz:[cB(['dim', 'ok', 'ok', 'ok'], 'Lượt 6'), cells(B, 'Số đã in', 6, -1)]});
  c.snap({ln:3, title:'Xong: 12 <= 10 sai, thoát', body:'Kết quả: 0 2 4 6 8 10. Bước nhảy nằm trong phần Cập nhật, không nhất thiết là i++.',
   note:'Phần Điều kiện và Cập nhật quyết định vòng lặp đi theo hướng nào, nhảy bao nhiêu.', vars:[['i', 12]], viz:[cB(['dim', 'bad'], 'Thoát'), cells(B, 'Số đã in', 6, -1)]});
 }},

loi:{inputs:[],
 intro:'Ba vòng for có lỗi. Với mỗi lỗi, hãy xem biến nào đang thay đổi và điều kiện ra sao. Bấm "Bước tiếp". Mô phỏng không chạy vô hạn thật: nó tự dừng sau 1000 lượt.',
 lines:function(){ return ['// Loi 1', 'for (int i = 1; i <= 10; i--)', '  cout << i << " ";', '// Loi 2', 'for (int i = 1; i > 10; i++)', '  cout << "Khong chay";', '// Loi 3', 'int i, j;', 'for (i = 0, j = 0; i < 10; j++)', '  cout << i << " ";']; },
 run:function(c){
  var cy1 = function(ss, center){ return b16Cy('i = 1', 'i <= 10', 'in i', 'i-- (sai)', ss, center); };
  var sc = function(n, s){ return vScore([{k:'Số lượt', v:n, s:s}]); };
  var head = ['Lượt', 'i', 'i <= 10'];
  c.snap({ln:1, title:'Lỗi 1: khởi tạo i = 1', body:'Điều kiện chờ i tăng tới 10, nhưng phần cập nhật lại là i-- (giảm).', vars:[['i', 1, true]], viz:[cy1(['hi']), sc(0)]});
  c.write('1 0 -1 -2 ');
  c.snap({ln:2, title:'Lượt 1 đến 4: i = 1, 0, -1, -2', body:'Mỗi lượt i giảm 1, nên luôn nhỏ hơn 10 và điều kiện i <= 10 luôn đúng.', vars:[['i', -3, true]],
   viz:[cy1(['dim', 'ok', 'ok', 'hi'], 'Lượt 4'), vTrace(head, [['1', '1', b16Ok(true)], ['2', '0', b16Ok(true)], ['3', '-1', b16Ok(true)], ['4', '-2', b16Ok(true)]], {title:'Bảng trace'}), sc(4)]});
  c.snap({ln:2, title:'Quá 1000 lượt: có thể lặp vô tận', body:'Điều kiện không bao giờ sai nên vòng lặp không dừng như ý định. Mô phỏng tự dừng ở 1000 lượt. Thực tế phải bấm Ctrl + C để dừng chương trình.', vars:[['i', -999, true]],
   viz:[sc('1000+', 'bad'), vCard({kind:'warn', title:'Có thể lặp vô tận', sub:'Mô phỏng tự dừng sau 1000 lượt.', tip:'Chạy thật: i giảm mãi cho tới giới hạn của int (tràn số là hành vi không xác định).'})]});
  c.out('');
  c.snap({ln:4, title:'Lỗi 2: i = 1, điều kiện i > 10', body:'Lần kiểm tra đầu tiên: 1 > 10 là sai.', vars:[['i', 1, true]],
   viz:[b16Cy('i = 1', 'i > 10', 'in chữ', 'i++', ['hi', 'bad'], 'Thoát ngay'), sc(0)]});
  c.snap({ln:4, title:'Thân chạy 0 lần', body:'Điều kiện sai ngay từ đầu nên for thoát luôn, dòng cout không bao giờ chạy. Không có lỗi biên dịch, chỉ là không làm gì.', vars:[['i', 1]],
   viz:[b16Cy('i = 1', 'i > 10', 'in chữ', 'i++', ['dim', 'bad', 'dim', 'dim'], 'Thoát ngay'), sc(0, 'bad')]});
  var cy3 = function(ss, center, hi){ return b16Cy('i = 0, j = 0', 'i < 10', 'in i', 'j++ (sai biến)', ss, center); };
  c.snap({ln:8, title:'Lỗi 3: i = 0, j = 0', body:'Điều kiện kiểm tra i, nhưng phần cập nhật lại tăng j.', vars:[['i', 0], ['j', 0, true]], viz:[cy3(['hi']), sc(0)]});
  c.write('0 0 0 ');
  c.snap({ln:9, title:'Lượt 1 đến 3: i vẫn là 0', body:'Mỗi lượt j tăng (1, 2, 3...) còn i đứng yên ở 0, nên 0 < 10 luôn đúng. Màn hình chỉ in toàn số 0.', vars:[['i', 0], ['j', 3, true]],
   viz:[cy3(['dim', 'ok', 'ok', 'hi'], 'Lượt 3'), vTrace(['Lượt', 'i', 'j', 'i < 10'], [['1', '0', '1', b16Ok(true)], ['2', '0', '2', b16Ok(true)], ['3', '0', '3', b16Ok(true)]], {title:'Bảng trace'}), sc(3)]});
  c.snap({ln:8, title:'Quá 1000 lượt: lặp vô tận', body:'i không đổi nên điều kiện i < 10 không bao giờ sai. Mô phỏng tự dừng ở 1000 lượt.',
   note:'Hỏi mình trước khi chạy: biến nào nằm trong Điều kiện, và biến đó có được Cập nhật tiến dần về điểm dừng không?',
   vars:[['i', 0], ['j', 1000, true]], viz:[sc('1000+', 'bad'), vCard({kind:'warn', title:'Có thể lặp vô tận', sub:'j tăng mãi, i đứng yên ở 0.'})]});
 }}
};
