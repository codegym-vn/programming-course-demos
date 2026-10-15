// META {"module":1,"lesson":"Giới thiệu về Collections và List<T> cơ bản","activity":"Thêm, Truy cập và Xóa phần tử trong List<T>","title":"Thêm, truy cập và xóa phần tử trong List<T>","lead":"Chọn một tình huống rồi bấm <b>Bước tiếp</b> để xem các ô dịch chuyển và chỉ số thay đổi.","tabs":[["addins","Add và Insert"],["truycap","Truy cập và sửa"],["remove","Remove và RemoveAt"],["loi","Lỗi chỉ số"]],"codeTitle":"Mã nguồn C#"}
function myRow(a, o){ /* o: {hi:{i:'s'}, subs:{i:'text'}, ptr} */
  o = o || {};
  return vCells(a.map(function(v,i){ return {v:v, s:o.hi && o.hi[i], sub:o.subs && o.subs[i]}; }), {name:'fruits', ptr:o.ptr, ptrLabel:o.ptrLabel});
}
function myCnt(a){ return vScore([{k:'Count',v:a.length}]); }
var EX = {
addins:{inputs:[],chips:[],
 intro:'Thêm vào cuối bằng Add, rồi chèn vào giữa bằng Insert. Bấm "Bước tiếp".',
 lines:function(){return ['var fruits = new List<string>','  { "Táo", "Cam" };','fruits.Add("Xoài");','fruits.Insert(1, "Lê");'];},
 run:function(c){
  var f = ['Táo','Cam'];
  c.snap({ln:1,title:'Danh sách ban đầu',body:'Hai phần tử: "Táo" ở chỉ số 0, "Cam" ở chỉ số 1.',vars:[['fruits','→ List<string>']],viz:[myRow(f), myCnt(f)]});
  f.push('Xoài');
  c.snap({ln:2,title:'Add("Xoài")',body:'Add đặt phần tử mới vào cuối, ở chỉ số '+(f.length-1)+'. Các ô cũ không đổi.',vars:[['fruits','→ List<string>']],viz:[myRow(f,{hi:{2:'new'}}), myCnt(f)]});
  var before = f.slice(); f.splice(1,0,'Lê');
  c.snap({ln:3,title:'Insert(1, "Lê"): các ô sau dịch phải',body:'"Lê" chen vào chỉ số 1. "Cam" và "Xoài" phải dịch sang phải một ô, chỉ số của chúng tăng thêm 1.',
   vars:[['fruits','→ List<string>']],viz:[myRow(f,{hi:{1:'new',2:'hi',3:'hi'},subs:{2:'1→2',3:'2→3'}}), myCnt(f)]});
  c.snap({ln:3,title:'Xong',body:'Danh sách lúc này là '+f.join(', ')+'.',note:'Add thêm vào cuối. Insert chèn vào vị trí bất kỳ và làm các phần tử phía sau dịch sang phải.',
   vars:[['fruits','→ List<string>']],viz:[myRow(f,{hi:{0:'ok',1:'ok',2:'ok',3:'ok'}}), myCnt(f)]});
 }},
truycap:{inputs:[],chips:[],
 intro:'Đọc và sửa phần tử bằng chỉ số trong ngoặc vuông. Bấm "Bước tiếp".',
 lines:function(){return ['var fruits = new List<string>','  { "Táo", "Cam", "Xoài" };','string s = fruits[0];','fruits[2] = "Nho";'];},
 run:function(c){
  var f = ['Táo','Cam','Xoài'];
  c.snap({ln:1,title:'Danh sách ban đầu',body:'Ba phần tử, chỉ số 0, 1, 2.',vars:[['fruits','→ List<string>']],viz:[myRow(f), myCnt(f)]});
  var s = f[0];
  c.snap({ln:2,title:'Đọc fruits[0]',body:'Chỉ số 0 cho giá trị "'+s+'". Đọc không làm danh sách thay đổi.',vars:[['fruits','→ List<string>'],['s',S(s)]],viz:[myRow(f,{hi:{0:'hi'},ptr:0}), myCnt(f)]});
  f[2] = 'Nho';
  c.snap({ln:3,title:'Sửa fruits[2] = "Nho"',body:'Gán vào chỉ số 2 thay "Xoài" bằng "Nho" ngay tại chỗ. Count vẫn là '+f.length+'.',vars:[['fruits','→ List<string>'],['s',S(s)]],viz:[myRow(f,{hi:{2:'hi'},ptr:2}), myCnt(f)]});
  c.snap({ln:3,title:'Xong',body:'Danh sách lúc này là '+f.join(', ')+'.',note:'Dùng list[chỉ số] để đọc hoặc sửa tại chỗ. Sửa không làm đổi Count.',vars:[['fruits','→ List<string>']],viz:[myRow(f,{hi:{2:'ok'}}), myCnt(f)]});
 }},
remove:{inputs:[],chips:[],
 intro:'Xóa theo giá trị bằng Remove, xóa theo vị trí bằng RemoveAt. Bấm "Bước tiếp".',
 lines:function(){return ['var fruits = new List<string>','  { "Táo", "Cam", "Xoài", "Lê" };','bool a = fruits.Remove("Cam");','bool b = fruits.Remove("Dứa");','fruits.RemoveAt(0);'];},
 run:function(c){
  var f = ['Táo','Cam','Xoài','Lê'];
  c.snap({ln:1,title:'Danh sách ban đầu',body:'Bốn phần tử, chỉ số từ 0 đến 3.',vars:[['fruits','→ List<string>']],viz:[myRow(f), myCnt(f)]});
  var i = f.indexOf('Cam'), a = i >= 0;
  c.snap({ln:2,title:'Remove("Cam"): tìm và xóa',body:'Remove tìm "Cam" từ đầu danh sách, thấy ở chỉ số '+i+' và đánh dấu để xóa.',vars:[['fruits','→ List<string>']],viz:[myRow(f,{hi:{1:'del'}}), myCnt(f)]});
  f.splice(i,1);
  c.snap({ln:2,title:'Các ô sau dịch trái',body:'Ô bị xóa biến mất, "Xoài" và "Lê" dịch sang trái một ô. Remove trả về '+(a?'true':'false')+'.',
   vars:[['fruits','→ List<string>'],['a',a?'true':'false']],viz:[myRow(f,{hi:{1:'hi',2:'hi'},subs:{1:'2→1',2:'3→2'}}), myCnt(f)]});
  var j = f.indexOf('Dứa'), b = j >= 0;
  c.snap({ln:3,title:'Remove("Dứa"): không có',body:'Không có "Dứa" trong danh sách. Remove trả về '+(b?'true':'false')+' và không ném lỗi, danh sách giữ nguyên.',
   vars:[['fruits','→ List<string>'],['a','true'],['b',b?'true':'false']],viz:[myRow(f,{hi:{0:'no',1:'no',2:'no'}}), myCnt(f)]});
  c.snap({ln:4,title:'RemoveAt(0): xóa theo vị trí',body:'RemoveAt xóa phần tử ở chỉ số 0, tức là "'+f[0]+'".',vars:[['fruits','→ List<string>'],['a','true'],['b','false']],viz:[myRow(f,{hi:{0:'del'}}), myCnt(f)]});
  f.splice(0,1);
  c.snap({ln:4,title:'Xong',body:'Danh sách còn '+f.join(', ')+'.',note:'Remove(giá trị) xóa lần xuất hiện đầu tiên và trả bool. RemoveAt(chỉ số) xóa theo vị trí. Các phần tử sau luôn dịch trái.',
   vars:[['fruits','→ List<string>']],viz:[myRow(f,{hi:{0:'ok',1:'ok'}}), myCnt(f)]});
 }},
loi:{inputs:[],chips:[],
 intro:'Đọc một chỉ số nằm ngoài danh sách thì sao? Bấm "Bước tiếp".',
 lines:function(){return ['var fruits = new List<string>','  { "Táo", "Cam", "Xoài" };','string a = fruits[2];','string b = fruits[3];'];},
 run:function(c){
  var f = ['Táo','Cam','Xoài'];
  c.snap({ln:1,title:'Danh sách 3 phần tử',body:'Count là '+f.length+' nên chỉ số hợp lệ là từ 0 đến '+(f.length-1)+'.',vars:[['fruits','→ List<string>']],viz:[myRow(f), myCnt(f)]});
  c.snap({ln:2,title:'Đọc fruits[2]',body:'Chỉ số 2 là phần tử cuối, đọc được "'+f[2]+'".',vars:[['fruits','→ List<string>'],['a',S(f[2])]],viz:[myRow(f,{hi:{2:'ok'},ptr:2}), myCnt(f)]});
  c.err('Unhandled exception. System.ArgumentOutOfRangeException:');
  c.err("Index was out of range. Must be non-negative and less than the size of the collection. (Parameter 'index')");
  c.snap({ln:3,title:'Đọc fruits[3]: lỗi',body:'Chỉ số 3 bằng Count nên không có ô nào. List ném ArgumentOutOfRangeException.',vars:[['fruits','→ List<string>'],['a',S(f[2])]],
   viz:[vCells(f.map(function(v){return {v:v};}).concat([{v:'?',s:'bad'}]),{name:'fruits',ptr:3}),
    vCard({kind:'err',title:'ArgumentOutOfRangeException',sub:"Index was out of range. Must be non-negative and less than the size of the collection. (Parameter 'index')"})]});
  c.snap({ln:3,title:'Xong',body:'Chỉ số hợp lệ là từ 0 đến Count - 1, tức là 0 đến '+(f.length-1)+'.',note:'Chỉ số hợp lệ: 0 đến Count - 1. Chỉ số ngoài khoảng đó ném ArgumentOutOfRangeException.',
   vars:[['fruits','→ List<string>']],viz:[myRow(f,{hi:{0:'ok',1:'ok',2:'ok'}}), vCard({kind:'ok',title:'Chỉ số hợp lệ',sub:'0 đến '+(f.length-1)+' (Count = '+f.length+')'})]});
 }}
};
