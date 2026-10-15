// META {"module":8,"lesson":"Nguyên tắc Thay thế Liskov (Liskov Substitution Principle - LSP)","activity":"Phân tích ví dụ vi phạm và tuân thủ LSP","title":"Sửa vi phạm LSP bằng interface","lead":"Chim cánh cụt không biết bay. Bấm <b>Bước tiếp</b> để xem hai cách thiết kế chạy vòng lặp cho chim bay.","tabs":[["x","Vòng lặp cho chim bay"]]}
var EX = {x:(function(){
 var L = ['class Bird','{','  public string Name;','  public virtual void Fly()','    => Console.WriteLine(','      Name + " bay");','}','class Penguin : Bird','{','  public override void Fly()','    => throw new','      NotSupportedException();','}','','var birds = new List<Bird>','{','  new Bird { Name = "Sẻ" },','  new Penguin { Name = "Cụt" },','  new Bird { Name = "Ưng" }','};','foreach (var b in birds)','  b.Fly();'];
 var RL = ['interface IFlyable','{','  void Fly();','}','class Bird','{','  public string Name;','}','class FlyingBird : Bird, IFlyable','{','  public void Fly()','    => Console.WriteLine(','      Name + " bay");','}','class Penguin : Bird { }','','var flyers = new List<IFlyable>','{','  new FlyingBird { Name = "Sẻ" },','  new FlyingBird { Name = "Ưng" }','};','foreach (var f in flyers)','  f.Fly();'];
 var names = ['Sẻ','Cụt','Ưng'], fl = ['Sẻ','Ưng'];
 var ERR = 'Unhandled exception. System.NotSupportedException: Specified method is not supported.';
 var left = function(c){
  var ran = 0, stopped = false;
  c.snap({ln:9,title:'Penguin không biết bay',body:'Penguin kế thừa Bird nên buộc phải có Fly(). Không biết bay nên nó ném NotSupportedException.',objs:[O('Bird',[['Fly()','in "bay"']]),O('Penguin',[['Fly()','ném lỗi','bad']])]});
  c.snap({ln:14,title:'Tạo danh sách birds',body:'Danh sách có 3 chim, trong đó Penguin cũng được coi là một Bird.',arrs:[AR('birds',names)]});
  c.out('Sẻ bay');
  c.snap({ln:21,title:'Gọi Fly() cho Sẻ',body:'Vòng foreach gọi b.Fly(). Sẻ bay bình thường.',vars:[['b','→ Bird#1 (Sẻ)',1]],arrs:[AR('birds',names,[0])]});
  c.err(ERR);
  c.snap({ln:11,title:'Gọi Fly() cho Cụt',body:'Penguin.Fly() ném NotSupportedException. Code gọi b.Fly() tin rằng chim nào cũng bay được, nên bị sai.',vars:[['b','→ Penguin#2 (Cụt)',1]],arrs:[AR('birds',names,[1],[0])]});
  c.snap({ln:21,title:'Xong: chương trình dừng',body:'Vòng lặp dừng ở Cụt vì lỗi. Ưng chưa được gọi Fly().',note:'Penguin kế thừa Bird nhưng không thay thế được Bird: vi phạm LSP.',arrs:[AR('birds',names,[1],[0],[2])]});
 };
 var right = function(c){
  c.snap({ln:0,title:'Tách việc bay ra interface',body:'IFlyable chỉ dành cho chim biết bay. Bird không còn buộc mọi chim phải có Fly().',objs:[O('FlyingBird',[['Fly()','in "bay"','ok']]),O('Penguin',[['Fly()','(không có)']])]});
  c.snap({ln:16,title:'Tạo danh sách flyers',body:'Danh sách kiểu List<IFlyable> chỉ nhận chim biết bay. Penguin không ký IFlyable nên không thể bỏ vào đây.',arrs:[AR('flyers',fl)]});
  c.out('Sẻ bay');
  c.snap({ln:22,title:'Gọi Fly() cho Sẻ',body:'Vòng foreach gọi f.Fly(). Sẻ bay bình thường.',vars:[['f','→ FlyingBird#1 (Sẻ)',1]],arrs:[AR('flyers',fl,[0])]});
  c.out('Ưng bay');
  c.snap({ln:22,title:'Gọi Fly() cho Ưng',body:'Ưng cũng bay bình thường. Không có lỗi nào xảy ra.',vars:[['f','→ FlyingBird#2 (Ưng)',1]],arrs:[AR('flyers',fl,[1],[0])]});
  c.snap({ln:22,title:'Xong: chạy hết',body:'Vòng lặp chạy hết cả 2 chim và không có lỗi.',note:'Mỗi phần tử trong danh sách đều làm đúng việc đã hứa. Đó là điều LSP yêu cầu.',arrs:[AR('flyers',fl,[],[0,1])]});
 };
 return {
  intro:'Cả hai bên cùng chạy vòng lặp gọi Fly() cho từng chim. Hãy xem bên nào chạy hết.',
  running:'Quan sát bên trái dừng ở đâu.',
  done:'Bên trái dừng ở Penguin với lỗi, bên phải chạy hết ' + fl.length + ' chim.',
  note:'Sửa vi phạm LSP: tách hành vi riêng (bay) ra interface, chỉ lớp nào làm được mới ký.',
  cols:[{title:'Penguin kế thừa Bird',sub:'Penguin override Fly() để ném lỗi.',lines:L,run:left},{title:'Tách interface IFlyable',sub:'Chỉ chim biết bay mới ký IFlyable.',lines:RL,run:right}]};
})()};
