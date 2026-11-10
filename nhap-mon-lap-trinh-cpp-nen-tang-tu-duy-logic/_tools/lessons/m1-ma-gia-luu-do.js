// META {"module":1,"lesson":"Bài 1.3. Mã giả và lưu đồ thuật toán","activity":"Mã Giả & Lưu Đồ Thuật Toán","title":"Chạy theo lưu đồ","lead":"Xem luồng đi qua từng hình khối của lưu đồ, cùng mã giả và bảng giá trị. Chọn một ví dụ rồi bấm <b>Bước tiếp</b>.","tabs":[["tuan","Tuần tự: tiền táo"],["nhanh","Rẽ nhánh: Đậu/Rớt"],["lap","Lặp: tổng 1..n"]],"codeTitle":"Mã giả","path":"lam-quen-voi-cpp-va-tu-duy-thuat-toan/ma-gia-va-luu-do-thuat-toan/ma-gia-luu-do-thuat-toan/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (kết quả in ra)';
var VIZ_TITLE = 'Lưu đồ và bảng trace';
/* nodes: mảng khung; st: object id -> trạng thái; hiEdges: danh sách "a>b" sáng */
function b4Fc(nodes, edges, st, hiE){
  var ns = nodes.map(function(n){ return {id:n.id, t:n.t, kind:n.kind, x:n.x, y:n.y, s:st[n.id]}; });
  var es = edges.map(function(e){ var k = e.a + '>' + e.b; return {a:e.a, b:e.b, label:e.label, back:e.back, s:(hiE || []).indexOf(k) >= 0 ? 'hi' : null}; });
  return vFlowchart(ns, es);
}
function b4Legend(){
  return vChips([{t:'Oval', label:'bắt đầu / kết thúc'}, {t:'Bình hành', label:'nhập / xuất'}, {t:'Chữ nhật', label:'xử lý'}, {t:'Thoi', label:'điều kiện'}], {title:'Ý nghĩa các hình khối'});
}
function b4Viz(fc, head, rows, ttl, hiRow){
  return [fc, rows.length ? vTrace(head, rows, {title:ttl, hiRow:hiRow}) : '', b4Legend()];
}

/* ---- Tab 1: tuần tự ---- */
var N1 = [{id:'s', t:'Bắt đầu', kind:'start', x:0, y:0}, {id:'in', t:'Nhập x, y', kind:'io', x:0, y:1}, {id:'p', t:'T = x × y', kind:'proc', x:0, y:2}, {id:'out', t:'In T', kind:'io', x:0, y:3}, {id:'e', t:'Kết thúc', kind:'end', x:0, y:4}];
var E1 = [{a:'s', b:'in'}, {a:'in', b:'p'}, {a:'p', b:'out'}, {a:'out', b:'e'}];
/* ---- Tab 2: rẽ nhánh ---- */
var N2 = [{id:'s', t:'Bắt đầu', kind:'start', x:0, y:0}, {id:'in', t:'Nhập score', kind:'io', x:0, y:1}, {id:'c', t:'score ≥ 5 ?', kind:'cond', x:0, y:2},
 {id:'d', t:'In "Đậu"', kind:'io', x:0, y:3}, {id:'r', t:'In "Rớt"', kind:'io', x:1, y:4}, {id:'e', t:'Kết thúc', kind:'end', x:0, y:5}];
var E2 = [{a:'s', b:'in'}, {a:'in', b:'c'}, {a:'c', b:'d', label:'Đúng'}, {a:'c', b:'r', label:'Sai'}, {a:'d', b:'e'}, {a:'r', b:'e'}];
/* ---- Tab 3: lặp ---- */
var N3 = [{id:'s', t:'Bắt đầu', kind:'start', x:0, y:0}, {id:'in', t:'Nhập n', kind:'io', x:0, y:1}, {id:'i0', t:'S = 0, i = 1', kind:'proc', x:0, y:2},
 {id:'c', t:'i ≤ n ?', kind:'cond', x:0, y:3}, {id:'a', t:'S = S + i', kind:'proc', x:0, y:4}, {id:'b', t:'i = i + 1', kind:'proc', x:0, y:5},
 {id:'o', t:'In S', kind:'io', x:1, y:4}, {id:'e', t:'Kết thúc', kind:'end', x:1, y:5}];
var E3 = [{a:'s', b:'in'}, {a:'in', b:'i0'}, {a:'i0', b:'c'}, {a:'c', b:'a', label:'Đúng'}, {a:'a', b:'b'}, {a:'b', b:'c', back:true}, {a:'c', b:'o', label:'Sai'}, {a:'o', b:'e'}];

