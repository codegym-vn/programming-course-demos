// META {"module":3,"lesson":"Bài 3.1. Tổng quan và câu lệnh if","activity":"Câu Lệnh If Trong C++","title":"Câu lệnh if chạy như thế nào?","lead":"Xem chương trình đi qua if, if...else và cái bẫy thiếu { }. Dòng không chạy hiện mờ. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["if","if"],["ifelse","if...else"],["thieu","Bẫy thiếu { }"]],"codeTitle":"Mã nguồn C++","path":"cau-truc-dieu-kien/tong-quan-va-cau-lenh-if/cau-lenh-if-trong-cpp/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Sơ đồ luồng';

/* Hàm phụ dùng tiền tố b10 */
function b10Node(t, s, extra){
  var bg = s === 'ok' ? 'var(--true-soft)' : s === 'hi' ? 'var(--cur)' : 'var(--node)';
  var bd = s === 'ok' ? 'var(--true)' : s === 'hi' ? 'var(--cur-bar)' : 'var(--node-line)';
  return '<div style="background:' + bg + ';border:2px solid ' + bd + ';border-radius:10px;padding:6px 8px;text-align:center;font:600 12px ui-monospace,Menlo,Consolas,monospace;' + (s === 'dim' ? 'opacity:.4;' : '') + (extra || '') + '">' + esc(t) + '</div>';
}
function b10Lab(t, on, col){
  return '<div style="text-align:center;font:700 12px system-ui,sans-serif;color:' + (on ? col : 'var(--muted)') + ';opacity:' + (on ? 1 : .45) + '">' + esc(t) + ' ↓</div>';
}
/* Sơ đồ luồng if / if...else.
   o: {cond, phase 0..3, taken 'yes'|'no', yesT, noT (null = không có else), afterT, condRes} */
function b10Flow(o){
  var p = o.phase, ch = p >= 2, yes = o.taken === 'yes';
  var cs = p === 1 ? 'hi' : (ch ? (yes ? 'ok' : 'hi') : null);
  var ctext = o.cond + (ch ? (yes ? '  →  Đúng' : '  →  Sai') : ' ?');
  var ys = ch ? (yes ? 'ok' : 'dim') : null;
  var ns = ch ? (yes ? 'dim' : (o.noT ? 'hi' : null)) : null;
  var noText = o.noT || '(không có else: không làm gì)';
  var as = p >= 3 ? (p === 4 ? 'ok' : 'hi') : null;
  return '<div class="v-row"><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 10px;align-items:start">' +
    '<div style="grid-column:1/-1;display:flex;justify-content:center">' + b10Node(ctext, cs, 'border-radius:999px;padding:8px 18px;max-width:100%') + '</div>' +
    b10Lab('Đúng', ch && yes, 'var(--true)') + b10Lab('Sai', ch && !yes, 'var(--cur-bar)') +
    b10Node(o.yesT, ys) + (o.noT ? b10Node(noText, ns) : '<div style="border:2px dashed var(--node-line);border-radius:10px;padding:6px 8px;text-align:center;font:12px system-ui,sans-serif;color:var(--muted);' + (ch && !yes ? '' : 'opacity:.6') + '">' + esc(noText) + '</div>') +
    '<div style="grid-column:1/-1;text-align:center;color:var(--muted)">↓ &nbsp; hai đường nhập lại &nbsp; ↓</div>' +
    '<div style="grid-column:1/-1">' + b10Node(o.afterT, as) + '</div></div></div>';
}
/* Phạm vi THẬT của if khi thiếu { }. st: {a: trạng thái dòng 1, b: trạng thái dòng 2, res: chữ sau điều kiện} */
function b10Scope(braces, st){
  function line(t, s, ind){
    var bg = s === 'ok' ? 'background:var(--true-soft);' : s === 'dim' ? 'opacity:.4;text-decoration:line-through;' : '';
    return '<div style="padding:2px 8px;border-radius:6px;margin-left:' + (ind || 0) + 'px;' + bg + '">' + esc(t) + '</div>';
  }
  var box = 'border:2px dashed var(--cur-bar);border-radius:8px;margin:4px 0 4px 18px;padding:2px 0;';
  var h = '<div class="v-row"><div style="font:600 13px ui-monospace,Menlo,Consolas,monospace">' +
    '<div style="padding:2px 8px">if (diem &gt; 5)' + (braces ? ' {' : '') + (st.res ? '  <span style="color:var(--false)">' + esc(st.res) + '</span>' : '') + '</div>';
  if (braces) {
    h += '<div style="' + box + '">' + line('cout << "Dau roi!";', st.a) + line('cout << "Di choi thoi!";', st.b) + '</div><div style="padding:2px 8px">}</div>';
  } else {
    h += '<div style="' + box + '">' + line('cout << "Dau roi!";', st.a) + '</div>' + line('cout << "Di choi thoi!";', st.b, 18);
  }
  h += '</div><div style="font:12.5px system-ui,sans-serif;color:var(--muted);margin-top:8px">Khung nét đứt là phạm vi THẬT của if. ' +
    (braces ? 'Có { } nên khung bao cả hai dòng.' : 'Không có { } nên khung chỉ bao dòng đầu. Dòng thứ hai chỉ trông như nằm trong if vì bị thụt lề.') + '</div></div>';
  return h;
}

