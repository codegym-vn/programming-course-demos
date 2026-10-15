// META {"module":3,"lesson":"Các khái niệm cơ bản của Kế thừa trong C#","activity":"Thành viên được kế thừa và Tầm vực truy cập","title":"Thành viên được kế thừa và tầm vực","lead":"Lớp con kế thừa tất cả, nhưng chỉ dùng được public và protected. Chọn tình huống rồi bấm <b>Bước tiếp</b>.","tabs":[["con","Trong lớp con"],["ngoai","Từ bên ngoài (Main)"]]}
var BASE=['class Animal','{','  public string Name;','  protected int Age;','  private string secret;','}'];
function OBJ(n,a,fl){
 return [O('Dog#1',[['Name (public)',n,fl[0]||''],['Age (protected)',a,fl[1]||''],['secret (private, vẫn nằm trong đối tượng)','null',fl[2]||'']],{hi:1})];
}
var EX = {
con:{inputs:[],
 intro:'Trong phương thức của Dog, thử dùng từng trường của Animal. Bấm "Bước tiếp".',
 lines:function(){return BASE.concat(['class Dog : Animal','{','  public void Test()','  {','    Name = "Lu";','    Age = 3;','    secret = "x";','  }','}']);},
 run:function(c){
  c.snap({ln:6,title:'Dog có đủ ba trường',body:'Đối tượng Dog chứa cả Name, Age và secret của Animal. Khác nhau ở chỗ được phép dùng hay không.',
   vars:[['this','→ Dog#1']],objs:OBJ('null',0,[])});
  c.snap({ln:10,title:'Name (public): được',body:'public thì ở đâu cũng dùng được, kể cả lớp con.',
   vars:[['this','→ Dog#1']],objs:OBJ(S('Lu'),0,['ok'])});
  c.snap({ln:11,title:'Age (protected): được',body:'protected dành cho lớp con. Dog là con của Animal nên dùng Age được.',
   vars:[['this','→ Dog#1']],objs:OBJ(S('Lu'),3,['','ok'])});
  c.err("error CS0122: 'Animal.secret' is inaccessible due to its protection level");
  c.snap({ln:12,title:'secret (private): lỗi biên dịch',body:'private chỉ dùng được bên trong chính Animal. Dog không truy cập trực tiếp được, và đây là lỗi lúc biên dịch.',
   vars:[['this','→ Dog#1']],objs:OBJ(S('Lu'),3,['','','bad'])});
  c.snap({ln:12,title:'Xong',body:'Trường secret vẫn nằm trong đối tượng Dog, chỉ là code của Dog không chạm trực tiếp được.',
   note:'Lớp con kế thừa tất cả thành viên của cha, nhưng chỉ truy cập được public và protected, không truy cập được private.',
   vars:[['this','→ Dog#1']],objs:OBJ(S('Lu'),3,['','','bad'])});
 }},
ngoai:{inputs:[],
 intro:'Bây giờ code nằm ngoài các lớp (Main) và dùng thử từng trường. Bấm "Bước tiếp".',
 lines:function(){return BASE.concat(['class Dog : Animal { }','','var dog = new Dog();','dog.Name = "Lu";','dog.Age = 3;','dog.secret = "x";']);},
 run:function(c){
  c.snap({ln:8,title:'Tạo Dog',body:'Dog#1 có đủ Name, Age, secret. Giờ ta thử dùng chúng từ bên ngoài.',
   vars:[['dog','→ Dog#1',1]],objs:OBJ('null',0,[])});
  c.snap({ln:9,title:'dog.Name (public): được',body:'public thì ngoài lớp cũng dùng được.',
   vars:[['dog','→ Dog#1']],objs:OBJ(S('Lu'),0,['ok'])});
  c.err("error CS0122: 'Animal.Age' is inaccessible due to its protection level");
  c.snap({ln:10,title:'dog.Age (protected): lỗi',body:'protected chỉ cho lớp con dùng bên trong lớp. Từ Main thì không được.',
   vars:[['dog','→ Dog#1']],objs:OBJ(S('Lu'),0,['','bad'])});
  c.err("error CS0122: 'Animal.secret' is inaccessible due to its protection level");
  c.snap({ln:11,title:'dog.secret (private): lỗi',body:'private không cho dùng từ bên ngoài. Cả hai lỗi đều xảy ra lúc biên dịch.',
   vars:[['dog','→ Dog#1']],objs:OBJ(S('Lu'),0,['','','bad'])});
  c.snap({ln:11,title:'Xong',body:'Từ bên ngoài chỉ dùng được public. Trường private vẫn nằm trong đối tượng.',
   note:'Bên ngoài chỉ thấy public. protected chỉ dành cho lớp con, private chỉ dành cho chính lớp khai báo.',
   vars:[['dog','→ Dog#1']],objs:OBJ(S('Lu'),0,['','','bad'])});
 }}};
