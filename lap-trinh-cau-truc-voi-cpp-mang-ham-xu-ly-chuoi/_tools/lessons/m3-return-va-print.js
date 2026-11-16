// META {"module":3,"lesson":"Bài 3.3. Giá trị trả về: Return và Print","activity":"Sự Khác Biệt Giữa Return Và Print","title":"return trả giá trị về, cout chỉ in ra màn hình","lead":"Xem giá trị đi về đâu: lên màn hình (cout) hay quay về chỗ gọi hàm (return). Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["ai","cout và return: ai dùng lại được?"],["dung","return dừng hàm ngay"],["long","Return lồng nhau"]],"codeTitle":"Mã nguồn C++","path":"ham-function/gia-tri-tra-ve-return-va-print/su-khac-biet-giua-return-va-print/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Giá trị đi về đâu?';

var rpSum = 'int tinhTong(int a, int b)';
var rpVoid = 'void congVaIn(int a, int b)';

var EX = {
ai:{inputs:[],
 intro:'Một hàm chỉ in (void) và một hàm return. Xem hàm nào để lại giá trị cho chương trình dùng tiếp. Bấm "Bước tiếp".',
 lines:function(){ return ['void congVaIn(int a, int b) {', '  cout << "Tong: " << a + b << endl;', '}', 'int tinhTong(int a, int b) {', '  return a + b;', '}', 'int main() {', '  congVaIn(5, 3);', '  tinhTong(5, 3);', '  int ketQua = tinhTong(5, 3);', '  cout << "Ket qua: " << ketQua;', '  return 0;', '}', '', '// Thử riêng trong main:', 'int kq = congVaIn(5, 3);']; },
 run:function(c){
  var s = 5 + 3;
  var P = function(st){ return [{name:'a', type:'int', v:5, s:st}, {name:'b', type:'int', v:3, s:st}]; };
  c.snap({ln:7, title:'Gọi congVaIn(5, 3)',
   body:'Hàm void nhận 5 và 3 vào a, b. Hàm này chỉ in, không có giá trị nào để trả về.',
   viz:vArgs({call:'congVaIn(5, 3)', args:[{v:'5'}, {v:'3'}], fn:rpVoid, params:P('new'), ret:{v:'', to:'none'}})});
  c.out('Tong: ' + s);
  c.snap({ln:1, title:'cout: chữ lên màn hình',
   body:'cout đẩy chữ "Tong: ' + s + '" lên Console rồi hết. Không có gì quay về dòng gọi, nên chương trình không lấy lại được số ' + s + '.',
   viz:[vFlow([{t:'congVaIn', s:'hi', sub:'void'}, {t:'Console', s:'ok', sub:'Tong: ' + s, item:String(s)}], {title:'Lối ra duy nhất: màn hình'}), vCard({kind:'warn', title:'Không có giá trị quay về', sub:'Dòng gọi không nhận được gì.'})]});
  c.snap({ln:8, title:'Gọi tinhTong(5, 3) một mình',
   body:'Hàm return tính ra ' + s + ' và trả về chỗ gọi. Nhưng dòng này không có biến nào đón, cũng không cout.',
   viz:vArgs({call:'tinhTong(5, 3)', args:[{v:'5'}, {v:'3'}], fn:rpSum, params:P('ok'), ret:{v:String(s), to:'trash'}})});
  c.snap({ln:9, title:'int ketQua = tinhTong(5, 3);',
   body:'Lần này có biến ketQua đón. Giá trị ' + s + ' trả về thay chỗ lời gọi hàm rồi rơi vào hộp ketQua.',
   viz:[vArgs({call:'tinhTong(5, 3)', args:[{v:'5'}, {v:'3'}], fn:rpSum, params:P('ok'), ret:{v:String(s), to:'ketQua'}}), vBoxes([{name:'ketQua', type:'int', v:s, s:'new'}], {frame:'main()'})]});
  c.out('Ket qua: ' + s);
  c.snap({ln:10, title:'Chủ động in ra',
   body:'return không tự in gì cả. Muốn thấy ' + s + ' trên màn hình phải tự viết cout.',
   viz:[vBoxes([{name:'ketQua', type:'int', v:s, s:'ok'}], {frame:'main()'}), vCard({kind:'ok', title:'Giá trị còn trong biến', sub:'Dùng lại được bao nhiêu lần cũng được.'})]});
  c.clear();
  c.snap({ln:15, title:'Thử gán kết quả hàm void',
   body:'congVaIn là hàm void, không trả giá trị. Thử cất "không có gì" vào biến kq.',
   viz:vArgs({call:'congVaIn(5, 3)', fn:rpVoid, params:P('ok'), ret:{v:'', to:'none'}, note:'Hàm void không có giá trị nào để đưa vào biến kq.'})});
  c.err('error: void value not ignored as it ought to be');
  c.snap({ln:15, title:'Lỗi biên dịch',
   body:'Máy báo lỗi vì hàm void không dùng được như một giá trị. Chương trình không chạy được.',
   viz:vErr({kind:'compile', msg:['error: void value not ignored as it ought to be'], code:'int kq = congVaIn(5, 3);'})});
  c.snap({ln:15, title:'Xong',
   body:'cout để người xem đọc. return để chương trình dùng tiếp.',
   note:'cout chỉ hiển thị cho người xem; return đưa giá trị về chỗ gọi. Hàm void không dùng được trong biểu thức.',
   viz:vCard({kind:'ok', title:'Ghi nhớ', rows:[['cout', 'hiển thị, rồi mất'], ['return', 'giá trị quay về chỗ gọi']]})});
 }},
dung:{inputs:[],
 intro:'Khi gặp return, hàm dừng ngay, các dòng phía sau không chạy. Bấm "Bước tiếp".',
 lines:function(){ return ['int kiemTraDiem(int diem) {', '  if (diem < 0 || diem > 10) {', '    cout << "Diem khong hop le!";', '    return -1;', '    cout << "Khong chay";', '  }', '  cout << "Diem hop le";', '  return diem * 10;', '}', 'int main() {', '  int a = kiemTraDiem(15);', '  cout << a << endl;', '  int b = kiemTraDiem(8);', '  cout << b << endl;', '  return 0;', '}']; },
 run:function(c){
  var fn = 'int kiemTraDiem(int diem)';
  var kt = function(d){ return (d < 0 || d > 10) ? -1 : d * 10; };
  var A = kt(15), B = kt(8);
  var PA = function(s){ return [{name:'diem', type:'int', v:15, s:s}]; };
  var PB = function(s){ return [{name:'diem', type:'int', v:8, s:s}]; };
  c.snap({ln:10, title:'Gọi kiemTraDiem(15)',
   body:'15 được chép vào ô diem. Điểm hợp lệ phải từ 0 đến 10.',
   viz:vArgs({call:'kiemTraDiem(15)', args:[{v:'15'}], fn:fn, params:PA('new')})});
  c.out('Diem khong hop le!');
  c.snap({ln:2, title:'15 > 10: vào khối if',
   body:'Điều kiện diem > 10 đúng, nên hàm in "Diem khong hop le!".',
   viz:[vArgs({call:'kiemTraDiem(15)', args:[{v:'15'}], fn:fn, params:PA('ok')}), vLamps([{t:'diem > 10', s:'ok', sub:'15 > 10'}])]});
  c.snap({ln:3, title:'return ' + A,
   body:'Gặp return, hàm dừng ngay và đưa ' + A + ' về chỗ gọi. Dòng cout ngay sau return bị bỏ qua, không bao giờ chạy.',
   dim:[4], dimLabel:'không chạy',
   viz:vArgs({call:'kiemTraDiem(15)', args:[{v:'15'}], fn:fn, params:PA('ok'), ret:{v:String(A), to:'a'}})});
  c.out(String(A));
  c.snap({ln:11, title:'In a',
   body:'Biến a nhận ' + A + ' và console in ra ' + A + '.',
   viz:vBoxes([{name:'a', type:'int', v:A, s:'ok'}], {frame:'main()'})});
  c.snap({ln:12, title:'Gọi kiemTraDiem(8)',
   body:'8 vào diem. Điều kiện diem < 0 hoặc diem > 10 là sai, nên khối if bị bỏ qua.',
   viz:[vArgs({call:'kiemTraDiem(8)', args:[{v:'8'}], fn:fn, params:PB('new')}), vLamps([{t:'diem < 0 || diem > 10', s:'bad', sub:'sai'}])]});
  c.out('Diem hop le');
  c.snap({ln:6, title:'In "Diem hop le"',
   body:'Không vào khối if, hàm chạy tiếp xuống dưới và in "Diem hop le".',
   viz:vArgs({call:'kiemTraDiem(8)', args:[{v:'8'}], fn:fn, params:PB('ok')})});
  c.snap({ln:7, title:'return ' + B,
   body:'8 * 10 = ' + B + ', trả về và cất vào biến b.',
   viz:[vArgs({call:'kiemTraDiem(8)', args:[{v:'8'}], fn:fn, params:PB('ok'), ret:{v:String(B), to:'b'}}), vBoxes([{name:'a', type:'int', v:A}, {name:'b', type:'int', v:B, s:'new'}], {frame:'main()'})]});
  c.out(String(B));
  c.snap({ln:13, title:'Xong',
   body:'Hai lần gọi, hai hướng khác nhau: return -1 để thoát sớm khi dữ liệu sai, return 80 ở cuối hàm khi dữ liệu đúng.',
   note:'return kết thúc hàm ngay lập tức; mọi dòng sau nó trong cùng khối đều không chạy. Dùng để thoát sớm khi dữ liệu không hợp lệ.',
   viz:vBoxes([{name:'a', type:'int', v:A, s:'ok'}, {name:'b', type:'int', v:B, s:'ok'}], {frame:'main()'})});
 }},
long:{inputs:[],
 intro:'Kết quả của hàm này có thể làm đối số cho hàm khác. Xem hàm nào chạy trước. Bấm "Bước tiếp".',
 lines:function(){ return ['int binhPhuong(int x) {', '  return x * x;', '}', 'int tongHaiBinhPhuong(int a, int b) {', '  return binhPhuong(a)', '       + binhPhuong(b);', '}', 'int main() {', '  cout << "Ket qua: "', '    << tongHaiBinhPhuong(', '         binhPhuong(2), 1);', '  return 0;', '}']; },
 run:function(c){
  var bp = function(x){ return x * x; };
  var tong = function(a, b){ return bp(a) + bp(b); };
  var B2 = bp(2), B4 = bp(B2), B1 = bp(1), T = tong(B2, 1);
  var fnB = 'int binhPhuong(int x)', fnT = 'int tongHaiBinhPhuong(int a, int b)';
  var main = {t:'main()', s:'ok'};
  c.snap({ln:9, title:'Hàm trong ngoặc chạy trước',
   body:'Muốn gọi tongHaiBinhPhuong thì phải có đối số ① trước, mà đối số ① chính là binhPhuong(2). Nên binhPhuong(2) chạy trước.',
   viz:[vArgs({call:'tongHaiBinhPhuong(binhPhuong(2), 1)', args:[{v:'binhPhuong(2)', s:'hi'}, {v:'1'}], fn:fnT, params:[{name:'a', type:'int'}, {name:'b', type:'int'}]}), vStack([main])]});
  c.snap({ln:1, title:'binhPhuong(2) trả về ' + B2,
   body:'2 * 2 = ' + B2 + '. Giá trị ' + B2 + ' thay chỗ lời gọi binhPhuong(2), thành đối số ① của hàm ngoài.',
   viz:[vArgs({call:'binhPhuong(2)', args:[{v:'2'}], fn:fnB, params:[{name:'x', type:'int', v:2, s:'ok'}], ret:{v:String(B2), to:'đối số ①'}}), vStack([main, {t:'binhPhuong(2)', s:'hi'}])]});
  c.snap({ln:9, title:'Gọi tongHaiBinhPhuong(' + B2 + ', 1)',
   body:'Giờ lời gọi trở thành tongHaiBinhPhuong(' + B2 + ', 1): ' + B2 + ' vào a, 1 vào b.',
   viz:[vArgs({call:'tongHaiBinhPhuong(' + B2 + ', 1)', args:[{v:String(B2), s:'new'}, {v:'1'}], fn:fnT, params:[{name:'a', type:'int', v:B2, s:'new'}, {name:'b', type:'int', v:1, s:'new'}]}), vStack([main, {t:'tongHaiBinhPhuong(' + B2 + ', 1)', s:'hi'}])]});
  c.snap({ln:4, title:'binhPhuong(a) = binhPhuong(' + B2 + ')',
   body:'Bên trong hàm, binhPhuong(' + B2 + ') trả về ' + B2 + ' * ' + B2 + ' = ' + B4 + '.',
   viz:[vArgs({call:'binhPhuong(a)', args:[{v:'a = ' + B2}], fn:fnB, params:[{name:'x', type:'int', v:B2, s:'ok'}], ret:{v:String(B4), to:''}}), vStack([main, {t:'tongHaiBinhPhuong(' + B2 + ', 1)'}, {t:'binhPhuong(' + B2 + ')', s:'hi'}])]});
  c.snap({ln:5, title:'binhPhuong(b) = binhPhuong(1)',
   body:'Tiếp theo binhPhuong(1) trả về 1 * 1 = ' + B1 + '.',
   viz:[vArgs({call:'binhPhuong(b)', args:[{v:'b = 1'}], fn:fnB, params:[{name:'x', type:'int', v:1, s:'ok'}], ret:{v:String(B1), to:''}}), vStack([main, {t:'tongHaiBinhPhuong(' + B2 + ', 1)'}, {t:'binhPhuong(1)', s:'hi'}])]});
  c.snap({ln:5, title:'Cộng hai kết quả: ' + T,
   body:B4 + ' + ' + B1 + ' = ' + T + '. Hàm ngoài return ' + T + ' về chỗ gọi trong main.',
   viz:[vArgs({call:'tongHaiBinhPhuong(' + B2 + ', 1)', args:[{v:String(B2)}, {v:'1'}], fn:fnT, params:[{name:'a', type:'int', v:B2}, {name:'b', type:'int', v:1}], ret:{v:String(T), to:'cout'}}), vStack([main, {t:'tongHaiBinhPhuong(' + B2 + ', 1)', s:'hi'}])]});
  c.out('Ket qua: ' + T);
  c.snap({ln:10, title:'Xong',
   body:'cout in ' + T + '. Không cần biến trung gian nào: giá trị return đi thẳng vào lời gọi tiếp theo.',
   note:'Giá trị return của hàm này dùng được ngay làm đối số cho hàm khác. Điều này không làm được với hàm chỉ cout.',
   viz:vCard({kind:'ok', title:'Kết quả lồng nhau', rows:[['binhPhuong(2)', String(B2)], ['tongHaiBinhPhuong(' + B2 + ', 1)', String(T)]]})});
 }}
};
