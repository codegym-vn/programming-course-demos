// META {"module":1,"lesson":"Giới thiệu về Dictionary<K,V>","activity":"Thêm, Truy cập và Cập nhật phần tử trong Dictionary<K,V>","title":"Thêm, truy cập và cập nhật trong Dictionary","lead":"Chọn một tình huống rồi bấm <b>Bước tiếp</b> để xem các ngăn kéo thay đổi.","tabs":[["add","Add"],["gan","Gán bằng [ ]"],["trung","Add trùng khóa"],["khong","Đọc khóa không có"]],"codeTitle":"Mã nguồn C#"}
function myD(map, hi, name){ return vDrawers(map.map(function(e){ return {k:e[0], v:e[1], s:hi && hi[e[0]]}; }), {name:name || 'stock (tên hàng, số lượng)'}); }
function myCnt(m){ return vScore([{k:'Count',v:m.length}]); }
var myHead = ['var stock =','  new Dictionary<string, int>','  { ["bút"] = 10, ["vở"] = 5 };'];
var EX = {
add:{inputs:[],chips:[],
 intro:'Thêm một cặp khóa - giá trị mới bằng Add. Bấm "Bước tiếp".',
 lines:function(){return ['var stock =','  new Dictionary<string, int>();','stock.Add("bút", 10);','stock.Add("vở", 5);','stock.Add("thước", 3);'];},
 run:function(c){
  var m = [];
  c.snap({ln:1,title:'Tạo Dictionary rỗng',body:'Tủ chưa có ngăn nào. Mỗi ngăn gồm một khóa (nhãn) và một giá trị.',vars:[['stock','→ Dictionary']],viz:[myD(m), myCnt(m)]});
  m.push(['bút',10]);
  c.snap({ln:2,title:'Add("bút", 10)',body:'Một ngăn mới có nhãn "bút" chứa 10 xuất hiện.',vars:[['stock','→ Dictionary']],viz:[myD(m,{'bút':'new'}), myCnt(m)]});
  m.push(['vở',5]);
  c.snap({ln:3,title:'Add("vở", 5)',body:'Thêm ngăn "vở". Count là '+m.length+'.',vars:[['stock','→ Dictionary']],viz:[myD(m,{'vở':'new'}), myCnt(m)]});
  m.push(['thước',3]);
  c.snap({ln:4,title:'Add("thước", 3)',body:'"thước" chưa có trong tủ nên Add thêm ngăn mới. Count là '+m.length+'.',vars:[['stock','→ Dictionary']],viz:[myD(m,{'thước':'new'}), myCnt(m)]});
  c.snap({ln:4,title:'Xong',body:'Add chỉ dùng để thêm khóa mới.',note:'Add thêm một cặp khóa - giá trị mới. Mỗi khóa chỉ xuất hiện một lần trong Dictionary.',vars:[['stock','→ Dictionary']],viz:[myD(m,{'bút':'ok','vở':'ok','thước':'ok'}), myCnt(m)]});
 }},
gan:{inputs:[],chips:[],
 intro:'Gán bằng chỉ mục [khóa] vừa cập nhật được vừa thêm mới được. Bấm "Bước tiếp".',
 lines:function(){return myHead.concat(['stock["vở"] = 8;','stock["tẩy"] = 2;']);},
 run:function(c){
  var m = [['bút',10],['vở',5]];
  c.snap({ln:2,title:'Tủ có hai ngăn',body:'"bút" chứa 10, "vở" chứa 5.',vars:[['stock','→ Dictionary']],viz:[myD(m), myCnt(m)]});
  m.forEach(function(e){ if (e[0]==='vở') e[1] = 8; });
  c.snap({ln:3,title:'stock["vở"] = 8',body:'Khóa "vở" đã có, nên giá trị trong ngăn được cập nhật từ 5 thành 8. Count vẫn là '+m.length+'.',vars:[['stock','→ Dictionary']],viz:[myD(m,{'vở':'hi'}), myCnt(m)]});
  m.push(['tẩy',2]);
  c.snap({ln:4,title:'stock["tẩy"] = 2',body:'Khóa "tẩy" chưa có, nên gán bằng [ ] sẽ thêm ngăn mới. Count tăng lên '+m.length+'.',vars:[['stock','→ Dictionary']],viz:[myD(m,{'tẩy':'new'}), myCnt(m)]});
  c.snap({ln:4,title:'Xong',body:'Cùng một cú pháp, có khóa thì cập nhật, chưa có thì thêm.',note:'stock[khóa] = giá trị vừa cập nhật (nếu khóa có sẵn) vừa thêm mới (nếu chưa có), không báo lỗi.',vars:[['stock','→ Dictionary']],viz:[myD(m,{'bút':'ok','vở':'ok','tẩy':'ok'}), myCnt(m)]});
 }},
trung:{inputs:[],chips:[],
 intro:'Dùng Add với một khóa đã có thì sao? Bấm "Bước tiếp".',
 lines:function(){return myHead.concat(['stock.Add("bút", 7);']);},
 run:function(c){
  var m = [['bút',10],['vở',5]];
  var msg = 'An item with the same key has already been added. Key: bút';
  c.snap({ln:2,title:'Tủ có hai ngăn',body:'Khóa "bút" đã có, chứa 10.',vars:[['stock','→ Dictionary']],viz:[myD(m), myCnt(m)]});
  c.snap({ln:3,title:'Add("bút", 7): kiểm tra khóa',body:'Trước khi thêm, Add tìm xem nhãn "bút" đã có chưa. Nó thấy ngăn "bút" đang chứa 10.',vars:[['stock','→ Dictionary']],viz:[myD(m,{'bút':'hi'}), myCnt(m)]});
  c.err('Unhandled exception. System.ArgumentException:');
  c.err(msg);
  c.snap({ln:3,title:'Add("bút", 7): trùng khóa',body:'Mỗi khóa chỉ được có một ngăn. Add không tự ghi đè mà ném ArgumentException.',vars:[['stock','→ Dictionary']],viz:[myD(m,{'bút':'bad'}), vCard({kind:'err',title:'ArgumentException',sub:msg})]});
  c.snap({ln:3,title:'Xong',body:'Ngăn "bút" vẫn chứa 10, chương trình đã dừng.',note:'Add trùng khóa là lỗi. Muốn ghi đè thì gán stock["bút"] = 7, hoặc kiểm tra ContainsKey trước khi Add.',vars:[['stock','→ Dictionary']],viz:[myD(m,{'bút':'ok'}), vCard({kind:'info',title:'Muốn ghi đè',tip:'Dùng stock["bút"] = 7 thay cho Add.'})]});
 }},
khong:{inputs:[],chips:[],
 intro:'Đọc một khóa không có trong tủ sẽ gặp lỗi. Xem cách đọc an toàn. Bấm "Bước tiếp".',
 lines:function(){return myHead.concat(['int n = stock["kéo"];','// cách an toàn, thay cho dòng trên:','int m;','bool ok =','  stock.TryGetValue("kéo", out m);']);},
 run:function(c){
  var m = [['bút',10],['vở',5]];
  var msg = "The given key 'kéo' was not present in the dictionary.";
  c.snap({ln:2,title:'Tủ có hai ngăn',body:'Không có ngăn nào mang nhãn "kéo".',vars:[['stock','→ Dictionary']],viz:[myD(m), myCnt(m)]});
  c.err('Unhandled exception.');
  c.err('KeyNotFoundException:');
  c.err(msg);
  c.snap({ln:3,title:'stock["kéo"]: lỗi',body:'Đọc bằng [ ] mà khóa không có thì Dictionary ném KeyNotFoundException.',vars:[['stock','→ Dictionary']],viz:[myD(m,{}), vCard({kind:'err',title:'KeyNotFoundException',sub:msg})]});
  c.snap({ln:7,title:'Cách an toàn: TryGetValue',body:'TryGetValue không ném lỗi. Nó trả về false và gán giá trị mặc định (0) cho m. Đây là cách dùng thay cho dòng stock["kéo"] ở trên.',vars:[['stock','→ Dictionary'],['ok','false'],['m',0]],viz:[myD(m), vCard({kind:'ok',title:'TryGetValue trả về false',sub:'m = 0, không có lỗi',tip:'Kiểm tra ok trước khi dùng m.'})]});
  c.snap({ln:7,title:'Xong',body:'Với khóa có thể không tồn tại, hãy ưu tiên TryGetValue.',note:'Đọc bằng [khóa] mà khóa không có thì ném KeyNotFoundException. Đọc an toàn bằng TryGetValue (trả bool).',vars:[['ok','false'],['m',0]],viz:[myD(m,{'bút':'ok','vở':'ok'}), myCnt(m)]});
 }}
};
