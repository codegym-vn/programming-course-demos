// META {"module":7,"lesson":"Làm quen với Sơ đồ lớp UML và các thành phần cơ bản","activity":"Đối chiếu mã C# với sơ đồ lớp UML đơn giản","title":"Đối chiếu mã C# với UML","lead":"Mỗi bước tô sáng một dòng code và dòng UML tương ứng. Bấm <b>Bước tiếp</b> để chạy.","tabs":[["book","Lớp Book"],["prod","Property và constructor"]]}
function V(name,attrs,methods){
 return function(na,nm,hi){
  return {boxes:[{id:'B',name:name,c:0,r:0,
   attrs:attrs.slice(0,na).map(function(t,i){return {t:t,hi:hi===i};}),
   methods:methods.slice(0,nm).map(function(t,i){return {t:t,hi:hi===na+i};})}],links:[]};};
}
var ub=V('Book',['- title: string','- price: decimal'],['+ Show(): void','+ GetPrice(): decimal']);
var up=V('Product',['- id: int','+ Name: string'],['+ Product(id: int)']);
var EX = {
 book:{
  intro:'Mỗi dòng trong lớp Book tương ứng một dòng trong hộp UML. Bấm "Bước tiếp".',
  running:'Để ý: private thành dấu -, public thành dấu +, kiểu đặt sau dấu hai chấm.',
  done:'Mọi dòng code đều có một dòng UML tương ứng.',
  note:'private là -, public là +, kiểu viết sau dấu hai chấm.',
  cols:[
  {title:'Code C#',sub:'Lớp Book',
   lines:['class Book','{','  private string title;','  private decimal price;','  public void Show() { }','  public decimal GetPrice()','    => price;','}'],
   run:function(c){
    c.snap({ln:0,title:'Tên lớp',body:'class Book: tên lớp là Book.'});
    c.snap({ln:2,title:'Trường title',body:'private nên đổi thành dấu -. Kiểu string nằm trước tên.'});
    c.snap({ln:3,title:'Trường price',body:'private decimal price: cũng là private.'});
    c.snap({ln:4,title:'Phương thức Show',body:'public nên là dấu +. Trả về void.'});
    c.snap({ln:5,title:'Phương thức GetPrice',body:'public, trả về decimal.'});
    c.snap({ln:7,title:'Xong',body:'Đã đọc hết lớp Book.'});
   }},
  {title:'Hộp UML',sub:'Book',
   lines:['Book','- title: string','- price: decimal','+ Show(): void','+ GetPrice(): decimal'],
   run:function(c){
    c.snap({ln:0,title:'Ngăn tên',body:'Ngăn trên cùng ghi tên lớp.',uml:ub(0,0)});
    c.snap({ln:1,title:'- title: string',body:'private thành -. Tên viết trước, kiểu sau dấu hai chấm.',uml:ub(1,0,0)});
    c.snap({ln:2,title:'- price: decimal',body:'Cũng private nên dùng dấu -.',uml:ub(2,0,1)});
    c.snap({ln:3,title:'+ Show(): void',body:'public thành +, kiểu trả về viết sau dấu hai chấm.',uml:ub(2,1,2)});
    c.snap({ln:4,title:'+ GetPrice(): decimal',body:'Kiểu trả về decimal nằm sau dấu hai chấm.',uml:ub(2,2,3)});
    c.snap({ln:4,title:'Xong',body:'Hộp UML đã đủ ba ngăn.',uml:ub(2,2)});
   }}]},
 prod:{
  intro:'Lớp Product có property và constructor. Bấm "Bước tiếp".',
  running:'Property vẽ như thuộc tính. Constructor vẽ như phương thức nhưng không có kiểu trả về.',
  done:'Property thành một dòng thuộc tính, constructor thành một dòng phương thức không có kiểu trả về.',
  note:'Property vẽ như thuộc tính, constructor vẽ như phương thức không có kiểu trả về.',
  cols:[
  {title:'Code C#',sub:'Lớp Product',
   lines:['class Product','{','  private int id;','  public string Name','    { get; set; }','  public Product(int id)','  {','    this.id = id;','  }','}'],
   run:function(c){
    c.snap({ln:0,title:'Tên lớp',body:'class Product: tên lớp là Product.'});
    c.snap({ln:2,title:'Trường id',body:'private int id: trường private.'});
    c.snap({ln:3,title:'Property Name',body:'Property public có get và set.'});
    c.snap({ln:5,title:'Constructor',body:'Constructor trùng tên lớp và không có kiểu trả về.'});
    c.snap({ln:9,title:'Xong',body:'Đã đọc hết lớp Product.'});
   }},
  {title:'Hộp UML',sub:'Product',
   lines:['Product','- id: int','+ Name: string','+ Product(id: int)'],
   run:function(c){
    c.snap({ln:0,title:'Ngăn tên',body:'Ngăn trên cùng ghi tên lớp.',uml:up(0,0)});
    c.snap({ln:1,title:'- id: int',body:'private thành -, kiểu int viết sau dấu hai chấm.',uml:up(1,0,0)});
    c.snap({ln:2,title:'+ Name: string',body:'Property public vẽ như một thuộc tính, dấu +.',uml:up(2,0,1)});
    c.snap({ln:3,title:'+ Product(id: int)',body:'Constructor vẽ trong ngăn phương thức, không có kiểu trả về.',uml:up(2,1,2)});
    c.snap({ln:3,title:'Xong',body:'Hộp UML đã đủ ba ngăn.',uml:up(2,1)});
   }}]}
};
