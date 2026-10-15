// META {"module":1,"lesson":"Thao tác nâng cao với List<T>","activity":"Duyệt và Chuyển đổi List<T>","title":"Duyệt và chuyển đổi List<T>","lead":"Chọn một tình huống rồi bấm <b>Bước tiếp</b> để xem con trỏ duyệt đi qua danh sách.","tabs":[["forfe","for và foreach"],["xoa","Xóa trong foreach"],["doi","Chuyển đổi"]],"codeTitle":"Mã nguồn C#"}
function myL(arr, o){ o = o || {}; return vCells(arr.map(function(v,i){ return {v:v, s:o.s && o.s[i]}; }), {name:o.name || 'prices', ptr:o.ptr, ptrLabel:o.lab}); }
var EX = {
forfe:{inputs:[],chips:[],
 intro:'Dùng for để nhân đôi từng giá, rồi dùng foreach để cộng tổng. Bấm "Bước tiếp".',
 lines:function(){return ['var prices = new List<int>','  { 100, 200, 300 };','for (int i = 0;','  i < prices.Count; i++)','  prices[i] = prices[i] * 2;','int sum = 0;','foreach (int p in prices)','  sum += p;','// p = 5; lỗi biên dịch CS1656'];},
 run:function(c){
  var pr = [100,200,300];
  c.snap({ln:1,title:'Danh sách giá',body:'Ba giá 100, 200, 300.',vars:[['prices','→ List<int>']],viz:[myL(pr)]});
  for (var i = 0; i < pr.length; i++){
   pr[i] = pr[i] * 2;
   c.snap({ln:4,title:'for: i = '+i,body:'prices['+i+'] được nhân đôi ngay tại ô '+i+', thành '+pr[i]+'. for dùng chỉ số nên sửa được phần tử.',vars:[['i',i],['prices','→ List<int>']],viz:[myL(pr,{ptr:i,lab:'i = '+i,s:(function(){var s={};s[i]='hi';return s;})()})]});
  }
  var sum = 0;
  for (var k = 0; k < pr.length; k++){
   sum += pr[k];
   c.snap({ln:7,title:'foreach: p = '+pr[k],body:'Biến p nhận giá trị ô '+k+' ('+pr[k]+') để đọc. sum cộng dần thành '+sum+'.',vars:[['p',pr[k]],['sum',sum],['prices','→ List<int>']],viz:[myL(pr,{ptr:k,lab:'p',s:(function(){var s={};s[k]='hi';return s;})()}), vScore([{k:'sum',v:sum}])]});
  }
  c.out(String(sum));
  c.snap({ln:8,title:'Xong',body:'foreach chỉ để đọc. Nếu bỏ // và gán p = 5 thì trình biên dịch báo lỗi CS1656 vì p là biến lặp, không gán được.',note:'Dùng for khi cần chỉ số hoặc sửa phần tử. Dùng foreach để đọc.',vars:[['sum',sum],['prices','→ List<int>']],viz:[myL(pr,{s:{0:'ok',1:'ok',2:'ok'}}), vScore([{k:'sum',v:sum}])]});
 }},
xoa:{inputs:[],chips:[],
 intro:'Thử xóa một phần tử ngay trong lúc foreach đang chạy. Bấm "Bước tiếp".',
 lines:function(){return ['var nums = new List<int>','  { 1, 2, 3, 4 };','foreach (int n in nums)','{','  if (n == 2)','    nums.Remove(2);','}','// cách đúng, trên danh sách mới:','nums.RemoveAll(','  n => n % 2 == 0);'];},
 run:function(c){
  var nums = [1,2,3,4], ver = 1;
  function vv(){ return vScore([{k:'phiên bản danh sách',v:ver,s:ver>1?'bad':null}]); }
  c.snap({ln:1,title:'Danh sách có 4 số',body:'Mỗi danh sách ghi nhớ một "phiên bản". Vòng foreach nhớ phiên bản lúc bắt đầu duyệt.',vars:[['nums','→ List<int>']],viz:[myL(nums,{name:'nums'}), vv()]});
  c.snap({ln:2,title:'foreach: n = 1',body:'n = 1 không bằng 2 nên không làm gì. Phiên bản vẫn là '+ver+'.',vars:[['n',1]],viz:[myL(nums,{name:'nums',ptr:0,lab:'n',s:{0:'hi'}}), vv()]});
  c.snap({ln:4,title:'foreach: n = 2',body:'n = 2 nên điều kiện đúng, chuẩn bị gọi Remove(2).',vars:[['n',2]],viz:[myL(nums,{name:'nums',ptr:1,lab:'n',s:{1:'hi'}}), vv()]});
  nums.splice(nums.indexOf(2),1); ver++;
  c.snap({ln:5,title:'nums.Remove(2)',body:'Danh sách bị sửa thành {'+nums.join(', ')+'}, phiên bản đổi thành '+ver+'. Vòng foreach chưa hay biết.',vars:[['n',2]],viz:[myL(nums,{name:'nums'}), vv()]});
  c.err('Unhandled exception. System.InvalidOperationException:');
  c.err('Collection was modified; enumeration operation may not execute.');
  c.snap({ln:2,title:'Lần lặp kế tiếp: lỗi',body:'foreach so phiên bản (1 với '+ver+') thấy khác nhau, nên ném InvalidOperationException.',vars:[['n',2]],
   viz:[myL(nums,{name:'nums'}), vv(), vCard({kind:'err',title:'InvalidOperationException',sub:'Collection was modified; enumeration operation may not execute.'})]});
  var n2 = [1,2,3,4].filter(function(n){ return n % 2 !== 0; });
  c.snap({ln:8,title:'Cách đúng: RemoveAll',body:'Với danh sách {1, 2, 3, 4} mới, RemoveAll(n => n % 2 == 0) xóa mọi số chẵn mà không cần vòng foreach. Còn lại {'+n2.join(', ')+'}.',vars:[['nums','→ List<int>']],viz:[myL([1,2,3,4],{name:'trước',s:{1:'del',3:'del'}}), myL(n2,{name:'sau RemoveAll',s:{0:'ok',1:'ok'}})]});
  c.snap({ln:8,title:'Xong',body:'Muốn xóa theo điều kiện, hãy để List tự lo.',note:'Không thêm hoặc xóa phần tử trong foreach. Dùng RemoveAll, hoặc dùng for duyệt ngược.',vars:[['nums','→ List<int>']],viz:[myL(n2,{name:'nums',s:{0:'ok',1:'ok'}})]});
 }},
doi:{inputs:[],chips:[],
 intro:'Chuyển List sang dạng khác mà không đụng tới danh sách gốc. Bấm "Bước tiếp".',
 lines:function(){return ['var prices = new List<int>','  { 100, 200, 300 };','List<double> big =','  prices.ConvertAll(p => p * 1.5);','int[] arr = prices.ToArray();'];},
 run:function(c){
  var pr = [100,200,300];
  c.snap({ln:1,title:'Danh sách gốc',body:'prices là List<int> gồm 100, 200, 300.',vars:[['prices','→ List<int>']],viz:[myL(pr)]});
  var big = pr.map(function(p){ return p * 1.5; });
  c.snap({ln:3,title:'ConvertAll: tạo List<double> mới',body:'Mỗi phần tử được nhân 1.5 rồi đưa vào một List<double> mới: {'+big.join(', ')+'}. Danh sách gốc nằm yên.',vars:[['prices','→ List<int>'],['big','→ List<double>']],viz:[myL(pr,{s:{0:'dim',1:'dim',2:'dim'}}), myL(big.map(function(v){return v.toFixed(1);}),{name:'big (List<double> mới)',s:{0:'new',1:'new',2:'new'}})]});
  var arr = pr.slice();
  c.snap({ln:4,title:'ToArray: tạo mảng',body:'ToArray chép các phần tử sang một mảng int[] mới.',vars:[['prices','→ List<int>'],['big','→ List<double>'],['arr','→ int[]']],viz:[myL(pr,{s:{0:'dim',1:'dim',2:'dim'}}), myL(arr,{name:'arr (mảng mới)',s:{0:'new',1:'new',2:'new'}})]});
  c.snap({ln:4,title:'Xong',body:'Có ba nơi riêng biệt: prices không đổi, big là List<double>, arr là mảng.',note:'ConvertAll và ToArray tạo ra bản mới, danh sách gốc giữ nguyên.',vars:[['prices','→ List<int>'],['big','→ List<double>'],['arr','→ int[]']],viz:[myL(pr,{name:'prices (giữ nguyên)',s:{0:'ok',1:'ok',2:'ok'}}), myL(big.map(function(v){return v.toFixed(1);}),{name:'big'}), myL(arr,{name:'arr'})]});
 }}
};
