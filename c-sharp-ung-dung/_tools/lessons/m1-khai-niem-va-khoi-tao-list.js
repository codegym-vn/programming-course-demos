// META {"module":1,"lesson":"Giới thiệu về Collections và List<T> cơ bản","activity":"Khái niệm và Khởi tạo List<T>","title":"Khởi tạo List<T>","lead":"Có bốn cách tạo List<T>. Chọn một tình huống rồi bấm <b>Bước tiếp</b> và để ý hai ô Count, Capacity.","tabs":[["rong","Rỗng"],["succhua","Có sức chứa ban đầu"],["kemgiatri","Khởi tạo kèm giá trị"],["tumang","Từ mảng có sẵn"]],"codeTitle":"Mã nguồn C#"}
function myCS(n, cap){ return vScore([{k:'Count',v:n},{k:'Capacity',v:cap}]); }
function myNoCell(){ return '<div class="v-sub" style="padding:8px 0">(chưa có ô nào)</div>'; }
var EX = {
rong:{inputs:[],chips:[],
 intro:'Tạo List rỗng rồi thêm một phần tử. Bấm "Bước tiếp".',
 lines:function(){return ['var names =','  new List<string>();','names.Add("An");','names.Add("Bình");'];},
 run:function(c){
  var L = [], cap = 0;
  c.snap({ln:1,title:'Tạo List rỗng',body:'Count là 0 vì chưa có phần tử nào. Capacity cũng là 0 vì chưa cấp ô nào.',
   vars:[['names','→ List<string>']],viz:[myNoCell(), myCS(0,0)]});
  L.push('An'); cap = 4;
  c.snap({ln:2,title:'Add("An")',body:'Lần Add đầu tiên, List cấp sẵn 4 chỗ rồi đặt "An" vào ô 0. Count là '+L.length+', Capacity là '+cap+'.',
   vars:[['names','→ List<string>']],viz:[vCells([{v:'An',s:'new'}],{name:'names',cap:cap}), myCS(L.length,cap)]});
  L.push('Bình');
  c.snap({ln:3,title:'Add("Bình")',body:'Còn chỗ trống nên List không cấp thêm. Count tăng lên '+L.length+', Capacity vẫn là '+cap+'.',
   vars:[['names','→ List<string>']],viz:[vCells([{v:'An'},{v:'Bình',s:'new'}],{name:'names',cap:cap}), myCS(L.length,cap)]});
  c.snap({ln:3,title:'Xong',body:'Count là số phần tử đang có. Capacity là chỗ đã chuẩn bị sẵn, thường lớn hơn hoặc bằng Count.',
   note:'Count = số phần tử thật ('+L.length+'). Capacity = chỗ đã cấp sẵn ('+cap+').',vars:[['names','→ List<string>']],viz:[vCells([{v:'An',s:'ok'},{v:'Bình',s:'ok'}],{name:'names',cap:cap}), myCS(L.length,cap)]});
 }},
succhua:{inputs:[],chips:[],
 intro:'Cho List một sức chứa ban đầu rồi thử đọc ô số 0. Bấm "Bước tiếp".',
 lines:function(){return ['var names =','  new List<string>(10);','var x = names[0];'];},
 run:function(c){
  var cap = 10, n = 0;
  c.snap({ln:1,title:'new List<string>(10)',body:'List cấp sẵn 10 chỗ (nét đứt), nhưng chưa có phần tử nào. Count vẫn là '+n+'.',
   vars:[['names','→ List<string>']],viz:[vCells([],{name:'names',cap:cap}), myCS(n,cap)]});
  c.snap({ln:1,title:'Chỗ chuẩn bị chưa phải phần tử',body:'Mười ô nét đứt chỉ là chỗ đã dành sẵn để sau này Add không phải cấp thêm. Chưa ô nào chứa dữ liệu.',
   vars:[['names','→ List<string>']],viz:[vCells([],{name:'names',cap:cap}), myCS(n,cap)]});
  c.err('Unhandled exception. System.ArgumentOutOfRangeException:');
  c.err("Index was out of range. Must be non-negative and less than the size of the collection. (Parameter 'index')");
  c.snap({ln:2,title:'Đọc names[0] khi chưa Add',body:'Chỉ đọc được chỉ số từ 0 đến Count - 1. Count là '+n+' nên ô 0 chưa tồn tại, dù chỗ đã được chuẩn bị.',
   vars:[['names','→ List<string>']],viz:[vCells([],{name:'names',cap:cap}), myCS(n,cap),
    vCard({kind:'err',title:'ArgumentOutOfRangeException',sub:"Index was out of range. Must be non-negative and less than the size of the collection. (Parameter 'index')"})]});
  c.snap({ln:2,title:'Xong',body:'Capacity chỉ là chỗ dự phòng, không phải số phần tử. Phải Add trước thì mới có ô để đọc.',
   note:'Chỉ truy cập được chỉ số 0 đến Count - 1, không phải đến Capacity - 1.',vars:[['names','→ List<string>']],viz:[vCells([],{name:'names',cap:cap}), myCS(n,cap)]});
 }},
kemgiatri:{inputs:[],chips:[],
 intro:'Khởi tạo List kèm sẵn ba tên. Xem trình biên dịch làm gì phía sau. Bấm "Bước tiếp".',
 lines:function(){return ['var names =','  new List<string>','{','  "An",','  "Bình",','  "Chi"','};'];},
 run:function(c){
  var L = [], cap = 0, src = ['An','Bình','Chi'];
  c.snap({ln:1,title:'Tạo List rỗng',body:'Trình biên dịch trước hết gọi new List<string>(), nên Count 0, Capacity 0.',
   vars:[['names','→ List<string>']],viz:[myNoCell(), myCS(0,0)]});
  src.forEach(function(x, i){
   L.push(x); cap = L.length <= 4 ? 4 : cap;
   c.snap({ln:3+i,title:'Gọi Add("'+x+'")',body:i===0?'Mỗi giá trị trong cặp ngoặc nhọn thực chất là một lần gọi Add. Lần đầu cấp sẵn 4 chỗ.':'Lại một lần Add nữa, ghi vào ô kế tiếp.',
    vars:[['names','→ List<string>']],viz:[vCells(L.map(function(v,k){return {v:v,s:k===L.length-1?'new':null};}),{name:'names',cap:cap}), myCS(L.length,cap)]});
  });
  c.snap({ln:6,title:'Xong',body:'Viết gọn trong ngoặc nhọn hay gọi Add từng lần cho kết quả giống nhau.',
   note:'Collection initializer thực chất gọi Add cho từng giá trị. Kết quả: Count '+L.length+', Capacity '+cap+'.',vars:[['names','→ List<string>']],viz:[vCells(L.map(function(v){return {v:v,s:'ok'};}),{name:'names',cap:cap}), myCS(L.length,cap)]});
 }},
tumang:{inputs:[],chips:[],
 intro:'Tạo List từ một mảng có sẵn rồi đổi mảng. Xem List có đổi theo không. Bấm "Bước tiếp".',
 lines:function(){return ['int[] arr = { 1, 2, 3 };','var list =','  new List<int>(arr);','arr[0] = 99;','Console.WriteLine(list[0]);'];},
 run:function(c){
  var arr = [1,2,3], list = null;
  function pair(sa, sl, listSub){
   return vPair(vCells(arr.map(function(v,i){return {v:v,s:sa&&sa[i]};}),{name:'arr'}),
    list ? [vCells(list.map(function(v,i){return {v:v,s:sl&&sl[i]};}),{name:'list'}), myCS(list.length,list.length)] : '<div class="v-sub" style="padding:8px 0">(chưa có)</div>',{ta:'Mảng arr',tb:'List list'});
  }
  c.snap({ln:0,title:'Tạo mảng arr',body:'Mảng chứa 1, 2, 3.',vars:[['arr','→ {1, 2, 3}']],viz:[pair()]});
  list = arr.slice();
  c.snap({ln:2,title:'new List<int>(arr)',body:'List chép từng phần tử của mảng sang một nơi riêng. Đây là hai bản độc lập. Count là '+list.length+', Capacity là '+list.length+'.',
   vars:[['arr','→ {1, 2, 3}'],['list','→ List<int>']],viz:[pair(null,['new','new','new'])]});
  arr[0] = 99;
  c.snap({ln:3,title:'arr[0] = 99',body:'Chỉ mảng bị đổi. List vẫn giữ bản chép cũ.',
   vars:[['arr','→ {99, 2, 3}'],['list','→ List<int>']],viz:[pair(['hi'],null)]});
  c.out(String(list[0]));
  c.snap({ln:4,title:'Xong',body:'list[0] vẫn là '+list[0]+', không phải '+arr[0]+'.',
   note:'new List<T>(mảng) chép dữ liệu sang List mới. Đổi mảng sau đó không ảnh hưởng List. Count và Capacity đều là '+list.length+'.',
   vars:[['arr','→ {99, 2, 3}'],['list','→ List<int>']],viz:[pair(['hi'],['ok'])]});
 }}
};
