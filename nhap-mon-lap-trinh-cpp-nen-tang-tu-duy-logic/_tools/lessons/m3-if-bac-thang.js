// META {"module":3,"lesson":"Bài 3.4. If bậc thang (if...else if...else)","activity":"Câu Lệnh If Bậc Thang if...else if...else","title":"If bậc thang: dừng ở bậc đúng đầu tiên","lead":"Xem viên bi giá trị rơi qua từng cửa điều kiện từ trên xuống. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["dung","Xếp loại đúng thứ tự"],["sai","Sai thứ tự"],["dien","Tiền điện bậc thang"]],"codeTitle":"Mã nguồn C++","path":"cau-truc-dieu-kien/if-bac-thang-if-else-if-else/cau-lenh-if-bac-thang-if-else-if-else/index.html"}
var CONSOLE_TITLE = 'Màn hình (Console)';

function b12Gates(labels, match, upto, o){
  return vGates(labels.map(function(t, i){
    if (i < upto) return {t:t, s:(i === match ? 'ok' : 'no')};
    return {t:t + (o.skip ? '  ·  không xét' : ''), s:'dim'};
  }), {pill:o.pill, at:o.at});
}
function b12Fmt(d){ return d % 1 === 0 ? d.toFixed(1) : String(d); }
function b12Vnd(n){ return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }

/* Chạy một chuỗi if bậc thang: labels = nhãn các cửa, conds = kết quả từng cửa, lns = dòng if, outLns = dòng cout */
function b12Run(c, o){
  var match = o.conds.indexOf(true), n = o.labels.length, i;
  c.snap({ln:0, title:'Khai báo ' + o.decl, body:o.declBody,
   viz:b12Gates(o.labels, -1, 0, {pill:o.pill, at:-1})});
  for (i = 0; i <= match; i++) {
    var ok = o.conds[i];
    c.snap({ln:o.lns[i], title:'Xét cửa ' + (i + 1) + ': ' + o.labels[i] + (ok ? ' ✓' : ' ✗'),
     body:o.checkBody(i, ok),
     viz:b12Gates(o.labels, ok ? i : -1, i + 1, {pill:o.pill, at:i})});
  }
  return match;
}

