// META {"module":4,"lesson":"Bài 4.1. Vì sao cần lưu file: RAM và ổ cứng","activity":"Tại Sao Cần Lưu File? (Bộ Nhớ RAM vs Ổ Cứng)","title":"Biến mất khi tắt, file thì ở lại","lead":"So sánh dữ liệu trong biến (RAM) với dữ liệu ghi ra file (ổ đĩa). Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["bien","Chỉ lưu vào biến"],["file","Ghi file rồi đọc lại"]],"codeTitle":"Mã nguồn C++","path":"xu-ly-file-file-io/vi-sao-can-luu-file-ram-va-o-cung/tai-sao-can-luu-file-bo-nho-ram-vs-o-cung/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'RAM và ổ đĩa';

/* Khung RAM | Ổ đĩa. ram: danh sách hộp biến; file: null hoặc {name, text, s}. */
function b19Pair(ram, file, o){
  o = o || {};
  var left = vBoxes(ram, {empty: o.empty || 'Trống'});
  var nodes = [{t:'Thư mục làm việc', d:0, kind:'dir'}];
  var right;
  if (file) {
    nodes.push({t:file.name, d:1, kind:'file', s:file.s});
    right = vTree(nodes) + vText([file.text === '' ? {t:'(tệp rỗng)', s:'dim'} : file.text], {title:'Nội dung ' + file.name, noNo:true});
  } else {
    right = vTree(nodes) + '<p class="cm" style="margin:6px 0 0">Chưa có tệp nào.</p>';
  }
  return vPair(left, right, {ta:o.ta || 'RAM (nhanh, nhưng tạm thời)', tb:'Ổ đĩa (lâu dài)', mid:'⇄'});
}
function b19Pipe(kind, s1, s2, s3, item, sub){
  /* kind 'w': diem → fileGhi → diem.txt ; kind 'r': diem.txt → fileDoc → diemDaLuu */
  var n = kind === 'w'
    ? [{t:'diem', sub:'RAM', s:s1}, {t:'fileGhi', sub:sub || 'ống ghi', s:s2, item:item}, {t:'diem.txt', sub:'ổ đĩa', s:s3}]
    : [{t:'diem.txt', sub:'ổ đĩa', s:s1}, {t:'fileDoc', sub:sub || 'ống đọc', s:s2, item:item}, {t:'diemDaLuu', sub:'RAM', s:s3}];
  return vFlow(n, {title:'Ống dẫn dữ liệu'});
}

