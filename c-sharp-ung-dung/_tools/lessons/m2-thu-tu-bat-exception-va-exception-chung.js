// META {"module":2,"lesson":"Bắt và xử lý nhiều loại Exception","activity":"Thứ tự bắt Exception và Exception chung","title":"Thứ tự catch và Exception chung","lead":"Mỗi exception là con cháu của Exception. Chọn tình huống rồi bấm <b>Bước tiếp</b>.","tabs":[["dung","Thứ tự đúng"],["chung","Exception chung bắt lỗi lạ"],["sai","Thứ tự sai"]],"codeTitle":"Mã nguồn C#"}
function myTree(m) {
  m = m || {};
  var list = [['Exception', 0], ['SystemException', 1], ['FormatException', 2], ['NullReferenceException', 2], ['ArithmeticException', 2], ['DivideByZeroException', 3], ['OverflowException', 3]];
  return vTree(list.map(function (x) { return { t: x[0], d: x[1], kind: 'cls', s: m[x[0]] }; }));
}
function myG(names, st, pill, at) {
  return vGates(names.map(function (t, i) { return { t: t, s: st[i] }; }), { pill: pill, at: at });
}
var myN3 = ['catch (FormatException)', 'catch (DivideByZeroException)', 'catch (Exception)'];
var EX = {
dung: { inputs: [], chips: [],
 intro: 'Ném DivideByZeroException và xem catch nào bắt. Bấm "Bước tiếp".',
 lines: function () { return ['try', '{', '  throw new DivideByZeroException();', '}', 'catch (FormatException)', '{ Console.WriteLine("Sai số"); }', 'catch (DivideByZeroException)', '{ Console.WriteLine("Chia 0"); }', 'catch (Exception)', '{ Console.WriteLine("Lỗi khác"); }']; },
 run: function (c) {
  var T = 'DivideByZeroException';
  c.snap({ ln: 2, title: 'throw ném exception', body: 'Dòng throw ném một DivideByZeroException. Nó rơi xuống các cửa catch bên dưới.',
   viz: [myTree({ DivideByZeroException: 'bad' }), myG(myN3, ['dim', 'dim', 'dim'], T, -1)] });
  c.snap({ ln: 4, title: 'Cửa 1: FormatException', body: 'DivideByZeroException không phải FormatException (hai nhánh khác nhau trên cây), không khớp.',
   viz: [myTree({ DivideByZeroException: 'bad', FormatException: 'no' }), myG(myN3, ['no', 'dim', 'dim'], T, 0)] });
  c.snap({ ln: 6, title: 'Cửa 2: DivideByZeroException', body: 'Đúng loại exception đang ném, khớp. C# dừng ở đây, cửa 3 không được xét.',
   viz: [myTree({ DivideByZeroException: 'ok' }), myG(myN3, ['no', 'ok', 'dim'], T, 1)] });
  c.out('Chia 0');
  c.snap({ ln: 7, title: 'Chạy thân catch 2', body: 'In "Chia 0". catch (Exception) ở cuối không chạy vì lỗi đã được xử lý.',
   viz: [myTree({ DivideByZeroException: 'ok' }), myG(myN3, ['no', 'ok', 'dim'])] });
  c.snap({ ln: 7, title: 'Xong', body: 'Catch cụ thể đứng trước đã xử lý đúng lỗi.', note: 'Đặt catch cụ thể trước, catch chung sau. Một catch bắt được mọi exception là lớp con của kiểu nó khai báo.',
   viz: [myTree({ DivideByZeroException: 'ok' }), myG(myN3, ['no', 'ok', 'dim'])] });
 }},
chung: { inputs: [], chips: [],
 intro: 'Ném một lỗi mà hai catch đầu không biết. Bấm "Bước tiếp".',
 lines: function () { return ['try', '{', '  throw new NullReferenceException();', '}', 'catch (FormatException)', '{ Console.WriteLine("Sai số"); }', 'catch (DivideByZeroException)', '{ Console.WriteLine("Chia 0"); }', 'catch (Exception)', '{ Console.WriteLine("Lỗi khác"); }']; },
 run: function (c) {
  var T = 'NullReferenceException';
  c.snap({ ln: 2, title: 'throw ném exception', body: 'Lần này ném NullReferenceException, một loại hai catch đầu không nhắc tới.',
   viz: [myTree({ NullReferenceException: 'bad' }), myG(myN3, ['dim', 'dim', 'dim'], T, -1)] });
  c.snap({ ln: 4, title: 'Cửa 1: FormatException', body: 'NullReferenceException không phải FormatException, không khớp.',
   viz: [myTree({ NullReferenceException: 'bad', FormatException: 'no' }), myG(myN3, ['no', 'dim', 'dim'], T, 0)] });
  c.snap({ ln: 6, title: 'Cửa 2: DivideByZeroException', body: 'Cũng không khớp, exception rơi tiếp xuống cửa cuối.',
   viz: [myTree({ NullReferenceException: 'bad', DivideByZeroException: 'no' }), myG(myN3, ['no', 'no', 'dim'], T, 1)] });
  c.snap({ ln: 8, title: 'Leo cây lên các lớp cha', body: 'NullReferenceException kế thừa SystemException, và SystemException kế thừa Exception. Vậy nó cũng là một Exception.',
   viz: [myTree({ NullReferenceException: 'bad', SystemException: 'hi', Exception: 'hi' }), myG(myN3, ['no', 'no', 'hi'], T, 2)] });
  c.snap({ ln: 8, title: 'Cửa 3: Exception khớp', body: 'catch (Exception) bắt được mọi exception là con cháu của Exception, nên lỗi lạ bị bắt ở đây.',
   viz: [myTree({ NullReferenceException: 'ok', SystemException: 'ok', Exception: 'ok' }), myG(myN3, ['no', 'no', 'ok'], T, 2)] });
  c.out('Lỗi khác');
  c.snap({ ln: 9, title: 'Chạy thân catch 3', body: 'In "Lỗi khác". Chương trình không bị dừng đột ngột.',
   viz: [myTree({ NullReferenceException: 'ok', SystemException: 'ok', Exception: 'ok' }), myG(myN3, ['no', 'no', 'ok'])] });
  c.snap({ ln: 9, title: 'Xong', body: 'catch (Exception) hoạt động như lưới an toàn.', note: 'catch (Exception) là lưới an toàn cuối cùng, đặt sau mọi catch cụ thể.',
   viz: [myTree({ NullReferenceException: 'ok', SystemException: 'ok', Exception: 'ok' }), myG(myN3, ['no', 'no', 'ok'])] });
 }},
sai: { inputs: [], chips: [],
 intro: 'Đặt catch (Exception) lên đầu và xem trình biên dịch phản ứng. Bấm "Bước tiếp".',
 lines: function () { return ['try', '{', '  int n = int.Parse(input);', '}', 'catch (Exception)', '{ Console.WriteLine("Lỗi"); }', 'catch (FormatException)', '{ Console.WriteLine("Sai số"); }']; },
 run: function (c) {
  var bad = ['catch (Exception)', 'catch (FormatException)'];
  c.snap({ ln: 2, title: 'Dòng Parse có thể ném lỗi', body: 'int.Parse có thể ném FormatException. Người viết định xử lý bằng catch (FormatException) ở cuối.',
   viz: [myTree({ FormatException: 'hi' }), myG(bad, ['dim', 'dim'])] });
  c.snap({ ln: 4, title: 'catch (Exception) đứng đầu', body: 'Cửa này bắt mọi exception, kể cả mọi lớp con của Exception.',
   viz: [myTree({ Exception: 'ok', SystemException: 'ok', FormatException: 'ok', NullReferenceException: 'ok', ArithmeticException: 'ok', DivideByZeroException: 'ok', OverflowException: 'ok' }), myG(bad, ['ok', 'dim'])] });
  c.snap({ ln: 6, title: 'Trình biên dịch xét catch thứ hai', body: 'FormatException leo lên SystemException rồi Exception, tức là catch phía trên đã bắt được nó rồi.',
   viz: [myTree({ FormatException: 'bad', SystemException: 'hi', Exception: 'hi' }), myG(bad, ['hi', 'hi'])] });
  c.err('error CS0160: A previous catch clause already catches all exceptions of this or of a super type (\'Exception\')');
  c.snap({ ln: 6, title: 'Lỗi biên dịch CS0160', body: 'catch (FormatException) không bao giờ chạy tới, nên trình biên dịch từ chối. Chương trình không chạy được.',
   viz: [vCard({ kind: 'err', title: 'CS0160', sub: 'Lỗi biên dịch, không phải lỗi lúc chạy.' }), myG(bad, ['ok', 'bad'])] });
  c.snap({ ln: 6, title: 'Xong', body: 'Cách sửa là đảo thứ tự: catch (FormatException) trước, catch (Exception) sau cùng.', note: 'Catch cụ thể trước, chung sau. Thứ tự sai là lỗi biên dịch.',
   viz: [myG(['catch (FormatException)', 'catch (Exception)'], ['ok', 'ok'])] });
 }}
};
