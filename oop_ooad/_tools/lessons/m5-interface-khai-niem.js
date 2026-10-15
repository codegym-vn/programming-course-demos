// META {"module":5,"lesson":"Giới thiệu về Interface","activity":"Khái niệm Interface trong C# và vai trò của nó","title":"Interface là hợp đồng","lead":"Interface chỉ nói \"phải làm được gì\". Lớp nào ký vào thì phải làm đủ. Chọn tình huống rồi bấm <b>Bước tiếp</b>.","tabs":[["bay","Bird và Airplane"],["thieu","Thiếu phương thức"]]}
var FL = ['interface IFlyable','{','  void Fly();','}','','class Bird : IFlyable','{','  public void Fly()','    => Console.WriteLine("Chim bay");','}','class Airplane : IFlyable','{','  public void Fly()','    => Console.WriteLine("Máy bay bay");','}','','static void LetItFly(IFlyable f)','{','  f.Fly();','}','','LetItFly(new Bird());','LetItFly(new Airplane());'];
var EX = {
bay:{inputs:[],
 intro:'Chim và máy bay không cùng lớp cha, nhưng cùng ký hợp đồng IFlyable. Bấm "Bước tiếp".',
 lines:function(){return FL;},
 run:function(c){
  var B=function(h,d,t){return O('Bird#1',[],{hi:h,dim:d,tag:t});};
  c.snap({ln:0,title:'IFlyable là hợp đồng',body:'Interface chỉ khai báo Fly(), không có thân. Ai ký hợp đồng này phải biết bay.'});
  c.snap({ln:5,title:'Bird ký hợp đồng',body:'Bird : IFlyable nghĩa là Bird cam kết có Fly(), và đã viết đủ ở dòng bên dưới.'});
  c.snap({ln:10,title:'Airplane cũng ký',body:'Airplane không liên quan gì tới Bird, nhưng cùng ký IFlyable nên cũng phải có Fly().'});
  c.snap({ln:21,title:'Truyền Bird vào LetItFly',body:'new Bird() tạo Bird#1. Tham số f có kiểu IFlyable và trỏ tới Bird#1.',vars:[['f','→ Bird#1',1]],objs:[B(1)]});
  c.out('Chim bay');
  c.snap({ln:18,title:'f.Fly() chạy Bird.Fly',body:'LetItFly chỉ biết f là IFlyable có Fly(). Lúc chạy, nó gọi Fly() của đối tượng thật là Bird.',vars:[['f','→ Bird#1']],objs:[B(1,0,'đang chạy Fly()')]});
  c.snap({ln:22,title:'Truyền Airplane vào LetItFly',body:'Gọi lại cùng hàm LetItFly nhưng lần này với Airplane#2. Bird#1 không còn ai tham chiếu, sẽ bị thu hồi.',vars:[['f','→ Airplane#2',1]],objs:[B(0,1),O('Airplane#2',[],{hi:1})]});
  c.out('Máy bay bay');
  c.snap({ln:18,title:'f.Fly() chạy Airplane.Fly',body:'Cùng một dòng f.Fly() nhưng chạy Fly() của Airplane.',vars:[['f','→ Airplane#2']],objs:[B(0,1),O('Airplane#2',[],{hi:1,tag:'đang chạy Fly()'})]});
  c.snap({ln:22,title:'Xong',body:'Một hàm LetItFly dùng được cho mọi thứ biết bay mà không cần biết nó là gì.',note:'Interface là hợp đồng: lớp ký vào phải làm đủ, và code bên ngoài chỉ cần biết hợp đồng.',vars:[['f','→ Airplane#2']],objs:[B(0,1),O('Airplane#2',[])]});
 }},
thieu:{inputs:[],
 intro:'Lớp Kite ký hợp đồng IFlyable nhưng quên viết Fly(). Bấm "Bước tiếp".',
 lines:function(){return ['interface IFlyable','{','  void Fly();','}','','class Kite : IFlyable','{','  // chưa viết Fly()','}'];},
 run:function(c){
  c.snap({ln:2,title:'Hợp đồng đòi Fly()',body:'IFlyable nói rõ: ai thực thi phải có phương thức Fly().'});
  c.snap({ln:5,title:'Kite ký hợp đồng',body:'class Kite : IFlyable nghĩa là Kite cam kết làm đủ mọi thứ trong IFlyable.'});
  c.snap({ln:7,title:'Nhưng Kite không có Fly()',body:'Thân lớp Kite chưa có phương thức Fly() nào.'});
  c.err('error CS0535: \'Kite\' does not implement interface member \'IFlyable.Fly()\'');
  c.snap({ln:5,title:'Lỗi biên dịch CS0535',body:'Trình biên dịch báo Kite chưa thực thi đủ interface, nên chương trình không biên dịch được.'});
  c.snap({ln:5,title:'Xong',body:'Thêm public void Fly() vào Kite thì lỗi sẽ hết.',note:'Đã ký interface thì phải làm đủ mọi thành viên của nó, nếu thiếu sẽ bị lỗi CS0535.'});
 }}
};
