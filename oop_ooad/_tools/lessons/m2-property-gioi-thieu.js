// META {"module":2,"lesson":"Thuộc tính (Properties) trong C#","activity":"Giới thiệu về Thuộc tính (Properties)","title":"Giới thiệu Property","lead":"Property trông như trường nhưng chạy qua get và set. Bấm <b>Bước tiếp</b>.","tabs":[["x","Person.Age"]]}
var EX = {x:{
 inputs:[{id:'v',label:'giá trị gán lần 2',def:-5,min:-99,max:99}],
 chips:[-5,0,30],
 intro:'Lần gán thứ hai mặc định là -5 (số âm). Thử đổi thành số khác, rồi bấm "Bước tiếp".',
 lines:function(P){return ['class Person','{','  private int age;','  public int Age','  {','    get { return age; }','    set','    {','      if (value >= 0)','        age = value;','    }','  }','}','','var p = new Person();','p.Age = 20;','p.Age = '+P.v+';','Console.WriteLine(p.Age);'];},
 run:function(c,P){
  var v=P.v, ok=v>=0, V=[['p','→ Person#1']];
  var ob=function(a,f){return [O('Person#1',[['age (private)',a,f]],{hi:1})];};
  c.snap({ln:14,title:'Tạo Person',body:'Trường private age mặc định là 0.',vars:[['p','→ Person#1',1]],objs:ob(0)});
  c.snap({ln:15,title:'p.Age = 20 chạy khối set',body:'Trông như gán trường nhưng thực ra chạy khối set, với value = 20.',vars:V.concat([['value',20,1]]),objs:ob(0)});
  c.snap({ln:9,title:'age = value',body:'value = 20 >= 0 nên age được gán 20.',vars:V.concat([['value',20]]),objs:ob(20,'hi')});
  c.snap({ln:16,title:'p.Age = '+v+' chạy khối set',body:'Lại chạy set, lần này value = '+v+'.',vars:V.concat([['value',v,1]]),objs:ob(20)});
  if(ok){
   c.snap({ln:9,title:'Điều kiện đúng',body:'value = '+v+' >= 0 đúng nên age được gán '+v+'.',vars:V.concat([['value',v]]),objs:ob(v,'hi')});
  } else {
   c.snap({ln:8,title:'Điều kiện sai',body:'value >= 0 với value = '+v+' là sai nên bỏ qua dòng gán. age vẫn là 20.',vars:V.concat([['value',v]]),objs:ob(20,'ok')});
  }
  var fin=ok?v:20;
  c.snap({ln:5,title:'p.Age đọc chạy khối get',body:'Đọc p.Age chạy khối get, trả về age = '+fin+'.',vars:V,objs:ob(fin)});
  c.out(''+fin);
  c.snap({ln:17,title:'Xong',body:'In ra '+fin+'.',note:'Property trông như trường nhưng chạy qua get/set, nên set có thể kiểm tra dữ liệu trước khi gán.',vars:V,objs:ob(fin)});
 }}};
