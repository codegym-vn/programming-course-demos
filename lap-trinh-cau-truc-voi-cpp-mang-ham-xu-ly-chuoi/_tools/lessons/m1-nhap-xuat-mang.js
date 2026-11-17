// META {"module":1,"lesson":"Bài 1.2. Nhập – xuất mảng","activity":"Thao tác nhập - xuất mảng trong C++","title":"Nhập và xuất mảng bằng vòng for","lead":"Xem biến đếm i của vòng for trùng với chỉ số của mảng, mảng dùng bao nhiêu ô, và lỗi chạy dư một lượt. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["nhap-xuat","Nhập rồi xuất bằng hai vòng for"],["n-dong","Mảng khai báo dư, dùng n ô"],["loi","Lỗi: dùng <= n"]],"codeTitle":"Mã nguồn C++","path":"mang-mot-chieu/nhap-xuat-mang/thao-tac-nhap-xuat-mang-trong-cpp/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Bàn phím và mảng';

/* hàm phụ của bài (tiền tố t2) */
function t2Arr(vals, o){
  o = o || {};
  var items = vals.map(function(v, i){ return {v:v, s:(o.s && o.s[i]) || '', sub:(o.sub && o.sub[i]) || ''}; });
  return vArray(items, {name:o.name || 'diem', ptr:o.ptr, ptrLabel:o.ptrLabel || 'i', out:o.out, outV:o.outV, outHi:o.outHi, note:o.note});
}

