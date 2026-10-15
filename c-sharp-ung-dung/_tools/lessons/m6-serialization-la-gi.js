// META {"module":6,"lesson":"Giới Thiệu về Serialization và Khái Niệm Cơ Bản","activity":"Khái niệm Serialization là gì?","title":"Serialization là gì?","lead":"Serialize biến đối tượng thành chuỗi để lưu hoặc gửi đi; Deserialize dựng lại đối tượng từ chuỗi đó. Chọn chiều rồi bấm <b>Bước tiếp</b>.","tabs":[["ser","Serialize"],["des","Deserialize"]],"codeTitle":"Mã nguồn C#"}
var G7O = {Name:'An', Age:20};
var G7J = JSON.stringify(G7O);
var G7CLS = ['class Person', '{', '  public string Name { get; set; }', '  public int Age { get; set; }', '}'];
function g7Ram(kind, idLabel){
  if (kind === 'empty') return vCard({kind:'warn', title:'RAM trống', sub:'Person#1 đã mất khi tắt chương trình'});
  if (kind === 'json') return vCard({kind:'info', title:'string json', lines:[G7J]});
  if (kind === 'none') return vCard({kind:'info', title:'RAM', sub:'(chưa có đối tượng)'});
  return vCard({kind:kind === 'new' ? 'ok' : 'info', title:idLabel, rows:[['Name', G7O.Name], ['Age', String(G7O.Age)]]});
}
function g7Disk(has, s){
  return vText(has ? [{t:G7J, s:s || ''}] : [{t:'(chưa có tệp)', s:'dim'}], {title:has ? 'p.json' : 'Ổ đĩa', noNo:true});
}
function g7Pair(ram, disk){ return vPair(ram, disk, {ta:'RAM', tb:'Ổ đĩa', mid:'↔'}); }
var EX = {
ser:{ inputs:[], chips:[],
  intro:'Một đối tượng Person đang nằm trong RAM. Hãy xem nó trở thành chuỗi và thành tệp trên ổ đĩa. Bấm "Bước tiếp".',
  lines:function(){ return G7CLS.concat([
    'var p = new Person',
    '{',
    '  Name = "An", Age = 20',
    '};',
    'string json =',
    '  JsonSerializer.Serialize(p);',
    'File.WriteAllText("p.json", json);'
  ]); },
  run:function(c){
    function fl(a, b, cc, d, it){ return vFlow([{t:'Person#1', s:a}, {t:'Serialize', s:b, sub:'máy ép'}, {t:'Chuỗi JSON', s:cc}, {t:'Tệp p.json', s:d}], {title:'Chiều lưu'}); }
    c.snap({ln:0, title:'Lớp Person', body:'Person có hai thuộc tính: Name và Age. Đây là dữ liệu sẽ được lưu.', viz:[fl('dim', 'dim', 'dim', 'dim'), g7Pair(g7Ram('none'), g7Disk(false))]});
    c.snap({ln:5, title:'Tạo Person#1 trong RAM', body:'new tạo đối tượng Person#1 trong RAM với Name = "An", Age = 20. Tắt chương trình là mất.', vars:[['p', '→ Person#1', 1]], objs:[O('Person#1', [['Name', S(G7O.Name)], ['Age', G7O.Age]], {hi:1})], viz:[fl('hi', 'dim', 'dim', 'dim'), g7Pair(g7Ram('new', 'Person#1'), g7Disk(false))]});
    c.snap({ln:10, title:'Serialize(p)', body:'JsonSerializer.Serialize biến các thuộc tính thành một chuỗi văn bản: ' + G7J + '. Person#1 vẫn còn nguyên trong RAM.', vars:[['p', '→ Person#1'], ['json', S(G7J), 1]], objs:[O('Person#1', [['Name', S(G7O.Name)], ['Age', G7O.Age]])], viz:[fl('ok', 'hi', 'new', 'dim', {j:G7J}), g7Pair([g7Ram('ok', 'Person#1'), g7Ram('json')], g7Disk(false))]});
    c.snap({ln:11, title:'Ghi chuỗi ra tệp', body:'File.WriteAllText ghi chuỗi vào tệp p.json. Dữ liệu giờ nằm trên ổ đĩa, tắt máy vẫn còn.', vars:[['json', S(G7J)]], viz:[fl('ok', 'ok', 'ok', 'new', {j:G7J}), g7Pair(g7Ram('ok', 'Person#1'), g7Disk(true, 'new'))]});
    c.snap({ln:11, title:'Xong', body:'Từ một đối tượng trong RAM, ta có một chuỗi JSON nằm trong tệp.', note:'Serialize = đối tượng thành chuỗi (hoặc byte) để lưu hoặc gửi đi.', viz:[fl('ok', 'ok', 'ok', 'ok'), g7Pair(g7Ram('ok', 'Person#1'), g7Disk(true, 'ok'))]});
  }},
des:{ inputs:[], chips:[],
  intro:'Lần chạy sau: chương trình mới bật, RAM trống, tệp p.json còn trên ổ đĩa. Bấm "Bước tiếp".',
  lines:function(){ return G7CLS.concat([
    'string json =',
    '  File.ReadAllText("p.json");',
    'var p2 =',
    '  JsonSerializer',
    '    .Deserialize<Person>(json);',
    'Console.WriteLine(p2.Name);'
  ]); },
  run:function(c){
    function fl(a, b, cc, d, it){ return vFlow([{t:'Tệp p.json', s:a}, {t:'Chuỗi JSON', s:b}, {t:'Deserialize', s:cc, sub:'máy dựng'}, {t:'Person#2', s:d}], {title:'Chiều đọc'}); }
    c.snap({ln:0, title:'Chương trình mới bật', body:'Person#1 của lần chạy trước đã mất cùng RAM. Chỉ còn tệp p.json trên ổ đĩa.', viz:[fl('ok', 'dim', 'dim', 'dim'), g7Pair(g7Ram('empty'), g7Disk(true))]});
    c.snap({ln:6, title:'ReadAllText', body:'File.ReadAllText đọc nội dung tệp thành chuỗi json trong RAM. Lúc này nó mới chỉ là chữ, chưa phải đối tượng.', vars:[['json', S(G7J), 1]], viz:[fl('hi', 'new', 'dim', 'dim', {j:G7J}), g7Pair(g7Ram('json'), g7Disk(true, 'hi'))]});
    var o2 = JSON.parse(G7J);
    c.snap({ln:9, title:'Deserialize<Person>', body:'Deserialize đọc chuỗi và dựng một đối tượng Person mới: Person#2 với Name = "' + o2.Name + '", Age = ' + o2.Age + '.', vars:[['json', S(G7J)], ['p2', '→ Person#2', 1]], objs:[O('Person#2', [['Name', S(o2.Name), 'hi'], ['Age', o2.Age, 'hi']], {hi:1})], viz:[fl('ok', 'ok', 'hi', 'new', {j:G7J}), g7Pair([g7Ram('json'), g7Ram('new', 'Person#2')], g7Disk(true))]});
    c.out(o2.Name);
    c.snap({ln:10, title:'Dùng Person#2', body:'p2.Name in ra "' + o2.Name + '": dữ liệu đã được dựng lại đúng.', vars:[['p2', '→ Person#2']], objs:[O('Person#2', [['Name', S(o2.Name)], ['Age', o2.Age]])], viz:[fl('ok', 'ok', 'ok', 'ok'), g7Pair(g7Ram('ok', 'Person#2'), g7Disk(true))]});
    c.snap({ln:10, title:'Xong', body:'Dữ liệu y hệt Person#1, nhưng đây là Person#2, một đối tượng mới hoàn toàn.', note:'Dữ liệu được bảo toàn qua serialize và deserialize, nhưng đối tượng nhận lại là đối tượng mới.', vars:[['p2', '→ Person#2']], objs:[O('Person#2', [['Name', S(o2.Name), 'ok'], ['Age', o2.Age, 'ok']], {tag:'đối tượng mới'})], viz:[fl('ok', 'ok', 'ok', 'ok'), g7Pair(g7Ram('ok', 'Person#2'), g7Disk(true))]});
  }}
};
