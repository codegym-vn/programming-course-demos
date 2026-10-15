// META {"module":4,"lesson":"Quản lý Đường dẫn và Thư mục","activity":"Lớp Directory: Quản lý thư mục","title":"Lớp Directory","lead":"Chọn một thao tác rồi bấm <b>Bước tiếp</b> để xem cây thư mục thay đổi ra sao.","tabs":[["create","CreateDirectory"],["getfiles","GetFiles"],["delete","Delete"],["exists","Exists"]],"codeTitle":"Mã nguồn C#"}
// Cây thư mục: [tên, độ sâu, loại, trạng thái, ghi chú]
function dirTree(rows, over, subs){
  over = over || {}; subs = subs || {};
  return vTree(rows.map(function(r){ return {t:r[0], d:r[1], kind:r[2], s:over[r[0]] || r[3], sub:subs[r[0]] || r[4]}; }));
}
var DIR_FULL = [['Thư mục chạy',0,'dir'],['Data',1,'dir'],['a.txt',2,'file'],['b.csv',2,'file'],['2024',2,'dir'],['c.txt',3,'file']];
var EX = {
create:{inputs:[],chips:[],
 intro:'Thư mục chạy đang trống. Xem CreateDirectory tạo cả đường dẫn nhiều cấp. Bấm "Bước tiếp".',
 lines:function(){return ['Directory.CreateDirectory(','  @"Data\\2024\\Thang10");','','Directory.CreateDirectory(','  @"Data\\2024\\Thang10");'];},
 run:function(c){
  var base = [['Thư mục chạy',0,'dir']];
  var made = base.concat([['Data',1,'dir','new'],['2024',2,'dir','new'],['Thang10',3,'dir','new']]);
  var kept = base.concat([['Data',1,'dir'],['2024',2,'dir'],['Thang10',3,'dir']]);
  c.snap({ln:0,title:'Trước khi chạy',body:'Thư mục chạy chưa có thư mục Data nào.',viz:dirTree(base)});
  c.snap({ln:0,title:'CreateDirectory tạo đủ các cấp',body:'Data, 2024 và Thang10 đều chưa có. Một lệnh duy nhất tạo cả ba cấp còn thiếu.',viz:dirTree(made)});
  c.snap({ln:3,title:'Gọi lại khi đã có',body:'Đường dẫn đã tồn tại nên không có gì thay đổi và cũng không ném lỗi.',viz:[dirTree(kept,{Thang10:'hi'}),vCard({kind:'ok',title:'Không có lỗi',sub:'Thư mục đã có thì lệnh bỏ qua'})]});
  c.snap({ln:3,title:'Xong',body:'Cây thư mục sau hai lần gọi giống hệt sau lần đầu.',note:'CreateDirectory tạo mọi cấp còn thiếu, và gọi lại khi thư mục đã có thì không lỗi.',viz:dirTree(kept)});
 }},
getfiles:{inputs:[],chips:[],
 intro:'Liệt kê các tệp .txt trong Data, lần đầu chỉ cấp Data, lần sau cả thư mục con. Bấm "Bước tiếp".',
 lines:function(){return ['var a = Directory.GetFiles(','  "Data", "*.txt");','','var b = Directory.GetFiles(','  "Data", "*.txt",','  SearchOption.AllDirectories);'];},
 run:function(c){
  var files = [{n:'a.txt',p:'Data\\a.txt',d:2},{n:'b.csv',p:'Data\\b.csv',d:2},{n:'c.txt',p:'Data\\2024\\c.txt',d:3}];
  function isTxt(f){ return f.n.slice(-4) === '.txt'; }
  var A = files.filter(function(f){ return isTxt(f) && f.d === 2; });
  var B = files.filter(isTxt);
  function mark(list){ var o = {}; list.forEach(function(f){ o[f.n] = 'hi'; }); return o; }
  function none(list){ var o = {}; files.forEach(function(f){ if (list.indexOf(f) < 0) o[f.n] = 'dim'; }); return o; }
  function both(list){ var o = mark(list); var z = none(list); for (var k in z) o[k] = z[k]; return o; }
  var pa = A.map(function(f){ return f.p; }), pb = B.map(function(f){ return f.p; });
  c.snap({ln:0,title:'Cây thư mục',body:'Trong Data có a.txt, b.csv và thư mục con 2024 chứa c.txt.',viz:dirTree(DIR_FULL)});
  c.snap({ln:0,title:'GetFiles("Data", "*.txt")',body:'Chỉ xét cấp Data và chỉ lấy tệp khớp "*.txt". Có ' + A.length + ' tệp.',viz:dirTree(DIR_FULL,both(A)),arrs:[AR('a',pa,[0])]});
  c.snap({ln:3,title:'Thêm AllDirectories',body:'Lần này lệnh đi cả vào thư mục con 2024 nên tìm thấy ' + B.length + ' tệp .txt.',viz:dirTree(DIR_FULL,both(B)),arrs:[AR('a',pa),AR('b',pb,[0,1])]});
  c.snap({ln:5,title:'Xong',body:'b.csv không khớp "*.txt" nên lần nào cũng bị bỏ qua.',note:'GetFiles chỉ xét một cấp. Muốn tìm cả thư mục con, thêm SearchOption.AllDirectories.',viz:dirTree(DIR_FULL,both(B)),arrs:[AR('a',pa),AR('b',pb)]});
 }},
'delete':{inputs:[],chips:[],
 intro:'Xóa thư mục Data khi bên trong còn nội dung. Bấm "Bước tiếp".',
 lines:function(){return ['try','{','  Directory.Delete("Data");','}','catch (IOException)','{','  Console.WriteLine(','    "Data còn nội dung");','}','','Directory.Delete("Data", true);'];},
 run:function(c){
  c.snap({ln:2,title:'Cây trước khi xóa',body:'Data không rỗng: bên trong còn tệp và thư mục con.',viz:dirTree(DIR_FULL)});
  c.snap({ln:2,title:'Delete("Data") bị lỗi',body:'Mặc định Delete chỉ xóa thư mục rỗng. Data còn nội dung nên ném IOException.',viz:[dirTree(DIR_FULL,{Data:'bad'},{Data:'!'}),vCard({kind:'err',title:'IOException',sub:'Thư mục còn nội dung',tip:'Cây vẫn nguyên vẹn'})]});
  c.out('Data còn nội dung');
  c.snap({ln:6,title:'catch báo lỗi',body:'Chương trình bắt lỗi và in thông báo. Cây thư mục không thay đổi.',viz:dirTree(DIR_FULL,{Data:'hi'})});
  c.snap({ln:10,title:'Delete("Data", true)',body:'Tham số true (recursive) xóa luôn mọi thứ bên trong, rồi mới xóa Data.',viz:dirTree(DIR_FULL,{Data:'del','a.txt':'del','b.csv':'del','2024':'del','c.txt':'del'})});
  c.snap({ln:10,title:'Xong',body:'Cả cây Data đã biến mất.',note:'Xóa thư mục không rỗng cần recursive: true. Nhớ rằng mọi thứ bên trong sẽ mất theo.',viz:dirTree([['Thư mục chạy',0,'dir']])});
 }},
exists:{inputs:[],chips:[],
 intro:'Kiểm tra Data có tồn tại trước và sau khi xóa. Bấm "Bước tiếp".',
 lines:function(){return ['Console.WriteLine(','  Directory.Exists("Data"));','','Directory.Delete("Data", true);','','Console.WriteLine(','  Directory.Exists("Data"));'];},
 run:function(c){
  c.snap({ln:0,title:'Kiểm tra lần đầu',body:'Data đang nằm trong cây nên Exists trả về true.',viz:dirTree(DIR_FULL,{Data:'hi'})});
  c.out('True');
  c.snap({ln:0,title:'Kết quả true',body:'Chương trình in True.',viz:dirTree(DIR_FULL,{Data:'ok'},{Data:'true'})});
  c.snap({ln:3,title:'Xóa cả cây Data',body:'Delete với recursive true xóa Data cùng mọi thứ bên trong.',viz:dirTree(DIR_FULL,{Data:'del','a.txt':'del','b.csv':'del','2024':'del','c.txt':'del'})});
  c.out('False');
  c.snap({ln:5,title:'Kiểm tra lần hai',body:'Data không còn nữa nên Exists trả về false, và không ném lỗi.',viz:dirTree([['Thư mục chạy',0,'dir']])});
  c.snap({ln:5,title:'Xong',body:'Exists chỉ trả về true hoặc false, không bao giờ ném lỗi khi thư mục vắng mặt.',note:'Directory.Exists cho biết thư mục có tồn tại hay không mà không gây lỗi.',viz:dirTree([['Thư mục chạy',0,'dir']])});
 }}
};
