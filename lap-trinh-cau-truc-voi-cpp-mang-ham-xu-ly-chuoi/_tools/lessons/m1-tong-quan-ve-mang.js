// META {"module":1,"lesson":"Bài 1.1. Khái niệm và khai báo mảng","activity":"Tổng quan về mảng trong C++","title":"Mảng: nhiều ô, một cái tên","lead":"Xem mảng gom nhiều giá trị vào một tên, chỉ số bắt đầu từ 0, và điều gì xảy ra khi đọc ngoài mảng. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["vi-sao","Vì sao cần mảng"],["chi-so","Chỉ số bắt đầu từ 0"],["ngoai","sizeof và ngoài phạm vi"]],"codeTitle":"Mã nguồn C++","path":"mang-mot-chieu/khai-niem-va-khai-bao-mang/tong-quan-ve-mang-trong-cpp/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Mảng: dải ô liền nhau, có chỉ số';

/* hàm phụ của bài (tiền tố t1) */
function t1Arr(vals, o){
  o = o || {};
  var items = vals.map(function(v, i){ return {v:v, s:(o.s && o.s[i]) || '', sub:(o.sub && o.sub[i]) || ''}; });
  var opt = {name:o.name, ptr:o.ptr, ptrLabel:o.ptrLabel, out:o.out, outV:o.outV, outHi:o.outHi, bytes:o.bytes, note:o.note, title:o.title};
  return vArray(items, opt);
}

