// META {"module":4,"lesson":"Bài 4.5. Đọc file","activity":"Đọc File Theo Từng Dòng Bằng Vòng Lặp (while + getline)","title":"Đọc tệp bằng vòng lặp: getline và eof()","lead":"Hai cột cùng đọc một tệp 3 dòng: bên trái lấy getline làm điều kiện, bên phải dùng !eof(). Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["so","getline và !eof()"],["khong","Dòng cuối không có ↵"],["so2","Đọc số: f >> diem"]],"codeTitle":"Mã nguồn C++","path":"xu-ly-file-file-io/doc-file/doc-file-theo-tung-dong-bang-vong-lap-while-getline/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Con trỏ đọc, đèn trạng thái và bảng lượt lặp';

var G24_NAMES = ['Nguyen Van An', 'Tran Thi Binh', 'Le Van Cuong'];
/* Trình xem tệp danhsach.txt. pos = số dòng đã đọc xong (con trỏ ▶ đứng ở dòng pos; pos = n nghĩa là ở cuối tệp EOF).
   lastLF: dòng cuối có ký tự xuống dòng ↵ không. */
function g24File(pos, lastLF){
  var lines = G24_NAMES.map(function(t, i){
    var seg = [{t:t}];
    if (i < 2 || lastLF) seg.push({t:' ↵', s:'dim'});
    return {seg:seg};
  });
  lines.push({t:'EOF (hết tệp)', s:'dim'});
  return vText(lines, {title:'danhsach.txt', cursor:pos});
}
/* Ba đèn: good / eof / fail */
function g24Flags(good, eof, fail, note){
  return vFlags({stream:'f', flags:[{n:'good()', v:good, k:'ok'}, {n:'eof()', v:eof, k:'hi'}, {n:'fail()', v:fail, k:'bad'}], note:note});
}
/* Bảng lượt lặp. rows: mảng hàng [lượt, điều kiện, dong, soDong] */
function g24Trace(head, rows){ return vTrace(head, rows); }

