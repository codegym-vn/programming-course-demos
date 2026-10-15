// META {"module":8,"lesson":"Giới thiệu về Mã nguồn sạch và Thiết kế tốt","activity":"Mã nguồn sạch là gì?","title":"Mã nguồn sạch là gì?","lead":"Cùng một phép tính giá sau giảm. Bên trái đặt tên khó hiểu, bên phải đặt tên rõ nghĩa. Bấm <b>Bước tiếp</b> để hai cột cùng chạy.","tabs":[["x","Tính giá sau giảm"]]}
var EX = {x:(function(){
 var price = 50000, qty = 3, rate = 0.1;
 var total = price * qty, cut = total * rate, res = total - cut;
 var R = String(res);
 var L = ['double Calc(double a, double b)','{','  double x = a * b;','  double y = x * 0.1;','  return x - y;','}','','Console.WriteLine(Calc(50000, 3));'];
 var RL = ['const double DiscountRate = 0.1;','','double TotalAfterDiscount(','  double price, int quantity)','{','  double total = price * quantity;','  double discount =','    total * DiscountRate;','  return total - discount;','}','','Console.WriteLine(','  TotalAfterDiscount(50000, 3));'];
 return {
 intro:'Hai đoạn code làm cùng một việc: tính giá của 3 món, mỗi món 50000, giảm 10%. Hãy so sánh cách đặt tên.',
 running:'Máy chỉ làm theo từng dòng. Hãy để ý bạn hiểu được bao nhiêu khi chỉ đọc tên.',
 done:'Cả hai cùng in ' + R + '. Máy chạy như nhau, nhưng người đọc thì khác: bên phải ai cũng hiểu 0.1 là tỉ lệ giảm giá.',
 note:'Mã nguồn sạch: tên rõ nghĩa, không có con số bí ẩn. Máy chạy như nhau, người đọc thì khác.',
 cols:[
 {title:'Khó đọc',sub:'Tên a, b, x, y và số 0.1 không giải thích.',lines:L,run:function(c){
  c.snap({ln:7,title:'Gọi Calc(50000, 3)',body:'Hai tham số a và b là gì? Phải đoán: có thể là giá và số lượng.',vars:[['a',price,1],['b',qty,1]]});
  c.snap({ln:2,title:'Tính x',body:'x = a * b = ' + total + '. Tên x không cho biết đây là tổng tiền.',vars:[['a',price],['b',qty],['x',total,1]]});
  c.snap({ln:3,title:'Tính y',body:'y = x * 0.1 = ' + cut + '. Số 0.1 là gì? Phải đoán là giảm 10%.',vars:[['a',price],['b',qty],['x',total],['y',cut,1]]});
  c.snap({ln:4,title:'Trả về x - y',body:'Kết quả là ' + res + '.',vars:[['a',price],['b',qty],['x',total],['y',cut],['kết quả',res,1]]});
  c.out(R);
  c.snap({ln:7,title:'Xong',body:'In ra ' + R + '. Đúng, nhưng người đọc phải mất công đoán ý nghĩa từng tên.',vars:[['kết quả',res]]});
 }},
 {title:'Dễ đọc',sub:'Tên rõ nghĩa, số 0.1 có tên DiscountRate.',lines:RL,run:function(c){
  c.snap({ln:11,title:'Gọi TotalAfterDiscount(50000, 3)',body:'Tên hàm nói rõ việc nó làm. Tham số là price (giá) và quantity (số lượng).',vars:[['DiscountRate',rate],['price',price,1],['quantity',qty,1]]});
  c.snap({ln:5,title:'Tính total',body:'total = price * quantity = ' + total + '. Đọc tên là hiểu: tổng tiền trước giảm.',vars:[['DiscountRate',rate],['price',price],['quantity',qty],['total',total,1]]});
  c.snap({ln:6,title:'Tính discount',body:'discount = total * DiscountRate = ' + cut + '. Số 0.1 giờ có tên: tỉ lệ giảm giá.',vars:[['DiscountRate',rate],['total',total],['discount',cut,1]]});
  c.snap({ln:8,title:'Trả về total - discount',body:'Kết quả là ' + res + '.',vars:[['total',total],['discount',cut],['kết quả',res,1]]});
  c.out(R);
  c.snap({ln:11,title:'Xong',body:'In ra ' + R + ', giống hệt bên trái. Code đọc như một câu văn.',vars:[['kết quả',res]]});
 }}
 ]};})()};
