// META {"module":3,"lesson":"Bài 3.6. Câu lệnh switch case","activity":"Câu Lệnh điều kiện Switch Case","title":"switch nhảy thẳng tới case khớp","lead":"Xem switch nhảy thẳng tới case khớp, break chặn dòng chảy, và chuyện gì xảy ra khi thiếu break. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["menu","Menu món ăn"],["quen","Quên break"],["gop","Gộp case nguyên âm"]],"codeTitle":"Mã nguồn C++","path":"cau-truc-dieu-kien/cau-lenh-switch-case/cau-lenh-dieu-kien-switch-case/index.html"}
var CONSOLE_TITLE = 'Màn hình (Console)';

/* defs: [{label, body, brk}], st: mảng trạng thái theo chỉ số (undefined = mặc định) */
function b14Sw(head, defs, st){
  return vSwitch({head:head, cases:defs.map(function(d, i){ return {label:d.label, body:d.body, brk:d.brk, s:st[i]}; })});
}
function b14Arr(n, v){ var a = []; for (var i = 0; i < n; i++) a.push(v); return a; }

var EX = {
menu:{inputs:[{id:'ch', label:'choice', def:2, min:0, max:9}], chips:['1', '2', '3', '5'],
 intro:'Menu nhà hàng: choice là số món khách chọn. Chọn một số (hoặc gõ số khác) rồi bấm "Bước tiếp" để xem switch nhảy tới đâu.',
 lines:function(P){ return ['int choice = ' + P.ch + ';', 'switch (choice) {', '  case 1:', '    cout << "Ban da chon: PIZZA";', '    break;', '  case 2:', '    cout << "Ban da chon: BURGER";', '    break;',
   '  case 3:', '    cout << "Ban da chon: SALAD";', '    break;', '  default:', '    cout << "Xin loi, nha hang "', '         << "khong co mon nay!";', '    break;', '}']; },
 run:function(c, P){
  var ch = P.ch, idx = (ch >= 1 && ch <= 3) ? ch - 1 : 3, head = 'switch (choice) · choice = ' + ch;
  var defs = [{label:'case 1:', body:'in "PIZZA"', brk:true}, {label:'case 2:', body:'in "BURGER"', brk:true}, {label:'case 3:', body:'in "SALAD"', brk:true}, {label:'default:', body:'in "Xin loi..."', brk:true}];
  var caseLn = [2, 5, 8, 11], outLn = [3, 6, 9, 12], brkLn = [4, 7, 10, 14];
  var texts = ['Ban da chon: PIZZA', 'Ban da chon: BURGER', 'Ban da chon: SALAD', 'Xin loi, nha hang khong co mon nay!'];
  var above = function(s){ var a = b14Arr(4); for (var i = 0; i < idx; i++) a[i] = 'dim'; a[idx] = s; return a; };
  c.snap({ln:0, title:'Khai báo choice = ' + ch, body:'Khách chọn món số ' + ch + '. switch sẽ so sánh số này với từng case.', viz:b14Sw(head, defs, [])});
  c.snap({ln:caseLn[idx], title:idx === 3 ? 'Không case nào khớp: nhảy tới default' : 'Nhảy thẳng tới case ' + ch,
   body:idx === 3 ? ch + ' không bằng 1, 2 hay 3, nên switch nhảy tới default.' : 'switch không xét từng case từ trên xuống: nó nhảy thẳng tới case ' + ch + ', các case phía trên không chạy.',
   viz:b14Sw(head, defs, above('hi'))});
  c.out(texts[idx]);
  c.snap({ln:outLn[idx], title:'In "' + texts[idx] + '"', body:'Các lệnh của ' + defs[idx].label.replace(':', '') + ' chạy.', viz:b14Sw(head, defs, above('ok'))});
  c.snap({ln:brkLn[idx], title:idx === 3 ? 'Hết khối switch' : 'Gặp break: thoát khỏi switch', body:idx === 3 ? 'default là nhánh cuối, chạy xong là kết thúc switch.' : 'break là đập chắn: dòng chảy rẽ ra ngoài, các case phía dưới không chạy.',
   viz:b14Sw(head, defs, above('ok'))});
  c.snap({ln:15, title:'Xong', body:'Chương trình chạy tiếp sau dấu } của switch.', note:'switch so khớp bằng với từng giá trị và nhảy thẳng tới đó; break kết thúc switch; default chạy khi không case nào khớp.',
   viz:b14Sw(head, defs, above('ok'))});
 }},

quen:{inputs:[],
 intro:'Chương trình có hang = 1 nhưng case 1 quên break. Hãy theo dõi dòng chảy. Bấm "Bước tiếp".',
 lines:function(){ return ['int hang = 1;', 'switch (hang) {', '  case 1:', '    cout << "Vang ";', '    // Quen break o day!', '  case 2:', '    cout << "Bac ";', '    break;', '}']; },
 run:function(c){
  var head = 'switch (hang) · hang = 1';
  var defs = [{label:'case 1:', body:'in "Vang "', brk:false}, {label:'case 2:', body:'in "Bac "', brk:true}];
  var fixed = [{label:'case 1:', body:'in "Vang "', brk:true}, {label:'case 2:', body:'in "Bac "', brk:true}];
  c.snap({ln:0, title:'Khai báo hang = 1', body:'Chỉ case 1 khớp với hang. Nhưng case 1 không có break.', viz:b14Sw(head, defs, [])});
  c.snap({ln:2, title:'Nhảy tới case 1', body:'hang = 1 nên switch nhảy thẳng tới case 1.', viz:b14Sw(head, defs, ['hi'])});
  c.write('Vang ');
  c.snap({ln:3, title:'In "Vang "', body:'Case 1 chạy lệnh cout của nó.', viz:b14Sw(head, defs, ['ok'])});
  c.snap({ln:5, title:'Không có break: tràn xuống case 2', body:'Không có đập chắn nên máy chạy tiếp vào case 2, dù hang không bằng 2 và không kiểm tra lại gì.',
   viz:[b14Sw(head, defs, ['fall', 'hi']), vCard({kind:'warn', title:'Fall-through (trôi lệnh)', sub:'Thiếu break thì chạy tràn xuống case ngay bên dưới.'})]});
  c.write('Bac ');
  c.snap({ln:6, title:'In "Bac "', body:'Lệnh của case 2 cũng chạy.', viz:b14Sw(head, defs, ['fall', 'ok'])});
  c.out('');
  c.snap({ln:7, title:'Gặp break ở case 2: thoát', body:'Màn hình hiện "Vang Bac" trong khi ý định chỉ là "Vang".', viz:b14Sw(head, defs, ['fall', 'ok'])});
  c.snap({ln:-1, title:'Thêm break sau case 1', body:'Thêm break; vào cuối case 1 rồi chạy lại: switch nhảy tới case 1, in "Vang", gặp break và thoát. Case 2 không chạy.',
   note:'Thiếu break thì chạy tràn xuống case dưới. Đôi khi cố ý (gộp case), nhưng thường là lỗi.',
   viz:[b14Sw(head, fixed, ['ok', 'dim']), vCard({kind:'ok', title:'Bản có break chỉ in "Vang"', sub:'Dòng chảy dừng ngay ở break của case 1.'})]});
 }},

gop:{inputs:[{id:'k', label:'ch', text:'^[a-z]$', msg:'Nhập một chữ cái thường từ a đến z', def:'e', w:60}], chips:['e', 'b', 'u'],
 intro:'Kiểm tra một chữ cái có phải nguyên âm không bằng cách xếp chồng các case. Chọn chữ rồi bấm "Bước tiếp".',
 lines:function(P){ return ["char ch = '" + P.k + "';", 'switch (ch) {', "  case 'a':", "  case 'e':", "  case 'i':", "  case 'o':", "  case 'u':", '    cout << "La nguyen am";', '    break;', '  default:', '    cout << "La phu am";', '    break;', '}']; },
 run:function(c, P){
  var ch = P.k, v = 'aeiou', vi = v.indexOf(ch), head = "switch (ch) · ch = '" + ch + "'";
  var defs = v.split('').map(function(x, i){ return {label:"case '" + x + "':", body:i === 4 ? 'in "La nguyen am"' : '(rỗng)', brk:i === 4}; }).concat([{label:'default:', body:'in "La phu am"', brk:true}]);
  var caseLn = [2, 3, 4, 5, 6, 9];
  c.snap({ln:0, title:"Khai báo ch = '" + ch + "'", body:'Biến ch (kiểu char) chứa chữ \'' + ch + "'.", viz:b14Sw(head, defs, [])});
  if (vi >= 0) {
   var st = b14Arr(6), i;
   for (i = 0; i < vi; i++) st[i] = 'dim'; st[vi] = 'hi';
   c.snap({ln:caseLn[vi], title:"Nhảy thẳng tới case '" + ch + "'", body:"switch nhảy thẳng tới case '" + ch + "', các case phía trên không chạy.", viz:b14Sw(head, defs, st)});
   if (vi < 4) {
    for (i = vi; i < 4; i++) st[i] = 'fall'; st[4] = 'hi';
    c.snap({ln:7, title:'Các case rỗng: trôi xuống', body:'Các case ở giữa không có lệnh và không có break, nên dòng chảy trôi xuống tới dòng cout chung.', viz:[b14Sw(head, defs, st), vCard({kind:'info', title:'Fall-through có chủ đích', sub:'5 nguyên âm dùng chung một cout.'})]});
   }
   for (i = vi; i < 4; i++) st[i] = 'fall'; st[4] = 'ok';
   c.out('La nguyen am');
   c.snap({ln:7, title:'In "La nguyen am"', body:'Lệnh cout dùng chung chạy.', viz:b14Sw(head, defs, st)});
   c.snap({ln:8, title:'Gặp break: thoát', body:'break kết thúc switch.', note:'Gộp case bằng cách bỏ break giữa các case là dùng fall-through có chủ đích.', viz:b14Sw(head, defs, st)});
  } else {
   var d = b14Arr(5, 'dim');
   c.snap({ln:9, title:'Không case nào khớp: nhảy tới default', body:"'" + ch + "' không phải a, e, i, o, u nên switch nhảy tới default.", viz:b14Sw(head, defs, d.concat(['hi']))});
   c.out('La phu am');
   c.snap({ln:10, title:'In "La phu am"', body:'Nhánh default chạy.', viz:b14Sw(head, defs, d.concat(['ok']))});
   c.snap({ln:11, title:'Xong', body:'Kết thúc switch.', note:'default chạy khi không case nào khớp.', viz:b14Sw(head, defs, d.concat(['ok']))});
  }
 }}
};
