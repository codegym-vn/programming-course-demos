// META {"module":1,"lesson":"Giới thiệu về Dictionary<K,V>","activity":"Giới thiệu Dictionary<K,V> và tầm quan trọng của Key-Value Pair","title":"Dictionary và cặp Key-Value","lead":"Cả hai cột cùng tìm một sinh viên theo mã. Một bên quét từng thẻ, một bên đi thẳng tới ngăn. Bấm <b>Bước tiếp</b> để xem.","tabs":[["sv05","Tìm SV05"],["sv09","Tìm SV09 (không có)"]],"codeTitle":"Mã nguồn C#"}
var mySV = [['SV01','An'],['SV02','Bình'],['SV03','Chi'],['SV04','Dũng'],['SV05','Hà'],['SV06','Khoa']];
function myCards(upto, target, found){
  return vCells(mySV.map(function(s,i){ var st = null; if (i < upto) st = 'no'; if (i === upto) st = (s[0] === target) ? 'ok' : 'hi'; return {v:s[0], sub:s[1], s:st}; }), {name:'list (6 thẻ sinh viên)', idx:false, ptr:upto >= 0 ? upto : undefined, ptrLabel:'xét'});
}
function myDr(target, state){ return vDrawers(mySV.map(function(s){ return {k:s[0], v:s[1], s:s[0] === target ? state : (state ? 'dim' : null)}; }), {name:'dict (6 ngăn)'}); }
function mySvTab(target, exists){
  var idx = -1; mySV.forEach(function(s,i){ if (s[0] === target) idx = i; });
  var scans = exists ? idx + 1 : mySV.length; /* số lần so sánh của List */
  var left = {title:'List<Student>',sub:'Quét từng thẻ từ đầu.',
   lines:['// list có 6 sinh viên','var s = list.Find(x =>','  x.Id == "' + target + '");'],
   run:function(c){
    c.snap({ln:0,title:'Danh sách 6 thẻ',body:'Mỗi thẻ là một sinh viên. Muốn tìm "'+target+'" phải xét từng thẻ.',viz:[myCards(-1,target), vScore([{k:'số lần so sánh',v:0}])]});
    for (var i = 0; i < scans; i++){
     var hit = mySV[i][0] === target;
     c.snap({ln:1,title:'Xét '+mySV[i][0],body:hit?mySV[i][0]+' trùng với '+target+'. Tìm thấy '+mySV[i][1]+' sau '+(i+1)+' lần so sánh.':mySV[i][0]+' khác '+target+', xét thẻ kế tiếp.',viz:[myCards(i,target), vScore([{k:'số lần so sánh',v:i+1,s:hit?'ok':null}])]});
    }
    if (!exists){
     c.snap({ln:1,title:'Hết thẻ: trả về null',body:'Đã so sánh cả '+mySV.length+' thẻ mà không thẻ nào khớp. Find trả về null.',viz:[myCards(mySV.length,target), vScore([{k:'số lần so sánh',v:scans,s:'bad'}]), vCard({kind:'warn',title:'Find trả về null'})]});
    }
   }};
  var right = {title:'Dictionary<string, string>',sub:'Tra theo khóa, đi thẳng tới ngăn.',
   lines: exists ? ['// dict: mã SV → tên','string name =','  dict["' + target + '"];'] : ['// dict: mã SV → tên','string name;','bool ok = dict.TryGetValue(','  "' + target + '", out name);'],
   run:function(c){
    c.snap({ln:0,title:'Tủ 6 ngăn',body:'Mỗi ngăn dán nhãn là mã sinh viên, bên trong là tên. Mỗi nhãn chỉ xuất hiện một lần.',viz:[myDr(null,null), vScore([{k:'số lần tra',v:0}])]});
    if (exists){
     c.snap({ln:1,title:'dict["'+target+'"]',body:'Từ khóa, Dictionary đi thẳng tới ngăn '+target+' mà không xét các ngăn khác. Lấy được '+mySV[idx][1]+'.',vars:[['name',S(mySV[idx][1])]],viz:[myDr(target,'ok'), vScore([{k:'số lần tra',v:1,s:'ok'}])]});
    } else {
     c.snap({ln:2,title:'TryGetValue("'+target+'")',body:'Dictionary kiểm tra ngay nhãn '+target+' và thấy không có ngăn nào mang nhãn đó. TryGetValue trả về false, không lỗi.',vars:[['ok','false'],['name','null']],viz:[myDr(null,null), vScore([{k:'số lần tra',v:1,s:'bad'}]), vCard({kind:'warn',title:'Không có ngăn '+target})]});
    }
   }};
  return {inputs:[],
   intro:'Hai cột cùng chứa sinh viên SV01 đến SV06 và cùng tìm ' + target + '. Bấm "Bước tiếp".',
   running:'Bên trái tăng bộ đếm sau mỗi thẻ. Bên phải chỉ tra một lần.',
   done: exists ? 'Bên trái phải so sánh '+scans+' lần. Bên phải chỉ tra 1 lần. Danh sách càng dài thì khoảng cách càng lớn.' : 'Bên trái so sánh hết '+scans+' thẻ rồi mới biết là không có. Bên phải chỉ tra 1 lần và biết ngay.',
   note:'Mỗi khóa là duy nhất và dẫn thẳng tới một giá trị. Tra theo khóa là thế mạnh của Dictionary.',
   cols:[left,right]};
}
var EX = {sv05:mySvTab('SV05',true), sv09:mySvTab('SV09',false)};