/* Cột trái: while (getline(f, dong)). lastLF: dòng cuối có ↵ */
function g24Left(lastLF){
  return {title:'while (getline(f, dong))', sub:'Điều kiện chính là phép đọc.',
  lines:['ifstream f("danhsach.txt");', 'string dong;', 'int soDong = 0;', 'while (getline(f, dong)) {', '  soDong++;', '  cout << "Dong " << soDong', '       << ": " << dong << endl;', '}'],
  run:function(c){
   var rows = [], H = ['Lượt', 'getline?', 'dong', 'soDong'];
   c.snap({ln:2, title:'Mở tệp', body:'Tệp có 3 dòng. Con trỏ đọc ▶ đứng ở đầu tệp, ba đèn đang ở trạng thái tốt.',
    viz:[g24File(0, lastLF), g24Flags(true, false, false)]});
   for (var i = 0; i < 3; i++){
    var last = (i === 2), eofOn = last && !lastLF;
    rows.push([String(i + 1), {v:'✓ thành công', s:'ok'}, G24_NAMES[i], String(i + 1)]);
    c.out('Dong ' + (i + 1) + ': ' + G24_NAMES[i]);
    c.snap({ln:6, title:'Lượt ' + (i + 1) + ': getline thành công',
     body: 'getline đọc được "' + G24_NAMES[i] + '", điều kiện đúng nên vào vòng lặp và in ra dòng này.' + (eofOn ? ' Dòng này không có ↵ nên đèn eof bật ngay, nhưng việc đọc vẫn thành công.' : ''),
     viz:[g24File(i + 1, lastLF), g24Flags(!eofOn, eofOn, false), g24Trace(H, rows)]});
   }
   rows.push([String(4), {v:'✗ thất bại', s:'bad'}, '(không đổi)', '3']);
   c.snap({ln:3, title:'Lượt 4: getline thất bại',
    body:'Không còn gì để đọc, getline thất bại. Đèn eof và fail bật, điều kiện sai nên vòng lặp dừng. Không có dòng thừa nào lọt vào.',
    viz:[g24File(3, lastLF), g24Flags(false, true, true), g24Trace(H, rows)]});
   c.snap({ln:7, title:'Xong', body:'Đọc đúng 3 dòng: soDong = 3.',
    note:'Lấy chính phép đọc làm điều kiện vòng lặp: đọc được thì lặp, đọc hụt thì dừng.',
    viz:[g24File(3, lastLF), vScore([{k:'soDong', v:3, s:'ok'}])]});
  }};
}
/* Cột phải: while (!f.eof()) */
function g24Right(lastLF){
  return {title:'while (!f.eof())', sub:'Điều kiện chỉ nhìn đèn eof.',
  lines:['ifstream f("danhsach.txt");', 'string dong;', 'int soDong = 0;', 'while (!f.eof()) {', '  getline(f, dong);', '  soDong++;', '  cout << "Dong " << soDong', '       << ": [" << dong << "]"', '       << endl;', '}'],
  run:function(c){
   var rows = [], H = ['Lượt', '!eof()', 'dong', 'soDong'];
   c.snap({ln:2, title:'Mở tệp', body:'Cùng một tệp 3 dòng. Đèn eof đang tắt.',
    viz:[g24File(0, lastLF), g24Flags(true, false, false)]});
   for (var i = 0; i < 3; i++){
    var last = (i === 2), eofOn = last && !lastLF;
    rows.push([String(i + 1), {v:'✓ eof tắt', s:'ok'}, '[' + G24_NAMES[i] + ']', String(i + 1)]);
    c.out('Dong ' + (i + 1) + ': [' + G24_NAMES[i] + ']');
    c.snap({ln:7, title:'Lượt ' + (i + 1) + ': đọc và in',
     body: 'Đèn eof tắt nên vào vòng lặp, getline đọc "' + G24_NAMES[i] + '" rồi in.' + (eofOn ? ' Vì dòng này không có ↵, lúc đọc đã chạm cuối tệp nên đèn eof bật.' : ''),
     viz:[g24File(i + 1, lastLF), g24Flags(!eofOn, eofOn, false), g24Trace(H, rows)]});
   }
   if (lastLF){
    c.snap({ln:3, title:'Lượt 4: eof vẫn tắt',
     body:'Con trỏ đã đứng cuối tệp, nhưng chưa ai đọc thử nên đèn eof VẪN tắt. !eof() vẫn đúng, vòng lặp chạy thêm một lượt.',
     viz:[g24File(3, lastLF), g24Flags(true, false, false, 'Chưa ai chạm vào cuối tệp'), g24Trace(H, rows)]});
    rows.push([String(4), {v:'✓ eof tắt', s:'bad'}, '[]', '4']);
    c.snap({ln:4, title:'getline đọc hụt',
     body:'getline thất bại: dong thành chuỗi rỗng, đèn eof và fail bật. Nhưng thân vòng lặp vẫn chạy tiếp.',
     viz:[g24File(3, lastLF), g24Flags(false, true, true), g24Trace(H, rows)]});
    c.out('Dong 4: []');
    c.snap({ln:6, title:'In dòng thừa',
     body:'Chương trình in "Dong 4: []" và đếm soDong = 4, dù tệp chỉ có 3 dòng.',
     viz:[g24File(3, lastLF), g24Flags(false, true, true), g24Trace(H, rows)]});
    c.snap({ln:3, title:'Xong', body:'Lần kiểm tra sau, eof đã bật nên vòng lặp dừng, nhưng đã thừa một lượt. soDong = 4 là SAI.',
     note:'eof() chỉ đúng SAU khi đã đọc hụt, nên while (!eof()) chạy dư một lượt.',
     viz:[g24File(3, lastLF), vScore([{k:'soDong', v:4, s:'bad'}, {k:'đúng phải là', v:3, s:'ok'}])]});
   } else {
    c.snap({ln:3, title:'Kiểm tra lại điều kiện',
     body:'Đèn eof đã bật từ lượt 3 nên !eof() sai, vòng lặp dừng. Lần này không thừa lượt nào.',
     viz:[g24File(3, lastLF), g24Flags(false, true, false), g24Trace(H, rows)]});
    c.snap({ln:9, title:'Xong', body:'Lần này soDong = 3, đúng. Nhưng chỉ đúng vì dòng cuối không có ↵.',
     note:'Lỗi lúc có lúc không (tùy dòng cuối có ↵ hay không) càng nguy hiểm. Hãy luôn dùng while (getline(...)).',
     viz:[g24File(3, lastLF), vScore([{k:'soDong', v:3, s:'hi'}])]});
   }
  }};
}

