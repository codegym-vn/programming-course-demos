// META {"module":3,"lesson":"Kiểm tra và Xác thực Dữ liệu Đầu vào","activity":"Các kỹ thuật xác thực dữ liệu: Kiểm tra null, rỗng, định dạng, phạm vi","title":"Bốn lớp kiểm tra dữ liệu","lead":"Một giá trị đi qua 4 đèn kiểm tra và dừng ở đèn đầu tiên không đạt. Chọn giá trị rồi bấm <b>Bước tiếp</b>.","tabs":[["nul","null"],["trang","\"   \""],["abc","\"abc\""],["n150","\"150\""],["n25","\"25\""]],"codeTitle":"Mã nguồn C#"}
var xvLamp = ['Có giá trị?','Không chỉ trắng?','Là số?','Trong 1-120?'];
var xvMsg = ['Vui lòng nhập tuổi','Không được để trống','Tuổi phải là số','Tuổi phải từ 1 đến 120'];
var xvLines = function(first){ return [first,'','if (input == null)','  return "Vui lòng nhập tuổi";','if (input.Trim() == "")','  return "Không được để trống";','if (!int.TryParse(input,','      out int age))','  return "Tuổi phải là số";','if (age < 1 || age > 120)','  return "Tuổi phải từ 1 đến 120";','return "Hợp lệ";']; };
/* lớp k (0..3) có đạt không, tính bằng code thật */
var xvCheck = function(v, k){
  if (k === 0) return v !== null;
  if (k === 1) return v.trim() !== '';
  var ok = /^[+-]?\d+$/.test(v.trim()) && Math.abs(parseInt(v, 10)) < 2147483648;
  if (k === 2) return ok;
  var n = parseInt(v, 10); return n >= 1 && n <= 120;
};
var xvLampsOf = function(states){ return vLamps(xvLamp.map(function(t, i){ return {t:t,s:states[i] || 'off'}; })); };
var xvTab = function(first, v, label){
  return {inputs:[],chips:[],
  intro:'Giá trị đầu vào là ' + label + '. Mỗi đèn là một lớp kiểm tra. Bấm "Bước tiếp".',
  lines:function(){ return xvLines(first); },
  run:function(c){
   var st = [], age = null, lnOf = [2,4,6,9];
   var vin = function(){ return [['input', v === null ? 'null' : S(v)]].concat(age === null ? [] : [['age',age,1]]); };
   c.snap({ln:0,title:'Nhận giá trị đầu vào',body:'Biến input đang là ' + label + '. Cả 4 đèn đang tắt.',vars:vin(),viz:[xvLampsOf(st)]});
   var failed = -1;
   for (var k = 0; k < 4 && failed < 0; k++) {
    var ok = xvCheck(v, k);
    if (k === 2) age = ok ? parseInt(v, 10) : 0;
    if (k === 3) age = parseInt(v, 10);
    st[k] = ok ? 'ok' : 'bad';
    var bodies = [
     ['input == null ' + (ok ? 'sai' : 'đúng') + '.', ok ? 'Có giá trị, đèn 1 xanh.' : 'input là null nên đèn 1 đỏ.'],
     ['input.Trim() == "" ' + (ok ? 'sai' : 'đúng') + '.', ok ? 'Có chữ thật sự, đèn 2 xanh.' : 'Cắt khoảng trắng còn chuỗi rỗng nên đèn 2 đỏ.'],
     ['TryParse trả về ' + ok + '.', ok ? 'Đọc được thành số ' + age + ', đèn 3 xanh.' : '"' + v + '" không phải số, age nhận 0, đèn 3 đỏ.'],
     ['age = ' + age + ', điều kiện age < 1 || age > 120 ' + (ok ? 'sai' : 'đúng') + '.', ok ? 'Nằm trong khoảng, đèn 4 xanh.' : 'Ngoài khoảng 1-120 nên đèn 4 đỏ.']];
    c.snap({ln:lnOf[k],title:'Đèn ' + (k + 1) + ': ' + xvLamp[k],body:bodies[k][0] + ' ' + bodies[k][1],vars:vin(),viz:[xvLampsOf(st)]});
    if (!ok) failed = k;
   }
   if (failed >= 0) {
    c.out(xvMsg[failed]);
    c.snap({ln:[3,5,8,10][failed],title:'Trả về thông báo',body:'Dừng ở đèn đầu tiên không đạt. Các đèn phía sau không cần xét nữa.',vars:vin(),viz:[xvLampsOf(st),vCard({kind:'err',title:'Không hợp lệ',sub:xvMsg[failed]})]});
    c.snap({ln:[3,5,8,10][failed],title:'Xong',body:'Mỗi trường hợp có một thông báo rõ ràng cho người dùng.',note:'Kiểm tra từ chung đến cụ thể, dùng TryParse thay cho Parse và try-catch với dữ liệu người dùng.',vars:vin(),viz:[xvLampsOf(st),vCard({kind:'err',title:'Không hợp lệ',sub:xvMsg[failed]})]});
   } else {
    c.out('Hợp lệ');
    c.snap({ln:11,title:'Trả về "Hợp lệ"',body:'Cả 4 đèn xanh nên giá trị được chấp nhận.',vars:vin(),viz:[xvLampsOf(st),vCard({kind:'ok',title:'Hợp lệ',sub:'Tuổi ' + age + ' được chấp nhận'})]});
    c.snap({ln:11,title:'Xong',body:'Giá trị đi qua đủ 4 lớp kiểm tra.',note:'Kiểm tra từ chung đến cụ thể, dùng TryParse thay cho Parse và try-catch với dữ liệu người dùng.',vars:vin(),viz:[xvLampsOf(st),vCard({kind:'ok',title:'Hợp lệ',sub:'Tuổi ' + age + ' được chấp nhận'})]});
   }
  }};
};
var EX = {
 nul:xvTab('string? input = null;',null,'null'),
 trang:xvTab('string? input = "   ";','   ','"   " (chỉ có khoảng trắng)'),
 abc:xvTab('string? input = "abc";','abc','"abc"'),
 n150:xvTab('string? input = "150";','150','"150"'),
 n25:xvTab('string? input = "25";','25','"25"')
};
