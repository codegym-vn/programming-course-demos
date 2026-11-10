// META {"module":3,"lesson":"Bài 3.3. Ghi đè phương thức (Overriding)","activity":"Ghi Đè Phương Thức (Method Overriding)","title":"C++ chọn phiên bản phương thức nào?","lead":"Xem C++ tìm phương thức keu() từ lớp con lên lớp cha, và chuyện gì xảy ra khi gọi qua con trỏ lớp cha. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["ghide","Ghi đè cơ bản"],["goilai","Gọi lại DongVat::keu()"],["contro","Con trỏ lớp cha"],["ao","Thêm virtual"]],"codeTitle":"Mã nguồn C++","path":"oop-2-tinh-ke-thua/ghi-de-phuong-thuc-overriding/ghi-de-phuong-thuc-method-overriding/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Hình minh họa';

function p17L(call, cho, dv, note, title){ return vLookup({call:call, title:title, chain:[{cls:'Cho', m:'keu()', has:true, s:cho}, {cls:'DongVat', m:'keu()', has:true, s:dv}], note:note}); }

function P17_CODE(v){ return ['class DongVat {', 'public:', '  string ten;', v ? '  virtual void keu() {' : '  void keu() {', '    // in: keu chung chung', '  }', '};', 'class Cho : public DongVat {', 'public:', v ? '  void keu() override {' : '  void keu() {', '    // in: sua Gau gau!', '  }', '};', 'int main() {', '  Cho c;', '  c.ten = "Mi Lu";', '  c.keu();', '  DongVat *p = &c;', '  p->keu();', '}']; }
function P17_PT(s){ return vMem([{id:'c', name:'c', type:'Cho', v:'"Mi Lu"', addr:'', col:0, row:0, kind:'var', s:'ok'}, {id:'p', name:'p', type:'DongVat*', v:'→ c', addr:'', col:1, row:0, kind:'ptr', s:s}], {cols:2, arrows:[{from:'p', to:'c'}]}); }

