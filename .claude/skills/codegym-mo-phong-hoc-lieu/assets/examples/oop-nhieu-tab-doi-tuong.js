// META {"module":2,"lesson":"Giới thiệu về Lớp và Đối tượng trong C#","activity":"Tạo và Sử dụng Đối tượng","title":"Tạo và Sử dụng Đối tượng","lead":"Biến kiểu lớp không chứa đối tượng, nó chỉ giữ đường dẫn (tham chiếu) tới đối tượng. Chọn tình huống rồi bấm <b>Bước tiếp</b>.","tabs":[["dung","Tạo và dùng"],["gan","Gán tham chiếu"],["null","Biến null"]]}
var DOG = ['class Dog','{','  public string Name;','  public void Bark()','  {','    string s = Name + ": Gâu!";','    Console.WriteLine(s);','  }','}',''];
var EX = {
dung:{inputs:[],
 intro:'Tạo một chú chó bằng new, đặt tên rồi gọi phương thức Bark(). Bấm "Bước tiếp".',
 lines:function(){return DOG.concat(['Dog d = new Dog();','d.Name = "Lu";','d.Bark();']);},
 run:function(c){
  c.snap({ln:10,title:'new Dog() tạo đối tượng',body:'new tạo đối tượng Dog#1 trong bộ nhớ. Name chưa gán nên là null. Biến d giữ tham chiếu tới Dog#1.',
   vars:[['d','→ Dog#1',1]],objs:[O('Dog#1',[['Name','null']],{hi:1})]});
  c.snap({ln:11,title:'Gán trường Name',body:'Dấu chấm (d.Name) nghĩa là "trường Name của đối tượng mà d trỏ tới".',
   vars:[['d','→ Dog#1']],objs:[O('Dog#1',[['Name',S('Lu'),'hi']],{hi:1})]});
  c.snap({ln:12,title:'Gọi d.Bark()',body:'Gọi phương thức trên đối tượng Dog#1. Chương trình nhảy vào thân Bark().',
   vars:[['d','→ Dog#1']],objs:[O('Dog#1',[['Name',S('Lu')]],{hi:1})]});
  c.out('Lu: Gâu!');
  c.snap({ln:6,title:'Chạy bên trong Bark()',body:'Bark() dùng Name của chính đối tượng đang được gọi (Dog#1), nên in "Lu: Gâu!".',
   vars:[['d','→ Dog#1']],objs:[O('Dog#1',[['Name',S('Lu'),'hi']],{hi:1,tag:'đang chạy Bark()'})]});
  c.snap({ln:12,title:'Xong',body:'Bark() chạy xong, quay về sau dòng d.Bark().',note:'Ba bước dùng đối tượng: tạo bằng new, gán dữ liệu qua dấu chấm, gọi phương thức qua dấu chấm.',
   vars:[['d','→ Dog#1']],objs:[O('Dog#1',[['Name',S('Lu')]])]});
 }},
gan:{inputs:[],
 intro:'Gán b = a không tạo con chó mới. Xem điều gì xảy ra khi đổi tên qua b. Bấm "Bước tiếp".',
 lines:function(){return ['// Lớp Dog như tab "Tạo và dùng"','Dog a = new Dog();','a.Name = "Lu";','Dog b = a;','b.Name = "Mực";','Console.WriteLine(a.Name);'];},
 run:function(c){
  c.snap({ln:1,title:'Tạo Dog#1',body:'new tạo một đối tượng, a trỏ tới nó.',vars:[['a','→ Dog#1',1]],objs:[O('Dog#1',[['Name','null']],{hi:1})]});
  c.snap({ln:2,title:'Đặt tên Lu',body:'a.Name = "Lu".',vars:[['a','→ Dog#1']],objs:[O('Dog#1',[['Name',S('Lu'),'hi']],{hi:1})]});
  c.snap({ln:3,title:'b = a: chép tham chiếu',body:'Không có new nên không có đối tượng mới. b chỉ chép đường dẫn của a, nên a và b cùng trỏ tới Dog#1.',
   vars:[['a','→ Dog#1',1],['b','→ Dog#1',1]],objs:[O('Dog#1',[['Name',S('Lu')]],{hi:1})]});
  c.snap({ln:4,title:'Đổi tên qua b',body:'b.Name = "Mực" đổi trường Name của Dog#1, cũng là đối tượng mà a đang trỏ tới.',
   vars:[['a','→ Dog#1'],['b','→ Dog#1',1]],objs:[O('Dog#1',[['Name',S('Mực'),'hi']],{hi:1})]});
  c.out('Mực');
  c.snap({ln:5,title:'Xong',body:'In a.Name ra "Mực", không phải "Lu".',note:'Gán một biến đối tượng cho biến khác chỉ chép tham chiếu. Hai biến cùng trỏ một đối tượng, sửa qua biến này thì biến kia cũng thấy.',
   vars:[['a','→ Dog#1'],['b','→ Dog#1']],objs:[O('Dog#1',[['Name',S('Mực')]])]});
 }},
'null':{inputs:[],
 intro:'Biến có kiểu Dog nhưng chưa trỏ tới đối tượng nào thì sao? Bấm "Bước tiếp".',
 lines:function(){return ['// Lớp Dog như tab "Tạo và dùng"','Dog c = null;','c.Bark();'];},
 run:function(c){
  c.snap({ln:1,title:'c = null',body:'Biến c có kiểu Dog nhưng giá trị null: nó không trỏ tới đối tượng nào. Trong heap chưa có Dog nào.',vars:[['c','null',1]]});
  c.err('Unhandled exception. System.NullReferenceException:');
  c.err('Object reference not set to an instance of an object.');
  c.snap({ln:2,title:'Gọi c.Bark() bị lỗi',body:'Không có đối tượng nào để gọi Bark(), chương trình dừng với lỗi NullReferenceException.',
   note:'Luôn tạo đối tượng bằng new (hoặc kiểm tra c != null) trước khi dùng dấu chấm.',vars:[['c','null',1]]});
 }}
};
