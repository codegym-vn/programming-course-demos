// META {"module":5,"lesson":"Bài 5.2. Nhập xuất chuỗi và trôi lệnh","activity":"Nhập Xuất Chuỗi: Phân Biệt cin Và getline","title":"cin >> lấy một từ, getline lấy cả dòng","lead":"Xem chữ bạn gõ nằm trong bộ đệm bàn phím và mỗi lệnh lấy ra bao nhiêu. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["cin","cin >> với \"Nguyen Van An\""],["getline","getline với \"Nguyen Van An\""],["nhieu","Đọc nhiều lần liên tiếp"]],"codeTitle":"Mã nguồn C++","path":"xu-ly-chuoi/nhap-xuat-chuoi-va-troi-lenh/nhap-xuat-chuoi-phan-biet-cin-va-getline/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Bộ đệm bàn phím và biến';

var IB = 'Bộ đệm bàn phím (␣ là dấu cách, ↵ là Enter)';
function nxBox(name, v, s){ return {name:name, type:'string', v:(v === null ? '(rỗng)' : v), s:s}; }

var EX = {
cin:{inputs:[],
 intro:'Bạn gõ "Nguyen Van An" rồi Enter. Xem cin >> lấy được bao nhiêu. Bấm "Bước tiếp".',
 lines:function(){ return ['string ten;', 'cout << "Nhap ho ten: ";', 'cin >> ten;', 'cout << "Ban da nhap: ["', '     << ten << "]";']; },
 run:function(c){
  var typed = 'Nguyen Van An', buf = typed + '\n';
  c.write('Nhap ho ten: ');
  c.snap({ln:1, wait:true, title:'Chờ bạn gõ',
   body:'Chương trình in lời nhắc rồi dừng chờ. Bộ đệm bàn phím đang trống.',
   viz:[vInBuf('', {title:IB}), vBoxes([nxBox('ten', null)], {frame:'main()'})]});
  c.input(typed);
  c.snap({ln:2, title:'Bạn gõ và bấm Enter',
   body:'Mỗi phím bạn gõ chạy vào bộ đệm, kể cả dấu cách và Enter. Con trỏ ▲ đứng ở ký tự đầu.',
   viz:[vInBuf(buf, {pos:0, title:IB}), vBoxes([nxBox('ten', null)], {frame:'main()'})]});
  c.snap({ln:2, title:'cin >> ten',
   body:'cin >> lấy các ký tự liền nhau, dừng ngay trước dấu cách đầu tiên: được "Nguyen".',
   viz:[vInBuf(buf, {pos:6, take:[0, 6], title:IB}), vBoxes([nxBox('ten', 'Nguyen', 'new')], {frame:'main()'})]});
  c.out('Ban da nhap: [Nguyen]');
  c.snap({ln:3, title:'In ten',
   body:'Phần "Van An" và Enter vẫn nằm yên trên băng, chờ lệnh đọc tiếp theo.',
   viz:[vInBuf(buf, {pos:6, used:6, title:IB, note:'Phần còn lại vẫn còn trong bộ đệm'}), vBoxes([nxBox('ten', 'Nguyen')], {frame:'main()'})]});
  c.snap({ln:3, title:'Xong',
   body:'Họ tên đầy đủ chỉ nhận được từ đầu tiên.',
   note:'cin >> đọc một từ (dừng ở khoảng trắng) và để phần còn lại trong bộ đệm.',
   viz:[vInBuf(buf, {pos:6, used:6, title:IB}), vBoxes([nxBox('ten', 'Nguyen', 'ok')], {frame:'main()'})]});
 }},
getline:{inputs:[],
 intro:'Cùng dòng chữ "Nguyen Van An", nhưng lần này dùng getline. Bấm "Bước tiếp".',
 lines:function(){ return ['string ten;', 'cout << "Nhap ho ten: ";', 'getline(cin, ten);', 'cout << "Ban da nhap: ["', '     << ten << "]";']; },
 run:function(c){
  var typed = 'Nguyen Van An', buf = typed + '\n', n = typed.length;
  c.write('Nhap ho ten: ');
  c.snap({ln:1, wait:true, title:'Chờ bạn gõ',
   body:'Chương trình in lời nhắc rồi chờ. Bộ đệm đang trống.',
   viz:[vInBuf('', {title:IB}), vBoxes([nxBox('ten', null)], {frame:'main()'})]});
  c.input(typed);
  c.snap({ln:2, title:'Bạn gõ và bấm Enter',
   body:'Cả dòng chạy vào bộ đệm, giống tab trước.',
   viz:[vInBuf(buf, {pos:0, title:IB}), vBoxes([nxBox('ten', null)], {frame:'main()'})]});
  c.snap({ln:2, title:'getline(cin, ten)',
   body:'getline lấy mọi ký tự cho tới Enter, kể cả dấu cách: ten = "Nguyen Van An". Enter bị lấy đi nhưng không bỏ vào ten.',
   viz:[vInBuf(buf, {pos:n + 1, take:[0, n], drop:n, title:IB}), vBoxes([nxBox('ten', typed, 'new')], {frame:'main()'})]});
  c.out('Ban da nhap: [' + typed + ']');
  c.snap({ln:3, title:'In ten',
   body:'Cả họ tên được in ra. Bộ đệm đã hết sạch.',
   viz:[vInBuf('', {title:IB}), vBoxes([nxBox('ten', typed)], {frame:'main()'})]});
  c.snap({ln:3, title:'Xong',
   body:'Muốn nhận cả họ tên có dấu cách thì dùng getline.',
   note:'getline đọc trọn một dòng tới Enter và bỏ dấu Enter đi.',
   viz:[vInBuf('', {title:IB}), vBoxes([nxBox('ten', typed, 'ok')], {frame:'main()'})]});
 }},
nhieu:{inputs:[],
 intro:'Hai chương trình nhỏ: ba cin >> liên tiếp, rồi hai getline liên tiếp. Bấm "Bước tiếp".',
 lines:function(){ return ['// Chương trình 1', 'string tu1, tu2, tu3;', 'cin >> tu1 >> tu2 >> tu3;', 'cout << "[" << tu1 << "] [" << tu2', '     << "] [" << tu3 << "]";', '// Chương trình 2', 'string d1, d2;', 'getline(cin, d1);', 'getline(cin, d2);']; },
 run:function(c){
  var typed = 'Nguyen Van An', buf = typed + '\n';
  var B3 = function(a, b, d, s){ return vBoxes([nxBox('tu1', a, s === 1 ? 'new' : ''), nxBox('tu2', b, s === 2 ? 'new' : ''), nxBox('tu3', d, s === 3 ? 'new' : '')], {frame:'main()'}); };
  c.input(typed);
  c.snap({ln:2, title:'Bạn gõ một dòng',
   body:'Bộ đệm chứa cả dòng "Nguyen Van An" và Enter. Ba lệnh cin >> sẽ lấy lần lượt.',
   viz:[vInBuf(buf, {pos:0, title:IB}), B3(null, null, null)]});
  c.snap({ln:2, title:'cin >> tu1',
   body:'Lấy "Nguyen", dừng trước dấu cách.',
   viz:[vInBuf(buf, {pos:6, take:[0, 6], title:IB}), B3('Nguyen', null, null, 1)]});
  c.snap({ln:2, title:'>> tu2',
   body:'cin >> bỏ qua dấu cách ở đầu rồi lấy "Van".',
   viz:[vInBuf(buf, {pos:10, used:7, take:[7, 10], title:IB}), B3('Nguyen', 'Van', null, 2)]});
  c.snap({ln:2, title:'>> tu3',
   body:'Lại bỏ qua dấu cách rồi lấy "An". Dấu Enter ở cuối vẫn còn trên băng.',
   viz:[vInBuf(buf, {pos:13, used:11, take:[11, 13], stuck:13, title:IB, note:'Dấu ↵ còn sót: sẽ gây chuyện ở bài sau'}), B3('Nguyen', 'Van', 'An', 3)]});
  c.out('[Nguyen] [Van] [An]');
  c.snap({ln:3, title:'In ba từ',
   body:'Ba từ được tách riêng ra ba biến.',
   viz:[vInBuf(buf, {pos:13, used:13, stuck:13, title:IB}), B3('Nguyen', 'Van', 'An')]});
  c.clear();
  var l1 = 'Nguyen Van An', l2 = '123 Le Loi, Ha Noi', b2 = l1 + '\n' + l2 + '\n', e1 = l1.length, s2 = e1 + 1, e2 = s2 + l2.length;
  var B2 = function(a, b, s){ return vBoxes([nxBox('d1', a, s === 1 ? 'new' : ''), nxBox('d2', b, s === 2 ? 'new' : '')], {frame:'main()'}); };
  c.input(l1); c.input(l2);
  c.snap({ln:6, title:'Chương trình 2: gõ hai dòng',
   body:'Hai dòng chữ nằm nối nhau trong bộ đệm, mỗi dòng kết thúc bằng Enter.',
   viz:[vInBuf(b2, {pos:0, title:IB}), B2(null, null)]});
  c.snap({ln:7, title:'getline(cin, d1)',
   body:'Lấy trọn dòng 1 tới Enter, bỏ Enter đi.',
   viz:[vInBuf(b2, {pos:s2, take:[0, e1], drop:e1, title:IB}), B2(l1, null, 1)]});
  c.snap({ln:8, title:'getline(cin, d2)',
   body:'Lấy trọn dòng 2, kể cả dấu phẩy và dấu cách.',
   viz:[vInBuf(b2, {pos:e2 + 1, used:s2, take:[s2, e2], drop:e2, title:IB}), B2(l1, l2, 2)]});
  c.snap({ln:8, title:'Xong',
   body:'Mỗi getline lấy đúng một dòng; bộ đệm hết sạch.',
   note:'Nhiều cin >> tách từng từ; nhiều getline lấy từng dòng. Dấu Enter sau cin >> còn lại trong bộ đệm.',
   viz:[vInBuf('', {title:IB}), B2(l1, l2)]});
 }}
};
