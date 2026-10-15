// META {"module":5,"lesson":"Xử lý CSV nâng cao và Ứng dụng thực tế","activity":"Viết hàm đọc CSV linh hoạt","title":"Đọc CSV theo tên cột","lead":"Tệp đổi thứ tự cột thành Ten,Gia,Ma. Bên trái đọc theo chỉ số cố định, bên phải đọc theo tên cột. Bấm <b>Bước tiếp</b> để hai cột cùng chạy.","tabs":[["cot","Đổi thứ tự cột"]],"codeTitle":"Mã nguồn C#"}
var G7H = 'Ten,Gia,Ma'.split(','), G7L = 'Bút bi,5000,SP01'.split(',');
function g7Tbl(hiCell, mark){
  var rows = [G7H.slice(), G7L.slice()];
  var cells = rows.map(function(r){ return r.map(function(x){ return {v:x}; }); });
  (mark || []).forEach(function(m){ cells[m[0]][m[1]].s = m[2]; });
  return vGrid(cells, {head:true, hiCell:hiCell, title:'Tệp (thứ tự cột mới)'});
}
function g7Col(){ var d = {}; G7H.forEach(function(h, i){ d[h] = i; }); return d; }
var EX = { cot:{
  intro:'Cả hai cột đọc cùng một dòng "Bút bi,5000,SP01" từ tệp có tiêu đề Ten,Gia,Ma. Hãy xem ai đọc đúng.',
  running:'Bên trái cứ cho rằng cột 0 là Ma. Bên phải hỏi tiêu đề xem cột nào là Ma.',
  done:'Bên trái đọc Ma = "Bút bi" rồi hỏng ở int.Parse("SP01"). Bên phải đọc đúng Ma = "SP01" và Gia = 5000.',
  note:'Đọc theo tên cột giúp chương trình chịu được thay đổi thứ tự cột.',
  cols:[
  {title:'Theo chỉ số cố định', sub:'Giả định Ma ở cột 0, Gia ở cột 2.',
   lines:['// Tệp: Ten,Gia,Ma', 'string line = "Bút bi,5000,SP01";', 'var parts = line.Split(\',\');', '// giả định cột 0 là Ma', 'string ma = parts[0];', '// giả định cột 2 là Gia', 'int gia = int.Parse(parts[2]);'],
   run:function(c){
     c.snap({ln:0, title:'Tệp đổi thứ tự cột', body:'Dòng tiêu đề của tệp mới là Ten,Gia,Ma. Code bên trái vẫn nghĩ cột đầu tiên là Ma.', viz:[g7Tbl()]});
     c.snap({ln:2, title:'Split dòng dữ liệu', body:'Dòng được cắt thành ' + G7L.length + ' phần. Code chỉ biết chỉ số 0, 1, 2, không biết tên cột.', viz:[g7Tbl(), vCells(G7L.map(function(x){ return {v:x}; }), {name:'parts'})]});
     c.snap({ln:4, title:'ma = parts[0]', body:'parts[0] là "' + G7L[0] + '", nhưng đó là tên sản phẩm, không phải mã. Dữ liệu đã bị đọc nhầm mà không có lỗi nào báo.', vars:[['ma', S(G7L[0]), 'bad']], viz:[g7Tbl([1, 0], [[1, 0, 'bad']]), vCells(G7L.map(function(x, i){ return {v:x, s:i === 0 ? 'bad' : ''}; }), {name:'parts', ptr:0, ptrLabel:'Ma?'})]});
     var msg = 'The input string \'' + G7L[2] + '\' was not in a correct format.';
     c.err('Unhandled exception. System.FormatException: ' + msg);
     c.snap({ln:6, title:'int.Parse(parts[2])', body:'parts[2] là "' + G7L[2] + '", không phải số, nên int.Parse ném FormatException.', vars:[['ma', S(G7L[0]), 'bad']], viz:[vCard({kind:'err', title:'FormatException', sub:msg, lines:['int.Parse(parts[2])'], tip:'Chỉ số 2 giờ là cột Ma, không còn là Gia.'}), vCells(G7L.map(function(x, i){ return {v:x, s:i === 2 ? 'bad' : ''}; }), {name:'parts', ptr:2, ptrLabel:'Gia?'})]});
     c.snap({ln:6, title:'Xong', body:'Đọc theo chỉ số cố định hỏng ngay khi thứ tự cột thay đổi.', note:'Chỉ số cột cố định chỉ đúng khi thứ tự cột không bao giờ đổi.', vars:[['ma', S(G7L[0]), 'bad']], viz:[vCard({kind:'err', title:'Đọc sai', sub:'Ma = "Bút bi", rồi FormatException'})]});
   }},
  {title:'Theo tên cột', sub:'Dựng Dictionary từ dòng tiêu đề.',
   lines:['var head = "Ten,Gia,Ma".Split(\',\');', 'var col = new Dictionary<string,int>();', 'for (int i = 0; i < head.Length; i++)', '  col[head[i]] = i;', 'string line = "Bút bi,5000,SP01";', 'var parts = line.Split(\',\');', 'string ma = parts[col["Ma"]];', 'int gia = int.Parse(', '  parts[col["Gia"]]);'],
   run:function(c){
     var col = g7Col(), parts = G7L;
     function dr(n, s){ return vDrawers(Object.keys(col).slice(0, n).map(function(k, i){ return {k:k, v:String(col[k]), s:(s && s[i]) || ''}; }), {name:'col (Dictionary)'}); }
     c.snap({ln:0, title:'Đọc dòng tiêu đề', body:'Chương trình đọc tiêu đề trước: Ten, Gia, Ma. Đây là nguồn để biết cột nào nằm ở đâu.', viz:[g7Tbl([0, 0])]});
     c.snap({ln:3, title:'Dựng Dictionary', body:'Với mỗi tên cột, ghi lại chỉ số của nó: Ten là ' + col.Ten + ', Gia là ' + col.Gia + ', Ma là ' + col.Ma + '.', vars:[['col', 'Dictionary (3)']], viz:[g7Tbl(), dr(3, ['new', 'new', 'new'])]});
     c.snap({ln:5, title:'Split dòng dữ liệu', body:'Dòng dữ liệu được cắt thành 3 phần, giống bên trái. Khác ở chỗ sắp dùng tên cột để chọn phần.', viz:[dr(3), vCells(parts.map(function(x){ return {v:x}; }), {name:'parts'})]});
     c.snap({ln:6, title:'Lấy Ma theo tên', body:'col["Ma"] cho ' + col.Ma + ', nên parts[' + col.Ma + '] = "' + parts[col.Ma] + '". Đúng mã sản phẩm.', vars:[['ma', S(parts[col.Ma]), 'ok']], viz:[dr(3, ['', '', 'ok']), vCells(parts.map(function(x, i){ return {v:x, s:i === col.Ma ? 'ok' : ''}; }), {name:'parts', ptr:col.Ma, ptrLabel:'Ma'})]});
     var gia = parseInt(parts[col.Gia], 10);
     c.snap({ln:7, title:'Lấy Gia theo tên', body:'col["Gia"] cho ' + col.Gia + ', nên parts[' + col.Gia + '] = "' + parts[col.Gia] + '" và int.Parse ra ' + gia + '.', vars:[['ma', S(parts[col.Ma])], ['gia', gia, 'ok']], viz:[dr(3, ['', 'ok', '']), vCells(parts.map(function(x, i){ return {v:x, s:i === col.Gia ? 'ok' : ''}; }), {name:'parts', ptr:col.Gia, ptrLabel:'Gia'})]});
     c.snap({ln:8, title:'Xong', body:'Dù cột đứng ở đâu, tên cột vẫn dẫn tới đúng chỉ số.', note:'Đọc theo tên cột giúp chương trình chịu được thay đổi thứ tự cột.', vars:[['ma', S(parts[col.Ma]), 'ok'], ['gia', gia, 'ok']], viz:[vCard({kind:'ok', title:'Đọc đúng', rows:[['Ma', parts[col.Ma]], ['Gia', String(gia)]]})]});
   }}
  ]
}};
