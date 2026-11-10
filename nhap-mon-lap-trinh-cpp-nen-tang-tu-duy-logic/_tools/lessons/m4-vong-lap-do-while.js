// META {"module":4,"lesson":"Bài 4.5. Vòng lặp do...while","activity":"Vòng Lặp Do...While","title":"while và do...while chạy khác nhau thế nào?","lead":"Hai cột chạy song song: bên trái là while (kiểm tra trước), bên phải là do...while (làm trước). Chọn ví dụ rồi bấm <b>Bước tiếp</b>.","tabs":[["i100","i = 100, điều kiện i < 5"],["menu","Menu game (chọn 1, 2, 3)"],["cham","Quên dấu ; sau while"]],"codeTitle":"Mã nguồn C++","path":"vong-lap/vong-lap-do-while/vong-lap-do-while/index.html"}

/* sơ đồ luồng dọc: cond ở TRÊN thân (while) hoặc DƯỚI thân (do...while). hi: 'cond' | 'body' | 'after' | null */
function b19Fc(kind, hi){
  var st = function(k){ return hi === k ? 'hi' : null; };
  var nodes, edges;
  if (kind === 'while') {
    nodes = [{id:'c', t:'i < 5 ?', kind:'cond', x:0, y:0, s:st('cond')}, {id:'b', t:'Chạy thân', kind:'proc', x:0, y:1, s:st('body')}, {id:'a', t:'Lệnh sau vòng', kind:'proc', x:1, y:1, s:st('after')}];
    edges = [{a:'c', b:'b', label:'Đúng'}, {a:'b', b:'c', back:true}, {a:'c', b:'a', label:'Sai'}];
  } else {
    nodes = [{id:'b', t:'Chạy thân', kind:'proc', x:0, y:0, s:st('body')}, {id:'c', t:'i < 5 ?', kind:'cond', x:0, y:1, s:st('cond')}, {id:'a', t:'Lệnh sau vòng', kind:'proc', x:1, y:1, s:st('after')}];
    edges = [{a:'b', b:'c'}, {a:'c', b:'b', back:true, label:'Đúng'}, {a:'c', b:'a', label:'Sai'}];
  }
  return vFlowchart(nodes, edges, {title:kind === 'while' ? 'Điều kiện nằm TRÊN thân' : 'Điều kiện nằm DƯỚI thân'});
}
function b19Cnt(n, s){ return vScore([{k:'Số lần chạy thân', v:n, s:s}]); }
/* menu */
var B19_MENU = ['--- MENU GAME ---', '1. Start Game', '2. Options', '3. Exit'];

