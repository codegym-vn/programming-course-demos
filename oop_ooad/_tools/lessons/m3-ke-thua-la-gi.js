// META {"module":3,"lesson":"Giới thiệu về Kế thừa","activity":"Kế thừa là gì?","title":"Kế thừa là gì?","lead":"Lớp con có sẵn trường và phương thức của lớp cha. Bấm <b>Bước tiếp</b> để xem C# tìm phương thức ở đâu.","tabs":[["x","Dog kế thừa Animal"]]}
function UM(hiA,hiD,hiLink){
 return {boxes:[
  {id:'A',name:'Animal',attrs:['+ Name: string'],methods:[{t:'+ Eat(): void',hi:hiA==='Eat'}],c:0,r:0,hi:hiA?1:0},
  {id:'D',name:'Dog',attrs:[],methods:[{t:'+ Bark(): void',hi:hiD==='Bark'}],c:0,r:1,hi:hiD?1:0}],
  links:[{a:'D',b:'A',type:'inherit',hi:hiLink?1:0}]};
}
var EX = {x:{inputs:[],
 intro:'Dog chỉ tự viết Bark(), nhưng vẫn gọi được Eat() của Animal. Bấm "Bước tiếp".',
 lines:function(){return [
  'class Animal','{','  public string Name;','  public void Eat()','  {','    Console.WriteLine($"{Name} ăn");','  }','}',
  'class Dog : Animal','{','  public void Bark()','  {','    Console.WriteLine("Gâu!");','  }','}','',
  'Dog dog = new Dog();','dog.Name = "Lu";','dog.Eat();','dog.Bark();'];},
 run:function(c){
  c.snap({ln:16,title:'new Dog() tạo đối tượng',body:'Đối tượng Dog gồm hai phần: phần thừa hưởng từ Animal (Name) và phần của riêng Dog. Dog không tự viết Name nhưng vẫn có.',
   vars:[['dog','→ Dog#1',1]],objs:[O('Dog#1',[['Name (phần của Animal)','null','hi']],{hi:1,tag:'Dog : Animal'})],uml:UM(0,0,0)});
  c.snap({ln:17,title:'Gán Name',body:'dog.Name dùng được dù Name được khai báo trong Animal, vì Dog kế thừa Animal.',
   vars:[['dog','→ Dog#1']],objs:[O('Dog#1',[['Name (phần của Animal)',S('Lu'),'hi']],{hi:1})],uml:UM(0,0,0)});
  c.snap({ln:18,title:'Gọi dog.Eat(): tìm trong Dog',body:'C# tìm Eat() trong lớp Dog trước. Dog không có Eat().',
   vars:[['dog','→ Dog#1']],objs:[O('Dog#1',[['Name (phần của Animal)',S('Lu')]],{hi:1})],uml:UM(0,'Eat',0)});
  c.snap({ln:3,title:'Không thấy, lên Animal',body:'C# đi lên lớp cha Animal và tìm thấy Eat() ở đó.',
   vars:[['dog','→ Dog#1']],objs:[O('Dog#1',[['Name (phần của Animal)',S('Lu'),'ok']],{hi:1,tag:'đang chạy Animal.Eat()'})],uml:UM('Eat',0,1)});
  c.out('Lu ăn');
  c.snap({ln:5,title:'Chạy Eat()',body:'Eat() đọc Name của chính đối tượng này và in "Lu ăn".',
   vars:[['dog','→ Dog#1']],objs:[O('Dog#1',[['Name (phần của Animal)',S('Lu'),'ok']],{hi:1,tag:'đang chạy Animal.Eat()'})],uml:UM('Eat',0,1)});
  c.snap({ln:19,title:'Gọi dog.Bark(): thấy ngay',body:'Bark() nằm ngay trong Dog nên C# không cần đi lên lớp cha.',
   vars:[['dog','→ Dog#1']],objs:[O('Dog#1',[['Name (phần của Animal)',S('Lu')]],{hi:1,tag:'đang chạy Dog.Bark()'})],uml:UM(0,'Bark',0)});
  c.out('Gâu!');
  c.snap({ln:12,title:'Xong',body:'Bark() in "Gâu!". Dog dùng được cả Eat() của cha lẫn Bark() của riêng mình.',
   note:'Lớp con có sẵn mọi thứ của lớp cha. C# tìm phương thức ở lớp con trước, không thấy thì đi lên lớp cha.',
   vars:[['dog','→ Dog#1']],objs:[O('Dog#1',[['Name (phần của Animal)',S('Lu')]])],uml:UM(0,'Bark',0)});
 }}};
