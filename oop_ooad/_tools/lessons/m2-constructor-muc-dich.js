// META {"module":2,"lesson":"Hàm tạo (Constructors) và Khởi tạo Đối tượng","activity":"Mục đích của Hàm tạo (Constructors)","title":"Mục đích của Constructor","lead":"Cùng tạo một cuốn sách, bên trái không có constructor, bên phải có. Bấm <b>Bước tiếp</b> để hai cột cùng chạy.","tabs":[["x","Book có và không có constructor"]]}
var EX = {x:{
 intro:'Cả hai bên cùng tạo một Book rồi in tên sách. Hãy để ý Title ở mỗi bên.',
 running:'Bên trái, tạo xong là có ngay một cuốn sách thiếu dữ liệu. Bên phải, constructor chạy ngay lúc new để điền dữ liệu.',
 done:'Bên trái Title = null nên in ra rỗng. Bên phải Title = "C#" ngay từ lúc tạo xong.',
 note:'Constructor chạy ngay khi new, nên đối tượng có dữ liệu hợp lệ từ đầu mà không sợ quên gán.',
 cols:[
 {title:'Không constructor',sub:'Phải nhớ tự gán từng trường.',
  lines:['class Book','{','  public string Title;','  public decimal Price;','}','','var b = new Book();','Console.WriteLine(','  "Tên: " + b.Title);'],
  run:function(c){
   c.snap({ln:0,title:'Lớp không có constructor',body:'Ta chỉ có thể new Book() rồi tự gán từng trường. Dễ quên.'});
   c.snap({ln:6,title:'new Book()',body:'Đối tượng Book#1 được tạo ngay với Title = null và Price = 0.',vars:[['b','→ Book#1',1]],objs:[O('Book#1',[['Title','null','bad'],['Price',0]],{hi:1})]});
   c.out('Tên: ');
   c.snap({ln:7,title:'Quên gán Title',body:'Ta quên gán Title nên in ra "Tên: " và để trống.',vars:[['b','→ Book#1']],objs:[O('Book#1',[['Title','null','bad'],['Price',0]],{hi:1})]});
   c.snap({ln:7,title:'Xong',body:'Đối tượng thiếu dữ liệu mà không ai báo lỗi.',vars:[['b','→ Book#1']],objs:[O('Book#1',[['Title','null','bad'],['Price',0]])]});
  }},
 {title:'Có constructor',sub:'Book(title, price) bắt buộc có dữ liệu.',
  lines:['class Book','{','  public string Title;','  public decimal Price;','  public Book(string title,','    decimal price)','  {','    Title = title;','    Price = price;','  }','}','','var b = new Book("C#", 99);','Console.WriteLine(','  "Tên: " + b.Title);'],
  run:function(c){
   c.snap({ln:4,title:'Constructor đòi dữ liệu',body:'Muốn new Book thì phải đưa title và price. Không đưa thì không biên dịch được.'});
   c.snap({ln:12,title:'new, bước 1: cấp vùng nhớ',body:'Cấp bộ nhớ cho Book#1, các trường nhận giá trị mặc định (null và 0). Biến b chưa nhận gì.',objs:[O('Book#1',[['Title','null'],['Price',0]],{hi:1})],vars:[['title',S('C#')],['price',99]]});
   c.snap({ln:7,title:'new, bước 2: gán Title',body:'Thân constructor chạy, Title = title.',vars:[['title',S('C#')],['price',99]],objs:[O('Book#1',[['Title',S('C#'),'hi'],['Price',0]],{hi:1})]});
   c.snap({ln:8,title:'new, bước 2: gán Price',body:'Price = price.',vars:[['title',S('C#')],['price',99]],objs:[O('Book#1',[['Title',S('C#')],['Price',99,'hi']],{hi:1})]});
   c.snap({ln:12,title:'new, bước 3: trả tham chiếu',body:'new trả tham chiếu tới Book#1 về cho biến b. Đối tượng đã đầy đủ dữ liệu.',vars:[['b','→ Book#1',1]],objs:[O('Book#1',[['Title',S('C#'),'ok'],['Price',99,'ok']],{hi:1})]});
   c.out('Tên: C#');
   c.snap({ln:13,title:'Xong',body:'In ra "Tên: C#". Không thể quên gán.',vars:[['b','→ Book#1']],objs:[O('Book#1',[['Title',S('C#')],['Price',99]])]});
  }}
 ]}};
