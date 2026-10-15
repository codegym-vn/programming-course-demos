// META {"module":8,"lesson":"Nguyên tắc Đơn nhiệm (Single Responsibility Principle - SRP)","activity":"Ví dụ minh họa SRP trong thực tế","title":"Mỗi lớp một lý do để thay đổi","lead":"Chọn một yêu cầu thay đổi rồi bấm <b>Bước tiếp</b> để xem lớp nào phải sửa. Bên trái một lớp làm cả ba việc, bên phải mỗi lớp một việc.","tabs":[["thue","Đổi thuế"],["mau","Đổi mẫu in"],["luu","Đổi nơi lưu"]]}
var LL = ['class Invoice','{','  public decimal Amount;','  public decimal Total()','    => Amount * 1.1m; // thuế','  public void Print()','  {','    Console.WriteLine(','      "HÓA ĐƠN: " + Total());','  }','  public void Save()','    => File.WriteAllText(','      "hd.txt",','      Total().ToString());','}'];
var RL = ['class Invoice','{','  public decimal Amount;','  public decimal Total()','    => Amount * 1.1m; // thuế','}','','class InvoicePrinter','{','  public void Print(Invoice i)','    => Console.WriteLine(','      "HÓA ĐƠN: " + i.Total());','}','','class InvoiceRepository','{','  public void Save(Invoice i)','    => File.WriteAllText(','      "hd.txt",','      i.Total().ToString());','}'];
function leftObj(k, st, f){
 var fl = function(i){ return i === k ? (st === 2 ? 'hi' : st >= 3 ? 'ok' : '') : ''; };
 var v = function(i, a, b){ return i === k && st >= 3 ? b : a; };
 return [O('Invoice',[['Tính tiền',v(0,'Total(): thuế 10%','Total(): thuế 8%'),fl(0)],['In hóa đơn',v(1,'Print(): mẫu cũ','Print(): mẫu mới'),fl(1)],['Lưu trữ',v(2,'Save(): ra file','Save(): vào CSDL'),fl(2)]],{hi:st >= 2,tag:st >= 2 ? 'bị sửa' : ''})];
}
function rightObj(k, st, f){
 var names = ['Invoice','InvoicePrinter','InvoiceRepository'];
 var base = [['Tính tiền','Total(): thuế 10%'],['In hóa đơn','Print(): mẫu cũ'],['Lưu trữ','Save(): ra file']];
 var aft = ['Total(): thuế 8%','Print(): mẫu mới','Save(): vào CSDL'];
 return names.map(function(n, i){
  var fl = i === k ? (st === 2 ? 'hi' : st >= 3 ? 'ok' : '') : '';
  var val = i === k && st >= 3 ? aft[i] : base[i][1];
  return O(n,[[base[i][0],val,fl]],{hi:i === k && st >= 2,dim:i !== k && st >= 2,tag:i === k && st >= 2 ? 'bị sửa' : (st >= 2 ? 'không đổi' : '')});
 });
}
function scen(k, req, what, lnL, lnR){
 return {
 intro:'Yêu cầu mới: ' + req + '. Hãy xem mỗi bên phải sửa lớp nào.',
 running:'Quan sát lớp nào bị tô sáng trong bộ nhớ.',
 done:'Bên trái luôn phải mở Invoice, dù việc cần đổi chỉ là ' + what + '. Bên phải chỉ sửa đúng 1 lớp chuyên trách.',
 note:'SRP: mỗi lớp chỉ có một lý do để thay đổi. Đổi một việc thì chỉ sửa một lớp.',
 cols:[
 {title:'Một lớp làm cả ba việc',sub:'Invoice tự tính tiền, in hóa đơn và lưu file.',lines:LL,run:function(c){
  c.snap({ln:0,title:'Yêu cầu thay đổi',body:'Yêu cầu: ' + req + '. Cả ba việc đang nằm chung trong Invoice.',objs:leftObj(k,1)});
  c.snap({ln:lnL,title:'Tìm chỗ cần sửa',body:'Phải mở lớp Invoice, tìm đúng chỗ ' + what + ' giữa ba việc lẫn vào nhau.',objs:leftObj(k,2)});
  c.snap({ln:lnL,title:'Sửa code',body:'Sửa xong ngay trong Invoice. Sửa chung một lớp nên có nguy cơ làm hỏng hai việc còn lại.',objs:leftObj(k,3)});
  c.snap({ln:lnL,title:'Xong',body:'Lớp bị sửa: Invoice. Ba việc không liên quan vẫn phải kiểm tra lại vì nằm cùng một lớp.',objs:leftObj(k,4)});
 }},
 {title:'Mỗi lớp một việc',sub:'Invoice, InvoicePrinter, InvoiceRepository.',lines:RL,run:function(c){
  c.snap({ln:0,title:'Yêu cầu thay đổi',body:'Yêu cầu: ' + req + '. Mỗi việc đã có lớp riêng.',objs:rightObj(k,1)});
  c.snap({ln:lnR,title:'Tìm chỗ cần sửa',body:'Chỉ cần mở đúng một lớp: ' + ['Invoice','InvoicePrinter','InvoiceRepository'][k] + '.',objs:rightObj(k,2)});
  c.snap({ln:lnR,title:'Sửa code',body:'Sửa xong trong lớp đó. Hai lớp còn lại không bị động tới.',objs:rightObj(k,3)});
  c.snap({ln:lnR,title:'Xong',body:'Chỉ 1 lớp bị sửa: ' + ['Invoice','InvoicePrinter','InvoiceRepository'][k] + '. Các lớp khác giữ nguyên.',objs:rightObj(k,4)});
 }}
 ]};
}
var EX = {
 thue:scen(0,'đổi thuế từ 10% sang 8%','tính tiền',4,4),
 mau:scen(1,'đổi mẫu in hóa đơn','in hóa đơn',8,11),
 luu:scen(2,'lưu hóa đơn vào cơ sở dữ liệu thay vì file','lưu trữ',12,18)
};
