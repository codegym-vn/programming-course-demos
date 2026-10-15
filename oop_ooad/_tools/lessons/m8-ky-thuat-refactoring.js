// META {"module":8,"lesson":"Refactoring cơ bản và Thực hành SOLID","activity":"Các kỹ thuật Refactoring phổ biến","title":"Refactor: đổi cấu trúc, không đổi hành vi","lead":"Mỗi tab một kỹ thuật. Code Trước ở trên, code Sau ở dưới. Bấm <b>Bước tiếp</b> để xem kết quả trước và sau có giống nhau không.","tabs":[["extract","Extract Method"],["rename","Rename"],["magic","Hằng số thay số cố định"],["poly","Đa hình thay if / else"]],"codeTitle":"Mã nguồn C# (Trước rồi Sau)"}
function sc(lines, intro, plan, X, name){
 var idx = function(s){ var i = lines.indexOf(s); if (i < 0) throw new Error('missing line: ' + s); return i; };
 return {inputs:[],intro:intro,lines:function(){ return lines; },
  run:function(c){
   plan(c, idx, X);
  }};
}
function final(c, ln, X, what){
 c.out(String(X));
 c.snap({ln:ln,title:'Xong: vẫn ra ' + X,body:'Chạy lại với cùng đầu vào vẫn ra ' + X + '. ' + what,note:'Refactor chỉ đổi cấu trúc code. Hành vi (kết quả) giữ nguyên.',vars:[['kết quả',X,1]]});
}
var EX = {};

// 1. Extract Method
(function(){
 var prices = [100,50,120], X = prices.reduce(function(a, b){ return a + b; }, 0);
 var lines = ['// Trước','void PrintBill(int[] prices)','{','  int total = 0;','  foreach (int p in prices)','    total += p;','  Console.WriteLine(total);','}','PrintBill(new[] {100, 50, 120});','','// Sau','int Sum(int[] prices)','{','  int total = 0;','  foreach (int p in prices)','    total += p;','  return total;','}','void PrintBill2(int[] prices)','{','  Console.WriteLine(Sum(prices));','}','PrintBill2(new[] {100, 50, 120});'];
 EX.extract = sc(lines,'Tính tổng hóa đơn 100, 50, 120. Ta tách phần cộng ra thành phương thức riêng. Bấm "Bước tiếp".',function(c, ix, X){
  var ar = AR('prices',prices);
  c.out(String(X));
  c.snap({ln:ix('PrintBill(new[] {100, 50, 120});'),title:'Chạy code Trước',body:'Vòng foreach cộng dồn các giá, in ra tổng ' + X + '. Đây là kết quả chuẩn cần giữ.',vars:[['total',X,1]],arrs:[ar]});
  c.snap({ln:ix('int Sum(int[] prices)'),title:'Tách phần cộng ra Sum',body:'Đoạn cộng dồn được cắt ra thành phương thức Sum, đặt tên nói rõ việc nó làm. Đây là Extract Method.',vars:[['kết quả chuẩn',X]],arrs:[ar]});
  c.snap({ln:ix('  Console.WriteLine(Sum(prices));'),title:'Gọi Sum thay cho vòng lặp',body:'PrintBill giờ chỉ còn một dòng gọi Sum rồi in. Ngắn và dễ đọc hơn.',vars:[['kết quả chuẩn',X]],arrs:[ar]});
  var r = prices.reduce(function(a, b){ return a + b; }, 0);
  c.out(String(r));
  c.snap({ln:ix('PrintBill2(new[] {100, 50, 120});'),title:'Xong: vẫn ra ' + r,body:'Chạy lại với cùng đầu vào, in ' + r + ', giống code Trước' + (r === X ? '' : ' (khác!)') + '.',note:'Refactor chỉ đổi cấu trúc code. Hành vi (kết quả) giữ nguyên.',vars:[['kết quả',r,1]],arrs:[ar]});
 },X);
})();

// 2. Rename
(function(){
 var q = 3, pr = 50000, X = q * pr;
 var lines = ['// Trước','int Calc(int q, int p)','{','  int t = q * p;','  return t;','}','Console.WriteLine(Calc(3, 50000));','','// Sau','int CalcLineTotal(','  int quantity, int price)','{','  int total = quantity * price;','  return total;','}','Console.WriteLine(','  CalcLineTotal(3, 50000));'];
 EX.rename = sc(lines,'Tính thành tiền của một dòng hàng: 3 cái, mỗi cái 50000. Ta chỉ đổi tên cho rõ nghĩa. Bấm "Bước tiếp".',function(c, ix){
  c.out(String(X));
  c.snap({ln:ix('Console.WriteLine(Calc(3, 50000));'),title:'Chạy code Trước',body:'Calc(3, 50000) tính t = 3 * 50000 = ' + X + '. Các tên Calc, q, p, t khó đoán nghĩa.',vars:[['q',q],['p',pr],['t',X,1]]});
  c.snap({ln:ix('int CalcLineTotal('),title:'Đổi tên phương thức',body:'Calc thành CalcLineTotal: tên nói rõ là tính thành tiền của một dòng hàng.',vars:[['kết quả chuẩn',X]]});
  c.snap({ln:ix('  int quantity, int price)'),title:'Đổi tên tham số',body:'q thành quantity (số lượng), p thành price (đơn giá). Chỉ đổi tên, logic giữ nguyên.',vars:[['quantity',q,1],['price',pr,1]]});
  c.snap({ln:ix('  int total = quantity * price;'),title:'Đổi tên biến',body:'t thành total. Phép tính vẫn là nhân số lượng với đơn giá.',vars:[['quantity',q],['price',pr],['total',X,1]]});
  var r = q * pr; c.out(String(r));
  c.snap({ln:ix('  CalcLineTotal(3, 50000));'),title:'Xong: vẫn ra ' + r,body:'Chạy lại với cùng đầu vào, in ' + r + ', giống code Trước' + (r === X ? '' : ' (khác!)') + '.',note:'Refactor chỉ đổi cấu trúc code. Hành vi (kết quả) giữ nguyên.',vars:[['kết quả',r,1]]});
 },X);
})();

