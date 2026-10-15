// META {"module":7,"lesson":"Hiểu rõ mối quan hệ Kết hợp (Association)","activity":"Đa số (Multiplicity) trong Kết hợp","title":"Đa số (Multiplicity)","lead":"Con số ở đầu đường nối cho biết có bao nhiêu đối tượng ở đầu kia. Chọn một tab rồi bấm <b>Bước tiếp</b>.","tabs":[["pp","Person 0..1 Passport"],["oi","Order 1..* OrderItem"],["cs","Classroom * Student"]]}
function ok(n,min,max){return n>=min&&(max===null||n<=max);}
function M(boxes,la,lb){
 return function(hiA,hiB){
  return {boxes:[{id:'A',name:boxes[0],c:0,r:0,hi:hiA},{id:'B',name:boxes[1],c:1,r:0,hi:hiB}],links:[{a:'A',b:'B',type:'assoc',la:la,lb:lb}]};
 };
}
var EX = {
 pp:{inputs:[],
  intro:'Một Person có tối đa một Passport (0..1). Bấm "Bước tiếp".',
  lines:function(){return [
   'class Person',
   '{',
   '  public Passport Passport;',
   '  public bool Set(Passport x)',
   '  {',
   '    if (Passport != null)',
   '      return false;',
   '    Passport = x;',
   '    return true;',
   '  }',
   '}',
   'var p = new Person();',
   'p.Set(new Passport("A1"));',
   'p.Set(new Passport("B2"));'];},
  run:function(c){
   var u=M(['Person','Passport'],'1','0..1');
   var st=function(n){return [['Số Passport',n],['Trạng thái',ok(n,0,1)?'hợp lệ':'không hợp lệ']];};
   c.snap({ln:0,title:'Đọc đa số 0..1',body:'0..1 nghĩa là một Person có không hoặc một Passport, không được hai.',uml:u(1,1),vars:st(0)});
   c.snap({ln:11,title:'Tạo Person',body:'Person#1 chưa có Passport. Có 0 Passport vẫn hợp lệ vì đa số cho phép 0.',
    uml:u(1,0),vars:st(0),objs:[O('Person#1',[['Passport','null']],{hi:1})]});
   c.snap({ln:7,title:'Gán Passport thứ nhất',body:'Person chưa có hộ chiếu nên Set nhận Passport#1 và trả về true. Có 1 Passport, vẫn hợp lệ.',
    uml:u(1,1),vars:st(1),objs:[O('Person#1',[['Passport','→ Passport#1','ok']],{hi:1}),O('Passport#1',[['No',S('A1')]],{hi:1})]});
   c.snap({ln:6,title:'Gán Passport thứ hai bị từ chối',body:'Person đã có hộ chiếu nên Set trả về false. Passport#2 không được nhận, Person vẫn chỉ có 1 hộ chiếu, đúng với 0..1.',
    uml:u(1,0),vars:st(1),objs:[O('Person#1',[['Passport','→ Passport#1','ok']]),O('Passport#1',[['No',S('A1')]]),O('Passport#2',[['No',S('B2')]],{dim:1})]});
   c.snap({ln:13,title:'Xong',body:'Số Passport của Person không bao giờ vượt quá 1.',note:'0..1: không có hoặc có một. Muốn giữ đúng đa số thì phải tự kiểm tra trong code.',
    uml:u(1,1),vars:st(1),objs:[O('Person#1',[['Passport','→ Passport#1']]),O('Passport#1',[['No',S('A1')]]),O('Passport#2',[['No',S('B2')]],{dim:1})]});
  }},
 oi:{inputs:[],
  intro:'Một Order phải có ít nhất một OrderItem (1..*). Bấm "Bước tiếp".',
  lines:function(){return [
   'class Order',
   '{',
   '  public List<OrderItem> Items',
   '    = new();',
   '}',
   'var o = new Order();',
   'o.Items.Add(new OrderItem("Bút"));',
   'o.Items.Add(new OrderItem("Vở"));'];},
  run:function(c){
   var u=M(['Order','OrderItem'],'1','1..*');
   var names=['Bút','Vở'];
   var st=function(n){return [['Số OrderItem',n,0],['Trạng thái',ok(n,1,null)?'hợp lệ':'không hợp lệ',ok(n,1,null)?0:1]];};
   var objs=function(n,hi){
    var a=[O('Order#1',[['Items','list ('+n+')']],{hi:hi===0})],i;
    for(i=0;i<n;i++)a.push(O('OrderItem#'+(i+1),[['Name',S(names[i])]],{hi:hi===i+1}));
    return a;};
   var arr=function(n,hi){var v=[],i;for(i=0;i<n;i++)v.push('→ OrderItem#'+(i+1));return [AR('Items',v,hi?[n-1]:[])];};
   c.snap({ln:0,title:'Đọc đa số 1..*',body:'1..* nghĩa là một Order có từ một OrderItem trở lên, không được rỗng.',uml:u(1,1),vars:st(0)});
   c.snap({ln:5,title:'Order vừa tạo còn rỗng',body:'Order#1 chưa có OrderItem nào. Với 1..* thì 0 là chưa đủ, nên trạng thái là không hợp lệ.',
    uml:u(1,0),vars:st(0),objs:objs(0,0),arrs:arr(0)});
   c.snap({ln:6,title:'Thêm OrderItem đầu tiên',body:'Giờ Order có 1 OrderItem, đạt mức tối thiểu của 1..* nên hợp lệ.',
    uml:u(1,1),vars:st(1),objs:objs(1,1),arrs:arr(1,1)});
   c.snap({ln:7,title:'Thêm OrderItem thứ hai',body:'2 OrderItem vẫn hợp lệ vì không có mức tối đa.',
    uml:u(1,1),vars:st(2),objs:objs(2,2),arrs:arr(2,1)});
   c.snap({ln:7,title:'Xong',body:'Order hợp lệ khi có ít nhất một OrderItem.',note:'1..*: từ một trở lên. Rỗng là không hợp lệ.',
    uml:u(1,1),vars:st(2),objs:objs(2,-1),arrs:arr(2)});
  }},
 cs:{inputs:[],
  intro:'Một Classroom có thể có bao nhiêu Student cũng được (*). Bấm "Bước tiếp".',
  lines:function(){return [
   'class Classroom',
   '{',
   '  public List<Student> List',
   '    = new();',
   '}',
   'var c = new Classroom();',
   'c.List.Add(new Student("An"));',
   'c.List.Add(new Student("Bình"));',
   'c.List.Add(new Student("Chi"));'];},
  run:function(c){
   var u=M(['Classroom','Student'],'1','*');
   var names=['An','Bình','Chi'];
   var st=function(n){return [['Số Student',n],['Trạng thái',ok(n,0,null)?'hợp lệ':'không hợp lệ']];};
   var objs=function(n,hi){
    var a=[O('Classroom#1',[['List','list ('+n+')']],{hi:hi===0})],i;
    for(i=0;i<n;i++)a.push(O('Student#'+(i+1),[['Name',S(names[i])]],{hi:hi===i+1}));
    return a;};
   var arr=function(n){var v=[],i;for(i=0;i<n;i++)v.push('→ Student#'+(i+1));return [AR('List',v,n?[n-1]:[])];};
   c.snap({ln:0,title:'Đọc đa số *',body:'Dấu * nghĩa là không hoặc nhiều. Không có giới hạn tối thiểu hay tối đa.',uml:u(1,1),vars:st(0)});
   c.snap({ln:5,title:'Classroom rỗng',body:'0 Student vẫn hợp lệ vì * cho phép 0.',uml:u(1,0),vars:st(0),objs:objs(0,0),arrs:arr(0)});
   c.snap({ln:6,title:'Thêm Student thứ nhất',body:'Có 1 Student, hợp lệ.',uml:u(1,1),vars:st(1),objs:objs(1,1),arrs:arr(1)});
   c.snap({ln:7,title:'Thêm Student thứ hai',body:'Có 2 Student, vẫn hợp lệ.',uml:u(1,1),vars:st(2),objs:objs(2,2),arrs:arr(2)});
   c.snap({ln:8,title:'Thêm Student thứ ba',body:'Có 3 Student, thêm bao nhiêu cũng được.',uml:u(1,1),vars:st(3),objs:objs(3,3),arrs:arr(3)});
   c.snap({ln:8,title:'Xong',body:'Với dấu *, trạng thái luôn hợp lệ.',note:'*: không hoặc nhiều, không có giới hạn.',uml:u(1,1),vars:st(3),objs:objs(3,-1),arrs:arr(3)});
  }}
};
