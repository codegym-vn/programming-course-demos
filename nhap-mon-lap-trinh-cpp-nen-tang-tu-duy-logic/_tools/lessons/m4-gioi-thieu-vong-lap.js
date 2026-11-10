// META {"module":4,"lesson":"Bài 4.1. Giới thiệu vòng lặp và vòng lặp for","activity":"Giới Thiệu Về Vòng Lặp","title":"So sánh for, while và do...while","lead":"Ba vòng lặp chạy trên cùng một dữ liệu, được so sánh trong cùng một hình. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["dung","Điều kiện đúng"],["sai","Điều kiện sai ngay từ đầu"]],"codeTitle":"Mã nguồn C++","path":"vong-lap/gioi-thieu-vong-lap-va-vong-lap-for/gioi-thieu-ve-vong-lap/index.html"}
var CONSOLE_TITLE = 'Màn hình (Console)';

/* Hình so sánh ba vòng lặp: mỗi hộp có thứ tự "Kiểm tra / Làm", chữ đã in và bộ đếm lần chạy thân vòng lặp.
   items: [{name, order:[[nhãn, trạng thái]...], text, cnt, s}] */
function b15Box(it){
  var bg = {hi:'var(--cur)', ok:'var(--true-soft)', no:'var(--code-bg)'}[it.s] || 'var(--card)';
  var bd = {hi:'var(--cur-bar)', ok:'var(--true)'}[it.s] || 'var(--node-line)';
  var step = function(o, i){
    var b = {hi:'var(--cur)', ok:'var(--true-soft)', no:'var(--code-bg)'}[o[1]] || 'var(--node)';
    return (i ? '<span style="color:var(--muted)">↓</span>' : '') + '<span style="display:block;border:1.5px solid var(--node-line);background:' + b + ';border-radius:8px;padding:3px 4px;font:600 12.5px system-ui,sans-serif' + (o[1] === 'no' ? ';opacity:.6' : '') + '">' + esc(o[0]) + '</span>';
  };
  return '<div style="border:2px solid ' + bd + ';background:' + bg + ';border-radius:10px;padding:8px 6px;text-align:center;transition:all .25s;min-width:0">' +
    '<b style="display:block;font:700 13.5px ui-monospace,Menlo,monospace;margin-bottom:6px">' + esc(it.name) + '</b>' +
    '<div style="display:flex;flex-direction:column;gap:2px;align-items:stretch">' + it.order.map(step).join('') + '</div>' +
    '<div style="margin-top:8px;font:12px ui-monospace,Menlo,monospace;min-height:16px;word-break:break-word">' + (it.text ? esc(it.text) : '&nbsp;') + '</div>' +
    '<div style="margin-top:4px;color:var(--muted);font-size:11.5px">Thân chạy</div><b style="font:700 24px ui-monospace,Menlo,monospace">' + esc(it.cnt) + '</b><span style="font-size:12px"> lần</span></div>';
}
function b15Cmp(items){
  return '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px">' + items.map(b15Box).join('') + '</div>';
}
function b15Ord(kind, hi){ /* kind 'truoc' = Kiểm tra → Làm; 'sau' = Làm → Kiểm tra; hi: 0, 1 hoặc -1 */
  var a = kind === 'truoc' ? ['Kiểm tra', 'Làm'] : ['Làm', 'Kiểm tra'];
  return a.map(function(t, i){ return [t, i === hi ? 'hi' : '']; });
}
function b15Items(f, w, d){ return [{name:'for', order:b15Ord('truoc', f.hi), text:f.t, cnt:f.n, s:f.s}, {name:'while', order:b15Ord('truoc', w.hi), text:w.t, cnt:w.n, s:w.s}, {name:'do...while', order:b15Ord('sau', d.hi), text:d.t, cnt:d.n, s:d.s}]; }

