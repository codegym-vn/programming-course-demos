// META {"module":1,"lesson":"Thao tác nâng cao với Dictionary<K,V> và lựa chọn Collections","activity":"So sánh List<T> và Dictionary<K,V>: Khi nào sử dụng cái nào?","title":"List hay Dictionary?","lead":"Cùng một nhu cầu, cho cả List (trái) và Dictionary (phải) làm. Chọn tình huống rồi bấm <b>Bước tiếp</b> để hai cột cùng chạy.","tabs":[["tra","Tra theo mã"],["vitri","Lấy phần tử thứ 3"],["trung","Lưu giá trị trùng"]],"codeTitle":"Mã nguồn C#"}
var ldCodes = ['SP01','SP02','SP03','SP04','SP05','SP06','SP07','SP08'];
function ldList(st, o){ return vCells(ldCodes.map(function(v, i){ return {v:v, s:st[i]}; }), {name:'List', small:true, ptr:o && o.ptr, ptrLabel:o && o.ptrLabel}); }
function ldDict(st){ return vDrawers(ldCodes.map(function(v, i){ return {k:v, v:i + 1, s:st[i]}; }), {name:'Dictionary'}); }
function ldFlag(text){ return vCard({kind:'ok', title:'Phù hợp hơn', sub:text}); }
var ldNeed = 'SP06';
var ldIdx = ldCodes.indexOf(ldNeed);
var ldListSteps = ldIdx + 1, ldDictSteps = 1;
var ldGetList = 1, ldGetDict = 3;
var ldDup = (function(){
  var list = ['An'], map = {}, err = null;
  list.push('An');
  map['An'] = 1;
  if (Object.prototype.hasOwnProperty.call(map, 'An')) err = 'An item with the same key has already been added. Key: An'; else map['An'] = 2;
  return {listCount:list.length, dictCount:Object.keys(map).length, err:err};
})();
var ldSummary = 'Tra theo mã: Dictionary (1 bước so với ' + ldListSteps + '). Lấy phần tử thứ 3: List (' + ldGetList + ' bước so với ' + ldGetDict + '). Giá trị trùng: List (lưu đủ ' + ldDup.listCount + ' phần tử, Dictionary chỉ giữ ' + ldDup.dictCount + ').';
var ldNote = 'List: thứ tự và vị trí. Dictionary: tra nhanh theo khóa duy nhất. Có thể kết hợp, ví dụ Dictionary<string, List<T>>.';
function ldSc(label, n, s){ return vScore([{k:label, v:n, s:s}]); }
var EX = {
tra:{ intro:'Tìm sản phẩm SP06 trong 8 sản phẩm. Bấm "Bước tiếp".',
 running:'Quan sát số bước mỗi bên cần để tìm ra SP06.',
 done:'List cần ' + ldListSteps + ' bước, Dictionary chỉ 1 bước. ' + ldSummary, note:ldNote,
 cols:[
 {title:'List<string>',sub:'Quét lần lượt từng phần tử.',
  lines:['// list: SP01 ... SP08','foreach (var p in list)','{','  if (p == "SP06")','    break;','}'],
  run:function(c){
   var st = [];
   c.snap({ln:0,title:'Chuẩn bị',body:'List có 8 mã, cần tìm "SP06". List không biết SP06 nằm đâu.',viz:[ldList(st), ldSc('số bước',0)]});
   for (var i = 0; i <= ldIdx; i++) {
     var s2 = []; for (var j = 0; j < i; j++) s2[j] = 'no'; s2[i] = ldCodes[i] === ldNeed ? 'ok' : 'hi';
     c.snap({ln:3,title:'So sánh ' + ldCodes[i],body:ldCodes[i] === ldNeed ? 'Khớp SP06 sau ' + (i + 1) + ' bước, dừng.' : ldCodes[i] + ' khác SP06, xét tiếp.',viz:[ldList(s2), ldSc('số bước',i + 1,ldCodes[i] === ldNeed ? 'ok' : 'hi')]});
   }
   var s3 = []; for (var k = 0; k < ldIdx; k++) s3[k] = 'no'; s3[ldIdx] = 'ok';
   c.snap({ln:4,title:'Xong',body:'List phải quét ' + ldListSteps + ' phần tử để thấy SP06.',viz:[ldList(s3), ldSc('số bước',ldListSteps,'bad')]});
  }},
 {title:'Dictionary<string, int>',sub:'Đi thẳng tới ngăn theo khóa.',
  lines:['// dict: "SP01" ... "SP08"','var v = dict["SP06"];'],
  run:function(c){
   c.snap({ln:0,title:'Chuẩn bị',body:'Dictionary có 8 ngăn, mỗi ngăn mang nhãn là mã sản phẩm.',viz:[ldDict([]), ldSc('số bước',0)]});
   var st = []; st[ldIdx] = 'hi';
   c.snap({ln:1,title:'Tra dict["SP06"]',body:'Đi thẳng tới ngăn SP06, không xét các ngăn khác. Chỉ 1 bước.',viz:[ldDict(st), ldSc('số bước',ldDictSteps,'ok')]});
   st[ldIdx] = 'ok';
   c.snap({ln:1,title:'Xong',body:'Tìm xong sau ' + ldDictSteps + ' bước.',viz:[ldDict(st), ldSc('số bước',ldDictSteps,'ok'), ldFlag('Tra theo khóa nhanh hơn.')]});
  }}]},
vitri:{ intro:'Lấy phần tử thứ 3 của mỗi bên. Bấm "Bước tiếp".',
 running:'Quan sát: List có chỉ số vị trí, Dictionary thì không.',
 done:'List lấy được ngay bằng chỉ số (' + ldGetList + ' bước), Dictionary phải duyệt đếm tới phần tử thứ 3 (' + ldGetDict + ' bước). ' + ldSummary, note:ldNote,
 cols:[
 {title:'List<string>',sub:'Có chỉ số vị trí.',
  lines:['// list: SP01 ... SP08','var v = list[2];'],
  run:function(c){
   c.snap({ln:0,title:'Chuẩn bị',body:'Phần tử thứ 3 nằm ở chỉ số 2 (chỉ số bắt đầu từ 0).',viz:[ldList([]), ldSc('số bước',0)]});
   var st = []; st[2] = 'hi';
   c.snap({ln:1,title:'list[2]',body:'List nhảy thẳng tới ô số 2 bằng chỉ số.',viz:[ldList(st,{ptr:2,ptrLabel:'[2]'}), ldSc('số bước',ldGetList,'ok')],vars:[['v',S(ldCodes[2]),1]]});
   st[2] = 'ok';
   c.snap({ln:1,title:'Xong',body:'v = "' + ldCodes[2] + '" sau ' + ldGetList + ' bước.',viz:[ldList(st), ldSc('số bước',ldGetList,'ok'), ldFlag('List có chỉ số vị trí.')],vars:[['v',S(ldCodes[2])]]});
  }},
 {title:'Dictionary<string, int>',sub:'Không có chỉ số vị trí.',
  lines:['// dict: "SP01" ... "SP08"','int i = 0;','foreach (var kv in dict)','{','  if (++i == 3) break;','}'],
  run:function(c){
   c.snap({ln:0,title:'Chuẩn bị',body:'Dictionary tra theo khóa, không theo vị trí. Không có dict[2] để lấy phần tử thứ 3.',viz:[ldDict([]), ldSc('số bước',0)]});
   for (var i = 0; i < 3; i++) {
     var st = []; for (var j = 0; j < i; j++) st[j] = 'no'; st[i] = i === 2 ? 'ok' : 'hi';
     c.snap({ln:4,title:'Đếm tới ' + (i + 1),body:'Duyệt tới ngăn ' + ldCodes[i] + ', i = ' + (i + 1) + (i === 2 ? ', đã đến phần tử thứ 3.' : ', chưa đủ 3.'),viz:[ldDict(st), ldSc('số bước',i + 1,i === 2 ? 'bad' : 'hi')],vars:[['i',i + 1,1]]});
   }
   var s3 = ['no','no','ok'];
   c.snap({ln:5,title:'Xong',body:'Phải duyệt ' + ldGetDict + ' ngăn, và thứ tự duyệt không được bảo đảm.',viz:[ldDict(s3), ldSc('số bước',ldGetDict,'bad')]});
  }}]},
trung:{ intro:'Lưu hai lần tên "An" vào mỗi bên. Bấm "Bước tiếp".',
 running:'Quan sát: bên nào chấp nhận giá trị trùng.',
 done:'List lưu đủ ' + ldDup.listCount + ' phần tử, Dictionary báo lỗi vì khóa "An" đã có. ' + ldSummary, note:ldNote,
 cols:[
 {title:'List<string>',sub:'Cho phép trùng.',
  lines:['var list = new List<string>();','list.Add("An");','list.Add("An");'],
  run:function(c){
   var items = [];
   c.snap({ln:0,title:'Danh sách rỗng',body:'List mới chưa có phần tử nào.',viz:[vCells([],{name:'List',cap:4,small:true}), ldSc('phần tử đã lưu',0)],vars:[['list.Count',0]]});
   items.push({v:'An',s:'new'});
   c.snap({ln:1,title:'Add("An") lần 1',body:'Thêm "An" vào ô 0.',viz:[vCells(items,{name:'List',cap:4,small:true}), ldSc('phần tử đã lưu',items.length)],vars:[['list.Count',items.length,1]]});
   items = [{v:'An'},{v:'An',s:'new'}];
   c.snap({ln:2,title:'Add("An") lần 2',body:'List không quan tâm trùng, thêm "An" thứ hai vào ô 1.',viz:[vCells(items,{name:'List',cap:4,small:true}), ldSc('phần tử đã lưu',items.length,'ok')],vars:[['list.Count',items.length,1]]});
   c.snap({ln:2,title:'Xong',body:'List có ' + ldDup.listCount + ' phần tử, trùng nhau cũng được.',viz:[vCells([{v:'An',s:'ok'},{v:'An',s:'ok'}],{name:'List',cap:4,small:true}), ldSc('phần tử đã lưu',ldDup.listCount,'ok'), ldFlag('List giữ được giá trị trùng.')],vars:[['list.Count',ldDup.listCount]]});
  }},
 {title:'Dictionary<string, int>',sub:'Khóa phải duy nhất.',
  lines:['var dict =','  new Dictionary<string, int>();','dict.Add("An", 1);','dict.Add("An", 2);'],
  run:function(c){
   c.snap({ln:0,title:'Tủ rỗng',body:'Dictionary mới chưa có ngăn nào.',viz:[vDrawers([],{name:'Dictionary'}), ldSc('ngăn đã lưu',0)],vars:[['dict.Count',0]]});
   c.snap({ln:2,title:'Add("An", 1)',body:'Chưa có khóa "An", thêm ngăn mới.',viz:[vDrawers([{k:'An',v:1,s:'new'}],{name:'Dictionary'}), ldSc('ngăn đã lưu',1)],vars:[['dict.Count',1,1]]});
   c.err('Unhandled exception. System.ArgumentException:');
   c.err(ldDup.err);
   c.snap({ln:3,title:'Add("An", 2) bị lỗi',body:'Khóa "An" đã có nên Add ném ArgumentException. Khóa trong Dictionary phải duy nhất.',viz:[vDrawers([{k:'An',v:1,s:'bad'}],{name:'Dictionary'}), vCard({kind:'err',title:'ArgumentException',sub:ldDup.err})],vars:[['dict.Count',ldDup.dictCount]]});
   c.snap({ln:3,title:'Xong',body:'Dictionary chỉ giữ được ' + ldDup.dictCount + ' ngăn "An".',viz:[vDrawers([{k:'An',v:1}],{name:'Dictionary'}), ldSc('ngăn đã lưu',ldDup.dictCount,'bad')],vars:[['dict.Count',ldDup.dictCount]]});
  }}]}
};
