// META {"module":4,"lesson":"Bài 4.2. Các lớp fstream và quy trình 3 bước","activity":"Quy Trình 3 Bước Chuẩn: Mở File → Xử Lý → Đóng File","title":"Mở, xử lý, đóng: vì sao phải close()","lead":"Xem dữ liệu đi qua bộ đệm trước khi xuống tệp trên đĩa. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["du","Ghi đủ 3 bước"],["quen","Quên close rồi đọc lại"],["sau","Ghi sau khi đã close"]],"codeTitle":"Mã nguồn C++","path":"xu-ly-file-file-io/cac-lop-fstream-va-quy-trinh-3-buoc/quy-trinh-3-buoc-chuan-mo-file-xu-ly-dong-file/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Chương trình, bộ đệm và tệp trên đĩa';

/* Thanh 3 bước: cur = 0 Mở, 1 Xử lý, 2 Đóng, -1 chưa bắt đầu */
function b21Steps(cur){
  var n = ['1. Mở', '2. Xử lý', '3. Đóng'];
  return vLamps(n.map(function(t, i){ return {t:t, s:i === cur ? 'hi' : (i < cur ? 'ok' : 'off')}; }), {title:'Quy trình'});
}
/* Bộ đệm + tệp: buf = chữ đang nằm trong bộ đệm; fileLines = nội dung tệp trên đĩa (null = chưa có tệp); open = true/false */
function b21Main(buf, fileLines, name, open, fill, fileS){
  var lamp = vLamps([{t:'Tệp ' + name, s:open ? 'ok' : 'off', sub:open ? 'Đang mở' : 'Đóng'}]);
  var b = vBuf({label:'Bộ đệm (chỗ giữ chữ tạm trong RAM)', fill:fill, text:buf || '(trống)'});
  var f = fileLines === null
    ? '<p class="cm" style="margin:0">Chưa có tệp.</p>'
    : vText(fileLines.length ? fileLines : [{t:'(tệp rỗng)', s:'dim'}], {title:'Tệp ' + name + ' trên đĩa', eol:fileLines.length > 0 && fileLines[0].indexOf('Du lieu') !== 0, noNo:true});
  return [lamp, b, f];
}