var EX = {
tuan:{inputs:[],
 intro:'Bài toán: mua x cân táo, giá y đồng một cân, tính tiền T. Luồng đi từ trên xuống, không rẽ nhánh. Bấm "Bước tiếp".',
 lines:function(){ return ['Bắt đầu', 'Nhập x, y', 'T = x × y', 'In T', 'Kết thúc']; },
 run:function(c){
  var x = 2, y = 30000, T = x * y, H = ['Bước', 'x', 'y', 'T'];
  var rows = [];
  c.snap({ln:0, title:'Bắt đầu', body:'Hình oval đánh dấu điểm bắt đầu. Luồng chỉ có một đường đi duy nhất.',
   viz:b4Viz(b4Fc(N1, E1, {s:'hi'}, []), H, rows, 'Bảng trace')});
  c.input(x + ' ' + y); rows.push(['Nhập', {v:x, s:'hi'}, {v:y, s:'hi'}, '?']);
  c.snap({ln:1, title:'Nhập x = ' + x + ', y = ' + y, body:'Hình bình hành là bước nhập. Đã nhận ' + x + ' cân táo, giá ' + y + ' đồng một cân.',
   viz:b4Viz(b4Fc(N1, E1, {s:'ok', 'in':'hi'}, ['s>in']), H, rows, 'Bảng trace')});
  rows.push(['Tính', x, y, {v:T, s:'hi'}]);
  c.snap({ln:2, title:'Xử lý: T = ' + x + ' × ' + y + ' = ' + T, body:'Hình chữ nhật là bước xử lý. Tiền phải trả là ' + T + ' đồng.',
   viz:b4Viz(b4Fc(N1, E1, {s:'ok', 'in':'ok', p:'hi'}, ['in>p']), H, rows, 'Bảng trace')});
  c.out(String(T));
  c.snap({ln:3, title:'In T', body:'Hình bình hành lần nữa, lần này là bước xuất: màn hình in ' + T + '.',
   viz:b4Viz(b4Fc(N1, E1, {s:'ok', 'in':'ok', p:'ok', out:'hi'}, ['p>out']), H, rows, 'Bảng trace')});
  c.snap({ln:4, title:'Xong', body:'Mỗi hình chạy đúng một lần, theo thứ tự từ trên xuống.',
   note:'Cấu trúc tuần tự: các bước chạy lần lượt, mỗi bước một lần, không rẽ nhánh và không lặp.',
   viz:b4Viz(b4Fc(N1, E1, {s:'ok', 'in':'ok', p:'ok', out:'ok', e:'hi'}, ['out>e']), H, rows, 'Bảng trace')});
 }},
nhanh:{inputs:[{id:'score', label:'score', def:4, min:0, max:10}],
 intro:'Nhập điểm thi: từ 5 trở lên in "Đậu", ngược lại in "Rớt". Có thể đổi score ở ô nhập. Bấm "Bước tiếp".',
 lines:function(){ return ['Bắt đầu', 'Nhập score', 'Nếu score ≥ 5 thì:', '  In "Đậu"', 'Ngược lại:', '  In "Rớt"', 'Kết thúc']; },
 run:function(c, P){
  var sc = P.score, ok = sc >= 5, H = ['Bước', 'score', 'score ≥ 5 ?', 'Kết quả'], rows = [];
  var brA = ok ? 'd' : 'r', brB = ok ? 'r' : 'd', hiBr = 'c>' + brA;
  c.snap({ln:0, title:'Bắt đầu', body:'Hình oval: bắt đầu thuật toán.', viz:b4Viz(b4Fc(N2, E2, {s:'hi'}, []), H, rows, 'Bảng trace')});
  c.input(String(sc)); rows.push(['Nhập', {v:sc, s:'hi'}, '?', '?']);
  c.snap({ln:1, title:'Nhập score = ' + sc, body:'Đọc điểm vào biến score.', viz:b4Viz(b4Fc(N2, E2, {s:'ok', 'in':'hi'}, ['s>in']), H, rows, 'Bảng trace')});
  rows.push(['Kiểm tra', sc, {v:(ok ? '✓' : '✗') + ' ' + sc + ' ≥ 5', s:ok ? 'ok' : 'bad'}, '?']);
  c.snap({ln:2, title:'Hình thoi: ' + sc + ' ≥ 5 ?', body:'Hình thoi là nơi luồng rẽ đi. ' + sc + ' ≥ 5 là ' + (ok ? 'ĐÚNG' : 'SAI') + ', nên đi theo nhánh "' + (ok ? 'Đúng' : 'Sai') + '".',
   viz:b4Viz(b4Fc(N2, E2, {s:'ok', 'in':'ok', c:'hi'}, ['in>c']), H, rows, 'Bảng trace')});
  var st = {s:'ok', 'in':'ok', c:'ok'}; st[brA] = 'hi'; st[brB] = 'dim';
  var kq = ok ? 'Đậu' : 'Rớt'; c.out(kq); rows.push(['In', sc, rows[1][2], {v:kq, s:'hi'}]);
  c.snap({ln:ok ? 3 : 5, title:'Nhánh ' + (ok ? 'Đúng' : 'Sai') + ': in "' + kq + '"', body:'Chỉ nhánh được chọn chạy. Nhánh còn lại ("' + (ok ? 'Rớt' : 'Đậu') + '") mờ đi vì không được đi qua.',
   viz:b4Viz(b4Fc(N2, E2, st, [hiBr]), H, rows, 'Bảng trace')});
  var st2 = {s:'ok', 'in':'ok', c:'ok', e:'hi'}; st2[brA] = 'ok'; st2[brB] = 'dim';
  c.snap({ln:6, title:'Xong', body:'Hai nhánh cùng gặp nhau ở bước Kết thúc.',
   note:'Hình thoi là nơi luồng rẽ đi: mỗi lần chạy chỉ đi qua một trong hai nhánh Đúng/Sai.',
   viz:b4Viz(b4Fc(N2, E2, st2, [brA + '>e']), H, rows, 'Bảng trace')});
 }},
lap:{inputs:[{id:'n', label:'n', def:3, min:1, max:5}],
 intro:'Tính tổng S = 1 + 2 + ... + n. Hình thoi kiểm tra i ≤ n, mũi tên quay lui đưa luồng về lại hình thoi. Bấm "Bước tiếp".',
 lines:function(){ return ['Bắt đầu', 'Nhập n', 'S = 0', 'i = 1', 'Lặp lại khi i ≤ n:', '  S = S + i', '  i = i + 1', 'In S', 'Kết thúc']; },
 run:function(c, P){
  var n = P.n, H = ['Lần', 'i ≤ n ?', 'S', 'i'], rows = [], S = 0, i = 1, base = {s:'ok', 'in':'ok', i0:'ok'};
  function st(o){ var r = {}, k; for (k in base) r[k] = base[k]; for (k in o) r[k] = o[k]; return r; }
  var T = 'Bảng trace (n = ' + n + ')';
  c.snap({ln:0, title:'Bắt đầu', body:'Hình oval: bắt đầu thuật toán.', viz:b4Viz(b4Fc(N3, E3, {s:'hi'}, []), H, [], T)});
  c.input(String(n));
  c.snap({ln:1, title:'Nhập n = ' + n, body:'Đọc n vào bộ nhớ: ta sẽ cộng các số từ 1 đến ' + n + '.', viz:b4Viz(b4Fc(N3, E3, {s:'ok', 'in':'hi'}, ['s>in']), H, [], T)});
  rows.push(['Khởi tạo', '–', {v:S, s:'hi'}, {v:i, s:'hi'}]);
  c.snap({ln:3, title:'Đặt S = 0, i = 1', body:'S là tổng (ban đầu rỗng), i là số sắp cộng.', viz:b4Viz(b4Fc(N3, E3, {s:'ok', 'in':'ok', i0:'hi'}, ['in>i0']), H, rows, T)});
  var lan = 0, prevBack = false;
  while (i <= n) {
   lan++; S += i; i++;
   rows.push([String(lan), {v:'✓ ' + (i - 1) + ' ≤ ' + n, s:'ok'}, {v:S, s:'hi'}, {v:i, s:'hi'}]);
   c.snap({ln:5, title:'Lượt ' + lan + ': ' + (i - 1) + ' ≤ ' + n + ' đúng', body:'Điều kiện đúng nên đi xuống thân vòng lặp: S = ' + (S - (i - 1)) + ' + ' + (i - 1) + ' = ' + S + ', rồi i tăng lên ' + i + '. ' + (lan > 1 ? 'Mũi tên quay lui vừa đưa luồng về hình thoi.' : 'Sau đó mũi tên quay lui sẽ đưa luồng về hình thoi.'),
    viz:b4Viz(b4Fc(N3, E3, st({c:'ok', a:'ok', b:'hi'}), ['c>a', 'a>b', 'b>c']), H, rows, T)});
  }
  rows.push([String(lan + 1), {v:'✗ ' + i + ' ≤ ' + n, s:'bad'}, S, i]);
  c.snap({ln:4, title:'Kiểm tra lần ' + (lan + 1) + ': ' + i + ' ≤ ' + n + ' sai', body:'Điều kiện sai nên luồng thoát vòng lặp, đi theo nhánh "Sai". Tổng cộng ' + (lan + 1) + ' lần kiểm tra, thân lặp chạy ' + lan + ' lần.',
   viz:b4Viz(b4Fc(N3, E3, st({c:'hi', a:'dim', b:'dim'}), ['b>c', 'c>o']), H, rows, T)});
  c.out(String(S));
  c.snap({ln:7, title:'In S = ' + S, body:'Màn hình in tổng ' + S + '.', viz:b4Viz(b4Fc(N3, E3, st({c:'ok', a:'dim', b:'dim', o:'hi'}), ['c>o']), H, rows, T)});
  c.snap({ln:8, title:'Xong', body:'Vòng lặp kết thúc khi điều kiện sai; i dừng ở ' + i + '.',
   note:'Vòng lặp trong lưu đồ cần mũi tên quay lại hình thoi, và dừng khi điều kiện sai.',
   viz:b4Viz(b4Fc(N3, E3, st({c:'ok', a:'dim', b:'dim', o:'ok', e:'hi'}), ['o>e']), H, rows, T)});
 }}
};
