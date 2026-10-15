// META {"module":9,"lesson":"Triển khai dự án - Cấu trúc thư mục và Mã hóa cơ bản","activity":"Xây dựng các phương thức và xử lý logic nghiệp vụ","title":"BorrowBook: kiểm tra rồi mới cập nhật","lead":"Một phương thức nghiệp vụ kiểm tra lần lượt các điều kiện, chỉ khi tất cả đạt mới cập nhật trạng thái. Chọn tình huống rồi bấm <b>Bước tiếp</b>.","tabs":[["ok","Thành công"],["da","Sách đã được mượn"],["vuot","Vượt hạn mức"]]}
var CODE=[
 'public bool BorrowBook(',
 '    int memberId, int bookId)',
 '{',
 '  var m = FindMember(memberId);',
 '  if (m == null)',
 '    return false;',
 '  var b = FindBook(bookId);',
 '  if (b == null)',
 '    return false;',
 '  if (b.IsBorrowed)',
 '    return false;',
 '  if (m.BorrowedCount >= 3)',
 '    return false;',
 '  b.IsBorrowed = true;',
 '  m.BorrowedCount++;',
 '  return true;',
 '}',
 ''];
var TITLES=['C# cơ bản','Lập trình OOP','Cơ sở dữ liệu','Giải thuật'];
function makeTab(count,borrowed,bid){
 return {inputs:[],
 intro:'Thư viện có 4 cuốn sách và thành viên An (mã 1). Ta gọi library.BorrowBook(1, '+bid+') và xem từng điều kiện được kiểm tra. Bấm "Bước tiếp".',
 lines:function(){return CODE.concat(['var ok = library.BorrowBook(1, '+bid+');','Console.WriteLine(ok);']);},
 run:function(c){
  var cnt=count,bor=borrowed.slice();
  function objs(hiM,hiB,fm,fb){
   var o=[O('Member#1',[['Name',S('An')],['BorrowedCount',cnt,fm||'']],{hi:hiM})];
   for(var i=0;i<4;i++)o.push(O('Book#'+(i+1),[['Title',S(TITLES[i])],['IsBorrowed',bor[i]?'true':'false',(fb&&i+1===bid)?fb:'']],{hi:hiB&&i+1===bid}));
   return o;}
  var V=function(){return [['memberId',1],['bookId',bid]];};
  c.snap({ln:18,title:'Gọi BorrowBook',body:'Chương trình gọi BorrowBook với memberId = 1 và bookId = '+bid+'. Bộ nhớ cho thấy trạng thái trước khi chạy.',vars:V(),objs:objs(0,0)});
  c.snap({ln:3,title:'Tìm thành viên',body:'FindMember(1) trả về Member#1 (An), khác null nên đi tiếp. An đang mượn '+cnt+' cuốn.',vars:V().concat([['m','→ Member#1',1]]),objs:objs(1,0)});
  c.snap({ln:6,title:'Tìm sách',body:'FindBook('+bid+') trả về Book#'+bid+' ("'+TITLES[bid-1]+'"), khác null nên đi tiếp.',vars:V().concat([['m','→ Member#1'],['b','→ Book#'+bid,1]]),objs:objs(0,1)});
  var vv=V().concat([['m','→ Member#1'],['b','→ Book#'+bid]]);
  var isB=bor[bid-1];
  if(isB){
   c.snap({ln:9,title:'Sách còn không?',body:'b.IsBorrowed là true: sách đã có người mượn, điều kiện đúng nên đi vào return false.',vars:vv,objs:objs(0,1,'','bad')});
   c.snap({ln:10,title:'Trả về false',body:'Phương thức dừng ngay, chưa cập nhật gì cả. Trạng thái bộ nhớ giữ nguyên.',vars:vv,objs:objs(0,0)});
   c.out('False');
   c.snap({ln:19,title:'Xong',body:'ok = false, chương trình in False.',note:'Phương thức kiểm tra điều kiện trước. Điều kiện nào không đạt thì trả về false ngay và không thay đổi dữ liệu.',vars:vv.concat([['ok','false',1]]),objs:objs(0,0)});
   return;}
  c.snap({ln:9,title:'Sách còn không?',body:'b.IsBorrowed là false: sách đang rảnh, điều kiện sai nên bỏ qua return false.',vars:vv,objs:objs(0,1,'','ok')});
  if(cnt>=3){
   c.snap({ln:11,title:'Đủ hạn mức chưa?',body:'m.BorrowedCount là '+cnt+', không nhỏ hơn 3. Điều kiện đúng nên đi vào return false.',vars:vv,objs:objs(1,0,'bad','')});
   c.snap({ln:12,title:'Trả về false',body:'Phương thức dừng, sách vẫn chưa được mượn dù đang rảnh.',vars:vv,objs:objs(0,0)});
   c.out('False');
   c.snap({ln:19,title:'Xong',body:'ok = false, chương trình in False.',note:'Mỗi quy tắc nghiệp vụ là một lần kiểm tra. Quy tắc hạn mức 3 cuốn chặn việc mượn dù sách đang rảnh.',vars:vv.concat([['ok','false',1]]),objs:objs(0,0)});
   return;}
  c.snap({ln:11,title:'Đủ hạn mức chưa?',body:'m.BorrowedCount là '+cnt+', nhỏ hơn 3 nên còn được mượn. Mọi kiểm tra đã đạt.',vars:vv,objs:objs(1,0,'ok','')});
  bor[bid-1]=true;
  c.snap({ln:13,title:'Cập nhật sách',body:'Đánh dấu Book#'+bid+' đã được mượn: IsBorrowed = true.',vars:vv,objs:objs(0,1,'','hi')});
  cnt++;
  c.snap({ln:14,title:'Cập nhật thành viên',body:'Số sách của An tăng lên '+cnt+'.',vars:vv,objs:objs(1,0,'hi','')});
  c.snap({ln:15,title:'Trả về true',body:'Mọi điều kiện đạt và dữ liệu đã cập nhật, phương thức trả về true.',vars:vv,objs:objs(0,0)});
  c.out('True');
  c.snap({ln:19,title:'Xong',body:'ok = true, chương trình in True.',note:'Phương thức nghiệp vụ gồm hai phần: kiểm tra tất cả điều kiện trước, rồi mới cập nhật trạng thái.',vars:vv.concat([['ok','true',1]]),objs:objs(0,0)});
 }};}
var EX={ok:makeTab(1,[1,0,0,0],2),da:makeTab(1,[1,0,0,0],1),vuot:makeTab(3,[1,1,0,1],3)};
