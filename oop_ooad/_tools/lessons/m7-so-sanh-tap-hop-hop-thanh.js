// META {"module":7,"lesson":"Mối quan hệ Hợp thành (Composition) và sự phụ thuộc vòng đời","activity":"So sánh Tập hợp và Hợp thành","title":"Tập hợp hay Hợp thành?","lead":"Hai cột chạy cùng nhịp: bên trái bộ phận được tạo ở ngoài, bên phải bộ phận do toàn thể tự tạo. Bấm <b>Bước tiếp</b> để chạy.","tabs":[["x","Department và Car"]]}
var EX = {x:{
 intro:'Cả hai cột cuối cùng đều gán toàn thể = null. Hãy xem bộ phận còn hay mất.',
 running:'Trái: Employee được tạo ở ngoài. Phải: Engine do Car tự tạo.',
 done:'Cột trái: Employee vẫn còn (tập hợp). Cột phải: Engine không còn truy cập được (hợp thành).',
 note:'Khác nhau ở chỗ ai tạo bộ phận: tạo ở ngoài thì bộ phận sống tiếp (tập hợp), toàn thể tự tạo thì mất cùng toàn thể (hợp thành).',
 cols:[
 {title:'Tập hợp',sub:'Department - Employee',
  lines:['var e = new Employee("An");','var d = new Department();','d.Add(e);','d = null;','Console.WriteLine(e.Name);'],
  run:function(c){
   var E=function(o){return O('Employee#1',[['Name',S('An')]],o);};
   var D=function(m,o){return O('Department#1',[['staff',m]],o);};
   c.snap({ln:0,title:'Tạo Employee ở ngoài',body:'Employee#1 được tạo trước, do Main giữ qua biến e.',vars:[['e','→ Employee#1',1]],objs:[E({hi:1})]});
   c.snap({ln:1,title:'Tạo Department',body:'Department#1 còn rỗng.',vars:[['e','→ Employee#1'],['d','→ Department#1',1]],objs:[E(),D('[ ]',{hi:1})]});
   c.snap({ln:2,title:'Thêm Employee vào',body:'Department chỉ giữ thêm một tham chiếu tới Employee#1.',vars:[['e','→ Employee#1'],['d','→ Department#1']],objs:[E({hi:1}),D('[→ Employee#1]',{hi:1})]});
   c.snap({ln:3,title:'d = null',body:'Department#1 không còn ai tham chiếu, sẽ bị thu hồi. Employee#1 vẫn có biến e giữ.',vars:[['e','→ Employee#1'],['d','null',1]],objs:[E(),D('[→ Employee#1]',{dim:1})]});
   c.out('An');
   c.snap({ln:4,title:'Employee vẫn còn',body:'e.Name in ra An: bộ phận sống tiếp khi toàn thể mất.',vars:[['e','→ Employee#1'],['d','null']],objs:[E(),D('[→ Employee#1]',{dim:1})]});
  }},
 {title:'Hợp thành',sub:'Car - Engine',
  lines:['class Car','{','  Engine engine = new Engine();','}','var car = new Car();','car = null;'],
  run:function(c){
   var En=function(o){return O('Engine#1',[['Hp',100]],o);};
   var Ca=function(o){return O('Car#1',[['engine','→ Engine#1']],o);};
   c.snap({ln:2,title:'Car tự tạo Engine',body:'Engine được new ngay trong Car. Bên ngoài không đưa Engine vào.'});
   c.snap({ln:4,title:'new Car()',body:'Tạo Car#1 thì Engine#1 cũng được tạo luôn, bên trong Car.',vars:[['car','→ Car#1',1]],objs:[Ca({hi:1}),En({hi:1})]});
   c.snap({ln:4,title:'Chỉ Car giữ Engine',body:'Không có biến nào ngoài Car trỏ tới Engine#1.',vars:[['car','→ Car#1']],objs:[Ca(),En()]});
   c.snap({ln:5,title:'car = null',body:'Car#1 không còn ai tham chiếu, sẽ bị thu hồi.',vars:[['car','null',1]],objs:[Ca({dim:1}),En()]});
   c.snap({ln:5,title:'Engine mất theo',body:'Engine#1 chỉ được Car giữ, nên cũng không còn truy cập được và sẽ bị thu hồi.',vars:[['car','null']],objs:[Ca({dim:1}),En({dim:1})]});
  }}
 ]}};