// 3. Magic number
(function(){
 var price = 200000, rate = 10, X = price + price * rate / 100;
 var lines = ['// Trước','int Total(int price)','{','  return price + price * 10 / 100;','}','Console.WriteLine(Total(200000));','','// Sau','const int TaxRate = 10;','int Total2(int price)','{','  int tax = price * TaxRate / 100;','  return price + tax;','}','Console.WriteLine(Total2(200000));'];
 EX.magic = sc(lines,'Tính giá có thuế của món 200000. Số 10 trong code là gì? Ta cho nó một cái tên. Bấm "Bước tiếp".',function(c, ix){
  c.out(String(X));
  c.snap({ln:ix('Console.WriteLine(Total(200000));'),title:'Chạy code Trước',body:'Total(200000) = 200000 + 200000 * 10 / 100 = ' + X + '. Người đọc phải đoán 10 là thuế 10%.',vars:[['price',price],['kết quả',X,1]]});
  c.snap({ln:ix('const int TaxRate = 10;'),title:'Khai báo hằng số',body:'Tạo hằng số TaxRate = 10. Số 10 bí ẩn giờ có tên: thuế suất 10%.',vars:[['TaxRate',rate,1]]});
  var tax = price * rate / 100;
  c.snap({ln:ix('  int tax = price * TaxRate / 100;'),title:'Dùng hằng số thay số 10',body:'tax = price * TaxRate / 100 = ' + tax + '. Đọc tên là hiểu, cần đổi thuế chỉ sửa một chỗ.',vars:[['TaxRate',rate],['price',price],['tax',tax,1]]});
  var r = price + tax; c.out(String(r));
  c.snap({ln:ix('Console.WriteLine(Total2(200000));'),title:'Xong: vẫn ra ' + r,body:'Chạy lại với cùng đầu vào: ' + price + ' + ' + tax + ' = ' + r + ', giống code Trước' + (r === X ? '' : ' (khác!)') + '.',note:'Refactor chỉ đổi cấu trúc code. Hành vi (kết quả) giữ nguyên.',vars:[['kết quả',r,1]]});
 },X);
})();

// 4. Conditional -> polymorphism
(function(){
 var km = 10, rates = {Bike:3000, Car:8000};
 var feeIf = function(k, d){ if (k === 'Bike') return d * 3000; else if (k === 'Car') return d * 8000; return 0; };
 var X = feeIf('Car', km);
 var lines = ['// Trước','int Fee(string kind, int km)','{','  if (kind == "Bike")','    return km * 3000;','  else if (kind == "Car")','    return km * 8000;','  return 0;','}','Console.WriteLine(Fee("Car", 10));','','// Sau','abstract class Vehicle','{','  public abstract int Fee(int km);','}','class Bike : Vehicle','{','  public override int Fee(int km)','    => km * 3000;','}','class Car : Vehicle','{','  public override int Fee(int km)','    => km * 8000;','}','Vehicle v = new Car();','Console.WriteLine(v.Fee(10));'];
 EX.poly = sc(lines,'Tính phí đi 10 km bằng xe Car. Ta thay chuỗi if / else bằng đa hình. Bấm "Bước tiếp".',function(c, ix){
  var carLn = lines.indexOf('  public override int Fee(int km)', lines.indexOf('class Car : Vehicle'));
  c.out(String(X));
  c.snap({ln:ix('Console.WriteLine(Fee("Car", 10));'),title:'Chạy code Trước',body:'Fee("Car", 10) đi vào nhánh Car: 10 * 8000 = ' + X + '. Thêm loại xe mới phải thêm else if.',vars:[['kind',S('Car')],['km',km],['kết quả',X,1]]});
  c.snap({ln:ix('  public abstract int Fee(int km);'),title:'Tạo lớp trừu tượng Vehicle',body:'Vehicle khai báo chung phương thức Fee(int km), để mỗi loại xe tự tính.',vars:[['kết quả chuẩn',X]],objs:[O('Vehicle (abstract)',[['Fee(km)','abstract']],{hi:1})]});
  c.snap({ln:carLn,title:'Mỗi nhánh thành một lớp',body:'Nhánh Bike thành lớp Bike (3000 mỗi km), nhánh Car thành lớp Car (8000 mỗi km). Mỗi lớp override Fee.',vars:[['kết quả chuẩn',X]],objs:[O('Bike',[['Fee(km)','km * 3000']]),O('Car',[['Fee(km)','km * 8000']],{hi:1})]});
  c.snap({ln:ix('Vehicle v = new Car();'),title:'Thay if / else bằng v.Fee',body:'Biến v kiểu Vehicle trỏ tới Car#1. Gọi v.Fee sẽ chạy Fee của Car, không cần if / else.',vars:[['v','→ Car#1',1]],objs:[O('Car#1',[],{hi:1})]});
  var r = rates.Car * km; c.out(String(r));
  c.snap({ln:ix('Console.WriteLine(v.Fee(10));'),title:'Xong: vẫn ra ' + r,body:'Chạy lại với cùng đầu vào, v.Fee(10) = ' + r + ', giống code Trước' + (r === X ? '' : ' (khác!)') + '.',note:'Refactor chỉ đổi cấu trúc code. Hành vi (kết quả) giữ nguyên.',vars:[['v','→ Car#1'],['kết quả',r,1]],objs:[O('Car#1',[])]});
 },X);
})();
