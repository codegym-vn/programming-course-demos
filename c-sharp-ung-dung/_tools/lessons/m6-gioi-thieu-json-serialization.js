// META {"module":6,"lesson":"JSON Serialization với System.Text.Json","activity":"Giới thiệu JSON Serialization trong C#","title":"Giới thiệu JSON Serialization","lead":"Mỗi kiểu dữ liệu C# có một dạng tương ứng trong JSON. Chọn tình huống rồi bấm <b>Bước tiếp</b>.","tabs":[["don","Đối tượng đơn"],["ds","Có danh sách"],["long","Đối tượng lồng nhau"]],"codeTitle":"Mã nguồn C#"}
// Dựng JSON/đối tượng từ cây nút: {t:'str'|'num'|'bool'|'null'|'arr'|'obj', v, items:[...], fields:[[k,node]]}
function jsType(n){ return n.t; }
function jsPlain(n){
  if (n.t === 'arr') return n.items.map(jsPlain);
  if (n.t === 'obj') { var o = {}; n.fields.forEach(function(f){ o[f[0]] = jsPlain(f[1]); }); return o; }
  if (n.t === 'null') return null;
  return n.v;
}
function jsScalar(n, s){ return { t: n.t === 'str' ? '"' + n.v + '"' : String(n.v), c: n.t, s: s }; }
// Sinh các dòng JSON dạng xuống dòng. Mỗi dòng gắn nhãn st (bước hiện ra)
function jsLines(root, st0){
  var out = [];
  function walk(n, depth, key, comma, st, openSt){
    var pad = '  '.repeat(depth), k = key === null ? [] : [{ t: '"' + key + '"', c: 'key' }, { t: ': ' }];
    if (n.t === 'arr' || n.t === 'obj'){
      var o = n.t === 'arr' ? '[' : '{', cl = n.t === 'arr' ? ']' : '}';
      out.push({ st: st, br: true, seg: [{ t: pad }].concat(k, [{ t: o }]) });
      var kids = n.t === 'arr' ? n.items.map(function(x){ return [null, x]; }) : n.fields;
      kids.forEach(function(f, i){ walk(f[1], depth + 1, f[0], i < kids.length - 1, f[1].st || st, null); });
      out.push({ st: n.stClose || st, br: true, seg: [{ t: pad + cl + (comma ? ',' : '') }] });
    } else out.push({ st: st, seg: [{ t: pad }].concat(k, [jsScalar(n), { t: comma ? ',' : '' }]) });
  }
  walk(root, 0, null, false, st0, null);
  return out;
}
// Lọc dòng theo bước hiện tại; tô vàng dòng thuộc bước hiện tại
function jsShow(lines, cur, title, bracketHi){
  var vis = lines.filter(function(l){ return l.st <= cur; }).map(function(l){
    var now = l.st === cur;
    return { seg: l.seg.map(function(g){ var s = (now || (bracketHi && l.br && l.st <= cur && bracketHi)) ? 'hi' : undefined; return { t: g.t, c: g.c, s: (g.t.trim() === '' || g.t === ': ' || g.t === ',') ? undefined : (now ? 'hi' : (l.br && bracketHi ? 'hi' : undefined)) }; }) };
  });
  if (!vis.length) vis = [{ t: '(chưa có JSON)', s: 'dim' }];
  return vText(vis, { title: title || 'JSON (xuống dòng cho dễ đọc)', noNo: true });
}
// Thẻ đối tượng C# dạng văn bản, cùng màu theo kiểu
function csLines(rows){ return rows; }
function csShow(rows, cur, title){
  var vis = rows.filter(function(r){ return r.st <= cur; }).map(function(r){
    var now = r.st === cur;
    return { seg: r.seg.map(function(g){ return { t: g.t, c: g.c, s: now && g.c ? 'hi' : undefined }; }) };
  });
  return vText(vis, { title: title || 'Đối tượng C#', noNo: true });
}
function csRow(st, pad, name, n){
  var v = n.t === 'str' ? '"' + n.v + '"' : String(n.v);
  return { st: st, seg: [{ t: pad + name + ' = ' }, { t: v, c: n.t }, { t: ',' }] };
}
var JS_LEGEND = vText([
  { seg: [{ t: '"abc"', c: 'str' }, { t: '   chuỗi (string)' }] },
  { seg: [{ t: '20', c: 'num' }, { t: '   số (int, double)' }] },
  { seg: [{ t: 'true', c: 'bool' }, { t: '   bool' }] },
  { seg: [{ t: 'null', c: 'null' }, { t: '   không có giá trị' }] },
  { seg: [{ t: '[ ]', s: 'hi' }, { t: '  List     ' }, { t: '{ }', s: 'hi' }, { t: '  đối tượng' }] }
], { title: 'Chú giải', noNo: true });
function jsPair(csRowsArr, jsonLinesArr, cur, bracketHi){
  return [vPair(csShow(csRowsArr, cur), jsShow(jsonLinesArr, cur, undefined, bracketHi), { mid: '→' }), JS_LEGEND];
}
function N(t, v, st){ return { t: t, v: v, st: st }; }

