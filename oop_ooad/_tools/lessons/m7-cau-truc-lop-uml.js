// META {"module":7,"lesson":"Làm quen với Sơ đồ lớp UML và các thành phần cơ bản","activity":"Cấu trúc của một lớp trong UML","title":"Cấu trúc một lớp trong UML","lead":"Hộp lớp có 3 ngăn: tên, thuộc tính, phương thức. Bấm <b>Bước tiếp</b> để vẽ dần hộp BankAccount.","tabs":[["x","Hộp BankAccount"]]}
var EX = {x:{
 inputs:[],
 intro:'Ta vẽ lớp BankAccount từng ngăn một. Bấm "Bước tiếp".',
 lines:function(){return [
  'class BankAccount',
  '{',
  '  private decimal balance;',
  '  protected string branch;',
  '  public void Deposit(',
  '    decimal amount)',
  '  { }',
  '}'];},
 run:function(c){
  var A=['- balance: decimal','# branch: string'];
  var M=['+ Deposit(amount: decimal): void'];
  var u=function(na,nm,ha,hm){
   return {boxes:[{id:'B',name:'BankAccount',c:0,r:0,
    attrs:A.slice(0,na).map(function(t,i){return {t:t,hi:ha===i};}),
    methods:M.slice(0,nm).map(function(t,i){return {t:t,hi:hm===i};}),hi:ha===undefined&&hm===undefined}],links:[]};};
  c.snap({ln:0,title:'Ngăn tên',body:'Ngăn trên cùng chứa tên lớp: BankAccount.',uml:u(0,0)});
  c.snap({ln:2,title:'Ngăn thuộc tính',body:'Ngăn giữa liệt kê thuộc tính. Dấu - nghĩa là private. Bên ngoài lớp không truy cập được.',uml:u(1,0,0)});
  c.snap({ln:2,title:'Kiểu viết sau dấu hai chấm',body:'UML viết tên trước rồi kiểu sau dấu hai chấm: balance: decimal. Trong C# thì kiểu viết trước tên.',uml:u(1,0,0)});
  c.snap({ln:3,title:'Dấu # là protected',body:'# nghĩa là protected: lớp con được dùng, bên ngoài thì không.',uml:u(2,0,1)});
  c.snap({ln:4,title:'Ngăn phương thức',body:'Ngăn dưới cùng liệt kê phương thức. Dấu + nghĩa là public, ai cũng gọi được.',uml:u(2,1,undefined,0)});
  c.snap({ln:5,title:'Tham số và kiểu trả về',body:'Tham số nằm trong ngoặc: amount: decimal. Sau dấu hai chấm cuối là kiểu trả về: void.',uml:u(2,1,undefined,0)});
  c.snap({ln:7,title:'Xong',body:'Ba ngăn: tên, thuộc tính, phương thức. Mỗi dòng bắt đầu bằng một ký hiệu truy cập.',
   note:'+ là public, - là private, # là protected. Kiểu viết sau dấu hai chấm.',uml:u(2,1)});
 }}};
