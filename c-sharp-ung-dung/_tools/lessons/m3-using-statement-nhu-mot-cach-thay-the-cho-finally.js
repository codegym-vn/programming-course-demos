// META {"module":3,"lesson":"Khối finally và Đảm bảo Giải phóng Tài nguyên","activity":"using statement như một cách thay thế cho finally (cho IDisposable)","title":"using thay cho finally","lead":"Bên trái viết tay try/finally, bên phải dùng using. Chọn tình huống rồi bấm <b>Bước tiếp</b> để hai cột cùng chạy.","tabs":[["ok","Không lỗi"],["err","Có lỗi giữa chừng"],["var","Khai báo using (C# 8)"]],"codeTitle":"Mã nguồn C#"}
var myMsg = "The input string 'abc' was not in a correct format.";
function myRes(s) {
  return vLamps([{ t: 'StreamReader r', s: s, sub: s === 'ok' ? 'Đã Dispose' : (s === 'hi' ? 'Đang mở' : 'Chưa mở') }]);
}
function myFl(nodes) { return vFlow(nodes); }
function myTE(t, f, e) { return vFlow([{ t: 'try', s: t }, { t: 'finally', s: f, sub: 'Dispose' }]); }
function myUs(a, b) { return vFlow([{ t: 'khối using', s: a }, { t: 'Dispose tự gọi', s: b }]); }
var myTip = 'Trình biên dịch dịch using thành try/finally.';
var EX = {
ok: { intro: 'Cả hai cột mở tệp, đọc một dòng rồi rời khối. Xem Dispose được gọi thế nào.',
 running: 'Bên trái gọi Dispose trong finally. Bên phải using tự gọi.',
 done: 'Cả hai cùng kết quả: tệp đã Dispose. Cột phải ngắn gọn hơn và không thể quên Dispose.',
 note: 'Với đối tượng IDisposable (tệp, kết nối...), ưu tiên dùng using thay cho try/finally viết tay.',
 cols: [
 { title: 'try/finally viết tay', sub: 'Tự gọi Dispose trong finally.',
  lines: ['var r = new StreamReader(', '  "data.txt");', 'try', '{', '  Console.WriteLine(r.ReadLine());', '}', 'finally', '{', '  r.Dispose();', '}'],
  run: function (c) {
   c.snap({ ln: 0, title: 'Mở tệp', body: 'StreamReader mở data.txt.', viz: [myRes('hi'), myTE('dim', 'dim')] });
   c.out('10');
   c.snap({ ln: 4, title: 'Đọc một dòng', body: 'ReadLine đọc dòng đầu, "10", không có lỗi.', viz: [myRes('hi'), myTE('hi', 'dim')] });
   c.snap({ ln: 8, title: 'finally gọi Dispose', body: 'Rời khối try, finally chạy và gọi r.Dispose().', viz: [myRes('ok'), myTE('ok', 'ok')] });
   c.snap({ ln: 8, title: 'Xong', body: 'Tệp đã Dispose, nhờ lệnh ta viết tay.', viz: [myRes('ok'), myTE('ok', 'ok')] });
  }},
 { title: 'using', sub: myTip,
  lines: ['using (var r = new StreamReader(', '  "data.txt"))', '{', '  Console.WriteLine(r.ReadLine());', '}'],
  run: function (c) {
   c.snap({ ln: 0, title: 'Mở tệp', body: 'using mở data.txt và coi r là tài nguyên cần dọn.', viz: [myRes('hi'), myUs('dim', 'dim')] });
   c.out('10');
   c.snap({ ln: 3, title: 'Đọc một dòng', body: 'ReadLine đọc dòng đầu, "10", không có lỗi.', viz: [myRes('hi'), myUs('hi', 'dim')] });
   c.snap({ ln: 4, title: 'Rời khối using', body: 'Tới dấu } của khối using, C# tự gọi r.Dispose(). Không cần viết finally.', viz: [myRes('ok'), myUs('ok', 'ok')] });
   c.snap({ ln: 4, title: 'Xong', body: 'Tệp đã Dispose, chỉ với 5 dòng.', viz: [myRes('ok'), myUs('ok', 'ok')] });
  }}
 ]},
err: { intro: 'Dòng thứ hai của data.txt là "abc" nên lỗi xảy ra giữa chừng. Xem tệp có được Dispose không.',
 running: 'Parse dòng 2 sẽ ném lỗi khi tệp đang mở.',
 done: 'Cả hai cột đều Dispose tệp dù có lỗi. Chỉ khác thứ tự: finally chạy sau catch, còn using Dispose trước khi lỗi lan ra catch ngoài.',
 note: 'using đảm bảo Dispose chạy cả khi có lỗi, giống finally nhưng ngắn gọn hơn.',
 cols: [
 { title: 'try/finally viết tay', sub: 'Dispose nằm trong finally.',
  lines: ['var r = new StreamReader(', '  "data.txt");', 'try', '{', '  int a = int.Parse(r.ReadLine());', '  int b = int.Parse(r.ReadLine());', '}', 'catch (FormatException)', '{ Console.WriteLine("Lỗi"); }', 'finally', '{', '  r.Dispose();', '}'],
  run: function (c) {
   var f = function (a, b, d) { return [myRes(a), vFlow([{ t: 'try', s: b }, { t: 'catch', s: d[0] }, { t: 'finally', s: d[1], sub: 'Dispose' }])]; };
   c.snap({ ln: 0, title: 'Mở tệp', body: 'StreamReader mở data.txt.', viz: f('hi', 'dim', ['dim', 'dim']) });
   c.snap({ ln: 4, title: 'Đọc dòng 1', body: 'Dòng 1 là "10", a = 10.', vars: [['a', 10, 1]], viz: f('hi', 'hi', ['dim', 'dim']) });
   c.snap({ ln: 5, title: 'Dòng 2 gây lỗi', body: 'Parse("abc") ném FormatException khi tệp đang mở.', vars: [['a', 10]], viz: [myRes('hi'), vCard({ kind: 'err', title: 'FormatException', sub: myMsg })] });
   c.out('Lỗi');
   c.snap({ ln: 8, title: 'catch bắt lỗi', body: 'catch in "Lỗi". Tệp vẫn đang mở, finally sắp chạy.', vars: [['a', 10]], viz: f('hi', 'bad', ['ok', 'hi']) });
   c.snap({ ln: 11, title: 'finally gọi Dispose', body: 'finally chạy và Dispose tệp.', vars: [['a', 10]], viz: f('ok', 'bad', ['ok', 'ok']) });
   c.snap({ ln: 11, title: 'Xong', body: 'Tệp đã Dispose dù có lỗi.', vars: [['a', 10]], viz: f('ok', 'bad', ['ok', 'ok']) });
  }},
 { title: 'using', sub: myTip,
  lines: ['try', '{', '  using (var r = new StreamReader(', '    "data.txt"))', '  {', '    int a = int.Parse(r.ReadLine());', '    int b = int.Parse(r.ReadLine());', '  }', '}', 'catch (FormatException)', '{ Console.WriteLine("Lỗi"); }'],
  run: function (c) {
   var f = function (a, b, d) { return [myRes(a), vFlow([{ t: 'khối using', s: b }, { t: 'Dispose tự gọi', s: d[0] }, { t: 'catch ngoài', s: d[1] }])]; };
   c.snap({ ln: 2, title: 'Mở tệp', body: 'using mở data.txt.', viz: f('hi', 'dim', ['dim', 'dim']) });
   c.snap({ ln: 5, title: 'Đọc dòng 1', body: 'Dòng 1 là "10", a = 10.', vars: [['a', 10, 1]], viz: f('hi', 'hi', ['dim', 'dim']) });
   c.snap({ ln: 6, title: 'Dòng 2 gây lỗi', body: 'Parse("abc") ném FormatException khi tệp đang mở.', vars: [['a', 10]], viz: [myRes('hi'), vCard({ kind: 'err', title: 'FormatException', sub: myMsg })] });
   c.snap({ ln: 7, title: 'using tự Dispose', body: 'Lỗi làm thoát khối using, C# tự gọi Dispose trước khi lỗi đi ra ngoài.', vars: [['a', 10]], viz: f('ok', 'bad', ['ok', 'dim']) });
   c.out('Lỗi');
   c.snap({ ln: 10, title: 'catch ngoài bắt lỗi', body: 'catch bên ngoài in "Lỗi". Tệp đã được Dispose từ trước.', vars: [['a', 10]], viz: f('ok', 'bad', ['ok', 'ok']) });
   c.snap({ ln: 10, title: 'Xong', body: 'Tệp đã Dispose dù có lỗi, không cần viết finally.', vars: [['a', 10]], viz: f('ok', 'bad', ['ok', 'ok']) });
  }}
 ]},
'var': { intro: 'Khai báo using var không cần cặp ngoặc: Dispose chạy khi hết phạm vi, tức cuối hàm.',
 running: 'Cả hai hàm đọc một dòng rồi in "Đọc xong".',
 done: 'Cả hai Dispose tệp đúng lúc hết hàm. Dạng using var ngắn nhất, không thụt lề thêm.',
 note: 'using var (từ C# 8): đối tượng được Dispose khi ra khỏi phạm vi chứa nó. Với IDisposable, ưu tiên using thay cho try/finally.',
 cols: [
 { title: 'try/finally viết tay', sub: 'Dispose nằm trong finally.',
  lines: ['static void Doc()', '{', '  var r = new StreamReader(', '    "data.txt");', '  try', '  {', '    Console.WriteLine(r.ReadLine());', '    Console.WriteLine("Đọc xong");', '  }', '  finally', '  {', '    r.Dispose();', '  }', '}', 'Doc();'],
  run: function (c) {
   c.snap({ ln: 2, title: 'Gọi Doc(), mở tệp', body: 'Hàm Doc() mở data.txt.', viz: [myRes('hi'), myTE('dim', 'dim')] });
   c.out('10');
   c.snap({ ln: 6, title: 'Đọc một dòng', body: 'ReadLine đọc dòng đầu, "10".', viz: [myRes('hi'), myTE('hi', 'dim')] });
   c.out('Đọc xong');
   c.snap({ ln: 7, title: 'In "Đọc xong"', body: 'Hết lệnh trong try, sắp rời khối.', viz: [myRes('hi'), myTE('hi', 'dim')] });
   c.snap({ ln: 11, title: 'finally gọi Dispose', body: 'finally chạy trước khi hàm kết thúc.', viz: [myRes('ok'), myTE('ok', 'ok')] });
   c.snap({ ln: 11, title: 'Xong', body: 'Tệp đã Dispose khi hàm Doc() kết thúc.', viz: [myRes('ok'), myTE('ok', 'ok')] });
  }},
 { title: 'using var', sub: myTip,
  lines: ['static void Doc()', '{', '  using var r = new StreamReader(', '    "data.txt");', '  Console.WriteLine(r.ReadLine());', '  Console.WriteLine("Đọc xong");', '}', 'Doc();'],
  run: function (c) {
   c.snap({ ln: 2, title: 'Gọi Doc(), mở tệp', body: 'using var mở data.txt, r sống đến hết hàm.', viz: [myRes('hi'), myUs('dim', 'dim')] });
   c.out('10');
   c.snap({ ln: 4, title: 'Đọc một dòng', body: 'ReadLine đọc dòng đầu, "10".', viz: [myRes('hi'), myUs('hi', 'dim')] });
   c.out('Đọc xong');
   c.snap({ ln: 5, title: 'In "Đọc xong"', body: 'Tệp vẫn mở vì chưa hết phạm vi của hàm.', viz: [myRes('hi'), myUs('hi', 'dim')] });
   c.snap({ ln: 6, title: 'Hết hàm, tự Dispose', body: 'Tới dấu } của hàm, r ra khỏi phạm vi nên C# tự gọi Dispose.', viz: [myRes('ok'), myUs('ok', 'ok')] });
   c.snap({ ln: 6, title: 'Xong', body: 'Tệp đã Dispose, mà code chỉ có 8 dòng.', viz: [myRes('ok'), myUs('ok', 'ok')] });
  }}
 ]}
};
