// META {"module":3,"lesson":"Bài 3.1. Tổng quan và câu lệnh if","activity":"Giới Thiệu Cấu Trúc Điều Kiện","title":"Chương trình rẽ nhánh theo điều kiện","lead":"Một con đường thẳng tách thành hai ngã rẽ. Chọn một tình huống ở ô nhập (hoặc bấm gợi ý) rồi bấm <b>Bước tiếp</b>.","tabs":[["re","Ngã rẽ theo dữ liệu"]],"codeTitle":"Mã nguồn C++","path":"cau-truc-dieu-kien/tong-quan-va-cau-lenh-if/gioi-thieu-cau-truc-dieu-kien/index.html"}
/* Hàm phụ dùng tiền tố b9 */
var b9Cases = {
 'Điểm':    {v:'diem',    op:'>= 5',       t:function(x){ return x >= 5; },       yes:'Chuc mung! Ban da DAU.', no:'Rat tiec! Ban da ROT.',  lead:'Chấm đậu hoặc rớt'},
 'HP':      {v:'hp',      op:'<= 0',       t:function(x){ return x <= 0; },       yes:'Game Over',              no:'Tiep tuc chien dau',     lead:'Nhân vật hết máu chưa'},
 'Hóa đơn': {v:'tong',    op:'> 1000000',  t:function(x){ return x > 1000000; },  yes:'Giam gia 10%',           no:'Tinh gia niem yet',      lead:'Hóa đơn có được giảm giá'},
 'Nhiệt độ':{v:'nhietDo', op:'> 30',       t:function(x){ return x > 30; },       yes:'Bat dieu hoa',           no:'Giu nguyen',             lead:'Có cần bật điều hòa'}
};
function b9Parse(s){
  var m = /^(.+?) (\d+)$/.exec(String(s)), k = m && b9Cases[m[1]] ? m[1] : 'Điểm';
  return {k:k, cs:b9Cases[k], x:m ? Number(m[2]) : 8};
}
function b9Node(t, s, extra){
  var bg = s === 'ok' ? 'var(--true-soft)' : s === 'hi' ? 'var(--cur)' : 'var(--node)';
  var bd = s === 'ok' ? 'var(--true)' : s === 'hi' ? 'var(--cur-bar)' : 'var(--node-line)';
  return '<div style="background:' + bg + ';border:2px solid ' + bd + ';border-radius:10px;padding:7px 8px;text-align:center;font:600 12.5px ui-monospace,Menlo,Consolas,monospace;' + (s === 'dim' ? 'opacity:.35;' : '') + (extra || '') + '">' + esc(t) + '</div>';
}
function b9Lab(t, on, col){
  return '<div style="text-align:center;font:700 12.5px system-ui,sans-serif;color:' + (on ? col : 'var(--muted)') + ';opacity:' + (on ? 1 : .45) + '">' + esc(t) + ' ↓</div>';
}
/* o: {start, cond, phase 0..4, taken, yesT, noT, afterT} */
function b9Road(o){
  var p = o.phase, ch = p >= 2, yes = o.taken === 'yes';
  var ss = p === 0 ? 'hi' : 'ok';
  var cs = p === 1 ? 'hi' : (ch ? 'ok' : null);
  var ctext = o.cond + (ch ? (yes ? '  →  Đúng' : '  →  Sai') : ' ?');
  var as = p >= 3 ? (p === 4 ? 'ok' : 'hi') : null;
  return '<div class="v-row"><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 10px;align-items:start">' +
    '<div style="grid-column:1/-1;display:flex;justify-content:center">' + b9Node(o.start, ss, 'max-width:100%') + '</div>' +
    '<div style="grid-column:1/-1;text-align:center;color:var(--muted)">↓ đường thẳng</div>' +
    '<div style="grid-column:1/-1;display:flex;justify-content:center">' + b9Node(ctext, cs, 'border-radius:999px;padding:9px 20px;max-width:100%') + '</div>' +
    b9Lab('Đúng', ch && yes, 'var(--true)') + b9Lab('Sai', ch && !yes, 'var(--cur-bar)') +
    b9Node('In: ' + o.yesT, ch ? (yes ? 'ok' : 'dim') : null) + b9Node('In: ' + o.noT, ch ? (yes ? 'dim' : 'hi') : null) +
    '<div style="grid-column:1/-1;text-align:center;color:var(--muted)">↓ &nbsp; hai nhánh nhập lại cùng một đường &nbsp; ↓</div>' +
    '<div style="grid-column:1/-1">' + b9Node('Chạy tiếp phần phía sau', as) + '</div></div></div>';
}

