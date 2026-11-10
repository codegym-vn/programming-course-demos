// META {"module":4,"lesson":"Bài 4.4. Chế độ mở file và ghi file","activity":"Các Chế Độ Mở File (File Modes): ios::in, ios::out, ios::app","title":"Chế độ mở tệp: out xóa sạch, app ghi nối đuôi","lead":"Xem tệp nhatky.txt thay đổi thế nào khi mở bằng ios::out, ios::app hoặc ios::in | ios::app. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["out","ios::out (mặc định)"],["app","ios::app"],["inapp","ios::in | ios::app"]],"codeTitle":"Mã nguồn C++","path":"xu-ly-file-file-io/che-do-mo-file-va-ghi-file/cac-che-do-mo-file-file-modes-ios-in-ios-out-ios-app/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Tệp nhatky.txt và công tắc chế độ mở';

var G23_L1 = 'Dong 1: Hom nay troi dep.', G23_L2 = 'Dong 2: Toi di hoc.', G23_L3 = 'Dong 3: Buoi toi toi doc sach.', G23_L4 = 'Dong moi them vao (van con dong cu).';
/* Công tắc: o = {out, app, inn} */
function g23Modes(o){
  return vModes({modes:[{n:'ios::out', sub:'ghi từ đầu, xóa cũ', on:!!o.out}, {n:'ios::app', sub:'ghi nối vào cuối', on:!!o.app}, {n:'ios::in', sub:'đọc', on:!!o.inn}]});
}
/* Trình xem tệp; lines: mảng dòng; opt: {cursor, title}. Tệp trống thì hiện chữ mờ */
function g23File(lines, opt){
  opt = opt || {};
  if (!lines.length) return vText([{t:'(tệp trống)', s:'dim'}], {title:opt.title || 'nhatky.txt', noNo:true});
  return vText(lines, {title:opt.title || 'nhatky.txt', cursor:opt.cursor});
}

