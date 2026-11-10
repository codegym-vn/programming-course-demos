  /* vBlueprint(o): khuôn lớp → các đối tượng (H40). o: {cls:'SinhVien', fields:['string ten','int tuoi'], methods:['gioiThieu()'], ctor:'SinhVien(string t, int a)' (hiện ổ cắm constructor), ctorS:'hi',
       objs:[{name:'sv1', vals:[['ten','"An"'],['tuoi','20']], s:'new'|'hi'|'ok'|'dim'|'bad', sub:'chú thích nhỏ'}], arrow:'tạo ra', title, note} */
  function vBlueprint(o){
    var h = '<div class="v-row">' + (o.title ? '<div class="v-name">' + esc(o.title) + '</div>' : '') + '<div class="v-bp"><div class="v-bpc"><div class="v-bph"><small>class (khuôn)</small>' + esc(o.cls) + '</div>';
    (o.fields || []).forEach(function(f){ f = vO(typeof f === 'string' ? {v:f} : f); h += '<div class="v-bpf' + vSt(f.s) + '">' + esc(f.v) + '</div>'; });
    if (o.methods && o.methods.length) h += '<div class="v-bpsep"></div>' + o.methods.map(function(m){ m = typeof m === 'string' ? {v:m} : m; return '<div class="v-bpf m' + vSt(m.s) + '">' + esc(m.v) + '</div>'; }).join('');
    if (o.ctor) h += '<div class="v-bpctor' + vSt(o.ctorS) + '">' + esc(o.ctor) + '</div>';
    h += '</div>';
    var objs = o.objs || [];
    h += '<div class="v-bpa">' + esc(o.arrow || 'tạo ra') + '<i></i></div><div class="v-bpos">';
    h += objs.length ? objs.map(function(b){
      return '<div class="v-bpo' + vSt(b.s) + '"><div class="v-bpoh">' + esc(b.name) + ' <small>' + esc(o.cls) + '</small></div>' + (b.vals || []).map(function(v){ return '<div class="v-bpov' + vSt(v[2]) + '"><span>' + esc(v[0]) + '</span><b>' + esc(v[1]) + '</b></div>'; }).join('') + (b.sub ? '<div class="v-bpos-sub">' + esc(b.sub) + '</div>' : '') + '</div>';
    }).join('') : '<div class="v-bpempty">Chưa có đối tượng nào. Khuôn chưa chiếm chỗ cho dữ liệu.</div>';
    return h + '</div></div>' + (o.note ? '<div class="v-rnote">' + esc(o.note) + '</div>' : '') + '</div>';
  }
  /* vZones(o): các phòng phạm vi truy cập trong một lớp (H41). o: {cls:'TaiKhoan', zones:[{kind:'private'|'protected'|'public', items:['soDu' | {v,s}], s}],
       tests:[{who:'main()', target:'tk.soDu', ok:false, note:'bị chặn: soDu là private'}], title, note}
       private: ổ khóa, chỉ code trong lớp; protected: khóa có ngoại lệ cho lớp con; public: cửa mở */
  function vZones(o){
    var lab = {'private':'chỉ code bên trong lớp', 'protected':'trong lớp và lớp con', 'public':'ai cũng dùng được'};
    var h = '<div class="v-row">' + (o.title ? '<div class="v-name">' + esc(o.title) + '</div>' : '') + '<div class="v-zn"><div class="v-znh">class ' + esc(o.cls) + '</div><div class="v-zrooms">';
    (o.zones || []).forEach(function(z){
      h += '<div class="v-zr k-' + z.kind + vSt(z.s) + '"><div class="v-zrh"><span class="v-zlock ' + z.kind + '"></span><b>' + esc(z.kind) + '</b><em>' + esc(lab[z.kind] || '') + '</em></div><div class="v-zit">' +
        (z.items || []).map(function(it){ it = typeof it === 'string' ? {v:it} : it; return '<span class="' + vSt(it.s).trim() + '">' + esc(it.v) + '</span>'; }).join('') + '</div></div>';
    });
    h += '</div></div>';
    if (o.tests && o.tests.length) h += '<div class="v-ztests">' + o.tests.map(function(t){
      var st = t.ok === undefined ? 'wait' : (t.ok ? 'ok' : 'bad');
      return '<div class="v-zt k-' + st + '"><span class="v-zw">' + esc(t.who) + '</span><span class="v-za">→</span><span class="v-ztg">' + esc(t.target) + '</span><span class="v-zres">' + (st === 'ok' ? '✓ được phép' : st === 'bad' ? '✗ bị chặn' : '… đang thử') + '</span>' + (t.note ? '<em>' + esc(t.note) + '</em>' : '') + '</div>';
    }).join('') + '</div>';
    return h + (o.note ? '<div class="v-rnote">' + esc(o.note) + '</div>' : '') + '</div>';
  }
  /* vLayers(o): đối tượng lớp con xếp tầng (H42). layers liệt kê từ ĐÁY (lớp cha gốc) lên ĐỈNH (lớp con).
       layers: [{cls:'DongVat', items:['string ten','an()'], s:'new'|'ok'|'hi'|'del'|'dim'|'wait', sub:'đã dựng xong'}]
       s:'wait' = tầng chưa dựng (nét đứt, mờ); s:'del' = tầng đang bị gỡ (đỏ). o: {name:'Đối tượng c', title, note} */
  function vLayers(o){
    var h = '<div class="v-row">' + (o.title ? '<div class="v-name">' + esc(o.title) + '</div>' : '') + '<div class="v-ly">' + (o.name ? '<div class="v-lyn">' + esc(o.name) + '</div>' : '');
    (o.layers || []).slice().reverse().forEach(function(l){
      h += '<div class="v-lyl' + vSt(l.s) + '"><div class="v-lyc">' + esc(l.cls) + (l.sub ? '<em>' + esc(l.sub) + '</em>' : '') + '</div><div class="v-lyi">' + (l.items || []).map(function(it){ it = typeof it === 'string' ? {v:it} : it; return '<span class="' + vSt(it.s).trim() + '">' + esc(it.v) + '</span>'; }).join('') + '</div></div>';
    });
    return h + '<div class="v-lybase">nền móng: lớp cha dựng trước</div></div>' + (o.note ? '<div class="v-rnote">' + esc(o.note) + '</div>' : '') + '</div>';
  }
  /* vLookup(o): kính lúp tra phương thức theo chuỗi kế thừa (H43). o: {call:'c.keu()', chain:[{cls:'Cho', m:'keu()', has:true, s:'hi'|'ok'|'no'|'dim'}], note, title}
       chain đi từ lớp của đối tượng (trái) lên lớp cha (phải). s:'ok' = tìm thấy và dùng; 'no' = không có, đi tiếp; 'dim' = không cần xét. */
  function vLookup(o){
    var h = '<div class="v-row">' + (o.title ? '<div class="v-name">' + esc(o.title) + '</div>' : '') + '<div class="v-lk"><div class="v-lkc"><span class="v-lens"></span>' + esc(o.call) + '</div><div class="v-lkch">';
    (o.chain || []).forEach(function(c, i){
      h += (i ? '<div class="v-lka">lên lớp cha →</div>' : '') + '<div class="v-lkb' + vSt(c.s) + '"><b>' + esc(c.cls) + '</b><span>' + (c.has ? 'có ' + esc(c.m) : 'không có ' + esc(c.m)) + '</span>' + (c.s === 'ok' ? '<em>✓ dùng bản này</em>' : c.s === 'no' ? '<em>✗ tìm tiếp</em>' : '') + '</div>';
    });
    return h + '</div></div>' + (o.note ? '<div class="v-rnote">' + esc(o.note) + '</div>' : '') + '</div>';
  }
  /* vTimeline(o): vòng đời đối tượng (H44). o: {events:['Bắt đầu main()', ...] (mốc thời gian, trái → phải), now: chỉ số mốc hiện tại,
       bars:[{name:'sv1', from:0, to:3 (null = còn sống tới mốc hiện tại), s:'ok'|'hi'|'bad'|'dim', leak:true (nhãn rò rỉ), end:'~SinhVien()'}], title, note} */
  function vTimeline(o){
    var ev = o.events || [], n = ev.length, now = o.now === undefined ? n - 1 : o.now, cols = 'grid-template-columns:repeat(' + n + ',minmax(0,1fr))';
    var h = '<div class="v-row">' + (o.title ? '<div class="v-name">' + esc(o.title) + '</div>' : '') + '<div class="v-tlw"><div class="v-tlx" style="' + cols + '">';
    ev.forEach(function(e, i){ h += '<div class="v-tle' + (i === now ? ' now' : i > now ? ' fut' : '') + '"><i></i><span>' + esc(e) + '</span></div>'; });
    h += '</div>';
    (o.bars || []).forEach(function(b){
      var to = (b.to === null || b.to === undefined) ? now : Math.min(b.to, now);
      if (b.from > now) return;
      h += '<div class="v-tlr"><div class="v-tln">' + esc(b.name) + '</div><div class="v-tlg" style="' + cols + '"><div class="v-tlb' + vSt(b.leak ? 'bad' : b.s) + '" style="grid-column:' + (b.from + 1) + ' / ' + (to + 2) + '">' + (b.leak ? 'chưa giải phóng: rò rỉ' : esc(b.end && b.to !== null && b.to !== undefined && b.to <= now ? b.end : 'đang sống')) + '</div></div></div>';
    });
    return h + '</div>' + (o.note ? '<div class="v-rnote">' + esc(o.note) + '</div>' : '') + '</div>';
  }
  /* vFlags(o): bảng đèn trạng thái của stream (H45). o: {stream:'file', flags:[{n:'good()', v:true, k:'ok'|'hi'|'bad'}], title, note}
       Đèn sáng (màu k) khi v true, tắt (xám) khi false; luôn ghi true/false bên dưới. Mặc định k: good→ok, eof→hi, fail/bad→bad. */
  function vFlags(o){
    var def = {'good()':'ok', 'eof()':'hi', 'fail()':'bad', 'bad()':'bad'};
    var h = '<div class="v-row">' + (o.title ? '<div class="v-name">' + esc(o.title) + '</div>' : '') + '<div class="v-flg">' + (o.stream ? '<div class="v-flgs">' + esc(o.stream) + '</div>' : '');
    (o.flags || []).forEach(function(f){ var k = f.k || def[f.n] || 'ok'; h += '<div class="v-fl' + (f.v ? ' on k-' + k : '') + '"><span class="v-flb"></span><b>' + esc(f.n) + '</b><em>' + (f.v ? 'true' : 'false') + '</em></div>'; });
    return h + '</div>' + (o.note ? '<div class="v-rnote">' + esc(o.note) + '</div>' : '') + '</div>';
  }
  /* vModes(o): công tắc chế độ mở file (H46). o: {modes:[{n:'ios::in', sub:'đọc', on:true}], title, note}. Ghép thêm vText/vPair để hiện nội dung tệp trước/sau. */
  function vModes(o){
    var h = '<div class="v-row">' + (o.title ? '<div class="v-name">' + esc(o.title) + '</div>' : '') + '<div class="v-mds">';
    (o.modes || []).forEach(function(m){ h += '<div class="v-md' + (m.on ? ' on' : '') + '"><span class="v-mdt"><i></i></span><b>' + esc(m.n) + '</b>' + (m.sub ? '<em>' + esc(m.sub) + '</em>' : '') + '</div>'; });
    return h + '</div>' + (o.note ? '<div class="v-rnote">' + esc(o.note) + '</div>' : '') + '</div>';
  }
