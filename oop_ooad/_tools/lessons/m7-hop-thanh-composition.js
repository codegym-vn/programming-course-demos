// META {"module":7,"lesson":"Mối quan hệ Hợp thành (Composition) và sự phụ thuộc vòng đời","activity":"Hợp thành (Composition) - Mối quan hệ mạnh mẽ","title":"Hợp thành (Composition)","lead":"Ngôi nhà tự xây các căn phòng của nó, nhà mất thì phòng mất theo. Bấm <b>Bước tiếp</b> để xem từng dòng chạy.","tabs":[["x","House và Room"]]}
var EX = {x:{
 inputs:[],
 intro:'House tự tạo ba Room ngay trong constructor, bên ngoài không đưa Room vào. Bấm "Bước tiếp".',
 lines:function(){return [
  'class House',
  '{',
  '  List<Room> rooms = new();',
  '  public House()',
  '  {',
  '    rooms.Add(new Room("Khách"));',
  '    rooms.Add(new Room("Ngủ"));',
  '    rooms.Add(new Room("Bếp"));',
  '  }',
  '}',
  'var house = new House();',
  'house = null;'];},
 run:function(c){
  var names=['Khách','Ngủ','Bếp'];
  var R=function(n,f,o){var a=[];for(var i=0;i<n;i++)a.push(O('Room#'+(i+1),[['Name',S(names[i])]],(f&&f[i])||{}));return a;};
  var H=function(n,o){var m=[];for(var i=0;i<n;i++)m.push('Room#'+(i+1));return O('House#1',[['rooms',n?'[→ '+m.join(', →')+']':'[ ]']],o);};
  c.snap({ln:0,title:'House tạo Room bên trong',body:'Constructor của House tự new các Room. Không có Room nào được truyền từ ngoài vào.'});
  c.snap({ln:10,title:'new House()',body:'House#1 được tạo, danh sách rooms rỗng. Constructor bắt đầu chạy.',
   vars:[['house','→ House#1',1]],objs:[H(0,{hi:1})]});
  c.snap({ln:5,title:'Tạo Room thứ nhất',body:'new Room("Khách") nằm trong House. Chỉ House#1 tham chiếu Room#1.',
   vars:[['house','→ House#1']],objs:[H(1,{hi:1})].concat(R(1,[{hi:1}]))});
  c.snap({ln:6,title:'Tạo Room thứ hai',body:'Room#2 cũng do House tạo ra và chỉ House giữ.',
   vars:[['house','→ House#1']],objs:[H(2,{hi:1})].concat(R(2,[{},{hi:1}]))});
  c.snap({ln:7,title:'Tạo Room thứ ba',body:'Room#3 hoàn tất. Constructor chạy xong: House#1 đã có đủ ba phòng.',
   vars:[['house','→ House#1']],objs:[H(3,{hi:1})].concat(R(3,[{},{},{hi:1}]))});
  var dim=[{dim:1},{dim:1},{dim:1}];
  c.snap({ln:11,title:'house = null',body:'Không còn ai tham chiếu House#1. Ba Room chỉ được House giữ, nên chúng cũng không còn truy cập được: tất cả sẽ bị thu hồi.',
   vars:[['house','null',1]],objs:[H(3,{dim:1})].concat(R(3,dim))});
  c.snap({ln:11,title:'Xong',body:'Không có biến nào khác giữ Room, nên Room mất cùng House.',
   note:'Hợp thành: bộ phận do toàn thể tạo ra bên trong và mất cùng toàn thể. C# thu hồi bằng bộ gom rác, không xóa ngay.',
   vars:[['house','null']],objs:[H(3,{dim:1})].concat(R(3,dim))});
 }}};
