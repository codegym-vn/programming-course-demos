// META {"module":5,"lesson":"Xử lý CSV nâng cao và Ứng dụng thực tế","activity":"Xây dựng một lớp CsvHelper đơn giản","title":"Lớp CsvHelper đơn giản","lead":"Một lớp lo cả hai chiều: ghi Product ra dòng CSV và đọc dòng CSV về Product. Bấm <b>Bước tiếp</b>.","tabs":[["ch","Ghi rồi đọc lại"]],"codeTitle":"Mã nguồn C#"}
var G7A = {ma:'SP09', ten:'Bút, mực "đỏ"', gia:15000};
function g7Esc(s){ return /[,"\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
function g7Split(line){
  var f = [], cur = '', q = false;
  for (var i = 0; i < line.length; i++){
    var ch = line[i];
    if (ch === '"'){ if (q && line[i + 1] === '"'){ cur += '"'; i++; } else q = !q; }
    else if (ch === ',' && !q){ f.push(cur); cur = ''; }
    else cur += ch;
  }
  f.push(cur); return f;
}
function g7ToLine(p){ return g7Esc(p.ma) + ',' + g7Esc(p.ten) + ',' + p.gia; }
function g7Parse(line){ var f = g7Split(line); return {ma:f[0], ten:f[1], gia:parseInt(f[2], 10)}; }
function g7Viz(o){
  var a = G7A, csv = o.csv, b = o.b, m = o.m || {};
  var box = vCard({kind:'info', title:'CsvHelper', lines:['ToCsvLine(Product) → string', 'ParseLine(string) → Product']});
  var flow = vFlow([
    {t:'Product a', s:o.na || 'dim', sub:'đối tượng gốc'},
    {t:'Dòng CSV', s:o.nc || 'dim', sub:'văn bản'},
    {t:'Product b', s:o.nb || 'dim', sub:'đối tượng mới'}
  ], {title:'Vòng ghi rồi đọc'});
  function cell(k){ return m[k] === undefined ? {t:'?', s:'dim'} : {t:m[k] ? '✓' : '✗', s:m[k] ? 'ok' : 'bad'}; }
  var grid = vGrid([
    ['Trường', 'a (gốc)', 'b (đọc lại)', 'Khớp'],
    ['Ma', a.ma, b ? b.ma : '', cell('ma')],
    ['Ten', a.ten, b ? b.ten : '', cell('ten')],
    ['Gia', String(a.gia), b ? String(b.gia) : '', cell('gia')]
  ], {head:true, title:'So sánh từng trường'});
  var out = [box, flow];
  if (csv) out.push(vText([{t:csv}], {title:'Dòng CSV', noNo:true}));
  out.push(grid);
  return out;
}
var EX = { ch:{ inputs:[], chips:[],
  intro:'Ta ghi một Product ra dòng CSV, đọc lại, rồi so hai đối tượng. Bấm "Bước tiếp".',
  lines:function(){ return [
    '// Esc, SplitCsv: các hàm bài trước',
    'static class CsvHelper',
    '{',
    '  public static string ToCsvLine(',
    '    Product p)',
    '  {',
    '    return Esc(p.Ma) + ","',
    '      + Esc(p.Ten) + ","',
    '      + p.Gia;',
    '  }',
    '  public static Product ParseLine(',
    '    string line)',
    '  {',
    '    var f = SplitCsv(line);',
    '    return new Product(f[0], f[1],',
    '      int.Parse(f[2]));',
    '  }',
    '}',
    '',
    'var a = new Product("SP09",',
    '  "Bút, mực \\"đỏ\\"", 15000);',
    'var csv = CsvHelper.ToCsvLine(a);',
    'var b = CsvHelper.ParseLine(csv);',
    'Console.WriteLine(a.Ma == b.Ma);',
    'Console.WriteLine(a.Ten == b.Ten);',
    'Console.WriteLine(a.Gia == b.Gia);'
  ]; },
  run:function(c){
    var a = G7A, csv = g7ToLine(a), b = g7Parse(csv), m = {};
    c.snap({ln:19, title:'Product gốc', body:'Tên sản phẩm có cả dấu phẩy và nháy kép, đúng loại dữ liệu khó. Lớp CsvHelper ở trên sẽ lo việc chuyển đổi.', vars:[['a', '→ Product ' + a.ma, 1]], viz:g7Viz({na:'hi'})});
    c.snap({ln:21, title:'ToCsvLine(a)', body:'Chiều ghi: ToCsvLine bọc nháy và nhân đôi nháy khi cần, rồi nối bằng dấu phẩy thành ' + csv + '.', vars:[['a', '→ Product ' + a.ma], ['csv', S(csv), 1]], viz:g7Viz({na:'ok', nc:'new', csv:csv})});
    c.snap({ln:22, title:'ParseLine(csv)', body:'Chiều đọc: ParseLine tách dòng thành ' + g7Split(csv).length + ' trường đúng rồi dựng ra một Product mới tên b.', vars:[['a', '→ Product ' + a.ma], ['csv', S(csv)], ['b', '→ Product (mới)', 1]], viz:g7Viz({na:'ok', nc:'ok', nb:'new', csv:csv, b:b})});
    var keys = [['ma', 'Ma', 23, 'a.Ma == b.Ma'], ['ten', 'Ten', 24, 'a.Ten == b.Ten'], ['gia', 'Gia', 25, 'a.Gia == b.Gia']];
    keys.forEach(function(k){
      m[k[0]] = a[k[0]] === b[k[0]];
      c.out(m[k[0]] ? 'True' : 'False');
      c.snap({ln:k[2], title:'So sánh ' + k[1], body:k[3] + ' cho ra ' + (m[k[0]] ? 'True' : 'False') + ': ' + k[1] + ' của b giống hệt a.', viz:g7Viz({na:'ok', nc:'ok', nb:'ok', csv:csv, b:b, m:JSON.parse(JSON.stringify(m))})});
    });
    c.snap({ln:25, title:'Xong', body:'Cả ba trường đều khớp: ghi rồi đọc lại ra đúng dữ liệu ban đầu.', note:'Một lớp, hai chiều, kiểm tra bằng round-trip: ghi rồi đọc lại phải giống ban đầu.', viz:g7Viz({na:'ok', nc:'ok', nb:'ok', csv:csv, b:b, m:m})});
  }
}};