var EX = {
so:{
 intro:'Cả hai cột đọc tệp danhsach.txt có 3 dòng, mỗi dòng đều kết thúc bằng ↵ (ký tự xuống dòng). Bấm "Bước tiếp".',
 running:'Mỗi lượt lặp, hãy nhìn đèn eof ở cột phải: nó chưa bật khi đã hết dữ liệu.',
 done:'Cột trái đếm đúng 3 dòng. Cột phải đếm 4 dòng vì đọc dư một lượt.',
 note:'Lấy chính phép đọc làm điều kiện vòng lặp; eof() chỉ đúng SAU khi đã đọc hụt.',
 cols:[g24Left(true), g24Right(true)]},
khong:{
 intro:'Cùng hai vòng lặp, nhưng lần này dòng cuối của tệp KHÔNG có ↵ (tệp không kết thúc bằng xuống dòng). Bấm "Bước tiếp".',
 running:'Hãy xem lúc nào đèn eof bật ở mỗi cột.',
 done:'Cả hai cột đều ra 3. Cột phải chỉ đúng vì dòng cuối không có ↵, còn tệp có ↵ thì ra 4. Lúc đúng lúc sai nên khó phát hiện.',
 note:'while (!eof()) lúc đúng lúc sai tùy tệp, nên càng nguy hiểm. Dùng while (getline(...)).',
 cols:[g24Left(false), g24Right(false)]},
so2:{inputs:[],
 intro:'Cùng nguyên tắc, nhưng đọc các số trong tệp diemso.txt (8 7 9 6 10) bằng toán tử >>. Bấm "Bước tiếp".',
 lines:function(){ return ['ifstream f("diemso.txt");', 'int diem;', 'int tong = 0, dem = 0;', 'while (f >> diem) {', '  tong += diem;', '  dem++;', '  cout << "Doc duoc diem: "', '       << diem << endl;', '}', 'cout << "Tong so diem: " << dem', '     << ", Tong diem: " << tong', '     << endl;']; },
 run:function(c){
  var nums = [8, 7, 9, 6, 10], tong = 0, rows = [], H = ['Lượt', 'f >> diem', 'diem', 'tong'];
  function cells(k, bad){ return vCells(nums.map(function(v, i){ return {v:v, s:i < k ? 'ok' : (i === k ? (bad ? 'bad' : 'hi') : null)}; }), {name:'diemso.txt'}); }
  c.snap({ln:2, title:'Mở tệp', body:'Tệp diemso.txt chứa 5 số. Ba đèn đang tốt.',
   viz:[cells(0), g24Flags(true, false, false)]});
  for (var i = 0; i < 5; i++){
   tong += nums[i];
   rows.push([String(i + 1), {v:'✓ đọc được', s:'ok'}, String(nums[i]), String(tong)]);
   c.out('Doc duoc diem: ' + nums[i]);
   c.snap({ln:6, title:'Lượt ' + (i + 1) + ': đọc được ' + nums[i],
    body:'f >> diem đọc được ' + nums[i] + ', điều kiện đúng nên cộng vào tong. Tong lúc này là ' + tong + '.',
    viz:[cells(i + 1), g24Flags(true, false, false), g24Trace(H, rows)]});
  }
  rows.push([String(6), {v:'✗ thất bại', s:'bad'}, '(không đổi)', String(tong)]);
  c.snap({ln:3, title:'Lượt 6: hết số để đọc',
   body:'Phép đọc thất bại nên điều kiện sai và vòng lặp dừng. Không có số rác nào lọt vào.',
   viz:[cells(5), g24Flags(false, true, true), g24Trace(H, rows)]});
  c.out('Tong so diem: 5, Tong diem: ' + tong);
  c.snap({ln:9, title:'Xong', body:'In kết quả: 5 số, tổng 40.',
   note:'Quy tắc dùng cho mọi phép đọc: lấy chính phép đọc (getline hay >>) làm điều kiện vòng lặp.',
   viz:[vScore([{k:'Số điểm', v:5, s:'ok'}, {k:'Tổng', v:tong, s:'ok'}])]});
 }}
};
