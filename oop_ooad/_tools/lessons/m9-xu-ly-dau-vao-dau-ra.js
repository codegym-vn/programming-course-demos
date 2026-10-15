// META {"module":9,"lesson":"Hoàn thiện dự án và Đánh giá","activity":"Xử lý đầu vào/đầu ra và hiển thị thông tin","title":"Nhập sai: Parse và TryParse","lead":"Người dùng có thể gõ chữ thay vì số. Chọn cách đọc số rồi bấm <b>Bước tiếp</b> để xem chuyện gì xảy ra.","tabs":[["parse","int.Parse"],["try","int.TryParse"]]}
var EX={
parse:{inputs:[],
 intro:'Vòng menu hỏi lựa chọn bằng int.Parse. Người dùng gõ 2 trước, sau đó gõ abc. Bấm "Bước tiếp".',
 lines:function(){return [
  'while (true)',
  '{',
  '  Console.Write("Chọn 1-3: ");',
  '  string s = Console.ReadLine();',
  '  int choice = int.Parse(s);',
  '  Console.WriteLine(choice);',
  '}'];},
 run:function(c){
  c.snap({ln:0,title:'Bắt đầu vòng menu',body:'while (true) lặp mãi: hỏi, đọc, xử lý, rồi hỏi lại.'});
  c.out('Chọn 1-3:');
  c.snap({ln:2,title:'Hỏi lần 1',body:'Chương trình in lời nhắc và chờ người dùng gõ.'});
  c.out('> 2');
  c.snap({ln:3,title:'Người dùng gõ 2',body:'ReadLine luôn trả về chuỗi, nên s = "2".',vars:[['s',S('2'),1]]});
  c.snap({ln:4,title:'int.Parse("2")',body:'Chuỗi "2" đổi thành số được, choice = 2.',vars:[['s',S('2')],['choice',2,1]]});
  c.out('2');
  c.snap({ln:5,title:'In lựa chọn',body:'In 2, rồi vòng lặp quay lại hỏi tiếp.',vars:[['s',S('2')],['choice',2]]});
  c.out('Chọn 1-3:');
  c.snap({ln:2,title:'Hỏi lần 2',body:'Vòng lặp chạy lại, chương trình hỏi lần nữa.',vars:[['s',S('2')],['choice',2]]});
  c.out('> abc');
  c.snap({ln:3,title:'Người dùng gõ abc',body:'Lần này người dùng gõ chữ, s = "abc".',vars:[['s',S('abc'),1],['choice',2]]});
  c.err('Unhandled exception. System.FormatException:');
  c.err("The input string 'abc' was not in a correct format.");
  c.snap({ln:4,title:'Xong',body:'int.Parse("abc") ném FormatException. Không có try/catch nên chương trình dừng hẳn.',note:'int.Parse gặp chuỗi không phải số sẽ làm chương trình sập. Với dữ liệu người dùng nhập, nên dùng int.TryParse.',vars:[['s',S('abc'),1],['choice',2]]});
 }},
try:{inputs:[],
 intro:'Cùng vòng menu nhưng dùng int.TryParse. Người dùng gõ abc trước, sau đó gõ 2. Bấm "Bước tiếp".',
 lines:function(){return [
  'while (true)',
  '{',
  '  Console.Write("Chọn 1-3: ");',
  '  string s = Console.ReadLine();',
  '  if (int.TryParse(s, out int n))',
  '  {',
  '    Console.WriteLine(n);',
  '    break;',
  '  }',
  '  Console.WriteLine(',
  '    "Vui lòng nhập số");',
  '}'];},
 run:function(c){
  c.snap({ln:0,title:'Bắt đầu vòng menu',body:'while (true) lặp cho tới khi gặp break.'});
  c.out('Chọn 1-3:');
  c.snap({ln:2,title:'Hỏi lần 1',body:'Chương trình in lời nhắc và chờ người dùng gõ.'});
  c.out('> abc');
  c.snap({ln:3,title:'Người dùng gõ abc',body:'ReadLine trả về chuỗi, s = "abc".',vars:[['s',S('abc'),1]]});
  c.snap({ln:4,title:'int.TryParse("abc")',body:'Chuỗi không phải số nên TryParse trả về false và không ném lỗi. n nhận giá trị mặc định 0.',vars:[['s',S('abc')],['n',0,1]]});
  c.out('Vui lòng nhập số');
  c.snap({ln:9,title:'In nhắc nhập lại',body:'Điều kiện sai nên bỏ qua khối if, in "Vui lòng nhập số". Vòng lặp quay lại hỏi.',vars:[['s',S('abc')],['n',0]]});
  c.out('Chọn 1-3:');
  c.snap({ln:2,title:'Hỏi lần 2',body:'Chương trình vẫn chạy bình thường và hỏi lại.',vars:[['s',S('abc')],['n',0]]});
  c.out('> 2');
  c.snap({ln:3,title:'Người dùng gõ 2',body:'Lần này s = "2".',vars:[['s',S('2'),1],['n',0]]});
  c.snap({ln:4,title:'int.TryParse("2")',body:'Đổi được, TryParse trả về true và n = 2.',vars:[['s',S('2')],['n',2,1]]});
  c.out('2');
  c.snap({ln:6,title:'In kết quả',body:'Điều kiện đúng nên vào khối if và in n.',vars:[['s',S('2')],['n',2]]});
  c.snap({ln:7,title:'Xong',body:'break thoát khỏi vòng lặp.',note:'int.TryParse trả về true/false thay vì ném lỗi, nên ta có thể báo người dùng nhập lại và chương trình không bị sập.',vars:[['s',S('2')],['n',2]]});
 }}};
