// META {"module":2,"lesson":"Giới thiệu về Lớp và Đối tượng trong C#","activity":"Lớp là gì? Đối tượng là gì?","title":"Lớp và Đối tượng","lead":"Lớp là bản thiết kế, đối tượng là thứ được tạo ra từ bản thiết kế đó. Bấm <b>Bước tiếp</b> để xem từng dòng chạy.","tabs":[["x","Lớp Car và hai đối tượng"]]}
var EX = {x:{
 inputs:[],
 intro:'Lớp Car mô tả mỗi chiếc xe có màu (Color) và tốc độ (Speed). Ta sẽ tạo hai chiếc xe từ lớp này. Bấm "Bước tiếp".',
 lines:function(){return [
  'class Car',
  '{',
  '  public string Color;',
  '  public int Speed;',
  '}',
  '',
  'Car a = new Car();',
  'a.Color = "Đỏ";',
  'Car b = new Car();',
  'b.Color = "Xanh";',
  'b.Speed = 60;',
  'Console.WriteLine(a.Color);',
  'Console.WriteLine(b.Color);'];},
 run:function(c){
  c.snap({ln:0,title:'Lớp Car là bản thiết kế',body:'Lớp chỉ mô tả mỗi chiếc xe sẽ có Color và Speed. Viết lớp chưa tạo ra chiếc xe nào, nên bộ nhớ còn trống.'});
  c.snap({ln:6,title:'new Car() tạo đối tượng thứ nhất',body:'new tạo một chiếc xe thật trong bộ nhớ (Car#1). Các trường nhận giá trị mặc định: Color = null, Speed = 0. Biến a giữ đường dẫn tới Car#1.',
   vars:[['a','→ Car#1',1]],objs:[O('Car#1',[['Color','null'],['Speed',0]],{hi:1})]});
  c.snap({ln:7,title:'Gán màu cho a',body:'a.Color = "Đỏ" đổi trường Color của chính đối tượng Car#1.',
   vars:[['a','→ Car#1']],objs:[O('Car#1',[['Color',S('Đỏ'),'hi'],['Speed',0]],{hi:1})]});
  c.snap({ln:8,title:'new Car() tạo đối tượng thứ hai',body:'Cùng lớp Car nhưng new tạo thêm một chiếc xe mới (Car#2), hoàn toàn tách biệt với Car#1. Biến b giữ đường dẫn tới Car#2.',
   vars:[['a','→ Car#1'],['b','→ Car#2',1]],objs:[O('Car#1',[['Color',S('Đỏ')],['Speed',0]]),O('Car#2',[['Color','null'],['Speed',0]],{hi:1})]});
  c.snap({ln:9,title:'Gán màu cho b',body:'b.Color = "Xanh" chỉ đổi Car#2. Car#1 vẫn màu Đỏ.',
   vars:[['a','→ Car#1'],['b','→ Car#2']],objs:[O('Car#1',[['Color',S('Đỏ')],['Speed',0]]),O('Car#2',[['Color',S('Xanh'),'hi'],['Speed',0]],{hi:1})]});
  c.snap({ln:10,title:'Gán tốc độ cho b',body:'b.Speed = 60. Speed của Car#1 vẫn là 0: mỗi đối tượng giữ dữ liệu riêng của mình.',
   vars:[['a','→ Car#1'],['b','→ Car#2']],objs:[O('Car#1',[['Color',S('Đỏ')],['Speed',0]]),O('Car#2',[['Color',S('Xanh')],['Speed',60,'hi']],{hi:1})]});
  c.out('Đỏ');
  c.out('Xanh');
  c.snap({ln:12,title:'Xong',body:'In ra Đỏ và Xanh: hai đối tượng cùng lớp nhưng mang dữ liệu khác nhau.',
   note:'Một lớp có thể tạo ra nhiều đối tượng. Lớp mô tả "có những gì", còn mỗi đối tượng giữ giá trị cụ thể của riêng nó.',
   vars:[['a','→ Car#1'],['b','→ Car#2']],objs:[O('Car#1',[['Color',S('Đỏ')],['Speed',0]]),O('Car#2',[['Color',S('Xanh')],['Speed',60]])]});
 }}};
