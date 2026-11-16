// META {"module":5,"lesson":"Bài 5.1. std::string: khai báo, phép toán và so sánh","activity":"So Sánh Chuỗi (String Comparison)","title":"So sánh chuỗi: từng ký tự, theo mã ASCII","lead":"Xem C++ so sánh hai chuỗi từng ký tự từ trái sang phải. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["co-ban","==, != và < với \"apple\"/\"banana\""],["bay","Bẫy chữ hoa và tiền tố"],["sapxep","Sắp xếp danh sách tên"]],"codeTitle":"Mã nguồn C++","path":"xu-ly-chuoi/std-string-khai-bao-phep-toan-va-so-sanh/so-sanh-chuoi-string-comparison/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'So sánh từng ký tự';

/* Hàm phụ: kết quả của phép so sánh, tính bằng JS thật theo mã ký tự */
function scLess(a, b){ return a < b ? 1 : 0; }
function scRes(label, v){ return vScore([{k:label, v:String(v), s:v ? 'ok' : 'bad'}]); }

var EX = {
'co-ban':{inputs:[],
 intro:'Hai chuỗi được đặt thẳng cột, dưới mỗi ô là mã ASCII (số của ký tự). Bấm "Bước tiếp".',
 lines:function(){ return ['string a = "Nam", b = "Nam";', 'string c = "Lan";', 'cout << (a == b) << endl;', 'cout << (a == c) << endl;', 'cout << (a != c) << endl;', 'string p = "apple";', 'string q = "banana";', 'cout << (p < q) << endl;', 'cout << (p > q) << endl;']; },
 run:function(c){
  var a = 'Nam', b = 'Nam', cc = 'Lan', p = 'apple', q = 'banana';
  c.out(String(a === b ? 1 : 0));
  c.snap({ln:2, title:'a == b',
   body:'Mọi cột đều giống nhau và hai chuỗi cùng độ dài, nên == cho 1 (đúng).',
   viz:[vCharCmp(a, b, {na:'a', nb:'b'}), scRes('a == b', 1)]});
  c.out(String(a === cc ? 1 : 0));
  c.snap({ln:3, title:'a == c',
   body:'Cột 0 đã khác: N có mã 78, L có mã 76. Chỉ cần một ký tự khác là hai chuỗi không bằng nhau, nên == cho 0.',
   viz:[vCharCmp(a, cc, {na:'a', nb:'c'}), scRes('a == c', 0)]});
  c.out(String(a !== cc ? 1 : 0));
  c.snap({ln:4, title:'a != c',
   body:'!= là ngược lại của ==, nên cho 1.',
   viz:[vCharCmp(a, cc, {na:'a', nb:'c'}), scRes('a != c', 1)]});
  c.out(String(scLess(p, q)));
  c.snap({ln:7, title:'p < q',
   body:'Cột 0: a (97) nhỏ hơn b (98). Biết ngay kết quả nên dừng, các cột sau mờ đi, không cần xét. p < q cho 1.',
   viz:[vCharCmp(p, q, {na:'p', nb:'q'}), scRes('p < q', scLess(p, q))]});
  c.out(String(scLess(q, p)));
  c.snap({ln:8, title:'p > q',
   body:'Cũng dừng ở cột 0: a (97) không lớn hơn b (98), nên p > q cho 0.',
   viz:[vCharCmp(p, q, {na:'p', nb:'q'}), scRes('p > q', scLess(q, p))]});
  c.snap({ln:8, title:'Xong',
   body:'Chuỗi được so từ trái sang phải, dừng ở cặp ký tự khác nhau đầu tiên.',
   note:'== so cả chuỗi; < và > dừng ở ký tự khác nhau đầu tiên, theo mã ASCII.',
   viz:vCharCmp(p, q, {na:'p', nb:'q'})});
 }},
bay:{inputs:[],
 intro:'Chữ HOA có mã nhỏ hơn chữ thường, và chuỗi ngắn có thể "nhỏ hơn" chuỗi dài. Bấm "Bước tiếp".',
 lines:function(){ return ['string z = "Zebra";', 'string a = "apple";', 'cout << (z < a) << endl;', 'string n1 = "Nam";', 'string n2 = "Nam Anh";', 'cout << (n1 < n2) << endl;', 'string s1 = "z", s2 = "apple";', 'cout << (s1 > s2) << endl;', 'string t = "nam";', 'cout << (n1 == t) << endl;']; },
 run:function(c){
  var z = 'Zebra', a = 'apple', n1 = 'Nam', n2 = 'Nam Anh', s1 = 'z', s2 = 'apple', t = 'nam';
  c.out(String(scLess(z, a)));
  c.snap({ln:2, title:'"Zebra" < "apple"',
   body:'Z là chữ HOA, mã 90; a là chữ thường, mã 97. 90 nhỏ hơn 97 nên "Zebra" < "apple" cho 1, dù Z đứng cuối bảng chữ cái.',
   viz:[vCharCmp(z, a, {na:'z', nb:'a'}), vCard({kind:'info', title:'Chữ HOA đứng trước chữ thường', sub:'A đến Z: mã 65 đến 90. a đến z: mã 97 đến 122.'})]});
  c.out(String(scLess(n1, n2)));
  c.snap({ln:5, title:'"Nam" < "Nam Anh"',
   body:'Ba cột đầu giống nhau. Đến cột 3, "Nam" đã hết ký tự còn "Nam Anh" còn dấu cách. Chuỗi hết trước thì nhỏ hơn.',
   viz:[vCharCmp(n1, n2, {na:'n1', nb:'n2'}), scRes('n1 < n2', scLess(n1, n2))]});
  c.out(String(s1 > s2 ? 1 : 0));
  c.snap({ln:7, title:'"z" > "apple"',
   body:'"z" ngắn hơn nhiều nhưng cột 0 đã phân thắng bại: z (122) lớn hơn a (97). So sánh chuỗi không xét độ dài.',
   viz:[vCharCmp(s1, s2, {na:'s1', nb:'s2'}), scRes('s1 > s2', s1 > s2 ? 1 : 0)]});
  c.out(String(n1 === t ? 1 : 0));
  c.snap({ln:9, title:'"Nam" == "nam"',
   body:'N (78) và n (110) có mã khác nhau nên hai chuỗi khác nhau. == phân biệt chữ hoa, chữ thường.',
   viz:[vCharCmp(n1, t, {na:'n1', nb:'t'}), scRes('n1 == t', n1 === t ? 1 : 0)]});
  c.snap({ln:9, title:'Xong',
   body:'Mọi kết quả đều đến từ so mã từng ký tự, không phải từ trực giác bảng chữ cái.',
   note:'Chữ hoa đứng trước chữ thường; chuỗi là phần đầu của chuỗi kia thì ngắn hơn nhỏ hơn; không so độ dài.',
   viz:vCharCmp(z, a, {na:'z', nb:'a'})});
 }},
sapxep:{inputs:[],
 intro:'Bubble Sort dùng phép so sánh chuỗi để sắp xếp tên. Chỉ xem lượt đầu rồi kết quả. Bấm "Bước tiếp".',
 lines:function(){ return ['string ds[5] = {"Nam", "Binh",', '    "An", "Cuong", "Duc"};', 'for (int i = 0; i < 4; i++)', '  for (int j = 0; j < 4 - i; j++)', '    if (ds[j] > ds[j + 1])', '      swap(ds[j], ds[j + 1]);']; },
 run:function(c){
  var ds = ['Nam', 'Binh', 'An', 'Cuong', 'Duc'];
  var arr = function(extra){ return vArray(ds.slice(), extra); };
  c.snap({ln:0, title:'Danh sách ban đầu',
   body:'Năm tên chưa theo thứ tự. Mỗi lần so hai tên đứng cạnh nhau, tên nào "lớn hơn" thì nhảy về bên phải.',
   viz:arr({name:'ds'})});
  var i = 0, j, log = [];
  for (j = 0; j < 4; j++) {
    var l = ds[j], r = ds[j + 1], sw = l > r;
    var before = ds.slice();
    if (sw) { ds[j] = r; ds[j + 1] = l; }
    var why = l.charAt(0) + ' (' + l.charCodeAt(0) + ') ' + (sw ? '>' : '<') + ' ' + r.charAt(0) + ' (' + r.charCodeAt(0) + ')';
    c.snap({ln:5, title:'ds[' + j + '] > ds[' + (j + 1) + ']: "' + l + '" và "' + r + '"',
     body:'Cột 0: ' + why + (sw ? ', nên "' + l + '" > "' + r + '": đổi chỗ.' : ': không đổi chỗ.'),
     viz:[vCharCmp(l, r, {na:'ds[' + j + ']', nb:'ds[' + (j + 1) + ']'}), vArray(ds.slice(), {name:'ds', ptr:j, ptrLabel:'j', swap:sw ? [j, j + 1] : undefined})]});
  }
  /* các lượt sau: chạy thật bằng JS rồi tóm tắt */
  for (i = 1; i < 4; i++) for (j = 0; j < 4 - i; j++) if (ds[j] > ds[j + 1]) { var tmp = ds[j]; ds[j] = ds[j + 1]; ds[j + 1] = tmp; }
  c.snap({ln:2, title:'Các lượt sau',
   body:'Lượt đầu đẩy "Nam" về cuối. Các lượt sau làm tương tự (Binh nhảy qua An, rồi không còn gì phải đổi).',
   viz:vArray(ds.slice(), {name:'ds', done:5})});
  ds.forEach(function(s, k){ });
  for (var k = 0; k < ds.length; k++) c.out((k + 1) + '. ' + ds[k]);
  c.snap({ln:5, title:'Xong',
   body:'Danh sách đã theo thứ tự An, Binh, Cuong, Duc, Nam. Thuật toán y như sắp xếp số, chỉ khác phép so sánh.',
   note:'Sắp xếp mảng chuỗi giống sắp xếp mảng số: chỉ cần so sánh bằng toán tử > của chuỗi.',
   viz:vArray(ds.slice(), {name:'ds', done:5})});
 }}
};