var EX = {
bien:{inputs:[],
 intro:'Chương trình chỉ cất điểm vào biến. Hãy xem điều gì xảy ra sau khi tắt rồi chạy lại. Bấm "Bước tiếp".',
 lines:function(){ return ['int main() {', '  int diem;', '  cout << "Nhap diem: ";', '  cin >> diem;', '  cout << "Da luu diem " << diem', '       << " vao BIEN (trong RAM)."', '       << endl;', '  return 0;', '}']; },
 run:function(c){
  var D = function(v, s){ return [{name:'diem', type:'int', v:v, s:s}]; };
  var run = function(n, on){ return vLamps([{t:'Chương trình', s:on ? 'ok' : 'off', sub:on ? 'Đang chạy' : 'Đã tắt'}], {title:'Lần chạy ' + n}); };
  c.snap({ln:1, title:'Lần chạy 1: int diem;',
   body:'Chương trình bắt đầu và xin RAM một hộp tên diem. Chưa gán nên hộp chưa có số.',
   viz:[b19Pair(D(null, 'new'), null), run(1, true)]});
  c.write('Nhap diem: '); c.input('9');
  c.snap({ln:3, title:'Nhập diem',
   body:'Máy in lời nhắc rồi chờ bạn gõ. Bạn gõ 9, số 9 được cất vào hộp diem.',
   viz:[b19Pair(D(9, 'hi'), null), run(1, true)]});
  c.out('Da luu diem 9 vao BIEN (trong RAM).');
  c.snap({ln:4, title:'In thông báo',
   body:'Chương trình báo đã lưu điểm 9 vào biến. Biến nằm trong RAM.',
   viz:[b19Pair(D(9), null), run(1, true)]});
  c.snap({ln:7, title:'Chương trình tắt',
   body:'Hết main(), chương trình kết thúc. RAM của nó được dọn sạch như lau bảng: hộp diem và số 9 biến mất.',
   viz:[b19Pair([], null, {empty:'Trống: RAM đã bị dọn sạch', ta:'RAM (chương trình đã tắt)'}), run(1, false)]});
  c.clear();
  c.snap({ln:1, title:'Lần chạy 2: int diem;',
   body:'Chạy lại: máy cấp một hộp diem hoàn toàn mới, chưa có số. Không còn dấu vết nào của số 9 lần trước.',
   viz:[b19Pair(D(null, 'new'), null), run(2, true)]});
  c.write('Nhap diem: '); c.input('5');
  c.snap({ln:3, title:'Nhập diem',
   body:'Lần này bạn gõ 5. Chương trình không hề biết lần trước bạn đã nhập 9.',
   viz:[b19Pair(D(5, 'hi'), null), run(2, true)]});
  c.out('Da luu diem 5 vao BIEN (trong RAM).');
  c.snap({ln:4, title:'Xong',
   body:'Mỗi lần chạy, biến lại bắt đầu từ trống. Muốn giữ dữ liệu lâu hơn, phải ghi ra file trên ổ đĩa.',
   note:'RAM nhanh nhưng tạm thời: biến mất cùng chương trình.',
   viz:[b19Pair(D(5, 'ok'), null), run(2, true)]});
 }},
file:{inputs:[],
 intro:'Chương trình A ghi điểm ra file rồi tắt. Sau đó chương trình B (một chương trình khác) đọc lại. Bấm "Bước tiếp".',
 lines:function(){ return ['// Chương trình A (ghi)', 'int diem;', 'cin >> diem;', 'ofstream fileGhi("diem.txt");', 'fileGhi << diem;', 'fileGhi.close();', '', '// Chương trình B (đọc)', 'ifstream fileDoc("diem.txt");', 'int diemDaLuu;', 'fileDoc >> diemDaLuu;', 'fileDoc.close();', 'cout << "Doc duoc diem tu file: "', '     << diemDaLuu << endl;']; },
 run:function(c){
  var TA = function(on){ return 'RAM · chương trình A' + (on ? ' (đang chạy)' : ' (đã tắt)'); };
  var TB = 'RAM · chương trình B (đang chạy)';
  var DA = function(v, s){ return [{name:'diem', type:'int', v:v, s:s}]; };
  var DB = function(v, s){ return [{name:'diemDaLuu', type:'int', v:v, s:s}]; };
  c.input('9');
  c.snap({ln:2, title:'A: int diem; cin >> diem;',
   body:'Chương trình A có hộp diem trong RAM, bạn gõ 9 nên diem = 9. Ổ đĩa chưa có tệp nào.',
   viz:[b19Pair(DA(9, 'new'), null, {ta:TA(true)}), b19Pipe('w', 'dim', 'dim', 'dim', null, 'chưa mở')]});
  c.snap({ln:3, title:'A: ofstream fileGhi("diem.txt");',
   body:'Mở một ống nối từ chương trình tới tệp diem.txt. Tệp mới xuất hiện trên ổ đĩa, còn rỗng.',
   viz:[b19Pair(DA(9), {name:'diem.txt', text:'', s:'new'}, {ta:TA(true)}), b19Pipe('w', 'ok', 'hi', 'ok', null, 'ống ghi đã mở')]});
  c.snap({ln:4, title:'A: fileGhi << diem;',
   body:'Số 9 chảy từ hộp diem vào ống ghi. Chỉ chắc chắn nằm trên ổ đĩa khi close() (bài sau giải thích vì sao).',
   viz:[b19Pair(DA(9, 'hi'), {name:'diem.txt', text:'', s:'new'}, {ta:TA(true)}), b19Pipe('w', 'hi', 'hi', 'ok', '9')]});
  c.snap({ln:5, title:'A: fileGhi.close();',
   body:'Đóng tệp: số 9 nằm hẳn trên ổ đĩa. Trong tệp chỉ có đúng ký tự 9, không có dấu xuống dòng.',
   viz:[b19Pair(DA(9), {name:'diem.txt', text:'9', s:'ok'}, {ta:TA(true)}), b19Pipe('w', 'ok', 'dim', 'ok', null, 'đã đóng')]});
  c.snap({ln:5, title:'Chương trình A tắt',
   body:'RAM của A được dọn sạch, hộp diem biến mất. Nhưng tệp diem.txt vẫn nằm trên ổ đĩa, vẫn là 9.',
   viz:[b19Pair([], {name:'diem.txt', text:'9', s:'ok'}, {ta:TA(false), empty:'Trống: RAM đã bị dọn sạch'}), b19Pipe('w', 'dim', 'dim', 'ok', null, 'đã đóng')]});
  c.snap({ln:8, title:'B: ifstream fileDoc("diem.txt");',
   body:'Chương trình B là một chương trình khác, RAM của nó còn trống. B mở ống đọc nối tới diem.txt.',
   viz:[b19Pair([], {name:'diem.txt', text:'9', s:'hi'}, {ta:TB, empty:'Trống: chưa có biến nào'}), b19Pipe('r', 'ok', 'hi', 'dim', null, 'ống đọc đã mở')]});
  c.snap({ln:10, title:'B: fileDoc >> diemDaLuu;',
   body:'Số 9 chảy ngược từ tệp lên hộp diemDaLuu trong RAM của B.',
   viz:[b19Pair(DB(9, 'new'), {name:'diem.txt', text:'9', s:'hi'}, {ta:TB}), b19Pipe('r', 'hi', 'hi', 'ok', '9')]});
  c.out('Doc duoc diem tu file: 9');
  c.snap({ln:12, title:'Xong',
   body:'B đóng tệp rồi in ra 9. Dữ liệu sống sót qua lúc A tắt và được một chương trình khác đọc lại.',
   note:'Muốn giữ dữ liệu sau khi chương trình tắt, hãy ghi ra file trên ổ đĩa.',
   viz:[b19Pair(DB(9, 'ok'), {name:'diem.txt', text:'9', s:'ok'}, {ta:TB}), b19Pipe('r', 'ok', 'dim', 'ok', null, 'đã đóng')]});
 }}
};
