// META {"module":2,"lesson":"Bài 2.3. Hàm tạo và hàm huỷ","activity":"Hàm huỷ (Destructor) và vòng đời đối tượng","title":"Đối tượng sinh ra và mất đi","lead":"Xem mỗi đối tượng bật khi constructor chạy, tắt khi destructor chạy. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["den","Bật/tắt đèn: vòng đời"],["bangdiem","BangDiem: mượn và trả bộ nhớ"],["rori","Quên delete: rò rỉ"]],"codeTitle":"Mã nguồn C++","path":"oop-1-lop-doi-tuong-va-tinh-dong-goi/ham-tao-va-ham-huy/ham-huy-destructor-va-vong-doi-doi-tuong/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Vòng đời đối tượng và bộ nhớ';

var EX = {
den:{inputs:[],
 intro:'Mỗi đối tượng Den là một bóng đèn: constructor bật, destructor tắt. Bấm "Bước tiếp".',
 lines:function(){ return ['// Den: constructor in "Bat den ..."', '//      destructor in "Tat den ..."', 'void diQuaHanhLang() {', '  Den d("Hanh lang");', '  cout << "Dang di qua hanh lang";', '}', 'int main() {', '  cout << "Bat dau main";', '  Den a("Phong khach");', '  {', '    Den b("Phong ngu");', '    cout << "Trong khoi lenh";', '  }', '  diQuaHanhLang();', '  Den c("Nha bep");', '  Den *p = new Den("Ban cong");', '  delete p;', '  cout << "Ket thuc main";', '}']; },
 run:function(c){
  var EV = ['a ra đời', 'b ra đời', 'ra khỏi { }', 'vào hàm', 'ra khỏi hàm', 'c ra đời', 'new', 'xóa p', 'hết main'];
  var tl = function(now, bars, note){ return vTimeline({events:EV, now:now, bars:bars, note:note}); };
  var A = function(to){ return {name:'a', from:0, to:to, end:'tắt'}; };
  c.out('Bat dau main');
  c.out('Bat den Phong khach');
  c.snap({ln:8, title:'Den a("Phong khach");',
   body:'Constructor chạy, đèn a bật. Thanh của a bắt đầu.',
   viz:tl(0, [A(null)])});
  c.out('Bat den Phong ngu'); c.out('Trong khoi lenh');
  c.snap({ln:11, title:'Vào khối { }',
   body:'b ra đời bên trong khối { }, đèn b bật.',
   viz:tl(1, [A(null), {name:'b', from:1, to:null, s:'hi'}])});
  c.out('Tat den Phong ngu');
  c.snap({ln:12, title:'Ra khỏi khối }',
   body:'Chương trình ra khỏi } nên destructor của b chạy ngay: đèn b tắt, thanh b kết thúc.',
   viz:tl(2, [A(null), {name:'b', from:1, to:2, end:'tắt'}])});
  c.out('Bat den Hanh lang'); c.out('Dang di qua hanh lang'); c.out('Tat den Hanh lang');
  c.snap({ln:13, title:'Gọi diQuaHanhLang();',
   body:'d ra đời khi hàm chạy và bị hủy khi hàm kết thúc. Gọi hàm 2 lần sẽ có 2 cặp bật/tắt.',
   viz:tl(4, [A(null), {name:'b', from:1, to:2, end:'tắt'}, {name:'d', from:3, to:4, end:'tắt'}])});
  c.out('Bat den Nha bep'); c.out('Bat den Ban cong');
  c.snap({ln:15, title:'Den c; rồi new Den',
   body:'c bật. Lệnh new tạo thêm đèn Ban cong, nằm ở vùng Heap, bật ngay.',
   viz:tl(6, [A(null), {name:'b', from:1, to:2, end:'tắt'}, {name:'d', from:3, to:4, end:'tắt'}, {name:'c', from:5, to:null}, {name:'*p', from:6, to:null, s:'hi'}])});
  c.out('Tat den Ban cong');
  c.snap({ln:16, title:'delete p;',
   body:'Đối tượng tạo bằng new chỉ tắt khi gọi delete. Destructor chạy, đèn Ban cong tắt.',
   viz:tl(7, [A(null), {name:'b', from:1, to:2, end:'tắt'}, {name:'d', from:3, to:4, end:'tắt'}, {name:'c', from:5, to:null}, {name:'*p', from:6, to:7, end:'tắt'}])});
  c.out('Ket thuc main'); c.out('Tat den Nha bep'); c.out('Tat den Phong khach');
  c.snap({ln:18, title:'Dấu } của main',
   body:'c được tạo sau a nên tắt trước: Nha bep tắt rồi mới tới Phong khach. Vào sau, ra trước.',
   note:'Đối tượng cục bộ tự hủy khi ra khỏi phạm vi, theo thứ tự ngược thứ tự tạo. Đối tượng new chỉ hủy khi delete.',
   viz:tl(8, [A(8), {name:'b', from:1, to:2, end:'tắt'}, {name:'d', from:3, to:4, end:'tắt'}, {name:'c', from:5, to:8, end:'tắt'}, {name:'*p', from:6, to:7, end:'tắt'}], 'Thứ tự tắt cuối main: c trước, a sau.')});
 }},
bangdiem:{inputs:[],
 intro:'BangDiem mượn một mảng ở Heap bằng new[] và trả lại bằng destructor. Bấm "Bước tiếp".',
 lines:function(){ return ['class BangDiem {', '  int *diem; int soMon;', 'public:', '  BangDiem(int n) {', '    soMon = n;', '    diem = new int[soMon];', '    // gán 0 cho mọi ô, rồi in', '  }', '  ~BangDiem() {', '    delete[] diem;', '    cout << "Da giai phong ...";', '  }', '  // nhapDiem(), tinhTrungBinh()', '};', 'int main() {', '  BangDiem bd(3);', '  bd.nhapDiem(0, 8);', '  bd.nhapDiem(1, 7);', '  bd.nhapDiem(2, 9);', '  cout << bd.tinhTrungBinh();', '}']; },
 run:function(c){
  var d = [0, 0, 0], BYTES = function(n){ return n * 4 + ' byte'; };
  var view = function(arr, s, hi){
    var mem = arr ? vCells(arr.map(function(v){ return {v:v, s:s}; }), {name:'Heap: mảng bd.diem (new int[3])', idx:true, ptr:hi, ptrLabel:'diem'}) : vCells([], {name:'Heap: trống'});
    return [vScore([{k:'Bộ nhớ đang mượn', v:arr ? BYTES(arr.length) : '0 byte', s:arr ? 'hi' : 'ok'}]), mem];
  };
  c.out('Da cap phat bang diem 3 mon');
  c.snap({ln:15, title:'BangDiem bd(3);',
   body:'Constructor chạy: new int[3] mượn 3 ô ở Heap (mỗi ô 4 byte, tổng 12 byte), gán 0 cho từng ô.',
   viz:view(d.slice(), 'new', 0)});
  d[0] = 8;
  c.snap({ln:16, title:'bd.nhapDiem(0, 8);',
   body:'Ô số 0 nhận 8.',
   viz:view(d.slice(), '', 0)});
  d[1] = 7;
  c.snap({ln:17, title:'bd.nhapDiem(1, 7);',
   body:'Ô số 1 nhận 7.',
   viz:view(d.slice(), '', 1)});
  d[2] = 9;
  c.snap({ln:18, title:'bd.nhapDiem(2, 9);',
   body:'Ô số 2 nhận 9.',
   viz:view(d.slice(), '', 2)});
  var tb = (d[0] + d[1] + d[2]) / 3;
  c.out('Diem trung binh: ' + tb);
  c.snap({ln:19, title:'bd.tinhTrungBinh()',
   body:'Tổng 8 + 7 + 9 = 24, chia 3 được ' + tb + '. Console in ra.',
   viz:view(d.slice(), 'ok')});
  c.out('Da giai phong bang diem');
  c.snap({ln:20, title:'Dấu } của main',
   body:'bd hết phạm vi nên destructor tự chạy: delete[] diem trả 3 ô về cho máy. Bộ nhớ đang mượn về 0.',
   note:'Destructor là nơi trả lại tài nguyên đã mượn. Không cần nhớ gọi: chỉ cần đối tượng hết phạm vi.',
   viz:view(null)});
 }},
rori:{inputs:[],
 intro:'Lần này lệnh delete bị quên. Xem đối tượng tạo bằng new có tự tắt không. Bấm "Bước tiếp".',
 lines:function(){ return ['// Den như ở tab 1', 'int main() {', '  Den c("Nha bep");', '  Den *p = new Den("Ban cong");', '  // quên: delete p;', '  cout << "Ket thuc main";', '}']; },
 run:function(c){
  var EV = ['c ra đời', 'new', 'hết main'];
  var tl = function(now, bars, note){ return vTimeline({events:EV, now:now, bars:bars, note:note}); };
  c.out('Bat den Nha bep');
  c.snap({ln:2, title:'Den c("Nha bep");',
   body:'c bật, thanh c bắt đầu.',
   viz:tl(0, [{name:'c', from:0, to:null}])});
  c.out('Bat den Ban cong');
  c.snap({ln:3, title:'Den *p = new Den("Ban cong");',
   body:'Đèn Ban cong ở vùng Heap bật.',
   viz:tl(1, [{name:'c', from:0, to:null}, {name:'*p', from:1, to:null, s:'hi'}])});
  c.out('Ket thuc main');
  c.snap({ln:5, title:'Ket thuc main',
   body:'Không có lệnh delete p nào cả.',
   viz:tl(1, [{name:'c', from:0, to:null}, {name:'*p', from:1, to:null, s:'hi'}])});
  c.out('Tat den Nha bep');
  c.snap({ln:6, title:'Dấu } của main',
   body:'Chỉ c tắt. Ban cong không bao giờ tắt: destructor của nó không chạy, thanh đỏ cho thấy bộ nhớ bị rò rỉ.',
   note:'Mỗi new cần một delete. Quên delete thì destructor không chạy và bộ nhớ bị rò rỉ.',
   viz:tl(2, [{name:'c', from:0, to:2, end:'tắt'}, {name:'*p', from:1, to:null, leak:true}])});
 }}
};
