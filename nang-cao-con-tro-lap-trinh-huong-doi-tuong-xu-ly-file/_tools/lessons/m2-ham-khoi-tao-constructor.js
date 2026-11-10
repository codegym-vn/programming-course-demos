// META {"module":2,"lesson":"Bài 2.3. Hàm tạo và hàm huỷ","activity":"Hàm Khởi Tạo (Constructor)","title":"Constructor tự chạy khi đối tượng ra đời","lead":"Xem constructor tự lấp đầy thuộc tính, được chọn theo đối số, và biến mất khi bạn viết constructor có tham số. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["khongctor","Không có constructor"],["napchong","Nạp chồng: hs1 và hs2"],["loi","Lỗi: mất constructor mặc định"]],"codeTitle":"Mã nguồn C++","path":"oop-1-lop-doi-tuong-va-tinh-dong-goi/ham-tao-va-ham-huy/ham-khoi-tao-constructor/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Khuôn lớp, ổ cắm constructor và đối tượng';

function b10Obj(name, ten, tuoi, s, sub){
  return {name:name, s:s, sub:sub, vals:[['ten', ten === null ? '""' : '"' + ten + '"', ten === null ? 'dim' : 'hi'], ['tuoi', tuoi === null ? '?' : tuoi, tuoi === null ? 'bad' : 'hi']]};
}
function b10Bp(objs, o){
  o = o || {};
  return vBlueprint({cls:'HocSinh', fields:['string ten', 'int tuoi'], ctor:o.ctor, ctorS:o.ctorS, objs:objs, arrow:'dập ra', note:o.note});
}