var T1 = { t: 'obj', fields: [['Name', N('str', 'An', 2)], ['Age', N('num', 20, 3)], ['IsActive', N('bool', true, 4)], ['Email', N('null', null, 5)]] };
T1.fields[3][1].v = null;
var T2 = { t: 'obj', fields: [['Name', N('str', 'An', 2)], ['Skills', { t: 'arr', st: 3, stClose: 4, items: [N('str', 'C#', 4), N('str', 'SQL', 4)] }]] };
var T3 = { t: 'obj', fields: [['Name', N('str', 'An', 2)], ['Address', { t: 'obj', st: 3, stClose: 4, fields: [['City', N('str', 'Hà Nội', 4)]] }]] };

var CS1 = [{ st: 1, seg: [{ t: 'User' }] }, csRow(2, '  ', 'Name', T1.fields[0][1]), csRow(3, '  ', 'Age', T1.fields[1][1]), csRow(4, '  ', 'IsActive', T1.fields[2][1]), csRow(5, '  ', 'Email', T1.fields[3][1])];
var CS2 = [{ st: 1, seg: [{ t: 'User' }] }, csRow(2, '  ', 'Name', T2.fields[0][1]),
  { st: 3, seg: [{ t: '  Skills = ' }, { t: 'List<string>', c: 'key' }] },
  { st: 4, seg: [{ t: '    "C#", "SQL"', c: 'str' }] }];
var CS3 = [{ st: 1, seg: [{ t: 'User' }] }, csRow(2, '  ', 'Name', T3.fields[0][1]),
  { st: 3, seg: [{ t: '  Address = ' }, { t: 'Address', c: 'key' }] },
  { st: 4, seg: [{ t: '    City = ' }, { t: '"Hà Nội"', c: 'str' }] }];
// dòng "{" mở đầu xuất hiện từ bước 1
function jsFor(T){ var L = jsLines(T, 1); L[0].st = 1; L[L.length - 1].st = 99; return L; }
function jsFin(L, cur, last){ L.forEach(function(l){ if (l.st === 99) l.st = last; }); return L; }
var JL1 = jsFin(jsFor(T1), 0, 5), JL2 = jsFin(jsFor(T2), 0, 4), JL3 = jsFin(jsFor(T3), 0, 4);
// các dòng của bước 1: chỉ có ngoặc mở
function tail(cur, L, last){ return cur === last ? L : L; }

