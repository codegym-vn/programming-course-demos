// META {"module":2,"lesson":"Các Thành phần của Lớp: Trường và Phương thức","activity":"Trường (Fields) trong C#","title":"Trường (Fields)","lead":"Trường là dữ liệu của đối tượng. Chọn tình huống rồi bấm <b>Bước tiếp</b>.","tabs":[["md","Giá trị mặc định"],["rieng","Mỗi đối tượng một bản"]]}
var EX = {
md:{inputs:[],
 intro:'Tạo một Student mà chưa gán gì, xem các trường có giá trị gì. Bấm "Bước tiếp".',
 lines:function(){return ['class Student','{','  public string Name;','  public int Age;','  public bool IsActive;','}','','var s = new Student();','s.Name = "An";','s.Age = 18;','s.IsActive = true;'];},
 run:function(c){
  var V=[['s','→ Student#1']];
  c.snap({ln:7,title:'new Student() chưa gán gì',body:'Trường chưa gán vẫn có giá trị mặc định: chuỗi là null, số nguyên là 0, bool là false.',vars:[['s','→ Student#1',1]],objs:[O('Student#1',[['Name','null','hi'],['Age',0,'hi'],['IsActive','false','hi']],{hi:1})]});
  c.snap({ln:8,title:'Gán Name',body:'s.Name = "An" thay null bằng một chuỗi.',vars:V,objs:[O('Student#1',[['Name',S('An'),'hi'],['Age',0],['IsActive','false']],{hi:1})]});
  c.snap({ln:9,title:'Gán Age',body:'s.Age = 18 thay số 0 mặc định.',vars:V,objs:[O('Student#1',[['Name',S('An')],['Age',18,'hi'],['IsActive','false']],{hi:1})]});
  c.snap({ln:10,title:'Gán IsActive',body:'s.IsActive = true thay false mặc định.',vars:V,objs:[O('Student#1',[['Name',S('An')],['Age',18],['IsActive','true','hi']],{hi:1})]});
  c.snap({ln:10,title:'Xong',body:'Cả ba trường đã có giá trị do ta gán.',note:'Trường chưa gán có giá trị mặc định: null (chuỗi, đối tượng), 0 (số), false (bool).',vars:V,objs:[O('Student#1',[['Name',S('An')],['Age',18],['IsActive','true']])]});
 }},
rieng:{inputs:[],
 intro:'Hai đối tượng cùng lớp, mỗi đối tượng có ô Age riêng. Bấm "Bước tiếp".',
 lines:function(){return ['class Student','{','  public int Age;','}','','var s1 = new Student();','var s2 = new Student();','s1.Age = 18;','s2.Age = 20;','s1.Age = 19;'];},
 run:function(c){
  c.snap({ln:5,title:'Tạo s1',body:'Student#1 có trường Age = 0.',vars:[['s1','→ Student#1',1]],objs:[O('Student#1',[['Age',0]],{hi:1})]});
  c.snap({ln:6,title:'Tạo s2',body:'Student#2 là đối tượng khác, có ô Age riêng.',vars:[['s1','→ Student#1'],['s2','→ Student#2',1]],objs:[O('Student#1',[['Age',0]]),O('Student#2',[['Age',0]],{hi:1})]});
  c.snap({ln:7,title:'s1.Age = 18',body:'Chỉ ô Age của Student#1 đổi.',vars:[['s1','→ Student#1'],['s2','→ Student#2']],objs:[O('Student#1',[['Age',18,'hi']],{hi:1}),O('Student#2',[['Age',0]])]});
  c.snap({ln:8,title:'s2.Age = 20',body:'Chỉ ô Age của Student#2 đổi, Student#1 vẫn 18.',vars:[['s1','→ Student#1'],['s2','→ Student#2']],objs:[O('Student#1',[['Age',18]]),O('Student#2',[['Age',20,'hi']],{hi:1})]});
  c.snap({ln:9,title:'s1.Age = 19',body:'Đổi s1 thì ô s1 tô vàng, còn ô của s2 giữ nguyên 20.',vars:[['s1','→ Student#1'],['s2','→ Student#2']],objs:[O('Student#1',[['Age',19,'hi']],{hi:1}),O('Student#2',[['Age',20]])]});
  c.snap({ln:9,title:'Xong',body:'Hai đối tượng, hai giá trị Age khác nhau.',note:'Mỗi đối tượng giữ một bản trường riêng; đổi đối tượng này không ảnh hưởng đối tượng kia.',vars:[['s1','→ Student#1'],['s2','→ Student#2']],objs:[O('Student#1',[['Age',19]]),O('Student#2',[['Age',20]])]});
 }}};
