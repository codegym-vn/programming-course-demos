// META {"module":4,"lesson":"Quản lý Đường dẫn và Thư mục","activity":"Các phương thức hữu ích của lớp File","title":"Các phương thức của lớp File","lead":"Chọn một phương thức rồi bấm <b>Bước tiếp</b> để xem tệp thay đổi ra sao.","tabs":[["exists","Exists"],["copy","Copy"],["move","Move"],["delete","Delete"]],"codeTitle":"Mã nguồn C#"}
function fTree(rows, over, subs){
  over = over || {}; subs = subs || {};
  return vTree(rows.map(function(r){ return {t:r[0], d:r[1], kind:r[2], s:over[r[0]] || r[3], sub:subs[r[0]] || r[4]}; }));
}
function fArrow(a, b, op, sa, sb){
  return vFlow([{t:a,s:sa||'hi'},{t:op,s:'dim'},{t:b,s:sb||'hi'}]);
}
var F_BASE = [['Thư mục chạy',0,'dir'],['a.txt',1,'file'],['b.txt',1,'file'],['Backup',1,'dir']];
var EX = {
exists:{inputs:[],chips:[],
 intro:'Hỏi xem tệp có tồn tại không. Bấm "Bước tiếp".',
 lines:function(){return ['Console.WriteLine(','  File.Exists("a.txt"));','Console.WriteLine(','  File.Exists("z.txt"));'];},
 run:function(c){
  c.snap({ln:0,title:'Cây thư mục',body:'Có a.txt, b.txt và thư mục Backup. Không có z.txt.',viz:fTree(F_BASE)});
  c.snap({ln:0,title:'Exists("a.txt")',body:'Lệnh tìm a.txt trong thư mục chạy và thấy nó.',viz:fTree(F_BASE,{'a.txt':'hi'})});
  c.out('True');
  c.snap({ln:0,title:'Kết quả true',body:'In True.',viz:fTree(F_BASE,{'a.txt':'ok'})});
  c.snap({ln:2,title:'Exists("z.txt")',body:'Không có tệp tên z.txt trong thư mục chạy.',viz:fTree(F_BASE.concat([['z.txt',1,'file','dim','không có']]),{'z.txt':'no'})});
  c.out('False');
  c.snap({ln:2,title:'Xong',body:'Exists trả về false, không ném lỗi.',note:'File.Exists chỉ trả về true hoặc false. Nó không bao giờ ném lỗi và không thay đổi tệp nào.',viz:fTree(F_BASE)});
 }},
copy:{inputs:[],chips:[],
 intro:'Chép a.txt sang b.txt, khi b.txt đã có sẵn. Bấm "Bước tiếp".',
 lines:function(){return ['try','{','  File.Copy("a.txt", "b.txt");','}','catch (IOException)','{','  Console.WriteLine(','    "b.txt đã có");','}','','File.Copy("a.txt", "b.txt",','  overwrite: true);'];},
 run:function(c){
  c.snap({ln:2,title:'Chép a.txt sang b.txt',body:'b.txt đã tồn tại nên mặc định Copy không dám ghi đè.',viz:[fTree(F_BASE,{'a.txt':'hi','b.txt':'hi'}),fArrow('a.txt','b.txt','Copy')]});
  c.snap({ln:2,title:'Copy ném IOException',body:'Tệp đích đã có và không cho phép ghi đè, nên Copy báo lỗi.',viz:[fTree(F_BASE,{'b.txt':'bad'},{'b.txt':'!'}),vCard({kind:'err',title:'IOException',sub:'Tệp đích b.txt đã tồn tại'})]});
  c.out('b.txt đã có');
  c.snap({ln:6,title:'catch báo lỗi',body:'Chương trình bắt lỗi và in thông báo. Hai tệp vẫn như cũ.',viz:fTree(F_BASE)});
  c.snap({ln:10,title:'Copy với overwrite: true',body:'Cho phép ghi đè, nên nội dung a.txt được chép đè lên b.txt.',viz:[fTree(F_BASE,{'a.txt':'hi','b.txt':'new'},{'b.txt':'đã bị ghi đè'}),fArrow('a.txt','b.txt','Copy','hi','new')]});
  c.snap({ln:10,title:'Xong',body:'Cây vẫn có a.txt và b.txt, nhưng b.txt giờ mang nội dung của a.txt.',note:'Copy không ghi đè theo mặc định. Muốn ghi đè phải truyền overwrite: true.',viz:fTree(F_BASE,{'b.txt':'new'})});
 }},
move:{inputs:[],chips:[],
 intro:'Chuyển a.txt vào Backup, rồi đổi tên nó. Bấm "Bước tiếp".',
 lines:function(){return ['File.Move("a.txt",','  @"Backup\\a.txt");','','File.Move(@"Backup\\a.txt",','  @"Backup\\c.txt");'];},
 run:function(c){
  var moved = [['Thư mục chạy',0,'dir'],['b.txt',1,'file'],['Backup',1,'dir'],['a.txt',2,'file','new']];
  var renamed = [['Thư mục chạy',0,'dir'],['b.txt',1,'file'],['Backup',1,'dir'],['c.txt',2,'file','new']];
  c.snap({ln:0,title:'Trước khi chuyển',body:'a.txt đang nằm ở thư mục chạy, Backup còn trống.',viz:fTree(F_BASE,{'a.txt':'hi','Backup':'hi'})});
  c.snap({ln:0,title:'Move vào Backup',body:'Tệp được chuyển sang chỗ mới. Khác với Copy, tệp cũ không còn ở chỗ cũ.',viz:[fTree([['Thư mục chạy',0,'dir'],['a.txt',1,'file','del'],['b.txt',1,'file'],['Backup',1,'dir'],['a.txt',2,'file','new']]),fArrow('a.txt','Backup\\a.txt','Move')]});
  c.snap({ln:3,title:'Cây sau khi chuyển',body:'a.txt giờ nằm trong Backup.',viz:fTree(moved)});
  c.snap({ln:3,title:'Move để đổi tên',body:'Chuyển Backup\\a.txt sang Backup\\c.txt. Cùng thư mục nhưng tên mới, nghĩa là đổi tên.',viz:[fTree([['Thư mục chạy',0,'dir'],['b.txt',1,'file'],['Backup',1,'dir'],['a.txt',2,'file','del'],['c.txt',2,'file','new']]),fArrow('Backup\\a.txt','Backup\\c.txt','Move')]});
  c.snap({ln:3,title:'Xong',body:'Trong Backup chỉ còn c.txt.',note:'Move vừa chuyển tệp sang chỗ khác, vừa dùng để đổi tên tệp.',viz:fTree(renamed)});
 }},
'delete':{inputs:[],chips:[],
 intro:'Xóa một tệp không tồn tại, trong hai trường hợp khác nhau. Bấm "Bước tiếp".',
 lines:function(){return ['File.Delete("z.txt");','','try','{','  File.Delete(@"KhongCo\\z.txt");','}','catch (DirectoryNotFoundException)','{','  Console.WriteLine(','    "Thiếu thư mục");','}'];},
 run:function(c){
  c.snap({ln:0,title:'Cây thư mục',body:'Không có z.txt, cũng không có thư mục KhongCo.',viz:fTree(F_BASE)});
  c.snap({ln:0,title:'Delete("z.txt")',body:'Thư mục chạy có thật, nhưng z.txt không có. Delete âm thầm bỏ qua, không ném lỗi.',viz:[fTree(F_BASE.concat([['z.txt',1,'file','dim','không có']]),{'z.txt':'no'}),vCard({kind:'ok',title:'Không có lỗi',sub:'Tệp vắng mặt thì Delete bỏ qua'})]});
  c.snap({ln:4,title:'Delete(@"KhongCo\\z.txt")',body:'Lần này cả thư mục KhongCo cũng không có, nên Delete không biết xóa ở đâu.',viz:[fTree(F_BASE.concat([['KhongCo',1,'dir','dim','không có']]),{KhongCo:'bad'},{KhongCo:'!'}),vCard({kind:'err',title:'DirectoryNotFoundException',sub:'Không tìm thấy thư mục KhongCo'})]});
  c.out('Thiếu thư mục');
  c.snap({ln:8,title:'catch báo lỗi',body:'Chương trình bắt lỗi và in thông báo.',viz:fTree(F_BASE)});
  c.snap({ln:8,title:'Xong',body:'Cây thư mục không thay đổi sau cả hai lần xóa.',note:'Delete bỏ qua tệp vắng mặt, nhưng ném DirectoryNotFoundException nếu thư mục chứa nó không có.',viz:fTree(F_BASE)});
 }}
};
