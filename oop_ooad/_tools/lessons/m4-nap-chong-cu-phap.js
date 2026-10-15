// META {"module":4,"lesson":"Đa hình tĩnh: Nạp chồng phương thức (Method Overloading)","activity":"Cú pháp và ví dụ về Nạp chồng phương thức","title":"Nạp chồng hợp lệ và không hợp lệ","lead":"Chọn tab để xem ba cách viết. Bấm <b>Bước tiếp</b> để xem từng bước.","tabs":[["so","Khác số tham số"],["kieu","Khác kiểu tham số"],["tra","Chỉ khác kiểu trả về"]]}
var EX = {
so:{
 inputs:[],
 intro:'Hai phương thức Show cùng tên, khác số lượng tham số. Bấm "Bước tiếp".',
 lines:function(){return [
  'class Printer',
  '{',
  '  public void Show(string s)',
  '    => Console.WriteLine(s);',
  '  public void Show(string s, int n)',
  '  {',
  '    for (int i = 0; i < n; i++)',
  '      Console.WriteLine(s);',
  '  }',
  '}',
  '',
  'var p = new Printer();',
  'p.Show("Hi");',
  'p.Show("Hi", 2);'];},
 run:function(c){
  c.snap({ln:2,title:'Hai phiên bản Show',body:'Show(string) có 1 tham số, Show(string, int) có 2 tham số. Số tham số khác nhau nên hợp lệ.'});
  c.out('Hi');
  c.snap({ln:12,title:'p.Show("Hi")',body:'1 đối số, chạy Show(string s): in Hi một lần.',vars:[['p','→ Printer#1']],objs:[O('Printer#1',[['(không có trường)','']],{hi:1,tag:'Show(string)'})]});
  c.out('Hi');
  c.out('Hi');
  c.snap({ln:13,title:'p.Show("Hi", 2)',body:'2 đối số, chạy Show(string s, int n): in Hi hai lần.',vars:[['p','→ Printer#1']],objs:[O('Printer#1',[['(không có trường)','']],{hi:1,tag:'Show(string, int)'})]});
  c.snap({ln:13,title:'Xong',body:'Biên dịch thành công: hai phiên bản có số tham số khác nhau.',note:'Nạp chồng hợp lệ khi danh sách tham số khác nhau, ở đây là khác số lượng.',vars:[['p','→ Printer#1']],objs:[O('Printer#1',[['(không có trường)','']])]});
 }},
kieu:{
 inputs:[],
 intro:'Hai phương thức Show cùng tên, khác kiểu tham số. Bấm "Bước tiếp".',
 lines:function(){return [
  'class Printer',
  '{',
  '  public void Show(int x)',
  '    => Console.WriteLine(x);',
  '  public void Show(string s)',
  '    => Console.WriteLine(s);',
  '}',
  '',
  'var p = new Printer();',
  'p.Show(5);',
  'p.Show("năm");'];},
 run:function(c){
  c.snap({ln:2,title:'Hai phiên bản Show',body:'Show(int) và Show(string) cùng số tham số nhưng khác kiểu. Danh sách tham số vẫn khác nhau nên hợp lệ.'});
  c.out('5');
  c.snap({ln:9,title:'p.Show(5)',body:'Đối số 5 là int, trình biên dịch chọn Show(int x).',vars:[['p','→ Printer#1']],objs:[O('Printer#1',[['(không có trường)','']],{hi:1,tag:'Show(int)'})]});
  c.out('năm');
  c.snap({ln:10,title:'p.Show("năm")',body:'Đối số "năm" là string, trình biên dịch chọn Show(string s).',vars:[['p','→ Printer#1']],objs:[O('Printer#1',[['(không có trường)','']],{hi:1,tag:'Show(string)'})]});
  c.snap({ln:10,title:'Xong',body:'Biên dịch thành công: hai phiên bản có kiểu tham số khác nhau.',note:'Nạp chồng cũng hợp lệ khi cùng số tham số nhưng khác kiểu.',vars:[['p','→ Printer#1']],objs:[O('Printer#1',[['(không có trường)','']])]});
 }},
tra:{
 inputs:[],
 intro:'Hai phương thức Get có cùng tham số, chỉ khác kiểu trả về. Bấm "Bước tiếp".',
 lines:function(){return [
  'class Calc',
  '{',
  '  public int Get(int x)',
  '    => x;',
  '  public string Get(int x)',
  '    => x.ToString();',
  '}'];},
 run:function(c){
  c.snap({ln:2,title:'Phiên bản thứ nhất',body:'Get(int x) trả về int. Phần này không có vấn đề gì.'});
  c.snap({ln:4,title:'Phiên bản thứ hai',body:'Get(int x) lần nữa, chỉ đổi kiểu trả về thành string. Danh sách tham số vẫn y hệt phiên bản trước.'});
  c.err("error CS0111: Type 'Calc' already defines a member called 'Get' with the same parameter types");
  c.snap({ln:4,title:'Lỗi biên dịch',body:'Trình biên dịch chỉ nhìn tên và danh sách tham số để phân biệt, không nhìn kiểu trả về. Hai phương thức bị coi là trùng nhau.',note:'Kiểu trả về không giúp phân biệt phương thức. Muốn nạp chồng, phải đổi số lượng hoặc kiểu tham số.'});
 }}
};
