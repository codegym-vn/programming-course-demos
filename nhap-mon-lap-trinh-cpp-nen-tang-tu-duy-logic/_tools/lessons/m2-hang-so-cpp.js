// META {"module":2,"lesson":"Bài 2.2. Hằng số","activity":"Hằng Số Trong C++","title":"#define và const khác nhau thế nào?","lead":"Hai cột chạy song song: cột trái dùng #define, cột phải dùng const. Chọn tình huống rồi bấm <b>Bước tiếp</b>.","tabs":[["coche","Cơ chế: tìm-thay vs ổ khóa"],["bay","Bẫy dấu ; sau #define"],["thue","Đổi thuế 8% → 10%"]],"codeTitle":"Mã nguồn C++","path":"bien-kieu-du-lieu-va-toan-tu/hang-so/hang-so-trong-cpp/index.html"}
/* Hàm phụ dùng tiền tố b7 */
function b7Mem(list, frame){ return vBoxes(list, {frame:frame, empty:'Chưa có biến nào.'}); }
function b7Txt(lines, title){ return vText(lines, {title:title, noNo:true}); }
function b7Pair(a, b){ return [a, b]; }
function b7Seg(parts){ return {seg:parts}; }

var EX = {
coche:{
 intro:'Cả hai cột cùng tính chu vi hình tròn bằng PI. Cột trái dùng #define, cột phải dùng const. Bấm "Bước tiếp".',
 running:'Quan sát: cột trái PI chỉ là chữ được thay thế, cột phải PI là một biến có khóa.',
 done:'#define chỉ thay văn bản trước khi dịch nên PI biến mất khỏi chương trình và lỗi hiện ra khó hiểu. const tạo biến chỉ đọc có kiểu double nên lỗi nêu đích danh PI.',
 note:'#define chỉ thay văn bản, không có kiểu. const tạo biến chỉ đọc, được trình biên dịch kiểm tra nên lỗi rõ hơn.',
 cols:[
 {title:'#define PI 3.14', sub:'Thay văn bản trước khi dịch.',
  lines:['#define PI 3.14','int main() {','  double r = 5;','  double chuVi = 2 * PI * r;','  PI = 3.2;','}'],
  run:function(c){
   var pre1 = b7Seg([{t:'double chuVi = 2 * '}, {t:'PI', s:'hi'}, {t:' * r;'}]);
   var pre2 = b7Seg([{t:'double chuVi = 2 * '}, {t:'3.14', s:'hi'}, {t:' * r;'}]);
   c.snap({ln:0, dim:[4], dimLabel:'thêm ở bước sau', title:'#define chỉ là lời dặn',
    body:'Dòng này không tạo biến nào cả. Nó dặn bước tiền xử lý: gặp chữ PI thì thay bằng 3.14.',
    viz:[b7Mem([], 'Bộ nhớ (RAM) · main()')]});
   c.snap({ln:2, dim:[4], dimLabel:'thêm ở bước sau', title:'double r = 5',
    body:'Chỉ có r là biến. Chưa có hộp nào tên PI.',
    viz:[b7Mem([{name:'r', type:'double', v:5, s:'new'}], 'Bộ nhớ (RAM) · main()')]});
   c.snap({ln:3, dim:[4], dimLabel:'thêm ở bước sau', title:'Tiền xử lý: tìm và thay',
    body:'Trước khi g++ dịch, máy tìm mọi chữ PI trong code và dán đè bằng chữ 3.14.',
    viz:[b7Pair(b7Txt([pre1], 'Trước'), b7Txt([pre2], 'Sau khi thay'), {mid:'→'}), b7Mem([{name:'r', type:'double', v:5}], 'Bộ nhớ (RAM) · main()')]});
   c.snap({ln:3, dim:[4], dimLabel:'thêm ở bước sau', title:'g++ chỉ thấy 3.14',
    body:'Tên PI đã biến mất khỏi code. Chu vi 2 * 3.14 * 5 = 31.4, nhưng trong bộ nhớ không có hộp nào tên PI.',
    viz:[b7Txt([pre2], 'Code mà g++ nhận được'), b7Mem([{name:'r', type:'double', v:5}, {name:'chuVi', type:'double', v:31.4, s:'new'}], 'Bộ nhớ (RAM) · main()')]});
   c.err("error: lvalue required as left operand of assignment");
   c.snap({ln:4, title:'Thêm dòng PI = 3.2;',
    body:'Sau khi thay chữ, dòng này thành 3.14 = 3.2; Lỗi báo về "lvalue", khó hiểu với người mới.',
    viz:[b7Pair(b7Txt([b7Seg([{t:'PI', s:'hi'}, {t:' = 3.2;'}])], 'Bạn viết'), b7Txt([b7Seg([{t:'3.14', s:'hi'}, {t:' = 3.2;'}])], 'Sau khi thay'), {mid:'→'}),
     vCard({kind:'err', title:'Lỗi biên dịch', sub:"lvalue required as left operand of assignment", tip:'Không nhắc tới PI vì chữ PI đã bị thay mất.'})]});
   c.snap({ln:5, title:'Xong',
    body:'#define chỉ làm việc với văn bản. Muốn lỗi rõ ràng và có kiểu dữ liệu, hãy xem cột const.',
    viz:[vCard({kind:'err', title:'Không biên dịch được', sub:'Lỗi nằm ở phép gán vào một con số.'})]});
  }},
 {title:'const double PI = 3.14', sub:'Biến chỉ đọc, có kiểu.',
  lines:['const double PI = 3.14;','int main() {','  double r = 5;','  double chuVi = 2 * PI * r;','  PI = 3.2;','}'],
  run:function(c){
   var PIb = function(s){ return {name:'PI', type:'double', v:3.14, konst:true, s:s}; };
   var fr = 'Bộ nhớ (RAM)';
   c.snap({ln:0, dim:[4], dimLabel:'thêm ở bước sau', title:'Tạo hộp PI có ổ khóa',
    body:'Máy tạo một biến thật, kiểu double, giá trị 3.14 và khóa lại bằng const.',
    viz:[b7Mem([PIb('new')], fr)]});
   c.snap({ln:2, dim:[4], dimLabel:'thêm ở bước sau', title:'double r = 5',
    body:'Thêm biến r. PI vẫn nằm trong bộ nhớ, có tên và có kiểu.',
    viz:[b7Mem([PIb(), {name:'r', type:'double', v:5, s:'new'}], fr)]});
   c.snap({ln:3, dim:[4], dimLabel:'thêm ở bước sau', title:'Đọc PI trong công thức',
    body:'Công thức vẫn mang chữ PI. Máy đọc giá trị trong hộp PI để tính, không cần thay văn bản.',
    viz:[b7Mem([PIb('hi'), {name:'r', type:'double', v:5}], fr)]});
   c.snap({ln:3, dim:[4], dimLabel:'thêm ở bước sau', title:'chuVi = 2 * PI * r',
    body:'2 * 3.14 * 5 = 31.4. PI vẫn hiện trong bộ nhớ, chương trình dễ theo dõi hơn.',
    viz:[b7Mem([PIb(), {name:'r', type:'double', v:5}, {name:'chuVi', type:'double', v:31.4, s:'new'}], fr)]});
   c.err("error: assignment of read-only variable 'PI'");
   c.snap({ln:4, title:'Thêm dòng PI = 3.2;',
    body:'Ổ khóa rung lên. Trình biên dịch từ chối ngay và gọi đích danh PI là biến chỉ đọc.',
    viz:[b7Mem([{name:'PI', type:'double', v:3.14, konst:true, s:'bad'}], fr),
     vCard({kind:'err', title:'Lỗi biên dịch', sub:"assignment of read-only variable 'PI'", tip:'Nêu rõ tên PI và lý do: chỉ đọc.'})]});
   c.snap({ln:5, title:'Xong',
    body:'const cho thông báo lỗi dễ hiểu, và PI luôn là một biến có kiểu double.',
    viz:[vCard({kind:'err', title:'Không biên dịch được', sub:'Lỗi nằm ở phép gán vào biến chỉ đọc.'})]});
  }}
 ]},

bay:{
 intro:'Cột trái viết nhầm dấu ; sau #define, cột phải viết đúng. Bấm "Bước tiếp" để xem lỗi hiện ở đâu.',
 running:'Quan sát: dấu ; bị dán theo PI vào mọi chỗ dùng.',
 done:'Dấu ; thừa không gây lỗi ở dòng #define. Nó bị dán vào dòng dùng PI nên lỗi báo ở dòng dùng PI, rất khó đoán.',
 note:'Sau #define không có dấu =, không có dấu ;. Dấu ; thừa bị thay vào mọi chỗ dùng tên.',
 cols:[
 {title:'#define PI 3.14;  (thừa ;)', sub:'Dấu ; thành một phần của nội dung thay thế.',
  lines:['#define PI 3.14;','int main() {','  double r = 5;','  double chuVi = 2 * PI * r;','  return 0;','}'],
  run:function(c){
   c.snap({ln:0, title:'PI được định nghĩa là 3.14;',
    body:'Mọi thứ sau chữ PI đều là nội dung thay thế, kể cả dấu ; ở cuối dòng.',
    viz:[vChips([{t:'PI', s:'hi', label:'tên'}, {t:'3.14;', s:'bad', label:'thay bằng (có dấu ;)'}], {title:'Quy tắc thay thế'})]});
   var after = b7Seg([{t:'double chuVi = 2 * '}, {t:'3.14;', s:'bad'}, {t:' * r;'}]);
   c.snap({ln:3, title:'Tiền xử lý: tìm và thay',
    body:'Dòng chuVi trở thành 2 * 3.14; * r; Dấu ; chen vào giữa công thức.',
    viz:[b7Pair(b7Txt([b7Seg([{t:'double chuVi = 2 * '}, {t:'PI', s:'hi'}, {t:' * r;'}])], 'Bạn viết'), b7Txt([after], 'Sau khi thay'), {mid:'→'})]});
   c.err("error: invalid type argument of unary '*' (have 'double')");
   c.snap({ln:3, title:'g++ báo lỗi ở dòng 4',
    body:'g++ đọc "double chuVi = 2 * 3.14;" rồi gặp "* r;" như một câu lệnh mới và không hiểu. Lỗi hiện ở dòng dùng PI, không phải dòng #define.',
    viz:[vCard({kind:'err', title:'Lỗi ở dòng 4, không phải dòng 1', sub:"invalid type argument of unary '*' (have 'double')", tip:'Dòng 1 trông hoàn toàn bình thường.'})]});
   c.snap({ln:5, title:'Xong',
    body:'Thấy lỗi ở dòng 4 mà dòng 4 viết đúng. Nguyên nhân thật nằm ở dấu ; thừa trên dòng 1.',
    viz:[vCard({kind:'err', title:'Không biên dịch được', sub:'Nguyên nhân: dấu ; thừa sau #define.'})]});
  }},
 {title:'#define PI 3.14  (đúng)', sub:'Không có dấu ; ở cuối.',
  lines:['#define PI 3.14','int main() {','  double r = 5;','  double chuVi = 2 * PI * r;','  return 0;','}'],
  run:function(c){
   c.snap({ln:0, title:'PI được định nghĩa là 3.14',
    body:'Nội dung thay thế chỉ là 3.14, không kèm dấu ; nào.',
    viz:[vChips([{t:'PI', s:'hi', label:'tên'}, {t:'3.14', s:'ok', label:'thay bằng'}], {title:'Quy tắc thay thế'})]});
   var after = b7Seg([{t:'double chuVi = 2 * '}, {t:'3.14', s:'ok'}, {t:' * r;'}]);
   c.snap({ln:3, title:'Tiền xử lý: tìm và thay',
    body:'Dòng chuVi trở thành 2 * 3.14 * r; là một công thức bình thường.',
    viz:[b7Pair(b7Txt([b7Seg([{t:'double chuVi = 2 * '}, {t:'PI', s:'hi'}, {t:' * r;'}])], 'Bạn viết'), b7Txt([after], 'Sau khi thay'), {mid:'→'})]});
   c.snap({ln:3, title:'g++ dịch được',
    body:'Công thức hợp lệ nên chương trình biên dịch bình thường. chuVi = 2 * 3.14 * 5 = 31.4.',
    viz:[vCard({kind:'ok', title:'Biên dịch thành công', sub:'chuVi = 31.4'}), b7Mem([{name:'r', type:'double', v:5}, {name:'chuVi', type:'double', v:31.4, s:'new'}], 'Bộ nhớ (RAM) · main()')]});
   c.snap({ln:5, title:'Xong',
    body:'Sau #define không viết dấu ;. Còn khai báo const thì lại cần dấu ; như mọi câu lệnh C++.',
    viz:[vCard({kind:'ok', title:'Chạy đúng', sub:'#define không có dấu ; ở cuối.'})]});
  }}
 ]},

thue:{
 intro:'Thuế VAT tăng từ 8% lên 10%. Bấm "Bước tiếp" để đếm xem mỗi cách phải sửa bao nhiêu chỗ.',
 running:'Quan sát số chỗ phải sửa ở mỗi cột.',
 done:'Dùng số 0.08 trực tiếp: phải sửa cả 4 chỗ, bỏ sót một chỗ là sai tiền. Dùng const THUE_VAT: sửa 1 chỗ, mọi dòng tự dùng thuế mới.',
 note:'Đặt tên cho hằng số thay cho "magic number": sửa một nơi duy nhất, ít sai sót.',
 cols:[
 {title:'Dùng số 0.08 trực tiếp', sub:'Con số lặp ở nhiều chỗ.',
  lines:['double giaA = 100000 * (1 + 0.08);','double giaB = 250000 * (1 + 0.08);','double giaC = 400000 * (1 + 0.08);','double giaD = 650000 * (1 + 0.08);'],
  run:function(c){
   var names = ['giaA', 'giaB', 'giaC', 'giaD'];
   function cells(nDone, hi){
    return vCells(names.map(function(n, i){ return {v:i < nDone ? '0.10' : '0.08', sub:n, s:i < nDone ? 'ok' : (i === hi ? 'hi' : null)}; }), {name:'Các chỗ có số thuế', idx:false});
   }
   function cnt(n){ return vScore([{k:'Số chỗ đã sửa', v:n + ' / 4', s:n === 4 ? 'ok' : null}]); }
   c.snap({ln:-1, title:'Số 0.08 nằm ở 4 chỗ',
    body:'Mỗi dòng tính giá đều viết thẳng 0.08. Con số này không có tên nên phải đọc cả dòng mới biết đó là thuế.',
    viz:[cells(0, -1), cnt(0)]});
   for (var k = 0; k < 4; k++) {
    c.snap({ln:k, title:'Sửa chỗ thứ ' + (k + 1) + ': ' + names[k],
     body:'Đổi 0.08 thành 0.10 ở dòng ' + names[k] + '.' + (k < 3 ? ' Còn ' + (3 - k) + ' chỗ nữa.' : ' Đủ cả 4 chỗ.'),
     viz:[cells(k + 1, -1), cnt(k + 1)]});
   }
   c.snap({ln:3, title:'Xong', body:'Mất 4 lần sửa. Chương trình thật có thể có hàng chục chỗ như vậy, bỏ sót một chỗ là sai.',
    viz:[cells(4, -1), cnt(4)]});
  }},
 {title:'Dùng const THUE_VAT', sub:'Một tên, một nơi sửa.',
  lines:['const double THUE_VAT = 0.08;','double giaA = 100000 * (1 + THUE_VAT);','double giaB = 250000 * (1 + THUE_VAT);','double giaC = 400000 * (1 + THUE_VAT);','double giaD = 650000 * (1 + THUE_VAT);'],
  run:function(c){
   var base = [100000, 250000, 400000, 650000], names = ['giaA', 'giaB', 'giaC', 'giaD'], thue = 0.08;
   function gia(i){ return Math.round(base[i] * (1 + thue)); }
   function mem(n){
    var b = [{name:'THUE_VAT', type:'double', v:thue.toFixed(2), konst:true}];
    for (var i = 0; i < n; i++) b.push({name:names[i], type:'double', v:gia(i)});
    return b;
   }
   function cnt(n){ return vScore([{k:'Số chỗ đã sửa', v:n + ' / 1', s:n === 1 ? 'ok' : null}]); }
   var fr = 'Bộ nhớ (RAM)';
   c.snap({ln:0, title:'Khai báo hằng THUE_VAT', body:'Con số thuế được đặt một cái tên và ghi ở đúng một nơi.',
    viz:[b7Mem([{name:'THUE_VAT', type:'double', v:'0.08', konst:true, s:'new'}], fr), cnt(0)]});
   thue = 0.1;
   c.snap({ln:0, title:'Sửa 1 chỗ: 0.08 thành 0.10', body:'Chỉ đổi dòng khai báo. Bốn dòng tính giá bên dưới không cần động tới.',
    viz:[b7Mem([{name:'THUE_VAT', type:'double', v:'0.10', konst:true, s:'hi'}], fr), cnt(1)]});
   for (var k = 0; k < 4; k++) {
    c.snap({ln:k + 1, title:'Tính ' + names[k] + ' = ' + gia(k), body:base[k] + ' * (1 + THUE_VAT) = ' + gia(k) + ', đã dùng thuế mới 10%.',
     viz:[b7Mem(mem(k + 1), fr), cnt(1)]});
   }
   c.snap({ln:4, title:'Xong', body:'Chỉ sửa 1 chỗ mà cả 4 giá đều đúng theo thuế mới.',
    viz:[b7Mem(mem(4), fr), cnt(1)]});
  }}
 ]}
};
