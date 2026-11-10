// META {"module":3,"lesson":"Bài 3.3. If lồng nhau","activity":"Câu Lệnh If Lồng Nhau Nested If","title":"If lồng nhau và lỗi dangling else","lead":"Xem hai cổng kiểm tra nối tiếp và cách else tự gắn vào if gần nhất. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["tau","Tàu lượn: 3 cặp (tuổi, chiều cao)"],["dang","Dangling else (a = -5, b = 3)"]],"codeTitle":"Mã nguồn C++","path":"cau-truc-dieu-kien/if-long-nhau/cau-lenh-if-long-nhau-nested-if/index.html"}
/* Hàm phụ dùng tiền tố b11 */
function b11Gates(g1, g2, r){
  return vLamps([g1, g2, r], {title:'Hai cổng nối tiếp trước tàu lượn'});
}
/* Sơ đồ dangling else. braces: có { } hay không. ph: 0 chưa vẽ mũi tên, 1 đã vẽ. */
function b11Dang(braces, ph){
  var ah = function(id, col){ return '<marker id="' + id + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" style="fill:' + col + '"/></marker>'; };
  function box(x, y, t, dim){
    return '<g' + (dim ? ' style="opacity:.4"' : '') + '><rect x="' + x + '" y="' + y + '" width="124" height="30" rx="6" style="fill:var(--node);stroke:var(--node-line);stroke-width:2"/><text x="' + (x + 62) + '" y="' + (y + 20) + '" text-anchor="middle" style="fill:var(--text);font:600 13px ui-monospace,Menlo,Consolas,monospace">' + esc(t) + '</text></g>';
  }
  var s = '<div class="v-row"><svg viewBox="0 0 330 150" style="width:100%;max-width:420px;display:block"><defs>' + ah('b11g', 'var(--muted)') + ah('b11r', 'var(--false)') + ah('b11k', 'var(--true)') + '</defs>';
  s += box(10, 8, 'if (a > 0)') + box(40, 56, 'if (b > 0)', false) + box(10, 108, 'else');
  if (ph) {
    if (braces) {
      s += '<path d="M134,123 C220,123 220,23 136,23" style="fill:none;stroke:var(--true);stroke-width:3" marker-end="url(#b11k)"/>';
    } else {
      s += '<path d="M134,132 C320,142 320,23 136,23" style="fill:none;stroke:var(--muted);stroke-width:2.2;stroke-dasharray:6 5" marker-end="url(#b11g)"/>';
      s += '<path d="M134,121 C214,121 224,71 166,71" style="fill:none;stroke:var(--false);stroke-width:3" marker-end="url(#b11r)"/>';
    }
  }
  s += '</svg>';
  if (ph) {
    s += braces
      ? '<div style="font:13px system-ui,sans-serif;margin-top:6px"><b style="color:var(--true)">━ Cả người viết và g++:</b> else thuộc if (a > 0) vì có { } chỉ rõ.</div>'
      : '<div style="font:13px system-ui,sans-serif;margin-top:6px;line-height:1.7"><b style="color:var(--muted)">┄ Người viết tưởng:</b> else thuộc if (a > 0).<br><b style="color:var(--false)">━ g++ hiểu:</b> else thuộc if (b > 0), là if gần nhất chưa có else.</div>';
  }
  return s + '</div>';
}

var EX = {
tau:{inputs:[{id:'cap', label:'tuoi, chieuCao', def:'15, 130', text:'^[0-9]{1,3} *, *[0-9]{1,3}$', msg:'Nhập dạng "15, 130" (tuổi, chiều cao cm)', w:110}], chips:['15, 130', '10, 150', '15, 150'],
 intro:'Muốn chơi tàu lượn phải đủ tuổi (12) rồi mới xét chiều cao (140 cm). Thử ba cặp gợi ý. Bấm "Bước tiếp".',
 lines:function(P){
  var a = String(P.cap).split(',');
  return [
   'int tuoi = ' + Number(a[0]) + ';',
   'int chieuCao = ' + Number(a[1]) + ';',
   'if (tuoi >= 12) {',
   '  if (chieuCao >= 140) {',
   '    cout << "Duoc choi tau luon!"',
   '         << endl;',
   '  } else {',
   '    cout << "Chua du chieu cao."',
   '         << endl;',
   '  }',
   '} else {',
   '  cout << "Chua du tuoi." << endl;',
   '}'];
 },
 run:function(c, P){
  var a = String(P.cap).split(','), t = Number(a[0]), h = Number(a[1]), okT = t >= 12, okH = h >= 140;
  var V = [['tuoi', t], ['chieuCao', h]];
  var G1 = function(s, sub){ return {t:'Cổng Tuổi', s:s, sub:sub}; };
  var G2 = function(s, sub){ return {t:'Cổng Chiều cao', s:s, sub:sub}; };
  var R = function(s, sub){ return {t:'Tàu lượn', s:s, sub:sub}; };
  c.snap({ln:1, title:'Hai thông số của khách', body:'Khách có tuổi ' + t + ' và chiều cao ' + h + ' cm.', vars:V,
   viz:b11Gates(G1('off', 'tuoi >= 12'), G2('off', 'chieuCao >= 140'), R('off', 'chưa vào'))});
  c.snap({ln:2, title:'Cổng 1: ' + t + ' >= 12 ?', body:'Máy xét cổng Tuổi trước tiên.', vars:V,
   viz:b11Gates(G1('hi', 'đang xét'), G2('off', 'chưa xét'), R('off', 'chưa vào'))});
  if (okT) {
   c.snap({ln:3, title:'Cổng 1 đạt, xét cổng 2: ' + h + ' >= 140 ?', body:'Tuổi ' + t + ' >= 12 là Đúng nên mới vào được khối bên trong và xét tiếp chiều cao.', vars:V,
    viz:b11Gates(G1('ok', 'đạt'), G2('hi', 'đang xét'), R('off', 'chưa vào'))});
   if (okH) {
    c.out('Duoc choi tau luon!');
    c.snap({ln:4, dim:[6, 7, 8, 10, 11], dimLabel:'bỏ qua', title:'Cả hai cổng đạt', body:'Chiều cao ' + h + ' >= 140 cũng Đúng nên tàu lượn mở cửa.', vars:V,
     viz:b11Gates(G1('ok', 'đạt'), G2('ok', 'đạt'), R('ok', 'được chơi'))});
   } else {
    c.out('Chua du chieu cao.');
    c.snap({ln:7, dim:[4, 5, 10, 11], dimLabel:'bỏ qua', title:'Cổng 2 trượt', body:'Chiều cao ' + h + ' >= 140 là Sai nên chạy nhánh else bên trong.', vars:V,
     viz:b11Gates(G1('ok', 'đạt'), G2('bad', 'trượt'), R('bad', 'bị từ chối'))});
   }
  } else {
   c.out('Chua du tuoi.');
   c.snap({ln:11, dim:[3, 4, 5, 6, 7, 8, 9], dimLabel:'bỏ qua', title:'Cổng 1 trượt: bỏ qua cổng 2', body:'Tuổi ' + t + ' >= 12 là Sai nên chương trình nhảy sang else ngoài. Chiều cao hoàn toàn không được kiểm tra.', vars:V,
    viz:b11Gates(G1('bad', 'trượt'), G2('off', 'không kiểm tra'), R('bad', 'bị từ chối'))});
  }
  c.snap({ln:12, title:'Xong', body:'Điều kiện bên trong chỉ được xét khi điều kiện bên ngoài đúng.',
   note:'Trong if lồng nhau, điều kiện bên trong chỉ được xét khi điều kiện bên ngoài đúng.', vars:V,
   viz:okT ? b11Gates(G1('ok', 'đạt'), okH ? G2('ok', 'đạt') : G2('bad', 'trượt'), okH ? R('ok', 'được chơi') : R('bad', 'bị từ chối')) : b11Gates(G1('bad', 'trượt'), G2('off', 'không kiểm tra'), R('bad', 'bị từ chối'))});
 }},

dang:{inputs:[{id:'ng', label:'có { }', def:'Không', text:'^(Không|Có)$', msg:'Nhập "Không" hoặc "Có"', w:80}, {id:'a', label:'a', def:-5, min:-99, max:99}, {id:'b', label:'b', def:3, min:-99, max:99}], chips:['Không', 'Có'],
 intro:'else thụt lề thẳng hàng với if ngoài, nhưng trình biên dịch hiểu khác. Bấm "Bước tiếp", rồi chọn "Có" ở ô nhập để thêm { } và so sánh.',
 lines:function(P){
  return P.ng === 'Có' ? [
   'int a = ' + P.a + ';',
   'int b = ' + P.b + ';',
   'if (a > 0) {',
   '  if (b > 0) {',
   '    cout << "Ca hai duong" << endl;',
   '  }',
   '} else {',
   '  cout << "a khong duong" << endl;',
   '}']
  : [
   'int a = ' + P.a + ';',
   'int b = ' + P.b + ';',
   'if (a > 0)',
   '  if (b > 0)',
   '    cout << "Ca hai duong" << endl;',
   'else',
   '  cout << "a khong duong" << endl;'];
 },
 run:function(c, P){
  var br = P.ng === 'Có', a = P.a, b = P.b, V = [['a', a], ['b', b]];
  c.snap({ln:1, title:'Khai báo a và b', body:'a = ' + a + ', b = ' + b + '.', vars:V, viz:b11Dang(br, 0)});
  if (!br) {
   c.snap({ln:5, title:'Else thuộc if nào?', body:'else thụt lề thẳng hàng với if (a > 0) nên người viết tưởng nó thuộc if ngoài. Nhưng g++ gắn else với if gần nhất chưa có else là if (b > 0).', vars:V, viz:b11Dang(br, 1)});
   if (a <= 0) {
    c.snap({ln:2, dim:[3, 4, 5, 6], dimLabel:'bỏ qua', title:'if (a > 0) Sai: bỏ qua cả khối', body:'a = ' + a + ' không lớn hơn 0 nên cả khối if (b > 0) ... else ... bị bỏ qua. Màn hình trống, trái với ý định in "a khong duong".', vars:V, viz:b11Dang(br, 1)});
   } else {
    c.snap({ln:2, title:'if (a > 0) Đúng', body:'a = ' + a + ' > 0 nên vào khối bên trong.', vars:V, viz:b11Dang(br, 1)});
    if (b > 0) {
     c.out('Ca hai duong');
     c.snap({ln:4, dim:[5, 6], dimLabel:'bỏ qua', title:'if (b > 0) Đúng', body:'b = ' + b + ' > 0 nên in "Ca hai duong". else của if (b > 0) bị bỏ qua.', vars:V, viz:b11Dang(br, 1)});
    } else {
     c.out('a khong duong');
     c.snap({ln:6, dim:[4], dimLabel:'bỏ qua', title:'if (b > 0) Sai: chạy else', body:'b = ' + b + ' không lớn hơn 0 nên chạy else gắn với if (b > 0) và in "a khong duong", trong khi a lại dương. Kết quả sai.', vars:V, viz:b11Dang(br, 1)});
    }
   }
   c.snap({ln:6, title:'Xong', body:'Khi a ≤ 0 thì không in gì, khi a > 0 và b ≤ 0 lại in sai. Chọn "Có" ở ô nhập để thêm { } và so sánh.',
    note:'else luôn gắn với if gần nhất chưa có else, không theo thụt lề. Hãy dùng { } rõ ràng. g++ -Wall cảnh báo: suggest explicit braces to avoid ambiguous \'else\'.', vars:V, viz:b11Dang(br, 1)});
  } else {
   c.snap({ln:6, title:'Else thuộc if nào?', body:'Có { } nên else nằm ngay sau dấu } đóng của if (a > 0) và thuộc về nó. Người viết và g++ hiểu giống nhau.', vars:V, viz:b11Dang(br, 1)});
   if (a <= 0) {
    c.out('a khong duong');
    c.snap({ln:7, dim:[3, 4, 5], dimLabel:'bỏ qua', title:'if (a > 0) Sai: chạy else', body:'a = ' + a + ' không lớn hơn 0 nên chạy else của if ngoài và in "a khong duong", đúng ý người viết.', vars:V, viz:b11Dang(br, 1)});
   } else {
    c.snap({ln:2, title:'if (a > 0) Đúng', body:'a = ' + a + ' > 0 nên vào khối bên trong.', vars:V, viz:b11Dang(br, 1)});
    if (b > 0) {
     c.out('Ca hai duong');
     c.snap({ln:4, dim:[6, 7], dimLabel:'bỏ qua', title:'if (b > 0) Đúng', body:'b = ' + b + ' > 0 nên in "Ca hai duong".', vars:V, viz:b11Dang(br, 1)});
    } else {
     c.snap({ln:5, dim:[4, 6, 7], dimLabel:'bỏ qua', title:'if (b > 0) Sai', body:'b = ' + b + ' không lớn hơn 0. if bên trong không có else nên không in gì, và else ngoài cũng không chạy vì a > 0.', vars:V, viz:b11Dang(br, 1)});
    }
   }
   c.snap({ln:8, title:'Xong', body:'Có { } thì else gắn đúng if mà người viết muốn.',
    note:'Dùng { } rõ ràng cho từng if để else luôn thuộc đúng if mà bạn muốn.', vars:V, viz:b11Dang(br, 1)});
  }
 }}
};
