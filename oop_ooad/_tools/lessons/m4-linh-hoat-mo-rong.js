// META {"module":4,"lesson":"Ứng dụng và Lợi ích của Đa hình trong thiết kế phần mềm","activity":"Đa hình giúp tạo mã linh hoạt và dễ mở rộng","title":"Thêm loại mới dễ dàng","lead":"Cùng một yêu cầu: thêm hình Triangle. Bên trái dùng switch, bên phải dùng đa hình. Bấm <b>Bước tiếp</b> để hai cột cùng chạy.","tabs":[["x","Thêm Triangle"]]}
var LEFT_NEW=['case "Triangle":','return s.W * s.H / 2;'];
var RIGHT_EDITS=0;
var EX = {x:{
 intro:'Hiện có Circle và Rect, cả hai cách đều chạy tốt. Giờ cần thêm Triangle. Hãy đếm xem mỗi bên phải sửa bao nhiêu dòng code cũ.',
 running:'Bên trái phải mở hàm đang chạy tốt ra để sửa. Bên phải chỉ viết thêm một lớp mới.',
 done:'Bên trái phải thêm '+LEFT_NEW.length+' dòng vào hàm cũ, bên phải sửa '+RIGHT_EDITS+' dòng cũ và chỉ thêm lớp Triangle mới.',
 note:'Với đa hình, thêm loại mới chỉ là thêm lớp mới. Code cũ không phải sửa nên ít nguy cơ gây lỗi.',
 cols:[
 {title:'Dùng switch',sub:'Mỗi loại hình là một nhánh case.',
  lines:['double TinhDienTich(Shape s)','{','  switch (s.Type)','  {','    case "Circle":','      return Math.PI * s.R * s.R;','    case "Rect":','      return s.W * s.H;','    case "Triangle": // thêm sau','      return s.W * s.H / 2;','  }','  return 0;','}'],
  run:function(c){
   var o=function(n,f){return [O('Hàm TinhDienTich',[['dòng cũ phải sửa',n,f]],{hi:n>0})];};
   c.snap({ln:2,title:'Hàm dùng switch',body:'Hàm kiểm tra loại hình rồi chọn công thức. Lúc đầu chỉ có case Circle và case Rect (hai dòng ghi "thêm sau" chưa tồn tại).',objs:o(0,'ok')});
   c.snap({ln:0,title:'Cần thêm Triangle',body:'Hàm không biết Triangle. Muốn hỗ trợ, phải mở chính hàm này ra sửa.',objs:o(0,'ok')});
   c.snap({ln:8,title:'Sửa lần 1: thêm case',body:'Thêm dòng case "Triangle": vào trong switch của hàm cũ.',objs:o(1,'bad')});
   c.snap({ln:9,title:'Sửa lần 2: thêm công thức',body:'Thêm tiếp dòng return cho Triangle. Đã sửa '+LEFT_NEW.length+' dòng trong code đang chạy tốt, và mọi nơi khác có switch tương tự cũng phải sửa.',objs:o(LEFT_NEW.length,'bad')});
  }},
 {title:'Dùng đa hình',sub:'Mỗi hình tự có Area().',
  lines:['abstract class Shape','{','  public abstract double Area();','}','class Circle(double r) : Shape','{','  public override double Area()','    => Math.PI * r * r;','}','class Rect(double w, double h)','  : Shape','{','  public override double Area()','    => w * h;','}','// thêm sau: lớp Triangle','class Triangle(double b, double h)','  : Shape','{','  public override double Area()','    => b * h / 2;','}','','double Tinh(Shape s)','  => s.Area();'],
  run:function(c){
   var o=function(n,f){return [O('Code cũ (Shape, Tinh...)',[['dòng cũ phải sửa',n,f]],{hi:1})];};
   c.snap({ln:23,title:'Hàm chỉ gọi s.Area()',body:'Tinh không cần biết là hình gì: mỗi hình tự biết cách tính. Lúc đầu chỉ có Circle và Rect (lớp Triangle ghi "thêm sau" chưa tồn tại).',objs:o(RIGHT_EDITS,'ok')});
   c.snap({ln:15,title:'Cần thêm Triangle',body:'Chỉ cần viết một lớp mới kế thừa Shape. Không phải mở code cũ ra.',objs:o(RIGHT_EDITS,'ok')});
   c.snap({ln:16,title:'Thêm lớp Triangle',body:'Lớp mới override Area() với công thức riêng. Toàn bộ là code mới, code cũ nguyên vẹn.',objs:o(RIGHT_EDITS,'ok')});
   c.snap({ln:23,title:'Tinh không đổi',body:'Tinh(new Triangle(...)) chạy ngay vì Triangle là một Shape. Số dòng cũ phải sửa: '+RIGHT_EDITS+'.',objs:o(RIGHT_EDITS,'ok')});
  }}
 ]}};
