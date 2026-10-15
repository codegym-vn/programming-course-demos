// META {"module":1,"lesson":"Giới thiệu Lập trình hướng đối tượng (OOP)","activity":"Các khái niệm cốt lõi của OOP (Tổng quan)","title":"4 trụ cột của OOP","lead":"Mỗi trụ cột có một ví dụ nhỏ. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["dg","Đóng gói"],["kt","Kế thừa"],["dh","Đa hình"],["tt","Trừu tượng"]]}
var EX = {
dg:{inputs:[],
 intro:'Số dư tài khoản được giấu đi, chỉ đổi qua phương thức Deposit có kiểm tra. Bấm "Bước tiếp".',
 lines:function(){return ['class Account','{','  private decimal balance;','  public void Deposit(decimal x)','  {','    if (x > 0)','      balance += x;','  }','}','','var acc = new Account();','acc.Deposit(100);','acc.Deposit(-50);'];},
 run:function(c){
  c.snap({ln:10,title:'Tạo tài khoản',body:'balance là private nên code bên ngoài không sửa trực tiếp được. Ban đầu balance = 0.',vars:[['acc','→ Account#1',1]],objs:[O('Account#1',[['balance (private)',0]],{hi:1})]});
  c.snap({ln:6,title:'Deposit(100)',body:'x = 100 lớn hơn 0 nên hợp lệ, balance tăng lên 100.',vars:[['acc','→ Account#1'],['x',100]],objs:[O('Account#1',[['balance (private)',100,'hi']],{hi:1})]});
  c.snap({ln:5,title:'Deposit(-50) bị chặn',body:'x = -50 không lớn hơn 0 nên phương thức bỏ qua, balance giữ nguyên 100.',vars:[['acc','→ Account#1'],['x',-50]],objs:[O('Account#1',[['balance (private)',100,'ok']],{hi:1})]});
  c.snap({ln:12,title:'Xong',body:'Lệnh nạp -50 không làm hỏng dữ liệu.',note:'Đóng gói: giấu dữ liệu và chỉ cho đổi qua phương thức có kiểm tra. Chi tiết ở chương 2.',vars:[['acc','→ Account#1']],objs:[O('Account#1',[['balance (private)',100]])]});
 }},
kt:{inputs:[],
 intro:'Dog kế thừa Animal nên dùng được Eat() mà không cần viết lại. Bấm "Bước tiếp".',
 lines:function(){return ['class Animal','{','  public void Eat()','  {','    Console.WriteLine("Đang ăn");','  }','}','','class Dog : Animal','{ }','','var dog = new Dog();','dog.Eat();'];},
 run:function(c){
  c.snap({ln:8,title:'Dog kế thừa Animal',body:'Dấu hai chấm (: Animal) nghĩa là Dog thừa hưởng mọi thứ public của Animal, kể cả Eat().'});
  c.snap({ln:11,title:'Tạo đối tượng Dog',body:'new Dog() tạo Dog#1. Lớp Dog tự nó không viết gì mà vẫn có Eat().',vars:[['dog','→ Dog#1',1]],objs:[O('Dog#1',[['(kế thừa) Eat()','có']],{hi:1})]});
  c.out('Đang ăn');
  c.snap({ln:4,title:'dog.Eat() chạy',body:'Eat() được viết ở lớp cha Animal nhưng dog dùng được.',vars:[['dog','→ Dog#1']],objs:[O('Dog#1',[['(kế thừa) Eat()','có','hi']],{hi:1,tag:'đang chạy Eat() của Animal'})]});
  c.snap({ln:12,title:'Xong',body:'Dog dùng lại code của Animal.',note:'Kế thừa: lớp con dùng lại những gì lớp cha đã có. Chi tiết ở chương 3.',vars:[['dog','→ Dog#1']],objs:[O('Dog#1',[['(kế thừa) Eat()','có']])]});
 }},
dh:{inputs:[],
 intro:'Cùng một lời gọi a.Speak() nhưng kết quả tùy đối tượng thật mà a đang trỏ tới. Bấm "Bước tiếp".',
 lines:function(){return ['class Animal','{','  public virtual void Speak() { }','}','class Dog : Animal','{','  public override void Speak()','    => Console.WriteLine("Gâu");','}','class Cat : Animal','{','  public override void Speak()','    => Console.WriteLine("Meo");','}','','Animal a = new Dog();','a.Speak();','a = new Cat();','a.Speak();'];},
 run:function(c){
  c.snap({ln:15,title:'a trỏ tới Dog',body:'Biến a có kiểu Animal nhưng đang trỏ tới một đối tượng Dog.',vars:[['a','→ Dog#1',1]],objs:[O('Dog#1',[],{hi:1})]});
  c.out('Gâu');
  c.snap({ln:7,title:'a.Speak() lần 1',body:'Chạy Speak() của đối tượng thật là Dog, nên in "Gâu".',vars:[['a','→ Dog#1']],objs:[O('Dog#1',[],{hi:1,tag:'đang chạy Speak()'})]});
  c.snap({ln:17,title:'a trỏ tới Cat',body:'Cùng biến a, giờ trỏ tới Cat#2. Dog#1 không còn ai tham chiếu, sẽ bị thu hồi.',vars:[['a','→ Cat#2',1]],objs:[O('Dog#1',[],{dim:1}),O('Cat#2',[],{hi:1})]});
  c.out('Meo');
  c.snap({ln:12,title:'Xong',body:'Cùng lời gọi a.Speak() nhưng lần này in "Meo".',note:'Đa hình: cùng một lời gọi, đối tượng khác nhau cho hành vi khác nhau. Chi tiết ở chương 4.',vars:[['a','→ Cat#2']],objs:[O('Dog#1',[],{dim:1}),O('Cat#2',[],{hi:1,tag:'đang chạy Speak()'})]});
 }},
tt:{inputs:[],
 intro:'Người dùng chỉ cần gọi car.Start(), các bước bên trong được ẩn đi. Bấm "Bước tiếp".',
 lines:function(){return ['class Car','{','  private bool running;','  public void Start()','  {','    CheckFuel();','    TurnKey();','    running = true;','  }','  // CheckFuel, TurnKey:','  // các bước private','}','','var car = new Car();','car.Start();'];},
 run:function(c){
  var hid=function(h,d){return AR('Các bước bên trong Start()',['CheckFuel()','TurnKey()','running = true'],h,d.done,d.dim);};
  c.snap({ln:13,title:'Tạo xe',body:'Car#1 chưa chạy: running = false.',vars:[['car','→ Car#1',1]],objs:[O('Car#1',[['running (private)','false']],{hi:1})]});
  c.snap({ln:14,title:'Chỉ gọi car.Start()',body:'Người dùng chỉ thấy một nút Start. Các bước bên trong bị ẩn (mờ), họ không cần biết.',vars:[['car','→ Car#1']],objs:[O('Car#1',[['running (private)','false']],{hi:1})],arrs:[hid([],{done:[],dim:[0,1,2]})]});
  c.snap({ln:7,title:'Bên trong Start() chạy',body:'Kiểm tra xăng, vặn chìa, rồi đặt running = true. Mọi thứ diễn ra bên trong, bên ngoài không cần can thiệp.',vars:[['car','→ Car#1']],objs:[O('Car#1',[['running (private)','true','hi']],{hi:1,tag:'đang chạy Start()'})],arrs:[hid([],{done:[0,1,2],dim:[]})]});
  c.snap({ln:14,title:'Xong',body:'Một lời gọi đơn giản, mọi chi tiết phức tạp được ẩn đi.',note:'Trừu tượng: chỉ để lộ những gì cần dùng, che đi chi tiết bên trong. Chi tiết ở chương 5.',vars:[['car','→ Car#1']],objs:[O('Car#1',[['running (private)','true']])]});
 }}
};
