// META {"module":4,"lesson":"Đọc File Văn bản","activity":"Giới thiệu lớp StreamReader","title":"Giới thiệu lớp StreamReader","lead":"StreamReader đọc tệp từng ký tự và nhớ vị trí đang đọc bằng một con trỏ. Bấm <b>Bước tiếp</b> để xem Peek và Read khác nhau thế nào.","tabs":[["x","Đọc từng ký tự"]],"codeTitle":"Mã nguồn C#"}
var EX = {x:{inputs:[],chips:[],
 intro:'Tệp chứa hai dòng "Hi" và "OK". Hãy nhìn tam giác chỉ vị trí con trỏ đọc. Bấm "Bước tiếp".',
 lines:function(){return [
  'using var r =',
  '  new StreamReader("a.txt");',
  'Console.WriteLine(r.Peek());',
  'Console.WriteLine(r.Read());',
  'Console.WriteLine(r.Read());',
  'Console.WriteLine(r.Read());',
  'Console.WriteLine((char)r.Read());',
  'Console.WriteLine((char)r.Read());',
  'Console.WriteLine(r.Read());',
  'Console.WriteLine(r.EndOfStream);'];},
 run:function(c){
  var text = 'Hi\nOK', pos = 0, last = null;
  function srShow(label){
    var items = [];
    for (var i = 0; i < text.length; i++) items.push({v: text[i] === '\n' ? '↵' : text[i], s: i < pos ? 'ok' : (i === pos ? 'hi' : undefined)});
    items.push({v: 'hết', s: pos >= text.length ? 'hi' : 'dim', ix: '·'});
    return [
      vCells(items, {name: 'Tệp a.txt', ptr: pos, ptrLabel: label || 'con trỏ'}),
      vScore([{k: 'Vị trí con trỏ', v: pos}, {k: 'Giá trị vừa trả về', v: last === null ? '-' : last}])
    ];
  }
  function srPeek(){ return pos < text.length ? text.charCodeAt(pos) : -1; }
  function srRead(){ var v = srPeek(); if (pos < text.length) pos++; return v; }
  c.snap({ln:1,title:'Mở tệp',body:'new StreamReader mở tệp và đặt con trỏ ở ký tự đầu tiên. Dấu ↵ là ký tự xuống dòng.',viz:srShow()});
  last = srPeek(); c.out(String(last));
  c.snap({ln:2,title:'Peek() nhìn trước',body:'Peek() trả về ' + last + ' là mã của ký tự \'H\'. Con trỏ vẫn đứng yên, chưa đọc gì.',viz:srShow('Peek')});
  last = srRead(); c.out(String(last));
  c.snap({ln:3,title:'Read() đọc rồi tiến',body:'Read() trả về ' + last + ' (\'H\') rồi đẩy con trỏ sang ký tự \'i\'. Ô đã đọc chuyển sang màu xanh.',viz:srShow()});
  last = srRead(); c.out(String(last));
  var a = last; last = srRead(); c.out(String(last));
  c.snap({ln:5,title:'Đọc \'i\' rồi xuống dòng',body:'Read() thứ hai trả về ' + a + ' (\'i\'). Read() thứ ba trả về ' + last + ', là mã của ký tự xuống dòng.',viz:srShow()});
  last = srRead(); c.out(String.fromCharCode(last));
  c.snap({ln:6,title:'Đọc \'O\'',body:'Ép kiểu (char) để in ra ký tự thay vì mã số.',viz:srShow()});
  last = srRead(); c.out(String.fromCharCode(last));
  c.snap({ln:7,title:'Đọc \'K\'',body:'Con trỏ đã đi qua ký tự cuối cùng của tệp.',viz:srShow()});
  last = srRead(); c.out(String(last));
  c.snap({ln:8,title:'Read() ở cuối tệp',body:'Không còn ký tự nào nên Read() trả về ' + last + '. Đó là lý do Read() trả về int: để có chỗ cho giá trị -1.',viz:srShow('hết tệp')});
  c.out(pos >= text.length ? 'True' : 'False');
  c.snap({ln:9,title:'Xong',body:'EndOfStream cho biết con trỏ đã ở cuối tệp: ' + (pos >= text.length ? 'True' : 'False') + '.',
   note:'Peek nhìn trước và không di chuyển. Read đọc rồi tiến một ký tự. Hết tệp thì Read trả về -1.',viz:srShow('hết tệp')});
 }}};