var EX = {
dung:{inputs:[{id:'diem', label:'diem', def:'7.5', text:'^(10(\\.0)?|[0-9](\\.[0-9])?)$', msg:'Nhập điểm từ 0 đến 10, ví dụ 7.5', w:70}],
 chips:['9', '7.5', '5.5', '4', '8.0', '6.5'],
 intro:'Chương trình xếp loại theo điểm. Chọn một điểm (hoặc gõ điểm khác) rồi bấm "Bước tiếp" để xem viên bi rơi qua các cửa.',
 lines:function(P){
  return ['double diem = ' + b12Fmt(parseFloat(P.diem)) + ';', 'if (diem >= 8.0)', '  cout << "Gioi";', 'else if (diem >= 6.5)', '  cout << "Kha";',
   'else if (diem >= 5.0)', '  cout << "Trung binh";', 'else', '  cout << "Yeu";'];
 },
 run:function(c, P){
  var d = parseFloat(P.diem), ds = b12Fmt(d), pill = ds;
  var labels = ['diem >= 8.0', 'diem >= 6.5', 'diem >= 5.0', 'else (còn lại)'];
  var conds = [d >= 8.0, d >= 6.5, d >= 5.0, true], lns = [1, 3, 5, 7], outs = [2, 4, 6, 8];
  var names = ['Gioi', 'Kha', 'Trung binh', 'Yeu'];
  var match = b12Run(c, {labels:labels, conds:conds, lns:lns, pill:pill, decl:'diem = ' + ds,
   declBody:'Biến diem mang giá trị ' + ds + ' (viên bi ở trên cùng). Máy sẽ cho nó rơi qua từng cửa, từ trên xuống.',
   checkBody:function(i, ok){
    if (i === 3) return 'Không cửa nào ở trên đúng, nên else (cửa cuối) chạy.';
    return ds + ' >= ' + ['8.0', '6.5', '5.0'][i] + (ok ? ' là đúng: cửa mở, máy vào nhánh này.' : ' là sai: viên bi rơi tiếp xuống cửa dưới.');
   }});
  c.out(names[match]);
  var skipped = labels.length - 1 - match;
  c.snap({ln:outs[match], title:'In "' + names[match] + '"',
   body:'Nhánh đúng đầu tiên chạy và in ra "' + names[match] + '".' + (skipped > 0 ? ' ' + (skipped === 1 ? 'Cửa' : skipped + ' cửa') + ' phía dưới không được xét nữa.' : ''),
   viz:b12Gates(labels, match, match + 1, {pill:pill, at:match, skip:true})});
  c.snap({ln:outs[match], title:'Xong',
   body:'Với diem = ' + ds + ', máy dừng ở cửa ' + (match + 1) + ' và in "' + names[match] + '". Thử giá trị biên 8.0 và 6.5 để thấy dấu >= tính cả chính nó.',
   note:'if bậc thang chỉ chạy đúng một nhánh: nhánh đúng đầu tiên từ trên xuống.',
   viz:b12Gates(labels, match, match + 1, {pill:pill, at:match, skip:true})});
 }},

sai:{inputs:[],
 intro:'Cùng bài xếp loại nhưng hai cửa bị đặt sai thứ tự. Với diem = 9, kết quả có đúng không? Bấm "Bước tiếp".',
 lines:function(){ return ['double diem = 9.0;', 'if (diem >= 5.0)', '  cout << "Dat";', 'else if (diem >= 8.0)', '  cout << "Xuat sac";']; },
 run:function(c){
  var labels = ['diem >= 5.0', 'diem >= 8.0'], conds = [true, true];
  c.snap({ln:0, title:'Khai báo diem = 9.0', body:'Điểm 9 đáng ra phải được xếp "Xuat sac". Cửa lỏng (>= 5.0) đang đứng trên cửa chặt (>= 8.0).',
   viz:b12Gates(labels, -1, 0, {pill:'9.0', at:-1})});
  c.snap({ln:1, title:'Xét cửa 1: diem >= 5.0 ✓', body:'9.0 >= 5.0 là đúng ngay: cửa mở, viên bi dừng lại ở đây.',
   viz:b12Gates(labels, 0, 1, {pill:'9.0', at:0})});
  c.out('Dat');
  c.snap({ln:2, title:'In "Dat"', body:'Máy in "Dat" rồi thoát khỏi chuỗi if.',
   viz:b12Gates(labels, 0, 1, {pill:'9.0', at:0, skip:true})});
  c.snap({ln:3, dim:[3, 4], dimLabel:'không bao giờ xét', title:'Cửa diem >= 8.0 không được xét',
   body:'Dù 9.0 >= 8.0 cũng đúng, máy không bao giờ tới cửa này. Chương trình vẫn biên dịch và chạy bình thường nhưng kết quả sai.',
   viz:[b12Gates(labels, 0, 1, {pill:'9.0', at:0, skip:true}), vCard({kind:'warn', title:'Sai logic, không báo lỗi', sub:'Cửa lỏng đặt trên cửa chặt thì cửa chặt không bao giờ chạy.'})]});
  var fixed = ['diem >= 8.0', 'diem >= 5.0'];
  var fixedCode = vText(['if (diem >= 8.0)', '  cout << "Xuat sac";', 'else if (diem >= 5.0)', '  cout << "Dat";'], {title:'Mã sau khi đổi thứ tự'});
  c.snap({ln:-1, title:'Đổi thứ tự: cửa chặt lên trên',
   body:'Đặt cửa diem >= 8.0 lên trước cửa diem >= 5.0 (mỗi nhánh đi kèm cửa của nó) rồi chạy lại.',
   viz:[b12Gates(fixed, -1, 0, {pill:'9.0', at:-1}), fixedCode]});
  c.snap({ln:-1, title:'Chạy lại với thứ tự mới',
   body:'Cửa diem >= 8.0 đúng ngay: máy in "Xuat sac" và bỏ qua cửa dưới. Lần này kết quả đúng.',
   note:'Điều kiện chặt nhất (khó thỏa mãn nhất) phải đứng trên cùng.',
   viz:[b12Gates(fixed, 0, 1, {pill:'9.0', at:0, skip:true}), fixedCode, vCard({kind:'ok', title:'Kết quả đúng: Xuat sac', sub:'Cửa chặt đứng trước nên được xét trước.'})]});
 }},

dien:{inputs:[{id:'kwh', label:'soKwh', def:120, min:1, max:400}],
 intro:'Tính tiền điện theo bậc: 50 số đầu giá thấp, 50 số tiếp giá cao hơn, phần còn lại cao nhất. Có thể đổi soKwh (bảng giá là số liệu đơn giản hoá để học). Bấm "Bước tiếp".',
 lines:function(P){ return ['double soKwh = ' + P.kwh + ';', 'double tienDien;', 'if (soKwh <= 50)', '  tienDien = soKwh * 1500;', 'else if (soKwh <= 100)',
   '  tienDien = 50 * 1500', '    + (soKwh - 50) * 1800;', 'else', '  tienDien = 50 * 1500 + 50 * 1800', '    + (soKwh - 100) * 2200;',
   'cout << "Tien dien: " << tienDien', '     << " VND" << endl;']; },
 run:function(c, P){
  var k = P.kwh, labels = ['soKwh <= 50', 'soKwh <= 100', 'else (trên 100 số)'];
  var conds = [k <= 50, k <= 100, true], lns = [2, 4, 7], calc = [3, 5, 8];
  var s1 = Math.min(k, 50), s2 = Math.min(Math.max(k - 50, 0), 50), s3 = Math.max(k - 100, 0);
  var t1 = s1 * 1500, t2 = s2 * 1800, t3 = s3 * 2200, total = t1 + t2 + t3;
  var match = conds.indexOf(true), rates = [1500, 1800, 2200];
  function bar(split){
    var segs = split ? [[s1, '--accent-soft'], [s2, '--true-soft'], [s3, '--cur']] : [[k, '--code-bg']], h = '<div class="v-row"><div class="v-name">' + k + ' kWh' + (split ? ' chia theo bậc' : '') + '</div><div style="display:flex;border:1px solid var(--line);border-radius:8px;overflow:hidden;min-height:36px">';
    segs.forEach(function(s){ if (s[0] > 0) h += '<div style="flex:' + s[0] + ' 1 0;min-width:44px;background:var(' + s[1] + ');color:var(--text);display:flex;align-items:center;justify-content:center;font:700 13px ui-monospace,Menlo,monospace;padding:6px 2px">' + s[0] + '</div>'; });
    return h + '</div></div>';
  }
  var rows = [['Đoạn', 'kWh', 'Đơn giá', 'Thành tiền']];
  [[s1, 1500, t1], [s2, 1800, t2], [s3, 2200, t3]].forEach(function(r, i){ if (r[0] > 0) rows.push(['Đoạn ' + (i + 1), String(r[0]), b12Vnd(r[1]), {v:b12Vnd(r[2]), s:'ok'}]); });
  c.snap({ln:0, title:'Khai báo soKwh = ' + k, body:'Đơn giá (đơn giản hoá): 50 số đầu 1.500đ, 50 số tiếp 1.800đ, từ số 101 trở đi 2.200đ.',
   viz:[bar(false), b12Gates(labels, -1, 0, {pill:k + ' kWh', at:-1})]});
  for (var i = 0; i <= match; i++) {
    c.snap({ln:lns[i], title:'Xét cửa ' + (i + 1) + ': ' + labels[i] + (conds[i] ? ' ✓' : ' ✗'),
     body:i === 2 ? 'Không cửa nào ở trên đúng, nên else chạy.' : k + ' <= ' + [50, 100][i] + (conds[i] ? ' là đúng: tiền điện tính theo nhánh này.' : ' là sai: sang cửa dưới.'),
     viz:[bar(false), b12Gates(labels, conds[i] ? i : -1, i + 1, {pill:k + ' kWh', at:i})]});
  }
  c.snap({ln:calc[match], title:'Tính tiền theo từng đoạn',
   body:'Mỗi đoạn dùng một đơn giá riêng, rồi cộng lại: ' + b12Vnd(total) + ' đồng.',
   viz:[bar(true), vGrid(rows, {head:true}), b12Gates(labels, match, match + 1, {pill:k + ' kWh', at:match, skip:true})]});
  c.out('Tien dien: ' + total + ' VND');
  c.snap({ln:10, title:'Xong', body:'In ra "Tien dien: ' + total + ' VND".' + (k === 120 ? ' Đây không phải 120 x 2200: chỉ 20 số cuối tính giá cao nhất.' : ''),
   note:'Bảng giá chỉ là số liệu đơn giản hoá để học, không phải biểu giá điện thực tế.',
   viz:[bar(true), vGrid(rows, {head:true})]});
 }}
};
