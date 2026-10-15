// META {"module":3,"lesson":"Tạo và Sử dụng Ngoại lệ Tùy chỉnh (Custom Exceptions)","activity":"Hướng dẫn tạo CustomException","title":"Tạo một CustomException","lead":"Rút 500 khi số dư chỉ có 200: xem exception tự tạo được khai báo, ném ra và bắt lại. Bấm <b>Bước tiếp</b>.","tabs":[["x","Số dư 200, rút 500"]],"codeTitle":"Mã nguồn C#"}
var EX = {x:{inputs:[],chips:[],
 intro:'Chúng ta sẽ tạo lớp InsufficientFundsException rồi dùng nó khi rút quá số dư. Bấm "Bước tiếp".',
 lines:function(){return [
  'class InsufficientFundsException',
  '  : Exception',
  '{',
  '  public decimal Balance { get; }',
  '  public decimal Amount { get; }',
  '  public InsufficientFundsException(',
  '    decimal balance, decimal amount)',
  '    : base("Số dư không đủ")',
  '  {',
  '    Balance = balance;',
  '    Amount = amount;',
  '  }',
  '}',
  '',
  'class Account',
  '{',
  '  public decimal Balance = 200;',
  '  public void Withdraw(decimal amount)',
  '  {',
  '    if (amount > Balance)',
  '      throw new',
  '        InsufficientFundsException(',
  '          Balance, amount);',
  '  }',
  '}',
  '',
  'var acc = new Account();',
  'try',
  '{',
  '  acc.Withdraw(500);',
  '}',
  'catch (InsufficientFundsException ex)',
  '{',
  '  Console.WriteLine(',
  '    "Thiếu " + (ex.Amount - ex.Balance));',
  '}'];},
 run:function(c){
  var bal = 200, amt = 500, MSG = 'Số dư không đủ';
  var tree = function(sel){ return vTree([
   {t:'Exception',d:0,kind:'cls',sub:'có sẵn của .NET'},
   {t:'FormatException',d:1,kind:'cls',sub:'có sẵn'},
   {t:'InvalidOperationException',d:1,kind:'cls',sub:'có sẵn'},
   {t:'InsufficientFundsException',d:1,kind:'cls',s:sel,sub:'do ta tạo'}]); };
  var tree0 = vTree([
   {t:'Exception',d:0,kind:'cls',sub:'có sẵn của .NET'},
   {t:'FormatException',d:1,kind:'cls',sub:'có sẵn'},
   {t:'InvalidOperationException',d:1,kind:'cls',sub:'có sẵn'}]);
  var stack = function(top, ball, tag){
   var f = [{t:'Main',sub:'acc.Withdraw(500)',s:tag==='main'?'ok':undefined}];
   if (top) f.push({t:'Withdraw',sub:'amount ' + amt + ', Balance ' + bal,s:tag==='w'?'hi':undefined,ball:ball==='w'});
   if (ball === 'main') f[0].ball = true;
   return vStack(f,{ballText:'InsufficientFundsException'}); };
  var card = function(rows, kind, title){ return vCard({kind:kind||'err',title:title||'InsufficientFundsException',sub:MSG,rows:rows}); };
  var rowsFull = [['Message',MSG],['Balance',bal],['Amount',amt]];
  c.snap({ln:0,title:'Khai báo lớp kế thừa Exception',body:'Lớp mới kế thừa Exception nên cây kế thừa có thêm một nút. Tên kết thúc bằng "Exception" để dễ nhận ra.',
   viz:[tree('new')]});
  c.snap({ln:7,title:'Constructor gọi base',body:'Constructor nhận balance, amount và gọi : base("Số dư không đủ"), nên Message được đặt ở lớp cha Exception.',
   viz:[tree('hi'),card([['Message',MSG],['Balance','(chờ gán)'],['Amount','(chờ gán)']],'info','Đối tượng sẽ được tạo như thế này')]});
  var cond = amt > bal;
  c.snap({ln:19,title:'Withdraw(500) kiểm tra số dư',body:'amount ' + amt + ' > Balance ' + bal + ' là ' + (cond ? 'đúng' : 'sai') + ', nên chạy lệnh throw new.',
   vars:[['Balance',bal],['amount',amt,1]],
   viz:[tree(),vPair(stack(true,'w','w'),'<div class="cm">Chưa có thẻ lỗi</div>',{ta:'Ngăn xếp lời gọi',tb:'Đối tượng exception'})]});
  c.snap({ln:9,title:'Đối tượng exception được tạo',body:'Constructor gán thêm hai thuộc tính riêng: Balance = ' + bal + ' và Amount = ' + amt + '. Message đã có từ lớp cha.',
   vars:[['Balance',bal],['amount',amt]],
   viz:[tree(),vPair(stack(true,'w','w'),card(rowsFull),{ta:'Ngăn xếp lời gọi',tb:'Đối tượng exception'})]});
  c.snap({ln:31,title:'catch bắt đúng loại',body:'Exception rời Withdraw, đi lên Main và khớp với catch (InsufficientFundsException ex).',
   viz:[tree('ok'),vPair(stack(false,'main','main'),card(rowsFull),{ta:'Ngăn xếp lời gọi',tb:'Đối tượng exception'})]});
  var miss = amt - bal;
  c.out('Thiếu ' + miss);
  c.snap({ln:33,title:'Đọc thuộc tính riêng',body:'ex.Amount - ex.Balance = ' + amt + ' - ' + bal + ' = ' + miss + '. Thuộc tính riêng giúp phần catch biết chi tiết lỗi.',
   vars:[['ex.Amount',amt],['ex.Balance',bal]],
   viz:[tree('ok'),card(rowsFull,'ok')]});
  c.snap({ln:35,title:'Xong',body:'Lỗi đã được bắt và xử lý, chương trình chạy tiếp.',note:'Exception tùy chỉnh là một lớp kế thừa Exception, có thể thêm thuộc tính riêng. Tên nên kết thúc bằng "Exception".',
   viz:[tree('ok'),card(rowsFull,'ok')]});
 }}};
