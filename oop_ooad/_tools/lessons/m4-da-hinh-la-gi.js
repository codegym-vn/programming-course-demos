// META {"module":4,"lesson":"Giới thiệu về Đa hình trong C#","activity":"Khái niệm Đa hình là gì?","title":"Đa hình là gì?","lead":"Một dòng a.Speak() duy nhất, nhưng kết quả khác nhau tùy đối tượng. Bấm <b>Bước tiếp</b> để xem từng dòng chạy.","tabs":[["x","Một lời gọi, ba kết quả"]]}
var EX = {x:{
 inputs:[],
 intro:'Giả sử Dog, Cat, Duck đều là con của Animal và đều có Speak(). Biến a kiểu Animal sẽ lần lượt trỏ tới ba con vật khác nhau. Bấm "Bước tiếp".',
 lines:function(){return [
  'Animal a;',
  '',
  'a = new Dog();',
  'a.Speak();',
  '',
  'a = new Cat();',
  'a.Speak();',
  '',
  'a = new Duck();',
  'a.Speak();'];},
 run:function(c){
  var dog=function(o){return O('Dog#1',[['Loài',S('Chó')]],o);};
  var cat=function(o){return O('Cat#2',[['Loài',S('Mèo')]],o);};
  var duck=function(o){return O('Duck#3',[['Loài',S('Vịt')]],o);};
  c.snap({ln:0,title:'Một biến Animal',body:'Biến a có kiểu Animal. Lúc này a chưa trỏ tới đối tượng nào.',vars:[['a','null',1]]});
  c.snap({ln:2,title:'a trỏ tới Dog',body:'new Dog() tạo một con chó (Dog#1). Biến a giữ đường dẫn tới nó.',vars:[['a','→ Dog#1',1]],objs:[dog({hi:1})]});
  c.out('Gâu');
  c.snap({ln:3,title:'a.Speak() cho kết quả Gâu',body:'a đang trỏ tới Dog nên chạy Speak của Dog và in Gâu.',vars:[['a','→ Dog#1']],objs:[dog({hi:1,tag:'đang chạy Speak()'})]});
  c.snap({ln:5,title:'a đổi sang Cat',body:'Ta chỉ đổi đối tượng mà a trỏ tới: mũi tên chuyển từ Dog#1 sang Cat#2. Dog#1 không còn ai tham chiếu, sẽ bị thu hồi.',vars:[['a','→ Cat#2',1]],objs:[dog({dim:1}),cat({hi:1})]});
  c.out('Meo');
  c.snap({ln:6,title:'Vẫn là a.Speak(), kết quả Meo',body:'Dòng lệnh y hệt lúc nãy, nhưng a trỏ tới Cat nên in Meo.',vars:[['a','→ Cat#2']],objs:[dog({dim:1}),cat({hi:1,tag:'đang chạy Speak()'})]});
  c.snap({ln:8,title:'a đổi sang Duck',body:'Mũi tên của a chuyển tiếp sang Duck#3.',vars:[['a','→ Duck#3',1]],objs:[dog({dim:1}),cat({dim:1}),duck({hi:1})]});
  c.out('Quạc');
  c.snap({ln:9,title:'Vẫn là a.Speak(), kết quả Quạc',body:'Vẫn đúng dòng lệnh đó, lần này in Quạc.',vars:[['a','→ Duck#3']],objs:[dog({dim:1}),cat({dim:1}),duck({hi:1,tag:'đang chạy Speak()'})]});
  c.snap({ln:9,title:'Xong',body:'Dòng a.Speak() không đổi, chỉ có đối tượng mà a trỏ tới đổi, và kết quả đổi theo.',
   note:'Đa hình: cùng một lời gọi, đối tượng khác nhau thì cho hành vi khác nhau.',
   vars:[['a','→ Duck#3']],objs:[dog({dim:1}),cat({dim:1}),duck({})]});
 }}};
