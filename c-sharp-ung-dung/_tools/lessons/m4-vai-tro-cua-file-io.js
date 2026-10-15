// META {"module":4,"lesson":"Giới thiệu chung về Thao tác File và Stream","activity":"Vai trò của File I/O trong ứng dụng","title":"Vì sao cần lưu dữ liệu vào tệp?","lead":"Hai chương trình cùng ghi nhớ 3 ghi chú, rồi bị tắt và chạy lại. Bấm <b>Bước tiếp</b> để hai cột cùng chạy.","tabs":[["x","Tắt rồi chạy lại"]],"codeTitle":"Mã nguồn C#"}
var fNotes = ['Mua sữa','Học C#','Gọi mẹ'];
/* ram: mảng ô; ramS: trạng thái ô; disk: true nếu có tệp; prog: 'run'|'off'|'again' */
var fViz = function(ram, ramS, disk, prog, diskS){
  var lamp = {run:{t:'Chương trình',sub:'Đang chạy',s:'ok'},off:{t:'Chương trình',sub:'Đã tắt',s:'off'},again:{t:'Chương trình',sub:'Chạy lại',s:'ok'}}[prog];
  var ramH = vCells(ram.map(function(t){ return {v:t,s:ramS}; }),{cap:3,idx:false,small:true,badges:[['Count',ram.length]]});
  var diskH = disk ? vText(fNotes,{title:'notes.txt',noNo:false}) : '<div class="cm">Chưa có tệp notes.txt</div>';
  if (disk && diskS) diskH = vText(fNotes.map(function(t){ return {t:t,s:diskS}; }),{title:'notes.txt'});
  return [vLamps([lamp]),vPair(ramH,diskH,{ta:'RAM',tb:'Ổ đĩa'})];
};
var EX = {x:{
 intro:'Bên trái chỉ lưu ghi chú trong biến. Bên phải lưu thêm vào tệp notes.txt. Hãy để ý điều gì còn lại sau khi tắt chương trình.',
 running:'RAM chỉ nhớ khi chương trình đang chạy. Ổ đĩa giữ dữ liệu lâu dài.',
 done:'Sau khi chạy lại, bên trái mất hết ghi chú (Count 0), bên phải đọc lại được 3 ghi chú từ tệp.',
 note:'Tệp giúp dữ liệu tồn tại lâu dài qua các lần chạy chương trình.',
 cols:[
 {title:'Chỉ lưu trong biến',sub:'Dữ liệu nằm trong RAM.',
  lines:['var notes = new List<string>();','notes.Add("Mua sữa");','notes.Add("Học C#");','notes.Add("Gọi mẹ");','// (tắt chương trình)','// --- chạy lại chương trình ---','var notes = new List<string>();','Console.WriteLine(notes.Count);'],
  run:function(c){
   c.snap({ln:3,title:'Thêm 3 ghi chú',body:'List notes trong RAM có 3 phần tử.',viz:fViz(fNotes,'new',false,'run')});
   c.snap({ln:3,title:'Không có lệnh ghi tệp',body:'Cột này không ghi gì ra ổ đĩa, ghi chú chỉ nằm trong RAM.',viz:fViz(fNotes,undefined,false,'run')});
   c.snap({ln:4,title:'Tắt chương trình',body:'Chương trình dừng, RAM bị xóa trắng. Ba ghi chú mất theo.',viz:fViz(fNotes,'del',false,'off')});
   c.snap({ln:5,title:'Chạy lại',body:'Chương trình bắt đầu lại từ đầu, RAM đang trống.',viz:fViz([],undefined,false,'again')});
   c.snap({ln:6,title:'Tạo danh sách mới',body:'new List<string>() tạo danh sách rỗng, không còn gì từ lần chạy trước.',vars:[['notes','List rỗng']],viz:fViz([],undefined,false,'again')});
   c.out('0');
   c.snap({ln:7,title:'In notes.Count',body:'Count là 0. Ba ghi chú đã mất.',vars:[['notes.Count',0,1]],viz:fViz([],undefined,false,'again')});
   c.snap({ln:7,title:'Xong',body:'Dữ liệu chỉ trong biến thì không sống qua lần chạy sau.',vars:[['notes.Count',0]],viz:fViz([],undefined,false,'again')});
  }},
 {title:'Lưu thêm vào tệp',sub:'Dữ liệu nằm cả trong RAM và trên ổ đĩa.',
  lines:['var notes = new List<string>();','notes.Add("Mua sữa");','notes.Add("Học C#");','notes.Add("Gọi mẹ");','File.WriteAllLines(','  "notes.txt", notes);','// (tắt chương trình)','// --- chạy lại chương trình ---','var notes = File.ReadAllLines(','  "notes.txt").ToList();','Console.WriteLine(notes.Count);'],
  run:function(c){
   c.snap({ln:3,title:'Thêm 3 ghi chú',body:'List notes trong RAM có 3 phần tử.',viz:fViz(fNotes,'new',false,'run')});
   c.snap({ln:4,title:'File.WriteAllLines',body:'Mỗi ghi chú được ghi thành một dòng. Ổ đĩa xuất hiện tệp notes.txt có 3 dòng.',viz:fViz(fNotes,undefined,true,'run','new')});
   c.snap({ln:6,title:'Tắt chương trình',body:'RAM bị xóa trắng, nhưng tệp trên ổ đĩa vẫn còn nguyên.',viz:fViz(fNotes,'del',true,'off')});
   c.snap({ln:7,title:'Chạy lại',body:'RAM đang trống, còn notes.txt vẫn nằm trên ổ đĩa.',viz:fViz([],undefined,true,'again')});
   c.snap({ln:8,title:'File.ReadAllLines',body:'Đọc 3 dòng từ tệp và nạp lại vào danh sách. 3 ghi chú trở lại RAM.',vars:[['notes','List 3 phần tử']],viz:fViz(fNotes,'new',true,'again','ok')});
   c.out('3');
   c.snap({ln:10,title:'In notes.Count',body:'Count là 3. Dữ liệu đã sống sót qua lần tắt máy.',vars:[['notes.Count',3,1]],viz:fViz(fNotes,undefined,true,'again')});
   c.snap({ln:10,title:'Xong',body:'Nhờ tệp, dữ liệu tồn tại lâu dài.',vars:[['notes.Count',3]],viz:fViz(fNotes,undefined,true,'again')});
  }}
 ]}};
