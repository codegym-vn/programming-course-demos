// META {"module":4,"lesson":"Đa hình với các lớp cơ sở và giao diện","activity":"Ví dụ về Đa hình với danh sách lớp cơ sở","title":"Danh sách các hình","lead":"Một vòng foreach tính diện tích cho nhiều loại hình khác nhau. Bấm <b>Bước tiếp</b> để xem từng dòng chạy.","tabs":[["x","Tổng diện tích các hình"]]}
var EX = {x:{
 inputs:[],
 intro:'Circle, Rect và Square đều kế thừa Shape và override Area(). Bấm "Bước tiếp".',
 lines:function(){return [
  'abstract class Shape',
  '{',
  '  public abstract double Area();',
  '}',
  'class Circle(double r) : Shape',
  '{',
  '  public override double Area()',
  '    => Math.PI * r * r;',
  '}',
  'class Rect(double w, double h)',
  '  : Shape',
  '{',
  '  public override double Area()',
  '    => w * h;',
  '}',
  'class Square(double a) : Shape',
  '{',
  '  public override double Area()',
  '    => a * a;',
  '}',
  '',
  'var shapes = new List<Shape>',
  '{',
  '  new Circle(2),',
  '  new Rect(3, 4),',
  '  new Square(5)',
  '};',
  'double total = 0;',
  'foreach (var s in shapes)',
  '  total += s.Area();'];},
 run:function(c){
  var r2=function(x){return Math.round(x*100)/100;};
  var names=['Circle#1','Rect#2','Square#3'];
  var fields=[['r',2],['w=3, h=4',''],['a',5]];
  var areas=[Math.PI*2*2,3*4,5*5];
  var areaLn=[7,13,18];
  var types=['Circle','Rect','Square'];
  var objs=function(cur,tag){
   var r=[];
   for(var i=0;i<3;i++){
    var f=i==0?[['r',2]]:i==1?[['w',3],['h',4]]:[['a',5]];
    r.push(O(names[i],f,i==cur?{hi:1,tag:tag}:{}));
   }
   return r;
  };
  var arr=function(cur,done){return [AR('shapes',names,cur<0?[]:[cur],done)];};
  c.snap({ln:21,title:'Tạo danh sách Shape',body:'List<Shape> chứa ba đối tượng khác loại nhưng cùng được xem là Shape.',vars:[['shapes','→ List']],objs:objs(-1),arrs:arr(-1,[])});
  var total=0;
  c.snap({ln:27,title:'total bắt đầu từ 0',body:'Biến total sẽ cộng dồn diện tích từng hình.',vars:[['total',0,1]],objs:objs(-1),arrs:arr(-1,[])});
  var done=[];
  for(var i=0;i<3;i++){
   var a=areas[i];
   c.snap({ln:28,title:'Lần lặp '+(i+1)+': s là '+types[i],body:'s có kiểu Shape nhưng đang trỏ tới '+names[i]+'. Dòng s.Area() sắp được gọi.',vars:[['s','→ '+names[i],1],['total',r2(total)]],objs:objs(i),arrs:arr(i,done.slice())});
   c.snap({ln:areaLn[i],title:'Chạy Area của '+types[i],body:'s.Area() nhảy vào bản Area của '+types[i]+' và trả về '+r2(a)+'.',vars:[['s','→ '+names[i]],['total',r2(total)],['Area()',r2(a),1]],objs:objs(i,'đang chạy Area()'),arrs:arr(i,done.slice())});
   total+=a;
   done.push(i);
   c.snap({ln:29,title:'Cộng vào total',body:'total += '+r2(a)+' nên total = '+r2(total)+'.',vars:[['s','→ '+names[i]],['total',r2(total),1]],objs:objs(i),arrs:arr(i,done.slice())});
  }
  c.snap({ln:29,title:'Xong',body:'Tổng diện tích = '+r2(areas[0])+' + '+r2(areas[1])+' + '+r2(areas[2])+' = '+r2(total)+'. Cùng một dòng s.Area() đã chạy ba bản Area khác nhau.',
   note:'Một vòng foreach trên List<Shape> xử lý được mọi loại hình, mỗi hình tự tính diện tích theo cách của nó.',
   vars:[['total',r2(total)]],objs:objs(-1),arrs:arr(-1,[0,1,2])});
 }}};
