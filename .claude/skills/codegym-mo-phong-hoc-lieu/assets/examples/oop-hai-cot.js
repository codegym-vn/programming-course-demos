// META {"module":2,"lesson":"Nguyên lý Đóng gói (Encapsulation) và Kiểm soát truy cập","activity":"Đóng gói là gì? Tại sao lại cần Đóng gói?","title":"Đóng gói là gì?","lead":"Cùng một tài khoản: nạp 100 rồi rút 500. Bên trái để lộ dữ liệu, bên phải đóng gói. Bấm <b>Bước tiếp</b> để hai cột cùng chạy.","tabs":[["x","Rút quá số dư"]]}
var EX = {x:{
 intro:'Cả hai cột nạp 100 rồi cố rút 500. Hãy để ý số dư cuối cùng của mỗi bên.',
 running:'Bên trái, code ngoài lớp sửa thẳng Balance. Bên phải, mọi thay đổi phải đi qua phương thức có kiểm tra.',
 done:'Số dư cuối: bên trái -400 (sai), bên phải 100 (đúng). Đóng gói giữ cho đối tượng luôn ở trạng thái hợp lệ.',
 note:'Đóng gói = để dữ liệu ở private và chỉ cho thay đổi qua phương thức public có kiểm tra.',
 cols:[
 {title:'Không đóng gói',sub:'Balance là public, ai cũng sửa được.',
  lines:['class Account','{','  public decimal Balance;','}','','var acc = new Account();','acc.Balance = 100;','acc.Balance -= 500;','Console.WriteLine(acc.Balance);'],
  run:function(c){
   c.snap({ln:5,title:'Tạo tài khoản',body:'Balance mặc định là 0.',vars:[['acc','→ Account#1']],objs:[O('Account#1',[['Balance',0]],{hi:1})]});
   c.snap({ln:6,title:'Nạp 100',body:'Code bên ngoài gán thẳng Balance = 100.',vars:[['acc','→ Account#1']],objs:[O('Account#1',[['Balance',100,'hi']],{hi:1})]});
   c.snap({ln:7,title:'Rút 500',body:'Không ai kiểm tra số dư. Balance = 100 - 500 = -400.',vars:[['acc','→ Account#1']],objs:[O('Account#1',[['Balance',-400,'bad']],{hi:1})]});
   c.out('-400');
   c.snap({ln:8,title:'In số dư',body:'Tài khoản bị âm 400, một trạng thái không được phép xảy ra.',vars:[['acc','→ Account#1']],objs:[O('Account#1',[['Balance',-400,'bad']])]});
  }},
 {title:'Có đóng gói',sub:'balance là private, chỉ đổi qua phương thức.',
  lines:['class Account','{','  private decimal balance;','  public void Deposit(decimal x)','  {','    if (x > 0) balance += x;','  }','  public bool Withdraw(decimal x)','  {','    if (x > balance)','      return false;','    balance -= x;','    return true;','  }','  public decimal GetBalance()','    => balance;','}','','var acc = new Account();','acc.Deposit(100);','acc.Withdraw(500);','Console.WriteLine(','  acc.GetBalance());'],
  run:function(c){
   c.snap({ln:18,title:'Tạo tài khoản',body:'balance là private: code bên ngoài không đọc, không sửa trực tiếp được.',vars:[['acc','→ Account#1']],objs:[O('Account#1',[['balance (private)',0]],{hi:1})]});
   c.snap({ln:5,title:'Deposit(100)',body:'x = 100 > 0 nên hợp lệ, balance tăng lên 100.',vars:[['acc','→ Account#1'],['x',100]],objs:[O('Account#1',[['balance (private)',100,'hi']],{hi:1})]});
   c.snap({ln:10,title:'Withdraw(500): kiểm tra',body:'500 > 100 nên phương thức trả về false và không trừ tiền.',vars:[['acc','→ Account#1'],['x',500]],objs:[O('Account#1',[['balance (private)',100,'ok']],{hi:1})]});
   c.out('100');
   c.snap({ln:21,title:'In số dư',body:'Số dư vẫn là 100. Lệnh rút sai đã bị chặn ngay trong lớp.',vars:[['acc','→ Account#1']],objs:[O('Account#1',[['balance (private)',100,'ok']]) ]});
  }}
 ]}};
