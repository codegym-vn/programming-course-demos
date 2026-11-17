// META {"module":5,"lesson":"Bài 5.2. Nhập xuất chuỗi và trôi lệnh","activity":"Vấn Đề Trôi Lệnh (Trôi Bộ Nhớ Đệm) Và Cách Xử Lý (cin.ignore)","title":"Trôi lệnh: ký tự ↵ còn sót lại","lead":"Xem vì sao getline đọc ra chuỗi rỗng sau cin >>, và hai cách xử lý. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["khong","Không xử lý"],["ignore","cin.ignore()"],["day-du","cin.ignore(max, '\\n')"]],"codeTitle":"Mã nguồn C++","path":"xu-ly-chuoi/nhap-xuat-chuoi-va-troi-lenh/van-de-troi-lenh-troi-bo-nho-dem-va-cach-xu-ly-cin-ignore/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Bộ đệm bàn phím và các biến';

/* Mô phỏng thật việc đọc: m = 0 không xử lý, 1 cin.ignore(), 2 cin.ignore(max, '\n').
   l1 = dòng gõ cho tuoi, l2 = dòng gõ cho họ tên (chỉ dùng khi getline phải chờ). */
function b7Sim(m, l1, l2){
  var buf = l1 + '\n', pos = 0;
  while (pos < buf.length && buf.charAt(pos) === ' ') pos++;
  while (pos < buf.length && /[0-9]/.test(buf.charAt(pos))) pos++;
  var tuoi = parseInt(l1, 10);
  if (m === 1) pos++;
  if (m === 2) pos = buf.indexOf('\n', pos) + 1;
  if (pos >= buf.length) return {tuoi:tuoi, ten:l2, waited:true};
  return {tuoi:tuoi, ten:buf.slice(pos, buf.indexOf('\n', pos)), waited:false};
}
function b7Q(s){ return '"' + s + '"'; }
function b7Buf(text, o){ o = o || {}; o.title = 'Bộ đệm bàn phím'; return vInBuf(text, o); }
function b7Box(tuoi, ten, st){
  return vBoxes([{name:'tuoi', type:'int', v:tuoi, s:st && st.t}, {name:'ten', type:'string', v:ten === null ? '""' : b7Q(ten), s:st && st.n}], {frame:'main()'});
}
var B7_EXPLAIN = '␣ là dấu cách, ↵ là phím Enter. Ký tự ở dưới ▲ là ký tự sẽ được đọc kế tiếp.';
var B7_HEAD = ['int main() {', '  int tuoi;', '  string ten;', '  cout << "Nhap tuoi: ";', '  cin >> tuoi;'];
var B7_TAIL = ['  cout << "Nhap ho ten: ";', '  getline(cin, ten);', '  cout << "Tuoi: " << tuoi << endl;', '  cout << "Ho ten: ["', '       << ten << "]" << endl;', '  return 0;', '}'];

