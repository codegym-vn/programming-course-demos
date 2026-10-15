// META {"module":5,"lesson":"Đọc dữ liệu từ File CSV","activity":"Các bước cơ bản để đọc File CSV trong C#","title":"Các bước đọc tệp CSV","lead":"Mỗi dòng văn bản lần lượt đi qua các trạm để thành một đối tượng Product trong List. Bấm <b>Bước tiếp</b>.","tabs":[["csv","Đọc CSV"]],"codeTitle":"Mã nguồn C#"}
var RAW = ['Ma,Ten,Gia','SP01,Bút bi,5000','SP02,Vở,12000','SP03,Thước,8000'];
function rdFile(cur, skipHead){
  return vText(RAW.map(function(l, i){ return {t:l, s:i === cur ? 'hi' : (i === 0 && skipHead ? 'dim' : '')}; }), {title:'lines (mảng 4 dòng)', noNo:false});
}
function rdFlow(active, item, done){
  var names = ['Dòng văn bản', "Split(',')", 'int.Parse', 'new Product', 'List'];
  return vFlow(names.map(function(t, i){ return {t:t, s:(i === active ? 'hi' : (done && i <= active ? 'ok' : 'dim')), item:(i === active ? item : '')}; }), {title:'Các trạm'});
}
function rdList(n, newest){
  var items = [];
  for (var i = 0; i < n; i++) { var f = RAW[i + 1].split(','); items.push({v:f[0] + ' ' + f[1] + ' ' + parseInt(f[2], 10), s:(i === newest ? 'new' : '')}); }
  return vCells(items, {name:'List<Product> (Count = ' + n + ')', cap:3, small:true});
}
var EX = {
csv:{inputs:[],chips:[],
 intro:'Theo dõi dòng "SP01,Bút bi,5000" biến thành đối tượng, rồi hai dòng sau lặp lại y hệt. Bấm "Bước tiếp".',
 lines:function(){return ['var lines = File.ReadAllLines(','  "sp.csv");','var list = new List<Product>();','for (int i = 1;','     i < lines.Length; i++)','{','  var f = lines[i].Split(\',\');','  int gia = int.Parse(f[2]);','  list.Add(new Product(','    f[0], f[1], gia));','}'];},
 run:function(c){
  var f1 = RAW[1].split(','), g1 = parseInt(f1[2], 10);
  c.snap({ln:0,title:'ReadAllLines',body:'Đọc cả tệp thành mảng ' + RAW.length + ' dòng, mỗi dòng là một chuỗi.',viz:[rdFile(-1),rdFlow(-1),rdList(0,-1)],vars:[['lines.Length',RAW.length]]});
  c.snap({ln:3,title:'Bỏ dòng tiêu đề',body:'Vòng lặp bắt đầu từ i = 1 nên dòng 0 (tiêu đề) bị bỏ qua.',viz:[rdFile(-1,true),rdFlow(-1),rdList(0,-1)]});
  c.snap({ln:6,title:"Split(',')",body:'Dòng 1 được cắt tại mỗi dấu phẩy thành mảng ' + f1.length + ' ô.',viz:[rdFile(1,true),rdFlow(1,'SP01 | Bút bi | 5000'),vCells(f1,{name:'f',small:true})]});
  c.snap({ln:7,title:'int.Parse',body:'f[2] là chuỗi "' + f1[2] + '". int.Parse đổi nó thành số ' + g1 + '.',viz:[rdFile(1,true),rdFlow(2,'"5000" → ' + g1),vCells(f1,{name:'f',small:true,ptr:2,ptrLabel:'gia'})],vars:[['gia',g1,1]]});
  c.snap({ln:8,title:'Tạo Product và Add',body:'Tạo Product("' + f1[0] + '", "' + f1[1] + '", ' + g1 + ') rồi Add vào List.',viz:[rdFile(1,true),rdFlow(4,'SP01',true),rdList(1,0)]});
  c.snap({ln:6,title:'Lặp cho dòng 2',body:'Dòng "' + RAW[2] + '" đi qua đủ các trạm: Split, Parse, tạo Product, Add.',viz:[rdFile(2,true),rdFlow(4,'SP02',true),rdList(2,1)]});
  c.snap({ln:6,title:'Lặp cho dòng 3',body:'Dòng "' + RAW[3] + '" làm tương tự. i = 4 không còn nhỏ hơn lines.Length nên vòng lặp dừng.',viz:[rdFile(3,true),rdFlow(4,'SP03',true),rdList(3,2)]});
  c.snap({ln:10,title:'Xong',body:'List có 3 Product, một cho mỗi dòng dữ liệu.',note:'Đọc CSV = đọc dòng, tách trường, chuyển kiểu, tạo đối tượng.',viz:[rdFile(-1,true),rdFlow(4,'',true),rdList(3,-1)]});
 }}
};
