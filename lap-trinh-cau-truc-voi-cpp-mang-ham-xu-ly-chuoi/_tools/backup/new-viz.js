  /* ===== Nhóm hình cho Mảng / Hàm / Chuỗi (H47–H55) ===== */
  function vNote(o){ return o && o.note ? '<div class="v-rnote">' + esc(o.note) + '</div>' : ''; }
  function vTitle(o){ return o && o.title ? '<div class="v-name">' + esc(o.title) + '</div>' : ''; }
  /* vArray(items, o): dải ô mảng (H47). items: [giá trị | {v, s, sub}] (v null = '?' xám chưa khởi tạo).
     o: {name:'diem', ptr:i, ptrLabel:'i', ptr2:j, ptr2Label:'j', out:1 (số ô kẻ sọc "ngoài mảng" sau ô cuối), outV:'???', outHi:true (con trỏ đang ở vùng ngoài),
         bars:true (vẽ thành cột cao theo giá trị số, dùng cho sắp xếp), done:k (k ô CUỐI đã sắp xong, tô xanh lá), doneFrom:'left' (k ô ĐẦU), swap:[i,j] (nhãn ⇄ đổi chỗ),
         bytes:4 (vẽ vạch byte trong mỗi ô), title, note} */
  function vArray(items, o){
    o = o || {}; var n = items.length, mx = 1;
    items.forEach(function(c){ c = vO(c); var x = parseFloat(c.v); if (!isNaN(x)) mx = Math.max(mx, Math.abs(x)); });
    var h = '<div class="v-row">' + vTitle(o) + '<div class="v-arr' + (o.bars ? ' bars' : '') + '">' + (o.name ? '<div class="v-arrn">' + esc(o.name) + '</div>' : '') + '<div class="v-arrc">';
    function isDone(i){ if (!o.done) return false; return o.doneFrom === 'left' ? i < o.done : i >= n - o.done; }
    items.forEach(function(c, i){
      c = vO(c); var none = c.v === null || c.v === undefined, s = c.s || (isDone(i) ? 'done' : ''), ticks = '';
      if (o.bytes) { ticks = '<span class="v-arrt">'; for (var b = 0; b < o.bytes; b++) ticks += '<i></i>'; ticks += '</span>'; }
      var hgt = o.bars && !none ? Math.max(8, Math.round(Math.abs(parseFloat(c.v)) / mx * 96)) : 0;
      h += '<div class="v-arw">' + (o.bars ? '<div class="v-arbar' + vSt(s) + '" style="height:' + hgt + 'px"></div>' : '') +
        '<div class="v-arcell' + vSt(s) + (none ? ' none' : '') + '">' + (none ? '?' : esc(c.v)) + ticks + '</div><div class="v-arix">[' + i + ']</div>' +
        (c.sub ? '<div class="v-arsub">' + esc(c.sub) + '</div>' : '') +
        (o.ptr === i ? '<div class="v-arp">▲ ' + esc(o.ptrLabel || 'i') + '</div>' : '') + (o.ptr2 === i ? '<div class="v-arp p2">▲ ' + esc(o.ptr2Label || 'j') + '</div>' : '') + '</div>';
    });
    for (var k = 0; k < (o.out || 0); k++) h += '<div class="v-arw"><div class="v-arcell out' + (o.outHi && k === 0 ? ' s-bad' : '') + '">' + esc(k === 0 && o.outV ? o.outV : '') + '</div><div class="v-arix">[' + (n + k) + ']</div>' + (k === 0 ? '<div class="v-arsub">ngoài mảng</div>' : '') + (o.outHi && k === 0 ? '<div class="v-arp bad">▲ ' + esc(o.ptrLabel || 'i') + '</div>' : '') + '</div>';
    h += '</div></div>';
    if (o.swap) h += '<div class="v-arswap">⇄ đổi chỗ [' + o.swap[0] + '] và [' + o.swap[1] + ']</div>';
    return h + vNote(o) + '</div>';
  }
  /* vGrid2D(rows, o): ma trận (H48). rows: mảng các hàng, ô là giá trị hoặc {v, s}. o: {name, hi:[r,c] (ô giao đang xét, hiện mũi tên hàng/cột), title, note, rowLabel:'hàng', colLabel:'cột'} */
  function vGrid2D(rows, o){
    o = o || {}; var hr = o.hi ? o.hi[0] : -1, hc = o.hi ? o.hi[1] : -1, nc = rows[0] ? rows[0].length : 0;
    var h = '<div class="v-row">' + vTitle(o) + '<div class="v-g2"><table><tr><th class="cn">' + esc(o.name || '') + '</th>';
    for (var c = 0; c < nc; c++) h += '<th class="' + (c === hc ? 'hc' : '') + '">' + (c === hc ? '↓ ' : '') + '[' + c + ']</th>';
    h += '</tr>';
    rows.forEach(function(r, i){
      h += '<tr><th class="' + (i === hr ? 'hc' : '') + '">' + (i === hr ? '→ ' : '') + '[' + i + ']</th>' + r.map(function(x, j){ x = vO(x); var none = x.v === null || x.v === undefined; return '<td class="' + (vSt(x.s) + (i === hr && j === hc ? ' s-hi' : '') + (none ? ' none' : '')).trim() + '">' + (none ? '?' : esc(x.v)) + '</td>'; }).join('') + '</tr>';
    });
    return h + '</table></div>' + vNote(o) + '</div>';
  }
  /* vAcc(items, o): biến tích lũy (H49). items: [{k:'tong', v:39, op:'30 + 9 = 39', s:'hi'|'ok'|'new', crown:true (vương miện cho kỷ lục max/min)}]. o: {title, note} */
  function vAcc(items, o){
    o = o || {};
    return '<div class="v-row">' + vTitle(o) + '<div class="v-acc">' + items.map(function(x){
      return '<div class="v-acw' + vSt(x.s) + '"><small>' + (x.crown ? '<span class="v-crown">♛</span> ' : '') + esc(x.k) + '</small><b>' + esc(x.v === null || x.v === undefined ? '?' : x.v) + '</b>' + (x.op ? '<em>' + esc(x.op) + '</em>' : '') + '</div>';
    }).join('') + '</div>' + vNote(o) + '</div>';
  }
  /* vArgs(o): đối số → tham số → giá trị trả về (H50).
     o: {call:'tinhTong(3, 5)', args:[{v:'3', s}], fn:'int tinhTong(int a, int b)', params:[{name:'a', type:'int', v:'3', def:'10' (giá trị mặc định, xám nghiêng khi v trống), s:'new'|'bad'|'ok'|'alias', ref:'a' (tham chiếu: nhãn cam dán lên biến này, không có hộp mới)}],
         ret:{v:'8', to:'kq' (thay chỗ lời gọi, gán vào kq) | 'trash' (không ai nhận) | 'none'}, title, note} */
  function vArgs(o){
    var ci = '①②③④⑤⑥⑦⑧';
    var h = '<div class="v-row">' + vTitle(o) + '<div class="v-ag">';
    if (o.call) h += '<div class="v-agc"><span class="v-agl">Lời gọi</span><code>' + esc(o.call) + '</code>' + (o.args && o.args.length ? '<span class="v-agchips">' + o.args.map(function(a, i){ a = vO(a); return '<span class="v-agchip' + vSt(a.s) + '">' + ci.charAt(i) + ' ' + esc(a.v) + '</span>'; }).join('') + '</span>' : '') + '</div><div class="v-agarr">↓ ' + (o.params && o.params.some(function(p){ return p.ref; }) ? 'truyền vào' : 'chép giá trị vào') + '</div>';
    h += '<div class="v-agf"><div class="v-agfh">' + esc(o.fn || '') + '</div><div class="v-agps">';
    (o.params || []).forEach(function(p, i){
      var none = (p.v === null || p.v === undefined || p.v === '');
      h += '<div class="v-agp' + vSt(p.s) + (p.ref ? ' ref' : '') + '"><div class="v-agpn">' + ci.charAt(i) + ' ' + esc(p.name) + ' <i>' + esc(p.type || '') + '</i></div>' +
        (p.ref ? '<div class="v-agpv refv">bí danh của ' + esc(p.ref) + '</div>' : '<div class="v-agpv' + (none && p.def !== undefined ? ' def' : '') + (none && p.def === undefined ? ' none' : '') + '">' + esc(none ? (p.def !== undefined ? p.def + ' (mặc định)' : '?') : p.v) + '</div>') + '</div>';
    });
    if (!(o.params || []).length) h += '<div class="v-agp empty">(không có tham số)</div>';
    h += '</div></div>';
    if (o.ret && o.ret.to !== 'none') h += '<div class="v-agret' + (o.ret.to === 'trash' ? ' trash' : '') + '">↩ return <b>' + esc(o.ret.v) + '</b> ' + (o.ret.to === 'trash' ? '→ không ai nhận, giá trị bị bỏ đi' : '→ thay chỗ lời gọi' + (o.ret.to ? ', gán vào ' + esc(o.ret.to) : '')) + '</div>';
    return h + '</div>' + vNote(o) + '</div>';
  }
  function vCh(c){ return c === ' ' ? '␣' : c === '\n' ? '↵' : c === '\0' ? '\\0' : c; }
  /* vInBuf(text, o): băng bộ đệm bàn phím (H51). text: chuỗi gồm cả ' ' và '\n'. o: {pos: chỉ số con trỏ đọc ▲, used: số ký tự đã lấy (mờ),
       take:[from, to) (đoạn đang được lấy vào biến, vàng), drop: chỉ số ký tự bị bỏ (↵ getline xé bỏ / ignore), stuck: chỉ số ↵ sót lại (nhấp nháy), title:'Bộ đệm bàn phím', note} */
  function vInBuf(text, o){
    o = o || {}; var h = '<div class="v-row">' + vTitle(o || {title:'Bộ đệm bàn phím'}) + '<div class="v-ib">';
    if (!text.length) h += '<div class="v-ibempty">(bộ đệm trống: chương trình sẽ dừng chờ người dùng gõ)</div>';
    text.split('').forEach(function(c, i){
      var cls = 'v-ibc' + (c === ' ' || c === '\n' ? ' ws' : '') + (i < (o.used || 0) ? ' used' : '') + (o.take && i >= o.take[0] && i < o.take[1] ? ' s-hi' : '') + (o.drop === i ? ' drop' : '') + (o.stuck === i ? ' stuck' : '');
      h += '<div class="v-ibw"><div class="' + cls + '">' + esc(vCh(c)) + '</div>' + (o.pos === i ? '<div class="v-ibp">▲</div>' : '') + '</div>';
    });
    if (o.pos === text.length && text.length) h += '<div class="v-ibw"><div class="v-ibc end"></div><div class="v-ibp">▲</div></div>';
    return h + '</div>' + vNote(o) + '</div>';
  }
  /* vCharCmp(a, b, o): so sánh hai chuỗi từng ký tự theo mã ASCII (H52). o: {at: cột đang so (mặc định tự tìm cột khác đầu tiên), done:true (đã kết luận), title, note}
     Cột < at: '=' xanh; cột at: vàng/đỏ + "90 < 97"; cột sau: mờ. Chuỗi hết trước: ô '(hết)'. */
  function vCharCmp(a, b, o){
    o = o || {}; var n = Math.max(a.length, b.length), first = 0;
    while (first < n && a.charAt(first) === b.charAt(first) && first < Math.min(a.length, b.length)) first++;
    var at = o.at === undefined ? first : o.at;
    function cell(s, i, other){
      var has = i < s.length, c = has ? s.charAt(i) : '', st = i < at ? 'eq' : i === at ? 'hi' : 'dim';
      return '<div class="v-ccw ' + st + '"><div class="v-ccc' + (has ? '' : ' end') + '">' + (has ? esc(vCh(c)) : '(hết)') + '</div><div class="v-cca">' + (has ? c.charCodeAt(0) : '') + '</div></div>';
    }
    var h = '<div class="v-row">' + vTitle(o) + '<div class="v-cc">';
    [a, b].forEach(function(s, k){ h += '<div class="v-ccr"><span class="v-ccn">' + esc(k ? (o.nb || 'b') : (o.na || 'a')) + '</span>'; for (var i = 0; i < n; i++) h += cell(s, i); h += '</div>'; });
    h += '</div>';
    if (o.done !== false && at <= n) {
      var ca = at < a.length ? a.charCodeAt(at) : -1, cb = at < b.length ? b.charCodeAt(at) : -1, r;
      if (at >= n) r = 'Hai chuỗi giống hệt nhau: ' + (o.na || 'a') + ' == ' + (o.nb || 'b');
      else if (ca < 0 || cb < 0) r = (ca < 0 ? (o.na || 'a') : (o.nb || 'b')) + ' hết ký tự trước nên nhỏ hơn';
      else r = 'Cột [' + at + ']: ' + ca + (ca < cb ? ' < ' : ' > ') + cb + ' nên ' + (o.na || 'a') + (ca < cb ? ' < ' : ' > ') + (o.nb || 'b');
      h += '<div class="v-ccres">' + esc(r) + '</div>';
    }
    return h + vNote(o) + '</div>';
  }
  /* vChars(str, o): dải ký tự của chuỗi (H53). o: {name, idx:true, nul:true (char[]: thêm ô '\0' tím), cap: 20 (char[]: khay cố định cap ô), sel:[pos, len] (khung chọn substr), find: chỉ số (kính lúp ▲ tại ô tìm thấy), npos:true (không thấy),
       cells:{i: 'ok'|'bad'|'hi'|'new'|'dim'} (tô từng ô), spill:'chuỗi tràn sang vùng bên cạnh', neighbor:'tên biến bên cạnh', len:true (nhãn length/strlen), size:true (nhãn sizeof), title, note} */
  function vChars(str, o){
    o = o || {}; var cs = str.split(''), cells = o.cells || {}, total = Math.max(o.cap || 0, cs.length + (o.nul ? 1 : 0));
    var h = '<div class="v-row">' + vTitle(o) + '<div class="v-chs">' + (o.name ? '<div class="v-arrn">' + esc(o.name) + '</div>' : '') + '<div class="v-chsr">';
    for (var i = 0; i < total; i++) {
      var c, cls = 'v-chc';
      if (i < cs.length) { c = vCh(cs[i]); if (cs[i] === ' ') cls += ' ws'; }
      else if (o.nul && i === cs.length) { c = '\\0'; cls += ' nul'; }
      else { c = ''; cls += ' empty'; }
      if (o.sel && i >= o.sel[0] && i < o.sel[0] + o.sel[1]) cls += ' sel';
      if (cells[i]) cls += ' s-' + cells[i];
      h += '<div class="v-arw"><div class="' + cls + '">' + esc(c) + '</div>' + (o.idx === false ? '' : '<div class="v-arix">' + i + '</div>') + (o.find === i ? '<div class="v-arp">▲ tìm thấy</div>' : '') + '</div>';
    }
    if (o.spill) {
      h += '<div class="v-chguard">' + esc(o.neighbor || 'vùng nhớ bên cạnh') + '</div>';
      o.spill.split('').forEach(function(c){ h += '<div class="v-arw"><div class="v-chc s-bad">' + esc(vCh(c)) + '</div></div>'; });
    }
    h += '</div>';
    var tags = [];
    if (o.len) tags.push((o.nul ? 'strlen = ' : 'length() = ') + cs.length);
    if (o.size) tags.push('sizeof = ' + total + ' byte');
    if (o.sel) tags.push('substr(' + o.sel[0] + ', ' + o.sel[1] + ') = "' + str.substr(o.sel[0], o.sel[1]) + '"');
    if (o.npos) tags.push('không tìm thấy: trả về string::npos');
    if (tags.length) h += '<div class="v-badges">' + tags.map(function(t){ return '<span class="v-badge">' + esc(t) + '</span>'; }).join('') + '</div>';
    return h + '</div>' + vNote(o) + '</div>';
  }
  /* vOverload(o): máy chọn phiên bản hàm nạp chồng (H54). o: {call:'in(3.5)', types:['double'] (kiểu từng đối số),
       doors:[{sig:'in(int)', s:'ok' (khớp chính xác) | 'warn' (cần đổi kiểu) | 'no' (sai số lượng/không dùng được) | 'dim' (chưa xét) | 'bad' (trùng chữ ký), note}],
       result:{kind:'ok'|'ambig'|'none'|'dup', text}, title, note} */
  function vOverload(o){
    var h = '<div class="v-row">' + vTitle(o) + '<div class="v-ov">';
    if (o.call) h += '<div class="v-ovc"><code>' + esc(o.call) + '</code>' + (o.types ? o.types.map(function(t){ return '<span class="v-agchip">' + esc(t) + '</span>'; }).join('') : '') + '</div>';
    h += '<div class="v-ovd">' + (o.doors || []).map(function(d){
      var m = {ok:'✓ khớp chính xác', warn:'~ phải đổi kiểu', no:'✗ không khớp', bad:'✗ trùng chữ ký', dim:''}[d.s || 'dim'];
      return '<div class="v-ovdoor' + vSt(d.s) + '"><b>' + esc(d.sig) + '</b>' + (m ? '<span>' + m + '</span>' : '') + (d.note ? '<em>' + esc(d.note) + '</em>' : '') + '</div>';
    }).join('') + '</div>';
    if (o.result) h += '<div class="v-ovr k-' + o.result.kind + '">' + esc(o.result.text) + '</div>';
    return h + '</div>' + vNote(o) + '</div>';
  }
  /* vScanTop(o): vạch quét biên dịch + danh bạ hàm (H55). o: {book:[{sig:'int tinhTong(int, int)', kind:'hua' (đã khai báo/prototype) | 'than' (có thân hàm), s}],
       check:{call:'tinhTong(3, 5)', ok:true|false, msg:'...'}, link:{ok:true|false, msg}, title, note}. Dùng cùng khung code (snap ln) để thấy vạch quét đang ở dòng nào. */
  function vScanTop(o){
    var h = '<div class="v-row">' + vTitle(o) + '<div class="v-sc2"><div class="v-sch">Danh bạ hàm trình biên dịch đã biết</div>';
    h += (o.book && o.book.length) ? o.book.map(function(b){ return '<div class="v-scb' + vSt(b.s) + '"><code>' + esc(b.sig) + '</code><span class="k-' + b.kind + '">' + (b.kind === 'than' ? 'có thân hàm' : 'đã hứa (khai báo)') + '</span></div>'; }).join('') : '<div class="v-scb empty">(chưa biết hàm nào)</div>';
    h += '</div>';
    if (o.check) h += '<div class="v-zt k-' + (o.check.ok ? 'ok' : 'bad') + '"><span class="v-zw">Gặp lời gọi</span><span class="v-ztg">' + esc(o.check.call) + '</span><span class="v-zres">' + (o.check.ok ? '✓ có trong danh bạ' : '✗ chưa biết') + '</span>' + (o.check.msg ? '<em>' + esc(o.check.msg) + '</em>' : '') + '</div>';
    if (o.link) h += '<div class="v-zt k-' + (o.link.ok ? 'ok' : 'bad') + '"><span class="v-zw">Liên kết</span><span class="v-zres">' + (o.link.ok ? '✓ mọi lời hứa đều có thân hàm' : '✗ có lời hứa không có thân hàm') + '</span>' + (o.link.msg ? '<em>' + esc(o.link.msg) + '</em>' : '') + '</div>';
    return h + vNote(o) + '</div>';
  }
