// META {"module":3,"lesson":"Kế thừa nâng cao: virtual, override, base","activity":"Từ khóa `virtual` và `override`","title":"virtual và override","lead":"Biến kiểu Animal trỏ tới một Dog: phương thức nào sẽ chạy? Chọn tình huống rồi bấm <b>Bước tiếp</b>.","tabs":[["co","Có virtual / override"],["khong","Không virtual (che bằng new)"]]}
function mkEx(virt){
 return {inputs:[],
 intro:virt?'Animal.Speak() là virtual, Dog.Speak() là override. Bấm "Bước tiếp".':'Animal.Speak() không có virtual, Dog.Speak() chỉ che bằng new. Bấm "Bước tiếp".',
 lines:function(){return [
  'class Animal','{',
  virt?'  public virtual void Speak()':'  public void Speak()',
  '  {','    Console.WriteLine("Âm thanh");','  }','}',
  'class Dog : Animal','{',
  virt?'  public override void Speak()':'  public new void Speak()',
  '  {','    Console.WriteLine("Gâu");','  }','}','',
  'Animal a = new Dog();','a.Speak();'];},
 run:function(c){
  var V=[['a (kiểu Animal)','→ Dog#1',1]];
  c.snap({ln:16,title:'Kiểu biến khác kiểu đối tượng',body:'Biến a có kiểu Animal, nhưng đối tượng nó trỏ tới thật ra là Dog. Hai kiểu này khác nhau.',
   vars:V,objs:[O('Dog#1',[['Kiểu của biến a','Animal'],['Kiểu thật của đối tượng','Dog']],{hi:1})]});
  c.snap({ln:17,title:'Gọi a.Speak()',body:virt?'Speak() là virtual, nên C# nhìn đối tượng thật (Dog) để chọn phiên bản.':'Speak() không phải virtual, nên C# chỉ nhìn kiểu của biến (Animal) để chọn phiên bản.',
   vars:V,objs:[O('Dog#1',[['Kiểu của biến a','Animal',virt?'':'hi'],['Kiểu thật của đối tượng','Dog',virt?'hi':'']],{hi:1})]});
  if(virt){
   c.out('Gâu');
   c.snap({ln:12,title:'Chạy Dog.Speak()',body:'Phiên bản override của Dog chạy và in "Gâu".',
    vars:V,objs:[O('Dog#1',[['Kiểu của biến a','Animal'],['Kiểu thật của đối tượng','Dog','ok']],{hi:1,tag:'đang chạy Dog.Speak()'})]});
  }else{
   c.out('Âm thanh');
   c.snap({ln:4,title:'Chạy Animal.Speak()',body:'Phiên bản của Animal chạy và in "Âm thanh". Dog.Speak() có tồn tại nhưng bị bỏ qua.',
    vars:V,objs:[O('Dog#1',[['Kiểu của biến a','Animal','bad'],['Kiểu thật của đối tượng','Dog']],{hi:1,tag:'đang chạy Animal.Speak()'})]});
  }
  c.snap({ln:17,title:'Xong',body:virt?'Kết quả "Gâu": chạy theo đối tượng thật.':'Kết quả "Âm thanh": chạy theo kiểu của biến.',
   note:virt?'virtual + override: phương thức chạy theo đối tượng thật, không theo kiểu biến.':'Không có virtual/override (chỉ che bằng new): phương thức chạy theo kiểu của biến, không theo đối tượng thật.',
   vars:V,objs:[O('Dog#1',[['Kiểu của biến a','Animal'],['Kiểu thật của đối tượng','Dog']])]});
 }};
}
var EX = {co:mkEx(true),khong:mkEx(false)};
