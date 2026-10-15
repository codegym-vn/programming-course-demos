// META {"module":7,"lesson":"Tổng quan về mối quan hệ giữa các lớp và Kế thừa","activity":"Biểu diễn Kế thừa trong sơ đồ lớp UML","title":"Kế thừa trong sơ đồ lớp","lead":"Bên trái là code, bên phải là sơ đồ. Bấm <b>Bước tiếp</b> để đọc từng dòng code và vẽ phần tương ứng.","tabs":[["x","Animal, Dog, Cat"]]}
function U(n){
 var B=[{id:'A',name:'Animal',methods:['+ Eat(): void'],c:0,r:0},{id:'D',name:'Dog',c:0,r:1},{id:'C',name:'Cat',c:1,r:1}];
 var L=[{a:'D',b:'A',type:'inherit'},{a:'C',b:'A',type:'inherit'}];
 return function(boxN,linkN,hiId){
  return {boxes:B.slice(0,boxN).map(function(b){return {id:b.id,name:b.name,methods:b.methods,c:b.c,r:b.r,hi:b.id===hiId};}),links:L.slice(0,linkN).map(function(l,i){return {a:l.a,b:l.b,type:l.type,hi:i===linkN-1};})};
 };
}
var EX = {x:{
 intro:'Mỗi dòng code sẽ được vẽ thành một phần của sơ đồ. Bấm "Bước tiếp".',
 running:'Mũi tên kế thừa đi từ lớp con lên lớp cha.',
 done:'Dog và Cat đều có mũi tên chỉ về Animal. Mũi tên luôn chỉ về lớp cha.',
 note:'Mũi tên kế thừa luôn chỉ về lớp cha.',
 cols:[
 {title:'Code C#',sub:'Đọc từng dòng.',
  lines:['class Animal','{','  public void Eat() { }','}','class Dog : Animal','{ }','class Cat : Animal','{ }'],
  run:function(c){
   c.snap({ln:0,title:'Lớp Animal',body:'Khai báo lớp cha Animal.'});
   c.snap({ln:2,title:'Phương thức Eat',body:'Animal có phương thức Eat.'});
   c.snap({ln:4,title:'Lớp Dog',body:'Dog : Animal nghĩa là Dog kế thừa Animal.'});
   c.snap({ln:4,title:'Dog kế thừa Animal',body:'Dấu hai chấm chính là quan hệ kế thừa.'});
   c.snap({ln:6,title:'Lớp Cat',body:'Cat cũng kế thừa Animal.'});
   c.snap({ln:6,title:'Xong',body:'Hai lớp con cùng một lớp cha.'});
  }},
 {title:'Sơ đồ UML',sub:'Vẽ dần theo code.',
  lines:['hộp Animal','  ngăn phương thức: Eat','hộp Dog','  mũi tên Dog -> Animal','hộp Cat','  mũi tên Cat -> Animal'],
  run:function(c){
   var u=U();
   c.snap({ln:0,title:'Vẽ hộp Animal',body:'Mỗi lớp là một hộp.',uml:u(1,0,'A')});
   c.snap({ln:1,title:'Ghi Eat vào hộp',body:'Phương thức nằm ở ngăn dưới cùng, có dấu + vì public.',uml:u(1,0,'A')});
   c.snap({ln:2,title:'Vẽ hộp Dog',body:'Hộp mới đặt bên dưới Animal.',uml:u(2,0,'D')});
   c.snap({ln:3,title:'Mũi tên kế thừa',body:'Tam giác rỗng nằm ở Animal, vì Animal là lớp cha.',uml:u(2,1)});
   c.snap({ln:4,title:'Vẽ hộp Cat',body:'Cat đặt cạnh Dog.',uml:u(3,1,'C')});
   c.snap({ln:5,title:'Mũi tên Cat',body:'Cat cũng chỉ về Animal. Hai mũi tên cùng đến một lớp cha.',uml:u(3,2)});
  }}
 ]}};