var EX = {
du:{inputs:[],
 intro:'Ghi hai dòng vào baihoc.txt đúng 3 bước, rồi đọc lại. Bấm "Bước tiếp".',
 lines:function(){ return ['// Bước 1: mở', 'ofstream fileGhi("baihoc.txt");', '// Bước 2: ghi', 'fileGhi << "Hoc C++ that thu vi!\\n";', 'fileGhi << "Day la dong thu hai.\\n";', '// Bước 3: đóng', 'fileGhi.close();', '', 'ifstream fileDoc("baihoc.txt");', 'string d1, d2;', 'getline(fileDoc, d1);', 'getline(fileDoc, d2);', 'fileDoc.close();', 'cout << d1 << endl << d2 << endl;']; },
 run:function(c){
  var N = 'baihoc.txt', L1 = 'Hoc C++ that thu vi!', L2 = 'Day la dong thu hai.';
  c.snap({ln:1, title:'Bước 1: mở file',
   body:'Mở ofstream: tệp baihoc.txt xuất hiện trên đĩa, còn rỗng. Đèn chuyển sang xanh.',
   viz:[b21Steps(0)].concat(b21Main('', [], N, true, 0))});
  c.snap({ln:3, title:'Bước 2: ghi dòng 1',
   body:'Chữ vào bộ đệm trước, chưa xuống đĩa. Tệp trên đĩa vẫn rỗng.',
   viz:[b21Steps(1)].concat(b21Main(L1, [], N, true, 45))});
  c.snap({ln:4, title:'Ghi dòng 2',
   body:'Dòng thứ hai nối tiếp vào bộ đệm, bộ đệm đầy thêm. Tệp vẫn rỗng.',
   viz:[b21Steps(1)].concat(b21Main(L1 + ' / ' + L2, [], N, true, 90))});
  c.snap({ln:6, title:'Bước 3: close()',
   body:'close() đổ cả bộ đệm xuống tệp. Giờ tệp có 2 dòng và đèn chuyển xám.',
   viz:[b21Steps(2)].concat(b21Main('', [L1, L2], N, false, 0))});
  c.snap({ln:8, title:'Đọc lại: mở ifstream',
   body:'Đọc cũng theo 3 bước. Mở ifstream để đọc baihoc.txt.',
   viz:[b21Steps(0)].concat(b21Main('', [L1, L2], N, true, 0))});
  c.out(L1); c.out(L2);
  c.snap({ln:13, title:'Xong',
   body:'getline lấy từng dòng, close() đóng tệp, rồi in ra hai dòng.',
   note:'Luôn đủ 3 bước: Mở, Xử lý, Đóng.',
   viz:[b21Steps(2)].concat(b21Main('', [L1, L2], N, false, 0))});
 }},
quen:{inputs:[],
 intro:'Ghi xong nhưng quên close(), rồi đọc lại ngay. Bấm "Bước tiếp".',
 lines:function(){ return ['ofstream fileGhi("test4.txt");', 'fileGhi << "Du lieu quan trong";', '// quên fileGhi.close();', '', 'ifstream fileDoc("test4.txt");', 'string noiDung;', 'getline(fileDoc, noiDung);', 'fileDoc.close();', 'cout << "Doc duoc: ["', '     << noiDung << "]" << endl;', '', '// Sửa: thêm dòng này trước khi đọc', 'fileGhi.close();']; },
 run:function(c){
  var N = 'test4.txt', D = 'Du lieu quan trong';
  c.snap({ln:0, title:'Mở file ghi',
   body:'Mở ofstream: tệp test4.txt xuất hiện, rỗng, đèn xanh.',
   viz:[b21Steps(0)].concat(b21Main('', [], N, true, 0))});
  c.snap({ln:1, title:'Ghi chữ',
   body:'"Du lieu quan trong" nằm trong bộ đệm. Tệp trên đĩa vẫn rỗng.',
   viz:[b21Steps(1)].concat(b21Main(D, [], N, true, 55))});
  c.snap({ln:2, title:'Quên close()',
   body:'Không có close() nên bộ đệm chưa được đổ xuống tệp. Đèn vẫn xanh.',
   viz:[b21Steps(1), vCard({kind:'warn', title:'Thiếu bước 3', sub:'Chưa close(), dữ liệu chưa chắc nằm trên đĩa'})].concat(b21Main(D, [], N, true, 55).slice(1))});
  c.snap({ln:6, title:'Đọc lại ngay',
   body:'ifstream nhìn vào tệp trên đĩa và thấy rỗng, nên getline lấy được chuỗi rỗng. (Với dữ liệu nhỏ thường như vậy, nhưng không được đảm bảo.)',
   viz:[b21Steps(1)].concat(b21Main(D, [], N, true, 55))});
  c.out('Doc duoc: []');
  c.snap({ln:8, title:'Kết quả sai',
   body:'Chương trình in "Doc duoc: []": dữ liệu vừa ghi chưa đọc được.',
   viz:[b21Steps(1)].concat(b21Main(D, [], N, true, 55))});
  c.clear();
  c.snap({ln:12, title:'Thêm close() trước khi đọc',
   body:'Gọi fileGhi.close() ngay sau khi ghi: bộ đệm đổ xuống tệp, tệp có đủ chữ.',
   viz:[b21Steps(2)].concat(b21Main('', [D], N, false, 0))});
  c.out('Doc duoc: [Du lieu quan trong]');
  c.snap({ln:8, title:'Xong',
   body:'Chạy lại: lần này ifstream đọc đầy đủ "Du lieu quan trong".',
   note:'Dữ liệu chỉ chắc chắn nằm trên đĩa sau close() (hoặc flush). Hãy close() trước khi đọc lại.',
   viz:[b21Steps(2)].concat(b21Main('', [D], N, false, 0))});
 }},
sau:{inputs:[],
 intro:'Điều gì xảy ra nếu ghi tiếp sau khi đã close()? Bấm "Bước tiếp".',
 lines:function(){ return ['ofstream fileGhi("test3.txt");', 'fileGhi << "Dong dau tien\\n";', 'fileGhi.close();', '', 'fileGhi << "Thu ghi them";', '', 'if (fileGhi.is_open())', '  cout << "Van dang mo";', 'else', '  cout << "Da dong, khong the ghi them";']; },
 run:function(c){
  var N = 'test3.txt', D = 'Dong dau tien';
  c.snap({ln:0, title:'Mở và ghi',
   body:'Mở test3.txt rồi ghi "Dong dau tien". Chữ đang nằm trong bộ đệm.',
   viz:[b21Steps(1)].concat(b21Main(D, [], N, true, 40))});
  c.snap({ln:2, title:'close()',
   body:'close() đổ bộ đệm xuống tệp và đóng. Tệp có 1 dòng, đèn xám.',
   viz:[b21Steps(2)].concat(b21Main('', [D], N, false, 0))});
  c.snap({ln:4, title:'Ghi thêm sau khi đã đóng',
   body:'Ống đã đóng nên chữ mới không vào được, bị rơi mất. Tệp không đổi.',
   viz:[b21Steps(2), vCard({kind:'err', title:'Chữ bị rơi mất', sub:'"Thu ghi them" không vào đâu cả'})].concat(b21Main('', [D], N, false, 0).slice(1))});
  c.snap({ln:6, title:'Kiểm tra is_open()',
   body:'is_open() cho biết tệp đang mở hay không. Ở đây trả về false.',
   viz:[b21Steps(2)].concat(b21Main('', [D], N, false, 0))});
  c.out('Da dong, khong the ghi them');
  c.snap({ln:9, title:'Xong',
   body:'Tệp chỉ có đúng 1 dòng. Muốn ghi tiếp, phải open() lại.',
   note:'Đã close() thì phải open() lại mới dùng tiếp được.',
   viz:[b21Steps(2)].concat(b21Main('', [D], N, false, 0))});
 }}
};
