// META {"module":2,"lesson":"Cấu trúc try-catch cơ bản","activity":"Giới thiệu về khối try-catch","title":"Giới thiệu về khối try-catch","lead":"Cùng một đoạn try-catch, chạy với hai giá trị nhập. Chọn tình huống rồi bấm <b>Bước tiếp</b>.","tabs":[["ok","Không lỗi (\"25\")"],["loi","Có lỗi (\"abc\")"]],"codeTitle":"Mã nguồn C#"}
function tcParse(s){ return /^[+-]?\d+$/.test(s) ? {v:Number(s)} : {err:'FormatException', msg:"The input string '" + s + "' was not in a correct format."}; }
function tcLines(v){ return ['string input = "' + v + '";','try','{','  int age = int.Parse(input);','  Console.WriteLine(','    "Bạn " + age + " tuổi");','}','catch (FormatException)','{','  Console.WriteLine(','    "Vui lòng nhập số");','}','Console.WriteLine("Kết thúc");']; }
function tcFlow(t, k, a, sub){ return vFlow([{t:'Khối try',s:t,sub:sub && sub[0]},{t:'Khối catch',s:k,sub:sub && sub[1]},{t:'Sau try-catch',s:a,sub:sub && sub[2]}], {title:'Đường đi của chương trình'}); }
var EX = {
ok:{inputs:[],chips:[],intro:'Nhập "25" là số hợp lệ. Xem chương trình đi qua try rồi bỏ qua catch. Bấm "Bước tiếp".',
 lines:function(){ return tcLines('25'); },
 run:function(c){
  var r = tcParse('25');
  c.snap({ln:1,title:'Vào khối try',body:'Chương trình bắt đầu chạy các dòng trong try, với input = "25".',viz:tcFlow('hi','dim','dim'),vars:[['input',S('25'),1]]});
  c.snap({ln:3,title:'Parse thành công',body:'int.Parse("25") không có lỗi, age = ' + r.v + '.',viz:tcFlow('hi','dim','dim'),vars:[['input',S('25')],['age',r.v,1]]});
  c.out('Bạn ' + r.v + ' tuổi');
  c.snap({ln:4,title:'In tuổi',body:'Dòng tiếp theo trong try chạy bình thường và in "Bạn ' + r.v + ' tuổi".',viz:tcFlow('ok','dim','dim'),vars:[['age',r.v]]});
  c.snap({ln:6,title:'Hết try, bỏ qua catch',body:'Không có lỗi nên catch không chạy. Chương trình nhảy qua catch.',viz:tcFlow('ok','no','hi',['','bị bỏ qua','']),vars:[['age',r.v]]});
  c.out('Kết thúc');
  c.snap({ln:12,title:'In "Kết thúc"',body:'Chương trình chạy tiếp sau khối try-catch và in "Kết thúc".',viz:tcFlow('ok','no','ok',['','bị bỏ qua','']),vars:[['age',r.v]]});
  c.snap({ln:12,title:'Xong',body:'Không lỗi: try chạy hết, catch bị bỏ qua.',note:'catch chỉ chạy khi có lỗi trong try. Dù có lỗi hay không, chương trình đều chạy tiếp sau khối try-catch.',viz:tcFlow('ok','no','ok',['','bị bỏ qua','']),vars:[['age',r.v]]});
 }},
loi:{inputs:[],chips:[],intro:'Nhập "abc" không phải số. Xem chương trình nhảy sang catch. Bấm "Bước tiếp".',
 lines:function(){ return tcLines('abc'); },
 run:function(c){
  var r = tcParse('abc');
  c.snap({ln:1,title:'Vào khối try',body:'Chương trình bắt đầu chạy các dòng trong try, với input = "abc".',viz:tcFlow('hi','dim','dim'),vars:[['input',S('abc'),1]]});
  c.snap({ln:3,title:'Parse ném ' + r.err,body:'int.Parse("abc") không đổi được thành số nên ném ' + r.err + '.',viz:[tcFlow('bad','dim','dim'), vCard({kind:'err',title:r.err,sub:r.msg})],vars:[['input',S('abc')]]});
  c.snap({ln:7,title:'Bỏ qua phần còn lại của try',body:'Dòng in tuổi trong try không được chạy. Chương trình nhảy thẳng vào catch.',viz:[tcFlow('bad','hi','dim',['dòng in tuổi bị bỏ qua','','']), vText(['Console.WriteLine(','  "Bạn " + age + " tuổi");'],{title:'Không được chạy',noNo:true}).replace('class="v-text"','class="v-text s-dim"')],vars:[['input',S('abc')]]});
  c.out('Vui lòng nhập số');
  c.snap({ln:9,title:'catch chạy',body:'catch (FormatException) bắt đúng loại lỗi và in "Vui lòng nhập số".',viz:tcFlow('bad','ok','dim'),vars:[['input',S('abc')]]});
  c.out('Kết thúc');
  c.snap({ln:12,title:'Chạy tiếp sau khối',body:'Chương trình không dừng, nó chạy tiếp sau try-catch và in "Kết thúc".',viz:tcFlow('bad','ok','ok'),vars:[['input',S('abc')]]});
  c.snap({ln:12,title:'Xong',body:'Có lỗi: nhảy từ try sang catch, rồi đi tiếp.',note:'Lỗi trong try làm phần còn lại của try bị bỏ qua. catch chỉ chạy khi có lỗi, và chương trình tiếp tục sau khối try-catch.',viz:tcFlow('bad','ok','ok'),vars:[['input',S('abc')]]});
 }}
};