var EX = {
out:{inputs:[],
 intro:'Tệp nhatky.txt đang có 2 dòng. Hãy xem chuyện gì xảy ra với 2 dòng đó ngay khi mở tệp bằng ofstream thường. Bấm "Bước tiếp".',
 lines:function(){ return ['ofstream f("nhatky.txt");', 'f << "Dong moi duy nhat." << endl;', 'f.close();']; },
 run:function(c){
  c.snap({ln:-1, title:'Trước khi chạy', body:'Tệp nhatky.txt có sẵn 2 dòng.',
   viz:[g23Modes({}), g23File([G23_L1, G23_L2])]});
  c.snap({ln:0, title:'Mở tệp bằng ofstream',
   body:'ofstream mặc định dùng ios::out. Ngay lúc mở, tệp bị xóa sạch, dù chưa ghi dòng nào.',
   viz:[g23Modes({out:true}), g23File([]), vCard({kind:'err', title:'Chưa ghi gì mà đã mất', sub:'2 dòng cũ biến mất ngay khi mở'})]});
  c.snap({ln:1, title:'Ghi một dòng mới',
   body:'Tệp đang trống nên dòng mới nằm ngay ở đầu tệp.',
   viz:[g23Modes({out:true}), g23File([{t:'Dong moi duy nhat.', s:'new'}])]});
  c.snap({ln:2, title:'Xong',
   body:'Đóng tệp. Hai dòng cũ đã mất hẳn, chỉ còn đúng dòng vừa ghi.',
   note:'ofstream mặc định = ios::out = xóa sạch tệp khi mở. Muốn giữ dữ liệu cũ phải dùng ios::app.',
   viz:vPair(g23File([G23_L1, G23_L2], {title:'Trước'}), g23File(['Dong moi duy nhat.'], {title:'Sau'}), {ta:'Trước khi chạy', tb:'Sau khi chạy', mid:'→'})});
 }},
app:{inputs:[],
 intro:'Tệp nhatky.txt đang có 2 dòng. Lần này mở tệp bằng ios::app. Bấm "Bước tiếp".',
 lines:function(){ return ['ofstream f("nhatky.txt", ios::app);', 'f << "Dong 3: Buoi toi toi doc sach."', '  << endl;', 'f.close();']; },
 run:function(c){
  c.snap({ln:-1, title:'Trước khi chạy', body:'Tệp nhatky.txt có sẵn 2 dòng.',
   viz:[g23Modes({}), g23File([G23_L1, G23_L2])]});
  c.snap({ln:0, title:'Mở tệp bằng ios::app',
   body:'app là append, nghĩa là nối thêm. Hai dòng cũ vẫn còn nguyên và việc ghi sẽ bắt đầu từ cuối tệp.',
   viz:[g23Modes({app:true}), g23File([G23_L1, G23_L2, {t:'| ghi tiếp ở đây', s:'hi'}])]});
  c.snap({ln:1, title:'Ghi dòng 3',
   body:'Dòng mới được nối vào đuôi tệp, viền xanh. Không dòng nào bị mất.',
   viz:[g23Modes({app:true}), g23File([G23_L1, G23_L2, {t:G23_L3, s:'new'}])]});
  c.snap({ln:3, title:'Xong',
   body:'Đóng tệp. Tệp giờ có 3 dòng. Đặt hai chế độ cạnh nhau sẽ thấy rõ sự khác biệt.',
   note:'ios::app giữ nguyên nội dung cũ và luôn ghi vào cuối tệp.',
   viz:vGrid([['', 'ios::out', 'ios::app'], ['Khi vừa mở tệp', {t:'xóa sạch nội dung cũ', s:'bad'}, {t:'giữ nguyên nội dung cũ', s:'ok'}], ['Ghi vào chỗ nào', 'từ đầu tệp', 'cuối tệp']], {head:true})});
 }},
inapp:{inputs:[],
 intro:'Lúc này nhatky.txt đã có 3 dòng. Chương trình vừa đọc vừa ghi thêm, bằng cách ghép hai chế độ với dấu |. Bấm "Bước tiếp".',
 lines:function(){ return ['fstream f("nhatky.txt",', '  ios::in | ios::app);', 'f.seekg(0);', 'string dongDau;', 'getline(f, dongDau);', 'cout << "Doc duoc dong dau: "', '     << dongDau << endl;', 'f << "Dong moi them vao "', '  << "(van con dong cu)." << endl;', 'f.close();']; },
 run:function(c){
  var L3 = [G23_L1, G23_L2, G23_L3];
  c.snap({ln:-1, title:'Trước khi chạy', body:'Tệp nhatky.txt đang có 3 dòng (sau khi đã thêm dòng 3).',
   viz:[g23Modes({}), g23File(L3)]});
  c.snap({ln:1, title:'Mở với ios::in | ios::app',
   body:'Dấu | ghép hai chế độ: vừa đọc được, vừa ghi thêm được. Nội dung vẫn còn nguyên. Tùy máy, vị trí đọc lúc này có thể ở đầu hoặc ở cuối tệp.',
   viz:[g23Modes({app:true, inn:true}), g23File(L3)]});
  c.snap({ln:2, title:'f.seekg(0);', body:'Đưa con trỏ đọc ▶ về đầu tệp cho chắc chắn, để máy nào chạy cũng giống nhau.',
   viz:[g23Modes({app:true, inn:true}), g23File(L3, {cursor:0})]});
  c.snap({ln:4, title:'Đọc dòng đầu',
   body:'getline đọc dòng 1 vào dongDau. Con trỏ đọc ▶ nhảy sang dòng 2.',
   viz:[g23Modes({app:true, inn:true}), g23File(L3, {cursor:1}), vBoxes([{name:'dongDau', type:'string', v:'"' + G23_L1 + '"', s:'new'}])]});
  c.out('Doc duoc dong dau: ' + G23_L1);
  c.snap({ln:5, title:'In dòng vừa đọc',
   body:'Màn hình in dòng 1. Tệp chưa hề thay đổi.',
   viz:[g23Modes({app:true, inn:true}), g23File(L3, {cursor:1})]});
  c.snap({ln:7, title:'Ghi thêm một dòng',
   body:'Dù con trỏ đọc đang ở dòng 2, dòng mới vẫn nhảy xuống cuối tệp. Đó là tác dụng của ios::app.',
   viz:[g23Modes({app:true, inn:true}), g23File(L3.concat([{t:G23_L4, s:'new'}]), {cursor:1})]});
  c.snap({ln:9, title:'Xong',
   body:'Đóng tệp. Tệp có 4 dòng, không dòng cũ nào bị mất.',
   note:'Dùng | để kết hợp chế độ: ios::in | ios::app vừa đọc được vừa ghi thêm vào cuối.',
   viz:[g23Modes({app:true, inn:true}), g23File(L3.concat([G23_L4]))]});
 }}
};
