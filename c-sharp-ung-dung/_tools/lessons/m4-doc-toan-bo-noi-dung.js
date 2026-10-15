// META {"module":4,"lesson":"Đọc File Văn bản","activity":"Đọc toàn bộ nội dung với ReadToEnd() và các phương thức đọc khác","title":"Đọc toàn bộ nội dung tệp","lead":"Cùng một tệp ten.txt có 3 dòng, đọc bằng ba cách thì kết quả có ba hình dạng khác nhau. Chọn tình huống rồi bấm <b>Bước tiếp</b>.","tabs":[["toend","ReadToEnd"],["alllines","File.ReadAllLines"],["lines","File.ReadLines"]],"codeTitle":"Mã nguồn C#"}
var RF = ['An', 'Bình', 'Chi'];
function rfText(states, title){
  return vText(RF.map(function(t, i){ return {t: t, s: states ? states[i] : undefined}; }), {title: title || 'ten.txt', eol: true});
}
var EX = {
toend:{inputs:[],chips:[],
 intro:'ReadToEnd() đọc cả tệp vào một chuỗi duy nhất. Bấm "Bước tiếp".',
 lines:function(){return [
  'using var r =',
  '  new StreamReader("ten.txt");',
  'string all = r.ReadToEnd();',
  'Console.WriteLine(all.Length);'];},
 run:function(c){
  var all = RF.join('\n') + '\n', chars = all.split('').map(function(ch){ return ch === '\n' ? '↵' : ch; });
  c.snap({ln:1,title:'Mở tệp ten.txt',body:'Tệp có 3 dòng: An, Bình, Chi. Mỗi dòng kết thúc bằng một ký tự xuống dòng ↵.',viz:[rfText(), vCells([], {name: 'all', cap: 0})].slice(0, 1)});
  c.snap({ln:2,title:'ReadToEnd() đọc tất cả',body:'Toàn bộ tệp vào một string duy nhất. Các ký tự xuống dòng ↵ nằm ngay trong chuỗi.',
   vars:[['all','"An↵Bình↵Chi↵"',1]],
   viz:[rfText(['ok','ok','ok']), vCells(chars.map(function(ch){ return {v: ch, s: ch === '↵' ? 'f2' : 'ok'}; }), {name: 'all (một string)', small: true})]});
  c.out(String(all.length));
  c.snap({ln:3,title:'Độ dài chuỗi',body:'all.Length = ' + all.length + ': ' + RF.join('').length + ' chữ cái cộng 3 ký tự xuống dòng (trên Windows mỗi lần xuống dòng là 2 ký tự \\r\\n nên sẽ dài hơn).',
   vars:[['all.Length',all.length,1]],
   viz:[rfText(['ok','ok','ok']), vCells(chars.map(function(ch){ return {v: ch, s: ch === '↵' ? 'f2' : 'ok'}; }), {name: 'all (một string)', small: true, badges: [['Length', all.length]]})]});
  c.snap({ln:3,title:'Xong',body:'Một chuỗi dài, tiện khi chỉ cần cả nội dung. Muốn xử lý từng dòng thì phải tách chuỗi ra.',
   note:'Tệp nhỏ: ReadToEnd cho tiện. Tệp lớn: dùng ReadLine hoặc File.ReadLines để không nạp hết vào bộ nhớ.',
   vars:[['all.Length',all.length]],
   viz:[rfText(['ok','ok','ok']), vCells(chars.map(function(ch){ return {v: ch, s: ch === '↵' ? 'f2' : 'ok'}; }), {name: 'all (một string)', small: true, badges: [['Length', all.length]]})]});
 }},
alllines:{inputs:[],chips:[],
 intro:'File.ReadAllLines tách tệp thành một mảng, mỗi dòng một ô. Bấm "Bước tiếp".',
 lines:function(){return [
  'string[] a =',
  '  File.ReadAllLines("ten.txt");',
  'Console.WriteLine(a.Length);',
  'Console.WriteLine(a[1]);'];},
 run:function(c){
  function arr(hi){ return vCells(RF.map(function(t, i){ return {v: t, s: i === hi ? 'hi' : 'ok'}; }), {name: 'a (string[3])', small: false}); }
  c.snap({ln:0,title:'Tệp ten.txt',body:'Cùng tệp 3 dòng như tab trước.',viz:[rfText()]});
  c.snap({ln:1,title:'ReadAllLines tách dòng',body:'Kết quả là mảng string[3]. Ký tự xuống dòng bị bỏ đi, mỗi ô chỉ chứa chữ của dòng.',
   vars:[['a','string[3]',1]],viz:[rfText(['ok','ok','ok']), arr(-1)]});
  c.out(String(RF.length));
  c.snap({ln:2,title:'Số dòng',body:'a.Length = ' + RF.length + ', đúng bằng số dòng của tệp.',vars:[['a.Length',RF.length,1]],viz:[rfText(['ok','ok','ok']), arr(-1)]});
  c.out(RF[1]);
  c.snap({ln:3,title:'Lấy một dòng',body:'a[1] là dòng thứ hai: "' + RF[1] + '". Có mảng rồi thì truy cập dòng nào cũng được.',vars:[['a[1]',S(RF[1]),1]],viz:[rfText([undefined,'hi',undefined]), arr(1)]});
  c.snap({ln:3,title:'Xong',body:'Cả tệp đã nằm trong mảng, dùng chỉ số để lấy từng dòng.',
   note:'Tệp nhỏ: ReadAllLines cho tiện. Tệp lớn: dùng File.ReadLines để không nạp hết vào bộ nhớ.',vars:[['a.Length',RF.length]],viz:[rfText(['ok','ok','ok']), arr(-1)]});
 }},
lines:{inputs:[],chips:[],
 intro:'File.ReadLines đọc đến đâu đưa cho foreach đến đó. Bấm "Bước tiếp".',
 lines:function(){return [
  'foreach (var s in',
  '  File.ReadLines("ten.txt"))',
  '{',
  '  Console.WriteLine(s);',
  '  if (s == "Bình") break;',
  '}'];},
 run:function(c){
  function belt(states, item, sub){
    return vFlow([{t:'Tệp ten.txt',s:states[0],sub:sub[0]},{t:'foreach',s:states[1],sub:sub[1],item:item},{t:'Console',s:states[2],sub:sub[2]}],{title:'Băng chuyền: mỗi lần một dòng'});
  }
  c.snap({ln:1,title:'Chưa đọc gì',body:'File.ReadLines chưa đọc dòng nào. Nó chỉ chờ foreach hỏi từng dòng.',
   viz:[rfText(['dim','dim','dim']), belt(['hi',undefined,undefined],null,['đang mở','chờ','chờ'])]});
  c.out(RF[0]);
  c.snap({ln:3,title:'Lấy dòng 1',body:'foreach lấy "' + RF[0] + '" và xử lý xong rồi mới đi lấy dòng tiếp theo.',
   viz:[rfText(['ok','dim','dim']), belt(['ok','hi','ok'],RF[0],['đã đọc 1','đang xử lý','in ra'])]});
  c.snap({ln:4,title:'Kiểm tra điều kiện',body:'"' + RF[0] + '" khác "Bình" nên vòng lặp đi tiếp sang dòng sau.',
   viz:[rfText(['ok','dim','dim']), belt(['ok','hi',undefined],RF[0],['đã đọc 1','s != "Bình"','chờ'])]});
  c.out(RF[1]);
  c.snap({ln:3,title:'Lấy dòng 2',body:'Bây giờ tệp mới đọc tiếp dòng 2: "' + RF[1] + '". Dòng 3 chưa hề được đọc.',
   viz:[rfText(['ok','hi','dim']), belt(['ok','hi','ok'],RF[1],['đã đọc 2','đang xử lý','in ra'])]});
  c.snap({ln:4,title:'break thoát sớm',body:'s == "Bình" đúng nên break. Dòng 3 không bao giờ được đọc.',
   viz:[rfText(['ok','ok','dim']), belt(['dim','bad','dim'],null,['dừng đọc','break','-'])]});
  c.snap({ln:5,title:'Xong',body:'Đọc dần từng dòng nên có thể dừng sớm mà không tốn công đọc phần còn lại.',
   note:'Tệp lớn: File.ReadLines đọc đến đâu lấy đến đó, không nạp cả tệp vào bộ nhớ. Tệp nhỏ thì ReadAllLines cho tiện.',
   viz:[rfText(['ok','ok','dim']), belt(['dim','ok','dim'],null,['dòng 3 chưa đọc','xong','-'])]});
 }}
};
