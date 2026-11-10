// META {"module":4,"lesson":"Bài 4.2. Các lớp fstream và quy trình 3 bước","activity":"3 Lớp Cơ Bản: ofstream (Ghi), ifstream (Đọc) và fstream","title":"Dữ liệu chảy theo ống: ghi ra hay đọc vào","lead":"Xem chiều chảy của dữ liệu qua ofstream, ifstream và fstream. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["ghi","ofstream: ghi"],["doc","ifstream: đọc"],["fs","fstream và lỗi dùng sai chiều"]],"codeTitle":"Mã nguồn C++","path":"xu-ly-file-file-io/cac-lop-fstream-va-quy-trinh-3-buoc/3-lop-co-ban-ofstream-ghi-ifstream-doc-va-fstream/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Ống dẫn giữa chương trình và tệp';

/* Trình xem tệp: lines là mảng dòng (mỗi dòng kết thúc bằng ↵); rỗng thì báo "(tệp rỗng)". */
function b20File(name, lines, o){
  o = o || {};
  var items = lines.length ? lines : [{t:'(tệp rỗng)', s:'dim'}];
  return vText(items, {title:'Nội dung ' + name, eol:lines.length > 0, noNo:true});
}
/* Ống: out = chương trình → tệp; in = tệp → chương trình. Nút giữa là đối tượng stream. */
function b20Pipe(dir, cls, sub, s, item, fname){
  var P = {t:'Chương trình', sub:'', s:s.p}, S = {t:cls, sub:sub, s:s.m, item:item}, F = {t:fname, sub:'tệp trên đĩa', s:s.f};
  return vFlow(dir === 'out' ? [P, S, F] : [F, S, P], {title:'Ống dẫn dữ liệu'});
}
function b20Pair(boxes, fileHtml, dir, empty){
  return vPair(vBoxes(boxes, {empty:empty || 'Chưa có biến'}), fileHtml, {ta:'Biến trong chương trình', tb:'Tệp trên đĩa', mid:dir === 'out' ? '→' : '←'});
}