var EX = {
ghide:{inputs:[],
 intro:'DongVat và Cho đều có phương thức keu(). Xem C++ chọn bản nào. Bấm "Bước tiếp".',
 lines:function(){ return ['class DongVat {', 'public:', '  string ten;', '  void keu() {', '    cout << ten << " keu mot am thanh"', '      << " chung chung." << endl;', '  }', '};', 'class Cho : public DongVat {', 'public:', '  void keu() {', '    cout << ten << " sua: Gau gau!"', '      << endl;', '  }', '};', 'int main() {', '  DongVat dv;', '  dv.ten = "Dong vat";', '  dv.keu();', '  Cho c;', '  c.ten = "Mi Lu";', '  c.keu();', '}']; },
 run:function(c){
  c.snap({ln:16, title:'DongVat dv;', body:'Tạo một đối tượng thuộc lớp DongVat, đặt tên "Dong vat".',
   viz:vCard({kind:'info', title:'dv là DongVat', sub:'dv.ten = "Dong vat"'})});
  c.snap({ln:18, title:'dv.keu()', body:'C++ bắt đầu tìm keu() từ lớp của đối tượng: DongVat. Có ngay nên dùng luôn.',
   viz:vLookup({call:'dv.keu()', chain:[{cls:'DongVat', m:'keu()', has:true, s:'ok'}]})});
  c.out('Dong vat keu mot am thanh chung chung.');
  c.snap({ln:18, title:'Kết quả của dv.keu()', body:'In ra câu chung chung của DongVat.',
   viz:vLookup({call:'dv.keu()', chain:[{cls:'DongVat', m:'keu()', has:true, s:'ok'}]})});
  c.snap({ln:19, title:'Cho c;', body:'Giờ tạo một đối tượng thuộc lớp Cho, đặt tên "Mi Lu".',
   viz:vCard({kind:'info', title:'c là Cho', sub:'c.ten = "Mi Lu"'})});
  c.snap({ln:21, title:'c.keu()', body:'C++ bắt đầu tìm ở lớp Cho, thấy keu() của Cho nên dừng luôn. Bản của DongVat bị che đi.',
   viz:p17L('c.keu()', 'ok', 'dim')});
  c.out('Mi Lu sua: Gau gau!');
  c.snap({ln:22, title:'Xong', body:'Cùng tên keu(), nhưng đối tượng khác nhau cho kết quả khác nhau. Đó là ghi đè.',
   note:'Ghi đè = lớp con viết lại phương thức cùng tên, cùng tham số của lớp cha. Gọi qua đối tượng lớp con thì dùng bản của lớp con.',
   viz:p17L('c.keu()', 'ok', 'dim')});
 }},
goilai:{inputs:[],
 intro:'Cho muốn dùng lại bản keu() của DongVat rồi thêm phần của mình. Bấm "Bước tiếp".',
 lines:function(){ return ['class Cho : public DongVat {', 'public:', '  void keu() {', '    DongVat::keu();', '    cout << ten << " (them) sua:"', '      << " Gau gau!" << endl;', '  }', '};', 'int main() {', '  Cho c;', '  c.ten = "Mi Lu";', '  c.keu();', '}']; },
 run:function(c){
  c.snap({ln:11, title:'c.keu()', body:'Như tab trước, C++ tìm ở Cho trước và vào keu() của Cho.',
   viz:p17L('c.keu()', 'ok', 'dim')});
  c.snap({ln:3, title:'DongVat::keu();', body:'Viết tên lớp và :: thì không tìm dần nữa, mà chỉ thẳng vào bản của DongVat.',
   viz:vLookup({call:'DongVat::keu()', chain:[{cls:'DongVat', m:'keu()', has:true, s:'ok'}], note:'Chỉ định thẳng, không cần tìm'})});
  c.out('Mi Lu keu mot am thanh chung chung.');
  c.snap({ln:3, title:'Bản gốc chạy', body:'Bản keu() của DongVat chạy và in dòng đầu tiên.',
   viz:vLookup({call:'DongVat::keu()', chain:[{cls:'DongVat', m:'keu()', has:true, s:'ok'}]})});
  c.out('Mi Lu (them) sua: Gau gau!');
  c.snap({ln:4, title:'Quay lại thân Cho', body:'Xong bản gốc, thân của Cho chạy tiếp và in phần bổ sung.',
   viz:p17L('c.keu()', 'ok', 'dim')});
  c.snap({ln:12, title:'Xong', body:'Ghi đè không làm mất bản của cha: vẫn mượn lại được bằng TenLopCha::phuongThuc().',
   note:'DongVat::keu() cho phép tái sử dụng bản gốc rồi bổ sung thêm.',
   viz:p17L('c.keu()', 'ok', 'dim')});
 }},
contro:{inputs:[],
 intro:'Con trỏ p kiểu DongVat* trỏ tới đối tượng Cho. Gọi p->keu() có ra tiếng sủa không? Bấm "Bước tiếp".',
 lines:function(){ return P17_CODE(false); },
 run:function(c){
  c.out('Mi Lu sua: Gau gau!');
  c.snap({ln:16, title:'c.keu()', body:'c là đối tượng Cho, nên dùng bản của Cho.',
   viz:p17L('c.keu()', 'ok', 'dim')});
  c.snap({ln:17, title:'DongVat *p = &c;', body:'p có kiểu DongVat*, nhưng nó trỏ vào đối tượng Cho. Con trỏ lớp cha trỏ vào đối tượng lớp con là được phép.',
   viz:P17_PT('new')});
  c.out('Mi Lu keu mot am thanh chung chung.');
  c.snap({ln:18, title:'p->keu() (không có virtual)', body:'Bất ngờ: C++ chỉ nhìn kiểu của p (DongVat*) nên dùng bản của DongVat, in câu chung chung. Đối tượng thật là Cho không được xét.',
   viz:[P17_PT('hi'), vLookup({call:'p->keu()', title:'Không virtual: theo kiểu con trỏ', chain:[{cls:'DongVat', m:'keu()', has:true, s:'ok'}], note:'Không ra tiếng sủa'})]});
  c.snap({ln:18, title:'Xong', body:'Gọi qua con trỏ lớp cha mà không có virtual: C++ chọn theo kiểu con trỏ, không theo đối tượng thật. Tab "Thêm virtual" cho thấy cách sửa.',
   note:'Không virtual: p->keu() dùng bản của lớp cha.',
   viz:vGrid([['Cách gọi', 'Bản được dùng'], ['c.keu()', {v:'Cho', s:'ok'}], ['p->keu()', {v:'DongVat', s:'bad'}]], {head:true})});
 }},
ao:{inputs:[],
 intro:'Cùng chương trình, chỉ thêm virtual ở DongVat::keu() và override ở Cho::keu(). Bấm "Bước tiếp".',
 lines:function(){ return P17_CODE(true); },
 run:function(c){
  c.snap({ln:3, title:'virtual void keu()', body:'Từ khóa virtual báo: "khi gọi qua con trỏ hay tham chiếu, hãy xem đối tượng thật là gì".',
   viz:vCard({kind:'info', title:'virtual ở lớp cha', sub:'override ở lớp con: nhờ trình biên dịch kiểm tra đúng tên, đúng tham số'})});
  c.out('Mi Lu sua: Gau gau!');
  c.snap({ln:16, title:'c.keu()', body:'Gọi trực tiếp trên c vẫn dùng bản của Cho như cũ.', viz:p17L('c.keu()', 'ok', 'dim')});
  c.snap({ln:17, title:'DongVat *p = &c;', body:'Vẫn như trước: p kiểu DongVat* trỏ vào đối tượng Cho.',
   viz:P17_PT('new')});
  c.out('Mi Lu sua: Gau gau!');
  c.snap({ln:18, title:'p->keu() (có virtual)', body:'Có virtual, C++ đi theo mũi tên tới đối tượng thật (Cho) nên dùng bản của Cho: ra tiếng sủa.',
   viz:[P17_PT('hi'), vLookup({call:'p->keu()', title:'Có virtual: theo đối tượng thật', chain:[{cls:'Cho', m:'keu()', has:true, s:'ok'}, {cls:'DongVat', m:'keu()', has:true, s:'dim'}], note:'Đối tượng thật là Cho'})]});
  c.snap({ln:18, title:'Xong', body:'Không virtual: chọn theo kiểu con trỏ. Có virtual: chọn theo đối tượng thật.',
   note:'Muốn ghi đè có tác dụng khi gọi qua con trỏ lớp cha, phương thức ở lớp cha phải là virtual.',
   viz:vGrid([['Cách gọi', 'Bản được dùng'], ['p->keu() không virtual', {v:'DongVat', s:'bad'}], ['p->keu() có virtual', {v:'Cho', s:'ok'}]], {head:true})});
 }}
};
