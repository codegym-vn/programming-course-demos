// META {"module":4,"lesson":"Đa hình tĩnh: Nạp chồng phương thức (Method Overloading)","activity":"Nạp chồng phương thức là gì?","title":"Nạp chồng phương thức","lead":"Ba phương thức cùng tên Add nhưng khác tham số. Bấm <b>Bước tiếp</b> để xem trình biên dịch chọn phiên bản nào.","tabs":[["x","Ba phiên bản của Add"]]}
var EX = {x:{
 inputs:[],
 intro:'Lớp Calc có ba phương thức cùng tên Add. Bấm "Bước tiếp".',
 lines:function(){return [
  'class Calc',
  '{',
  '  public int Add(int a, int b)',
  '    => a + b;',
  '  public double Add(double a, double b)',
  '    => a + b;',
  '  public int Add(int a, int b, int c)',
  '    => a + b + c;',
  '}',
  '',
  'var calc = new Calc();',
  'calc.Add(2, 3);',
  'calc.Add(2.5, 1.5);',
  'calc.Add(1, 2, 3);'];},
 run:function(c){
  var v=function(x,r){var a=[['calc','→ Calc#1']];if(x)a.push(x);return a;};
  var obj=function(o){return [O('Calc#1',[['(không có trường)','']],o)];};
  var r1=2+3, r2=2.5+1.5, r3=1+2+3;
  c.snap({ln:2,title:'Ba phiên bản cùng tên',body:'Add(int, int), Add(double, double) và Add(int, int, int) cùng tên nhưng khác số lượng hoặc kiểu tham số. Đây là nạp chồng.'});
  c.snap({ln:10,title:'Tạo đối tượng Calc',body:'new Calc() tạo một đối tượng Calc#1 để gọi các phương thức Add.',vars:[['calc','→ Calc#1',1]],objs:obj({hi:1})});
  c.snap({ln:11,title:'Lời gọi Add(2, 3)',body:'Hai đối số, cả hai là số nguyên. Trình biên dịch tìm phiên bản khớp.',vars:[['calc','→ Calc#1']],objs:obj({hi:1})});
  c.snap({ln:2,title:'Chọn Add(int, int)',body:'Có 2 đối số kiểu int nên khớp nhất với Add(int a, int b). Kết quả 2 + 3 = '+r1+'.',vars:[['calc','→ Calc#1'],['kết quả',r1,1]],objs:obj({hi:1,tag:'đang chạy Add(int, int)'})});
  c.snap({ln:12,title:'Lời gọi Add(2.5, 1.5)',body:'Hai đối số, cả hai là số thực (double).',vars:[['calc','→ Calc#1']],objs:obj({hi:1})});
  c.snap({ln:4,title:'Chọn Add(double, double)',body:'Cả hai đối số là double nên khớp với Add(double a, double b). Kết quả 2.5 + 1.5 = '+r2+'.',vars:[['calc','→ Calc#1'],['kết quả',r2,1]],objs:obj({hi:1,tag:'đang chạy Add(double, double)'})});
  c.snap({ln:13,title:'Lời gọi Add(1, 2, 3)',body:'Lần này có ba đối số.',vars:[['calc','→ Calc#1']],objs:obj({hi:1})});
  c.snap({ln:6,title:'Chọn Add(int, int, int)',body:'Chỉ phiên bản có 3 tham số mới khớp số lượng đối số. Kết quả 1 + 2 + 3 = '+r3+'.',vars:[['calc','→ Calc#1'],['kết quả',r3,1]],objs:obj({hi:1,tag:'đang chạy Add(int, int, int)'})});
  c.snap({ln:13,title:'Xong',body:'Ba lời gọi dùng cùng tên Add nhưng chạy ba phiên bản khác nhau. Việc chọn xảy ra ngay lúc biên dịch.',
   note:'Nạp chồng: cùng tên, khác tham số. Trình biên dịch chọn phiên bản theo số lượng và kiểu của đối số.',
   vars:[['calc','→ Calc#1']],objs:obj({})});
 }}};