var EX = {
ghi:{inputs:[],
 intro:'ofstream là ống một chiều: dữ liệu đi từ chương trình ra tệp. Bấm "Bước tiếp".',
 lines:function(){ return ['ofstream fileGhi("thongtin.txt");', 'fileGhi << "Nguyen Van An" << endl;', 'fileGhi << 16 << endl;', 'fileGhi.close();']; },
 run:function(c){
  var N = 'thongtin.txt';
  var pipe = function(s, item, sub){ return b20Pipe('out', 'fileGhi', sub || 'ofstream: chỉ có <<', s, item, N); };
  c.snap({ln:0, title:'Mở ống ghi',
   body:'ofstream nối chương trình với thongtin.txt. Tệp mới được tạo rỗng; nếu tệp đã có, nội dung cũ bị xóa sạch.',
   viz:[pipe({p:'ok', m:'hi', f:'new'}), b20File(N, [])]});
  c.snap({ln:1, title:'Ghi dòng thứ nhất',
   body:'Chữ "Nguyen Van An" chảy theo ống vào tệp. endl xuống dòng (↵) và đẩy chữ xuống tệp ngay.',
   viz:[pipe({p:'hi', m:'hi', f:'ok'}, 'Nguyen Van An'), b20File(N, [{t:'Nguyen Van An', s:'new'}])]});
  c.snap({ln:2, title:'Ghi dòng thứ hai',
   body:'Số 16 chảy tiếp vào tệp, thành dòng thứ hai.',
   viz:[pipe({p:'hi', m:'hi', f:'ok'}, '16'), b20File(N, ['Nguyen Van An', {t:'16', s:'new'}])]});
  c.snap({ln:3, title:'Đóng tệp',
   body:'close() đóng ống. Tệp thongtin.txt có đúng hai dòng.',
   viz:[pipe({p:'ok', m:'dim', f:'ok'}, null, 'đã đóng'), b20File(N, ['Nguyen Van An', '16'])]});
  c.snap({ln:3, title:'Xong',
   body:'ofstream chỉ cho dữ liệu đi một chiều: từ chương trình ra tệp, bằng toán tử <<.',
   note:'o = Output: ghi ra file.',
   viz:[pipe({p:'ok', m:'dim', f:'ok'}, null, 'đã đóng'), b20File(N, ['Nguyen Van An', '16'])]});
 }},
doc:{inputs:[],
 intro:'ifstream là ống một chiều ngược lại: dữ liệu đi từ tệp vào chương trình. Bấm "Bước tiếp".',
 lines:function(){ return ['ifstream fileDoc("thongtin.txt");', 'string ten;', 'int tuoi;', 'getline(fileDoc, ten);', 'fileDoc >> tuoi;', 'fileDoc.close();', 'cout << "Doc duoc: Ten = " << ten', '     << ", Tuoi = " << tuoi << endl;']; },
 run:function(c){
  var N = 'thongtin.txt';
  var pipe = function(s, item, sub){ return b20Pipe('in', 'fileDoc', sub || 'ifstream: >> và getline', s, item, N); };
  var B = function(ten, tuoi, st, sa){ var a = []; if (ten !== undefined) a.push({name:'ten', type:'string', v:ten, s:st}); if (tuoi !== undefined) a.push({name:'tuoi', type:'int', v:tuoi, s:sa}); return a; };
  var F = function(i){ return [{t:'Nguyen Van An', s:i === 0 ? 'hi' : ''}, {t:'16', s:i === 1 ? 'hi' : ''}]; };
  c.snap({ln:0, title:'Mở ống đọc',
   body:'ifstream nối chương trình với thongtin.txt (tệp đã có sẵn hai dòng). Dữ liệu sẽ đi từ tệp lên chương trình.',
   viz:[pipe({p:'dim', m:'hi', f:'ok'}), b20Pair([], b20File(N, ['Nguyen Van An', '16']), 'in')]});
  c.snap({ln:2, title:'Khai báo ten và tuoi',
   body:'Hai hộp trong RAM đang chờ nhận dữ liệu: ten (chuỗi rỗng) và tuoi (chưa có số).',
   viz:[pipe({p:'dim', m:'ok', f:'ok'}), b20Pair(B('""', null, 'new', 'new'), b20File(N, ['Nguyen Van An', '16']), 'in')]});
  c.snap({ln:3, title:'getline(fileDoc, ten)',
   body:'getline lấy cả dòng đầu "Nguyen Van An" (kể cả dấu cách) và đưa lên hộp ten.',
   viz:[pipe({p:'ok', m:'hi', f:'hi'}, 'Nguyen Van An'), b20Pair(B('Nguyen Van An', null, 'hi', 'new'), b20File(N, F(0)), 'in')]});
  c.snap({ln:4, title:'fileDoc >> tuoi',
   body:'Toán tử >> đọc số 16 ở dòng hai và đưa lên hộp tuoi.',
   viz:[pipe({p:'ok', m:'hi', f:'hi'}, '16'), b20Pair(B('Nguyen Van An', 16, undefined, 'hi'), b20File(N, F(1)), 'in')]});
  c.snap({ln:5, title:'Đóng tệp',
   body:'close() đóng ống đọc. Dữ liệu đã nằm trong hai biến.',
   viz:[pipe({p:'ok', m:'dim', f:'ok'}, null, 'đã đóng'), b20Pair(B('Nguyen Van An', 16), b20File(N, ['Nguyen Van An', '16']), 'in')]});
  c.out('Doc duoc: Ten = Nguyen Van An, Tuoi = 16');
  c.snap({ln:6, title:'Xong',
   body:'Chương trình in ra những gì vừa đọc được từ tệp.',
   note:'i = Input: đọc vào chương trình.',
   viz:[pipe({p:'ok', m:'dim', f:'ok'}, null, 'đã đóng'), b20Pair(B('Nguyen Van An', 16, 'ok', 'ok'), b20File(N, ['Nguyen Van An', '16']), 'in')]});
 }},
fs:{inputs:[],
 intro:'fstream làm được cả hai chiều, tùy chế độ khi mở. Dùng sai chiều thì trình biên dịch chặn ngay. Bấm "Bước tiếp".',
 lines:function(){ return ['fstream file("songoc.txt", ios::out);', 'file << "Du lieu ban dau" << endl;', 'file.close();', 'file.open("songoc.txt", ios::in);', 'string noiDung;', 'getline(file, noiDung);', 'cout << "Da doc lai: " << noiDung;', '', '// Lỗi 1: ghi vào ifstream', 'ifstream fileDoc("thongtin.txt");', 'fileDoc << "Thu ghi vao ifstream";', '// Lỗi 2: đọc từ ofstream', 'ofstream fileGhi("thongtin.txt");', 'int x;', 'fileGhi >> x;']; },
 run:function(c){
  var N = 'songoc.txt';
  var pipe = function(dir, sub, s, item){ return b20Pipe(dir, 'file', sub, s, item, N); };
  var ND = function(v, s){ return [{name:'noiDung', type:'string', v:v, s:s}]; };
  var T1 = ['Du lieu ban dau'];
  c.snap({ln:0, title:'Mở ở chế độ ghi',
   body:'fstream nhận thêm chế độ ios::out, nên lúc này nó là ống ghi: dữ liệu đi từ chương trình ra tệp.',
   viz:[pipe('out', 'fstream · ios::out', {p:'ok', m:'hi', f:'new'}), b20Pair([], b20File(N, []), 'out')]});
  c.snap({ln:1, title:'Ghi một dòng',
   body:'Chữ "Du lieu ban dau" chảy vào tệp, giống ofstream.',
   viz:[pipe('out', 'fstream · ios::out', {p:'hi', m:'hi', f:'ok'}, 'Du lieu ban dau'), b20Pair([], b20File(N, [{t:T1[0], s:'new'}]), 'out')]});
  c.snap({ln:3, title:'Đóng rồi mở lại ở chế độ đọc',
   body:'Sau close(), cùng đối tượng file được open lại với ios::in. Ống đổi chiều: giờ dữ liệu đi từ tệp lên chương trình.',
   viz:[pipe('in', 'fstream · ios::in', {p:'dim', m:'hi', f:'ok'}), b20Pair([], b20File(N, T1), 'in')]});
  c.snap({ln:5, title:'getline(file, noiDung)',
   body:'Dòng trong tệp chảy lên hộp noiDung.',
   viz:[pipe('in', 'fstream · ios::in', {p:'ok', m:'hi', f:'hi'}, 'Du lieu ban dau'), b20Pair(ND('Du lieu ban dau', 'new'), b20File(N, [{t:T1[0], s:'hi'}]), 'in')]});
  c.out('Da doc lai: Du lieu ban dau');
  c.snap({ln:6, title:'In kết quả',
   body:'Cùng một đối tượng fstream đã ghi, rồi đọc lại, nhờ đổi chế độ khi mở.',
   viz:[pipe('in', 'fstream · ios::in', {p:'ok', m:'dim', f:'ok'}), b20Pair(ND('Du lieu ban dau', 'ok'), b20File(N, T1), 'in')]});
  c.clear();
  var e1 = "error: no match for 'operator<<' (operand types are 'std::ifstream' and 'const char [21]')";
  c.err(e1);
  c.snap({ln:10, title:'Lỗi 1: ghi vào ifstream',
   body:'ifstream chỉ có van cho dữ liệu đi vào chương trình, không có toán tử <<. Trình biên dịch chặn ngay, chương trình không được dịch.',
   viz:[b20Pipe('in', 'fileDoc', 'ifstream: không có <<', {p:'bad', m:'bad', f:'dim'}, null, 'thongtin.txt'), vErr({kind:'compile', msg:[e1], code:'fileDoc << "Thu ghi vao ifstream";', note:'Không sinh file chạy'})]});
  c.clear();
  var e2 = "error: no match for 'operator>>' (operand types are 'std::ofstream' and 'int')";
  c.err(e2);
  c.snap({ln:14, title:'Lỗi 2: đọc từ ofstream',
   body:'ofstream chỉ cho dữ liệu đi ra, không có toán tử >>. Lỗi bị chặn ngay lúc biên dịch.',
   note:'Chọn đúng lớp theo chiều: o ghi ra, i đọc vào, fstream làm được cả hai tùy chế độ.',
   viz:[b20Pipe('out', 'fileGhi', 'ofstream: không có >>', {p:'bad', m:'bad', f:'dim'}, null, 'thongtin.txt'), vErr({kind:'compile', msg:[e2], code:'fileGhi >> x;', note:'Không sinh file chạy'})]});
 }}
};
