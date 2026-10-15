// META {"module":8,"lesson":"Nguyên tắc Thay thế Liskov (Liskov Substitution Principle - LSP)","activity":"Giới thiệu Nguyên tắc Thay thế Liskov (LSP)","title":"Lớp con phải thay được lớp cha","lead":"Hàm Resize mong đợi diện tích bằng 20. Chọn đối tượng truyền vào rồi bấm <b>Bước tiếp</b>.","tabs":[["rect","Rectangle"],["square","Square kế thừa Rectangle"]]}
var BASE = ['class Rectangle','{','  public virtual int Width','    { get; set; }','  public virtual int Height','    { get; set; }','  public int Area','    => Width * Height;','}'];
var SQ = ['class Square : Rectangle','{','  public override int Width','  {','    get => base.Width;','    set => base.Width =','      base.Height = value;','  }','  public override int Height','  {','    get => base.Height;','    set => base.Height =','      base.Width = value;','  }','}'];
var RES = ['void Resize(Rectangle r)','{','  r.Width = 5;','  r.Height = 4;','}'];
function mkEx(kind){
 var sq = kind === 'square';
 var lines = BASE.concat(sq ? SQ : [], RES, ['// Resize mong đợi Area = 20', sq ? 'Rectangle r = new Square();' : 'Rectangle r = new Rectangle();', 'Resize(r);', 'Console.WriteLine(r.Area);']);
 var idx = function(s, from){ return lines.indexOf(s, from || 0); };
 var tname = sq ? 'Square' : 'Rectangle', id = tname + '#1';
 var w = 0, h = 0;
 function ob(fw, fh, hi, bad){ return [O(id,[['Width',w,fw],['Height',h,fh],['Area (Width * Height)',w * h,bad]],{hi:hi})]; }
 var iRes = idx('void Resize(Rectangle r)'), iW = idx('  r.Width = 5;'), iH = idx('  r.Height = 4;');
 var iNew = idx(sq ? 'Rectangle r = new Square();' : 'Rectangle r = new Rectangle();'), iCall = idx('Resize(r);'), iPr = idx('Console.WriteLine(r.Area);');
 var iSetW = sq ? idx('    set => base.Width =') : idx('  public virtual int Width'), iSetH = sq ? idx('    set => base.Height =') : idx('  public virtual int Height');
 return {inputs:[],
  intro:'Resize gán Width = 5 và Height = 4 rồi mong đợi Area = 20. Bấm "Bước tiếp" để xem ' + tname + ' có đáp ứng được không.',
  lines:function(){ return lines; },
  run:function(c){
   c.snap({ln:iRes,title:'Resize mong đợi gì?',body:'Với Width = 5 và Height = 4, ai gọi Resize cũng mong Area = 5 * 4 = 20.'});
   c.snap({ln:iNew,title:'Tạo đối tượng ' + tname,body:'Biến r kiểu Rectangle trỏ tới ' + (sq ? 'một Square' : 'một Rectangle') + '. Width và Height mặc định bằng 0.',vars:[['r','→ ' + id,1]],objs:ob('','',1)});
   c.snap({ln:iCall,title:'Gọi Resize(r)',body:'Truyền r vào Resize. Hàm không cần biết r thật sự là kiểu gì.',vars:[['r','→ ' + id]],objs:ob('','',1)});
   w = 5; if (sq) h = 5;
   c.snap({ln:sq ? iSetW : iW,title:'r.Width = 5',body:sq ? 'Setter của Square gán Width = 5 và gán luôn Height = 5 để giữ hình vuông.' : 'Width của hình chữ nhật thành 5. Height không đổi.',vars:[['r','→ ' + id]],objs:ob('hi',sq ? 'hi' : '',1)});
   var oldW = w; h = 4; if (sq) w = 4;
   c.snap({ln:sq ? iSetH : iH,title:'r.Height = 4',body:sq ? 'Setter của Square gán Height = 4 và kéo luôn Width = 4. Giá trị Width = 5 vừa gán đã bị mất.' : 'Height thành 4. Width vẫn là 5.',vars:[['r','→ ' + id]],objs:ob(sq ? 'bad' : '','hi',1)});
   var area = w * h;
   c.out(String(area));
   c.snap({ln:iPr,title:'In Area',body:'Area = ' + w + ' * ' + h + ' = ' + area + '. ' + (area === 20 ? 'Đúng như Resize mong đợi.' : 'Mong đợi 20 nhưng ra ' + area + '. Sai kết quả.'),vars:[['r','→ ' + id]],objs:ob('','',0,area === 20 ? 'ok' : 'bad')});
   c.snap({ln:iPr,title:'Xong: ' + (area === 20 ? 'thay thế được' : 'không thay thế được'),body:area === 20 ? 'Rectangle đúng với mong đợi của Resize.' : 'Square kế thừa Rectangle nhưng làm Resize cho kết quả sai.',note:area === 20 ? 'Đối tượng cha chạy đúng. Hãy so sánh với tab Square.' : 'LSP: lớp con phải thay được lớp cha mà không làm sai kết quả. Square không làm được nên không nên kế thừa Rectangle.',vars:[['r','→ ' + id]],objs:ob('','',0,area === 20 ? 'ok' : 'bad')});
  }};
}
var EX = {rect:mkEx('rect'),square:mkEx('square')};
