// META {"module":8,"lesson":"Nguyên tắc Tách biệt Giao diện (Interface Segregation Principle - ISP)","activity":"So sánh thiết kế với và không có ISP","title":"Interface nhỏ, đúng nhu cầu","lead":"Robot làm việc nhưng không ăn. Bấm <b>Bước tiếp</b> để so sánh interface to và interface nhỏ.","tabs":[["x","Vòng gọi Eat"]]}
var EX = {x:(function(){
 var L = ['interface IWorker','{','  void Work();','  void Eat();','}','class Human : IWorker','{','  public string Name;','  public void Work() { }','  public void Eat()','    => Console.WriteLine(','      Name + " ăn cơm");','}','class Robot : IWorker','{','  public void Work() { }','  public void Eat()','    => throw new','      NotSupportedException();','}','var list = new List<IWorker>','{','  new Human { Name = "An" },','  new Robot(),','  new Human { Name = "Bình" }','};','foreach (var w in list)','  w.Eat();'];
 var RL = ['interface IWorkable','{','  void Work();','}','interface IEatable','{','  void Eat();','}','class Human : IWorkable, IEatable','{','  public string Name;','  public void Work() { }','  public void Eat()','    => Console.WriteLine(','      Name + " ăn cơm");','}','class Robot : IWorkable','{','  public void Work() { }','}','var eaters = new List<IEatable>','{','  new Human { Name = "An" },','  new Human { Name = "Bình" }','};','foreach (var e in eaters)','  e.Eat();'];
 var ERR = 'Unhandled exception. System.NotSupportedException: Specified method is not supported.';
 var ln = ['An','Robot','Bình'], rn = ['An','Bình'];
 return {
  intro:'Cả hai bên cùng chạy vòng lặp gọi Eat(). Hãy xem Robot bị ép phải làm gì ở bên trái.',
  running:'Quan sát bên trái dừng ở đâu.',
  done:'Bên trái dừng ở Robot với lỗi, Bình không được gọi. Bên phải chạy hết ' + rn.length + ' phần tử.',
  note:'ISP: chia interface nhỏ theo nhu cầu để lớp không bị ép viết những phương thức mình không cần.',
  cols:[
  {title:'Một interface to',sub:'IWorker gồm cả Work() và Eat().',lines:L,run:function(c){
   c.snap({ln:3,title:'IWorker ép phải có Eat()',body:'Lớp nào ký IWorker cũng phải viết cả Work() lẫn Eat(), dù không cần.',objs:[O('IWorker',[['Work()',''],['Eat()','','hi']])]});
   c.snap({ln:16,title:'Robot buộc viết Eat()',body:'Robot không ăn, nhưng vẫn phải có Eat(). Cách đành chịu là ném lỗi.',objs:[O('Human',[['Eat()','in "ăn cơm"']]),O('Robot',[['Eat()','ném lỗi','bad']],{hi:1})]});
   c.snap({ln:20,title:'Tạo danh sách list',body:'Danh sách 3 worker: An, Robot, Bình.',arrs:[AR('list',ln)]});
   c.out('An ăn cơm');
   c.snap({ln:27,title:'Gọi Eat() cho An',body:'An là Human nên ăn cơm bình thường.',vars:[['w','→ Human#1 (An)',1]],arrs:[AR('list',ln,[0])]});
   c.err(ERR);
   c.snap({ln:18,title:'Gọi Eat() cho Robot',body:'Eat() của Robot ném NotSupportedException.',vars:[['w','→ Robot#2',1]],arrs:[AR('list',ln,[1],[0])]});
   c.snap({ln:27,title:'Xong: chương trình dừng',body:'Vòng lặp dừng ở Robot. Bình chưa được gọi Eat().',note:'Interface quá to ép Robot làm việc thừa và gây lỗi.',arrs:[AR('list',ln,[1],[0],[2])]});
  }},
  {title:'Hai interface nhỏ',sub:'IWorkable và IEatable tách riêng.',lines:RL,run:function(c){
   c.snap({ln:4,title:'Tách thành hai interface',body:'IWorkable chỉ có Work(), IEatable chỉ có Eat(). Lớp ký cái nào cần.',objs:[O('IWorkable',[['Work()','']]),O('IEatable',[['Eat()','']])]});
   c.snap({ln:16,title:'Robot chỉ ký IWorkable',body:'Robot chỉ có Work(), không phải viết Eat() nào cả.',objs:[O('Human',[['ký','IWorkable, IEatable']]),O('Robot',[['ký','IWorkable','ok']],{hi:1})]});
   c.snap({ln:20,title:'Tạo danh sách eaters',body:'Danh sách kiểu List<IEatable> chỉ gồm những ai ăn được: An và Bình. Robot không có trong danh sách này.',arrs:[AR('eaters',rn)]});
   c.out('An ăn cơm');
   c.snap({ln:26,title:'Gọi Eat() cho An',body:'An ăn cơm bình thường.',vars:[['e','→ Human#1 (An)',1]],arrs:[AR('eaters',rn,[0])]});
   c.out('Bình ăn cơm');
   c.snap({ln:26,title:'Gọi Eat() cho Bình',body:'Bình cũng ăn cơm. Không có lỗi.',vars:[['e','→ Human#2 (Bình)',1]],arrs:[AR('eaters',rn,[1],[0])]});
   c.snap({ln:26,title:'Xong: chạy hết',body:'Vòng lặp chạy hết cả 2 phần tử, không lỗi.',note:'Mỗi interface nhỏ đúng một nhu cầu, nên không lớp nào bị ép viết phương thức thừa.',arrs:[AR('eaters',rn,[],[0,1])]});
  }}
  ]};
})()};
