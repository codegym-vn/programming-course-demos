// META {"module":4,"lesson":"Ghi File Văn bản","activity":"Giới thiệu lớp StreamWriter","title":"Giới thiệu lớp StreamWriter","lead":"StreamWriter ghi vào bộ đệm trước, chỉ khi đóng hoặc Flush thì chữ mới xuống tệp. Hai cột cùng chạy, bấm <b>Bước tiếp</b>.","tabs":[["x","Quên đóng và có using"]],"codeTitle":"Mã nguồn C#"}
var SW_L = ['Dòng 1', 'Dòng 2'];
function swBytes(s){ return unescape(encodeURIComponent(s)).length; }
function swFile(n){
  var L = SW_L.slice(0, n).map(function(t){ return {t: t, s: 'ok'}; });
  if (!n) L = [{t: '(tệp rỗng)', s: 'dim'}];
  return vText(L, {title: 'log.txt trên đĩa: ' + swBytes(SW_L.slice(0, n).join('\n') + (n ? '\n' : '')) + ' byte', eol: n > 0, noNo: true});
}
function swViz(n, flow, mode){
  var txt = SW_L.slice(0, n).join('↵') + (n ? '↵' : '');
  var chars = SW_L.slice(0, n).join('\n').length + (n ? 1 : 0);
  var bt = mode === 'lost' ? '(đã mất, chưa bao giờ xuống tệp)' : (mode === 'saved' ? '(đã đổ xuống tệp)' : (txt || '(rỗng)'));
  return [
    vFlow([{t:'Chương trình',s:flow[0],sub:flow[3]},{t:'Bộ đệm',s:flow[1],sub:flow[4]},{t:'Tệp',s:flow[2],sub:flow[5]}]),
    vBuf({label:'Bộ đệm trong RAM (hình minh họa)', fill: (mode === 'lost' || mode === 'saved') ? 0 : Math.round(chars * 100 / 20), text: bt}),
    swFile(mode === 'saved' ? n : 0)
  ];
}
var EX = {x:{
 intro:'Cả hai cột đều tạo StreamWriter và ghi hai dòng vào log.txt. Hãy để ý tệp trên đĩa nặng bao nhiêu byte.',
 running:'Chữ ghi ra đi vào bộ đệm trước. Tệp chỉ nhận chữ khi bộ đệm được đẩy xuống.',
 done:'Bên trái tệp vẫn 0 byte vì chưa bao giờ đóng. Bên phải tệp có 2 dòng (' + swBytes(SW_L.join('\n') + '\n') + ' byte) vì using đã đóng StreamWriter.',
 note:'Luôn đóng StreamWriter, tốt nhất bằng using, để dữ liệu thật sự được ghi xuống tệp.',
 cols:[
 {title:'Quên đóng',sub:'Không có Close() hay using.',
  lines:['var w =','  new StreamWriter("log.txt");','w.WriteLine("Dòng 1");','w.WriteLine("Dòng 2");','// quên Close() hoặc using'],
  run:function(c){
   c.snap({ln:1,title:'Mở StreamWriter',body:'Tệp log.txt được tạo, đang rỗng. Bộ đệm cũng rỗng.',viz:swViz(0,['hi',undefined,undefined,'mở tệp','',''],'normal')});
   c.snap({ln:2,title:'WriteLine("Dòng 1")',body:'Chữ chỉ vào bộ đệm. Tệp trên đĩa vẫn 0 byte.',viz:swViz(1,['hi','hi',undefined,'ghi','nhận chữ','chưa có gì'],'normal')});
   c.snap({ln:3,title:'WriteLine("Dòng 2")',body:'Bộ đệm có 2 dòng. Tệp vẫn 0 byte.',viz:swViz(2,['hi','hi',undefined,'ghi','nhận chữ','chưa có gì'],'normal')});
   c.snap({ln:4,title:'Chương trình kết thúc',body:'Không ai gọi Close() hay Flush(), nên bộ đệm bị bỏ đi cùng chương trình.',viz:swViz(2,['dim','bad','dim','kết thúc','bị bỏ','không nhận gì'],'normal')});
   c.snap({ln:4,title:'Xong',body:'Tệp vẫn 0 byte, hai dòng đã mất.',viz:swViz(2,['dim','bad','bad','-','đã mất','rỗng'],'lost')});
  }},
 {title:'Có using',sub:'using tự gọi Dispose khi ra khỏi khối.',
  lines:['using (var w =','  new StreamWriter("log.txt"))','{','  w.WriteLine("Dòng 1");','  w.WriteLine("Dòng 2");','}'],
  run:function(c){
   c.snap({ln:1,title:'Mở StreamWriter',body:'Tệp log.txt được tạo, đang rỗng. Bộ đệm cũng rỗng.',viz:swViz(0,['hi',undefined,undefined,'mở tệp','',''],'normal')});
   c.snap({ln:3,title:'WriteLine("Dòng 1")',body:'Chữ chỉ vào bộ đệm. Tệp trên đĩa vẫn 0 byte.',viz:swViz(1,['hi','hi',undefined,'ghi','nhận chữ','chưa có gì'],'normal')});
   c.snap({ln:4,title:'WriteLine("Dòng 2")',body:'Bộ đệm có 2 dòng. Tệp vẫn 0 byte.',viz:swViz(2,['hi','hi',undefined,'ghi','nhận chữ','chưa có gì'],'normal')});
   c.snap({ln:5,title:'Ra khỏi khối using',body:'using gọi Dispose, Dispose gọi Flush: bộ đệm đổ xuống tệp rồi tệp được đóng.',viz:swViz(2,['ok','ok','new','xong','đổ xuống','nhận 2 dòng'],'saved')});
   c.snap({ln:5,title:'Xong',body:'Tệp có 2 dòng, ' + swBytes(SW_L.join('\n') + '\n') + ' byte.',viz:swViz(2,['ok','ok','ok','xong','đã trống','đủ 2 dòng'],'saved')});
  }}
 ]}};
