// META {"module":3,"lesson":"Tạo và Sử dụng Ngoại lệ Tùy chỉnh (Custom Exceptions)","activity":"Tại sao cần ngoại lệ tùy chỉnh?","title":"Tại sao cần ngoại lệ tùy chỉnh","lead":"Rút 500 khi số dư chỉ có 200. Bên trái bắt lỗi bằng cách dò chữ, bên phải bắt theo kiểu. Bấm <b>Bước tiếp</b> để hai cột cùng chạy.","tabs":[["x","Rút 500, số dư 200"]],"codeTitle":"Mã nguồn C#"}
var myBal = 200, myAmt = 500, myM1 = 'Số dư không đủ', myM2 = 'Tài khoản thiếu tiền';
var myK = 'đủ';
var myHit1 = myM1.indexOf('không đủ') >= 0, myHit2 = myM2.indexOf('không đủ') >= 0;
var myMiss = myAmt - myBal;
var EX = {x: {
 intro: 'Cả hai cột cùng rút 500 từ tài khoản có 200. Hãy để ý catch nhận ra lỗi bằng cách nào.',
 running: 'Bên trái xét chữ trong Message, bên phải xét kiểu exception.',
 done: 'Sau khi sửa chữ trong thông điệp, bên trái xử lý nhầm nhánh ("Lỗi khác"), bên phải vẫn đúng và còn biết thiếu ' + myMiss + '.',
 note: 'Exception tùy chỉnh mang ý nghĩa nghiệp vụ và dữ liệu kèm theo. Hãy bắt theo kiểu thay vì dò chữ.',
 cols: [
 {title: 'Exception chung', sub: 'Dò chữ trong ex.Message.',
  lines: ['static void Rut(decimal b, decimal a)', '{', '  if (a > b)', '    throw new Exception(', '      "Số dư không đủ");', '}', 'try { Rut(200, 500); }', 'catch (Exception ex)', '{', '  var m = ex.Message;', '  if (m.Contains("không đủ"))', '    Console.WriteLine("Thiếu tiền");', '  else', '    Console.WriteLine("Lỗi khác");', '}'],
  run: function (c) {
   c.snap({ ln: 6, title: 'Gọi Rut(200, 500)', body: 'Số dư 200, rút 500 nên điều kiện a > b đúng.', vars: [['b', myBal], ['a', myAmt]], viz: [vCard({ kind: 'info', title: 'Tài khoản', rows: [['Số dư', myBal], ['Rút', myAmt]] })] });
   c.snap({ ln: 3, title: 'throw new Exception', body: 'Exception chung chỉ mang một chuỗi thông điệp, không có dữ liệu nào khác.', viz: [vCard({ kind: 'err', title: 'Exception', rows: [['Message', myM1]] })] });
   c.out('Thiếu tiền');
   c.snap({ ln: 11, title: 'Dò chữ trong Message', body: 'Message.Contains("không đủ") là ' + (myHit1 ? 'true' : 'false') + ', nên in "Thiếu tiền". Chạy đúng, nhưng dựa vào chữ.', viz: [vCard({ kind: 'ok', title: 'catch (Exception ex)', sub: 'Contains("không đủ") = ' + myHit1, rows: [['Message', myM1]] })] });
   c.snap({ ln: 4, title: 'Ai đó sửa thông điệp', body: 'Có người đổi chữ thành "' + myM2 + '". Chương trình vẫn biên dịch, không báo gì.', viz: [vCard({ kind: 'warn', title: 'Exception', rows: [['Message', myM2]] })] });
   c.out('Lỗi khác');
   c.snap({ ln: 13, title: 'Điều kiện sai, xử lý nhầm', body: 'Contains("không đủ") giờ là ' + (myHit2 ? 'true' : 'false') + ', nên rơi vào nhánh "Lỗi khác". Lỗi thiếu tiền bị xử lý nhầm.', viz: [vCard({ kind: 'err', title: 'catch (Exception ex)', sub: 'Contains("không đủ") = ' + myHit2, rows: [['Message', myM2]] })] });
   c.snap({ ln: 13, title: 'Xong', body: 'Bắt bằng cách dò chữ rất dễ vỡ khi chữ thay đổi.', viz: [vCard({ kind: 'err', title: 'catch (Exception ex)', sub: 'Contains("không đủ") = ' + myHit2, rows: [['Message', myM2]] })] });
  }},
 {title: 'InsufficientFundsException', sub: 'Bắt theo kiểu, có Balance và Amount.',
  lines: ['// Lớp có Balance, Amount (bài sau)', 'static void Rut(decimal b, decimal a)', '{', '  if (a > b)', '    throw new', '      InsufficientFundsException(b, a);', '}', 'try { Rut(200, 500); }', 'catch (InsufficientFundsException ex)', '{', '  var thieu = ex.Amount - ex.Balance;', '  Console.WriteLine("Thiếu " + thieu);', '}'],
  run: function (c) {
   c.snap({ ln: 7, title: 'Gọi Rut(200, 500)', body: 'Số dư 200, rút 500 nên điều kiện a > b đúng.', vars: [['b', myBal], ['a', myAmt]], viz: [vCard({ kind: 'info', title: 'Tài khoản', rows: [['Số dư', myBal], ['Rút', myAmt]] })] });
   c.snap({ ln: 4, title: 'throw InsufficientFundsException', body: 'Exception riêng cho nghiệp vụ này, mang theo Balance và Amount.', viz: [vCard({ kind: 'err', title: 'InsufficientFundsException', rows: [['Balance', myBal], ['Amount', myAmt]] })] });
   c.out('Thiếu ' + myMiss);
   c.snap({ ln: 11, title: 'catch theo kiểu', body: 'catch khớp theo kiểu, không cần đọc chữ. Amount - Balance = ' + myMiss + ', nên báo thiếu ' + myMiss + '.', vars: [['thieu', myMiss, 1]], viz: [vCard({ kind: 'ok', title: 'catch (InsufficientFundsException ex)', rows: [['Balance', myBal], ['Amount', myAmt], ['Thiếu', myMiss]] })] });
   c.snap({ ln: 5, title: 'Ai đó sửa thông điệp', body: 'Giả sử có người đổi chữ thông điệp thành "' + myM2 + '". Catch không dựa vào chữ nên không bị ảnh hưởng.', viz: [vCard({ kind: 'info', title: 'InsufficientFundsException', sub: 'Chữ trong thông điệp đã đổi', rows: [['Balance', myBal], ['Amount', myAmt]] })] });
   c.out('Thiếu ' + myMiss);
   c.snap({ ln: 8, title: 'Vẫn bắt đúng', body: 'Chạy lại, catch vẫn khớp theo kiểu và vẫn báo thiếu ' + myMiss + '.', vars: [['thieu', myMiss, 1]], viz: [vCard({ kind: 'ok', title: 'catch (InsufficientFundsException ex)', rows: [['Balance', myBal], ['Amount', myAmt], ['Thiếu', myMiss]] })] });
   c.snap({ ln: 8, title: 'Xong', body: 'Bắt theo kiểu ổn định, lại có dữ liệu kèm theo để dùng.', vars: [['thieu', myMiss]], viz: [vCard({ kind: 'ok', title: 'catch (InsufficientFundsException ex)', rows: [['Balance', myBal], ['Amount', myAmt], ['Thiếu', myMiss]] })] });
  }}
 ]}};
