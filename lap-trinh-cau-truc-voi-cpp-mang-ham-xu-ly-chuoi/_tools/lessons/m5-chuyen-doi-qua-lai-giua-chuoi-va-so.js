// META {"module":5,"lesson":"Bài 5.4. Chuyển đổi chuỗi – số; char[] và std::string","activity":"Chuyển Đổi Qua Lại Giữa Chuỗi Và Số","title":"to_string, stoi và stod: đổi qua lại giữa số và chuỗi","lead":"Xem số biến thành dải ký tự, dải ký tự đọc lại thành số, và lỗi khi chuỗi không bắt đầu bằng số. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["doi","to_string và stoi/stod"],["loi","Lỗi \"xin chao\" và tính giá sau thuế"]],"codeTitle":"Mã nguồn C++","path":"xu-ly-chuoi/chuyen-doi-chuoi-so-char-va-std-string/chuyen-doi-qua-lai-giua-chuoi-va-so/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Số và dải ký tự';

function cvAll(s, st){ var o = {}; for (var i = 0; i < s.length; i++) o[i] = st; return o; }
function cvMix(s, ok, bad){ var o = {}; for (var i = 0; i < s.length; i++) o[i] = i < ok ? 'ok' : (i === bad ? 'bad' : 'dim'); return o; }

