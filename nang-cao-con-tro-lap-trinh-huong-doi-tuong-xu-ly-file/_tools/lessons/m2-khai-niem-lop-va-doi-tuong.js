// META {"module":2,"lesson":"Bài 2.1. Lớp và đối tượng","activity":"Khái Niệm Lớp (Class) Và Đối Tượng (Object)","title":"Một khuôn, nhiều đối tượng","lead":"Xem lớp HocSinh là bản thiết kế, mỗi lần khai báo là một đối tượng riêng. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["khuon","Một khuôn – hai đối tượng"],["sua","Sửa hs1, hs2 không đổi"],["phuongthuc","Cùng phương thức, khác dữ liệu"]],"codeTitle":"Mã nguồn C++","path":"oop-1-lop-doi-tuong-va-tinh-dong-goi/lop-va-doi-tuong/khai-niem-lop-class-va-doi-tuong-object/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Khuôn lớp và các đối tượng trong RAM';

/* Thẻ đối tượng HocSinh: ten null = chuỗi rỗng "", tuoi null = chưa gán (?) */
function b8Hs(name, ten, tuoi, s, o){
  o = o || {};
  return {name:name, s:s, sub:o.sub,
    vals:[['ten', ten === null ? '""' : '"' + ten + '"', ten === null ? 'dim' : (o.hiTen ? 'hi' : '')],
          ['tuoi', tuoi === null ? '?' : tuoi, tuoi === null ? 'dim' : (o.hiTuoi ? 'hi' : (o.okTuoi ? 'ok' : ''))]]};
}
function b8Bp(objs, o){
  o = o || {};
  return vBlueprint({cls:'HocSinh', fields:['string ten', 'int tuoi'], methods:o.methods, objs:objs, arrow:'dập ra', note:o.note});
}

