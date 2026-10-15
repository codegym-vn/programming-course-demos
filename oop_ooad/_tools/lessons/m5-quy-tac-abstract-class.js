// META {"module":5,"lesson":"Thực hành với Abstract Class","activity":"Các quy tắc và hạn chế khi sử dụng Abstract Class","title":"Quy tắc của Abstract Class","lead":"Abstract class vẫn có trường và constructor, nhưng chỉ kế thừa được một lớp. Chọn tình huống rồi bấm <b>Bước tiếp</b>.","tabs":[["ctor","Constructor"],["mot","Một lớp cha"]]}
var EX = {
ctor:{inputs:[],
 intro:'Abstract class Shape có trường Name và constructor. Xem thứ tự chạy khi tạo Circle. Bấm "Bước tiếp".',
 lines:function(){return ['abstract class Shape','{','  public string Name;','  public Shape(string name)','  {','    Name = name;','  }','}','','class Circle : Shape','{','  public double R;','  public Circle(double r)','    : base("Hình tròn")','  {','    R = r;','  }','}','','var c = new Circle(2);'];},
 run:function(c){
  c.snap({ln:19,title:'new Circle(2)',body:'new cấp bộ nhớ cho Circle#1. Trường Name (từ Shape) và R (của Circle) đều nhận giá trị mặc định.',vars:[['c','→ Circle#1',1]],objs:[O('Circle#1',[['Name','null'],['R',0]],{hi:1})]});
  c.snap({ln:12,title:'Vào constructor của Circle',body:'Nhận r = 2. Nhưng trước khi chạy thân, dòng ": base(...)" sẽ gọi constructor của lớp cha.',vars:[['c','→ Circle#1'],['r',2]],objs:[O('Circle#1',[['Name','null'],['R',0]],{hi:1})]});
  c.snap({ln:13,title:'Gọi constructor Shape trước',body:'base("Hình tròn") chuyển sang constructor của Shape. Lớp cha luôn chạy trước lớp con.',vars:[['c','→ Circle#1'],['name',S('Hình tròn')]],objs:[O('Circle#1',[['Name','null'],['R',0]],{hi:1,tag:'đang chạy Shape()'})]});
  c.snap({ln:5,title:'Shape gán Name',body:'Name = "Hình tròn". Abstract class có trường và constructor như lớp thường, chỉ là không new trực tiếp được.',vars:[['c','→ Circle#1'],['name',S('Hình tròn')]],objs:[O('Circle#1',[['Name',S('Hình tròn'),'hi'],['R',0]],{hi:1,tag:'đang chạy Shape()'})]});
  c.snap({ln:15,title:'Quay lại Circle: gán R',body:'Constructor Shape xong, giờ mới chạy thân constructor Circle: R = 2.',vars:[['c','→ Circle#1'],['r',2]],objs:[O('Circle#1',[['Name',S('Hình tròn')],['R',2,'hi']],{hi:1,tag:'đang chạy Circle()'})]});
  c.snap({ln:19,title:'Xong',body:'Circle#1 có Name = "Hình tròn" và R = 2.',note:'Abstract class có trường và constructor. Khi tạo lớp con, constructor của lớp cha chạy trước rồi mới đến constructor lớp con.',vars:[['c','→ Circle#1']],objs:[O('Circle#1',[['Name',S('Hình tròn')],['R',2]])]});
 }},
mot:{inputs:[],
 intro:'Thử cho lớp C kế thừa cùng lúc hai lớp A và B. Bấm "Bước tiếp".',
 lines:function(){return ['abstract class A { }','abstract class B { }','','class C : A, B','{','}'];},
 run:function(c){
  c.snap({ln:0,title:'Có lớp A',body:'A là một abstract class.'});
  c.snap({ln:1,title:'Có lớp B',body:'B cũng là một abstract class.'});
  c.snap({ln:3,title:'C muốn kế thừa cả A và B',body:'Ta viết class C : A, B với hy vọng C có cả đồ của A lẫn B.'});
  c.err('error CS1721: Class \'C\' cannot have multiple base classes: \'A\' and \'B\'');
  c.snap({ln:3,title:'Lỗi biên dịch CS1721',body:'C# chỉ cho một lớp cha. Trình biên dịch từ chối nên chương trình không chạy được.'});
  c.snap({ln:3,title:'Xong',body:'Muốn một lớp có nhiều khả năng, ta dùng interface (xem các bài sau).',note:'Một lớp chỉ kế thừa được MỘT lớp cha (kể cả abstract class). Nhiều "khả năng" thì dùng nhiều interface.'});
 }}
};
