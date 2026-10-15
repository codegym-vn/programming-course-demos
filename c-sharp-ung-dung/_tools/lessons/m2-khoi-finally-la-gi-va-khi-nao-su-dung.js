// META {"module":2,"lesson":"Khối finally và các trường hợp đặc biệt","activity":"Khối finally là gì và khi nào sử dụng","title":"Khối finally","lead":"Khối finally luôn chạy dù try có lỗi hay không. Chọn tình huống rồi bấm <b>Bước tiếp</b>.","tabs":[["khong","Không lỗi"],["co","Có lỗi được bắt"],["ret","Có return trong try"]],"codeTitle":"Mã nguồn C#"}
function myFl(t, c, f, a, items) {
  items = items || {};
  return vFlow([
    { t: 'try', s: t, item: items.t },
    { t: 'catch', s: c, sub: items.cs },
    { t: 'finally', s: f, sub: 'luôn chạy', item: items.f },
    { t: 'Sau khối', s: a, sub: items.as }
  ], { title: 'Đường đi của chương trình' });
}
var myBlk = function (mid, catchLine) {
  return ['try', '{', mid, '}', catchLine, '{', '  Console.WriteLine("Bắt lỗi");', '}', 'finally', '{', '  Console.WriteLine("Dọn dẹp");', '}', 'Console.WriteLine("Sau khối");'];
};
var EX = {
khong: { inputs: [], chips: [],
 intro: 'Try chạy suôn sẻ, không có lỗi. Xem finally có chạy không. Bấm "Bước tiếp".',
 lines: function () { return myBlk('  Console.WriteLine("Thử");', 'catch (FormatException)'); },
 run: function (c) {
  c.out('Thử');
  c.snap({ ln: 2, title: 'Chạy khối try', body: 'Try chạy lệnh và in "Thử". Không có lỗi nào xảy ra.', viz: [myFl('hi', 'dim', 'dim', 'dim')] });
  c.snap({ ln: 4, title: 'Bỏ qua catch', body: 'Không có exception nên catch không chạy, chương trình nhảy thẳng xuống finally.', viz: [myFl('ok', 'no', 'hi', 'dim')] });
  c.out('Dọn dẹp');
  c.snap({ ln: 10, title: 'finally vẫn chạy', body: 'finally luôn chạy, kể cả khi không có lỗi. Nó in "Dọn dẹp".', viz: [myFl('ok', 'no', 'ok', 'dim')] });
  c.out('Sau khối');
  c.snap({ ln: 12, title: 'Sau khối', body: 'Hết khối try-catch-finally, chương trình đi tiếp và in "Sau khối".', viz: [myFl('ok', 'no', 'ok', 'ok')] });
  c.snap({ ln: 12, title: 'Xong', body: 'Thứ tự in: Thử, Dọn dẹp, Sau khối.', note: 'Đặt mã dọn dẹp (đóng tệp, đóng kết nối, ghi log) vào finally để nó chạy trong mọi trường hợp.', viz: [myFl('ok', 'no', 'ok', 'ok')] });
 }},
co: { inputs: [], chips: [],
 intro: 'Try ném lỗi và catch bắt được. Xem finally có chạy không. Bấm "Bước tiếp".',
 lines: function () { return myBlk('  int n = int.Parse("abc");', 'catch (FormatException)'); },
 run: function (c) {
  c.snap({ ln: 2, title: 'Try ném lỗi', body: 'int.Parse("abc") ném FormatException. Phần còn lại của try (nếu có) bị bỏ qua.',
   viz: [myFl('bad', 'dim', 'dim', 'dim'), vCard({ kind: 'err', title: 'FormatException', sub: "The input string 'abc' was not in a correct format." })] });
  c.out('Bắt lỗi');
  c.snap({ ln: 6, title: 'catch bắt lỗi', body: 'catch (FormatException) khớp nên chạy và in "Bắt lỗi".', viz: [myFl('bad', 'ok', 'dim', 'dim')] });
  c.out('Dọn dẹp');
  c.snap({ ln: 10, title: 'finally chạy tiếp', body: 'Sau catch, finally chạy và in "Dọn dẹp".', viz: [myFl('bad', 'ok', 'ok', 'dim')] });
  c.out('Sau khối');
  c.snap({ ln: 12, title: 'Sau khối', body: 'Lỗi đã được xử lý nên chương trình đi tiếp và in "Sau khối".', viz: [myFl('bad', 'ok', 'ok', 'ok')] });
  c.snap({ ln: 12, title: 'Xong', body: 'Thứ tự in: Bắt lỗi, Dọn dẹp, Sau khối.', note: 'Có lỗi hay không, finally đều chạy. Đặt mã dọn dẹp vào đây.', viz: [myFl('bad', 'ok', 'ok', 'ok')] });
 }},
ret: { inputs: [], chips: [],
 intro: 'Try có lệnh return. Xem finally có chạy trước khi hàm trả về không. Bấm "Bước tiếp".',
 lines: function () { return ['static int Tinh()', '{', '  try', '  {', '    return 10;', '  }', '  finally', '  {', '    Console.WriteLine("Dọn dẹp");', '  }', '  Console.WriteLine("Sau khối");', '}', 'int x = Tinh();', 'Console.WriteLine(x);']; },
 run: function (c) {
  c.snap({ ln: 12, title: 'Gọi Tinh()', body: 'Chương trình nhảy vào hàm Tinh() và vào khối try.', vars: [['x', '?']], viz: [myFl('hi', 'dim', 'dim', 'dim')] });
  c.snap({ ln: 4, title: 'return 10 trong try', body: 'Hàm sắp trả về 10, nhưng chưa thoát hẳn: C# phải chạy finally trước.', vars: [['x', '?']], viz: [myFl('ok', 'dim', 'hi', 'dim', { t: 'return 10' })] });
  c.out('Dọn dẹp');
  c.snap({ ln: 8, title: 'finally chạy trước khi trả về', body: 'finally in "Dọn dẹp". Giá trị 10 vẫn đang chờ để trả về.', vars: [['x', '?']], viz: [myFl('ok', 'dim', 'ok', 'dim', { f: 'return 10' })] });
  c.snap({ ln: 10, title: 'Dòng "Sau khối" không chạy', body: 'Hàm đã return nên các dòng sau khối try-finally bị bỏ qua. Hàm trả về 10 cho nơi gọi.', vars: [['x', 10, 1]], viz: [myFl('ok', 'dim', 'ok', 'no', { as: 'không chạy' })] });
  c.out('10');
  c.snap({ ln: 13, title: 'In giá trị trả về', body: 'Dòng cuối in x, tức là 10.', vars: [['x', 10]], viz: [myFl('ok', 'dim', 'ok', 'no', { as: 'không chạy' })] });
  c.snap({ ln: 13, title: 'Xong', body: 'Thứ tự in: Dọn dẹp, 10. Cả ba tab đều in "Dọn dẹp".', note: 'finally chạy cả khi try có return. Chỉ khi tiến trình bị kết thúc đột ngột (tắt nguồn, Environment.FailFast) thì finally mới không chạy.', vars: [['x', 10]], viz: [myFl('ok', 'dim', 'ok', 'no', { as: 'không chạy' })] });
 }}
};
