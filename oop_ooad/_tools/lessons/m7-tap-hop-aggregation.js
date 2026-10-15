// META {"module":7,"lesson":"Phân biệt Tập hợp (Aggregation) với Kết hợp","activity":"Minh họa Tập hợp trong đời sống và mã nguồn","title":"Tập hợp (Aggregation)","lead":"Đội bóng chứa cầu thủ, nhưng cầu thủ được tạo ở ngoài và sống tiếp khi đội giải tán. Bấm <b>Bước tiếp</b> để xem từng dòng chạy.","tabs":[["x","Team và Player"]]}
var EX = {x:{
 inputs:[],
 intro:'Cầu thủ (Player) được tạo ở Main rồi mới đưa vào đội (Team). Bấm "Bước tiếp".',
 lines:function(){return [
  'var p = new Player("An");',
  'var team = new Team();',
  'team.Add(p);',
  'team = null;',
  'var team2 = new Team();',
  'team2.Add(p);',
  'Console.WriteLine(p.Name);'];},
 run:function(c){
  var P=function(o){return O('Player#1',[['Name',S('An')]],o);};
  var T1=function(m,o){return O('Team#1',[['players',m]],o);};
  var T2=function(m,o){return O('Team#2',[['players',m]],o);};
  c.snap({ln:0,title:'Tạo Player ở bên ngoài',body:'Player#1 được tạo ở Main, chưa thuộc đội nào. Biến p giữ nó.',
   vars:[['p','→ Player#1',1]],objs:[P({hi:1})]});
  c.snap({ln:1,title:'Tạo Team',body:'Team#1 là một đội rỗng.',
   vars:[['p','→ Player#1'],['team','→ Team#1',1]],objs:[P(),T1('[ ]',{hi:1})]});
  c.snap({ln:2,title:'Đưa Player vào Team',body:'team.Add(p) chỉ bỏ tham chiếu vào danh sách. Player#1 không do Team tạo ra, nó được truyền từ ngoài vào.',
   vars:[['p','→ Player#1'],['team','→ Team#1']],objs:[P({hi:1}),T1('[→ Player#1]',{hi:1})]});
  c.snap({ln:3,title:'team = null',body:'Không còn ai tham chiếu Team#1, nên nó sẽ bị thu hồi. Player#1 vẫn còn vì biến p vẫn giữ nó.',
   vars:[['p','→ Player#1'],['team','null',1]],objs:[P(),T1('[→ Player#1]',{dim:1})]});
  c.snap({ln:4,title:'Tạo Team thứ hai',body:'Team#2 là một đội mới, đang rỗng.',
   vars:[['p','→ Player#1'],['team','null'],['team2','→ Team#2',1]],objs:[P(),T1('[→ Player#1]',{dim:1}),T2('[ ]',{hi:1})]});
  c.snap({ln:5,title:'Player chuyển sang đội mới',body:'Player#1 vẫn dùng được, nên có thể gia nhập Team#2.',
   vars:[['p','→ Player#1'],['team','null'],['team2','→ Team#2']],objs:[P({hi:1}),T1('[→ Player#1]',{dim:1}),T2('[→ Player#1]',{hi:1})]});
  c.out('An');
  c.snap({ln:6,title:'Xong',body:'Player#1 vẫn còn nguyên: nó sống độc lập với đội cũ.',
   note:'Tập hợp: toàn thể chứa bộ phận, nhưng bộ phận được tạo bên ngoài và vẫn sống khi toàn thể mất.',
   vars:[['p','→ Player#1'],['team','null'],['team2','→ Team#2']],objs:[P(),T1('[→ Player#1]',{dim:1}),T2('[→ Player#1]')]});
 }}};
