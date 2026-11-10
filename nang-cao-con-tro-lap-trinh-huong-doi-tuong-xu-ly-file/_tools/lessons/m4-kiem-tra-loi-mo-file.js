// META {"module":4,"lesson":"Bài 4.3. Kiểm tra lỗi mở file","activity":"Kiểm Tra Lỗi Mở File (Sử Dụng is_open() Hoặc !file)","title":"Mở tệp thất bại và cách kiểm tra","lead":"Xem vì sao mở tệp không tồn tại không báo lỗi gì, và cách is_open() hay !f phát hiện sớm. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["am","Thất bại âm thầm"],["kt","Kiểm tra is_open() và !f"],["ham","Hàm docFile dừng sớm"]],"codeTitle":"Mã nguồn C++","path":"xu-ly-file-file-io/kiem-tra-loi-mo-file/kiem-tra-loi-mo-file-su-dung-is-open-hoac-file/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Thư mục chứa chương trình và đèn trạng thái của f';

/* Thư mục chạy chương trình: chỉ có nhatky.txt. name = tên tệp đang cố mở */
function g22Tree(name, opened){
  var nodes = [{t:'thu-muc-chay', d:0, kind:'dir'}, {t:'nhatky.txt', d:1, kind:'file', s:(name === 'nhatky.txt' && opened) ? 'ok' : null}];
  if (name !== 'nhatky.txt') nodes.push({t:name, d:1, kind:'file', s:opened === null ? 'dim' : 'bad', sub:opened === null ? '' : 'không có trong thư mục'});
  return vTree(nodes);
}
/* Đèn của luồng f: opened === null nghĩa là chưa mở */
function g22Flags(opened){
  if (opened === null) return vFlags({stream:'f', flags:[{n:'is_open()', v:false, k:'ok'}, {n:'fail()', v:false, k:'bad'}], title:'Đèn trạng thái của f (chưa mở)'});
  return vFlags({stream:'f', flags:[{n:'is_open()', v:opened, k:'ok'}, {n:'fail()', v:!opened, k:'bad'}]});
}
function g22Exists(n){ return n === 'nhatky.txt'; }

