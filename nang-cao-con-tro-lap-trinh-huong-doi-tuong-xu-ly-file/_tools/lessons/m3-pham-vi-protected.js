// META {"module":3,"lesson":"Bài 3.2. Phạm vi truy cập protected","activity":"Phạm Vi Truy Cập protected (Khác Gì Với private?)","title":"private, protected và public: ai vào được phòng nào","lead":"Xem lớp con có vào được dữ liệu của lớp cha hay không, và so sánh ba mức truy cập. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["private","private chặn cả lớp con"],["protected","Đổi sang protected"]],"codeTitle":"Mã nguồn C++","path":"oop-2-tinh-ke-thua/pham-vi-truy-cap-protected/pham-vi-truy-cap-protected-khac-gi-voi-private/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Các phòng của lớp DongVat';

function p16Z(pub, pro, pri, tests, note){ return vZones({cls:'DongVat', zones:[{kind:'public', items:pub}, {kind:'protected', items:pro}, {kind:'private', items:pri}], tests:tests, note:note}); }

var EX = {
private:{inputs:[],
 intro:'Thuộc tính ten của DongVat đang để private. Lớp con Cho thử đọc nó. Bấm "Bước tiếp".',
 lines:function(){ return ['class DongVat {', 'private:', '  string ten;', 'public:', '  void setTen(string t) {', '    ten = t;', '  }', '};', 'class Cho : public DongVat {', 'public:', '  void inTen() {', '    cout << "Ten: " << ten << endl;', '  }', '};']; },
 run:function(c){
  var pub = ['setTen()'];
  c.snap({ln:1, title:'ten nằm trong phòng private', body:'private là phòng riêng: chỉ code bên trong chính lớp DongVat mới vào được.',
   viz:p16Z(pub, [], [{v:'string ten', s:'hi'}], [])});
  c.snap({ln:5, title:'setTen() gán ten', body:'setTen() nằm trong DongVat nên vào phòng private được.',
   viz:p16Z(pub, [], ['string ten'], [{who:'DongVat::setTen()', target:'ten', ok:true, note:'cùng lớp'}])});
  c.snap({ln:11, title:'Cho::inTen() đọc ten', body:'Cho là lớp con của DongVat, nhưng nó đứng ngoài phòng private. Hãy xem trình biên dịch nói gì.',
   viz:p16Z(pub, [], ['string ten'], [{who:'DongVat::setTen()', target:'ten', ok:true}, {who:'Cho::inTen()', target:'ten'}])});
  c.err("error: 'std::string DongVat::ten' is private within this context");
  c.snap({ln:11, title:'Bị chặn', body:'Lỗi biên dịch: ten là private. Dù Cho kế thừa DongVat, nó vẫn không gọi tên trực tiếp được thuộc tính private của cha.',
   viz:[p16Z(pub, [], [{v:'string ten', s:'bad'}], [{who:'DongVat::setTen()', target:'ten', ok:true}, {who:'Cho::inTen()', target:'ten', ok:false, note:'lớp con cũng bị chặn'}]),
        vErr({kind:'compile', msg:["error: 'std::string DongVat::ten' is private within this context"], code:'cout << "Ten: " << ten << endl;'})]});
  c.snap({ln:2, title:'Xong', body:'Với private, ngay cả lớp con cũng bị chặn. Muốn lớp con dùng được, đổi ten sang protected (xem tab kế).',
   note:'private chặn mọi nơi ngoài chính lớp đó, kể cả lớp con.',
   viz:p16Z(pub, [], [{v:'string ten', s:'bad'}], [{who:'DongVat::setTen()', target:'ten', ok:true}, {who:'Cho::inTen()', target:'ten', ok:false}])});
 }},
protected:{inputs:[],
 intro:'Giờ ten nằm trong phòng protected. Lớp con vào được, còn main() thì sao? Bấm "Bước tiếp".',
 lines:function(){ return ['class DongVat {', 'protected:', '  string ten;', 'public:', '  void setTen(string t) {', '    ten = t;', '  }', '};', 'class Cho : public DongVat {', 'public:', '  void inTen() {', '    cout << "Ten: " << ten << endl;', '  }', '};', 'int main() {', '  Cho c;', '  c.setTen("Mi Lu");', '  c.inTen();', '  // Thu them hai dong duoi day:', '  DongVat dv;', '  dv.ten = "Thu";', '}']; },
 run:function(c){
  var pub = ['setTen()'];
  c.snap({ln:1, title:'Đổi private thành protected', body:'ten chuyển sang phòng protected: phòng dành cho lớp này và các lớp con của nó.',
   viz:p16Z(pub, [{v:'string ten', s:'new'}], [], [])});
  c.snap({ln:16, title:'c.setTen("Mi Lu");', body:'setTen() là public nên main() gọi được. Bên trong, nó gán ten = "Mi Lu".',
   viz:p16Z(pub, ['string ten'], [], [{who:'main()', target:'c.setTen()', ok:true, note:'public: ai cũng gọi được'}])});
  c.out('Ten: Mi Lu');
  c.snap({ln:11, title:'Cho::inTen() đọc ten', body:'Lần này Cho vào được phòng protected, và in ra "Mi Lu".',
   viz:p16Z(pub, [{v:'string ten', s:'ok'}], [], [{who:'Cho::inTen()', target:'ten', ok:true, note:'lớp con: được'}])});
  c.clear();
  c.err("error: 'std::string DongVat::ten' is protected within this context");
  c.snap({ln:20, title:'main() thử dv.ten = "Thu";', body:'Giờ thử thêm hai dòng cuối vào main(). main() là người ngoài, nên bị chặn. Có lỗi biên dịch thì cả chương trình không chạy, console chỉ có lỗi.',
   viz:[p16Z(pub, [{v:'string ten', s:'bad'}], [], [{who:'main()', target:'dv.ten', ok:false, note:'người ngoài bị chặn'}]),
        vErr({kind:'compile', msg:["error: 'std::string DongVat::ten' is protected within this context"], code:'dv.ten = "Thu";'})]});
  c.snap({ln:1, title:'Xong', body:'protected không phải public: lớp con vào được, nhưng code bên ngoài vẫn bị chặn.',
   note:'protected = private với người ngoài, nhưng mở cửa cho lớp con.',
   viz:p16Z(pub, [{v:'string ten', s:'ok'}], [], [{who:'Cho::inTen()', target:'ten', ok:true}, {who:'main()', target:'dv.ten', ok:false}])});
 }}
};
