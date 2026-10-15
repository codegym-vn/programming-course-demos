// META {"module":6,"lesson":"JSON Serialization với System.Text.Json","activity":"Sử dụng `System.Text.Json` cơ bản","title":"System.Text.Json cơ bản","lead":"Ba tùy chọn hay dùng và cái bẫy chữ hoa chữ thường. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["indent","WriteIndented"],["camel","Tên camelCase"],["doc","Đọc JSON chữ thường"]],"codeTitle":"Mã nguồn C#"}
var PJ = { Name: 'An', Age: 20 };
function pjCamel(k){ return k.charAt(0).toLowerCase() + k.slice(1); }
function pjMap(o, f){ var r = {}; Object.keys(o).forEach(function(k){ r[f(k)] = o[k]; }); return r; }
// Tách một dòng JSON thành các đoạn có màu; hiKey: tên khóa cần tô vàng
function pjSegs(line, hi){
  var segs = [], re = /("(?:[^"\\]|\\.)*")(\s*:)?|(-?\d+)|\b(true|false|null)\b|[\s\S]/g, m;
  while ((m = re.exec(line))){
    if (m[1] && m[2]){ var key = m[1].slice(1, -1); segs.push({ t: m[1], c: 'key', s: hi && hi.indexOf(key) >= 0 ? 'hi' : undefined }, { t: m[2] }); }
    else if (m[1]) segs.push({ t: m[1], c: 'str' });
    else if (m[3]) segs.push({ t: m[3], c: 'num' });
    else if (m[4]) segs.push({ t: m[4], c: m[4] === 'null' ? 'null' : 'bool' });
    else segs.push({ t: m[0] });
  }
  return { seg: segs };
}
function pjText(str, title, hi){ return vText(str.split('\n').map(function(l){ return pjSegs(l, hi); }), { title: title, noNo: true }); }
function pjNone(title){ return vText([{ t: '(chưa có)', s: 'dim' }], { title: title, noNo: true }); }
function pjPerson(name, age, st, title){
  function v(x){ return x === null ? 'null' : (typeof x === 'string' ? '"' + x + '"' : String(x)); }
  return vGrid([['Thuộc tính', 'Giá trị'], [{ t: 'Name', s: st && st.Name }, { t: v(name), s: st && st.Name }], [{ t: 'Age', s: st && st.Age }, { t: v(age), s: st && st.Age }]], { head: true, title: title || 'Đối tượng Person' });
}
var EX = {
indent: { inputs: [], chips: [],
 intro: 'Cùng một Person, serialize hai lần với WriteIndented khác nhau. Bấm "Bước tiếp".',
 lines: function(){ return ['var p = new Person', '  { Name = "An", Age = 20 };', '', 'var o1 = new JsonSerializerOptions', '  { WriteIndented = false };', 'var o2 = new JsonSerializerOptions', '  { WriteIndented = true };', '', 'string s1 =', '  JsonSerializer.Serialize(p, o1);', 'string s2 =', '  JsonSerializer.Serialize(p, o2);', 'Console.WriteLine(s1);', 'Console.WriteLine(s2);']; },
 run: function(c){
  var s1 = JSON.stringify(PJ), s2 = JSON.stringify(PJ, null, 2);
  var TA = 'WriteIndented = false', TB = 'WriteIndented = true';
  function two(a, b, hiA, hiB){ return vPair(a, b, { ta: TA, tb: TB }); }
  c.snap({ ln: 0, title: 'Đối tượng Person', body: 'Person có Name = "An" và Age = 20. Ta sẽ chuyển nó thành JSON hai kiểu.', viz: [pjPerson(PJ.Name, PJ.Age), two(pjNone('JSON'), pjNone('JSON'))], vars: [['p', '→ Person#1', 1]] });
  c.snap({ ln: 4, title: 'Tùy chọn WriteIndented = false', body: 'Đây cũng là giá trị mặc định: JSON viết liền trên một dòng.', viz: [two(pjNone('JSON'), pjNone('JSON'))], vars: [['o1.WriteIndented', 'false', 1]] });
  c.snap({ ln: 9, title: 'Serialize với o1', body: 'Kết quả là một dòng gọn, không có khoảng trắng thừa.', viz: [two(pjText(s1, 'một dòng'), pjNone('JSON'))], vars: [['s1', S(s1), 1]] });
  c.snap({ ln: 6, title: 'Tùy chọn WriteIndented = true', body: 'Bật tùy chọn này để JSON xuống dòng và thụt lề.', viz: [two(pjText(s1, 'một dòng'), pjNone('JSON'))], vars: [['o2.WriteIndented', 'true', 1]] });
  c.snap({ ln: 11, title: 'Serialize với o2', body: 'Mỗi thuộc tính nằm trên một dòng riêng, thụt vào 2 dấu cách.', viz: [two(pjText(s1, 'một dòng'), pjText(s2, 'nhiều dòng'))], vars: [['s2', '(nhiều dòng)', 1]] });
  c.out(s1);
  c.snap({ ln: 12, title: 'In s1', body: 'Một dòng duy nhất.', viz: [two(pjText(s1, 'một dòng'), pjText(s2, 'nhiều dòng'))] });
  s2.split('\n').forEach(function(l){ c.out(l); });
  c.snap({ ln: 13, title: 'Xong', body: 'Nội dung giống hệt nhau, chỉ khác cách trình bày. Một dòng hợp để lưu hoặc gửi, nhiều dòng hợp để người đọc.', note: 'WriteIndented = true cho JSON dễ đọc (xuống dòng, thụt lề); mặc định là false.', viz: [two(pjText(s1, 'một dòng'), pjText(s2, 'nhiều dòng'))] });
 }},
camel: { inputs: [], chips: [],
 intro: 'Mặc định tên khóa JSON giống tên thuộc tính C#. Đổi sang camelCase thì sao? Bấm "Bước tiếp".',
 lines: function(){ return ['var p = new Person', '  { Name = "An", Age = 20 };', '', 'string a =', '  JsonSerializer.Serialize(p);', '', 'var o = new JsonSerializerOptions', '{', '  PropertyNamingPolicy =', '    JsonNamingPolicy.CamelCase', '};', 'string b =', '  JsonSerializer.Serialize(p, o);', 'Console.WriteLine(a);', 'Console.WriteLine(b);']; },
 run: function(c){
  var a = JSON.stringify(PJ), b = JSON.stringify(pjMap(PJ, pjCamel));
  function two(x, y){ return vPair(x, y, { ta: 'Mặc định', tb: 'CamelCase' }); }
  c.snap({ ln: 0, title: 'Đối tượng Person', body: 'Thuộc tính trong C# viết hoa chữ đầu: Name, Age.', viz: [pjPerson(PJ.Name, PJ.Age), two(pjNone('JSON'), pjNone('JSON'))], vars: [['p', '→ Person#1', 1]] });
  c.snap({ ln: 4, title: 'Serialize mặc định', body: 'Khóa JSON giữ nguyên tên thuộc tính: "Name" và "Age" (PascalCase).', viz: [two(pjText(a, 'JSON', ['Name', 'Age']), pjNone('JSON'))], vars: [['a', S(a), 1]] });
  c.snap({ ln: 8, title: 'Đặt PropertyNamingPolicy', body: 'JsonNamingPolicy.CamelCase yêu cầu viết thường chữ cái đầu của mỗi khóa.', viz: [two(pjText(a, 'JSON'), pjNone('JSON'))] });
  c.snap({ ln: 12, title: 'Serialize với tùy chọn', body: 'Khóa trở thành "name" và "age". Giá trị không đổi.', viz: [two(pjText(a, 'JSON'), pjText(b, 'JSON', ['name', 'age']))], vars: [['b', S(b), 1]] });
  c.out(a); c.out(b);
  c.snap({ ln: 14, title: 'Xong', body: 'In ra hai chuỗi: một chuỗi khóa PascalCase, một chuỗi khóa camelCase. Nhiều API web quen dùng camelCase.', note: 'PropertyNamingPolicy = JsonNamingPolicy.CamelCase đổi tên khóa JSON thành "name", "age" mà không cần đổi tên thuộc tính C#.', viz: [two(pjText(a, 'JSON'), pjText(b, 'JSON'))] });
 }},
doc: { inputs: [], chips: [],
 intro: 'Đọc JSON có khóa chữ thường vào lớp Person. Bấm "Bước tiếp".',
 lines: function(){ return ['string json =', '  "{\\"name\\":\\"An\\",\\"age\\":20}";', '', 'var p1 = JsonSerializer', '  .Deserialize<Person>(json);', 'Console.WriteLine(p1.Name);', '', 'var o = new JsonSerializerOptions', '{', '  PropertyNameCaseInsensitive', '    = true', '};', 'var p2 = JsonSerializer', '  .Deserialize<Person>(json, o);', 'Console.WriteLine(p2.Name);']; },
 run: function(c){
  var json = JSON.stringify({ name: 'An', age: 20 });
  var props = ['Name', 'Age'];
  // so khớp thật: mặc định phân biệt hoa thường
  function match(ci){ var res = {}; props.forEach(function(p){ var key = Object.keys(JSON.parse(json)).filter(function(k){ return ci ? k.toLowerCase() === p.toLowerCase() : k === p; })[0]; res[p] = key ? JSON.parse(json)[key] : (p === 'Name' ? null : 0); res[p + '_ok'] = !!key; }); return res; }
  var m1 = match(false), m2 = match(true);
  function jsonBox(hi){ return pjText(json, 'JSON nhận vào', hi); }
  function table(m, state){
    return vGrid([['Khóa JSON', 'Thuộc tính', 'Khớp?'],
      [{ t: '"name"', s: state }, { t: 'Name', s: state }, { t: state === 'hi' ? '...' : (m.Name_ok ? 'khớp' : 'khác chữ hoa'), s: state }],
      [{ t: '"age"', s: state }, { t: 'Age', s: state }, { t: state === 'hi' ? '...' : (m.Age_ok ? 'khớp' : 'khác chữ hoa'), s: state }]], { head: true, title: 'So khớp tên' });
  }
  c.snap({ ln: 0, title: 'JSON có khóa chữ thường', body: 'Chuỗi JSON có "name" và "age" viết thường, trong khi Person có Name và Age viết hoa chữ đầu.', viz: [jsonBox(), pjPerson(null, null, null, 'Person (chưa đọc)')] });
  c.snap({ ln: 4, title: 'Deserialize với tùy chọn mặc định', body: 'Mặc định System.Text.Json phân biệt chữ hoa thường khi so khớp tên.', viz: [jsonBox(['name', 'age']), table(m1, 'hi')] });
  c.snap({ ln: 4, title: 'Không khớp nên bị bỏ qua', body: '"name" khác "Name", "age" khác "Age". Không có lỗi nào, các khóa chỉ bị bỏ qua.', viz: [jsonBox(), table(m1, 'bad')] });
  c.out('');
  c.snap({ ln: 5, title: 'Kết quả p1: Name = null, Age = 0', body: 'Person được tạo ra nhưng các thuộc tính giữ giá trị mặc định, chương trình in ra dòng trống.', viz: [jsonBox(), pjPerson(m1.Name, m1.Age, { Name: 'bad', Age: 'bad' }, 'p1 (mặc định)')], vars: [['p1.Name', 'null', 1], ['p1.Age', m1.Age, 1]] });
  c.snap({ ln: 9, title: 'Bật PropertyNameCaseInsensitive', body: 'Tùy chọn này cho phép "name" khớp với Name, không phân biệt chữ hoa thường.', viz: [jsonBox(), table(m1, 'dim')], vars: [['o.PropertyNameCaseInsensitive', 'true', 1]] });
  c.snap({ ln: 13, title: 'Deserialize lại với o', body: 'Lần này "name" khớp Name và "age" khớp Age.', viz: [jsonBox(['name', 'age']), table(m2, 'ok')] });
  c.out(m2.Name);
  c.snap({ ln: 14, title: 'Xong', body: 'Kết quả p2: Name = "An", Age = 20. Cùng JSON nhưng đọc đúng nhờ tùy chọn.', note: 'Mặc định System.Text.Json phân biệt chữ hoa thường khi đọc; dùng PropertyNameCaseInsensitive hoặc đặt tên khớp. (ASP.NET Core đã bật sẵn, ứng dụng console thì chưa.)', viz: [jsonBox(), pjPerson(m2.Name, m2.Age, { Name: 'ok', Age: 'ok' }, 'p2 (không phân biệt hoa thường)')], vars: [['p2.Name', S(m2.Name)], ['p2.Age', m2.Age]] });
 }}
};