var EX = {
am:{inputs:[],
 intro:'Chương trình mở một tệp không có thật rồi đọc từ nó. Hãy để ý xem có lỗi nào hiện ra không. Bấm "Bước tiếp".',
 lines:function(){ return ['ifstream f("file_khong_ton_tai.txt");', 'string dong;', 'getline(f, dong);', 'cout << "Da doc duoc: ["', '     << dong << "]" << endl;', 'cout << "Chuong trinh van chay "', '     << "tiep binh thuong, "', '     << "KHONG BAO LOI GI CA!"', '     << endl;']; },
 run:function(c){
  var N = 'file_khong_ton_tai.txt';
  c.snap({ln:0, title:'Mở một tệp không tồn tại',
   body:'f là luồng dùng để đọc tệp. Máy tìm trong thư mục nhưng không thấy tệp này. Không có lỗi nào hiện ra, chỉ có đèn fail() bật sáng.',
   viz:[g22Tree(N, false), g22Flags(false)]});
  c.snap({ln:2, title:'getline đọc từ tệp chưa mở',
   body:'getline không đọc được gì, nên dong vẫn là chuỗi rỗng. Chương trình vẫn không báo lỗi.',
   viz:[vBoxes([{name:'dong', type:'string', v:'"" (rỗng)', s:'bad'}], {frame:'main()'}), g22Flags(false)]});
  c.out('Da doc duoc: []');
  c.snap({ln:3, title:'In dong',
   body:'Màn hình in ra Da doc duoc: [] với dấu [] trống.',
   viz:[vBoxes([{name:'dong', type:'string', v:'"" (rỗng)', s:'bad'}], {frame:'main()'}), g22Flags(false)]});
  c.out('Chuong trinh van chay tiep binh thuong, KHONG BAO LOI GI CA!');
  c.snap({ln:5, title:'Chương trình chạy tiếp',
   body:'Mọi thứ vẫn chạy bình thường, không có thông báo lỗi nào.',
   viz:[vBoxes([{name:'dong', type:'string', v:'"" (rỗng)', s:'bad'}], {frame:'main()'}), g22Flags(false)]});
  c.snap({ln:5, title:'Xong',
   body:'Kết quả trông như tệp rỗng, nhưng thật ra tệp chưa hề được mở. Rất dễ nhầm.',
   note:'Mở tệp thất bại không làm chương trình dừng và không báo lỗi. Muốn biết phải tự kiểm tra.',
   viz:[vCard({kind:'warn', title:'Trông như tệp rỗng', sub:'Thật ra tệp chưa hề mở được'}), g22Flags(false)]});
 }},
kt:{inputs:[{id:'ten', label:'Tên tệp', def:'file_khong_ton_tai.txt', text:'^[A-Za-z0-9_.]{1,26}$', msg:'Nhập tên tệp, ví dụ nhatky.txt', w:200}],
 chips:['file_khong_ton_tai.txt', 'nhatky.txt'],
 intro:'Chương trình kiểm tra tệp ngay sau khi mở. Trong thư mục chỉ có nhatky.txt. Hãy thử cả hai tên tệp bằng nút gợi ý. Bấm "Bước tiếp".',
 lines:function(P){ return ['ifstream f("' + P.ten + '");', 'if (!f.is_open()) {', '  cout << "LOI: Khong the mo file! "', '       << "File co the khong ton tai.";', '} else {', '  cout << "Mo file thanh cong!";', '}']; },
 run:function(c, P){
  var N = P.ten, ok = g22Exists(N);
  c.snap({ln:0, title:'Mở tệp ' + N,
   body: ok ? 'Máy tìm thấy nhatky.txt trong thư mục. Đèn is_open() sáng, fail() tắt.' : 'Máy không tìm thấy tệp này. Đèn fail() sáng, is_open() tắt. Chưa có gì được báo ra.',
   viz:[g22Tree(N, ok), g22Flags(ok)]});
  c.snap({ln:1, title:'Trạm kiểm tra: if (!f.is_open())',
   body: ok ? 'is_open() là true, dấu ! đảo thành false nên điều kiện sai. Chương trình rẽ sang nhánh else.' : 'is_open() là false, dấu ! đảo thành true nên điều kiện đúng. Chương trình rẽ vào nhánh báo lỗi.',
   viz:[vFlow([{t:'f.is_open()', sub:ok ? 'true' : 'false', s:ok ? 'ok' : 'bad'}, {t:'!f.is_open()', sub:ok ? 'false' : 'true', s:'hi'}, {t:ok ? 'nhánh else' : 'nhánh báo lỗi', s:ok ? 'ok' : 'bad'}], {title:'Trạm kiểm tra'}), g22Flags(ok)]});
  if (ok){
   c.out('Mo file thanh cong!');
   c.snap({ln:5, title:'Nhánh else', body:'Tệp mở được nên chương trình báo thành công và có thể đọc tiếp an toàn.',
    viz:[g22Tree(N, true), g22Flags(true)]});
  } else {
   c.out('LOI: Khong the mo file! File co the khong ton tai.');
   c.snap({ln:2, title:'Nhánh báo lỗi', body:'Chương trình báo lỗi rõ ràng cho người dùng, thay vì im lặng như lúc không kiểm tra.',
    viz:[g22Tree(N, false), g22Flags(false)]});
  }
  var r = ok ? 'false (chạy else)' : 'true (báo lỗi)';
  c.snap({ln:1, title:'Xong',
   body:'if (!f) viết ngắn gọn hơn và cho cùng kết quả: nó kiểm tra đèn fail(). Ngay sau khi mở, hai cách luôn giống nhau.',
   note:'Luôn kiểm tra ngay sau khi mở tệp: if (!f.is_open()) hoặc if (!f).',
   viz:vGrid([['Cách viết', 'Ý nghĩa', 'Điều kiện'], ['!f.is_open()', 'tệp chưa mở được', r], ['!f', 'đèn fail() đang sáng', r]], {head:true})});
 }},
ham:{inputs:[],
 intro:'Hàm docFile được gọi hai lần: một lần với tệp không có thật, một lần với nhatky.txt. Hãy để ý return dừng hàm sớm. Bấm "Bước tiếp".',
 lines:function(){ return ['void docFile(string tenFile) {', '  ifstream f(tenFile);', '  if (!f.is_open()) {', '    cout << "Khong the mo file \'"', '         << tenFile << "\'. Vui long "', '         << "kiem tra lai ten file!"', '         << endl;', '    return;', '  }', '  cout << "Doc noi dung file \'"', '       << tenFile << "\':" << endl;', '  string dong;', '  while (getline(f, dong)) {', '    cout << "  " << dong << endl;', '  }', '  f.close();', '}', '', 'int main() {', '  docFile("file_khong_ton_tai.txt");', '  cout << "----" << endl;', '  docFile("nhatky.txt");', '}']; },
 run:function(c){
  var BAD = 'file_khong_ton_tai.txt', GOOD = 'nhatky.txt';
  function stk(name, s){ var f = [{t:'main()'}]; if (name) f.push({t:'docFile("' + name + '")', s:s || 'hi'}); return vStack(f); }
  c.snap({ln:19, title:'Gọi docFile("file_khong_ton_tai.txt")',
   body:'main gọi hàm docFile. Hàm bắt đầu chạy, nằm chồng lên main.',
   viz:[stk(BAD), g22Tree(BAD, null)]});
  c.snap({ln:2, title:'Mở tệp rồi kiểm tra',
   body:'Tệp không có thật nên is_open() là false, điều kiện !f.is_open() đúng. Chương trình vào khối báo lỗi.',
   viz:[stk(BAD), g22Tree(BAD, false), g22Flags(false)]});
  c.out("Khong the mo file 'file_khong_ton_tai.txt'. Vui long kiem tra lai ten file!");
  c.snap({ln:3, title:'In thông báo lỗi', body:'Người dùng được báo rõ tệp nào không mở được.',
   viz:[stk(BAD, 'bad'), g22Flags(false)]});
  c.snap({ln:7, title:'return: thoát hàm ngay',
   body:'return đóng hàm lại ngay. Các dòng phía sau (đọc tệp) mờ đi vì không chạy.',
   dim:[9, 10, 11, 12, 13, 14, 15], dimLabel:'không chạy',
   viz:[stk(null), vCard({kind:'ok', title:'docFile kết thúc sớm', sub:'Không đọc dòng nào vô nghĩa'})]});
  c.out('----');
  c.snap({ln:20, title:'In dòng gạch', body:'Quay về main, in dòng ---- để ngăn cách hai lần gọi.', viz:[stk(null), vCard({kind:'info', title:'Quay về main()', sub:'Lần gọi thứ nhất đã xong'})]});
  c.snap({ln:2, title:'Gọi docFile("nhatky.txt")',
   body:'Lần này tệp có thật nên is_open() là true, điều kiện sai. Chương trình đi tiếp, không return.',
   viz:[stk(GOOD), g22Tree(GOOD, true), g22Flags(true)]});
  c.out("Doc noi dung file 'nhatky.txt':");
  c.snap({ln:9, title:'In tiêu đề', body:'Tệp mở được, hàm bắt đầu đọc nội dung.',
   viz:[stk(GOOD), vText(['Dong 1: Hom nay troi dep.', 'Dong 2: Toi di hoc.'], {title:'nhatky.txt', cursor:0})]});
  c.out('  Dong 1: Hom nay troi dep.');
  c.out('  Dong 2: Toi di hoc.');
  c.snap({ln:12, title:'Vòng while đọc từng dòng',
   body:'Vòng while đọc dòng 1, dòng 2 rồi dừng khi hết tệp. Sau đó f.close() đóng tệp.',
   note:'Kiểm tra is_open() ngay từ đầu và return sớm khi lỗi; chỉ đọc tiếp khi tệp đã mở được.',
   viz:[stk(GOOD), vText(['Dong 1: Hom nay troi dep.', 'Dong 2: Toi di hoc.'], {title:'nhatky.txt', cursor:2})]});
 }}
};