var EX = {
re:{inputs:[{id:'th', label:'tình huống', def:'Điểm 8', text:'^(Điểm|HP|Hóa đơn|Nhiệt độ) [0-9]{1,7}$', msg:'Nhập dạng "Điểm 8", "HP 0", "Hóa đơn 1500000" hoặc "Nhiệt độ 32"', w:170}],
 chips:['Điểm 8', 'Điểm 4', 'HP 0', 'HP 35', 'Hóa đơn 1500000', 'Hóa đơn 800000', 'Nhiệt độ 32', 'Nhiệt độ 25'],
 intro:'Cùng một khung code nhưng đi đường khác nhau tùy dữ liệu. Thử "Điểm 8" rồi "Điểm 4", sau đó thử các tình huống khác. Bấm "Bước tiếp".',
 lines:function(P){
  var s = b9Parse(P.th), cs = s.cs;
  return [
   'int ' + cs.v + ' = ' + s.x + ';',
   'if (' + cs.v + ' ' + cs.op + ') {',
   '  cout << "' + cs.yes + '"',
   '       << endl;',
   '} else {',
   '  cout << "' + cs.no + '"',
   '       << endl;',
   '}',
   'cout << "Chay tiep." << endl;'];
 },
 run:function(c, P){
  var s = b9Parse(P.th), cs = s.cs, ok = cs.t(s.x), cond = cs.v + ' ' + cs.op, cv = s.x + ' ' + cs.op;
  var V = [[cs.v, s.x]];
  var R = function(phase){ return b9Road({start:cs.v + ' = ' + s.x, cond:cond, phase:phase, taken:ok ? 'yes' : 'no', yesT:cs.yes, noT:cs.no}); };
  c.snap({ln:0, title:'Bắt đầu trên đường thẳng', body:'Chương trình chạy từ trên xuống, và biến ' + cs.v + ' nhận giá trị ' + s.x + '. Tới đây vẫn là đường thẳng như các bài trước.', vars:V, viz:R(0)});
  c.snap({ln:1, title:'Biển báo ngã rẽ: ' + cv + ' ?', body:'Máy gặp ngã rẽ và tính điều kiện ' + cv + ' ra Đúng hoặc Sai.', vars:V, viz:R(1)});
  if (ok) {
   c.out(cs.yes);
   c.snap({ln:2, dim:[5, 6], dimLabel:'bỏ qua', title:'Đúng: rẽ sang nhánh trái', body:cv + ' là Đúng nên chương trình đi nhánh if và in "' + cs.yes + '". Nhánh else mờ đi vì không được chọn.', vars:V, viz:R(2)});
  } else {
   c.out(cs.no);
   c.snap({ln:5, dim:[2, 3], dimLabel:'bỏ qua', title:'Sai: rẽ sang nhánh phải', body:cv + ' là Sai nên chương trình đi nhánh else và in "' + cs.no + '". Nhánh if mờ đi vì không được chọn.', vars:V, viz:R(2)});
  }
  c.out('Chay tiep.');
  c.snap({ln:8, title:'Hai nhánh nhập lại', body:'Dù rẽ đường nào, chương trình vẫn quay về cùng một đường phía sau và chạy tiếp.', vars:V, viz:R(3)});
  c.snap({ln:8, title:'Xong', body:'Cùng một đoạn code, dữ liệu khác nhau thì đi đường khác nhau. Hãy thử tình huống khác ở ô nhập.',
   note:'Cấu trúc điều kiện cho chương trình chọn đường theo dữ liệu; sau khi đi hết một nhánh, chương trình tiếp tục chạy phần phía sau.', vars:V, viz:R(4)});
 }}
};
