// META {"module":4,"lesson":"Ghi File Văn bản","activity":"Thực hành tạo file cấu hình đơn giản","title":"Tạo file cấu hình đơn giản","lead":"Lưu cấu hình dạng key=value ra tệp rồi đọc lại thành Dictionary. Chọn tình huống rồi bấm <b>Bước tiếp</b>.","tabs":[["ghi","Ghi cấu hình"],["doc","Đọc cấu hình"]],"codeTitle":"Mã nguồn C#"}
var CFG = [['theme', 'dark'], ['fontSize', '14'], ['url', 'https://a.vn/?x=1']];
function cfgSplit2(line){ var i = line.indexOf('='); return i < 0 ? [line] : [line.slice(0, i), line.slice(i + 1)]; }
function cfgDr(d, o){ return vDrawers(d, o).split('<div class="v-dv">').join('<div class="v-dv" style="font-size:11px;word-break:break-all;overflow:visible">'); }
var EX = {
ghi:{inputs:[],chips:[],
 intro:'Dictionary settings có 3 cặp. Hãy xem mỗi cặp trở thành một dòng key=value trong tệp. Bấm "Bước tiếp".',
 lines:function(){return [
  'var settings =',
  '  new Dictionary<string, string>',
  '{',
  '  ["theme"] = "dark",',
  '  ["fontSize"] = "14",',
  '  ["url"] = "https://a.vn/?x=1"',
  '};',
  'using var w =',
  '  new StreamWriter("config.txt");',
  'foreach (var kv in settings)',
  '  w.WriteLine(',
  '    $"{kv.Key}={kv.Value}");'];},
 run:function(c){
  function show(n, cur){
    var d = CFG.map(function(p, i){ return {k: p[0], v: p[1], s: i === cur ? 'hi' : (i < n ? 'ok' : undefined)}; });
    var f = CFG.slice(0, n).map(function(p, i){ return {t: p[0] + '=' + p[1], s: i === cur ? 'new' : undefined}; });
    if (!f.length) f = [{t: '(tệp rỗng)', s: 'dim'}];
    return [vPair(cfgDr(d, {name: 'settings'}), vText(f, {title: 'config.txt'}), {mid: '→'})];
  }
  c.snap({ln:5,title:'Dictionary có 3 cặp',body:'settings chứa theme, fontSize và url, mỗi cặp gồm một khóa và một giá trị.',viz:show(0, -1)});
  c.snap({ln:8,title:'Mở config.txt',body:'StreamWriter tạo tệp config.txt, lúc đầu còn rỗng.',viz:show(0, -1)});
  for (var i = 0; i < CFG.length; i++){
    c.snap({ln:11,title:'Ghi cặp ' + CFG[i][0],body:'Chuỗi $"{kv.Key}={kv.Value}" cho ra "' + CFG[i][0] + '=' + CFG[i][1] + '" và WriteLine ghi nó thành một dòng.',
     vars:[['kv.Key',S(CFG[i][0]),1],['kv.Value',S(CFG[i][1]),1]],viz:show(i + 1, i)});
  }
  c.snap({ln:11,title:'Xong',body:'Mỗi cặp một dòng, tổng cộng ' + CFG.length + ' dòng dạng key=value.',
   note:'Ghi và đọc phải cùng một quy ước định dạng. Ở đây quy ước là key=value, mỗi cặp một dòng.',viz:show(CFG.length, -1)});
 }},
doc:{inputs:[],chips:[],
 intro:'Tệp config.txt có một dòng ghi chú và một dòng sai định dạng. Hãy xem dòng nào được đưa vào Dictionary. Bấm "Bước tiếp".',
 lines:function(){return [
  'var d =',
  '  new Dictionary<string, string>();',
  'var all =',
  '  File.ReadAllLines("config.txt");',
  'foreach (var line in all)',
  '{',
  '  if (line.StartsWith("#")) continue;',
  '  var p = line.Split(\'=\', 2);',
  '  if (p.Length < 2) continue;',
  '  d[p[0]] = p[1];',
  '}'];},
 run:function(c){
  var file = ['# Cấu hình', 'theme=dark', 'fontSize=14', 'url=https://a.vn/?x=1', 'abc'];
  var st = file.map(function(){ return undefined; }), dict = [];
  function show(cur){
    var L = file.map(function(t, i){ return {t: t, s: i === cur ? 'hi' : st[i]}; });
    var d = dict.map(function(e, i){ return {k: e[0], v: e[1], s: (i === dict.length - 1 && cur >= 0 && st[cur] === 'ok') ? 'new' : undefined}; });
    return [vPair(vText(L, {title: 'config.txt', cursor: cur}), cfgDr(d.length ? d : [{k: '-', v: '(trống)', s: 'dim'}], {name: 'd'}), {mid: '→'})];
  }
  c.snap({ln:3,title:'ReadAllLines',body:'Đọc cả tệp thành mảng ' + file.length + ' dòng. Dictionary d còn trống.',vars:[['all.Length',file.length]],viz:show(-1)});
  st[0] = 'no';
  c.snap({ln:6,title:'Dòng ghi chú',body:'"# Cấu hình" bắt đầu bằng # nên bị bỏ qua (continue).',vars:[['line',S(file[0]),1]],viz:show(0)});
  [1, 2].forEach(function(i){
    var p = cfgSplit2(file[i]); st[i] = 'ok'; dict.push(p);
    c.snap({ln:9,title:'Dòng ' + p[0],body:'Split(\'=\', 2) tách "' + file[i] + '" thành ["' + p[0] + '", "' + p[1] + '"], rồi thêm vào Dictionary.',
     vars:[['line',S(file[i]),1]],arrs:[AR('p',p,[],[1],[])],viz:show(i)});
  });
  var p3 = cfgSplit2(file[3]); st[3] = 'ok'; dict.push(p3);
  c.snap({ln:7,title:'Dòng url có thêm dấu =',body:'Split(\'=\', 2) chỉ tách ở dấu = đầu tiên, nên "' + p3[1] + '" giữ nguyên cả dấu = thứ hai.',
   vars:[['line',S(file[3]),1]],arrs:[AR('p',p3,[],[1],[])],viz:show(3)});
  var p4 = cfgSplit2(file[4]); st[4] = 'no';
  c.snap({ln:8,title:'Dòng sai định dạng',body:'"abc" không có dấu =, Split chỉ cho ra ' + p4.length + ' phần tử (p.Length < 2) nên bị bỏ qua.',
   vars:[['line',S(file[4]),1]],arrs:[AR('p',p4,[],[],[])],viz:show(4)});
  c.snap({ln:10,title:'Xong',body:'Dictionary có ' + dict.length + ' cặp. Hai dòng ghi chú và sai định dạng đã được bỏ qua.',
   note:'Ghi và đọc phải cùng một quy ước. Split(\'=\', 2) giúp giá trị được phép chứa dấu =.',viz:show(-1)});
 }}
};
