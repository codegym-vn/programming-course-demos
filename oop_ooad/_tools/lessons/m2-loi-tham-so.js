// META {"module":2,"lesson":"Các Thành phần của Lớp: Trường và Phương thức","activity":"Phân tích lỗi thường gặp về Tham số và Giá trị trả về","title":"Lỗi về tham số và giá trị trả về","lead":"Ba lỗi hay gặp, mỗi lỗi một tab. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["int","Truyền int"],["obj","Truyền đối tượng"],["ret","Bỏ quên giá trị trả về"]]}
var EX = {
'int':{inputs:[],
 intro:'Tang(n) có tăng được n ở Main không? Bấm "Bước tiếp".',
 lines:function(){return ['static void Tang(int x)','{','  x = x + 1;','}','','int n = 5;','Tang(n);','Console.WriteLine(n);'];},
 run:function(c){
  c.snap({ln:5,title:'n = 5',body:'Biến n ở Main chứa số 5.',vars:[['n',5,1]]});
  c.snap({ln:6,title:'Gọi Tang(n)',body:'int được truyền bằng bản sao: x là ô mới, chép giá trị 5 từ n.',vars:[['n',5],['x (bản sao)',5,1]]});
  c.snap({ln:2,title:'x = x + 1',body:'Chỉ bản sao x đổi thành 6. Ô n vẫn là 5.',vars:[['n',5],['x (bản sao)',6,1]]});
  c.snap({ln:6,title:'Tang kết thúc',body:'Bản sao x biến mất cùng ngăn gọi hàm. n vẫn là 5.',vars:[['n',5,1]]});
  c.out('5');
  c.snap({ln:7,title:'Xong',body:'In ra 5, không phải 6.',note:'Truyền int là truyền bản sao: sửa tham số không ảnh hưởng biến ở ngoài.',vars:[['n',5]]});
 }},
obj:{inputs:[],
 intro:'Lần này truyền cả đối tượng vào Tang. Bấm "Bước tiếp".',
 lines:function(){return ['class Account','{','  public decimal Balance;','}','','static void Tang(Account a)','{','  a.Balance += 100;','}','','var acc = new Account();','acc.Balance = 500;','Tang(acc);','Console.WriteLine(acc.Balance);'];},
 run:function(c){
  var A=[['acc','→ Account#1']];
  c.snap({ln:10,title:'Tạo tài khoản',body:'Account#1 có Balance = 0.',vars:[['acc','→ Account#1',1]],objs:[O('Account#1',[['Balance',0]],{hi:1})]});
  c.snap({ln:11,title:'Balance = 500',body:'Đặt Balance của Account#1 là 500.',vars:A,objs:[O('Account#1',[['Balance',500,'hi']],{hi:1})]});
  c.snap({ln:12,title:'Gọi Tang(acc)',body:'Tham số a là bản sao của tham chiếu: a và acc cùng trỏ tới Account#1. Không có đối tượng mới.',vars:A.concat([['a','→ Account#1',1]]),objs:[O('Account#1',[['Balance',500]],{hi:1})]});
  c.snap({ln:7,title:'a.Balance += 100',body:'Qua a ta sửa chính đối tượng Account#1, nên Balance thành 600.',vars:A.concat([['a','→ Account#1']]),objs:[O('Account#1',[['Balance',600,'hi']],{hi:1})]});
  c.snap({ln:12,title:'Tang kết thúc',body:'Biến a biến mất nhưng đối tượng vẫn còn với Balance = 600.',vars:A,objs:[O('Account#1',[['Balance',600,'ok']],{hi:1})]});
  c.out('600');
  c.snap({ln:13,title:'Xong',body:'Ở ngoài thấy Balance = 600.',note:'Truyền đối tượng là truyền bản sao của tham chiếu: sửa trường qua tham số thì bên ngoài thấy thay đổi.',vars:A,objs:[O('Account#1',[['Balance',600]])]});
 }},
ret:{inputs:[],
 intro:'ToUpper() có làm chuỗi s thành chữ hoa không? Bấm "Bước tiếp".',
 lines:function(){return ['string s = "abc";','s.ToUpper();','Console.WriteLine(s);','s = s.ToUpper();','Console.WriteLine(s);'];},
 run:function(c){
  c.snap({ln:0,title:'s = "abc"',body:'s trỏ tới chuỗi "abc".',vars:[['s','→ string#1',1]],objs:[O('string#1',[['giá trị',S('abc')]],{hi:1})]});
  c.snap({ln:1,title:'Gọi s.ToUpper() mà không gán',body:'Chuỗi bất biến, nên ToUpper() không sửa "abc" mà tạo chuỗi mới "ABC" (string#2) rồi trả về. Ta không giữ giá trị trả về nên không ai trỏ tới string#2.',vars:[['s','→ string#1']],objs:[O('string#1',[['giá trị',S('abc')]],{hi:1}),O('string#2',[['giá trị',S('ABC')]],{dim:1})]});
  c.out('abc');
  c.snap({ln:2,title:'In s',body:'s vẫn trỏ tới "abc".',vars:[['s','→ string#1']],objs:[O('string#1',[['giá trị',S('abc')]],{hi:1}),O('string#2',[['giá trị',S('ABC')]],{dim:1})]});
  c.snap({ln:3,title:'s = s.ToUpper()',body:'Lần này ta gán giá trị trả về (string#3) cho s. string#1 không còn ai tham chiếu, sẽ bị thu hồi.',vars:[['s','→ string#3',1]],objs:[O('string#1',[['giá trị',S('abc')]],{dim:1}),O('string#2',[['giá trị',S('ABC')]],{dim:1}),O('string#3',[['giá trị',S('ABC'),'hi']],{hi:1})]});
  c.out('ABC');
  c.snap({ln:4,title:'Xong',body:'Bây giờ s là "ABC".',note:'Phương thức trả về giá trị thì phải dùng giá trị đó (gán, in, so sánh). Gọi mà bỏ đi thì không có tác dụng.',vars:[['s','→ string#3']],objs:[O('string#1',[['giá trị',S('abc')]],{dim:1}),O('string#2',[['giá trị',S('ABC')]],{dim:1}),O('string#3',[['giá trị',S('ABC')]])]});
 }}};
