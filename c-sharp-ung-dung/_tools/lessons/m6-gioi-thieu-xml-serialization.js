// META {"module":6,"lesson":"XML Serialization","activity":"Giới thiệu XML Serialization","title":"Giới thiệu XML Serialization","lead":"XmlSerializer chuyển thuộc tính public của đối tượng thành phần tử XML. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["ser","Serialize"],["deser","Deserialize"],["ctor","Thiếu constructor không tham số"]],"codeTitle":"Mã nguồn C#"}
var XM = { Id: 7, Name: 'Bút', Price: 5000 };
var XM_PRIVATE = { name: 'cost', val: 3000 };
var XM_CLASS = ['public class Product', '{', '  public int Id { get; set; }', '  public string Name { get; set; }', '  public int Price { get; set; }', '  private int cost = 3000;', '}'];
var XM_COLORS = { Id: 'f1', Name: 'f2', Price: 'f3' };
// Thẻ đối tượng: tr = {Id, Name, Price: trạng thái} ; vals: giá trị (null = chưa có)
function xmCard(vals, st, title){
  function cell(k, label){ var s = st && st[k]; var v = vals ? vals[k] : undefined; var t = v === undefined || v === null ? (vals ? 'null' : '') : (typeof v === 'string' ? '"' + v + '"' : String(v)); if (vals && k === 'Name' && v === null) t = 'null'; return [{ t: label, s: s }, { t: t, s: s }]; }
  return vGrid([['Thành viên', 'Giá trị'], cell('Id', 'Id'), cell('Name', 'Name'), cell('Price', 'Price'), [{ t: 'cost (private)', s: st && st.cost }, { t: vals ? String(XM_PRIVATE.val) : '', s: st && st.cost }]], { head: true, title: title || 'Đối tượng Product' });
}
function xmLine(tag, val, s){ return { seg: [{ t: '  <' + tag + '>', c: 'tag', s: s }, { t: String(val), s: s }, { t: '</' + tag + '>', c: 'tag', s: s }] }; }
// xml: những thẻ đã có (mảng tên) ; st: trạng thái từng thẻ
function xmXml(shown, st, title){
  if (!shown.length) return vText([{ t: '(chưa có XML)', s: 'dim' }], { title: title || 'XML', noNo: true });
  var lines = [{ seg: [{ t: '<Product>', c: 'tag' }] }];
  shown.forEach(function(k){ lines.push(xmLine(k, XM[k], st && st[k])); });
  lines.push({ seg: [{ t: '</Product>', c: 'tag' }] });
  return vText(lines, { title: title || 'XML', noNo: true });
}
var EX = {
ser: { inputs: [], chips: [],
 intro: 'Xem XmlSerializer biến từng thuộc tính của Product thành một phần tử XML. Bấm "Bước tiếp".',
 lines: function(){ return XM_CLASS.concat(['', 'var xs = new XmlSerializer(', '  typeof(Product));', 'var sw = new StringWriter();', 'xs.Serialize(sw, p);']); },
 run: function(c){
  var pub = { Id: 'hi', Name: 'hi', Price: 'hi', cost: 'dim' };
  c.snap({ ln: 0, title: 'Lớp Product', body: 'Product có ba thuộc tính public và một trường private là cost.', viz: [vPair(xmCard(XM, null), xmXml([]), { ta: 'Đối tượng', tb: 'XML', mid: '→' })], vars: [['p', '→ Product#1', 1]] });
  c.snap({ ln: 8, title: 'Tạo XmlSerializer', body: 'new XmlSerializer(typeof(Product)) xem lớp để biết những thành viên public nào sẽ được ghi.', viz: [vPair(xmCard(XM, pub), xmXml([]), { ta: 'Đối tượng', tb: 'XML', mid: '→' })] });
  c.snap({ ln: 11, title: 'Ghi Id', body: 'Thuộc tính public Id thành phần tử <Id>7</Id>.', viz: [vPair(xmCard(XM, { Id: 'f1', Name: 'dim', Price: 'dim', cost: 'dim' }), xmXml(['Id'], { Id: 'f1' }), { ta: 'Đối tượng', tb: 'XML', mid: '→' })] });
  c.snap({ ln: 11, title: 'Ghi Name và Price', body: 'Name và Price cũng thành phần tử riêng, mỗi cái cùng màu với thuộc tính của nó.', viz: [vPair(xmCard(XM, { Id: 'f1', Name: 'f2', Price: 'f3', cost: 'dim' }), xmXml(['Id', 'Name', 'Price'], XM_COLORS), { ta: 'Đối tượng', tb: 'XML', mid: '→' })] });
  c.snap({ ln: 5, title: 'Trường private bị bỏ qua', body: 'cost là private nên không có thẻ nào cho nó. XmlSerializer chỉ nhìn thấy thành viên public.', viz: [vPair(xmCard(XM, { Id: 'f1', Name: 'f2', Price: 'f3', cost: 'bad' }), xmXml(['Id', 'Name', 'Price'], XM_COLORS), { ta: 'Đối tượng', tb: 'XML', mid: '→' })] });
  c.snap({ ln: 11, title: 'Xong', body: 'Ba thuộc tính public thành ba phần tử trong <Product>. Trường private cost không có mặt.', note: 'XmlSerializer cần lớp public, constructor không tham số, và chỉ ghi các thành viên public.', viz: [vPair(xmCard(XM, { Id: 'f1', Name: 'f2', Price: 'f3', cost: 'dim' }), xmXml(['Id', 'Name', 'Price'], XM_COLORS), { ta: 'Đối tượng', tb: 'XML', mid: '→' })] });
 }},
deser: { inputs: [], chips: [],
 intro: 'Đi ngược lại: từ chuỗi XML tạo lại một Product. Bấm "Bước tiếp".',
 lines: function(){ return ['// xml là chuỗi XML ở tab trước', 'var xs = new XmlSerializer(', '  typeof(Product));', 'var sr = new StringReader(xml);', 'var p = (Product)xs', '  .Deserialize(sr);', 'Console.WriteLine(p.Name);']; },
 run: function(c){
  var all = ['Id', 'Name', 'Price'];
  function pr(vals, st){ return vPair(xmXml(all, st && { Id: st.Id && 'f1', Name: st.Name && 'f2', Price: st.Price && 'f3' }, 'XML đầu vào'), xmCard(vals, st, 'Product mới'), { ta: '', tb: '', mid: '→' }); }
  c.snap({ ln: 0, title: 'Có chuỗi XML', body: 'Ta có sẵn chuỗi XML từ lần Serialize trước. Chưa có đối tượng Product nào.', viz: [vPair(xmXml(all), vText([{ t: '(chưa có đối tượng)', s: 'dim' }], { title: 'Product mới', noNo: true }), { mid: '→' })] });
  c.snap({ ln: 1, title: 'Tạo XmlSerializer', body: 'Bộ đọc cũng cần biết kiểu Product để biết gán dữ liệu vào đâu.', viz: [vPair(xmXml(all), vText([{ t: '(chưa có đối tượng)', s: 'dim' }], { title: 'Product mới', noNo: true }), { mid: '→' })] });
  c.snap({ ln: 4, title: 'Gọi constructor không tham số', body: 'Deserialize tạo Product mới bằng constructor không tham số. Lúc này mọi thuộc tính còn giá trị mặc định.', viz: [pr({ Id: 0, Name: null, Price: 0 }, { cost: 'dim' })], vars: [['p', '→ Product#1', 1]] });
  c.snap({ ln: 4, title: 'Gán Id', body: 'Đọc thẻ <Id>7</Id> rồi gán p.Id = 7.', viz: [pr({ Id: 7, Name: null, Price: 0 }, { Id: 'hi', cost: 'dim' })] });
  c.snap({ ln: 4, title: 'Gán Name', body: 'Đọc thẻ <Name> rồi gán p.Name = "Bút".', viz: [pr({ Id: 7, Name: 'Bút', Price: 0 }, { Id: 'ok', Name: 'hi', cost: 'dim' })] });
  c.snap({ ln: 4, title: 'Gán Price', body: 'Đọc thẻ <Price> rồi gán p.Price = 5000.', viz: [pr({ Id: 7, Name: 'Bút', Price: 5000 }, { Id: 'ok', Name: 'ok', Price: 'hi', cost: 'dim' })] });
  c.out('Bút');
  c.snap({ ln: 6, title: 'Xong', body: 'Product mới có đủ dữ liệu. Trường private cost không đến từ XML mà lấy giá trị khởi tạo trong lớp.', note: 'XmlSerializer cần lớp public, constructor không tham số, và chỉ ghi các thành viên public.', viz: [pr({ Id: 7, Name: 'Bút', Price: 5000 }, { Id: 'ok', Name: 'ok', Price: 'ok', cost: 'dim' })] });
 }},
ctor: { inputs: [], chips: [],
 intro: 'Điều gì xảy ra nếu lớp chỉ có constructor có tham số? Bấm "Bước tiếp".',
 lines: function(){ return ['public class Product', '{', '  public int Id { get; set; }', '  public string Name { get; set; }', '  public Product(int id, string name)', '  {', '    Id = id; Name = name;', '  }', '}', '', 'var xs = new XmlSerializer(', '  typeof(Product));', '', '// Sửa: thêm vào lớp Product', '//   public Product() { }']; },
 run: function(c){
  var inner = 'Product cannot be serialized because it does not have a parameterless constructor.';
  function ctors(rows){ return vGrid([['Constructor', 'Có không?']].concat(rows), { head: true, title: 'Constructor của Product' }); }
  c.snap({ ln: 4, title: 'Lớp chỉ có constructor có tham số', body: 'Product tự viết constructor Product(int id, string name).', viz: [ctors([[{ t: 'Product(int id, string name)', s: 'ok' }, { t: 'có', s: 'ok' }], ['Product()', { t: '?', s: 'dim' }]])] });
  c.snap({ ln: 4, title: 'Không còn constructor mặc định', body: 'Khi đã viết constructor riêng, C# không tự thêm constructor không tham số nữa.', viz: [ctors([[{ t: 'Product(int id, string name)', s: 'ok' }, { t: 'có', s: 'ok' }], [{ t: 'Product()', s: 'bad' }, { t: 'không', s: 'bad' }]])] });
  c.err('Unhandled exception. System.InvalidOperationException: There was an error reflecting type \'Product\'.');
  c.err(' ---> System.InvalidOperationException: ' + inner);
  c.snap({ ln: 10, title: 'new XmlSerializer báo lỗi', body: 'XmlSerializer cần tạo Product rỗng khi đọc XML, mà lớp không có constructor không tham số nên ném lỗi ngay.', viz: [vCard({ kind: 'err', title: 'InvalidOperationException', sub: inner, lines: ['new XmlSerializer(typeof(Product))'], tip: 'Thêm constructor không tham số vào lớp.' })] });
  c.snap({ ln: 14, title: 'Cách sửa', body: 'Thêm public Product() { } (có thể để trống). Constructor có tham số vẫn giữ nguyên.', viz: [ctors([[{ t: 'Product(int id, string name)', s: 'ok' }, { t: 'có', s: 'ok' }], [{ t: 'Product()', s: 'new' }, { t: 'có', s: 'new' }]])] });
  c.snap({ ln: 14, title: 'Xong', body: 'Có constructor không tham số rồi thì new XmlSerializer(typeof(Product)) chạy bình thường.', note: 'XmlSerializer cần lớp public, constructor không tham số, và chỉ ghi các thành viên public.', viz: [vCard({ kind: 'ok', title: 'XmlSerializer tạo thành công', lines: ['new XmlSerializer(typeof(Product))'], tip: 'Lớp cần: public, có constructor không tham số.' })] });
 }}
};
