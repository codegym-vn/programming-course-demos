  /* ===== THƯ VIỆN HÌNH MINH HỌA (v*). Mỗi hàm trả về chuỗi HTML, đặt vào snap({viz: ...}).
     Trạng thái s: 'hi' vàng đang xét | 'ok' xanh | 'bad' đỏ | 'dim' mờ | 'new' vừa thêm | 'del' sắp xóa | 'no' xám ✗ | 'f1'..'f4' bốn màu theo trường */
  function vSt(s){ return s ? ' s-' + s : ''; }
  function vO(x){ return (x !== null && typeof x === 'object' && !Array.isArray(x)) ? x : {v:x}; }
  function vJoin(a){ return Array.isArray(a) ? a.join('') : (a || ''); }
  /* vCells(items, o): dãy ô. items: [giá trị | {v,s,sub,ix}]. o: {name, cap (số ô trống nét đứt hiện thêm), idx:false, small:true, ptr (chỉ số có mũi tên ▲), ptrLabel, badges:[[nhãn,giá trị]]} */
  function vCells(items, o){
    o = o || {}; var h = '<div class="v-row">' + (o.name ? '<div class="v-name">' + esc(o.name) + '</div>' : '') + '<div class="v-cells">';
    items.forEach(function(c, i){
      c = vO(c);
      h += '<div class="v-cw"><div class="v-cell' + vSt(c.s) + (o.small ? ' sm' : '') + '">' + (c.v === null || c.v === undefined ? '' : esc(c.v)) + '</div>' +
        (o.idx === false ? '' : '<div class="v-ix">' + (c.ix !== undefined ? esc(c.ix) : i) + '</div>') +
        (c.sub ? '<div class="v-sub">' + esc(c.sub) + '</div>' : '') +
        (o.ptr === i ? '<div class="v-ptr">▲' + (o.ptrLabel ? '<span>' + esc(o.ptrLabel) + '</span>' : '') + '</div>' : '') + '</div>';
    });
    for (var k = items.length; k < (o.cap || 0); k++) h += '<div class="v-cw"><div class="v-cell empty' + (o.small ? ' sm' : '') + '"></div>' + (o.idx === false ? '' : '<div class="v-ix">' + k + '</div>') + '</div>';
    h += '</div>';
    if (o.badges) h += '<div class="v-badges">' + o.badges.map(function(b){ return '<span class="v-badge">' + esc(b[0]) + ' <b>' + esc(b[1]) + '</b></span>'; }).join('') + '</div>';
    return h + '</div>';
  }
  /* vDrawers(entries, o): tủ ngăn kéo cho Dictionary. entries: [{k, v, s}]. o: {name, cap} */
  function vDrawers(entries, o){
    o = o || {}; var h = '<div class="v-row">' + (o.name ? '<div class="v-name">' + esc(o.name) + '</div>' : '') + '<div class="v-drawers">';
    entries.forEach(function(e){ h += '<div class="v-drawer' + vSt(e.s) + '"><div class="v-dk">' + esc(e.k) + '</div><div class="v-dv">' + esc(e.v) + '</div></div>'; });
    return h + '</div></div>';
  }
  /* vCard(o): thẻ thông tin/lỗi. o: {kind:'err'|'ok'|'info'|'warn', title, sub, lines:[...], rows:[[k,v]], tip} */
  function vCard(o){
    var h = '<div class="v-card k-' + (o.kind || 'info') + '"><div class="v-ct"><span class="v-ic">' + ({err:'!', ok:'✓', warn:'!', info:'i'}[o.kind || 'info']) + '</span>' + esc(o.title || '') + '</div>';
    if (o.sub) h += '<div class="v-cs">' + esc(o.sub) + '</div>';
    (o.lines || []).forEach(function(l){ h += '<div class="v-cl">' + esc(l) + '</div>'; });
    if (o.rows) h += '<div class="v-cr">' + o.rows.map(function(r){ return '<div><span>' + esc(r[0]) + '</span><b>' + esc(r[1]) + '</b></div>'; }).join('') + '</div>';
    if (o.tip) h += '<div class="v-tip">' + esc(o.tip) + '</div>';
    return h + '</div>';
  }
  /* vFlow(nodes, o): sơ đồ luồng. nodes: [{t, s, sub, item}] nối bằng mũi tên. item = viên nhỏ nằm trên nút (dữ liệu đang đi qua). o: {title} */
  function vFlow(nodes, o){
    o = o || {}; var h = '<div class="v-row">' + (o.title ? '<div class="v-name">' + esc(o.title) + '</div>' : '') + '<div class="v-flow">';
    nodes.forEach(function(n, i){
      h += (i ? '<div class="v-arr">→</div>' : '') + '<div class="v-fn' + vSt(n.s) + '">' + (n.item ? '<div class="v-item">' + esc(n.item) + '</div>' : '') + '<div class="v-ft">' + esc(n.t) + '</div>' + (n.sub ? '<div class="v-fs">' + esc(n.sub) + '</div>' : '') + '</div>';
    });
    return h + '</div></div>';
  }
  /* vGates(items, o): các cửa lọc xếp dọc (catch). items: [{t, s}] s: 'no' ✗ | 'ok' ✓ | 'dim' chưa xét | 'hi' đang xét. o: {pill: viên đỏ rơi, at: chỉ số cửa đang chứa viên} */
  function vGates(items, o){
    o = o || {}; var h = '<div class="v-gates">';
    if (o.pill && (o.at === undefined || o.at < 0)) h += '<div class="v-pillrow"><span class="v-pill">' + esc(o.pill) + '</span></div>';
    items.forEach(function(g, i){
      h += '<div class="v-gate' + vSt(g.s) + '"><span class="v-gm">' + (g.s === 'ok' ? '✓' : g.s === 'no' ? '✗' : '') + '</span><span class="v-gt">' + esc(g.t) + '</span>' + (o.pill && o.at === i ? '<span class="v-pill">' + esc(o.pill) + '</span>' : '') + '</div>';
    });
    return h + '</div>';
  }
  /* vTree(nodes): cây thụt lề. nodes: [{t, d (độ sâu), kind:'dir'|'file'|'cls', s, sub}] */
  function vTree(nodes){
    return '<div class="v-tree">' + nodes.map(function(n){
      return '<div class="v-tn' + vSt(n.s) + '" style="padding-left:' + ((n.d || 0) * 20 + 8) + 'px"><span class="v-ico ' + (n.kind || 'file') + '"></span><span>' + esc(n.t) + '</span>' + (n.sub ? '<em>' + esc(n.sub) + '</em>' : '') + '</div>';
    }).join('') + '</div>';
  }
  /* vStack(frames, o): ngăn xếp lời gọi, frames liệt kê từ ĐÁY (Main) lên ĐỈNH. frames: [{t, s, sub, ball}] ball:true = quả bóng đỏ (exception) đang ở khung này. o: {ballText} */
  function vStack(frames, o){
    o = o || {}; var h = '<div class="v-stack">';
    frames.slice().reverse().forEach(function(f){
      h += '<div class="v-sf' + vSt(f.s) + '"><span class="v-sft">' + esc(f.t) + '</span>' + (f.sub ? '<em>' + esc(f.sub) + '</em>' : '') + (f.ball ? '<span class="v-ball">' + esc(o.ballText || 'Exception') + '</span>' : '') + '</div>';
    });
    return h + '<div class="v-sbase">đáy: Main</div></div>';
  }
  /* vLamps(items, o): hàng đèn trạng thái. items: [{t, s, sub}] s: 'ok' xanh | 'bad' đỏ | 'hi' vàng | 'off' tắt */
  function vLamps(items, o){
    o = o || {}; var h = '<div class="v-row">' + (o.title ? '<div class="v-name">' + esc(o.title) + '</div>' : '') + '<div class="v-lamps">';
    items.forEach(function(l){ h += '<div class="v-lamp' + vSt(l.s) + '"><span class="v-bulb"></span><span class="v-lt">' + esc(l.t) + '</span>' + (l.sub ? '<em>' + esc(l.sub) + '</em>' : '') + '</div>'; });
    return h + '</div></div>';
  }
  /* vPair(a, b, o): hai khung cạnh nhau (a, b là HTML). o: {ta, tb, mid:'→'} */
  function vPair(a, b, o){
    o = o || {};
    return '<div class="v-pair"><div class="v-pbox"><div class="v-name">' + esc(o.ta || '') + '</div>' + vJoin(a) + '</div>' + (o.mid ? '<div class="v-mid">' + esc(o.mid) + '</div>' : '') + '<div class="v-pbox"><div class="v-name">' + esc(o.tb || '') + '</div>' + vJoin(b) + '</div></div>';
  }
  /* vText(lines, o): trình xem văn bản/tệp. lines: [chuỗi | {t, s} | {seg:[{t, s, c}]}]. c: 'str'|'num'|'bool'|'null'|'key'|'tag'. o: {title, cursor (dòng có ▶), eol:true (hiện ↵), noNo:true, caret:{line, col} (vạch | ghi)} */
  function vText(lines, o){
    o = o || {}; var h = '<div class="v-text">' + (o.title ? '<div class="v-ttl">' + esc(o.title) + '</div>' : '');
    lines.forEach(function(l, i){
      var body;
      if (l !== null && typeof l === 'object' && l.seg) body = l.seg.map(function(g){ return '<span class="' + (g.c ? 'c-' + g.c : '') + vSt(g.s) + '">' + esc(g.t) + '</span>'; }).join('');
      else { var t = typeof l === 'object' ? l.t : l; body = '<span class="' + (l && l.s ? vSt(l.s).trim() : '') + '">' + esc(t) + '</span>'; }
      h += '<div class="v-tl' + (l && l.s && !l.seg ? ' ln-' + l.s : '') + (o.cursor === i ? ' cur' : '') + '">' + (o.noNo ? '' : '<span class="v-tno">' + (o.cursor === i ? '▶' : (i + 1)) + '</span>') + '<span class="v-tb">' + body + (o.eol ? '<i>↵</i>' : '') + '</span></div>';
    });
    return h + '</div>';
  }
  /* vGrid(rows, o): bảng/lưới. rows: mảng các mảng ô (ô là chuỗi hoặc {t, s}). o: {head:true, hiRow, hiCell:[r,c], title} */
  function vGrid(rows, o){
    o = o || {}; var h = '<div class="v-grid">' + (o.title ? '<div class="v-ttl">' + esc(o.title) + '</div>' : '') + '<table>';
    rows.forEach(function(r, i){
      h += '<tr' + (o.hiRow === i ? ' class="hr"' : '') + '>' + r.map(function(c, j){ c = vO(c); var tag = (o.head && i === 0) ? 'th' : 'td'; return '<' + tag + ' class="' + vSt(c.s).trim() + ((o.hiCell && o.hiCell[0] === i && o.hiCell[1] === j) ? ' s-hi' : '') + '">' + esc(c.v === undefined ? c.t : c.v) + '</' + tag + '>'; }).join('') + '</tr>';
    });
    return h + '</table></div>';
  }
  /* vBuf(o): thanh bộ đệm đầy dần. o: {label, fill (0..100), text} */
  function vBuf(o){ return '<div class="v-buf"><div class="v-name">' + esc(o.label || 'Bộ đệm') + '</div><div class="v-bar"><i style="width:' + Math.max(0, Math.min(100, o.fill || 0)) + '%"></i></div><div class="v-bt">' + esc(o.text || '') + '</div></div>'; }
  /* vChips(parts, o): các chip (vd. đường dẫn). parts: [{t, s, label}] */
  function vChips(parts, o){
    o = o || {}; var h = '<div class="v-row">' + (o.title ? '<div class="v-name">' + esc(o.title) + '</div>' : '') + '<div class="v-chips">';
    parts.forEach(function(p){ h += '<div class="v-chw"><div class="v-chip' + vSt(p.s) + '">' + esc(p.t) + '</div>' + (p.label ? '<div class="v-chl">' + esc(p.label) + '</div>' : '') + '</div>'; });
    return h + '</div></div>';
  }
  /* vBins(a, b, o): hai thùng. a, b: {title, items:[{t, s}], kind:'ok'|'bad'} */
  function vBins(a, b, o){
    function bin(x){ return '<div class="v-bin k-' + (x.kind || 'ok') + '"><div class="v-bh">' + esc(x.title) + ' <b>' + (x.items || []).length + '</b></div>' + (x.items || []).map(function(it){ return '<div class="v-bi' + vSt(it.s) + '">' + esc(it.t) + '</div>'; }).join('') + ((x.items || []).length ? '' : '<div class="v-bi empty">(trống)</div>') + '</div>'; }
    return '<div class="v-bins">' + bin(a) + bin(b) + '</div>';
  }
  /* vScore(items): bộ đếm lớn. items: [{k, v, s}] */
  function vScore(items){ return '<div class="v-score">' + items.map(function(x){ return '<div class="v-sc' + vSt(x.s) + '"><small>' + esc(x.k) + '</small><b>' + esc(x.v) + '</b></div>'; }).join('') + '</div>'; }
  function vizHtml(v){ return Array.isArray(v) ? v.join('') : (v || ''); }