var EX = {
i100:{
 intro:'Cả hai cột đều có i = 100, điều kiện i < 5 sai ngay từ đầu. Bấm "Bước tiếp" để xem thân vòng lặp chạy mấy lần.',
 running:'Cột trái kiểm tra trước, cột phải làm trước.',
 done:'Cùng điều kiện sai ngay từ đầu: while chạy thân 0 lần, do...while chạy thân đúng 1 lần.',
 note:'do...while luôn chạy thân ít nhất 1 lần rồi mới kiểm tra điều kiện.',
 cols:[
 {title:'while', sub:'Kiểm tra trước, làm sau.',
  lines:['int i = 100;', 'int lanChay = 0;', 'while (i < 5) {', '  lanChay++;', '  cout << "Da chay lan thu "', '       << lanChay << ", i = "', '       << i << endl;', '}', 'cout << "Tong so lan chay: "', '     << lanChay << endl;'],
  run:function(c){
   c.snap({ln:1, title:'i = 100, lanChay = 0', body:'Hai biến đã sẵn sàng. Bộ đếm số lần chạy thân là 0.', viz:[b19Fc('while', null), b19Cnt(0)]});
   c.snap({ln:2, title:'Kiểm tra 100 < 5', body:'Điều kiện sai ngay. Máy bỏ qua cả thân vòng lặp.', viz:[b19Fc('while', 'cond'), b19Cnt(0)]});
   c.out('Tong so lan chay: 0');
   c.snap({ln:8, title:'Xong: thân chạy 0 lần', body:'Máy nhảy thẳng xuống lệnh sau vòng lặp và in "Tong so lan chay: 0".', viz:[b19Fc('while', 'after'), b19Cnt(0, 'no')]});
  }},
 {title:'do...while', sub:'Làm trước, kiểm tra sau.',
  lines:['int i = 100;', 'int lanChay = 0;', 'do {', '  lanChay++;', '  cout << "Da chay lan thu "', '       << lanChay << ", i = "', '       << i << endl;', '} while (i < 5);', 'cout << "Tong so lan chay: "', '     << lanChay << endl;'],
  run:function(c){
   c.snap({ln:1, title:'i = 100, lanChay = 0', body:'Giống cột trái: i = 100, bộ đếm là 0.', viz:[b19Fc('do', null), b19Cnt(0)]});
   c.out('Da chay lan thu 1, i = 100');
   c.snap({ln:3, title:'Làm trước: chạy thân', body:'Máy vào thẳng thân, không hỏi gì. lanChay thành 1 và in "Da chay lan thu 1, i = 100".', viz:[b19Fc('do', 'body'), b19Cnt(1, 'ok')]});
   c.snap({ln:7, title:'Kiểm tra 100 < 5', body:'Bây giờ mới kiểm tra: điều kiện sai nên vòng lặp dừng, không lặp lại.', viz:[b19Fc('do', 'cond'), b19Cnt(1)]});
   c.out('Tong so lan chay: 1');
   c.snap({ln:9, title:'Xong: thân chạy 1 lần', body:'Máy in "Tong so lan chay: 1". Thân đã chạy một lần dù điều kiện sai.', viz:[b19Fc('do', 'after'), b19Cnt(1, 'ok')]});
  }}
 ]},
menu:{
 intro:'Cả hai cột chạy menu game, người dùng lần lượt chọn 1, 2, 3. Cột trái phải gán trước choice = 0 để lọt vào vòng lặp. Bấm "Bước tiếp".',
 running:'Hai cột in menu giống nhau; để ý dòng khai báo và vị trí điều kiện.',
 done:'Menu giống nhau, nhưng do...while không cần giá trị giả: menu hiện trước, hỏi thoát sau.',
 note:'do...while hợp với menu và nhập liệu bắt buộc vì phải hiện menu hoặc hỏi nhập ít nhất một lần.',
 cols:[0, 1].map(function(isDo){ return {
  title:isDo ? 'do...while' : 'while', sub:isDo ? 'Hiện menu trước, hỏi sau.' : 'Phải gán choice = 0 để lọt vào vòng.',
  lines:(isDo ? ['int choice;', 'do {'] : ['int choice = 0;', 'while (choice != 3) {']).concat([
   '  cout << "\\n--- MENU GAME ---\\n";', '  cout << "1. Start Game\\n";', '  cout << "2. Options\\n3. Exit\\n";', '  cout << "Chon chuc nang: ";', '  cin >> choice;', '  if (choice == 1)', '    cout << "Dang vao game...\\n";', '  else if (choice == 2)', '    cout << "Mo cai dat...\\n";',
   isDo ? '} while (choice != 3);' : '}', 'cout << "Da thoat chuong trinh.\\n";']),
  run:function(c){
   var picks = [1, 2, 3], msgs = {1:'Dang vao game...', 2:'Mo cai dat...'}, last = isDo ? 11 : 11;
   var hist = [];
   function box(v, s){ return vBoxes([{name:'choice', type:'int', v:v, s:s}], {frame:'Bộ nhớ · main()'}); }
   function chips(){ return vChips(hist.length ? hist : [{t:'(chưa chọn)', s:'dim'}], {title:'Các lựa chọn đã nhập'}); }
   c.snap({ln:0, title:isDo ? 'Khai báo int choice' : 'choice = 0 (giá trị giả)', body:isDo ? 'choice chưa có giá trị, và không cần có: vòng lặp sẽ hỏi trước.' : 'Phải gán sẵn 0 (khác 3) để lần kiểm tra đầu tiên đúng và máy vào được vòng lặp.', viz:[box(isDo ? null : 0, 'new'), chips()]});
   if (!isDo) c.snap({ln:1, title:'Kiểm tra choice != 3', body:'0 != 3 là đúng, người gác cổng cho vào. Nếu không gán giá trị giả này, menu sẽ không hiện.', viz:[box(0), chips()]});
   for (var k = 0; k < 3; k++) {
    var p = picks[k];
    c.out(''); B19_MENU.forEach(function(t){ c.out(t); }); c.write('Chon chuc nang: ');
    c.snap({ln:isDo && k === 0 ? 2 : 5, wait:true, title:'Hiện menu (lần ' + (k + 1) + ')', body:k === 0 && isDo ? 'Máy vào thẳng thân và hiện menu, rồi chờ người dùng chọn.' : 'Menu hiện ra, máy chờ người dùng chọn.', viz:[box(k === 0 && isDo ? null : picks[k - 1] || 0), chips()]});
    c.input(String(p)); hist.push({t:String(p), s:p === 3 ? 'ok' : 'hi'});
    if (msgs[p]) {
     c.out(msgs[p]);
     c.snap({ln:isDo ? 11 - 3 + (p === 1 ? 0 : 2) : 8 + (p === 1 ? 0 : 2), title:'Chọn ' + p + ': ' + msgs[p], body:'choice = ' + p + '. Nhánh if in "' + msgs[p] + '". Rồi máy kiểm tra choice != 3: ' + p + ' != 3 là đúng nên lặp lại.', viz:[box(p, 'hi'), chips()]});
    } else {
     c.snap({ln:isDo ? 10 : 10, title:'Chọn 3: kiểm tra choice != 3', body:'choice = 3, không nhánh if nào khớp. Kiểm tra choice != 3 là sai nên vòng lặp dừng.', viz:[box(3, 'ok'), chips()]});
    }
   }
   c.out('Da thoat chuong trinh.');
   c.snap({ln:last + 1, title:'Xong', body:'Máy chạy lệnh sau vòng lặp và in "Da thoat chuong trinh.". Menu đã hiện 3 lần.', viz:[box(3, 'ok'), chips()]});
  }}; })},
cham:{
 intro:'Cột trái có dấu ; đúng chỗ, cột phải thiếu dấu ; sau while (...). Bấm "Bước tiếp".',
 running:'Cột trái chạy được, cột phải dừng ở lỗi biên dịch.',
 done:'Chỉ thiếu một dấu ; mà chương trình không biên dịch được. Lỗi được báo ở dòng kế tiếp, còn chỗ thật sự thiếu là dòng while.',
 note:'Sau while (điều_kiện) của do...while bắt buộc có dấu ;. Trình biên dịch báo lỗi ở dòng kế tiếp, vì vậy hãy xem cả dòng phía trên dòng được báo.',
 cols:[
 {title:'Có dấu ;', sub:'do...while viết đúng.',
  lines:['int i = 1;', 'do {', '  cout << i;', '  i++;', '} while (i < 5);', 'return 0;'],
  run:function(c){
   var i = 1, line = '';
   function box(s){ return vBoxes([{name:'i', type:'int', v:i, s:s}], {frame:'Bộ nhớ · main()'}); }
   c.snap({ln:0, title:'i = 1', body:'Khai báo i bằng 1.', viz:[box('new')]});
   while (true) {
     c.write(String(i)); line += i;
     var old = i; i++;
     var again = i < 5;
     c.snap({ln:4, title:'Lượt ' + old + ': in ' + old + ', i++, kiểm tra ' + i + ' < 5', body:'Máy in ' + old + ', i tăng lên ' + i + '. ' + (again ? i + ' < 5 đúng nên lặp lại.' : i + ' < 5 sai nên dừng.'), viz:[box(again ? 'hi' : 'ok')]});
     if (!again) break;
   }
   c.out('');
   c.snap({ln:5, title:'Xong: dịch và chạy được', body:'Dấu ; đúng chỗ nên chương trình biên dịch được và in ' + line + '.', viz:[box('ok'), vCard({kind:'ok', title:'Biên dịch thành công', sub:'Màn hình in ' + line})]});
  }},
 {title:'Thiếu dấu ;', sub:'Quên ; sau while (i < 5).',
  lines:['int i = 1;', 'do {', '  cout << i;', '  i++;', '} while (i < 5)  // thiếu ;', 'return 0;'],
  run:function(c){
   function code(mark){ return vText(['int i = 1;', 'do {', '  cout << i;', '  i++;', {seg:[{t:'} while (i < 5)'}].concat(mark ? [{t:'   <- thiếu ; ở đây', s:'ok'}] : [])}, {seg:[{t:'return 0;'}].concat(mark ? [{t:'   <- g++ báo lỗi ở đây', s:'bad'}] : [])}], {title:'Mã nguồn'}); }
   c.snap({ln:0, title:'Trình biên dịch đọc code', body:'Trước khi chạy, trình biên dịch (g++) đọc từ trên xuống để dịch code.', viz:[code(false)]});
   c.snap({ln:4, title:'Đọc tới while (i < 5)', body:'Không thấy dấu ; nên trình biên dịch chưa dám kết luận: biết đâu câu lệnh còn viết tiếp xuống dòng dưới.', viz:[code(false)]});
   c.err("error: expected ';' before 'return'");
   c.snap({ln:5, title:'Gặp return: mới biết thiếu', body:'Đọc sang dòng return mà câu lệnh trước vẫn chưa kết thúc, g++ mới báo lỗi, và gắn lỗi vào dòng return.',
    viz:[code(true), vCard({kind:'err', title:"expected ';' before 'return'", sub:'Dòng được báo là return 0;'})]});
   c.snap({ln:4, title:'Xong: lỗi thật nằm ở dòng trên', body:'Dòng được báo là return, nhưng chỗ cần sửa là cuối dòng while: thêm dấu ;. Lỗi biên dịch nên chương trình chưa chạy được.',
    note:'Trình biên dịch thường báo lỗi ở dòng kế tiếp, nên khi gặp lỗi thiếu ; hãy nhìn cả dòng ngay phía trên dòng được báo.',
    viz:[code(true), vCard({kind:'err', title:'Chưa tạo được chương trình', sub:'Lỗi biên dịch, thân vòng lặp chưa chạy lần nào.'})]});
  }}
 ]}
};
