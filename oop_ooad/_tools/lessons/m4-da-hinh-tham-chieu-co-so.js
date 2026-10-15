// META {"module":4,"lesson":"Đa hình với các lớp cơ sở và giao diện","activity":"Đa hình thông qua tham chiếu lớp cơ sở","title":"Tham chiếu lớp cơ sở","lead":"Kiểu của biến quyết định gọi được gì, đối tượng thật quyết định chạy bản nào. Bấm <b>Bước tiếp</b> để xem từng dòng chạy.","tabs":[["x","Animal a = new Dog()"]]}
var EX = {x:{
 inputs:[],
 intro:'Animal có Speak() (virtual). Dog kế thừa Animal, override Speak() và có thêm Fetch(). Bấm "Bước tiếp".',
 lines:function(){return [
  'Animal a = new Dog();',
  'a.Speak();',
  'a.Fetch();',
  '((Dog)a).Fetch();'];},
 run:function(c){
  var vn='a  (kiểu biến: Animal)';
  var dog=function(o){return O('Dog#1',[['Loài',S('Chó')]],o);};
  c.snap({ln:0,title:'Biến Animal, đối tượng Dog',body:'Hai thứ khác nhau: biến a có kiểu Animal, nhưng đối tượng nó trỏ tới là Dog.'});
  c.snap({ln:0,title:'Tạo Dog, gán cho biến Animal',body:'Kiểu biến: Animal. Đối tượng: Dog#1. Gán con cho biến kiểu cha luôn được phép.',vars:[[vn,'→ Dog#1',1]],objs:[dog({hi:1,tag:'đối tượng: Dog'})]});
  c.out('Gâu');
  c.snap({ln:1,title:'a.Speak() chạy bản của Dog',body:'Animal có Speak(), nên gọi được. Đối tượng thật là Dog nên chạy Dog.Speak và in Gâu.',vars:[[vn,'→ Dog#1']],objs:[dog({hi:1,tag:'đang chạy Dog.Speak()'})]});
  c.err("error CS1061: 'Animal' does not contain a definition for 'Fetch'");
  c.snap({ln:2,title:'a.Fetch() lỗi biên dịch',body:'Trình biên dịch chỉ nhìn kiểu biến. Animal không có Fetch, nên báo lỗi dù đối tượng thật là Dog.',vars:[[vn,'→ Dog#1']],objs:[dog({tag:'đối tượng: Dog (có Fetch)'})]});
  c.out('Dog đang nhặt bóng');
  c.snap({ln:3,title:'((Dog)a).Fetch() chạy được',body:'Ép kiểu (Dog)a cho phép nhìn đối tượng như Dog. Vì đối tượng thật là Dog nên ép thành công và Fetch chạy.',vars:[[vn,'→ Dog#1']],objs:[dog({hi:1,tag:'đang chạy Fetch()'})]});
  c.snap({ln:3,title:'Xong',body:'Speak() chạy theo đối tượng thật. Fetch() chỉ gọi được khi kiểu biến có Fetch.',
   note:'Kiểu biến quyết định được gọi những gì. Đối tượng thật quyết định bản override nào chạy.',
   vars:[[vn,'→ Dog#1']],objs:[dog({})]});
 }}};
