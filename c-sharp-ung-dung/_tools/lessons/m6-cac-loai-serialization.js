// META {"module":6,"lesson":"Giới Thiệu về Serialization và Khái Niệm Cơ Bản","activity":"Các loại Serialization phổ biến trong C#","title":"Các loại Serialization","lead":"Cùng một đối tượng Product được lưu thành JSON, XML và nhị phân. Chọn từng định dạng rồi bấm <b>Bước tiếp</b>.","tabs":[["json","JSON"],["xml","XML"],["bin","Nhị phân"]],"codeTitle":"Mã nguồn C#"}
var svEnc = new TextEncoder();
function svHex(n){ return (n < 16 ? '0' : '') + n.toString(16).toUpperCase(); }
function svBin(id, name, price){
  var b = [], f = [];
  function push(a, k){ a.forEach(function(x){ b.push(x); f.push(k); }); }
  function i32(n){ return [n & 255, (n >> 8) & 255, (n >> 16) & 255, (n >> 24) & 255]; }
  var nb = Array.from(svEnc.encode(name));
  push(i32(id), 1); push([nb.length], 2); push(nb, 3); push(i32(price), 4);
  return { b: b, f: f };
}
var SV_OBJ = { Id: 7, Name: 'Bút', Price: 5000 };
var SV_JSON = JSON.stringify(SV_OBJ);
var SV_XML = '<Product><Id>' + SV_OBJ.Id + '</Id><Name>' + SV_OBJ.Name + '</Name><Price>' + SV_OBJ.Price + '</Price></Product>';
var SV_BIN = svBin(SV_OBJ.Id, SV_OBJ.Name, SV_OBJ.Price);
var SV_SZ = { json: svEnc.encode(SV_JSON).length, xml: svEnc.encode(SV_XML).length, bin: SV_BIN.b.length };
var SV_MAX = Math.max(SV_SZ.json, SV_SZ.xml, SV_SZ.bin);
function svCard(){ return vCard({ kind: 'info', title: 'Product', rows: [['Id', SV_OBJ.Id], ['Name', '"' + SV_OBJ.Name + '"'], ['Price', SV_OBJ.Price]] }); }
function svBar(key, label, show){ return vBuf({ label: 'Kích thước ' + label, fill: show ? SV_SZ[key] / SV_MAX * 100 : 0, text: show ? SV_SZ[key] + ' byte' : 'chưa đếm' }); }
function svJsonText(hiKey){
  var segs = [{ t: '{' }];
  var keys = Object.keys(SV_OBJ);
  keys.forEach(function(k, i){
    var v = SV_OBJ[k], hi = hiKey === k ? 'hi' : undefined;
    segs.push({ t: '"' + k + '"', c: 'key', s: hi }, { t: ':' }, { t: typeof v === 'string' ? '"' + v + '"' : String(v), c: typeof v === 'string' ? 'str' : 'num', s: hi });
    if (i < keys.length - 1) segs.push({ t: ',' });
  });
  segs.push({ t: '}' });
  return vText([{ seg: segs }], { title: 'JSON', noNo: true });
}
function svXmlText(hiTag){
  function ln(tag, val){ var hi = hiTag === tag ? 'hi' : undefined; return { seg: [{ t: '  <' + tag + '>', c: 'tag', s: hi }, { t: String(val), s: hi }, { t: '</' + tag + '>', c: 'tag', s: hi }] }; }
  return vText([{ seg: [{ t: '<Product>', c: 'tag' }] }, ln('Id', SV_OBJ.Id), ln('Name', SV_OBJ.Name), ln('Price', SV_OBJ.Price), { seg: [{ t: '</Product>', c: 'tag' }] }], { title: 'XML', noNo: true });
}
function svPlaceholder(t){ return vText([{ t: '(chưa có kết quả)', s: 'dim' }], { title: t, noNo: true }); }
function svTable(cur){
  var rows = [['Định dạng', 'Dễ đọc', 'Số byte', 'Dùng khi'],
    ['JSON', 'Rất dễ', SV_SZ.json, 'trao đổi dữ liệu web'],
    ['XML', 'Dễ, dài dòng', SV_SZ.xml, 'cấu hình, hệ thống cũ'],
    ['Nhị phân', 'Không đọc được', SV_SZ.bin, 'cần gọn, nhanh']];
  var idx = { json: 1, xml: 2, bin: 3 }[cur];
  return vGrid(rows, { head: true, hiRow: idx, title: 'So sánh ba định dạng' });
}
var SV_HEAD = ['var p = new Product', '{ Id = 7, Name = "Bút",', '  Price = 5000 };', ''];
var EX = {
json: { inputs: [], chips: [],
 intro: 'Lưu đối tượng Product thành chuỗi JSON. Bấm "Bước tiếp".',
 lines: function(){ return SV_HEAD.concat(['string s =', '  JsonSerializer.Serialize(p);', 'Console.WriteLine(s);', 'Console.WriteLine(', '  Encoding.UTF8', '    .GetByteCount(s));']); },
 run: function(c){
  c.snap({ ln: 0, title: 'Đối tượng Product', body: 'Đây là đối tượng trong bộ nhớ. Ta sẽ lưu nó thành chuỗi JSON.', viz: [svCard(), svPlaceholder('JSON'), svBar('json', 'JSON', false)], vars: [['p', '→ Product#1', 1]] });
  c.snap({ ln: 5, title: 'Serialize ra JSON', body: 'JsonSerializer.Serialize biến đối tượng thành một chuỗi văn bản JSON.', viz: [svCard(), svJsonText(), svBar('json', 'JSON', false)], vars: [['p', '→ Product#1']] });
  c.out(SV_JSON);
  c.snap({ ln: 6, title: 'Đọc thử chuỗi JSON', body: 'Mỗi thuộc tính là một cặp "khóa": giá trị. Người đọc hiểu ngay. Mặc định ký tự có dấu bị mã hóa thành \\u00FA, hình này dùng UnsafeRelaxedJsonEscaping để dễ đọc.', viz: [svCard(), svJsonText('Name'), svBar('json', 'JSON', false)] });
  c.out('Số byte: ' + SV_SZ.json);
  c.snap({ ln: 7, title: 'Đếm số byte', body: 'Chuỗi JSON này chiếm ' + SV_SZ.json + ' byte khi lưu dạng UTF-8 (chữ "ú" chiếm 2 byte).', viz: [svCard(), svJsonText(), svBar('json', 'JSON', true)], vars: [['byte', SV_SZ.json, 1]] });
  c.snap({ ln: 6, title: 'Xong', body: 'JSON gọn, dễ đọc, nên là lựa chọn phổ biến nhất hiện nay.', note: 'JSON gọn và dễ đọc (phổ biến nhất); XML dài hơn nhưng chặt chẽ; nhị phân gọn nhất nhưng người không đọc được.', viz: [svCard(), svTable('json')] });
 }},
xml: { inputs: [], chips: [],
 intro: 'Lưu cùng đối tượng Product thành XML bằng XmlSerializer. Bấm "Bước tiếp".',
 lines: function(){ return SV_HEAD.concat(['var xs = new XmlSerializer(', '  typeof(Product));', 'var sw = new StringWriter();', 'xs.Serialize(sw, p);', 'var s = sw.ToString();', 'Console.WriteLine(s);', 'Console.WriteLine(', '  Encoding.UTF8', '    .GetByteCount(s));']); },
 run: function(c){
  c.snap({ ln: 0, title: 'Đối tượng Product', body: 'Vẫn là đối tượng Product ở bước đầu của tab JSON.', viz: [svCard(), svPlaceholder('XML'), svBar('xml', 'XML', false)], vars: [['p', '→ Product#1', 1]] });
  c.snap({ ln: 7, title: 'Serialize ra XML', body: 'XmlSerializer ghi mỗi thuộc tính thành một phần tử có thẻ mở và thẻ đóng. Bản thật còn có dòng khai báo xml ở đầu, bài này lược bỏ cho gọn.', viz: [svCard(), svXmlText(), svBar('xml', 'XML', false)], vars: [['p', '→ Product#1']] });
  c.snap({ ln: 7, title: 'Cặp thẻ mở và đóng', body: 'Giá trị 7 nằm giữa <Id> và </Id>. Thẻ lặp lại tên nên XML dài hơn JSON.', viz: [svCard(), svXmlText('Id'), svBar('xml', 'XML', false)] });
  c.out(SV_XML);
  c.snap({ ln: 9, title: 'In chuỗi XML', body: 'Chuỗi XML viết liền, không tính thụt lề. Các thẻ rõ ràng nên cấu trúc chặt chẽ.', viz: [svCard(), svXmlText(), svBar('xml', 'XML', false)] });
  c.out('Số byte: ' + SV_SZ.xml);
  c.snap({ ln: 10, title: 'Đếm số byte', body: 'Chuỗi XML chiếm ' + SV_SZ.xml + ' byte, nhiều hơn JSON (' + SV_SZ.json + ' byte) vì phải lặp tên thẻ.', viz: [svCard(), svXmlText(), svBar('xml', 'XML', true)], vars: [['byte', SV_SZ.xml, 1]] });
  c.snap({ ln: 9, title: 'Xong', body: 'XML dài hơn JSON nhưng cấu trúc chặt chẽ, nhiều hệ thống cũ vẫn dùng.', note: 'JSON gọn và dễ đọc (phổ biến nhất); XML dài hơn nhưng chặt chẽ; nhị phân gọn nhất nhưng người không đọc được.', viz: [svCard(), svTable('xml')] });
 }},
bin: { inputs: [], chips: [],
 intro: 'Lưu cùng đối tượng thành nhị phân bằng BinaryWriter. Bấm "Bước tiếp".',
 lines: function(){ return SV_HEAD.concat(['using var ms = new MemoryStream();', 'using var w = new BinaryWriter(ms);', 'w.Write(p.Id);', 'w.Write(p.Name);', 'w.Write(p.Price);', 'Console.WriteLine(ms.Length);']); },
 run: function(c){
  function cells(n){ return vCells(SV_BIN.b.slice(0, n).map(function(x, i){ return { v: svHex(x), s: 'f' + SV_BIN.f[i] }; }), { cap: SV_BIN.b.length, small: true, name: 'Dải byte (hex)' }); }
  var legend = vChips([{ t: 'Id', s: 'f1', label: '4 byte' }, { t: 'độ dài', s: 'f2', label: '1 byte' }, { t: 'Name', s: 'f3', label: '4 byte' }, { t: 'Price', s: 'f4', label: '4 byte' }], { title: 'Các trường' });
  var visible = SV_BIN.b.map(function(x){ return x >= 32 && x < 127 ? String.fromCharCode(x) : '·'; }).join('');
  c.snap({ ln: 0, title: 'Đối tượng Product', body: 'Dùng BinaryWriter ghi từng trường của Product thành byte. Chi tiết xem ở bài Binary Serialization.', viz: [svCard(), cells(0)], vars: [['p', '→ Product#1', 1]] });
  c.snap({ ln: 6, title: 'Ghi Id', body: 'Số nguyên Id = 7 chiếm 4 byte, byte thấp ghi trước.', viz: [svCard(), cells(4), legend] });
  c.snap({ ln: 7, title: 'Ghi Name', body: 'Chuỗi gồm 1 byte độ dài rồi các byte UTF-8. "Bút" có ' + SV_BIN.f.filter(function(f){ return f === 3; }).length + ' byte vì "ú" chiếm 2 byte.', viz: [svCard(), cells(9), legend] });
  c.snap({ ln: 8, title: 'Ghi Price', body: 'Price = 5000 chiếm 4 byte, cũng byte thấp trước.', viz: [svCard(), cells(13), legend] });
  c.out(String(SV_SZ.bin));
  c.snap({ ln: 9, title: 'Số byte và khả năng đọc', body: 'Tổng cộng ' + SV_SZ.bin + ' byte, gọn nhất. Nhưng mở bằng trình xem văn bản chỉ thấy ký tự lạ.', viz: [svCard(), cells(13), vText([visible], { title: 'Mở như văn bản', noNo: true }), svBar('bin', 'nhị phân', true)], vars: [['ms.Length', SV_SZ.bin, 1]] });
  c.snap({ ln: 9, title: 'Xong', body: 'Nhị phân gọn nhất nhưng người không đọc được, phải biết đúng thứ tự trường mới đọc lại được.', note: 'JSON gọn và dễ đọc (phổ biến nhất); XML dài hơn nhưng chặt chẽ; nhị phân gọn nhất nhưng người không đọc được.', viz: [svCard(), svTable('bin')] });
 }}
};
