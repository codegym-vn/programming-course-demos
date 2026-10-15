// META {"module":1,"lesson":"Thao tác nâng cao với Dictionary<K,V> và lựa chọn Collections","activity":"Duyệt qua Dictionary<K,V>","title":"Duyệt qua Dictionary","lead":"Bảng điểm có ba học sinh. Chọn cách duyệt rồi bấm <b>Bước tiếp</b>.","tabs":[["kv","foreach KeyValuePair"],["keys","Keys"],["values","Values"]],"codeTitle":"Mã nguồn C#"}
var djData = function(){ return [['An',8],['Bình',6],['Chi',9]]; };
function djDraw(d, st){ return vDrawers(d.map(function(e, i){ return {k:e[0], v:e[1], s:st[i]}; }), {name:'scores'}); }
var djInit = ['var scores =','  new Dictionary<string, int>','  {','    ["An"] = 8,','    ["Bình"] = 6,','    ["Chi"] = 9','  };'];
var djOrder = 'Thứ tự duyệt thường trùng thứ tự thêm nhưng không được bảo đảm. Cần thứ tự cố định thì dùng SortedDictionary hoặc OrderBy.';
var EX = {
kv:{inputs:[],chips:[],
 intro:'Duyệt từng cặp khóa - giá trị bằng foreach. Bấm "Bước tiếp".',
 lines:function(){ return djInit.concat(['foreach (var kv in scores)','{','  Console.WriteLine(','    kv.Key + ": " + kv.Value);','}']); },
 run:function(c){
  var d = djData(), st;
  c.snap({ln:0,title:'Bảng điểm ba ngăn',body:'Mỗi ngăn là một cặp: khóa là tên, giá trị là điểm.',viz:djDraw(d,[]),vars:[['scores.Count',d.length]]});
  d.forEach(function(e, i){
    st = []; for (var j = 0; j < i; j++) st[j] = 'ok'; st[i] = 'hi';
    c.out(e[0] + ': ' + e[1]);
    c.snap({ln:10,title:'Lần lặp ' + (i + 1),body:'foreach lấy ra một cặp KeyValuePair: kv.Key = "' + e[0] + '", kv.Value = ' + e[1] + '. Dòng này được in ra.',
      viz:[djDraw(d,st), vCard({kind:'info',title:'kv (KeyValuePair)',rows:[['Key','"' + e[0] + '"'],['Value',e[1]]]})],vars:[['kv.Key',S(e[0]),1],['kv.Value',e[1],1]]});
  });
  c.snap({ln:7,title:'Xong',body:'Hết cặp để lấy nên vòng lặp dừng. Mỗi lần lặp là một cặp.',note:'foreach trên Dictionary trả về từng cặp khóa - giá trị. ' + djOrder,viz:djDraw(d,['ok','ok','ok'])});
 }},
keys:{inputs:[],chips:[],
 intro:'Chỉ duyệt các khóa, bỏ qua giá trị. Bấm "Bước tiếp".',
 lines:function(){ return ['// scores: An 8, Bình 6, Chi 9','foreach (string k in scores.Keys)','{','  Console.WriteLine(k);','}']; },
 run:function(c){
  var d = djData(), got = [];
  function chips(){ return vChips(got.map(function(k){ return {t:k,s:'ok'}; }), {title:'Các khóa đã lấy'}); }
  c.snap({ln:1,title:'Duyệt scores.Keys',body:'Keys là tập hợp chỉ gồm các khóa (tên). Giá trị điểm không xuất hiện.',viz:[djDraw(d,[]), chips()]});
  d.forEach(function(e, i){
    var st = []; for (var j = 0; j < i; j++) st[j] = 'ok'; st[i] = 'hi'; got.push(e[0]);
    c.out(e[0]);
    c.snap({ln:3,title:'Khóa thứ ' + (i + 1),body:'k = "' + e[0] + '", in ra tên này.',viz:[djDraw(d,st), chips()],vars:[['k',S(e[0]),1]]});
  });
  c.snap({ln:1,title:'Xong',body:'Đã lấy ' + got.length + ' khóa: ' + got.join(', ') + '.',note:'Dùng Keys khi chỉ cần các khóa. ' + djOrder,viz:[djDraw(d,['ok','ok','ok']), chips()]});
 }},
values:{inputs:[],chips:[],
 intro:'Chỉ duyệt các giá trị để cộng tổng và tính điểm trung bình. Bấm "Bước tiếp".',
 lines:function(){ return ['// scores: An 8, Bình 6, Chi 9','int sum = 0;','foreach (int v in scores.Values)','  sum += v;','double avg =','  (double)sum / scores.Count;','Console.WriteLine(','  avg.ToString("F2"));']; },
 run:function(c){
  var d = djData(), sum = 0;
  function sc(n, s){ return vScore([{k:'tổng sum',v:n,s:s}]); }
  c.snap({ln:1,title:'Chuẩn bị tổng',body:'sum bắt đầu bằng 0. Ta sẽ chỉ nhìn vào các điểm.',viz:[djDraw(d,[]), sc(0)],vars:[['sum',0]]});
  d.forEach(function(e, i){
    var st = []; for (var j = 0; j < i; j++) st[j] = 'ok'; st[i] = 'hi'; sum += e[1];
    c.snap({ln:3,title:'Giá trị thứ ' + (i + 1),body:'v = ' + e[1] + ', cộng vào sum, sum = ' + sum + '.',viz:[djDraw(d,st), sc(sum,'hi')],vars:[['v',e[1],1],['sum',sum,1]]});
  });
  var avg = sum / d.length;
  c.snap({ln:5,title:'Tính trung bình',body:'avg = ' + sum + ' / ' + d.length + ' = ' + avg.toFixed(2) + '.',viz:[djDraw(d,['ok','ok','ok']), sc(sum,'ok')],vars:[['sum',sum],['avg',avg.toFixed(2),1]]});
  c.out(avg.toFixed(2));
  c.snap({ln:7,title:'Xong',body:'In điểm trung bình ' + avg.toFixed(2) + '.',note:'Dùng Values khi chỉ cần các giá trị. ' + djOrder,viz:[djDraw(d,['ok','ok','ok']), sc(sum)],vars:[['avg',avg.toFixed(2)]]});
 }}
};
