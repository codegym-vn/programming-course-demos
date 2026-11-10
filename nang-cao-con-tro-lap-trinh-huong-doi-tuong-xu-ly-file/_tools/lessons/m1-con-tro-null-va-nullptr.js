// META {"module":1,"lesson":"Bài 1.2. Con trỏ NULL và nullptr","activity":"Con Trỏ NULL Và nullptr Trong C++","title":"nullptr: con trỏ rỗng có chủ đích","lead":"Xem nullptr khác con trỏ hoang thế nào, vì sao dùng nullptr thay NULL, và cách hàm báo \"không tìm thấy\". Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["hoang","nullptr và con trỏ hoang"],["nap","NULL và nullptr"],["tim","Hàm timKiem"]],"codeTitle":"Mã nguồn C++","path":"con-tro-va-tham-chieu/con-tro-null-va-nullptr/con-tro-null-va-nullptr-trong-cpp/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Bộ nhớ và máy chọn hàm';

function g4Box(id, name, type, v, addr, col, row, kind, s, size){ return {id:id, name:name, type:type, v:v, addr:addr ? '…' + addr : '', col:col, row:row, kind:kind || 'var', s:s, size:size}; }

var EX = {
hoang:{inputs:[],
 intro:'Hai con trỏ: một cái rỗng có chủ đích, một cái chưa khởi tạo. Bấm "Bước tiếp".',
 lines:function(){ return ['int main() {', '  int *p1 = nullptr;', '  int *p2;', '  cout << p1 << endl;', '  cout << p2 << endl;', '  if (p1 == nullptr) {', '    cout << "p1 rong";', '  } else {', '    cout << *p1;', '  }', '  return 0;', '}']; },
 run:function(c){
  var P1 = function(s){ return g4Box('p1', 'p1', 'int*', 'nullptr', '', 0, 0, 'ptr', s, '8 byte'); };
  var P2 = function(s){ return g4Box('p2', 'p2', 'int*', '0x…62a8', '', 0, 1, 'ptr', s, '8 byte'); };
  var J = g4Box('junk', '', '', '', '', 0, 2, 'junk');
  var A1 = {from:'p1', kind:'null'}, A2 = {from:'p2', to:'junk', kind:'dashed', s:'bad'};
  c.snap({ln:1, title:'int *p1 = nullptr;', body:'p1 chứa giá trị nullptr: rõ ràng là "chưa trỏ tới đâu". Mũi tên kết thúc bằng ⊘.',
   viz:vMem([P1('new')], {cols:2, arrows:[A1]})});
  c.snap({ln:2, title:'int *p2;', body:'p2 không được gán gì nên chứa số rác còn sót lại. Nó trỏ tới một chỗ không ai biết.',
   viz:vMem([P1(), P2('bad'), J], {cols:2, arrows:[A1, A2]})});
  c.out('0');
  c.snap({ln:3, title:'In p1', body:'Con trỏ nullptr in ra 0.', viz:vMem([P1('hi'), P2('bad'), J], {cols:2, arrows:[A1, A2]})});
  c.out('0x7ffdbf1762a8');
  c.snap({ln:4, title:'In p2', body:'p2 in ra một số rác, và mỗi lần chạy mỗi khác.', viz:vMem([P1(), P2('hi'), J], {cols:2, arrows:[A1, A2]})});
  c.snap({ln:5, title:'if (p1 == nullptr)',
   body:'Với nullptr ta kiểm tra được: p1 đúng là nullptr nên điều kiện đúng.',
   viz:[vMem([P1('hi')], {cols:2, arrows:[A1]}), vLamps([{t:'p1 == nullptr', s:'ok', sub:'đúng'}])]});
  c.out('p1 rong');
  c.snap({ln:6, title:'Nhánh an toàn chạy', body:'Chương trình in thông báo và bỏ qua nhánh else có *p1, nên không có lỗi.', dim:[7, 8], dimLabel:'không chạy',
   viz:vMem([P1('ok')], {cols:2, arrows:[A1]})});
  c.snap({ln:10, title:'Xong', body:'p2 thì không có cách nào kiểm tra xem số rác đó có hợp lệ hay không.',
   note:'Chưa có địa chỉ thì gán nullptr, rồi kiểm tra if (p != nullptr) trước khi dùng *p.',
   viz:[vMem([P1('ok'), P2('bad'), J], {cols:2, arrows:[A1, A2]}), vCard({kind:'ok', title:'Quy tắc', sub:'Khởi tạo con trỏ bằng nullptr nếu chưa có địa chỉ'})]});
 }},
nap:{inputs:[],
 intro:'Hai hàm cùng tên xuLy: một nhận số nguyên, một nhận con trỏ. Xem NULL và nullptr được hiểu ra sao. Bấm "Bước tiếp".',
 lines:function(){ return ['void xuLy(int x) {', '  cout << "NHAN SO " << x;', '}', 'void xuLy(int *p) {', '  cout << "NHAN CON TRO";', '}', 'int main() {', '  xuLy(NULL);', '  xuLy(nullptr);', '}']; },
 run:function(c){
  var L = function(a, b, sa, sb){ return vLamps([{t:'xuLy(int)', s:sa, sub:a}, {t:'xuLy(int*)', s:sb, sub:b}], {title:'Hai hàm ứng viên'}); };
  c.snap({ln:0, title:'Hai hàm cùng tên', body:'xuLy(int) nhận số nguyên, xuLy(int*) nhận con trỏ. Mỗi lần gọi, trình biên dịch chọn hàm khớp nhất. Dưới đây thử từng cách gọi một: ' + 'dòng 8 hoặc dòng 9.',
   viz:L('nhận số', 'nhận con trỏ', 'off', 'off')});
  c.err("error: call of overloaded 'xuLy(NULL)' is ambiguous");
  c.snap({ln:7, title:'xuLy(NULL);',
   body:'NULL thực chất chỉ là số 0. Số 0 vừa khớp int vừa khớp con trỏ, nên trình biên dịch không biết chọn hàm nào và báo lỗi.',
   viz:[L('0 là số nguyên', '0 cũng là con trỏ rỗng', 'hi', 'hi'), vErr({kind:'compile', msg:["error: call of overloaded 'xuLy(NULL)' is ambiguous", "note: candidate: 'void xuLy(int)'", "note: candidate: 'void xuLy(int*)'"]})]});
  c.clear();
  c.out('NHAN CON TRO');
  c.snap({ln:8, title:'xuLy(nullptr);',
   body:'nullptr có kiểu riêng (std::nullptr_t), chỉ khớp con trỏ. Trình biên dịch chọn đúng xuLy(int*) và không còn mơ hồ.',
   viz:[L('không khớp', 'nullptr khớp con trỏ', 'no', 'ok'), vCard({kind:'ok', title:'Không còn mơ hồ', sub:'Gọi đúng phiên bản nhận con trỏ'})]});
  c.snap({ln:8, title:'Xong', body:'Dùng nullptr thì lúc nào cũng được hiểu là con trỏ.',
   note:'NULL chỉ là số 0 nên dễ mơ hồ. nullptr là con trỏ rỗng đúng nghĩa.',
   viz:L('không khớp', 'nullptr khớp con trỏ', 'no', 'ok')});
 }},
tim:{inputs:[],
 intro:'Hàm timKiem trả về con trỏ tới phần tử tìm thấy, hoặc nullptr nếu không thấy. Bấm "Bước tiếp".',
 lines:function(){ return ['int* timKiem(int a[], int n, int t) {', '  for (int i = 0; i < n; i++) {', '    if (a[i] == t) return &a[i];', '  }', '  return nullptr;', '}', 'int main() {', '  int arr[5] = {10, 20, 30, 40, 50};', '  int *r1 = timKiem(arr, 5, 30);', '  if (r1 != nullptr)', '    cout << "Tim thay: " << *r1;', '  int *r2 = timKiem(arr, 5, 999);', '  if (r2 == nullptr)', '    cout << "Khong tim thay 999";', '}']; },
 run:function(c){
  var arr = [10, 20, 30, 40, 50];
  function cells(st, ptr, lab){ return vCells(arr.map(function(v, i){ return {v:v, s:st[i]}; }), {name:'arr', ptr:ptr, ptrLabel:lab}); }
  c.snap({ln:7, title:'Mảng arr', body:'Mảng có 5 ô: 10, 20, 30, 40, 50.', viz:cells(['new', 'new', 'new', 'new', 'new'])});
  var i = 0; while (arr[i] !== 30) i++;
  c.snap({ln:2, title:'timKiem(arr, 5, 30)', body:'Hàm duyệt i = 0, 1, 2. Hai ô đầu không bằng 30 (✗), ô thứ ' + (i + 1) + ' bằng 30 (✓).',
   viz:cells(['dim', 'dim', 'ok', null, null], 2)});
  c.snap({ln:2, title:'return &a[2]', body:'Hàm trả về địa chỉ của ô 30. r1 nhận địa chỉ đó nên có mũi tên chỉ tới ô 30.',
   viz:[cells([null, null, 'ok', null, null], 2, 'r1'), vCard({kind:'info', title:'r1', sub:'đang trỏ tới ô số ' + i + ' (giá trị 30)'})]});
  c.out('Tim thay: ' + arr[i]);
  c.snap({ln:9, title:'if (r1 != nullptr)', body:'r1 khác nullptr nên an toàn để viết *r1, in ra 30.',
   viz:cells([null, null, 'ok', null, null], 2, 'r1')});
  c.snap({ln:11, title:'timKiem(arr, 5, 999)', body:'Hàm duyệt cả 5 ô, ô nào cũng không bằng 999 (✗).',
   viz:cells(['dim', 'dim', 'dim', 'dim', 'dim'])});
  c.snap({ln:4, title:'return nullptr', body:'Không tìm thấy nên hàm trả về nullptr. r2 là nullptr, không trỏ vào ô nào.',
   viz:[cells(['dim', 'dim', 'dim', 'dim', 'dim']), vCard({kind:'warn', title:'r2 = nullptr', sub:'không trỏ tới ô nào, ⊘'})]});
  c.out('Khong tim thay 999');
  c.snap({ln:12, title:'if (r2 == nullptr)', body:'Điều kiện đúng nên chương trình báo không tìm thấy, thay vì viết *r2 làm hỏng chương trình.',
   viz:cells(['dim', 'dim', 'dim', 'dim', 'dim'])});
  c.snap({ln:13, title:'Xong', body:'Hàm dùng nullptr làm tín hiệu "không có kết quả". Người gọi hàm phải kiểm tra trước khi dùng *.',
   note:'Hàm trả về con trỏ: luôn kiểm tra nullptr trước khi dùng *.',
   viz:cells(['dim', 'dim', 'ok', 'dim', 'dim'])});
 }}
};
