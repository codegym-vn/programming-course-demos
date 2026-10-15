// META {"module":5,"lesson":"Giới thiệu về Trừu tượng và Abstract Class","activity":"Giới thiệu Abstract Class: Khái niệm và Mục đích","title":"Abstract Class","lead":"Abstract class là bản thiết kế chưa hoàn chỉnh: không tạo đối tượng trực tiếp, lớp con phải làm nốt phần abstract. Chọn tình huống rồi bấm <b>Bước tiếp</b>.","tabs":[["khong","Không new được"],["con","Lớp con hoàn chỉnh"],["quen","Quên override"]]}
var SH = ['abstract class Shape','{','  public abstract double Area();','  public void Describe()','  {','    Console.WriteLine(','      "Diện tích: " + Area());','  }','}'];
var EX = {
khong:{inputs:[],
 intro:'Thử tạo thẳng một đối tượng Shape. Bấm "Bước tiếp".',
 lines:function(){return ['abstract class Shape','{','  public abstract double Area();','}','','Shape s = new Shape();'];},
 run:function(c){
  c.snap({ln:0,title:'Shape là abstract class',body:'Từ khóa abstract nghĩa là lớp này chưa hoàn chỉnh, chỉ để làm khuôn cho các lớp con.'});
  c.snap({ln:2,title:'Area() là abstract method',body:'Phương thức abstract không có thân, chỉ nói "lớp con phải tự viết Area()". Shape chưa biết tính diện tích.'});
  c.snap({ln:5,title:'Thử new Shape()',body:'Ta muốn tạo một Shape. Nhưng nếu tạo được, Area() sẽ chạy cái gì?',vars:[['s','?',1]]});
  c.err('error CS0144: Cannot create an instance of the abstract type or interface \'Shape\'');
  c.snap({ln:5,title:'Lỗi biên dịch CS0144',body:'Trình biên dịch chặn ngay từ lúc biên dịch, chương trình chưa chạy được. Heap vẫn trống vì không có đối tượng nào được tạo.',vars:[['s','?',1]]});
  c.snap({ln:5,title:'Xong',body:'Muốn có đối tượng, phải tạo lớp con hoàn chỉnh như Circle (xem tab bên cạnh).',note:'Abstract class không dùng new trực tiếp được. Chỉ lớp con đã làm đủ phần abstract mới tạo được đối tượng.',vars:[['s','?',1]]});
 }},
con:{inputs:[],
 intro:'Lớp con Circle viết nốt Area(). Xem code chung ở Shape gọi đúng Area() của Circle. Bấm "Bước tiếp".',
 lines:function(){return SH.concat(['','class Circle : Shape','{','  double r;','  public Circle(double r)','    { this.r = r; }','  public override double Area()','    => 3.14 * r * r;','}','','new Circle(2).Describe();']);},
 run:function(c){
  var area=3.14*2*2;
  var T=[['Tên','Circle'],['r']];
  c.snap({ln:19,title:'new Circle(2)',body:'Circle là lớp con hoàn chỉnh nên tạo được. new cấp bộ nhớ cho Circle#1, trường r mặc định là 0.',objs:[O('Circle#1',[['r',0]],{hi:1})]});
  c.snap({ln:13,title:'Constructor gán r',body:'Constructor của Circle chạy và gán r = 2.',vars:[['r',2]],objs:[O('Circle#1',[['r',2,'hi']],{hi:1})]});
  c.snap({ln:3,title:'Gọi Describe()',body:'Describe() là code chung viết sẵn ở Shape. Circle kế thừa nên dùng được ngay.',objs:[O('Circle#1',[['r',2]],{hi:1,tag:'đang chạy Describe()'})]});
  c.snap({ln:6,title:'Describe() gọi Area()',body:'Ở Shape, Area() chưa có thân. Chương trình sẽ chạy bản Area() của đối tượng thật là Circle#1.',objs:[O('Circle#1',[['r',2]],{hi:1,tag:'gọi Area()'})]});
  c.snap({ln:16,title:'Chạy Area() của Circle',body:'Tính 3.14 * 2 * 2 = '+area+'.',vars:[['Area()',area,1]],objs:[O('Circle#1',[['r',2]],{hi:1,tag:'đang chạy Area()'})]});
  c.out('Diện tích: '+area);
  c.snap({ln:6,title:'In kết quả',body:'Describe() ghép chuỗi và in ra "Diện tích: '+area+'".',vars:[['Area()',area]],objs:[O('Circle#1',[['r',2]],{hi:1})]});
  c.snap({ln:19,title:'Xong',body:'Code chung nằm ở Shape, còn cách tính diện tích do lớp con quyết định.',note:'Lớp cha abstract viết phần chung (Describe), lớp con hoàn thiện phần abstract (Area). Đối tượng tạo ra là lớp con.',objs:[O('Circle#1',[['r',2]])]});
 }},
quen:{inputs:[],
 intro:'Square kế thừa Shape nhưng quên viết Area(). Bấm "Bước tiếp".',
 lines:function(){return ['abstract class Shape','{','  public abstract double Area();','}','','class Square : Shape','{','  double side;','}','','// Cách sửa: thêm vào Square','//   public override double Area()','//   => side * side;'];},
 run:function(c){
  c.snap({ln:2,title:'Shape đòi hỏi Area()',body:'Lớp cha abstract giống một hợp đồng: lớp con nào kế thừa phải viết Area().'});
  c.snap({ln:5,title:'Square kế thừa Shape',body:'Square đồng ý kế thừa Shape, nên cũng phải làm đủ phần abstract.'});
  c.snap({ln:7,title:'Square chỉ có trường side',body:'Trong Square không có phương thức Area() nào. Hợp đồng chưa được thực hiện.'});
  c.err('error CS0534: \'Square\' does not implement inherited abstract member \'Shape.Area()\'');
  c.snap({ln:5,title:'Lỗi biên dịch CS0534',body:'Trình biên dịch báo Square chưa override Area() của Shape, nên chương trình không biên dịch được.'});
  c.snap({ln:11,title:'Cách sửa',body:'Thêm public override double Area() vào Square, ví dụ trả về side * side.'});
  c.snap({ln:11,title:'Xong',body:'Có override Area() thì lỗi biến mất và Square tạo được đối tượng.',note:'Lớp con của abstract class phải override mọi abstract method, nếu không sẽ bị lỗi CS0534.'});
 }}
};
