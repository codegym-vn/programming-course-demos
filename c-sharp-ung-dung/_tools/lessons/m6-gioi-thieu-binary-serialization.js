// META {"module":6,"lesson":"Binary Serialization","activity":"Giới thiệu Binary Serialization","title":"Giới thiệu Binary Serialization","lead":"Ghi từng trường thành byte rồi đọc lại đúng thứ tự đó. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["ghi","Ghi (BinaryWriter)"],["doc","Đọc (BinaryReader)"]],"codeTitle":"Mã nguồn C#"}
var bnEnc = new TextEncoder();
var bnDec = new TextDecoder();
function bnHex(n){ return (n < 16 ? '0' : '') + n.toString(16).toUpperCase(); }
function bnI32(n){ return [n & 255, (n >> 8) & 255, (n >> 16) & 255, (n >> 24) & 255]; }
// Mô phỏng BinaryWriter: int 4 byte byte-thấp-trước; string = 1 byte độ dài + byte UTF-8
var BN_ID = 7, BN_NAME = 'Bút', BN_PRICE = 5000;
var BN = (function(){
  var b = [], f = [];
  function push(a, k){ a.forEach(function(x){ b.push(x); f.push(k); }); }
  var nb = Array.from(bnEnc.encode(BN_NAME));
  push(bnI32(BN_ID), 1); push([nb.length], 2); push(nb, 3); push(bnI32(BN_PRICE), 4);
  return { b: b, f: f, nameLen: nb.length };
})();
// Mô phỏng BinaryReader
function bnReadInt(pos){ var b = BN.b; return { v: (b[pos] | (b[pos + 1] << 8) | (b[pos + 2] << 16) | (b[pos + 3] << 24)), end: pos + 4 }; }
function bnReadStr(pos){ var n = BN.b[pos]; var raw = BN.b.slice(pos + 1, pos + 1 + n); return { raw: raw, n: n, v: bnDec.decode(new Uint8Array(raw)), end: pos + 1 + n }; }
function bnShow(s){ return s.replace(/[\u0000-\u001f]/g, '·'); }
function bnCard(){ return vCard({ kind: 'info', title: 'Product', rows: [['Id', BN_ID], ['Name', '"' + BN_NAME + '"'], ['Price', BN_PRICE]] }); }
var BN_LEGEND = vChips([{ t: 'Id', s: 'f1', label: '4 byte' }, { t: 'độ dài', s: 'f2', label: '1 byte' }, { t: 'Name', s: 'f3', label: BN.nameLen + ' byte' }, { t: 'Price', s: 'f4', label: '4 byte' }], { title: 'Các trường' });
// st: trạng thái từng ô; ptr: chỉ số ô con trỏ
function bnCells(upto, st, ptr, label){
  var items = BN.b.slice(0, upto).map(function(x, i){ return { v: bnHex(x), s: st ? st[i] : 'f' + BN.f[i] }; });
  return vCells(items, { cap: BN.b.length, small: true, name: 'Dải byte (hex)', ptr: ptr, ptrLabel: label });
}
function bnStates(done, cur, bad, dimRest){
  // done: [từ,đến) đã đọc đúng (màu trường), cur: [từ,đến) đang đọc (vàng), bad: [từ,đến) đọc sai (đỏ)
  return BN.b.map(function(x, i){
    if (bad && i >= bad[0] && i < bad[1]) return 'bad';
    if (cur && i >= cur[0] && i < cur[1]) return 'hi';
    if (done && i >= done[0] && i < done[1]) return 'f' + BN.f[i];
    return 'dim';
  });
}
function bnObj(id, name, price, st){
  return vGrid([['Biến', 'Giá trị'], [{ t: 'id', s: st && st.id }, { t: id === null ? '(chưa đọc)' : String(id), s: st && st.id }], [{ t: 'name', s: st && st.name }, { t: name === null ? '(chưa đọc)' : name, s: st && st.name }], [{ t: 'price', s: st && st.price }, { t: price === null ? '(chưa đọc)' : String(price), s: st && st.price }]], { head: true, title: 'Kết quả đọc' });
}
var EX = {
ghi: { inputs: [], chips: [],
 intro: 'Ghi lần lượt Id, Name, Price vào dải byte. Mỗi trường một màu. Bấm "Bước tiếp".',
 lines: function(){ return ['var p = new Product', '{ Id = 7, Name = "Bút",', '  Price = 5000 };', '', 'using var ms = new MemoryStream();', 'using var w = new BinaryWriter(ms);', 'w.Write(p.Id);', 'w.Write(p.Name);', 'w.Write(p.Price);', 'Console.WriteLine(ms.Length);']; },
 run: function(c){
  c.snap({ ln: 5, title: 'Chuẩn bị BinaryWriter', body: 'BinaryWriter ghi dữ liệu vào MemoryStream. Dải byte đang trống, chưa có byte nào.', viz: [bnCard(), bnCells(0)], vars: [['ms.Length', 0, 1]] });
  c.snap({ ln: 6, title: 'Ghi Id = 7', body: 'Số nguyên kiểu int chiếm 4 byte, byte thấp ghi trước: 07 00 00 00.', viz: [bnCard(), bnCells(4), BN_LEGEND], vars: [['ms.Length', 4, 1]] });
  c.snap({ ln: 7, title: 'Ghi Name = "Bút"', body: 'Chuỗi ghi 1 byte độ dài rồi các byte UTF-8. Chữ "ú" chiếm 2 byte (C3 BA) nên độ dài là ' + BN.nameLen + ': ' + BN.b.slice(4, 9).map(bnHex).join(' ') + '.', viz: [bnCard(), bnCells(9), BN_LEGEND], vars: [['ms.Length', 9, 1]] });
  c.snap({ ln: 8, title: 'Ghi Price = 5000', body: '5000 là 0x1388 nên ghi 4 byte: ' + BN.b.slice(9, 13).map(bnHex).join(' ') + '.', viz: [bnCard(), bnCells(13), BN_LEGEND], vars: [['ms.Length', 13, 1]] });
  c.out(String(BN.b.length));
  c.snap({ ln: 9, title: 'Tổng số byte', body: 'Cộng lại: 4 + 1 + ' + BN.nameLen + ' + 4 = ' + BN.b.length + ' byte.', viz: [bnCard(), bnCells(13), BN_LEGEND], vars: [['ms.Length', BN.b.length, 1]] });
  c.snap({ ln: 9, title: 'Xong', body: 'Dải byte chỉ có số, không có tên trường nào đi kèm.', note: 'Định dạng nhị phân gọn nhưng không tự mô tả: người đọc phải biết đúng thứ tự và kiểu của từng trường.', viz: [bnCard(), bnCells(13), BN_LEGEND], vars: [['ms.Length', BN.b.length]] });
 }},
doc: { inputs: [], chips: [],
 intro: 'Đọc lại dải byte 13 ô. Con trỏ chạy từ trái sang phải. Bấm "Bước tiếp".',
 lines: function(){ return ['var r = new BinaryReader(', '  new MemoryStream(bytes));', 'int id = r.ReadInt32();', 'string name = r.ReadString();', 'int price = r.ReadInt32();', '', '// Thử đọc sai thứ tự', 'var r2 = new BinaryReader(', '  new MemoryStream(bytes));', 'string x = r2.ReadString();', 'int y = r2.ReadInt32();']; },
 run: function(c){
  var N = BN.b.length;
  var a = bnReadInt(0), s = bnReadStr(a.end), b = bnReadInt(s.end);
  var allDim = BN.b.map(function(){ return 'dim'; });
  c.snap({ ln: 1, title: 'Bắt đầu đọc', body: 'BinaryReader đứng ở byte đầu tiên. Nó không biết tên trường, chỉ đọc theo lệnh của ta.', viz: [bnCells(N, allDim, 0, 'bắt đầu'), bnObj(null, null, null)] });
  c.snap({ ln: 2, title: 'ReadInt32: đọc 4 byte', body: 'Gom 4 byte đầu (07 00 00 00) theo kiểu byte thấp trước được id = ' + a.v + '.', viz: [bnCells(N, bnStates([0, 0], [0, a.end]), a.end, 'tiếp'), bnObj(a.v, null, null, { id: 'ok' })], vars: [['id', a.v, 1]] });
  c.snap({ ln: 3, title: 'ReadString: độ dài rồi nội dung', body: 'Byte ' + bnHex(BN.b[a.end]) + ' cho biết còn ' + s.n + ' byte nữa. Đọc ' + s.n + ' byte UTF-8 ra chuỗi "' + s.v + '".', viz: [bnCells(N, bnStates([0, a.end], [a.end, s.end]), s.end, 'tiếp'), bnObj(a.v, s.v, null, { id: 'ok', name: 'ok' })], vars: [['id', a.v], ['name', S(s.v), 1]] });
  c.snap({ ln: 4, title: 'ReadInt32 cho Price', body: '4 byte cuối (88 13 00 00) ghép lại thành price = ' + b.v + '.', viz: [bnCells(N, bnStates([0, s.end], [s.end, b.end]), b.end, 'hết'), bnObj(a.v, s.v, b.v, { id: 'ok', name: 'ok', price: 'ok' })], vars: [['id', a.v], ['name', S(s.v)], ['price', b.v, 1]] });
  // đọc sai thứ tự
  var w = bnReadStr(0), y = bnReadInt(w.end);
  var shown = bnShow(w.v);
  c.snap({ ln: 6, title: 'Giờ thử đọc sai thứ tự', body: 'Cùng dải byte, nhưng lần này ta gọi ReadString trước thay vì ReadInt32.', viz: [bnCells(N, allDim, 0, 'bắt đầu'), bnObj(null, null, null)] });
  c.snap({ ln: 9, title: 'ReadString đọc nhầm', body: 'Byte đầu là ' + bnHex(BN.b[0]) + ' nên nó tưởng chuỗi dài ' + w.n + ' byte, nuốt luôn các byte của Id và Name. Kết quả x = "' + shown + '", vô nghĩa.', viz: [bnCells(N, bnStates(null, null, [0, w.end]), w.end, 'tiếp'), bnObj(null, shown, null, { name: 'bad' })], vars: [['x', S(shown), 1]] });
  c.snap({ ln: 10, title: 'ReadInt32 cũng sai', body: 'Con trỏ đã lệch, nên 4 byte tiếp theo ghép thành y = ' + y.v + ', không phải Price.', viz: [bnCells(N, bnStates(null, null, [0, y.end]), y.end, 'tiếp'), bnObj(y.v, shown, null, { id: 'bad', name: 'bad' })], vars: [['x', S(shown)], ['y', y.v, 1]] });
  c.snap({ ln: 10, title: 'Xong', body: 'Đọc đúng thứ tự thì khôi phục được Product, đọc sai thì dữ liệu vô nghĩa và không có lỗi nào báo cho ta.', note: 'Định dạng nhị phân gọn nhưng không tự mô tả: người đọc phải biết đúng thứ tự và kiểu của từng trường.', viz: [bnCells(N, bnStates(null, null, [0, y.end]), y.end), bnObj(y.v, shown, null, { id: 'bad', name: 'bad' })] });
 }}
};
