// META {"module":7,"lesson":"Hiểu rõ mối quan hệ Kết hợp (Association)","activity":"Giới thiệu về Kết hợp (Association)","title":"Kết hợp (Association)","lead":"Teacher giữ danh sách Student, nhưng mỗi bên vẫn sống độc lập. Bấm <b>Bước tiếp</b> để xem từng dòng chạy.","tabs":[["x","Teacher và Student"]]}
var EX = {x:{
 inputs:[],
 intro:'Lớp Teacher có một danh sách List<Student>. Ta tạo một Teacher và hai Student rồi nối chúng lại. Bấm "Bước tiếp".',
 lines:function(){return [
  '// Teacher có List<Student>',
  'var t = new Teacher();',
  'var s1 = new Student("An");',
  'var s2 = new Student("Bình");',
  't.AddStudent(s1);',
  't.AddStudent(s2);',
  't = null;',
  'Console.WriteLine(s1.Name);'];},
 run:function(c){
  var T=function(o){return O('Teacher#1',[['students','→ list']],o);};
  var S1=function(f,o){return O('Student#1',[['Name',S('An'),f]],o);};
  var S2=function(f,o){return O('Student#2',[['Name',S('Bình'),f]],o);};
  c.snap({ln:0,title:'Teacher có danh sách Student',body:'Teacher giữ một List<Student>. Đây là quan hệ Kết hợp: Teacher biết các Student qua tham chiếu.'});
  c.snap({ln:1,title:'Tạo Teacher',body:'new Teacher() tạo Teacher#1. Danh sách students ban đầu còn rỗng.',
   vars:[['t','→ Teacher#1',1]],objs:[T({hi:1})],arrs:[AR('students',[])]});
  c.snap({ln:2,title:'Tạo Student thứ nhất',body:'Student#1 được tạo, biến s1 giữ nó. Student#1 chưa liên quan gì tới Teacher.',
   vars:[['t','→ Teacher#1'],['s1','→ Student#1',1]],objs:[T(),S1('',{hi:1})],arrs:[AR('students',[])]});
  c.snap({ln:3,title:'Tạo Student thứ hai',body:'Student#2 được tạo, biến s2 giữ nó.',
   vars:[['t','→ Teacher#1'],['s1','→ Student#1'],['s2','→ Student#2',1]],objs:[T(),S1(''),S2('',{hi:1})],arrs:[AR('students',[])]});
  c.snap({ln:4,title:'Thêm s1 vào Teacher',body:'AddStudent(s1) bỏ tham chiếu tới Student#1 vào danh sách. Từ Teacher#1 giờ có đường tới Student#1.',
   vars:[['t','→ Teacher#1'],['s1','→ Student#1'],['s2','→ Student#2']],objs:[T({hi:1}),S1('',{hi:1}),S2('')],arrs:[AR('students',['→ Student#1'],[0])]});
  c.snap({ln:5,title:'Thêm s2 vào Teacher',body:'Danh sách giờ có hai tham chiếu: tới Student#1 và Student#2.',
   vars:[['t','→ Teacher#1'],['s1','→ Student#1'],['s2','→ Student#2']],objs:[T({hi:1}),S1(''),S2('',{hi:1})],arrs:[AR('students',['→ Student#1','→ Student#2'],[1])]});
  c.snap({ln:6,title:'t = null',body:'Không còn biến nào giữ Teacher#1, nên Teacher#1 và danh sách của nó sẽ bị thu hồi. Hai Student vẫn còn vì s1 và s2 vẫn giữ chúng.',
   vars:[['t','null',1],['s1','→ Student#1'],['s2','→ Student#2']],objs:[T({dim:1}),S1(''),S2('')],arrs:[AR('students',['→ Student#1','→ Student#2'],[],[],[0,1])]});
  c.out('An');
  c.snap({ln:7,title:'Xong',body:'s1.Name vẫn in ra An: Student vẫn dùng được dù Teacher đã mất.',
   note:'Kết hợp: hai đối tượng biết nhau qua tham chiếu nhưng sống độc lập. Một bên mất đi, bên kia vẫn còn nếu còn biến giữ nó.',
   vars:[['t','null'],['s1','→ Student#1'],['s2','→ Student#2']],objs:[T({dim:1}),S1(''),S2('')],arrs:[AR('students',['→ Student#1','→ Student#2'],[],[],[0,1])]});
 }}};
