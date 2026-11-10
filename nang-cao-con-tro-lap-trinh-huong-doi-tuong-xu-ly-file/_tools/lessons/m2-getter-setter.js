// META {"module":2,"lesson":"Bài 2.4. Phạm vi truy cập và tính đóng gói","activity":"Tính Đóng Gói: Tại Sao Cần Getter & Setter?","title":"Setter canh cổng, Getter mở cửa sổ","lead":"Xem Setter chặn giá trị sai, Getter cho đọc, và đổi luật trong Setter mà main() không phải sửa. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["tuoi","setTuoi kiểm tra hợp lệ"],["doc","Chỉ đọc: maSoHocSinh"],["luat","Đổi luật Setter, main không đổi"]],"codeTitle":"Mã nguồn C++","path":"oop-1-lop-doi-tuong-va-tinh-dong-goi/pham-vi-truy-cap-va-tinh-dong-goi/tinh-dong-goi-tai-sao-can-getter-setter/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Đối tượng: dữ liệu private, cửa public';

function g13Z(cls, priv, pub, tests, o){
  o = o || {};
  return vZones({cls:cls, zones:[{kind:'private', items:priv, s:o.ps}, {kind:'public', items:pub, s:o.us}], tests:tests, note:o.note});
}

var EX = {
tuoi:{inputs:[],
 intro:'setTuoi() là cổng có trạm kiểm tra, getTuoi() là cửa sổ để đọc. Thử gán 16, -5 và 200. Bấm "Bước tiếp".',
 lines:function(){ return [
  'class HocSinh {', 'private:', '  int tuoi;', 'public:', '  void setTuoi(int t) {', '    if (t > 0 && t < 100) {', '      tuoi = t;', '    } else {',
  '      cout << "Tuoi khong hop le!"', '        << " Giu nguyen gia tri cu."', '        << endl;', '    }', '  }', '  int getTuoi() { return tuoi; }', '};', '',
  'int main() {', '  HocSinh hs;', '  hs.setTuoi(16);', '  cout << hs.getTuoi() << endl;', '  hs.setTuoi(-5);', '  cout << hs.getTuoi() << endl;',
  '  hs.setTuoi(200);', '  cout << hs.getTuoi() << endl;', '}']; },
 run:function(c){
  var PUB = ['setTuoi()  (cổng vào)', 'getTuoi()  (cửa sổ)'];
  var lamps = function(t){ return vLamps([{t:'t > 0', s:t > 0 ? 'ok' : 'bad'}, {t:'t < 100', s:t < 100 ? 'ok' : 'bad'}], {title:'Trạm kiểm tra: setTuoi(' + t + ')'}); };
  var pass = function(t){ return t > 0 && t < 100; };
  var tuoi = '?';
  c.snap({ln:0, title:'Dữ liệu private, cửa public',
   body:'tuoi nằm trong phòng private. Bên ngoài chỉ có hai cửa: setTuoi() để gán và getTuoi() để đọc.',
   viz:g13Z('HocSinh', ['tuoi = ?'], PUB, null)});
  var vals = [16, -5, 200], lnSet = [18, 20, 22];
  vals.forEach(function(t, i){
    var ok = pass(t);
    if (!ok) c.out('Tuoi khong hop le! Giu nguyen gia tri cu.');
    if (ok) tuoi = t;
    c.snap({ln:lnSet[i], title:'hs.setTuoi(' + t + ')',
     body: ok ? t + ' vượt qua cả hai đèn nên được gán: tuoi = ' + t + '.'
              : t + ' làm một đèn đỏ. Giá trị bị bật ra, tuoi giữ nguyên ' + tuoi + ', và console báo lỗi.',
     viz:[lamps(t), g13Z('HocSinh', [{v:'tuoi = ' + tuoi, s: ok ? 'new' : 'hi'}], PUB, [{who:'main()', target:'hs.setTuoi(' + t + ')', ok:true}], {ps: ok ? 'ok' : 'bad'})]});
    c.out(String(tuoi));
    c.snap({ln:lnSet[i] + 1, title:'hs.getTuoi()',
     body:'getTuoi() cho nhìn thấy tuoi hiện tại: ' + tuoi + '. Chỉ đọc, không sửa được gì.',
     viz:g13Z('HocSinh', [{v:'tuoi = ' + tuoi, s:'hi'}], PUB, [{who:'main()', target:'hs.getTuoi()', ok:true, note:'chỉ đọc'}], {ps:'ok'})});
  });
  c.snap({ln:23, title:'Xong',
   body:'Hai giá trị sai (-5 và 200) đều bị chặn. tuoi luôn là số hợp lệ.',
   note:'Setter giữ dữ liệu luôn hợp lệ. Getter cho đọc dữ liệu private.',
   viz:g13Z('HocSinh', ['tuoi = ' + tuoi], PUB, null)});
 }},
doc:{inputs:[],
 intro:'Muốn một thuộc tính không bao giờ bị đổi? Chỉ viết Getter, không viết Setter. Bấm "Bước tiếp".',
 lines:function(){ return [
  'class HocSinh {', 'private:', '  string maSoHocSinh;', '  string ten;', 'public:', '  HocSinh(string ma, string t) {', '    maSoHocSinh = ma;', '    ten = t;', '  }',
  '  string getMaSoHocSinh() {', '    return maSoHocSinh;', '  }', '  void setTen(string t) { ten = t; }', '  string getTen() { return ten; }', '};', '',
  'int main() {', '  HocSinh hs("HS001", "Nguyen Van An");', '  cout << hs.getMaSoHocSinh() << endl;', '  hs.setTen("Tran Van B");',
  '  cout << hs.getTen() << endl;', '  hs.setMaSoHocSinh("HS002");', '}']; },
 run:function(c){
  var PUB = function(s){ return ['HocSinh()  (constructor)', 'getMaSoHocSinh()', 'setTen()', 'getTen()']; };
  var ERR = "error: 'class HocSinh' has no member named 'setMaSoHocSinh'; did you mean 'getMaSoHocSinh'?";
  c.snap({ln:0, title:'Chỉ có Getter cho maSoHocSinh',
   body:'maSoHocSinh có getMaSoHocSinh() nhưng không có setMaSoHocSinh(). ten thì có cả getter lẫn setter.',
   viz:g13Z('HocSinh', ['maSoHocSinh', 'ten'], PUB(), null, {note:'Không có cổng set cho maSoHocSinh'})});
  c.snap({ln:16, title:'Constructor điền hai ô',
   body:'Hàm tạo (constructor) chạy khi tạo hs và đặt giá trị đầu cho cả hai thuộc tính. Đây là lần duy nhất maSoHocSinh được gán.',
   viz:g13Z('HocSinh', [{v:'maSoHocSinh = "HS001"', s:'new'}, {v:'ten = "Nguyen Van An"', s:'new'}], PUB(), [{who:'main()', target:'HocSinh("HS001", ...)', ok:true}], {ps:'ok'})});
  c.out('HS001');
  c.snap({ln:18, title:'hs.getMaSoHocSinh()',
   body:'Cửa sổ chỉ đọc: nhìn thấy mã số HS001.',
   viz:g13Z('HocSinh', [{v:'maSoHocSinh = "HS001"', s:'hi'}, 'ten = "Nguyen Van An"'], PUB(), [{who:'main()', target:'hs.getMaSoHocSinh()', ok:true, note:'chỉ đọc'}], {ps:'ok'})});
  c.out('Tran Van B');
  c.snap({ln:19, title:'hs.setTen("Tran Van B")',
   body:'ten có setter nên đổi được. maSoHocSinh vẫn là HS001.',
   viz:g13Z('HocSinh', ['maSoHocSinh = "HS001"', {v:'ten = "Tran Van B"', s:'new'}], PUB(), [{who:'main()', target:'hs.setTen()', ok:true}], {ps:'ok'})});
  c.clear();
  c.err(ERR);
  c.snap({ln:21, title:'Thử đổi maSoHocSinh',
   body:'Hàm setMaSoHocSinh() không tồn tại, nên trình biên dịch báo lỗi ngay. Mã số không có cổng nào để sửa.',
   viz:[g13Z('HocSinh', [{v:'maSoHocSinh = "HS001"', s:'bad'}, 'ten = "Tran Van B"'], PUB(), [{who:'main()', target:'hs.setMaSoHocSinh()', ok:false, note:'không có hàm này'}], {ps:'bad'}),
        vErr({kind:'compile', msg:[ERR], code:'hs.setMaSoHocSinh("HS002");'})]});
  c.snap({ln:21, title:'Xong',
   body:'Không viết Setter nghĩa là thuộc tính chỉ đọc từ bên ngoài.',
   note:'Thuộc tính không nên bị đổi sau khi tạo thì chỉ cần Getter, không cần Setter.',
   viz:g13Z('HocSinh', ['maSoHocSinh  (chỉ đọc)', 'ten'], PUB(), null)});
 }},
luat:{inputs:[],
 intro:'Thêm một luật vào Setter mà không sửa dòng nào trong main(). Bấm "Bước tiếp".',
 lines:function(){ return [
  'class TaiKhoan {', 'private:', '  double soDu;', 'public:', '  TaiKhoan() { soDu = 0; }', '  void setSoDu(double v) {', '    if (v < 0) {', '      cout << "Loi: am!" << endl;', '      return;', '    }',
  '    if (v > 1000000000) {', '      cout << "Loi: qua lon!" << endl;', '      return;', '    }', '    soDu = v;', '  }', '  double getSoDu() { return soDu; }', '};', '',
  'int main() {', '  TaiKhoan tk;', '  tk.setSoDu(-100);', '  tk.setSoDu(2000000000);', '  tk.setSoDu(500000);', '  cout << tk.getSoDu() << endl;', '}']; },
 run:function(c){
  var NEWL = [10, 11, 12, 13];
  var SG = ['setSoDu()', 'getSoDu()'];
  var oldL = function(v){ return vLamps([{t:'v >= 0', s: v >= 0 ? 'ok' : 'bad', sub:'luật 1: không âm'}], {title:'Trạm kiểm tra trong setSoDu(' + v + ')'}); };
  var newL = function(v){ return vLamps([{t:'v >= 0', s: v >= 0 ? 'ok' : 'bad', sub:'luật 1: không âm'}, {t:'v <= 1 tỷ', s: v < 0 ? 'off' : (v <= 1000000000 ? 'ok' : 'bad'), sub:'luật 2: mới thêm'}], {title:'Trạm kiểm tra trong setSoDu(' + v + ')'}); };
  var snapOld = function(o){ o.dim = NEWL; o.dimLabel = 'chưa có luật này'; c.snap(o); };
  snapOld({ln:5, title:'Setter cũ chỉ có 1 luật',
   body:'Ban đầu setSoDu() chỉ kiểm tra số không âm. Các dòng mờ là luật chưa tồn tại. main() gọi setSoDu() 3 lần.',
   viz:[oldL(0), g13Z('TaiKhoan', ['soDu = 0'], SG, null)]});
  c.out('Loi: am!');
  snapOld({ln:21, title:'setSoDu(-100)',
   body:'-100 bị đèn đỏ chặn, soDu giữ nguyên 0.',
   viz:[oldL(-100), g13Z('TaiKhoan', ['soDu = 0'], SG, null, {ps:'bad'})]});
  snapOld({ln:22, title:'setSoDu(2000000000)',
   body:'Luật cũ cho qua vì 2 tỷ không âm. soDu = 2 tỷ. Đó là số quá lớn, ta muốn chặn nó.',
   viz:[oldL(2000000000), vCard({kind:'warn', title:'Lọt qua trạm kiểm tra', sub:'soDu = 2000000000, quá lớn'})]});
  c.clear();
  c.snap({ln:10, title:'Thêm luật mới vào Setter',
   body:'Ta thêm luật "không quá 1 tỷ" vào đúng một chỗ: bên trong setSoDu(). Đèn thứ hai xuất hiện. Phần main() giữ nguyên.',
   viz:[newL(500000), vScore([{k:'main(): dòng phải sửa', v:'0', s:'ok'}, {k:'setSoDu(): luật', v:'2'}])]});
  c.out('Loi: am!');
  c.snap({ln:21, title:'Chạy lại: setSoDu(-100)',
   body:'Đèn 1 đỏ: -100 bị chặn như trước.',
   viz:newL(-100)});
  c.out('Loi: qua lon!');
  c.snap({ln:22, title:'Chạy lại: setSoDu(2000000000)',
   body:'Đèn 1 xanh nhưng đèn 2 đỏ: 2 tỷ bị chặn. Cùng dòng gọi trong main(), kết quả đã khác.',
   viz:newL(2000000000)});
  c.snap({ln:23, title:'setSoDu(500000)',
   body:'Cả hai đèn xanh nên 500000 được gán.',
   viz:[newL(500000), g13Z('TaiKhoan', [{v:'soDu = 500000', s:'new'}], SG, null, {ps:'ok'})]});
  c.out('500000');
  c.snap({ln:24, title:'Xong',
   body:'Nếu soDu là public và được gán trực tiếp ở 5 nơi, thêm luật mới phải sửa cả 5 nơi. Dùng Setter chỉ sửa 1 nơi.',
   note:'Đổi luật ở đúng một chỗ trong Setter. Các nơi gọi Setter không phải sửa.',
   viz:vScore([{k:'soDu public, gán ở 5 nơi', v:'sửa 5 chỗ', s:'bad'}, {k:'Dùng Setter', v:'sửa 1 chỗ', s:'ok'}])});
 }}
};