var EX = {
don: { inputs: [], chips: [],
 intro: 'Xem từng thuộc tính của User thành kiểu JSON nào. Bấm "Bước tiếp".',
 lines: function(){ return ['public class User', '{', '  public string Name { get; set; }', '  public int Age { get; set; }', '  public bool IsActive { get; set; }', '  public string? Email { get; set; }', '}', '', 'var u = new User', '{ Name = "An", Age = 20,', '  IsActive = true };', 'string json =', '  JsonSerializer.Serialize(u);', 'Console.WriteLine(json);']; },
 run: function(c){
  var full = JSON.stringify(jsPlain(T1));
  c.snap({ ln: 8, title: 'Một đối tượng User', body: 'User có bốn thuộc tính: chuỗi, số, bool và một chuỗi chưa có giá trị.', viz: jsPair(CS1, JL1, 1, false), vars: [['u', '→ User#1', 1]] });
  c.snap({ ln: 2, title: 'string thành chuỗi có nháy kép', body: 'Name = "An" thành "Name": "An". Chuỗi luôn nằm trong nháy kép.', viz: jsPair(CS1, JL1, 2, false) });
  c.snap({ ln: 3, title: 'int thành số', body: 'Age = 20 thành "Age": 20. Số không có nháy kép.', viz: jsPair(CS1, JL1, 3, false) });
  c.snap({ ln: 4, title: 'bool thành true hoặc false', body: 'IsActive = true thành "IsActive": true, viết thường và không có nháy kép.', viz: jsPair(CS1, JL1, 4, false) });
  c.snap({ ln: 5, title: 'null thành null', body: 'Email chưa gán nên là null, JSON ghi đúng chữ null.', viz: jsPair(CS1, JL1, 5, false) });
  c.out(full.replace(/,/g, ',\u200b'));
  c.snap({ ln: 13, title: 'Xong', body: 'JSON hoàn chỉnh: bốn thuộc tính, bốn kiểu giá trị. Hình hiện xuống dòng cho dễ đọc, chuỗi thật được viết liền.', note: 'string thành "...", số thành số, bool thành true/false, List thành [ ], đối tượng con thành { }.', viz: jsPair(CS1, JL1, 99, false) });
 }},
ds: { inputs: [], chips: [],
 intro: 'Một danh sách C# thành mảng JSON trong ngoặc vuông. Bấm "Bước tiếp".',
 lines: function(){ return ['public class User', '{', '  public string Name { get; set; }', '  public List<string> Skills', '    { get; set; }', '}', '', 'var u = new User', '{ Name = "An",', '  Skills = new List<string>', '    { "C#", "SQL" } };', 'string json =', '  JsonSerializer.Serialize(u);', 'Console.WriteLine(json);']; },
 run: function(c){
  var full = JSON.stringify(jsPlain(T2));
  c.snap({ ln: 7, title: 'User có danh sách kỹ năng', body: 'Ngoài Name, User có Skills là một List<string> chứa hai chuỗi.', viz: jsPair(CS2, JL2, 1, false), vars: [['u', '→ User#1', 1]] });
  c.snap({ ln: 2, title: 'Name như thường lệ', body: 'Name vẫn là chuỗi "An".', viz: jsPair(CS2, JL2, 2, false) });
  c.snap({ ln: 3, title: 'List thành ngoặc vuông', body: 'Skills là List nên JSON dùng cặp ngoặc vuông [ ] để chứa các phần tử.', viz: jsPair(CS2, JL2, 3, true) });
  c.snap({ ln: 10, title: 'Mỗi phần tử là một giá trị', body: 'Hai chuỗi "C#" và "SQL" thành hai phần tử trong mảng, cách nhau dấu phẩy.', viz: jsPair(CS2, JL2, 4, true) });
  c.out(full.replace(/,/g, ',\u200b'));
  c.snap({ ln: 13, title: 'Xong', body: 'JSON hoàn chỉnh có một mảng. Phần tử trong mảng giữ nguyên thứ tự như trong List.', note: 'string thành "...", số thành số, bool thành true/false, List thành [ ], đối tượng con thành { }.', viz: jsPair(CS2, JL2, 99, true) });
 }},
long: { inputs: [], chips: [],
 intro: 'Một đối tượng nằm trong đối tượng khác thành cặp ngoặc nhọn lồng nhau. Bấm "Bước tiếp".',
 lines: function(){ return ['public class Address', '{ public string City', '    { get; set; } }', '', 'public class User', '{', '  public string Name { get; set; }', '  public Address Address', '    { get; set; }', '}', '', 'string json =', '  JsonSerializer.Serialize(u);', 'Console.WriteLine(json);']; },
 run: function(c){
  var full = JSON.stringify(jsPlain(T3));
  c.snap({ ln: 4, title: 'User chứa một Address', body: 'Address là một lớp riêng, và User có thuộc tính kiểu Address.', viz: jsPair(CS3, JL3, 1, false), vars: [['u', '→ User#1', 1]] });
  c.snap({ ln: 6, title: 'Name như thường lệ', body: 'Name vẫn là chuỗi "An".', viz: jsPair(CS3, JL3, 2, false) });
  c.snap({ ln: 7, title: 'Đối tượng con thành ngoặc nhọn', body: 'Address là đối tượng nên JSON mở một cặp { } riêng ngay bên trong.', viz: jsPair(CS3, JL3, 3, true) });
  c.snap({ ln: 1, title: 'Thuộc tính của đối tượng con', body: 'City = "Hà Nội" thành "City": "Hà Nội" nằm trong cặp { } của Address.', viz: jsPair(CS3, JL3, 4, true) });
  c.out(full.replace(/,/g, ',\u200b'));
  c.snap({ ln: 13, title: 'Xong', body: 'JSON hoàn chỉnh có hai tầng ngoặc nhọn. Mặc định ký tự có dấu bị mã hóa thành \\uXXXX; dùng JavaScriptEncoder.UnsafeRelaxedJsonEscaping để giữ chữ "Hà Nội" dễ đọc.', note: 'string thành "...", số thành số, bool thành true/false, List thành [ ], đối tượng con thành { }.', viz: jsPair(CS3, JL3, 99, true) });
 }}
};
