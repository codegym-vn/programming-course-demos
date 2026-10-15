// META {"module":2,"lesson":"Cấu trúc try-catch cơ bản","activity":"Đối tượng Exception và các thuộc tính","title":"Đối tượng Exception và thuộc tính","lead":"Biến ex trong catch là một đối tượng có nhiều thông tin. Bấm <b>Bước tiếp</b> để xem từng thuộc tính.","tabs":[["ex","Biến ex"]],"codeTitle":"Mã nguồn C#"}
var oeTrace = ['at Program.Chia(Int32 a, Int32 b) in Program.cs:line 12','at Program.Main() in Program.cs:line 5'];
var oeMsg = 'Attempted to divide by zero.';
var oeName = 'DivideByZeroException';
function oeStack(ball, hi){ return vStack([{t:'Main()',sub:'Program.cs:line 5',s:hi === 'main' ? 'hi' : ''},{t:'Chia(10, 0)',sub:'Program.cs:line 12',s:ball ? 'bad' : (hi === 'chia' ? 'hi' : ''),ball:ball}], {ballText:oeName}); }
function oeWatch(rows){ return vCard({kind:'info',title:'Cửa sổ Watch: ex',rows:rows}); }
var oeLines = ['static int Chia(int a, int b)','{','  return a / b;','}','static void Main()','{','  try','  {','    Chia(10, 0);','  }','  catch (DivideByZeroException ex)','  {','    // dùng ex ở đây','  }','}'];
var EX = {ex:{inputs:[],chips:[],
 intro:'Main gọi Chia(10, 0) và bắt lỗi bằng catch. Bấm "Bước tiếp".',
 lines:function(){ return oeLines; },
 run:function(c){
  var a = 10, b = 0, rows = [];
  c.snap({ln:8,title:'Main gọi Chia(10, 0)',body:'Main đang trong try và gọi Chia với a = 10, b = 0.',viz:oeStack(false,'chia'),vars:[['a',a],['b',b]]});
  c.snap({ln:2,title:'Chia ném exception',body:'Trong Chia, 10 / 0 ném ' + oeName + ' (quả bóng đỏ). Lỗi đi ngược lên nơi gọi.',viz:oeStack(true),vars:[['a',a],['b',b,1]]});
  c.snap({ln:10,title:'catch bắt được',body:'catch (' + oeName + ' ex) bắt được. ex là một đối tượng chứa thông tin về lỗi.',viz:[vCard({kind:'err',title:'ex',sub:oeName}), oeWatch([['ex','{' + oeName + '}']])],vars:[['ex','→ ' + oeName,1]]});
  rows.push(['ex.GetType().Name', '"' + oeName + '"']);
  c.snap({ln:12,title:'ex.GetType().Name',body:'Cho biết tên loại exception: "' + oeName + '".',viz:oeWatch(rows),vars:[['ex','→ ' + oeName]]});
  rows.push(['ex.Message', '"' + oeMsg + '"']);
  c.snap({ln:12,title:'ex.Message',body:'Câu mô tả dễ đọc: "' + oeMsg + '". Dùng để báo cho người dùng.',viz:oeWatch(rows),vars:[['ex','→ ' + oeName]]});
  rows.push(['ex.StackTrace', '(2 dòng, xem bên dưới)']);
  c.snap({ln:12,title:'ex.StackTrace',body:'Cho biết lỗi đi qua những hàm nào: ' + oeTrace.length + ' dòng, bắt đầu từ Chia rồi tới Main.',viz:[oeWatch(rows), vText(oeTrace,{title:'StackTrace',noNo:true}), oeStack(true)],vars:[['ex','→ ' + oeName]]});
  c.snap({ln:12,title:'Xong',body:'ex.InnerException ở đây là null vì lỗi không bọc lỗi nào khác.',note:'Exception là đối tượng có thuộc tính. Message dùng để báo người dùng, StackTrace dùng để tìm chỗ lỗi.',viz:oeWatch(rows.concat([['ex.InnerException','null']])),vars:[['ex','→ ' + oeName]]});
 }}};
