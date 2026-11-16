// META {"module":5,"lesson":"Bài 5.3. Hàm xử lý chuỗi và duyệt ký tự","activity":"Truy Cập Và Duyệt Từng Ký Tự Trong Chuỗi","title":"Duyệt từng ký tự: [] và at()","lead":"Xem string đọc, ghi, duyệt từng ký tự như một mảng, và vì sao at() an toàn hơn []. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["doc-ghi","Đọc và ghi bằng []"],["dem","Duyệt: đếm nguyên âm"],["at","[] và .at() ngoài phạm vi"]],"codeTitle":"Mã nguồn C++","path":"xu-ly-chuoi/ham-xu-ly-chuoi-va-duyet-ky-tu/truy-cap-va-duyet-tung-ky-tu-trong-chuoi/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Dải ký tự và bộ đếm';

function b9Chars(s, o){ o = o || {}; o.name = o.name || 'ten'; return vChars(s, o); }

var EX = {
'doc-ghi':{inputs:[],
 intro:'Chuỗi ten là một dải ô đánh số từ 0. Dùng ten[số] để đọc hoặc ghi một ô. Bấm "Bước tiếp".',
 lines:function(){ return [
  'string ten = "Hello";',
  'cout << ten[0] << endl;',
  'cout << ten[1] << endl;',
  'cout << ten[4] << endl;',
  'ten[0] = \'J\';',
  'cout << ten << endl;']; },
 run:function(c){
  var s = 'Hello';
  c.snap({ln:0, title:'Chuỗi "Hello"', body:'5 ký tự nằm trong 5 ô, chỉ số từ 0 đến 4.', viz:b9Chars(s, {len:true})});
  [[0, 1], [1, 2], [4, 3]].forEach(function(p){
   c.out(s.charAt(p[0]));
   c.snap({ln:p[1], title:'ten[' + p[0] + '] = \'' + s.charAt(p[0]) + '\'', body:'Đọc ô số ' + p[0] + ' được ký tự \'' + s.charAt(p[0]) + '\'.' + (p[0] === 4 ? ' Ký tự cuối là ten[length() - 1], không phải ten[5].' : ''),
    viz:b9Chars(s, {cells:(function(){ var m = {}; m[p[0]] = 'hi'; return m; })()})});
  });
  var t = 'J' + s.slice(1);
  c.snap({ln:4, title:'ten[0] = \'J\'', body:'Ghi vào ô 0: ký tự H được thay bằng J.', viz:b9Chars(t, {cells:{0:'new'}})});
  c.out(t);
  c.snap({ln:5, title:'Xong', body:'In cả chuỗi, bây giờ là "' + t + '".',
   note:'string có chỉ số 0 đến length() - 1. Dùng [] để đọc và ghi từng ký tự, giống mảng.',
   viz:b9Chars(t, {len:true})});
 }},

'dem':{inputs:[],
 intro:'Vòng for cho i chạy qua từng ô của "Hello World" và đếm nguyên âm. Bấm "Bước tiếp".',
 lines:function(){ return [
  'string cau = "Hello World";',
  'string am = "aeiouAEIOU";',
  'int demNguyenAm = 0;',
  'for (int i = 0; i < cau.length(); i++) {',
  '  char c = cau[i];',
  '  if (am.find(c) != string::npos)',
  '    demNguyenAm++;',
  '}',
  'cout << demNguyenAm;']; },
 run:function(c){
  var s = 'Hello World', am = 'aeiouAEIOU', dem = 0, st = {};
  var acc = function(i, ch, extra){ return vAcc([{k:'i', v:i === null ? '?' : i}, {k:'c', v:ch === null ? '?' : "'" + ch + "'"}, {k:'demNguyenAm', v:dem, s:extra}], {}); };
  c.snap({ln:2, title:'Bắt đầu đếm', body:'demNguyenAm = 0. Chuỗi am chứa các nguyên âm cần tìm (như bài find).', viz:[b9Chars(s, {name:'cau'}), acc(null, null)]});
  var i = 0;
  while (i < s.length) {
   var isV = am.indexOf(s.charAt(i)) >= 0, from = i;
   if (isV) {
    dem++; st[i] = 'ok'; i++;
    c.snap({ln:6, title:'i = ' + from + ': \'' + s.charAt(from) + '\' là nguyên âm', body:'Ký tự \'' + s.charAt(from) + '\' có trong am, nên demNguyenAm tăng lên ' + dem + '.',
     viz:[b9Chars(s, {name:'cau', cells:st}), acc(from, s.charAt(from), 'new')]});
   } else {
    while (i < s.length && am.indexOf(s.charAt(i)) < 0) { st[i] = 'dim'; i++; }
    var run = s.slice(from, i), lab = from === i - 1 ? 'i = ' + from : 'i = ' + from + ' đến ' + (i - 1);
    c.snap({ln:5, title:lab + ': không phải nguyên âm', body:(run.length > 1 ? 'Các ký tự ' : 'Ký tự ') + run.split('').map(function(q){ return q === ' ' ? 'dấu cách' : '\'' + q + '\''; }).join(', ') + ' không có trong am, bỏ qua.',
     viz:[b9Chars(s, {name:'cau', cells:st}), acc(i - 1, s.charAt(i - 1))]});
   }
  }
  c.out(String(dem));
  c.snap({ln:8, title:'Xong', body:'i chạy hết 11 ô. Có ' + dem + ' nguyên âm: e, o, o.',
   note:'Duyệt chuỗi giống duyệt mảng: for chạy i từ 0 đến length() - 1, lấy cau[i] rồi xét.',
   viz:[b9Chars(s, {name:'cau', cells:st}), acc(s.length - 1, s.charAt(s.length - 1), 'ok')]});
 }},

'at':{inputs:[],
 intro:'Chuỗi s chỉ có 3 ô (0 đến 2) nhưng ta truy cập ô số 10. Xem [] và at() phản ứng khác nhau thế nào. Bấm "Bước tiếp".',
 lines:function(){ return [
  'string s = "abc";',
  'cout << "[]: " << s[10] << endl;',
  'cout << "Van chay" << endl;',
  'cout << "at: " << s.at(10) << endl;',
  'cout << "Khong in" << endl;']; },
 run:function(c){
  var s = 'abc', out = '?????????';
  var wrap = function(o){ o = o || {}; o.name = 's'; o.neighbor = 'ngoài chuỗi'; o.spill = out; return vChars(s, o); };
  c.snap({ln:0, title:'Chuỗi s có 3 ô', body:'Chỉ số hợp lệ là 0, 1, 2. Từ ô số 3 trở đi là vùng ngoài chuỗi.', viz:b9Chars(s, {name:'s', len:true})});
  c.write('[]: '); c.write('?'); c.out('');
  c.snap({ln:1, title:'s[10]: không kiểm tra', body:'[] đi thẳng tới ô số 10, ngoài chuỗi, và nhặt về một ký tự rác (ở đây vẽ dấu ?). Mỗi lần chạy có thể khác.',
   viz:[wrap({}), vCard({kind:'warn', title:'Không có lỗi nào được báo', sub:'Chương trình vẫn chạy tiếp'})]});
  c.out('Van chay');
  c.snap({ln:2, title:'Chương trình chạy tiếp', body:'Dòng sau vẫn được in. Lỗi bị giấu đi, rất khó phát hiện.', viz:[wrap({})]});
  c.err("terminate called after throwing an instance of 'std::out_of_range'");
  c.err('  what():  basic_string::at: __n (which is 10) >= this->size() (which is 3)');
  c.snap({ln:3, dim:[4], title:'s.at(10): kiểm tra và báo lỗi',
   body:'at() thấy chỉ số 10 vượt quá 3 ô nên dừng chương trình ngay và báo out_of_range. Dòng sau không chạy.',
   viz:[b9Chars(s, {name:'s'}), vErr({kind:'runtime', note:'chương trình dừng', msg:["terminate called after throwing an instance of 'std::out_of_range'", '  what():  basic_string::at: __n (which is 10) >= this->size() (which is 3)']})]});
  c.snap({ln:3, dim:[4], title:'Xong', body:'[] nhanh nhưng không kiểm tra; at() kiểm tra nên an toàn hơn.',
   note:'[] không kiểm tra biên (hành vi không xác định). at() ném ngoại lệ out_of_range khi chỉ số vượt phạm vi.',
   viz:[vGrid([['', '[]', '.at()'], ['Kiểm tra chỉ số', {v:'Không', s:'bad'}, {v:'Có', s:'ok'}], ['Chỉ số 10 trên "abc"', {v:'Đọc rác, chạy tiếp', s:'bad'}, {v:'Báo lỗi, dừng', s:'ok'}]], {head:true})]});
 }}
};
