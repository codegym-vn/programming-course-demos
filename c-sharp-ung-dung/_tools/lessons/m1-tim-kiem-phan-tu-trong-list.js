// META {"module":1,"lesson":"Thao tác nâng cao với List<T>","activity":"Tìm kiếm phần tử trong List<T>","title":"Tìm kiếm phần tử trong List<T>","lead":"Mọi phép tìm đều quét từ đầu danh sách. Chọn một phép tìm rồi bấm <b>Bước tiếp</b>.","tabs":[["indexof","IndexOf / Contains"],["find","Find"],["findall","FindAll"],["exists","Exists"]],"codeTitle":"Mã nguồn C#"}
var mySC = [7,4,9,6,9,3];
/* Hàng ô khi quét tới ô thứ upto (0..). pred: điều kiện; sub hiện true/false. showSub: có hiện kết quả điều kiện hay không */
function myScan(upto, pred, noPtr){
  var items = mySC.map(function(v, i){
    if (i > upto) return {v:v};
    var m = pred(v);
    var s = m ? 'ok' : (i === upto ? 'hi' : 'no');
    return {v:v, s:s, sub:String(m)};
  });
  return vCells(items, {name:'scores', ptr:(upto >= 0 && !noPtr) ? upto : undefined, ptrLabel:'đang xét'});
}
function myCnt(n){ return vScore([{k:'số ô đã xét',v:n}]); }
function myCard(title, val, kind){ return vCard({kind:kind||'info', title:title, sub:String(val)}); }
var myHead = ['var scores = new List<int>','  { 7, 4, 9, 6, 9, 3 };'];
var EX = {
indexof:{inputs:[],chips:[],
 intro:'Tìm vị trí của một giá trị bằng IndexOf. Bấm "Bước tiếp".',
 lines:function(){return myHead.concat(['int a = scores.IndexOf(9);','int b = scores.IndexOf(5);','bool c = scores.Contains(9);']);},
 run:function(c){
  var p9 = function(x){ return x === 9; }, p5 = function(x){ return x === 5; };
  c.snap({ln:1,title:'Danh sách điểm',body:'Sáu điểm, chỉ số từ 0 đến 5. Lưu ý 9 xuất hiện hai lần.',vars:[['scores','→ List<int>']],viz:[vCells(mySC.map(function(v){return {v:v};}),{name:'scores'}), myCnt(0)]});
  var found = -1;
  for (var i = 0; i < mySC.length; i++){ if (p9(mySC[i])){ found = i; break; }
   c.snap({ln:2,title:'IndexOf(9): xét ô '+i,body:mySC[i]+' khác 9 nên chuyển sang ô kế tiếp.',vars:[['scores','→ List<int>']],viz:[myScan(i,p9), myCnt(i+1)]}); }
  c.snap({ln:2,title:'IndexOf(9): khớp ở ô '+found,body:'Gặp 9 ở chỉ số '+found+' nên dừng ngay, không xét ô 4 dù cũng là 9. Kết quả là '+found+'.',vars:[['scores','→ List<int>'],['a',found]],viz:[myScan(found,p9), myCnt(found+1)]});
  var r5 = mySC.indexOf(5);
  c.snap({ln:3,title:'IndexOf(5): quét hết',body:'Không ô nào bằng 5 nên phải xét cả '+mySC.length+' ô, rồi trả về '+r5+' (nghĩa là không có).',vars:[['scores','→ List<int>'],['a',found],['b',r5]],viz:[myScan(mySC.length-1,p5,true), myCnt(mySC.length)]});
  var ct = mySC.indexOf(9) >= 0;
  c.snap({ln:4,title:'Contains(9)',body:'Contains(x) cho kết quả giống IndexOf(x) >= 0. Ở đây '+found+' >= 0 nên là '+ct+'.',vars:[['a',found],['b',r5],['c',String(ct)]],viz:[myCard('Contains(9)',ct,'ok')]});
  c.snap({ln:4,title:'Xong',body:'IndexOf trả về vị trí đầu tiên tìm thấy, hoặc -1 nếu không có.',note:'IndexOf trả vị trí của lần xuất hiện đầu tiên, hoặc -1 nếu không có. Contains chỉ cho biết có hay không.',vars:[['a',found],['b',r5],['c',String(ct)]],viz:[vScore([{k:'IndexOf(9)',v:found,s:'ok'},{k:'IndexOf(5)',v:r5,s:'no'},{k:'Contains(9)',v:String(ct)}])]});
 }},
find:{inputs:[],chips:[],
 intro:'Find trả về chính phần tử đầu tiên thỏa điều kiện. Bấm "Bước tiếp".',
 lines:function(){return myHead.concat(['int a = scores.Find(','  x => x > 8);','int b = scores.Find(','  x => x > 100);']);},
 run:function(c){
  var p = function(x){ return x > 8; }, big = function(x){ return x > 100; };
  c.snap({ln:1,title:'Danh sách điểm',body:'Find nhận một điều kiện và thử lần lượt từng phần tử từ đầu.',vars:[['scores','→ List<int>']],viz:[vCells(mySC.map(function(v){return {v:v};}),{name:'scores'}), myCnt(0)]});
  var f = null, i;
  for (i = 0; i < mySC.length; i++){ if (p(mySC[i])){ f = mySC[i]; break; }
   c.snap({ln:2,title:'x > 8 với x = '+mySC[i],body:mySC[i]+' > 8 là false nên thử ô kế tiếp.',vars:[['scores','→ List<int>']],viz:[myScan(i,p), myCnt(i+1)]}); }
  c.snap({ln:2,title:'x > 8 với x = '+f,body:f+' > 8 là true. Find trả về chính phần tử này ('+f+') và dừng lại.',vars:[['scores','→ List<int>'],['a',f]],viz:[myScan(i,p), myCard('Find trả về',f,'ok'), myCnt(i+1)]});
  var none = mySC.find(big); var d = none === undefined ? 0 : none;
  c.snap({ln:4,title:'Find(x => x > 100): không khớp',body:'Xét hết '+mySC.length+' ô mà không ô nào lớn hơn 100. Find trả về giá trị mặc định của int, tức là '+d+'.',vars:[['scores','→ List<int>'],['a',f],['b',d]],viz:[myScan(mySC.length-1,big,true), myCard('Find trả về default(int)',d,'warn'), myCnt(mySC.length)]});
  c.snap({ln:4,title:'Xong',body:'0 cũng có thể là một điểm hợp lệ, nên khó phân biệt "không thấy" với "tìm được 0".',note:'Find trả về phần tử đầu tiên khớp. Không thấy thì trả default(T): 0 với int, null với đối tượng. Cần phân biệt thì dùng FindIndex hoặc Exists.',vars:[['a',f],['b',d]],viz:[vScore([{k:'Find(x > 8)',v:f,s:'ok'},{k:'Find(x > 100)',v:d,s:'no'}])]});
 }},
findall:{inputs:[],chips:[],
 intro:'FindAll duyệt hết danh sách và gom mọi phần tử khớp vào một List mới. Bấm "Bước tiếp".',
 lines:function(){return myHead.concat(['var r = scores.FindAll(','  x => x >= 6);']);},
 run:function(c){
  var p = function(x){ return x >= 6; }, res = [];
  c.snap({ln:1,title:'Danh sách điểm',body:'FindAll sẽ xét cả sáu ô, không dừng sớm.',vars:[['scores','→ List<int>']],viz:[vCells(mySC.map(function(v){return {v:v};}),{name:'scores'}), myCnt(0)]});
  for (var i = 0; i < mySC.length; i++){
   var m = p(mySC[i]); if (m) res.push(mySC[i]);
   c.snap({ln:2,title:'x >= 6 với x = '+mySC[i],body:mySC[i]+' >= 6 là '+m+(m?', nên thả '+mySC[i]+' vào danh sách kết quả.':', nên bỏ qua.'),vars:[['scores','→ List<int>'],['r','→ List<int> mới']],
    viz:[myScan(i,p), vCells(res.map(function(v,k){return {v:v,s:(m&&k===res.length-1)?'new':null};}),{name:'r (List mới)'}), myCnt(i+1)]});
  }
  c.snap({ln:3,title:'Xong',body:'Kết quả là {'+res.join(', ')+'}, một List mới. Danh sách gốc vẫn đủ '+mySC.length+' phần tử.',note:'FindAll trả về một List mới chứa mọi phần tử khớp. Danh sách gốc không bị thay đổi.',vars:[['scores','→ List<int>'],['r','→ List<int> mới']],
   viz:[vCells(mySC.map(function(v){return {v:v};}),{name:'scores (giữ nguyên)'}), vCells(res.map(function(v){return {v:v,s:'ok'};}),{name:'r (List mới)'}), myCnt(mySC.length)]});
 }},
exists:{inputs:[],chips:[],
 intro:'Exists chỉ trả lời có hay không, và dừng ngay khi gặp phần tử khớp. Bấm "Bước tiếp".',
 lines:function(){return myHead.concat(['bool e = scores.Exists(','  x => x < 4);']);},
 run:function(c){
  var p = function(x){ return x < 4; }, n = 0, hit = false;
  c.snap({ln:1,title:'Danh sách điểm',body:'Exists thử từng phần tử cho tới khi có một phần tử thỏa điều kiện.',vars:[['scores','→ List<int>']],viz:[vCells(mySC.map(function(v){return {v:v};}),{name:'scores'}), myCnt(0)]});
  for (var i = 0; i < mySC.length; i++){
   n = i + 1; hit = p(mySC[i]);
   c.snap({ln:2,title:'x < 4 với x = '+mySC[i],body:mySC[i]+' < 4 là '+hit+(hit?'. Gặp phần tử khớp nên dừng ngay.':', thử ô kế tiếp.'),vars:[['scores','→ List<int>']].concat(hit?[['e','true']]:[]),viz:[myScan(i,p), myCnt(n)]});
   if (hit) break;
  }
  c.snap({ln:3,title:'Xong',body:'Exists trả về '+hit+' sau khi xét '+n+' ô.',note:'Exists trả về true/false và dừng ngay khi gặp phần tử khớp. Tất cả các phép tìm (IndexOf, Find, FindAll, Exists) đều duyệt tuần tự từ đầu.',vars:[['e',String(hit)]],viz:[myCard('Exists trả về',hit,'ok'), myCnt(n)]});
 }}
};
