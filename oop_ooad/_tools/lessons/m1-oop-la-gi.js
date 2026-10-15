// META {"module":1,"lesson":"Giới thiệu Lập trình hướng đối tượng (OOP)","activity":"Khái niệm Lập trình hướng đối tượng (OOP) là gì?","title":"OOP là gì?","lead":"Cùng một bài toán lưu hai sinh viên, làm theo hai cách. Bấm <b>Bước tiếp</b> để hai cột cùng chạy.","tabs":[["x","Lưu 2 sinh viên"]]}
var EX = {x:{
 intro:'Bài toán: lưu tên và điểm (GPA) của hai sinh viên rồi in thông tin sinh viên thứ nhất. Bên trái dùng biến rời, bên phải dùng lớp SinhVien.',
 running:'Bên trái, tên và điểm của một người nằm ở các biến rời nhau. Bên phải, chúng nằm chung trong một đối tượng.',
 done:'Bên trái có 4 biến rời, phải tự ghép name1 với gpa1 mỗi khi dùng. Bên phải có 2 đối tượng, mỗi đối tượng giữ gọn tên, điểm và cả phương thức In().',
 note:'OOP gom dữ liệu và hành vi của một thứ vào một đối tượng: dữ liệu của mỗi sinh viên nằm gọn trong một đối tượng.',
 cols:[
 {title:'Thủ tục',sub:'Biến rời và một hàm In.',
  lines:['string name1 = "An";','double gpa1 = 8.5;','string name2 = "Bình";','double gpa2 = 7.5;','','static void In(string n, double g)','{','  Console.WriteLine(n + ": " + g);','}','','In(name1, gpa1);'],
  run:function(c){
   c.snap({ln:0,title:'Biến name1',body:'Tên sinh viên thứ nhất nằm trong một biến riêng.',vars:[['name1',S('An'),1]]});
   c.snap({ln:1,title:'Biến gpa1',body:'Điểm của cùng sinh viên đó lại là một biến khác. Chương trình không biết hai biến này đi cùng nhau.',vars:[['name1',S('An')],['gpa1',8.5,1]]});
   c.snap({ln:2,title:'Biến name2',body:'Sinh viên thứ hai cũng cần thêm biến riêng.',vars:[['name1',S('An')],['gpa1',8.5],['name2',S('Bình'),1]]});
   c.snap({ln:3,title:'Biến gpa2',body:'Hai sinh viên đã cần 4 biến rời.',vars:[['name1',S('An')],['gpa1',8.5],['name2',S('Bình')],['gpa2',7.5,1]]});
   c.snap({ln:10,title:'Gọi In(name1, gpa1)',body:'Ta phải tự nhớ truyền đúng cặp name1 và gpa1 vào hàm.',vars:[['name1',S('An')],['gpa1',8.5],['name2',S('Bình')],['gpa2',7.5],['n',S('An'),1],['g',8.5,1]]});
   c.out('An: 8.5');
   c.snap({ln:7,title:'Trong hàm In',body:'Hàm in ra "An: 8.5". Nếu lỡ truyền name1 với gpa2 thì kết quả sai mà chương trình không báo lỗi.',vars:[['name1',S('An')],['gpa1',8.5],['name2',S('Bình')],['gpa2',7.5],['n',S('An')],['g',8.5]]});
   c.snap({ln:10,title:'Xong',body:'Dữ liệu và hàm tách rời nhau, 4 biến nằm lẻ loi.',vars:[['name1',S('An')],['gpa1',8.5],['name2',S('Bình')],['gpa2',7.5]]});
  }},
 {title:'OOP',sub:'Lớp SinhVien gom dữ liệu và hành vi.',
  lines:['class SinhVien','{','  public string Name;','  public double Gpa;','  public void In()','  {','    Console.WriteLine(','      Name + ": " + Gpa);','  }','}','','var sv1 = new SinhVien','  { Name = "An", Gpa = 8.5 };','var sv2 = new SinhVien','  { Name = "Bình", Gpa = 7.5 };','sv1.In();'],
  run:function(c){
   c.snap({ln:0,title:'Lớp SinhVien',body:'Lớp gom Name, Gpa và phương thức In() vào một chỗ. Chưa có sinh viên nào nên bộ nhớ còn trống.'});
   c.snap({ln:11,title:'Tạo sv1',body:'new tạo đối tượng SinhVien#1, giữ cả Name và Gpa của An.',vars:[['sv1','→ SinhVien#1',1]],objs:[O('SinhVien#1',[['Name',S('An'),'hi'],['Gpa',8.5,'hi']],{hi:1})]});
   c.snap({ln:13,title:'Tạo sv2',body:'Sinh viên thứ hai là một đối tượng khác, SinhVien#2.',vars:[['sv1','→ SinhVien#1'],['sv2','→ SinhVien#2',1]],objs:[O('SinhVien#1',[['Name',S('An')],['Gpa',8.5]]),O('SinhVien#2',[['Name',S('Bình'),'hi'],['Gpa',7.5,'hi']],{hi:1})]});
   c.snap({ln:15,title:'Gọi sv1.In()',body:'Không cần truyền gì: In() tự dùng dữ liệu của đối tượng sv1.',vars:[['sv1','→ SinhVien#1'],['sv2','→ SinhVien#2']],objs:[O('SinhVien#1',[['Name',S('An')],['Gpa',8.5]],{hi:1,tag:'đang chạy In()'}),O('SinhVien#2',[['Name',S('Bình')],['Gpa',7.5]],{dim:0})]});
   c.out('An: 8.5');
   c.snap({ln:7,title:'Trong In()',body:'In() đọc Name và Gpa của chính SinhVien#1 nên không thể lẫn với sinh viên khác.',vars:[['sv1','→ SinhVien#1'],['sv2','→ SinhVien#2']],objs:[O('SinhVien#1',[['Name',S('An'),'hi'],['Gpa',8.5,'hi']],{hi:1,tag:'đang chạy In()'}),O('SinhVien#2',[['Name',S('Bình')],['Gpa',7.5]])]});
   c.snap({ln:15,title:'Xong',body:'Mỗi sinh viên là một đối tượng gọn gàng, dữ liệu đi kèm hành vi.',vars:[['sv1','→ SinhVien#1'],['sv2','→ SinhVien#2']],objs:[O('SinhVien#1',[['Name',S('An')],['Gpa',8.5]]),O('SinhVien#2',[['Name',S('Bình')],['Gpa',7.5]])]});
  }}
 ]}};
