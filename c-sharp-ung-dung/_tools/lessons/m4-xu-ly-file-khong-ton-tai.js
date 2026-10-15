// META {"module":4,"lesson":"Xử lý Lỗi và Tài nguyên trong File I/O","activity":"Xử lý lỗi khi file không tồn tại","title":"Xử lý lỗi khi file không tồn tại","lead":"Hai cách cùng đọc data.txt. Chọn tình huống rồi bấm <b>Bước tiếp</b> để hai cột cùng chạy.","tabs":[["co","Tệp có tồn tại"],["khong","Tệp không tồn tại"]],"codeTitle":"Mã nguồn C#"}
function pTree(has, s){
  var rows = [{t:'Thư mục chạy',d:0,kind:'dir'}];
  if (has) rows.push({t:'data.txt',d:1,kind:'file',s:s || '',sub:'Xin chào'});
  else rows.push({t:'data.txt',d:1,kind:'file',s:s || 'dim',sub:'không có'});
  return vTree(rows);
}
var P_A = ['if (File.Exists("data.txt"))','{','  var s = File.ReadAllText(','    "data.txt");','  Console.WriteLine(s);','}','else','{','  Console.WriteLine(','    "Không tìm thấy tệp");','}'];
var P_B = ['try','{','  var s = File.ReadAllText(','    "data.txt");','  Console.WriteLine(s);','}','catch (FileNotFoundException)','{','  Console.WriteLine(','    "Không tìm thấy tệp");','}'];
var EX = {
co:{
 intro:'Tệp data.txt có thật. Cả hai cách đều đọc được nội dung.',
 running:'Trái kiểm tra File.Exists trước, phải cứ đọc luôn trong try.',
 done:'Cả hai cột cùng in "Xin chào". Khi tệp có thật, hai cách cho kết quả giống nhau.',
 note:'Kiểm tra trước giúp code rõ ràng, nhưng vẫn nên có try-catch vì tệp có thể bị xóa ngay sau khi kiểm tra.',
 cols:[
 {title:'Kiểm tra trước',sub:'Hỏi File.Exists rồi mới đọc.',lines:P_A,
  run:function(c){
   c.snap({ln:0,title:'Bắt đầu',body:'Tệp data.txt có trong thư mục.',viz:[pTree(true,'hi'),vFlow([{t:'Exists?',s:'dim'},{t:'Đọc',s:'dim'},{t:'In',s:'dim'}])]});
   c.snap({ln:0,title:'Exists trả về true',body:'Điều kiện đúng nên đi vào nhánh đọc tệp.',viz:[pTree(true),vFlow([{t:'Exists?',s:'ok',sub:'true'},{t:'Đọc',s:'dim'},{t:'In',s:'dim'}])]});
   c.out('Xin chào');
   c.snap({ln:4,title:'Đọc và in',body:'ReadAllText đọc được "Xin chào" và chương trình in ra.',viz:[pTree(true),vFlow([{t:'Exists?',s:'ok'},{t:'Đọc',s:'ok'},{t:'In',s:'ok',item:'Xin chào'}])]});
   c.snap({ln:5,title:'Xong',body:'Không có lỗi nào xảy ra.',viz:[pTree(true),vFlow([{t:'Exists?',s:'ok'},{t:'Đọc',s:'ok'},{t:'In',s:'ok'}])]});
  }},
 {title:'Bắt exception',sub:'Cứ đọc, có lỗi thì catch.',lines:P_B,
  run:function(c){
   c.snap({ln:0,title:'Bắt đầu',body:'Tệp data.txt có trong thư mục.',viz:[pTree(true,'hi'),vFlow([{t:'Đọc',s:'dim'},{t:'In',s:'dim'},{t:'catch',s:'dim'}])]});
   c.snap({ln:2,title:'ReadAllText chạy',body:'Tệp có thật nên đọc được nội dung, không ném lỗi.',viz:[pTree(true),vFlow([{t:'Đọc',s:'ok'},{t:'In',s:'dim'},{t:'catch',s:'dim'}])]});
   c.out('Xin chào');
   c.snap({ln:4,title:'In kết quả',body:'Chương trình in "Xin chào".',viz:[pTree(true),vFlow([{t:'Đọc',s:'ok'},{t:'In',s:'ok',item:'Xin chào'},{t:'catch',s:'dim'}])]});
   c.snap({ln:5,title:'Xong',body:'Khối catch không được dùng tới.',viz:[pTree(true),vFlow([{t:'Đọc',s:'ok'},{t:'In',s:'ok'},{t:'catch',s:'dim',sub:'không chạy'}])]});
  }}
 ]},
khong:{
 intro:'Tệp data.txt không có. Xem hai cách phản ứng khác nhau thế nào.',
 running:'Trái tránh lỗi bằng File.Exists, phải để lỗi xảy ra rồi bắt.',
 done:'Hai cột cùng in "Không tìm thấy tệp". Khác nhau ở chỗ: trái không ném lỗi, phải ném FileNotFoundException rồi catch bắt lại.',
 note:'Kết hợp cả hai: kiểm tra trước cho trường hợp thường gặp, try-catch cho trường hợp bất ngờ.',
 cols:[
 {title:'Kiểm tra trước',sub:'Hỏi File.Exists rồi mới đọc.',lines:P_A,
  run:function(c){
   c.snap({ln:0,title:'Bắt đầu',body:'Thư mục chạy không có data.txt.',viz:[pTree(false,'hi'),vFlow([{t:'Exists?',s:'dim'},{t:'Đọc',s:'dim'},{t:'Báo',s:'dim'}])]});
   c.snap({ln:0,title:'Exists trả về false',body:'Điều kiện sai nên bỏ qua nhánh đọc, chuyển sang nhánh else.',viz:[pTree(false),vFlow([{t:'Exists?',s:'no',sub:'false'},{t:'Đọc',s:'dim',sub:'bỏ qua'},{t:'Báo',s:'dim'}])]});
   c.out('Không tìm thấy tệp');
   c.snap({ln:8,title:'Báo không tìm thấy',body:'Chương trình tự báo thông điệp, và không hề có exception nào.',viz:[pTree(false),vFlow([{t:'Exists?',s:'no'},{t:'Đọc',s:'dim'},{t:'Báo',s:'ok',item:'Không tìm thấy'}])]});
   c.snap({ln:8,title:'Xong',body:'Kết thúc êm, không ném lỗi.',viz:[pTree(false),vFlow([{t:'Exists?',s:'no'},{t:'Đọc',s:'dim'},{t:'Báo',s:'ok'}])]});
  }},
 {title:'Bắt exception',sub:'Cứ đọc, có lỗi thì catch.',lines:P_B,
  run:function(c){
   c.snap({ln:0,title:'Bắt đầu',body:'Thư mục chạy không có data.txt.',viz:[pTree(false,'hi'),vFlow([{t:'Đọc',s:'dim'},{t:'Lỗi',s:'dim'},{t:'catch',s:'dim'}])]});
   c.snap({ln:2,title:'ReadAllText ném lỗi',body:'Không có tệp nên ReadAllText ném FileNotFoundException.',viz:[pTree(false,'bad'),vFlow([{t:'Đọc',s:'bad'},{t:'Lỗi',s:'bad'},{t:'catch',s:'dim'}]),vCard({kind:'err',title:'FileNotFoundException'})]});
   c.out('Không tìm thấy tệp');
   c.snap({ln:6,title:'catch bắt lỗi',body:'catch khớp đúng loại lỗi và in cùng thông điệp.',viz:[pTree(false),vFlow([{t:'Đọc',s:'bad'},{t:'Lỗi',s:'ok'},{t:'catch',s:'ok',item:'Không tìm thấy'}])]});
   c.snap({ln:8,title:'Xong',body:'Chương trình không dừng, vì lỗi đã được bắt.',viz:[pTree(false),vFlow([{t:'Đọc',s:'bad'},{t:'Lỗi',s:'ok'},{t:'catch',s:'ok'}])]});
  }}
 ]}
};
