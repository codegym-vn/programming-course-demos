// META {"module":9,"lesson":"Triển khai dự án - Cấu trúc thư mục và Mã hóa cơ bản","activity":"Giới thiệu công cụ Debugging trong Visual Studio","title":"Debug trong Visual Studio","lead":"Chương trình dừng ở breakpoint, ta chạy từng dòng và theo dõi biến trong khung Watch. Chọn cách bước rồi bấm <b>Bước tiếp</b>.","tabs":[["over","Step Over (F10)"],["into","Step Into (F11)"]],"codeTitle":"Mã nguồn C# (dòng đang dừng được tô sáng)"}
var CODE=[
 'static int Square(int n)',
 '{',
 '  return n * n;',
 '}',
 '',
 'static void Main()',
 '{',
 '  int a = 3;   // ● breakpoint',
 '  int b = Square(a);',
 '  int c = b + 1;',
 '  Console.WriteLine(c);',
 '}'];
var U='chưa gán';
var EX={
over:{inputs:[],
 intro:'Ta đặt breakpoint (chấm đỏ) ở dòng int a = 3 rồi bấm F5. Chương trình chạy tới đó và dừng lại. Từ đây ta bấm F10 (Step Over). Bấm "Bước tiếp" để mô phỏng.',
 lines:function(){return CODE;},
 run:function(c){
  c.snap({ln:7,title:'Dừng tại breakpoint',body:'Chương trình dừng trước khi chạy dòng này. Khung Watch cho thấy a, b, c chưa có giá trị.',vars:[['a',U],['b',U],['c',U]]});
  c.snap({ln:8,title:'F10: chạy dòng a = 3',body:'Step Over chạy xong một dòng rồi dừng ở dòng kế. Watch: a đổi thành 3.',vars:[['a',3,1],['b',U],['c',U]]});
  c.snap({ln:9,title:'F10 qua lời gọi hàm',body:'Dòng này gọi Square(a). Step Over chạy cả hàm Square trong một bước và không đi vào bên trong. Watch: b = 9.',vars:[['a',3],['b',9,1],['c',U]]});
  c.snap({ln:10,title:'F10: chạy dòng c = b + 1',body:'Watch: c = 10.',vars:[['a',3],['b',9],['c',10,1]]});
  c.out('10');
  c.snap({ln:11,title:'Xong',body:'F10 chạy dòng in kết quả, console hiện 10 và chương trình sắp kết thúc.',note:'Step Over chạy qua cả lời gọi hàm trong một bước. Dùng khi ta tin hàm đó đúng và chỉ muốn đi tiếp.',vars:[['a',3],['b',9],['c',10]]});
 }},
into:{inputs:[],
 intro:'Cũng breakpoint ở dòng int a = 3. Lần này tới dòng gọi Square(a) ta bấm F11 (Step Into) để đi vào bên trong hàm. Bấm "Bước tiếp".',
 lines:function(){return CODE;},
 run:function(c){
  c.snap({ln:7,title:'Dừng tại breakpoint',body:'Chương trình dừng trước khi chạy dòng này. Khung Watch cho thấy a, b, c chưa có giá trị.',vars:[['a',U],['b',U],['c',U]]});
  c.snap({ln:8,title:'F10: chạy dòng a = 3',body:'Watch: a = 3. Dòng kế là lời gọi Square(a).',vars:[['a',3,1],['b',U],['c',U]]});
  c.snap({ln:1,title:'F11: đi vào hàm Square',body:'Step Into nhảy vào thân hàm. Watch có thêm tham số n = 3.',vars:[['n',3,1],['a',3],['b',U],['c',U]]});
  c.snap({ln:2,title:'F10: dòng return',body:'Ta đang ở bên trong Square, chuẩn bị tính n * n.',vars:[['n',3],['a',3],['b',U],['c',U]]});
  c.snap({ln:3,title:'F10: tính xong',body:'n * n = 9 đã được tính và sắp trả về.',vars:[['n',3],['a',3],['b',U],['c',U]]});
  c.snap({ln:8,title:'F10: quay về Main',body:'Chương trình trở lại dòng gọi hàm. Giá trị 9 sắp được gán cho b. Biến n đã biến mất khỏi Watch.',vars:[['a',3],['b',U],['c',U]]});
  c.snap({ln:9,title:'F10: b nhận giá trị',body:'Watch: b = 9.',vars:[['a',3],['b',9,1],['c',U]]});
  c.snap({ln:10,title:'F10: chạy dòng c = b + 1',body:'Watch: c = 10.',vars:[['a',3],['b',9],['c',10,1]]});
  c.out('10');
  c.snap({ln:11,title:'Xong',body:'Console hiện 10.',note:'Step Into đi vào bên trong hàm để xem từng dòng của hàm đó. Dùng khi nghi ngờ lỗi nằm trong hàm.',vars:[['a',3],['b',9],['c',10]]});
 }}};
