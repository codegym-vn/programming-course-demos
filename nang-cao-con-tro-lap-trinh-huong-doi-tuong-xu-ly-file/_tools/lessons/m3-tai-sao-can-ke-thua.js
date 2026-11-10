// META {"module":3,"lesson":"Bài 3.1. Kế thừa và cú pháp kế thừa","activity":"Tại Sao Cần Kế Thừa? Tư Duy Tái Sử Dụng Trong OOP","title":"Gom phần chung lên lớp cha","lead":"Xem hai lớp viết lặp code, rồi gom phần chung lên lớp cha để chỉ sửa một chỗ. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["lap","Viết lặp ở hai lớp"],["gom","Gom lên lớp cha"],["sua","Sửa một chỗ ở lớp cha"]],"codeTitle":"Mã nguồn C++","path":"oop-2-tinh-ke-thua/ke-thua-va-cu-phap-ke-thua/tai-sao-can-ke-thua-tu-duy-tai-su-dung-trong-oop/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Sơ đồ lớp và bộ đếm';

var K_GT = ['gioiThieu()'];
var EX = {
lap:{inputs:[],
 intro:'HocSinh và SinhVien đều cần ten, tuoi và gioiThieu(). Nếu viết hai lớp riêng thì code bị lặp. Bấm "Bước tiếp".',
 lines:function(){ return [
  'class HocSinh {', 'public:', '  string ten;', '  int tuoi;', '  void gioiThieu() {', '    cout << "Toi ten la " << ten', '         << ", " << tuoi << " tuoi.\\n";', '  }', '};',
  'class SinhVien {', 'public:', '  string ten;', '  int tuoi;', '  void gioiThieu() {', '    cout << "Toi ten la " << ten', '         << ", " << tuoi << " tuoi.\\n";', '  }', '  string truongDaiHoc;', '};']; },
 run:function(c){
  var hs = function(h){ return {id:'HocSinh', name:'HocSinh', attrs:[{t:'ten', hi:h}, {t:'tuoi', hi:h}], methods:[{t:'gioiThieu()', hi:h}], c:0, r:0, hi:false}; };
  var sv = function(h){ return {id:'SinhVien', name:'SinhVien', attrs:[{t:'ten', hi:h}, {t:'tuoi', hi:h}, {t:'truongDaiHoc'}], methods:[{t:'gioiThieu()', hi:h}], c:1, r:0}; };
  var dem = function(n, b, s){ return vScore([{k:'dòng trùng lặp', v:String(n), s:s}, {k:'bản gioiThieu()', v:String(b)}]); };
  c.snap({ln:0, title:'Lớp HocSinh', body:'HocSinh có ten, tuoi và phương thức gioiThieu() để tự giới thiệu.',
   uml:{boxes:[hs(false)], links:[]}, viz:dem(0, 1)});
  c.snap({ln:9, title:'Lớp SinhVien', body:'SinhVien cũng cần ten, tuoi và gioiThieu(), nên ta chép y hệt sang. Chỉ có truongDaiHoc là riêng.',
   uml:{boxes:[hs(false), sv(false)], links:[]}, viz:dem(0, 2)});
  c.snap({ln:11, title:'Những dòng bị chép lại',
   body:'ten, tuoi và cả 5 dòng của gioiThieu() được viết hai lần. Các phần tô vàng là chỗ trùng.',
   uml:{boxes:[hs(true), sv(true)], links:[]}, viz:dem(6, 2, 'bad')});
  c.snap({ln:5, title:'Nếu cần sửa câu giới thiệu',
   body:'Muốn đổi lời giới thiệu, ta phải nhớ sửa ở cả hai lớp. Quên một nơi là hai lớp nói khác nhau.',
   uml:{boxes:[hs(true), sv(true)], links:[]}, viz:[dem(6, 2, 'bad'), vCard({kind:'warn', title:'Phải sửa 2 nơi', sub:'càng nhiều lớp, càng nhiều nơi cần sửa'})]});
  c.snap({ln:18, title:'Xong', body:'Viết lặp tốn công và dễ sai. Cách tốt hơn là gom phần chung vào một chỗ.',
   note:'Hai lớp có nhiều phần giống nhau thì code bị lặp, và sửa phải sửa nhiều nơi.',
   uml:{boxes:[hs(true), sv(true)], links:[]}, viz:dem(6, 2, 'bad')});
 }},
gom:{inputs:[],
 intro:'Gom phần chung vào lớp cha NguoiHoc, lớp con chỉ viết phần riêng. Bấm "Bước tiếp".',
 lines:function(){ return [
  'class NguoiHoc {', 'public:', '  string ten;', '  int tuoi;', '  void gioiThieu() {', '    cout << "Toi ten la " << ten', '         << ", " << tuoi << " tuoi.\\n";', '  }', '};',
  'class HocSinh : public NguoiHoc {', 'public:', '  string truongCap3;', '};', 'class SinhVien : public NguoiHoc {', 'public:', '  string truongDaiHoc;', '};',
  'int main() {', '  SinhVien sv;', '  sv.ten = "Binh";', '  sv.tuoi = 20;', '  sv.truongDaiHoc = "Bach Khoa";', '  sv.gioiThieu();', '}']; },
 run:function(c){
  var cha = function(h){ return {id:'NguoiHoc', name:'NguoiHoc', attrs:[{t:'ten', hi:h}, {t:'tuoi', hi:h}], methods:[{t:'gioiThieu()', hi:h}], c:0, r:0, hi:h}; };
  var hs = {id:'HocSinh', name:'HocSinh', attrs:['truongCap3'], methods:[], c:0, r:1};
  var sv = {id:'SinhVien', name:'SinhVien', attrs:['truongDaiHoc'], methods:[], c:1, r:1};
  var kt = function(a){ return {a:a, b:'NguoiHoc', type:'inherit'}; };
  c.snap({ln:0, title:'Lớp cha NguoiHoc', body:'Phần chung (ten, tuoi, gioiThieu) chỉ viết một lần, trong lớp cha NguoiHoc.',
   uml:{boxes:[cha(true)], links:[]}, viz:vScore([{k:'bản gioiThieu()', v:'1'}])});
  c.snap({ln:9, title:'HocSinh kế thừa NguoiHoc', body:'Dấu ": public NguoiHoc" nghĩa là HocSinh thừa hưởng mọi thứ của NguoiHoc. Mũi tên chỉ lên lớp cha. HocSinh chỉ viết thêm truongCap3.',
   uml:{boxes:[cha(false), hs], links:[kt('HocSinh')]}, viz:vScore([{k:'bản gioiThieu()', v:'1'}])});
  c.snap({ln:13, title:'SinhVien kế thừa NguoiHoc', body:'SinhVien cũng kế thừa NguoiHoc và chỉ viết thêm truongDaiHoc.',
   uml:{boxes:[cha(false), hs, sv], links:[kt('HocSinh'), kt('SinhVien')]}, viz:vScore([{k:'bản gioiThieu()', v:'1', s:'ok'}, {k:'dòng trùng lặp', v:'0', s:'ok'}])});
  c.snap({ln:18, title:'Tạo sv và gán dữ liệu', body:'sv dùng được ten và tuoi dù SinhVien không tự viết chúng: chúng đến từ NguoiHoc.',
   uml:{boxes:[cha(false), hs, {id:'SinhVien', name:'SinhVien', attrs:['truongDaiHoc'], methods:[], c:1, r:1, hi:true}], links:[kt('HocSinh'), kt('SinhVien')]},
   viz:vScore([{k:'sv.ten', v:'"Binh"'}, {k:'sv.tuoi', v:'20'}, {k:'sv.truongDaiHoc', v:'"Bach Khoa"'}])});
  c.snap({ln:22, title:'Gọi sv.gioiThieu()', body:'C++ tìm gioiThieu() ở SinhVien: không có. Nó đi lên lớp cha NguoiHoc: có, nên dùng bản này.',
   uml:{boxes:[cha(false), hs, sv], links:[kt('HocSinh'), kt('SinhVien')]},
   viz:vLookup({call:'sv.gioiThieu()', chain:[{cls:'SinhVien', m:'gioiThieu()', has:false, s:'no'}, {cls:'NguoiHoc', m:'gioiThieu()', has:true, s:'ok'}]})});
  c.out('Toi ten la Binh, 20 tuoi.');
  c.snap({ln:22, title:'Kết quả', body:'In ra lời giới thiệu của sv.',
   uml:{boxes:[cha(true), hs, sv], links:[kt('HocSinh'), kt('SinhVien')]}, viz:vScore([{k:'bản gioiThieu()', v:'1', s:'ok'}])});
  c.snap({ln:23, title:'Xong', body:'Sau khi gom, chỉ còn 1 bản gioiThieu() và 0 dòng lặp. Cách viết cú pháp kế thừa sẽ học kỹ ở bài sau.',
   note:'Lớp cha chứa phần chung, lớp con chỉ thêm phần riêng.',
   uml:{boxes:[cha(false), hs, sv], links:[kt('HocSinh'), kt('SinhVien')]},
   viz:vPair(vScore([{k:'bản gioiThieu()', v:'2', s:'bad'}, {k:'dòng lặp', v:'6', s:'bad'}]), vScore([{k:'bản gioiThieu()', v:'1', s:'ok'}, {k:'dòng lặp', v:'0', s:'ok'}]), {ta:'Trước khi gom', tb:'Sau khi gom', mid:'→'})});
 }},
sua:{inputs:[],
 intro:'Muốn đổi lời giới thiệu cho cả HocSinh và SinhVien thì sửa ở đâu? Bấm "Bước tiếp".',
 lines:function(){ return [
  'class NguoiHoc {', 'public:', '  string ten;', '  int tuoi;', '  void gioiThieu() {', '    cout << "Xin chao! Toi ten "', '         << ten << ", nam nay "', '         << tuoi << " tuoi.\\n";', '  }', '};',
  'class HocSinh : public NguoiHoc {};', 'class SinhVien : public NguoiHoc {};', 'int main() {', '  HocSinh hs;', '  hs.ten = "An";', '  hs.tuoi = 16;', '  hs.gioiThieu();',
  '  SinhVien sv;', '  sv.ten = "Binh";', '  sv.tuoi = 20;', '  sv.gioiThieu();', '}']; },
 run:function(c){
  var cha = function(h){ return {id:'NguoiHoc', name:'NguoiHoc', attrs:['ten', 'tuoi'], methods:[{t:'gioiThieu()', hi:h}], c:0, r:0, hi:h}; };
  var kids = function(hs, sv){ return [{id:'HocSinh', name:'HocSinh', attrs:[], methods:[], c:0, r:1, hi:hs}, {id:'SinhVien', name:'SinhVien', attrs:[], methods:[], c:1, r:1, hi:sv}]; };
  var kt = [{a:'HocSinh', b:'NguoiHoc', type:'inherit'}, {a:'SinhVien', b:'NguoiHoc', type:'inherit'}];
  var U = function(h, hs, sv){ return {boxes:[cha(h)].concat(kids(hs, sv)), links:kt}; };
  c.snap({ln:4, title:'Chỉ có một gioiThieu()', body:'gioiThieu() chỉ nằm trong NguoiHoc. HocSinh và SinhVien đều dùng bản này.',
   uml:U(false, false, false), viz:vScore([{k:'nơi cần sửa', v:'1', s:'ok'}])});
  c.snap({ln:5, title:'Sửa câu ở lớp cha', body:'Ta đổi câu thành "Xin chao! Toi ten ..., nam nay ... tuoi." Chỉ sửa đúng một chỗ trong NguoiHoc.',
   uml:U(true, false, false), viz:vScore([{k:'nơi đã sửa', v:'1', s:'ok'}, {k:'HocSinh, SinhVien phải sửa', v:'0', s:'ok'}])});
  c.out('Xin chao! Toi ten An, nam nay 16 tuoi.');
  c.snap({ln:16, title:'hs.gioiThieu()', body:'HocSinh không có gioiThieu() riêng nên đi lên NguoiHoc và in câu mới.',
   uml:U(true, true, false), viz:vLookup({call:'hs.gioiThieu()', chain:[{cls:'HocSinh', m:'gioiThieu()', has:false, s:'no'}, {cls:'NguoiHoc', m:'gioiThieu()', has:true, s:'ok'}]})});
  c.out('Xin chao! Toi ten Binh, nam nay 20 tuoi.');
  c.snap({ln:20, title:'sv.gioiThieu()', body:'SinhVien cũng đi lên NguoiHoc và in câu mới, dù code của SinhVien không đổi dòng nào.',
   uml:U(true, false, true), viz:vLookup({call:'sv.gioiThieu()', chain:[{cls:'SinhVien', m:'gioiThieu()', has:false, s:'no'}, {cls:'NguoiHoc', m:'gioiThieu()', has:true, s:'ok'}]})});
  c.snap({ln:21, title:'Xong', body:'Nếu không dùng kế thừa, mỗi lớp có bản gioiThieu() riêng và phải sửa 2 nơi. Có kế thừa chỉ sửa 1 nơi.',
   note:'Sửa một chỗ ở lớp cha, mọi lớp con đều nhận thay đổi.',
   uml:U(false, false, false), viz:vPair(vScore([{k:'nơi phải sửa', v:'2', s:'bad'}]), vScore([{k:'nơi phải sửa', v:'1', s:'ok'}]), {ta:'Không kế thừa', tb:'Có kế thừa', mid:'→'})});
 }}
};
