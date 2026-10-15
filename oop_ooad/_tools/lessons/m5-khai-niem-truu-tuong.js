// META {"module":5,"lesson":"Giới thiệu về Trừu tượng và Abstract Class","activity":"Khái niệm Trừu tượng trong Lập trình hướng đối tượng (OOP)","title":"Trừu tượng là gì?","lead":"Trừu tượng nghĩa là chỉ nhìn thấy cái cần dùng, chi tiết bên trong được ẩn đi. Chọn góc nhìn rồi bấm <b>Bước tiếp</b>.","tabs":[["ngoai","Góc nhìn người dùng"],["trong","Mở nắp xem bên trong"]]}
var IN_L = ['class Car','{','  public void Start()','  {','    CheckFuel();','    Ignite();','    WarmUp();','    ShowReady();','  }','  private void CheckFuel() { }','  private void Ignite() { }','  private void WarmUp() { }','  private void ShowReady()','  {','    Console.WriteLine("Xe sẵn sàng");','  }','}','','car.Start();'];
var EX = {
ngoai:{inputs:[],
 intro:'Người dùng chỉ cần biết một lệnh: car.Start(). Bấm "Bước tiếp".',
 lines:function(){return ['Car car = new Car();','car.Start();'];},
 run:function(c){
  c.snap({ln:0,title:'Có một chiếc xe',body:'Ta có đối tượng Car#1. Người dùng chưa cần biết bên trong xe có gì.',vars:[['car','→ Car#1',1]],objs:[O('Car#1',[],{hi:1})]});
  c.snap({ln:1,title:'Gọi car.Start()',body:'Người dùng chỉ viết đúng một dòng này để nổ máy.',vars:[['car','→ Car#1']],objs:[O('Car#1',[],{hi:1,tag:'đang chạy Start()'})]});
  c.out('Xe sẵn sàng');
  c.snap({ln:1,title:'Xe nổ máy',body:'Kết quả hiện ra: xe sẵn sàng. Người dùng không thấy xe làm bằng cách nào.',vars:[['car','→ Car#1']],objs:[O('Car#1',[])]});
  c.snap({ln:1,title:'Không cần biết chi tiết',body:'Kiểm tra xăng, đánh lửa... đều do xe tự lo. Người dùng không cần biết, cũng không cần gọi từng bước.',vars:[['car','→ Car#1']],objs:[O('Car#1',[])]});
  c.snap({ln:1,title:'Xong',body:'Chỉ một dòng gọi là đủ dùng. Qua tab bên cạnh để mở nắp xem bên trong.',note:'Trừu tượng: người gọi chỉ thấy phần cần dùng (Start), không cần biết các bước bên trong.',vars:[['car','→ Car#1']],objs:[O('Car#1',[])]});
 }},
trong:{inputs:[],
 intro:'Giờ mở nắp xe. Start() là phần công khai, còn các bước nhỏ bên trong là private. Bấm "Bước tiếp".',
 lines:function(){return IN_L;},
 run:function(c){
  var v=[['car','→ Car#1']];
  c.snap({ln:18,title:'Người dùng gọi car.Start()',body:'Ở phía ngoài chỉ có đúng một dòng này. Giờ ta xem bên trong Start() có gì.',vars:v,objs:[O('Car#1',[],{hi:1})]});
  c.snap({ln:2,title:'Mở nắp: Start() gọi 4 bước',body:'Start() là public nên gọi được từ ngoài. Bên trong nó gọi lần lượt 4 phương thức nhỏ.',vars:v,objs:[O('Car#1',[],{hi:1,tag:'đang chạy Start()'})]});
  c.snap({ln:9,title:'Bước ẩn 1: CheckFuel()',body:'Kiểm tra xăng. Đây là private nên bên ngoài không gọi trực tiếp được.',vars:v,objs:[O('Car#1',[],{hi:1,tag:'CheckFuel() (ẩn)'})]});
  c.snap({ln:10,title:'Bước ẩn 2: Ignite()',body:'Đánh lửa. Cũng là chi tiết bên trong, người dùng không thấy.',vars:v,objs:[O('Car#1',[],{hi:1,tag:'Ignite() (ẩn)'})]});
  c.snap({ln:11,title:'Bước ẩn 3: WarmUp()',body:'Làm nóng máy. Lại một bước người dùng không cần quan tâm.',vars:v,objs:[O('Car#1',[],{hi:1,tag:'WarmUp() (ẩn)'})]});
  c.out('Xe sẵn sàng');
  c.snap({ln:14,title:'Bước ẩn 4: ShowReady()',body:'Báo xe sẵn sàng và in ra màn hình.',vars:v,objs:[O('Car#1',[],{hi:1,tag:'ShowReady() (ẩn)'})]});
  c.snap({ln:18,title:'Xong',body:'Start() chạy xong. Người gọi chỉ biết một dòng car.Start(), còn 4 bước kia vẫn nằm ẩn trong lớp.',note:'Người gọi không cần biết các bước bên trong. Giấu chi tiết, chỉ lộ phần cần dùng: đó là trừu tượng.',vars:v,objs:[O('Car#1',[])]});
 }}
};
