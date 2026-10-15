// META {"module":2,"lesson":"Giới thiệu về Exception và Tầm quan trọng","activity":"Tại sao cần xử lý lỗi?","title":"Tại sao cần xử lý lỗi?","lead":"Cùng xử lý 3 đơn hàng với số lượng \"2\", \"hai\", \"5\". Bên trái không xử lý lỗi, bên phải có xử lý. Bấm <b>Bước tiếp</b> để hai cột cùng chạy.","tabs":[["x","3 đơn hàng"]],"codeTitle":"Mã nguồn C#"}
var twQty = ['2','hai','5'];
function twParse(s){ return /^[+-]?\d+$/.test(s) ? {v:Number(s)} : {msg:"The input string '" + s + "' was not in a correct format."}; }
var twErr = twParse(twQty[1]).msg;
function twLamps(st, subs){ return vLamps(twQty.map(function(q, i){ return {t:'Đơn ' + (i + 1) + ' ("' + q + '")', s:st[i] || 'off', sub:subs[i] || 'chưa xử lý'}; }), {title:'Đơn đã lưu'}); }
function twCon(lines){ return vText(lines.length ? lines : [''], {title:'Cửa sổ console',noNo:true}); }
var twLeftTrace = ['Unhandled exception. System.FormatException:', twErr];
var EX = {x:{
 intro:'Nhập 3 đơn hàng, đơn 2 nhập sai số lượng. Hãy xem mỗi bên xử lý ra sao. Bấm "Bước tiếp".',
 running:'Quan sát đơn 2: bên trái sập, bên phải bắt lỗi và đi tiếp.',
 done:'', note:'Xử lý lỗi giúp chương trình không sập, giữ được phần dữ liệu tốt và báo lỗi dễ hiểu.',
 cols:[
 {title:'Không xử lý',sub:'Lỗi làm chương trình sập.',
  lines:['string[] qty =','  { "2", "hai", "5" };','int saved = 0;','for (int i = 0; i < 3; i++)','{','  int n = int.Parse(qty[i]);','  saved++;','  Console.WriteLine(','    "Đã lưu đơn " + (i + 1));','}'],
  run:function(c){
   var con = [], st = [], sub = [], saved = 0;
   c.snap({ln:0,title:'Chuẩn bị',body:'Ba đơn hàng với số lượng "2", "hai", "5". Chưa đơn nào được lưu.',viz:[twLamps(st,sub), twCon(con)],vars:[['saved',0]]});
   var r = twParse(twQty[0]); saved++; st[0] = 'ok'; sub[0] = 'đã lưu'; con.push('Đã lưu đơn 1'); c.out('Đã lưu đơn 1');
   c.snap({ln:8,title:'Đơn 1 bình thường',body:'"2" đổi được thành số ' + r.v + ' nên đơn 1 được lưu.',viz:[twLamps(st,sub), twCon(con)],vars:[['saved',saved,1]]});
   st[1] = 'bad'; sub[1] = 'lỗi'; con = con.concat(['Unhandled exception.','System.FormatException:',"The input string 'hai'",'was not in a correct format.'].map(function(t){ return {t:t,s:'bad'}; }));
   twLeftTrace.forEach(function(t, i){ c.err(t); });
   c.snap({ln:5,title:'Đơn 2 làm chương trình sập',body:'int.Parse("hai") ném FormatException, không có try-catch nên chương trình dừng ngay.',viz:[twLamps(st,sub), vCard({kind:'err',title:'FormatException',sub:twErr}), twCon(con)],vars:[['saved',saved]]});
   c.snap({ln:5,title:'Đơn 3 không bao giờ được xử lý',body:'Chương trình đã dừng nên đơn 3 (số lượng "5") bị bỏ qua dù hoàn toàn hợp lệ.',viz:[twLamps(st,sub), twCon(con)],vars:[['saved',saved]]});
   c.snap({ln:5,title:'Kết quả',body:'Chỉ lưu được ' + saved + '/3 đơn và người dùng chỉ thấy một vết lỗi khó hiểu.',viz:[vScore([{k:'đơn đã lưu',v:saved + '/3',s:'bad'}]), twLamps(st,sub), twCon(con)],vars:[['saved',saved]]});
  }},
 {title:'Có xử lý',sub:'Bắt lỗi rồi đi tiếp.',
  lines:['string[] qty =','  { "2", "hai", "5" };','int saved = 0;','for (int i = 0; i < 3; i++)','{','  try','  {','    int n = int.Parse(qty[i]);','    saved++;','    Console.WriteLine(','      "Đã lưu đơn " + (i + 1));','  }','  catch (FormatException)','  {','    Console.WriteLine(','      "Số lượng không hợp lệ, "','      + "bỏ qua đơn " + (i + 1));','  }','}'],
  run:function(c){
   var con = [], st = [], sub = [], saved = 0;
   c.snap({ln:0,title:'Chuẩn bị',body:'Ba đơn hàng với số lượng "2", "hai", "5". Chưa đơn nào được lưu.',viz:[twLamps(st,sub), twCon(con)],vars:[['saved',0]]});
   var r = twParse(twQty[0]); saved++; st[0] = 'ok'; sub[0] = 'đã lưu'; con.push('Đã lưu đơn 1'); c.out('Đã lưu đơn 1');
   c.snap({ln:10,title:'Đơn 1 bình thường',body:'"2" đổi được thành số ' + r.v + ' nên đơn 1 được lưu.',viz:[twLamps(st,sub), twCon(con)],vars:[['saved',saved,1]]});
   var m = 'Số lượng không hợp lệ, bỏ qua đơn 2'; st[1] = 'bad'; sub[1] = 'bỏ qua'; con.push(m); c.out(m);
   c.snap({ln:15,title:'Đơn 2 bị bắt lỗi',body:'int.Parse("hai") ném FormatException, catch bắt được và báo "' + m + '". Chương trình không sập.',viz:[twLamps(st,sub), twCon(con)],vars:[['saved',saved]]});
   r = twParse(twQty[2]); saved++; st[2] = 'ok'; sub[2] = 'đã lưu'; con.push('Đã lưu đơn 3'); c.out('Đã lưu đơn 3');
   c.snap({ln:10,title:'Đơn 3 vẫn được xử lý',body:'Vòng lặp đi tiếp, "5" đổi được thành số ' + r.v + ' nên đơn 3 được lưu.',viz:[twLamps(st,sub), twCon(con)],vars:[['saved',saved,1]]});
   c.snap({ln:18,title:'Kết quả',body:'Lưu được ' + saved + '/3 đơn và biết chính xác đơn nào lỗi.',viz:[vScore([{k:'đơn đã lưu',v:saved + '/3',s:'ok'}]), twLamps(st,sub), twCon(con)],vars:[['saved',saved]]});
  }}]}};
// done được tính từ dữ liệu thật
(function(){
  var left = twQty.findIndex(function(q){ return twParse(q).v === undefined; }), right = twQty.filter(function(q){ return twParse(q).v !== undefined; }).length;
  EX.x.done = 'Bên trái lưu ' + left + '/3 đơn và hiện thông báo khó hiểu; bên phải lưu ' + right + '/3 đơn và báo rõ đơn lỗi.';
})();
