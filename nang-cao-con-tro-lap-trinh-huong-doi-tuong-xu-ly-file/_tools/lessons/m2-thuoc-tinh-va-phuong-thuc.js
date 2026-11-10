// META {"module":2,"lesson":"Bài 2.2. Thuộc tính và phương thức","activity":"Thuộc Tính (Attribute) Và Phương Thức (Method)","title":"Thuộc tính là dữ liệu, phương thức là hành động","lead":"Xem phương thức dùng thuộc tính của chính đối tượng, nhận thêm tham số từ bên ngoài, và gọi phương thức khác. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["taikhoan","Nạp/rút tiền"],["xeploai","Phương thức gọi phương thức"]],"codeTitle":"Mã nguồn C++","path":"oop-1-lop-doi-tuong-va-tinh-dong-goi/thuoc-tinh-va-phuong-thuc/thuoc-tinh-attribute-va-phuong-thuc-method/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Thẻ đối tượng và khung lời gọi';

/* Thẻ tk : TaiKhoan */
function b9Tk(soDu, s, hiSoDu, sub){
  return vBlueprint({cls:'TaiKhoan', fields:['string chuTaiKhoan', 'double soDu'], methods:['napTien(double)', 'rutTien(double)'],
    objs:[{name:'tk', s:s, sub:sub, vals:[['chuTaiKhoan', '"An"', ''], ['soDu', soDu === null ? '?' : soDu, soDu === null ? 'dim' : (hiSoDu || '')]]}], arrow:'tạo ra'});
}
/* Thẻ hs : HocSinh (tab 2) */
function b9Hs(s, note){
  return vBlueprint({cls:'HocSinh', fields:['string ten', 'int diemToan', 'int diemVan'], methods:['tinhDiemTrungBinh()', 'xepLoai()', 'inKetQua()'],
    objs:[{name:'hs', s:s, vals:[['ten', '"An"', ''], ['diemToan', 9, ''], ['diemVan', 8, '']]}], arrow:'tạo ra', note:note});
}
function b9Param(name, soTien){
  return vCard({kind:'info', title:'Khung ' + name + ' đang mở', rows:[['soTien (tham số, từ bên ngoài)', soTien]], tip:'soDu không cần truyền vào: lấy thẳng từ thẻ tk.'});
}
function b9Lamps(state){
  return vLamps([{t:'Đủ tiền: cho rút', s:state === 'ok' ? 'ok' : 'off'}, {t:'Không đủ: từ chối', s:state === 'bad' ? 'bad' : 'off'}], {title:'Trạm kiểm tra soTien > soDu'});
}

