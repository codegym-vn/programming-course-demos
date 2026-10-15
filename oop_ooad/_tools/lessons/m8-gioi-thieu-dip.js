// META {"module":8,"lesson":"Nguyên tắc Đảo ngược Phụ thuộc (Dependency Inversion Principle - DIP)","activity":"Giới thiệu Nguyên tắc Đảo ngược Phụ thuộc (DIP)","title":"Phụ thuộc interface, không phụ thuộc lớp cụ thể","lead":"OrderService cần gửi tin nhắn. Chọn tình huống rồi bấm <b>Bước tiếp</b> để hai cột cùng chạy.","tabs":[["email","Đang gửi Email"],["sms","Đổi sang SMS"]]}
var LE = ['class EmailSender','{','  public void Send(string m)','    => Console.WriteLine(','      "Email: " + m);','}','class OrderService','{','  private EmailSender sender =','    new EmailSender();','  public void PlaceOrder()','    => sender.Send("Đã đặt hàng");','}','','var s = new OrderService();','s.PlaceOrder();'];
var RE = ['interface IMessageSender','{','  void Send(string m);','}','class EmailSender : IMessageSender','{','  public void Send(string m)','    => Console.WriteLine(','      "Email: " + m);','}','class OrderService','{','  private IMessageSender sender;','  public OrderService(','    IMessageSender sender)','    => this.sender = sender;','  public void PlaceOrder()','    => sender.Send("Đã đặt hàng");','}','','var s = new OrderService(','  new EmailSender());','s.PlaceOrder();'];
var LS = ['class SmsSender','{','  public void Send(string m)','    => Console.WriteLine(','      "SMS: " + m);','}','class OrderService','{','  private SmsSender sender =','    new SmsSender();','  public void PlaceOrder()','    => sender.Send("Đã đặt hàng");','}','','var s = new OrderService();','s.PlaceOrder();'];
var RS = ['class SmsSender : IMessageSender','{','  public void Send(string m)','    => Console.WriteLine(','      "SMS: " + m);','}','','// IMessageSender, OrderService','// giữ nguyên, không sửa','var s = new OrderService(','  new SmsSender());','s.PlaceOrder();'];
var MSG = 'Đã đặt hàng';
function emailTab(){
 return {
 intro:'OrderService gửi email khi đặt hàng. Hãy xem ai quyết định OrderService dùng đối tượng gửi nào.',
 running:'Quan sát ô sender trong OrderService trỏ tới đâu.',
 done:'Cùng in "Email: ' + MSG + '". Khác nhau ở chỗ: bên trái OrderService tự chọn EmailSender, bên phải bên ngoài đưa vào.',
 note:'DIP: lớp cấp cao (OrderService) chỉ biết interface, không tự new lớp cụ thể.',
 cols:[
 {title:'Tự new bên trong',sub:'OrderService phụ thuộc thẳng EmailSender.',lines:LE,run:function(c){
  c.snap({ln:14,title:'new OrderService()',body:'Tạo OrderService#1. Ngay khi tạo, nó tự new EmailSender (EmailSender#2) cho trường sender.',vars:[['s','→ OrderService#1',1]],objs:[O('OrderService#1',[['sender','→ EmailSender#2','hi']],{hi:1}),O('EmailSender#2',[])]});
  c.snap({ln:15,title:'s.PlaceOrder()',body:'PlaceOrder gọi sender.Send(...). sender luôn là EmailSender, OrderService không có cách chọn khác.',vars:[['s','→ OrderService#1']],objs:[O('OrderService#1',[['sender','→ EmailSender#2']]),O('EmailSender#2',[],{hi:1,tag:'đang chạy Send'})]});
  c.out('Email: ' + MSG);
  c.snap({ln:4,title:'EmailSender.Send',body:'In "Email: ' + MSG + '".',vars:[['m',S(MSG)]],objs:[O('OrderService#1',[['sender','→ EmailSender#2']]),O('EmailSender#2',[],{hi:1})]});
  c.snap({ln:15,title:'Xong',body:'OrderService trỏ cứng tới EmailSender do chính nó tạo ra.',vars:[['s','→ OrderService#1']],objs:[O('OrderService#1',[['sender','→ EmailSender#2']]),O('EmailSender#2',[])]});
 }},
 {title:'Nhận qua constructor',sub:'OrderService chỉ biết IMessageSender.',lines:RE,run:function(c){
  c.snap({ln:20,title:'new EmailSender() trước',body:'Bên ngoài tạo EmailSender#1 trước, rồi đưa cho OrderService.',vars:[['s','chưa có']],objs:[O('EmailSender#1',[],{hi:1})]});
  c.snap({ln:15,title:'new OrderService(...)',body:'Tạo OrderService#2. Constructor nhận IMessageSender và lưu vào sender, trỏ tới EmailSender#1.',vars:[['s','→ OrderService#2',1]],objs:[O('EmailSender#1',[]),O('OrderService#2',[['sender (IMessageSender)','→ EmailSender#1','hi']],{hi:1})]});
  c.snap({ln:22,title:'s.PlaceOrder()',body:'PlaceOrder gọi sender.Send(...), chạy bản Send của đối tượng sender đang trỏ tới.',vars:[['s','→ OrderService#2']],objs:[O('EmailSender#1',[],{hi:1,tag:'đang chạy Send'}),O('OrderService#2',[['sender (IMessageSender)','→ EmailSender#1']])]});
  c.out('Email: ' + MSG);
  c.snap({ln:8,title:'EmailSender.Send',body:'In "Email: ' + MSG + '".',vars:[['m',S(MSG)]],objs:[O('EmailSender#1',[],{hi:1}),O('OrderService#2',[['sender (IMessageSender)','→ EmailSender#1']])]});
  c.snap({ln:22,title:'Xong',body:'OrderService không biết sender cụ thể là gì, chỉ biết nó có Send().',vars:[['s','→ OrderService#2']],objs:[O('EmailSender#1',[]),O('OrderService#2',[['sender (IMessageSender)','→ EmailSender#1']])]});
 }}]};
}
function smsTab(){
 return {
 intro:'Yêu cầu mới: gửi bằng SMS thay vì email. Hãy xem mỗi bên phải sửa những gì.',
 running:'Đỏ là sửa lớp OrderService, xanh là sửa nhẹ ở Main.',
 done:'Bên trái phải sửa OrderService. Bên phải chỉ thêm SmsSender và đổi 1 dòng ở Main, OrderService không đổi.',
 note:'DIP: đổi cách gửi chỉ cần đổi đối tượng truyền vào, không sửa lớp cấp cao.',
 cols:[
 {title:'Tự new bên trong',sub:'Phải sửa OrderService.',lines:LS,run:function(c){
  c.snap({ln:6,title:'Yêu cầu đổi sang SMS',body:'OrderService đang gắn cứng với EmailSender. Muốn dùng SMS thì phải sửa chính nó.',objs:[O('OrderService',[['sender','EmailSender']],{hi:1})]});
  c.snap({ln:0,title:'Viết lớp SmsSender',body:'Thêm lớp SmsSender có Send(string m) in ra "SMS: ...".',objs:[O('SmsSender',[['Send()','in "SMS: ..."']]),O('OrderService',[['sender','EmailSender']])]});
  c.snap({ln:8,title:'Sửa OrderService',body:'Phải mở OrderService, đổi kiểu và dòng new từ EmailSender sang SmsSender. Lớp cấp cao bị sửa.',objs:[O('SmsSender',[['Send()','in "SMS: ..."']]),O('OrderService',[['sender','SmsSender','bad']],{hi:1,tag:'bị sửa'})]});
  c.snap({ln:14,title:'new OrderService()',body:'OrderService#1 tự new SmsSender (SmsSender#2).',vars:[['s','→ OrderService#1',1]],objs:[O('OrderService#1',[['sender','→ SmsSender#2']],{hi:1}),O('SmsSender#2',[])]});
  c.out('SMS: ' + MSG);
  c.snap({ln:15,title:'s.PlaceOrder()',body:'Chạy Send của SmsSender, in "SMS: ' + MSG + '".',vars:[['s','→ OrderService#1']],objs:[O('OrderService#1',[['sender','→ SmsSender#2']]),O('SmsSender#2',[],{hi:1})]});
  c.snap({ln:15,title:'Xong',body:'Chạy được, nhưng OrderService đã bị sửa chỉ vì đổi cách gửi.',vars:[['s','→ OrderService#1']],objs:[O('OrderService#1',[['sender','→ SmsSender#2']],{tag:'đã bị sửa'}),O('SmsSender#2',[])]});
 }},
 {title:'Nhận qua constructor',sub:'Chỉ đổi 1 dòng ở Main.',lines:RS,run:function(c){
  c.snap({ln:0,title:'Yêu cầu đổi sang SMS',body:'OrderService chỉ biết IMessageSender nên không cần sửa. Ta chỉ cần một lớp gửi SMS.',objs:[O('OrderService',[['sender','IMessageSender']],{dim:1})]});
  c.snap({ln:0,title:'Viết lớp SmsSender',body:'SmsSender ký IMessageSender và có Send(string m) in ra "SMS: ...".',objs:[O('SmsSender',[['Send()','in "SMS: ..."','ok']],{hi:1,tag:'lớp mới'}),O('OrderService',[['sender','IMessageSender']],{dim:1,tag:'không đổi'})]});
  c.snap({ln:10,title:'Đổi 1 dòng ở Main',body:'Thay new EmailSender() bằng new SmsSender() khi tạo OrderService.',vars:[['s','→ OrderService#2',1]],objs:[O('SmsSender#1',[],{hi:1}),O('OrderService#2',[['sender (IMessageSender)','→ SmsSender#1','ok']],{tag:'không đổi code'})]});
  c.out('SMS: ' + MSG);
  c.snap({ln:11,title:'s.PlaceOrder()',body:'Chạy Send của SmsSender, in "SMS: ' + MSG + '".',vars:[['s','→ OrderService#2']],objs:[O('SmsSender#1',[],{hi:1}),O('OrderService#2',[['sender (IMessageSender)','→ SmsSender#1']])]});
  c.snap({ln:11,title:'Xong',body:'Đổi sang SMS mà OrderService không bị sửa chữ nào.',vars:[['s','→ OrderService#2']],objs:[O('SmsSender#1',[]),O('OrderService#2',[['sender (IMessageSender)','→ SmsSender#1']],{tag:'không đổi code'})]});
 }}]};
}
var EX = {email:emailTab(),sms:smsTab()};