var EX = {
doi:{inputs:[],
 intro:'to_string biến số thành chuỗi. stoi và stod đọc chuỗi thành số. Bấm "Bước tiếp".',
 lines:function(){ return ['int tuoi = 20;', 'double diem = 8.5;', 'string a = to_string(tuoi);', 'string b = to_string(diem);', 'int n = stoi("123") + 10;', 'int m = stoi("45abc");', 'double d = stod("8.75") + 1;', 'int e = stoi("8.75");']; },
 run:function(c){
  var tuoi = 20, diem = 8.5;
  var sa = String(tuoi), sb = diem.toFixed(6);
  c.snap({ln:1, title:'Hai biến số', body:'tuoi là số nguyên 20, diem là số thực 8.5.',
   viz:vBoxes([{name:'tuoi', type:'int', v:tuoi, s:'new'}, {name:'diem', type:'double', v:diem, s:'new'}])});
  c.snap({ln:2, title:'to_string(tuoi)', body:'Số 20 thành chuỗi "' + sa + '" gồm ' + sa.length + ' ký tự.',
   viz:vChars(sa, {name:'a', len:true, cells:cvAll(sa, 'new')})});
  var ex = {}; for (var i = 0; i < sb.length; i++) ex[i] = i < 3 ? 'new' : 'hi';
  c.snap({ln:3, title:'to_string(diem)', body:'Số thực luôn ra đủ 6 chữ số sau dấu chấm: "' + sb + '". Các số 0 thừa được tô vàng.',
   viz:vChars(sb, {name:'b', len:true, cells:ex})});
  c.snap({ln:4, title:'stoi("123") + 10', body:'stoi đọc từ trái, cả ba ký tự đều là chữ số nên ra số 123. Đã là số thật nên cộng được: 123 + 10 = ' + (123 + 10) + '.',
   viz:[vChars('123', {name:'"123"', cells:cvAll('123', 'ok')}), vBoxes([{name:'n', type:'int', v:133, s:'new'}])]});
  c.snap({ln:5, title:'stoi("45abc")', body:'Đọc \'4\', \'5\' rồi gặp \'a\' không phải số nên dừng. Kết quả là 45, "abc" bị bỏ qua và không báo lỗi.',
   viz:[vChars('45abc', {name:'"45abc"', cells:cvMix('45abc', 2, 2)}), vBoxes([{name:'m', type:'int', v:45, s:'new'}])]});
  c.snap({ln:6, title:'stod("8.75") + 1', body:'stod đọc được số thực 8.75, cộng 1 ra ' + (8.75 + 1) + '.',
   viz:[vChars('8.75', {name:'"8.75"', cells:cvAll('8.75', 'ok')}), vBoxes([{name:'d', type:'double', v:9.75, s:'new'}])]});
  c.snap({ln:7, title:'stoi("8.75")', body:'stoi chỉ đọc số nguyên nên dừng ở dấu chấm, chỉ lấy được 8. Phần thập phân bị mất.',
   viz:[vChars('8.75', {name:'"8.75"', cells:cvMix('8.75', 1, 1)}), vBoxes([{name:'e', type:'int', v:8, s:'bad', note:'mất phần thập phân'}])]});
  c.snap({ln:7, title:'Xong', body:'to_string đổi số thành chuỗi, stoi/stod đọc phần số ở đầu chuỗi.',
   note:'stoi lấy số nguyên, stod lấy số thực; cả hai dừng ở ký tự đầu tiên không hợp lệ.',
   viz:vScore([{k:'to_string', v:'số → chuỗi'}, {k:'stoi / stod', v:'chuỗi → số', s:'ok'}])});
 }},
loi:{inputs:[],
 intro:'Chuỗi không bắt đầu bằng số làm stoi báo lỗi. Sau đó là ví dụ tính giá sau thuế. Bấm "Bước tiếp".',
 lines:function(){ return ['// Chương trình 1', 'string s = "xin chao";', 'int kq = stoi(s);', 'cout << kq << endl;', '', '// Chương trình 2', 'string gia = "150000";', 'double g = stod(gia);', 'double sau = g * 1.1;', 'string tb = to_string(sau);', 'cout << "Gia sau thue: " << tb;']; },
 run:function(c){
  c.snap({ln:1, title:'string s = "xin chao";', body:'Chuỗi này không bắt đầu bằng chữ số nào.',
   viz:vChars('xin chao', {name:'s', len:true, cells:cvAll('xin chao', 'new')})});
  c.err("terminate called after throwing an instance of 'std::invalid_argument'");
  c.err('  what():  stoi');
  c.err('Aborted');
  c.snap({ln:2, title:'stoi(s)', body:'Ký tự đầu \'x\' đã không phải số nên stoi không đọc được gì và báo lỗi. Chương trình dừng ngay.',
   viz:[vChars('xin chao', {name:'s', cells:cvMix('xin chao', 0, 0)}),
        vErr({kind:'runtime', msg:["terminate called after throwing an instance of 'std::invalid_argument'", '  what():  stoi'], note:'chương trình dừng'})]});
  c.snap({ln:3, title:'cout << kq;', body:'Dòng này không bao giờ chạy, vì chương trình đã dừng ở dòng trước.',
   viz:vErr({kind:'runtime', msg:['Aborted'], fix:'Chỉ gọi stoi khi chắc chuỗi bắt đầu bằng số.'})});
  c.clear();
  var gia = '150000', g = parseFloat(gia), sau = g * 1.1, tb = sau.toFixed(6);
  c.snap({ln:6, title:'string gia = "150000";', body:'Người dùng nhập giá, nhưng nó đang là chuỗi nên chưa nhân được.',
   viz:vChars(gia, {name:'gia', len:true, cells:cvAll(gia, 'new')})});
  c.snap({ln:7, title:'stod(gia)', body:'stod đổi chuỗi thành số thực ' + g + '.',
   viz:[vChars(gia, {name:'gia', cells:cvAll(gia, 'ok')}), vBoxes([{name:'g', type:'double', v:g, s:'new'}])]});
  c.snap({ln:8, title:'g * 1.1', body:'Cộng thuế 10%: ' + g + ' × 1.1 ra khoảng ' + Math.round(sau) + '.',
   viz:vBoxes([{name:'g', type:'double', v:g}, {name:'sau', type:'double', v:Math.round(sau), s:'new'}])});
  c.snap({ln:9, title:'to_string(sau)', body:'Số thành chuỗi "' + tb + '", đủ 6 chữ số thập phân.',
   viz:vChars(tb, {name:'tb', len:true, cells:cvAll(tb, 'new')})});
  c.out('Gia sau thue: ' + tb);
  c.snap({ln:10, title:'In câu thông báo', body:'Chuỗi vừa tạo được ghép vào câu để in ra.',
   note:'Chuỗi thành số để tính toán, số thành chuỗi để ghép vào câu.',
   viz:vChars(tb, {name:'tb', cells:cvAll(tb, 'ok')})});
 }}
};
