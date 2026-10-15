// META {"module":3,"lesson":"Tái sử dụng mã và Cải tiến với Kế thừa","activity":"Kế thừa để Tái sử dụng Mã","title":"Kế thừa để tái sử dụng mã","lead":"Cùng một việc: đổi thông báo Start(). Bên trái mỗi lớp tự viết, bên phải đưa lên lớp cha. Bấm <b>Bước tiếp</b> để hai cột cùng chạy.","tabs":[["x","Đổi thông báo Start()"]]}
var LEFT_CLASSES=['Car','Truck'];
var RIGHT_CLASSES=['Vehicle'];
var EX = {x:{
 intro:'Thông báo "Khởi động" cần đổi thành "Nổ máy". Hãy đếm xem mỗi bên phải sửa mấy chỗ.',
 running:'Bên trái Start() bị chép vào từng lớp. Bên phải Start() chỉ có một bản ở lớp cha.',
 done:'Số chỗ phải sửa: bên trái '+LEFT_CLASSES.length+', bên phải '+RIGHT_CLASSES.length+'. Càng nhiều lớp con thì bên trái càng phải sửa nhiều chỗ.',
 note:'Đưa code chung lên lớp cha: sửa một chỗ, mọi lớp con đều được cập nhật.',
 cols:[
 {title:'Mỗi lớp tự viết',sub:'Car và Truck có Start() giống nhau.',
  lines:['class Car','{','  public void Start()','  {','    Console.WriteLine("Khởi động");','  }','}','class Truck','{','  public void Start()','  {','    Console.WriteLine("Khởi động");','  }','}'],
  run:function(c){
   var n=0;
   c.snap({ln:4,title:'Trước khi sửa',body:'Car và Truck mỗi lớp có một bản Start() riêng, giống hệt nhau.',vars:[['chỗ phải sửa',n]]});
   n++;
   c.snap({ln:4,title:'Sửa Car.Start()',body:'Đổi thông báo trong Car thành "Nổ máy".',vars:[['chỗ phải sửa',n,1]]});
   n++;
   c.snap({ln:11,title:'Sửa Truck.Start()',body:'Truck có bản chép riêng, nên phải sửa thêm một lần nữa.',vars:[['chỗ phải sửa',n,1]]});
   c.snap({ln:11,title:'Xong',body:'Đã sửa '+n+' chỗ. Quên một chỗ thì hai lớp sẽ in khác nhau.',vars:[['chỗ phải sửa',n]]});
  }},
 {title:'Dùng chung ở lớp cha',sub:'Vehicle.Start() là bản duy nhất.',
  lines:['class Vehicle','{','  public void Start()','  {','    Console.WriteLine("Khởi động");','  }','}','class Car : Vehicle { }','class Truck : Vehicle { }'],
  run:function(c){
   var n=0;
   c.snap({ln:4,title:'Trước khi sửa',body:'Chỉ Vehicle có Start(). Car và Truck kế thừa nên dùng lại được.',vars:[['chỗ phải sửa',n]]});
   n++;
   c.snap({ln:4,title:'Sửa Vehicle.Start()',body:'Đổi thông báo trong Vehicle thành "Nổ máy".',vars:[['chỗ phải sửa',n,1]]});
   c.snap({ln:7,title:'Car tự cập nhật',body:'Car dùng Start() của Vehicle nên tự in "Nổ máy", không phải sửa gì.',vars:[['chỗ phải sửa',n]]});
   c.snap({ln:8,title:'Xong',body:'Truck cũng vậy. Tổng cộng chỉ sửa '+n+' chỗ.',vars:[['chỗ phải sửa',n]]});
  }}
 ]}};
