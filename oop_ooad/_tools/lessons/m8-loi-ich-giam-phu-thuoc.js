// META {"module":8,"lesson":"Nguyên tắc Đảo ngược Phụ thuộc (Dependency Inversion Principle - DIP)","activity":"Lợi ích của việc giảm sự phụ thuộc trực tiếp","title":"Kiểm thử bằng đối tượng giả","lead":"Truyền một đối tượng giả vào OrderService để kiểm thử mà không gửi email thật. Bấm <b>Bước tiếp</b>.","tabs":[["x","Kiểm thử với FakeSender"]]}
var EX = {x:(function(){
 var MSG = 'Đã đặt hàng';
 return {inputs:[],
 intro:'FakeSender chỉ ghi lại tin nhắn vào một danh sách thay vì gửi thật. Bấm "Bước tiếp".',
 lines:function(){ return ['interface IMessageSender','{','  void Send(string m);','}','class FakeSender : IMessageSender','{','  public List<string> Sent =','    new List<string>();','  public void Send(string m)','    => Sent.Add(m);','}','class OrderService','{','  private IMessageSender sender;','  public OrderService(','    IMessageSender sender)','    => this.sender = sender;','  public void PlaceOrder()','    => sender.Send("Đã đặt hàng");','}','','var fake = new FakeSender();','var s = new OrderService(fake);','s.PlaceOrder();','Console.WriteLine(','  fake.Sent.Count == 1','    ? "Test đạt" : "Test lỗi");']; },
 run:function(c){
  var sent = [];
  var fo = function(hi, flag){ return O('FakeSender#1',[['Sent','List có ' + sent.length + ' tin',flag||'']],{hi:hi}); };
  c.snap({ln:4,title:'FakeSender là đối tượng giả',body:'FakeSender ký IMessageSender nhưng Send chỉ thêm tin vào danh sách Sent. Không có email thật nào được gửi.'});
  c.snap({ln:21,title:'new FakeSender()',body:'Tạo FakeSender#1. Danh sách Sent đang rỗng.',vars:[['fake','→ FakeSender#1',1]],objs:[fo(1)],arrs:[AR('fake.Sent',sent)]});
  c.snap({ln:22,title:'new OrderService(fake)',body:'OrderService#2 nhận fake qua constructor, nên sender của nó trỏ tới FakeSender#1.',vars:[['fake','→ FakeSender#1'],['s','→ OrderService#2',1]],objs:[fo(0),O('OrderService#2',[['sender (IMessageSender)','→ FakeSender#1','hi']],{hi:1})],arrs:[AR('fake.Sent',sent)]});
  c.snap({ln:23,title:'s.PlaceOrder()',body:'PlaceOrder gọi sender.Send("Đã đặt hàng"). sender đang là FakeSender nên chạy Send của nó.',vars:[['s','→ OrderService#2']],objs:[fo(1),O('OrderService#2',[['sender (IMessageSender)','→ FakeSender#1']])],arrs:[AR('fake.Sent',sent)]});
  sent.push(MSG);
  c.snap({ln:9,title:'FakeSender.Send',body:'Sent.Add(m) ghi lại tin nhắn vào danh sách. Chỉ vậy thôi, không gửi gì ra ngoài.',vars:[['m',S(MSG)]],objs:[fo(1,'ok')],arrs:[AR('fake.Sent',sent,[0])]});
  var pass = sent.length === 1;
  c.out(pass ? 'Test đạt' : 'Test lỗi');
  c.snap({ln:24,title:'Kiểm tra danh sách',body:'fake.Sent.Count = ' + sent.length + ', so với 1 thì ' + (pass ? 'bằng nhau nên in "Test đạt".' : 'khác nhau nên in "Test lỗi".'),vars:[['fake.Sent.Count',sent.length,1]],objs:[fo(0,'ok')],arrs:[AR('fake.Sent',sent)]});
  c.snap({ln:24,title:'Xong: test đạt',body:'Test kiểm tra được OrderService đã gửi đúng 1 tin mà không dùng email thật.',note:'Nhờ phụ thuộc vào interface, ta thay đối tượng thật bằng đối tượng giả để kiểm thử dễ dàng.',vars:[['fake.Sent.Count',sent.length]],objs:[fo(0,'ok')],arrs:[AR('fake.Sent',sent)]});
 }};})()};
