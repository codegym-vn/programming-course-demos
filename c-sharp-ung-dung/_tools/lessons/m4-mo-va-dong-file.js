// META {"module":4,"lesson":"Giới thiệu chung về Thao tác File và Stream","activity":"Ví dụ đơn giản về việc mở và đóng file","title":"Mở và đóng tệp","lead":"Tệp có vòng đời: mở, dùng, đóng. Chọn tình huống rồi bấm <b>Bước tiếp</b>.","tabs":[["dong","Mở rồi đóng"],["quen","Quên đóng"]],"codeTitle":"Mã nguồn C#"}
var oLines = ['Xin chào','Học C#'];
/* open: tệp đang mở; cur: dòng đã đọc (-1 chưa) */
var oViz = function(open, cur, note, extra){
  var h = [vLamps([{t:'a.txt',sub:open ? 'Đang mở (khóa)' : 'Đã đóng',s:open ? 'ok' : 'off'}]),
   vText(oLines.map(function(t, i){ return {t:t,s:i === cur ? 'hi' : undefined}; }),{title:'a.txt',cursor:cur >= 0 ? cur : undefined}),
   vGrid(open ? [['Tài nguyên hệ điều hành đang giữ'],['Tệp a.txt (handle)']] : [['Tài nguyên hệ điều hành đang giữ'],['(không có)']],{head:true})];
  if (extra) h.push(extra);
  return h;
};
var oTab = function(close){
  return {inputs:[],chips:[],
  intro:close ? 'Mở a.txt, đọc một dòng rồi gọi Close(). Bấm "Bước tiếp".' : 'Lần này chương trình mở tệp, đọc rồi quên gọi Close(). Bấm "Bước tiếp".',
  lines:function(){ return ['var sr = new StreamReader("a.txt");','string l1 = sr.ReadLine();','Console.WriteLine(l1);',close ? 'sr.Close();' : '// quên gọi sr.Close();']; },
  run:function(c){
   c.snap({ln:0,title:'Mở tệp',body:'Hệ điều hành cấp một tay cầm (handle) cho a.txt. Đèn xanh, bảng tài nguyên có thêm một dòng.',vars:[['sr','→ StreamReader',1]],viz:oViz(true,-1)});
   c.snap({ln:1,title:'Đọc một dòng',body:'ReadLine() lấy dòng đầu tiên của tệp: "' + oLines[0] + '".',vars:[['sr','→ StreamReader'],['l1',S(oLines[0]),1]],viz:oViz(true,0)});
   c.out(oLines[0]);
   if (close) {
    c.snap({ln:2,title:'In dòng đã đọc',body:'Chương trình in "' + oLines[0] + '". Tệp vẫn đang mở.',vars:[['l1',S(oLines[0])]],viz:oViz(true,0)});
    c.snap({ln:3,title:'Close() đóng tệp',body:'Close() trả tay cầm lại cho hệ điều hành. Đèn xám, bảng tài nguyên trống.',vars:[['l1',S(oLines[0])]],viz:oViz(false,-1)});
    c.snap({ln:3,title:'Xong',body:'Mở một lần thì đóng một lần, tệp được trả lại sạch sẽ.',note:'Mỗi lần mở tệp phải có một lần đóng tương ứng.',vars:[['l1',S(oLines[0])]],viz:oViz(false,-1)});
   } else {
    c.snap({ln:3,title:'Không gọi Close()',body:'Chương trình đi tiếp mà không đóng tệp. Đèn vẫn xanh, bảng tài nguyên vẫn còn dòng a.txt.',vars:[['l1',S(oLines[0])]],viz:oViz(true,0)});
    c.snap({ln:3,title:'Chương trình khác muốn ghi đè',body:'Trên Windows, khi Notepad lưu đè a.txt sẽ bị báo tệp đang được dùng, vì tệp vẫn bị chương trình của ta giữ.',vars:[['l1',S(oLines[0])]],viz:oViz(true,0,vCard({kind:'warn',title:'Notepad không lưu được',sub:'The process cannot access the file because it is being used by another process.'}))});
    c.snap({ln:3,title:'Xong',body:'Tệp chỉ được nhả khi chương trình kết thúc hoặc khi bộ gom rác dọn đối tượng, và ta không biết lúc nào. Trên macOS/Linux việc khóa tệp khác đi.',note:'Mỗi lần mở tệp phải có một lần đóng tương ứng.',vars:[['l1',S(oLines[0])]],viz:oViz(true,0)});
   }
  }};
};
var EX = {dong:oTab(true),quen:oTab(false)};
