// META {"module":2,"lesson":"Thuộc tính (Properties) trong C#","activity":"Cú pháp và Các loại Thuộc tính","title":"Các loại Property","lead":"Chọn dạng property rồi bấm <b>Bước tiếp</b>.","tabs":[["auto","Auto-property"],["doc","Chỉ đọc"],["pset","private set"],["tinh","Tính toán"]]}
var EX = {
auto:{inputs:[],
 intro:'{ get; set; } là cách viết ngắn nhất: C# tự tạo trường ẩn. Bấm "Bước tiếp".',
 lines:function(){return ['class Student','{','  public int Age { get; set; }','}','','var s = new Student();','s.Age = 18;','Console.WriteLine(s.Age);'];},
 run:function(c){
  c.snap({ln:5,title:'Tạo Student',body:'C# tự tạo một trường ẩn để chứa Age, mặc định là 0.',vars:[['s','→ Student#1',1]],objs:[O('Student#1',[['Age (trường ẩn)',0]],{hi:1})]});
  c.snap({ln:6,title:'Gán qua set',body:'s.Age = 18 chạy set tự sinh, ghi 18 vào trường ẩn.',vars:[['s','→ Student#1']],objs:[O('Student#1',[['Age (trường ẩn)',18,'hi']],{hi:1})]});
  c.out('18');
  c.snap({ln:7,title:'Đọc qua get',body:'s.Age chạy get tự sinh, đọc trường ẩn và trả về 18.',vars:[['s','→ Student#1']],objs:[O('Student#1',[['Age (trường ẩn)',18,'hi']],{hi:1})]});
  c.snap({ln:7,title:'Xong',body:'Đọc và ghi đều được.',note:'Auto-property { get; set; } cho đọc và ghi, không cần tự viết trường.',vars:[['s','→ Student#1']],objs:[O('Student#1',[['Age (trường ẩn)',18]])]});
 }},
doc:{inputs:[],
 intro:'Property chỉ có get thì chỉ gán được trong constructor. Bấm "Bước tiếp".',
 lines:function(){return ['class Book','{','  public string Title { get; }','  public Book(string t)','    => Title = t;','}','','var b = new Book("C#");','Console.WriteLine(b.Title);','b.Title = "Java";'];},
 run:function(c){
  var V=[['b','→ Book#1']];
  c.snap({ln:2,title:'Title chỉ có get',body:'Không có set nên bên ngoài lớp không gán được Title. Chỉ constructor của lớp được gán.',});
  c.snap({ln:7,title:'new Book("C#")',body:'Constructor chạy Title = t, được phép vì nằm trong lớp.',vars:[['b','→ Book#1',1]],objs:[O('Book#1',[['Title',S('C#'),'hi']],{hi:1})]});
  c.out('C#');
  c.snap({ln:8,title:'Đọc b.Title',body:'Đọc thì bình thường, in "C#".',vars:V,objs:[O('Book#1',[['Title',S('C#')]],{hi:1})]});
  c.err("error CS0200: Property or indexer 'Book.Title' cannot be assigned to -- it is read only");
  c.snap({ln:9,title:'Xong: gán ngoài lớp bị lỗi',body:'b.Title = "Java" là lỗi biên dịch CS0200, chương trình không chạy được.',note:'Property chỉ có get là chỉ đọc: bên ngoài đọc được, không gán được.',vars:V,objs:[O('Book#1',[['Title',S('C#')]])]});
 }},
pset:{inputs:[],
 intro:'private set: ai cũng đọc được, nhưng chỉ lớp tự đổi được. Bấm "Bước tiếp".',
 lines:function(){return ['class Counter','{','  public int Count','    { get; private set; }','  public void Add()','    => Count++;','}','','var c = new Counter();','c.Add();','Console.WriteLine(c.Count);','c.Count = 10;'];},
 run:function(c){
  var V=[['c','→ Counter#1']];
  c.snap({ln:8,title:'Tạo Counter',body:'Count mặc định là 0.',vars:[['c','→ Counter#1',1]],objs:[O('Counter#1',[['Count',0]],{hi:1})]});
  c.snap({ln:5,title:'c.Add()',body:'Add nằm trong lớp nên được dùng set private, Count tăng lên 1.',vars:V,objs:[O('Counter#1',[['Count',1,'hi']],{hi:1,tag:'đang chạy Add()'})]});
  c.out('1');
  c.snap({ln:10,title:'Đọc c.Count',body:'get là public nên bên ngoài đọc được, in 1.',vars:V,objs:[O('Counter#1',[['Count',1]],{hi:1})]});
  c.err("error CS0272: The property or indexer 'Counter.Count' cannot be used in this context because the set accessor is inaccessible");
  c.snap({ln:11,title:'Xong: gán ngoài lớp bị lỗi',body:'c.Count = 10 ở ngoài lớp là lỗi biên dịch CS0272 vì set là private.',note:'private set: đọc từ ngoài được, nhưng chỉ chính lớp mới đổi được giá trị.',vars:V,objs:[O('Counter#1',[['Count',1]])]});
 }},
tinh:{inputs:[],
 intro:'FullName không chứa dữ liệu riêng, nó được tính mỗi lần đọc. Bấm "Bước tiếp".',
 lines:function(){return ['class Person','{','  public string First;','  public string Last;','  public string FullName','    => First + " " + Last;','}','','var p = new Person();','p.First = "An";','p.Last = "Lê";','Console.WriteLine(p.FullName);','p.First = "Bình";','Console.WriteLine(p.FullName);'];},
 run:function(c){
  var V=[['p','→ Person#1']];
  c.snap({ln:8,title:'Tạo Person',body:'Chỉ First và Last là dữ liệu thật. FullName không có ô lưu trữ.',vars:[['p','→ Person#1',1]],objs:[O('Person#1',[['First','null'],['Last','null']],{hi:1})]});
  c.snap({ln:9,title:'Gán First',body:'First = "An".',vars:V,objs:[O('Person#1',[['First',S('An'),'hi'],['Last','null']],{hi:1})]});
  c.snap({ln:10,title:'Gán Last',body:'Last = "Lê".',vars:V,objs:[O('Person#1',[['First',S('An')],['Last',S('Lê'),'hi']],{hi:1})]});
  c.out('An Lê');
  c.snap({ln:11,title:'Đọc FullName',body:'get ghép First + " " + Last ngay lúc đọc, được "An Lê".',vars:V.concat([['p.FullName',S('An Lê'),1]]),objs:[O('Person#1',[['First',S('An')],['Last',S('Lê')]],{hi:1})]});
  c.snap({ln:12,title:'Đổi First',body:'First = "Bình". Ta không đụng tới FullName.',vars:V,objs:[O('Person#1',[['First',S('Bình'),'hi'],['Last',S('Lê')]],{hi:1})]});
  c.out('Bình Lê');
  c.snap({ln:13,title:'Xong',body:'Đọc FullName lần nữa, kết quả đổi theo thành "Bình Lê".',note:'Property tính toán chỉ có get, không lưu dữ liệu riêng mà tính lại từ các trường khác mỗi lần đọc.',vars:V.concat([['p.FullName',S('Bình Lê'),1]]),objs:[O('Person#1',[['First',S('Bình')],['Last',S('Lê')]])]});
 }}};
