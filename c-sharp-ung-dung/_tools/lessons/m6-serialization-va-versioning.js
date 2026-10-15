// META {"module":6,"lesson":"Các Kỹ Thuật Nâng Cao và Thực Tiễn","activity":"Serialization và Versioning của đối tượng","title":"Versioning của đối tượng","lead":"Lớp đã đổi (v2) nhưng JSON cũ (v1) vẫn còn. Chọn kiểu thay đổi rồi bấm <b>Bước tiếp</b>.","tabs":[["them","Thêm thuộc tính"],["xoa","Xóa thuộc tính"],["doiten","Đổi tên thuộc tính"]],"codeTitle":"Mã nguồn C#"}
var VJ = { Name: 'An', Age: 20 };
var VJ_STR = JSON.stringify(VJ);
var VJ_LINES = ['string json =', '  "{\\"Name\\":\\"An\\",\\"Age\\":20}";', ''];
// JSON v1: st = {Name:..., Age:...} trạng thái từng khóa
function vsJson(st, title){
  function kv(k, comma){ var s = st && st[k]; return [{ t: '"' + k + '"', c: 'key', s: s }, { t: ': ' }, { t: typeof VJ[k] === 'string' ? '"' + VJ[k] + '"' : String(VJ[k]), c: typeof VJ[k] === 'string' ? 'str' : 'num', s: s }, { t: comma ? ',' : '' }]; }
  return vText([{ t: '{' }, { seg: [{ t: '  ' }].concat(kv('Name', true)) }, { seg: [{ t: '  ' }].concat(kv('Age', false)) }, { t: '}' }], { title: title || 'JSON cũ (v1)', noNo: true });
}
// Bảng lớp v2: rows = [[tên thuộc tính, dữ liệu v1, kết quả, trạng thái]]
function vsClass(rows, title){
  var data = [['Thuộc tính v2', 'Dữ liệu v1', 'Kết quả']];
  rows.forEach(function(r){ data.push([{ t: r[0], s: r[3] }, { t: r[1], s: r[3] }, { t: r[2], s: r[3] }]); });
  return vGrid(data, { head: true, title: title || 'Lớp mới (v2)' });
}
var VS_LEGEND = vChips([{ t: 'khớp', s: 'ok' }, { t: 'thừa, bỏ qua', s: 'no' }, { t: 'mặc định', s: 'hi' }, { t: 'mất dữ liệu', s: 'bad' }], { title: 'Chú giải' });
function vsPair(js, cl){ return [vPair(js, cl, { mid: '→' }), VS_LEGEND]; }
function vsStr(x){ return x === null || x === undefined ? 'null' : (typeof x === 'string' ? '"' + x + '"' : String(x)); }
// Đọc JSON v1 theo danh sách thuộc tính v2 (so khớp phân biệt hoa thường, mặc định System.Text.Json)
function vsRead(props, jsonKeyOf){
  var src = JSON.parse(VJ_STR), res = {}, used = {};
  props.forEach(function(p){ var k = jsonKeyOf ? jsonKeyOf(p) : p.name; if (Object.prototype.hasOwnProperty.call(src, k)){ res[p.name] = src[k]; used[k] = true; } else res[p.name] = p.def; });
  return { res: res, used: used, unused: Object.keys(src).filter(function(k){ return !used[k]; }) };
}
var EX = {
them: { inputs: [], chips: [],
 intro: 'Lớp v2 có thêm thuộc tính Email, còn JSON cũ chưa có. Bấm "Bước tiếp".',
 lines: function(){ return VJ_LINES.concat(['public class User // v2', '{', '  public string Name { get; set; }', '  public int Age { get; set; }', '  public string? Email', '    { get; set; }', '}', '', 'var u = JsonSerializer', '  .Deserialize<User>(json);', 'Console.WriteLine(u.Email is null);']); },
 run: function(c){
  var r = vsRead([{ name: 'Name', def: null }, { name: 'Age', def: 0 }, { name: 'Email', def: null }]);
  var dim = { Name: 'dim', Age: 'dim' };
  function cls(rows){ return vsClass(rows); }
  var rowsPending = [['Name', '"An"', '?', 'dim'], ['Age', '20', '?', 'dim']];
  c.snap({ ln: 0, title: 'JSON cũ đã lưu', body: 'JSON v1 chỉ có Name và Age. Dữ liệu này đã nằm sẵn trong tệp hoặc cơ sở dữ liệu.', viz: vsPair(vsJson(null), vsClass([['(chưa xét)', '', '', 'dim']])) });
  c.snap({ ln: 7, title: 'Lớp v2 thêm Email', body: 'Lớp mới có thêm thuộc tính Email. JSON v1 không hề có khóa "Email".', viz: vsPair(vsJson(null), cls([['Name', '"An"', '?', 'dim'], ['Age', '20', '?', 'dim'], ['Email', '(không có)', '?', 'dim']])) });
  c.snap({ ln: 11, title: 'Deserialize: khớp và thiếu', body: 'Name và Age khớp nên được gán. Email không có dữ liệu nên giữ giá trị mặc định.', viz: vsPair(vsJson({ Name: 'ok', Age: 'ok' }), cls([['Name', '"An"', vsStr(r.res.Name), 'ok'], ['Age', '20', vsStr(r.res.Age), 'ok'], ['Email', '(không có)', vsStr(r.res.Email) + ' (mặc định)', 'hi']])) });
  c.out(r.res.Email === null ? 'True' : 'False');
  c.snap({ ln: 13, title: 'Đối tượng đọc được', body: 'Không có lỗi nào. u.Email là null, nên dòng kiểm tra in ' + (r.res.Email === null ? 'True' : 'False') + '.', viz: vsPair(vsJson({ Name: 'ok', Age: 'ok' }), cls([['Name', '"An"', vsStr(r.res.Name), 'ok'], ['Age', '20', vsStr(r.res.Age), 'ok'], ['Email', '(không có)', vsStr(r.res.Email), 'hi']])), vars: [['u.Name', S(r.res.Name)], ['u.Age', r.res.Age], ['u.Email', 'null', 1]] });
  c.snap({ ln: 13, title: 'Xong', body: 'Thêm thuộc tính mới không làm hỏng dữ liệu cũ, thuộc tính mới chỉ nhận giá trị mặc định.', note: 'Thêm thuộc tính thường an toàn; đổi tên phải giữ tên cũ trong JSON bằng [JsonPropertyName].', viz: vsPair(vsJson({ Name: 'ok', Age: 'ok' }), cls([['Name', '"An"', vsStr(r.res.Name), 'ok'], ['Age', '20', vsStr(r.res.Age), 'ok'], ['Email', '(không có)', 'null', 'hi']])) });
 }},
xoa: { inputs: [], chips: [],
 intro: 'Lớp v2 bỏ thuộc tính Age, còn JSON cũ vẫn có "Age". Bấm "Bước tiếp".',
 lines: function(){ return VJ_LINES.concat(['public class User // v2', '{', '  public string Name { get; set; }', '}', '', 'var u = JsonSerializer', '  .Deserialize<User>(json);', 'Console.WriteLine(u.Name);']); },
 run: function(c){
  var r = vsRead([{ name: 'Name', def: null }]);
  c.snap({ ln: 0, title: 'JSON cũ đã lưu', body: 'JSON v1 có Name và Age.', viz: vsPair(vsJson(null), vsClass([['(chưa xét)', '', '', 'dim']])) });
  c.snap({ ln: 5, title: 'Lớp v2 bỏ Age', body: 'Lớp mới chỉ còn Name. Không còn thuộc tính nào tên Age.', viz: vsPair(vsJson(null), vsClass([['Name', '"An"', '?', 'dim']])) });
  c.snap({ ln: 8, title: 'Deserialize: khóa thừa bị bỏ qua', body: 'Name khớp nên được gán. Khóa "Age" không có thuộc tính nào nhận, nên bị bỏ qua.', viz: vsPair(vsJson({ Name: 'ok', Age: 'no' }), vsClass([['Name', '"An"', vsStr(r.res.Name), 'ok'], ['(không có thuộc tính)', '20', 'bỏ qua', 'no']])) });
  c.out(r.res.Name);
  c.snap({ ln: 10, title: 'Không có lỗi', body: 'Chương trình chạy bình thường và in "' + r.res.Name + '". Dữ liệu Age chỉ đơn giản bị bỏ lại.', viz: vsPair(vsJson({ Name: 'ok', Age: 'no' }), vsClass([['Name', '"An"', vsStr(r.res.Name), 'ok'], ['(không có thuộc tính)', '20', 'bỏ qua', 'no']])), vars: [['u.Name', S(r.res.Name), 1]] });
  c.snap({ ln: 10, title: 'Xong', body: 'Mặc định System.Text.Json bỏ qua khóa lạ. Từ .NET 8 có thể bắt lỗi bằng JsonUnmappedMemberHandling.Disallow.', note: 'Thêm thuộc tính thường an toàn; đổi tên phải giữ tên cũ trong JSON bằng [JsonPropertyName].', viz: vsPair(vsJson({ Name: 'ok', Age: 'no' }), vsClass([['Name', '"An"', vsStr(r.res.Name), 'ok'], ['(không có thuộc tính)', '20', 'bỏ qua', 'no']])) });
 }},
doiten: { inputs: [], chips: [],
 intro: 'Lớp v2 đổi Name thành FullName. Dữ liệu cũ có bị mất không? Bấm "Bước tiếp".',
 lines: function(){ return VJ_LINES.concat(['public class User // v2', '{', '  // [JsonPropertyName("Name")]', '  public string FullName', '    { get; set; }', '  public int Age { get; set; }', '}', '', 'var u = JsonSerializer', '  .Deserialize<User>(json);', 'Console.WriteLine(u.FullName);']); },
 run: function(c){
  var bad = vsRead([{ name: 'FullName', def: null }, { name: 'Age', def: 0 }]);
  var fix = vsRead([{ name: 'FullName', def: null }, { name: 'Age', def: 0 }], function(p){ return p.name === 'FullName' ? 'Name' : p.name; });
  c.snap({ ln: 0, title: 'JSON cũ đã lưu', body: 'JSON v1 có "Name": "An" và "Age": 20.', viz: vsPair(vsJson(null), vsClass([['(chưa xét)', '', '', 'dim']])) });
  c.snap({ ln: 6, title: 'Lớp v2 đổi Name thành FullName', body: 'Thuộc tính mới tên FullName, trong khi JSON cũ vẫn dùng khóa "Name".', viz: vsPair(vsJson(null), vsClass([['FullName', '(không có khóa)', '?', 'dim'], ['Age', '20', '?', 'dim']])) });
  c.snap({ ln: 11, title: 'Deserialize: tên không khớp', body: 'Khóa "Name" không trùng thuộc tính nào, nên bị bỏ qua. FullName không nhận được dữ liệu. Age vẫn khớp.', viz: vsPair(vsJson({ Name: 'bad', Age: 'ok' }), vsClass([['FullName', '(không có khóa)', vsStr(bad.res.FullName), 'bad'], ['Age', '20', vsStr(bad.res.Age), 'ok']])) });
  c.out('');
  c.snap({ ln: 13, title: 'Mất dữ liệu', body: 'u.FullName là null nên in ra dòng trống. Tên "An" vẫn nằm trong JSON nhưng không ai đọc, và không có lỗi báo cho ta.', viz: vsPair(vsJson({ Name: 'bad', Age: 'ok' }), vsClass([['FullName', '(không có khóa)', vsStr(bad.res.FullName), 'bad'], ['Age', '20', vsStr(bad.res.Age), 'ok']])), vars: [['u.FullName', 'null', 1], ['u.Age', bad.res.Age]] });
  c.snap({ ln: 5, title: 'Cách sửa: [JsonPropertyName]', body: 'Bỏ dấu // ở dòng này để FullName đọc từ khóa cũ "Name" trong JSON.', viz: vsPair(vsJson({ Name: 'hi', Age: 'dim' }), vsClass([['FullName', '"Name"', '?', 'hi'], ['Age', '20', '?', 'dim']])) });
  c.out(fix.res.FullName);
  c.snap({ ln: 11, title: 'Đọc lại sau khi sửa', body: 'Giờ FullName khớp với khóa "Name", nên u.FullName = "' + fix.res.FullName + '".', viz: vsPair(vsJson({ Name: 'ok', Age: 'ok' }), vsClass([['FullName', '"Name"', vsStr(fix.res.FullName), 'ok'], ['Age', '20', vsStr(fix.res.Age), 'ok']])), vars: [['u.FullName', S(fix.res.FullName), 1], ['u.Age', fix.res.Age]] });
  c.snap({ ln: 13, title: 'Xong', body: 'Đổi tên thuộc tính làm mất dữ liệu cũ nếu không giữ lại tên cũ trong JSON.', note: 'Thêm thuộc tính thường an toàn; đổi tên phải giữ tên cũ trong JSON bằng [JsonPropertyName].', viz: vsPair(vsJson({ Name: 'ok', Age: 'ok' }), vsClass([['FullName', '"Name"', vsStr(fix.res.FullName), 'ok'], ['Age', '20', vsStr(fix.res.Age), 'ok']])) });
 }}
};