var EX = {
if:{inputs:[{id:'age', label:'age', def:20, min:0, max:120}], chips:['20', '15'],
 intro:'Chương trình bán vé xem phim 18+. Thử age = 20 rồi age = 15. Bấm "Bước tiếp".',
 lines:function(P){ return [
  'int age = ' + P.age + ';',
  'if (age >= 18) {',
  '  cout << "Moi ban vao xem phim!"',
  '       << endl;',
  '}',
  'cout << "Cam on ban da den rap." << endl;']; },
 run:function(c, P){
  var age = P.age, ok = age >= 18;
  var F = function(phase, taken){ return b10Flow({cond:'age >= 18', cond2:'', phase:phase, taken:taken, yesT:'In: Moi ban vao xem phim!', noT:null, afterT:'In: Cam on ban da den rap.'}); };
  var V = [['age', age]];
  c.snap({ln:0, title:'int age = ' + age, body:'Biến age nhận giá trị ' + age + '.', vars:V, viz:F(0)});
  c.snap({ln:1, title:'Máy hỏi: ' + age + ' >= 18 ?', body:'Điều kiện trong ngoặc của if được tính ra Đúng hoặc Sai.', vars:V, viz:F(1)});
  if (ok) {
   c.out('Moi ban vao xem phim!');
   c.snap({ln:2, title:'Đúng: chạy khối lệnh', body: age + ' >= 18 là Đúng nên các lệnh trong { } được chạy. Màn hình in lời mời.', vars:V, viz:F(2, 'yes')});
  } else {
   c.snap({ln:4, dim:[2, 3], dimLabel:'bỏ qua', title:'Sai: bỏ qua khối lệnh', body: age + ' >= 18 là Sai nên cả khối { } bị nhảy qua. Màn hình vẫn trống, nhưng chương trình không dừng.', vars:V, viz:F(2, 'no')});
  }
  c.out('Cam on ban da den rap.');
  c.snap({ln:5, title:'Chạy tiếp phần sau if', body:'Dù đúng hay sai, chương trình luôn đi tiếp tới dòng nằm sau khối if.', vars:V, viz:F(3, ok ? 'yes' : 'no')});
  c.snap({ln:5, title:'Xong', body:'if chỉ quyết định có chạy khối lệnh của nó hay không.',
   note:'if chạy khối lệnh khi điều kiện đúng. Khi sai, chương trình bỏ qua khối và chạy tiếp phía sau.', vars:V, viz:F(4, ok ? 'yes' : 'no')});
 }},

ifelse:{inputs:[{id:'diem', label:'diem', def:4, min:0, max:10}], chips:['4', '8'],
 intro:'Chấm đậu/rớt với điểm chuẩn 5. Thử diem = 4 rồi diem = 8. Bấm "Bước tiếp".',
 lines:function(P){ return [
  'int diem = ' + P.diem + ';',
  'if (diem >= 5) {',
  '  cout << "Chuc mung! Ban da DAU."',
  '       << endl;',
  '} else {',
  '  cout << "Rat tiec! Ban da ROT."',
  '       << endl;',
  '}',
  'cout << "Hen gap lai!" << endl;']; },
 run:function(c, P){
  var d = P.diem, ok = d >= 5;
  var F = function(phase, taken){ return b10Flow({cond:'diem >= 5', phase:phase, taken:taken, yesT:'In: Chuc mung! Ban da DAU.', noT:'In: Rat tiec! Ban da ROT.', afterT:'In: Hen gap lai!'}); };
  var V = [['diem', d]];
  c.snap({ln:0, title:'int diem = ' + d, body:'Biến diem nhận giá trị ' + d + '.', vars:V, viz:F(0)});
  c.snap({ln:1, title:'Máy hỏi: ' + d + ' >= 5 ?', body:'Chỉ có hai khả năng: Đúng hoặc Sai.', vars:V, viz:F(1)});
  if (ok) {
   c.out('Chuc mung! Ban da DAU.');
   c.snap({ln:2, dim:[5, 6], dimLabel:'bỏ qua', title:'Đúng: đi nhánh if', body: d + ' >= 5 là Đúng nên chạy nhánh if. Nhánh else bị bỏ qua.', vars:V, viz:F(2, 'yes')});
  } else {
   c.out('Rat tiec! Ban da ROT.');
   c.snap({ln:5, dim:[2, 3], dimLabel:'bỏ qua', title:'Sai: nhảy sang else', body: d + ' >= 5 là Sai nên chạy nhánh else. Nhánh if bị bỏ qua.', vars:V, viz:F(2, 'no')});
  }
  c.out('Hen gap lai!');
  c.snap({ln:8, title:'Hai nhánh nhập lại', body:'Sau khi đi hết một nhánh, chương trình chạy tiếp dòng nằm sau cả khối if...else.', vars:V, viz:F(3, ok ? 'yes' : 'no')});
  c.snap({ln:8, title:'Xong', body:'Mỗi lần chạy chỉ đi đúng một trong hai nhánh.',
   note:'if...else chia hai ngã rẽ: điều kiện Đúng đi đường if, Sai đi đường else, rồi cả hai nhập lại.', vars:V, viz:F(4, ok ? 'yes' : 'no')});
 }},

thieu:{inputs:[{id:'ng', label:'có { }', def:'Không', text:'^(Không|Có)$', msg:'Nhập "Không" hoặc "Có"', w:80}], chips:['Không', 'Có'],
 intro:'Cùng một đoạn code với diem = 3. Bấm "Bước tiếp", rồi chọn "Có" ở ô nhập để thêm { } và so sánh.',
 lines:function(P){
  var br = P.ng === 'Có';
  return br ? [
   'int diem = 3;',
   'if (diem > 5) {',
   '  cout << "Dau roi!" << endl;',
   '  cout << "Di choi thoi!" << endl;',
   '}']
  : [
   'int diem = 3;',
   'if (diem > 5)',
   '  cout << "Dau roi!" << endl;',
   '  cout << "Di choi thoi!" << endl;'];
 },
 run:function(c, P){
  var br = P.ng === 'Có', V = [['diem', 3]];
  c.snap({ln:0, title:'int diem = 3', body:'Điểm 3, thấp hơn 5 nên điều kiện diem > 5 sẽ Sai.', vars:V, viz:b10Scope(br, {})});
  c.snap({ln:1, title:'Máy hỏi: 3 > 5 ?', body:'Điều kiện Sai. Câu hỏi là if sẽ bỏ qua những dòng nào.', vars:V, viz:b10Scope(br, {res:'3 > 5 là Sai'})});
  if (!br) {
   c.snap({ln:2, dim:[2], dimLabel:'bỏ qua', title:'Dòng "Dau roi!" bị bỏ qua', body:'Không có { } nên if chỉ quản lý đúng một dòng ngay sau nó. Dòng này nằm trong khung nét đứt và bị bỏ qua.',
    vars:V, viz:b10Scope(br, {res:'3 > 5 là Sai', a:'dim'})});
   c.out('Di choi thoi!');
   c.snap({ln:3, title:'Dòng "Di choi thoi!" vẫn chạy', body:'Dòng này nằm ngoài khung nét đứt, không thuộc if dù được thụt lề. Nên nó chạy dù điều kiện Sai.',
    vars:V, viz:b10Scope(br, {res:'3 > 5 là Sai', a:'dim', b:'ok'})});
   c.snap({ln:3, title:'Xong', body:'Màn hình in "Di choi thoi!" dù diem = 3. Chọn "Có" ở ô nhập để thêm { } rồi chạy lại.',
    note:'Thiếu { } thì if chỉ quản lý đúng một lệnh ngay sau nó. Thụt lề không có tác dụng với trình biên dịch. g++ -Wall còn cảnh báo "this \'if\' clause does not guard...".',
    vars:V, viz:b10Scope(br, {res:'3 > 5 là Sai', a:'dim', b:'ok'})});
  } else {
   c.snap({ln:4, dim:[2, 3], dimLabel:'bỏ qua', title:'Cả khối bị bỏ qua', body:'Có { } nên khung bao cả hai dòng. Điều kiện Sai nên cả hai dòng đều bị nhảy qua.',
    vars:V, viz:b10Scope(br, {res:'3 > 5 là Sai', a:'dim', b:'dim'})});
   c.snap({ln:4, title:'Xong', body:'Màn hình không in gì, đúng như ý người viết. So với khi thiếu { } để thấy sự khác biệt.',
    note:'Luôn dùng { } cho thân của if, kể cả khi chỉ có một lệnh.', vars:V, viz:b10Scope(br, {res:'3 > 5 là Sai', a:'dim', b:'dim'})});
  }
 }}
};
