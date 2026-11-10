// META {"module":1,"lesson":"Bài 1.3. Phép toán trên con trỏ và duyệt mảng","activity":"Các Phép Toán Trên Con Trỏ (Pointer Arithmetic)","title":"Con trỏ di chuyển trên mảng","lead":"Xem con trỏ p bước qua từng ô của mảng, nhảy bao nhiêu byte, và chuyện gì xảy ra khi đi quá mảng. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["duyet","Duyệt mảng bằng p++"],["kieu","int và double: nhảy bao nhiêu byte"],["cong","p + n và vượt biên"]],"codeTitle":"Mã nguồn C++","path":"con-tro-va-tham-chieu/phep-toan-tren-con-tro-va-duyet-mang/cac-phep-toan-tren-con-tro-pointer-arithmetic/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Bộ nhớ: dải ô của mảng và con trỏ p';

/* Địa chỉ ví dụ: tính bằng số thật, hiển thị rút gọn …xxxx, đầy đủ trong console */
var B5_PFX = 0x7ffdfdcf0000;
function b5Hex(n){ return '0x' + n.toString(16); }
function b5Short(n){ return '…' + n.toString(16).slice(-4); }

/* Một dải ô. r: {name, size (byte mỗi ô), cells:[{v, addr, s, out}], flags:[{i, label, sub, ghost, gray}]} */
function b5Row(r){
  var h = '<div style="margin:0 0 6px"><div class="v-name">' + esc(r.name) + '</div><div style="display:flex;gap:4px;align-items:flex-end">';
  r.cells.forEach(function(c, i){
    var fl = (r.flags || []).filter(function(f){ return f.i === i; })[0];
    var flag = '<div style="min-height:46px;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;text-align:center;line-height:1.15;' +
      (fl ? 'color:' + (fl.gray ? 'var(--muted)' : 'var(--ptr)') + ';' + (fl.ghost ? 'opacity:.5;' : '') : '') + '">' +
      (fl ? (fl.sub ? '<span style="font:700 10px system-ui,sans-serif;white-space:nowrap">' + esc(fl.sub) + '</span>' : '') + '<b style="font:800 13px ui-monospace,Menlo,Consolas,monospace">' + esc(fl.label) + '</b><span style="font-size:13px">▼</span>' : '') + '</div>';
    var bg = c.out ? 'repeating-linear-gradient(45deg,transparent 0 5px,rgba(148,163,184,.28) 5px 8px)' : 'var(--node)';
    var bd = c.s === 'hi' ? 'var(--cur-bar)' : c.s === 'bad' ? 'var(--false)' : c.s === 'ok' ? 'var(--true)' : 'var(--node-line)';
    var fill = c.s === 'hi' ? 'background:var(--cur);' : c.s === 'bad' ? 'background:var(--false-soft);' : 'background:' + bg + ';';
    var ticks = '';
    for (var k = 0; k < r.size; k++) ticks += '<i style="flex:1;height:5px;border-left:1px solid var(--node-line)"></i>';
    h += '<div style="flex:1 1 0;min-width:0;text-align:center">' + flag +
      '<div style="border:2px ' + (c.out ? 'dashed' : 'solid') + ' ' + bd + ';border-radius:8px;' + fill + 'padding:5px 0 2px;color:' + (c.s === 'bad' ? 'var(--false)' : 'var(--text)') + '">' +
      '<div style="font:700 14px ui-monospace,Menlo,Consolas,monospace;min-height:20px">' + esc(c.v === undefined ? '' : c.v) + '</div>' +
      '<div style="display:flex;margin-top:3px;padding:0 2px">' + ticks + '</div></div>' +
      '<div style="font:600 11px system-ui,sans-serif;color:var(--muted);margin-top:2px">' + (c.out ? 'ngoài mảng' : '[' + c.ix + ']') + '</div>' +
      '<div style="font:600 10px ui-monospace,Menlo,Consolas,monospace;color:var(--muted)">' + esc(b5Short(c.addr)) + '</div></div>';
  });
  return h + '</div></div>';
}
function b5Cells(vals, base, size, s, extraOut){
  var cells = vals.map(function(v, i){ return {v:v, ix:i, addr:base + i * size, s:(s instanceof Function ? s(i) : s)}; });
  for (var k = 0; k < (extraOut || 0); k++) { var i2 = vals.length + k; cells.push({v:'?', ix:i2, addr:base + i2 * size, out:true, s:(s instanceof Function ? s(i2) : null)}); }
  return cells;
}

