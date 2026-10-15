// META {"module":9,"lesson":"Phân tích yêu cầu và Xác định phạm vi dự án","activity":"Xác định các đối tượng chính và thuộc tính ban đầu","title":"Danh từ và động từ trong đề bài thư viện","lead":"Đọc từng câu yêu cầu của dự án Quản lý Thư viện, gạch chân danh từ và động từ. Bấm <b>Bước tiếp</b> để đi qua từng câu.","tabs":[["x","Đề bài Quản lý Thư viện"]],"codeTitle":"Yêu cầu dự án"}
var EX = {x:{
 inputs:[],
 intro:'Dưới đây là yêu cầu của dự án Quản lý Thư viện. Ta đọc từng câu, tìm danh từ (ứng viên lớp, thuộc tính) và động từ (ứng viên phương thức). Bấm "Bước tiếp".',
 lines:function(){return [
  'Thư viện quản lý nhiều sách.',
  'Mỗi sách có tên, tác giả, mã.',
  'Thành viên có họ tên và mã.',
  'Thành viên mượn sách.',
  'Mỗi người mượn tối đa 3 cuốn.',
  'Thành viên trả sách đã mượn.',
  'Thư viện tìm sách theo mã.'];},
 run:function(c){
  var N=[],V=[];
  function A(){return [AR('Danh từ',N.length?N.slice():[],[],[],[]),AR('Động từ',V.length?V.slice():[],[],[],[])];}
  function add(list,items){var first=list.length;items.forEach(function(x){list.push(x);});return first;}
  function arrs(nNew,vNew){
   var hn=[],hv=[],i;
   for(i=N.length-nNew;i<N.length;i++)hn.push(i);
   for(i=V.length-vNew;i<V.length;i++)hv.push(i);
   return [AR('Danh từ',N.slice(),hn,[],[]),AR('Động từ',V.slice(),hv,[],[])];}
  c.snap({ln:0,title:'Đề bài dự án',body:'Hai danh sách bên dưới đang trống. Mỗi bước ta đọc một câu và ghi lại danh từ, động từ tìm được.',arrs:arrs(0,0)});
  add(N,['Thư viện','sách']);add(V,['quản lý']);
  c.snap({ln:0,title:'Câu 1',body:'Danh từ: Thư viện, sách. Động từ: quản lý.',arrs:arrs(2,1)});
  add(N,['tên','tác giả','mã sách']);
  c.snap({ln:1,title:'Câu 2',body:'Tên, tác giả, mã là những thông tin mô tả một cuốn sách, nên đây là danh từ có vẻ là thuộc tính.',arrs:arrs(3,0)});
  add(N,['thành viên','họ tên','mã thành viên']);
  c.snap({ln:2,title:'Câu 3',body:'Thành viên là một đối tượng mới. Họ tên và mã là thông tin mô tả thành viên.',arrs:arrs(3,0)});
  add(V,['mượn']);
  c.snap({ln:3,title:'Câu 4',body:'Mượn là hành động, ứng viên cho một phương thức.',arrs:arrs(0,1)});
  c.snap({ln:4,title:'Câu 5',body:'Câu này nêu một quy tắc nghiệp vụ: hạn mức tối đa 3 cuốn. Ta ghi nhớ để kiểm tra trong phương thức mượn sau này.',arrs:arrs(0,0)});
  add(V,['trả']);
  c.snap({ln:5,title:'Câu 6',body:'Trả là động từ thứ hai của thành viên.',arrs:arrs(0,1)});
  add(V,['tìm']);
  c.snap({ln:6,title:'Câu 7',body:'Tìm là hành động của thư viện.',arrs:arrs(0,1)});
  c.snap({ln:6,title:'Chọn lớp và thuộc tính',body:'Danh từ đứng riêng, có thông tin và hành động đi kèm trở thành lớp: Library, Book, Member. Các danh từ còn lại là thuộc tính.',
   arrs:[AR('Lớp',['Library','Book','Member'],[0,1,2],[],[]),
         AR('Thuộc tính Book',['Title','Author','Id'],[0,1,2],[],[]),
         AR('Thuộc tính Member',['FullName','Id'],[0,1],[],[])]});
  c.snap({ln:6,title:'Xong',body:'Động từ trở thành phương thức: mượn, trả, tìm.',
   note:'Danh từ cho ta lớp và thuộc tính ban đầu, động từ cho ta phương thức. Đây mới là bản nháp, ta sẽ chỉnh dần khi thiết kế.',
   arrs:[AR('Lớp',['Library','Book','Member'],[],[],[]),
         AR('Phương thức',['BorrowBook','ReturnBook','FindBook'],[0,1,2],[],[])]});
 }}};
