// META {"module":4,"lesson":"Ứng dụng và Lợi ích của Đa hình trong thiết kế phần mềm","activity":"Ví dụ thực tế về Đa hình trong thiết kế hệ thống","title":"Hàm Checkout thanh toán","lead":"Một hàm Checkout dùng được với mọi cách thanh toán. Chọn tab để đổi cách thanh toán, rồi bấm <b>Bước tiếp</b>.","tabs":[["cash","Tiền mặt"],["card","Thẻ"],["wallet","Ví điện tử"]]}
function payTab(cls,vn,fee,label){
 var body=fee==0?'    => amount;':'    => amount + '+fee+';';
 return {
 inputs:[],
 intro:'Checkout nhận một IPayment bất kỳ. Tab này dùng '+label+', phí '+fee+'. Bấm "Bước tiếp".',
 lines:function(){return [
  'interface IPayment',
  '{',
  '  decimal Pay(decimal amount);',
  '}',
  'class '+cls+' : IPayment',
  '{',
  '  public decimal Pay(decimal amount)',
  body,
  '}',
  'void Checkout(IPayment p, decimal t)',
  '{',
  '  var total = p.Pay(t);',
  '  Console.WriteLine(total);',
  '}',
  'Checkout(new '+cls+'(), 200000);'];},
 run:function(c){
  var amount=200000, total=amount+fee;
  var ob=function(o){return [O(cls+'#1',[['Cách thanh toán',S(label)],['Phí',fee]],o)];};
  c.snap({ln:14,title:'Gọi Checkout',body:'new '+cls+'() tạo đối tượng '+cls+'#1 rồi truyền vào Checkout. Tham số p có kiểu IPayment, t = '+amount+'.',vars:[['p  (kiểu IPayment)','→ '+cls+'#1',1],['t',amount]],objs:ob({hi:1})});
  c.snap({ln:11,title:'p.Pay(t)',body:'Checkout chỉ biết p là IPayment, không biết là cách nào. Đối tượng thật là '+cls+' nên Pay của '+cls+' sẽ chạy.',vars:[['p  (kiểu IPayment)','→ '+cls+'#1'],['t',amount]],objs:ob({hi:1,tag:'đang chạy Pay()'})});
  c.snap({ln:7,title:'Chạy '+cls+'.Pay',body:fee==0?'Tiền mặt không mất phí: trả về đúng '+amount+'.':'Cộng phí '+fee+' vào '+amount+', trả về '+total+'.',vars:[['amount',amount],['trả về',total,1]],objs:ob({hi:1,tag:'đang chạy Pay()'})});
  c.out(String(total));
  c.snap({ln:12,title:'In kết quả',body:'total = '+total+' được in ra console.',vars:[['p  (kiểu IPayment)','→ '+cls+'#1'],['total',total,1]],objs:ob({})});
  c.snap({ln:12,title:'Xong',body:'Checkout không đổi, chỉ có đối tượng thanh toán khác nhau, nên phí và kết quả khác nhau.',note:'Checkout làm việc với IPayment, nên dùng được cho mọi cách thanh toán, kể cả cách mới thêm sau này.',vars:[['total',total]],objs:ob({})});
 }};
}
var EX = {cash:payTab('Cash','cash',0,'tiền mặt'),card:payTab('Card','card',3000,'thẻ'),wallet:payTab('Wallet','wallet',1000,'ví điện tử')};
