// META {"module":2,"lesson":"Khối finally và các trường hợp đặc biệt","activity":"Sử dụng finally để đảm bảo tài nguyên được giải phóng","title":"Finally giải phóng tài nguyên","lead":"Cùng một tệp data.txt có dòng thứ hai là chữ. Bên trái không có finally, bên phải có. Bấm <b>Bước tiếp</b> để hai cột cùng chạy.","tabs":[["x","Lỗi khi đang đọc"]],"codeTitle":"Mã nguồn C#"}
function myFileViz(lamp, label, sub, fl) {
  return [vLamps([{ t: 'data.txt', s: lamp, sub: label }]), vFlow(fl)];
}
var EX = {x: {
 intro: 'Hai cột cùng mở data.txt (nội dung: 10, abc, 30) rồi đọc từng dòng. Hãy để ý đèn trạng thái của tệp.',
 running: 'Dòng thứ hai là "abc" nên Parse ném lỗi giữa chừng. Xem tệp có được đóng không.',
 done: 'Bên trái: tệp vẫn mở (rò rỉ) vì Close() bị bỏ qua. Bên phải: finally đã đóng tệp dù có lỗi.',
 note: 'Đưa lệnh giải phóng tài nguyên vào finally để nó chạy trong mọi trường hợp. Cách gọn hơn là using, sẽ học ở chương sau.',
 cols: [
 {title: 'Không finally', sub: 'Close() nằm sau dòng có thể lỗi.',
  lines: ['var r = new StreamReader(', '  "data.txt");', 'try', '{', '  int a = int.Parse(r.ReadLine());', '  int b = int.Parse(r.ReadLine());', '  r.Close();', '}', 'catch (FormatException)', '{', '  Console.WriteLine("Dữ liệu sai");', '}'],
  run: function (c) {
   c.snap({ ln: 0, title: 'Mở tệp', body: 'StreamReader mở data.txt, tệp ở trạng thái đang mở.', viz: myFileViz('hi', 'Đang mở', '', [{ t: 'try', s: 'dim' }, { t: 'catch', s: 'dim' }, { t: 'Close()', s: 'dim' }]) });
   c.snap({ ln: 4, title: 'Đọc dòng 1', body: 'Dòng 1 là "10", Parse thành công, a = 10.', vars: [['a', 10, 1]], viz: myFileViz('hi', 'Đang mở', '', [{ t: 'try', s: 'hi' }, { t: 'catch', s: 'dim' }, { t: 'Close()', s: 'dim' }]) });
   c.snap({ ln: 5, title: 'Dòng 2 gây lỗi', body: 'Dòng 2 là "abc", int.Parse ném FormatException. Dòng Close() phía sau bị bỏ qua.', vars: [['a', 10]],
    viz: [vLamps([{ t: 'data.txt', s: 'hi', sub: 'Đang mở' }]), vCard({ kind: 'err', title: 'FormatException', sub: "The input string 'abc' was not in a correct format." })] });
   c.out('Dữ liệu sai');
   c.snap({ ln: 10, title: 'catch báo lỗi', body: 'catch bắt FormatException và in "Dữ liệu sai". Nhưng không có lệnh nào đóng tệp.', vars: [['a', 10]], viz: myFileViz('hi', 'Đang mở', '', [{ t: 'try', s: 'bad' }, { t: 'catch', s: 'ok' }, { t: 'Close()', s: 'dim' }]) });
   c.snap({ ln: 6, title: 'Close() không bao giờ chạy', body: 'Chương trình rời khối mà tệp vẫn mở. Đây là rò rỉ tài nguyên.', vars: [['a', 10]], viz: myFileViz('bad', 'Vẫn mở (rò rỉ)', '', [{ t: 'try', s: 'bad' }, { t: 'catch', s: 'ok' }, { t: 'Close()', s: 'no', sub: 'bị bỏ qua' }]) });
   c.snap({ ln: 6, title: 'Xong', body: 'Tệp vẫn mở, các chương trình khác có thể không mở được.', vars: [['a', 10]], viz: myFileViz('bad', 'Vẫn mở (rò rỉ)', '', [{ t: 'try', s: 'bad' }, { t: 'catch', s: 'ok' }, { t: 'Close()', s: 'no', sub: 'bị bỏ qua' }]) });
  }},
 {title: 'Có finally', sub: 'Close() nằm trong finally.',
  lines: ['var r = new StreamReader(', '  "data.txt");', 'try', '{', '  int a = int.Parse(r.ReadLine());', '  int b = int.Parse(r.ReadLine());', '}', 'catch (FormatException)', '{', '  Console.WriteLine("Dữ liệu sai");', '}', 'finally', '{', '  r.Close();', '}'],
  run: function (c) {
   c.snap({ ln: 0, title: 'Mở tệp', body: 'StreamReader mở data.txt, tệp ở trạng thái đang mở.', viz: myFileViz('hi', 'Đang mở', '', [{ t: 'try', s: 'dim' }, { t: 'catch', s: 'dim' }, { t: 'finally', s: 'dim', sub: 'luôn chạy' }]) });
   c.snap({ ln: 4, title: 'Đọc dòng 1', body: 'Dòng 1 là "10", Parse thành công, a = 10.', vars: [['a', 10, 1]], viz: myFileViz('hi', 'Đang mở', '', [{ t: 'try', s: 'hi' }, { t: 'catch', s: 'dim' }, { t: 'finally', s: 'dim', sub: 'luôn chạy' }]) });
   c.snap({ ln: 5, title: 'Dòng 2 gây lỗi', body: 'Dòng 2 là "abc", int.Parse ném FormatException.', vars: [['a', 10]],
    viz: [vLamps([{ t: 'data.txt', s: 'hi', sub: 'Đang mở' }]), vCard({ kind: 'err', title: 'FormatException', sub: "The input string 'abc' was not in a correct format." })] });
   c.out('Dữ liệu sai');
   c.snap({ ln: 9, title: 'catch báo lỗi', body: 'catch bắt lỗi và in "Dữ liệu sai". Tệp vẫn đang mở, nhưng finally sắp chạy.', vars: [['a', 10]], viz: myFileViz('hi', 'Đang mở', '', [{ t: 'try', s: 'bad' }, { t: 'catch', s: 'ok' }, { t: 'finally', s: 'hi', sub: 'luôn chạy' }]) });
   c.snap({ ln: 13, title: 'finally gọi Close()', body: 'finally luôn chạy, nên r.Close() đóng tệp.', vars: [['a', 10]], viz: myFileViz('ok', 'Đóng', '', [{ t: 'try', s: 'bad' }, { t: 'catch', s: 'ok' }, { t: 'finally', s: 'ok', sub: 'luôn chạy' }]) });
   c.snap({ ln: 13, title: 'Xong', body: 'Tệp đã đóng dù có lỗi xảy ra giữa chừng.', vars: [['a', 10]], viz: myFileViz('ok', 'Đóng', '', [{ t: 'try', s: 'bad' }, { t: 'catch', s: 'ok' }, { t: 'finally', s: 'ok', sub: 'luôn chạy' }]) });
  }}
 ]}};
