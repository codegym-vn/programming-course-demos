// META {"module":4,"lesson":"Ghi File Văn bản","activity":"Ghi từng dòng và thêm mới nội dung","title":"Ghi từng dòng và thêm mới","lead":"Write không xuống dòng, WriteLine có xuống dòng, và cách mở tệp quyết định ghi đè hay ghi nối. Chọn tình huống rồi bấm <b>Bước tiếp</b>.","tabs":[["write","Write và WriteLine"],["over","Ghi đè (append: false)"],["app","Ghi nối (append: true)"]],"codeTitle":"Mã nguồn C#"}
var WR_OLD = 'Dòng cũ 1\nDòng cũ 2\n';
/* wrView: dựng các dòng cho vText. old = nội dung có sẵn, add = phần mới ghi (tô xanh), caret = vạch ghi |, delOld = gạch ngang phần cũ */
function wrView(old, add, caret, delOld){
  var lines = [[]], full = old + add;
  function push(seg, t, s){ var l = seg[seg.length - 1]; if (l && l.s === s) l.t += t; else seg.push({t: t, s: s}); }
  for (var i = 0; i < full.length; i++){
    var ch = full[i], s = i < old.length ? (delOld ? 'del' : undefined) : 'new', cur = lines[lines.length - 1];
    if (ch === '\n'){ push(cur, '↵', s); lines.push([]); } else push(cur, ch, s);
  }
  var last = lines[lines.length - 1];
  if (caret) last.push({t: '|', s: 'hi'});
  else if (!last.length && lines.length > 1) lines.pop();
  return lines.map(function(sg){ return {seg: sg.length ? sg : [{t: ''}]}; });
}
function wrBox(old, add, caret, delOld, title){
  var L = wrView(old, add, caret, delOld);
  return vText(L, {title: title, cursor: -1});
}
var EX = {
write:{inputs:[],chips:[],
 intro:'Hai lệnh Write và hai lệnh WriteLine nối tiếp nhau. Hãy nhìn vạch | là vị trí sẽ ghi tiếp. Bấm "Bước tiếp".',
 lines:function(){return [
  'using var w =',
  '  new StreamWriter("t.txt");',
  'w.Write("A");',
  'w.Write("B");',
  'w.WriteLine("C");',
  'w.WriteLine("D");'];},
 run:function(c){
  var t = '';
  function show(add, caret){ var old = t; t += add; return [wrBox(old, add, caret, false, 't.txt')]; }
  c.snap({ln:1,title:'Mở tệp mới',body:'Tệp t.txt đang rỗng. Vạch | là vị trí ghi.',viz:show('', true)});
  c.snap({ln:2,title:'Write("A")',body:'Write ghi chữ A và không xuống dòng. Vạch ghi đứng ngay sau A.',viz:show('A', true)});
  c.snap({ln:3,title:'Write("B")',body:'Write ghi tiếp B ngay cạnh A, vẫn cùng một dòng.',viz:show('B', true)});
  c.snap({ln:4,title:'WriteLine("C")',body:'WriteLine ghi C rồi thêm ký tự xuống dòng. Vạch ghi chuyển xuống đầu dòng mới.',viz:show('C\n', true)});
  c.snap({ln:5,title:'WriteLine("D")',body:'WriteLine ghi D rồi xuống dòng tiếp.',viz:show('D\n', true)});
  c.snap({ln:5,title:'Xong',body:'Tệp chứa "ABC↵D↵": 2 dòng. Write ghép các chữ lại, WriteLine kết thúc một dòng.',
   note:'Write ghi mà không xuống dòng. WriteLine ghi rồi xuống dòng.',viz:[wrBox(t, '', false, false, 't.txt')]});
 }},
over:{inputs:[],chips:[],
 intro:'Tệp t.txt đang có 2 dòng cũ. Mở StreamWriter theo cách mặc định rồi ghi 1 dòng. Bấm "Bước tiếp".',
 lines:function(){return [
  '// t.txt đang có 2 dòng cũ',
  'using var w =',
  '  new StreamWriter("t.txt");',
  'w.WriteLine("Dòng mới");'];},
 run:function(c){
  var nw = 'Dòng mới\n';
  function pair(delOld, after, caret, add){
    return vPair(wrBox(WR_OLD, '', false, delOld, 't.txt'), wrBox(after, add || '', caret, false, 't.txt'), {ta:'Trước', tb:'Sau', mid:'→'});
  }
  c.snap({ln:0,title:'Tệp cũ',body:'Trước khi chạy, t.txt có 2 dòng.',viz:[vPair(wrBox(WR_OLD, '', false, false, 't.txt'), vText([{t:'(chưa mở)',s:'dim'}],{title:'t.txt',noNo:true}), {ta:'Trước', tb:'Sau', mid:'→'})]});
  c.snap({ln:2,title:'Mở tệp: bị làm rỗng',body:'new StreamWriter("t.txt") mặc định là ghi đè, nên tệp bị làm rỗng ngay khi mở, chưa cần ghi gì.',viz:[vPair(wrBox(WR_OLD, '', false, true, 't.txt'), vText([{seg:[{t:'|',s:'hi'}]}],{title:'t.txt (rỗng)'}), {ta:'Trước', tb:'Sau', mid:'→'})]});
  c.snap({ln:3,title:'Ghi một dòng mới',body:'WriteLine ghi "Dòng mới" vào tệp đã rỗng.',viz:[pair(true, '', true, nw)]});
  c.snap({ln:3,title:'Xong',body:'Trước: 2 dòng. Sau: 1 dòng. Hai dòng cũ đã biến mất.',
   note:'Mặc định StreamWriter ghi đè và làm rỗng tệp cũ. Muốn giữ nội dung cũ hãy dùng append: true.',viz:[pair(true, nw, false)]});
 }},
app:{inputs:[],chips:[],
 intro:'Vẫn tệp t.txt có 2 dòng cũ, nhưng lần này mở với append: true. Bấm "Bước tiếp".',
 lines:function(){return [
  '// t.txt đang có 2 dòng cũ',
  'using var w =',
  '  new StreamWriter("t.txt",',
  '    append: true);',
  'w.WriteLine("Dòng mới");'];},
 run:function(c){
  var nw = 'Dòng mới\n';
  function pair(a, add, caret){
    return vPair(wrBox(WR_OLD, '', false, false, 't.txt'), wrBox(a, add, caret, false, 't.txt'), {ta:'Trước', tb:'Sau', mid:'→'});
  }
  c.snap({ln:0,title:'Tệp cũ',body:'Trước khi chạy, t.txt có 2 dòng.',viz:[vPair(wrBox(WR_OLD, '', false, false, 't.txt'), vText([{t:'(chưa mở)',s:'dim'}],{title:'t.txt',noNo:true}), {ta:'Trước', tb:'Sau', mid:'→'})]});
  c.snap({ln:3,title:'Mở tệp: giữ nguyên',body:'append: true giữ nội dung cũ và đặt vạch ghi ở cuối tệp.',viz:[pair(WR_OLD, '', true)]});
  c.snap({ln:4,title:'Ghi một dòng mới',body:'WriteLine thêm "Dòng mới" ngay sau hai dòng cũ.',viz:[pair(WR_OLD, nw, true)]});
  c.snap({ln:4,title:'Xong',body:'Trước: 2 dòng. Sau: 3 dòng. Hai dòng cũ vẫn còn.',
   note:'append: true (hoặc File.AppendAllText) giữ nội dung cũ và ghi thêm vào cuối.',viz:[pair(WR_OLD + nw, '', false)]});
 }}
};
