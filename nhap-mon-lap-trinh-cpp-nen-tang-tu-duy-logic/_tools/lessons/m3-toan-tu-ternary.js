// META {"module":3,"lesson":"Bài 3.5. Toán tử ba ngôi (Ternary)","activity":"Toán Tử Điều Kiện (Ternary Operator)","title":"if...else và toán tử ?: cạnh nhau","lead":"Hai cột giải cùng một bài toán: bên trái dùng if...else, bên phải dùng ?:. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["chanle","Chẵn/lẻ"],["gia","Giá vé trong cout"],["long","?: lồng nhau"]],"codeTitle":"Mã nguồn C++","path":"cau-truc-dieu-kien/toan-tu-ba-ngoi-ternary/toan-tu-dieu-kien-ternary-operator/index.html"}

function b13Res(name, type, v, s){ return vBoxes([{name:name, type:type, v:v, s:s}], {frame:'Bộ nhớ (RAM) · main()'}); }
function b13Box(name, type, v, s){ return {name:name, type:type, v:v, s:s}; }
function b13Frame(boxes){ return vBoxes(boxes, {frame:'Bộ nhớ (RAM) · main()', empty:'Chưa có biến nào.'}); }
function b13Gates(labels, match, upto, pill, at, skip){
  return vGates(labels.map(function(t, i){
    if (i < upto) return {t:t, s:(i === match ? 'ok' : 'no')};
    return {t:t + (skip ? '  ·  không xét' : ''), s:'dim'};
  }), {pill:pill, at:at});
}

