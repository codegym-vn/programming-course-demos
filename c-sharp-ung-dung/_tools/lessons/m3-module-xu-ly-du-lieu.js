// META {"module":3,"lesson":"Thực hành Tổng hợp và Best Practices","activity":"Xây dựng một module xử lý dữ liệu với xác thực và try-catch-finally","title":"Module xử lý đơn hàng","lead":"Một đơn hàng đi qua 4 trạm: Đọc, Xác thực, Xử lý, Ghi log. Chọn tình huống rồi bấm <b>Bước tiếp</b>.","tabs":[["ok","Dữ liệu hợp lệ"],["sai","Dữ liệu sai"],["loi","Lỗi hệ thống"]],"codeTitle":"Mã nguồn C#"}
var mLines = ['void Run()','{','  string log = "OK";','  var o = ReadOrder();','  try','  {','    if (o.Qty <= 0)','      log = "Bỏ qua: số lượng sai";','    else','    {','      var t = o.Qty * o.Price;','      Save(t);','    }','  }','  catch (IOException ex)','  {','    log = "Lỗi: " + ex.Message;','  }','  finally','  {','    Console.WriteLine("LOG: " + log);','  }','}'];
var mIO = 'The process cannot access the file \'out.txt\' because it is being used by another process.';
/* st: mảng 4 trạng thái cho Đọc, Xác thực, Xử lý, Ghi log; item: trạm đang chứa đơn */
var mViz = function(st, itemAt, name, subs, bins){
  var T = ['Đọc','Xác thực','Xử lý','Ghi log (finally)'];
  var h = [vFlow(T.map(function(t, i){ return {t:t,s:st[i],sub:subs[i] || '',item:itemAt === i ? name : undefined}; }))];
  h.push(vBins({title:'Đã xử lý',kind:'ok',items:bins[0].map(function(t){ return {t:t,s:'ok'}; })},{title:'Không xử lý',kind:'bad',items:bins[1].map(function(t){ return {t:t,s:'bad'}; })}));
  return h;
};
var mTab = function(qty, fail, label){
  var o = {n:'Bút',qty:qty,price:5000}, name = o.n + ' x' + o.qty;
  return {inputs:[],chips:[],
  intro:'Đơn hàng: ' + label + '. Hãy xem đơn đi qua các trạm và trạm cuối luôn chạy. Bấm "Bước tiếp".',
  lines:function(){ return mLines; },
  run:function(c){
   var valid = o.qty > 0, total = o.qty * o.price;
   var oVar = function(){ return [['o.Qty',o.qty],['o.Price',o.price]]; };
   c.snap({ln:3,title:'Trạm Đọc',body:'Đọc được đơn: ' + o.n + ', số lượng ' + o.qty + ', giá ' + o.price + '.',vars:oVar(),viz:mViz(['hi','dim','dim','dim'],0,name,['đọc xong'],[[],[]])});
   if (valid) {
    c.snap({ln:6,title:'Trạm Xác thực',body:'o.Qty <= 0 là sai (' + o.qty + ' > 0), đơn hợp lệ và đi tiếp.',vars:oVar(),viz:mViz(['ok','ok','dim','dim'],1,name,['','hợp lệ'],[[],[]])});
    if (!fail) {
     c.snap({ln:10,title:'Trạm Xử lý',body:'t = ' + o.qty + ' * ' + o.price + ' = ' + total + '. Save(t) ghi thành công.',vars:oVar().concat([['t',total,1]]),viz:mViz(['ok','ok','ok','dim'],2,name,['','','tổng ' + total],[[name + ' = ' + total],[]])});
     c.out('LOG: OK');
     c.snap({ln:20,title:'Trạm Ghi log (finally)',body:'finally chạy và ghi "LOG: OK".',vars:[['log',S('OK')]],viz:mViz(['ok','ok','ok','ok'],3,name,['','','','LOG: OK'],[[name + ' = ' + total],[]])});
     c.snap({ln:20,title:'Xong',body:'Đơn hợp lệ đi hết 4 trạm, trạm finally sáng đèn.',note:'Xác thực lo lỗi dự đoán được, try-catch lo lỗi bất ngờ, finally luôn chạy.',viz:mViz(['ok','ok','ok','ok'],-1,name,['','','tổng ' + total,'LOG: OK'],[[name + ' = ' + total],[]])});
    } else {
     c.snap({ln:11,title:'Trạm Xử lý gặp lỗi',body:'t = ' + o.qty + ' * ' + o.price + ' = ' + total + ', nhưng Save(t) không ghi được tệp nên ném IOException.',vars:oVar().concat([['t',total]]),viz:mViz(['ok','ok','bad','dim'],2,name,['','','IOException'],[[],[]])});
     c.snap({ln:16,title:'catch bắt lỗi',body:'catch (IOException ex) bắt lỗi bất ngờ này và gán log = "Lỗi: ..." thay vì để chương trình sập.',vars:[['log',S('Lỗi: ' + mIO.slice(0, 30) + '...')]],viz:mViz(['ok','ok','bad','dim'],2,name,['','','đã bắt lỗi'],[[],[name + ': không ghi được tệp']])});
     c.out('LOG: Lỗi: ' + mIO);
     c.snap({ln:20,title:'Trạm Ghi log (finally)',body:'Dù có lỗi, finally vẫn chạy và ghi log lỗi.',vars:[['log',S('Lỗi: ...')]],viz:mViz(['ok','ok','bad','ok'],3,name,['','','IOException','LOG đã ghi'],[[],[name + ': không ghi được tệp']])});
     c.snap({ln:20,title:'Xong',body:'Trạm Xử lý lỗi nhưng trạm finally vẫn sáng đèn.',note:'Xác thực lo lỗi dự đoán được, try-catch lo lỗi bất ngờ, finally luôn chạy.',viz:mViz(['ok','ok','bad','ok'],-1,name,['','','IOException','LOG đã ghi'],[[],[name + ': không ghi được tệp']])});
    }
   } else {
    c.snap({ln:6,title:'Trạm Xác thực chặn đơn',body:'o.Qty <= 0 là đúng (' + o.qty + ' <= 0). Đây là lỗi dự đoán được nên chỉ cần chặn, không ném exception.',vars:oVar(),viz:mViz(['ok','bad','dim','dim'],1,name,['','số lượng ' + o.qty],[[],[name]])});
    c.snap({ln:7,title:'Gán log',body:'log = "Bỏ qua: số lượng sai". Trạm Xử lý bị bỏ qua.',vars:[['log',S('Bỏ qua: số lượng sai'),1]],viz:mViz(['ok','bad','dim','dim'],1,name,['','số lượng ' + o.qty,'bỏ qua'],[[],[name + ': số lượng sai']])});
    c.out('LOG: Bỏ qua: số lượng sai');
    c.snap({ln:20,title:'Trạm Ghi log (finally)',body:'finally vẫn chạy và ghi "LOG: Bỏ qua: số lượng sai".',vars:[['log',S('Bỏ qua: số lượng sai')]],viz:mViz(['ok','bad','dim','ok'],3,name,['','số lượng ' + o.qty,'bỏ qua','LOG đã ghi'],[[],[name + ': số lượng sai']])});
    c.snap({ln:20,title:'Xong',body:'Đơn sai bị chặn nhẹ nhàng, finally vẫn sáng đèn.',note:'Xác thực lo lỗi dự đoán được, try-catch lo lỗi bất ngờ, finally luôn chạy.',viz:mViz(['ok','bad','dim','ok'],-1,name,['','số lượng ' + o.qty,'bỏ qua','LOG đã ghi'],[[],[name + ': số lượng sai']])});
   }
  }};
};
var EX = {
 ok:mTab(2,false,'Bút, 2 cái, giá 5000'),
 sai:mTab(-1,false,'Bút, số lượng -1, giá 5000'),
 loi:mTab(2,true,'Bút, 2 cái, giá 5000, nhưng tệp out.txt đang bị chương trình khác giữ')
};
