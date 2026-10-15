// META {"module":5,"lesson":"So sánh và Lựa chọn giữa Abstract Class và Interface","activity":"So sánh chi tiết Abstract Class và Interface (Phần 1: Khác biệt cấu trúc và khả năng)","title":"Abstract Class và Interface","lead":"Hai cột so sánh cùng bốn tiêu chí. Bấm <b>Bước tiếp</b> để cả hai cột cùng xét một tiêu chí.","tabs":[["x","Bốn tiêu chí"]]}
var CMP_CRIT = ['Có trường?','Có constructor?','Có code sẵn?','Kế thừa nhiều?'];
var RES_AB = [1,1,1,0], RES_IF = [0,0,0,1];
function cmpRun(res, lnList, bodies, intro, lastLn){
 return function(c){
  var cum=[];
  c.snap({ln:0,title:'Bắt đầu',body:intro});
  for(var i=0;i<4;i++){
   cum.push([CMP_CRIT[i], res[i]?'✓ Có':'✗ Không', 1]);
   var v=cum.map(function(r,k){return [r[0],r[1],k==i?1:0];});
   c.snap({ln:lnList[i],title:CMP_CRIT[i],body:bodies[i],vars:v});
  }
  var v2=cum.map(function(r){return [r[0],r[1]];});
  c.snap({ln:lastLn,title:'Xong',body:'Được '+res.filter(function(x){return x;}).length+'/4 tiêu chí.',vars:v2});
 };
}
var EX = {x:{
 intro:'Cùng bốn câu hỏi, xem abstract class và interface trả lời khác nhau thế nào.',
 running:'Mỗi bước là một tiêu chí. Dấu ✓ là có, ✗ là không.',
 done:'Abstract class: '+RES_AB.filter(function(x){return x;}).length+'/4 (có trường, constructor, code sẵn; chỉ một cha). Interface: '+RES_IF.filter(function(x){return x;}).length+'/4 (chỉ khác ở chỗ thực thi được nhiều interface).',
 note:'Abstract class: có trường, constructor, code chung, nhưng chỉ một cha. Interface: chỉ là hợp đồng, nhưng một lớp thực thi được nhiều interface.',
 cols:[
 {title:'Abstract class',sub:'Lớp dở dang, có thể có code.',
  lines:['abstract class Animal','{','  protected string name;','  public Animal(string n)','    { name = n; }','  public void Sleep()','    => Console.WriteLine("Ngủ");','  public abstract void Eat();','}','// class Dog : Animal, Cat','// lỗi CS1721: chỉ một lớp cha'],
  run:cmpRun(RES_AB,[2,3,5,9],
   ['Abstract class có trường (name), giống lớp thường.','Có constructor để khởi tạo trường, lớp con sẽ gọi qua base.','Sleep() có thân sẵn, lớp con dùng luôn không cần viết lại.','Chỉ được kế thừa một lớp. class Dog : Animal, Cat bị lỗi CS1721.'],
   'Animal vừa có phần làm sẵn, vừa có phần abstract để lớp con làm.',0)},
 {title:'Interface',sub:'Chỉ là hợp đồng.',
  lines:['interface IEater','{','  void Eat();','}','interface ISleeper','{','  void Sleep();','}','// Không trường/constructor','// Chỉ khai báo, không có thân','// class Dog : IEater, ISleeper'],
  run:cmpRun(RES_IF,[8,8,9,10],
   ['Interface không chứa trường dữ liệu, chỉ khai báo thành viên.','Interface không có constructor vì không tạo đối tượng.','Chỉ khai báo Eat(), không có thân. (C# mới cho phép thân mặc định nhưng rất ít dùng ở mức cơ bản.)','Một lớp thực thi được nhiều interface cùng lúc: Dog : IEater, ISleeper.'],
   'IEater và ISleeper chỉ liệt kê những gì phải làm.',0)}
 ]}};
