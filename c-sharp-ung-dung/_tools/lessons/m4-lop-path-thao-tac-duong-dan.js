// META {"module":4,"lesson":"Quản lý Đường dẫn và Thư mục","activity":"Lớp Path: Thao tác với đường dẫn file","title":"Lớp Path và đường dẫn file","lead":"Dùng Path để tách và ghép đường dẫn thay vì cộng chuỗi. Ví dụ dùng kiểu Windows. Chọn tình huống rồi bấm <b>Bước tiếp</b>.","tabs":[["tach","Tách đường dẫn"],["ghep","Ghép đường dẫn"],["doi","Đổi phần mở rộng"]],"codeTitle":"Mã nguồn C#"}
var PT_P = 'C:\\Data\\Reports\\bao-cao.txt';
function ptDir(p){ return p.slice(0, p.lastIndexOf('\\')); }
function ptName(p){ return p.slice(p.lastIndexOf('\\') + 1); }
function ptExt(p){ var n = ptName(p), i = n.lastIndexOf('.'); return i < 0 ? '' : n.slice(i); }
function ptBare(p){ var n = ptName(p); return n.slice(0, n.length - ptExt(p).length); }
function ptCombine(parts){
  var r = '';
  parts.forEach(function(x){
    if (/^[A-Za-z]:\\/.test(x) || x[0] === '\\') r = x;
    else if (!r) r = x;
    else r = (r[r.length - 1] === '\\' ? r : r + '\\') + x;
  });
  return r;
}
function ptChips(hi){
  var labels = ['ổ đĩa', 'thư mục', 'thư mục', 'tên tệp', 'đuôi'], texts = ['C:\\', 'Data\\', 'Reports\\', 'bao-cao', '.txt'];
  return vChips(texts.map(function(t, i){ return {t: t, label: labels[i], s: hi.indexOf(i) >= 0 ? 'hi' : undefined}; }), {title: 'Đường dẫn p'});
}
function ptRes(title, val, kind){ return vCard({kind: kind || 'ok', title: title, sub: val}); }
var EX = {
tach:{inputs:[],chips:[],
 intro:'Một đường dẫn gồm nhiều phần. Mỗi phương thức của Path trả về một phần. Chip màu vàng là phần được trả về. Bấm "Bước tiếp".',
 lines:function(){return [
  'string p =',
  '  @"C:\\Data\\Reports\\bao-cao.txt";',
  'var dir = Path.GetDirectoryName(p);',
  'var name = Path.GetFileName(p);',
  'var bare =',
  '  Path.GetFileNameWithoutExtension(p);',
  'var ext = Path.GetExtension(p);'];},
 run:function(c){
  c.snap({ln:1,title:'Đường dẫn đầy đủ',body:'p gồm 5 phần: ổ đĩa, hai thư mục, tên tệp và phần mở rộng.',vars:[['p',S(PT_P),1]],viz:[ptChips([])]});
  c.snap({ln:2,title:'GetDirectoryName',body:'Trả về phần thư mục chứa tệp, tức mọi thứ trước tên tệp.',vars:[['dir',S(ptDir(PT_P)),1]],viz:[ptChips([0,1,2]), ptRes('GetDirectoryName(p)', ptDir(PT_P))]});
  c.snap({ln:3,title:'GetFileName',body:'Trả về tên tệp kèm phần mở rộng.',vars:[['name',S(ptName(PT_P)),1]],viz:[ptChips([3,4]), ptRes('GetFileName(p)', ptName(PT_P))]});
  c.snap({ln:5,title:'GetFileNameWithoutExtension',body:'Trả về tên tệp nhưng bỏ phần mở rộng.',vars:[['bare',S(ptBare(PT_P)),1]],viz:[ptChips([3]), ptRes('GetFileNameWithoutExtension(p)', ptBare(PT_P))]});
  c.snap({ln:6,title:'GetExtension',body:'Trả về phần mở rộng, có cả dấu chấm.',vars:[['ext',S(ptExt(PT_P)),1]],viz:[ptChips([4]), ptRes('GetExtension(p)', ptExt(PT_P))]});
  c.snap({ln:6,title:'Xong',body:'Bốn phương thức, bốn phần khác nhau của cùng một đường dẫn, không cần tự cắt chuỗi.',
   note:'Path tách đường dẫn thay cho việc tự cắt chuỗi và tự tìm dấu phân cách.',vars:[['dir',S(ptDir(PT_P))],['name',S(ptName(PT_P))],['bare',S(ptBare(PT_P))],['ext',S(ptExt(PT_P))]],viz:[ptChips([]), ptRes('Kết quả', ptDir(PT_P) + '  |  ' + ptName(PT_P) + '  |  ' + ptBare(PT_P) + '  |  ' + ptExt(PT_P), 'info')]});
 }},
ghep:{inputs:[],chips:[],
 intro:'Ghép đường dẫn bằng dấu + so với Path.Combine. Bấm "Bước tiếp".',
 lines:function(){return [
  'var bad = "Data" + "Reports";',
  'var ok = Path.Combine(',
  '  "Data", "Reports", "a.txt");',
  'var abs = Path.Combine(',
  '  "Data", @"C:\\Temp");'];},
 run:function(c){
  function row(title, parts, st){ return vChips(parts.map(function(t, i){ return {t: t, s: st && st[i]}; }), {title: title}); }
  var bad = 'Data' + 'Reports', ok = ptCombine(['Data', 'Reports', 'a.txt']), abs = ptCombine(['Data', 'C:\\Temp']);
  c.snap({ln:0,title:'Cộng chuỗi bằng dấu +',body:'"Data" + "Reports" cho ra "' + bad + '". Hai tên dính liền vì thiếu dấu phân cách.',vars:[['bad',S(bad),1]],
   viz:[row('Đầu vào', ['"Data"','"Reports"']), row('Kết quả', [bad], ['bad'])]});
  c.snap({ln:2,title:'Path.Combine',body:'Combine tự chèn dấu phân cách giữa các phần: "' + ok + '".',vars:[['ok',S(ok),1]],
   viz:[row('Đầu vào', ['"Data"','"Reports"','"a.txt"']), row('Kết quả', ok.split('\\').map(function(x, i, a){ return i < a.length - 1 ? x + '\\' : x; }), ['ok','ok','ok'])]});
  c.snap({ln:4,title:'Gặp đường dẫn tuyệt đối',body:'"C:\\Temp" là đường dẫn tuyệt đối nên Combine bỏ hết phần đứng trước, kết quả chỉ còn "' + abs + '".',vars:[['abs',S(abs),1]],
   viz:[row('Đầu vào', ['"Data"','"C:\\Temp"'], ['no','hi']), row('Kết quả', [abs], ['ok'])]});
  c.snap({ln:4,title:'Xong',body:'Combine xử lý dấu phân cách và cả trường hợp đường dẫn tuyệt đối mà phép + không biết.',
   note:'Ghép đường dẫn bằng Path.Combine, không cộng chuỗi. Trên macOS/Linux dấu phân cách là "/" và Combine tự dùng đúng dấu.',
   viz:[row('So sánh', [bad, ok, abs], ['bad','ok','ok'])]});
 }},
doi:{inputs:[],chips:[],
 intro:'ChangeExtension đổi phần mở rộng trong chuỗi đường dẫn. Hãy xem nó có đổi tệp thật không. Bấm "Bước tiếp".',
 lines:function(){return [
  'var name = "bao-cao.txt";',
  'var csv =',
  '  Path.ChangeExtension(',
  '    name, ".csv");'];},
 run:function(c){
  function nm(ext, s){ return vChips([{t:'bao-cao',label:'tên'},{t:ext,label:'đuôi',s:s}], {title:'Chuỗi'}); }
  function disk(s){ return vChips([{t:'bao-cao.txt',label:'tệp thật trên đĩa',s:s}], {title:'Đĩa'}); }
  var res = 'bao-cao.txt'.replace(/\.txt$/, '.csv');
  c.snap({ln:0,title:'Tên tệp gốc',body:'name là chuỗi "bao-cao.txt" gồm tên và đuôi .txt.',vars:[['name',S('bao-cao.txt'),1]],viz:[nm('.txt'), disk()]});
  c.snap({ln:2,title:'Gọi ChangeExtension',body:'Truyền vào chuỗi cũ và đuôi mới ".csv".',vars:[['name',S('bao-cao.txt')]],viz:[nm('.txt','hi'), disk()]});
  c.snap({ln:2,title:'Đuôi được thay',body:'Kết quả là chuỗi "' + res + '": phần tên giữ nguyên, đuôi đổi thành .csv.',vars:[['csv',S(res),1]],viz:[nm('.csv','new'), disk()]});
  c.snap({ln:3,title:'Xong',body:'Chỉ có chuỗi đổi. Tệp thật trên đĩa vẫn tên bao-cao.txt, muốn đổi tên tệp phải dùng lệnh khác như File.Move.',
   note:'ChangeExtension chỉ tạo ra chuỗi mới, không đổi tên tệp thật.',vars:[['csv',S(res)]],viz:[nm('.csv','ok'), disk('ok')]});
 }}
};
