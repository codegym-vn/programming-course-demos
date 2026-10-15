// META {"module":4,"lesson":"Đa hình với các lớp cơ sở và giao diện","activity":"Đa hình với Interface (giới thiệu)","title":"Đa hình với Interface","lead":"Employee và Invoice không cùng cha, nhưng cùng dùng được qua interface IPayable. Bấm <b>Bước tiếp</b> để xem từng dòng chạy.","tabs":[["x","Cộng tổng tiền phải trả"]]}
var EX = {x:{
 inputs:[],
 intro:'Employee (nhân viên) và Invoice (hóa đơn) là hai lớp không liên quan. Cả hai cùng cam kết có GetAmount() bằng interface IPayable. Bấm "Bước tiếp".',
 lines:function(){return [
  'interface IPayable',
  '{',
  '  decimal GetAmount();',
  '}',
  'class Employee(decimal salary)',
  '  : IPayable',
  '{',
  '  public decimal GetAmount()',
  '    => salary;',
  '}',
  'class Invoice(decimal total)',
  '  : IPayable',
  '{',
  '  public decimal GetAmount()',
  '    => total;',
  '}',
  '',
  'var list = new List<IPayable>',
  '{',
  '  new Employee(5000),',
  '  new Invoice(1200)',
  '};',
  'decimal sum = 0;',
  'foreach (var p in list)',
  '  sum += p.GetAmount();'];},
 run:function(c){
  var box=function(n,hiN,hiS){return {boxes:[
   {id:'I',name:'IPayable',stereo:'interface',methods:[{t:'+ GetAmount(): decimal',hi:hiN==='I'}],c:0,r:0,hi:hiN==='I'},
   {id:'E',name:'Employee',attrs:['- salary: decimal'],methods:['+ GetAmount(): decimal'],c:0,r:1,hi:hiN==='E',dim:n<2},
   {id:'V',name:'Invoice',attrs:['- total: decimal'],methods:['+ GetAmount(): decimal'],c:1,r:1,hi:hiN==='V',dim:n<3}].slice(0,n<2?1:n<3?2:3),
   links:(n>=2?[{a:'E',b:'I',type:'real'}]:[]).concat(n>=3?[{a:'V',b:'I',type:'real'}]:[])};};
  var emp=function(o){return O('Employee#1',[['salary',5000]],o);};
  var inv=function(o){return O('Invoice#2',[['total',1200]],o);};
  var amounts=[5000,1200];
  var types=['Employee','Invoice'];
  var names=['Employee#1','Invoice#2'];
  var ids=['E','V'];
  var objs=function(cur,tag){return [emp(cur===0?{hi:1,tag:tag}:{}),inv(cur===1?{hi:1,tag:tag}:{})];};
  var arr=function(cur,done){return [AR('list',names,cur<0?[]:[cur],done)];};
  c.snap({ln:0,title:'Interface IPayable',body:'IPayable chỉ đặt ra một cam kết: lớp nào thực thi nó phải có GetAmount().',uml:box(1)});
  c.snap({ln:4,title:'Employee thực thi IPayable',body:'Employee có GetAmount() trả về lương. Mũi tên nét đứt nghĩa là Employee thực thi IPayable.',uml:box(2,'E')});
  c.snap({ln:10,title:'Invoice cũng thực thi IPayable',body:'Invoice là lớp hoàn toàn khác, không cùng cha với Employee, nhưng cũng có GetAmount().',uml:box(3,'V')});
  c.snap({ln:17,title:'Danh sách IPayable',body:'List<IPayable> chứa được cả Employee lẫn Invoice vì cả hai đều là IPayable.',vars:[['list','→ List']],objs:objs(-1),arrs:arr(-1,[]),uml:box(3)});
  var sum=0, done=[];
  c.snap({ln:22,title:'sum bắt đầu từ 0',body:'Biến sum sẽ cộng dồn số tiền từng phần tử.',vars:[['sum',0,1]],objs:objs(-1),arrs:arr(-1,[]),uml:box(3)});
  for(var i=0;i<2;i++){
   c.snap({ln:23,title:'Lần lặp '+(i+1)+': p là '+types[i],body:'p có kiểu IPayable nhưng đang trỏ tới '+names[i]+'.',vars:[['p','→ '+names[i],1],['sum',sum]],objs:objs(i),arrs:arr(i,done.slice()),uml:box(3,ids[i])});
   c.snap({ln:i==0?8:14,title:'Chạy GetAmount của '+types[i],body:'p.GetAmount() chạy bản của '+types[i]+' và trả về '+amounts[i]+'.',vars:[['p','→ '+names[i]],['sum',sum],['GetAmount()',amounts[i],1]],objs:objs(i,'đang chạy GetAmount()'),arrs:arr(i,done.slice()),uml:box(3,ids[i])});
   sum+=amounts[i]; done.push(i);
   c.snap({ln:24,title:'Cộng vào sum',body:'sum += '+amounts[i]+' nên sum = '+sum+'.',vars:[['p','→ '+names[i]],['sum',sum,1]],objs:objs(i),arrs:arr(i,done.slice()),uml:box(3,ids[i])});
  }
  c.snap({ln:24,title:'Xong',body:'Tổng tiền = '+amounts[0]+' + '+amounts[1]+' = '+sum+'. Hai lớp không liên quan vẫn được xử lý chung nhờ interface.',
   note:'Interface cho các lớp không cùng cha dùng chung một cách gọi. Chỉ cần biết đối tượng là IPayable là gọi được GetAmount().',
   vars:[['sum',sum]],objs:objs(-1),arrs:arr(-1,[0,1]),uml:box(3)});
 }}};
