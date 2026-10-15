// META {"module":3,"lesson":"Các khái niệm cơ bản của Kế thừa trong C#","activity":"Cú pháp Kế thừa trong C#","title":"Cú pháp kế thừa và constructor","lead":"Dấu <b>:</b> khai báo kế thừa, <b>: base(...)</b> truyền tham số lên cha. Bấm <b>Bước tiếp</b> để xem thứ tự chạy constructor.","tabs":[["x","new Dog(\"Lu\", \"Corgi\")"]]}
var EX = {x:{inputs:[],
 intro:'Tạo Dog với tên và giống. Để ý constructor của cha chạy trước constructor của con. Bấm "Bước tiếp".',
 lines:function(){return [
  'class Animal','{','  public string Name;','  public Animal(string name)','  {','    Console.WriteLine("Animal ctor");','    Name = name;','  }','}',
  'class Dog : Animal','{','  public string Breed;','  public Dog(string name,','    string breed)','    : base(name)','  {','    Console.WriteLine("Dog ctor");','    Breed = breed;','  }','}','',
  'var d = new Dog("Lu", "Corgi");'];},
 run:function(c){
  var V=[['d','→ Dog#1']];
  function OB(n,b,hn,hb,tag){return [O('Dog#1',[['Name (của Animal)',n,hn],['Breed (của Dog)',b,hb]],{hi:1,tag:tag})];}
  c.snap({ln:21,title:'new Dog("Lu", "Corgi")',body:'new cấp bộ nhớ cho đối tượng Dog: các trường đều có giá trị mặc định (null). Chưa có constructor nào chạy.',
   vars:[],objs:OB('null','null','','','vừa cấp bộ nhớ')});
  c.snap({ln:12,title:'Vào constructor Dog',body:'Constructor Dog nhận name = "Lu", breed = "Corgi". Nhưng thân của nó chưa chạy ngay.',
   vars:[['name',S('Lu')],['breed',S('Corgi')]],objs:OB('null','null','','','đang vào Dog(...)')});
  c.snap({ln:14,title:': base(name) nhảy lên cha',body:': base(name) chuyển name = "Lu" lên constructor của Animal. Cha luôn chạy trước con.',
   vars:[['name',S('Lu'),1]],objs:OB('null','null','','','đang vào Animal(name)')});
  c.out('Animal ctor');
  c.snap({ln:5,title:'Thân constructor Animal',body:'Constructor của Animal chạy trước và in "Animal ctor".',
   vars:[['name',S('Lu')]],objs:OB('null','null','','','đang chạy Animal(name)')});
  c.snap({ln:6,title:'Animal gán Name',body:'Name = name, nên Name của đối tượng bây giờ là "Lu". Constructor Animal kết thúc.',
   vars:[['name',S('Lu')]],objs:OB(S('Lu'),'null','hi','','đang chạy Animal(name)')});
  c.out('Dog ctor');
  c.snap({ln:16,title:'Quay lại thân Dog',body:'Cha xong rồi, giờ mới chạy thân constructor Dog và in "Dog ctor".',
   vars:[['name',S('Lu')],['breed',S('Corgi')]],objs:OB(S('Lu'),'null','','','đang chạy Dog(...)')});
  c.snap({ln:17,title:'Dog gán Breed',body:'Breed = breed, nên Breed là "Corgi".',
   vars:[['name',S('Lu')],['breed',S('Corgi')]],objs:OB(S('Lu'),S('Corgi'),'','hi','đang chạy Dog(...)')});
  c.snap({ln:21,title:'Xong',body:'Console in "Animal ctor" rồi "Dog ctor". Biến d trỏ tới Dog#1 đã có Name và Breed.',
   note:'Constructor cha chạy trước, constructor con chạy sau. Dùng : base(...) để truyền tham số lên constructor của cha.',
   vars:V,objs:OB(S('Lu'),S('Corgi'),'','','')});
 }}};