var EX = {
dung:{inputs:[],
 intro:'Cả ba vòng lặp cùng in các số từ 1 đến 5. Bấm "Bước tiếp" để xem từng vòng chạy và bộ đếm số lần chạy thân vòng lặp.',
 lines:function(){ return ['for (int i = 1; i <= 5; i++)', '  cout << i << " ";', 'cout << endl;', 'int j = 1;', 'while (j <= 5) {', '  cout << j << " ";', '  j++;', '}', 'cout << endl;', 'int k = 1;', 'do {', '  cout << k << " ";', '  k++;', '} while (k <= 5);']; },
 run:function(c){
  var I = function(f, w, d){ return b15Cmp(b15Items(f, w, d)); };
  var idle = {hi:-1, t:'', n:0}, N = '1 2 3 4 5';
  c.snap({ln:0, title:'Ba vòng lặp, cùng nhiệm vụ', body:'for và while kiểm tra điều kiện trước rồi mới làm; do...while làm trước rồi mới kiểm tra. Hình bên dưới có ba hộp, mỗi hộp một vòng lặp.',
   viz:I(idle, idle, idle)});
  c.write('1 ');
  c.snap({ln:0, title:'for: lượt đầu tiên', body:'Kiểm tra 1 <= 5 đúng, làm thân: in 1. Bộ đếm của for là 1.',
   viz:I({hi:0, t:'1', n:1, s:'hi'}, idle, idle)});
  c.write('2 3 4 5 '); c.out('');
  c.snap({ln:2, title:'for: chạy đủ 5 lượt', body:'Lặp tới i = 6 thì 6 <= 5 sai, vòng lặp dừng. Thân đã chạy 5 lần.',
   viz:I({hi:-1, t:N, n:5, s:'ok'}, idle, idle)});
  c.write('1 ');
  c.snap({ln:4, title:'while: lượt đầu tiên', body:'Kiểm tra 1 <= 5 đúng, làm thân: in 1 rồi j++. Cùng thứ tự "kiểm tra, làm" như for.',
   viz:I({hi:-1, t:N, n:5, s:'ok'}, {hi:1, t:'1', n:1, s:'hi'}, idle)});
  c.write('2 3 4 5 '); c.out('');
  c.snap({ln:8, title:'while: chạy đủ 5 lượt', body:'Khi j = 6, điều kiện sai và while dừng. Bộ đếm 5.',
   viz:I({hi:-1, t:N, n:5, s:'ok'}, {hi:-1, t:N, n:5, s:'ok'}, idle)});
  c.write('1 ');
  c.snap({ln:11, title:'do...while: làm trước', body:'Thân chạy ngay: in 1, k++ thành 2. Chỉ sau đó mới kiểm tra 2 <= 5 (đúng).',
   viz:I({hi:-1, t:N, n:5, s:'ok'}, {hi:-1, t:N, n:5, s:'ok'}, {hi:0, t:'1', n:1, s:'hi'})});
  c.write('2 3 4 5 ');
  c.snap({ln:13, title:'do...while: chạy đủ 5 lượt', body:'Khi k = 6, kiểm tra 6 <= 5 sai nên dừng. Cũng 5 lần.',
   viz:I({hi:-1, t:N, n:5, s:'ok'}, {hi:-1, t:N, n:5, s:'ok'}, {hi:-1, t:N, n:5, s:'ok'})});
  c.snap({ln:13, title:'Xong', body:'Khi điều kiện đúng ngay từ đầu, cả ba vòng lặp cho cùng kết quả: 1 2 3 4 5, bộ đếm 5.',
   note:'Chỗ khác nhau chỉ lộ ra khi điều kiện sai ngay từ đầu. Hãy sang tab bên cạnh.',
   viz:I({hi:-1, t:N, n:5, s:'ok'}, {hi:-1, t:N, n:5, s:'ok'}, {hi:-1, t:N, n:5, s:'ok'})});
 }},

sai:{inputs:[],
 intro:'Bây giờ n = 10 còn điều kiện là n < 5 nên sai ngay từ đầu. Vòng lặp nào vẫn chạy thân? Bấm "Bước tiếp".',
 lines:function(){ return ['int n = 10;', 'for (int i = n; i < 5; i++)', '  cout << "Chay for\\n";', 'while (n < 5) {', '  cout << "Chay while\\n";', '  n++;', '}', 'do {', '  cout << "Chay do-while lan 1\\n";', '  n++;', '} while (n < 5);']; },
 run:function(c){
  var I = function(f, w, d){ return b15Cmp(b15Items(f, w, d)); };
  var idle = {hi:-1, t:'', n:0};
  c.snap({ln:0, title:'n = 10, điều kiện n < 5', body:'10 < 5 là sai ngay từ đầu. Ba vòng lặp cùng gặp điều kiện sai này.', viz:I(idle, idle, idle)});
  c.snap({ln:1, title:'for: kiểm tra trước, sai', body:'10 < 5 sai nên for bỏ qua thân vòng lặp, không in gì.', viz:I({hi:0, t:'(không chạy)', n:0, s:'no'}, idle, idle)});
  c.snap({ln:3, title:'while: kiểm tra trước, sai', body:'while cũng kiểm tra trước, 10 < 5 sai nên thân chạy 0 lần.', viz:I({hi:-1, t:'(không chạy)', n:0, s:'no'}, {hi:0, t:'(không chạy)', n:0, s:'no'}, idle)});
  c.out('Chay do-while lan 1');
  c.snap({ln:8, title:'do...while: làm trước', body:'do...while chạy thân trước khi kiểm tra bất cứ điều gì: in "Chay do-while lan 1". Bộ đếm là 1.',
   viz:I({hi:-1, t:'(không chạy)', n:0, s:'no'}, {hi:-1, t:'(không chạy)', n:0, s:'no'}, {hi:0, t:'lan 1', n:1, s:'hi'})});
  c.snap({ln:10, title:'do...while: kiểm tra sau, sai', body:'Sau n++ thì n = 11. Kiểm tra 11 < 5 sai nên dừng. Thân đã chạy đúng 1 lần.',
   viz:I({hi:-1, t:'(không chạy)', n:0, s:'no'}, {hi:-1, t:'(không chạy)', n:0, s:'no'}, {hi:1, t:'lan 1', n:1, s:'ok'})});
  c.snap({ln:10, title:'Xong', body:'Cùng điều kiện sai: for và while chạy 0 lần, do...while chạy 1 lần.',
   note:'for và while kiểm tra trước nên tối thiểu 0 lần; do...while làm trước nên tối thiểu 1 lần.',
   viz:[I({hi:-1, t:'(không chạy)', n:0, s:'no'}, {hi:-1, t:'(không chạy)', n:0, s:'no'}, {hi:-1, t:'lan 1', n:1, s:'ok'}),
    vGrid([['', 'for', 'while', 'do...while'], ['Thứ tự', 'Kiểm tra, làm', 'Kiểm tra, làm', 'Làm, kiểm tra'], ['Chạy tối thiểu', {t:'0 lần', s:'no'}, {t:'0 lần', s:'no'}, {t:'1 lần', s:'ok'}]], {head:true})]});
 }}
};
