// META {"module":3,"lesson":"Kiểm tra và Xác thực Dữ liệu Đầu vào","activity":"Tầm quan trọng của xác thực dữ liệu đầu vào","title":"Tại sao phải xác thực đầu vào?","lead":"Ba lượt đăng ký chạy qua hai hệ thống: bên trái không kiểm tra, bên phải có cổng kiểm soát. Bấm <b>Bước tiếp</b> để hai cột cùng chạy.","tabs":[["x","3 lượt đăng ký"]],"codeTitle":"Mã nguồn C#"}
var XIN = [{n:'An',age:20,email:'an@x.com'},{n:'Bình',age:-5,email:''},{n:'Chi',age:30,email:'chi@x.com'}];
var xOk = function(u){ return u.age >= 1 && u.age <= 120 && u.email !== ''; };
var xTxt = function(u){ return u.n + ' · ' + u.age + ' · ' + (u.email === '' ? '(rỗng)' : u.email); };
var xReason = function(u){ var r = []; if (!(u.age >= 1 && u.age <= 120)) r.push('Tuổi phải từ 1 đến 120'); if (u.email === '') r.push('email không được rỗng'); return r.join('; '); };
/* dựng hình cho một cột: store = bản ghi đã lưu, blocked = bản ghi bị chặn, cur = bản ghi đang vào, gate = trạng thái cổng */
var xViz = function(guard, store, blocked, cur, gate, avg){
  var nodes = [
   {t:'Ô nhập',sub:cur ? '' : 'chưa có',s:cur ? 'hi' : 'dim',item:cur ? cur.n : undefined},
   {t:guard ? 'Cổng' : 'Không cổng',sub:guard ? '' : 'đi thẳng',s:guard ? gate : 'dim'},
   {t:'Kho',sub:store.length + ' bản ghi'}];
  var h = [vFlow(nodes)];
  h.push(vBins(
   {title:'Kho dữ liệu',kind:'ok',items:store.map(function(u){ return {t:xTxt(u),s:xOk(u) ? undefined : 'bad'}; })},
   {title:'Bị chặn',kind:'bad',items:blocked.map(function(u){ return {t:u.n + ': ' + xReason(u)}; })}));
  if (avg !== undefined) h.push(vScore([{k:'Tuổi trung bình',v:avg,s:guard ? 'ok' : 'bad'}]));
  return h;
};
var EX = {x:{
 intro:'Cả hai cột nhận cùng ba lượt đăng ký. Hãy để ý bản ghi của Bình và tuổi trung bình ở cuối.',
 running:'Bên trái lưu mọi thứ người dùng nhập. Bên phải kiểm tra trước khi lưu.',
 done:'Bên trái tuổi trung bình là 15 (sai lệch vì có tuổi -5). Bên phải là 25 (đúng).',
 note:'Kiểm tra ngay ở đầu vào rẻ hơn nhiều so với sửa dữ liệu hỏng về sau.',
 cols:[
 {title:'Không xác thực',sub:'Cái gì nhập vào cũng được lưu.',
  lines:['void Register(string n, int age,','  string email)','{','  users.Add((n, age, email));','}','','Register("An", 20, "an@x.com");','Register("Bình", -5, "");','Register("Chi", 30, "chi@x.com");','var avg = users.Average(u => u.Age);','Console.WriteLine(avg);'],
  run:function(c){
   var store = [];
   [0,1,2].forEach(function(i){
    var u = XIN[i]; store.push(u);
    var bad = !xOk(u);
    c.snap({ln:3,title:'Đăng ký ' + (i + 1) + ': ' + u.n,body:bad ? 'Tuổi ' + u.age + ' và email rỗng vẫn được lưu. Bản ghi sai đã lọt vào kho.' : 'Dữ liệu hợp lệ, lưu vào kho.',
     vars:[['users.Count',store.length]],viz:xViz(false,store.slice(),[],u,'dim')});
   });
   var sum = store.reduce(function(a, u){ return a + u.age; }, 0), avg = sum / store.length;
   c.snap({ln:9,title:'Tính tuổi trung bình',body:'(20 - 5 + 30) / 3 = ' + sum + ' / ' + store.length + ' = ' + avg + '. Con số bị lệch vì có tuổi -5.',
    vars:[['avg',avg,1]],viz:xViz(false,store.slice(),[],null,'dim',avg)});
   c.out(String(avg));
   c.snap({ln:10,title:'In kết quả',body:'Chương trình báo tuổi trung bình là ' + avg + '.',
    vars:[['avg',avg,1]],viz:xViz(false,store.slice(),[],null,'dim',avg)});
   c.snap({ln:10,title:'Xong',body:'Một bản ghi sai làm kết quả thống kê sai theo.',note:'Không kiểm tra ở đầu vào thì dữ liệu sai nằm lại trong hệ thống.',
    vars:[['avg',avg,1]],viz:xViz(false,store.slice(),[],null,'dim',avg)});
  }},
 {title:'Có xác thực',sub:'Cổng kiểm tra chặn dữ liệu sai.',
  lines:['bool IsValid(int age, string email)','  => age >= 1 && age <= 120','     && email != "";','','void Register(string n, int age,','  string email)','{','  if (!IsValid(age, email))','  {','    Console.WriteLine("Bị chặn");','    return;','  }','  users.Add((n, age, email));','}','','Register("An", 20, "an@x.com");','Register("Bình", -5, "");','Register("Chi", 30, "chi@x.com");','var avg = users.Average(u => u.Age);','Console.WriteLine(avg);'],
  run:function(c){
   var store = [], blocked = [];
   [0,1,2].forEach(function(i){
    var u = XIN[i], ok = xOk(u);
    if (ok) store.push(u); else { blocked.push(u); c.out('Bị chặn'); }
    c.snap({ln:ok ? 12 : 9,title:'Đăng ký ' + (i + 1) + ': ' + u.n,body:ok ? 'IsValid trả về true, bản ghi được lưu.' : 'IsValid trả về false. Lý do: ' + xReason(u) + '.',
     vars:[['users.Count',store.length]],viz:xViz(true,store.slice(),blocked.slice(),u,ok ? 'ok' : 'bad')});
   });
   var sum = store.reduce(function(a, u){ return a + u.age; }, 0), avg = sum / store.length;
   c.snap({ln:18,title:'Tính tuổi trung bình',body:'(20 + 30) / 2 = ' + sum + ' / ' + store.length + ' = ' + avg + '. Kho chỉ có dữ liệu đúng nên kết quả đúng.',
    vars:[['avg',avg,1]],viz:xViz(true,store.slice(),blocked.slice(),null,'ok',avg)});
   c.out(String(avg));
   c.snap({ln:19,title:'In kết quả',body:'Chương trình báo tuổi trung bình là ' + avg + '.',
    vars:[['avg',avg,1]],viz:xViz(true,store.slice(),blocked.slice(),null,'ok',avg)});
   c.snap({ln:19,title:'Xong',body:'Bản ghi sai bị chặn ngay cửa, kho luôn sạch.',note:'Kiểm tra ngay ở đầu vào rẻ hơn nhiều so với sửa dữ liệu hỏng về sau.',
    vars:[['avg',avg,1]],viz:xViz(true,store.slice(),blocked.slice(),null,'ok',avg)});
  }}
 ]}};
