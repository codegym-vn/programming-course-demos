// META {"module":3,"lesson":"Thực hành Tổng hợp và Best Practices","activity":"Các nguyên tắc vàng trong xử lý ngoại lệ","title":"Nguyên tắc vàng khi xử lý ngoại lệ","lead":"Mỗi tab so sánh cách nên tránh (trái) với cách nên làm (phải). Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["nuot","Nuốt lỗi"],["throw","throw ex và throw"],["luong","Dùng exception cho luồng thường"]],"codeTitle":"Mã nguồn C#"}
var gStk = function(fr, ball){
  var o = fr.map(function(f, i){ return {t:f[0],sub:f[1],s:f[2]}; });
  if (ball !== undefined) o[ball].ball = true;
  return vStack(o,{ballText:'FormatException'});
};
var gInfo = function(kind, sub, rows){ return vCard({kind:kind,title:'Thông tin lỗi còn lại',sub:sub,rows:rows}); };
var gMsg = "The input string 'abc' was not in a correct format.";
var gSimulate = function(){
  var items = [], ex = 0, bad = 0;
  for (var i = 0; i < 1000; i++) { var okv = (i % 10) < 7; items.push(okv); if (!okv) bad++; }
  return {items:items,bad:bad};
};
var EX = {
nuot:{
 intro:'Cùng một hàm tính tiền với số lượng "abc". Hãy xem lỗi còn lại gì ở mỗi bên.',
 running:'Bên trái bỏ qua lỗi. Bên phải ghi log rồi báo lỗi lên trên.',
 done:'Bên trái tổng tiền ra 0 mà không ai biết. Bên phải còn log và thông báo rõ ràng.',
 note:'Không nuốt lỗi: hoặc xử lý thật sự, hoặc ghi log và ném lại.',
 cols:[
 {title:'Nên tránh: catch rỗng',sub:'Lỗi biến mất, không để lại dấu vết.',
  lines:['decimal Total(string q)','{','  try','  {','    return decimal.Parse(q) * 5000;','  }','  catch { }','  return 0;','}','Console.WriteLine(Total("abc"));'],
  run:function(c){
   var M = [['Main','',undefined]];
   c.snap({ln:9,title:'Gọi Total("abc")',body:'Số lượng là chữ "abc", chương trình đi vào hàm Total.',viz:[gStk([['Main','',undefined],['Total','q = "abc"','hi']]),gInfo('info','Chưa có lỗi nào.')]});
   c.snap({ln:4,title:'Parse ném exception',body:'decimal.Parse("abc") không đọc được nên ném FormatException.',viz:[gStk([['Main'],['Total'],['decimal.Parse','','bad']],2),gInfo('err',gMsg)]});
   c.snap({ln:6,title:'catch rỗng bắt lỗi',body:'catch { } bắt được lỗi nhưng không làm gì cả. Thông báo lỗi bị vứt đi.',viz:[gStk([['Main'],['Total','','hi']],1),gInfo('warn','Đang bị nuốt: không log, không thông báo.')]});
   c.snap({ln:7,title:'return 0',body:'Hàm vẫn chạy tiếp và trả về 0 như thể không có chuyện gì.',viz:[gStk([['Main'],['Total','','hi']]),gInfo('warn','Không còn gì để tìm nguyên nhân.')]});
   c.out('0');
   c.snap({ln:9,title:'In kết quả',body:'Tổng tiền là 0. Không ai biết đây là số thật hay do lỗi.',viz:[gStk([['Main','','hi']]),gInfo('warn','Không còn gì. Dữ liệu sai nhưng chương trình vẫn im lặng.')]});
   c.snap({ln:9,title:'Xong',body:'Lỗi đã biến mất hoàn toàn, rất khó tìm ra về sau.',note:'Không nuốt lỗi bằng catch rỗng.',viz:[gStk([['Main']]),gInfo('warn','Không còn gì. Dữ liệu sai nhưng chương trình vẫn im lặng.')]});
  }},
 {title:'Nên làm: ghi log rồi báo lỗi',sub:'Lỗi được ghi lại và báo lên trên.',
  lines:['decimal Total(string q)','{','  try','  {','    return decimal.Parse(q) * 5000;','  }','  catch (FormatException ex)','  {','    Log(ex.Message);','    throw;','  }','}','try','{','  Console.WriteLine(Total("abc"));','}','catch (FormatException)','{','  Console.WriteLine("Số lượng sai");','}'],
  run:function(c){
   c.snap({ln:14,title:'Gọi Total("abc")',body:'Main gọi Total trong khối try, sẵn sàng bắt lỗi nếu có.',viz:[gStk([['Main','try','hi'],['Total','q = "abc"']]),gInfo('info','Chưa có lỗi nào.')]});
   c.snap({ln:4,title:'Parse ném exception',body:'decimal.Parse("abc") ném FormatException, giống bên trái.',viz:[gStk([['Main'],['Total'],['decimal.Parse','','bad']],2),gInfo('err',gMsg)]});
   c.out('[LOG] ' + gMsg);
   c.snap({ln:8,title:'Ghi log',body:'catch bắt đúng loại FormatException và ghi thông báo vào log.',viz:[gStk([['Main'],['Total','','hi']],1),gInfo('ok','Đã có log: ' + gMsg)]});
   c.snap({ln:9,title:'throw; ném lại',body:'throw; đẩy lỗi lên cho Main xử lý tiếp, không làm mất lỗi.',viz:[gStk([['Main','','hi'],['Total']],0),gInfo('ok','Lỗi vẫn còn, đang đi lên Main.')]});
   c.out('Số lượng sai');
   c.snap({ln:18,title:'Main báo lỗi cho người dùng',body:'Người dùng nhận thông báo rõ ràng, còn lập trình viên có log để tra.',viz:[gStk([['Main','','ok']]),gInfo('ok','Có log cho lập trình viên và thông báo cho người dùng.')]});
   c.snap({ln:18,title:'Xong',body:'Lỗi được ghi lại và xử lý đúng chỗ.',note:'Ghi log rồi báo lỗi, đừng để lỗi biến mất.',viz:[gStk([['Main']]),gInfo('ok','Có log cho lập trình viên và thông báo cho người dùng.')]});
  }}
 ]},
throw:{
 intro:'Lỗi gốc xảy ra ở ParseQuantity. Hãy xem stack trace ở cuối mỗi bên còn những dòng nào.',
 running:'Cả hai bên đều bắt lỗi ở Load rồi ném lại. Khác nhau chỉ ở một từ: throw ex; hay throw;.',
 done:'Bên trái stack trace mất dòng ParseQuantity. Bên phải còn đủ 3 dòng, chỉ đúng nơi lỗi xảy ra.',
 note:'Ném lại bằng throw; để giữ nguyên stack trace.',
 cols:(function(){
  var TR = ['at Program.ParseQuantity(String q)','at Program.Load(String q)','at Program.<Main>$(String[] args)'];
  var base = function(thr){ return ['int ParseQuantity(string q)','  => int.Parse(q);','','int Load(string q)','{','  try { return ParseQuantity(q); }','  catch (FormatException ex)','  {','    ' + thr,'  }','}','','try','{','  Load("abc");','}','catch (Exception ex)','{','  Console.WriteLine(ex.StackTrace);','}']; };
  var mk2 = function(thr, title, sub, keep){
   return {title:title,sub:sub,lines:base(thr),run:function(c){
    var fr = function(n){ return [['Main'],['Load'],['ParseQuantity']].slice(0, n); };
    var tr0 = function(){ return vText(['(chưa có lỗi)'],{title:'Stack trace (rút gọn)',noNo:true}); };
    var trAll = function(s){ return vText(TR.map(function(t, i){ return {t:t,s:i === 0 ? 'hi' : undefined}; }),{title:'Stack trace (rút gọn)',noNo:true}); };
    var trEnd = keep ? vText(TR.map(function(t){ return {t:t,s:'ok'}; }),{title:'Stack trace (rút gọn)',noNo:true})
     : vText([{t:'(dòng ParseQuantity đã mất)',s:'del'},{t:TR[1],s:'bad'},{t:TR[2]}],{title:'Stack trace (rút gọn)',noNo:true});
    c.snap({ln:14,title:'Gọi Load("abc")',body:'Main gọi Load, Load gọi ParseQuantity.',viz:[gStk(fr(2)),tr0()]});
    c.snap({ln:1,title:'Lỗi gốc ở ParseQuantity',body:'int.Parse("abc") ném FormatException ngay trong ParseQuantity. Đây là dòng gốc của lỗi.',viz:[gStk(fr(3),2),trAll()]});
    c.snap({ln:6,title:'catch ở Load bắt lỗi',body:'Load bắt FormatException để làm thêm việc rồi ném lại.',viz:[gStk(fr(2),1),trAll()]});
    c.snap({ln:8,title:keep ? 'throw; giữ nguyên lỗi' : 'throw ex; đặt lại stack trace',body:keep ? 'throw; ném lại đúng đối tượng lỗi cũ, stack trace vẫn giữ dòng ParseQuantity.' : 'throw ex; coi như ném mới tại dòng này, nên stack trace bắt đầu từ Load.',viz:[gStk(fr(1),0),trEnd]});
    (keep ? TR : TR.slice(1)).forEach(function(t){ c.out(t); });
    c.snap({ln:18,title:'Main in stack trace',body:keep ? 'Có đủ 3 dòng, dòng đầu chỉ ngay ParseQuantity.' : 'Chỉ còn 2 dòng, lập trình viên không biết lỗi bắt đầu từ ParseQuantity.',viz:[gStk(fr(1)),trEnd]});
    c.snap({ln:18,title:'Xong',body:keep ? 'Tìm nguyên nhân dễ vì dấu vết còn nguyên.' : 'Dấu vết gốc đã bị cắt mất.',note:'Dùng throw; thay cho throw ex; để giữ stack trace.',viz:[gStk(fr(1)),trEnd]});
   }};
  };
  return [mk2('throw ex;','Nên tránh: throw ex;','Stack trace bị đặt lại.',false), mk2('throw;','Nên làm: throw;','Stack trace được giữ nguyên.',true)];
 })()
},
luong:{
 intro:'Đọc 1.000 dòng, trong đó 300 dòng bị sai. Hãy xem mỗi bên ném bao nhiêu exception.',
 running:'Bên trái dùng exception để phát hiện dòng sai. Bên phải dùng TryParse.',
 done:'Cả hai đều đếm được 300 dòng sai, nhưng bên trái ném 300 exception còn bên phải ném 0.',
 note:'Dữ liệu có thể sai thường xuyên thì dùng TryParse, đừng dựa vào exception.',
 cols:(function(){
  var sim = gSimulate();
  var samp = function(upTo, kind){ return vCells(sim.items.slice(0, 10).map(function(okv, i){ return {v:okv ? '12' : 'abc',s:i <= upTo ? (okv ? 'ok' : kind) : undefined}; }),{name:'10 dòng đầu (tổng 1000 dòng)',idx:true}); };
  var count = function(n){ var b = 0; for (var i = 0; i < n; i++) if (!sim.items[i]) b++; return b; };
  var mkc = function(left){
   return {title:left ? 'Nên tránh: Parse + try-catch' : 'Nên làm: TryParse',sub:left ? 'Mỗi dòng sai là một exception.' : 'Mỗi dòng sai chỉ là một giá trị false.',
    lines:left ? ['int bad = 0;','foreach (var line in lines)','{','  try','  {','    int.Parse(line);','  }','  catch (FormatException)','  {','    bad++;','  }','}','Console.WriteLine(bad);']
     : ['int bad = 0;','foreach (var line in lines)','{','  if (!int.TryParse(line, out _))','    bad++;','}','Console.WriteLine(bad);'],
    run:function(c){
     var kind = left ? 'bad' : 'no';
     var sc = function(done, ex){ return vScore([{k:'Dòng đã xử lý',v:done},{k:'Số exception đã ném',v:ex,s:ex > 0 ? 'bad' : 'ok'}]); };
     var exs = function(n){ return left ? count(n) : 0; };
     c.snap({ln:1,title:'Chuẩn bị 1.000 dòng',body:'Danh sách lines có ' + sim.items.length + ' dòng, trong đó ' + sim.bad + ' dòng không phải số.',vars:[['bad',0]],viz:[samp(-1,kind),sc(0,0)]});
     c.snap({ln:left ? 5 : 3,title:'Dòng hợp lệ',body:left ? 'int.Parse("12") thành công, không có exception.' : 'TryParse("12") trả về true, không có gì xảy ra thêm.',vars:[['bad',0]],viz:[samp(0,kind),sc(1,0)]});
     var f = sim.items.indexOf(false);
     c.snap({ln:left ? 7 : 4,title:'Gặp dòng sai đầu tiên',body:left ? 'int.Parse("abc") ném FormatException, rồi catch bắt và tăng bad. Cứ mỗi dòng sai lại có một exception.' : 'TryParse("abc") trả về false và bad tăng lên. Không có exception nào.',vars:[['bad',1,1]],viz:[samp(f,kind),sc(f + 1,exs(f + 1)),left ? vCard({kind:'err',title:'FormatException',sub:gMsg}) : vCard({kind:'ok',title:'TryParse trả về false',sub:'Không ném exception'})]});
     c.snap({ln:1,title:'Chạy hết 1.000 dòng',body:'bad = ' + sim.bad + '. Số exception đã ném: ' + exs(1000) + '.',vars:[['bad',sim.bad,1]],viz:[samp(9,kind),sc(1000,exs(1000))]});
     c.out(String(sim.bad));
     c.snap({ln:left ? 12 : 6,title:'In kết quả',body:'Cả hai cách đều ra bad = ' + sim.bad + '.',vars:[['bad',sim.bad]],viz:[samp(9,kind),sc(1000,exs(1000))]});
     c.snap({ln:left ? 12 : 6,title:'Xong',body:left ? 'Ném ' + exs(1000) + ' exception chỉ để đếm dòng sai là lãng phí.' : 'Không exception nào được ném.',note:'Lỗi dự đoán được thì kiểm tra bằng TryParse, để exception cho tình huống bất ngờ.',vars:[['bad',sim.bad]],viz:[samp(9,kind),sc(1000,exs(1000))]});
    }};
  };
  return [mkc(true), mkc(false)];
 })()
}};
