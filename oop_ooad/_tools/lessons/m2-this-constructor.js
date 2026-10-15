// META {"module":2,"lesson":"Hàm tạo (Constructors) và Khởi tạo Đối tượng","activity":"Sử dụng từ khóa 'this' trong Hàm tạo","title":"this trong Constructor","lead":"Cùng gọi new Person(\"An\"), chỉ khác một dòng gán. Bấm <b>Bước tiếp</b> để hai cột cùng chạy.","tabs":[["x","name = name và this.name = name"]]}
function col(title,sub,assign,fixed){
 var A=fixed?'    this.name = name;':'    name = name;';
 return {title:title,sub:sub,
 lines:['class Person','{','  private string name;','  public Person(string name)','  {',A,'  }','  public string Name => name;','}','','var p = new Person("An");','Console.WriteLine(','  "Tên: " + p.Name);'],
 run:function(c){
  var fld=function(v,f){return [O('Person#1',[['name (trường)',v,f]],{hi:1})];};
  var tv=function(h){return ['name (tham số)',S('An'),h];};
  c.snap({ln:10,title:'new Person("An")',body:'Cấp bộ nhớ cho Person#1. Trường name mặc định là null.',objs:fld('null')});
  c.snap({ln:3,title:'Vào constructor',body:'Tham số name nhận "An". Từ giờ trong constructor, chữ name chỉ tham số, che mất trường cùng tên.',vars:[tv(1)],objs:fld('null')});
  if(fixed)c.snap({ln:5,title:'this.name = name',body:'this.name là trường của đối tượng, vế phải name là tham số. Trường nhận "An".',vars:[tv()],objs:fld(S('An'),'ok')});
  else c.snap({ln:5,title:'name = name',body:'Cả hai vế đều là tham số name, nên tham số chỉ gán cho chính nó. Trường name vẫn null.',vars:[tv(1)],objs:fld('null','bad')});
  c.snap({ln:10,title:'Constructor xong',body:'p trỏ tới Person#1. Tham số name biến mất, chỉ còn trường.',vars:[['p','→ Person#1',1]],objs:fld(fixed?S('An'):'null',fixed?'ok':'bad')});
  c.out('Tên: '+(fixed?'An':''));
  c.snap({ln:11,title:'Xong',body:fixed?'In ra "Tên: An".':'In ra "Tên: " và để trống, vì trường name vẫn null.',vars:[['p','→ Person#1']],objs:fld(fixed?S('An'):'null')});
 }};
}
var EX={x:{
 intro:'Cả hai bên cùng chạy new Person("An"). Hãy so sánh tham số name với trường name.',
 running:'Trong constructor có hai thứ cùng tên name: tham số và trường. Chữ name đứng một mình luôn chỉ tham số.',
 done:'Bên trái: trường name vẫn null, in rỗng. Bên phải: trường name = "An". Chỉ khác this. ở một dòng.',
 note:'Khi tham số trùng tên trường, phải viết this.name = name; để gán vào trường. Viết name = name; chỉ gán tham số cho chính nó.',
 cols:[col('Thiếu this','name = name;',0,false),col('Có this','this.name = name;',0,true)]}};
