// META {"module":3,"lesson":"Bài 3.2. Tham số, đối số và tham số mặc định","activity":"Tham số và Đối số (Parameters & Arguments)","title":"Đối số được chép vào tham số theo vị trí","lead":"Xem giá trị ở chỗ gọi hàm được chép vào ô tham số theo thứ tự ①②, và hai lỗi hay gặp. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["coban","Tham số và đối số"],["soluong","Sai số lượng đối số"],["thutu","Đảo thứ tự đối số"]],"codeTitle":"Mã nguồn C++","path":"ham-function/tham-so-doi-so-va-tham-so-mac-dinh/tham-so-va-doi-so-parameters-arguments/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Đối số chép vào tham số';

var tsSig = 'int tinhTong(int a, int b)';
function tsFmt(n){ return String(Number(n.toPrecision(6))); }

var EX = {
coban:{inputs:[],
 intro:'Hàm tinhTong có hai ô trống a, b đang chờ giá trị. Xem giá trị được đưa vào từng ô thế nào. Bấm "Bước tiếp".',
 lines:function(){ return ['int tinhTong(int a, int b) {', '  return a + b;', '}', 'int main() {', '  int x = 5, y = 10;', '  cout << tinhTong(x, y) << endl;', '  cout << tinhTong(7, 3) << endl;', '  return 0;', '}']; },
 run:function(c){
  var xy = [{name:'x', type:'int', v:5}, {name:'y', type:'int', v:10}];
  c.snap({ln:0, title:'Hàm có hai ô trống',
   body:'a và b là tham số: hai ô trống được khai báo ở nơi định nghĩa hàm, chờ nhận giá trị.',
   viz:vArgs({fn:tsSig, params:[{name:'a', type:'int'}, {name:'b', type:'int'}], title:'Hàm tinhTong'})});
  c.snap({ln:4, title:'int x = 5, y = 10;',
   body:'Trong main có hai biến x và y. Chúng sẽ được dùng làm giá trị gửi vào hàm.',
   viz:vBoxes([{name:'x', type:'int', v:5, s:'new'}, {name:'y', type:'int', v:10, s:'new'}], {frame:'main()'})});
  c.snap({ln:5, title:'Gọi tinhTong(x, y)',
   body:'x và y là đối số: giá trị thật được gửi vào khi gọi hàm. Đối số ① đi vào ô ①, đối số ② đi vào ô ②.',
   viz:[vArgs({call:'tinhTong(x, y)', args:[{v:'x = 5', s:'hi'}, {v:'y = 10', s:'hi'}], fn:tsSig, params:[{name:'a', type:'int'}, {name:'b', type:'int'}]})]});
  c.snap({ln:0, title:'Chép giá trị vào tham số',
   body:'Giá trị 5 được chép vào a, giá trị 10 được chép vào b. Biến x, y ở main vẫn còn nguyên.',
   viz:[vArgs({call:'tinhTong(x, y)', args:[{v:'x = 5'}, {v:'y = 10'}], fn:tsSig, params:[{name:'a', type:'int', v:5, s:'new'}, {name:'b', type:'int', v:10, s:'new'}]}), vBoxes([{name:'x', type:'int', v:5}, {name:'y', type:'int', v:10}], {frame:'main()'})]});
  c.out(String(5 + 10));
  c.snap({ln:1, title:'return a + b;',
   body:'Hàm tính 5 + 10 = ' + (5 + 10) + ' và trả về. Console in ' + (5 + 10) + '.',
   viz:vArgs({call:'tinhTong(x, y)', args:[{v:'x = 5'}, {v:'y = 10'}], fn:tsSig, params:[{name:'a', type:'int', v:5}, {name:'b', type:'int', v:10}], ret:{v:String(5 + 10), to:''}})});
  c.snap({ln:6, title:'Gọi tinhTong(7, 3)',
   body:'Đối số cũng có thể là số viết thẳng. Lần này 7 vào a, 3 vào b: vẫn theo đúng vị trí.',
   viz:vArgs({call:'tinhTong(7, 3)', args:[{v:'7', s:'hi'}, {v:'3', s:'hi'}], fn:tsSig, params:[{name:'a', type:'int', v:7, s:'new'}, {name:'b', type:'int', v:3, s:'new'}]})});
  c.out(String(7 + 3));
  c.snap({ln:1, title:'return a + b;',
   body:'7 + 3 = ' + (7 + 3) + '. Cùng một hàm, mỗi lần gọi nhận giá trị khác nhau.',
   viz:vArgs({call:'tinhTong(7, 3)', args:[{v:'7'}, {v:'3'}], fn:tsSig, params:[{name:'a', type:'int', v:7}, {name:'b', type:'int', v:3}], ret:{v:String(7 + 3), to:''}})});
  c.snap({ln:8, title:'Xong',
   body:'Tham số nằm ở nơi định nghĩa hàm. Đối số nằm ở nơi gọi hàm, và được chép vào tham số.',
   note:'Tham số (a, b) ở nơi viết hàm; đối số (x, y, 7, 3) ở nơi gọi hàm. Đối số được chép vào tham số theo vị trí.',
   viz:vCard({kind:'ok', title:'Ghi nhớ', rows:[['a, b', 'tham số: nơi định nghĩa'], ['x, y, 7, 3', 'đối số: nơi gọi']]})});
 }},
soluong:{inputs:[],
 intro:'Hàm cần đúng 2 đối số. Thiếu hoặc thừa đối số thì trình biên dịch dừng ngay. Bấm "Bước tiếp".',
 lines:function(){ return ['int tinhTong(int a, int b) {', '  return a + b;', '}', 'int main() {', '  cout << tinhTong(5) << endl;', '  cout << tinhTong(5, 3, 10);', '  return 0;', '}']; },
 run:function(c){
  var e1 = "error: too few arguments to function 'int tinhTong(int, int)'";
  var e2 = "error: too many arguments to function 'int tinhTong(int, int)'";
  c.snap({ln:0, title:'Hàm cần 2 đối số',
   body:'tinhTong có hai tham số, nên mỗi lần gọi phải gửi đủ đúng hai đối số.',
   viz:vArgs({fn:tsSig, params:[{name:'a', type:'int'}, {name:'b', type:'int'}], title:'Hàm tinhTong'})});
  c.snap({ln:4, title:'Gọi tinhTong(5): thiếu',
   body:'Chỉ có một đối số: 5 vào a, còn ô b không có gì để nhận. Ô b đang trống.',
   viz:vArgs({call:'tinhTong(5)', args:[{v:'5', s:'hi'}], fn:tsSig, params:[{name:'a', type:'int', v:5, s:'new'}, {name:'b', type:'int', s:'bad'}]})});
  c.err(e1);
  c.snap({ln:4, title:'Lỗi biên dịch: thiếu đối số',
   body:'Trình biên dịch báo "too few arguments" (quá ít đối số) và dừng lại. Chương trình không chạy được.',
   viz:[vArgs({call:'tinhTong(5)', args:[{v:'5'}], fn:tsSig, params:[{name:'a', type:'int', v:5}, {name:'b', type:'int', s:'bad'}]}), vErr({kind:'compile', msg:[e1], code:'tinhTong(5)'})]});
  c.snap({ln:5, title:'Gọi tinhTong(5, 3, 10): thừa',
   body:'Có ba đối số nhưng chỉ có hai ô. 5 vào a, 3 vào b, còn số 10 không có ô nào để nhận.',
   viz:vArgs({call:'tinhTong(5, 3, 10)', args:[{v:'5'}, {v:'3'}, {v:'10', s:'bad'}], fn:tsSig, params:[{name:'a', type:'int', v:5, s:'new'}, {name:'b', type:'int', v:3, s:'new'}]})});
  c.err(e2);
  c.snap({ln:5, title:'Lỗi biên dịch: thừa đối số',
   body:'Trình biên dịch báo "too many arguments" (quá nhiều đối số).',
   viz:[vArgs({call:'tinhTong(5, 3, 10)', args:[{v:'5'}, {v:'3'}, {v:'10', s:'bad'}], fn:tsSig, params:[{name:'a', type:'int', v:5}, {name:'b', type:'int', v:3}]}), vErr({kind:'compile', msg:[e2], code:'tinhTong(5, 3, 10)'})]});
  c.snap({ln:4, title:'Xong',
   body:'Sai số lượng đối số luôn bị bắt ngay lúc biên dịch. Sửa lại thành tinhTong(5, 3) là chạy được.',
   note:'Số đối số phải bằng số tham số (trừ tham số có giá trị mặc định, học ở bài sau). Sai là lỗi biên dịch.',
   viz:vArgs({call:'tinhTong(5, 3)', args:[{v:'5'}, {v:'3'}], fn:tsSig, params:[{name:'a', type:'int', v:5, s:'ok'}, {name:'b', type:'int', v:3, s:'ok'}], title:'Cách sửa'})});
 }},
thutu:{inputs:[],
 intro:'Hai tham số cùng kiểu double: đảo thứ tự đối số thì máy vẫn chạy, nhưng kết quả sai. Bấm "Bước tiếp".',
 lines:function(){ return ['double tinhPhanTramGiam(', '    double giaCu, double giaMoi) {', '  return (giaCu - giaMoi)', '         / giaCu * 100;', '}', 'int main() {', '  double giaCu = 200000;', '  double giaMoi = 150000;', '  double dung = tinhPhanTramGiam(', '      giaCu, giaMoi);', '  double sai = tinhPhanTramGiam(', '      giaMoi, giaCu);', '  cout << dung << "%\\n";', '  cout << sai << "%\\n";', '  return 0;', '}']; },
 run:function(c){
  var CU = 200000, MOI = 150000;
  var fn = 'double tinhPhanTramGiam(double giaCu, double giaMoi)';
  var P = function(a, b, s){ return [{name:'giaCu', type:'double', v:a, s:s}, {name:'giaMoi', type:'double', v:b, s:s}]; };
  var calc = function(a, b){ return (a - b) / a * 100; };
  var dung = calc(CU, MOI), sai = calc(MOI, CU);
  c.snap({ln:0, title:'Hàm có hai ô cùng kiểu',
   body:'Ô ① là giaCu, ô ② là giaMoi. Cả hai đều là double. Hàm tính phần trăm giảm giá = (giaCu - giaMoi) / giaCu * 100.',
   viz:vArgs({fn:fn, params:[{name:'giaCu', type:'double'}, {name:'giaMoi', type:'double'}]})});
  c.snap({ln:7, title:'Hai biến giá',
   body:'Trong main: giá cũ là 200000, giá mới là 150000.',
   viz:vBoxes([{name:'giaCu', type:'double', v:CU, s:'new'}, {name:'giaMoi', type:'double', v:MOI, s:'new'}], {frame:'main()'})});
  c.snap({ln:8, title:'Gọi đúng thứ tự (giaCu, giaMoi)',
   body:'Đối số ① là giaCu (200000) vào ô ①; đối số ② là giaMoi (150000) vào ô ②. Đúng ý.',
   viz:vArgs({call:'tinhPhanTramGiam(giaCu, giaMoi)', args:[{v:'giaCu = ' + CU}, {v:'giaMoi = ' + MOI}], fn:fn, params:P(CU, MOI, 'ok')})});
  c.snap({ln:2, title:'Kết quả đúng: ' + tsFmt(dung) + '%',
   body:'(200000 - 150000) / 200000 * 100 = ' + tsFmt(dung) + '. Giảm 25% là hợp lý, cất vào biến dung.',
   viz:[vArgs({call:'tinhPhanTramGiam(giaCu, giaMoi)', args:[{v:'giaCu = ' + CU}, {v:'giaMoi = ' + MOI}], fn:fn, params:P(CU, MOI), ret:{v:tsFmt(dung), to:'dung'}}), vBoxes([{name:'giaCu', type:'double', v:CU}, {name:'giaMoi', type:'double', v:MOI}, {name:'dung', type:'double', v:tsFmt(dung), s:'new'}], {frame:'main()'})]});
  c.snap({ln:10, title:'Gọi đảo thứ tự (giaMoi, giaCu)',
   body:'Máy chỉ nhìn vị trí, không nhìn tên biến: 150000 vào ô ① (giaCu), 200000 vào ô ② (giaMoi). Hai ô đều là double nên không có lỗi nào.',
   viz:[vArgs({call:'tinhPhanTramGiam(giaMoi, giaCu)', args:[{v:'giaMoi = ' + MOI}, {v:'giaCu = ' + CU}], fn:fn, params:P(MOI, CU, 'bad')}), vCard({kind:'warn', title:'Biên dịch xong, không ai báo lỗi'})]});
  c.snap({ln:2, title:'Kết quả sai: ' + tsFmt(sai) + '%',
   body:'(150000 - 200000) / 150000 * 100 = ' + tsFmt(sai) + '. Giảm giá âm là vô nghĩa, nhưng chương trình vẫn chạy bình thường.',
   viz:[vArgs({call:'tinhPhanTramGiam(giaMoi, giaCu)', args:[{v:'giaMoi = ' + MOI}, {v:'giaCu = ' + CU}], fn:fn, params:P(MOI, CU, 'bad'), ret:{v:tsFmt(sai), to:'sai'}}), vBoxes([{name:'dung', type:'double', v:tsFmt(dung)}, {name:'sai', type:'double', v:tsFmt(sai), s:'bad'}], {frame:'main()'})]});
  c.out(tsFmt(dung) + '%');
  c.out(tsFmt(sai) + '%');
  c.snap({ln:13, title:'Xong',
   body:'Console in cả hai kết quả. Lỗi sai thứ tự nguy hiểm vì máy không báo gì: người viết phải tự kiểm tra.',
   note:'Máy chép đối số theo vị trí. Hai tham số cùng kiểu mà đảo thứ tự thì vẫn biên dịch được, chỉ có kết quả sai.',
   viz:vCard({kind:'warn', title:'Kết quả vô nghĩa', sub:'Phần trăm giảm giá không thể là ' + tsFmt(sai) + '%', tip:'Luôn đối chiếu thứ tự đối số với thứ tự tham số.'})});
 }}
};
