// META {"module":7,"lesson":"Tổng quan về mối quan hệ giữa các lớp và Kế thừa","activity":"Giới thiệu các loại mối quan hệ giữa các lớp","title":"5 loại quan hệ giữa các lớp","lead":"Mỗi tab là một loại quan hệ với ký hiệu UML riêng. Bấm <b>Bước tiếp</b> để vẽ dần mũi tên.","tabs":[["inherit","Kế thừa"],["assoc","Kết hợp"],["aggr","Tập hợp"],["comp","Hợp thành"],["dep","Phụ thuộc"]]}
function T(intro, lines, A, B, type, lk, steps){
 return {inputs:[], intro:intro, lines:function(){return lines;},
  run:function(c){
   steps.forEach(function(s){
    var boxes=[];
    if(s.a) boxes.push({id:'A',name:A.name,attrs:A.attrs||[],methods:A.methods||[],c:A.c,r:A.r,hi:s.a==2});
    if(s.b) boxes.push({id:'B',name:B.name,attrs:B.attrs||[],methods:B.methods||[],c:B.c,r:B.r,hi:s.b==2});
    var links=s.l?[{a:lk[0],b:lk[1],type:type,la:lk[2],lb:lk[3],hi:true}]:[];
    var o={ln:s.ln,title:s.t,body:s.b2,uml:{boxes:boxes,links:links}};
    if(s.note)o.note=s.note;
    c.snap(o);
   });
  }};
}
var EX = {
 inherit: T('Kế thừa: lớp con là một loại của lớp cha. Bấm "Bước tiếp".',
  ['class Animal','{ }','class Dog : Animal','{','  public void Bark() { }','}'],
  {name:'Animal',c:0,r:0}, {name:'Dog',methods:['+ Bark(): void'],c:0,r:1}, 'inherit', ['B','A'],
  [{ln:0,t:'Vẽ lớp cha',b2:'Animal là lớp cha, vẽ thành một hộp.',a:2},
   {ln:2,t:'Vẽ lớp con',b2:'Dog : Animal nghĩa là Dog kế thừa Animal. Dog là một hộp riêng.',a:1,b:2},
   {ln:2,t:'Mũi tên kế thừa',b2:'Nét liền, đầu là tam giác rỗng, chỉ từ lớp con (Dog) lên lớp cha (Animal).',a:1,b:1,l:1},
   {ln:2,t:'Xong',b2:'Dog là một Animal: Dog dùng lại mọi thứ của Animal.',a:1,b:1,l:1,note:'Kế thừa: nét liền, tam giác rỗng, đầu tam giác nằm ở lớp cha.'}]),
 assoc: T('Kết hợp: hai lớp biết nhau nhưng mỗi bên sống độc lập. Bấm "Bước tiếp".',
  ['class Student { }','class Teacher','{','  public List<Student> Students;','}'],
  {name:'Teacher',attrs:['+ Students: List'],c:0,r:0}, {name:'Student',c:1,r:0}, 'assoc', ['A','B','1','*'],
  [{ln:1,t:'Vẽ lớp Teacher',b2:'Teacher là một hộp lớp.',a:2},
   {ln:0,t:'Vẽ lớp Student',b2:'Student là hộp thứ hai.',a:1,b:2},
   {ln:3,t:'Teacher giữ danh sách Student',b2:'Teacher có thuộc tính trỏ tới Student, nên hai lớp biết nhau.',a:2,b:1},
   {ln:3,t:'Đường thẳng',b2:'Kết hợp vẽ bằng một đường thẳng nối hai hộp, không có hình ở đầu. Hai số nhỏ là đa số (1 Teacher, nhiều Student).',a:1,b:1,l:1},
   {ln:3,t:'Xong',b2:'Hai bên chỉ biết nhau, không bên nào sở hữu bên kia.',a:1,b:1,l:1,note:'Kết hợp: một đường thẳng nối hai lớp.'}]),
 aggr: T('Tập hợp: toàn thể chứa bộ phận nhưng bộ phận sống độc lập. Bấm "Bước tiếp".',
  ['class Player { }','class Team','{','  public List<Player> Players;','}'],
  {name:'Team',attrs:['+ Players: List'],c:0,r:0}, {name:'Player',c:1,r:0}, 'aggr', ['A','B','1','*'],
  [{ln:1,t:'Vẽ lớp toàn thể',b2:'Team là toàn thể (đội).',a:2},
   {ln:0,t:'Vẽ lớp bộ phận',b2:'Player là bộ phận (cầu thủ).',a:1,b:2},
   {ln:3,t:'Team chứa danh sách Player',b2:'Team giữ các Player được tạo ở bên ngoài.',a:2,b:1},
   {ln:3,t:'Thoi rỗng',b2:'Vẽ đường nối, đầu thoi rỗng nằm ở phía toàn thể (Team).',a:1,b:1,l:1},
   {ln:3,t:'Xong',b2:'Team mất đi thì Player vẫn còn.',a:1,b:1,l:1,note:'Tập hợp: thoi rỗng ở phía toàn thể.'}]),
 comp: T('Hợp thành: bộ phận do toàn thể tạo ra và mất cùng toàn thể. Bấm "Bước tiếp".',
  ['class Room { }','class House','{','  Room r = new Room();','}'],
  {name:'House',attrs:['- r: Room'],c:0,r:0}, {name:'Room',c:1,r:0}, 'comp', ['A','B','1','1'],
  [{ln:2,t:'Vẽ lớp toàn thể',b2:'House là toàn thể (ngôi nhà).',a:2},
   {ln:0,t:'Vẽ lớp bộ phận',b2:'Room là bộ phận (căn phòng).',a:1,b:2},
   {ln:3,t:'House tự tạo Room',b2:'new Room() nằm ngay trong House: House tạo và sở hữu Room.',a:2,b:1},
   {ln:3,t:'Thoi đặc',b2:'Vẽ đường nối, đầu thoi đặc (tô kín) nằm ở phía toàn thể (House).',a:1,b:1,l:1},
   {ln:3,t:'Xong',b2:'House mất đi thì Room mất theo.',a:1,b:1,l:1,note:'Hợp thành: thoi đặc ở phía toàn thể.'}]),
 dep: T('Phụ thuộc: một lớp chỉ dùng lớp khác tạm thời. Bấm "Bước tiếp".',
  ['class Report { }','class Printer','{','  public void Print(Report r)','  { }','}'],
  {name:'Printer',methods:['+ Print(r: Report)'],c:0,r:0}, {name:'Report',c:1,r:0}, 'dep', ['A','B'],
  [{ln:1,t:'Vẽ lớp Printer',b2:'Printer là một hộp lớp.',a:2},
   {ln:0,t:'Vẽ lớp Report',b2:'Report là hộp thứ hai.',a:1,b:2},
   {ln:3,t:'Report chỉ là tham số',b2:'Printer không lưu Report, chỉ nhận nó vào phương thức Print rồi dùng xong là thôi.',a:2,b:1},
   {ln:3,t:'Mũi tên nét đứt',b2:'Phụ thuộc vẽ bằng nét đứt, mũi tên chỉ về lớp được dùng (Report).',a:1,b:1,l:1},
   {ln:3,t:'Xong',b2:'Nếu Report đổi, Printer có thể phải sửa theo.',a:1,b:1,l:1,note:'Phụ thuộc: mũi tên nét đứt, chỉ về lớp được dùng.'}])
};
