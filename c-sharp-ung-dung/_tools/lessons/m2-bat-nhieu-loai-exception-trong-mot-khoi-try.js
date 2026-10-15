// META {"module":2,"lesson":"Bắt và xử lý nhiều loại Exception","activity":"Bắt nhiều loại Exception trong một khối try","title":"Bắt nhiều loại Exception","lead":"Mỗi catch là một cửa lọc, C# xét từ trên xuống. Chọn dữ liệu nhập rồi bấm <b>Bước tiếp</b>.","tabs":[["abc","\"abc\""],["zero","\"0\""],["big","\"99999999999\""],["five","\"5\""]],"codeTitle":"Mã nguồn C#"}
var myGateNames = ['catch (FormatException)', 'catch (DivideByZeroException)', 'catch (OverflowException)'];
var myGateTypes = ['FormatException', 'DivideByZeroException', 'OverflowException'];
var myMsgs = {
  FormatException: function (s) { return "The input string '" + s + "' was not in a correct format."; },
  DivideByZeroException: function () { return 'Attempted to divide by zero.'; },
  OverflowException: function () { return 'Value was either too large or too small for an Int32.'; }
};
function myCode(inp) {
  return ['string input = "' + inp + '";', 'try', '{', '  int n = int.Parse(input);', '  int r = 100 / n;', '  Console.WriteLine(r);', '}',
    'catch (FormatException)', '{ Console.WriteLine("Không phải số"); }',
    'catch (DivideByZeroException)', '{ Console.WriteLine("Chia cho 0"); }',
    'catch (OverflowException)', '{ Console.WriteLine("Quá lớn"); }'];
}
var myOut = ['Không phải số', 'Chia cho 0', 'Quá lớn'];
function myGates(states, pill, at) {
  return vGates(myGateNames.map(function (t, i) { return { t: t, s: states[i] }; }), { pill: pill, at: at });
}
function myRun(c, inp) {
  var n = null, r = null, hit = -1, type = null, where = null;
  if (!/^[+-]?\d+$/.test(inp)) { type = 'FormatException'; where = 'parse'; }
  else {
    n = Number(inp);
    if (n > 2147483647 || n < -2147483648) { type = 'OverflowException'; where = 'parse'; }
    else if (n === 0) { type = 'DivideByZeroException'; where = 'div'; }
    else r = Math.trunc(100 / n);
  }
  if (type) hit = myGateTypes.indexOf(type);
  var dim = ['dim', 'dim', 'dim'];
  c.snap({ ln: 0, title: 'Chuỗi nhập vào', body: 'Chuỗi input là "' + inp + '". Ba cửa catch bên dưới đang chờ, chưa cửa nào được xét.',
    vars: [['input', S(inp), 1]], viz: [myGates(dim)] });
  if (where === 'parse') {
    c.snap({ ln: 3, title: 'int.Parse ném lỗi', body: 'Không đổi được "' + inp + '" thành int, nên Parse ném ' + type + '. Dòng 100 / n không chạy.',
      vars: [['input', S(inp)]], viz: [vCard({ kind: 'err', title: type, sub: myMsgs[type](inp) }), myGates(dim, type, -1)] });
  } else {
    c.snap({ ln: 3, title: 'int.Parse thành công', body: 'Chuỗi "' + inp + '" đổi được thành số, n = ' + n + '.',
      vars: [['input', S(inp)], ['n', n, 1]], viz: [myGates(dim)] });
    if (where === 'div') {
      c.snap({ ln: 4, title: '100 / n ném lỗi', body: 'n bằng 0, phép chia số nguyên cho 0 ném ' + type + '.',
        vars: [['input', S(inp)], ['n', n]], viz: [vCard({ kind: 'err', title: type, sub: myMsgs[type]() }), myGates(dim, type, -1)] });
    } else {
      c.snap({ ln: 4, title: '100 / n', body: '100 / ' + n + ' = ' + r + ', không có lỗi nào.',
        vars: [['input', S(inp)], ['n', n], ['r', r, 1]], viz: [myGates(dim)] });
    }
  }
  if (!type) {
    c.out(String(r));
    c.snap({ ln: 5, title: 'In kết quả', body: 'Mọi lệnh trong try chạy hết, kết quả là ' + r + '. Không có exception nên không cửa nào được xét.',
      vars: [['input', S(inp)], ['n', n], ['r', r]], viz: [myGates(dim)] });
    c.snap({ ln: 6, title: 'Xong', body: 'Không có catch nào chạy.', note: 'Mỗi catch xử lý một loại lỗi. C# xét từ trên xuống và dừng ở catch khớp đầu tiên. Không có lỗi thì không catch nào chạy.',
      vars: [['input', S(inp)], ['n', n], ['r', r]], viz: [myGates(dim)] });
    return;
  }
  var vs = [['input', S(inp)]]; if (n !== null && where === 'div') vs.push(['n', n]);
  var st = ['dim', 'dim', 'dim'];
  for (var i = 0; i <= hit; i++) {
    var ok = (i === hit); st = st.slice(); st[i] = ok ? 'ok' : 'no';
    c.snap({ ln: 7 + 2 * i, title: 'Xét ' + myGateNames[i], body: ok ? 'Exception là ' + type + ', khớp với cửa này nên dừng lại ở đây.' : 'Exception là ' + type + ', không khớp ' + myGateTypes[i] + ', rơi xuống cửa tiếp theo.',
      vars: vs, viz: [myGates(st, type, i)] });
  }
  c.out(myOut[hit]);
  c.snap({ ln: 8 + 2 * hit, title: 'Chạy thân catch', body: 'Chỉ catch này chạy và in "' + myOut[hit] + '". Các catch còn lại bị bỏ qua.', vars: vs, viz: [myGates(st)] });
  c.snap({ ln: 8 + 2 * hit, title: 'Xong', body: 'Chương trình đi tiếp sau khối try-catch.', note: 'Mỗi catch xử lý một loại lỗi. C# xét từ trên xuống và dừng ở catch khớp đầu tiên. Số vượt phạm vi int ném OverflowException, không phải FormatException.',
    vars: vs, viz: [myGates(st)] });
}
var EX = {};
['abc', '0', '99999999999', '5'].forEach(function (inp, k) {
  var key = ['abc', 'zero', 'big', 'five'][k];
  EX[key] = { inputs: [], chips: [], intro: 'Dữ liệu nhập là "' + inp + '". Xem exception đi qua các cửa catch. Bấm "Bước tiếp".',
    lines: function () { return myCode(inp); }, run: function (c) { myRun(c, inp); } };
});
