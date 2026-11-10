// META {"module":3,"lesson":"Bài 3.4. Thứ tự gọi Constructor – Destructor trong kế thừa","activity":"Thứ Tự Gọi Constructor Trong Kế Thừa","title":"Xây từ móng, dỡ từ mái","lead":"Xem constructor chạy từ lớp cha xuống lớp con, và destructor chạy ngược lại. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["batang","3 tầng: DongVat, Cho, ChoConGiong"],["khoitao","Danh sách khởi tạo: ChoNghiepVu"],["huy","Hủy đối tượng: destructor ngược lại"]],"codeTitle":"Mã nguồn C++","path":"oop-2-tinh-ke-thua/thu-tu-goi-constructor-destructor-trong-ke-thua/thu-tu-goi-constructor-trong-ke-thua/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Hình minh họa';

function p18Q(names, sts, subs, items){ return vLayers({name:'Đối tượng c', layers:names.map(function(n, i){ return {cls:n, s:sts[i], sub:subs[i], items:items ? items[i] : []}; })}); }

var EX = {
batang:{inputs:[],
 intro:'Ba lớp nối tiếp nhau: DongVat, Cho, ChoConGiong. Mỗi constructor in một dòng có số. Bấm "Bước tiếp".',
 lines:function(){ return ['class DongVat {', 'public:', '  DongVat() {', '    cout << "1. DongVat chay" << endl;', '  }', '};', 'class Cho : public DongVat {', 'public:', '  Cho() {', '    cout << "2. Cho chay" << endl;', '  }', '};', 'class ChoConGiong : public Cho {', 'public:', '  ChoConGiong() {', '    cout << "3. ChoConGiong chay"', '      << endl;', '  }', '};', 'int main() {', '  ChoConGiong c;', '}']; },
 run:function(c){
  var N = ['DongVat', 'Cho', 'ChoConGiong'];
  c.snap({ln:20, title:'ChoConGiong c;', body:'Chỉ một dòng, nhưng đối tượng có ba tầng. Tầng dưới cùng (DongVat) phải được dựng trước.',
   viz:p18Q(N, ['hi', 'wait', 'wait'], ['dựng đầu tiên', 'chờ', 'chờ'])});
  c.out('1. DongVat chay');
  c.snap({ln:3, title:'DongVat chạy trước', body:'Tầng móng được dựng xong và in dòng số 1.',
   viz:p18Q(N, ['new', 'wait', 'wait'], ['xong', 'chờ', 'chờ'])});
  c.out('2. Cho chay');
  c.snap({ln:9, title:'Tới Cho', body:'Tầng giữa được dựng lên trên móng và in dòng số 2.',
   viz:p18Q(N, ['ok', 'new', 'wait'], ['xong', 'xong', 'chờ'])});
  c.out('3. ChoConGiong chay');
  c.snap({ln:15, title:'Cuối cùng ChoConGiong', body:'Mái nhà được dựng sau cùng và in dòng số 3.',
   viz:p18Q(N, ['ok', 'ok', 'new'], ['xong', 'xong', 'xong'])});
  c.snap({ln:20, title:'Xong', body:'Thứ tự in: 1, 2, 3, tức từ tổ tiên xuống lớp con, giống xây nhà từ móng lên.',
   note:'Quy tắc áp dụng cho mọi số tầng kế thừa: lớp cha xa nhất chạy trước, lớp con cụ thể nhất chạy sau cùng.',
   viz:p18Q(N, ['ok', 'ok', 'ok'], ['1', '2', '3'])});
 }},
khoitao:{inputs:[],
 intro:'Lần này các lớp có constructor nhận tên và giống. Lời gọi đi từ con lên cha, nhưng thân constructor vẫn chạy từ cha xuống con. Bấm "Bước tiếp".',
 lines:function(){ return ['class DongVat {', 'protected:', '  string ten;', 'public:', '  DongVat(string t) {', '    ten = t;', '    cout << "[DongVat] ten = "', '      << ten << endl;', '  }', '};', 'class Cho : public DongVat {', 'protected:', '  string giong;', 'public:', '  Cho(string t, string g) : DongVat(t) {', '    giong = g;', '    cout << "[Cho] giong = "', '      << giong << endl;', '  }', '};', 'class ChoNghiepVu : public Cho {', 'public:', '  ChoNghiepVu(string t, string g)', '      : Cho(t, g) {', '    cout << "[ChoNghiepVu] " << ten', '      << " " << giong << endl;', '  }', '};', 'int main() {', '  ChoNghiepVu c("Rex", "Berger");', '}']; },
 run:function(c){
  var N = ['DongVat', 'Cho', 'ChoNghiepVu'];
  var It = function(ten, giong){ return [[ten ? 'ten = "Rex"' : 'ten = ?'], [giong ? 'giong = "Berger"' : 'giong = ?'], []]; };
  c.snap({ln:29, title:'ChoNghiepVu c("Rex", "Berger");', body:'Hai giá trị đi vào constructor của ChoNghiepVu.',
   viz:p18Q(N, ['wait', 'wait', 'hi'], ['chờ', 'chờ', 'nhận Rex, Berger'], It(0, 0))});
  c.snap({ln:23, title:': Cho(t, g)', body:'Trước khi thân chạy, ChoNghiepVu chuyển (Rex, Berger) xuống cho Cho. Lời gọi đi lên từ con tới cha.',
   viz:p18Q(N, ['wait', 'hi', 'wait'], ['chờ', 'nhận Rex, Berger', 'đã chuyển xuống'], It(0, 0))});
  c.snap({ln:14, title:': DongVat(t)', body:'Cho giữ lại giong, và chuyển "Rex" tiếp xuống DongVat.',
   viz:p18Q(N, ['hi', 'wait', 'wait'], ['nhận Rex', 'chờ', 'chờ'], It(0, 0))});
  c.out('[DongVat] ten = Rex');
  c.snap({ln:5, title:'Thân DongVat chạy đầu tiên', body:'Tới đáy rồi, thân được chạy từ đây: ten = "Rex" và in thông báo.',
   viz:p18Q(N, ['new', 'wait', 'wait'], ['xong', 'chờ', 'chờ'], It(1, 0))});
  c.out('[Cho] giong = Berger');
  c.snap({ln:15, title:'Về thân Cho', body:'giong = "Berger" rồi in thông báo.',
   viz:p18Q(N, ['ok', 'new', 'wait'], ['xong', 'xong', 'chờ'], It(1, 1))});
  c.out('[ChoNghiepVu] Rex Berger');
  c.snap({ln:24, title:'Về thân ChoNghiepVu', body:'Cuối cùng tới thân của ChoNghiepVu. Cả ten và giong đều đã sẵn sàng để dùng.',
   viz:[p18Q(N, ['ok', 'ok', 'new'], ['xong', 'xong', 'xong'], It(1, 1)), vScore([{k:'ten', v:'Rex', s:'ok'}, {k:'giong', v:'Berger', s:'ok'}])]});
  c.snap({ln:29, title:'Xong', body:'Lời gọi đi từ con lên cha, nhưng thân constructor chạy từ cha xuống con.',
   note:'Thứ tự chạy cố định, không phụ thuộc cách viết danh sách khởi tạo.',
   viz:p18Q(N, ['ok', 'ok', 'ok'], ['chạy 1', 'chạy 2', 'chạy 3'], It(1, 1))});
 }},
huy:{inputs:[],
 intro:'Thêm destructor (hàm hủy, chạy khi đối tượng bị gỡ) vào ba lớp. Bấm "Bước tiếp".',
 lines:function(){ return ['class DongVat {', 'public:', '  DongVat() { cout << "dung DongVat\\n"; }', '  ~DongVat() { cout << "go DongVat\\n"; }', '};', 'class Cho : public DongVat {', 'public:', '  Cho() { cout << "dung Cho\\n"; }', '  ~Cho() { cout << "go Cho\\n"; }', '};', 'class ChoNghiepVu : public Cho {', 'public:', '  ChoNghiepVu() { cout << "dung CNV\\n"; }', '  ~ChoNghiepVu() { cout << "go CNV\\n"; }', '};', 'int main() {', '  ChoNghiepVu c;', '}']; },
 run:function(c){
  var N = ['DongVat', 'Cho', 'ChoNghiepVu'];
  var TL = function(now, bars){ return vTimeline({events:['Bắt đầu main()', 'Dựng xong', 'Tới }', 'Gỡ xong'], now:now, bars:bars}); };
  c.out('dung DongVat');
  c.out('dung Cho');
  c.out('dung CNV');
  c.snap({ln:16, title:'ChoNghiepVu c;', body:'Như các tab trước: dựng từ móng lên mái, constructor chạy cha trước con.',
   viz:p18Q(N, ['ok', 'ok', 'ok'], ['dựng 1', 'dựng 2', 'dựng 3'])});
  c.snap({ln:17, title:'Tới dấu } của main', body:'Đối tượng c hết thời hạn sống và sắp bị gỡ.',
   viz:[p18Q(N, ['ok', 'ok', 'hi'], ['', '', 'sắp gỡ']), TL(2, [{name:'c', from:1, to:null, s:'ok'}])]});
  c.out('go CNV');
  c.snap({ln:13, title:'Gỡ mái trước', body:'Destructor của ChoNghiepVu chạy đầu tiên, tầng trên cùng bị dỡ.',
   viz:p18Q(N, ['ok', 'ok', 'del'], ['', '', 'đã gỡ'])});
  c.out('go Cho');
  c.snap({ln:8, title:'Rồi tới Cho', body:'Destructor của Cho chạy tiếp, tầng giữa bị dỡ.',
   viz:p18Q(N, ['ok', 'del', 'del'], ['', 'đã gỡ', 'đã gỡ'])});
  c.out('go DongVat');
  c.snap({ln:3, title:'Cuối cùng DongVat', body:'Móng được dỡ sau cùng. Destructor của cha tự động chạy, không cần gọi.',
   viz:[p18Q(N, ['del', 'del', 'del'], ['đã gỡ', 'đã gỡ', 'đã gỡ']), TL(3, [{name:'c', from:1, to:3, s:'ok', end:'đã gỡ'}])]});
  c.snap({ln:17, title:'Xong', body:'Xây từ móng, dỡ từ mái: constructor đi cha rồi con, destructor đi con rồi cha.',
   note:'Destructor chạy ngược lại thứ tự constructor, cùng quy tắc vào sau ra trước.',
   viz:vGrid([['', 'Thứ tự'], ['Constructor', {v:'DongVat, Cho, ChoNghiepVu', s:'ok'}], ['Destructor', {v:'ChoNghiepVu, Cho, DongVat', s:'hi'}]], {head:true})});
 }}
};
