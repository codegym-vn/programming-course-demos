// META {"module":2,"lesson":"Hàm tạo (Constructors) và Khởi tạo Đối tượng","activity":"Các loại Hàm tạo và Nạp chồng Hàm tạo","title":"Nạp chồng Constructor","lead":"Lớp Point có 3 constructor. Chọn lời gọi new rồi bấm <b>Bước tiếp</b> để xem C# chọn constructor nào.","tabs":[["p0","new Point()"],["p1","new Point(5)"],["p2","new Point(5, 7)"]]}
function makePoint(call,n,x,y){
 var CODE=['class Point','{','  public int X, Y;','  public Point() : this(0, 0)','  { }','  public Point(int x) : this(x, 0)','  { }','  public Point(int x, int y)','  {','    X = x;','    Y = y;','  }','}','','var p = '+call+';'];
 var sel=[3,5,7][n], word=['không có đối số','một đối số int','hai đối số int'][n];
 return {inputs:[],intro:'Gọi '+call+'. C# chọn constructor theo số lượng và kiểu đối số. Bấm "Bước tiếp".',
 lines:function(){return CODE;},
 run:function(c){
  var ob=function(a,b,f,h){return [O('Point#1',[['X',a,f==1?'hi':undefined],['Y',b,f==2?'hi':undefined]],{hi:1,tag:h})];};
  var Ph=[['p','chưa gán']];
  c.snap({ln:14,title:'new '+call.slice(4),body:'Bước đầu của new là cấp bộ nhớ: X = 0, Y = 0 (mặc định).',objs:ob(0,0)});
  c.snap({ln:sel,title:'Chọn constructor',body:'Lời gọi '+word+', nên C# chọn constructor ở dòng '+(sel+1)+'. Việc chọn xảy ra lúc biên dịch.',objs:ob(0,0,0,'constructor được chọn')});
  if(n<2){
   var ar=n==0?[0,0]:[x,0];
   c.snap({ln:7,title:': this('+ar[0]+', '+ar[1]+') nhảy sang constructor đầy đủ',body:'Phần : this(...) gọi constructor khác của cùng lớp, chạy trước thân của constructor hiện tại. Tham số x = '+ar[0]+', y = '+ar[1]+'.',vars:[['x',ar[0]],['y',ar[1]]],objs:ob(0,0,0,'Point(int x, int y)')});
  }
  c.snap({ln:9,title:'X = x',body:'Thân constructor đầy đủ gán X = '+x+'.',vars:[['x',x],['y',y]],objs:ob(x,0,1,'Point(int x, int y)')});
  c.snap({ln:10,title:'Y = y',body:'Y = '+y+'.',vars:[['x',x],['y',y]],objs:ob(x,y,2,'Point(int x, int y)')});
  c.snap({ln:14,title:'Xong',body:'p trỏ tới Point#1 với X = '+x+', Y = '+y+'.'+(n<2?' Thân rỗng { } của constructor ban đầu chạy sau cùng, không đổi gì.':''),note:'Nhiều constructor khác tham số: C# chọn theo đối số. Dùng : this(...) để constructor ngắn gọi constructor đầy đủ, khỏi viết lặp.',vars:[['p','→ Point#1']],objs:ob(x,y)});
 }};
}
var EX={p0:makePoint('new Point()',0,0,0),p1:makePoint('new Point(5)',1,5,0),p2:makePoint('new Point(5, 7)',2,5,7)};
