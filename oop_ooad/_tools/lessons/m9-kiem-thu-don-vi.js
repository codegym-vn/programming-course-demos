// META {"module":9,"lesson":"Hoàn thiện dự án và Đánh giá","activity":"Các phương pháp kiểm thử đơn vị cơ bản (Unit Testing)","title":"Kiểm thử đơn vị: Arrange - Act - Assert","lead":"Mỗi test có ba phần: chuẩn bị (Arrange), thực hiện (Act), kiểm tra (Assert). Chọn phiên bản Withdraw rồi bấm <b>Bước tiếp</b>.","tabs":[["dung","Withdraw đúng"],["loi","Withdraw có lỗi"]]}
function makeTab(bug){
 return {inputs:[],
 intro:'Ta kiểm thử phương thức Withdraw của BankAccount bằng ba test nhỏ. '+(bug?'Phiên bản này cố ý thiếu bước kiểm tra số dư. ':'')+'Bấm "Bước tiếp".',
 lines:function(){return [
  'class BankAccount',
  '{',
  '  public decimal Balance;',
  '  public BankAccount(decimal b)',
  '  { Balance = b; }',
  '  public bool Withdraw(decimal x)',
  '  {',
  bug?'    if (x <= 0)':'    if (x <= 0 || x > Balance)',
  '      return false;',
  '    Balance -= x;',
  '    return true;',
  '  }',
  '}',
  '',
  '// Test 1: rút hợp lệ',
  'var a = new BankAccount(100);',
  'bool r = a.Withdraw(30);',
  'Assert(r && a.Balance == 70);',
  '// Test 2: rút quá số dư',
  'var a = new BankAccount(100);',
  'bool r = a.Withdraw(500);',
  'Assert(!r && a.Balance == 100);',
  '// Test 3: rút số âm',
  'var a = new BankAccount(100);',
  'bool r = a.Withdraw(-10);',
  'Assert(!r && a.Balance == 100);'];},
 run:function(c){
  function withdraw(acc,x){ if(x<=0||(!bug&&x>acc.b))return false; acc.b-=x; return true; }
  var T=[
   {name:'rút hợp lệ',amt:30,exp:function(r,b){return r===true&&b===70;},what:'rút 30 từ số dư 100 thì thành công và còn 70'},
   {name:'rút quá số dư',amt:500,exp:function(r,b){return r===false&&b===100;},what:'rút 500 từ số dư 100 thì bị từ chối và số dư vẫn 100'},
   {name:'rút số âm',amt:-10,exp:function(r,b){return r===false&&b===100;},what:'rút -10 thì bị từ chối và số dư vẫn 100'}];
  var res=['?','?','?'],passN=0;
  function arr(hi){return [AR('Kết quả test',res.slice(),hi===undefined?[]:[hi],[],[])];}
  c.snap({ln:14,title:'Ba test cho Withdraw',body:'Mỗi test tự tạo tài khoản riêng với số dư 100. Ô kết quả đang là ?, chưa test nào chạy.',arrs:arr()});
  var acc;
  T.forEach(function(t,k){
   var base=14+4*k,r;
   acc={b:100};
   c.snap({ln:base+1,title:'Test '+(k+1)+' - Arrange',body:'Chuẩn bị: tạo tài khoản có số dư 100.',vars:[['a','→ BankAccount#1',1]],objs:[O('BankAccount#1',[['Balance',100,'hi']],{hi:1})],arrs:arr(k)});
   r=withdraw(acc,t.amt);
   c.snap({ln:base+2,title:'Test '+(k+1)+' - Act',body:'Thực hiện: gọi Withdraw('+t.amt+'). Kết quả r = '+(r?'true':'false')+', số dư là '+acc.b+'.',vars:[['a','→ BankAccount#1'],['r',r?'true':'false',1]],objs:[O('BankAccount#1',[['Balance',acc.b,'hi']],{hi:1})],arrs:arr(k)});
   var ok=t.exp(r,acc.b);
   res[k]=ok?'✓':'✗'; if(ok)passN++;
   var line='Test '+(k+1)+': '+t.name+' → '+(ok?'đạt':'KHÔNG đạt');
   if(ok)c.out(line);else c.err(line);
   c.snap({ln:base+3,title:'Test '+(k+1)+' - Assert',body:'Kiểm tra: mong đợi '+t.what+'. '+(ok?'Đúng như mong đợi nên test đạt.':'Thực tế r = '+(r?'true':'false')+' và số dư '+acc.b+', không như mong đợi nên test KHÔNG đạt.'),vars:[['a','→ BankAccount#1'],['r',r?'true':'false']],objs:[O('BankAccount#1',[['Balance',acc.b,ok?'ok':'bad']],{hi:1})],arrs:[AR('Kết quả test',res.slice(),[],ok?[k]:[],[])]});
  });
  c.snap({ln:25,title:'Xong',body:passN+' trên 3 test đạt.'+(bug?' Test 2 báo lỗi đúng chỗ: Withdraw quên kiểm tra số dư.':' Withdraw xử lý đúng cả ba tình huống.'),
   note:bug?'Test không đạt cho ta biết lỗi nằm ở đâu. Sửa Withdraw cho kiểm tra thêm x > Balance rồi chạy lại các test.':'Mỗi test theo ba bước: Arrange chuẩn bị, Act thực hiện, Assert kiểm tra. Test đạt nghĩa là hàm cư xử đúng như ta mong đợi.',
   arrs:[AR('Kết quả test',res.slice(),[],[0,1,2].filter(function(i){return res[i]==='✓';}),[])]});
 }};}
var EX={dung:makeTab(false),loi:makeTab(true)};
