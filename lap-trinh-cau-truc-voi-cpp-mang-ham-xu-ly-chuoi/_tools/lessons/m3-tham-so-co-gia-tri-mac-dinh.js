// META {"module":3,"lesson":"Bài 3.2. Tham số, đối số và tham số mặc định","activity":"Tham Số Có Giá Trị Mặc Định (Default Parameters)","title":"Thiếu đối số thì dùng giá trị mặc định","lead":"Xem ô tham số có giá trị điền sẵn (chữ xám nghiêng) bị ghi đè khi có đối số. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["thieu","Truyền đủ / thiếu dần đối số"],["cuoi","Quy tắc: mặc định ở cuối"],["giam","Ứng dụng: tinhGiaSauGiam"]],"codeTitle":"Mã nguồn C++","path":"ham-function/tham-so-doi-so-va-tham-so-mac-dinh/tham-so-co-gia-tri-mac-dinh-default-parameters/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Đối số chép vào tham số';

var mdFn = 'void inThongTin(string ten, int tuoi = 18, string queQuan = "Ha Noi")';
function mdFmt(n){ return String(Number(n.toPrecision(6))); }
function mdInfo(ten, tuoi, que){ return 'Ten: ' + ten + ', Tuoi: ' + tuoi + ', Que quan: ' + que; }