var EX = {
/* ---------- Tab 1: chẵn / lẻ ---------- */
chanle:{inputs:[{id:'n', label:'number', def:7, min:0, max:99}], chips:['7', '8'],
 intro:'Cùng kiểm tra một số là chẵn hay lẻ. Bên trái if...else, bên phải toán tử ?:. Chọn number = 7 hoặc 8 rồi bấm "Bước tiếp".',
 running:'Hai cột chạy song song. Chú ý cách mỗi cột đưa kết quả vào hộp result.',
 done:'Cả hai cột cho cùng kết quả. if...else cần 6 dòng, ?: chỉ cần 1 câu lệnh.',
 note:'?: là một biểu thức: nó cho ra MỘT giá trị, nên đặt được ngay sau dấu = hoặc trong cout.',
 cols:[
 {title:'if...else', sub:'Gán result bằng hai nhánh.',
  get lines(){ return ['int number = ' + P.n + ';', 'string result;', 'if (number % 2 == 0) {', '  result = "So Chan";', '} else {', '  result = "So Le";', '}']; },
  run:function(c){
   var n = P.n, even = n % 2 === 0, val = even ? '"So Chan"' : '"So Le"', num = b13Box('number', 'int', n);
   c.snap({ln:0, title:'Khai báo number = ' + n, body:'Hộp number chứa ' + n + '.', viz:b13Frame([b13Box('number', 'int', n, 'new')])});
   c.snap({ln:1, title:'Khai báo string result;', body:'Hộp result được tạo nhưng chưa có giá trị.', viz:b13Frame([num, b13Box('result', 'string', null, 'new')])});
   c.snap({ln:2, title:'Kiểm tra number % 2 == 0', body:n + ' % 2 = ' + (n % 2) + ', so với 0 là ' + (even ? 'đúng.' : 'sai.'),
    viz:b13Frame([num, b13Box('result', 'string', null)])});
   c.snap({ln:even ? 3 : 5, dim:even ? [4, 5] : [3], dimLabel:'không chạy', title:even ? 'Vào nhánh if' : 'Vào nhánh else', body:'Máy chạy nhánh ' + (even ? 'if' : 'else') + ' và gán result = ' + val + '.',
    viz:b13Frame([num, b13Box('result', 'string', val, 'new')])});
   c.snap({ln:6, title:'Xong', body:'Để có được result, cột này viết 6 dòng.',
    viz:[b13Frame([num, b13Box('result', 'string', val)]), vScore([{k:'Số dòng', v:6}])]});
  }},
 {title:'Toán tử ?:', sub:'Chọn một trong hai giá trị ngay trong lệnh gán.',
  get lines(){ return ['int number = ' + P.n + ';', 'string result =', '  (number % 2 == 0)', '  ? "So Chan"', '  : "So Le";']; },
  run:function(c){
   var n = P.n, even = n % 2 === 0, val = even ? '"So Chan"' : '"So Le"', num = b13Box('number', 'int', n);
   function parts(chosen){
    return vChips([{t:'number % 2 == 0', label:'điều kiện', s:'f1'}, {t:'"So Chan"', label:'nếu đúng', s:chosen === 1 ? 'f2' : (chosen === 0 ? 'dim' : 'f2')}, {t:'"So Le"', label:'nếu sai', s:chosen === 2 ? 'f3' : (chosen === 0 ? 'dim' : 'f3')}], {title:'Ba phần của ?:'});
   }
   c.snap({ln:0, title:'Khai báo number = ' + n, body:'Hộp number chứa ' + n + '.', viz:b13Frame([b13Box('number', 'int', n, 'new')])});
   c.snap({ln:1, title:'Lệnh gán một dòng', body:'Vế phải của dấu = là cả biểu thức ?: gồm 3 phần: điều kiện, giá trị nếu đúng, giá trị nếu sai. Mỗi phần một màu.',
    viz:[parts(-1), b13Frame([num, b13Box('result', 'string', null, 'new')])]});
   c.snap({ln:2, title:'Đánh giá điều kiện', body:n + ' % 2 == 0 là ' + (even ? 'đúng' : 'sai') + '.',
    viz:[parts(-1), b13Frame([num, b13Box('result', 'string', null)])]});
   c.snap({ln:even ? 3 : 4, title:'Chọn phần ' + (even ? 'thứ hai' : 'thứ ba'), body:'Điều kiện ' + (even ? 'đúng' : 'sai') + ', nên biểu thức cho giá trị ' + val + '. Giá trị này đi thẳng vào result.',
    viz:[parts(even ? 1 : 2), b13Frame([num, b13Box('result', 'string', val, 'new')])]});
   c.snap({ln:4, title:'Xong', body:'Cùng kết quả như cột bên trái, nhưng chỉ cần 1 câu lệnh (ở đây ngắt thành 3 dòng để mỗi phần có một màu).',
    viz:[parts(even ? 1 : 2), b13Frame([num, b13Box('result', 'string', val)]), vScore([{k:'Số dòng khi viết gọn', v:1}])]});
  }}
 ]},

/* ---------- Tab 2: giá vé trong cout ---------- */
gia:{inputs:[{id:'tuoi', label:'tuoi', def:10, min:1, max:120}], chips:['10', '25'],
 intro:'Tính giá vé theo tuổi: dưới 12 tuổi 50000, từ 12 tuổi trở lên 100000. Bên trái cần thêm biến giaVe, bên phải đặt ?: ngay trong cout. Bấm "Bước tiếp".',
 running:'Quan sát: cột phải không cần biến trung gian.',
 done:'Cùng một dòng chữ trên màn hình. Cột ?: không cần biến giaVe.',
 note:'Khi đặt ?: trong cout phải có dấu ngoặc: cout << (tuoi < 12 ? 50000 : 100000). Hai giá trị 50000 và 100000 cùng kiểu int.',
 cols:[
 {title:'if...else', sub:'Lưu giá vé vào biến giaVe rồi mới in.',
  get lines(){ return ['int tuoi = ' + P.tuoi + ';', 'int giaVe;', 'if (tuoi < 12) {', '  giaVe = 50000;', '} else {', '  giaVe = 100000;', '}', 'cout << "Gia ve: " << giaVe', '     << " VND" << endl;']; },
  run:function(c){
   var t = P.tuoi, kid = t < 12, g = kid ? 50000 : 100000, T = b13Box('tuoi', 'int', t);
   c.snap({ln:0, title:'Khai báo tuoi = ' + t, body:'Hộp tuoi chứa ' + t + '.', viz:b13Frame([b13Box('tuoi', 'int', t, 'new')])});
   c.snap({ln:1, title:'Khai báo int giaVe;', body:'Cần thêm một biến trung gian giaVe, chưa có giá trị.', viz:b13Frame([T, b13Box('giaVe', 'int', null, 'new')])});
   c.snap({ln:2, title:'Kiểm tra tuoi < 12', body:t + ' < 12 là ' + (kid ? 'đúng.' : 'sai.'), viz:b13Frame([T, b13Box('giaVe', 'int', null)])});
   c.snap({ln:kid ? 3 : 5, dim:kid ? [4, 5] : [3], dimLabel:'không chạy', title:'Gán giaVe = ' + g, body:'Nhánh ' + (kid ? 'if' : 'else') + ' gán giaVe = ' + g + '.', viz:b13Frame([T, b13Box('giaVe', 'int', g, 'new')])});
   c.out('Gia ve: ' + g + ' VND');
   c.snap({ln:7, title:'In giá vé', body:'cout lấy giaVe ra in: "Gia ve: ' + g + ' VND".', viz:b13Frame([T, b13Box('giaVe', 'int', g, 'hi')])});
  }},
 {title:'Toán tử ?: trong cout', sub:'Không cần biến trung gian.',
  get lines(){ return ['int tuoi = ' + P.tuoi + ';', 'cout << "Gia ve: "', '     << (tuoi < 12 ? 50000 : 100000)', '     << " VND" << endl;']; },
  run:function(c){
   var t = P.tuoi, kid = t < 12, g = kid ? 50000 : 100000, T = b13Box('tuoi', 'int', t);
   function parts(chosen){ return vChips([{t:'tuoi < 12', label:'điều kiện', s:'f1'}, {t:'50000', label:'nếu đúng', s:chosen === 1 ? 'f2' : (chosen === 0 ? 'dim' : 'f2')}, {t:'100000', label:'nếu sai', s:chosen === 2 ? 'f3' : (chosen === 0 ? 'dim' : 'f3')}], {title:'Ba phần của ?:'}); }
   c.snap({ln:0, title:'Khai báo tuoi = ' + t, body:'Hộp tuoi chứa ' + t + '. Cột này không khai báo thêm biến nào khác.', viz:b13Frame([b13Box('tuoi', 'int', t, 'new')])});
   c.write('Gia ve: ');
   c.snap({ln:1, title:'cout in "Gia ve: "', body:'Máy in phần chữ đầu tiên, chưa xuống dòng.', viz:[parts(-1), b13Frame([T])]});
   c.snap({ln:2, title:'Đánh giá (tuoi < 12 ? ...)', body:t + ' < 12 là ' + (kid ? 'đúng' : 'sai') + ', nên biểu thức cho giá trị ' + g + '.', viz:[parts(kid ? 1 : 2), b13Frame([T])]});
   c.write(String(g));
   c.snap({ln:2, title:'Giá trị ' + g + ' đi thẳng vào cout', body:'Không qua biến trung gian nào: kết quả của ?: được in ngay.', viz:[parts(kid ? 1 : 2), b13Frame([T])]});
   c.out(' VND');
   c.snap({ln:3, title:'Xong', body:'In nốt " VND" và xuống dòng. Chỉ cần 1 câu lệnh cout, không cần biến giaVe.', viz:[parts(kid ? 1 : 2), b13Frame([T])]});
  }}
 ]},

/* ---------- Tab 3: ?: lồng nhau ---------- */
long:{inputs:[{id:'d', label:'diem', def:6, min:0, max:10}], chips:['6', '9', '3'],
 intro:'Xếp loại 3 mức: bên trái if bậc thang, bên phải ?: lồng nhau. Cả hai cho cùng kết quả, bấm "Bước tiếp" để so sánh cách đọc.',
 running:'Hai cột xét các điều kiện theo cùng thứ tự: từ trên xuống (trái sang phải ở ?:).',
 done:'Cùng kết quả, nhưng bên trái dễ đọc hơn hẳn.',
 note:'Từ 3 mức trở lên nên dùng if bậc thang cho dễ đọc, dễ sửa.',
 cols:[
 {title:'if bậc thang', sub:'Mỗi mức một nhánh, dễ đọc.',
  get lines(){ return ['int diem = ' + P.d + ';', 'string xepLoai;', 'if (diem >= 8)', '  xepLoai = "Gioi";', 'else if (diem >= 5)', '  xepLoai = "Kha";', 'else', '  xepLoai = "Yeu";']; },
  run:function(c){
   var d = P.d, labels = ['diem >= 8', 'diem >= 5', 'else'], conds = [d >= 8, d >= 5, true], match = conds.indexOf(true), names = ['"Gioi"', '"Kha"', '"Yeu"'];
   var D = b13Box('diem', 'int', d), pill = String(d);
   c.snap({ln:0, title:'Khai báo diem = ' + d, body:'Hộp diem chứa ' + d + '.', viz:[b13Gates(labels, -1, 0, pill, -1), b13Frame([b13Box('diem', 'int', d, 'new')])]});
   c.snap({ln:1, title:'Khai báo string xepLoai;', body:'Hộp xepLoai chưa có giá trị.', viz:[b13Gates(labels, -1, 0, pill, -1), b13Frame([D, b13Box('xepLoai', 'string', null, 'new')])]});
   for (var i = 0; i <= match; i++) {
    c.snap({ln:[2, 4, 6][i], title:'Xét cửa ' + (i + 1) + (i < 2 ? ': ' + labels[i] + (conds[i] ? ' ✓' : ' ✗') : ': else'),
     body:i < 2 ? d + (i === 0 ? ' >= 8 ' : ' >= 5 ') + 'là ' + (conds[i] ? 'đúng.' : 'sai, xét cửa tiếp theo.') : 'Hai cửa trên đều sai nên else chạy.',
     viz:[b13Gates(labels, conds[i] ? i : -1, i + 1, pill, i), b13Frame([D, b13Box('xepLoai', 'string', null)])]});
   }
   c.snap({ln:[3, 5, 7][match], title:'Xong: xepLoai = ' + names[match], body:'Nhánh đúng đầu tiên gán xepLoai = ' + names[match] + ' rồi kết thúc.',
    viz:[b13Gates(labels, match, match + 1, pill, match, true), b13Frame([D, b13Box('xepLoai', 'string', names[match], 'new')])]});
  }},
 {title:'?: lồng nhau', sub:'Một dòng, nhiều lớp: khó đọc hơn.',
  get lines(){ return ['int diem = ' + P.d + ';', 'string xepLoai =', '  (diem >= 8) ? "Gioi"', '  : (diem >= 5) ? "Kha"', '  : "Yeu";']; },
  run:function(c){
   var d = P.d, labels = ['?: thứ nhất: diem >= 8', '?: thứ hai: diem >= 5', 'còn lại'], conds = [d >= 8, d >= 5, true], match = conds.indexOf(true), names = ['"Gioi"', '"Kha"', '"Yeu"'];
   var D = b13Box('diem', 'int', d), pill = String(d);
   c.snap({ln:0, title:'Khai báo diem = ' + d, body:'Hộp diem chứa ' + d + '.', viz:[b13Gates(labels, -1, 0, pill, -1), b13Frame([b13Box('diem', 'int', d, 'new')])]});
   c.snap({ln:1, title:'Lệnh gán có ?: lồng nhau', body:'Vế phải là một ?: nằm trong nhánh sai của một ?: khác. Máy đánh giá từ trái sang phải.', viz:[b13Gates(labels, -1, 0, pill, -1), b13Frame([D, b13Box('xepLoai', 'string', null, 'new')])]});
   for (var i = 0; i < Math.min(match + 1, 2); i++) {
    c.snap({ln:[2, 3][i], title:'Đánh giá ?: ' + (i === 0 ? 'thứ nhất' : 'thứ hai') + (conds[i] ? ' ✓' : ' ✗'),
     body:d + (i === 0 ? ' >= 8 ' : ' >= 5 ') + 'là ' + (conds[i] ? 'đúng, lấy ' + names[i] + '.' : (i === 0 ? 'sai, sang ?: thứ hai.' : 'sai, lấy giá trị cuối cùng.')),
     viz:[b13Gates(labels, conds[i] ? i : -1, i + 1, pill, i), b13Frame([D, b13Box('xepLoai', 'string', null)])]});
   }
   c.snap({ln:[2, 3, 4][match], title:'Xong: xepLoai = ' + names[match], body:'Kết quả giống cột bên trái, nhưng phải đọc từng lớp ?: mới hiểu được.',
    viz:[b13Gates(labels, match, match + 1, pill, match, true), b13Frame([D, b13Box('xepLoai', 'string', names[match], 'new')])]});
  }}
 ]}
};
