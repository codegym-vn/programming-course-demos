// META {"module":3,"lesson":"Bài 3.1. Kế thừa và cú pháp kế thừa","activity":"Cú Pháp Kế Thừa Trong C++","title":"Lớp con được dựng trên lớp cha","lead":"Xem đối tượng lớp con gồm phần của cha và phần của con, và constructor của cha chạy trước. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["cha","Constructor cha chạy trước"],["tuongminh","Gọi tường minh : DongVat(ten)"],["loi","Lỗi thiếu gọi tường minh"]],"codeTitle":"Mã nguồn C++","path":"oop-2-tinh-ke-thua/ke-thua-va-cu-phap-ke-thua/cu-phap-ke-thua-trong-cpp/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Hình minh họa';

var EX = {
cha:{inputs:[],
 intro:'Lớp Cho kế thừa lớp DongVat. Hãy để ý dòng Cho c; không hề nhắc tới DongVat. Bấm "Bước tiếp".',
 lines:function(){ return ['class DongVat {', 'public:', '  DongVat() {', '    cout << "Constructor cua "', '      << "DongVat duoc goi" << endl;', '  }', '};', 'class Cho : public DongVat {', 'public:', '  Cho() {', '    cout << "Constructor cua "', '      << "Cho duoc goi" << endl;', '  }', '};', 'int main() {', '  cout << "Bat dau tao doi tuong"', '    << " Cho..." << endl;', '  Cho c;', '}']; },
 run:function(c){
  var L = function(a, b){ return vLayers({name:'Đối tượng c', layers:[{cls:'DongVat', items:['phần của cha'], s:a.s, sub:a.sub}, {cls:'Cho', items:['phần của con'], s:b.s, sub:b.sub}]}); };
  c.out('Bat dau tao doi tuong Cho...');
  c.snap({ln:15, title:'In dòng mở đầu', body:'Chưa có đối tượng nào. Hai tầng của đối tượng c còn đang chờ (nét đứt).',
   viz:L({s:'wait', sub:'chưa dựng'}, {s:'wait', sub:'chưa dựng'})});
  c.snap({ln:17, title:'Cho c;', body:'Dòng này chỉ nhắc tới Cho, không nhắc tới DongVat. Nhưng Cho là con của DongVat nên C++ phải dựng phần DongVat trước.',
   viz:L({s:'hi', sub:'dựng trước'}, {s:'wait', sub:'chờ'})});
  c.out('Constructor cua DongVat duoc goi');
  c.snap({ln:3, title:'Constructor của DongVat chạy', body:'Tầng dưới (phần cha) được dựng xong và in thông báo của nó.',
   viz:L({s:'new', sub:'đã dựng'}, {s:'wait', sub:'chờ'})});
  c.out('Constructor cua Cho duoc goi');
  c.snap({ln:10, title:'Constructor của Cho chạy', body:'Giờ mới tới tầng trên (phần con). Cha luôn xong trước, con làm sau.',
   viz:L({s:'ok', sub:'đã dựng'}, {s:'new', sub:'đã dựng'})});
  c.snap({ln:17, title:'Xong', body:'Chỉ một dòng Cho c; mà hai constructor đã chạy, theo thứ tự cha rồi tới con.',
   note:'Lớp cha có constructor không tham số (hoặc không viết constructor nào) thì lớp con không cần làm gì thêm: constructor của cha tự chạy trước.',
   viz:L({s:'ok', sub:'dựng trước'}, {s:'ok', sub:'dựng sau'})});
 }},
tuongminh:{inputs:[],
 intro:'Lần này DongVat có constructor nhận tên. Xem Cho chuyển tên xuống cho DongVat như thế nào. Bấm "Bước tiếp".',
 lines:function(){ return ['class DongVat {', 'public:', '  string ten;', '  DongVat(string tenBanDau) {', '    ten = tenBanDau;', '    cout << "Da tao dong vat ten: "', '      << ten << endl;', '  }', '};', 'class Cho : public DongVat {', 'public:', '  string giong;', '  Cho(string tenBanDau,', '      string giongBanDau)', '      : DongVat(tenBanDau) {', '    giong = giongBanDau;', '    cout << "Da tao cho giong: "', '      << giong << endl;', '  }', '};', 'int main() {', '  Cho c("Mi Lu", "Poodle");', '  cout << "Ten: " << c.ten', '    << ", Giong: " << c.giong', '    << endl;', '}']; },
 run:function(c){
  var L = function(a, ai, b, bi){ return vLayers({name:'Đối tượng c', layers:[{cls:'DongVat', items:ai, s:a.s, sub:a.sub}, {cls:'Cho', items:bi, s:b.s, sub:b.sub}]}); };
  c.snap({ln:21, title:'Cho c("Mi Lu", "Poodle");', body:'Hai giá trị "Mi Lu" và "Poodle" được đưa vào constructor của Cho.',
   viz:L({s:'wait', sub:'chờ'}, ['string ten'], {s:'hi', sub:'đang nhận'}, ['string giong'])});
  c.snap({ln:14, title:': DongVat(tenBanDau)', body:'Trước khi thân Cho chạy, C++ đi theo dòng này: chuyển "Mi Lu" xuống cho constructor của DongVat.',
   viz:[L({s:'hi', sub:'nhận "Mi Lu"'}, ['string ten'], {s:'wait', sub:'chờ'}, ['string giong']), vCard({kind:'info', title:'Đường đi của "Mi Lu"', sub:'Cho(tenBanDau, ...) rồi tới DongVat(tenBanDau)'})]});
  c.out('Da tao dong vat ten: Mi Lu');
  c.snap({ln:5, title:'Thân DongVat chạy', body:'ten được gán là "Mi Lu" và constructor của DongVat in thông báo. Tầng dưới đã xong.',
   viz:L({s:'new', sub:'đã dựng'}, ['string ten = "Mi Lu"'], {s:'wait', sub:'chờ'}, ['string giong'])});
  c.out('Da tao cho giong: Poodle');
  c.snap({ln:15, title:'Quay về thân Cho', body:'Giờ tới phần riêng của Cho: giong được gán là "Poodle" rồi in thông báo.',
   viz:L({s:'ok', sub:'đã dựng'}, ['string ten = "Mi Lu"'], {s:'new', sub:'đã dựng'}, ['string giong = "Poodle"'])});
  c.out('Ten: Mi Lu, Giong: Poodle');
  c.snap({ln:22, title:'Xong', body:'c.ten do tầng cha giữ, c.giong do tầng con giữ, và main dùng được cả hai.',
   note:'Lời gọi : DongVat(...) nằm sau danh sách tham số, trước dấu {. Cha chỉ có constructor có tham số thì con phải gọi tường minh như vậy.',
   viz:L({s:'ok', sub:'dựng trước'}, ['string ten = "Mi Lu"'], {s:'ok', sub:'dựng sau'}, ['string giong = "Poodle"'])});
 }},
loi:{inputs:[],
 intro:'Điều gì xảy ra nếu DongVat chỉ có constructor nhận tên, mà Cho quên gọi nó? Bấm "Bước tiếp".',
 lines:function(){ return ['class DongVat {', 'public:', '  string ten;', '  DongVat(string tenBanDau) {', '    ten = tenBanDau;', '  }', '};', 'class Cho : public DongVat {', 'public:', '  string giong;', '  Cho(string giongBanDau) {', '    giong = giongBanDau;', '  }', '};']; },
 run:function(c){
  var BP = function(o){ return vGrid([['Constructor của DongVat', 'Có không?'], [{v:'DongVat(string tenBanDau)', s:o.a}, {v:'có', s:o.a}], [{v:'DongVat()  (không tham số)', s:o.b}, {v:'không có', s:o.b}]], {head:true, title:o.note}); };
  c.snap({ln:3, title:'DongVat chỉ có một constructor', body:'Constructor này bắt buộc nhận 1 chuỗi (tên). DongVat không có constructor nào không tham số.',
   viz:BP({a:'hi', b:'dim', note:'Danh sách constructor của DongVat'})});
  c.snap({ln:10, title:'Cho(string giongBanDau) {', body:'Constructor của Cho không có dòng ": DongVat(...)". Nó không nói phải dùng constructor nào của cha.',
   viz:vCard({kind:'warn', title:'Thiếu lời gọi tường minh', sub:'Cho(string giongBanDau) {  // sau ")" không có : DongVat(...)'})});
  c.snap({ln:10, title:'C++ tự tìm DongVat()', body:'Không được chỉ định, C++ tự thử gọi constructor không tham số của DongVat để dựng tầng dưới. Nhưng lớp này không có constructor đó.',
   viz:BP({a:'dim', b:'bad', note:'C++ tìm DongVat() nhưng không thấy'})});
  c.err("error: no matching function for call to 'DongVat::DongVat()'");
  c.err("note: candidate: 'DongVat::DongVat(std::string)'");
  c.err('note:   candidate expects 1 argument, 0 provided');
  c.snap({ln:10, title:'Lỗi biên dịch', body:'Trình biên dịch dừng ngay, chương trình không chạy được. Lỗi chỉ ra DongVat() không tồn tại, chỉ có phiên bản nhận 1 tham số.',
   viz:vErr({kind:'compile', note:'Không sinh được chương trình', msg:["error: no matching function for call to 'DongVat::DongVat()'", "note: candidate: 'DongVat::DongVat(std::string)'", 'note:   candidate expects 1 argument, 0 provided'], code:'Cho(string giongBanDau) {'})});
  c.snap({ln:10, title:'Cách sửa', body:'Thêm lời gọi tường minh ngay sau danh sách tham số, để C++ biết phải dùng DongVat(string) và truyền gì vào.',
   viz:vCard({kind:'ok', title:'Đã sửa', sub:'Cho(string t, string g) : DongVat(t) {'})});
  c.snap({ln:10, title:'Xong', body:'Cha chỉ có constructor có tham số thì con phải tự gọi nó.',
   note:'Cha không có constructor mặc định (không tham số) thì lớp con bắt buộc viết : Cha(...) trong danh sách khởi tạo.',
   viz:[BP({a:'ok', b:'dim', note:'Cho gọi đúng constructor có sẵn'}), vCard({kind:'ok', title:'Hợp lệ', sub:': DongVat(t) khớp với DongVat(string)'})]});
 }}
};
