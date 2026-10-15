// META {"module":6,"lesson":"Các Kỹ Thuật Nâng Cao và Thực Tiễn","activity":"Xử lý các trường `[NonSerialized]` và `[JsonIgnore]`","title":"Bỏ qua thuộc tính với [JsonIgnore]","lead":"Cùng một User có mật khẩu: bên trái lưu hết, bên phải gắn <b>[JsonIgnore]</b>. Bấm <b>Bước tiếp</b> để hai cột cùng chạy.","tabs":[["x","Mật khẩu"]],"codeTitle":"Mã nguồn C#"}
var IG = { Name: 'An', Password: '123456' };
function igSegs(line, warn){
  var segs = [], re = /("(?:[^"\\]|\\.)*")(\s*:)?|(-?\d+)|\b(true|false|null)\b|[\s\S]/g, m;
  while ((m = re.exec(line))){
    var isPw = m[1] && m[2] && m[1] === '"Password"';
    if (m[1] && m[2]) segs.push({ t: m[1], c: 'key', s: warn && isPw ? 'bad' : undefined }, { t: m[2] });
    else if (m[1]) segs.push({ t: m[1], c: 'str' });
    else if (m[3]) segs.push({ t: m[3], c: 'num' });
    else segs.push({ t: m[0] });
  }
  return segs;
}
// Dòng JSON: dòng chứa Password tô đỏ khi warn
function igJson(obj, warn, title){
  var lines = JSON.stringify(obj, null, 2).split('\n').map(function(l){
    var bad = warn && l.indexOf('"Password"') >= 0;
    return { seg: igSegs(l, false).map(function(g){ return { t: g.t, c: g.c, s: bad ? 'bad' : undefined }; }) };
  });
  return vText(lines, { title: title || 'JSON', noNo: true });
}
function igNone(t){ return vText([{ t: '(chưa có)', s: 'dim' }], { title: t, noNo: true }); }
function igUser(u, st, title, ignored){
  function v(x){ return x === null ? 'null' : '"' + x + '"'; }
  return vGrid([['Thuộc tính', 'Giá trị'],
    [{ t: 'Name', s: st && st.Name }, { t: v(u.Name), s: st && st.Name }],
    [{ t: 'Password' + (ignored ? ' [JsonIgnore]' : ''), s: st && st.Password }, { t: v(u.Password), s: st && st.Password }]], { head: true, title: title || 'Đối tượng User' });
}
function igTable(){
  return vGrid([['Bộ serializer', 'Thuộc tính bỏ qua'], ['System.Text.Json', '[JsonIgnore]'], ['XmlSerializer', '[XmlIgnore]'], ['BinaryFormatter (đã bị loại bỏ)', '[NonSerialized]']], { head: true, title: 'Bỏ qua theo từng bộ serializer' });
}
function igRun(ignore){
  return function(c){
    var obj = {}; obj.Name = IG.Name; if (!ignore) obj.Password = IG.Password;
    var s = JSON.stringify(obj);
    var u2 = { Name: JSON.parse(s).Name, Password: JSON.parse(s).Password === undefined ? null : JSON.parse(s).Password };
    var warnLeak = !ignore;
    c.snap({ ln: ignore ? 8 : 7, title: 'Tạo User', body: 'User có Name = "An" và Password = "123456".', viz: [igUser(IG, null, 'User', ignore), igNone('JSON')], vars: [['u', '→ User#1', 1]] });
    c.snap({ ln: ignore ? 11 : 10, title: 'Serialize', body: ignore ? 'Password có [JsonIgnore] nên bị bỏ qua. JSON chỉ có Name.' : 'Không có gì loại trừ, cả hai thuộc tính đều được ghi vào JSON.', viz: [igUser(IG, ignore ? { Password: 'dim' } : { Name: 'hi', Password: 'bad' }, 'User', ignore), igJson(obj, warnLeak)], vars: [['s', '(chuỗi JSON)', 1]] });
    c.out(s.replace(/,/g, ',​'));
    c.snap({ ln: ignore ? 15 : 14, title: 'In JSON ra', body: ignore ? 'Không có mật khẩu trong chuỗi. Lưu ra tệp hay gửi đi cũng an toàn hơn.' : 'Mật khẩu nằm ngay trong chuỗi. Ai mở tệp hay bắt được dữ liệu đều đọc được.', viz: [igUser(IG, ignore ? { Password: 'dim' } : { Password: 'bad' }, 'User', ignore), igJson(obj, warnLeak), vCard({ kind: ignore ? 'ok' : 'warn', title: ignore ? 'Không lộ mật khẩu' : 'Lộ mật khẩu', sub: ignore ? 'JSON chỉ có Name.' : 'JSON chứa "Password":"123456".' })] });
    c.snap({ ln: ignore ? 13 : 12, title: 'Deserialize lại', body: ignore ? 'JSON không có Password nên u2.Password nhận giá trị mặc định là null.' : 'JSON có cả hai thuộc tính nên u2 khôi phục đủ Name và Password.', viz: [igJson(obj, warnLeak), igUser(u2, ignore ? { Name: 'ok', Password: 'bad' } : { Name: 'ok', Password: 'ok' }, 'u2 sau khi đọc lại', ignore)], vars: [['u2.Name', S(u2.Name)], ['u2.Password', u2.Password === null ? 'null' : S(u2.Password), 1]] });
    c.snap({ ln: ignore ? 13 : 12, title: 'Xong', body: ignore ? 'Password không được lưu, đọc lại thì mất (null). Đó là điều ta muốn với dữ liệu nhạy cảm.' : 'Đọc lại đủ dữ liệu, nhưng mật khẩu đã bị lưu lộ liễu trong JSON.', note: ignore ? 'Dùng [JsonIgnore] cho dữ liệu nhạy cảm hoặc dữ liệu tính được; khi đọc lại, thuộc tính đó nhận giá trị mặc định.' : 'Không có [JsonIgnore], mọi thuộc tính public đều bị ghi, kể cả mật khẩu.', viz: [igUser(u2, ignore ? { Password: 'bad' } : { Password: 'ok' }, 'u2', ignore), igTable()] });
  };
}
var IG_HEAD = ['public class User', '{', '  public string Name { get; set; }'];
var IG_TAIL = ['  public string Password', '  { get; set; }', '}', '', 'var u = new User', '{ Name = "An",', '  Password = "123456" };', 'string s =', '  JsonSerializer.Serialize(u);', 'var u2 = JsonSerializer', '  .Deserialize<User>(s);', 'Console.WriteLine(s);'];
var EX = { x: {
 intro: 'Hai cột cùng lưu một User. Hãy để ý JSON có mật khẩu hay không.',
 running: 'Cả hai cột đều serialize User, rồi đọc lại bằng Deserialize.',
 done: 'Bên trái JSON chứa mật khẩu và đọc lại được. Bên phải không có mật khẩu và đọc lại thì Password = null.',
 note: 'Dùng [JsonIgnore] cho dữ liệu nhạy cảm hoặc dữ liệu tính được; khi đọc lại, thuộc tính đó nhận giá trị mặc định. [NonSerialized] dành cho BinaryFormatter (đã bị loại bỏ), XmlSerializer dùng [XmlIgnore].',
 cols: [
  { title: 'Không có [JsonIgnore]', sub: 'Mọi thuộc tính public đều được ghi.', lines: IG_HEAD.concat(IG_TAIL), run: igRun(false) },
  { title: 'Có [JsonIgnore]', sub: 'Password bị loại khỏi JSON.', lines: IG_HEAD.concat(['  [JsonIgnore]'], IG_TAIL), run: igRun(true) }
 ] } };
