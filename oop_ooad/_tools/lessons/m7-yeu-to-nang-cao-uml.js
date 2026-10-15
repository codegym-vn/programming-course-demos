// META {"module":7,"lesson":"Phân tích và hiểu các sơ đồ lớp UML phức tạp","activity":"Các yếu tố nâng cao trong Sơ đồ lớp UML","title":"Yếu tố nâng cao trong UML","lead":"Mỗi tab một yếu tố: abstract, interface, static, enum, phụ thuộc. Bấm <b>Bước tiếp</b> để đối chiếu code với hình.","tabs":[["abs","Abstract"],["itf","Interface"],["sta","Static"],["enu","Enum"],["dep","Phụ thuộc"]]}
function UL(s){return {t:s,u:true};}
function mi(x,i,h){return {t:x.t||x,u:!!x.u,hi:h===i};}
var EX = {
 abs:{inputs:[],
  intro:'Lớp abstract được vẽ bằng tên in nghiêng. Bấm "Bước tiếp".',
  lines:function(){return [
   'abstract class Shape',
   '{',
   '  public abstract double Area();',
   '}',
   'class Circle : Shape',
   '{',
   '  double r = 1;',
   '  public override double Area()',
   '    => 3.14 * r * r;',
   '}'];},
  run:function(c){
   var S1=function(m,hi){return {id:'S',name:'Shape',abs:1,methods:m?['+ Area(): double']:[],c:0,r:0,hi:hi};};
   var C1=function(hi){return {id:'C',name:'Circle',attrs:['- r: double'],methods:['+ Area(): double'],c:0,r:1,hi:hi};};
   c.snap({ln:0,title:'Lớp abstract',body:'Shape là abstract nên tên Shape được in nghiêng trong hộp. Lớp abstract không dùng new để tạo được.',uml:{boxes:[S1(0,1)],links:[]}});
   c.snap({ln:2,title:'Phương thức abstract',body:'Area chưa có thân hàm, lớp con phải tự viết. Ở UML nó nằm trong ngăn phương thức.',uml:{boxes:[S1(1,1)],links:[]}});
   c.snap({ln:4,title:'Lớp con Circle',body:'Circle kế thừa Shape nên có mũi tên kế thừa. Circle viết phần thân cho Area, nên là lớp thường: tên không nghiêng.',uml:{boxes:[S1(1),C1(1)],links:[{a:'C',b:'S',type:'inherit',hi:true}]}});
   c.snap({ln:7,title:'Xong',body:'Tên nghiêng cho biết lớp abstract.',note:'Tên lớp in nghiêng nghĩa là abstract.',uml:{boxes:[S1(1),C1()],links:[{a:'C',b:'S',type:'inherit'}]}});
  }},
 itf:{inputs:[],
  intro:'Interface có nhãn «interface», lớp thực thi nối bằng nét đứt. Bấm "Bước tiếp".',
  lines:function(){return [
   'interface IFly',
   '{',
   '  void Fly();',
   '}',
   'class Bird : IFly',
   '{',
   '  public void Fly() { }',
   '}'];},
  run:function(c){
   var I=function(hi){return {id:'I',name:'IFly',stereo:'interface',methods:['+ Fly(): void'],c:0,r:0,hi:hi};};
   var B=function(hi){return {id:'B',name:'Bird',methods:['+ Fly(): void'],c:0,r:1,hi:hi};};
   c.snap({ln:0,title:'Interface',body:'IFly là interface, nên trong hộp có nhãn «interface» phía trên tên.',uml:{boxes:[I(1)],links:[]}});
   c.snap({ln:2,title:'Phương thức của interface',body:'Fly chỉ khai báo, không có thân hàm.',uml:{boxes:[I(1)],links:[]}});
   c.snap({ln:4,title:'Lớp Bird thực thi IFly',body:'Bird : IFly nghĩa là Bird thực thi interface IFly. Bird được vẽ như một hộp thường.',uml:{boxes:[I(),B(1)],links:[]}});
   c.snap({ln:4,title:'Mũi tên nét đứt, tam giác rỗng',body:'Thực thi interface vẽ bằng nét đứt với tam giác rỗng, chỉ từ Bird về IFly.',uml:{boxes:[I(),B()],links:[{a:'B',b:'I',type:'real',hi:true}]}});
   c.snap({ln:6,title:'Xong',body:'Bird phải viết thân hàm cho Fly.',note:'Interface: nhãn «interface». Thực thi: nét đứt, tam giác rỗng.',uml:{boxes:[I(),B()],links:[{a:'B',b:'I',type:'real'}]}});
  }},
 sta:{inputs:[],
  intro:'Thành viên static được gạch chân trong hộp UML. Bấm "Bước tiếp".',
  lines:function(){return [
   'class Counter',
   '{',
   '  private int id;',
   '  public static int Total;',
   '  public static void Reset()',
   '  { Total = 0; }',
   '  public void Show() { }',
   '}'];},
  run:function(c){
   var A=['- id: int',UL('+ Total: int')];
   var M=[UL('+ Reset(): void'),'+ Show(): void'];
   var u=function(na,nm,ha,hm){return {boxes:[{id:'C',name:'Counter',c:0,r:0,
    attrs:A.slice(0,na).map(function(x,i){return mi(x,i,ha);}),
    methods:M.slice(0,nm).map(function(x,i){return mi(x,i,hm);})}],links:[]};};
   c.snap({ln:0,title:'Lớp Counter',body:'Ta vẽ hộp Counter. Chú ý những dòng được gạch chân.',uml:u(0,0)});
   c.snap({ln:2,title:'Thuộc tính thường',body:'id là thành viên thường: không gạch chân.',uml:u(1,0,0)});
   c.snap({ln:3,title:'Thuộc tính static',body:'Total là static, thuộc về cả lớp. Trong UML dòng này được gạch chân.',uml:u(2,0,1)});
   c.snap({ln:4,title:'Phương thức static',body:'Reset là static nên cũng gạch chân.',uml:u(2,1,undefined,0)});
   c.snap({ln:6,title:'Phương thức thường',body:'Show là phương thức thường, không gạch chân.',uml:u(2,2,undefined,1)});
   c.snap({ln:6,title:'Xong',body:'Gạch chân là dấu hiệu của thành viên static.',note:'Static được gạch chân trong UML.',uml:u(2,2)});
  }},
 enu:{inputs:[],
  intro:'Enum có nhãn «enumeration» và liệt kê các giá trị. Bấm "Bước tiếp".',
  lines:function(){return [
   'enum Color',
   '{',
   '  Red,',
   '  Green,',
   '  Blue',
   '}'];},
  run:function(c){
   var V=['Red','Green','Blue'];
   var u=function(n,hi){return {boxes:[{id:'E',name:'Color',stereo:'enumeration',c:0,r:0,attrs:V.slice(0,n).map(function(t,i){return {t:t,hi:hi===i};}),hi:hi===undefined}],links:[]};};
   c.snap({ln:0,title:'Enum Color',body:'Color là enum nên hộp có nhãn «enumeration» phía trên tên.',uml:u(0)});
   c.snap({ln:2,title:'Giá trị Red',body:'Mỗi giá trị của enum là một dòng trong ngăn giữa, chỉ có tên.',uml:u(1,0)});
   c.snap({ln:3,title:'Giá trị Green',body:'Thêm giá trị Green.',uml:u(2,1)});
   c.snap({ln:4,title:'Giá trị Blue',body:'Thêm giá trị Blue.',uml:u(3,2)});
   c.snap({ln:5,title:'Xong',body:'Enum không có phương thức, chỉ liệt kê các giá trị cố định.',note:'Enum: nhãn «enumeration», mỗi dòng là một giá trị.',uml:u(3)});
  }},
 dep:{inputs:[],
  intro:'Phụ thuộc: một lớp chỉ dùng lớp khác tạm thời, vẽ bằng nét đứt. Bấm "Bước tiếp".',
  lines:function(){return [
   'class Product { }',
   'class Customer',
   '{',
   '  public void Buy(Product p)',
   '  { }',
   '}'];},
  run:function(c){
   var P=function(hi){return {id:'P',name:'Product',c:1,r:0,hi:hi};};
   var C=function(hi){return {id:'C',name:'Customer',methods:['+ Buy(p: Product)'],c:0,r:0,hi:hi};};
   c.snap({ln:1,title:'Lớp Customer',body:'Customer là một hộp lớp.',uml:{boxes:[C(1)],links:[]}});
   c.snap({ln:0,title:'Lớp Product',body:'Product là một hộp lớp khác.',uml:{boxes:[C(),P(1)],links:[]}});
   c.snap({ln:3,title:'Product chỉ là tham số',body:'Customer không lưu Product trong trường nào, chỉ nhận nó vào phương thức Buy.',uml:{boxes:[C(1),P()],links:[]}});
   c.snap({ln:3,title:'Mũi tên nét đứt',body:'Phụ thuộc vẽ nét đứt, mũi tên hở chỉ về lớp được dùng (Product).',uml:{boxes:[C(),P()],links:[{a:'C',b:'P',type:'dep',hi:true}]}});
   c.snap({ln:5,title:'Xong',body:'Nếu Product đổi, Customer có thể phải sửa theo.',note:'Phụ thuộc: nét đứt, mũi tên chỉ về lớp được dùng.',uml:{boxes:[C(),P()],links:[{a:'C',b:'P',type:'dep'}]}});
  }}
};