var EX = {
taikhoan:{inputs:[],
 intro:'Tài khoản tk có thuộc tính soDu. Xem napTien và rutTien dùng soDu và tham số soTien. Bấm "Bước tiếp".',
 lines:function(){ return ['class TaiKhoan {', 'public:', '  string chuTaiKhoan;', '  double soDu;', '  void napTien(double soTien) {', '    soDu = soDu + soTien;', '    cout << "Da nap " << soTien', '         << ". So du hien tai: "', '         << soDu << endl;', '  }', '  void rutTien(double soTien) {', '    if (soTien > soDu) {', '      cout << "Khong du tien de rut!"', '           << endl;', '    } else {', '      soDu = soDu - soTien;', '      cout << "Da rut " << soTien', '           << ". So du hien tai: "', '           << soDu << endl;', '    }', '  }', '};', 'int main() {', '  TaiKhoan tk;', '  tk.chuTaiKhoan = "An";', '  tk.soDu = 100000;', '  tk.napTien(50000);', '  tk.rutTien(30000);', '  tk.rutTien(200000);', '}']; },
 run:function(c){
  var d = 100000, nap = 50000, rut1 = 30000, rut2 = 200000;
  c.snap({ln:23, title:'TaiKhoan tk;',
   body:'Đối tượng tk ra đời. Chưa gán nên soDu chưa biết (?).',
   viz:b9Tk(null, 'new')});
  c.snap({ln:25, title:'Gán tên và số dư',
   body:'Thuộc tính soDu của tk bằng ' + d + '.',
   viz:b9Tk(d, 'hi', 'hi')});
  c.snap({ln:26, title:'tk.napTien(50000);',
   body:'Một khung nhỏ napTien mở ra, chứa tham số soTien = ' + nap + ' (dữ liệu từ bên ngoài đưa vào). soDu thì khung lấy thẳng từ thẻ tk.',
   viz:[b9Tk(d, 'hi'), b9Param('napTien', nap)]});
  d = d + nap;
  c.out('Da nap ' + nap + '. So du hien tai: ' + d);
  c.snap({ln:5, title:'soDu = soDu + soTien;',
   body:'100000 cộng 50000 được ' + d + ', rơi vào ô soDu. Phương thức kết thúc: khung tham số biến mất, soDu giữ giá trị mới.',
   viz:b9Tk(d, 'ok', 'hi')});
  c.snap({ln:27, title:'tk.rutTien(30000);',
   body:'Trước khi trừ, phương thức kiểm tra 30000 > ' + d + ' ? Sai, nên đèn xanh: đủ tiền.',
   viz:[b9Tk(d, 'hi'), b9Param('rutTien', rut1), b9Lamps('ok')]});
  d = d - rut1;
  c.out('Da rut ' + rut1 + '. So du hien tai: ' + d);
  c.snap({ln:15, title:'Trừ tiền và in',
   body:'soDu = 150000 - 30000 = ' + d + '.',
   viz:b9Tk(d, 'ok', 'hi')});
  c.out('Khong du tien de rut!');
  c.snap({ln:28, title:'tk.rutTien(200000);',
   body:'200000 > ' + d + ' ? Đúng, đèn đỏ: không đủ tiền. Phương thức từ chối, soDu giữ nguyên ' + d + '.',
   note:'Thuộc tính là đối tượng CÓ gì, phương thức là đối tượng LÀM gì. Phương thức tự dùng thuộc tính của đối tượng gọi nó; tham số chỉ để đưa dữ liệu từ ngoài vào.',
   viz:[b9Tk(d, 'ok', '', 'soDu không đổi'), b9Param('rutTien', rut2), b9Lamps('bad')]});
 }},
xeploai:{inputs:[],
 intro:'Học sinh hs có sẵn ten và điểm. Xem inKetQua() gọi các phương thức khác trong cùng lớp. Bấm "Bước tiếp".',
 lines:function(){ return ['double tinhDiemTrungBinh() {', '  return (diemToan + diemVan) / 2.0;', '}', 'string xepLoai() {', '  double dtb = tinhDiemTrungBinh();', '  if (dtb >= 8.0) return "Gioi";', '  else if (dtb >= 6.5) return "Kha";', '  else return "Trung binh";', '}', 'void inKetQua() {', '  cout << ten << " co diem trung binh "', '       << tinhDiemTrungBinh()', '       << ", xep loai: " << xepLoai()', '       << endl;', '}', '// main: hs.ten = "An";', '//   hs.diemToan = 9; hs.diemVan = 8;', 'hs.inKetQua();']; },
 run:function(c){
  var toan = 9, van = 8, dem = 0;
  var tb = (toan + van) / 2.0;
  var loai = tb >= 8.0 ? 'Gioi' : (tb >= 6.5 ? 'Kha' : 'Trung binh');
  var note = function(){ return 'tinhDiemTrungBinh() đã chạy: ' + dem + ' lần'; };
  var st = function(frames){ return vStack(frames.map(function(f, i){ return {t:f, s:i === frames.length - 1 ? 'hi' : ''}; })); };
  c.snap({ln:17, title:'hs.inKetQua();',
   body:'Khung inKetQua mở ra. Nó sẽ dùng ten và hai cột điểm của hs.',
   viz:[b9Hs('hi', note()), st(['inKetQua()'])]});
  c.write('An co diem trung binh ');
  c.snap({ln:10, title:'In tên',
   body:'In ten, rồi tới chỗ cần điểm trung bình nên gọi phương thức tinhDiemTrungBinh().',
   viz:[b9Hs('hi', note()), st(['inKetQua()'])]});
  dem++;
  c.write(String(tb));
  c.snap({ln:1, title:'tinhDiemTrungBinh()',
   body:'Khung mới chồng lên, đọc diemToan = ' + toan + ' và diemVan = ' + van + ' từ thẻ hs. (9 + 8) / 2.0 = ' + tb + ', trả về rồi khung đóng. Dùng 2.0 để ra số thực.',
   viz:[b9Hs('hi', note()), st(['inKetQua()', 'tinhDiemTrungBinh()'])]});
  c.write(', xep loai: ');
  c.snap({ln:12, title:'Gọi xepLoai()',
   body:'inKetQua() tiếp tục gọi xepLoai() để lấy xếp loại.',
   viz:[b9Hs('hi', note()), st(['inKetQua()', 'xepLoai()'])]});
  dem++;
  c.snap({ln:4, title:'xepLoai() gọi tinhDiemTrungBinh()',
   body:'Ngay trong xepLoai(), lại gọi tinhDiemTrungBinh() lần nữa: trả về ' + tb + ' như cũ. Đây là lần chạy thứ 2.',
   viz:[b9Hs('hi', note()), st(['inKetQua()', 'xepLoai()', 'tinhDiemTrungBinh()'])]});
  c.out(loai);
  c.snap({ln:5, title:'Xếp loại',
   body:tb + ' >= 8.0 đúng nên xepLoai() trả về "' + loai + '". Console in trọn dòng.',
   viz:[b9Hs('ok', note()), st(['inKetQua()'])]});
  c.snap({ln:13, title:'Xong',
   body:'Ba phương thức phối hợp: inKetQua() gọi cả hai, xepLoai() lại gọi tinhDiemTrungBinh(). Bộ đếm cho thấy tinhDiemTrungBinh() đã chạy ' + dem + ' lần.',
   note:'Các phương thức trong cùng lớp gọi được nhau và đều dùng chung thuộc tính của đối tượng.',
   viz:[b9Hs('ok', note())]});
 }}
};
