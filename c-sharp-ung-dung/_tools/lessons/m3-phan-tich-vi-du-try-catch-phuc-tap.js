// META {"module":3,"lesson":"Xử lý Đa Ngoại lệ và Thứ tự Catch","activity":"Phân tích ví dụ try-catch phức tạp","title":"Exception đi ngược ngăn xếp","lead":"Hàm gọi hàm, exception nổi lên cho tới catch gần nhất. Chọn nơi bắt lỗi rồi bấm <b>Bước tiếp</b>.","tabs":[["main","Bắt ở Main"],["proc","Bắt ngay trong ProcessOrder"]],"codeTitle":"Mã nguồn C#"}
var MSG = "The input string 'hai' was not in a correct format.";
function myStk(f, ball) {
  return vStack(f, { ballText: 'FormatException' });
}
var myPQ = ['static int ParseQuantity(string s)', '{', '  return int.Parse(s);', '}'];
var EX = {
main: { inputs: [], chips: [],
 intro: 'Số lượng "hai" không phải số. Xem lỗi đi qua các hàm cho tới nơi có catch. Bấm "Bước tiếp".',
 lines: function () { return myPQ.concat(['static decimal ProcessOrder(string q)', '{', '  int n = ParseQuantity(q);', '  return n * 10000m;', '}', 'try', '{', '  var t = ProcessOrder("hai");', '  Console.WriteLine(t);', '}', 'catch (FormatException)', '{', '  Console.WriteLine("Số lượng sai");', '}']); },
 run: function (c) {
  c.snap({ ln: 11, title: 'Main gọi ProcessOrder("hai")', body: 'Một khung mới ProcessOrder được chồng lên ngăn xếp.',
   viz: [myStk([{ t: 'Main', sub: 'có catch', s: 'hi' }, { t: 'ProcessOrder("hai")', s: 'hi' }])] });
  c.snap({ ln: 6, title: 'ProcessOrder gọi ParseQuantity', body: 'Khung thứ ba ParseQuantity("hai") được chồng lên.',
   viz: [myStk([{ t: 'Main', sub: 'có catch' }, { t: 'ProcessOrder' }, { t: 'ParseQuantity("hai")', s: 'hi' }])] });
  c.snap({ ln: 2, title: 'int.Parse ném lỗi', body: 'Parse ném FormatException ngay trong ParseQuantity. Khung này không có catch nên bị đóng lại.',
   viz: [myStk([{ t: 'Main', sub: 'có catch' }, { t: 'ProcessOrder' }, { t: 'ParseQuantity("hai")', s: 'bad', sub: 'không có catch', ball: true }]), vCard({ kind: 'err', title: 'FormatException', sub: MSG })] });
  c.snap({ ln: 6, title: 'Bóng đỏ lên ProcessOrder', body: 'ProcessOrder cũng không có catch nên khung này đóng lại. Dòng return n * 10000m không chạy.',
   viz: [myStk([{ t: 'Main', sub: 'có catch' }, { t: 'ProcessOrder', s: 'bad', sub: 'không có catch, dòng sau bị bỏ qua', ball: true }, { t: 'ParseQuantity', s: 'dim', sub: 'đã đóng' }])] });
  c.snap({ ln: 14, title: 'Bóng đỏ lên Main', body: 'Main có catch (FormatException) khớp với lỗi, nên bắt lấy tại đây.',
   viz: [myStk([{ t: 'Main', s: 'ok', sub: 'catch bắt được', ball: true }, { t: 'ProcessOrder', s: 'dim', sub: 'đã đóng' }, { t: 'ParseQuantity', s: 'dim', sub: 'đã đóng' }])] });
  c.out('Số lượng sai');
  c.snap({ ln: 16, title: 'Main xử lý lỗi', body: 'Main in "Số lượng sai". Dòng Console.WriteLine(t) trong try không chạy vì t chưa có giá trị.',
   viz: [myStk([{ t: 'Main', s: 'ok', sub: 'đã xử lý' }])] });
  c.snap({ ln: 16, title: 'Xong', body: 'Lỗi đi qua hai hàm trung gian mà không ai xử lý.', note: 'Exception đi ngược ngăn xếp lời gọi tới catch gần nhất. Mọi dòng còn lại của các hàm trung gian bị bỏ qua.',
   viz: [myStk([{ t: 'Main', s: 'ok', sub: 'đã xử lý' }])] });
 }},
proc: { inputs: [], chips: [],
 intro: 'Lần này ProcessOrder tự có catch. Xem lỗi dừng ở đâu. Bấm "Bước tiếp".',
 lines: function () { return myPQ.concat(['static decimal ProcessOrder(string q)', '{', '  try', '  {', '    int n = ParseQuantity(q);', '    return n * 10000m;', '  }', '  catch (FormatException)', '  {', '    return 0;', '  }', '}', 'var t = ProcessOrder("hai");', 'Console.WriteLine(t);']); },
 run: function (c) {
  c.snap({ ln: 16, title: 'Main gọi ProcessOrder("hai")', body: 'Một khung mới ProcessOrder được chồng lên ngăn xếp.',
   viz: [myStk([{ t: 'Main', s: 'hi' }, { t: 'ProcessOrder("hai")', sub: 'có catch', s: 'hi' }])] });
  c.snap({ ln: 8, title: 'ProcessOrder gọi ParseQuantity', body: 'Khung thứ ba ParseQuantity("hai") được chồng lên.',
   viz: [myStk([{ t: 'Main' }, { t: 'ProcessOrder', sub: 'có catch' }, { t: 'ParseQuantity("hai")', s: 'hi' }])] });
  c.snap({ ln: 2, title: 'int.Parse ném lỗi', body: 'Parse ném FormatException tại ParseQuantity. Khung này không có catch nên bị đóng lại.',
   viz: [myStk([{ t: 'Main' }, { t: 'ProcessOrder', sub: 'có catch' }, { t: 'ParseQuantity("hai")', s: 'bad', sub: 'không có catch', ball: true }]), vCard({ kind: 'err', title: 'FormatException', sub: MSG })] });
  c.snap({ ln: 11, title: 'Bóng đỏ lên ProcessOrder', body: 'ProcessOrder có catch (FormatException) khớp, nên bắt lỗi ngay tại đây. Dòng return n * 10000m bị bỏ qua.',
   viz: [myStk([{ t: 'Main' }, { t: 'ProcessOrder', s: 'ok', sub: 'catch bắt được', ball: true }, { t: 'ParseQuantity', s: 'dim', sub: 'đã đóng' }])] });
  c.snap({ ln: 13, title: 'Trả về giá trị mặc định', body: 'catch trả về 0, ProcessOrder kết thúc bình thường. Lỗi không đi tiếp lên Main.',
   viz: [myStk([{ t: 'Main' }, { t: 'ProcessOrder', s: 'ok', sub: 'return 0' }])] });
  c.out('0');
  c.snap({ ln: 17, title: 'Main chạy tiếp bình thường', body: 'Main nhận 0 và in ra. Main không hề biết đã có lỗi.', vars: [['t', 0, 1]],
   viz: [myStk([{ t: 'Main', s: 'ok' }])] });
  c.snap({ ln: 17, title: 'Xong', body: 'Lỗi dừng ở catch gần nhất, nằm ngay trong ProcessOrder.', note: 'Exception đi ngược ngăn xếp lời gọi tới catch gần nhất. Đặt catch ở hàm nào thì lỗi dừng ở hàm đó.', vars: [['t', 0]],
   viz: [myStk([{ t: 'Main', s: 'ok' }])] });
 }}
};