var EX = {
'nhap-xuat':{inputs:[],
 intro:'Một vòng for nhập 5 điểm vào mảng, một vòng for khác in chúng ra. Hãy nhìn biến i và chỉ số ô. Bấm "Bước tiếp".',
 lines:function(){ return [
  'int main() {',
  '  int n = 5;',
  '  int diem[5];',
  '  for (int i = 0; i < n; i++) {',
  '    cout << "Diem " << i + 1 << ": ";',
  '    cin >> diem[i];',
  '  }',
  '  for (int i = 0; i < n; i++) {',
  '    cout << diem[i] << " ";',
  '  }',
  '  return 0;',
  '}']; },
 run:function(c){
  var TXT = '8 9 7 10 6\n', vals = [8, 9, 7, 10, 6], n = 5, d = [null, null, null, null, null];
  var tok = [[0, 1], [2, 3], [4, 5], [6, 8], [9, 10]];
  var buf = function(k, taking){ return vInBuf(TXT, {title:'Bộ đệm bàn phím (số người dùng gõ)', pos:tok[k] ? (taking ? tok[k][1] : tok[k][0]) : TXT.length, used:tok[k] ? tok[k][0] : 9, take:taking && tok[k] ? tok[k] : undefined}); };
  c.snap({ln:2, title:'Mảng diem có 5 ô',
   body:'n = 5 là số điểm cần nhập. Mảng diem có 5 ô, chưa có giá trị. Người dùng sẽ gõ 8 9 7 10 6.',
   viz:[vInBuf(TXT, {title:'Bộ đệm bàn phím (số người dùng gõ)', pos:0}), t2Arr(d, {s:['new', 'new', 'new', 'new', 'new']})]});
  vals.forEach(function(v, i){
   d[i] = v;
   c.write('Diem ' + (i + 1) + ': '); c.input(String(v));
   var st = []; for (var j = 0; j < n; j++) st.push(j < i ? 'ok' : (j === i ? 'hi' : ''));
   c.snap({ln:5, title:'Lượt i = ' + i + ': cin >> diem[' + i + ']',
    body:'cin lấy số ' + v + ' từ bàn phím bỏ vào ô diem[' + i + ']. Biến i và chỉ số ô luôn bằng nhau.',
    viz:[buf(i, true), t2Arr(d, {ptr:i, s:st})]});
  });
  c.snap({ln:3, title:'i = 5: dừng vòng nhập',
   body:'Điều kiện 5 < 5 sai nên vòng for thoát. i đã chạy 0, 1, 2, 3, 4: đúng bằng các chỉ số hợp lệ của mảng.',
   viz:[vInBuf(TXT, {title:'Bộ đệm bàn phím (số người dùng gõ)', pos:9, used:10}), t2Arr(d, {s:['ok', 'ok', 'ok', 'ok', 'ok']})]});
  c.out(vals.join(' '));
  c.snap({ln:8, title:'Vòng for thứ hai: in mảng',
   body:'Vòng này chạy lại i từ 0 đến 4, lần này cout lấy giá trị trong ô diem[i] ra màn hình.',
   note:'Mảng n phần tử: for (i = 0; i < n; i++). Một vòng để nhập, một vòng để xuất; i chạy đúng 0 đến n - 1.',
   viz:t2Arr(d, {s:['ok', 'ok', 'ok', 'ok', 'ok']})});
 }},

'n-dong':{inputs:[],
 intro:'Mảng khai báo 100 ô, nhưng chỉ nhập 3 điểm. Vòng for phải dùng n, không dùng 100. Bấm "Bước tiếp".',
 lines:function(){ return [
  'int main() {',
  '  int diem[100];',
  '  int n;',
  '  cout << "So hoc sinh: ";',
  '  cin >> n;',
  '  for (int i = 0; i < n; i++)',
  '    cin >> diem[i];',
  '  for (int i = 0; i < n; i++)',
  '    cout << diem[i] << " ";',
  '  return 0;',
  '}']; },
 run:function(c){
  var vals = [7, 8, 9], n = vals.length, d = [null, null, null, null, null, null];
  var NOTE = 'Chỉ vẽ 6 ô đầu trong 100 ô.';
  var mk = function(upTo, hiIdx, ptr){
   var s = [], sub = [];
   for (var j = 0; j < d.length; j++) {
    s.push(upTo === null ? '' : (j < n ? (j === hiIdx ? 'hi' : (j < upTo ? 'ok' : '')) : 'dim'));
    sub.push(upTo !== null && j >= n ? 'chưa dùng' : '');
   }
   return t2Arr(d, {name:'diem[100]', ptr:ptr, s:s, sub:sub, note:NOTE});
  };
  var nbox = function(v, s){ return vAcc([{k:'n', v:v, s:s}]); };
  c.snap({ln:1, title:'int diem[100];',
   body:'Máy cấp sẵn 100 ô, đủ chỗ cho lớp đông nhất. Chưa ô nào có giá trị.',
   viz:t2Arr(d, {name:'diem[100]', s:['new', 'new', 'new', 'new', 'new', 'new'], note:NOTE})});
  c.write('So hoc sinh: '); c.input(String(n));
  c.snap({ln:4, title:'cin >> n;',
   body:'Người dùng gõ 3, nên n = 3. Chỉ 3 ô đầu sẽ được dùng, các ô còn lại để yên.',
   viz:[nbox(n, 'new'), mk(0, -1)]});
  vals.forEach(function(v, i){
   d[i] = v; c.input(String(v));
   c.snap({ln:6, title:'Lượt i = ' + i + ': cin >> diem[' + i + ']',
    body:'Số ' + v + ' vào ô diem[' + i + '].',
    viz:[nbox(n), mk(i + 1, i, i)]});
  });
  c.snap({ln:5, title:'i = 3: dừng nhập',
   body:'Điều kiện 3 < n (n = 3) sai nên vòng for dừng. Điều kiện dừng là n, không phải 100.',
   viz:[nbox(n), mk(n, -1)]});
  c.out(vals.join(' '));
  c.snap({ln:8, title:'In ra n số',
   body:'Vòng xuất cũng chạy đến n. Nếu lặp đến 100 thì sẽ in cả những ô chưa từng gán, toàn số rác.',
   note:'Khai báo mảng đủ lớn, rồi dùng n để quyết định số ô thật sự dùng. Điều kiện dừng của vòng for là n.',
   viz:[nbox(n), mk(n, -1)]});
 }},

'loi':{inputs:[],
 intro:'Chỉ đổi một dấu: i < n thành i <= n. Xem điều gì xảy ra với mảng 5 ô. Bấm "Bước tiếp".',
 lines:function(){ return [
  'int main() {',
  '  int n = 5;',
  '  int diem[5];',
  '  for (int i = 0; i <= n; i++) {',
  '    cin >> diem[i];',
  '  }',
  '  return 0;',
  '}']; },
 run:function(c){
  var d = [null, null, null, null, null], n = 5;
  var rows = [];
  var tr = function(){ return vTrace(['i', 'i <= n', 'ô được dùng'], rows, {title:'Các lượt của vòng for'}); };
  c.snap({ln:2, title:'Mảng 5 ô, chỉ số 0 đến 4',
   body:'n = 5. Chỉ số hợp lệ cuối cùng là 4. Nhưng điều kiện i <= n cho i chạy tới cả 5.',
   viz:t2Arr(d, {s:['new', 'new', 'new', 'new', 'new']})});
  for (var i = 0; i < n; i++) { d[i] = i + 1; rows.push([String(i), {v:i + ' <= ' + n, s:'ok'}, 'diem[' + i + ']']); c.input(String(i + 1)); }
  c.snap({ln:4, title:'i = 0 đến 4: vẫn ổn',
   body:'Năm lượt đầu giống hệt trước: các số 1 đến 5 vào diem[0] đến diem[4].',
   viz:[t2Arr(d, {s:['ok', 'ok', 'ok', 'ok', 'ok']}), tr()]});
  rows.push(['5', {v:'5 <= 5', s:'ok'}, {v:'diem[5]', s:'bad'}]);
  c.snap({ln:3, title:'i = 5: vòng chạy dư',
   body:'5 <= 5 vẫn đúng nên vòng lặp chạy thêm lượt thứ 6. i = 5 là chỉ số không thuộc mảng.',
   viz:[t2Arr(d, {s:['ok', 'ok', 'ok', 'ok', 'ok'], out:1, outV:'?', outHi:true}), tr()]});
  c.input('6');
  c.snap({ln:4, title:'cin >> diem[5]',
   body:'Số 6 bị ghi vào ô ngoài mảng, không có lỗi biên dịch nào. Đây là hành vi không xác định: có thể ghi đè biến khác (như chính i hoặc n) hoặc làm chương trình dừng.',
   viz:[t2Arr(d, {s:['ok', 'ok', 'ok', 'ok', 'ok'], out:1, outV:'6', outHi:true}), tr()]});
  c.snap({ln:3, title:'Xong',
   body:'Vòng lặp chạy 6 lượt thay vì 5. Sửa lại thành i < n thì chỉ chạy i = 0 đến 4.',
   note:'Mảng n phần tử thì dùng i < n. Dùng i <= n làm vòng lặp chạy dư một lượt và ghi ra ngoài mảng; trình biên dịch thường không báo lỗi.',
   viz:[t2Arr(d, {s:['ok', 'ok', 'ok', 'ok', 'ok'], out:1, outV:'6', outHi:true}), vCard({kind:'warn', title:'i <= n chạy dư 1 lượt', sub:'Đúng phải là i < n'})]});
 }}
};