var EX = {
khuon:{inputs:[],
 intro:'Lớp HocSinh là một khuôn. Xem mỗi lần khai báo đối tượng, khuôn "dập" ra một thẻ mới. Bấm "Bước tiếp".',
 lines:function(){ return ['class HocSinh {', 'public:', '  string ten;', '  int tuoi;', '};', 'int main() {', '  HocSinh hs1;', '  hs1.ten = "Nguyen Van An";', '  hs1.tuoi = 16;', '  HocSinh hs2;', '  hs2.ten = "Tran Thi Binh";', '  hs2.tuoi = 17;', '  cout << hs1.ten << endl', '       << hs2.ten << endl;', '}']; },
 run:function(c){
  c.snap({ln:0, title:'class HocSinh {…};',
   body:'Đây chỉ là bản thiết kế: nó ghi rằng một HocSinh có ten và tuoi. Chưa có học sinh nào trong RAM.',
   viz:b8Bp([])});
  c.snap({ln:6, title:'HocSinh hs1;',
   body:'Khuôn dập ra một đối tượng hs1 với vùng nhớ riêng. ten tự là chuỗi rỗng, còn tuoi chưa gán nên chưa biết (?).',
   viz:b8Bp([b8Hs('hs1', null, null, 'new')])});
  c.snap({ln:7, title:'hs1.ten = "Nguyen Van An";',
   body:'Dấu chấm nghĩa là "của hs1": giá trị rơi vào ô ten của hs1.',
   viz:b8Bp([b8Hs('hs1', 'Nguyen Van An', null, 'hi', {hiTen:1})])});
  c.snap({ln:8, title:'hs1.tuoi = 16;',
   body:'Ô tuoi của hs1 nhận 16.',
   viz:b8Bp([b8Hs('hs1', 'Nguyen Van An', 16, 'hi', {hiTuoi:1})])});
  c.snap({ln:9, title:'HocSinh hs2;',
   body:'Khuôn dập thêm một đối tượng nữa. hs2 có ô riêng, chưa liên quan gì tới hs1.',
   viz:b8Bp([b8Hs('hs1', 'Nguyen Van An', 16, ''), b8Hs('hs2', null, null, 'new')])});
  c.snap({ln:10, title:'hs2.ten = "Tran Thi Binh";',
   body:'Gán ten cho hs2. Thẻ hs1 không bị đụng tới.',
   viz:b8Bp([b8Hs('hs1', 'Nguyen Van An', 16, ''), b8Hs('hs2', 'Tran Thi Binh', null, 'hi', {hiTen:1})])});
  c.snap({ln:11, title:'hs2.tuoi = 17;',
   body:'Gán tuoi cho hs2. Hai đối tượng cùng khuôn nhưng mang dữ liệu khác nhau.',
   viz:b8Bp([b8Hs('hs1', 'Nguyen Van An', 16, ''), b8Hs('hs2', 'Tran Thi Binh', 17, 'hi', {hiTuoi:1})])});
  c.out('Nguyen Van An'); c.out('Tran Thi Binh');
  c.snap({ln:12, title:'In tên hai học sinh',
   body:'Mỗi lệnh in lấy ten từ đúng đối tượng được gọi tên.',
   note:'Lớp (class) là khuôn, không chứa dữ liệu. Đối tượng (object) là sản phẩm có dữ liệu riêng. Truy cập bằng dấu chấm.',
   viz:b8Bp([b8Hs('hs1', 'Nguyen Van An', 16, 'ok'), b8Hs('hs2', 'Tran Thi Binh', 17, 'ok')])});
 }},
sua:{inputs:[],
 intro:'Hai học sinh đã có dữ liệu. Sửa hs1 rồi xem hs2 có đổi không. Bấm "Bước tiếp".',
 lines:function(){ return ['// class HocSinh {…} như trước', 'HocSinh hs1;', 'hs1.ten = "An"; hs1.tuoi = 16;', 'HocSinh hs2;', 'hs2.ten = "Binh"; hs2.tuoi = 17;', 'cout << hs1.tuoi << " "', '     << hs2.tuoi << endl;', 'hs1.tuoi = 99;', 'cout << hs1.tuoi << " "', '     << hs2.tuoi << endl;']; },
 run:function(c){
  c.snap({ln:2, title:'Tạo hs1',
   body:'hs1 có ten = "An", tuoi = 16.',
   viz:b8Bp([b8Hs('hs1', 'An', 16, 'new')])});
  c.snap({ln:4, title:'Tạo hs2',
   body:'hs2 có ten = "Binh", tuoi = 17. Hai thẻ nằm ở hai chỗ khác nhau trong RAM.',
   viz:b8Bp([b8Hs('hs1', 'An', 16, ''), b8Hs('hs2', 'Binh', 17, 'new')])});
  c.out('16 17');
  c.snap({ln:6, title:'In trước khi sửa',
   body:'In tuoi của hs1 rồi hs2: 16 và 17.',
   viz:b8Bp([b8Hs('hs1', 'An', 16, 'ok'), b8Hs('hs2', 'Binh', 17, 'ok')])});
  c.snap({ln:7, title:'hs1.tuoi = 99;',
   body:'Chỉ ô tuoi của hs1 đổi thành 99. Thẻ hs2 không đổi: vẫn là 17.',
   viz:b8Bp([b8Hs('hs1', 'An', 99, 'hi', {hiTuoi:1}), b8Hs('hs2', 'Binh', 17, '', {okTuoi:1, sub:'không đổi: 17'})])});
  c.out('99 17');
  c.snap({ln:9, title:'In sau khi sửa',
   body:'hs1.tuoi thành 99, còn hs2.tuoi vẫn 17.',
   note:'Mỗi đối tượng có vùng nhớ riêng, sửa đối tượng này không ảnh hưởng đối tượng kia.',
   viz:b8Bp([b8Hs('hs1', 'An', 99, 'ok'), b8Hs('hs2', 'Binh', 17, 'ok', {sub:'không đổi: 17'})])});
 }},
phuongthuc:{inputs:[],
 intro:'Lớp có thêm phương thức gioiThieu(). Xem cùng một phương thức chạy trên dữ liệu của đối tượng nào gọi nó. Bấm "Bước tiếp".',
 lines:function(){ return ['class HocSinh {', 'public:', '  string ten;', '  int tuoi;', '  void gioiThieu() {', '    cout << "Xin chao, toi ten la "', '         << ten << ", nam nay "', '         << tuoi << " tuoi." << endl;', '  }', '};', 'int main() {', '  HocSinh hs1, hs2;', '  hs1.ten = "An"; hs1.tuoi = 16;', '  hs2.ten = "Binh"; hs2.tuoi = 17;', '  hs1.gioiThieu();', '  hs2.gioiThieu();', '}']; },
 run:function(c){
  var M = ['gioiThieu()'];
  var call = function(ten, tuoi, who){ return vCard({kind:'info', title:'Trong gioiThieu(): ' + who + ' đang gọi', rows:[['ten', '"' + ten + '"'], ['tuoi', tuoi]], tip:'ten và tuoi lấy từ ' + who + '.'}); };
  c.snap({ln:4, title:'Khuôn có thêm gioiThieu()',
   body:'Phương thức được viết một lần trong khuôn. Đối tượng chỉ giữ dữ liệu, không giữ bản sao của phương thức.',
   viz:b8Bp([], {methods:M})});
  c.snap({ln:11, title:'HocSinh hs1, hs2;',
   body:'Hai đối tượng được tạo, chưa có dữ liệu.',
   viz:b8Bp([b8Hs('hs1', null, null, 'new'), b8Hs('hs2', null, null, 'new')], {methods:M})});
  c.snap({ln:13, title:'Gán dữ liệu',
   body:'hs1 là An, 16 tuổi. hs2 là Binh, 17 tuổi.',
   viz:b8Bp([b8Hs('hs1', 'An', 16, 'ok'), b8Hs('hs2', 'Binh', 17, 'ok')], {methods:M})});
  c.snap({ln:14, title:'hs1.gioiThieu();',
   body:'Thẻ hs1 sáng lên. Trong thân hàm, ten là "An" và tuoi là 16, vì hs1 là đối tượng đang gọi.',
   viz:[b8Bp([b8Hs('hs1', 'An', 16, 'hi'), b8Hs('hs2', 'Binh', 17, 'dim')], {methods:M}), call('An', 16, 'hs1')]});
  c.out('Xin chao, toi ten la An, nam nay 16 tuoi.');
  c.snap({ln:14, title:'In lời giới thiệu của hs1',
   body:'Console in dòng chào bằng dữ liệu của An.',
   viz:b8Bp([b8Hs('hs1', 'An', 16, 'ok'), b8Hs('hs2', 'Binh', 17, 'dim')], {methods:M})});
  c.snap({ln:15, title:'hs2.gioiThieu();',
   body:'Cùng phương thức, nhưng lần này thẻ hs2 sáng: ten là "Binh", tuoi là 17.',
   viz:[b8Bp([b8Hs('hs1', 'An', 16, 'dim'), b8Hs('hs2', 'Binh', 17, 'hi')], {methods:M}), call('Binh', 17, 'hs2')]});
  c.out('Xin chao, toi ten la Binh, nam nay 17 tuoi.');
  c.snap({ln:15, title:'Xong',
   body:'Hai dòng chào khác nhau dù chỉ có một đoạn code phương thức.',
   note:'Phương thức viết một lần trong khuôn; dữ liệu lấy từ đối tượng đang gọi.',
   viz:b8Bp([b8Hs('hs1', 'An', 16, 'ok'), b8Hs('hs2', 'Binh', 17, 'ok')], {methods:M})});
 }}
};
