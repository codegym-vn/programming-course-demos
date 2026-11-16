// META {"module":1,"lesson":"Bài 1.3. Duyệt mảng và xử lý logic","activity":"Kỹ thuật duyệt mảng","title":"Duyệt mảng: khi nào dừng sớm","lead":"Xem duyệt xuôi, duyệt ngược, tìm kiếm dừng sớm bằng break, và việc đếm bắt buộc phải duyệt hết. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["xuoi-nguoc","Duyệt xuôi và duyệt ngược"],["tim-kiem","Tìm kiếm tuyến tính và break"],["dem-chan","Đếm số chẵn: break đặt nhầm"]],"codeTitle":"Mã nguồn C++","path":"mang-mot-chieu/duyet-mang-va-xu-ly-logic/ky-thuat-duyet-mang/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Mảng và con trỏ i';

/* hàm phụ của bài (tiền tố t3). st: mảng trạng thái từng ô; sb: nhãn nhỏ dưới ô */
function t3Arr(vals, o){
  o = o || {};
  var items = vals.map(function(v, i){ return {v:v, s:(o.st && o.st[i]) || '', sub:(o.sb && o.sb[i]) || ''}; });
  return vArray(items, {name:o.name || 'arr', ptr:o.ptr, ptrLabel:'i', note:o.note});
}
function t3Fill(n, v){ var a = []; for (var i = 0; i < n; i++) a.push(v); return a; }

