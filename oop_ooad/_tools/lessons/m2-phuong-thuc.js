// META {"module":2,"lesson":"Các Thành phần của Lớp: Trường và Phương thức","activity":"Phương thức (Methods) và Hành vi của Đối tượng","title":"Gọi phương thức","lead":"Xem tham số đi vào, thân hàm chạy, giá trị trả về. Bấm <b>Bước tiếp</b>.","tabs":[["x","Counter.Add(step)"]]}
var EX = {x:{
 inputs:[{id:'step',label:'step lần 1',def:2,min:1,max:9}],
 chips:[1,2,5],
 intro:'Lớp Counter có Count và Add(step). Đổi giá trị step của lần gọi đầu nếu muốn, rồi bấm "Bước tiếp".',
 lines:function(P){return ['class Counter','{','  public int Count;','  public int Add(int step)','  {','    Count += step;','    return Count;','  }','}','','var c = new Counter();','int r1 = c.Add('+P.step+');','int r2 = c.Add(3);'];},
 run:function(c,P){
  var s1=P.step, t1=s1, t2=s1+3;
  var M=function(r1,r2,h){var v=[['c','→ Counter#1']];if(r1!==null)v.push(['r1',r1]);if(r2!==null)v.push(['r2',r2]);return v;};
  var ob=function(n,hi){return [O('Counter#1',[['Count',n,hi?'hi':undefined]],{hi:1})];};
  c.snap({ln:10,title:'Tạo Counter',body:'Counter#1 có Count = 0.',vars:[['c','→ Counter#1',1]],objs:ob(0)});
  c.snap({ln:3,title:'Gọi c.Add('+s1+')',body:'Chương trình nhảy vào Add. Ngăn gọi hàm có tham số step = '+s1+' và this trỏ tới đối tượng đang dùng.',vars:M(null,null).concat([['step',s1,1],['this','→ Counter#1',1]]),objs:ob(0)});
  c.snap({ln:5,title:'Count += step',body:'Count đổi từ 0 thành '+t1+'. Đây là trường của Counter#1 nên thay đổi còn lại sau khi hàm kết thúc.',vars:M(null,null).concat([['step',s1],['this','→ Counter#1']]),objs:ob(t1,1)});
  c.snap({ln:6,title:'return Count',body:'Hàm trả về '+t1+' cho nơi gọi.',vars:M(null,null).concat([['step',s1],['this','→ Counter#1'],['trả về',t1,1]]),objs:ob(t1)});
  c.snap({ln:11,title:'Quay về Main',body:'Ngăn gọi hàm biến mất. r1 nhận giá trị trả về '+t1+'. Count vẫn là '+t1+'.',vars:M(t1,null),objs:ob(t1)});
  c.snap({ln:3,title:'Gọi c.Add(3)',body:'Lần gọi thứ hai, step = 3.',vars:M(t1,null).concat([['step',3,1],['this','→ Counter#1',1]]),objs:ob(t1)});
  c.snap({ln:5,title:'Count += step',body:'Count đổi từ '+t1+' thành '+t2+'.',vars:M(t1,null).concat([['step',3],['this','→ Counter#1']]),objs:ob(t2,1)});
  c.snap({ln:6,title:'return Count',body:'Hàm trả về '+t2+'.',vars:M(t1,null).concat([['step',3],['this','→ Counter#1'],['trả về',t2,1]]),objs:ob(t2)});
  c.snap({ln:12,title:'Xong',body:'r2 nhận '+t2+'. Ngăn gọi hàm lại biến mất.',note:'Gọi phương thức: truyền tham số vào, chạy thân hàm, có thể đổi trạng thái đối tượng và trả về giá trị.',vars:M(t1,t2),objs:ob(t2)});
 }}};
