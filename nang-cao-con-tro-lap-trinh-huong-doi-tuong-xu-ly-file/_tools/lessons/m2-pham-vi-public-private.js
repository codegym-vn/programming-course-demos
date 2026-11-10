// META {"module":2,"lesson":"Bài 2.4. Phạm vi truy cập và tính đóng gói","activity":"Các Phạm Vi Truy Cập: public Và private","title":"public mở cửa, private khóa cửa","lead":"Xem code bên ngoài lớp bị chặn khi chạm vào private, còn phương thức của lớp thì vào thoải mái. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["ai","Ai vào được private?"],["kiem","private ép đi qua kiểm tra"],["cs","class và struct"]],"codeTitle":"Mã nguồn C++","path":"oop-1-lop-doi-tuong-va-tinh-dong-goi/pham-vi-truy-cap-va-tinh-dong-goi/cac-pham-vi-truy-cap-public-va-private/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Các phòng của lớp: private và public';

function p12Z(cls, priv, pub, tests, o){
  o = o || {};
  return vZones({cls:cls, zones:[{kind:'private', items:priv, s:o.ps}, {kind:'public', items:pub, s:o.us}], tests:tests, note:o.note});
}
var P12_SIGN = ['ganTen()', 'ganTuoi()', 'inThongTin()'];
var P12_ERR_TEN = "error: 'std::string HocSinh::ten' is private within this context";
var P12_ERR_SODU = "error: 'double TaiKhoan::soDu' is private within this context";
var P12_ERR_GT = "error: 'int ViDuClass::giaTri' is private within this context";