var EX = {
khongctor:{inputs:[],
 intro:'Lớp HocSinh chưa có constructor. Xem một đối tượng mới ra đời mang gì trong các ô. Bấm "Bước tiếp".',
 lines:function(){ return ['class HocSinh {', 'public:', '  string ten;', '  int tuoi;', '};', 'int main() {', '  HocSinh hs;', '  cout << "Ten: [" << hs.ten', '       << "]" << endl;', '  cout << "Tuoi: " << hs.tuoi', '       << endl;', '}']; },
 run:function(c){
  c.snap({ln:4, title:'Lớp chưa có constructor',
   body:'Khuôn chỉ có hai thuộc tính, chưa có ổ constructor nào. Chưa có đối tượng trong RAM.',
   viz:b10Bp([])});
  c.snap({ln:6, title:'HocSinh hs;',
   body:'Đối tượng hs ra đời. string tự là chuỗi rỗng, còn int tuoi không được gán gì nên mang số rác (hiện ?).',
   viz:b10Bp([b10Obj('hs', null, null, 'new', 'tuoi: giá trị rác')])});
  c.out('Ten: []');
  c.snap({ln:7, title:'In ten',
   body:'Chuỗi rỗng nên in ra hai dấu ngoặc trống.',
   viz:b10Bp([b10Obj('hs', null, null, '')])});
  c.out('Tuoi: -603392240');
  c.snap({ln:9, title:'In tuoi',
   body:'In ra một số vô nghĩa. Mỗi lần chạy, số này một khác.',
   note:'string tự rỗng, int thì không. Muốn mọi thuộc tính có giá trị đúng ngay lúc ra đời, hãy dùng constructor.',
   viz:b10Bp([b10Obj('hs', null, null, 'bad', 'tuoi: giá trị rác')])});
 }},
napchong:{inputs:[],
 intro:'Lớp có hai constructor. Xem C++ chọn ổ nào theo số đối số, và constructor tự chạy mà không cần gọi tên. Bấm "Bước tiếp".',
 lines:function(){ return ['class HocSinh {', 'public:', '  string ten;', '  int tuoi;', '  HocSinh() {', '    ten = "Chua co ten";', '    tuoi = 0;', '    cout << "Da tao (khong tham so)"', '         << endl;', '  }', '  HocSinh(string t, int a) {', '    ten = t; tuoi = a;', '    cout << "Da tao (co tham so): "', '         << ten << endl;', '  }', '};', 'int main() {', '  HocSinh hs1;', '  HocSinh hs2("Tran Thi Binh", 17);', '  cout << "hs1: " << hs1.ten << ", "', '       << hs1.tuoi << endl;', '  cout << "hs2: " << hs2.ten << ", "', '       << hs2.tuoi << endl;', '}']; },
 run:function(c){
  var CT = 'HocSinh()  |  HocSinh(string, int)';
  c.snap({ln:15, title:'Khuôn có hai ổ constructor',
   body:'Ổ HocSinh() không nhận gì, ổ HocSinh(string, int) nhận hai giá trị. Chưa có đối tượng.',
   viz:b10Bp([], {ctor:CT})});
  c.out('Da tao (khong tham so)');
  c.snap({ln:17, title:'HocSinh hs1;',
   body:'Không có đối số nên C++ cắm vào ổ HocSinh(). Ổ sáng, thân chạy: ten = "Chua co ten", tuoi = 0.',
   viz:b10Bp([b10Obj('hs1', 'Chua co ten', 0, 'new')], {ctor:'HocSinh()  (đang chạy)', ctorS:'hi'})});
  c.out('Da tao (co tham so): Tran Thi Binh');
  c.snap({ln:18, title:'HocSinh hs2("Tran Thi Binh", 17);',
   body:'Có 2 đối số (một chuỗi, một số) nên C++ cắm vào ổ HocSinh(string, int) và điền hai ô của hs2.',
   viz:b10Bp([b10Obj('hs1', 'Chua co ten', 0, ''), b10Obj('hs2', 'Tran Thi Binh', 17, 'new')], {ctor:'HocSinh(string, int)  (đang chạy)', ctorS:'hi'})});
  c.out('hs1: Chua co ten, 0');
  c.snap({ln:19, title:'In hs1',
   body:'Chú ý: không có dòng nào gọi tên constructor. Nó tự chạy ngay khi đối tượng ra đời.',
   viz:b10Bp([b10Obj('hs1', 'Chua co ten', 0, 'ok'), b10Obj('hs2', 'Tran Thi Binh', 17, '')], {ctor:CT})});
  c.out('hs2: Tran Thi Binh, 17');
  c.snap({ln:21, title:'Xong',
   body:'Cả hai đối tượng đều có giá trị đúng từ lúc ra đời.',
   note:'Constructor trùng tên lớp, không có kiểu trả về, tự chạy khi tạo đối tượng; C++ chọn constructor theo đối số.',
   viz:b10Bp([b10Obj('hs1', 'Chua co ten', 0, 'ok'), b10Obj('hs2', 'Tran Thi Binh', 17, 'ok')], {ctor:CT})});
 }},
loi:{inputs:[],
 intro:'Lớp chỉ viết constructor có tham số. Xem điều gì xảy ra khi tạo đối tượng không đối số. Bấm "Bước tiếp".',
 lines:function(){ return ['class HocSinh {', 'public:', '  string ten;', '  int tuoi;', '  HocSinh(string t, int a) {', '    ten = t;', '    tuoi = a;', '  }', '};', 'int main() {', '  HocSinh hs;', '}']; },
 run:function(c){
  var MSG = ["error: no matching function for call to 'HocSinh::HocSinh()'", "note: candidate: 'HocSinh::HocSinh(std::string, int)'"];
  c.snap({ln:4, title:'Chỉ viết constructor có tham số',
   body:'Khuôn chỉ có một ổ: HocSinh(string, int).',
   viz:b10Bp([], {ctor:'HocSinh(string, int)'})});
  c.snap({ln:4, title:'C++ không còn tự tặng constructor mặc định',
   body:'Khi bạn đã tự viết một constructor, C++ không tặng thêm ổ HocSinh() không tham số nữa.',
   viz:b10Bp([], {ctor:'HocSinh(string, int)', ctorS:'hi', note:'Không còn ổ HocSinh()'})});
  c.err(MSG[0]); c.err(MSG[1]);
  c.snap({ln:10, title:'HocSinh hs;',
   body:'Không có đối số nên cần ổ HocSinh(), nhưng ổ đó không tồn tại. Trình biên dịch báo lỗi.',
   viz:[b10Bp([], {ctor:'HocSinh(string, int)', ctorS:'dim'}), vErr({kind:'compile', msg:MSG, code:'HocSinh hs;', note:'Không sinh file chạy'})]});
  c.snap({ln:4, title:'Cách sửa',
   body:'Viết thêm constructor không tham số HocSinh() { ... }, hoặc tạo đối tượng có đối số: HocSinh hs("An", 16);.',
   note:'Đã viết constructor có tham số thì phải tự viết thêm constructor không tham số nếu còn cần tạo đối tượng không đối số.',
   viz:[b10Bp([], {ctor:'HocSinh()  |  HocSinh(string, int)'}), vCard({kind:'ok', title:'Đã sửa', sub:'Thêm lại HocSinh() { ... }'})]});
 }}
};
