// META {"module":2,"lesson":"Giới thiệu về Exception và Tầm quan trọng","activity":"Exception là gì?","title":"Exception là gì?","lead":"Nhập một giá trị cho tuổi (hoặc chọn gợi ý) rồi bấm <b>Bước tiếp</b> để xem chương trình chạy.","tabs":[["x","Nhập tuổi"]],"codeTitle":"Mã nguồn C#"}
function exParse(s){
  if (!/^[+-]?\d+$/.test(s)) return {err:'FormatException', msg:"The input string '" + s + "' was not in a correct format."};
  var n = Number(s);
  if (n > 2147483647 || n < -2147483648) return {err:'OverflowException', msg:'Value was either too large or too small for an Int32.'};
  return {v:n};
}
function exFlow(a, b, c3, subs){ return vFlow([{t:'Đọc input',s:a},{t:'int.Parse',s:b,sub:subs && subs[1]},{t:'In kết quả',s:c3,sub:subs && subs[2]}], {title:'Đường đi của chương trình'}); }
var EX = {x:{
 inputs:[{id:'input',label:'input',def:'abc',text:'^.{0,10}$',msg:'Nhập tối đa 10 ký tự',w:130}],
 chips:['20','abc','','-5'],
 intro:'Chọn một giá trị gợi ý hoặc tự nhập vào ô input, rồi bấm "Bước tiếp".',
 lines:function(){ return ['Console.Write("Nhập tuổi: ");','string input = Console.ReadLine();','int age = int.Parse(input);','Console.WriteLine(','  "Năm sau bạn " + (age + 1)','  + " tuổi");']; },
 run:function(c, P){
  var inp = P.input, r = exParse(inp), q = S(inp);
  c.snap({ln:0,title:'Hỏi tuổi',body:'Chương trình in lời nhắc và chờ người dùng nhập.',viz:exFlow('hi','dim','dim')});
  c.snap({ln:1,title:'Nhận input',body:'Biến input nhận giá trị người dùng nhập: "' + inp + '". Đây luôn là chuỗi.',viz:exFlow('ok','dim','dim'),vars:[['input',q,1]]});
  if (r.err) {
   c.err('Unhandled exception. System.' + r.err + ': ' + r.msg);
   c.snap({ln:2,title:'int.Parse ném exception',body:'Không đổi "' + inp + '" thành số nguyên được, .NET tạo một đối tượng ' + r.err + ' và ném ra.',
    viz:[exFlow('ok','bad','dim'), vCard({kind:'err',title:r.err,sub:r.msg,lines:['int age = int.Parse(input);']})],vars:[['input',q]]});
   c.snap({ln:2,title:'Không ai bắt, chương trình dừng',body:'Không có try-catch nên chương trình dừng ngay tại dòng lỗi. Hai dòng in phía sau không được chạy.',
    viz:[exFlow('ok','bad','dim',['','không được chạy']), vCard({kind:'err',title:r.err,sub:r.msg}), vText(['Console.WriteLine(','  "Năm sau bạn " + (age + 1)','  + " tuổi");'],{title:'Không được chạy',noNo:true}).replace('class="v-text"','class="v-text s-dim"')],vars:[['input',q]]});
   c.snap({ln:2,title:'Xong',body:'Exception là một đối tượng được ném ra lúc chạy. Không ai bắt thì chương trình dừng.',note:'Exception là sự cố lúc chạy, được biểu diễn bằng một đối tượng. Không bắt thì chương trình dừng. Thử nhập 20 hoặc -5 để xem trường hợp không lỗi.',
    viz:[exFlow('ok','bad','dim'), vCard({kind:'err',title:r.err,sub:r.msg})],vars:[['input',q]]});
  } else {
   var age = r.v;
   c.snap({ln:2,title:'int.Parse thành công',body:'"' + inp + '" đổi được thành số nguyên, age = ' + age + '.',viz:exFlow('ok','ok','dim'),vars:[['input',q],['age',age,1]]});
   c.out('Năm sau bạn ' + (age + 1) + ' tuổi');
   c.snap({ln:3,title:'In kết quả',body:'Chương trình chạy hết và in "Năm sau bạn ' + (age + 1) + ' tuổi".',viz:exFlow('ok','ok','ok'),vars:[['input',q],['age',age]]});
   c.snap({ln:5,title:'Xong',body:age < 0 ? 'Tuổi -5 là vô lý, nhưng đó chỉ là dữ liệu sai nghiệp vụ, không phải exception. Chương trình vẫn chạy.' : 'Không có sự cố nào nên không có exception. Thử nhập abc để xem lỗi.',
    note:'Lỗi định dạng (không phải số) làm .NET ném exception. Dữ liệu sai nghiệp vụ như tuổi âm thì không, ta phải tự kiểm tra.',viz:exFlow('ok','ok','ok'),vars:[['age',age]]});
  }
 }}};