var EX = {
duyet:{inputs:[],
 intro:'Con trỏ p sẽ đi từng ô của mảng, từ ô đầu tới ô cuối. Mỗi ô int dài 4 byte. Bấm "Bước tiếp".',
 lines:function(){ return ['int arr[5] = {10, 20, 30, 40, 50};', 'int *p = arr;', 'for (int i = 0; i < 5; i++) {', '  cout << "Phan tu " << i', '       << ": " << *p << endl;', '  p++;', '}']; },
 run:function(c){
  var base = B5_PFX + 0x7f70, SZ = 4, vals = [10, 20, 30, 40, 50], p = base, rows = [];
  function idx(){ return (p - base) / SZ; }
  function strip(hiIdx, flag, st){
    return vCells0(b5Cells(vals, base, SZ, function(i){ return i === hiIdx ? (st || 'hi') : null; }, 1), flag);
  }
  function vCells0(cells, flag){ return b5Row({name:'arr (5 ô int, mỗi ô 4 byte)', size:SZ, cells:cells, flags:flag ? [flag] : []}); }
  function trace(){ return vTrace(['Lượt i', 'p đang ở ô', '*p'], rows, {title:'Bảng theo dõi'}); }
  c.snap({ln:0, title:'int arr[5] = {…};', body:'Máy cấp 5 ô int liền nhau. Mỗi ô 4 byte nên địa chỉ các ô cách nhau 4: ' + b5Short(base) + ', ' + b5Short(base + 4) + ', ' + b5Short(base + 8) + '…',
   viz:vCells0(b5Cells(vals, base, SZ, 'new', 1))});
  c.snap({ln:1, title:'int *p = arr;', body:'Tên mảng arr là địa chỉ của ô đầu, giống &arr[0]. Nên p được trỏ vào ô [0]. Lá cờ tím là con trỏ p.',
   viz:vCells0(b5Cells(vals, base, SZ, function(i){ return i === 0 ? 'hi' : null; }, 1), {i:0, label:'p'})});
  rows.push([ '0', '[0]', String(vals[0]) ]);
  c.out('Phan tu 0: ' + vals[0]);
  c.snap({ln:4, title:'Lượt i = 0: in *p', body:'*p là giá trị ở ô p đang đứng: ' + vals[0] + '.',
   viz:[strip(0, {i:0, label:'p'}), trace()]});
  p += SZ;
  c.snap({ln:5, title:'p++', body:'p nhảy sang ô kế tiếp. Địa chỉ của p tăng ' + SZ + ' byte (bằng sizeof(int)), không phải 1 byte.',
   viz:[strip(null, {i:idx(), label:'p', sub:'+' + SZ + ' byte'}), trace()]});
  rows.push(['1', '[1]', String(vals[1])]); c.out('Phan tu 1: ' + vals[1]); p += SZ;
  c.snap({ln:4, title:'Lượt i = 1: in rồi p++', body:'In ' + vals[1] + ', rồi p++ nhảy tiếp sang ô [2].',
   viz:[strip(null, {i:idx(), label:'p', sub:'+' + SZ + ' byte'}), trace()]});
  for (var i = 2; i < 5; i++) { rows.push([String(i), '[' + i + ']', String(vals[i])]); c.out('Phan tu ' + i + ': ' + vals[i]); p += SZ; }
  c.snap({ln:4, title:'Lượt i = 2, 3, 4', body:'Các lượt còn lại làm y hệt: in *p rồi p++. Bảng theo dõi có đủ 5 hàng.',
   viz:[strip(null, {i:idx(), label:'p', sub:'+' + SZ + ' byte'}), trace()]});
  c.snap({ln:6, title:'Xong', body:'Vòng for kết thúc. p đứng ngay sau ô [4], là chỗ không thuộc mảng. Được phép trỏ tới đó, nhưng không được đọc *p.',
   note:'p++ đi sang phần tử kế tiếp, mỗi bước nhảy đúng sizeof(kiểu) byte.',
   viz:[strip(null, {i:idx(), label:'p', sub:'không được đọc', gray:true}), trace()]});
 }},
kieu:{inputs:[],
 intro:'Hai mảng: một mảng int, một mảng double. Xem p++ nhảy bao nhiêu byte ở mỗi mảng. Bấm "Bước tiếp".',
 lines:function(){ return ['int arrInt[3] = {1, 2, 3};', 'double arrDouble[3] = {1.5, 2.5, 3.5};', 'int *pInt = arrInt;', 'double *pDouble = arrDouble;', 'cout << "pInt: " << pInt << endl;', 'pInt++;', 'cout << "pInt++: " << pInt << endl;', 'cout << "pDouble: " << pDouble << endl;', 'pDouble++;', 'cout << "pDouble++: " << pDouble << endl;']; },
 run:function(c){
  var bi = B5_PFX + 0x7f84, bd = B5_PFX + 0x7f90, pi = bi, pd = bd, SI = 4, SD = 8, vi = [1, 2, 3], vd = ['1.5', '2.5', '3.5'];
  function both(fi, fd, hiI, hiD){
    return b5Row({name:'arrInt (int, 4 byte mỗi ô)', size:SI, cells:b5Cells(vi, bi, SI, function(i){ return i === hiI ? 'hi' : null; }), flags:fi ? [fi] : []}) +
           b5Row({name:'arrDouble (double, 8 byte mỗi ô)', size:SD, cells:b5Cells(vd, bd, SD, function(i){ return i === hiD ? 'hi' : null; }), flags:fd ? [fd] : []});
  }
  var FI = function(sub){ return {i:(pi - bi) / SI, label:'pInt', sub:sub}; };
  var FD = function(sub){ return {i:(pd - bd) / SD, label:'pDouble', sub:sub}; };
  c.snap({ln:1, title:'Hai mảng', body:'arrInt có 3 ô, mỗi ô 4 byte. arrDouble có 3 ô, mỗi ô 8 byte (ô rộng hơn, địa chỉ cách nhau 8).',
   viz:both(null, null)});
  c.snap({ln:3, title:'Hai con trỏ', body:'pInt trỏ vào ô đầu của arrInt, pDouble trỏ vào ô đầu của arrDouble.',
   viz:both(FI(), FD(), 0, 0)});
  c.out('pInt: ' + b5Hex(pi));
  c.snap({ln:4, title:'In pInt', body:'pInt đang chứa địa chỉ ' + b5Hex(pi) + ' (đuôi ' + b5Short(pi) + ').',
   viz:both(FI(), FD(), 0, 0)});
  var old = pi; pi += SI;
  c.snap({ln:5, title:'pInt++', body:'pInt nhảy sang ô [1]. Địa chỉ đổi từ ' + b5Short(old) + ' sang ' + b5Short(pi) + ': tăng ' + (pi - old) + ' byte.',
   viz:both(FI('+' + SI + ' byte'), FD(), 1, 0)});
  c.out('pInt++: ' + b5Hex(pi));
  c.snap({ln:6, title:'In pInt sau ++', body:'Địa chỉ mới là ' + b5Hex(pi) + ', hơn lúc trước đúng 4.',
   viz:both(FI(), FD(), 1, 0)});
  c.out('pDouble: ' + b5Hex(pd));
  c.snap({ln:7, title:'In pDouble', body:'pDouble đang chứa ' + b5Hex(pd) + ' (đuôi ' + b5Short(pd) + ').',
   viz:both(FI(), FD(), 1, 0)});
  old = pd; pd += SD;
  c.snap({ln:8, title:'pDouble++', body:'pDouble cũng nhảy sang ô kế tiếp, nhưng ô double dài 8 byte. Địa chỉ đổi từ ' + b5Short(old) + ' sang ' + b5Short(pd) + ': tăng ' + (pd - old) + ' byte.',
   viz:both(FI(), FD('+' + SD + ' byte'), 1, 1)});
  c.out('pDouble++: ' + b5Hex(pd));
  c.snap({ln:9, title:'Xong', body:'Cả hai con trỏ đều nhảy 1 phần tử. Số byte nhảy phụ thuộc kiểu của phần tử.',
   note:'Con trỏ tự biết kích thước kiểu mà nó trỏ tới, bạn không cần tự tính byte.',
   viz:[both(FI(), FD(), 1, 1), vGrid([['', 'pInt++', 'pDouble++'], ['Địa chỉ tăng', SI + ' byte', SD + ' byte'], ['Số phần tử tăng', '1', '1']], {head:true})]});
 }},
cong:{inputs:[],
 intro:'p + n chỉ tính ra một địa chỉ tạm, không làm p đổi chỗ. Sau đó xem chuyện gì xảy ra khi đi quá mảng. Bấm "Bước tiếp".',
 lines:function(){ return ['int arr[5] = {10, 20, 30, 40, 50};', 'int *p = arr;', 'cout << *(p + 2) << endl;', 'cout << *(p + 4) << endl;', 'cout << *p << endl;', 'int nho[3] = {10, 20, 30};', 'int *q = nho;', 'q = q + 5;', 'cout << *q << endl;']; },
 run:function(c){
  var base = B5_PFX + 0x7f60, SZ = 4, va = [10, 20, 30, 40, 50];
  function A(hi, flags){ return b5Row({name:'arr', size:SZ, cells:b5Cells(va, base, SZ, function(i){ return i === hi ? 'hi' : null; }), flags:flags}); }
  var P0 = {i:0, label:'p'};
  c.snap({ln:1, title:'arr và p', body:'p trỏ vào ô đầu của arr (ô [0]).', viz:A(0, [P0])});
  c.out(String(va[0 + 2]));
  c.snap({ln:2, title:'*(p + 2)', body:'p + 2 là địa chỉ cách p hai ô, chính là ô [2]. Bóng mờ chỉ là địa chỉ tạm. *(p + 2) đọc ra ' + va[2] + '. Cờ p thật vẫn đứng ở [0].',
   viz:A(2, [P0, {i:2, label:'p+2', ghost:true}])});
  c.out(String(va[4]));
  c.snap({ln:3, title:'*(p + 4)', body:'p + 4 là ô [4], đọc ra ' + va[4] + '. p vẫn không nhúc nhích.',
   viz:A(4, [P0, {i:4, label:'p+4', ghost:true}])});
  c.out(String(va[0]));
  c.snap({ln:4, title:'*p', body:'p vẫn đứng ở ô [0], nên *p vẫn là ' + va[0] + '. Muốn p đổi chỗ thật thì phải gán: p = p + 2;',
   viz:A(0, [P0])});
  var vs = [10, 20, 30], b2 = B5_PFX + 0x7f40;
  function Q(flags, hi){ return b5Row({name:'nho (chỉ có 3 ô)', size:SZ, cells:b5Cells(vs, b2, SZ, function(i){ return i === hi ? 'bad' : null; }, 3), flags:flags}); }
  c.snap({ln:6, title:'int nho[3]; int *q = nho;', body:'Mảng nho chỉ có 3 ô hợp lệ: [0], [1], [2]. Các ô kẻ sọc phía sau không thuộc mảng.',
   viz:Q([{i:0, label:'q'}])});
  c.snap({ln:7, title:'q = q + 5;', body:'q nhảy 5 ô, vượt qua hết mảng và rơi vào vùng ngoài mảng. C++ không kiểm tra, không báo lỗi.',
   viz:Q([{i:5, label:'q', sub:'+20 byte'}], 5)});
  c.out('787347760');
  c.snap({ln:8, title:'*q', body:'Đọc ô ngoài mảng ra một số rác (ví dụ 787347760). Mỗi lần chạy có thể khác, thậm chí chương trình có thể dừng đột ngột.',
   viz:[Q([{i:5, label:'q'}], 5), vErr({kind:'runtime', msg:['Hành vi không xác định: giá trị rác, không đáng tin'], note:'Không có lỗi biên dịch, không báo lỗi khi chạy'})]});
  c.snap({ln:8, title:'Xong', body:'C++ không kiểm tra biên mảng. Con trỏ đi quá mảng vẫn đọc được, nhưng kết quả vô nghĩa.',
   note:'p + n không làm đổi p. Luôn giữ con trỏ trong phạm vi mảng.',
   viz:[Q([{i:5, label:'q'}], 5), vCard({kind:'warn', title:'Luôn giữ con trỏ trong mảng', sub:'Chỉ số hợp lệ của nho là 0, 1, 2'})]});
 }}
};
