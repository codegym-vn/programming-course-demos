// META {"module":1,"lesson":"Thao tác nâng cao với List<T>","activity":"Sắp xếp và Đảo ngược List<T>","title":"Sắp xếp và đảo ngược List<T>","lead":"Sort và Reverse đều sửa trực tiếp danh sách. Chọn một tình huống rồi bấm <b>Bước tiếp</b>.","tabs":[["so","Sort số"],["chuoi","Sort chuỗi"],["thuoctinh","Sort theo thuộc tính"],["reverse","Reverse"]],"codeTitle":"Mã nguồn C#"}
/* hai hàng trước / sau; from[i] = chỉ số cũ của phần tử đang ở vị trí i */
function mySorted(before, after, name){
  var used = {};
  var items = after.map(function(v){ var k = -1; for (var j = 0; j < before.length; j++){ if (!used[j] && before[j] === v){ k = j; used[j] = 1; break; } } return {v:v, s:'new', sub:'từ ô ' + k}; });
  return [vCells(before.map(function(v){return {v:v,s:'dim'};}),{name:name + ' trước'}), '<div class="v-sub" style="text-align:center;padding:2px 0">▼</div>', vCells(items,{name:name + ' sau'})];
}
function myCmp(x, y){ return x < y ? -1 : (x > y ? 1 : 0); }
function myProd(arr, hi){ return vCells(arr.map(function(p,i){ return {v:p.n, sub:p.p, s:hi && hi[i]}; }), {name:'products (tên, giá)', idx:true}); }
function myCmpFlow(a, b, asc){
  var r = asc ? myCmp(a.p, b.p) : myCmp(b.p, a.p);
  return vFlow([{t:'a: '+a.n,sub:String(a.p),s:'hi'},{t:asc?'a.Price.CompareTo(b.Price)':'b.Price.CompareTo(a.Price)',sub:'kết quả '+r,s:r<0?'ok':'bad'},{t:'b: '+b.n,sub:String(b.p),s:'hi'}],{title:'So sánh một cặp'});
}
var EX = {
so:{inputs:[],chips:[],
 intro:'Sắp xếp một danh sách số tăng dần. Bấm "Bước tiếp".',
 lines:function(){return ['var a = new List<int>','  { 5, 2, 8, 1 };','a.Sort();'];},
 run:function(c){
  var a = [5,2,8,1], b = a.slice();
  c.snap({ln:1,title:'Danh sách ban đầu',body:'Bốn số chưa theo thứ tự.',vars:[['a','→ List<int>']],viz:[vCells(a.map(function(v){return {v:v};}),{name:'a'})]});
  a.sort(function(x,y){return x-y;});
  c.snap({ln:2,title:'a.Sort()',body:'Các số được xếp lại tăng dần. Dưới mỗi ô cho biết số đó đến từ ô nào của danh sách cũ.',vars:[['a','→ List<int>']],viz:mySorted(b,a,'a')});
  c.snap({ln:2,title:'Xong',body:'Không có danh sách mới nào được tạo. Chính danh sách a đã đổi thành {'+a.join(', ')+'}.',note:'Sort() sắp xếp tăng dần ngay trên danh sách gốc, không tạo danh sách mới.',vars:[['a','→ List<int>']],viz:[vCells(a.map(function(v){return {v:v,s:'ok'};}),{name:'a (sau Sort)'})]});
  c.snap({ln:2,title:'Ghi nhớ',body:'Sau Sort, thứ tự cũ {'+b.join(', ')+'} không còn nữa. Muốn giữ bản cũ phải chép ra trước.',vars:[['a','→ List<int>']],viz:[vCells(a.map(function(v){return {v:v,s:'ok'};}),{name:'a'})]});
 }},
chuoi:{inputs:[],chips:[],
 intro:'Sắp xếp danh sách tên theo thứ tự chữ cái. Bấm "Bước tiếp".',
 lines:function(){return ['var names = new List<string>','  { "Minh", "An", "Lan", "Bao" };','names.Sort();'];},
 run:function(c){
  var a = ['Minh','An','Lan','Bao'], b = a.slice();
  c.snap({ln:1,title:'Danh sách ban đầu',body:'Bốn tên chưa theo thứ tự.',vars:[['names','→ List<string>']],viz:[vCells(a.map(function(v){return {v:v};}),{name:'names'})]});
  c.snap({ln:2,title:'Sort so sánh theo chữ cái',body:'Sort so sánh từng cặp tên, bắt đầu từ chữ cái đầu. Ở đây chữ đầu là '+['An','Bao','Lan','Minh'].map(function(x){return x[0];}).join(' < ')+'.',vars:[['names','→ List<string>']],viz:[vCells(a.map(function(v){return {v:v,s:'hi',sub:v[0]};}),{name:'names (chữ đầu ở dưới)'})]});
  a.sort();
  c.snap({ln:2,title:'names.Sort()',body:'Tên được xếp theo thứ tự chữ cái: An, Bao, Lan, Minh.',vars:[['names','→ List<string>']],viz:mySorted(b,a,'names')});
  c.snap({ln:2,title:'Xong',body:'Chuỗi cũng sắp xếp được bằng Sort() như số. Ví dụ này dùng tên không dấu cho dễ đoán.',note:'Sort() dùng được cho chuỗi, kết quả theo thứ tự chữ cái: {'+a.join(', ')+'}.',vars:[['names','→ List<string>']],viz:[vCells(a.map(function(v){return {v:v,s:'ok'};}),{name:'names (sau Sort)'})]});
 }},
thuoctinh:{inputs:[],chips:[],
 intro:'Sắp xếp sản phẩm theo giá bằng cách đưa vào một hàm so sánh. Bấm "Bước tiếp".',
 lines:function(){return ['// Bút 5000, Vở 12000, Thước 8000','products.Sort((a, b) =>','  a.Price.CompareTo(b.Price));','products.Sort((a, b) =>','  b.Price.CompareTo(a.Price));'];},
 run:function(c){
  var P = [{n:'Bút',p:5000},{n:'Vở',p:12000},{n:'Thước',p:8000}];
  c.snap({ln:0,title:'Danh sách sản phẩm',body:'Ba sản phẩm có tên và giá. Sort() thường không biết so sánh hai Product, nên ta phải đưa cho nó một hàm so sánh.',vars:[['products','→ List<Product>']],viz:[myProd(P)]});
  var r1 = myCmp(P[0].p, P[1].p);
  c.snap({ln:2,title:'So sánh Bút với Vở',body:P[0].p+' so với '+P[1].p+' cho kết quả '+r1+' (âm): a đứng trước b, giữ nguyên thứ tự.',vars:[['products','→ List<Product>']],viz:[myProd(P,{0:'hi',1:'hi'}), myCmpFlow(P[0],P[1],true)]});
  var r2 = myCmp(P[1].p, P[2].p);
  c.snap({ln:2,title:'So sánh Vở với Thước',body:P[1].p+' so với '+P[2].p+' cho kết quả '+r2+' (dương): a phải đứng sau b, nên hai bên đổi chỗ.',vars:[['products','→ List<Product>']],viz:[myProd(P,{1:'hi',2:'hi'}), myCmpFlow(P[1],P[2],true)]});
  P.sort(function(x,y){return x.p-y.p;});
  c.snap({ln:2,title:'Kết quả tăng dần theo giá',body:'Sau Sort: '+P.map(function(x){return x.n+' '+x.p;}).join(', ')+'.',vars:[['products','→ List<Product>']],viz:[myProd(P,{0:'ok',1:'ok',2:'ok'})]});
  var r3 = myCmp(P[2].p, P[0].p);
  c.snap({ln:4,title:'Đảo vế: b.Price.CompareTo(a.Price)',body:'Đổi vai trò hai vế. Với a = Vở ('+P[2].p+') và b = Bút ('+P[0].p+'), b.CompareTo(a) cho '+myCmp(P[0].p,P[2].p)+' (âm), nên a đứng trước. Kết quả là giá giảm dần.',vars:[['products','→ List<Product>']],viz:[myProd(P,{0:'hi',2:'hi'}), myCmpFlow(P[2],P[0],false)]});
  P.sort(function(x,y){return y.p-x.p;});
  c.snap({ln:4,title:'Xong',body:'Sau lần Sort thứ hai: '+P.map(function(x){return x.n+' '+x.p;}).join(', ')+'.',note:'Muốn sắp theo tiêu chí riêng, truyền hàm so sánh vào Sort. Kết quả âm nghĩa là a đứng trước b; đảo vế a và b để đổi chiều.',vars:[['products','→ List<Product>']],viz:[myProd(P,{0:'ok',1:'ok',2:'ok'})]});
 }},
reverse:{inputs:[],chips:[],
 intro:'Reverse chỉ lật ngược thứ tự, không sắp xếp. Bấm "Bước tiếp".',
 lines:function(){return ['var a = new List<int>','  { 1, 2, 5, 8 };','a.Reverse();','var b = new List<int>','  { 5, 2, 8, 1 };','b.Reverse();'];},
 run:function(c){
  var a = [1,2,5,8], b0 = [5,2,8,1];
  function row(arr, name, s){ return vCells(arr.map(function(v){return {v:v,s:s};}),{name:name}); }
  c.snap({ln:1,title:'Danh sách a',body:'a đang tăng dần: {'+a.join(', ')+'}.',vars:[['a','→ List<int>']],viz:[row(a,'a')]});
  var ab = a.slice(); a.reverse();
  c.snap({ln:2,title:'a.Reverse()',body:'Thứ tự bị lật: phần tử đầu thành cuối và ngược lại, được {'+a.join(', ')+'}.',vars:[['a','→ List<int>']],viz:mySorted(ab,a,'a')});
  var b = b0.slice();
  c.snap({ln:4,title:'Danh sách b chưa sắp xếp',body:'b = {'+b.join(', ')+'}. Thử Reverse trên danh sách lộn xộn.',vars:[['a','→ List<int>'],['b','→ List<int>']],viz:[row(a,'a','ok'), row(b,'b')]});
  var bb = b.slice(); b.reverse();
  c.snap({ln:5,title:'b.Reverse()',body:'Kết quả là {'+b.join(', ')+'}. Đây chỉ là bản lật ngược của {'+bb.join(', ')+'}, không phải danh sách đã sắp xếp.',vars:[['a','→ List<int>'],['b','→ List<int>']],viz:mySorted(bb,b,'b')});
  c.snap({ln:5,title:'Xong',body:'Reverse không so sánh giá trị nào, nó chỉ đảo vị trí.',note:'Reverse() chỉ lật thứ tự hiện có trên danh sách gốc, không sắp xếp. Muốn sắp xếp dùng Sort().',vars:[['a','→ List<int>'],['b','→ List<int>']],viz:[row(a,'a','ok'), row(b,'b','ok')]});
 }}
};
