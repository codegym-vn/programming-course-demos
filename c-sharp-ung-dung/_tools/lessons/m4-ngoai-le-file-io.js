// META {"module":4,"lesson":"Xử lý Lỗi và Tài nguyên trong File I/O","activity":"Các loại ngoại lệ phổ biến trong File I/O","title":"Các exception thường gặp trong File I/O","lead":"Chọn một tình huống rồi bấm <b>Bước tiếp</b> để xem exception nào xuất hiện và nó nằm ở đâu trong họ exception.","tabs":[["fnf","FileNotFoundException"],["dnf","DirectoryNotFoundException"],["ua","UnauthorizedAccessException"],["io","IOException (tệp đang được dùng)"]],"codeTitle":"Mã nguồn C#"}
function eTree(rows, over, subs){
  over = over || {}; subs = subs || {};
  return vTree(rows.map(function(r){ return {t:r[0], d:r[1], kind:r[2], s:over[r[0]] || r[3], sub:subs[r[0]] || r[4]}; }));
}
function eHier(sel){
  return vTree([
    {t:'Exception',d:0,kind:'cls',s:'dim'},
    {t:'SystemException',d:1,kind:'cls',s:'dim'},
    {t:'IOException',d:2,kind:'cls',s:sel === 'IOException' ? 'hi' : 'dim',sub:''},
    {t:'FileNotFoundException',d:3,kind:'cls',s:sel === 'FileNotFoundException' ? 'hi' : 'dim'},
    {t:'DirectoryNotFoundException',d:3,kind:'cls',s:sel === 'DirectoryNotFoundException' ? 'hi' : 'dim'},
    {t:'UnauthorizedAccessException',d:2,kind:'cls',s:sel === 'UnauthorizedAccessException' ? 'hi' : 'dim',sub:''}
  ]);
}
var E_ROOT = ['Thư mục chạy',0,'dir'];
var EX = {
fnf:{inputs:[],chips:[],
 intro:'Đọc một tệp không có trong thư mục. Bấm "Bước tiếp".',
 lines:function(){return ['try','{','  File.ReadAllText("data.txt");','}','catch (FileNotFoundException)','{','  Console.WriteLine(','    "Không có data.txt");','}'];},
 run:function(c){
  var base = [E_ROOT,['note.txt',1,'file']];
  c.snap({ln:2,title:'Tình huống',body:'Thư mục chỉ có note.txt. Chương trình lại đọc data.txt, một tệp không tồn tại.',viz:eTree(base.concat([['data.txt',1,'file','dim','cần đọc']]),{'data.txt':'hi'})});
  c.snap({ln:2,title:'ReadAllText ném lỗi',body:'Đường dẫn đúng thư mục nhưng không có tệp nào tên data.txt.',viz:[eTree(base.concat([['data.txt',1,'file','dim','không có']]),{'data.txt':'bad'},{'data.txt':'! không có'}),vCard({kind:'err',title:'FileNotFoundException',sub:"Could not find file 'C:\\Bai\\data.txt'.",tip:'Cách xử lý: kiểm tra File.Exists hoặc catch'})]});
  c.out('Không có data.txt');
  c.snap({ln:6,title:'catch bắt được',body:'catch (FileNotFoundException) khớp đúng loại lỗi nên chương trình in thông báo thay vì dừng.',viz:eTree(base)});
  c.snap({ln:6,title:'Xong',body:'FileNotFoundException kế thừa IOException, nên catch (IOException) cũng bắt được nó.',note:'FileNotFoundException: tệp không có. Nó là con của IOException.',viz:eHier('FileNotFoundException')});
 }},
dnf:{inputs:[],chips:[],
 intro:'Ghi vào một thư mục không có sẵn. Bấm "Bước tiếp".',
 lines:function(){return ['try','{','  File.WriteAllText(','    @"KhongCo\\a.txt", "xin chào");','}','catch (DirectoryNotFoundException)','{','  Console.WriteLine(','    "Không có thư mục");','}'];},
 run:function(c){
  var base = [E_ROOT,['note.txt',1,'file']];
  c.snap({ln:2,title:'Tình huống',body:'Chương trình ghi vào KhongCo\\a.txt, nhưng thư mục KhongCo chưa có.',viz:eTree(base.concat([['KhongCo',1,'dir','dim','cần ghi vào']]),{KhongCo:'hi'})});
  c.snap({ln:2,title:'WriteAllText ném lỗi',body:'WriteAllText tạo được tệp, nhưng không tự tạo thư mục chứa nó.',viz:[eTree(base.concat([['KhongCo',1,'dir','dim','không có']]),{KhongCo:'bad'},{KhongCo:'! không có'}),vCard({kind:'err',title:'DirectoryNotFoundException',sub:"Could not find a part of the path 'C:\\Bai\\KhongCo\\a.txt'.",tip:'Cách xử lý: Directory.CreateDirectory trước khi ghi'})]});
  c.out('Không có thư mục');
  c.snap({ln:7,title:'catch bắt được',body:'catch (DirectoryNotFoundException) khớp đúng loại lỗi nên chương trình in thông báo.',viz:eTree(base)});
  c.snap({ln:7,title:'Xong',body:'DirectoryNotFoundException cũng kế thừa IOException, cùng cha với FileNotFoundException.',note:'DirectoryNotFoundException: thư mục trong đường dẫn không có. Nó là con của IOException.',viz:eHier('DirectoryNotFoundException')});
 }},
ua:{inputs:[],chips:[],
 intro:'Ghi vào một tệp chỉ đọc. Bấm "Bước tiếp".',
 lines:function(){return ['try','{','  File.WriteAllText(','    "readonly.txt", "xin chào");','}','catch (UnauthorizedAccessException)','{','  Console.WriteLine(','    "Không có quyền");','}'];},
 run:function(c){
  var base = [E_ROOT,['note.txt',1,'file']];
  c.snap({ln:2,title:'Tình huống',body:'Tệp readonly.txt có thuộc tính chỉ đọc. Chương trình lại muốn ghi vào nó.',viz:eTree(base.concat([['readonly.txt',1,'file','dim','khóa: chỉ đọc']]),{'readonly.txt':'hi'})});
  c.snap({ln:2,title:'WriteAllText ném lỗi',body:'Tệp có tồn tại, nhưng hệ điều hành không cho phép chương trình ghi vào.',viz:[eTree(base.concat([['readonly.txt',1,'file','dim','khóa: chỉ đọc']]),{'readonly.txt':'bad'},{'readonly.txt':'! bị từ chối'}),vCard({kind:'err',title:'UnauthorizedAccessException',sub:"Access to the path 'C:\\Bai\\readonly.txt' is denied.",tip:'Cách xử lý: kiểm tra quyền hoặc báo người dùng'})]});
  c.out('Không có quyền');
  c.snap({ln:7,title:'catch bắt được',body:'catch (UnauthorizedAccessException) khớp đúng loại lỗi nên chương trình in thông báo.',viz:eTree(base)});
  c.snap({ln:7,title:'Xong',body:'UnauthorizedAccessException không phải con của IOException. catch (IOException) sẽ bỏ lọt nó.',note:'UnauthorizedAccessException thuộc nhánh riêng, cần catch riêng.',viz:eHier('UnauthorizedAccessException')});
 }},
io:{inputs:[],chips:[],
 intro:'Đọc một tệp đang được chương trình khác mở để ghi. Bấm "Bước tiếp".',
 lines:function(){return ['try','{','  File.ReadAllText("log.txt");','}','catch (IOException)','{','  Console.WriteLine(','    "Tệp đang bận");','}'];},
 run:function(c){
  var base = [E_ROOT,['note.txt',1,'file']];
  c.snap({ln:2,title:'Tình huống',body:'Một chương trình khác đang mở log.txt để ghi và đang giữ khóa tệp. Đây là tình huống thường thấy trên Windows.',viz:eTree(base.concat([['log.txt',1,'file','dim','khóa: đang được dùng']]),{'log.txt':'hi'})});
  c.snap({ln:2,title:'ReadAllText ném lỗi',body:'Tệp có thật, đủ quyền, nhưng đang bận nên không mở được.',viz:[eTree(base.concat([['log.txt',1,'file','dim','khóa: đang được dùng']]),{'log.txt':'bad'},{'log.txt':'! đang bận'}),vCard({kind:'err',title:'IOException',sub:"The process cannot access the file 'C:\\Bai\\log.txt' because it is being used by another process.",tip:'Cách xử lý: thử lại sau hoặc báo người dùng'})]});
  c.out('Tệp đang bận');
  c.snap({ln:6,title:'catch bắt được',body:'catch (IOException) bắt được lỗi này.',viz:eTree(base)});
  c.snap({ln:6,title:'Xong',body:'IOException là lớp cha của FileNotFoundException và DirectoryNotFoundException.',note:'Bắt cụ thể trước, IOException sau. Và nhớ UnauthorizedAccessException là nhánh riêng.',viz:eHier('IOException')});
 }}
};