var EX = {
'vi-sao':{inputs:[],
 intro:'Cần lưu điểm của 5 học sinh. Hãy xem dùng 5 biến rời và dùng một mảng khác nhau thế nào. Bấm "Bước tiếp".',
 lines:function(){ return [
  'int main() {',
  '  int diem1 = 8, diem2 = 9;',
  '  int diem3 = 7, diem4 = 10;',
  '  int diem5 = 6;',
  '  int diem[5] = {8, 9, 7, 10, 6};',
  '  for (int i = 0; i < 5; i++) {',
  '    cout << diem[i] << " ";',
  '  }',
  '  return 0;',
  '}']; },
 run:function(c){
  var vals = [8, 9, 7, 10, 6];
  var loose = function(s){ return vBoxes(vals.map(function(v, i){ return {name:'diem' + (i + 1), type:'int', v:v, s:s}; }), {frame:'5 biến, 5 cái tên khác nhau'}); };
  c.snap({ln:1, title:'Năm biến rời',
   body:'Mỗi học sinh một biến, mỗi biến một cái tên riêng. Với 5 học sinh thì còn xoay xở được.',
   viz:loose('new')});
  c.snap({ln:4, title:'Một mảng thay cho năm biến',
   body:'Mảng diem gom 5 số nguyên vào một dãy ô liền nhau dưới một cái tên. Mỗi ô có số thứ tự riêng gọi là chỉ số, đếm từ 0.',
   viz:t1Arr(vals, {name:'diem', s:['new','new','new','new','new'], sub:['phần tử thứ 1']})});
  var shown = '';
  vals.forEach(function(v){ shown += v + ' '; });
  c.out(shown.trim());
  c.snap({ln:6, title:'Dùng for để in cả mảng',
   body:'Vòng for cho i chạy từ 0 đến 4 và in diem[i]. Chỉ cần một lệnh cout, i đổi thì ô được lấy cũng đổi.',
   viz:t1Arr(vals, {name:'diem', s:['ok','ok','ok','ok','ok']})});
  [50, 500].forEach(function(N, k){
   var last = k === 1;
   c.snap({ln:5, title:'Nếu có ' + N + ' học sinh',
    body:'Biến rời: phải đặt ' + N + ' cái tên và viết ' + N + ' chỗ trong lệnh in. Mảng: vẫn một tên diem, vòng for chỉ cần đổi số 5 thành ' + N + '.',
    note:last ? 'Mảng = nhiều ô cùng kiểu dưới một tên, truy cập từng ô bằng chỉ số. Nhờ vậy có thể xử lý hàng loạt bằng vòng lặp.' : undefined,
    viz:vGrid([['', 'Biến rời', 'Mảng'],
     ['Số tên phải đặt', {v:N, s:'bad'}, {v:1, s:'ok'}],
     ['Chỗ viết trong lệnh in', {v:N, s:'bad'}, {v:'1 (diem[i])', s:'ok'}],
     ['Vòng for', '(không dùng được)', 'for (i = 0; i < ' + N + '; i++)']], {head:true, title:'So sánh khi có ' + N + ' học sinh'})});
  });
 }},

'chi-so':{inputs:[],
 intro:'Mảng diem có 5 ô. Hãy để ý ô đầu tiên có chỉ số mấy, và ô cuối cùng có chỉ số mấy. Bấm "Bước tiếp".',
 lines:function(){ return [
  'int main() {',
  '  int diem[5];',
  '  diem[0] = 8;',
  '  diem[4] = 6;',
  '  cout << diem[0] << endl;',
  '  cout << diem[4] << endl;',
  '  int a[5] = {1, 2};',
  '  return 0;',
  '}']; },
 run:function(c){
  var d = [null, null, null, null, null];
  c.snap({ln:1, title:'int diem[5];',
   body:'Máy cấp 5 ô liền nhau cho mảng diem, chỉ số từ 0 đến 4. Chưa gán gì nên mỗi ô chứa số không xác định (rác), hiện dấu ?.',
   viz:t1Arr(d, {name:'diem', s:['new','new','new','new','new'], sub:['ô đầu tiên']})});
  d[0] = 8;
  c.snap({ln:2, title:'diem[0] = 8;',
   body:'diem[0] là ô đầu tiên (chỉ số 0), không phải diem[1]. Các ô khác vẫn là ?.',
   viz:t1Arr(d, {name:'diem', ptr:0, ptrLabel:'[0]', s:['hi']})});
  d[4] = 6;
  c.snap({ln:3, title:'diem[4] = 6;',
   body:'Mảng có 5 ô nên ô cuối cùng là diem[4]. Ba ô giữa vẫn chưa có giá trị.',
   viz:t1Arr(d, {name:'diem', ptr:4, ptrLabel:'[4]', s:['', '', '', '', 'hi'], sub:['', '', '', '', 'ô cuối = n - 1'], note:'5 phần tử thì chỉ số hợp lệ là 0 đến 4.'})});
  c.out(String(d[0]));
  c.snap({ln:4, title:'In diem[0]',
   body:'Đọc ô chỉ số 0 ra được 8.',
   viz:t1Arr(d, {name:'diem', ptr:0, ptrLabel:'[0]', s:['ok']})});
  c.out(String(d[4]));
  c.snap({ln:5, title:'In diem[4]',
   body:'Đọc ô chỉ số 4 (ô cuối) ra được 6.',
   viz:t1Arr(d, {name:'diem', ptr:4, ptrLabel:'[4]', s:['', '', '', '', 'ok']})});
  var a = [1, 2, 0, 0, 0];
  c.snap({ln:6, title:'int a[5] = {1, 2};',
   body:'Khi có khởi tạo, ô nào không được ghi giá trị sẽ tự bằng 0, không còn là rác. Mảng khai báo mà không khởi tạo như diem thì ngược lại.',
   note:'Chỉ số bắt đầu từ 0, phần tử cuối là arr[n - 1]. Khai báo không khởi tạo thì ô chứa rác; có khởi tạo một phần thì ô còn lại bằng 0.',
   viz:[t1Arr(d, {name:'diem', s:['', '', '', '', '']}), t1Arr(a, {name:'a', s:['new', 'new', 'new', 'new', 'new']})]});
 }},

'ngoai':{inputs:[],
 intro:'Máy đếm giúp số phần tử bằng sizeof, rồi thử đọc một ô không thuộc mảng. Bấm "Bước tiếp".',
 lines:function(){ return [
  'int main() {',
  '  int arr[5] = {10, 20, 30, 40, 50};',
  '  int n = sizeof(arr)/sizeof(arr[0]);',
  '  cout << n << endl;',
  '  cout << arr[4] << endl;',
  '  cout << arr[5] << endl;',
  '  return 0;',
  '}']; },
 run:function(c){
  var arr = [10, 20, 30, 40, 50], BYTE = 4;
  var whole = arr.length * BYTE, one = BYTE, n = whole / one;
  var JUNK = '1';
  c.snap({ln:1, title:'Khai báo mảng 5 số',
   body:'Mảng arr có 5 ô, ô cuối là arr[4].',
   viz:t1Arr(arr, {name:'arr', s:['new', 'new', 'new', 'new', 'new']})});
  c.snap({ln:2, title:'Đếm số phần tử bằng sizeof',
   body:'sizeof cho biết số byte. Mỗi int chiếm ' + one + ' byte (thường gặp), cả mảng chiếm ' + whole + ' byte. Lấy ' + whole + ' chia ' + one + ' ra số phần tử. Cách này chỉ đúng với mảng thật ngay trong hàm đang viết.',
   viz:[t1Arr(arr, {name:'arr', bytes:BYTE}), vAcc([{k:'sizeof(arr)', v:whole + ' byte'}, {k:'sizeof(arr[0])', v:one + ' byte'}, {k:'n', v:n, op:whole + ' / ' + one + ' = ' + n, s:'ok'}])]});
  c.out(String(n));
  c.snap({ln:3, title:'In n',
   body:'Máy tự tính ra ' + n + ' phần tử mà không cần đếm tay.',
   viz:t1Arr(arr, {name:'arr', bytes:BYTE})});
  c.out(String(arr[4]));
  c.snap({ln:4, title:'In arr[4]',
   body:'arr[4] là ô cuối, hợp lệ, ra ' + arr[4] + '.',
   viz:t1Arr(arr, {name:'arr', ptr:4, ptrLabel:'[4]', s:['', '', '', '', 'ok']})});
  c.out(JUNK);
  c.snap({ln:5, title:'In arr[5] (ngoài mảng)',
   body:'arr[5] nằm sau ô cuối, không thuộc mảng. C++ không kiểm tra nên vẫn đọc vùng nhớ bên cạnh và ra một số rác. Số ' + JUNK + ' ở đây chỉ là ví dụ.',
   viz:t1Arr(arr, {name:'arr', out:1, outV:'?', outHi:true, ptrLabel:'[5]'})});
  c.snap({ln:6, title:'Xong',
   body:'Đây không phải lỗi biên dịch (nhiều trình biên dịch chỉ cảnh báo, có nơi không báo gì), chương trình vẫn chạy. Nhưng kết quả không đáng tin, lần chạy khác hoặc máy khác có thể ra số khác.',
   note:'Chỉ số hợp lệ là 0 đến n - 1. Đọc hay ghi ngoài mảng là hành vi không xác định: có thể ra số rác, làm hỏng biến khác hoặc dừng chương trình. Người viết phải tự giữ chỉ số trong phạm vi.',
   viz:[t1Arr(arr, {name:'arr', out:1, outV:'?', outHi:true, ptrLabel:'[5]'}), vCard({kind:'warn', title:'Hành vi không xác định', sub:'C++ không kiểm tra chỉ số giúp bạn'})]});
 }}
};
