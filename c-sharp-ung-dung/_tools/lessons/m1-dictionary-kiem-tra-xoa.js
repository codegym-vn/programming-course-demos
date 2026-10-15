// META {"module":1,"lesson":"Giới thiệu về Dictionary<K,V>","activity":"Kiểm tra sự tồn tại và Xóa phần tử trong Dictionary<K,V>","title":"Kiểm tra tồn tại và xóa trong Dictionary","lead":"Tủ ngăn kéo có ba ngăn: bút, vở, thước. Chọn tình huống rồi bấm <b>Bước tiếp</b>.","tabs":[["key","ContainsKey"],["value","ContainsValue"],["remove","Remove"]],"codeTitle":"Mã nguồn C#"}
var dkStock = function(){ return [['bút',10],['vở',5],['thước',3]]; };
function dkDraw(d, st){
  return vDrawers(d.map(function(e){ return {k:e[0], v:e[1], s:st ? st[e[0]] : ''}; }), {name:'stock'});
}
var dkInit = ['var stock =','  new Dictionary<string, int>','  {','    ["bút"] = 10,','    ["vở"] = 5,','    ["thước"] = 3','  };'];
var EX = {
key:{inputs:[],chips:[],
 intro:'Hỏi tủ có ngăn "vở" không, rồi hỏi ngăn "kéo". Bấm "Bước tiếp".',
 lines:function(){ return dkInit.concat(['bool a = stock.ContainsKey("vở");','bool b = stock.ContainsKey("kéo");']); },
 run:function(c){
  var d = dkStock();
  function has(k){ return d.some(function(e){ return e[0] === k; }); }
  c.snap({ln:0,title:'Tủ có ba ngăn',body:'Mỗi ngăn có một nhãn (khóa) và đồ bên trong (giá trị).',viz:[dkDraw(d), vScore([{k:'số ngăn đã mở',v:0}])],vars:[['stock.Count',d.length]]});
  var a = has('vở');
  c.snap({ln:7,title:'ContainsKey("vở")',body:'Dictionary đi thẳng tới ngăn "vở" theo nhãn, không cần mở các ngăn khác.',viz:[dkDraw(d,{'vở':'hi'}), vScore([{k:'số lần tra',v:1}])],vars:[['stock.Count',d.length]]});
  c.snap({ln:7,title:'Kết quả a = ' + (a ? 'true' : 'false'),body:'Có ngăn "vở" nên trả về true, chỉ sau 1 lần tra.',viz:[dkDraw(d,{'vở':'ok'}), vScore([{k:'số lần tra',v:1,s:'ok'}])],vars:[['a',a],['stock.Count',d.length]]});
  var b = has('kéo');
  c.snap({ln:8,title:'ContainsKey("kéo")',body:'Dictionary tra nhãn "kéo" và không thấy ngăn nào mang nhãn này.',viz:[dkDraw(d,{'bút':'dim','vở':'dim','thước':'dim'}), vScore([{k:'số lần tra',v:1}])],vars:[['a',a],['stock.Count',d.length]]});
  c.snap({ln:8,title:'Kết quả b = ' + (b ? 'true' : 'false'),body:'Không có ngăn "kéo" nên trả về false. Tra khóa không có không gây lỗi.',viz:[dkDraw(d,{'bút':'no','vở':'no','thước':'no'}), vScore([{k:'số lần tra',v:1,s:'bad'}])],vars:[['a',a],['b',b],['stock.Count',d.length]]});
  c.snap({ln:8,title:'Xong',body:'ContainsKey trả lời có hoặc không, và rất nhanh vì đi thẳng tới ngăn.',note:'ContainsKey kiểm tra theo khóa nên nhanh. Khóa không có chỉ trả về false.',viz:[dkDraw(d), vScore([{k:'số lần tra',v:1}])],vars:[['a',a],['b',b]]});
 }},
value:{inputs:[],chips:[],
 intro:'Tìm xem có ngăn nào chứa giá trị 5 không. Bấm "Bước tiếp".',
 lines:function(){ return dkInit.concat(['bool a = stock.ContainsValue(5);']); },
 run:function(c){
  var d = dkStock(), target = 5, opened = 0, found = -1;
  c.snap({ln:0,title:'Tủ có ba ngăn',body:'Lần này ta không biết nhãn, chỉ biết giá trị cần tìm là 5.',viz:[dkDraw(d), vScore([{k:'số ngăn đã mở',v:0}])]});
  var st = {};
  for (var i = 0; i < d.length && found < 0; i++) {
    opened++;
    st = {};
    for (var j = 0; j < i; j++) st[d[j][0]] = 'no';
    if (d[i][1] === target) { found = i; st[d[i][0]] = 'ok'; } else st[d[i][0]] = 'hi';
    c.snap({ln:7,title:'Mở ngăn "' + d[i][0] + '"',
      body:'Bên trong là ' + d[i][1] + (d[i][1] === target ? ', đúng giá trị 5 nên dừng tìm.' : ', khác 5 nên mở ngăn kế tiếp.'),
      viz:[dkDraw(d, st), vScore([{k:'số ngăn đã mở',v:opened,s:found >= 0 ? 'ok' : 'hi'}])],vars:[['đang tìm',target]]});
  }
  c.snap({ln:7,title:'Kết quả a = ' + (found >= 0) ,body:'ContainsValue phải mở lần lượt từng ngăn (đã mở ' + opened + '/' + d.length + ' ngăn). Nếu giá trị không có, nó phải mở hết ' + d.length + ' ngăn.',viz:[dkDraw(d, st), vScore([{k:'số ngăn đã mở',v:opened,s:'ok'}])],vars:[['a',found >= 0]]});
  c.snap({ln:7,title:'Xong',body:'Tìm theo giá trị chậm hơn tìm theo khóa, vì phải duyệt từng ngăn.',note:'ContainsKey đi thẳng tới ngăn. ContainsValue phải duyệt, càng nhiều phần tử càng chậm.',viz:[dkDraw(d), vScore([{k:'số ngăn đã mở',v:opened}])],vars:[['a',true]]});
 }},
remove:{inputs:[],chips:[],
 intro:'Bỏ ngăn "bút", thử bỏ ngăn "kéo" không có, rồi bỏ "vở" và lấy luôn giá trị. Bấm "Bước tiếp".',
 lines:function(){ return dkInit.concat(['bool r1 = stock.Remove("bút");','bool r2 = stock.Remove("kéo");','bool r3 = stock.Remove(','  "vở", out int old);']); },
 run:function(c){
  var d = dkStock();
  function rm(k){ for (var i = 0; i < d.length; i++) if (d[i][0] === k) return d.splice(i, 1)[0]; return null; }
  c.snap({ln:0,title:'Tủ có ba ngăn',body:'Count đang là ' + d.length + '.',viz:dkDraw(d),vars:[['stock.Count',d.length]]});
  c.snap({ln:7,title:'Remove("bút")',body:'Ngăn "bút" bị đánh dấu sắp bỏ đi.',viz:dkDraw(d,{'bút':'del'}),vars:[['stock.Count',d.length]]});
  var r1 = rm('bút') !== null;
  c.snap({ln:7,title:'r1 = ' + r1,body:'Remove trả về true vì có ngăn để bỏ. Count giảm còn ' + d.length + '.',viz:dkDraw(d),vars:[['r1',r1],['stock.Count',d.length,1]]});
  var r2 = rm('kéo') !== null;
  c.snap({ln:8,title:'Remove("kéo")',body:'Không có ngăn "kéo" nên không bỏ gì cả. Remove trả về ' + r2 + ', không báo lỗi, Count vẫn là ' + d.length + '.',viz:dkDraw(d,{'vở':'dim','thước':'dim'}),vars:[['r1',r1],['r2',r2],['stock.Count',d.length]]});
  c.snap({ln:10,title:'Remove("vở", out int old)',body:'Phiên bản có out vừa bỏ ngăn vừa trao lại giá trị trong ngăn đó.',viz:dkDraw(d,{'vở':'del'}),vars:[['r2',r2],['stock.Count',d.length]]});
  var got = rm('vở');
  c.snap({ln:10,title:'old = ' + got[1],body:'Ngăn "vở" đã bỏ, giá trị 5 được lưu vào biến old. Count còn ' + d.length + '.',viz:dkDraw(d),vars:[['old',got[1],1],['stock.Count',d.length,1]]});
  c.snap({ln:10,title:'Xong',body:'Chỉ còn ngăn "thước" trong tủ.',note:'Remove khóa không có chỉ trả về false, không gây lỗi. Remove(key, out value) lấy luôn giá trị vừa xóa.',viz:dkDraw(d),vars:[['old',got[1]],['stock.Count',d.length]]});
 }}
};
