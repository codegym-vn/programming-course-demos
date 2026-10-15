// META {"module":4,"lesson":"Giới thiệu chung về Thao tác File và Stream","activity":"Khái niệm Stream và các loại Stream","title":"Stream là dòng chảy byte","lead":"Stream đọc hoặc ghi từng byte theo thứ tự, luôn nhớ vị trí hiện tại. Chọn chiều đọc hoặc ghi rồi bấm <b>Bước tiếp</b>.","tabs":[["doc","Đọc (Tệp → Chương trình)"],["ghi","Ghi (Chương trình → Tệp)"]],"codeTitle":"Mã nguồn C#"}
var sText = 'Hi!';
var sBytes = Array.prototype.map.call(sText, function(ch){ return ch.charCodeAt(0); });
/* file: số byte đang có trong tệp, pos: vị trí, got: các byte chương trình đã có, cur: chỉ số byte đang chảy */
var sViz = function(dir, fileN, pos, prog, cur, endLabel){
  var cells = [];
  for (var i = 0; i < fileN; i++) cells.push({v:sBytes[i],sub:sText[i],s:cur === i ? 'hi' : (dir === 'doc' && i < pos ? 'ok' : (dir === 'ghi' ? 'new' : undefined))});
  cells.push({v:'',s:'dim',sub:endLabel});
  var pipe = dir === 'doc' ? [{t:'Tệp hi.txt'},{t:'Stream',s:'hi',item:cur !== undefined && cur >= 0 ? String(sBytes[cur]) : undefined},{t:'Chương trình'}]
   : [{t:'Chương trình'},{t:'Stream',s:'hi',item:cur !== undefined && cur >= 0 ? String(sBytes[cur]) : undefined},{t:'Tệp hi.txt'}];
  var h = [vFlow(pipe),vCells(cells,{name:'Byte trong tệp',ptr:pos,ptrLabel:'Position',badges:[['Position',pos],['Length',fileN]]})];
  h.push(vCells(prog.map(function(b, i){ return {v:b,s:'ok'}; }),{name:dir === 'doc' ? 'Chương trình đã nhận' : 'Chương trình đã gửi',cap:3,idx:false,small:true}));
  return h;
};
var EX = {
doc:{inputs:[],chips:[],
 intro:'Tệp hi.txt chứa "Hi!", tức 3 byte. Chương trình đọc từng byte qua stream. Bấm "Bước tiếp".',
 lines:function(){ return ['using var fs = new FileStream(','  "hi.txt", FileMode.Open);','int b = fs.ReadByte();','b = fs.ReadByte();','b = fs.ReadByte();','b = fs.ReadByte();','// Ký tự "Đ" thì khác:','//   UTF-8 chiếm 2 byte: C4 90']; },
 run:function(c){
  var got = [];
  c.snap({ln:0,title:'Mở FileStream',body:'Stream đặt Position ở 0. Length là 3 vì tệp có 3 byte.',vars:[['fs.Position',0],['fs.Length',3]],viz:sViz('doc',3,0,got,undefined,'hết')});
  var lnR = [2,3,4];
  for (var i = 0; i < 3; i++) {
   got.push(sBytes[i]);
   c.snap({ln:lnR[i],title:'ReadByte() lần ' + (i + 1),body:'Đọc được ' + sBytes[i] + ' (ký tự \'' + sText[i] + '\'). Position tăng lên ' + (i + 1) + '.',vars:[['b',sBytes[i],1],['fs.Position',i + 1]],viz:sViz('doc',3,i + 1,got.slice(),i,'hết')});
  }
  c.snap({ln:5,title:'ReadByte() lần 4',body:'Position đã bằng Length nên không còn byte nào. ReadByte() trả về -1: hết stream.',vars:[['b',-1,1],['fs.Position',3]],viz:sViz('doc',3,3,got.slice(),undefined,'hết')});
  var enc = Array.prototype.slice.call(new TextEncoder().encode('Đ'));
  var hex = enc.map(function(x){ return x.toString(16).toUpperCase(); });
  c.snap({ln:7,title:'Một ký tự không luôn là một byte',body:'Chữ "Đ" trong UTF-8 chiếm ' + enc.length + ' byte (' + hex.join(' ') + '). Stream chỉ biết byte, còn ghép byte thành chữ là việc của lớp đọc văn bản.',
   viz:[vPair(vCells([{v:'Đ'}],{idx:false}),vCells(enc.map(function(x, k){ return {v:hex[k] + ' (' + x + ')',s:'f' + (k + 1)}; }),{idx:false}),{ta:'1 ký tự',tb:enc.length + ' byte UTF-8',mid:'→'})]});
  c.snap({ln:7,title:'Xong',body:'FileStream, MemoryStream và NetworkStream đều là Stream: cùng cách đọc ghi, chỉ khác nơi chứa dữ liệu.',note:'Stream đọc/ghi lần lượt theo vị trí; hết dữ liệu thì ReadByte trả về -1.',
   viz:[vPair(vCells([{v:'Đ'}],{idx:false}),vCells(enc.map(function(x, k){ return {v:hex[k] + ' (' + x + ')',s:'f' + (k + 1)}; }),{idx:false}),{ta:'1 ký tự',tb:enc.length + ' byte UTF-8',mid:'→'})]});
 }},
ghi:{inputs:[],chips:[],
 intro:'Lần này chương trình ghi từng byte vào tệp mới. Hãy để ý Position và Length cùng tăng. Bấm "Bước tiếp".',
 lines:function(){ return ['using var fs = new FileStream(','  "out.txt", FileMode.Create);','fs.WriteByte(72);','fs.WriteByte(105);','fs.WriteByte(33);','// hết khối: stream tự đóng']; },
 run:function(c){
  var sent = [];
  c.snap({ln:0,title:'Mở FileStream để ghi',body:'FileMode.Create tạo tệp rỗng. Position và Length đều là 0.',vars:[['fs.Position',0],['fs.Length',0]],viz:sViz('ghi',0,0,sent,undefined,'ghi tiếp')});
  [2,3,4].forEach(function(ln, i){
   sent.push(sBytes[i]);
   c.snap({ln:ln,title:'WriteByte(' + sBytes[i] + ')',body:'Ghi byte ' + sBytes[i] + ' (ký tự \'' + sText[i] + '\'). Position và Length cùng tăng lên ' + (i + 1) + '.',vars:[['fs.Position',i + 1],['fs.Length',i + 1,1]],viz:sViz('ghi',i + 1,i + 1,sent.slice(),i,'ghi tiếp')});
  });
  c.snap({ln:5,title:'Xong',body:'Tệp có 3 byte "Hi!". Stream ghi lần lượt, luôn ghi tiếp ở Position hiện tại.',note:'Stream đọc/ghi lần lượt theo vị trí. FileStream, MemoryStream, NetworkStream đều là Stream.',vars:[['fs.Position',3],['fs.Length',3]],viz:sViz('ghi',3,3,sent.slice(),undefined,'ghi tiếp')});
 }}
};
