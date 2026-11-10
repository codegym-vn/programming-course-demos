// META {"module":2,"lesson":"Bài 2.3. Toán tử và biểu thức","activity":"Toán Tử Trong C++","title":"Các toán tử dễ nhầm trong C++","lead":"Xem máy tính chia nguyên, chia dư, tăng giảm và kết hợp điều kiện từng bước. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["chia","/ và % (10 kẹo, 3 em)"],["giay","Đổi 3665 giây"],["tang","x++ và ++x"],["logic","&& và ||"]],"codeTitle":"Mã nguồn C++","path":"bien-kieu-du-lieu-va-toan-tu/toan-tu-va-bieu-thuc/toan-tu-trong-cpp/index.html"}
/* Hàm phụ dùng tiền tố b8 */
function b8Mem(list){ return vBoxes(list, {frame:'Bộ nhớ (RAM) · main()', empty:'main() chưa có biến nào.'}); }
function b8Fmt(x){ return String(Number(x.toPrecision(6))); } /* cout in 6 chữ số có nghĩa */
/* Thanh chia nhỏ: parts [{t, sub, sec, s}] */
function b8Bar(total, parts){
  var h = '<div class="v-row"><div class="v-name">Thanh ' + total + ' giây</div><div style="display:flex;gap:4px">';
  parts.forEach(function(p){
    var w = Math.max(p.sec / total, parts.length > 1 ? 0.2 : 1);
    var bg = p.s === 'ok' ? 'var(--true-soft)' : p.s === 'hi' ? 'var(--cur)' : 'var(--code-bg)';
    var bd = p.s === 'ok' ? 'var(--true)' : p.s === 'hi' ? 'var(--cur-bar)' : 'var(--node-line)';
    h += '<div style="flex:' + w.toFixed(3) + ' 1 0;min-width:0;background:' + bg + ';border:2px solid ' + bd + ';border-radius:8px;padding:6px 4px;text-align:center;line-height:1.25">' +
      '<b style="font-size:14px">' + esc(p.t) + '</b><div style="font-size:11px;color:var(--muted)">' + esc(p.sub) + '</div></div>';
  });
  return h + '</div></div>';
}