var EX = {
'khong':{inputs:[],
 intro:'Chương trình hỏi tuổi bằng cin >> rồi hỏi họ tên bằng getline. Bạn gõ 20 rồi Enter. Hãy nhìn ký tự ↵ trong bộ đệm. Bấm "Bước tiếp".',
 lines:function(){ return B7_HEAD.concat(B7_TAIL); },
 run:function(c){
  var r = b7Sim(0, '20', 'Nguyen Van An');
  c.write('Nhap tuoi: ');
  c.snap({ln:4, wait:true, title:'cin >> tuoi chờ bạn gõ',
   body:'Chương trình hỏi tuổi rồi dừng chờ. Bộ đệm bàn phím đang trống.',
   viz:[b7Buf('', {note:B7_EXPLAIN}), b7Box(null, null)]});
  c.input('20');
  c.snap({ln:4, title:'Bạn gõ 20 rồi nhấn Enter',
   body:'Bàn phím gửi vào bộ đệm 3 ký tự: 2, 0 và ↵ (phím Enter).',
   viz:[b7Buf('20\n', {pos:0}), b7Box(null, null)]});
  c.snap({ln:4, title:'cin >> tuoi lấy số 20',
   body:'cin >> chỉ lấy 20 rồi dừng, không lấy ↵. Ký tự ↵ còn nằm lại trong bộ đệm.',
   viz:[b7Buf('20\n', {pos:2, used:0, take:[0, 2], stuck:2, note:'↵ nhấp nháy: ký tự còn sót lại'}), b7Box(r.tuoi, null, {t:'new'})]});
  c.write('Nhap ho ten: ');
  c.snap({ln:5, title:'In lời nhắc họ tên',
   body:'Chương trình in lời nhắc, rồi chuẩn bị gọi getline.',
   viz:[b7Buf('20\n', {pos:2, used:2, stuck:2}), b7Box(r.tuoi, null)]});
  c.snap({ln:6, title:'getline gặp ngay ↵',
   body:'getline đọc cho tới ↵. Nó thấy ↵ ngay, nên lấy 0 ký tự, bỏ ↵ đi và xong luôn. Nó không dừng chờ bạn gõ.',
   viz:[b7Buf('20\n', {pos:3, used:2, drop:2, note:'getline lấy 0 ký tự và xé ↵'}), b7Box(r.tuoi, null, {n:'bad'})]});
  c.out('Tuoi: ' + r.tuoi);
  c.out('Ho ten: [' + r.ten + ']');
  c.snap({ln:8, title:'In kết quả',
   body:'"Tuoi: 20" hiện ngay sau lời nhắc "Nhap ho ten:" vì không có lần chờ nhập nào. Họ tên là chuỗi rỗng.',
   viz:[b7Buf('20\n', {pos:3, used:3}), b7Box(r.tuoi, null, {n:'bad'})]});
  c.snap({ln:10, title:'Xong',
   body:'Chương trình chạy hết mà bạn chưa kịp gõ họ tên.',
   note:'Sau cin >> luôn còn lại ký tự ↵ trong bộ đệm. getline gặp ↵ đó đầu tiên nên trả về chuỗi rỗng.',
   viz:[b7Buf('20\n', {pos:3, used:3}), b7Box(r.tuoi, null, {n:'bad'})]});
 }},

'ignore':{inputs:[],
 intro:'Thêm cin.ignore() giữa cin >> và getline. Thử với input gõ gọn "20", rồi input gõ thừa "20 abc". Bấm "Bước tiếp".',
 lines:function(){ return B7_HEAD.concat(['  cin.ignore();'], B7_TAIL); },
 run:function(c){
  var ok = b7Sim(1, '20', 'Nguyen Van An'), xa = b7Sim(1, '20 abc', 'Nguyen Van An');
  c.write('Nhap tuoi: '); c.input('20');
  c.snap({ln:4, title:'Input gọn: cin >> tuoi',
   body:'Bạn gõ 20 rồi Enter. cin >> lấy 20, còn lại ký tự ↵.',
   viz:[b7Buf('20\n', {pos:2, used:0, take:[0, 2], stuck:2, note:B7_EXPLAIN}), b7Box(ok.tuoi, null, {t:'new'})]});
  c.snap({ln:5, title:'cin.ignore()',
   body:'cin.ignore() bỏ đúng 1 ký tự kế tiếp. Đó chính là ↵, nên bộ đệm sạch.',
   viz:[b7Buf('20\n', {pos:3, used:2, drop:2, note:'cin.ignore() xé 1 ký tự'}), b7Box(ok.tuoi, null)]});
  c.write('Nhap ho ten: ');
  c.snap({ln:7, wait:true, title:'getline chờ bạn gõ',
   body:'Bộ đệm trống nên getline dừng chờ bạn gõ. Đây là điều ta mong muốn.',
   viz:[b7Buf('', {}), b7Box(ok.tuoi, null)]});
  c.input('Nguyen Van An');
  c.out('Tuoi: ' + ok.tuoi);
  c.out('Ho ten: [' + ok.ten + ']');
  c.snap({ln:9, title:'getline lấy cả dòng, in kết quả',
   body:'Bạn gõ họ tên, getline lấy cả dòng. Kết quả đúng.',
   viz:[b7Buf('Nguyen Van An\n', {pos:14, used:0, take:[0, 13], drop:13}), b7Box(ok.tuoi, ok.ten, {n:'ok'})]});
  c.clear();
  c.write('Nhap tuoi: '); c.input('20 abc');
  c.snap({ln:4, title:'Thử lại: gõ thừa "20 abc"',
   body:'Lần này bạn gõ thừa abc sau số 20. cin >> vẫn chỉ lấy 20; phần "␣abc↵" nằm lại.',
   viz:[b7Buf('20 abc\n', {pos:2, used:0, take:[0, 2], stuck:2}), b7Box(xa.tuoi, null, {t:'new'})]});
  c.snap({ln:5, title:'cin.ignore() chỉ bỏ 1 ký tự',
   body:'cin.ignore() chỉ bỏ được dấu cách. Chữ abc và ↵ vẫn còn trong bộ đệm.',
   viz:[b7Buf('20 abc\n', {pos:3, used:2, drop:2, note:'abc↵ vẫn còn'}), b7Box(xa.tuoi, null)]});
  c.write('Nhap ho ten: ');
  c.out('Tuoi: ' + xa.tuoi);
  c.err('Ho ten: [' + xa.ten + ']');
  c.snap({ln:9, title:'getline lấy nhầm abc',
   body:'getline thấy abc nên lấy luôn tới ↵, không chờ bạn gõ họ tên. Kết quả sai.',
   note:'cin.ignore() chỉ bỏ 1 ký tự: đủ khi chỉ còn ↵, không đủ khi người dùng gõ thừa.',
   viz:[b7Buf('20 abc\n', {pos:7, used:3, take:[3, 6], drop:6, note:'getline lấy "abc" và xé ↵'}), b7Box(xa.tuoi, xa.ten, {n:'bad'})]});
 }},

'day-du':{inputs:[],
 intro:'Cách đầy đủ: bỏ mọi ký tự cho tới hết ↵ đầu tiên. Thử với input gõ thừa "20 abc" rồi input gõ gọn "20". Bấm "Bước tiếp".',
 lines:function(){ return ['#include <limits>'].concat(B7_HEAD, ['  cin.ignore(', '    numeric_limits<streamsize>::max(),', "    '\\n');"], B7_TAIL); },
 run:function(c){
  var xa = b7Sim(2, '20 abc', 'Nguyen Van An'), ok = b7Sim(2, '20', 'Nguyen Van An');
  c.write('Nhap tuoi: '); c.input('20 abc');
  c.snap({ln:5, title:'Gõ thừa: cin >> tuoi',
   body:'Bạn gõ "20 abc" rồi Enter. cin >> lấy 20; phần "␣abc↵" nằm lại.',
   viz:[b7Buf('20 abc\n', {pos:2, used:0, take:[0, 2], stuck:2, note:B7_EXPLAIN}), b7Box(xa.tuoi, null, {t:'new'})]});
  c.snap({ln:6, title:'cin.ignore(max, \'\\n\')',
   body:'Lệnh này bỏ ký tự này đến ký tự khác (tối đa một số rất lớn) và dừng sau khi bỏ xong ↵ đầu tiên. Cả "␣abc↵" bị quét sạch.',
   viz:[b7Buf('20 abc\n', {pos:7, used:2, take:[2, 7], note:'quét tới hết ↵'}), b7Box(xa.tuoi, null)]});
  c.write('Nhap ho ten: ');
  c.snap({ln:9, wait:true, title:'getline chờ bạn gõ',
   body:'Bộ đệm trống nên getline dừng chờ, đúng như mong muốn.',
   viz:[b7Buf('', {}), b7Box(xa.tuoi, null)]});
  c.input('Nguyen Van An');
  c.out('Tuoi: ' + xa.tuoi);
  c.out('Ho ten: [' + xa.ten + ']');
  c.snap({ln:11, title:'getline lấy họ tên, in kết quả',
   body:'getline lấy đúng "Nguyen Van An". Kết quả đúng dù bạn đã gõ thừa.',
   viz:[b7Buf('Nguyen Van An\n', {pos:14, used:0, take:[0, 13], drop:13}), b7Box(xa.tuoi, xa.ten, {n:'ok'})]});
  c.clear();
  c.write('Nhap tuoi: '); c.input('20');
  c.snap({ln:6, title:'Gõ gọn "20": ignore chỉ bỏ ↵',
   body:'Khi chỉ còn ↵, cách này cũng đúng: nó bỏ ↵ rồi dừng. Một lệnh dùng được cho cả hai kiểu gõ.',
   viz:[b7Buf('20\n', {pos:3, used:2, take:[2, 3]}), b7Box(ok.tuoi, null)]});
  var cells = function(m){ var r1 = b7Sim(m, '20', 'Nguyen Van An').ten, r2 = b7Sim(m, '20 abc', 'Nguyen Van An').ten;
    return [{v:'[' + r1 + ']', s:r1 === 'Nguyen Van An' ? 'ok' : 'bad'}, {v:'[' + r2 + ']', s:r2 === 'Nguyen Van An' ? 'ok' : 'bad'}]; };
  c.snap({ln:14, title:'Xong',
   body:'Bảng cho thấy họ tên mà getline lấy được với từng cách và từng kiểu gõ.',
   note:'Trước getline, hãy dọn bằng cin.ignore(numeric_limits<streamsize>::max(), \'\\n\'). Nhớ #include <limits>.',
   viz:[vGrid([['Cách xử lý', 'Gõ "20"', 'Gõ "20 abc"'], ['Không xử lý'].concat(cells(0)), ['cin.ignore()'].concat(cells(1)), ['cin.ignore(max, \'\\n\')'].concat(cells(2))], {head:true, hiRow:3, title:'Họ tên getline nhận được'})]});
 }}
};
