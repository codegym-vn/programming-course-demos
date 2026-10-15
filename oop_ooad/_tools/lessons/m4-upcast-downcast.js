// META {"module":4,"lesson":"Đa hình với các lớp cơ sở và giao diện","activity":"Phân biệt Upcasting và Downcasting","title":"Upcasting và Downcasting","lead":"Chọn tab để xem từng trường hợp ép kiểu. Bấm <b>Bước tiếp</b> để xem từng dòng chạy.","tabs":[["up","Upcast"],["down","Downcast đúng"],["sai","Downcast sai"],["as","Dùng as và is"]]}
var EX = (function(){
 var dog=function(o){return O('Dog#1',[['Loài',S('Chó')]],o);};
 return {
up:{
 inputs:[],
 intro:'Upcast là gán đối tượng con cho biến kiểu cha. Bấm "Bước tiếp".',
 lines:function(){return [
  'Dog dog = new Dog();',
  'Animal a = dog;',
  'a.Speak();'];},
 run:function(c){
  c.snap({ln:0,title:'Tạo Dog',body:'Biến dog kiểu Dog trỏ tới đối tượng Dog#1.',vars:[['dog','→ Dog#1',1]],objs:[dog({hi:1})]});
  c.snap({ln:1,title:'Upcast: Dog thành Animal',body:'Gán con cho biến kiểu cha. Không cần ép kiểu, luôn an toàn vì Dog chắc chắn là một Animal. Vẫn chỉ có một đối tượng, nay có hai biến cùng trỏ tới.',vars:[['dog','→ Dog#1'],['a','→ Dog#1',1]],objs:[dog({hi:1})]});
  c.out('Gâu');
  c.snap({ln:2,title:'a.Speak() vẫn chạy bản của Dog',body:'Đối tượng thật vẫn là Dog nên in Gâu.',vars:[['dog','→ Dog#1'],['a','→ Dog#1']],objs:[dog({hi:1,tag:'đang chạy Dog.Speak()'})]});
  c.snap({ln:2,title:'Xong',body:'Upcast không làm đối tượng đổi, chỉ đổi cách nhìn: qua biến a chỉ thấy phần của Animal.',note:'Upcast (con thành cha) luôn an toàn và không cần ép kiểu.',vars:[['dog','→ Dog#1'],['a','→ Dog#1']],objs:[dog({})]});
 }},
down:{
 inputs:[],
 intro:'Downcast là đưa biến kiểu cha về kiểu con. Bấm "Bước tiếp".',
 lines:function(){return [
  'Animal a = new Dog();',
  'Dog d = (Dog)a;',
  'd.Fetch();'];},
 run:function(c){
  c.snap({ln:0,title:'a kiểu Animal, đối tượng Dog',body:'Biến a có kiểu Animal nhưng đối tượng thật là Dog#1.',vars:[['a','→ Dog#1',1]],objs:[dog({hi:1})]});
  c.snap({ln:1,title:'Downcast (Dog)a thành công',body:'Cần ép kiểu rõ ràng. Lúc chạy, C# kiểm tra đối tượng thật: đúng là Dog nên ép được. d trỏ tới cùng đối tượng.',vars:[['a','→ Dog#1'],['d','→ Dog#1',1]],objs:[dog({hi:1})]});
  c.out('Dog đang nhặt bóng');
  c.snap({ln:2,title:'d.Fetch() chạy được',body:'d có kiểu Dog nên gọi được Fetch của Dog.',vars:[['a','→ Dog#1'],['d','→ Dog#1']],objs:[dog({hi:1,tag:'đang chạy Fetch()'})]});
  c.snap({ln:2,title:'Xong',body:'Downcast chỉ đúng khi đối tượng thật là kiểu đó.',note:'Downcast (cha thành con) cần ép kiểu và chỉ thành công nếu đối tượng thật đúng là kiểu con đó.',vars:[['a','→ Dog#1'],['d','→ Dog#1']],objs:[dog({})]});
 }},
sai:{
 inputs:[],
 intro:'Lần này ép đối tượng Dog sang kiểu Cat. Bấm "Bước tiếp".',
 lines:function(){return [
  'Animal a = new Dog();',
  'Cat c = (Cat)a;',
  'c.Meow();'];},
 run:function(c){
  c.snap({ln:0,title:'a kiểu Animal, đối tượng Dog',body:'Biến a có kiểu Animal nhưng đối tượng thật là Dog#1.',vars:[['a','→ Dog#1',1]],objs:[dog({hi:1})]});
  c.err("Unhandled exception. System.InvalidCastException: Unable to cast object of type 'Dog' to type 'Cat'.");
  c.snap({ln:1,title:'Downcast (Cat)a thất bại',body:'Đối tượng thật là Dog, không phải Cat. Code vẫn biên dịch được, nhưng lúc chạy C# ném InvalidCastException và chương trình dừng.',vars:[['a','→ Dog#1']],objs:[dog({})]});
  c.snap({ln:1,title:'Xong',body:'Dòng c.Meow() không bao giờ được chạy.',note:'Downcast sai kiểu gây lỗi InvalidCastException lúc chạy. Hãy kiểm tra kiểu trước khi ép.',vars:[['a','→ Dog#1']],objs:[dog({})]});
 }},
as:{
 inputs:[],
 intro:'Dùng as và is để kiểm tra kiểu một cách an toàn. Bấm "Bước tiếp".',
 lines:function(){return [
  'Animal a = new Dog();',
  'Cat c = a as Cat;',
  'if (a is Dog d)',
  '  d.Fetch();'];},
 run:function(c){
  c.snap({ln:0,title:'a kiểu Animal, đối tượng Dog',body:'Biến a có kiểu Animal nhưng đối tượng thật là Dog#1.',vars:[['a','→ Dog#1',1]],objs:[dog({hi:1})]});
  c.snap({ln:1,title:'a as Cat cho null',body:'as thử ép sang Cat. Đối tượng là Dog nên không ép được, nhưng as không ném lỗi mà trả về null.',vars:[['a','→ Dog#1'],['c','null',1]],objs:[dog({})]});
  c.snap({ln:2,title:'a is Dog d đúng',body:'is kiểm tra đối tượng thật có phải Dog không. Đúng, nên d được gán trỏ tới cùng đối tượng.',vars:[['a','→ Dog#1'],['c','null'],['d','→ Dog#1',1]],objs:[dog({hi:1})]});
  c.out('Dog đang nhặt bóng');
  c.snap({ln:3,title:'d.Fetch() chạy',body:'Bên trong if, d chắc chắn là Dog nên gọi Fetch an toàn.',vars:[['a','→ Dog#1'],['c','null'],['d','→ Dog#1']],objs:[dog({hi:1,tag:'đang chạy Fetch()'})]});
  c.snap({ln:3,title:'Xong',body:'as trả null thay vì lỗi. is kiểm tra rồi gán biến trong một dòng.',note:'Dùng as hoặc is để ép kiểu an toàn: không bị InvalidCastException.',vars:[['a','→ Dog#1'],['c','null'],['d','→ Dog#1']],objs:[dog({})]});
 }}
 };
})();
