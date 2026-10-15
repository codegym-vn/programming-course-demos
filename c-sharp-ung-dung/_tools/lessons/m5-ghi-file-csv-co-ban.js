// META {"module":5,"lesson":"Ghi dữ liệu ra File CSV","activity":"Các bước cơ bản để ghi File CSV trong C#","title":"Các bước ghi File CSV","lead":"Đi ngược lại bài đọc: từ đối tượng Product thành một dòng văn bản rồi vào tệp. Bấm <b>Bước tiếp</b>.","tabs":[["ghi","Ghi 3 sản phẩm"]],"codeTitle":"Mã nguồn C#"}
var G7P = [['SP01', 'Bút bi', 5000], ['SP02', 'Vở', 12000], ['SP03', 'Thước', 8000]];
function g7Row(p){ var arr = [p[0], p[1], String(p[2])]; return {arr:arr, line:arr.join(',')}; }
function g7Q(a){ return '[' + a.map(function(x){ return '"' + x + '"'; }).join(', ') + ']'; }
function g7Viz(st){
  // st: {file:[{t,s}], title, nodes:{p,a,j,l,f}, item:{...}}
  var n = st.n || {}, it = {};
  var flow = vFlow([
    {t:'Product', s:n.p || 'dim', item:it.p},
    {t:'Mảng giá trị', s:n.a || 'dim', item:it.a},
    {t:'string.Join', s:n.j || 'dim', item:it.j},
    {t:'Dòng', s:n.l || 'dim', item:it.l},
    {t:'Tệp', s:n.f || 'dim'}
  ], {title:'Dây chuyền ghi'});
  var file = vText(st.file.length ? st.file : [{t:'(trống)', s:'dim'}], {title:st.title});
  var out = [flow];
  if (st.cur) out.push(vText([{t:st.cur[1]}], {title:st.cur[0], noNo:true}));
  out.push(file);
  return out;
}
var EX = { ghi:{ inputs:[], chips:[],
  intro:'Ba sản phẩm sẽ được ghi vào tệp sp.csv. Hãy nhìn mỗi sản phẩm đi qua dây chuyền thành một dòng. Bấm "Bước tiếp".',
  lines:function(){ return [
    'var list = new List<Product>',
    '{',
    '  new Product("SP01","Bút bi",5000),',
    '  new Product("SP02","Vở",12000),',
    '  new Product("SP03","Thước",8000)',
    '};',
    'using (var w = new StreamWriter(',
    '  "sp.csv"))',
    '{',
    '  w.WriteLine("Ma,Ten,Gia");',
    '  foreach (var p in list)',
    '  {',
    '    var f = new[] { p.Ma, p.Ten,',
    '      p.Gia.ToString() };',
    '    w.WriteLine(string.Join(",", f));',
    '  }',
    '}'
  ]; },
  run:function(c){
    var file = [];
    c.snap({ln:0, title:'Danh sách Product', body:'Có 3 sản phẩm trong list. Tệp sp.csv chưa tồn tại.', vars:[['list', 'List<Product> (' + G7P.length + ')']], viz:g7Viz({file:file, title:'sp.csv (chưa có)'})});
    c.snap({ln:6, title:'Mở StreamWriter trong using', body:'Tệp sp.csv được tạo, đang rỗng. Khối using sẽ tự đóng tệp khi kết thúc.', viz:g7Viz({file:file, title:'sp.csv (đang mở)', n:{f:'hi'}})});
    file = [{t:'Ma,Ten,Gia', s:'new'}];
    c.snap({ln:9, title:'Ghi dòng tiêu đề', body:'WriteLine ghi dòng tiêu đề đầu tiên, trước mọi dữ liệu.', viz:g7Viz({file:file, title:'sp.csv', n:{l:'hi', f:'ok'}, cur:['Dòng đang ghi', 'Ma,Ten,Gia']})});
    var r1 = g7Row(G7P[0]);
    file = [{t:'Ma,Ten,Gia'}];
    c.snap({ln:12, title:'Product thành mảng giá trị', body:'Với Product đầu tiên, lấy Ma, Ten và Gia (đổi thành chuỗi) bỏ vào một mảng.', vars:[['p', '→ Product ' + G7P[0][0], 1]], viz:g7Viz({file:file, title:'sp.csv', n:{p:'ok', a:'hi'}, cur:['Mảng giá trị của ' + G7P[0][0], g7Q(r1.arr)]})});
    file = [{t:'Ma,Ten,Gia'}, {t:r1.line, s:'new'}];
    c.snap({ln:14, title:'Join rồi ghi dòng', body:'string.Join(",", f) nối các phần tử bằng dấu phẩy thành "' + r1.line + '", rồi WriteLine ghi vào tệp.', vars:[['p', '→ Product ' + G7P[0][0], 1]], viz:g7Viz({file:file, title:'sp.csv', n:{a:'ok', j:'hi', l:'hi', f:'ok'}, cur:['Kết quả Join', r1.line]})});
    var r2 = g7Row(G7P[1]);
    file = [{t:'Ma,Ten,Gia'}, {t:r1.line}, {t:r2.line, s:'new'}];
    c.snap({ln:14, title:'Lặp: sản phẩm thứ hai', body:'Vòng foreach lặp lại cùng ba việc cho Product ' + G7P[1][0] + ': lấy giá trị, nối bằng dấu phẩy, ghi dòng "' + r2.line + '".', vars:[['p', '→ Product ' + G7P[1][0], 1]], viz:g7Viz({file:file, title:'sp.csv', n:{p:'ok', a:'ok', j:'ok', l:'hi', f:'ok'}, cur:['Dòng đang ghi', r2.line]})});
    var r3 = g7Row(G7P[2]);
    file = [{t:'Ma,Ten,Gia'}, {t:r1.line}, {t:r2.line}, {t:r3.line, s:'new'}];
    c.snap({ln:14, title:'Lặp: sản phẩm thứ ba', body:'Product ' + G7P[2][0] + ' cũng đi qua dây chuyền và thành dòng "' + r3.line + '".', vars:[['p', '→ Product ' + G7P[2][0], 1]], viz:g7Viz({file:file, title:'sp.csv', n:{p:'ok', a:'ok', j:'ok', l:'hi', f:'ok'}, cur:['Dòng đang ghi', r3.line]})});
    file = [{t:'Ma,Ten,Gia', s:'ok'}, {t:r1.line, s:'ok'}, {t:r2.line, s:'ok'}, {t:r3.line, s:'ok'}];
    c.snap({ln:16, title:'Xong', body:'Rời khỏi using, tệp được đóng và có ' + file.length + ' dòng. Với số thập phân, nhớ dùng CultureInfo.InvariantCulture để 12.5 không thành 12,5 làm lệch cột.', note:'Ghi CSV = ghi tiêu đề, rồi với mỗi đối tượng: lấy giá trị, nối bằng dấu phẩy, ghi một dòng.', viz:g7Viz({file:file, title:'sp.csv (đã đóng, ' + file.length + ' dòng)', n:{f:'ok'}})});
  }
}};