var EX = {
'xuoi-nguoc':{inputs:[],
 intro:'Cùng một mảng, duyệt từ đầu đến cuối rồi từ cuối về đầu. Hãy nhìn biến i chạy theo hướng nào. Bấm "Bước tiếp".',
 lines:function(){ return [
  'int main() {',
  '  int arr[5] = {10, 20, 30, 40, 50};',
  '  int n = 5;',
  '  for (int i = 0; i < n; i++)',
  '    cout << arr[i] << " ";',
  '  cout << endl;',
  '  for (int i = n - 1; i >= 0; i--)',
  '    cout << arr[i] << " ";',
  '  return 0;',
  '}']; },
 run:function(c){
  var arr = [10, 20, 30, 40, 50], n = arr.length;
  var mark = function(visited, cur){ var st = t3Fill(n, ''); visited.forEach(function(k){ st[k] = 'no'; }); if (cur !== null) st[cur] = 'hi'; return st; };
  c.write(arr[0] + ' ');
  c.snap({ln:3, title:'Duyệt xuôi: i = 0',
   body:'Vòng for đầu bắt đầu từ i = 0, in arr[0] = ' + arr[0] + '. Sau mỗi lượt i tăng thêm 1.',
   viz:t3Arr(arr, {ptr:0, st:mark([], 0)})});
  c.write(arr[1] + ' ');
  c.snap({ln:3, title:'Duyệt xuôi: i = 1',
   body:'i = 1, in arr[1] = ' + arr[1] + '. Con trỏ i đi từ trái sang phải.',
   viz:t3Arr(arr, {ptr:1, st:mark([0], 1)})});
  c.write(arr.slice(2).join(' ') + ' ');
  c.snap({ln:3, title:'Duyệt xuôi: i = 2, 3, 4',
   body:'Cứ thế đến i = 4, in 30 40 50. Khi i = 5 thì 5 < 5 sai, vòng for dừng.',
   viz:t3Arr(arr, {ptr:4, st:mark([0, 1, 2, 3], 4)})});
  c.out('');
  c.write(arr[n - 1] + ' ');
  c.snap({ln:6, title:'Duyệt ngược: i = n - 1',
   body:'Duyệt ngược bắt đầu từ ô cuối, i = n - 1 = ' + (n - 1) + ', rồi giảm dần. Ba chỗ khác duyệt xuôi nằm ở bảng bên dưới.',
   viz:[t3Arr(arr, {ptr:n - 1, st:mark([], n - 1)}), vGrid([['', 'Xuôi', 'Ngược'], ['Bắt đầu', 'i = 0', {v:'i = n - 1', s:'hi'}], ['Điều kiện', 'i < n', {v:'i >= 0', s:'hi'}], ['Cập nhật', 'i++', {v:'i--', s:'hi'}]], {head:true})]});
  c.write(arr[n - 2] + ' ');
  c.snap({ln:6, title:'Duyệt ngược: i = 3',
   body:'i giảm còn 3, in arr[3] = ' + arr[n - 2] + '. Con trỏ i đi từ phải sang trái.',
   viz:t3Arr(arr, {ptr:n - 2, st:mark([n - 1], n - 2)})});
  c.write(arr.slice(0, 3).reverse().join(' ') + ' ');
  c.snap({ln:6, title:'Duyệt ngược: i = 2, 1, 0',
   body:'Cứ thế đến i = 0, in 30 20 10. Khi i = -1 thì i >= 0 sai, vòng for dừng.',
   note:'Duyệt xuôi đi từ 0 đến n - 1, duyệt ngược đi từ n - 1 về 0. Cùng các ô nhưng thứ tự khác nhau. Viết i > 0 thay cho i >= 0 sẽ bỏ sót arr[0].',
   viz:[t3Arr(arr, {ptr:0, st:mark([1, 2, 3, 4], 0)}), vCard({kind:'warn', title:'Lỗi hay gặp: i > 0', sub:'Ô arr[0] sẽ không được xét'})]});
 }},

'tim-kiem':{inputs:[{id:'x', label:'Số cần tìm', def:9, min:1, max:999}], chips:['9', '100'],
 intro:'Tìm một số trong mảng, dừng ngay khi thấy. Thử tìm 9 (có trong mảng) rồi tìm 100 (không có). Bấm "Bước tiếp".',
 lines:function(P){ return [
  'int main() {',
  '  int arr[6] = {5, 8, 2, 9, 1, 7};',
  '  int target = ' + P.x + ';',
  '  bool timThay = false;',
  '  int viTri = -1;',
  '  for (int i = 0; i < 6; i++) {',
  '    if (arr[i] == target) {',
  '      timThay = true;',
  '      viTri = i;',
  '      break;',
  '    }',
  '  }',
  '  if (timThay)',
  '    cout << "Tim thay: " << viTri;',
  '  else',
  '    cout << "Khong tim thay";',
  '  return 0;',
  '}']; },
 run:function(c, P){
  var arr = [5, 8, 2, 9, 1, 7], n = arr.length, T = P.x, pos = arr.indexOf(T);
  var stat = function(found, vi, seen){ return vAcc([{k:'timThay', v:found ? 'true' : 'false', s:found ? 'ok' : 'bad'}, {k:'viTri', v:vi}, {k:'số ô đã xét', v:seen + ' / ' + n}]); };
  var cells = function(upto, cur, hit, cut){
   var st = [], sb = [];
   for (var k = 0; k < n; k++) {
    if (cut && k > upto) { st.push('dim'); sb.push(''); }
    else if (k < upto || (k === upto && !hit && cur === undefined)) { st.push('no'); sb.push('✗'); }
    else if (k === upto) { st.push(hit ? 'ok' : 'hi'); sb.push(hit ? '✓' : ''); }
    else { st.push(''); sb.push(''); }
   }
   return {st:st, sb:sb};
  };
  c.snap({ln:4, title:'Chuẩn bị tìm ' + T,
   body:'timThay = false nghĩa là chưa thấy, viTri = -1 là chưa có vị trí. Sẽ xét từng ô từ i = 0.',
   viz:[t3Arr(arr, {}), stat(false, -1, 0)]});
  var last = pos >= 0 ? pos : n - 1;
  for (var i = 0; i <= last; i++) {
   var hit = (i === pos), nm = arr[i];
   var cs = cells(i, undefined, hit, false);
   if (hit) {
    c.snap({ln:7, title:'i = ' + i + ': arr[' + i + '] == ' + T + ' đúng',
     body:'arr[' + i + '] = ' + nm + ' bằng số cần tìm. Ghi nhớ: timThay = true, viTri = ' + i + '.',
     viz:[t3Arr(arr, {ptr:i, st:cs.st, sb:cs.sb}), stat(true, i, i + 1)]});
   } else {
    c.snap({ln:6, title:'i = ' + i + ': arr[' + i + '] == ' + T + ' sai',
     body:'arr[' + i + '] = ' + nm + ' khác ' + T + ', bỏ qua, đi tiếp.',
     viz:[t3Arr(arr, {ptr:i, st:cs.st.map(function(s, k){ return k === i ? 'hi' : s; }), sb:cs.sb.map(function(s, k){ return k === i ? '✗' : s; })}), stat(false, -1, i + 1)]});
   }
  }
  if (pos >= 0) {
   var cu = cells(pos, undefined, true, true);
   c.snap({ln:9, title:'break: dừng ngay',
    body:'Đã thấy rồi nên thoát vòng for, không xét tiếp ' + (n - 1 - pos) + ' ô còn lại.' + (n - 1 - pos === 0 ? '' : ' Các ô mờ là ô không xét.'),
    viz:[t3Arr(arr, {ptr:pos, st:cu.st, sb:cu.sb, note:(n - 1 - pos === 0 ? '' : 'Ô mờ: không xét')}), stat(true, pos, pos + 1)]});
   c.out('Tim thay: ' + pos);
   c.snap({ln:13, title:'In kết quả',
    body:'timThay là true nên in vị trí tìm được. Chỉ xét ' + (pos + 1) + ' trên ' + n + ' ô.',
    note:'Cần MỘT kết quả (như tìm số) thì được dừng sớm bằng break. Không tìm thấy thì phải xét hết mảng.',
    viz:[t3Arr(arr, {st:cu.st, sb:cu.sb, note:(n - 1 - pos === 0 ? '' : 'Ô mờ: không xét')}), stat(true, pos, pos + 1)]});
  } else {
   var all = cells(n, undefined, false, false);
   c.out('Khong tim thay');
   c.snap({ln:15, title:'Không tìm thấy',
    body:'Vòng for chạy hết ' + n + ' ô mà không gặp break. timThay vẫn false nên in "Khong tim thay". Cờ timThay giúp phân biệt với một vị trí thật.',
    note:'Cần MỘT kết quả (như tìm số) thì được dừng sớm bằng break. Không tìm thấy thì phải xét hết mảng.',
    viz:[t3Arr(arr, {st:all.st, sb:all.sb}), stat(false, -1, n)]});
  }
 }},

'dem-chan':{inputs:[],
 intro:'Đếm số chẵn trong mảng hai lần: một lần đúng, một lần có break đặt nhầm. Hãy so kết quả. Bấm "Bước tiếp".',
 lines:function(){ return [
  'int main() {',
  '  int arr[8] = {3,8,15,22,7,40,11,6};',
  '  int n = 8;',
  '  int demChan = 0;',
  '  for (int i = 0; i < n; i++) {',
  '    if (arr[i] % 2 == 0)',
  '      demChan++;',
  '  }',
  '  cout << demChan << endl;',
  '  int demSai = 0;',
  '  for (int i = 0; i < n; i++) {',
  '    if (arr[i] % 2 == 0) {',
  '      demSai++;',
  '      break;',
  '    }',
  '  }',
  '  cout << demSai << endl;',
  '  return 0;',
  '}']; },
 run:function(c){
  var arr = [3, 8, 15, 22, 7, 40, 11, 6], n = arr.length;
  var evens = []; arr.forEach(function(v, i){ if (v % 2 === 0) evens.push(i); });
  var dem = evens.length;
  var cnt = function(name, v, s){ return vAcc([{k:name, v:v, s:s}]); };
  var paint = function(upto, cut){
   var st = [], sb = [];
   for (var k = 0; k < n; k++) {
    if (cut && k > upto) { st.push('dim'); sb.push(''); }
    else if (k <= upto) { var e = arr[k] % 2 === 0; st.push(e ? 'ok' : 'no'); sb.push(e ? 'chẵn' : 'lẻ'); }
    else { st.push(''); sb.push(''); }
   }
   return {st:st, sb:sb};
  };
  var p;
  c.snap({ln:3, title:'Cách đúng: demChan = 0',
   body:'Biến đếm demChan bắt đầu từ 0. Sẽ xét lần lượt từng ô, gặp số chẵn thì cộng 1.',
   viz:[t3Arr(arr, {}), cnt('demChan', 0)]});
  p = paint(0, false);
  c.snap({ln:5, title:'i = 0: 3 là số lẻ',
   body:'3 % 2 ra 1, không phải 0 nên 3 là số lẻ, không đếm.',
   viz:[t3Arr(arr, {ptr:0, st:p.st, sb:p.sb}), cnt('demChan', 0)]});
  p = paint(1, false);
  c.snap({ln:6, title:'i = 1: 8 là số chẵn',
   body:'8 % 2 ra 0, là số chẵn nên demChan tăng thành 1. Vòng for vẫn đi tiếp.',
   viz:[t3Arr(arr, {ptr:1, st:p.st, sb:p.sb}), cnt('demChan', 1, 'hi')]});
  p = paint(n - 1, false);
  c.out(String(dem));
  c.snap({ln:8, title:'Duyệt hết 8 ô',
   body:'Các lượt còn lại gặp thêm ' + (dem - 1) + ' số chẵn (22, 40, 6). Không có break nên xét đủ cả mảng, demChan = ' + dem + '.',
   viz:[t3Arr(arr, {st:p.st, sb:p.sb}), cnt('demChan', dem, 'ok')]});
  c.snap({ln:9, title:'Cách sai: demSai = 0',
   body:'Làm lại với mảng cũ, nhưng lần này có thêm break sau khi đếm.',
   viz:[t3Arr(arr, {}), cnt('demSai', 0)]});
  p = paint(1, false);
  c.snap({ln:12, title:'i = 1: gặp số chẵn đầu tiên',
   body:'i = 0 là 3 (lẻ) nên bỏ qua. i = 1 là 8 (chẵn) nên demSai = 1.',
   viz:[t3Arr(arr, {ptr:1, st:p.st, sb:p.sb}), cnt('demSai', 1, 'hi')]});
  p = paint(1, true);
  c.snap({ln:13, title:'break: thoát vòng for',
   body:'break dừng vòng for ngay, 6 ô phía sau (các ô mờ) không được xét, dù trong đó còn các số chẵn 22, 40, 6.',
   viz:[t3Arr(arr, {ptr:1, st:p.st, sb:p.sb, note:'Ô mờ: không xét'}), cnt('demSai', 1, 'bad')]});
  c.out('1');
  c.snap({ln:16, title:'So sánh hai kết quả',
   body:'Đếm đúng được ' + dem + ', đếm có break chỉ được 1. Hãy tự hỏi trước khi viết break: bài toán cần MỘT kết quả hay kết quả TỔNG HỢP?',
   note:'Cần một kết quả (tìm số) thì được break. Cần kết quả tổng hợp (đếm, cộng tổng) thì phải duyệt hết, không break.',
   viz:[vScore([{k:'demChan (đúng)', v:dem, s:'ok'}, {k:'demSai (có break)', v:1, s:'bad'}]), t3Arr(arr, {st:p.st, sb:p.sb})]});
 }}
};