var EX = {
thieu:{inputs:[],
 intro:'Hai tham số cuối đã được điền sẵn giá trị (chữ xám nghiêng). Xem lúc nào giá trị đó bị ghi đè, lúc nào được giữ. Bấm "Bước tiếp".',
 lines:function(){ return ['void inThongTin(string ten,', '    int tuoi = 18,', '    string queQuan = "Ha Noi") {', '  cout << "Ten: " << ten', '       << ", Tuoi: " << tuoi', '       << ", Que quan: " << queQuan', '       << endl;', '}', 'int main() {', '  inThongTin("An", 20, "Da Nang");', '  inThongTin("Binh", 22);', '  inThongTin("Cuong");', '  return 0;', '}']; },
 run:function(c){
  var PD = function(t, q, st, sq){ return [{name:'ten', type:'string', v:'"' + t[0] + '"', s:'new'}, t[1] === null ? {name:'tuoi', type:'int', def:'18', s:'ok'} : {name:'tuoi', type:'int', v:t[1], s:'new'}, q === null ? {name:'queQuan', type:'string', def:'"Ha Noi"', s:'ok'} : {name:'queQuan', type:'string', v:'"' + q + '"', s:'new'}]; };
  c.snap({ln:0, title:'Hai ô đã điền sẵn',
   body:'tuoi có sẵn 18 và queQuan có sẵn "Ha Noi" (chữ xám nghiêng). Chỉ ten là bắt buộc phải có đối số.',
   viz:vArgs({fn:mdFn, params:[{name:'ten', type:'string'}, {name:'tuoi', type:'int', def:'18'}, {name:'queQuan', type:'string', def:'"Ha Noi"'}], title:'Hàm inThongTin'})});
  c.snap({ln:9, title:'Truyền đủ 3 đối số',
   body:'Cả ba ô đều nhận đối số, nên 20 thay chỗ 18 và "Da Nang" thay chỗ "Ha Noi".',
   viz:vArgs({call:'inThongTin("An", 20, "Da Nang")', args:[{v:'"An"'}, {v:'20'}, {v:'"Da Nang"'}], fn:mdFn, params:PD(['An', 20], 'Da Nang')})});
  c.out(mdInfo('An', 20, 'Da Nang'));
  c.snap({ln:3, title:'In ra',
   body:'Hàm dùng giá trị của ba ô và in một dòng.',
   viz:vArgs({call:'inThongTin("An", 20, "Da Nang")', args:[{v:'"An"'}, {v:'20'}, {v:'"Da Nang"'}], fn:mdFn, params:PD(['An', 20], 'Da Nang')})});
  c.snap({ln:10, title:'Truyền 2 đối số',
   body:'Chỉ có hai đối số: "Binh" vào ten, 22 vào tuoi. Ô queQuan không nhận gì nên giữ "Ha Noi".',
   viz:vArgs({call:'inThongTin("Binh", 22)', args:[{v:'"Binh"'}, {v:'22'}], fn:mdFn, params:PD(['Binh', 22], null)})});
  c.out(mdInfo('Binh', 22, 'Ha Noi'));
  c.snap({ln:3, title:'In ra',
   body:'queQuan dùng giá trị mặc định nên dòng in có "Ha Noi".',
   viz:vArgs({call:'inThongTin("Binh", 22)', args:[{v:'"Binh"'}, {v:'22'}], fn:mdFn, params:PD(['Binh', 22], null)})});
  c.snap({ln:11, title:'Truyền 1 đối số',
   body:'Chỉ "Cuong" vào ten. Cả tuoi lẫn queQuan đều giữ giá trị sẵn có.',
   viz:vArgs({call:'inThongTin("Cuong")', args:[{v:'"Cuong"'}], fn:mdFn, params:PD(['Cuong', null], null)})});
  c.out(mdInfo('Cuong', 18, 'Ha Noi'));
  c.snap({ln:3, title:'In ra',
   body:'Cả hai ô mặc định được dùng: tuoi là 18, queQuan là "Ha Noi".',
   viz:vArgs({call:'inThongTin("Cuong")', args:[{v:'"Cuong"'}], fn:mdFn, params:PD(['Cuong', null], null)})});
  c.snap({ln:13, title:'Xong',
   body:'Có đối số thì ghi đè giá trị mặc định; không có thì giữ nguyên giá trị mặc định.',
   note:'Càng truyền ít đối số, càng nhiều tham số dùng giá trị mặc định. Chỉ bỏ được từ phải sang trái.',
   viz:vCard({kind:'ok', title:'Ghi nhớ', rows:[['có đối số', 'ghi đè mặc định'], ['không có đối số', 'dùng mặc định']]})});
 }},
cuoi:{inputs:[],
 intro:'Máy khớp đối số theo vị trí, nên chỉ được bỏ đối số từ bên phải. Hai điều không được làm, và cách sửa. Bấm "Bước tiếp".',
 lines:function(){ return ['// Thử 1: bỏ đối số ở giữa', 'inThongTin("An", , "Da Nang");', '', '// Thử 2: mặc định không ở cuối', 'void inThongTin(string ten,', '    int tuoi = 18,', '    string queQuan) { }', '', '// Cách sửa: mặc định xuống cuối', 'void inThongTin(string ten,', '    string queQuan, int tuoi = 18) { }', 'inThongTin("An", "Da Nang");']; },
 run:function(c){
  var e1 = "error: expected primary-expression before ',' token";
  var e2 = "error: default argument missing for parameter 3 of 'void inThongTin(std::string, int, std::string)'";
  var n2 = 'note: ...following parameter 2 which has a default argument';
  c.snap({ln:1, title:'Bỏ đối số ở giữa',
   body:'Muốn bỏ tuoi nhưng vẫn gửi "Da Nang" cho queQuan. Chỗ giữa để trống.',
   viz:vArgs({call:'inThongTin("An", , "Da Nang")', args:[{v:'"An"'}, {v:'(trống)', s:'bad'}, {v:'"Da Nang"'}]})});
  c.err(e1);
  c.snap({ln:1, title:'Lỗi biên dịch',
   body:'Máy đếm đối số theo vị trí nên không cho để trống ở giữa. Chỉ bỏ được từ phải sang trái.',
   viz:[vCard({kind:'info', title:'Bỏ đối số: được hay không?', rows:[['("An", 20)', 'bỏ queQuan: được'], ['("An")', 'bỏ cả hai: được'], ['("An", , "Da Nang")', 'bỏ ở giữa: không']]}), vErr({kind:'compile', msg:[e1], code:'inThongTin("An", , "Da Nang")'})]});
  c.snap({ln:5, title:'Mặc định không ở cuối',
   body:'tuoi có giá trị mặc định nhưng queQuan đứng sau lại không có. Nếu bỏ tuoi thì queQuan nhận đối số nào? Máy không đoán được.',
   viz:vArgs({fn:'void inThongTin(string ten, int tuoi = 18, string queQuan)', params:[{name:'ten', type:'string'}, {name:'tuoi', type:'int', def:'18', s:'hi'}, {name:'queQuan', type:'string', s:'bad'}]})});
  c.err(e2);
  c.err(n2);
  c.snap({ln:6, title:'Lỗi biên dịch',
   body:'Máy báo tham số thứ 3 thiếu giá trị mặc định, vì tham số thứ 2 đứng trước nó đã có.',
   viz:vErr({kind:'compile', msg:[e2, n2], code:'string queQuan'})});
  c.snap({ln:9, title:'Cách sửa: mặc định xuống cuối',
   body:'Đưa tham số bắt buộc lên trước, tham số có mặc định xuống cuối danh sách.',
   viz:vArgs({fn:'void inThongTin(string ten, string queQuan, int tuoi = 18)', params:[{name:'ten', type:'string'}, {name:'queQuan', type:'string'}, {name:'tuoi', type:'int', def:'18', s:'ok'}], title:'Sau khi sửa'})});
  c.snap({ln:11, title:'Gọi lại sau khi sửa',
   body:'Gọi inThongTin("An", "Da Nang"): hai đối số vào hai ô đầu, ô tuoi cuối cùng giữ 18.',
   viz:vArgs({call:'inThongTin("An", "Da Nang")', args:[{v:'"An"'}, {v:'"Da Nang"'}], fn:'void inThongTin(string ten, string queQuan, int tuoi = 18)', params:[{name:'ten', type:'string', v:'"An"', s:'new'}, {name:'queQuan', type:'string', v:'"Da Nang"', s:'new'}, {name:'tuoi', type:'int', def:'18', s:'ok'}]})});
  c.snap({ln:9, title:'Xong',
   body:'Tham số có giá trị mặc định luôn nằm ở cuối danh sách.',
   note:'Tham số có mặc định phải ở cuối danh sách; đối số chỉ được bỏ từ phải sang trái, không bỏ ở giữa được.',
   viz:vCard({kind:'ok', title:'Quy tắc', sub:'Bắt buộc ở trước, có mặc định ở cuối.'})});
 }},
giam:{inputs:[],
 intro:'Một hàm tính giá sau giảm: nếu không nói giảm bao nhiêu phần trăm thì mặc định là 0. Bấm "Bước tiếp".',
 lines:function(){ return ['double tinhGiaSauGiam(double giaGoc,', '    double phanTramGiam = 0) {', '  double giam = giaGoc', '      * phanTramGiam / 100;', '  return giaGoc - giam;', '}', 'int main() {', '  double g1 = tinhGiaSauGiam(', '      200000, 10);', '  double g2 = tinhGiaSauGiam(200000);', '  cout << g1 << endl;', '  cout << g2 << endl;', '  return 0;', '}']; },
 run:function(c){
  var fn = 'double tinhGiaSauGiam(double giaGoc, double phanTramGiam = 0)';
  var tinh = function(g, p){ return g - g * p / 100; };
  var g1 = tinh(200000, 10), g2 = tinh(200000, 0);
  var BX = function(a, b, s){ var r = []; if (a !== null) r.push({name:'g1', type:'double', v:mdFmt(a), s:s === 1 ? 'new' : ''}); if (b !== null) r.push({name:'g2', type:'double', v:mdFmt(b), s:s === 2 ? 'new' : ''}); return vBoxes(r, {frame:'main()', empty:'Chưa có biến nào.'}); };
  c.snap({ln:0, title:'Mặc định là 0',
   body:'phanTramGiam đã có sẵn 0. Không nói gì thì hàm hiểu là không giảm giá.',
   viz:vArgs({fn:fn, params:[{name:'giaGoc', type:'double'}, {name:'phanTramGiam', type:'double', def:'0'}], title:'Hàm tinhGiaSauGiam'})});
  c.snap({ln:7, title:'Gọi (200000, 10)',
   body:'Đủ hai đối số: 200000 vào giaGoc, 10 vào phanTramGiam (ghi đè 0).',
   viz:vArgs({call:'tinhGiaSauGiam(200000, 10)', args:[{v:'200000'}, {v:'10'}], fn:fn, params:[{name:'giaGoc', type:'double', v:200000, s:'new'}, {name:'phanTramGiam', type:'double', v:10, s:'new'}]})});
  c.snap({ln:4, title:'return ' + mdFmt(g1),
   body:'200000 - 200000 * 10 / 100 = ' + mdFmt(g1) + '. Giá trị này được cất vào g1.',
   viz:[vArgs({call:'tinhGiaSauGiam(200000, 10)', args:[{v:'200000'}, {v:'10'}], fn:fn, params:[{name:'giaGoc', type:'double', v:200000}, {name:'phanTramGiam', type:'double', v:10}], ret:{v:mdFmt(g1), to:'g1'}}), BX(g1, null, 1)]});
  c.snap({ln:9, title:'Gọi (200000)',
   body:'Chỉ một đối số: 200000 vào giaGoc. Ô phanTramGiam giữ 0 (mặc định).',
   viz:[vArgs({call:'tinhGiaSauGiam(200000)', args:[{v:'200000'}], fn:fn, params:[{name:'giaGoc', type:'double', v:200000, s:'new'}, {name:'phanTramGiam', type:'double', def:'0', s:'ok'}]}), BX(g1, null)]});
  c.snap({ln:4, title:'return ' + mdFmt(g2),
   body:'200000 - 200000 * 0 / 100 = ' + mdFmt(g2) + '. Không giảm giá, cất vào g2.',
   viz:[vArgs({call:'tinhGiaSauGiam(200000)', args:[{v:'200000'}], fn:fn, params:[{name:'giaGoc', type:'double', v:200000}, {name:'phanTramGiam', type:'double', def:'0', s:'ok'}], ret:{v:mdFmt(g2), to:'g2'}}), BX(g1, g2, 2)]});
  c.out(mdFmt(g1));
  c.snap({ln:10, title:'In g1',
   body:'Giá sau khi giảm 10% là ' + mdFmt(g1) + '.',
   viz:BX(g1, g2)});
  c.out(mdFmt(g2));
  c.snap({ln:11, title:'Xong',
   body:'Một hàm dùng được cho cả hai trường hợp, không cần viết hai hàm riêng.',
   note:'Tham số mặc định giúp một hàm phục vụ cả lời gọi đầy đủ lẫn lời gọi ngắn gọn.',
   viz:vCard({kind:'ok', title:'Một hàm, hai cách gọi', rows:[['(200000, 10)', mdFmt(g1)], ['(200000)', mdFmt(g2)]]})});
 }}
};