var EX = {
chia:{inputs:[{id:'a', label:'a (số kẹo)', def:10, min:0, max:15}, {id:'b', label:'b (số em)', def:3, min:1, max:6}],
 intro:'Chia a viên kẹo đều cho b em. Có thể đổi a, b ở ô nhập. Bấm "Bước tiếp".',
 lines:function(P){ return [
  'int a = ' + P.a + ';',
  'int b = ' + P.b + ';',
  'cout << a / b << endl;',
  'cout << a % b << endl;',
  'cout << (double)a / b << endl;']; },
 run:function(c, P){
  var a = P.a, b = P.b, q = Math.floor(a / b), r = a % b, d = b8Fmt(a / b);
  var A = function(s){ return {name:'a', type:'int', v:a, s:s}; };
  var B = function(s){ return {name:'b', type:'int', v:b, s:s}; };
  function candies(sha){
    var items = []; for (var i = 0; i < a; i++) items.push({v:'●', s:sha});
    return vCells(items, {name:a + ' viên kẹo', idx:false, small:true});
  }
  function share(hiQ, hiR){
    var em = []; for (var i = 0; i < b; i++) em.push({v:q, sub:'em ' + (i + 1), s:hiQ ? 'hi' : 'ok'});
    var du = []; for (var j = 0; j < r; j++) du.push({v:'●', s:hiR ? 'hi' : 'ok'});
    return [vCells(em, {name:'Mỗi em nhận (viên)', idx:false}), vCells(du.length ? du : [{v:'0', s:hiR ? 'hi' : null}], {name:'Kẹo còn dư', idx:false, small:true})];
  }
  function grid(hi){
    var rows = [['Phép tính', 'Kết quả'], ['a / b', q], ['a % b', r], ['(double)a / b', d]].slice(0, hi + 1);
    return vGrid(rows, {head:true, hiRow:hi});
  }
  c.snap({ln:0, title:'int a = ' + a, body:'Có ' + a + ' viên kẹo.', viz:[candies('new'), b8Mem([A('new')])]});
  c.snap({ln:1, title:'int b = ' + b, body:'Chia cho ' + b + ' em.', viz:[candies(null), b8Mem([A(), B('new')])]});
  c.out(String(q));
  c.snap({ln:2, title:'a / b = ' + q, body:'Chia nguyên: mỗi em nhận ' + q + ' viên. Phần dư bị bỏ, máy không làm tròn và không giữ số lẻ.',
   viz:share(true, false).concat([grid(1), b8Mem([A(), B()])])});
  c.out(String(r));
  c.snap({ln:3, title:'a % b = ' + r, body:'Dấu % cho phần dư: còn lại ' + r + ' viên chưa chia được. / và % luôn đi cùng nhau.',
   viz:share(false, true).concat([grid(2), b8Mem([A(), B()])])});
  c.out(d);
  c.snap({ln:4, title:'(double)a / b = ' + d, body:'Ép a thành số thực trước khi chia thì giữ được phần lẻ. cout in tối đa 6 chữ số có nghĩa.',
   viz:[grid(3), vCard({kind:'info', title:'Số thực giữ phần lẻ', sub:a + ' / ' + b + ' = ' + d + ' (không còn bị cắt)'}), b8Mem([A(), B()])]});
  c.snap({ln:4, title:'Xong', body:'Hai số nguyên chia nhau cho thương nguyên, % cho phần dư.',
   note:'Chia hai số nguyên thì mất phần lẻ; muốn số lẻ phải có ít nhất một số là số thực. % chỉ dùng cho số nguyên.',
   viz:[grid(3), b8Mem([A(), B()])]});
 }},

giay:{inputs:[{id:'giay', label:'tongGiay', def:'3665', text:'^[0-9]{1,5}$', msg:'Nhập số nguyên từ 0 đến 99999', w:90}], chips:['3665', '7200', '59'],
 intro:'Đổi tổng số giây ra giờ, phút, giây bằng / và %. Bấm "Bước tiếp".',
 lines:function(P){ return [
  'int tongGiay = ' + Number(P.giay) + ';',
  'int gio = tongGiay / 3600;',
  'int giayThua = tongGiay % 3600;',
  'int phut = giayThua / 60;',
  'int giay = giayThua % 60;',
  'cout << gio << " gio : "',
  '     << phut << " phut : "',
  '     << giay << " giay";']; },
 run:function(c, P){
  var T = Number(P.giay), gio = Math.floor(T / 3600), gt = T % 3600, phut = Math.floor(gt / 60), giay = gt % 60;
  var m = [];
  function mem(s){ return b8Mem(m.map(function(x, i){ return {name:x[0], type:'int', v:x[1], s:i === m.length - 1 ? s : null}; })); }
  var segGio = function(s){ return {t:gio + ' giờ', sub:gio * 3600 + ' giây', sec:gio * 3600, s:s}; };
  var segPhut = function(s){ return {t:phut + ' phút', sub:phut * 60 + ' giây', sec:phut * 60, s:s}; };
  var segGiay = function(s){ return {t:giay + ' giây', sub:'lẻ', sec:giay, s:s}; };
  m.push(['tongGiay', T]);
  c.snap({ln:0, title:'tongGiay = ' + T, body:'Có ' + T + ' giây cần đổi ra giờ : phút : giây.', viz:[b8Bar(T || 1, [{t:T + ' giây', sub:'tổng', sec:T || 1, s:'hi'}]), mem('new')]});
  m.push(['gio', gio]);
  c.snap({ln:1, title:'gio = ' + T + ' / 3600 = ' + gio, body:'Chia nguyên cho 3600 (1 giờ) được ' + gio + ' giờ. Phần lẻ bị bỏ ở bước này sẽ được lấy bằng phép % ở bước sau.',
   viz:[b8Bar(T || 1, [segGio('ok'), {t:gt + ' giây', sub:'còn lại', sec:gt, s:'hi'}]), mem('new')]});
  m.push(['giayThua', gt]);
  c.snap({ln:2, title:'giayThua = ' + T + ' % 3600 = ' + gt, body:'Phép % lấy đúng phần còn lại sau khi trừ ' + gio + ' giờ: ' + gt + ' giây.',
   viz:[b8Bar(T || 1, [segGio('ok'), {t:gt + ' giây', sub:'giayThua', sec:gt, s:'hi'}]), mem('new')]});
  m.push(['phut', phut]);
  c.snap({ln:3, title:'phut = ' + gt + ' / 60 = ' + phut, body:'Chia nguyên ' + gt + ' giây cho 60 được ' + phut + ' phút.',
   viz:[b8Bar(T || 1, [segGio('ok'), segPhut('ok'), {t:giay + ' giây', sub:'còn lại', sec:giay, s:'hi'}]), mem('new')]});
  m.push(['giay', giay]);
  c.snap({ln:4, title:'giay = ' + gt + ' % 60 = ' + giay, body:'Phần dư của phép chia cho 60 là ' + giay + ' giây lẻ.',
   viz:[b8Bar(T || 1, [segGio('ok'), segPhut('ok'), segGiay('hi')]), mem('new')]});
  c.write(gio + ' gio : ');
  c.snap({ln:5, title:'In giờ', body:'In ' + gio + ' rồi chữ " gio : ".', viz:[b8Bar(T || 1, [segGio('hi'), segPhut('ok'), segGiay('ok')]), mem(null)]});
  c.write(phut + ' phut : ');
  c.snap({ln:6, title:'In phút', body:'In ' + phut + ' rồi chữ " phut : ".', viz:[b8Bar(T || 1, [segGio('ok'), segPhut('hi'), segGiay('ok')]), mem(null)]});
  c.write(giay + ' giay');
  c.snap({ln:7, title:'Xong', body:'Kết quả: ' + T + ' giây = ' + gio + ' giờ ' + phut + ' phút ' + giay + ' giây.',
   note:'/ lấy phần nguyên, % lấy phần dư. Hai phép này thường đi cùng nhau khi đổi đơn vị.',
   viz:[b8Bar(T || 1, [segGio('ok'), segPhut('ok'), segGiay('ok')]), mem(null)]});
 }},

tang:{inputs:[],
 intro:'Cả x++ và ++x đều tăng 1, nhưng thứ tự dùng giá trị khác nhau. Bấm "Bước tiếp".',
 lines:function(){ return [
  'int x = 10;',
  'cout << x++ << endl;',
  'cout << x << endl;',
  'int y = 10;',
  'cout << ++y << endl;']; },
 run:function(c){
  var X = function(v, s){ return {name:'x', type:'int', v:v, s:s}; };
  var Y = function(v, s){ return {name:'y', type:'int', v:v, s:s}; };
  c.snap({ln:0, title:'int x = 10', body:'Hộp x chứa 10.', viz:[b8Mem([X(10, 'new')])]});
  c.out('10');
  c.snap({ln:1, title:'x++ : dùng giá trị cũ',
   body:'Máy "chụp ảnh" giá trị hiện tại (10) và đưa ảnh đó ra màn hình trước. Hộp x lúc này vẫn là 10.',
   viz:[vFlow([{t:'Hộp x = 10', s:'hi'}, {t:'Ảnh chụp: 10', s:'hi', item:'10'}, {t:'Màn hình: 10', s:'ok'}], {title:'x++ : in rồi mới tăng'}), b8Mem([X(10, 'hi')])]});
  c.snap({ln:1, title:'x++ : rồi mới tăng',
   body:'Sau khi đã in, máy mới cộng 1 vào hộp x. Màn hình đã in 10 nhưng x giờ là 11.',
   viz:[vFlow([{t:'Hộp x = 11', s:'ok'}, {t:'Ảnh chụp: 10 (đã in)', s:'dim'}, {t:'Màn hình: 10', s:'dim'}], {title:'x++ : in rồi mới tăng'}), b8Mem([X(11, 'new')])]});
  c.out('11');
  c.snap({ln:2, title:'In x = 11', body:'Dòng sau in x thì thấy giá trị mới 11.', viz:[b8Mem([X(11, 'hi')])]});
  c.snap({ln:3, title:'int y = 10', body:'Thêm hộp y chứa 10.', viz:[b8Mem([X(11), Y(10, 'new')])]});
  c.out('11');
  c.snap({ln:4, title:'++y : tăng trước, dùng sau',
   body:'Máy cộng 1 vào hộp y trước (10 thành 11), rồi mới đưa giá trị 11 ra màn hình.',
   viz:[vFlow([{t:'Hộp y: 10 → 11', s:'ok'}, {t:'Giá trị mới: 11', s:'hi', item:'11'}, {t:'Màn hình: 11', s:'ok'}], {title:'++y : tăng rồi mới in'}), b8Mem([X(11), Y(11, 'new')])]});
  c.snap({ln:4, title:'Xong', body:'x++ in giá trị cũ rồi mới tăng, ++y tăng rồi mới in giá trị mới.',
   note:'x++ dùng giá trị cũ rồi mới tăng; ++x tăng trước rồi mới dùng. Nếu dễ nhầm, tách dòng x++; ra riêng.',
   viz:[b8Mem([X(11), Y(11)])]});
 }},

logic:{inputs:[{id:'co', label:'coTien (1 = true)', def:1, min:0, max:1}, {id:'dep', label:'troiDep (1 = true)', def:0, min:0, max:1}],
 intro:'Hai công tắc coTien và troiDep. Đổi giá trị 0 hoặc 1 ở ô nhập để thử đủ 4 trường hợp. Bấm "Bước tiếp".',
 lines:function(P){ return [
  'bool coTien = ' + (P.co ? 'true' : 'false') + ';',
  'bool troiDep = ' + (P.dep ? 'true' : 'false') + ';',
  'cout << (coTien && troiDep) << endl;',
  'cout << (coTien || troiDep) << endl;',
  'cout << (!troiDep) << endl;']; },
 run:function(c, P){
  var co = !!P.co, dep = !!P.dep, and = co && dep, or = co || dep, not = !dep;
  var sw = function(on, name){ return {t:name, s:on ? 'ok' : 'off', sub:on ? 'bật (true)' : 'tắt (false)'}; };
  var lamp = function(on, name){ return {t:name, s:on ? 'ok' : 'off', sub:on ? 'sáng: 1' : 'tắt: 0'}; };
  var A = function(s){ return {name:'coTien', type:'bool', v:co ? 'true' : 'false', s:s}; };
  var B = function(s){ return {name:'troiDep', type:'bool', v:dep ? 'true' : 'false', s:s}; };
  c.snap({ln:0, title:'coTien = ' + (co ? 'true' : 'false'), body:'Công tắc coTien ' + (co ? 'đang bật.' : 'đang tắt.'), viz:[vLamps([sw(co, 'coTien')], {title:'Công tắc'}), b8Mem([A('new')])]});
  c.snap({ln:1, title:'troiDep = ' + (dep ? 'true' : 'false'), body:'Công tắc troiDep ' + (dep ? 'đang bật.' : 'đang tắt.'), viz:[vLamps([sw(co, 'coTien'), sw(dep, 'troiDep')], {title:'Công tắc'}), b8Mem([A(), B('new')])]});
  c.out(and ? '1' : '0');
  c.snap({ln:2, title:'&& : mạch nối tiếp → ' + (and ? 1 : 0),
   body:'AND cần cả hai công tắc bật thì đèn mới sáng.' + (!co ? ' Vì coTien đã false nên C++ không cần xét tiếp troiDep (đánh giá tắt).' : ''),
   viz:[vLamps([sw(co, 'coTien'), sw(dep, 'troiDep'), lamp(and, 'Đèn AND')], {title:'Mạch nối tiếp: cả hai cùng bật'}), b8Mem([A(), B()])]});
  c.out(or ? '1' : '0');
  c.snap({ln:3, title:'|| : mạch song song → ' + (or ? 1 : 0),
   body:'OR chỉ cần một công tắc bật là đèn sáng.' + (co ? ' Vì coTien đã true nên C++ không cần xét tiếp troiDep (đánh giá tắt).' : ''),
   viz:[vLamps([sw(co, 'coTien'), sw(dep, 'troiDep'), lamp(or, 'Đèn OR')], {title:'Mạch song song: một công tắc là đủ'}), b8Mem([A(), B()])]});
  c.out(not ? '1' : '0');
  c.snap({ln:4, title:'! : đảo công tắc → ' + (not ? 1 : 0),
   body:'Dấu ! đảo ngược troiDep: ' + (dep ? 'đang true thành false' : 'đang false thành true') + '.',
   viz:[vLamps([sw(dep, 'troiDep'), lamp(not, 'Đèn NOT')], {title:'Đảo công tắc'}), b8Mem([A(), B()])]});
  c.snap({ln:4, title:'Xong', body:'Với coTien = ' + (co ? 1 : 0) + ', troiDep = ' + (dep ? 1 : 0) + ' ta được AND = ' + (and ? 1 : 0) + ', OR = ' + (or ? 1 : 0) + ', NOT = ' + (not ? 1 : 0) + '. Hãy đổi ô nhập để xem 3 kết quả đổi theo.',
   note:'&& cần cả hai vế đúng; || chỉ cần một vế đúng; ! đảo ngược. cout in true là 1, false là 0.',
   viz:[vLamps([sw(co, 'coTien'), sw(dep, 'troiDep'), lamp(and, 'AND'), lamp(or, 'OR'), lamp(not, 'NOT')], {title:'Tổng kết'}), b8Mem([A(), B()])]});
 }}
};