var EX = {
ai:{inputs:[],
 intro:'Lớp HocSinh giấu ten và tuoi trong phòng private. Xem ai vào được phòng đó. Bấm "Bước tiếp".',
 lines:function(){ return [
  'class HocSinh {', 'private:', '  string ten;', '  int tuoi;', 'public:', '  void ganTen(string t) {', '    ten = t;', '  }', '  void ganTuoi(int t) { tuoi = t; }',
  '  void inThongTin() {', '    cout << "Ten: " << ten', '      << ", Tuoi: " << tuoi << endl;', '  }', '};', '',
  'int main() {', '  HocSinh hs;', '  hs.ten = "An";', '  hs.ganTen("Nguyen Van An");', '  hs.ganTuoi(16);', '  hs.inThongTin();', '}']; },
 run:function(c){
  c.snap({ln:0, title:'Lớp có hai phòng',
   body:'Phòng private chứa ten và tuoi. Phòng public chứa 3 phương thức. private nghĩa là "chỉ code bên trong lớp mới được vào".',
   viz:p12Z('HocSinh', ['ten', 'tuoi'], P12_SIGN, null)});
  c.err(P12_ERR_TEN);
  c.snap({ln:17, title:'main() chạm vào ten',
   body:'main() nằm ngoài lớp nên bị chặn ngay khi biên dịch (dịch code thành chương trình). Chương trình không chạy được.',
   viz:[p12Z('HocSinh', [{v:'ten', s:'bad'}, 'tuoi'], P12_SIGN, [{who:'main()', target:'hs.ten', ok:false, note:'ten là private'}], {ps:'bad'}),
        vErr({kind:'compile', msg:[P12_ERR_TEN], code:'hs.ten = "An";'})]});
  c.clear();
  c.snap({ln:18, title:'Đi qua cửa public: ganTen',
   body:'Giả sử ta xóa dòng lỗi ở trên. main() gọi ganTen() là phương thức public, được phép. Bên trong ganTen(), dòng ten = t vẫn vào được phòng private.',
   viz:p12Z('HocSinh', [{v:'ten = "Nguyen Van An"', s:'new'}, 'tuoi = ?'], P12_SIGN,
    [{who:'main()', target:'hs.ganTen()', ok:true}, {who:'ganTen()', target:'ten', ok:true, note:'nằm trong lớp'}], {ps:'ok'})});
  c.snap({ln:19, title:'Tương tự với ganTuoi',
   body:'main() không chạm trực tiếp vào tuoi. Nó nhờ ganTuoi() (public) làm giúp.',
   viz:p12Z('HocSinh', ['ten = "Nguyen Van An"', {v:'tuoi = 16', s:'new'}], P12_SIGN,
    [{who:'main()', target:'hs.ganTuoi()', ok:true}, {who:'ganTuoi()', target:'tuoi', ok:true}], {ps:'ok'})});
  c.out('Ten: Nguyen Van An, Tuoi: 16');
  c.snap({ln:20, title:'inThongTin() đọc private',
   body:'inThongTin() cũng nằm trong lớp nên đọc được ten và tuoi rồi in ra màn hình.',
   viz:p12Z('HocSinh', [{v:'ten = "Nguyen Van An"', s:'hi'}, {v:'tuoi = 16', s:'hi'}], P12_SIGN,
    [{who:'main()', target:'hs.inThongTin()', ok:true}, {who:'inThongTin()', target:'ten, tuoi', ok:true}], {ps:'ok'})});
  c.snap({ln:21, title:'Xong',
   body:'Bên ngoài chỉ đi được qua cửa public. Bên trong lớp, phương thức dùng private thoải mái.',
   note:'private chặn code bên ngoài lớp ngay lúc biên dịch. Phương thức của lớp vẫn dùng private tự do.',
   viz:p12Z('HocSinh', ['ten', 'tuoi'], P12_SIGN,
    [{who:'main()', target:'hs.ten', ok:false}, {who:'main()', target:'hs.ganTen()', ok:true}, {who:'ganTen()', target:'ten', ok:true}])});
 }},
kiem:{inputs:[],
 intro:'Vì sao phải khóa? Xem lớp TaiKhoan dùng private để không ai gán số dư âm. Bấm "Bước tiếp".',
 lines:function(){ return [
  'class TaiKhoan {', 'private:', '  double soDu;', 'public:', '  void ganSoDu(double v) {', '    if (v < 0) {',
  '      cout << "Loi: So du am!\\n";', '      soDu = 0;', '    } else {', '      soDu = v;', '    }', '  }',
  '  double laySoDu() { return soDu; }', '};', '',
  'int main() {', '  TaiKhoan tk;', '  tk.soDu = -500000;', '  tk.ganSoDu(-500000);', '  cout << tk.laySoDu() << endl;', '  tk.ganSoDu(100000);', '  cout << tk.laySoDu() << endl;', '}']; },
 run:function(c){
  var SG = ['ganSoDu()', 'laySoDu()'];
  var LAMP = function(s, sub){ return vLamps([{t:'v >= 0 ?', s:s, sub:sub}], {title:'Trạm kiểm tra của ganSoDu'}); };
  c.snap({ln:0, title:'soDu nằm trong phòng private',
   body:'Mọi thay đổi của soDu phải đi qua ganSoDu(). Trong đó có trạm kiểm tra: số âm thì không cho qua.',
   viz:p12Z('TaiKhoan', ['soDu = ?'], SG, null)});
  c.err(P12_ERR_SODU);
  c.snap({ln:17, title:'tk.soDu = -500000;',
   body:'main() muốn gán thẳng vào soDu để lách qua trạm kiểm tra. Nhưng soDu là private nên bị chặn lúc biên dịch.',
   viz:[p12Z('TaiKhoan', [{v:'soDu = ?', s:'bad'}], SG, [{who:'main()', target:'tk.soDu', ok:false, note:'không có đường vòng'}], {ps:'bad'}),
        vErr({kind:'compile', msg:[P12_ERR_SODU], code:'tk.soDu = -500000;'})]});
  c.clear();
  c.out('Loi: So du am!');
  c.snap({ln:18, title:'Đi qua ganSoDu(-500000)',
   body:'Giả sử ta xóa dòng lỗi. Số -500000 bị trạm kiểm tra chặn. ganSoDu() báo lỗi và đặt soDu về 0.',
   viz:[LAMP('bad', '-500000: chặn'), p12Z('TaiKhoan', [{v:'soDu = 0', s:'new'}], SG, [{who:'main()', target:'tk.ganSoDu()', ok:true}], {ps:'ok'})]});
  c.out('0');
  c.snap({ln:19, title:'In số dư',
   body:'laySoDu() trả về soDu. Số âm không lọt vào được: số dư vẫn hợp lệ.',
   viz:p12Z('TaiKhoan', [{v:'soDu = 0', s:'hi'}], SG, [{who:'main()', target:'tk.laySoDu()', ok:true}], {ps:'ok'})});
  c.snap({ln:20, title:'ganSoDu(100000)',
   body:'100000 không âm nên qua được trạm kiểm tra, soDu = 100000.',
   viz:[LAMP('ok', '100000: cho qua'), p12Z('TaiKhoan', [{v:'soDu = 100000', s:'new'}], SG, [{who:'main()', target:'tk.ganSoDu()', ok:true}], {ps:'ok'})]});
  c.out('100000');
  c.snap({ln:21, title:'Xong',
   body:'Không có đường nào vòng qua trạm kiểm tra, vì cửa duy nhất vào soDu là ganSoDu().',
   note:'private ép mọi thay đổi đi qua phương thức public, nơi ta đặt luật kiểm tra dữ liệu.',
   viz:p12Z('TaiKhoan', ['soDu = 100000'], SG, [{who:'main()', target:'tk.soDu', ok:false}, {who:'main()', target:'tk.ganSoDu()', ok:true}])});
 }},
cs:{inputs:[],
 intro:'Quên không ghi public hay private thì sao? class và struct xử lý khác nhau. Bấm "Bước tiếp".',
 lines:function(){ return [
  'class ViDuClass {', '  int giaTri;', '};', 'struct ViDuStruct {', '  int giaTri;', '};', '',
  'int main() {', '  ViDuClass vd1;', '  vd1.giaTri = 10;', '  ViDuStruct vd2;', '  vd2.giaTri = 10;', '  cout << vd2.giaTri << endl;', '}']; },
 run:function(c){
  var CL = function(s){ return vZones({cls:'ViDuClass', zones:[{kind:'private', items:[{v:'giaTri', s:s === 'bad' ? 'bad' : 'new'}], s:s}], title:'class: không ghi gì', note:'Mặc định là private'}); };
  var ST = function(s){ return vZones({cls:'ViDuStruct', zones:[{kind:'public', items:[{v:'giaTri', s:'new'}], s:s}], title:'struct: không ghi gì', note:'Mặc định là public'}); };
  c.snap({ln:0, title:'class không ghi gì',
   body:'Trong class, thành viên không ghi public hay private sẽ tự rơi vào phòng private.',
   viz:CL()});
  c.snap({ln:3, title:'struct không ghi gì',
   body:'struct giống class, chỉ khác một điểm: thành viên không ghi gì sẽ tự là public.',
   viz:[CL(), ST()]});
  c.err(P12_ERR_GT);
  c.snap({ln:9, title:'vd1.giaTri = 10;',
   body:'Với class, giaTri là private nên main() bị chặn lúc biên dịch.',
   viz:[vZones({cls:'ViDuClass', zones:[{kind:'private', items:[{v:'giaTri', s:'bad'}], s:'bad'}], tests:[{who:'main()', target:'vd1.giaTri', ok:false}]}),
        vErr({kind:'compile', msg:[P12_ERR_GT], code:'vd1.giaTri = 10;'})]});
  c.clear();
  c.snap({ln:11, title:'vd2.giaTri = 10;',
   body:'Giả sử ta xóa dòng lỗi. Với struct, giaTri là public nên main() gán được.',
   viz:vZones({cls:'ViDuStruct', zones:[{kind:'public', items:[{v:'giaTri = 10', s:'new'}], s:'ok'}], tests:[{who:'main()', target:'vd2.giaTri', ok:true}]})});
  c.out('10');
  c.snap({ln:12, title:'Xong',
   body:'In ra 10. Cùng cách gán giá trị, class bị chặn còn struct thì chạy được.',
   note:'class mặc định private, struct mặc định public. Nên ghi rõ public hay private để khỏi nhầm.',
   viz:vPair(vZones({cls:'ViDuClass', zones:[{kind:'private', items:['giaTri']}]}), vZones({cls:'ViDuStruct', zones:[{kind:'public', items:['giaTri']}]}), {ta:'class', tb:'struct'})});
 }}
};
